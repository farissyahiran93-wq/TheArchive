/** Released route for newly tagged saves; untagged saves retain their historical scene registry. */
import { chapter1ScenePlan } from './chapter1Plan'

export const chapter1V2 = {
  revision: 'ch01-v2-10',
  status: 'released',
  title: 'THE MISSING ENTRY',
  nextChapterTitle: 'THE PEOPLE HE LEFT BEHIND',
  scenes: [
    { number: 1, id: 'OPEN-S01', title: 'A Message from Sophie', act: 1, content: 'preserve' },
    { number: 2, id: 'ch01_sc02_uninvited_guest', title: 'The Uninvited Guest', act: 1, content: 'preserve' },
    { number: 3, id: 'ch01_sc03_just_between_us', title: 'Just Between Us', act: 1, content: 'preserve' },
    { number: 4, id: 'ch01_sc04_the_public_story', title: 'The Public Story', act: 2, content: 'preserve-and-close-article-arc' },
    { number: 5, id: 'ch01_sc05_an_older_copy', title: 'Version History', act: 2, content: 'preserve-and-close-article-arc' },
    { number: 6, id: 'ch01_sc06_the_missing_line', title: 'The Corrections Desk', act: 2, content: 'preserve-and-close-article-arc' },
    { number: 7, id: 'ch01v2_sc07_starred_number', title: 'The Starred Number', act: 3, content: 'playable' },
    { number: 8, id: 'ch01v2_sc08_last_check_in', title: 'The Last Check-In', act: 3, content: 'playable' },
    { number: 9, id: 'ch01v2_sc09_secondary_card', title: 'The Secondary Card', act: 3, content: 'playable' },
    { number: 10, id: 'ch01v2_sc10_inventory_sheet', title: 'The Inventory Sheet', act: 4, content: 'playable' },
  ],
} as const

export type Chapter1V2SceneId = typeof chapter1V2.scenes[number]['id']

/** Deterministic editorial disposition; this does not migrate or mutate a save. */
export const chapter1V2LegacyMap = chapter1ScenePlan.map(scene => ({
  oldNumber: scene.number,
  oldId: scene.id,
  disposition: scene.number <= 6 ? 'same-main-scene' : scene.number <= 10 ? 'secondary-investigation' : 'historical-only-review',
  v2SceneId: scene.number <= 6 ? chapter1V2.scenes[scene.number - 1].id : undefined,
}))
