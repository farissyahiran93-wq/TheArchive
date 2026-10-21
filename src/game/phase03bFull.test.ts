import 'fake-indexeddb/auto'
import { webcrypto } from 'node:crypto'
import { describe, expect, it, vi } from 'vitest'
import { checkGcroBytes, gcroIssueBytes, gcroIssueDigest, gcroMaster } from '../content/gcroExport'
import { dueEvent, registerPlayer } from './engine'
import { answerS20Approval, answerS22, checkS28, checkS30Role, citeS29, classifyS21, completeS30, draftPhase03b, finishS19, finishS23, finishS24, finishS28, labelS19Date, matchS23Source, openS23Result, openS28Directory, openS28Page, placeS21Card, recordS19Observation, saveS29Finding, saveS30Question, selectS27Scope, sendPhase03b, setS23Query, submitS27Request } from './phase03b'
import { loadGame, writeGame } from './save'
import { newGame, type GameSave } from './types'

function researchStart() {
  const state = registerPlayer(newGame(),'Rae')
  return { ...state, e01: { ...state.e01!, sceneId: 'E01-S19' as const, editorChecked: true }, deliveredEvents: [...state.deliveredEvents,'R01','EV-E01-S12-EDITOR-CHECK'] }
}

function toRequest() {
  let state: GameSave = researchStart()
  state = recordS19Observation(state,'full')
  for (const [index,label] of ['event','stamp','transfer','publication'].entries()) state = labelS19Date(state,index,label)
  state = finishS19(state)
  state = { ...state, e01: { ...state.e01!, s20NoticeSeen: true } }
  state = answerS20Approval(state,'approval')
  for (const id of ['event','verification','approval']) state = placeS21Card(state,id)
  state = classifyS21(state,'archive-needed')
  state = answerS22(state,'alternative','uncertain')
  state = answerS22(state,'test','lineage')
  state = setS23Query(state,'Bus 4 2019 version')
  for (const id of ['SR-02','SR-04','SR-01']) { state = openS23Result(state,id); state = matchS23Source(state,id) }
  state = finishS23(state)
  return finishS24(state,false)
}

describe('Phase 03B evidence route', () => {
  it('keeps research tentative and blocks the wrong source match', () => {
    let state: GameSave = researchStart()
    state = recordS19Observation(state,'reported')
    expect(finishS19(state)).toBe(state)
    for (const [index,label] of ['event','stamp','transfer','publication'].entries()) state = labelS19Date(state,index,label)
    state = finishS19(state)
    expect(state.e01?.sceneId).toBe('E01-S20')
    expect(answerS20Approval(state,'departure')).toBe(state)
    state = { ...state, e01: { ...state.e01!, s20NoticeSeen: true } }
    state = answerS20Approval(state,'approval')
    for (const id of ['event','verification','approval']) state = placeS21Card(state,id)
    state = classifyS21(state,'archive-needed')
    state = answerS22(state,'alternative','yes')
    state = answerS22(state,'test','lineage')
    state = openS23Result(state,'SR-03')
    expect(matchS23Source(state,'SR-03')).toBe(state)
    expect(state.knowledge.player).not.toContain('K02')
    expect(state.deliveredEvents).not.toContain('R04')
  })

  it('refuses broad requests and grants no export on a request receipt alone', () => {
    let state = toRequest()
    state = selectS27Scope(state,'residents')
    state = submitS27Request(state,100)
    expect(state.e01?.s27Status).toBe('refused')
    expect(state.deliveredEvents).not.toContain('R04')
    expect(state.knowledge.player).not.toContain('K02')
  })

  it('keeps S20 and S27 optional questions behind explicit Send and grants no private file', () => {
    let state: GameSave = researchStart()
    state = { ...state, e01: { ...state.e01!, sceneId: 'E01-S20', s20NoticeSeen: true } }
    state = draftPhase03b(state,'P-S20-A')
    expect(state.messages.find(message => message.id === 'player.P-S20-A')).toBeUndefined()
    state = sendPhase03b(state,100)
    expect(state.messages.find(message => message.id === 'player.P-S20-A')?.recipient).toBe('maya')
    state = dueEvent(state,1_000)
    state = dueEvent(state,1_000)
    state = { ...state, e01: { ...state.e01!, sceneId: 'E01-S27' } }
    state = draftPhase03b(state,'P-S27-A')
    expect(state.deliveredEvents).not.toContain('R04')
    state = sendPhase03b(state,1_100)
    expect(state.messages.find(message => message.id === 'player.P-S27-A')?.attachmentIds).toBeUndefined()
    expect(state.knowledge.characters.maya).not.toContain('K02.public-finding')
  })

  it('checks finalized asset bytes, one-session issue, four interactive checks and K02 citations', async () => {
    vi.stubGlobal('crypto',webcrypto)
    const bytes = new TextEncoder().encode(gcroMaster)
    expect(bytes.byteLength).toBe(gcroIssueBytes)
    expect(await checkGcroBytes(bytes,gcroIssueDigest,gcroIssueBytes)).toBe(true)
    const changed = new Uint8Array(bytes); changed[100] ^= 1
    expect(await checkGcroBytes(changed,gcroIssueDigest,gcroIssueBytes)).toBe(false)
    let state = toRequest()
    state = selectS27Scope(state,'redacted')
    state = submitS27Request(state,100)
    expect(state.e01?.s27Status).toBe('reviewing')
    expect(state.deliveredEvents).not.toContain('R04')
    state = dueEvent(state,1400)
    expect(state.e01?.sceneId).toBe('E01-S28')
    expect(state.e01?.s28Issue?.recipient).toBe(state.e01?.s27Session)
    expect(await finishS28(state)).toBe(state)
    for (let page=1;page<=4;page++) state = openS28Page(state,page)
    expect(await checkS28(state,'office','GCRO')).toBe(state)
    state = openS28Directory(state)
    expect(await checkS28(state,'transfer','maya')).toBe(state)
    for (const [kind,choice] of [['office','GCRO'],['lineage','full-chain'],['pages','four-redacted'],['transfer','own-session']] as const) state = await checkS28(state,kind,choice)
    state = await finishS28(state)
    expect(state.deliveredEvents.filter(id => id === 'R04')).toHaveLength(1)
    expect(state.knowledge.player).not.toContain('K02')
    expect(citeS29(state,'E001')).toBe(state)
    for (const source of ['E012','E003','E002']) state = citeS29(state,source)
    state = saveS29Finding(state)
    expect(state.knowledge.player).toContain('K02')
    expect(state.e01?.sceneId).toBe('E01-S30')
    state = checkS30Role(state)
    state = saveS30Question(state,'role-class')
    state = draftPhase03b(state,'P-S30-A')
    expect(state.knowledge.characters.maya).not.toContain('S30.role-class-capability')
    state = sendPhase03b(state,1_000)
    expect(state.messages.find(message => message.id === 'player.P-S30-A')?.disclosedFactIds).toEqual(['S30.role-class-capability'])
    expect(state.messages.find(message => message.id === 'player.P-S30-A')?.attachmentIds).toBeUndefined()
    expect(state.knowledge.characters.maya).toContain('S30.role-class-capability')
    expect(state.knowledge.characters.maya).not.toContain('K02')
    expect(completeS30(state)).toBe(state)
    for (let index=0;index<12;index++) state = dueEvent(state,10_000)
    expect(completeS30(state).e01?.e01Complete).toBe(true)
    await writeGame(state)
    const reload = await loadGame()
    expect(reload.error).toBeUndefined()
    expect(reload.save.e01?.sceneId).toBe('E01-S30')
    expect(reload.save.deliveredEvents.filter(id => id === 'R04')).toHaveLength(1)
    vi.unstubAllGlobals()
  })

  it('quarantines a mismatched issue envelope instead of granting R04', async () => {
    vi.stubGlobal('crypto',webcrypto)
    let state = selectS27Scope(toRequest(),'redacted')
    state = dueEvent(submitS27Request(state,100),1400)
    state = openS28Directory(state)
    for (let page=1;page<=4;page++) state = openS28Page(state,page)
    state = { ...state, e01: { ...state.e01!, s28Issue: { ...state.e01!.s28Issue!, digest: '0'.repeat(64) } } }
    expect(await checkS28(state,'transfer','own-session')).toBe(state)
    expect(await finishS28(state)).toBe(state)
    expect(state.deliveredEvents).not.toContain('R04')
    vi.unstubAllGlobals()
  })

  it('uses the narrower process ending when the role card is unavailable', () => {
    let state: GameSave = researchStart()
    state = { ...state, e01: { ...state.e01!, sceneId: 'E01-S30', s30PublicStatus: 'unavailable' }, deliveredEvents: [...state.deliveredEvents,'R04'], knowledge: { ...state.knowledge, player: [...state.knowledge.player,'K02'] } }
    state = checkS30Role(state)
    expect(state.e01?.s30Hook).toBe('fallback')
    expect(saveS30Question(state,'role-class')).toBe(state)
    state = saveS30Question(state,'process-open')
    expect(draftPhase03b(state,'P-S30-A')).toBe(state)
    state = draftPhase03b(state,'P-S30-C')
    state = sendPhase03b(state,1_000)
    expect(state.knowledge.characters.maya).toContain('S30.process-open-role-unknown')
    expect(state.knowledge.characters.maya).not.toContain('S30.role-class-capability')
    for (let index=0;index<5;index++) state = dueEvent(state,10_000)
    expect(completeS30(state).e01?.e01Complete).toBe(true)
  })
})
