import { describe, expect, it } from 'vitest'
import { masterScene01V3Nodes } from '../content/masterScene01V3'
import { newGame, type GameSave } from './types'
import { normalizeSave } from './engine'
import { beginScene01, deliverScene01, scene01Choices, scene01Invitation, sendScene01Choice } from './scene01'
function drain(state: GameSave): GameSave {
  for (let i = 0; i < 100 && state.prologue?.scene01?.queue.length; i++) state = deliverScene01(state, state.prologue.scene01.queue[0].dueAt)
  return state
}
describe('Scene 1 V3', () => {
  it('plays every choice with saved replies and a voluntary invitation', () => {
    for (let branch = 0; branch < 3; branch++) {
      let s = drain(beginScene01({ ...newGame(), masterOpening: true }, 1000))
      for (let beat = 1; beat <= 9; beat++) {
        const choices = scene01Choices(s)
        expect(choices).toHaveLength(3)
        if (beat === 3) {
          const lines = s.prologue!.scene01!.messages
          expect(lines.findIndex(x => x.id === 'TA-S01-FAMILY-PHOTO')).toBeLessThan(lines.findIndex(x => x.id === 'TA-S01-V3-PHOTO-CAPTION'))
          expect(s.prologue!.scene01!.familyPhotoReply).toBeUndefined()
        }
        const choice = choices[branch], response = masterScene01V3Nodes[choice.next]
        expect(response.kind).toBe('npc')
        s = drain(sendScene01Choice(s, choice.id, '', true, beat * 10000))
        if (response.kind === 'npc') expect(s.prologue!.scene01!.messages.some(x => x.id === response.id && x.text === response.text)).toBe(true)
        s = normalizeSave(JSON.parse(JSON.stringify(s)))
      }
      expect(s.prologue!.scene01!.complete).toBe(false)
      if (branch === 2) { expect(s.prologue!.scene01!.invitation).toBe('declined'); s = scene01Invitation(s, 'accept') }
      s = scene01Invitation(s, 'join')
      expect(s.prologue!.scene01!.complete).toBe(true)
    }
  })
})

it('keeps the starred-number discussion curious before boundaries and adds a reflective pause', () => {
  const node = masterScene01V3Nodes['TA-S01-V3-C07']
  expect(node.kind).toBe('choice')
  if (node.kind !== 'choice') throw Error('Missing choice')
  expect(node.choices.map(c => c.text)).toEqual([
    "You didn't bother me. I just want to understand why my number is there.",
    'Did Daniel actually save my number, or was it just in that file?',
    "I don't recognize Daniel, Sophie. I don't want to give you false hope.",
  ])
  expect(masterScene01V3Nodes['TA-S01-V3-REFLECTIVE-PAUSE']).toMatchObject({ kind: 'wait', typing: true })
  expect(masterScene01V3Nodes['TA-S01-V3-AFTER-07-3']).toMatchObject({ text: 'His fiancée, Maya. And his best friend, Lucas.' })
  expect(masterScene01V3Nodes['TA-S01-V3-C08']).toMatchObject({ kind: 'choice' })
})
