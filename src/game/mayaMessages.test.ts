import { describe, expect, it } from 'vitest'
import { newGame, type GameSave } from './types'
import { mayaMessages } from './mayaMessages'
import { deliverPhase03bEvent, draftPhase03b, sendPhase03b } from './phase03b'
import { registerPlayer } from './engine'

describe('Maya Messages routing', () => {
  it.each(['P-S25-A', 'P-S25-B', 'P-S25-E', 'C03-FRAME.A'])('keeps %s replies with the sent player turn for both connection choices', id => {
    for (const connected of [true, false]) {
      const base = registerPlayer(newGame(), 'Rae')
      const save: GameSave = { ...base, messages: [], pendingEvents: [], deliveredEvents: connected ? ['CONN-E01-01'] : [], e01: { ...base.e01!, sceneId: id.startsWith('C03') ? 'E01-S26' : 'E01-S25', ...(id === 'P-S25-E' ? { s25Primary: 'P-S25-A' } : {}) } }
      let next = sendPhase03b(draftPhase03b(save, id), 100)
      const expected = connected ? 'messages' : 'bulletin'
      expect(next.messages.at(-1)?.channel).toBe(expected)
      for (let i = 0; next.pendingEvents.length && i < 20; i++) next = deliverPhase03bEvent(next, 10000)
      const replies = next.messages.filter(message => message.id.startsWith(`EV-E01-P03B:${id}:`))
      expect(replies.length).toBeGreaterThan(0)
      expect(replies.every(message => message.channel === expected)).toBe(true)
    }
  })

  it('reads only legacy replies paired with Messages turns and leaves stored channels, tips and knowledge untouched', () => {
    const save = newGame()
    save.deliveredEvents.push('CONN-E01-01')
    save.messages = [
      { id: 'player.P-S25-A', sender: 'player', recipient: 'maya', channel: 'messages', text: 'Sent privately', at: 1, delivery: 'delivered' },
      { id: 'EV-E01-P03B:P-S25-A:0', sender: 'maya', channel: 'bulletin', text: 'Legacy paired reply', at: 2, delivery: 'delivered' },
      { id: 'EV-E01-P03B:P-S25-B:0', sender: 'maya', channel: 'bulletin', text: 'Unpaired Bulletin reply', at: 3, delivery: 'delivered' },
      { id: 'R01.tip', sender: 'player', recipient: 'maya', channel: 'bulletin', text: 'Old public tip', at: 4, delivery: 'delivered' },
    ]
    const before = structuredClone(save)
    expect(mayaMessages(save).map(message => message.text)).toEqual(['Sent privately', 'Legacy paired reply'])
    expect(save).toEqual(before)
    expect(mayaMessages({ ...save, deliveredEvents: [] })).toEqual([])
  })
})
