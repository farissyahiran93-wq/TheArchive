import { describe, expect, it } from 'vitest'
import { scene01Nodes } from '../content/scene01'
import { beginLegacyScene01 as beginScene01, deliverScene01, openScene03, resumeScene02, scene01Choices, scene01Invitation, sendScene01Choice } from './scene01'
import { newGame, type GameSave } from './types'
import { normalizeSave } from './engine'
import { phoneNotices, openingPresence } from './phonePresentation'

const time = 1_800_000_000_000
function settle(save: GameSave, stopHandoff = false) {
  for (let i = 0; i < 200; i++) {
    const queued = save.prologue?.scene01?.queue[0]
    if (!queued || stopHandoff && queued.id === 'OPEN-S03-FIRST-MESSAGE') return save
    const playerCount = save.prologue!.scene01!.groupMessages.filter(line => line.sender === 'player').length
    save = deliverScene01(save, queued.dueAt)
    expect(save.prologue!.scene01!.groupMessages.filter(line => line.sender === 'player')).toHaveLength(playerCount)
  }
  throw new Error('Queue did not settle')
}
function now(save: GameSave) { return Math.max(time, ...save.prologue!.scene01!.messages.map(line => line.at), ...save.prologue!.scene01!.groupMessages.map(line => line.at)) + 100 }
function reply(save: GameSave, id: string) { return settle(sendScene01Choice(save, id, 'Rae', true, now(save)), true) }
function at(target: string, picks: Record<string, string> = {}, visited: string[] = []) {
  let save = settle(beginScene01(newGame(), time))
  for (let i = 0; i < 120; i++) {
    const scene = save.prologue!.scene01!, node = scene01Nodes[scene.nodeId]
    if (node.kind === 'choice' && node.number === target) return save
    if (node.kind === 'choice') {
      if (node.number) visited.push(node.number)
      save = reply(save, node.number ? picks[node.number] ?? 'a' : 'continue')
    } else if (scene.invitation === 'ready') save = settle(scene01Invitation(save, 'join', now(save)))
    else throw new Error(`No route at ${scene.nodeId}`)
  }
  throw new Error('No target')
}
function sendBranch(save: GameSave, id: string) {
  save = reply(save, id)
  while (scene01Choices(save)[0]?.id === 'continue') save = reply(save, 'continue')
  return save
}

describe('Scene 01 → complete Scene 02 → persisted Scene 03 handoff', () => {
  it('plays all fourteen first-contact and thirteen group decisions with explicit Send, then waits exactly 5.5 seconds', () => {
    const visited: string[] = []
    let save = at('G13', {}, visited)
    expect(visited).toEqual([...Array.from({ length: 14 }, (_, i) => String(i + 1).padStart(2,'0')), ...Array.from({ length: 12 }, (_, i) => `G${String(i + 1).padStart(2,'0')}`)])
    expect(save.prologue!.scene01!.groupComplete).not.toBe(true)
    expect(deliverScene01(save, Number.MAX_SAFE_INTEGER)).toBe(save)
    save = sendBranch(save, 'a')
    const scene = save.prologue!.scene01!
    expect(scene.groupComplete).toBe(true)
    expect(scene.lucasLeftGroup).toBe(true)
    expect(scene.groupMembers).toEqual({ sophie: true, maya: true, lucas: false })
    expect(scene.groupPresence).toEqual({ sophie: false, maya: false, lucas: false })
    expect(scene.groupMessages.at(-2)?.text).toBe("I'm sorry about all of this.")
    expect(scene.groupMessages.at(-1)?.text).toBe('Sophie is offline.')
    expect(scene.privateHandoff!.dueAt - scene.groupMessages.at(-2)!.at).toBe(5500)
    expect(scene.privateHandoff!.deliveredAt).toBeUndefined()
    expect(openingPresence(save, 'sophie')).toBe('offline')
    expect(deliverScene01(save, scene.privateHandoff!.dueAt - 1)).toBe(save)
    const loaded = normalizeSave(JSON.parse(JSON.stringify(save)))
    save = deliverScene01(loaded, scene.privateHandoff!.dueAt)
    expect(save.prologue!.scene01!.messages.at(-1)?.text).toBe('Hey.')
    expect(openingPresence(save, 'sophie')).toBe('online')
    expect(save.prologue!.scene01!.privateHandoff!.openedAt).toBeUndefined()
    expect(save.deliveredEvents).not.toContain('OPEN-S03-ACTIVATED')
    expect(phoneNotices(save).filter(notice => notice.id === 'OPEN-S03-FIRST-MESSAGE')).toHaveLength(1)
    expect(deliverScene01(save, Number.MAX_SAFE_INTEGER)).toBe(save)
    save = openScene03(save, scene.privateHandoff!.dueAt + 1000)
    expect(save.deliveredEvents.filter(id => id === 'OPEN-S03-ACTIVATED')).toHaveLength(1)
    expect(openScene03(save)).toBe(save)
    expect(normalizeSave(JSON.parse(JSON.stringify(save)))).toEqual(save)
    expect(save.evidence).toEqual({})
    expect(save.e01).toBeUndefined()
    expect(save.prologue!.scene01!.messages.filter(line => line.id.startsWith('OPEN-S03-'))).toHaveLength(1)
  })
  it.each(['a','b','c','d','e'])('Lucas leaves once on choice 11%s because of the common conflict, retaining his history', id => {
    const before = at('G11')
    const save = sendBranch(before, id), scene = save.prologue!.scene01!
    expect(scene.nodeId).toBe('OPEN-S02-C12')
    expect(scene.lucasLeftGroup).toBe(true)
    expect(scene.groupMembers!.lucas).toBe(false)
    expect(scene.groupMessages.filter(line => line.text === 'Lucas left the group.')).toHaveLength(1)
    for (const line of before.prologue!.scene01!.groupMessages) expect(scene.groupMessages.some(item => item.id === line.id)).toBe(true)
    expect(scene.groupMessages.filter(line => line.text === 'Maya deleted a message.')).toHaveLength(2)
    const leave = scene.groupMessages.findIndex(line => line.text === 'Lucas left the group.')
    expect(scene.groupMessages.slice(leave + 1).some(line => line.sender === 'lucas')).toBe(false)
    expect(scene.groupMessages.filter(line => line.text === 'Maya deleted a message.').every(line => Object.keys(line).sort().join() === 'at,id,sender,text')).toBe(true)
    expect(normalizeSave(JSON.parse(JSON.stringify(save)))).toEqual(save)
    expect(deliverScene01(save, Number.MAX_SAFE_INTEGER)).toBe(save)
  })
  it('does not give later group replies to departed Lucas or offline Maya and never shares a private codename', () => {
    const save = sendBranch(at('G12'), 'a'), scene = save.prologue!.scene01!
    const id = 'OPEN-S02-C12-PLAYER-a'
    expect(scene.groupReceipts!.filter(receipt => receipt.eventId === id).map(receipt => receipt.recipient)).toEqual(['sophie'])
    expect(save.knowledge.characters.maya).not.toContain('OPEN-S01-PLAYER-CODENAME')
    expect(save.knowledge.characters.lucas).not.toContain('OPEN-S01-PLAYER-CODENAME')
    const lucasNode = Object.values(scene01Nodes).find(node => node.kind === 'npc' && node.sender === 'lucas')!
    const injected = { ...save, prologue: { ...save.prologue!, scene01: { ...scene, queue: [{ id: lucasNode.id, dueAt: time, typing: true }] } } }
    expect(deliverScene01(injected, time).prologue!.scene01!.groupMessages).toEqual(scene.groupMessages)
  })
  it.each(['a','b','c','d'])('resumes an old completed 08%s boundary without resetting history or repeating its effects', id => {
    let save = sendBranch(at('G08'), id)
    const scene = save.prologue!.scene01!
    const keep = (eventId: string) => !eventId.startsWith('OPEN-S02-AFTER-08-') && !(id === 'd' && eventId.startsWith('OPEN-S02-C08-d-'))
    save = { ...save, deliveredEvents: save.deliveredEvents.filter(keep), prologue: { ...save.prologue!, scene01: { ...scene, nodeId: 'OPEN-S02-SOURCE-BOUNDARY', queue: [], groupSourceBoundary: true, groupMessages: scene.groupMessages.filter(line => keep(line.id)), groupReceipts: scene.groupReceipts?.filter(receipt => keep(receipt.eventId)) } } }
    const relationships = save.relationships, oldLines = save.prologue!.scene01!.groupMessages
    save = settle(resumeScene02(normalizeSave(JSON.parse(JSON.stringify(save))), time + 100_000))
    expect(save.prologue!.scene01!.nodeId).toBe('OPEN-S02-C09')
    expect(save.relationships).toEqual(relationships)
    for (const line of oldLines) expect(save.prologue!.scene01!.groupMessages.some(item => item.id === line.id)).toBe(true)
    expect(save.prologue!.scene01!.groupMessages.filter(line => line.text === 'Finally.' && line.id.startsWith('OPEN-S02-C08-d-'))).toHaveLength(id === 'd' ? 1 : 0)
    expect(resumeScene02(save)).toBe(save)
  })
  it('rejects malformed handoff metadata and cannot activate an undelivered private message', () => {
    const save = sendBranch(at('G13'), 'a')
    expect(openScene03(save)).toBe(save)
    const broken = JSON.parse(JSON.stringify(save))
    broken.prologue.scene01.privateHandoff.openedAt = time
    expect(() => normalizeSave(broken)).toThrow('Invalid Scene 01 progress')
  })
  it('delivers an overdue handoff once when a persisted closed app resumes', () => {
    let save = sendBranch(at('G13'), 'a')
    const dueAt = save.prologue!.scene01!.privateHandoff!.dueAt
    save = normalizeSave(JSON.parse(JSON.stringify(save)))
    save = deliverScene01(save, dueAt + 86_400_000)
    expect(save.prologue!.scene01!.privateHandoff!.deliveredAt).toBe(dueAt + 86_400_000)
    expect(save.prologue!.scene01!.privateHandoff!.openedAt).toBeUndefined()
    expect(save.prologue!.scene01!.messages.filter(line => line.id === 'OPEN-S03-FIRST-MESSAGE')).toHaveLength(1)
    expect(deliverScene01(save, dueAt + 172_800_000)).toBe(save)
  })
  it.each([
    { point: 'G09', id: 'd', deltas: { sophie: { trust: 2 }, maya: { trust: 2 } } },
    { point: 'G09', id: 'e', deltas: { sophie: { trust: 2 }, maya: { trust: 3 } } },
    { point: 'G10', id: 'b', deltas: { lucas: { suspicion: 3 } } },
    { point: 'G10', id: 'c', deltas: { lucas: { suspicion: -2 } } },
    { point: 'G11', id: 'd', deltas: { lucas: { suspicion: 3 } } },
    { point: 'G11', id: 'e', deltas: { lucas: { suspicion: -3 }, maya: { trust: 2 } } },
    { point: 'G12', id: 'e', deltas: { sophie: { trust: 3, affinity: 2 } } },
  ])('applies the exact authored relationship delta once at $point$id', ({ point, id, deltas }) => {
    const before = at(point)
    const save = sendBranch(before, id)
    for (const actor of ['sophie','maya','lucas'] as const) for (const key of ['trust','affinity','suspicion','romance'] as const) {
      const delta = (deltas as Partial<Record<typeof actor, Partial<Record<typeof key, number>>>>)[actor]?.[key] ?? 0
      expect(save.relationships[actor][key] - before.relationships[actor][key]).toBe(delta)
    }
    const loaded = normalizeSave(JSON.parse(JSON.stringify(save)))
    expect(loaded.deliveredEvents.filter(event => event === `OPEN-S02-EFFECT-${point.slice(1)}-${id}`)).toHaveLength(1)
    expect(deliverScene01(loaded, Number.MAX_SAFE_INTEGER)).toBe(loaded)
  })
})
