import { galleryMedia } from './galleryMedia'
import { mirrorRecords, type MirrorArea, type MirrorRecord } from './opening'

export type RecoveryAvailability =
  | { kind: 'available' }
  | { kind: 'locked'; prerequisite: 'password' | 'missing-key' }
  | { kind: 'incomplete'; survivingText: true }
  | { kind: 'recovery-pending'; sourceId: string }
  | { kind: 'source-unavailable'; sourceId: string }
  | { kind: 'access-restricted'; requiredEvent: string }
export type RecoveryPolicy = {
  sourceId: string
  owner: 'daniel'
  episodeBoundary: number
  requiredEvents: readonly string[]
  availability: RecoveryAvailability
  provenance: 'unverified-snapshot'
  characterDisclosure: 'explicit-receipt-only'
}
export type MirrorEntry = MirrorRecord & { id: string; area: MirrorArea; index: number; recovery: RecoveryPolicy }
export const snapshotSource = {
  id: 'DANIEL-SNAPSHOT-01', requiredEvents: ['OPEN-MIRROR-RESTORED'],
} as const
/** Future sources require reviewed prerequisite events; no automatic episode packages. */
export const recoverySources: readonly { id: string; requiredEvents: readonly string[] }[] = [snapshotSource]
// Explicit source policy: stamps are presentation, never access rules. Partial text remains readable.
const incompleteIds = new Set(['MIR-MESSAGES-2', 'MIR-MESSAGES-3', 'MIR-MESSAGES-4', 'MIR-GALLERY-2', 'MIR-MAPS-3'])
function recoveryPolicy(id: string, record: MirrorRecord): RecoveryPolicy {
  return { sourceId: snapshotSource.id, owner: 'daniel', episodeBoundary: 1,
    requiredEvents: [], provenance: 'unverified-snapshot', characterDisclosure: 'explicit-receipt-only',
    availability: record.lockId ? { kind: 'locked', prerequisite: 'password' }
      : ['MIR-FILES-4', 'MIR-PROTECTED-1'].includes(id) ? { kind: 'locked', prerequisite: 'missing-key' }
      : incompleteIds.has(id) ? { kind: 'incomplete', survivingText: true } : { kind: 'available' } }
}
/** IDs are append-only. Existing area ordering and legacy title-based inspection keys stay stable. */
export const mirrorCatalog: MirrorEntry[] = (Object.keys(mirrorRecords) as MirrorArea[]).flatMap(area =>
  mirrorRecords[area].map((record, index) => ({ ...record, area, index, id: `MIR-${area.toUpperCase()}-${index + 1}`, recovery: recoveryPolicy(`MIR-${area.toUpperCase()}-${index + 1}`, record) })))
export const mirrorEntry = (id: string) => mirrorCatalog.find(record => record.id === id)
export const inspectionKey = (record: MirrorEntry) => `${record.area}:${record.title}`

export const mirrorConnections = [
  { a: 'MIR-NOTES-1', b: 'MIR-INDEX-1', kind: 'Observation', text: 'The ordinary note asks for a source/revision comparison. The index reports 14 signed and 13 visible. Cause remains unknown; record the discrepancy separately in Archive Index.' },
  { a: 'MIR-MAIL-1', b: 'MIR-INDEX-1', kind: 'Hypothesis', text: 'The unsent audit draft may concern this count mismatch. Neither item authenticates the other.' },
  { a: 'MIR-MESSAGES-2', b: 'MIR-MAIL-2', kind: 'Observation', text: 'Both recovered records refer to an older public Bus 4 preview. This does not establish its chain of custody or link it to the 14/13 index count.' },
  { a: 'MIR-GALLERY-2', b: 'MIR-BROWSER-2', kind: 'Hypothesis', text: 'The surviving message caption and revision bookmark suggest checking originals. Their sources and relationship remain unverified.' },
  { a: 'MIR-MAPS-1', b: 'MIR-GALLERY-4', kind: 'Hypothesis', text: 'A saved place and recovered album description share a place label. No GPS, visit, route or timestamp is established.' },
  { a: 'MIR-NOTES-3', b: 'MIR-GALLERY-3', kind: 'Hypothesis', text: 'The optional revision note and fragment descriptions may concern the index count. Supplied visual fragments cannot authenticate the note or prove a deletion.' },
] as const
export const mirrorPairKey = (a: string, b: string) => [a, b].sort().join('|')

/** All six presentation assets are supplied; original forensic provenance is still unavailable. */
export const missingMirrorMedia: readonly { recordId: string; files: readonly string[]; detail: string }[] = []

export const availableMedia = [
  ...galleryMedia.map(media => ({ path: media.src, scope: `Supplied unverified Gallery visual prop / ${media.recordId}; original capture metadata and provenance unavailable.` })),
  { path: '/daniel-note.svg', scope: 'Authored photo-style prop received from Sophie; belongs to the live conversation, not Daniel\'s older snapshot.' },
  { path: '/e001-public-escort-row.svg', scope: 'Authored public E001 row extract; used by Bulletin. Not an original mirror Gallery photograph.' },
  { path: '/greyhaven-phone-wallpaper.png', scope: 'Decorative phone wallpaper; no evidentiary location or capture metadata.' },
  { path: '/greyhaven-wallpaper.svg', scope: 'Decorative wallpaper; not recovered evidence.' },
  { path: '/archive-mark.svg', scope: 'App identity artwork; not recovered evidence.' },
] as const

export const mirrorFolders: Partial<Record<MirrorArea, readonly string[]>> = {
  mail: ['All', 'Inbox', 'Sent', 'Drafts'], browser: ['All', 'History', 'Bookmarks'],
  maps: ['All', 'Saved', 'Searches', 'Routes'], calls: ['All', 'Missed', 'Incoming', 'Outgoing'],
  files: ['All', 'Records', 'Personal', 'Protected'],
}
export function recordFolder(record: MirrorEntry): string {
  if (record.area === 'mail') return record.index === 0 ? 'Drafts' : record.index === 2 ? 'Sent' : 'Inbox'
  if (record.area === 'browser') return record.index === 1 ? 'Bookmarks' : 'History'
  if (record.area === 'maps') return ['Saved', 'Searches', 'Routes'][record.index] ?? 'Saved'
  if (record.area === 'calls') return record.stamp.includes('MISSED') ? 'Missed' : record.stamp.includes('INCOMING') ? 'Incoming' : 'Outgoing'
  if (record.area === 'files') return record.index === 2 ? 'Personal' : record.index === 3 ? 'Protected' : 'Records'
  return 'Recovered'
}
export const relatedMirrorRecords: Record<string, string[]> = {
  'MIR-CONTACTS-1': ['MIR-MESSAGES-1', 'MIR-CALLS-1'],
  'MIR-CONTACTS-2': ['MIR-MESSAGES-2', 'MIR-MAIL-2'],
  'MIR-MAIL-1': ['MIR-INDEX-1'], 'MIR-MAIL-2': ['MIR-MESSAGES-2'],
  'MIR-FILES-2': ['MIR-INDEX-1'], 'MIR-GALLERY-3': ['MIR-NOTES-1'],
  'MIR-GALLERY-4': ['MIR-MAPS-1'], 'MIR-BROWSER-1': ['MIR-MAIL-2'],
}

export const mirrorUnavailableDescriptions = {
  locked: 'The key and original contents were not recovered. This container cannot be opened in Episode 01.',
  'recovery-pending': 'This record needs an established recovery source. A password cannot recover missing data.',
  'source-unavailable': 'The required backup or external source is unavailable. This snapshot cannot supply its contents.',
  'access-restricted': 'Access requires an explicit authorization receipt. This is separate from encryption or damaged data.',
  available: '', incomplete: '',
} as const
