import type { GameSave } from './types'

export type BoardSourceId = 'E001' | 'E002' | 'E003' | 'E012'

export const boardSources: { id: BoardSourceId; title: string; custodian: string; scope: string }[] = [
  { id: 'E001', title: 'Older Bus 4 preview', custodian: 'Memory Project public crop', scope: 'Cropped image; the original audit is not held here.' },
  { id: 'E002', title: 'Current Bus 4 copy', custodian: 'Greyhaven civic portal', scope: 'Public redacted v2; resident details are withheld.' },
  { id: 'E003', title: 'Revision notice', custodian: 'Greyhaven civic portal', scope: 'Public reason and approval date; publication is a separate event.' },
  { id: 'E012', title: 'Four-page GCRO export', custodian: 'Fictional GCRO issue to this request session', scope: 'Redacted, requester-only copy; never automatically sent to Maya.' },
]

export function boardSourceStatus(save: GameSave, id: BoardSourceId): 'locked' | 'collected' | 'verified' {
  if (id === 'E001') return save.evidence.E001 ? 'collected' : 'locked'
  if (id === 'E002') return save.evidence.E002 ? 'collected' : 'locked'
  if (id === 'E003') return save.deliveredEvents.includes('EV-E01-S20-NOTICE') ? 'collected' : 'locked'
  if (!save.deliveredEvents.includes('R04')) return save.e01?.s27Status === 'issued' ? 'collected' : 'locked'
  return 'verified'
}

export function boardPairKey(a: BoardSourceId, b: BoardSourceId): string {
  return [a,b].sort().join('|')
}

const allowedPairs = new Set(['E001|E002','E002|E012','E003|E012'])

export function canBoardLink(save: GameSave, a: BoardSourceId, b: BoardSourceId): boolean {
  return a !== b && allowedPairs.has(boardPairKey(a,b)) && boardSourceStatus(save,a) !== 'locked' && boardSourceStatus(save,b) !== 'locked' && ((a !== 'E012' && b !== 'E012') || boardSourceStatus(save,'E012') === 'verified')
}

export function boardPairFeedback(save: GameSave, a: BoardSourceId, b: BoardSourceId): string {
  if (a === b) return 'Choose two different sources.'
  if (boardSourceStatus(save,a) === 'locked' || boardSourceStatus(save,b) === 'locked') return 'Open both sources in the case before linking them.'
  if (!allowedPairs.has(boardPairKey(a,b))) return 'These sources do not establish a direct comparison. Keep the question open.'
  if ((a === 'E012' || b === 'E012') && boardSourceStatus(save,'E012') !== 'verified') return 'The GCRO issue must pass all four checks before its lineage can support a link.'
  return 'These sources can be placed together. The link is a private working note, not a new verified fact.'
}

export function linkBoardPair(save: GameSave, a: BoardSourceId, b: BoardSourceId): GameSave {
  if (!save.e01 || !canBoardLink(save,a,b)) return save
  const key = boardPairKey(a,b)
  if (save.e01.boardLinks?.includes(key)) return save
  return { ...save, e01: { ...save.e01, boardLinks: [...(save.e01.boardLinks ?? []),key] } }
}

export function unlinkBoardPair(save: GameSave, key: string): GameSave {
  if (!save.e01?.boardLinks?.includes(key)) return save
  return { ...save, e01: { ...save.e01, boardLinks: save.e01.boardLinks.filter(item => item !== key) } }
}
