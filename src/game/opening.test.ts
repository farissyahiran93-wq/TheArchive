import { describe, expect, it } from 'vitest'
import { newGame, type GameSave } from './types'
import { deliverOpening, beginOpening, compareMirrorIndex, finishOpening, inspectMirrorDetail, revealMirrorHint, unlockMirrorRecord, inspectMirrorRecord, inspectRecoveryOffer, readDanielNote, replyToSophie, restoreDanielMirror } from './opening'
import { normalizeSave, registerPlayer } from './engine'
import { mirrorRecords, recoveryToken } from '../content/opening'

// Keep the original compatibility suite exercising saves made before dialogue v2.
function start(): GameSave {
  const state = deliverOpening(registerPlayer(newGame(), 'Rae'), Number.MAX_SAFE_INTEGER)
  return { ...state, prologue: { ...state.prologue!, dialogueVersion: undefined } }
}
function reachOffer() {
  let state = start()
  state = replyToSophie(state, 'who')
  state = readDanielNote(state)
  state = replyToSophie(state, 'help')
  return state
}
function restore() { return restoreDanielMirror(inspectRecoveryOffer(reachOffer())) }

describe('Sophie-first opening: Chapter 1 The Missing Entry', () => {
  it('starts with Sophie and no player-authored message until explicit Send', () => {
    const state = start()
    expect(state.prologue?.stage).toBe('chat')
    expect(state.prologue?.messages).toHaveLength(6)
    expect(state.prologue?.messages.every(msg => msg.sender === 'sophie')).toBe(true)
    expect(state.knowledge.characters.sophie).toEqual([])
    expect(beginOpening(state)).toBe(state)
    expect(replyToSophie(state, 'invalid')).toBe(state)
    const sent = replyToSophie(state, 'who')
    expect(sent.prologue?.messages.filter(msg => msg.sender === 'player')).toHaveLength(1)
    expect(sent.prologue?.messages.some(msg => msg.id === 'OPEN-SOPHIE-NOTE')).toBe(true)
    expect(replyToSophie(sent, 'who')).toBe(sent)
  })

  it('requires Daniel note and explicit recovery consent', () => {
    const first = replyToSophie(start(), 'number')
    expect(replyToSophie(first, 'help')).toBe(first)
    expect(restoreDanielMirror(first)).toBe(first)
    const noted = readDanielNote(first)
    expect(noted.evidence['OPEN-NOTE'].verified).toBe(false)
    expect(noted.evidence['OPEN-NOTE'].source).toContain(recoveryToken)
    expect(readDanielNote(noted)).toBe(noted)
    const offered = replyToSophie(noted, 'token')
    expect(offered.prologue?.stage).toBe('recovery')
    expect(restoreDanielMirror(offered)).toBe(offered)
    const inspected = inspectRecoveryOffer(offered)
    const restored = restoreDanielMirror(inspected)
    expect(restored.prologue?.stage).toBe('mirror')
    expect(restored.knowledge.player).toContain('OPEN-DANIEL-MIRROR-RESTORED')
    expect(restored.knowledge.player).not.toContain('archive.invitation.accepted')
    expect(restored.deliveredEvents.filter(id => id === 'OPEN-MIRROR-RESTORED')).toHaveLength(1)
    expect(restoreDanielMirror(restored)).toBe(restored)
  })

  it('blocks missing-entry proof until Notes and Index have both been inspected', () => {
    const restored = restore()
    expect(compareMirrorIndex(restored)).toBe(restored)
    const indexOnly = inspectMirrorRecord(restored, 'index')
    expect(compareMirrorIndex(indexOnly)).toBe(indexOnly)
    expect(inspectMirrorRecord(indexOnly, 'index')).toBe(indexOnly)
    const notesAndIndex = inspectMirrorRecord(indexOnly, 'notes')
    expect(compareMirrorIndex(notesAndIndex)).toBe(notesAndIndex) // App opened, record not read.
    const notesRead = inspectMirrorDetail(notesAndIndex, 'notes', 'Untitled — last saved 22:30')
    expect(compareMirrorIndex(notesRead)).toBe(notesRead)
    const inspected = inspectMirrorDetail(notesRead, 'index', 'Archive Index — integrity report')
    expect(inspected.evidence['OPEN-INDEX']).toBeUndefined()
    const compared = compareMirrorIndex(inspected)
    expect(compared.prologue?.stage).toBe('found')
    expect(compared.evidence['OPEN-INDEX'].verified).toBe(false)
    expect(compared.evidence['OPEN-INDEX'].source).toContain('14')
    expect(compared.evidence['OPEN-INDEX'].source).toContain('13')
    expect(compared.evidence['OPEN-INDEX'].source).toContain('0')
    expect(compareMirrorIndex(compared)).toBe(compared)
    const finished = finishOpening(compared)
    expect(finished.prologue?.stage).toBe('complete')
    expect(finished.e01?.sceneId).toBe('E01-S02')
    expect(finishOpening(finished)).toBe(finished)
  })

  it('offers two ordinary notes and two ordinary photos, while separate locked items remain optional', () => {
    expect(mirrorRecords.notes.filter(item => !item.lockId)).toHaveLength(2)
    expect(mirrorRecords.gallery.filter(item => !item.lockId)).toHaveLength(2)
    expect(mirrorRecords.notes.filter(item => item.lockId)).toHaveLength(2)
    expect(mirrorRecords.gallery.filter(item => item.lockId)).toHaveLength(2)
    const state = restore()
    const unreadLocked = inspectMirrorDetail(state, 'notes', 'Locked Note — revision copy')
    expect(unreadLocked).toBe(state)
    expect(unlockMirrorRecord(state, 'note-revision', 'wrong')).toBe(state)
    expect(state.prologue?.unlockedMirrorRecords).toEqual([])
    const oneHint = revealMirrorHint(state, 'note-revision')
    expect(oneHint.prologue?.mirrorHints?.['note-revision']).toBe(1)
    const secondHint = revealMirrorHint(oneHint, 'note-revision')
    expect(secondHint.prologue?.mirrorHints?.['note-revision']).toBe(2)
    expect(normalizeSave(structuredClone(secondHint)).prologue).toEqual(secondHint.prologue)
    const unlocked = unlockMirrorRecord(secondHint, 'note-revision', 'echo-7/14')
    expect(unlocked.prologue?.unlockedMirrorRecords).toContain('note-revision')
    expect(unlocked.prologue?.unlockedMirrorRecords).not.toContain('album-index')
    expect(unlockMirrorRecord(unlocked, 'note-revision', 'ECHO-7/14')).toBe(unlocked)
    expect(inspectMirrorDetail(unlocked, 'notes', 'Locked Note — revision copy').prologue?.inspectedRecords).toContain('notes:Locked Note — revision copy')
    const photo = unlockMirrorRecord(unlocked, 'album-index', '7–14')
    expect(photo.prologue?.unlockedMirrorRecords).toContain('album-index')
    expect(photo.prologue?.unlockedMirrorRecords).not.toContain('album-quay')
    expect(normalizeSave(structuredClone(photo)).prologue?.unlockedMirrorRecords).toEqual(photo.prologue?.unlockedMirrorRecords)
  })

  it('does not require unlocking optional private items to finish the prologue', () => {
    const start = restore()
    const afterNote = inspectMirrorDetail(inspectMirrorRecord(start, 'notes'), 'notes', 'Untitled — last saved 22:30')
    const afterIndex = inspectMirrorDetail(inspectMirrorRecord(afterNote, 'index'), 'index', 'Archive Index — integrity report')
    const end = finishOpening(compareMirrorIndex(afterIndex))
    expect(end.prologue?.stage).toBe('complete')
    expect(end.prologue?.unlockedMirrorRecords).toEqual([])
  })

  it('retains older save structure and preserves the new state on normalization', () => {
    const legacy = { ...newGame(), player: { name: 'Earlier Player' } }
    expect(normalizeSave(legacy).prologue).toBeUndefined()
    const recovered = restore()
    expect(normalizeSave(structuredClone(recovered)).prologue).toEqual(recovered.prologue)
    expect(() => normalizeSave({ ...recovered, prologue: { ...recovered.prologue, messages: 'invalid' } })).toThrow('Invalid opening progress')
  })
})
