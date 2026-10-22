import { describe, expect, it } from 'vitest'
import { newGame, type GameSave } from './types'
import { decidePendingRecovery, deliverOpening, finishOpening, groupChoices, openingChoices, replyToSophie, sendGroupChoice, sendOpeningName, startPhoneOpening } from './opening'
import { dueEvent, normalizeSave } from './engine'

function drain(state: GameSave): GameSave {
  for (let i = 0; i < 40; i++) {
    const next = state.prologue?.social?.queue?.[0]?.dueAt ?? state.prologue?.queue?.[0]?.dueAt
    if (next === undefined) return state
    state = deliverOpening(state, next)
  }
  throw new Error('Opening queue did not drain')
}

function archivedFirst(): GameSave {
  return { ...newGame(), prologue: { dialogueVersion: 4, v4Beat: 'first', stage: 'chat', step: 0, messages: [{ id: 'OPEN-V4-FIRST-CONTACT', sender: 'sophie', text: 'Archived first contact.' }], noteSeen: false, offerInspected: false, restored: false, viewed: [], indexCompared: false } }
}

function firstExchange(): GameSave {
  let state = archivedFirst()
  state = replyToSophie(state, 'who', 22_000)
  state = drain(state)
  state = sendOpeningName(state, '  Rae  ', 30_000)
  state = drain(state)
  state = replyToSophie(state, 'name', 40_000)
  state = drain(state)
  return state
}

describe('archived v4 compatibility and current first-contact timer', () => {
  it('starts the existing S02 investigation when a new-game prologue closes', () => {
    const base = newGame()
    const ready: GameSave = { ...base, player: { name: 'Rae' }, prologue: { dialogueVersion: 4, stage: 'found', step: 2, beat: 'ready', messages: [], noteSeen: true, offerInspected: true, restored: true, viewed: [], indexCompared: true } }
    const complete = finishOpening(ready)
    expect(complete.prologue?.stage).toBe('complete')
    expect(complete.e01?.sceneId).toBe('E01-S02')
    expect(finishOpening(complete)).toBe(complete)
  })
  it('keeps a saved 20-second first contact without setup or duplicate delivery', () => {
    let state = startPhoneOpening(newGame(), 1_000)
    expect(state.player).toBeNull()
    expect(state.prologue).toBeUndefined()
    expect(startPhoneOpening(state, 9_000)).toBe(state)
    expect(dueEvent(state, 20_999)).toBe(state)
    state = dueEvent(state, 21_000)
    expect(state.prologue?.dialogueVersion).toBe(4)
    expect(state.notifications).toEqual([{ id: 'OPEN-S01-OPENING-1', text: 'Unknown number: Hey', read: false }])
    expect(dueEvent(state, 25_000)).toBe(state)
    expect(state.prologue?.scene01?.messages).toHaveLength(1)
  })

  it('requires explicit name and address sends and persists the selected form separately', () => {
    let state = archivedFirst()
    expect(openingChoices(state.prologue!)).toHaveLength(4)
    state = replyToSophie(state, 'who', 22_000)
    expect(state.player).toBeNull()
    state = drain(state)
    expect(sendOpeningName(state, '   ')).toBe(state)
    expect(sendOpeningName(state, '<bad>')).toBe(state)
    state = sendOpeningName(state, '  慧  ', 30_000)
    expect(state.player?.name).toBe('慧')
    state = drain(state)
    state = replyToSophie(state, 'name', 40_000)
    expect(state.prologue?.addressPreference).toBe('name')
    expect(state.player?.pronouns).toBeUndefined()
    expect(replyToSophie(state, 'name', 41_000)).toBe(state)
  })

  it('waits for explicit group consent after optional Sophie questions and sends no teaser photo', () => {
    let state = firstExchange()
    state = replyToSophie(state, 'number', 50_000)
    state = drain(state)
    expect(state.deliveredEvents).not.toContain('OPEN-V4-FIRST-PAGE')
    expect(state.pendingEvents).toEqual([])
    expect(openingChoices(state.prologue!).some(choice => choice.id === 'ready-group')).toBe(true)
    expect(replyToSophie(state, 'number')).toBe(state)
    state = drain(replyToSophie(state, 'ready-group', 70_000))
    expect(state.prologue?.messages.map(message => message.text).join(' ')).not.toContain('ECHO-7/14')
    expect(state.prologue?.restored).toBe(false)
    const pending = state.pendingEvents.find(event => event.id === 'OPEN-V4-PENDING-RECOVERY')!
    const group = state.pendingEvents.find(event => event.id === 'OPEN-V4-GROUP-CREATE')!
    expect(group.dueAt - pending.dueAt).toBe(7_000)
    expect(dueEvent(state, pending.dueAt - 1)).toBe(state)
    state = dueEvent(state, pending.dueAt)
    expect(state.prologue?.pendingRecovery).toBe('pending')
    state = decidePendingRecovery(state, 'rejected')
    expect(state.prologue?.pendingRecovery).toBe('rejected')
    state = decidePendingRecovery(state, 'retry')
    expect(state.prologue?.pendingRecovery).toBe('retry')
    state = dueEvent(state, group.dueAt)
    expect(state.prologue?.social?.creator).toBe('sophie')
    expect(state.prologue?.social?.createdAt).toBe(group.dueAt)
    expect(state.prologue?.social?.messages.map(message => message.sender)).toEqual(['system','system','system'])
    expect(state.prologue?.restored).toBe(false)
    state = drain(state)
    expect(groupChoices(state.prologue!)).toHaveLength(4)
    expect(state.knowledge.characters.maya).toContain('OPEN.NUMBER_CLAIM_FROM_SOPHIE')
    expect(state.knowledge.characters.eli).toContain('OPEN.NUMBER_CLAIM_FROM_SOPHIE')
    expect(state.deliveredEvents).toContain('OPEN-GROUP-SOPHIE-1:maya')
    expect(state.prologue?.social?.members).toEqual(['sophie','maya','lucas','eli','player'])
    expect(normalizeSave(JSON.parse(JSON.stringify(state)))).toEqual(state)
  })

  it('keeps group departures durable, prevents duplicate choices and returns to Sophie', () => {
    let state = firstExchange()
    state = drain(replyToSophie(state, 'help', 50_000))
    state = drain(replyToSophie(state, 'ready-group', 70_000))
    state = dueEvent(state, state.pendingEvents.find(event => event.id === 'OPEN-V4-PENDING-RECOVERY')!.dueAt)
    state = dueEvent(state, state.pendingEvents.find(event => event.id === 'OPEN-V4-GROUP-CREATE')!.dueAt)
    state = drain(state)
    state = sendGroupChoice(state, 'calm', 90_000)
    expect(sendGroupChoice(state, 'calm', 90_001)).toBe(state)
    state = drain(state)
    state = sendGroupChoice(state, 'boundary', 130_000)
    state = drain(state)
    expect(state.prologue?.social?.members).toEqual(['sophie','eli','player'])
    expect(state.prologue?.social?.messages.filter(message => message.id === 'OPEN-GROUP-LUCAS-LEFT')).toHaveLength(1)
    expect(state.prologue?.social?.messages.filter(message => message.id === 'OPEN-GROUP-MAYA-LEFT')).toHaveLength(1)
    expect(state.prologue?.stage).toBe('chat')
    state = drain(state)
    expect(state.prologue?.social?.phase).toBe('second')
    expect(openingChoices(state.prologue!).map(choice => choice.id)).toEqual(['see','why','hesitate'])
  })
})
