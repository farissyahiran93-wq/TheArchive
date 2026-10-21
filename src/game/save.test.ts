import 'fake-indexeddb/auto'
import { beforeEach, describe, expect, it } from 'vitest'
import { openDB } from 'idb'
import { registerPlayer } from './engine'
import { draftPhase03b, sendPhase03b } from './phase03b'
import { linkBoardPair } from './board'
import { discardPendingSave, loadGame, SaveConflictError, stagePendingSave, writeGame } from './save'
import { newGame, type GameSave } from './types'
import { useGameStore } from './store'

describe('IndexedDB save', () => {
  beforeEach(() => discardPendingSave())

  it('survives load with identity, progress, knowledge, and events', async () => {
    const state = registerPlayer(newGame(), 'Rae', 'they/them')
    state.deliveredEvents.push('fixture.hello')
    state.knowledge.player.push('public.notice')
    await writeGame(state)
    const loaded = await loadGame()
    expect(loaded.error).toBeUndefined()
    expect(loaded.save.player?.name).toBe('Rae')
    expect(loaded.save.deliveredEvents).toContain('fixture.hello')
    expect(loaded.save.knowledge.player).toContain('public.notice')
  })

  it('blocks an unsupported save without overwriting the raw record', async () => {
    const db = await openDB('the-archive-reboot', 1)
    await db.put('saves', { schemaVersion: 99, player: { name: 'Keep me' } }, 'primary')
    const result = await loadGame()
    expect(result.recoveryRequired).toBe(true)
    expect(result.raw).toEqual({ schemaVersion: 99, player: { name: 'Keep me' } })
    expect(await db.get('saves', 'primary')).toEqual(result.raw)
  })

  it('blocks an incomplete current-schema save', async () => {
    const db = await openDB('the-archive-reboot', 1)
    await db.put('saves', { schemaVersion: 1, player: { name: 'Rae' } }, 'primary')
    const result = await loadGame()
    expect(result.recoveryRequired).toBe(true)
    expect(result.error).toMatch(/story position|incomplete/i)
  })

  it('offers both persisted and pending bytes for backup when the stored save is corrupt', async () => {
    const db = await openDB('the-archive-reboot',1)
    const corrupt = { schemaVersion: 99, player: { name: 'Keep me' } }
    await db.put('saves',corrupt,'primary')
    const pending = { ...registerPlayer(newGame(),'Rae'), saveRevision: 2 }
    stagePendingSave(pending,1)
    const result = await loadGame()
    expect(result.recoveryRequired).toBe(true)
    expect(result.raw).toEqual({ persisted: corrupt, pending })
    expect(await db.get('saves','primary')).toEqual(corrupt)
  })

  it('preserves a prior v1 save and rejects a stale second-tab write atomically', async () => {
    const db = await openDB('the-archive-reboot', 1)
    await db.clear('saves')
    const previous = { ...registerPlayer(newGame(),'Rae'), extraStoryFlag: 'keep-me' }
    await writeGame(previous)
    const loaded = (await loadGame()).save
    expect(loaded.saveRevision).toBeUndefined()
    const first = { ...loaded, saveRevision: 1, choices: { ...loaded.choices, first: 'sent' } }
    await writeGame(first,0)
    const stale = { ...loaded, saveRevision: 1, choices: { ...loaded.choices, second: 'from-other-tab' } }
    await expect(writeGame(stale,0)).rejects.toBeInstanceOf(SaveConflictError)
    const persisted = (await loadGame()).save
    expect(persisted.choices).toEqual({ first: 'sent' })
    expect((persisted as GameSave & { extraStoryFlag?: string }).extraStoryFlag).toBe('keep-me')
  })

  it('restores a selected but unsent reply and private Board link, then persists Send once', async () => {
    const db = await openDB('the-archive-reboot',1)
    await db.clear('saves')
    const initial = registerPlayer(newGame(),'Rae')
    const source = { ...initial, e01: { ...initial.e01!, sceneId: 'E01-S12' as const, editorChecked: true }, deliveredEvents: [...initial.deliveredEvents,'R01'], evidence: {
      E001: { id: 'E001', source: 'Public crop', collectedAt: 1, verified: false },
      E002: { id: 'E002', source: 'Current public copy', collectedAt: 2, verified: false },
    } }
    const draft = linkBoardPair(draftPhase03b(source,'P-S12-A'),'E001','E002')
    await writeGame(draft)
    const restored = (await loadGame()).save
    expect(restored.e01?.draftChoice).toBe('P-S12-A')
    expect(restored.e01?.boardLinks).toEqual(['E001|E002'])
    expect(restored.messages).toHaveLength(0)
    const sent = sendPhase03b(restored,100)
    await writeGame(sent)
    const afterSend = (await loadGame()).save
    expect(afterSend.messages.filter(message => message.id === 'player.P-S12-A')).toHaveLength(1)
    expect(afterSend.e01?.draftChoice).toBeUndefined()
    expect(sendPhase03b(afterSend,200)).toBe(afterSend)
  })

  it('replays an interrupted pending save only when the persisted base revision still matches', async () => {
    const db = await openDB('the-archive-reboot',1)
    await db.clear('saves')
    const base = { ...registerPlayer(newGame(),'Rae'), saveRevision: 3 }
    await writeGame(base)
    const pending = { ...base, saveRevision: 4, choices: { ...base.choices, draft: 'selected' } }
    stagePendingSave(pending,3)
    const recovered = await loadGame()
    expect(recovered.recoveryRequired).toBeUndefined()
    expect(recovered.save.choices.draft).toBe('selected')
    expect((await db.get('saves','primary') as GameSave).saveRevision).toBe(4)
    expect((await loadGame()).save.choices.draft).toBe('selected')
  })

  it('requires explicit recovery when a pending save has an intermediate or conflicting revision', async () => {
    const db = await openDB('the-archive-reboot',1)
    await db.clear('saves')
    const base = { ...registerPlayer(newGame(),'Rae'), saveRevision: 7 }
    const persisted = { ...base, saveRevision: 8, choices: { stored: 'confirmed' } }
    const pending = { ...base, saveRevision: 9, choices: { pending: 'last-action' } }
    await writeGame(persisted)
    stagePendingSave(pending,7)
    const result = await loadGame()
    expect(result.recoveryRequired).toBe(true)
    expect(result.raw).toEqual(pending)
    expect((await db.get('saves','primary') as GameSave).choices).toEqual({ stored: 'confirmed' })
  })

  it('lets concurrent hydration of the same pending bytes finish idempotently', async () => {
    const db = await openDB('the-archive-reboot',1)
    await db.clear('saves')
    const base = { ...registerPlayer(newGame(),'Rae'), saveRevision: 11 }
    const pending = { ...base, saveRevision: 12, choices: { recovered: 'once' } }
    await writeGame(base)
    stagePendingSave(pending,11)
    const outcomes = await Promise.all([loadGame(),loadGame()])
    expect(outcomes.every(result => !result.recoveryRequired && result.save.choices.recovered === 'once')).toBe(true)
    expect((await db.get('saves','primary') as GameSave).saveRevision).toBe(12)
  })

  it('does not discard pending content when another tab used the same revision differently', async () => {
    const db = await openDB('the-archive-reboot',1)
    await db.clear('saves')
    const base = { ...registerPlayer(newGame(),'Rae'), saveRevision: 14 }
    const stored = { ...base, saveRevision: 15, choices: { fromOtherTab: 'kept' } }
    const pending = { ...base, saveRevision: 15, choices: { fromThisTab: 'backup' } }
    await writeGame(stored)
    stagePendingSave(pending,14)
    const result = await loadGame()
    expect(result.recoveryRequired).toBe(true)
    expect(result.raw).toEqual(pending)
    expect((await db.get('saves','primary') as GameSave).choices).toEqual(stored.choices)
  })

  it('restarts only the reboot save and preserves Reduce Motion and unrelated storage', async () => {
    const db = await openDB('the-archive-reboot', 1)
    await db.clear('saves')
    localStorage.setItem('the-archive:game-save:v1', 'legacy-save-sentinel')
    localStorage.setItem('the-archive-reboot:appearance:v1', 'dark')
    localStorage.setItem('the-archive-reboot:audio:v1', '{"effects":false,"music":true}')
    const initial = { ...registerPlayer(newGame(), 'Rae'), saveRevision: 4, settings: { reduceMotion: true }, relationships: { ...newGame().relationships, sophie: { trust: 2, affinity: 3, suspicion: 1, romance: 0 } } }
    await writeGame(initial)
    useGameStore.setState({ save: initial, ready: true, recoveryRequired: false, saveError: null })
    expect(await useGameStore.getState().restartStory()).toBe(true)
    const fresh = (await loadGame()).save
    expect(fresh.player).toBeNull()
    expect(fresh.prologue).toBeUndefined()
    expect(fresh.e01).toBeUndefined()
    expect(fresh.messages).toEqual([])
    expect(fresh.choices).toEqual({})
    expect(fresh.evidence).toEqual({})
    expect(fresh.knowledge.player).toEqual([])
    expect(fresh.relationships.sophie.trust).toBe(0)
    expect(fresh.settings.reduceMotion).toBe(true)
    expect(fresh.saveRevision).toBe(5)
    expect(localStorage.getItem('the-archive:game-save:v1')).toBe('legacy-save-sentinel')
    expect(localStorage.getItem('the-archive-reboot:appearance:v1')).toBe('dark')
    expect(localStorage.getItem('the-archive-reboot:audio:v1')).toBe('{"effects":false,"music":true}')
  })
})
