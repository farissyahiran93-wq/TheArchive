import { describe, expect, it } from 'vitest'
import { splitPhotoTranscript } from './photoTranscript'

describe('photo transcript compatibility',()=>{
 it('presents historical combined records separately without changing the saved messages',()=>{
  const saved=[{id:'photo',sender:'sophie',text:'A memory.',photo:'/photo.png',at:1}]
  const shown=splitPhotoTranscript(saved)
  expect(shown).toEqual([{...saved[0],text:''},{...saved[0],id:'photo-DIALOGUE',photo:undefined}])
  expect(saved).toEqual([{id:'photo',sender:'sophie',text:'A memory.',photo:'/photo.png',at:1}])
  expect(splitPhotoTranscript(shown)).toEqual(shown)
 })
})
