import { describe, expect, it } from 'vitest'
import * as dialogue from '../content/e01Phase03b'
import { leadChoices, primaryReplies, followupReplies, mayaOptional } from '../content/e01Slice'
import { sophieChoices, sophieExpansion } from '../content/opening'
import { normalizeSave, registerPlayer } from './engine'
import { deliverOpening, openingChoices, replyToSophie } from './opening'
import { deliverPhase03bEvent, draftPhase03b, sendPhase03b } from './phase03b'
import { mayaMessageAt, deliverSliceEvent, sendTip, saveLead, setS11Draft, sendS11Choice } from './slice'
import { newGame, type Episode01Slice, type GameSave } from './types'

const base = () => registerPlayer(newGame(), 'Rae')
const drainOpening = (state: GameSave) => deliverOpening(state, Number.MAX_SAFE_INTEGER)
const openingGroups = [
  { name: 'first', choices: sophieChoices.first, step: 0 as const },
  { name: 'second', choices: sophieChoices.second, step: 1 as const },
  ...(['quiet', 'offer', 'disclosure', 'bridge'] as const).map(name => ({ name, choices: sophieExpansion[name], step: 2 as const })),
]
describe('Phase 06G authored conversation branch verification', () => {
  for (const group of openingGroups) for (const choice of group.choices) {
    it(`Sophie ${group.name}/${choice.id}: one chosen answer, explicit receipt and save/resume`, () => {
      const initial = drainOpening(base())
      const state: GameSave = { ...initial, prologue: { ...initial.prologue!, dialogueVersion: 2, step: group.step, noteSeen: true,
        stage: ['disclosure', 'bridge'].includes(group.name) ? 'found' : 'chat',
        beat: ['first', 'second'].includes(group.name) ? undefined : group.name as 'quiet' | 'offer' | 'disclosure' | 'bridge' } }
      expect(openingChoices(state.prologue!).some(item => item.id === choice.id)).toBe(true)
      const sent = replyToSophie(state, choice.id, 100)
      expect(sent.prologue!.messages.filter(message => message.sender === 'player')).toHaveLength(1)
      expect(sent.prologue!.queue?.[0].text).toBe(choice.answer)
      expect(replyToSophie(sent, choice.id, 101)).toBe(sent)
      const resumed = drainOpening(normalizeSave(structuredClone(sent)))
      expect(resumed.prologue!.messages.filter(message => message.text === choice.answer)).toHaveLength(1)
      expect(resumed.knowledge.characters.maya).toEqual([])
      const expected = group.name !== 'disclosure' || choice.id === 'withhold' ? [] : [choice.id === 'counts' ? 'OPEN-INDEX-DISCREPANCY' : 'OPEN-UNVERIFIED-FINDING']
      expect(resumed.knowledge.characters.sophie).toEqual(expected)
      if (group.name !== 'first' && group.name !== 'second') {
        expect(sent.messages.at(-1)).toMatchObject({ recipient: 'sophie', disclosedFactIds: expected })
      }
      expect(new Set(resumed.deliveredEvents).size).toBe(resumed.deliveredEvents.length)
    })
  }

  const groups: { scene: Episode01Slice['sceneId']; choices: readonly { id: string; text: string; reply: readonly string[] }[]; fields?: Partial<Episode01Slice> }[] = [
    { scene: 'E01-S12', choices: dialogue.s12Replies },
    { scene: 'E01-S13', choices: dialogue.s13Replies, fields: { s13Asked: true } },
    { scene: 'E01-S13', choices: dialogue.s13Followups, fields: { s13Asked: true, s13Primary: 'P-S13-A' } },
    { scene: 'E01-S14', choices: [...dialogue.s14Share, dialogue.s14Defer] },
    { scene: 'E01-S15', choices: dialogue.s15Replies, fields: { s14Share: 'text' } },
    { scene: 'E01-S15', choices: dialogue.s15Followups, fields: { s14Share: 'text', s15Primary: 'P-S15-A' } },
    { scene: 'E01-S16', choices: dialogue.s16Replies },
    { scene: 'E01-S16', choices: dialogue.s16Followups, fields: { s16Primary: 'P-S16-A' } },
    { scene: 'E01-S20', choices: dialogue.s20Question },
    { scene: 'E01-S24', choices: dialogue.s24Questions, fields: { s24NoteViewed: true } },
    { scene: 'E01-S25', choices: dialogue.s25Replies },
    { scene: 'E01-S25', choices: dialogue.s25Followups.slice(0, 3), fields: { s25Primary: 'P-S25-A' } },
    { scene: 'E01-S25', choices: dialogue.s25Followups.slice(3), fields: { s25Primary: 'P-S25-B' } },
    { scene: 'E01-S26', choices: dialogue.s26Frames },
    { scene: 'E01-S27', choices: dialogue.s27Question },
    { scene: 'E01-S30', choices: dialogue.s29Disclosure },
    { scene: 'E01-S30', choices: dialogue.s30Disclosure.slice(0, 2), fields: { s30RoleChecked: true, s30Hook: 'valid' } },
    { scene: 'E01-S30', choices: dialogue.s30Disclosure.slice(2), fields: { s30RoleChecked: true, s30Hook: 'fallback' } },
  ]
  for (const group of groups) for (const choice of group.choices) {
    it(`Maya ${choice.id}: unsent draft privacy, exact answer, chronological turns and no duplicate disclosure`, () => {
      const initial = base()
      const state: GameSave = { ...initial, messages: [], pendingEvents: [],
        e01: { ...initial.e01!, sceneId: group.scene, editorChecked: true, ...group.fields },
        deliveredEvents: ['R01', 'R03'], knowledge: { ...initial.knowledge, player: ['K02'] } }
      const drafted = draftPhase03b(state, choice.id)
      expect(drafted.e01?.draftChoice).toBe(choice.id)
      expect(drafted.messages).toEqual(state.messages)
      expect(drafted.knowledge).toEqual(state.knowledge)
      const sent = sendPhase03b(drafted, 100)
      const receipt = sent.messages.at(-1)!
      expect(receipt).toMatchObject({ id: `player.${choice.id}`, recipient: 'maya', text: choice.text })
      expect(receipt.attachmentIds ?? []).not.toContain('E012')
      expect(sendPhase03b(sent, 101)).toBe(sent)
      let resumed = normalizeSave(structuredClone(sent))
      for (let step = 0; resumed.pendingEvents.length && step < 30; step++) resumed = deliverPhase03bEvent(resumed, 10_000)
      const replies = resumed.messages.filter(message => message.id.startsWith(`EV-E01-P03B:${choice.id}:`))
      expect(replies.map(message => message.text)).toEqual(choice.reply)
      expect(replies.every(message => message.at > receipt.at)).toBe(true)
      const times = resumed.messages.map(message => message.at)
      expect(times.every((at, index) => index === 0 || at > times[index - 1])).toBe(true)
      expect(deliverPhase03bEvent(resumed, 10_000)).toBe(resumed)
      expect(resumed.knowledge.player).toEqual(state.knowledge.player)
      expect(resumed.evidence).toEqual({})
      expect(resumed.knowledge.characters.sophie).toEqual([])
      expect(resumed.knowledge.characters.maya).toEqual(receipt.disclosedFactIds ?? [])
    })
  }

  for (const choice of leadChoices) it(`S07 ${choice.id}: all cautious interpretations keep the same private source-limited lead`, () => {
    const initial = base()
    const state: GameSave = { ...initial, e01: { ...initial.e01!, sceneId: 'E01-S07', compared: true } }
    const saved = saveLead(state, choice.id, 100)
    expect(saved.choices['S07.lead']).toBe(choice.id)
    expect(saved.evidence.K01.verified).toBe(false)
    expect(saved.knowledge.characters.maya).toEqual([])
    expect(saved.messages).toEqual(state.messages)
    expect(saved.e01?.sceneId).toBe('E01-S08')
  })
  for (const primary of primaryReplies) {
    const followups = primary.id === 'P-S11-C' ? [undefined] : [undefined, ...followupReplies]
    for (const followup of followups) it(`S11 ${primary.id}/${followup?.id ?? 'no follow-up'}: exact answers and conditional continuation`, () => {
      const initial = base()
      const state: GameSave = { ...initial, messages: [], pendingEvents: [], deliveredEvents: ['R01', 'EV-E01-S11-MAYA-REPLY'], e01: { ...initial.e01!, sceneId: 'E01-S11' } }
      const drafted = setS11Draft(state, primary.id)
      expect(drafted.messages).toEqual([])
      let sent = sendS11Choice(drafted, primary.id, 100)
      expect(sent.messages[0]).toMatchObject({ recipient: 'maya', text: primary.text })
      expect(sendS11Choice(sent, primary.id, 101)).toBe(sent)
      sent = deliverSliceEvent(normalizeSave(structuredClone(sent)), 10_000)
      const expected = [...primary.reply, ...(primary.id === 'P-S11-C' ? [] : mayaOptional)]
      expect(sent.messages.filter(message => message.sender === 'maya').map(message => message.text)).toEqual(expected)
      if (primary.id === 'P-S11-C') expect(setS11Draft(sent, 'P-S11-D')).toBe(sent)
      if (followup) {
        const selected = setS11Draft(sent, followup.id)
        expect(selected.messages).toEqual(sent.messages)
        sent = sendS11Choice(selected, followup.id, 20_000)
        sent = deliverSliceEvent(sent, 30_000)
        expect(sent.messages.slice(-followup.reply.length).map(message => message.text)).toEqual(followup.reply)
      }
      expect(sent.messages.every((message, index) => index === 0 || message.at > sent.messages[index - 1].at)).toBe(true)
      expect(sent.knowledge).toEqual(state.knowledge)
    })
  }

  it('keeps late-tip replies after existing case history and ignores fixture/Sophie wall-clock dates', () => {
    const initial = base()
    const prior = Date.UTC(2026, 9, 8, 17, 45)
    const state: GameSave = { ...initial, messages: [
      { id: 'earlier-maya', sender: 'maya', text: 'Existing case history', at: prior, delivery: 'read' },
      { id: 'fixture', sender: 'fixture', text: 'Development fixture', at: Date.UTC(2030, 0, 1), delivery: 'read' },
    ], knowledge: { ...initial.knowledge, player: ['K01', 'K02'] }, e01: { ...initial.e01!, sceneId: 'E01-S09', tipMode: 'anonymous' }, deliveredEvents: [] }
    expect(mayaMessageAt(state, prior - 100)).toBe(prior + 1000)
    let sent = sendTip(state, 100)
    expect(sent.messages.at(-1)!.at).toBeGreaterThan(prior)
    for (let step = 0; sent.pendingEvents.length && step < 10; step++) sent = deliverSliceEvent(sent, 10_000)
    const times = sent.messages.filter(message => message.sender === 'maya' || message.recipient === 'maya').map(message => message.at)
    expect(times.every((at, index) => index === 0 || at > times[index - 1])).toBe(true)
    expect(state.messages[0].at).toBe(prior)
  })
})
