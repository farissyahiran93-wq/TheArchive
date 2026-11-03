import { scene05Local } from '../content/scene05Final'
import { describe, expect, it } from 'vitest'
import { ConversationFixture } from '../../tests/helpers/versionHistoryConversation'
import { Scene05Fixture } from '../../tests/helpers/scene05Final'
import { correctionsDeskAction, deskTick, resumeScene0607 } from './scene06'
import { sourceAction, sourceTick } from './sourceInvestigation'
import { draftActIChoice, scene01Choices } from './scene01'
import { normalizeSave } from './engine'

function revisionFixture(prior=false){
 const f=new Scene05Fixture();f.core();f.do({type:'local',id:'S05-C11',choice:'a'})
 if(prior){const inquiry=f.save.chapter1!.versionHistory!.inquiry,text=scene05Local['S05-C04'][0].text;Object.assign(inquiry,{status:'delivered',choice:'a',text,receipt:{id:'R-GB-VH-001',text,at:f.now}});f.save.deliveredEvents.push('R-GB-VH-001')}
 f.save=correctionsDeskAction(f.save,{type:'activate'},f.now)
 return f
}
function send(f:Scene05Fixture,id:string){f.save=draftActIChoice(f.save,id);f.send(id)}
describe('Scene 06/07 revised conversations',()=>{
 for(const id of ['a','b','c'])it(`Desk ${id} waits for an explicit send and retains its answer`,()=>{
  const f=revisionFixture(true);f.save=deskTick(f.save,f.now+1600);f.save=correctionsDeskAction(f.save,{type:'thread',thread:'desk'},f.now+1600);f.drain()
  expect(f.save.chapter1!.correctionsDesk!.inbox).toHaveLength(0)
  expect(scene01Choices(f.save)).toHaveLength(3)
  send(f,id);expect(f.save.chapter1!.correctionsDesk!.inbox.filter(x=>x.sender==='player')).toHaveLength(1)
  expect(f.save.chapter1!.correctionsDesk!.inbox.filter(x=>x.sender==='desk')).toHaveLength(3)
  expect(f.node().id).toBe('OPEN-S06-REV-DESK-FOLLOW')
  f.save=normalizeSave(JSON.parse(JSON.stringify(f.save)));send(f,'a')
  expect(f.save.chapter1!.correctionsDesk!.threads.desk?.complete).toBe(true)
 })
 for(const id of ['a','b','c'])it(`Nora ${id} requires review and delivers the authored conversation after Send`,()=>{
  const f=revisionFixture();f.save=correctionsDeskAction(f.save,{type:'panel',panel:'register'},f.now);f.save=correctionsDeskAction(f.save,{type:'save-finding'},f.now)
  f.save=sourceAction(f.save,7,{type:'enter'},f.now)
  f.save=sourceAction(f.save,7,{type:'panel',panel:'article'},f.now);f.save=sourceAction(f.save,7,{type:'panel',panel:'profile'},f.now);f.save=sourceAction(f.save,7,{type:'read',page:'profile'},f.now)
  f.save=sourceAction(f.save,7,{type:'panel',panel:'form'},f.now);f.save=sourceAction(f.save,7,{type:'local',id:'S07-C08',choice:id},f.now)
  f.save=sourceAction(f.save,7,{type:'send-request'},f.now);expect(f.save.chapter1!.byline!.inquiry.receipt).toBeUndefined()
  f.save=sourceAction(f.save,7,{type:'review'},f.now);f.save=sourceAction(f.save,7,{type:'send-request'},f.now)
  const due=f.save.pendingEvents.find(x=>x.id==='CH1-S07-SOURCE-REPLY')!.dueAt
  expect(f.save.chapter1!.byline!.inbox.filter(x=>x.sender==='player')).toHaveLength(1)
  expect(sourceTick(f.save,due-1).chapter1!.byline!.reply).toBeUndefined()
  f.save=sourceTick(f.save,due);f.save=normalizeSave(JSON.parse(JSON.stringify(f.save)))
  f.now=due;f.save=sourceAction(f.save,7,{type:'thread',thread:'professional'},f.now);f.drain()
  expect(f.node().id).toBe('OPEN-S07-REV-NORA-FOCUS')
  for(const choice of ['a','b','c'])send(f,choice)
  expect(f.save.chapter1!.byline!.inbox.some(x=>x.text.includes('Real people are attached'))).toBe(true)
  if(f.node().id==='OPEN-S07-REV-NORA-INDEX')send(f,'c')
  expect(f.save.chapter1!.byline!.threads.professional?.complete).toBe(true)
 })
 for(const scene of [6,7] as const)for(const thread of ['sophie','group'] as const)for(const id of ['a','b','c'])it(`Scene ${scene} ${thread} ${id} sends only the selected statement`,()=>{
  const f=revisionFixture();f.save=correctionsDeskAction(f.save,{type:'panel',panel:'register'},f.now);f.save=correctionsDeskAction(f.save,{type:'save-finding'},f.now)
  f.save.prologue!.scene01!.invitation='joined';f.save.prologue!.scene01!.groupMembers={sophie:true,maya:true,lucas:false}
  if(scene===6)f.save=correctionsDeskAction(f.save,{type:'thread',thread},f.now)
  else{f.save=sourceAction(f.save,7,{type:'enter'},f.now);for(const page of ['article','profile'])f.save=sourceAction(f.save,7,{type:'panel',panel:page},f.now);f.save=sourceAction(f.save,7,{type:'save-source-question'},f.now);f.save=sourceAction(f.save,7,{type:'thread',thread},f.now)}
  f.drain();const before=f.save.messages.length;expect(scene01Choices(f.save).some(x=>x.id===id)).toBe(true)
  send(f,id);if(thread==='sophie'&&id==='a')send(f,'a')
  expect(f.save.messages.length-before).toBe(thread==='group'?2:id==='a'?2:1)
  expect(f.save.knowledge.characters.lucas.filter(x=>x.includes(`OPEN-S0${scene}-REV-`))).toHaveLength(0)
  expect(normalizeSave(JSON.parse(JSON.stringify(f.save)))).toEqual(f.save)
 })

 for(const id of ['a','b','c'])it(`new Desk request ${id} remains receipt-only after review, reload and repeated Send`,()=>{
  const f=revisionFixture();f.save=correctionsDeskAction(f.save,{type:'panel',panel:'form'},f.now)
  f.save=correctionsDeskAction(f.save,{type:'local',id:'S06-C06',choice:id},f.now)
  const draft=f.save;f.save=correctionsDeskAction(f.save,{type:'send-request'},f.now);expect(f.save).toBe(draft)
  f.save=correctionsDeskAction(f.save,{type:'review'},f.now);f.save=correctionsDeskAction(f.save,{type:'send-request'},f.now)
  expect(f.save.chapter1!.correctionsDesk!.inquiry.receipt?.id).toBe('R-GB-CD-002')
  expect(f.save.chapter1!.correctionsDesk!.inbox).toHaveLength(0)
  f.save=normalizeSave(JSON.parse(JSON.stringify(f.save)));const saved=f.save
  f.save=correctionsDeskAction(f.save,{type:'send-request'},f.now+5000);expect(f.save).toBe(saved)
  expect(f.save.chapter1!.correctionsDesk!.reply).toBeUndefined()
 })

 it('resumes unfinished old Scene 06 without removing evidence, pending work or prior messages',()=>{
  const f=new ConversationFixture().core(),desk=f.save.chapter1!.correctionsDesk!
  delete desk.flowRevision;desk.flags.push('register-read');desk.cards.push('article')
  const evidence=structuredClone(f.save.evidence),messages=structuredClone(f.save.messages),prior=structuredClone(desk)
  const migrated=resumeScene0607(f.save,f.now)
  expect(migrated.chapter1!.correctionsDesk).toMatchObject({...prior,flowRevision:'2026-10-31'})
  expect(migrated.evidence).toEqual(evidence);expect(migrated.messages).toEqual(messages)
  expect(resumeScene0607(migrated,f.now+1000)).toBe(migrated)
  expect(normalizeSave(JSON.parse(JSON.stringify(migrated)))).toEqual(migrated)
 })
 it('does not revise an already completed historical Scene 06',()=>{
  const f=new ConversationFixture().core();const desk=f.save.chapter1!.correctionsDesk!
  delete desk.flowRevision;desk.complete=true
  expect(resumeScene0607(f.save,f.now)).toBe(f.save)
 })

})
