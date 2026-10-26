import { describe,it,expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { Scene05Fixture } from '../../tests/helpers/scene05Final'
import { scene06Nodes,scene06Local,scene06Manifest } from '../content/scene06Final'
import { correctionsDeskAction as action,deskReady,deskEligible,deskTick } from './scene06'
import { draftActIChoice,sendScene01Choice,deliverScene01,pauseScene03 } from './scene01'
import { normalizeSave } from './engine'
import { newGame,type GameSave } from './types'
import { phoneNotices,openingPresence } from './phonePresentation'
function base(prior?:string){const f=new Scene05Fixture().core();if(prior)f.do({type:'panel',panel:'form'}).do({type:'local',id:'S05-C04',choice:prior}).do({type:'review'}).do({type:'send-request'});f.do({type:'local',id:'S05-C11',choice:'a'});return f.save}
const enter=(s=base())=>deskTick(action(s,{type:'enter'},1800000000000),1800000001600)
const round=(s:GameSave)=>normalizeSave(JSON.parse(JSON.stringify(s)))
function core(s=enter()){
 for(const panel of ['register','scope'] as const){s=action(s,{type:'panel',panel});s=action(s,{type:'read'});s=action(s,{type:'back'})}
 s=action(s,{type:'local',id:'S06-C03',choice:'b'})
 for(const id of ['article','index','register'] as const)s=action(s,{type:'card',id})
 s=action(s,{type:'local',id:'S06-C04',choice:'c'})
 return action(s,{type:'local',id:'S06-C07',choice:'a'})
}
function drain(s:GameSave){for(let i=0;i<100;i++){const q=s.prologue!.scene01!.queue[0];if(!q)return s;const next=deliverScene01(s,q.dueAt);if(next===s)return s;s=next}throw Error('queue')}
function send(s:GameSave,id:string){return drain(sendScene01Choice(draftActIChoice(s,id),id,'',false,1800000010000))}
describe('Scene 06 corrections desk',()=>{
 it('requires explicit final-route completion, preserving the predecessor',()=>{expect(action(newGame(),{type:'enter'}).chapter1?.correctionsDesk).toBeUndefined();const old=base();expect(old.chapter1!.correctionsDesk).toBeUndefined();const s=enter(old);expect(s.chapter1!.versionHistory).toEqual(old.chapter1!.versionHistory);expect(s.prologue!.scene01!.messages).toEqual(old.prologue!.scene01!.messages);expect(round(s)).toEqual(s)})
 it('registers 14 choices and 42 branches with resolvable targets and exact source wording',()=>{
  expect(scene06Manifest).toHaveLength(14);expect(scene06Manifest.reduce((n,c)=>n+c.branches,0)).toBe(42)
  const source=readFileSync('docs/sources/scene06-final/FULL_SCRIPT.txt','utf8').replace(/\s+/g,' ')
  for(const n of Object.values(scene06Nodes)){if(n.kind==='npc')expect(source).toContain(n.text);if('next'in n&&n.next)expect(scene06Nodes[n.next]).toBeDefined();if(n.kind==='choice')for(const o of n.choices){expect(source).toContain(o.text);expect(scene06Nodes[o.next]).toBeDefined()}}
  for(const options of Object.values(scene06Local))for(const o of options)expect(source).toContain(o.text)
  const manuscript=readFileSync('docs/sources/scene06-final/FULL_SCRIPT.txt','utf8')
  const spoken=Object.values(scene06Nodes).filter(n=>n.kind==='npc')
  for(const match of manuscript.matchAll(/^ *(?:DESK|SOPHIE|MAYA)(?: if active)?: (.+)$/gm))expect(spoken.some(n=>n.text.startsWith(match[1].trim()))).toBe(true)
 })
 for(const number of [11,12])for(const choice of ['a','b','c'])it(`retains conditional Maya C${number}-${choice} without inventing a channel or duplicate closing`,()=>{
  const node=scene06Nodes[`OPEN-S06-C${number}`];expect(node.kind).toBe('choice');if(node.kind!=='choice')return
  let id=node.choices.find(o=>o.id===choice)!.next;const lines:string[]=[]
  for(let i=0;i<60;i++){const n=scene06Nodes[id];if(n.kind==='choice')break;if(n.kind==='npc')lines.push(n.text);if(!('next'in n)||!n.next)break;id=n.next}
  expect(lines.filter(t=>t.startsWith("I've got to head out."))).toHaveLength(number===12?1:0)
  expect(deskEligible(enter(),'maya')).toBe(false)
 })
 for(const prior of ['a','b','c'])it(`delivered inquiry ${prior}: matching reply once, unread completion and receipt linkage`,()=>{
  let s=enter(base(prior));expect(phoneNotices(s).some(n=>n.id==='EV-S06-DESK-REPLY-001')).toBe(true);expect(s.chapter1!.correctionsDesk!.prior!.choice).toBe(prior)
  s=core(s);s=action(s,{type:'local',id:'S06-C14',choice:'b'});expect(s.chapter1!.correctionsDesk!.complete).toBe(true);expect(s.chapter1!.correctionsDesk!.replyRead).toBe(false)
  s=drain(action(round(s),{type:'thread',thread:'desk'}));expect(s.chapter1!.correctionsDesk!.inbox.filter(l=>l.text.startsWith('You asked'))).toHaveLength(1)
  expect(s.chapter1!.correctionsDesk!.inbox.find(l=>l.text.startsWith('You asked'))!.text).toContain(prior==='a'?'article body changed':prior==='b'?'label refers to':'version history')
  s=action(pauseScene03(s),{type:'enter'});s=drain(action(round(s),{type:'thread',thread:'desk'}));expect(new Set(s.chapter1!.correctionsDesk!.inbox.map(l=>l.id)).size).toBe(s.chapter1!.correctionsDesk!.inbox.length)
 })
 for(const status of ['not_sent','draft','failed'] as const)it(`${status} prior produces no response or notification`,()=>{
  const b=base();b.chapter1!.versionHistory!.inquiry=status==='not_sent'?{status}:{status,choice:'a',text:new Scene05Fixture().core().do({type:'panel',panel:'form'}).do({type:'local',id:'S05-C04',choice:'a'}).save.chapter1!.versionHistory!.inquiry.text}
  const s=enter(b);expect(s.chapter1!.correctionsDesk!.replyDelivered).toBe(false);expect(phoneNotices(s).some(n=>n.id==='EV-S06-DESK-REPLY-001')).toBe(false);expect(action(s,{type:'thread',thread:'desk'})).toBe(s)
 })
 for(const id of ['a','b','c'])it(`new request ${id}: review, failure, retry, receipt-only and no retroactive reply`,()=>{
  let s=action(enter(),{type:'panel',panel:'form'});s=action(s,{type:'local',id:'S06-C06',choice:id});expect(action(s,{type:'send-request'})).toBe(s)
  s=action(s,{type:'request-failed'});expect(round(s).chapter1!.correctionsDesk!.inquiry.status).toBe('failed');s=action(s,{type:'review'});s=action(s,{type:'send-request'});expect(s.chapter1!.correctionsDesk!.inquiry.receipt!.id).toBe('R-GB-CD-002');expect(action(s,{type:'send-request'})).toBe(s);expect(s.chapter1!.correctionsDesk!.replyDelivered).toBe(false);expect(round(s)).toEqual(s)
 })
 for(const [id,wrong,correct] of [['S06-C03','a','b'],['S06-C04','b','c'],['S06-C07','c','a']] as const)it(`${id}: incorrect choice retries without false evidence`,()=>{
  let s=core();const p=s.chapter1!.correctionsDesk!;s={...s,chapter1:{...s.chapter1!,correctionsDesk:{...p,choices:{},flags:p.flags.filter(f=>f!==({'S06-C03':'claim','S06-C04':'provenance','S06-C07':'byline'}[id]))}}};const evidence=s.evidence;s=action(s,{type:'local',id,choice:wrong});expect(s.evidence).toEqual(evidence);expect(s.chapter1!.correctionsDesk!.choices[id]).toBeUndefined();s=action(s,{type:'local',id,choice:correct});expect(s.chapter1!.correctionsDesk!.choices[id]).toBe(correct)
 })
 for(const id of ['a','b','c'])it(`private conclusion ${id} needs all gates, no optional chats and keeps evidence unverified`,()=>{
  let s=enter();expect(action(s,{type:'local',id:'S06-C14',choice:id})).toBe(s);s=core(s);expect(deskReady(s)).toBe(true);const k=s.knowledge;s=action(s,{type:'local',id:'S06-C14',choice:id});expect(s.chapter1!.correctionsDesk!.complete).toBe(true);expect(s.knowledge).toEqual(k);for(const key of ['NOTE-S06-DESK-LIMITS','EV-S06-PUBLIC-REGISTER-OBSERVED','EV-S06-BYLINE-LIMIT-001'])expect(s.evidence[key].verified).toBe(false);expect(round(s)).toEqual(s);expect(action(s,{type:'local',id:'S06-C14',choice:'a'})).toBe(s);expect(action(s,{type:'next-lead'}).chapter1!.byline?.visible).toBe(true)
 })
 for(const choice of ['a','b','c'])it(`desk followup ${choice} requires select + Send and never invents editorial answer`,()=>{
  let s=drain(action(enter(base('a')),{type:'thread',thread:'desk'}));const before=s.chapter1!.correctionsDesk!.inbox.length;expect(sendScene01Choice(s,choice)).toBe(s);s=draftActIChoice(s,choice);expect(s.chapter1!.correctionsDesk!.inbox).toHaveLength(before);s=send(s,choice);expect(s.chapter1!.correctionsDesk!.inbox.filter(l=>l.sender==='player')).toHaveLength(1);expect(s.chapter1!.correctionsDesk!.threads.desk!.complete).toBe(true);expect(round(s)).toEqual(s)
 })
 for(const number of [8,9,10])for(const choice of ['a','b','c'])it(`Sophie C${number}-${choice}: exact scope, Send, clamped effects and resumable draft`,()=>{
  let s=drain(action(enter(),{type:'thread',thread:'sophie'}));for(let n=8;n<number;n++)s=send(s,'a');s=draftActIChoice(s,choice);const k=s.knowledge.characters,e=s.evidence;s=round(pauseScene03(s,1800000000000));s=drain(action(s,{type:'thread',thread:'sophie'},1800000001000));expect(s.prologue!.scene01!.draft!.choiceId).toBe(choice);s=send(s,choice);expect(s.knowledge.characters.maya).toEqual(k.maya);expect(s.evidence).toEqual(e);expect(s.chapter1!.correctionsDesk!.receipts.some(r=>r.recipient==='sophie'&&r.eventId.includes(`C${number.toString().padStart(2,'0')}-PLAYER-${choice}`))).toBe(true)
 })
 for(const members of [{sophie:true,maya:false},{sophie:false,maya:true},{sophie:true,maya:true},{sophie:false,maya:false}])for(const choice of ['a','b','c'])it(`group ${JSON.stringify(members)} ${choice}: actual recipients only`,()=>{
  let s=enter();s.prologue!.scene01!.groupMembers={...members,lucas:false};if(!members.sophie&&!members.maya){expect(deskEligible(s,'group')).toBe(false);return} s=action(s,{type:'thread',thread:'group'});s=send(s,choice);const lines=s.prologue!.scene01!.groupMessages.filter(l=>l.id.startsWith('OPEN-S06'));for(const a of ['sophie','maya'] as const)expect(lines.some(l=>l.sender===a)).toBe(members[a]);expect(lines.some(l=>l.sender==='lucas')).toBe(false);expect(round(s)).toEqual(s)
 })
 it('hides unavailable Maya channel; pauses and resumes the exact remaining timer',()=>{let s=enter();expect(deskEligible(s,'maya')).toBe(false);s=action(s,{type:'thread',thread:'sophie'},10000);const due=s.prologue!.scene01!.queue[0].dueAt;s=pauseScene03(s,10500);s=round(s);s=action(s,{type:'thread',thread:'sophie'},20000);expect(s.prologue!.scene01!.queue[0].dueAt).toBe(20000+due-10500)})
 it('persists the inbound deadline without early or duplicate notifications',()=>{
  let s=action(base('b'),{type:'enter'},10000)
  expect(s.chapter1!.correctionsDesk!.replyDelivered).toBe(false)
  expect(deskTick(s,11599)).toBe(s)
  s=round(s);s=deskTick(s,11600)
  expect(s.chapter1!.correctionsDesk!.reply!.requestId).toBe('R-GB-VH-001')
  expect(s.chapter1!.correctionsDesk!.reply!.text).toContain('You asked what the “Updated: Yesterday” label refers to.')
  expect(s.chapter1!.correctionsDesk!.replyRead).toBe(false)
  s=action(round(s),{type:'enter'},20000);s=deskTick(s,50000)
  expect(s.notifications.filter(n=>n.id==='EV-S06-DESK-REPLY-001')).toHaveLength(1)
 })
 it('applies relationship effects on the actual Send, before any response arrives',()=>{
  let s=drain(action(enter(),{type:'thread',thread:'sophie'}));const before=s.relationships.sophie.affinity
  s=draftActIChoice(s,'b');expect(s.relationships.sophie.affinity).toBe(before)
  s=sendScene01Choice(s,'b','',false,1800000010000)
  expect(s.relationships.sophie.affinity).toBe(Math.min(100,before+2))
  const affinity=s.relationships.sophie.affinity;s=drain(round(s));expect(s.relationships.sophie.affinity).toBe(affinity)
 })
 it('does not turn a late Scene 05 send into an earlier request on the new-request path',()=>{
  const s=enter();s.chapter1!.versionHistory!.inquiry=base('a').chapter1!.versionHistory!.inquiry
  expect(action(s,{type:'enter'}).chapter1!.correctionsDesk!.prior).toBeUndefined()
  expect(deskTick(s,Infinity).chapter1!.correctionsDesk!.replyDelivered).toBe(false)
 })
 it('does not make Sophie appear online when the publisher role inbox is open',()=>{
  const s=action(enter(base('a')),{type:'thread',thread:'desk'})
  expect(openingPresence(s,'sophie')).toBe('offline')
 })
 it('unavailable Sophie and blocked Unknown do not gate the case; old revisions remain untouched',()=>{
  const old=base();delete old.prologue!.scene01!.scriptRevision
  expect(action(old,{type:'enter'})).toBe(old)
  let s=enter();s.prologue!.scene01!.introduced=false;s.chapter1!.sender.blocked=true
  expect(deskEligible(s,'sophie')).toBe(false)
  const sender=s.chapter1!.sender;s=core(s);s=action(s,{type:'local',id:'S06-C14',choice:'a'})
  expect(s.chapter1!.correctionsDesk!.complete).toBe(true);expect(s.chapter1!.sender).toEqual(sender)
 })
})
