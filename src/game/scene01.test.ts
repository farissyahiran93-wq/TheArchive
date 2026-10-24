import { describe, expect, it } from 'vitest'
import { scene01Nodes } from '../content/scene01'
import { scene01Script } from '../content/scene01Script'
import { newGame, type GameSave } from './types'
import { normalizeSave } from './engine'
import { beginLegacyScene01 as beginScene01, deliverScene01, scene01Choices, scene01Invitation, sendScene01Choice } from './scene01'
import { inspectRecoveryOffer, readDanielNote, restoreDanielMirror } from './opening'

function drain(state: GameSave): GameSave {
  for (let i = 0; i < 100; i++) {
    const queued = state.prologue?.scene01?.queue[0]
    if (!queued) return state
    const players = state.prologue!.scene01!.messages.filter(line => line.sender === 'player').length
    state = deliverScene01(state, queued.dueAt)
    expect(state.prologue!.scene01!.messages.filter(line => line.sender === 'player')).toHaveLength(players)
  }
  throw new Error('Scene queue did not settle')
}
function send(state: GameSave, id: string, name = 'Alex', premium = true): GameSave { return drain(sendScene01Choice(state, id, name, premium, 100_000)) }
function reach(number: string, picks: Record<string, string> = {}): GameSave {
  let state = drain(beginScene01(newGame(), 1000))
  for (let i = 0; i < 80; i++) {
    const node = scene01Nodes[state.prologue!.scene01!.nodeId]
    if (node.kind === 'choice' && node.number === number) return state
    const options = scene01Choices(state)
    if (!options.length) throw new Error(`No route to ${number} at ${node.id}`)
    state = send(state, node.kind === 'choice' && node.number ? picks[node.number] ?? 'a' : 'continue')
  }
  throw new Error('Route did not converge')
}
describe('owner Scene 01 screenplay', () => {
  it('has fourteen authored choice points and exactly one premium option at five points', () => {
    expect(scene01Script.choices).toHaveLength(14)
    expect(Object.values(scene01Nodes).filter(node => node.id.startsWith('OPEN-S01-') && node.kind === 'choice' && node.number)).toHaveLength(14)
    expect(scene01Script.choices.filter(beat => beat.choices.some(choice => 'premiumChoice' in choice)).map(beat => beat.id)).toEqual(['02','05','08','10','14'])
    for (const beat of scene01Script.choices) expect(beat.choices.filter(choice => 'premiumChoice' in choice).length).toBeLessThanOrEqual(1)
    for (const node of Object.values(scene01Nodes)) {
      if (node.kind === 'choice') for (const choice of node.choices) expect(scene01Nodes[choice.next]).toBeTruthy()
      else if ('next' in node && node.next) expect(scene01Nodes[node.next]).toBeTruthy()
    }
  })
  it('delivers an uncertain opening before mentioning Daniel and never attaches a note', () => {
    let state = beginScene01(newGame(), 1000)
    expect(state.prologue?.scene01?.messages.map(line => line.text)).toEqual(['Hey'])
    expect(state.prologue?.scene01?.introduced).toBe(false)
    state = drain(state)
    expect(state.prologue?.scene01?.messages).toHaveLength(5)
    expect(state.prologue?.scene01?.messages.map(line => line.text).join(' ')).not.toContain('Daniel')
    expect(scene01Choices(state)).toHaveLength(4)
    expect(state.evidence).toEqual({})
    expect(readDanielNote(state)).toBe(state)
    expect(inspectRecoveryOffer(state)).toBe(state)
    expect(restoreDanielMirror(state)).toBe(state)
  })
  it.each(['a','b','c','d'])('keeps a distinct first reply for choice %s', choice => {
    const state = send(drain(beginScene01(newGame(), 1000)), choice)
    const expected = scene01Script.choices[0].responses[choice as 'a'].filter(turn => turn.speaker === 'sophie').map(turn => turn.text)
    for (const text of expected) expect(state.prologue?.scene01?.messages.some(line => line.text === text)).toBe(true)
    expect(state.prologue?.scene01?.introduced).toBe(true)
  })
  it.each(scene01Script.choices.flatMap(beat => beat.choices.map(choice => ({ number: beat.id, choice: choice.id }))))('plays authored branch $number$choice with explicit sub-replies', ({ number, choice }) => {
    let state = reach(number)
    const before = state.prologue!.scene01!.messages.length
    state = send(state, choice)
    for (let i = 0; i < 10; i++) {
      const node = scene01Nodes[state.prologue!.scene01!.nodeId]
      if (node.kind !== 'choice' || node.number) break
      state = send(state, 'continue')
    }
    const expected = scene01Script.choices.find(beat => beat.id === number)!.responses[choice].filter(turn => turn.speaker !== 'wait').map(turn => ({ sender: turn.speaker, text: turn.text.replaceAll('[PLAYER_NAME]','Alex') }))
    const actual = state.prologue!.scene01!.messages.slice(before + 1, before + 1 + expected.length).map(line => ({ sender: line.sender, text: line.text }))
    expect(actual).toEqual(expected)
  })
  it('requires Send even for scripted player follow-ups within a premium branch', () => {
    let state = reach('02')
    const before = state.prologue!.scene01!.messages.filter(line => line.sender === 'player').length
    state = send(state, 'd')
    expect(scene01Choices(state).map(choice => choice.text)).toEqual(['A little.'])
    expect(state.prologue!.scene01!.messages.filter(line => line.sender === 'player')).toHaveLength(before + 1)
    state = normalizeSave(JSON.parse(JSON.stringify(state)))
    state = send(state, 'continue')
    expect(scene01Choices(state).map(choice => choice.text)).toEqual(["You don't have to explain everything at once."])
    state = send(state, 'continue')
    expect(state.relationships.sophie.trust).toBe(3)
    expect(state.relationships.sophie.affinity).toBe(2)
    expect(state.relationships.sophie.romance).toBe(0)
    expect(state.prologue?.scene01?.nodeId).toBe('OPEN-S01-C03')
  })
  it('keeps paid dialogue unavailable without a preview entitlement while every free route works', () => {
    const state = reach('02')
    expect(sendScene01Choice(state, 'd', '', false)).toBe(state)
    expect(sendScene01Choice(state, 'a', '', false)).not.toBe(state)
  })
  it.each(['b','c'])('does not disclose a stored codename on choice 08%s', choice => {
    let state = reach('08')
    state = { ...state, player: { name: 'SECRET-NAME' } }
    state = send(state, choice, 'SECRET-NAME')
    expect(state.prologue?.scene01?.nameDisclosed).toBe(false)
    expect(state.knowledge.characters.sophie).not.toContain('OPEN-S01-PLAYER-CODENAME')
    expect(state.prologue?.scene01?.messages.filter(line => line.sender === 'sophie').map(line => line.text).join(' ')).not.toContain('SECRET-NAME')
  })
  it('substitutes the codename only after its explicit disclosure and retains a Sophie receipt', () => {
    let state = reach('08')
    expect(sendScene01Choice(state, 'a', '')).toBe(state)
    state = send(state, 'a', '  Alex  ')
    expect(state.prologue?.scene01?.disclosedName).toBe('Alex')
    expect(state.prologue?.scene01?.messages.some(line => line.text === 'Alex.')).toBe(true)
    expect(state.messages.find(line => line.disclosedFactIds?.includes('OPEN-S01-PLAYER-CODENAME'))?.recipient).toBe('sophie')
  })
  it('leaves a declined invitation pending indefinitely and resumes only on voluntary acceptance', () => {
    let state = send(reach('13', { '08': 'b' }), 'd')
    expect(state.prologue?.scene01?.invitation).toBe('declined')
    expect(state.prologue?.scene01?.groupMessages).toEqual([])
    expect(deliverScene01(state, Number.MAX_SAFE_INTEGER)).toBe(state)
    state = scene01Invitation(state, 'dismiss')
    state = normalizeSave(JSON.parse(JSON.stringify(state)))
    expect(state.prologue?.scene01?.invitationDismissed).toBe(true)
    state = drain(scene01Invitation(state, 'accept', 200_000))
    expect(state.prologue?.scene01?.messages.some(line => line.text === 'I saw you accepted.')).toBe(true)
    expect(state.prologue?.scene01?.nodeId).toBe('OPEN-S01-C14')
    state = send(state, 'a')
    expect(state.prologue?.scene01?.invitation).toBe('ready')
    expect(state.prologue?.scene01?.groupMessages).toEqual([])
    state = drain(scene01Invitation(state, 'join', 300_000))
    expect(state.prologue?.scene01?.complete).toBe(true)
    expect(state.prologue?.scene01?.groupMessages.slice(0, 4).map(line => line.text)).toEqual(['You joined FIND DANIEL.','Hey, everyone.','Before anyone says anything...','I added someone.'])
    expect(state.prologue?.scene01?.nodeId).toBe('OPEN-S02-C01')
    expect(scene01Invitation(state, 'join')).toBe(state)
    expect(state.e01).toBeUndefined()
  })
  it('preserves earlier save data while activating the replacement transcript and validates reloads', () => {
    const previous: GameSave = { ...newGame(), player: { name: 'Rae' }, choices: { old: 'kept' }, evidence: { old: { id: 'old', source: 'Earlier source', collectedAt: 1, verified: false } }, prologue: { dialogueVersion: 4, stage: 'complete', step: 2, messages: [{ id: 'OLD-NOTE', sender: 'sophie', text: 'Earlier dialogue.' }], noteSeen: true, offerInspected: true, restored: true, viewed: [], indexCompared: true } }
    const next = beginScene01(previous, 1000)
    expect(next.prologue?.messages).toBe(previous.prologue?.messages)
    expect(next.evidence).toBe(previous.evidence)
    expect(next.choices.old).toBe('kept')
    expect(next.prologue?.scene01?.messages.map(line => line.text)).toEqual(['Hey'])
    expect(beginScene01(next)).toBe(next)
    expect(normalizeSave(JSON.parse(JSON.stringify(next)))).toEqual(next)
    const corrupt = JSON.parse(JSON.stringify(next))
    corrupt.prologue.scene01.nodeId = 'missing-node'
    expect(() => normalizeSave(corrupt)).toThrow('Invalid Scene 01 progress')
  })
  it('does not award an unreadable-note claim on a branch that never hears it', () => {
    const state = send(reach('03'), 'b')
    expect(state.knowledge.player).toContain('OPEN-S01-DANIEL-NAME')
    expect(state.knowledge.player).not.toContain('OPEN-S01-SOPHIE-UNREADABLE-NOTE-CLAIM')
  })
})
