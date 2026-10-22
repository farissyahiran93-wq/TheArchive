import { describe, expect, it } from 'vitest'
import { newGame, type GameSave } from './types'
import { normalizeSave } from './engine'
import { compareMirrorIndex, deliverOpening, finishOpening, openingChoices, replyToSophie, restoreDanielMirror } from './opening'
import { continueMessageFlow, assistRecovery, beginRecoverySequence, hintRecovery, recoveryReplyOptions, resetRecovery, retainRecovery, sendRecoveryReply, swapRecoveryCards, verifyRecovery } from './recoverySequence'

function base(): GameSave {
  return { ...newGame(), player: { name: 'Rae' }, prologue: { dialogueVersion: 4, stage: 'chat', step: 0, messages: [], noteSeen: false, offerInspected: false, restored: false, viewed: [], indexCompared: false, social: { phase: 'second', messages: [], members: ['sophie','eli','player'] } } }
}
function drain(state: GameSave): GameSave {
  for (let i = 0; i < 100; i++) {
    const due = state.prologue?.recoverySequence?.queue[0]?.dueAt ?? state.prologue?.queue?.[0]?.dueAt
    if (due === undefined) return state
    state = deliverOpening(state, due)
  }
  throw new Error('Queue did not drain')
}
function puzzle(): GameSave {
  let state = base()
  state = { ...state, prologue: { ...state.prologue!, stage: 'mirror', restored: true, social: { ...state.prologue!.social!, phase: 'done' } } }
  state = drain(beginRecoverySequence(state, 100))
  state = drain(sendRecoveryReply(state, 'who', 200))
  return drain(sendRecoveryReply(state, 'fake', 300))
}
function solved(): GameSave {
  let state = puzzle()
  state = swapRecoveryCards(state, 0, 3)
  state = swapRecoveryCards(state, 1, 3)
  state = swapRecoveryCards(state, 2, 3)
  return verifyRecovery(state, 500)
}
describe('post-Lucas investigation', () => {
  it('continues from reconstruction through Sophie and Relay without starting the Bulletin slice', () => {
    let state = drain(sendRecoveryReply(drain(solved()), 'entry'))
    state = drain(sendRecoveryReply(state, 'private'))
    expect(state.prologue?.stage).toBe('found')
    expect(state.prologue?.indexCompared).toBe(false)
    expect(openingChoices(state.prologue!).some(choice => choice.id === 'counts')).toBe(false)
    state = drain(replyToSophie(state, 'withhold'))
    state = drain(replyToSophie(state, 'later'))
    expect(openingChoices(state.prologue!).map(choice => choice.text).join(' ')).not.toContain('Bulletin')
    state = drain(replyToSophie(state, 'mirror'))
    state = drain(finishOpening(state))
    expect(state.e01).toBeUndefined()
    expect(state.prologue?.recoverySequence?.beat).toBe('reference')
    state = drain(sendRecoveryReply(state, 'check'))
    state = { ...state, prologue: { ...state.prologue!, inspectedRecords: ['notes:Untitled — last saved 22:30','index:Archive Index — integrity report'] } }
    state = drain(compareMirrorIndex(state))
    expect(state.prologue?.recoverySequence?.beat).toBe('connection')
    state = drain(sendRecoveryReply(state, 'tentative'))
    expect(state.prologue?.connectionReviewed).toBe(true)
    expect(state.e01).toBeUndefined()
    expect(state.knowledge.characters.maya).toEqual([])
    expect(normalizeSave(JSON.parse(JSON.stringify(state)))).toEqual(state)
  })
  it('lets an earlier save explicitly join the message flow without erasing prior progress', () => {
    const state: GameSave = { ...base(), choices: { previous: 'kept' }, e01: { sceneId: 'E01-S08', briefRead: true, previewInspected: true, hintCount: 0, attempts: 0, compared: true, handle: '', editorChecked: false }, prologue: { ...base().prologue!, stage: 'complete', restored: true, indexCompared: true } }
    const next = continueMessageFlow(state, 1000)
    expect(next.e01).toBe(state.e01)
    expect(next.choices.previous).toBe('kept')
    expect(next.prologue?.flow).toBe('mirror-first')
    expect(next.prologue?.recoverySequence?.beat).toBe('identity')
  })
  it('requires every private reply, preserves refusal and queues only NPC messages', () => {
    let state = drain(replyToSophie(base(), 'see', 100))
    for (const id of ['boundary','number','rest','no']) {
      expect(openingChoices(state.prologue!).length).toBe(3)
      const before = state.prologue!.messages.filter(line => line.sender === 'player').length
      state = replyToSophie(state, id, 200)
      expect(state.prologue!.messages.filter(line => line.sender === 'player')).toHaveLength(before + 1)
      expect(openingChoices(state.prologue!)).toEqual([])
      state = drain(normalizeSave(JSON.parse(JSON.stringify(state))))
    }
    expect(state.choices['OPEN-PRIVATE-stay']).toBe('no')
    expect(state.prologue?.messages.filter(line => line.id === 'OPEN-SOPHIE-NOTE')).toHaveLength(1)
    expect(state.relationships.sophie.romance).toBe(0)
    state = { ...state, prologue: { ...state.prologue!, stage: 'recovery', noteSeen: true, offerInspected: true } }
    expect(restoreDanielMirror(state).prologue?.recoverySequence?.beat).toBe('identity')
  })
  it('persists arrangements, attempts and hints; reset does not erase help progress', () => {
    let state = puzzle()
    expect(recoveryReplyOptions(state)).toEqual([])
    for (let i = 0; i < 4; i++) state = verifyRecovery(state)
    state = hintRecovery(state)
    state = swapRecoveryCards(state, 0, 1)
    state = normalizeSave(JSON.parse(JSON.stringify(state)))
    expect(state.prologue?.recoverySequence?.order).toEqual(['question','history','answer','change'])
    expect(state.prologue?.recoverySequence?.attempts).toBe(4)
    state = assistRecovery(state)
    expect(state.prologue?.recoverySequence?.restored).toBe(false)
    state = resetRecovery(state)
    expect(state.prologue?.recoverySequence?.hints).toBe(1)
    expect(state.prologue?.recoverySequence?.attempts).toBe(4)
    const corrupt = JSON.parse(JSON.stringify(state))
    corrupt.prologue.recoverySequence.order = ['change','change','answer','history']
    expect(() => normalizeSave(corrupt)).toThrow('Invalid recovery sequence')
  })
  it('solves once, saves separately and does not grant NPC or canonical knowledge', () => {
    let state = solved()
    expect(state.prologue?.recoverySequence?.restored).toBe(true)
    expect(verifyRecovery(state)).toBe(state)
    expect(state.evidence['OPEN-RECOVERED-CHAT-001']).toBeUndefined()
    state = retainRecovery(state, 600)
    expect(retainRecovery(state)).toBe(state)
    expect(state.evidence['OPEN-RECOVERED-CHAT-001'].verified).toBe(false)
    expect(state.knowledge.characters.sophie).toEqual([])
    expect(state.knowledge.characters.maya).toEqual([])
    expect(state.knowledge.player).not.toContain('K01')
    expect(state.deliveredEvents.filter(id => id === 'OPEN-RECOVERED-CHAT-001')).toHaveLength(1)
  })
  it('requires a second Send for Sophie to receive the full copy and records her receipt', () => {
    const state = { ...drain(solved()), prologue: { ...drain(solved()).prologue!, stage: 'found' as const, beat: 'disclosure' as const } }
    let next = drain(replyToSophie(state, 'full', 1000))
    expect(next.knowledge.characters.sophie).not.toContain('OPEN-RECOVERED-CHAT-001')
    next = replyToSophie(next, 'send', 2000)
    expect(next.knowledge.characters.sophie).toContain('OPEN-RECOVERED-CHAT-001')
    expect(next.messages.find(line => line.disclosedFactIds?.includes('OPEN-RECOVERED-CHAT-001'))?.recipient).toBe('sophie')
    expect(next.knowledge.characters.maya).toEqual([])
    expect(replyToSophie(next, 'send', 2001)).toBe(next)
  })
  it('withholding or asking a question grants no evidence knowledge and rejoins the public investigation', () => {
    for (const choice of ['withhold','question']) {
      let state = drain(solved())
      state = { ...state, prologue: { ...state.prologue!, stage: 'found', beat: 'disclosure' } }
      state = drain(replyToSophie(state, choice))
      expect(state.knowledge.characters.sophie).toEqual([])
      state = drain(replyToSophie(state, 'listen'))
      state = drain(replyToSophie(state, 'daniel'))
      expect(state.prologue?.beat).toBe('bridge')
      expect(state.knowledge.characters.maya).toEqual([])
    }
  })
})
