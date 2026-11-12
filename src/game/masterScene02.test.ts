import { describe, expect, it } from 'vitest'
import { masterScene02V3Nodes } from '../content/masterScene02V3'
import { beginScene01, beginScene02, deliverScene01, draftGroupName, openScene03, scene01Invitation, sendScene01Choice } from './scene01'
import { normalizeSave } from './engine'
import { newGame, type GameSave } from './types'

function settle(save: GameSave): GameSave {
  for (let n = 0; n < 100; n++) {
    const queued = save.prologue?.scene01?.queue[0]
    if (!queued) return save
    save = deliverScene01(save, queued.dueAt)
  }
  throw Error('Queue did not settle')
}
function joined(): GameSave {
  let save = settle(beginScene01({ ...newGame(), masterOpening: true }, 1000))
  for (let i = 0; i < 9; i++) save = settle(sendScene01Choice(save, 'a', '', true, 20000 + i * 1000))
  return scene01Invitation(save, 'join')
}
describe('master Scene 2', () => {
  it.each(['a', 'b', 'c'])('requires typing and sending the chosen introduction %s to group members', (option) => {
    let save = settle(beginScene02(joined(), 40000))
    expect(save.prologue!.scene01!.nodeId).toBe('TA-S02-V3-NAME-CHOICE')
    expect(save.prologue!.scene01!.groupMembers?.daniel).toBe(true)
    expect(sendScene01Choice(save, option, '', true, 41000)).toEqual(save)
    save = normalizeSave(JSON.parse(JSON.stringify(draftGroupName(save, 'Alex'))))
    expect(save.prologue!.scene01!.groupNameDraft).toBe('Alex')
    expect(save.player?.name).not.toBe('Alex')
    save = settle(sendScene01Choice(save, option, 'Alex', true, 41000))
    expect(save.player?.name).toBe('Alex')
    expect(save.prologue!.scene01!.groupNameDraft).toBeUndefined()
    expect(save.prologue!.scene01!.groupMessages.some(m => m.sender === 'player' && m.text.includes('Alex'))).toBe(true)
    expect(save.messages.filter(m => m.sender === 'player' && m.text.includes('Alex')).map(m => m.recipient).sort()).toEqual(['lucas','maya','sophie'])
    expect(save.prologue!.scene01!.groupMessages.some(m => m.text === 'Thank you, Alex. I should have asked before.')).toBe(true)
  })
  it('requires joining and traverses every option with source-scoped departure and DM handoff', () => {
    expect(beginScene02(newGame()).prologue).toBeUndefined()
    for (let selectedBeat = 1; selectedBeat <= 9; selectedBeat++) for (const selected of ['a', 'b', 'c']) {
      let save = settle(beginScene02(joined(), 40000))
      save = settle(sendScene01Choice(save, 'c', 'Alex', true, 41000))
      for (let beat = 1; beat <= 9; beat++) {
        const id = `TA-S02-C${String(beat).padStart(2, '0')}`, node = masterScene02V3Nodes[id]
        expect(save.prologue!.scene01!.nodeId).toBe(id)
        expect(node.kind).toBe('choice')
        if (node.kind !== 'choice') throw Error('Missing choice')
        expect(node.choices).toHaveLength(3)
        const choice = node.choices.find(c => c.id === (beat === selectedBeat ? selected : 'a'))!
        const response = masterScene02V3Nodes[choice.next]
        if (beat < 9) expect(save.prologue!.scene01!.groupMembers!.lucas).toBe(true)
        save = settle(sendScene01Choice(save, choice.id, '', true, 50000 + beat * 1000))
        if (response.kind === 'npc') expect(save.prologue!.scene01!.groupMessages.some(m => m.id === response.id && m.text === response.text)).toBe(true)
        save = normalizeSave(JSON.parse(JSON.stringify(save)))
      }
      const scene = save.prologue!.scene01!
      expect(scene.groupMembers!.lucas).toBe(false)
      expect(scene.groupMembers!.daniel).toBe(true)
      expect(scene.groupReceipts?.some(receipt => String(receipt.recipient) === 'daniel')).toBe(false)
      expect(scene.groupMessages.filter(m => m.text === 'Lucas Grey left the group.')).toHaveLength(1)
      expect(scene.groupMessages.some(m => m.sender === 'lucas')).toBe(true)
      expect(scene.privateHandoff?.deliveredAt).toBeDefined()
      expect(save.deliveredEvents).toContain('TA-S02-SCENE03-UNLOCKED')
      expect(scene.messages.filter(m => m.id === 'TA-S03-FIRST-MESSAGE')).toHaveLength(1)
      expect(scene.privateScene03).toBeUndefined()
      expect(openScene03(save).prologue!.scene01!.privateScene03?.reading).toBe(true)
    }
  })
})
