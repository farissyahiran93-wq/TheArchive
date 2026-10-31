import { describe, expect, it } from 'vitest'
import { ConversationFixture } from '../../tests/helpers/versionHistoryConversation'
import { expandedMirror } from '../../tests/e2e/life-helper'
import { chapter2Access } from './chapter2Access'
import { normalizeSave } from './engine'
import { newGame } from './types'
import { traceToolAvailable, traceToolStates } from './traceTools'

describe('TRACE capabilities preserve the existing story gates', () => {
  it('keeps every tool locked until installation actually completes', () => {
    expect(traceToolStates(newGame()).every(t => !t.available)).toBe(true)
    const f = new ConversationFixture().bridge()
    expect(traceToolStates(f.save).every(t => !t.available)).toBe(true)
    f.origin('security').origin('cancel')
    expect(traceToolStates(f.save).every(t => !t.available)).toBe(true)
    f.origin('security').origin('install').tickOne()
    expect(traceToolStates(f.save).every(t => !t.available)).toBe(true)
    f.tickOne().tickOne()
    expect(traceToolStates(f.save).filter(t => t.available).map(t => t.id)).toEqual(['evidence-vault'])
  })

  it('requires both real source inspections for reference comparison and keeps future tools locked', () => {
    const f = new ConversationFixture().bridge().install().enter()
    expect(traceToolAvailable(f.save, 'record-comparison')).toBe(false)
    f.do({ type: 'panel', panel: 'public' }).do({ type: 'read-article' })
    expect(traceToolAvailable(f.save, 'record-comparison')).toBe(false)
    f.sources()
    expect(traceToolStates(f.save).filter(t => t.available).map(t => t.id)).toEqual(['evidence-vault', 'record-comparison'])
    const before = JSON.stringify(f.save)
    traceToolStates(f.save)
    expect(JSON.stringify(f.save)).toBe(before)
  })

  it('follows the Chapter 2 storage notice and retains the production recovery deadline', () => {
    let save = expandedMirror()
    expect(traceToolAvailable(save, 'file-recovery')).toBe(false)
    const now = Math.max(...save.chapter2Access!.messages.map(m => m.at)) + 10000
    expect(chapter2Access(save, { type: 'start-recovery' }, now)).toBe(save)
    save = chapter2Access(save, { type: 'life-navigate', location: { app: 'Mail', item: 'LIFE-E4' } }, now)
    expect(traceToolAvailable(save, 'file-recovery')).toBe(true)
    save = chapter2Access(save, { type: 'start-recovery' }, now)
    expect(save.chapter2Access!.recovery).toEqual({ startedAt: now, dueAt: now + 1500000 })
    const loaded = normalizeSave(JSON.parse(JSON.stringify(save)))
    expect(traceToolAvailable(loaded, 'file-recovery')).toBe(true)
    expect(loaded.chapter2Access!.recovery).toEqual(save.chapter2Access!.recovery)
    expect(loaded.relationships).toEqual(save.relationships)
    expect(loaded.knowledge).toEqual(save.knowledge)
  })

  it('retains delivered old-brand text, IDs, choices and relationships across save loading', () => {
    const f = new ConversationFixture().bridge().install()
    const oldLine = f.save.chapter1!.sender.messages.find(m => m.id === 'OPEN-ORIGIN-PACKAGE')!
    expect(oldLine).toBeDefined()
    oldLine.text = 'THE ARCHIVE · Restricted access package'
    f.save.relationships.sophie = { trust: 3, affinity: 2, suspicion: 1, romance: 0 }
    const loaded = normalizeSave(JSON.parse(JSON.stringify(f.save)))
    expect(loaded.chapter1!.sender.messages).toEqual(f.save.chapter1!.sender.messages)
    expect(loaded.choices).toEqual(f.save.choices)
    expect(loaded.prologue!.scene01!.nodeId).toEqual(f.save.prologue!.scene01!.nodeId)
    expect(loaded.relationships).toEqual(f.save.relationships)
    expect(loaded.deliveredEvents).toEqual(f.save.deliveredEvents)
    expect(loaded.schemaVersion).toBe(1)
  })
})
