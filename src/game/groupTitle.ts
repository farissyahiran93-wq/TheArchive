import type { GameSave } from './types'

export const isOldFriendsGroup = (save: GameSave) => save.prologue?.scene01?.masterScene01Revision === 4
export const groupTitle = (save: GameSave) => isOldFriendsGroup(save) ? 'Same Old Chaos' : 'FIND DANIEL'
