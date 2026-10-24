import { describe, expect, it } from 'vitest'
import { scene01Nodes } from '../content/scene01'
import { scene02Id, scene02Nodes } from '../content/scene02'
import { beginLegacyScene01 as beginScene01, beginScene02, deliverScene01, scene01Choices, sendScene01Choice } from './scene01'
import { newGame, type GameSave } from './types'
import { normalizeSave } from './engine'
import { phoneNotices, openingPresence } from './phonePresentation'

function settle(save: GameSave): GameSave {
  for (let i = 0; i < 160; i++) {
    const due = save.prologue?.scene01?.queue[0]?.dueAt
    if (due === undefined) return save
    const players = save.prologue!.scene01!.groupMessages.filter(line => line.sender === 'player').length
    save = deliverScene01(save, due)
    expect(save.prologue!.scene01!.groupMessages.filter(line => line.sender === 'player')).toHaveLength(players)
  }
  throw new Error('Queue did not settle')
}
function start() {
  const save = beginScene01({ ...newGame(), player: { name: 'SECRET-NAME' } }, 1000)
  return settle(beginScene02({ ...save, prologue: { ...save.prologue!, scene01: { ...save.prologue!.scene01!, invitation: 'joined', disclosedName: 'SECRET-NAME', nameDisclosed: true } } }, 2000))
}
function reply(save: GameSave, id: string, premium = true) { return settle(sendScene01Choice(save, id, '', premium, 100_000)) }
function at(number: string, picks: Record<string, string> = {}) {
  let save = start()
  for (let i = 0; i < 80; i++) {
    const node = scene01Nodes[save.prologue!.scene01!.nodeId]
    if (node.kind === 'choice' && node.number === `G${number}`) return save
    if (node.kind !== 'choice') throw new Error('Unexpected source boundary')
    save = reply(save, node.number ? picks[node.number] ?? 'a' : 'continue')
  }
  throw new Error('No target')
}

describe('Scene 02 replaces the group from its beginning', () => {
  it('has thirteen main choices with four free options and one premium only at selected points', () => {
    const choices = Object.values(scene02Nodes).filter(node => node.kind === 'choice' && node.number)
    expect(choices).toHaveLength(13)
    for (const node of choices) if (node.kind === 'choice') expect(node.choices.filter(option => !option.premiumChoice)).toHaveLength(4)
    expect(choices.filter(node => node.kind === 'choice' && node.choices.some(option => option.premiumChoice)).map(node => node.id).sort()).toEqual(['OPEN-S02-C01','OPEN-S02-C03','OPEN-S02-C05','OPEN-S02-C07','OPEN-S02-C09','OPEN-S02-C11','OPEN-S02-C12'])
  })
  it('starts the full authored exchange once without old introductions or private name disclosure', () => {
    const save = start(), scene = save.prologue!.scene01!
    expect(scene.groupScript).toBe(scene02Id)
    expect(scene.groupMessages.slice(0, 6).map(line => line.text)).toEqual(['You joined FIND DANIEL.', 'Hey, everyone.', 'Before anyone says anything...', 'I added someone.', 'You added someone?', 'Yes.'])
    expect(scene.groupMessages.filter(line => line.text === 'Hey, everyone.')).toHaveLength(1)
    expect(scene.nodeId).toBe('OPEN-S02-C01')
    expect(scene.groupMessages.map(line => line.text).join(' ')).not.toMatch(/SECRET-NAME|engaged|Axiom|I worked with/)
    expect(beginScene02(save)).toBe(save)
    expect(normalizeSave(JSON.parse(JSON.stringify(save)))).toEqual(save)
  })
  it.each(Object.values(scene02Nodes).flatMap(node => node.kind === 'choice' && node.number ? node.choices.map(option => ({ number: node.number!.slice(1), id: option.id, target: option.next, text: option.text })) : []))('plays branch $number$id and stops at each player Send', ({ number, id, target, text }) => {
    const before = at(number)
    let save = sendScene01Choice(before, id, '', true, 100_000)
    expect(save.prologue!.scene01!.groupMessages.at(-1)?.text).toBe(text)
    let cursor = target
    for (let i = 0; i < 50; i++) {
      const node = scene02Nodes[cursor]
      if (!node || node.id.includes('AFTER-') || node.kind === 'choice' && node.number) break
      save = settle(save)
      if (node.kind === 'npc') expect(save.prologue!.scene01!.groupMessages.some(line => line.text === node.text && line.sender === node.sender)).toBe(true)
      if (node.kind === 'choice') {
        expect(scene01Choices(save)[0].text).toBe(node.choices[0].text)
        const count = save.prologue!.scene01!.groupMessages.length
        expect(deliverScene01(save, Number.MAX_SAFE_INTEGER)).toBe(save)
        expect(save.prologue!.scene01!.groupMessages).toHaveLength(count)
        save = sendScene01Choice(save, 'continue', '', true, 200_000)
        cursor = node.choices[0].next
      } else if (node.kind === 'event' && node.event === 'source-boundary') break
      else cursor = node.next!
    }
    save = settle(save)
    expect(normalizeSave(JSON.parse(JSON.stringify(save)))).toEqual(save)
    expect(save.evidence).toEqual({})
    expect(save.knowledge.player.some(fact => ['K01','K02','R04'].includes(fact))).toBe(false)
  })
  it('retains offline Sophie and recipient-specific group receipts without private disclosure', () => {
    const save = at('06')
    expect(openingPresence(save, 'sophie')).toBe('offline')
    const next = reply(save, 'b')
    const line = next.prologue!.scene01!.groupMessages.find(item => item.sender === 'player' && item.text.startsWith("For what it's worth"))!
    expect(next.prologue!.scene01!.groupReceipts?.filter(receipt => receipt.eventId === line.id).map(receipt => receipt.recipient)).toEqual(['maya','lucas'])
    expect(next.messages.filter(item => item.id.startsWith(line.id)).map(item => item.recipient)).toEqual(['maya','lucas'])
    expect(next.knowledge.characters.maya).not.toContain('OPEN-S01-PLAYER-CODENAME')
    expect(next.knowledge.characters.lucas).not.toContain('OPEN-S01-PLAYER-CODENAME')
    const returned = reply(next, 'a')
    expect(openingPresence(returned, 'sophie')).toBe('online')
  })
  it('keeps the premium timeline disputed and records its actual source receipt only when delivered', () => {
    let save = at('03')
    expect(save.knowledge.player).not.toContain('OPEN-S02-DISPUTED-TIMELINE')
    expect(sendScene01Choice(save, 'e', '', false)).toBe(save)
    save = reply(save, 'e')
    expect(save.knowledge.player).toContain('OPEN-S02-DISPUTED-TIMELINE')
    expect(save.prologue!.scene01!.groupReceipts?.some(receipt => receipt.recipient === 'player' && receipt.factIds.includes('OPEN-S02-DISPUTED-TIMELINE'))).toBe(true)
    expect(save.evidence).toEqual({})
  })
  it('awards authored effects once and keeps romance unchanged', () => {
    const save = reply(start(), 'c')
    expect(save.relationships.maya.affinity).toBe(2)
    expect(save.relationships.lucas.suspicion).toBe(2)
    expect(deliverScene01(save, Number.MAX_SAFE_INTEGER)).toBe(save)
    expect(save.relationships.maya.romance).toBe(0)
  })
  it('names notification senders correctly and excludes outgoing replies', () => {
    const save = reply(start(), 'a')
    expect(phoneNotices(save).some(notice => notice.avatar === 'lucas' && notice.text.startsWith('Lucas:'))).toBe(true)
    expect(phoneNotices(save).some(notice => notice.avatar === 'maya' && notice.text.startsWith('Maya:'))).toBe(true)
    for (const line of save.prologue!.scene01!.groupMessages.filter(item => item.sender === 'player')) expect(phoneNotices(save).some(notice => notice.id === line.id)).toBe(false)
  })
  it.each(['a','b','c','d'])('continues 08%s through the authored convergence into choice 09', id => {
    let save = reply(at('08'), id)
    if (scene01Choices(save)[0]?.id === 'continue') save = reply(save, 'continue')
    expect(save.prologue!.scene01!.groupSourceBoundary).not.toBe(true)
    expect(save.prologue!.scene01!.nodeId).toBe('OPEN-S02-C09')
    expect(scene01Choices(save)).toHaveLength(5)
    expect(save.prologue!.scene01!.groupPresence?.lucas).toBe(true)
    expect(save.prologue!.scene01!.groupMessages.some(line => /left the group|I'm leaving/.test(line.text))).toBe(false)
    expect(deliverScene01(save, Number.MAX_SAFE_INTEGER)).toBe(save)
  })
})
