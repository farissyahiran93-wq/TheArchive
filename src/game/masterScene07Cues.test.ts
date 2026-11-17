import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import cues from '../content/scene07SubtitleCues.json'
import { ver1CallEnding, ver1CallTurns } from '../content/masterScene07Ver1'

describe('Scene 7 subtitle cues',()=>{
 it('covers each recorded clip in order with bounded, non-overlapping phrases',()=>{
  const texts=[...ver1CallTurns.map(turn=>turn.sophie),ver1CallEnding]
  expect(cues).toHaveLength(11)
  cues.forEach((clip,index)=>{
   const wav=readFileSync(`public/media/audio/scene07-ver1/call-${String(index+1).padStart(2,'0')}.wav`)
   const duration=(wav.length-44)/wav.readUInt32LE(28)
   expect(clip.map(c=>c.text).join(' ')).toBe(texts[index])
   clip.forEach((cue,i)=>{expect(cue.text.length).toBeLessThanOrEqual(70);expect(cue.start).toBeLessThan(cue.end);expect(cue.end).toBeLessThanOrEqual(duration+.1);if(i)expect(cue.start).toBeGreaterThanOrEqual(clip[i-1].end)})
  })
 })
})
