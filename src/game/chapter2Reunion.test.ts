import { describe,expect,it } from 'vitest'
import { reunionNodes, mayaLucasInterception, type StoryThread } from '../content/chapter2Reunion'
import { eliLucasInterception } from '../content/reunionSource'
import { chapter2Access,accessChoices,validateAccessState } from './chapter2Access'
import { reunionAction,reunionChoices,reunionNextDue,startReunion,tickReunion,storyText,noteReunionExploration,validateReunion,type SpyId } from './chapter2Reunion'
import { beginScene01 } from './scene01'
import { newGame,type GameSave } from './types'
import { normalizeSave } from './engine'
import { phoneNotices,openingPresence } from './phonePresentation'
const time=1800000000000
function base(){
 let s=beginScene01(newGame(),time)
 s.prologue!.scene01={...s.prologue!.scene01!,queue:[],groupComplete:true,lucasLeftGroup:true,groupMembers:{sophie:true,maya:true,lucas:false},privateScene03:{version:1,startedAt:time,reading:false,complete:true,completedAt:time,nextEventReady:true,receipts:[]}}
 s=chapter2Access(s,{type:'tick'},time+7000)
 let now=time+7100
 for(let i=0;i<300;i++){
  const c=s.chapter2Access!
  if(c.installCompleted){s=chapter2Access(s,{type:'open-mirror'},now);s=chapter2Access(s,{type:'life-navigate',location:{app:'Mail',item:'LIFE-E4'}},now);s=chapter2Access(s,{type:'start-recovery'},now);return startReunion(s,now)}
  if(c.queue){now=c.queue.dueAt;s=chapter2Access(s,{type:'tick'},now);continue}
  if(c.node==='PACKAGE'){s=chapter2Access(s,{type:'confirm-install'},now);continue}
  const opt=accessChoices(s)[0];if(!opt)throw Error(c.node)
  s=chapter2Access(chapter2Access(s,{type:'draft',id:opt.id},now),{type:'send',id:opt.id},now)
 }
 throw Error('setup')
}
function settle(s:GameSave,thread:StoryThread){for(let i=0;i<1000;i++){const q=s.chapter2Access!.story!.sessions[thread]?.queue;if(q?.dueAt===undefined)return s;s=tickReunion(s,q.dueAt)}throw Error('stalled')}
function send(s:GameSave,thread:StoryThread,id:string){const q=s.chapter2Access!.story!.sessions[thread];const now=(q?.queue?.dueAt??Math.max(time,...s.chapter2Access!.groupMessages.map(m=>m.at)))+100;return settle(reunionAction(reunionAction(s,{type:'story-draft',thread,id},now),{type:'story-send',thread,id},now),thread)}
function at(id:string){let s=base();s=settle(reunionAction(s,{type:'story-open',thread:'group'},time+500000),'group');for(let i=0;i<100;i++){const session=s.chapter2Access!.story!.sessions.group!;if(session.node===id)return s;const opt=reunionChoices(s,'group')[0];if(!opt)throw Error(session.node);s=send(s,'group',opt.id)}throw Error('unreached')}
function finish(s:GameSave,thread:StoryThread,picks:Record<string,string>={}){for(let i=0;i<150;i++){if(s.chapter2Access!.story!.sessions[thread]?.finished)return s;const node=s.chapter2Access!.story!.sessions[thread]!.node,opt=reunionChoices(s,thread).find(o=>o.id===(picks[node]??'a'))??reunionChoices(s,thread)[0];if(!opt)throw Error(node);s=send(s,thread,opt.id)}throw Error('unfinished')}
function offered(){let s=finish(at('G01'),'group',{'G04':'c'});s=reunionAction(s,{type:'story-close',thread:'group'},time+900000);s=tickReunion(s,time+10000000);s=tickReunion(s,time+10000001);s=settle(reunionAction(s,{type:'story-open',thread:'unknown'},time+10000002),'unknown');return finish(s,'unknown')}
function watch(s:GameSave,id:SpyId){s=reunionAction(s,{type:'story-open',thread:id},time+20000000);for(let i=0;i<500;i++){const spy=s.chapter2Access!.story!.spy[id]!;if(spy.complete)return s;s=tickReunion(s,spy.dueAt!)}throw Error('spy stalled')}

describe('Chapter 2 reunion direction and privacy',()=>{
 it('has reachable graph targets and exactly eight main group decisions',()=>{for(const node of Object.values(reunionNodes)){const targets=node.kind==='choice'?node.options.map(o=>o.next):node.kind==='if'?[node.yes,node.no]:node.next?[node.next]:[];for(const id of targets)expect(reunionNodes[id],id).toBeTruthy();if(node.kind==='npc')expect(node.actor).not.toBe('player')}for(let i=1;i<=8;i++)expect(reunionNodes[`G0${i}`].kind).toBe('choice')})
 for(let i=1;i<=8;i++)for(const id of ['a','b','c'])it(`delivers distinct reaction G0${i}/${id} only after Send`,()=>{
  let s=at(`G0${i}`);s.chapter2Access!.viewed.push('LIFE-N1')
  const opt=reunionChoices(s,'group').find(o=>o.id===id)!,before=s.chapter2Access!.groupMessages.length
  expect(reunionAction(s,{type:'story-send',thread:'group',id},time)).toBe(s)
  const draft=reunionAction(s,{type:'story-draft',thread:'group',id},time)
  expect(draft.chapter2Access!.groupMessages).toHaveLength(before)
  s=send(draft,'group',id)
  expect(s.chapter2Access!.story!.choices[`G0${i}`]).toBe(id)
  expect(s.chapter2Access!.groupMessages[before]).toMatchObject({sender:'player',text:opt.text})
  expect(s.chapter2Access!.groupMessages.slice(before+1).some(m=>m.sender!=='player')).toBe(true)
  validateAccessState(s.chapter2Access)
 })
 it('never replays the old readiness scene and adds only members who actually left',()=>{const s=at('G01');expect(s.chapter2Access!.groupMessages.filter(m=>m.sender==='system').map(m=>m.text)).toEqual(['Maya added Lucas Grey.']);expect(s.chapter2Access!.story!.members.nora).toBe(false);expect(s.chapter2Access!.groupMessages.some(m=>m.sender==='nora')).toBe(false);expect(s.chapter2Access!.groupMessages.some(m=>m.text==='Can we start?')).toBe(false)})
 it('does not leak a name disclosed only to Sophie',()=>{const s=base();s.prologue!.scene01!.nameDisclosed=true;s.prologue!.scene01!.disclosedName='Secret';s.knowledge.characters.sophie.push('OPEN-S01-PLAYER-CODENAME');expect(storyText(s,'[PLAYER_NAME]?')).toBe('Are you there?')})
 it('guards observed clues and grants only explicitly sent recipient receipts',()=>{
  let s=at('G04');expect(reunionChoices(s,'group').map(o=>o.id)).toEqual(['a','c'])
  s.chapter2Access!.viewed.push('LIFE-PH5');s=send(s,'group','b')
  expect(s.chapter2Access!.story!.disclosure).toBe('clues');expect(s.chapter2Access!.story!.sessions.group!.node).toContain('DISCLOSE-IMAGE')
  expect(s.knowledge.characters.maya).not.toContain('C2-DISCLOSED-IMG0714')
  s=send(s,'group','send');expect(s.knowledge.characters.maya).toContain('C2-DISCLOSED-IMG0714');expect(s.knowledge.characters.maya).not.toContain('C2-DISCLOSED-INDEX-NOTE');expect(s.knowledge.characters.maya).not.toContain('C2-DISCLOSED-PHONE-MIRROR')
 })
 it('withholding causes no privacy penalty, no recovery leak and chooses Sophie followup',()=>{const s=finish(at('G04'),'group',{'G04':'c'});expect(s.chapter2Access!.story!.followup).toBe('sophie');expect(s.knowledge.characters.maya.some(k=>k.startsWith('C2-DISCLOSED'))).toBe(false);expect(s.chapter2Access!.groupMessages.some(m=>m.text==='There are deleted items in the mirrored phone data.')).toBe(false);expect(openingPresence(s,'maya')).toBe('offline')})
 it('preserves drafts and remaining typing across explicit checkpoint/reload',()=>{let s=at('G01');s=reunionAction(s,{type:'story-draft',thread:'group',id:'b'},time);s=reunionAction(s,{type:'story-close',thread:'group'},time);s=normalizeSave(JSON.parse(JSON.stringify(s)));expect(s.chapter2Access!.story!.sessions.group!.draft).toBe('b');expect(tickReunion(s,time+999999999)).toBe(s);s=reunionAction(s,{type:'story-open',thread:'group'},time+1000);s=send(s,'group','b');expect(s.chapter2Access!.story!.choices.G01).toBe('b')})
 it('adapts legacy readiness history without deleting or repeating delivered lines',()=>{let s=base();const c=s.chapter2Access!;s={...s,chapter2Access:{...c,story:undefined,groupMessages:[{id:'legacy',sender:'nora',text:'Retained.',at:time}],groupQueued:true,complete:true}};s=chapter2Access(s,{type:'open-group'},time);expect(s.chapter2Access!.groupMessages).toEqual([{id:'legacy',sender:'nora',text:'Retained.',at:time}]);expect(s.chapter2Access!.story!.sessions.group!.node).toBe('G01');validateAccessState(s.chapter2Access)})
 it('plays all 33 supplied Eli/Lucas lines without composer, knowledge or relationship changes',()=>{let s=offered();expect(s.chapter2Access!.relayAvailable).toBe(true);const knowledge=s.knowledge,relationships=s.relationships;s=watch(s,'eli-lucas');expect(s.chapter2Access!.story!.spy['eli-lucas']!.messages.map(m=>m.text)).toEqual(eliLucasInterception.map(m=>m.text));expect(s.knowledge).toEqual(knowledge);expect(s.relationships).toEqual(relationships);expect(s.chapter2Access!.story!.receipts.filter(r=>r.source==='spy-unverified')).toHaveLength(33);expect(phoneNotices(s).filter(n=>n.thread==='eli-lucas')).toHaveLength(1);validateAccessState(s.chapter2Access)})
 it('pauses an interception mid-typing and resumes without replay',()=>{let s=offered();s=reunionAction(s,{type:'story-open',thread:'eli-lucas'},time+100000);s=tickReunion(s,time+102000);const spy=s.chapter2Access!.story!.spy['eli-lucas']!;s=reunionAction(s,{type:'story-close',thread:'eli-lucas'},time+102001);const paused=normalizeSave(JSON.parse(JSON.stringify(s)));expect(tickReunion(paused,time+99999999)).toBe(paused);s=reunionAction(paused,{type:'story-open',thread:'eli-lucas'},time+99999999);expect(s.chapter2Access!.story!.spy['eli-lucas']!.messages).toEqual(spy.messages);validateReunion(s.chapter2Access!.story)})
 it('offers Maya/Lucas only after optional first interception and a quiet Mirror visit',()=>{let s=offered();s=reunionAction(s,{type:'story-skip-first'},time+10000000);s=reunionAction(s,{type:'story-close',thread:'unknown'},time+10000000);s=tickReunion(s,time+90000000);expect(s.chapter2Access!.story!.spy['maya-lucas']).toBeUndefined();s=noteReunionExploration(s);s=tickReunion(s,time+90000001);expect(s.chapter2Access!.story!.spy['maya-lucas']?.unlocked).toBe(true);expect(s.chapter2Access!.story!.active).toBeUndefined();const before=s.knowledge;s=watch(s,'maya-lucas');expect(s.knowledge).toEqual(before);expect(s.chapter2Access!.story!.spy['maya-lucas']!.messages.map(m=>m.text)).toEqual(mayaLucasInterception(false).map(m=>m.text));s=settle(reunionAction(s,{type:'story-open',thread:'unknown'},time+999999999),'unknown');s=finish(s,'unknown');expect(s.chapter2Access!.story!.complete).toBe(true);validateAccessState(s.chapter2Access)})
 it('both interceptions can be declined without altering relationships or NPC knowledge',()=>{let s=offered();const knowledge=s.knowledge,relationships=s.relationships;s=reunionAction(s,{type:'story-skip-first'},time);s=noteReunionExploration(s);s=tickReunion(s,time+90000000);s=reunionAction(s,{type:'story-skip-second'},time+90000001);expect(s.chapter2Access!.story!.complete).toBe(true);expect(s.knowledge).toEqual(knowledge);expect(s.relationships).toEqual(relationships);expect(s.chapter2Access!.relayAvailable).toBe(false)})
 it('rejects invalid saved script nodes, drafts and altered intercepted source',()=>{const s=offered(),r=s.chapter2Access!.story!;expect(()=>validateReunion({...r,sessions:{group:{node:'missing'}}})).toThrow();expect(()=>validateReunion({...r,sessions:{group:{node:'G01',draft:'fake'}}})).toThrow();const watched=watch(s,'eli-lucas').chapter2Access!.story!;const spy=watched.spy['eli-lucas']!;expect(()=>validateReunion({...watched,spy:{'eli-lucas':{...spy,messages:spy.messages.map((m,i)=>i?m:{...m,text:'Fake'})}}})).toThrow()})
 it('schedules no background intercepted messages before player opens the thread',()=>{const s=offered();expect(reunionNextDue(s)).toBe(Infinity);expect(s.chapter2Access!.story!.spy['eli-lucas']!.messages).toHaveLength(0)})
})
