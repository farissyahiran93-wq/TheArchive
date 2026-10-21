import { describe, expect, it } from 'vitest'
import { registerPlayer, normalizeSave } from './engine'
import { newGame, type GameSave } from './types'
import { compareMirrorIndex, deliverOpening, finishOpening, inspectMirrorDetail, inspectRecoveryOffer, openingChoices, readDanielNote, replyToSophie, restoreDanielMirror, revealMirrorHint, unlockMirrorRecord, sendGroupChoice } from './opening'
import { mirrorLocks } from '../content/opening'

const drain = (state: GameSave) => deliverOpening(state, Number.MAX_SAFE_INTEGER)
const send = (state: GameSave, id: string) => drain(replyToSophie(state, id, 100))
function mirror() {
  let state = drain(registerPlayer(newGame(), 'Rae'))
  state = send(state, 'number')
  state = send(state, 'join')
  state = drain(sendGroupChoice(state, 'calm', 100))
  state = drain(sendGroupChoice(state, 'boundary', 100))
  state = send(drain(state), 'see')
  state = readDanielNote(state)
  state = send(state, 'help')
  expect(state.prologue?.stage).toBe('chat')
  state = send(state, 'last')
  expect(state.prologue?.stage).toBe('chat')
  state = send(state, 'no')
  return restoreDanielMirror(inspectRecoveryOffer(state))
}
function found() {
  let state = mirror()
  state = inspectMirrorDetail(state, 'notes', 'Untitled \u2014 last saved 22:30')
  state = inspectMirrorDetail(state, 'index', 'Archive Index \u2014 integrity report')
  return drain(compareMirrorIndex(state, 100))
}

describe('integrated Sophie opening', () => {
  it('saves individual deadlines and resumes idempotently without auto-sending', () => {
    const state = registerPlayer(newGame(), 'Rae')
    expect(state.prologue?.messages).toHaveLength(0)
    expect(openingChoices(state.prologue!)).toEqual([])
    const firstAt = state.prologue!.queue![0].dueAt
    expect(deliverOpening(state, firstAt - 1)).toBe(state)
    const first = deliverOpening(state, firstAt)
    expect(first.prologue?.messages).toHaveLength(1)
    const resumed = drain(normalizeSave(structuredClone(first)))
    expect(resumed.prologue?.messages).toHaveLength(6)
    expect(resumed.prologue?.messages.some(message => message.sender === 'player')).toBe(false)
    expect(drain(resumed)).toBe(resumed)
    expect(new Set(resumed.deliveredEvents).size).toBe(resumed.deliveredEvents.length)
  })

  it('holds recovery until note inspection and two subsequent explicit exchanges', () => {
    const state = mirror()
    expect(state.prologue?.restored).toBe(true)
    expect(state.deliveredEvents).toContain('OPEN-SOPHIE-REPLY-1')
    expect(state.deliveredEvents).toContain('OPEN-SOPHIE-REPLY-2')
    expect(state.choices['OPEN-quiet']).toBe('last')
    expect(state.choices['OPEN-offer']).toBe('no')
    expect(state.prologue?.messages.some(message => message.text.includes('Three days ago'))).toBe(true)
    expect(state.knowledge.characters.maya).toEqual(['OPEN.NUMBER_CLAIM_FROM_SOPHIE'])
  })

  for (const choice of ['counts', 'uncertain', 'withhold']) {
    it(`records only the selected Sophie disclosure: ${choice}`, () => {
      const state = found()
      expect(finishOpening(state)).toBe(state)
      expect(state.knowledge.characters.sophie).toEqual([])
      const sent = send(state, choice)
      const expected = choice === 'counts' ? ['OPEN-INDEX-DISCREPANCY'] : choice === 'uncertain' ? ['OPEN-UNVERIFIED-FINDING'] : []
      expect(sent.knowledge.characters.sophie).toEqual(expected)
      expect(sent.knowledge.characters.maya).toEqual(['OPEN.NUMBER_CLAIM_FROM_SOPHIE'])
      const receipt = sent.messages.find(message => message.id === `OPEN-P-disclosure-${choice}`)
      expect(receipt?.recipient).toBe('sophie')
      expect(receipt?.disclosedFactIds).toEqual(expected)
      expect(finishOpening(sent)).toBe(sent)
      const ready = send(sent, 'aware')
      const end = finishOpening(normalizeSave(structuredClone(ready)))
      expect(end.prologue?.stage).toBe('complete')
      expect(end.e01?.sceneId).toBe('E01-S02')
      expect(end.evidence['OPEN-INDEX'].verified).toBe(false)
      expect(replyToSophie(end, choice)).toBe(end)
    })
  }

  it('persists each independent lock and all three hint levels without mandatory unlocks', () => {
    let state = mirror()
    for (const id of Object.keys(mirrorLocks) as (keyof typeof mirrorLocks)[]) {
      for (let tier = 1; tier <= 3; tier++) {
        state = revealMirrorHint(state, id)
        expect(state.prologue?.mirrorHints?.[id]).toBe(tier)
      }
      expect(revealMirrorHint(state, id)).toBe(state)
      expect(unlockMirrorRecord(state, id, 'wrong')).toBe(state)
      state = unlockMirrorRecord(state, id, mirrorLocks[id].answer)
      state = normalizeSave(structuredClone(state))
      expect(state.prologue?.unlockedMirrorRecords).toContain(id)
    }
    expect(state.prologue?.unlockedMirrorRecords).toHaveLength(4)
  })

  it('rejects a malformed persisted schedule', () => {
    const state = registerPlayer(newGame(), 'Rae')
    expect(() => normalizeSave({ ...state, prologue: { ...state.prologue, queue: [{ id: 'bad', text: 'bad', dueAt: 'tomorrow' }] } })).toThrow('Invalid opening schedule')
  })
})
