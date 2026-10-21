import { describe, expect, it } from 'vitest'
import { mirrorCatalog, mirrorEntry, snapshotSource, type MirrorEntry } from '../content/mirror'
import { mirrorLocks } from '../content/opening'
import { normalizeSave, registerPlayer } from './engine'
import { saveMirrorEvidence, navigateMirror, canInspectMirrorEntry, isMirrorEntryVisible, mirrorAvailability, recoverMirrorSource, visibleMirrorEntries } from './mirror'
import { inspectMirrorDetail, restoreDanielMirror, unlockMirrorRecord } from './opening'
import { newGame, type GameSave } from './types'

function recovered(): GameSave {
  const state = registerPlayer(newGame(), 'Rae')
  return restoreDanielMirror({ ...state, prologue: { ...state.prologue!, stage: 'recovery', noteSeen: true, offerInspected: true, queue: [] } })
}
function policy(kind: MirrorEntry['recovery']['availability']): MirrorEntry {
  const record = mirrorEntry('MIR-NOTES-2')!
  return { ...record, recovery: { ...record.recovery, availability: kind } }
}
describe('Phase 06F progressive recovery boundaries', () => {
  it('exposes only the initial snapshot, with ordinary records and no premature June answer', () => {
    const state = recovered()
    expect(visibleMirrorEntries(state)).toHaveLength(mirrorCatalog.length)
    expect(mirrorCatalog.every(record => record.recovery.episodeBoundary === 1 && record.recovery.sourceId === snapshotSource.id)).toBe(true)
    for (const id of ['MIR-MESSAGES-1', 'MIR-MAIL-3', 'MIR-NOTES-2', 'MIR-FILES-3', 'MIR-GALLERY-1']) expect(canInspectMirrorEntry(state, id)).toBe(true)
    expect(mirrorCatalog.some(record => record.body.includes('June Ellis'))).toBe(false)
    expect(state.knowledge.characters.maya).toEqual([])
    expect(state.evidence).toEqual({})
  })
  it('retains source recovery once, rejects unknown or unsupported recovery and does not promote facts', () => {
    const state = recovered()
    expect(state.prologue?.recoveredSourceIds).toEqual([snapshotSource.id])
    expect(recoverMirrorSource(state, snapshotSource.id)).toBe(state)
    expect(restoreDanielMirror(state)).toBe(state)
    expect(recoverMirrorSource(state, 'FUTURE-BACKUP')).toBe(state)
    const before = registerPlayer(newGame(), 'Rae')
    expect(recoverMirrorSource(before, snapshotSource.id)).toBe(before)
    const noReceipt = { ...state, deliveredEvents: [] }
    expect(recoverMirrorSource({ ...noReceipt, prologue: { ...noReceipt.prologue!, recoveredSourceIds: undefined } }, snapshotSource.id).prologue?.recoveredSourceIds).toBeUndefined()
  })
  it('keeps incomplete surviving text readable, separately from missing keys and other sources', () => {
    const state = recovered()
    expect(mirrorAvailability(state, mirrorEntry('MIR-MAPS-3')!)).toBe('incomplete')
    expect(canInspectMirrorEntry(state, 'MIR-MAPS-3')).toBe(true)
    for (const id of ['MIR-FILES-4', 'MIR-PROTECTED-1']) expect(canInspectMirrorEntry(state, id)).toBe(false)
    for (const availability of [
      { kind: 'source-unavailable', sourceId: 'OTHER-BACKUP' },
      { kind: 'recovery-pending', sourceId: 'UNAPPROVED' },
      { kind: 'access-restricted', requiredEvent: 'UNAPPROVED' },
    ] as const) expect(mirrorAvailability(state, policy(availability))).toBe(availability.kind)
  })
  it('hides future titles and media independently of passwords and episode completion', () => {
    let state = recovered()
    for (const [id, puzzle] of Object.entries(mirrorLocks)) state = unlockMirrorRecord(state, id as keyof typeof mirrorLocks, puzzle.answer)
    const future: MirrorEntry = { ...mirrorEntry('MIR-GALLERY-3')!, id: 'MIR-FUTURE-TEST', title: 'Protected future title', recovery: { ...mirrorEntry('MIR-GALLERY-3')!.recovery, episodeBoundary: 2, requiredEvents: ['APPROVED-SOURCE-RECEIPT'] } }
    mirrorCatalog.push(future)
    try {
      expect(visibleMirrorEntries(state).some(record => record.id === future.id)).toBe(false)
      expect(canInspectMirrorEntry(state, future.id)).toBe(false)
      expect(saveMirrorEvidence(state, future.id, 1)).toBe(state)
      expect(navigateMirror(state, future.id)).toBe(state)
    } finally { mirrorCatalog.pop() }
    expect(isMirrorEntryVisible(state, future)).toBe(false)
    const complete = { ...state, e01: { ...state.e01!, e01Complete: true } }
    expect(isMirrorEntryVisible(complete, future)).toBe(false)
    expect(mirrorAvailability(complete, future)).toBe('access-restricted')
    expect(isMirrorEntryVisible(state, { ...future, recovery: { ...future.recovery, requiredEvents: [] } })).toBe(false)
  })
  it('preserves old completed saves, all independent locks, retained receipts and navigation', () => {
    let state = recovered()
    for (const [id, puzzle] of Object.entries(mirrorLocks)) state = unlockMirrorRecord(state, id as keyof typeof mirrorLocks, puzzle.answer)
    state = { ...state, e01: { ...state.e01!, e01Complete: true } }
    delete state.prologue!.recoveredSourceIds
    const loaded = normalizeSave(JSON.parse(JSON.stringify(state)))
    expect(loaded).toEqual(state)
    expect(loaded.prologue?.unlockedMirrorRecords).toHaveLength(4)
    for (const entry of mirrorCatalog.filter(record => record.lockId)) expect(canInspectMirrorEntry(loaded, entry.id)).toBe(true)
    const locked = recovered()
    const record = mirrorEntry('MIR-NOTES-4')!
    expect(inspectMirrorDetail(locked, record.area, record.title)).toBe(locked)
    expect(() => normalizeSave({ ...state, prologue: { ...state.prologue, recoveredSourceIds: ['UNAPPROVED'] } })).toThrow('Invalid recovered source')
  })
})
