import { describe,expect,it } from 'vitest'
import { NaturalFixture } from '../../tests/helpers/naturalConversation'
import { ConversationFixture } from '../../tests/helpers/versionHistoryConversation'
import { naturalDeskAck, naturalInquiryChoice, naturalInquiryQuestions, naturalSourceKeys, naturalSources, naturalSummaryChoice } from '../content/naturalConversation'
import { canOpenPublisherInquiry, canOpenScene6Register } from './investigationAccess'
import { naturalCoreReady, migrateNaturalLocks } from './naturalConversation'
import { traceAction } from './trace'
import { traceDurationMs } from '../content/traceReference'
import { correctionsDeskAction, resumeScene0607 } from './scene06'
import { draftActIChoice,pauseScene03,sendScene01Choice } from './scene01'
import { normalizeSave } from './engine'
import { versionHistoryAction } from './scene05'
import { versionHistoryDialogue } from '../content/versionHistoryConversationData'
import { phoneNotices } from './phonePresentation'
import { starredNumberAction } from './starredNumberV2'

const round=(s:NaturalFixture['save'])=>normalizeSave(JSON.parse(JSON.stringify(s)))
describe('natural Scenes 4–6 conversation and explicit permissions',()=>{
  it('starts Scene 5 on the authored message after explicit bridge findings, never animation alone',()=>{
    const f=new NaturalFixture().bridge().install()
    const read=[...f.save.chapter1!.publicStory!.flags],before=f.save
    f.save=traceAction(traceAction(f.save,{type:'start'},f.now),{type:'checkpoint',elapsedMs:traceDurationMs,status:'complete'},f.now)
    expect(f.save.chapter1!.versionHistory).toBeUndefined()
    expect(f.save.evidence).toEqual(before.evidence)
    f.save=traceAction(f.save,{type:'findings'},f.now)
    expect(f.save.chapter1!.versionHistory).toBeUndefined()
    expect(f.save.deliveredEvents).toContain('TRACE_INDEX_FINDINGS_VIEWED')
    f.unknown()
    expect(f.save.chapter1!.sender.messages.at(-1)?.text).toBe('Did the reference tell you what happened to the article?')
    expect(f.node().id).toBe('OPEN-VH-NAT-C01')
    expect(f.save.chapter1!.publicStory!.flags).toEqual(expect.arrayContaining(read))
    expect(f.save.chapter1!.versionHistory!.flags).toContain('public')
    expect(f.save.chapter1!.versionHistory!.flags).not.toContain('update_analysis_saved')
    expect(round(f.save)).toEqual(f.save)
  })
  for(const order of [['article','index','policy'],['article','policy','index'],['index','article','policy'],['index','policy','article'],['policy','article','index'],['policy','index','article']] as const)it(`discusses actual sources in ${order.join(', ')} order, with a separate Send for each`,()=>{
    const f=new NaturalFixture().bridge().install().scan().unknown().send('a')
    const analysis=f.save.evidence['EV-TRACE-REF-001']
    for(const source of order){
      f.observe(source)
      expect(f.node().id).toBe(naturalSources[source].choice)
      expect(f.save.chapter1!.versionHistory!.chatChoices?.[naturalSourceKeys[source]]).toBeUndefined()
      const before=f.save
      expect(sendScene01Choice(before,'b','',true,f.now)).toBe(before)
      f.save=round(pauseScene03(draftActIChoice(f.save,'b'),f.now));f.unknown()
      expect(f.save.prologue!.scene01!.draft?.choiceId).toBe('b')
      f.send('b')
      expect(f.save.chapter1!.versionHistory!.chatChoices?.[naturalSourceKeys[source]]).toBe('b')
    }
    expect(f.node().id).toBe('OPEN-VH-NAT-C05')
    f.send('b').send('c').send('a')
    expect(naturalCoreReady(f.save)).toBe(true)
    expect(f.save.chapter1!.versionHistory!.complete).toBe(true)
    expect(f.save.chapter1!.versionHistory!.checklist).toEqual([])
    expect(f.save.evidence['EV-TRACE-REF-001']).toEqual(analysis)
    expect(f.save.chapter1!.correctionsDesk).toBeUndefined()
    expect(round(f.save)).toEqual(f.save)
  })
  it('locks every reducer entry until both the actual Unknown instruction and acknowledgment Send exist',()=>{
    const f=new NaturalFixture().main()
    expect(canOpenScene6Register(f.save)).toBe(false)
    for(const action of [{type:'enter'},{type:'activate'},{type:'panel',panel:'register'},{type:'panel',panel:'form'},{type:'save-finding'}] as const)expect(correctionsDeskAction(f.save,action,f.now)).toBe(f.save)
    expect(versionHistoryAction(f.save,{type:'panel',panel:'form'},f.now)).toBe(f.save)
    expect(phoneNotices(f.save).some(n=>n.id==='CH1-S06-LEAD')).toBe(false)
    f.tickOne().unknown()
    expect(f.node().id).toBe(naturalDeskAck)
    expect(canOpenScene6Register(f.save)).toBe(false)
    f.save=round(draftActIChoice(f.save,'c'))
    expect(canOpenScene6Register(f.save)).toBe(false)
    f.send('c')
    expect(canOpenScene6Register(f.save)).toBe(true)
    expect(f.save.chapter1!.correctionsDesk!.visible).toBe(false)
    expect(canOpenPublisherInquiry(f.save)).toBe(false)
    expect(round(f.save)).toEqual(f.save)
  })
  it('saves the register privately once and waits for a sent summary and closing NPC line before completion',()=>{
    const f=new NaturalFixture().main().authorize(),before=f.save
    f.register()
    const note=f.save.evidence['NOTE-S06-DESK-LIMITS'],out=f.save.chapter1!.versionHistory!.receipts!.filter(r=>r.recipient==='unknown')
    expect(f.save.chapter1!.correctionsDesk!.complete).toBe(false)
    expect(f.save.chapter1!.completed).not.toContain(6)
    expect(f.node().id).toBe(naturalSummaryChoice)
    expect(out).toEqual(before.chapter1!.versionHistory!.receipts!.filter(r=>r.recipient==='unknown'))
    f.desk({type:'save-finding'})
    expect(f.save.evidence['NOTE-S06-DESK-LIMITS']).toEqual(note)
    f.unknown();f.save=draftActIChoice(f.save,'b');f.save=sendScene01Choice(f.save,'b','',true,f.now)
    expect(f.save.chapter1!.correctionsDesk!.complete).toBe(false)
    f.drain()
    expect(f.save.chapter1!.correctionsDesk!.complete).toBe(true)
    expect(f.save.chapter1!.completed).toContain(6)
    expect(f.save.chapter1!.starredNumberV2).toBeUndefined()
    expect(f.node().id).toBe(naturalInquiryChoice)
    expect(canOpenPublisherInquiry(f.save)).toBe(false)
    expect(round(f.save)).toEqual(f.save)
  })
  for(const branch of ['b','c'])it(`keeps publisher contact optional on ${branch}, preserving a draft without delivery`,()=>{
    const f=new NaturalFixture().main().authorize().register().send('c').send(branch)
    expect(f.save.chapter1!.correctionsDesk!.complete).toBe(true)
    expect(canOpenPublisherInquiry(f.save)).toBe(false)
    expect(f.save.deliveredEvents).not.toContain('R-GB-CD-002')
    if(branch==='c')expect(f.save.chapter1!.correctionsDesk!.inquiry).toMatchObject({status:'draft',text:naturalInquiryQuestions[0]})
    expect(correctionsDeskAction(f.save,{type:'panel',panel:'form'},f.now)).toBe(f.save)
    expect(round(f.save)).toEqual(f.save)
    f.do({type:'revisit-inquiry'}).send('a')
    expect(canOpenPublisherInquiry(f.save)).toBe(true)
  })
  it('requires opt-in Send, question selection, Review and Send Request; no step auto-submits',()=>{
    const f=new NaturalFixture().main().authorize().register().send('a')
    f.save=draftActIChoice(f.save,'a')
    expect(canOpenPublisherInquiry(f.save)).toBe(false)
    f.send('a')
    expect(canOpenPublisherInquiry(f.save)).toBe(true)
    f.desk({type:'panel',panel:'form'}).desk({type:'local',id:'S06-C06',choice:'b'})
    expect(f.save.deliveredEvents).not.toContain('R-GB-CD-002')
    expect(correctionsDeskAction(f.save,{type:'send-request'},f.now)).toBe(f.save)
    f.desk({type:'review'})
    expect(f.save.deliveredEvents).not.toContain('R-GB-CD-002')
    f.save=round(f.save);f.desk({type:'send-request'})
    expect(f.save.chapter1!.correctionsDesk!.inquiry.receipt?.id).toBe('R-GB-CD-002')
    const before=f.save;f.desk({type:'send-request'})
    expect(f.save).toBe(before)
    expect(f.save.pendingEvents.some(e=>e.id==='CH1-S06-DESK-REPLY')).toBe(false)
  })
  it('repairs unfinished legacy Scene 6 access without rewriting history, faking permission or duplicating a prior request',()=>{
    const f=new ConversationFixture().core()
    const p=f.save.chapter1!.versionHistory!,text=versionHistoryDialogue[7].branches[0].text
    p.inquiry={status:'delivered',choice:'a',text,receipt:{id:'R-GB-VH-001',text,at:f.now}}
    f.save.deliveredEvents.push('R-GB-VH-001')
    const history=structuredClone(f.save.chapter1!.sender.messages),knowledge=structuredClone(f.save.knowledge)
    f.save=resumeScene0607(f.save,f.now)
    for(let i=0;i<3;i++)f.save=migrateNaturalLocks(round(f.save),f.now)
    expect(f.save.chapter1!.sender.messages).toEqual(history)
    expect(f.save.knowledge).toEqual(knowledge)
    expect(canOpenScene6Register(f.save)).toBe(false)
    expect(f.save.choices[naturalDeskAck]).toBeUndefined()
    expect(f.save.pendingEvents.filter(e=>e.id==='CH1-VH-NAT-REGISTER')).toHaveLength(1)
    expect(f.save.chapter1!.versionHistory!.inquiry.receipt?.text).toBe(text)
    expect(f.save.deliveredEvents.filter(id=>id==='R-GB-VH-001')).toHaveLength(1)
  })
  it('keeps an old source conversation, selected draft and pending typing on their pinned graph',()=>{
    const f=new ConversationFixture().bridge().install().enter().sources().unknown()
    f.save=draftActIChoice(f.save,'b')
    const before=round(pauseScene03(f.save,f.now))
    f.save=migrateNaturalLocks(before,f.now)
    expect(f.save).toBe(before)
    expect(f.save.prologue!.scene01!.naturalFlowRevision).toBeUndefined()
    f.unknown()
    expect(f.save.prologue!.scene01!.draft?.choiceId).toBe('b')
    f.save=sendScene01Choice(f.save,'b','',true,f.now)
    const pending=f.save.prologue!.scene01!.queue[0]
    expect(pending).toBeDefined()
    f.save=round(pauseScene03(f.save,f.now+100))
    expect(f.save.chapter1!.versionHistory!.threads.unknown?.paused?.remainingMs).toBe(pending.dueAt-f.now-100)
    f.unknown()
    expect(f.save.chapter1!.sender.messages.filter(m=>m.id==='OPEN-VH-C01-PLAYER-b')).toHaveLength(1)
  })
  it('retains the original historical inquiry draft until its actual opt-in, review and Send',()=>{
    const f=new NaturalFixture().main(),text=versionHistoryDialogue[7].branches[1].text
    f.save.chapter1!.versionHistory!.inquiry={status:'draft',choice:'b',text}
    f.authorize().register().send('a').send('c')
    expect(f.save.chapter1!.versionHistory!.inquiry).toMatchObject({status:'draft',text})
    expect(f.save.chapter1!.correctionsDesk!.inquiry.text).toBeUndefined()
    expect(versionHistoryAction(f.save,{type:'review'},f.now)).toBe(f.save)
    f.do({type:'revisit-inquiry'}).send('a').do({type:'panel',panel:'form'}).do({type:'review'})
    expect(f.save.chapter1!.versionHistory!.inquiry.receipt).toBeUndefined()
    f.save=round(f.save);f.do({type:'send-request'})
    expect(f.save.chapter1!.versionHistory!.inquiry.receipt).toMatchObject({id:'R-GB-VH-001',text})
    expect(f.save.pendingEvents.some(e=>e.id==='CH1-S06-DESK-REPLY')).toBe(false)
    expect(correctionsDeskAction(f.save,{type:'send-request'},f.now)).toBe(f.save)
  })
  it('preserves a legitimately completed Scene 6 and keeps the next scene a manual action',()=>{
    const f=new NaturalFixture().main().authorize().register().send('a').send('b')
    const completed=round(f.save)
    expect(resumeScene0607(completed,f.now)).toBe(completed)
    expect(canOpenScene6Register(completed)).toBe(true)
    expect(completed.chapter1!.starredNumberV2).toBeUndefined()
    f.save=starredNumberAction(completed,{type:'enter'},f.now)
    expect(f.save.chapter1!.starredNumberV2?.visible).toBe(true)
  })
})
