import {describe,it,expect} from 'vitest'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {SourceFixture} from '../../tests/helpers/sourceInvestigation'
import {sourceInvestigations,sourceInvestigationNodes} from '../content/sourceInvestigations'
import {sourceAction,sourceState,sourceTick,sourceEligible,sourceReady,sourceAskFirst,pauseSource,validateSourceInvestigation} from './sourceInvestigation'
import {draftActIChoice,scene01Choices,sendScene01Choice,openScene03} from './scene01'
import {normalizeSave} from './engine'
import {newGame} from './types'

describe('Final source investigations',()=>{
 for(const n of [7,8] as const){
  it(`pins Scene ${n} dialogue, pages and all stable choices to its manuscript`,()=>{
   const raw=readFileSync(`docs/sources/scene0${n}-final/FULL_SCRIPT.txt`),s=raw.toString('utf8').replace(/\s+/g,' '),c=sourceInvestigations[n]
   expect(c.sourceSha256).toBe(createHash('sha256').update(raw).digest('hex'))
   expect(Object.keys(c.choices)).toEqual(Array.from({length:n===7?15:16},(_,i)=>`S0${n}-C${String(i+1).padStart(2,'0')}`))
   for(const set of Object.values(c.choices) as {options:readonly {id:string;text:string}[]}[]){expect(set.options.map(o=>o.id)).toEqual(['a','b','c']);for(const o of set.options)expect(s).toContain(o.text)}
   for(const page of Object.values(c.pages))for(const t of page.paragraphs)expect(s).toContain(t)
   for(const node of Object.values(sourceInvestigationNodes).filter(v=>v.id.startsWith(`OPEN-S0${n}-`))){if(node.kind==='npc')expect(s).toContain(node.text);if('next'in node&&node.next)expect(sourceInvestigationNodes[node.next]).toBeDefined()}
  })
  for(const choice of ['a','b','c'])it(`Scene ${n} final private stance ${choice} needs all gates and persists without any optional contact`,()=>{
   const f=new SourceFixture();if(n===8)f.core7().enter8();f.number=n
   const before=f.save;f.local(n===7?15:16,choice);expect(f.save).toBe(before)
   if(n===7)f.core7();else f.core8();expect(sourceReady(f.save,n)).toBe(true)
   const recipients=structuredClone(f.save.knowledge.characters),older=structuredClone(f.save.chapter1!.versionHistory)
   f.local(n===7?15:16,choice);expect(sourceState(f.save,n)?.complete).toBe(true);expect(f.save.knowledge.characters).toEqual(recipients);expect(f.save.chapter1?.versionHistory).toEqual(older)
   expect(normalizeSave(JSON.parse(JSON.stringify(f.save)))).toEqual(f.save)
   const saved=f.save;f.local(n===7?15:16,'b');expect(f.save).toBe(saved)
  })
  for(const choice of ['a','b','c'])it(`Scene ${n} inquiry ${choice} requires reviewed Send; delayed matching reply never grants unread knowledge`,()=>{
   const f=new SourceFixture().core7();if(n===8)f.enter8().core8()
   f.source({type:'panel',panel:'form'}).local(8,choice);const before=structuredClone(f.save.knowledge)
   f.source({type:'send-request'});expect(sourceState(f.save,n)?.inquiry.receipt).toBeUndefined()
   f.source({type:'review'});expect(f.save.knowledge).toEqual(before)
   f.source({type:'send-request'});const receipt=sourceState(f.save,n)!.inquiry.receipt!,due=f.save.pendingEvents.find(e=>e.id===`CH1-S0${n}-SOURCE-REPLY`)!.dueAt
   expect(receipt.text).toBe((sourceInvestigations[n].choices as Record<string,{options:readonly {id:string;text:string}[]}>)[`S0${n}-C08`].options.find(o=>o.id===choice)!.text)
   const sent=f.save;f.source({type:'send-request'});expect(f.save).toBe(sent)
   expect(sourceState(sourceTick(f.save,due-1),n)?.reply).toBeUndefined()
   f.save=normalizeSave(JSON.parse(JSON.stringify(f.save)));f.save=sourceTick(f.save,due);expect(sourceState(f.save,n)?.replyRead).toBe(false);expect(f.save.knowledge.player).toEqual(before.player)
   const delivered=f.save;expect(sourceTick(delivered,due+9999)).toBe(delivered)
   f.source({type:'thread',thread:n===7?'professional':'civic'});expect(sourceState(f.save,n)?.replyRead).toBe(true);expect(scene01Choices(f.save)).toHaveLength(3)
   const draft=f.save;f.save=draftActIChoice(f.save,'b');expect(sourceState(f.save,n)?.receipts).toEqual(sourceState(draft,n)?.receipts)
   f.save=pauseSource(f.save,n,f.now);f.save=normalizeSave(JSON.parse(JSON.stringify(f.save)));f.source({type:'thread',thread:n===7?'professional':'civic'});expect(f.save.prologue!.scene01!.draft?.choiceId).toBe('b');f.reply('b')
   expect(sourceState(f.save,n)?.threads[n===7?'professional':'civic']?.complete).toBe(true)
   expect(f.save.messages.filter(m=>m.recipient==='nora')).toEqual([])
  })
 }
 it('requires genuine preceding completion and manual entry; no legacy inference',()=>{
  const s=newGame();expect(sourceAction(s,7,{type:'enter'})).toBe(s);expect(sourceAction(s,8,{type:'enter'})).toBe(s)
  const f=new SourceFixture();expect(f.save.chapter1?.issuer).toBeUndefined();f.core7().local(15);expect(f.save.chapter1?.issuer).toBeUndefined();f.source({type:'next-lead'});expect(f.save.chapter1?.issuer).toBeDefined()
 })
 it('requires every deliberate tile inspection as well as acknowledgement',()=>{
  const f=new SourceFixture().inspect('article').inspect('profile').inspect('note');f.source({type:'panel',panel:'reference'}).source({type:'read',page:'reference'});expect(f.save.chapter1!.byline!.flags).not.toContain('reference-read')
  for(const id of ['issuer','content','cross-reference'])f.source({type:'inspect',id});expect(f.save.chapter1!.byline!.flags).not.toContain('reference-read');f.source({type:'read',page:'reference'});expect(f.save.chapter1!.byline!.flags).toContain('reference-read')
 })
 for(const opening of ['a','b','c'])it(`Sophie permission is actual branch ${opening}, C11-A is conditional and no draft speaks`,()=>{
  const f=new SourceFixture().core7();f.source({type:'thread',thread:'sophie'});expect(scene01Choices(f.save)).toHaveLength(3)
  const before=f.save;expect(sendScene01Choice(before,opening,'',false,f.now)).toBe(before)
  f.reply(opening);expect(f.save.chapter1!.byline!.privateConsent).toBe(opening==='a');const a=scene01Choices(f.save)[0]
  expect(a.text).toBe(opening==='a'?"The reporter's public note has a reference label, but no original document. That's all I can verify from it.":"I don't have a new fact I can stand behind yet.")
  f.reply('a');const lines=f.save.prologue!.scene01!.messages.filter(m=>m.id.startsWith('OPEN-S07-'));expect(lines.at(-1)?.text).toBe('Talk later.');expect(lines.filter(l=>l.text==='Thanks for asking first.')).toHaveLength(opening==='a'?1:0)
 })
 it('does not create Nora callback eligibility from drafts, unread replies or civic messages',()=>{
  const f=new SourceFixture().core7().enter8().core8();expect(sourceEligible(f.save,8,'professional')).toBe(false)
 })
 it('does not offer a group update about a new source before its explicit public read',()=>{
  const f=new SourceFixture();expect(sourceEligible(f.save,7,'group')).toBe(false);f.core7();expect(sourceEligible(f.save,7,'group')).toBe(true)
  f.enter8();expect(sourceEligible(f.save,8,'group')).toBe(false);f.inspect('directory');expect(sourceEligible(f.save,8,'group')).toBe(true)
 })
 it('does not let a Nora callback claim a civic route before directory observation',()=>{
  const f=new SourceFixture().core7();f.source({type:'panel',panel:'form'}).local(8).source({type:'review'}).source({type:'send-request'});f.save=sourceTick(f.save,f.now+=2000);f.source({type:'thread',thread:'professional'}).enter8()
  expect(sourceEligible(f.save,8,'professional')).toBe(false);f.inspect('directory');expect(sourceEligible(f.save,8,'professional')).toBe(true)
 })
 it('opening old Sophie Messages does not initiate a new optional investigation conversation',()=>{
  const f=new SourceFixture().core7(),before=f.save
  expect(openScene03(before,f.now)).toBe(before)
  f.enter8().core8();expect(openScene03(f.save,f.now)).toBe(f.save)
  f.source({type:'thread',thread:'sophie'});expect(f.save.prologue!.scene01!.nodeId).toBe('OPEN-S08-C13')
 })
 it('opening a Nora notification alone does not grant a read reply or the Scene 08 callback',()=>{
  const f=new SourceFixture().core7();f.source({type:'panel',panel:'form'}).local(8).source({type:'review'}).source({type:'send-request'});f.save=sourceTick(f.save,f.now+=2000)
  f.save=sourceAction(f.save,7,{type:'thread',thread:'professional'},f.now)
  expect(f.save.chapter1!.byline!.replyRead).toBe(false);f.source({type:'back'}).local(15);f.source({type:'next-lead'});expect(sourceEligible(f.save,8,'professional')).toBe(false)
 })
 it('honors actual members and ask-first group boundary once without reusing private consent',()=>{
  const f=new SourceFixture().core7();const p=f.save.chapter1!.correctionsDesk!;p.choices['S06-C09']='c';p.receipts.push({eventId:'OPEN-S06-C09-PLAYER-c',recipient:'sophie',factIds:[]});f.source({type:'thread',thread:'sophie'}).reply('a').reply('a')
  expect(sourceAskFirst(f.save)).toBe(true);const trust=f.save.relationships.sophie.trust;f.source({type:'thread',thread:'group'}).reply('a');expect(f.save.relationships.sophie.trust).toBe(Math.max(0,trust-1));expect(f.save.prologue!.scene01!.groupMessages.some(m=>m.text==='Could you ask before dropping the case details in here? Please.')).toBe(true)
  const sent=f.save;expect(sendScene01Choice(sent,'a','',false,f.now)).toBe(sent);expect(f.save.prologue!.scene01!.groupMessages.filter(m=>m.id.startsWith('OPEN-S07-')&&m.sender==='lucas')).toEqual([])
 })
 const social:{n:7|8;i:number;thread:'professional'|'civic'|'sophie'|'group'}[]=[{n:7,i:9,thread:'professional'},{n:7,i:10,thread:'sophie'},{n:7,i:11,thread:'sophie'},{n:7,i:12,thread:'group'},{n:8,i:9,thread:'civic'},{n:8,i:12,thread:'professional'},{n:8,i:13,thread:'sophie'},{n:8,i:14,thread:'sophie'},{n:8,i:15,thread:'group'}]
 for(const {n,i,thread} of social)for(const choice of ['a','b','c'])it(`runs authored S0${n}-C${i} ${choice} exactly once through the existing queue`,()=>{
  const f=new SourceFixture().core7()
  if(thread==='professional'||thread==='civic'){
   if(n===8&&thread==='civic')f.enter8().core8()
   f.source({type:'panel',panel:'form'}).local(8).source({type:'review'}).source({type:'send-request'})
   f.save=sourceTick(f.save,f.now+=2000);f.source({type:'thread',thread:n===7||thread==='professional'?'professional':'civic'})
  }
  if(n===8&&f.number===7)f.enter8().core8()
  f.source({type:'thread',thread})
  if(i===11||i===14)f.reply('a')
  expect(f.save.prologue!.scene01!.nodeId).toBe(`OPEN-S0${n}-C${String(i).padStart(2,'0')}`)
  const history=structuredClone(sourceState(f.save,n)!.receipts),before=f.save
  expect(sendScene01Choice(before,choice,'',false,f.now)).toBe(before)
  f.save=draftActIChoice(f.save,choice);expect(sourceState(f.save,n)!.receipts).toEqual(history);f.send(choice)
  expect(sourceState(f.save,n)!.choices[`S0${n}-C${String(i).padStart(2,'0')}`]).toBe(choice)
  expect(normalizeSave(JSON.parse(JSON.stringify(f.save)))).toEqual(f.save)
  if(n===8&&i===14){expect(f.save.prologue!.scene01!.messages.filter(m=>m.id.startsWith('OPEN-S08-')&&m.text==='Goodnight.')).toHaveLength(1);expect(f.save.chapter1!.issuer!.privateConsent).toBe(false)}
 })
 for(const n of [7,8] as const)it(`Scene ${n} pauses an undelivered NPC beat and resumes remaining time without replay`,()=>{
  const f=new SourceFixture().core7();if(n===8)f.enter8().core8()
  f.save=sourceAction(f.save,n,{type:'thread',thread:'sophie'},f.now)
  const q=f.save.prologue!.scene01!.queue[0],elapsed=400;f.save=pauseSource(f.save,n,f.now+elapsed)
  expect(sourceState(f.save,n)!.threads.sophie!.paused!.remainingMs).toBe(q.dueAt-f.now-elapsed)
  const count=f.save.prologue!.scene01!.messages.length;f.save=normalizeSave(JSON.parse(JSON.stringify(f.save)))
  f.now+=50000;f.source({type:'thread',thread:'sophie'});expect(f.save.prologue!.scene01!.messages.length).toBeGreaterThan(count)
  const ids=f.save.prologue!.scene01!.messages.map(m=>m.id);expect(new Set(ids).size).toBe(ids.length)
 })
 it('does not send to or speak for an absent group respondent',()=>{
  const f=new SourceFixture().core7();f.save.prologue!.scene01!.groupMembers={sophie:false,maya:true,lucas:false}
  const before=structuredClone(f.save.knowledge.characters.sophie);f.source({type:'thread',thread:'group'}).reply('a')
  expect(f.save.knowledge.characters.sophie).toEqual(before);expect(f.save.prologue!.scene01!.groupMessages.filter(m=>m.id.startsWith('OPEN-S07-')&&m.sender==='sophie')).toHaveLength(0)
  f.save.prologue!.scene01!.groupMembers.maya=false;expect(sourceEligible(f.save,7,'group')).toBe(false)
 })
 it('keeps professional and civic transcripts and recipients separate in Scene 08',()=>{
  const f=new SourceFixture().core7();f.source({type:'panel',panel:'form'}).local(8).source({type:'review'}).source({type:'send-request'});f.save=sourceTick(f.save,f.now+=2000);f.source({type:'thread',thread:'professional'});f.enter8().core8();expect(sourceEligible(f.save,8,'professional')).toBe(true)
  f.source({type:'panel',panel:'form'}).local(8,'b').source({type:'review'}).source({type:'send-request'});f.save=sourceTick(f.save,f.now+=2000);f.source({type:'thread',thread:'civic'}).reply('c')
  const nora=structuredClone(f.save.knowledge.characters.nora);f.source({type:'thread',thread:'professional'}).reply('c')
  expect(f.save.chapter1!.issuer!.inbox.filter(l=>l.thread==='professional').some(l=>l.text.includes('public-notices routing inbox'))).toBe(false)
  expect(f.save.knowledge.characters.nora.filter(v=>!nora.includes(v))).toEqual(['OPEN-S08-C12-PLAYER-c:claim'])
 })
 it('rejects malformed receipts, forged private consent and completion without inspections',()=>{
  const f=new SourceFixture().core7();const p=f.save.chapter1!.byline!
  expect(()=>validateSourceInvestigation({...p,privateConsent:true},7)).toThrow('Invalid Scene 7 state')
  expect(()=>validateSourceInvestigation({...p,inquiry:{status:'delivered',text:'forged',receipt:{id:'R-GB-NV-001',text:'forged',route:'GB-NV-CHANNEL-001',at:1}}},7)).toThrow('Invalid Scene 7 state')
  f.local(15);expect(()=>validateSourceInvestigation({...f.save.chapter1!.byline!,inspections:[]},7)).toThrow('Invalid Scene 7 state')
 })
})
