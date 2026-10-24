import { describe, expect, it } from 'vitest'
import { scene01Nodes } from '../content/scene01'
import { scene03Facts, scene03Nodes, scene03DeliveryDelay } from '../content/scene03'
import { scene03Script } from '../content/scene03Script'
import { beginLegacyScene01 as beginScene01, deliverScene01, draftScene03Choice, openScene03, pauseScene03, scene01Choices, scene01Invitation, sendScene01Choice } from './scene01'
import { newGame, type GameSave } from './types'
import { normalizeSave } from './engine'
import { openingPresence } from './phonePresentation'

const startTime = 1_800_000_000_000
function now(save: GameSave) { return Math.max(startTime, ...save.prologue!.scene01!.messages.map(line => line.at), ...save.prologue!.scene01!.groupMessages.map(line => line.at)) + 100 }
function drain(save: GameSave): GameSave {
  for (let i = 0; i < 200; i++) {
    const queued = save.prologue?.scene01?.queue[0]
    if (!queued) return save
    const players = save.prologue!.scene01!.messages.filter(line => line.sender === 'player').length
    save = deliverScene01(save, queued.dueAt)
    expect(save.prologue!.scene01!.messages.filter(line => line.sender === 'player')).toHaveLength(players)
  }
  throw new Error('Queue did not settle')
}
function send(save: GameSave, id: string, premium = true) { return drain(sendScene01Choice(save, id, 'Rae', premium, now(save))) }
function finishBranch(save: GameSave, id: string, premium = true) {
  save = send(save, id, premium)
  while (scene01Choices(save)[0]?.id === 'continue') save = send(save, 'continue', premium)
  return save
}
function handoff(withheld = false) {
  let save = drain(beginScene01({ ...newGame(), player: { name: 'SECRET-NAME' } }, startTime))
  for (let i = 0; i < 100; i++) {
    const scene = save.prologue!.scene01!, node = scene01Nodes[scene.nodeId]
    if (scene.privateHandoff?.deliveredAt !== undefined) return save
    if (node.kind === 'choice') save = send(save, node.number === '08' && withheld ? 'b' : node.number ? 'a' : 'continue')
    else if (scene.invitation === 'ready') save = drain(scene01Invitation(save, 'join', now(save)))
    else throw new Error(node.id)
  }
  throw new Error('No handoff')
}
const points = new Map<string, GameSave>()
function at(number: string) {
  if (!points.size) points.set('01', drain(openScene03(handoff(), startTime + 10_000_000)))
  if (points.has(number)) return points.get(number)!
  let save = points.get('01')!
  for (let i = 0; i < 19; i++) {
    const node = scene01Nodes[save.prologue!.scene01!.nodeId]
    if (node.kind !== 'choice' || !node.number?.startsWith('P')) throw new Error('No private choice')
    points.set(node.number.slice(1), save)
    if (node.number === `P${number}`) return save
    save = finishBranch(save, 'a')
  }
  throw new Error('No target')
}

describe('owner Scene 03 — Just Between Us', () => {
  it('has nineteen main gates, four standard replies at each, and only the ten supplied premium options', () => {
    expect(scene03Script.choices).toHaveLength(19)
    expect(scene03Script.choices.reduce((total, beat) => total + beat.choices.length, 0)).toBe(86)
    expect(scene03Script.choices.filter(beat => beat.choices.some(choice => 'premiumChoice' in choice)).map(beat => beat.id)).toEqual(['01','03','06','08','11','13','16','17','18','19'])
    for (const beat of scene03Script.choices) expect(beat.choices.filter(choice => !('premiumChoice' in choice))).toHaveLength(4)
    for (const node of Object.values(scene03Nodes)) {
      if (node.kind === 'choice') for (const choice of node.choices) expect(scene01Nodes[choice.next]).toBeTruthy()
      else if ('next' in node && node.next) expect(scene01Nodes[node.next]).toBeTruthy()
    }
  })
  it('uses the persisted Hey exactly once, waits for manual opening, and preserves the group transcript', () => {
    const save = handoff(), original = save.prologue!.scene01!
    expect(save.prologue!.scene01!.privateScene03).toBeUndefined()
    expect(deliverScene01(save, Number.MAX_SAFE_INTEGER)).toBe(save)
    const opened = drain(openScene03(save, now(save)))
    expect(opened.prologue!.scene01!.groupMessages).toBe(original.groupMessages)
    expect(opened.prologue!.scene01!.messages.filter(line => line.id === 'OPEN-S03-FIRST-MESSAGE')).toHaveLength(1)
    expect(opened.prologue!.scene01!.messages.filter(line => line.id.startsWith('OPEN-S03-OPENING-')).map(line => line.text)).toEqual(scene03Script.opening.filter(turn => turn.speaker === 'sophie').map(turn => turn.text))
    expect(opened.prologue!.scene01!.nodeId).toBe('OPEN-S03-C01')
    expect(openScene03(opened)).toBe(opened)
  })
  it('consumes the stopped-typing marker atomically so a zero-delay turn cannot stall the browser timer', () => {
    let save = sendScene01Choice(at('04'), 'a', '', false, now(at('04')))
    for (let i = 0; i < 100 && save.prologue!.scene01!.queue.length; i++) {
      const queued = save.prologue!.scene01!.queue[0], node = scene01Nodes[queued.id]
      expect(node.kind !== 'wait' || node.duration > 0).toBe(true)
      save = deliverScene01(save, queued.dueAt)
    }
    expect(save.prologue!.scene01!.nodeId).toBe('OPEN-S03-C05')
    expect(save.deliveredEvents).toContain('OPEN-S03-AFTER-04-11')
  })
  it.each(scene03Script.choices.flatMap(beat => beat.choices.map(choice => ({ number: beat.id, id: choice.id }))))('plays the complete authored branch $number$id, including every separately sent follow-up', ({ number, id }) => {
    const before = at(number)
    let save = finishBranch(before, id)
    const option = scene03Script.choices.find(beat => beat.id === number)!.choices.find(choice => choice.id === id)!
    const expected = option.turns.filter(turn => turn.speaker !== 'wait').map(turn => ({ sender: turn.speaker, text: turn.text }))
    const actual = save.prologue!.scene01!.messages.slice(before.prologue!.scene01!.messages.length + 1, before.prologue!.scene01!.messages.length + 1 + expected.length).map(line => ({ sender: line.sender, text: line.text }))
    expect(actual).toEqual(expected)
    expect(save.prologue!.scene01!.groupMessages).toBe(before.prologue!.scene01!.groupMessages)
    expect(save.evidence).toEqual(before.evidence)
    for (const actor of ['maya','lucas','eli','nora'] as const) {
      expect(save.relationships[actor]).toEqual(before.relationships[actor])
      expect(save.knowledge.characters[actor]).toEqual(before.knowledge.characters[actor])
    }
    for (const key of ['trust','affinity','suspicion','romance'] as const) {
      const effects = 'effects' in option ? option.effects as Partial<Record<typeof key, number>> : {}
      expect(save.relationships.sophie[key]).toBe(Math.max(0, Math.min(100, before.relationships.sophie[key] + (effects[key] ?? 0))))
    }
    save = normalizeSave(JSON.parse(JSON.stringify(save)))
    expect(deliverScene01(save, Number.MAX_SAFE_INTEGER)).toBe(save)
  })
  it('awards sibling, fiancée and childhood facts only at their actual delivered disclosures', () => {
    expect(at('01').knowledge.player).not.toContain(scene03Facts.siblings)
    expect(at('02').knowledge.player).toContain(scene03Facts.siblings)
    expect(at('02').knowledge.player).toContain(scene03Facts.olderBrother)
    expect(at('08').knowledge.player).not.toContain(scene03Facts.mayaFiancee)
    for (const id of ['a','b','c','d','e']) expect(finishBranch(at('08'), id).knowledge.player).toContain(scene03Facts.mayaFiancee)
    expect(at('10').knowledge.player).not.toContain(scene03Facts.lucasChildhoodFriend)
    expect(at('11').knowledge.player).toContain(scene03Facts.lucasChildhoodFriend)
    expect(at('13').knowledge.player).toContain(scene03Facts.eliPronouns)
  })
  it('records a reported police contact only on 06B, never from the completion checklist or a future option', () => {
    const before = at('06')
    expect(before.knowledge.player).not.toContain(scene03Facts.policeReported)
    for (const id of ['a','c','d','e']) expect(finishBranch(before, id).knowledge.player).not.toContain(scene03Facts.policeReported)
    let save = sendScene01Choice(before, 'b', '', false, now(before))
    save = deliverScene01(save, save.prologue!.scene01!.queue[0].dueAt)
    expect(save.knowledge.player).not.toContain(scene03Facts.policeReported) // "Yes." is not yet the report claim.
    save = deliverScene01(save, save.prologue!.scene01!.queue[0].dueAt)
    expect(save.knowledge.player).toContain(scene03Facts.policeReported)
    expect(save.prologue!.scene01!.privateScene03!.receipts.some(receipt => receipt.recipient === 'player' && receipt.factIds.includes(scene03Facts.policeReported))).toBe(true)
  })
  it('keeps branch-specific wedding and employment claims source-limited without inventing missing lines', () => {
    expect(finishBranch(at('08'), 'b').knowledge.player).not.toContain(scene03Facts.weddingPlanned)
    expect(finishBranch(at('08'), 'a').knowledge.player).toContain(scene03Facts.weddingPlanned)
    const before = at('13')
    expect(before.knowledge.player).not.toContain(scene03Facts.eliCoworker)
    const unknownJob = finishBranch(before, 'b')
    expect(unknownJob.knowledge.player).not.toContain(scene03Facts.eliAxiom)
    expect(unknownJob.knowledge.player).not.toContain(scene03Facts.eliCoworker)
    expect(finishBranch(before, 'a').knowledge.player).toContain(scene03Facts.eliAxiom)
    const coworker = finishBranch(unknownJob, 'd')
    expect(coworker.knowledge.player).toContain(scene03Facts.eliCoworker)
    expect(coworker.knowledge.player).not.toContain(scene03Facts.eliAxiom)
  })
  it('persists a draft without sending, and restores it when the player returns to the checkpoint', () => {
    const before = at('13'), count = before.prologue!.scene01!.messages.length
    let save = draftScene03Choice(before, 'e')
    expect(save.prologue!.scene01!.messages).toHaveLength(count)
    save = pauseScene03(save, now(save))
    expect(scene01Choices(save)).toEqual([])
    save = normalizeSave(JSON.parse(JSON.stringify(save)))
    save = openScene03(save, now(save) + 1_000_000)
    expect(save.prologue!.scene01!.privateScene03!.draft).toEqual({ nodeId: 'OPEN-S03-C13', choiceId: 'e' })
    save = finishBranch(save, 'e')
    expect(save.prologue!.scene01!.privateScene03!.draft).toBeUndefined()
    expect(save.relationships.sophie.affinity - before.relationships.sophie.affinity).toBe(2)
  })
  it('pauses a pending turn, preserving its remaining delay without advancing while away', () => {
    let save = openScene03(handoff(), startTime + 10_000_000)
    const queued = save.prologue!.scene01!.queue[0]
    save = pauseScene03(save, queued.dueAt - 1000)
    expect(save.prologue!.scene01!.queue).toEqual([])
    expect(save.prologue!.scene01!.privateScene03!.paused).toEqual({ id: queued.id, remainingMs: 1000, typing: false })
    expect(deliverScene01(save, Number.MAX_SAFE_INTEGER)).toBe(save)
    save = normalizeSave(JSON.parse(JSON.stringify(save)))
    const resumeAt = startTime + 20_000_000
    save = openScene03(save, resumeAt)
    expect(save.prologue!.scene01!.queue[0].dueAt).toBe(resumeAt + 1000)
    const count = save.prologue!.scene01!.messages.length
    save = drain(save)
    expect(save.prologue!.scene01!.messages.length).toBeGreaterThan(count)
    expect(save.prologue!.scene01!.nodeId).toBe('OPEN-S03-C01')
  })
  it('resumes an already-opened old handoff without duplicating Hey or the activation event', () => {
    const save = handoff()
    save.prologue!.scene01!.privateHandoff!.openedAt = now(save)
    save.deliveredEvents.push('OPEN-S03-ACTIVATED')
    const resumed = drain(openScene03(normalizeSave(JSON.parse(JSON.stringify(save))), now(save)))
    expect(resumed.prologue!.scene01!.nodeId).toBe('OPEN-S03-C01')
    expect(resumed.deliveredEvents.filter(id => id === 'OPEN-S03-ACTIVATED')).toHaveLength(1)
    expect(resumed.prologue!.scene01!.messages.filter(line => line.id === 'OPEN-S03-FIRST-MESSAGE')).toHaveLength(1)
  })
  it('supports every free route, guards premium entitlement and never auto-sends embedded replies', () => {
    for (const beat of scene03Script.choices) {
      const save = at(beat.id)
      for (const option of beat.choices) if ('premiumChoice' in option) expect(sendScene01Choice(save, option.id, '', false)).toBe(save)
      expect(finishBranch(save, 'a', false)).not.toBe(save)
    }
    let save = send(at('19'), 'e')
    expect(scene01Choices(save)[0].text).toBe('Seems fair.')
    expect(deliverScene01(save, Number.MAX_SAFE_INTEGER)).toBe(save)
    expect(save.prologue!.scene01!.privateScene03!.complete).toBe(false)
    save = send(save, 'continue')
    expect(scene01Choices(save)[0].text).toBe("That's your problem.")
    expect(save.prologue!.scene01!.privateScene03!.complete).toBe(false)
  })
  it('finishes all nineteen gates on Goodbye, marks Sophie offline, and enables readiness without scheduling MIRROR or Chapter 2', () => {
    const before = at('19'), save = finishBranch(before, 'a')
    expect(save.prologue!.scene01!.messages.at(-1)?.text).toBe('Goodbye.')
    expect(save.prologue!.scene01!.privateScene03).toMatchObject({ complete: true, reading: false, nextEventReady: true })
    expect(openingPresence(save, 'sophie')).toBe('offline')
    expect(scene01Choices(save)).toEqual([])
    expect(openScene03(save)).toBe(save)
    expect(save.prologue!.scene01!.queue).toEqual([])
    expect(save.pendingEvents).toEqual(before.pendingEvents)
    expect(save.e01).toBeUndefined()
    expect(save.evidence).toEqual(before.evidence)
    expect(save.deliveredEvents.filter(id => id === 'OPEN-S03-COMPLETE')).toHaveLength(1)
    expect(save.knowledge.player.some(id => ['K01','K02','R04'].includes(id))).toBe(false)
    expect(save.prologue!.scene01!.messages.filter(line => line.id.startsWith('OPEN-S03-')).some(line => /Nora|MIRROR|Relay/.test(line.text))).toBe(false)
  })
  it('keeps an undisclosed stored codename private throughout all nineteen decisions', () => {
    let save = drain(openScene03(handoff(true), startTime + 10_000_000))
    for (let i = 0; i < 19; i++) save = finishBranch(save, 'a')
    expect(save.prologue!.scene01!.nameDisclosed).toBe(false)
    expect(save.prologue!.scene01!.messages.filter(line => line.id.startsWith('OPEN-S03-')).some(line => line.text.includes('SECRET-NAME'))).toBe(false)
    expect(save.knowledge.characters.sophie).not.toContain('OPEN-S01-PLAYER-CODENAME')
  })
  it('clamps new Sophie effects to 0–100 while preserving other characters and romance', () => {
    const save = at('01')
    const altered = { ...save, relationships: { ...save.relationships, sophie: { trust: 99, affinity: 100, suspicion: 0, romance: 7 }, lucas: { ...save.relationships.lucas, suspicion: -1 } } }
    const next = finishBranch(altered, 'e')
    expect(next.relationships.sophie).toEqual({ trust: 100, affinity: 100, suspicion: 0, romance: 7 })
    expect(next.relationships.lucas).toEqual(altered.relationships.lucas)
    expect(scene03DeliveryDelay('Yeah.')).toBeLessThanOrEqual(1800)
  })
})
