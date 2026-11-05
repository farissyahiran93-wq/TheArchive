import { describe, expect, it } from 'vitest'
import { ConversationFixture } from '../../tests/helpers/versionHistoryConversation'
import { ActIFinalFixture } from '../../tests/helpers/actIFinal'
import { Scene04Fixture } from '../../tests/helpers/scene04Final'
import { traceAnalysisId, traceDurationMs } from '../content/traceReference'
import { actINodes } from '../content/actIRegistry'
import { normalizeSave } from './engine'
import { newGame } from './types'
import { beginScene01, draftActIChoice, pauseScene03, sendScene01Choice } from './scene01'
import { originAction } from './archiveOrigin'
import { versionHistoryAction } from './scene05'
import { traceToolAvailable } from './traceTools'
import { bulletinLinkReceived, traceAction, tracePresentation, traceReferenceAvailable } from './trace'

const round=(s:ReturnType<typeof newGame>)=>normalizeSave(JSON.parse(JSON.stringify(s)))
describe('TRACE local reference investigation',()=>{
  it('activates Bulletin only from the actual delivered Sophie attachment, including historical saves',()=>{
    let s=newGame()
    expect(bulletinLinkReceived(s)).toBe(false)
    const f=new ConversationFixture()
    expect(bulletinLinkReceived(f.save)).toBe(true)
    expect(bulletinLinkReceived(round(f.save))).toBe(true)
    s=structuredClone(f.save)
    s.deliveredEvents=s.deliveredEvents.filter(id=>id!=='OPEN-S04-ARTICLE-ATTACHMENT')
    expect(bulletinLinkReceived(s)).toBe(false)
    s=structuredClone(f.save)
    s.prologue!.scene01!.messages=s.prologue!.scene01!.messages.filter(m=>m.id!=='OPEN-S04-ARTICLE-ATTACHMENT')
    expect(s.chapter1!.publicStory!.flags).toContain('article-inspected')
    expect(bulletinLinkReceived(s)).toBe(false)
  })
  it('does not deliver the link merely from opening Sophie before the authored article gate',()=>{
    const f=new Scene04Fixture(new ActIFinalFixture(beginScene01(newGame(),1800000000000)).until('complete').save)
    expect(bulletinLinkReceived(f.save)).toBe(false)
    f.at('OPEN-S04-ARTICLE-GATE')
    expect(bulletinLinkReceived(f.save)).toBe(true)
  })
  it('keeps TRACE unavailable before voluntary installation and never unlocks a decryptor',()=>{
    const f=new ConversationFixture().bridge()
    expect(traceReferenceAvailable(f.save)).toBe(false)
    expect(traceAction(f.save,{type:'start'})).toBe(f.save)
    f.install()
    expect(traceReferenceAvailable(f.save)).toBe(true)
    expect(traceToolAvailable(f.save,'decryptor')).toBe(false)
    expect(traceToolAvailable(f.core().save,'decryptor')).toBe(false)
  })
  it('separates animation completion from explicit inspection, evidence and narrative progress',()=>{
    const f=new ConversationFixture().bridge().install(),before=f.save
    f.save=traceAction(f.save,{type:'start'},f.now)
    expect(traceAction(f.save,{type:'findings'},f.now)).toBe(f.save)
    f.save=traceAction(f.save,{type:'checkpoint',elapsedMs:traceDurationMs,status:'complete'},f.now)
    expect(f.save.evidence).toEqual(before.evidence)
    expect(f.save.knowledge).toEqual(before.knowledge)
    expect(f.save.chapter1!.archiveOrigin!.initialInspected).toBe(false)
    expect(f.save.chapter1!.completed).toEqual(before.chapter1!.completed)
    expect(f.save.pendingEvents).toEqual(before.pendingEvents)
    f.save=traceAction(f.save,{type:'findings'},f.now)
    expect(f.save.chapter1!.archiveOrigin!.initialInspected).toBe(true)
    expect(f.save.evidence[traceAnalysisId]).toMatchObject({verified:false,collectedAt:f.now})
    expect(f.save.evidence['EV-INDEX-GB-041']).toBeDefined()
    expect(f.save.pendingEvents.filter(e=>e.id==='CH1-ARCHIVE-FOLLOWUP')).toHaveLength(1)
    expect(f.save.knowledge).toEqual(before.knowledge)
    expect(round(f.save)).toEqual(f.save)
  })
  it('replays without duplicating evidence, messages, relationships, deadlines or receipt time',()=>{
    const f=new ConversationFixture().bridge().install()
    let s=traceAction(traceAction(traceAction(f.save,{type:'start'}),{type:'checkpoint',elapsedMs:traceDurationMs,status:'complete'}),{type:'findings'},123)
    const before=s
    for(let i=0;i<3;i++)s=traceAction(traceAction(traceAction(s,{type:'start'}),{type:'checkpoint',elapsedMs:traceDurationMs,status:'complete'}),{type:'findings'},999)
    expect(s.evidence).toEqual(before.evidence)
    expect(s.relationships).toEqual(before.relationships)
    expect(s.knowledge).toEqual(before.knowledge)
    expect(s.pendingEvents).toEqual(before.pendingEvents)
    expect(s.deliveredEvents).toEqual(before.deliveredEvents)
    expect(s.chapter1!.sender).toEqual(before.chapter1!.sender)
  })
  it('resumes saved elapsed time and rejects invalid progress without affecting chapter locks',()=>{
    let s=traceAction(new ConversationFixture().bridge().install().save,{type:'start'})
    s=round(traceAction(s,{type:'checkpoint',elapsedMs:2300,status:'paused'}))
    s=round(traceAction(s,{type:'scroll',key:'tracker',value:155}))
    expect(s.chapter1!.trace!.scroll?.tracker).toBe(155)
    expect(s.chapter1!.trace!.scan).toEqual({status:'paused',elapsedMs:2300})
    s=traceAction(s,{type:'start'})
    expect(s.chapter1!.trace!.scan).toEqual({status:'running',elapsedMs:2300})
    for(const value of [NaN,Infinity,-1,2000])expect(traceAction(s,{type:'checkpoint',elapsedMs:value,status:'paused'})).toBe(s)
    expect(()=>round({...s,chapter1:{...s.chapter1!,trace:{...s.chapter1!.trace!,scan:{status:'complete',elapsedMs:1}}}})).toThrow('Invalid TRACE')
    expect(s.chapter2Access).toBeUndefined()
    expect(s.chapter1!.chapterComplete).toBe(false)
  })
  it('offers a distinct already-read entry while retaining mandatory policy and explicit Sends',()=>{
    const f=new ConversationFixture().bridge().install().origin('inspect').do({type:'enter'}).unknown()
    const p=f.save.chapter1!.versionHistory!
    expect(p.flags).toContain('public')
    expect(p.flags).toContain('index_requested')
    expect(p.flags).not.toContain('policy')
    expect(p.flags).not.toContain('article_metadata_inspected')
    expect(f.save.prologue!.scene01!.traceUiRevision).toBe('2026-11-03')
    expect(f.save.chapter1!.sender.messages.some(m=>m.attachment==='index')).toBe(true)
    expect(f.save.chapter1!.sender.messages.some(m=>m.text.includes("don't need to read it again"))).toBe(true)
    const node=f.node()
    if(node.kind!=='choice')throw Error(node.id)
    expect(node.id).toBe('OPEN-VH-NEW-C01')
    expect(node.choices.map(c=>c.text)).toEqual(["I'll trace the reference and see what it holds.",'Why should I trust a reference you added?',"I'll check the fields. A match won't prove an edit."])
    const before=f.save
    expect(sendScene01Choice(before,'b','',true,f.now)).toBe(before)
    f.save=round(pauseScene03(draftActIChoice(f.save,'b'),f.now));f.unknown()
    expect(f.save.prologue!.scene01!.draft?.choiceId).toBe('b')
    f.send('b')
    expect(f.node().id).toBe('OPEN-VH-NEW-SOURCE-HUB')
    expect(f.save.chapter1!.versionHistory!.complete).toBe(false)
  })
  it('leaves an already-started historical graph, read state and delivered text pinned',()=>{
    const f=new ConversationFixture().bridge().install().enter().sources().unknown(),before=round(f.save)
    const s=versionHistoryAction(before,{type:'enter'})
    expect(s.prologue!.scene01!.traceUiRevision).toBeUndefined()
    expect(actINodes(s.prologue!.scene01)['OPEN-VH-C01']).toEqual(actINodes(before.prologue!.scene01)['OPEN-VH-C01'])
    expect(s.chapter1!.sender.messages).toEqual(before.chapter1!.sender.messages)
    expect(s.chapter1!.versionHistory!.flags).toContain('public')
    expect(originAction(s,{type:'close-index'}).chapter1!.versionHistory!.flags).toContain('public')
  })
  it('honors the earlier aligned save read receipt without retagging already-started Version History',()=>{
    const f=new ConversationFixture().bridge().install().origin('inspect')
    delete f.save.prologue!.scene01!.traceIntroRevision
    f.do({type:'enter'}).unknown()
    expect(f.save.prologue!.scene01!.traceUiRevision).toBe('2026-11-03')
    expect(f.node().id).toBe('OPEN-VH-NEW-C01')
    expect(round(f.save).chapter1!.versionHistory!.flags).toContain('public')
  })
  it('uses a bounded five-phase presentation with conservative terminal outcomes',()=>{
    expect([0,1400,2800,4200,5600].map(t=>tracePresentation(t).stage)).toEqual(['INITIALIZING','INDEX LOOKUP','FIELD MATCH','VERIFYING SOURCE LIMITATIONS','COMPLETE'])
    expect(tracePresentation(100000)).toMatchObject({progress:100,logCount:8})
    expect(tracePresentation(-1).progress).toBe(0)
  })
})
