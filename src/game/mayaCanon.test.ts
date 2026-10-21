import { expect, test } from 'vitest'
import { deliverSliceEvent } from './slice'
import { dueEvent } from './engine'
import { newGame, type GameSave } from './types'

function pendingMaya(version: 3 | 4): GameSave {
  const base = newGame()
  return { ...base, player: { name: 'Alex' }, deliveredEvents: ['R01'], pendingEvents: [{ id: 'EV-E01-S11-MAYA-REPLY:0', dueAt: 1000 }], relationships: { ...base.relationships, maya: { trust: 55, affinity: 46, suspicion: 22, romance: 0 } }, e01: { sceneId: 'E01-S10', briefRead: true, previewInspected: true, hintCount: 0, attempts: 0, compared: true, tipMode: 'handle', handle: 'alex', editorChecked: false }, prologue: { dialogueVersion: version, stage: 'complete', step: 2, messages: [], noteSeen: true, offerInspected: true, restored: true, viewed: [], indexCompared: true, social: { phase: 'done', members: ['maya','player'], messages: version === 4 ? [{ id: 'OPEN-GROUP-MAYA-1', sender: 'maya', text: 'Sophie, I thought you were checking the number first.' }] : [] } } }
}

test('v4 Maya remembers FIND DANIEL and preserves group relationship changes', () => {
  const next = deliverSliceEvent(pendingMaya(4), 2000)
  expect(next.messages.at(-1)?.text).toContain('from FIND DANIEL')
  expect(next.relationships.maya.trust).toBe(55)
  expect(next.relationships.maya.suspicion).toBe(22)
  expect(next.deliveredEvents.filter(id => id === 'EV-E01-S11-MAYA-REPLY')).toHaveLength(1)
})

test('v3 Maya retains her earlier first-introduction line', () => {
  const next = deliverSliceEvent(pendingMaya(3), 2000)
  expect(next.messages.at(-1)?.text).toBe("Hi. I'm Maya. I edited the Daniel Mercer brief.")
})

test('a resumed v4 backlog delivers one Maya bubble then spaces the remaining turns', () => {
  const state = { ...pendingMaya(4), pendingEvents: [0,1,2].map(index => ({ id: `EV-E01-S11-MAYA-REPLY:${index}`, dueAt: 1000 + index })) }
  const next = dueEvent(state, 20_000)
  expect(next.messages.filter(message => message.sender === 'maya')).toHaveLength(1)
  expect(next.pendingEvents).toHaveLength(2)
  expect(next.pendingEvents.every(event => event.dueAt > 20_000)).toBe(true)
})
