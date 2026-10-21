import { mirrorCatalog, inspectionKey, mirrorConnections, mirrorEntry, mirrorPairKey, recoverySources, type MirrorEntry } from '../content/mirror'
import type { GameSave } from './types'

export type MirrorAvailability = 'available' | 'locked' | 'incomplete' | 'recovery-pending' | 'source-unavailable' | 'access-restricted'
/** One guard for text, inspection, retention, search, thumbnails and full media. */
export function mirrorAvailability(state: GameSave, record: MirrorEntry): MirrorAvailability {
  if (!state.prologue?.restored) return 'recovery-pending'
  if (!isMirrorEntryVisible(state, record)) return 'access-restricted'
  const policy = record.recovery
  const availability = policy.availability
  if (availability.kind === 'locked') return record.lockId && state.prologue.unlockedMirrorRecords?.includes(record.lockId) ? 'available' : 'locked'
  if (availability.kind === 'access-restricted') return state.deliveredEvents.includes(availability.requiredEvent) ? 'available' : 'access-restricted'
  if (availability.kind === 'recovery-pending') return state.prologue.recoveredSourceIds?.includes(availability.sourceId) ? 'available' : 'recovery-pending'
  return availability.kind
}
export function canInspectMirrorEntry(state: GameSave, id: string): boolean {
  const record = mirrorEntry(id)
  return !!record && ['available', 'incomplete'].includes(mirrorAvailability(state, record))
}
/** Only authored sources with real prerequisite receipts can be retained. No episode-number unlock. */
export function recoverMirrorSource(state: GameSave, sourceId: string): GameSave {
  const source = recoverySources.find(item => item.id === sourceId)
  if (!state.prologue?.restored || !source || !source.requiredEvents.length ||
    !source.requiredEvents.every(id => state.deliveredEvents.includes(id)) ||
    state.prologue.recoveredSourceIds?.includes(sourceId)) return state
  return { ...state, prologue: { ...state.prologue, recoveredSourceIds: [...(state.prologue.recoveredSourceIds ?? []), sourceId] } }
}
export function isMirrorEntryVisible(state: GameSave, record: MirrorEntry): boolean {
  return !!state.prologue?.restored && (record.recovery.episodeBoundary === 1 || record.recovery.requiredEvents.length > 0) && record.recovery.requiredEvents.every(id => state.deliveredEvents.includes(id))
}
export function visibleMirrorEntries(state: GameSave): MirrorEntry[] {
  return mirrorCatalog.filter(record => isMirrorEntryVisible(state, record))
}
export function saveMirrorEvidence(state: GameSave, id: string, now: number): GameSave {
  const record = mirrorEntry(id)
  if (!record || !canInspectMirrorEntry(state, id) || !state.prologue?.inspectedRecords?.includes(inspectionKey(record)) || state.evidence[id]) return state
  return { ...state, evidence: { ...state.evidence, [id]: { id, source: `Read-only Daniel snapshot / ${record.area} / ${record.title}. ${record.stamp}. Source unverified; description does not authenticate media bytes.`, collectedAt: now, verified: false } }, deliveredEvents: [...state.deliveredEvents, `OPEN-RECORD-SAVED:${id}`] }
}
export function canMirrorLink(state: GameSave, a: string, b: string): boolean {
  return a !== b && canInspectMirrorEntry(state, a) && canInspectMirrorEntry(state, b) && !!state.evidence[a] && !!state.evidence[b] &&
    !!mirrorConnections.find(link => mirrorPairKey(link.a, link.b) === mirrorPairKey(a, b))
}
export function linkMirrorEvidence(state: GameSave, a: string, b: string): GameSave {
  if (!state.prologue || !canMirrorLink(state, a, b)) return state
  const key = mirrorPairKey(a, b)
  if (state.prologue.mirrorLinks?.includes(key)) return state
  return { ...state, prologue: { ...state.prologue, mirrorLinks: [...(state.prologue.mirrorLinks ?? []), key] } }
}
export function unlinkMirrorEvidence(state: GameSave, key: string): GameSave {
  if (!state.prologue?.mirrorLinks?.includes(key)) return state
  return { ...state, prologue: { ...state.prologue, mirrorLinks: state.prologue.mirrorLinks.filter(link => link !== key) } }
}
export function navigateMirror(state: GameSave, id?: string): GameSave {
  if (!state.prologue?.restored) return state
  const record = id ? mirrorEntry(id) : undefined
  if (id && (!record || !isMirrorEntryVisible(state, record))) return state
  if (state.prologue.mirrorLocation === id) return state
  return { ...state, prologue: { ...state.prologue, mirrorLocation: id } }
}
