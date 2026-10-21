import { describe, expect, it } from 'vitest'
import { canUnlockEpisode, dueEvent, enterFixture, grantKnowledge, registerPlayer, sendFixtureChoice } from './engine'
import { newGame } from './types'

describe('Phase 00 engine', () => {
  const ready = () => registerPlayer(newGame(), 'Alex')

  it('never creates a player response without Send', () => {
    let state = enterFixture(ready(), 0)
    state = dueEvent(state, 750)
    state = dueEvent(state, 1850)
    expect(state.messages.map(message => message.sender)).toEqual(['fixture', 'fixture'])
    expect(state.choices['fixture.response']).toBeUndefined()
    state = sendFixtureChoice(state, 'clear', 1900)
    expect(state.messages.at(-1)?.sender).toBe('player')
  })

  it('delivers each event once across repeated ticks and resumed state', () => {
    let state = enterFixture(ready(), 0)
    state = dueEvent(state, 750)
    const resumed = structuredClone(state)
    state = dueEvent(resumed, 750)
    expect(state.messages.filter(message => message.id === 'fixture.hello')).toHaveLength(1)
    state = dueEvent(state, 1850)
    state = dueEvent(state, 3000)
    expect(state.messages.filter(message => message.id === 'fixture.check')).toHaveLength(1)
  })

  it('grants NPC knowledge only with a valid disclosure or public event', () => {
    let state = ready()
    state = grantKnowledge(state, 'maya', 'private-fact', { kind: 'disclosure', messageId: 'missing' })
    expect(state.knowledge.characters.maya).toEqual([])
    state = grantKnowledge(state, 'maya', 'private-fact', { kind: 'public', eventId: 'missing' })
    expect(state.knowledge.characters.maya).toEqual([])
    state = enterFixture(state, 0)
    state = dueEvent(state, 750)
    state = dueEvent(state, 1850)
    state = sendFixtureChoice(state, 'clear', 1900)
    state = grantKnowledge(state, 'maya', 'private-fact', { kind: 'disclosure', messageId: 'player.clear' })
    expect(state.knowledge.characters.maya).toEqual([])
    state.messages.push({ id: 'player.share.maya', sender: 'player', recipient: 'maya', disclosedFactIds: ['private-fact'], text: 'I found this.', at: 1950, delivery: 'delivered' })
    state = grantKnowledge(state, 'maya', 'private-fact', { kind: 'disclosure', messageId: 'player.share.maya' })
    expect(state.knowledge.characters.maya).toEqual(['private-fact'])
    expect(state.knowledge.characters.lucas).toEqual([])
  })

  it('keeps future episodes locked without explicit conditions', () => {
    const state = ready()
    expect(canUnlockEpisode(state, 'episode-01')).toBe(false)
    state.deliveredEvents.push('fixture.hello')
    expect(canUnlockEpisode(state, 'episode-01')).toBe(false)
  })
})
