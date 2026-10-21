import 'fake-indexeddb/auto'
import { webcrypto } from 'node:crypto'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { gcroMaster } from '../content/gcroExport'
import { dueEvent, registerPlayer } from './engine'
import { assessGcroIssue, checkS28, finishS28, recordS27Review, requestS28Correction, selectS27Scope, submitS27Request } from './phase03b'
import { loadGame, writeGame } from './save'
import { newGame, type Episode01Slice, type GameSave } from './types'

function requestStart(outcome?: Episode01Slice['s27OfficeResponse']): GameSave {
  const state = registerPlayer(newGame(),'Rae')
  return { ...state, e01: { ...state.e01!, sceneId: 'E01-S27', s27OfficeResponse: outcome }, deliveredEvents: [...state.deliveredEvents,'EV-E01-S20-NOTICE'] }
}

function issued(): GameSave {
  const ready = selectS27Scope(requestStart(),'redacted')
  return dueEvent(submitS27Request(ready,100),1400)
}

function checked(state: GameSave): GameSave {
  return { ...state, e01: { ...state.e01!, s28OpenedPages: [1,2,3,4], s28DirectorySeen: true, s28Checks: ['office','lineage','pages','transfer'] } }
}

beforeEach(() => vi.stubGlobal('crypto',webcrypto))
afterEach(() => vi.unstubAllGlobals())

describe('Phase 03C source recovery', () => {
  it.each([['delay','delayed'],['refuse','refused'],['unavailable','unavailable']] as const)('records %s without an issue, R04 or repeated notification', (response,status) => {
    const reviewing = submitS27Request(selectS27Scope(requestStart(response),'redacted'),100)
    const result = dueEvent(reviewing,1400)
    expect(result.e01?.s27Status).toBe(status)
    expect(result.e01?.s28Issue).toBeUndefined()
    expect(result.deliveredEvents).not.toContain('R04')
    expect(result.knowledge.player).not.toContain('K02')
    expect(dueEvent(result,1400)).toBe(result)
    const review = recordS27Review(result)
    expect(review.e01?.s27Status).toBe('delayed')
    expect(recordS27Review(review)).toBe(review)
  })

  it.each([
    ['missing', undefined, 'missing'],
    ['truncated', gcroMaster.slice(0,350), 'incomplete'],
    ['missing redaction', gcroMaster.replace('REDACTION AND RELEASE STATEMENT / RED-041','REDACTION LIST MISSING'), 'incomplete'],
    ['changed bytes', gcroMaster.replace('Escort: JUNE ELLIS','Escort: OTHER ELLIS'), 'integrity-mismatch'],
  ] as const)('quarantines %s actual delivered payload despite stale check flags', async (_case,payload,expected) => {
    const state = checked(issued())
    const altered = { ...state, e01: { ...state.e01!, s28Payload: payload } }
    expect(await assessGcroIssue(altered)).toBe(expected)
    expect(await finishS28(altered)).toBe(altered)
    expect(altered.deliveredEvents).not.toContain('R04')
    expect(altered.knowledge.player).not.toContain('K02')
  })

  it('rejects mismatched digest, issuer, replayed token and another recipient', async () => {
    const base = checked(issued())
    const versions: [GameSave,string][] = [
      [{ ...base, e01: { ...base.e01!, s28Issue: { ...base.e01!.s28Issue!, digest: '0'.repeat(64) } } },'integrity-mismatch'],
      [{ ...base, e01: { ...base.e01!, s28Issue: { ...base.e01!.s28Issue!, issuer: 'Civic portal' } } },'wrong-issuer'],
      [{ ...base, e01: { ...base.e01!, s28Issue: { ...base.e01!.s28Issue!, tokenSpent: false } } },'wrong-recipient'],
      [{ ...base, e01: { ...base.e01!, s28Issue: { ...base.e01!.s28Issue!, recipient: 'someone-else' } } },'wrong-recipient'],
    ]
    for (const [state,reason] of versions) {
      expect(await assessGcroIssue(state)).toBe(reason)
      expect(await finishS28(state)).toBe(state)
    }
  })

  it('keeps an invalid issue quarantined after correction request and survives reload', async () => {
    const base = issued()
    const altered = { ...base, e01: { ...base.e01!, s28Payload: gcroMaster.slice(0,350) } }
    const pending = requestS28Correction(altered)
    expect(pending.e01?.sceneId).toBe('E01-S27')
    expect(pending.e01?.s27Status).toBe('delayed')
    expect(pending.e01?.s28CorrectionRequested).toBe(true)
    expect(pending.deliveredEvents).not.toContain('R04')
    expect(pending.pendingEvents).toHaveLength(0)
    await writeGame(pending)
    const restored = await loadGame()
    expect(restored.recoveryRequired).toBeFalsy()
    expect(restored.save.e01?.s28Payload).toBe(gcroMaster.slice(0,350))
    expect(restored.save.e01?.s27Status).toBe('delayed')
  })

  it('does not revoke a previously verified local copy when the office later goes unavailable', async () => {
    let state = checked(issued())
    expect(await assessGcroIssue(state)).toBe('valid')
    state = await finishS28(state)
    expect(state.deliveredEvents.filter(id => id === 'R04')).toHaveLength(1)
    const later = { ...state, e01: { ...state.e01!, s28OfficeAvailability: 'unavailable' as const } }
    expect(later.deliveredEvents).toContain('R04')
    expect(await assessGcroIssue(later)).toBe('valid')
    expect(await finishS28(later)).toBe(later)
  })

  it('allows interrupted source checks to resume without duplicate grant', async () => {
    let state = issued()
    state = { ...state, e01: { ...state.e01!, s28OpenedPages: [1], s28DirectorySeen: true } }
    state = await checkS28(state,'office','GCRO')
    await writeGame(state)
    const restored = (await loadGame()).save
    expect(restored.e01?.s28Checks).toEqual(['office'])
    expect(restored.deliveredEvents).not.toContain('R04')
    expect(await finishS28(restored)).toBe(restored)
  })
})
