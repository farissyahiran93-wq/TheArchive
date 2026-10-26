import {describe,it,expect} from 'vitest'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {scene09Investigation as content,scene09Nodes} from '../content/scene09Final'
import {SourceFixture} from '../../tests/helpers/sourceInvestigation'
import {sourceAction,sourceEligible,sourceState,sourceTick,sourceReady,pauseSource} from './sourceInvestigation'
import {normalizeSave} from './engine'
import {draftActIChoice,sendScene01Choice,scene01Choices} from './scene01'
import {newGame} from './types'
import {phoneNotices} from './phonePresentation'
const enter=()=>new SourceFixture().core7().enter8().core8().enter9()
const inquiry=(f:SourceFixture,c='a')=>f.source({type:'panel',panel:'form'}).local(11,c).source({type:'review'}).source({type:'send-request'})
const received=(f:SourceFixture)=>{f.save=sourceTick(f.save,f.now+=2000);return f.source({type:'thread',thread:'civic'})}
describe('Scene 09 Transfer Register',()=>{
 it('pins 18 sets / 54 exact player alternatives, complete graph and two exact independent pages',()=>{
  const raw=readFileSync('docs/sources/scene09-final/FULL_SCRIPT.txt'),s=raw.toString('utf8').replace(/\s+/g,' ')
  expect(content.sourceSha256).toBe(createHash('sha256').update(raw).digest('hex'));expect(Object.keys(content.choices)).toHaveLength(18)
  for(const c of Object.values(content.choices) as {options:readonly {id:string;text:string}[]}[]){expect(c.options.map(o=>o.id)).toEqual(['a','b','c']);for(const o of c.options)expect(s).toContain(o.text)}
  for(const n of Object.values(scene09Nodes)){if(n.kind==='npc')expect(s).toContain(n.text);if('next' in n&&n.next)expect(scene09Nodes[n.next]).toBeDefined()}
  for(const p of Object.values(content.pages))for(const t of p.paragraphs)expect(s).toContain(t)
  expect(content.pages['finding-aid'].paragraphs.join(' ')).not.toContain('GB-REF-017')
 })
 it('requires actual final Scene 07/08 conclusions and manual entry, with historical saves untouched',()=>{
  const s=newGame();expect(sourceAction(s,9,{type:'enter'})).toBe(s)
  const f=new SourceFixture().core7().enter8().core8();expect(sourceAction(f.save,9,{type:'enter'})).toBe(f.save);f.local(16);expect(f.save.chapter1!.transferRegister).toBeUndefined();f.source({type:'next-lead'});expect(f.save.chapter1!.transferRegister?.visible).toBe(true)
 })
 for(const stance of ['a','b','c'])it(`C18 ${stance}: core completes with zero optional messages and no item proof`,()=>{
  const f=enter(),before=f.save;f.local(18,stance);expect(f.save).toBe(before)
  const chars=structuredClone(f.save.knowledge.characters),older=structuredClone(f.save.chapter1!.issuer);f.core9();expect(sourceReady(f.save,9)).toBe(true);f.local(18,stance)
  expect(f.save.chapter1!.transferRegister!.complete).toBe(true);expect(f.save.chapter1!.completed).toEqual([4,5,6,7,8,9]);expect(f.save.knowledge.characters).toEqual(chars);expect(f.save.chapter1!.issuer).toEqual(older)
  expect(f.save.chapter1!.transferRegister!.seriesObservation).toMatchObject({public_listed_series_transfer:true,GB_REF_017_series_match:false,GB_REF_017_transfer_verified:false});expect(f.save.evidence['NOTE-S09-SERIES-NOT-ITEM'].verified).toBe(false)
  expect(normalizeSave(JSON.parse(JSON.stringify(f.save)))).toEqual(f.save);const complete=f.save;f.local(18,'b');expect(f.save).toBe(complete);f.source({type:'next-lead'});expect(f.save.chapter1!.inventorySheet?.visible).toBe(true)
 })
 for(const [i,pass] of [[2,'b'],[3,'a'],[4,'c'],[5,'b'],[6,'c'],[7,'a'],[8,'b'],[9,'c'],[17,'a']] as const)for(const c of ['a','b','c'])it(`C${i} ${c}: authored classification, recoverable retry, no NPC knowledge`,()=>{
  const f=enter().inspect('register',['entry-number','series-dates','custody-fields']).inspect('finding-aid',['coverage-limit','access-limit']),before=structuredClone(f.save.knowledge.characters)
  f.local(i,c);expect(f.save.chapter1!.transferRegister!.flags.includes('pass-'+i)).toBe(c===pass);expect(f.save.knowledge.characters).toEqual(before);if(c!==pass){expect(f.save.chapter1!.transferRegister!.feedback).toBeTruthy();f.local(i,pass);expect(f.save.chapter1!.transferRegister!.flags).toContain('pass-'+i)}
 })
 for(const i of [1,10])for(const c of ['a','b','c'])it(`C${i} ${c}: informational/private strategy is not an outgoing message`,()=>{const f=enter().core9(),messages=structuredClone(f.save.messages);f.local(i,c);expect(f.save.chapter1!.transferRegister!.choices[`S09-C${String(i).padStart(2,'0')}`]).toBe(c);expect(f.save.messages).toEqual(messages)})
 for(const c of ['a','b','c'])it(`C11 ${c}: exact reviewed Send, independent role receipt, matching delayed/read reply`,()=>{
  const f=enter().core9();f.source({type:'panel',panel:'form'}).local(11,c);const before=structuredClone(f.save.knowledge);f.source({type:'send-request'});expect(f.save.chapter1!.transferRegister!.inquiry.receipt).toBeUndefined();expect(f.save.knowledge).toEqual(before)
  f.source({type:'review'}).source({type:'send-request'});const p=f.save.chapter1!.transferRegister!,due=f.save.pendingEvents.find(q=>q.id==='CH1-S09-SOURCE-REPLY')!.dueAt
  expect(p.inquiry.receipt!.id).toBe('R-GH-TR-001');expect(p.inquiry.text!.includes('GB-REF-017')).toBe(c==='b');const sent=f.save;f.source({type:'send-request'});expect(f.save).toBe(sent)
  expect(sourceState(sourceTick(f.save,due-1),9)!.reply).toBeUndefined();f.save=sourceTick(normalizeSave(JSON.parse(JSON.stringify(f.save))),due);expect(f.save.chapter1!.transferRegister!.replyRead).toBe(false);expect(f.save.knowledge.player).toEqual(before.player);expect(phoneNotices(f.save).some(n=>n.id==='EV-S09-SERIES-DESK-REPLY-001'&&n.thread==='archive')).toBe(true)
  f.source({type:'thread',thread:'civic'});expect(f.save.prologue!.scene01!.nodeId).toBe('OPEN-S09-C12');expect(f.save.chapter1!.transferRegister!.replyRead).toBe(true);expect(f.save.chapter1!.transferRegister!.reply!.text.join(' ')).toContain(c==='a'?'A more specific locating question':c==='b'?'publisher code you included':'right starting point for access')
 })
 for(const i of [12,13,14,15,16])for(const c of ['a','b','c'])it(`C${i} ${c}: recipient-limited actual Send and distinct response`,()=>{
  let f=enter().core9()
  if(i===13){f=new SourceFixture().core7();f.source({type:'panel',panel:'form'}).local(8).source({type:'review'}).source({type:'send-request'});f.save=sourceTick(f.save,f.now+=2000);f.source({type:'thread',thread:'professional'}).enter8().core8().enter9().core9()}
  const thread=i===12?'civic':i===13?'professional':i===16?'group':'sophie';if(i===12)received(inquiry(f));else f.source({type:'thread',thread})
  if(i===15)f.reply('b');expect(f.save.prologue!.scene01!.nodeId).toBe(`OPEN-S09-C${i}`)
  const before=f.save;expect(sendScene01Choice(before,c,'',false,f.now)).toBe(before);f.save=draftActIChoice(f.save,c);f.save=pauseSource(f.save,9,f.now);f.save=normalizeSave(JSON.parse(JSON.stringify(f.save)));f.source({type:'thread',thread});expect(scene01Choices(f.save)).toHaveLength(3);f.reply(c)
  expect(f.save.chapter1!.transferRegister!.choices[`S09-C${i}`]).toBe(c);expect(normalizeSave(JSON.parse(JSON.stringify(f.save)))).toEqual(f.save)
  if(i===12)expect(f.save.relationships).toEqual(before.relationships)
  if(i===15&&c==='a')expect(f.save.prologue!.scene01!.messages.some(m=>m.text==="I didn't say I wanted a case update right now.")).toBe(true)
  expect(f.save.messages.filter(m=>m.id.startsWith('OPEN-S09-')&&m.recipient==='nora')).toHaveLength(0)
 })
 it('does not infer Nora access from a byline or unread message, or group membership from the cast',()=>{
  const f=enter().core9();expect(sourceEligible(f.save,9,'professional')).toBe(false);f.save.prologue!.scene01!.groupMembers={sophie:false,maya:true,lucas:false};const sophie=structuredClone(f.save.knowledge.characters.sophie);f.source({type:'thread',thread:'group'}).reply('a');expect(f.save.knowledge.characters.sophie).toEqual(sophie);expect(f.save.prologue!.scene01!.groupMessages.filter(m=>m.id.startsWith('OPEN-S09-')&&m.sender==='sophie')).toHaveLength(0)
 })
 it('needs every row/limitation inspection and never reads by scroll/open alone',()=>{
  const f=enter();f.source({type:'panel',panel:'register'});expect(f.save.chapter1!.transferRegister!.flags).not.toContain('register-read');f.source({type:'read',page:'register'});f.local(2,'b');expect(f.save.chapter1!.transferRegister!.flags).not.toContain('pass-2');f.source({type:'panel',panel:'finding-aid'}).source({type:'read',page:'finding-aid'});expect(f.save.chapter1!.transferRegister!.flags).not.toContain('finding-aid-read')
 })
 it('editing invalidates Review, failed/cancelled drafts never send and their exact text survives reload',()=>{
  const f=enter().core9();f.source({type:'panel',panel:'form'}).local(11).source({type:'review'}).local(11,'b');expect(f.save.chapter1!.transferRegister!.inquiry.reviewed).toBe(false);f.source({type:'request-failed'});const before=structuredClone(f.save.knowledge);f.save=sourceTick(f.save,f.now+999999);expect(f.save.chapter1!.transferRegister!.reply).toBeUndefined();expect(f.save.knowledge).toEqual(before);f.source({type:'cancel'});f.save=normalizeSave(JSON.parse(JSON.stringify(f.save)));expect(f.save.chapter1!.transferRegister!.inquiry.text).toBe(content.choices['S09-C11'].options[1].text);expect(f.save.chapter1!.transferRegister!.inquiry.receipt).toBeUndefined()
 })
 for(const choice of ['a','b','c'])it(`group ${choice} honors the actual ask-first recipient once and never borrows private consent`,()=>{
  const f=enter().core9(),p=f.save.chapter1!.correctionsDesk!;p.choices['S06-C09']='c';p.receipts.push({eventId:'OPEN-S06-C09-PLAYER-c',recipient:'sophie',factIds:[]});const trust=f.save.relationships.sophie.trust;f.source({type:'thread',thread:'group'}).reply(choice)
  expect(f.save.relationships.sophie.trust).toBe(trust-(choice==='c'?0:1));const done=f.save;expect(sendScene01Choice(done,choice,'',false,f.now)).toBe(done);expect(f.save.prologue!.scene01!.groupMessages.filter(m=>m.id.startsWith('OPEN-S09-')&&m.sender==='lucas')).toHaveLength(0)
 })
 it('does not turn an unopened Nora reply or an inaccessible Sophie route into permission',()=>{
  const f=new SourceFixture().core7();f.source({type:'panel',panel:'form'}).local(8).source({type:'review'}).source({type:'send-request'});f.save=sourceTick(f.save,f.now+=2000);f.enter8().core8().enter9().core9();expect(sourceEligible(f.save,9,'professional')).toBe(false);f.save.prologue!.scene01!.introduced=false;expect(sourceEligible(f.save,9,'sophie')).toBe(false)
 })
 it('rejects missing predecessor saves and altered case-transfer proof during normalization',()=>{
  const f=enter().core9().local(18),s=structuredClone(f.save);delete s.chapter1!.issuer;expect(()=>normalizeSave(s)).toThrow('Scene 09 prerequisites');const wrong=structuredClone(f.save);wrong.chapter1!.transferRegister!.seriesObservation!.GB_REF_017_series_match=true as never;expect(()=>normalizeSave(wrong)).toThrow('Invalid Scene 9 state')
 })
})
