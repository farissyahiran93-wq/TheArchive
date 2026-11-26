import { masterChapterMetadata } from '../content/masterChapterMetadata'
import type { GameSave } from './types'
import { developmentToolsEnabled } from './development'

const chapterOneCheckpointIds = [
  'OPEN-S01', 'ch01_sc02_uninvited_guest', 'ch01_sc03_just_between_us',
  'ch01_sc04_the_public_story', 'ch01_sc05_an_older_copy', 'ch01_sc06_the_missing_line',
  'ch01v2_sc07_starred_number', 'ch01v2_sc08_last_check_in',
  'ch01v2_sc09_secondary_card', 'ch01v2_sc10_inventory_sheet',
] as const

export const campaign = masterChapterMetadata.map(chapter => ({
  ...chapter,
  id: `chapter-${chapter.number}`,
  playable: chapter.number === 1,
  recoveryPercent: chapter.number * 20,
  scenes: chapter.scenes.map(scene => ({
    ...scene,
    id: chapter.number === 1 ? chapterOneCheckpointIds[scene.number - 1] : `chapter-${chapter.number}-scene-${scene.number}`,
  })),
}))

const mode = import.meta.env?.MODE
export const compatibilityFixturesEnabled = developmentToolsEnabled && (mode === 'compatibility-qa' || mode === 'test'
  || (typeof window === 'undefined' && typeof process !== 'undefined' && process.env.ARCHIVE_COMPATIBILITY_FIXTURES === '1'))
export const isLegacyOpeningFixture = () => compatibilityFixturesEnabled && typeof location !== 'undefined' && new URLSearchParams(location.search).has('legacyopening')

/** Campaign identity is separate from dialogue revision. Older dialogue can resume in this campaign. */
export function canContinueCampaign(save: GameSave) {
  const scene = save.prologue?.scene01
  if (save.chapter2Access || save.e01) return false
  return scene ? scene.masterScene01 === true : save.masterOpening === true && !save.player && !save.prologue && !save.chapter1
}
