import { describe, expect, it } from 'vitest'
import { masterScene02V3Nodes } from '../content/masterScene02V3'
import { beginScene01, beginScene02, deliverScene01, draftGroupName, openScene03, scene01Invitation, sendScene01Choice } from './scene01'
import { eliGroupNodes } from '../content/masterScene02Eli'
import { prepareReplay } from './sceneLibrary'
import { phoneNotices } from './phonePresentation'
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
function joined(historical = true): GameSave {
  let save = settle(beginScene01({ ...newGame(), masterOpening: true }, 1000))
  for (let i = 0; i < 9; i++) save = settle(sendScene01Choice(save, 'a', '', true, 20000 + i * 1000))
  if (historical) save = { ...save, prologue: { ...save.prologue!, scene01: { ...save.prologue!.scene01!, masterScene02Revision: 2 } } }
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

describe('seven original friends in the revised Scene 2', () => {
  it.each(['a','b','c'])('delivers all ten decisions on route %s, with membership-scoped receipts and saved timing', option => {
    let save = beginScene02(joined(false), 60000)
    expect(save.prologue!.scene01!.groupMembers).toEqual({ sophie: true, maya: true, lucas: true, noah: true, ana: true, eli: true, daniel: true })
    const reload = (s: GameSave) => normalizeSave(JSON.parse(JSON.stringify(s)))
    const deadline = save.prologue!.scene01!.queue[0].dueAt
    expect(deliverScene01(reload(save), deadline - 1)).toEqual(save)
    save = settle(save)
    const sceneAtOpening=save.prologue!.scene01!
    save={...save,prologue:{...save.prologue!,scene01:{...sceneAtOpening,groupPresence:{...sceneAtOpening.groupPresence!,eli:false}}}}
    const notices = phoneNotices(save).filter(n => n.thread === 'group')
    for (const who of ['noah','ana','eli']) expect(notices.some(n => n.avatar === who && n.title === 'Same Old Chaos')).toBe(true)
    for (let i = 1; i <= 10; i++) {
      const id = 'TA-S02-ELI-C' + String(i).padStart(2,'0')
      const node = eliGroupNodes[id]
      expect(save.prologue!.scene01!.nodeId).toBe(id)
      if (node.kind !== 'choice') throw Error('Missing decision ' + id)
      expect(node.choices.map(c => c.id)).toEqual(['a','b','c'])
      save = settle(reload(sendScene01Choice(save, option, '', true, 1000000 * i)))
      if(i===2 && option==='a')save=settle(sendScene01Choice(save,'continue','',true,2100000))
      const eventId = id + '-PLAYER-' + option
      expect(save.prologue!.scene01!.groupReceipts!.filter(r => r.eventId === eventId).map(r => r.recipient)).toEqual(i <= 9 ? ['sophie','maya','lucas','noah','ana','eli'] : ['sophie','maya','noah','ana','eli'])
      expect(save.prologue!.scene01!.groupMessages.find(m => m.id === id + '-' + option + '-1')).toBeDefined()
    }
    const scene = save.prologue!.scene01!
    expect(scene.groupMessages.filter(m => m.sender === 'system' && m.text === 'Lucas left the group.')).toHaveLength(1)
    expect(scene.groupMessages.filter(m => m.sender === 'player')).toHaveLength(option === "a" ? 11 : 10)
    expect(scene.groupMessages.map(m => m.text).join(' ')).not.toContain('FIND DANIEL')
    expect(scene.groupMembers?.lucas).toBe(false)
    expect(save.knowledge.characters.daniel).toEqual([])
    if (option === 'a') expect(save.relationships.noah.affinity).toBe(1)
    if (option === 'b') expect(save.relationships.ana.trust).toBe(1)
    expect(scene.privateScene03).toBeUndefined()
    expect(openScene03(reload(save)).prologue!.scene01!.privateScene03?.reading).toBe(true)
  })
  it('keeps a historical cursor on Continue and starts the revised opening on explicit replay', () => {
    const original = beginScene02(joined(true), 50000)
    const old = JSON.parse(JSON.stringify(original))
    delete old.knowledge.characters.noah
    delete old.relationships.ana
    const resumed = normalizeSave(old)
    expect(resumed.prologue!.scene01!.masterScene02Revision).toBe(2)
    expect(settle(resumed).prologue!.scene01!.groupMessages).toEqual(settle(original).prologue!.scene01!.groupMessages)
    const replay = prepareReplay({save: resumed,capturedAt: 50000}, 90000, 2)
    expect(replay.prologue!.scene01!.masterScene02Revision).toBe(4)
    expect(replay.prologue!.scene01!.groupMessages).toHaveLength(1)
    expect(settle(replay).prologue!.scene01!.nodeId).toBe('TA-S02-ELI-C01')
    expect(original.prologue!.scene01!.queue[0].id).toBe('TA-S02-V3-NAME-OPEN-1')
  })

  it.each([1, 2, 3, 4] as const)('resumes the pending Scene 2 message on revision %i and repeatedly replays it as V4', revision => {
    const base=joined(false)
    const original=beginScene02({...base,prologue:{...base.prologue!,scene01:{
      ...base.prologue!.scene01!,masterScene01Revision:revision===1?3:4,masterScene02Revision:revision,
    }}},50000)
    const scene=original.prologue!.scene01!
    expect(scene.masterScene02Revision).toBe(revision)
    const resumed=normalizeSave(JSON.parse(JSON.stringify(original)))
    expect(resumed.prologue!.scene01).toEqual(scene)
    expect(settle(resumed).prologue!.scene01!.groupMessages).toEqual(settle(original).prologue!.scene01!.groupMessages)
    const checkpoint={save:original,capturedAt:50000}
    const first=settle(prepareReplay(checkpoint,90000,2))
    const second=settle(prepareReplay(checkpoint,90000,2))
    expect(second).toEqual(first)
    expect(first.prologue!.scene01!.groupMembers).toEqual({sophie:true,maya:true,lucas:true,noah:true,ana:true,eli:true,daniel:true})
    expect(first.prologue!.scene01!.groupMessages.filter(line=>line.id==='TA-S02-PLAYER-JOINED')).toHaveLength(1)
    expect(first.prologue!.scene01!.nodeId).toBe('TA-S02-ELI-C01')
  })
})
