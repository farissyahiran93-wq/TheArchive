import { describe, expect, it } from 'vitest'
import { chapter1V2, chapter1V2LegacyMap } from '../content/chapter1V2'
import { chapterLibrary, chapterLibraryForSave } from './sceneLibrary'
import { newGame } from './types'

describe('released Chapter 1 v2 contract', () => {
  it('defines exactly ten ordered, unique main scenes and preserves the Chapter 2 title', () => {
    expect(chapter1V2.status).toBe('released')
    expect(chapter1V2.scenes.map(scene => scene.number)).toEqual([1,2,3,4,5,6,7,8,9,10])
    expect(new Set(chapter1V2.scenes.map(scene => scene.id)).size).toBe(10)
    expect(chapter1V2.scenes.map(scene => scene.act)).toEqual([1,1,1,2,2,2,3,3,3,4])
    expect(chapter1V2.scenes.map(scene => scene.title)).toEqual(['A Message from Sophie','The Uninvited Guest','Just Between Us','The Public Story','Version History','The Corrections Desk','The Starred Number','The Last Check-In','The Secondary Card','The Inventory Sheet'])
    expect(chapter1V2.nextChapterTitle).toBe('THE PEOPLE HE LEFT BEHIND')
  })
  it('maps all eighteen old planning identities without treating changed scenes as completed v2 scenes', () => {
    expect(chapter1V2LegacyMap.map(row => row.oldNumber)).toEqual(Array.from({length:18},(_,i)=>i+1))
    expect(chapter1V2LegacyMap.slice(0,6).map(row=>row.v2SceneId)).toEqual(chapter1V2.scenes.slice(0,6).map(scene=>scene.id))
    expect(chapter1V2LegacyMap.slice(6).every(row=>row.v2SceneId===undefined)).toBe(true)
    expect(chapter1V2LegacyMap.slice(6,10).every(row=>row.disposition==='secondary-investigation')).toBe(true)
    expect(chapter1V2LegacyMap.slice(10).every(row=>row.disposition==='historical-only-review')).toBe(true)
  })
  it('keeps the historical registry for untagged saves and selects ten v2 scenes only for tagged saves', () => {
    expect(chapterLibrary[0].scenes.slice(6).map(scene=>scene.title)).toEqual(['The Byline','The Missing Issuer','The Transfer Register','The Inventory Sheet'])
    expect(chapterLibraryForSave(newGame())[0].scenes.slice(6).map(scene=>scene.title)).toEqual(['The Byline','The Missing Issuer','The Transfer Register','The Inventory Sheet'])
    expect(chapterLibraryForSave({...newGame(),chapter1Edition:'ch01-v2-10'})[0].scenes.map(scene=>scene.title)).toEqual(chapter1V2.scenes.map(scene=>scene.title))
  })
})
