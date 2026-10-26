import {describe,it,expect} from 'vitest'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {scene10Investigation as content,scene10Nodes} from '../content/scene10Final'
import {SourceFixture} from '../../tests/helpers/sourceInvestigation'
import {sourceAction,sourceEligible,sourceState,sourceTick,sourceReady,pauseSource,sourceReceipt} from './sourceInvestigation'
import {scene10Matches,scene10Passes} from './scene10Config'
import {normalizeSave} from './engine'
import {draftActIChoice,sendScene01Choice,scene01Choices,openScene03,deliverScene01} from './scene01'
import {newGame} from './types'
import {phoneNotices} from './phonePresentation'
import {actINodes} from '../content/actIRegistry'
const enter=()=>new SourceFixture().core7().enter8().core8().enter9().core9().enter10()
const core=()=>enter().core10()
const inquiry=(f:SourceFixture,c='a')=>f.source({type:'panel',panel:'form'}).local(12,c).source({type:'review'}).source({type:'send-request'})
const received=(f:SourceFixture)=>{f.save=sourceTick(f.save,f.now+=2000);return f.source({type:'thread',thread:'civic'})}
describe('Scene 10 Inventory Sheet — source and branch contract',()=>{
 it('QA01/02/12: 20 stable sets, 60 exact alternatives and sourced speech, no director text',()=>{
  const raw=readFileSync('docs/sources/scene10-final/FULL_SCRIPT.txt'),s=raw.toString('utf8').replace(/\s+/g,' ')
  expect(content.sourceSha256).toBe(createHash('sha256').update(raw).digest('hex'));expect(content.planningId).toBe('ch01_sc10_a_life_in_fragments');expect(content.authoringId).toBe('chapter_01_scene_10_the_inventory_sheet')
  expect(Object.keys(content.choices)).toEqual(Array.from({length:20},(_,i)=>`S10-C${String(i+1).padStart(2,'0')}`))
  for(const c of Object.values(content.choices) as {options:readonly {id:string;text:string}[]}[]){expect(c.options.map(o=>o.id)).toEqual(['a','b','c']);for(const o of c.options)expect(s).toContain(o.text)}
  for(const n of Object.values(scene10Nodes)){if(n.kind==='npc'){expect(s).toContain(n.text);expect(n.text).not.toMatch(/DIRECTOR:|EFFECT|S10-C|IF existing|IF prior/)}if('next'in n&&n.next)expect(scene10Nodes[n.next]).toBeDefined()}
 })
 it('QA03/04/09/13: distinct new civic sources have no publisher label, descriptor body or original',()=>{
  const source=readFileSync('docs/sources/scene10-final/FULL_SCRIPT.txt','utf8').replace(/\s+/g,' ')
  for(const p of Object.values(content.pages)){for(const text of p.paragraphs)expect(source).toContain(text);expect(p.paragraphs.join(' ')).not.toContain('GB-REF-017')}
  expect(content.sources['GH-BOX-INDEX-EXTRACT-001']).toMatchObject({printedId:'GH-INV-2022-063-EX1',descriptorReference:'GH-DSC-03-A',descriptorTextIncluded:false});expect(content.sources['GH-CATALOGUE-ACCESS-NOTE-001'].caseReply).toBe(false)
 })
 it('QA05/06/07: only an actual C18 and manual action create the additive state; historical paths stay pinned',()=>{
  const empty=newGame();expect(sourceAction(empty,10,{type:'enter'})).toBe(empty)
  const f=new SourceFixture().core7().enter8().core8().enter9().core9();expect(sourceAction(f.save,10,{type:'enter'})).toBe(f.save);f.local(18);expect(f.save.chapter1!.inventorySheet).toBeUndefined();expect(normalizeSave(JSON.parse(JSON.stringify(f.save)))).toEqual(f.save);f.source({type:'next-lead'});expect(f.save.chapter1!.inventorySheet?.entry).toMatchObject({from:9,finalChoice:'S09-C18',manual:true});expect(Object.keys(actINodes()).some(id=>id.startsWith('OPEN-S10-'))).toBe(false)
 })
 for(const choice of ['a','b','c'])it(`C20 ${choice} / QA11/31/62: zero-Send private save and honest Scene 11 boundary`,()=>{
  const f=enter(),before=f.save;f.local(20,choice);expect(f.save).toBe(before);const chars=structuredClone(f.save.knowledge.characters),older=structuredClone(f.save.chapter1!.transferRegister),messages=structuredClone(f.save.messages)
  f.core10();expect(sourceReady(f.save,10)).toBe(true);f.commit10(choice)
  const p=f.save.chapter1!.inventorySheet!;expect(p.complete).toBe(true);expect(p.choices['S10-C20']).toBe(choice);expect(p.inventoryObservation).toMatchObject({descriptor_code_observed:true,descriptor_body_observed:false,GB_REF_017_item_link_verified:false,GB_REF_017_box_link_verified:false,GB_REF_017_descriptor_link_verified:false});expect(f.save.evidence['NOTE-S10-DESCRIPTOR-NOT-DOCUMENT'].verified).toBe(false);expect(f.save.chapter1!.completed).toEqual([4,5,6,7,8,9,10]);expect(f.save.knowledge.characters).toEqual(chars);expect(f.save.messages).toEqual(messages);expect(f.save.chapter1!.transferRegister).toEqual(older);expect(normalizeSave(JSON.parse(JSON.stringify(f.save)))).toEqual(f.save)
  const done=f.save;f.local(20,'b');expect(f.save).toBe(done);f.source({type:'next-lead'});expect(f.save.chapter1!.inventorySheet!.feedback).toBe('Next lead not yet available')
 })
 for(const [num,pass] of Object.entries(scene10Passes))for(const choice of ['a','b','c'])it(`C${num} ${choice} / QA17–30: exact retry without relationship or recipient advancement`,()=>{
  const f=core(),p=f.save.chapter1!.inventorySheet!,i=Number(num);p.flags=p.flags.filter(flag=>flag!=='pass-'+i);delete p.choices[`S10-C${String(i).padStart(2,'0')}`]
  const chars=structuredClone(f.save.knowledge.characters),relationships=structuredClone(f.save.relationships);f.local(i,choice);expect(f.save.chapter1!.inventorySheet!.flags.includes('pass-'+i)).toBe(choice===pass);expect(f.save.knowledge.characters).toEqual(chars);expect(f.save.relationships).toEqual(relationships);if(choice!==pass){expect(f.save.chapter1!.inventorySheet!.feedback).toBeTruthy();f.local(i,pass);expect(f.save.chapter1!.inventorySheet!.flags).toContain('pass-'+i)}
 })
 for(const i of [1,11])for(const c of ['a','b','c'])it(`C${i} ${c} / QA29: local replay or strategy never sends`,()=>{const f=core(),messages=structuredClone(f.save.messages),chars=structuredClone(f.save.knowledge.characters);f.local(i,c);expect(f.save.chapter1!.inventorySheet!.choices[`S10-C${String(i).padStart(2,'0')}`]).toBe(c);expect(f.save.messages).toEqual(messages);expect(f.save.knowledge.characters).toEqual(chars)})
 for(const choice of ['a','b','c'])it(`C12 ${choice} / QA32–43: reviewed exact scope and independent delayed, manually read reply`,()=>{
  const f=core();f.source({type:'panel',panel:'form'}).local(12,choice);const before=structuredClone(f.save.knowledge);f.source({type:'send-request'});expect(f.save.chapter1!.inventorySheet!.inquiry.receipt).toBeUndefined();f.source({type:'review'}).source({type:'send-request'})
  const p=f.save.chapter1!.inventorySheet!,r=p.inquiry.receipt!,due=f.save.pendingEvents.find(e=>e.id==='CH1-S10-SOURCE-REPLY')!.dueAt
  expect(r.id).toBe('R-GH-INV-001');expect(r.returnToken).toBe('local:R-GH-INV-001');expect(r.scope?.publisherLabel).toBe(choice==='b');expect(r.scope?.boxReference).toBe(choice==='a');expect(r.scope?.seriesContext).toBe(choice==='a');expect(r.scope?.attachments).toEqual([]);expect(p.inquiry.text).toBe(content.choices['S10-C12'].options.find(o=>o.id===choice)!.text)
  const sent=f.save;f.source({type:'send-request'});expect(f.save).toBe(sent);expect(sourceState(sourceTick(f.save,due-1),10)!.reply).toBeUndefined();f.save=sourceTick(normalizeSave(JSON.parse(JSON.stringify(f.save))),due);expect(f.save.knowledge.player).toEqual(before.player);expect(f.save.chapter1!.inventorySheet!.replyRead).toBe(false);expect(phoneNotices(f.save).some(n=>n.id==='EV-S10-CATALOGUE-DESK-REPLY-001'&&n.thread==='archive')).toBe(true)
  const delivered=f.save;expect(sourceTick(delivered,due+9999)).toBe(delivered);f.source({type:'thread',thread:'civic'});expect(f.save.chapter1!.inventorySheet!.replyRead).toBe(true);expect(f.save.prologue!.scene01!.nodeId).toBe('OPEN-S10-C13');expect(f.save.chapter1!.inventorySheet!.reply!.text.join(' ')).toContain(choice==='a'?'GH-DSC-03-A is a description reference':choice==='b'?"publisher's label is separate":'additional description is available')
 })
 for(const i of [13,14,15,16,17,18])for(const choice of ['a','b','c'])it(`C${i} ${choice} / QA42/45/47–53: actual scoped Send, source-authored response and once-only effects`,()=>{
  let f=core()
  if(i===14){f=new SourceFixture().core7();f.source({type:'panel',panel:'form'}).local(8).source({type:'review'}).source({type:'send-request'});f.save=sourceTick(f.save,f.now+=2000);f.source({type:'thread',thread:'professional'}).enter8().core8().enter9().core9().enter10().core10()}
  const thread=i===13?'civic':i===14?'professional':i>=17?'group':'sophie';if(i===13)received(inquiry(f));else f.source({type:'thread',thread});if(i===16)f.reply('b');if(i===18)f.reply('c')
  expect(f.save.prologue!.scene01!.nodeId).toBe(`OPEN-S10-C${i}`);const before=f.save;expect(sendScene01Choice(before,choice,'',false,f.now)).toBe(before);f.save=draftActIChoice(f.save,choice);f.save=pauseSource(f.save,10,f.now);f.save=normalizeSave(JSON.parse(JSON.stringify(f.save)));f.source({type:'thread',thread});expect(scene01Choices(f.save)).toHaveLength(3);f.reply(choice)
  expect(f.save.chapter1!.inventorySheet!.choices[`S10-C${i}`]).toBe(choice);expect(normalizeSave(JSON.parse(JSON.stringify(f.save)))).toEqual(f.save);if(i===13)expect(f.save.relationships).toEqual(before.relationships);if(i===16&&choice==='a')expect(f.save.prologue!.scene01!.messages.some(m=>m.text==='I asked you not to make this a case update tonight.')).toBe(true);expect(f.save.messages.filter(m=>m.id.startsWith('OPEN-S10-')&&m.recipient==='nora')).toHaveLength(0)
 })
 it('QA14/15/16/21/24: opening and scroll never replace explicit independent inspections and reads',()=>{
  const f=enter().source({type:'panel',panel:'box-index'});f.source({type:'scroll',key:'box-index',value:400}).source({type:'read',page:'box-index'});expect(f.save.chapter1!.inventorySheet!.flags).not.toContain('box-index-read');for(const id of ['source','box03','public-coverage'])f.source({type:'inspect',id});expect(f.save.chapter1!.inventorySheet!.flags).not.toContain('box-index-read');f.source({type:'read',page:'box-index'}).source({type:'panel',panel:'descriptor'}).source({type:'read',page:'descriptor'});expect(f.save.chapter1!.inventorySheet!.flags).not.toContain('reference-read');f.source({type:'inspect',id:'descriptor-row'}).local(5,'c').source({type:'read',page:'descriptor'});expect(f.save.deliveredEvents).toContain('EV-S10-DESCRIPTOR-REFERENCE-NOTED');f.source({type:'panel',panel:'access'}).source({type:'read',page:'access'});expect(f.save.chapter1!.inventorySheet!.flags).not.toContain('access-read')
 })
 it('QA26/27/30: local search and accessible puzzle reject false edges without saving them as facts',()=>{
  const f=enter().core10();f.source({type:'panel',panel:'puzzle'}).source({type:'unmatch'});const chars=structuredClone(f.save.knowledge.characters);f.source({type:'match',from:'publisher-unlinked',to:'VERIFIED ORIGINAL NOTICE'});expect(f.save.chapter1!.inventorySheet!.matches).toEqual([]);expect(f.save.knowledge.characters).toEqual(chars);f.local(19,'b');expect(f.save.chapter1!.inventorySheet!.flags).not.toContain('pass-19');for(const [from,m] of Object.entries(scene10Matches))f.source({type:'match',from,to:m.to});f.local(19,'b');expect(f.save.deliveredEvents).toContain('EV-S10-CATALOGUE-PATH-ASSEMBLED');f.source({type:'unmatch',from:'box-descriptor'});expect(f.save.chapter1!.inventorySheet!.flags).not.toContain('pass-19');expect(f.save.chapter1!.inventorySheet!.matches).not.toContain('box-descriptor')
 })
 it('QA33/34/59: edited, saved, cancelled and failed drafts remain unsent with no response',()=>{
  const f=core();f.source({type:'panel',panel:'form'}).local(12).source({type:'review'}).local(12,'c');expect(f.save.chapter1!.inventorySheet!.inquiry.reviewed).toBe(false);f.source({type:'request-failed'});f.save=sourceTick(f.save,f.now+999999);expect(f.save.chapter1!.inventorySheet!.reply).toBeUndefined();f.source({type:'save-draft'}).source({type:'cancel'});f.save=normalizeSave(JSON.parse(JSON.stringify(f.save)));expect(f.save.chapter1!.inventorySheet!.inquiry.receipt).toBeUndefined();expect(f.save.chapter1!.inventorySheet!.inquiry.text).toBe(content.choices['S10-C12'].options[2].text)
 })
 it('QA36/44: earlier civic/Nora pending replies do not become a Scene 10 response or permission',()=>{
  const f=new SourceFixture().core7();f.source({type:'panel',panel:'form'}).local(8).source({type:'review'}).source({type:'send-request'});f.save=sourceTick(f.save,f.now+=2000);f.enter8().core8().enter9().core9();inquiryFor9(f);f.enter10().core10();const older=structuredClone(f.save.chapter1!.transferRegister!.inquiry);expect(sourceEligible(f.save,10,'professional')).toBe(false);f.save=sourceTick(f.save,f.now+99999);expect(f.save.chapter1!.inventorySheet!.reply).toBeUndefined();expect(f.save.chapter1!.transferRegister!.inquiry).toEqual(older)
 })
 it('QA10/46/61: no byline contact, automatic Sophie opening or phantom member delivery',()=>{
  const f=core();expect(openScene03(f.save,f.now)).toBe(f.save);expect(sourceEligible(f.save,10,'professional')).toBe(false);f.save.prologue!.scene01!.groupMembers={sophie:false,maya:true,lucas:false};const before=structuredClone(f.save.knowledge.characters.sophie);f.source({type:'thread',thread:'group'}).reply('a').reply('b');expect(f.save.knowledge.characters.sophie).toEqual(before);expect(f.save.prologue!.scene01!.groupMessages.filter(m=>m.id.startsWith('OPEN-S10-')&&m.sender==='sophie')).toHaveLength(0);f.save.prologue!.scene01!.groupMembers.maya=false;expect(sourceEligible(f.save,10,'group')).toBe(false)
 })
 for(const choice of ['a','b','c'])it(`QA52/53: actual group boundary for C17 ${choice} and independent C18 B receipt`,()=>{
  const f=core(),p=f.save.chapter1!.correctionsDesk!;p.choices['S06-C09']='c';p.receipts.push({eventId:'OPEN-S06-C09-PLAYER-c',recipient:'sophie',factIds:[]});const trust=f.save.relationships.sophie.trust;f.source({type:'thread',thread:'group'}).reply(choice);expect(f.save.relationships.sophie.trust).toBe(Math.max(0,trust-(choice==='c'?0:1)));f.reply('b');expect(f.save.relationships.sophie.trust).toBe(Math.max(0,Math.max(0,trust-(choice==='c'?0:1))-1));expect(f.save.chapter1!.inventorySheet!.receipts.filter(r=>r.eventId==='OPEN-S10-C18-PLAYER-b'&&r.recipient==='sophie')).toHaveLength(1)
 })
 it('QA54/55/56/57/58: independent scroll/cursors, exact remaining NPC delay and duplicate protection',()=>{
  const f=core(),prior=structuredClone(f.save.chapter1!.transferRegister!.scroll);f.source({type:'scroll',key:'box-index',value:314});f.save=sourceAction(f.save,10,{type:'thread',thread:'sophie'},f.now);const q=f.save.prologue!.scene01!.queue[0];f.save=pauseSource(f.save,10,f.now+300);expect(f.save.chapter1!.inventorySheet!.threads.sophie!.paused!.remainingMs).toBe(q.dueAt-f.now-300);const paused=f.save;expect(deliverScene01(paused,f.now+999999)).toBe(paused);f.save=normalizeSave(JSON.parse(JSON.stringify(f.save)));f.source({type:'thread',thread:'sophie'}).reply('b').reply('b');const ids=f.save.prologue!.scene01!.messages.map(m=>m.id);expect(new Set(ids).size).toBe(ids.length);expect(f.save.chapter1!.inventorySheet!.scroll['box-index']).toBe(314);expect(f.save.chapter1!.transferRegister!.scroll).toEqual(prior)
 })
 it('QA63/64: zero outgoing core keeps character knowledge, previous receipts and blocked sender intact',()=>{
  const f=enter();f.save.chapter1!.sender.blocked=true;const sender=structuredClone(f.save.chapter1!.sender),chars=structuredClone(f.save.knowledge.characters),receipt=structuredClone(f.save.chapter1!.transferRegister!.inquiry);f.core10().commit10('c');expect(f.save.chapter1!.sender).toEqual(sender);expect(f.save.knowledge.characters).toEqual(chars);expect(f.save.chapter1!.transferRegister!.inquiry).toEqual(receipt);expect(sourceReceipt(10)).not.toBe(sourceReceipt(9))
 })
 it('rejects malformed future source, parent, link and scope claims instead of migrating saves',()=>{
  const f=core().commit10();const noParent=structuredClone(f.save);delete noParent.chapter1!.transferRegister;expect(()=>normalizeSave(noParent)).toThrow('Scene 10 prerequisites');const bad=structuredClone(f.save);bad.chapter1!.inventorySheet!.inventoryObservation!.descriptor_body_observed=true as never;expect(()=>normalizeSave(bad)).toThrow('Invalid Scene 10 state')
 })
})
function inquiryFor9(f:SourceFixture){f.source({type:'panel',panel:'form'}).local(11).source({type:'review'}).source({type:'send-request'})}
