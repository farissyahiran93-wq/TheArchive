import { describe, expect, it } from 'vitest'
import { newGame, type GameSave } from './types'
import { answerGroupFollowup, deliverFollowup, followupAvailable, groupFollowupOptions, scheduleGroupProposal, scheduleMayaReferral, sendFollowupChoice, sendFollowupIntro } from './characterFollowups'
import { normalizeSave } from './engine'

function ready(): GameSave {
  const base = newGame()
  return { ...base, player: { name: 'Alex' }, knowledge: { ...base.knowledge, player: ['K01'] }, deliveredEvents: ['EV-E01-S12-EDITOR-CHECK','CONN-E01-01'], prologue: { dialogueVersion: 4, stage: 'complete', step: 2, messages: [], noteSeen: true, offerInspected: true, restored: true, viewed: [], indexCompared: true, social: { creator: 'sophie', createdAt: 100, phase: 'done', members: ['maya','player'], messages: [{ id: 'OPEN-GROUP-LUCAS-1', sender: 'lucas', text: 'What is your source?', at: 200 }, { id: 'OPEN-GROUP-LUCAS-LEFT', sender: 'system', text: 'Lucas left.', at: 300 }] } } }
}

describe('optional public-fact contact arcs and group reactivation', () => {
  it('requires a delivered Maya referral and explicit player Sends; answers stay idempotent', () => {
    let state = ready()
    expect(followupAvailable(state, 'lucas')).toBe(false)
    state = scheduleMayaReferral(state, 1000)
    expect(state.pendingEvents.map(event => event.id)).toEqual(['ARC-E01-MAYA-REFERRAL'])
    expect(scheduleMayaReferral(state, 1000)).toBe(state)
    state = deliverFollowup(state, 20_000)
    expect(followupAvailable(state, 'lucas')).toBe(true)
    state = sendFollowupIntro(state, 'lucas', 21_000)
    expect(state.messages.at(-1)?.sender).toBe('player')
    expect(state.knowledge.characters.lucas).toContain('ARC.PUBLIC_BUS4_QUERY_FROM_PLAYER')
    expect(state.deliveredEvents).toContain('ARC-E01-LUCAS-INTRO:lucas')
    expect(sendFollowupIntro(state, 'lucas', 21_000)).toBe(state)
    state = deliverFollowup(state, 30_000)
    expect(state.messages.at(-1)?.sender).toBe('lucas')
    expect(followupAvailable(state, 'eli')).toBe(true)
    state = sendFollowupChoice(state, 'lucas', 'evidence', 31_000)
    expect(sendFollowupChoice(state, 'lucas', 'defensive', 31_000)).toBe(state)
    state = deliverFollowup(state, 40_000)
    expect(state.messages.at(-1)?.text).toContain('dispatch original')
    expect(normalizeSave(state)).toEqual(state)
  })

  it('proposes a public-only reunion after Lucas replies, preserves departures, and joins once', () => {
    let state = deliverFollowup(scheduleMayaReferral(ready(), 1000), 20_000)
    state = deliverFollowup(sendFollowupIntro(state, 'lucas', 21_000), 30_000)
    state = deliverFollowup(sendFollowupChoice(state, 'lucas', 'careful', 31_000), 40_000)
    state = scheduleGroupProposal(state, 41_000)
    expect(state.pendingEvents).toHaveLength(1)
    state = deliverFollowup(state, state.pendingEvents[0].dueAt)
    expect(state.prologue?.social?.reactivation).toBe('proposed')
    expect(state.prologue?.social?.members).toEqual(['maya','player'])
    state = answerGroupFollowup(state, 'wait', 51_000)
    expect(state.prologue?.social?.reactivation).toBe('deferred')
    expect(groupFollowupOptions(state)).toHaveLength(2)
    state = answerGroupFollowup(state, 'public', 52_000)
    expect(state.prologue?.social?.members).toEqual(['maya','player'])
    state = deliverFollowup(state, 60_000)
    expect(state.prologue?.social?.members).toEqual(['maya','player','lucas'])
    expect(state.prologue?.social?.messages.filter(message => message.id === 'ARC-E01-GROUP-LUCAS-REJOIN')).toHaveLength(1)
    state = deliverFollowup(state, 70_000)
    expect(state.prologue?.social?.messages.at(-1)?.sender).toBe('lucas')
    expect(normalizeSave(state)).toEqual(state)
  })

  it('does not fabricate contacts or a group for older openings', () => {
    const old = { ...ready(), prologue: { ...ready().prologue!, dialogueVersion: 3 as const } }
    expect(scheduleMayaReferral(old, 1000)).toBe(old)
    expect(followupAvailable(old, 'lucas')).toBe(false)
    expect(scheduleGroupProposal(old, 1000)).toBe(old)
  })

  it('uses the verified Bulletin return route when Maya Messages is declined', () => {
    const state = { ...ready(), deliveredEvents: ['EV-E01-S12-EDITOR-CHECK'] }
    const referred = deliverFollowup(scheduleMayaReferral(state, 1000), 20_000)
    expect(referred.messages.at(-1)?.channel).toBe('bulletin')
    expect(referred.deliveredEvents).not.toContain('CONN-E01-01')
    expect(followupAvailable(referred, 'lucas')).toBe(true)
  })
})
