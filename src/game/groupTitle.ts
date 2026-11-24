import type { GameSave, GroupSpeaker, OpeningState } from './types'

export const isOldFriendsGroup = (save: GameSave) => save.prologue?.scene01?.masterScene01Revision === 4 || (save.prologue?.scene01?.masterScene02Revision ?? 0) >= 3
export const groupTitle = (save: GameSave) => isOldFriendsGroup(save) ? 'Same Old Chaos' : 'FIND DANIEL'

export function groupSpeakers(scene?: OpeningState['scene01']): GroupSpeaker[] {
  const original: GroupSpeaker[] = ['sophie', 'maya', 'lucas']
  return scene?.masterScene02Revision === 4 ? [...original,'noah','ana','eli'] : scene?.masterScene02Revision === 3 ? [...original, 'noah', 'ana'] : original
}
