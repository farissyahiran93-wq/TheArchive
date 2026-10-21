import 'fake-indexeddb/auto'
import { describe, expect, it } from 'vitest'
import { dueEvent, normalizeSave, registerPlayer } from './engine'
import { loadGame, writeGame } from './save'
import { advanceSlice, answerComparison, answerEditor, beginSlice, inspectPreview, openSliceInbox, readBrief, recheckComparison, saveLead, sendS11Choice, sendTip, setS11Draft, setTipDraft, showComparisonHint } from './slice'
import { newGame, type GameSave } from './types'

function reachTip(mode: 'anonymous' | 'handle' = 'anonymous'): GameSave {
  let state = beginSlice(registerPlayer(newGame(), 'Rae'))
  state = advanceSlice(state, 0) // S03
  state = readBrief(state)
  state = advanceSlice(state, 0) // S04
  state = inspectPreview(state, 1)
  state = advanceSlice(state, 1) // S05
  state = advanceSlice(state, 2) // S06
  state = answerComparison(state, 'escort') // S07
  state = saveLead(state, 'P-S07-C', 3) // S08
  state = setTipDraft(state, mode, mode === 'handle' ? 'QuayReader' : '')
  return advanceSlice(state, 4) // S09
}

function deliverAll(state: GameSave, at = 5000) {
  for (let i = 0; i < 5; i++) state = dueEvent(state, at)
  return state
}

describe('Episode 01 opening slice', () => {
  it('requires source inspection, correct comparison and Board Save before K01', () => {
    let state = beginSlice(registerPlayer(newGame(), 'Rae'))
    state = advanceSlice(state, 0)
    expect(state.knowledge.player).not.toContain('K03')
    state = readBrief(state)
    expect(state.knowledge.player).toContain('K03')
    state = advanceSlice(state, 0)
    expect(advanceSlice(state, 0)).toBe(state)
    expect(state.evidence.E001).toBeUndefined()
    state = inspectPreview(state, 1)
    expect(state.evidence.E001.verified).toBe(false)
    state = advanceSlice(state, 1)
    state = advanceSlice(state, 2)
    expect(state.evidence.E002.verified).toBe(false)
    state = answerComparison(state, 'residents')
    expect(state.e01?.attempts).toBe(1)
    expect(state.knowledge.player).not.toContain('K01')
    state = showComparisonHint(state)
    expect(state.e01?.hintCount).toBe(1)
    state = answerComparison(state, 'escort')
    expect(state.knowledge.player).not.toContain('K01')
    state = recheckComparison(state)
    expect(state.e01?.sceneId).toBe('E01-S06')
    expect(state.e01?.compared).toBe(false)
    expect(state.deliveredEvents.filter(id => id === 'EV-E01-S06-COMPARE')).toHaveLength(1)
    state = answerComparison(state, 'escort')
    expect(state.deliveredEvents.filter(id => id === 'EV-E01-S06-COMPARE')).toHaveLength(1)
    state = saveLead(state, 'P-S07-C', 3)
    expect(state.knowledge.player).toContain('K01')
    expect(state.evidence.K01.verified).toBe(false)
    expect(saveLead(state, 'P-S07-A', 4)).toBe(state)
  })

  it.each(['anonymous', 'handle'] as const)('%s tip needs explicit Send and receives exactly one Maya first contact', mode => {
    let state = reachTip(mode)
    expect(state.deliveredEvents).not.toContain('R01')
    expect(state.messages).toHaveLength(0)
    expect(state.relationships.maya.trust).toBe(0)
    state = sendTip(state, 100)
    expect(state.deliveredEvents.filter(id => id === 'R01')).toHaveLength(1)
    expect(state.messages.filter(message => message.sender === 'player')).toHaveLength(1)
    expect(state.messages[0].recipient).toBe('maya')
    expect(state.knowledge.characters.maya).toEqual(['R01.public-escort-observation'])
    expect(state.relationships.maya.trust).toBe(0)
    expect(sendTip(state, 101)).toBe(state)
    state = deliverAll(structuredClone(state))
    expect(state.deliveredEvents.filter(id => id === 'EV-E01-S11-MAYA-REPLY')).toHaveLength(1)
    expect(state.messages.filter(message => message.sender === 'maya')).toHaveLength(6)
    expect(state.relationships.maya).toEqual(mode === 'handle'
      ? { trust: 52, affinity: 45, suspicion: 20, romance: 0 }
      : { trust: 50, affinity: 45, suspicion: 21, romance: 0 })
    expect(dueEvent(state, 5000)).toBe(state)
    state = openSliceInbox(state)
    expect(state.e01?.sceneId).toBe('E01-S11')
    expect(state.deliveredEvents).toContain('EV-E01-S10-RECEIPT-VIEWED')
  })

  it('keeps skeptical reply optional and does not reveal the personal continuation', () => {
    let state = openSliceInbox(deliverAll(sendTip(reachTip(), 100)))
    expect(sendS11Choice(state, 'P-S11-C', 5001)).toBe(state)
    state = setS11Draft(state, 'P-S11-C')
    expect(state.messages.filter(message => message.sender === 'player')).toHaveLength(1)
    state = sendS11Choice(state, 'P-S11-C', 5001)
    expect(state.messages.filter(message => message.sender === 'player')).toHaveLength(2)
    expect(sendS11Choice(state, 'P-S11-C', 5002)).toBe(state)
    state = dueEvent(state, 6000)
    expect(state.messages.some(message => message.text.includes('tea when your tip'))).toBe(false)
    state = advanceSlice(state, 6000)
    expect(state.e01?.sceneId).toBe('E01-S12')
    state = answerEditor(state, 'name-photo')
    expect(state.e01?.editorChecked).toBe(false)
    state = answerEditor(state, 'code-route')
    expect(state.deliveredEvents).toContain('EV-E01-S12-EDITOR-CHECK')
    expect(state.knowledge.player).not.toContain('K02')
    expect(state.evidence.E012).toBeUndefined()
  })

  it('preserves an older v1 reboot save and a slice save without touching legacy localStorage', async () => {
    const old = { ...newGame(), player: { name: 'Old Player' } }
    expect(normalizeSave(structuredClone(old)).e01).toBeUndefined()
    const slice = reachTip('handle')
    const sent = sendTip(slice, 100)
    await writeGame(sent)
    const restored = await loadGame()
    expect(restored.error).toBeUndefined()
    expect(restored.save.e01?.sceneId).toBe('E01-S10')
    expect(restored.save.e01?.handle).toBe('QuayReader')
    expect(restored.save.pendingEvents).toHaveLength(5)
    expect(restored.save.deliveredEvents.filter(id => id === 'R01')).toHaveLength(1)
    expect(localStorage.getItem('the-archive:game-save:v1')).toBeNull()
  })
})
