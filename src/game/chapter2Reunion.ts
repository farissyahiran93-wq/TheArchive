import { followupEntry, mayaLucasInterception, reunionG01, reunionNodes, reunionOpening, scene09Reflection, spyUnknownEntry, spyUnknownPost, type Guard, type StoryOption, type StoryThread } from '../content/chapter2Reunion'
import { eliLucasInterception } from '../content/reunionSource'
import type { GameSave } from './types'
import type { AccessMessage } from './chapter2Access'

export type SpyId='eli-lucas'|'maya-lucas'
export type Active=StoryThread|SpyId
export interface StorySession {node:string;queue?:{remaining:number;dueAt?:number};draft?:string;finished?:boolean}
export interface Interception {unlocked:boolean;viewed:boolean;complete:boolean;declined:boolean;index:number;phase:'gap'|'typing'|'cancel'|'final'|'ended';remaining:number;dueAt?:number;messages:AccessMessage[];fullDisclosure:boolean}
export interface ReunionState {
 version:1;revision:number;active?:Active;sessions:Partial<Record<StoryThread,StorySession>>
 members:Record<'maya'|'lucas'|'sophie'|'eli'|'nora',boolean>;presence:Record<'maya'|'lucas'|'sophie'|'eli',boolean>
 groupComplete:boolean;disclosure:'full'|'clues'|'none'|null;choices:Record<string,string>;privateMessages:Record<'maya'|'eli'|'sophie',AccessMessage[]>
 followup?:'maya'|'eli'|'sophie';followupDueAt?:number;unknownDueAt?:number;scene09DueAt?:number;exploredAfterGroup:boolean
 spy:Partial<Record<SpyId,Interception>>;postSpyStarted:boolean;firstResolved:boolean;reflectionStarted:boolean;complete:boolean
 receipts:{eventId:string;recipient:string;source:'group-recollection'|'private-message'|'player-disclosure'|'spy-unverified';facts:string[]}[]
}
export type ReunionAction={type:'story-open'|'story-close';thread:Active}|{type:'story-draft'|'story-send';thread:StoryThread;id:string}|{type:'story-skip-first'|'story-skip-second'}
const relay=(r:ReunionState)=>Object.values(r.spy).some(spy=>spy.unlocked&&!spy.complete&&!spy.declined)
function put(s:GameSave,r:ReunionState):GameSave {return {...s,chapter2Access:{...s.chapter2Access!,relayAvailable:relay(r),story:{...r,revision:r.revision+1}}}}
const mark=(s:GameSave,id:string)=>s.deliveredEvents.includes(id)?s:{...s,deliveredEvents:[...s.deliveredEvents,id]}
const notify=(s:GameSave,id:string,text:string)=>s.notifications.some(n=>n.id===id)?s:{...s,notifications:[...s.notifications,{id,text,read:false}]}
const pause=(session:StorySession,now:number):StorySession=>session.queue?{...session,queue:{remaining:Math.max(0,(session.queue.dueAt??now+session.queue.remaining)-now)}}:session
const delay=(text:string)=>Math.min(3300,Math.max(950,650+text.split(/\s+/).length*100))
const blankSpy=(full:boolean):Interception=>({unlocked:true,viewed:false,complete:false,declined:false,index:0,phase:'gap',remaining:2000,messages:[],fullDisclosure:full})
const isThread=(id:Active):id is StoryThread=>!['eli-lucas','maya-lucas'].includes(id)
export function reunionGuard(s:GameSave,g:Guard){const c=s.chapter2Access!,r=c.story!;return g==='note'?c.viewed.includes('LIFE-N1'):g==='image'?c.viewed.includes('LIFE-PH5'):g==='clues'?c.viewed.includes('LIFE-N1')||c.viewed.includes('LIFE-PH5'):g==='full'?r.disclosure==='full':c.recovery?.readyAt!==undefined}
export function storyText(s:GameSave,text:string){const scene=s.prologue?.scene01;const name=scene?.nameDisclosed&&s.knowledge.characters.maya.includes('OPEN-S01-PLAYER-CODENAME')?scene.disclosedName:undefined;return text==='[PLAYER_NAME]?'?(name?`${name}?`:'Are you there?'):text.replaceAll('[PLAYER_NAME]',name??'you')}

function enter(s:GameSave,thread:StoryThread,id:string,now:number):GameSave {
 let r=s.chapter2Access!.story!,node=reunionNodes[id]
 if(!node)return s
 let session:StorySession={node:id}
 s=put(s,{...r,sessions:{...r.sessions,[thread]:session}});r=s.chapter2Access!.story!
 if(node.kind==='if')return enter(s,thread,reunionGuard(s,node.guard)?node.yes:node.no,now)
 if(node.kind==='npc')return put(s,{...r,sessions:{...r.sessions,[thread]:{...session,queue:{remaining:delay(node.text),...(r.active===thread?{dueAt:now+delay(node.text)}:{})}}}})
 if(node.kind==='choice')return s
 const eid=`C2-STORY-EVENT-${id}`
 if(s.deliveredEvents.includes(eid))return node.next?enter(s,thread,node.next,now):s
 s=mark(s,eid);r=s.chapter2Access!.story!
 if(node.event==='members'){
   for(const who of ['lucas','sophie'] as const)if(!r.members[who]){
     s=append(s,'group',`C2-STORY-REJOIN-${who}`,'system',`Maya added ${who==='lucas'?'Lucas Grey':'Sophie Mercer'}.`,now)
     r=s.chapter2Access!.story!;s=put(s,{...r,members:{...r.members,[who]:true},presence:{...r.presence,[who]:true}})
   }
 } else if(node.event==='group-done'){
   r=s.chapter2Access!.story!;s=put(s,{...r,groupComplete:true,presence:{maya:false,lucas:false,eli:false,sophie:false},followup:r.disclosure==='full'?'maya':r.disclosure==='clues'?'eli':'sophie',followupDueAt:now+7000,unknownDueAt:now+30000})
   s={...s,chapter2Access:{...s.chapter2Access!,complete:true,phase:'ready'}}
 } else if(node.event==='followup-done'&&['maya','eli','sophie'].includes(thread)){
   s=put(s,{...r,presence:{...r.presence,[thread]:false}})
 } else if(node.event==='spy-offer'){
   if(!r.spy['eli-lucas']){
     s=put(s,{...r,spy:{...r.spy,'eli-lucas':blankSpy(r.disclosure==='full')}})
     s=notify(mark(s,'C2-SPY-ELI-UNLOCK'),'C2-SPY-ELI-UNLOCK','New intercepted thread · ELI ↔ LUCAS · READ ONLY')
   }
 } else if(node.event==='spy-post-done')s=put(s,{...r,firstResolved:true,...(!r.spy['maya-lucas']?{scene09DueAt:now+12000}:{})})
 else if(node.event==='reflection-done')s=put(s,{...r,complete:true})
 if(node.next)return enter(s,thread,node.next,now)
 r=s.chapter2Access!.story!;return put(s,{...r,sessions:{...r.sessions,[thread]:{node:id,finished:true}}})
}

function append(s:GameSave,thread:StoryThread,id:string,actor:string,text:string,now:number,facts:string[]=[]):GameSave {
 if(s.deliveredEvents.includes(id))return s
 const c=s.chapter2Access!,r=c.story!,line={id,sender:actor,text:storyText(s,text),at:now}
 const recipients=actor==='player'?thread==='group'?(['maya','lucas','sophie','eli'] as const).filter(who=>r.members[who]):[thread]:thread==='group'?['player',...(['maya','lucas','sophie','eli'] as const).filter(who=>r.members[who]&&who!==actor)]:['player']
 const receipts=recipients.map(recipient=>({eventId:id,recipient,source:actor==='player'?'player-disclosure' as const:thread==='group'?'group-recollection' as const:'private-message' as const,facts}))
 let next=put(s,{...r,receipts:[...r.receipts,...receipts],...(thread!=='group'&&thread!=='unknown'?{privateMessages:{...r.privateMessages,[thread]:[...r.privateMessages[thread],line]}}:{})})
 if(thread==='group')next={...next,chapter2Access:{...next.chapter2Access!,groupMessages:[...c.groupMessages,line]}}
 if(thread==='unknown')next={...next,chapter2Access:{...next.chapter2Access!,messages:[...c.messages,line]}}
 if(actor==='player'&&facts.length&&thread==='group'){
  const characters={...s.knowledge.characters}
  for(const who of ['maya','lucas','sophie','eli'] as const)if(r.members[who])characters[who]=[...new Set([...characters[who],...facts])]
  next={...next,knowledge:{...next.knowledge,characters}}
 }
 if(actor!=='player'&&actor!=='system'){
  const story=next.chapter2Access!.story!
  if(['maya','eli','sophie','lucas'].includes(actor))next=put(next,{...story,presence:{...story.presence,[actor]:true}})
  if(actor==='unknown')next={...next,chapter2Access:{...next.chapter2Access!,unknownOffline:false}}
  next=notify(next,id,line.text)
 }
 return mark(next,id)
}

export function startReunion(s:GameSave,now:number,legacy=false):GameSave {
 const c=s.chapter2Access
 if(!c||c.story)return s
 const old=s.prologue?.scene01
 const r:ReunionState={version:1,revision:0,sessions:{},receipts:[],members:{maya:true,eli:true,lucas:legacy||old?.groupMembers?.lucas!==false,sophie:old?.groupMembers?.sophie!==false,nora:legacy&&c.groupMessages.some(m=>m.sender==='nora')},presence:{maya:true,eli:true,lucas:legacy,sophie:old?.groupMembers?.sophie!==false},groupComplete:false,disclosure:null,choices:{},privateMessages:{maya:[],eli:[],sophie:[]},exploredAfterGroup:false,spy:{},postSpyStarted:false,firstResolved:false,reflectionStarted:false,complete:false}
 let next=put({...s,chapter2Access:{...c,groupQueued:true,groupDueAt:undefined,queue:undefined}},r)
 next=enter(next,'group',legacy?reunionG01:reunionOpening,now)
 // One incoming message calls the player back; later turns wait for opening the chat.
 const session=next.chapter2Access!.story!.sessions.group!,node=reunionNodes[session.node]
 if(node.kind==='npc')next=enter(append(next,'group',`C2-STORY-group-${session.node}`,node.actor,node.text,now), 'group',node.next,now)
 return next
}

export function reunionChoices(s:GameSave,thread:StoryThread):StoryOption[]{
 const r=s.chapter2Access?.story,session=r?.sessions[thread]
 if(!session||session.queue||session.finished)return []
 const n=reunionNodes[session.node]
 return n?.kind==='choice'?n.options.filter(o=>!o.guard||reunionGuard(s,o.guard)):[]
}
function waitingChoice(s:GameSave){const r=s.chapter2Access?.story;if(!r?.active||!isThread(r.active))return false;return reunionChoices(s,r.active).length>0}
export function reunionNextDue(s:GameSave):number {
 const r=s.chapter2Access?.story
 if(!r||waitingChoice(s))return Infinity
 const due=Object.values(r.sessions).map(v=>v.queue?.dueAt??Infinity)
 return Math.min(...due,...Object.values(r.spy).map(v=>v.dueAt??Infinity),r.followupDueAt??Infinity,r.unknownDueAt??Infinity,r.firstResolved&&r.exploredAfterGroup&&r.active!=='eli-lucas'&&!r.spy['maya-lucas']?r.scene09DueAt??Infinity:Infinity)
}

function startSession(s:GameSave,thread:StoryThread,entry:string,now:number,incoming=false){
 let next=enter(s,thread,entry,now)
 const session=next.chapter2Access!.story!.sessions[thread]!,node=reunionNodes[session.node]
 if(incoming&&node.kind==='npc')next=enter(append(next,thread,`C2-STORY-${thread}-${session.node}`,node.actor,node.text,now),thread,node.next,now)
 return next
}
function openThread(s:GameSave,thread:Active,now:number):GameSave {
 let r=s.chapter2Access!.story!,sessions={...r.sessions},spies={...r.spy}
 if(isThread(thread)?!r.sessions[thread]:!r.spy[thread]?.unlocked)return s
 if(r.active===thread)return readThread(s,thread)
 for(const [key,session] of Object.entries(sessions))sessions[key as StoryThread]=pause(session,now)
 for(const [key,spy]of Object.entries(spies))if(spy.dueAt!==undefined)spies[key as SpyId]={...spy,remaining:Math.max(0,spy.dueAt-now),dueAt:undefined}
 s=put(s,{...r,active:thread,sessions,spy:spies});r=s.chapter2Access!.story!
 if(isThread(thread)){
  if(thread==='unknown'){
   if(r.spy['eli-lucas']?.complete&&!r.postSpyStarted&&!r.reflectionStarted){s=put(s,{...r,postSpyStarted:true});s=startSession(s,'unknown',spyUnknownPost,now)}
   else if(r.spy['maya-lucas']?.complete&&!r.reflectionStarted){s=put(s,{...r,reflectionStarted:true});s=startSession(s,'unknown',scene09Reflection,now)}
  }
  r=s.chapter2Access!.story!;const current=r.sessions[thread]
  if(current?.queue)s=put(s,{...r,sessions:{...r.sessions,[thread]:{...current,queue:{...current.queue,dueAt:now+current.queue.remaining}}}})
 }else{
  const spy=r.spy[thread]
  if(spy?.unlocked&&!spy.complete)s=put(s,{...r,spy:{...r.spy,[thread]:{...spy,declined:false,viewed:true,dueAt:now+spy.remaining}}})
 }
 if(thread==='group')s={...s,chapter2Access:{...s.chapter2Access!,groupOpened:true}}
 return readThread(s,thread)
}
function readThread(s:GameSave,thread:Active){
 const c=s.chapter2Access!,r=c.story!
 const ids=new Set(isThread(thread)?thread==='group'?c.groupMessages.map(m=>m.id):thread==='unknown'?c.messages.map(m=>m.id):r.privateMessages[thread].map(m=>m.id):[thread==='eli-lucas'?'C2-SPY-ELI-UNLOCK':'C2-SPY-MAYA-UNLOCK'])
 return s.notifications.some(n=>ids.has(n.id)&&!n.read)?{...s,notifications:s.notifications.map(n=>ids.has(n.id)?{...n,read:true}:n)}:s
}

export function tickReunion(s:GameSave,now:number):GameSave {
 let r=s.chapter2Access?.story
 if(!r||waitingChoice(s))return s
 for(const [thread,session]of Object.entries(r.sessions))if(session.queue?.dueAt!==undefined&&session.queue.dueAt<=now){
  const node=reunionNodes[session.node]
  if(node.kind==='npc')return enter(append(s,thread as StoryThread,`C2-STORY-${thread}-${session.node}`,node.actor,node.text,now),thread as StoryThread,node.next,now)
 }
 for(const id of ['eli-lucas','maya-lucas'] as const){
  const spy=r.spy[id];if(!spy||spy.dueAt===undefined||spy.dueAt>now)continue
  const script=id==='eli-lucas'?eliLucasInterception:mayaLucasInterception(spy.fullDisclosure)
  let next={...spy}
  const line=script[spy.index]
  if(spy.phase==='final'){
   next={...next,phase:'ended',complete:true,dueAt:undefined,remaining:0}
   return mark(put(s,{...r,spy:{...r.spy,[id]:next}}),`C2-SPY-${id}-ENDED`)
  }
  if(spy.phase==='gap'&&line.typing>0)next={...next,phase:'typing',remaining:line.typing,dueAt:now+line.typing}
  else if(spy.phase==='typing'&&line.cancel>0)next={...next,phase:'cancel',remaining:line.cancel,dueAt:now+line.cancel}
  else{
   const eventId=`C2-SPY-${id}-${String(spy.index).padStart(3,'0')}`
   const msg={id:eventId,sender:line.actor,text:line.text,at:now}
   next={...next,messages:[...spy.messages,msg],index:spy.index+1}
   const upcoming=script[next.index]
   next=upcoming?{...next,phase:'gap',remaining:upcoming.gap,dueAt:now+upcoming.gap}:{...next,phase:'final',remaining:4000,dueAt:now+4000}
   s=mark(s,eventId);r=s.chapter2Access!.story!
   r={...r,receipts:[...r.receipts,{eventId,recipient:'player',source:'spy-unverified',facts:[]}]}
  }
  return put(s,{...r,spy:{...r.spy,[id]:next}})
 }
 if(r.followupDueAt!==undefined&&r.followupDueAt<=now&&r.followup){
  const who=r.followup;s=put(s,{...r,followupDueAt:undefined});return startSession(s,who,followupEntry[who],now,true)
 }
 if(r.unknownDueAt!==undefined&&r.unknownDueAt<=now){s=put(s,{...r,unknownDueAt:undefined});return startSession(s,'unknown',spyUnknownEntry,now,true)}
 if(r.firstResolved&&r.exploredAfterGroup&&r.active!=='eli-lucas'&&!r.spy['maya-lucas']&&r.scene09DueAt!==undefined&&r.scene09DueAt<=now){
  s=put(s,{...r,scene09DueAt:undefined,spy:{...r.spy,'maya-lucas':blankSpy(r.disclosure==='full')}})
  return notify(mark(s,'C2-SPY-MAYA-UNLOCK'),'C2-SPY-MAYA-UNLOCK','New intercepted thread · MAYA ↔ LUCAS · READ ONLY')
 }
 return s
}

export function reunionAction(s:GameSave,a:ReunionAction,now:number):GameSave{
 let r=s.chapter2Access?.story
 if(!r)return s
 if(a.type==='story-open')return openThread(s,a.thread,now)
 if(a.type==='story-close'){
  if(r.active!==a.thread)return s
  const sessions={...r.sessions},spy={...r.spy}
  if(isThread(a.thread)){const current=sessions[a.thread];if(current)sessions[a.thread]=pause(current,now)}
  else {const current=spy[a.thread];if(current?.dueAt!==undefined)spy[a.thread]={...current,remaining:Math.max(0,current.dueAt-now),dueAt:undefined}}
  return put(s,{...r,active:undefined,sessions,spy})
 }
 if(a.type==='story-draft'||a.type==='story-send'){
  const session=r.sessions[a.thread],option=reunionChoices(s,a.thread).find(o=>o.id===a.id)
  if(r.active!==a.thread||!session||!option)return s
  if(a.type==='story-draft')return session.draft===a.id?s:put(s,{...r,sessions:{...r.sessions,[a.thread]:{...session,draft:a.id}}})
  if(session.draft!==a.id)return s
  s=append(s,a.thread,`C2-STORY-PLAYER-${session.node}-${a.id}`,'player',option.text,now,option.facts)
  r=s.chapter2Access!.story!;s=put(s,{...r,choices:{...r.choices,[session.node]:a.id},...(option.disclosure?{disclosure:option.disclosure}:{})})
  if(option.support){const who=option.support==='group'?['maya','sophie','lucas','eli'] as const:[option.support];const relationships={...s.relationships};for(const id of who)relationships[id]={...relationships[id],trust:Math.min(100,Math.max(0,relationships[id].trust+1))};s={...s,relationships}}
  return enter(s,a.thread,option.next,now)
 }
 if(a.type==='story-skip-first'&&r.spy['eli-lucas']&&!r.firstResolved){const spy=r.spy['eli-lucas'];return put(s,{...r,firstResolved:true,scene09DueAt:now+12000,spy:{...r.spy,'eli-lucas':{...spy,declined:true,dueAt:undefined}},sessions:{...r.sessions,unknown:r.sessions.unknown?{...r.sessions.unknown,finished:true,queue:undefined}:undefined}})}
 if(a.type==='story-skip-second'&&r.spy['maya-lucas'])return put(s,{...r,complete:true,spy:{...r.spy,'maya-lucas':{...r.spy['maya-lucas'],declined:true,dueAt:undefined}}})
 return s
}

export function noteReunionExploration(s:GameSave):GameSave {const r=s.chapter2Access?.story;return r?.groupComplete&&!r.exploredAfterGroup?put(s,{...r,exploredAfterGroup:true}):s}

/** Optional save extension. Never repairs a malformed state by dropping story history. */
export function validateReunion(value:unknown):void {
 if(value===undefined)return
 const fail=()=>{throw new Error('Invalid Chapter 2 reunion state')}
 const obj=(v:unknown):v is Record<string,unknown>=>!!v&&typeof v==='object'&&!Array.isArray(v)
 const finite=(v:unknown)=>typeof v==='number'&&Number.isFinite(v)&&v>=0
 if(!obj(value))return fail()
 const r=value
 const threads=['group','unknown','maya','eli','sophie']
 if(r.version!==1||!Number.isInteger(r.revision)||!finite(r.revision)||r.active!==undefined&&![...threads,'eli-lucas','maya-lucas'].includes(String(r.active)))return fail()
 for(const key of ['groupComplete','exploredAfterGroup','postSpyStarted','firstResolved','reflectionStarted','complete'])if(typeof r[key]!=='boolean')return fail()
 if(![null,'full','clues','none'].includes(r.disclosure as string|null))return fail()
 for(const key of ['members','presence','sessions','choices','privateMessages','spy'])if(!obj(r[key]))return fail()
 const members=r.members as Record<string,unknown>,presence=r.presence as Record<string,unknown>
 for(const who of ['maya','lucas','sophie','eli'])if(typeof members[who]!=='boolean'||typeof presence[who]!=='boolean')return fail()
 if(typeof members.nora!=='boolean')return fail()
 for(const key of ['followupDueAt','unknownDueAt','scene09DueAt'])if(r[key]!==undefined&&!finite(r[key]))return fail()
 if(r.followup!==undefined&&!['maya','eli','sophie'].includes(String(r.followup)))return fail()
 for(const [thread,v]of Object.entries(r.sessions as Record<string,unknown>)){
  if(v===undefined)continue
  if(!threads.includes(thread)||!obj(v)||!reunionNodes[String(v.node)])return fail()
  const node=reunionNodes[String(v.node)]
  if(v.queue!==undefined&&(!obj(v.queue)||node.kind!=='npc'||!finite(v.queue.remaining)||v.queue.dueAt!==undefined&&!finite(v.queue.dueAt)))return fail()
  if(v.draft!==undefined&&(node.kind!=='choice'||!node.options.some(o=>o.id===v.draft)))return fail()
  if(v.finished!==undefined&&typeof v.finished!=='boolean')return fail()
 }
 for(const [node,id]of Object.entries(r.choices as Record<string,unknown>)){const n=reunionNodes[node];if(n?.kind!=='choice'||!n.options.some(o=>o.id===id))return fail()}
 const messages=(v:unknown,actors:string[])=>Array.isArray(v)&&v.every(m=>obj(m)&&typeof m.id==='string'&&typeof m.text==='string'&&finite(m.at)&&actors.includes(String(m.sender)))&&new Set(v.map(m=>m.id)).size===v.length
 for(const who of ['maya','eli','sophie'])if(!messages((r.privateMessages as Record<string,unknown>)[who],[who,'player','system']))return fail()
 for(const [id,v]of Object.entries(r.spy as Record<string,unknown>)){
  if(!['eli-lucas','maya-lucas'].includes(id)||!obj(v))return fail()
  for(const key of ['unlocked','viewed','complete','declined','fullDisclosure'])if(typeof v[key]!=='boolean')return fail()
  const script=id==='eli-lucas'?eliLucasInterception:mayaLucasInterception(v.fullDisclosure===true)
  if(!Number.isInteger(v.index)||Number(v.index)<0||Number(v.index)>script.length||!['gap','typing','cancel','final','ended'].includes(String(v.phase))||!finite(v.remaining)||v.dueAt!==undefined&&!finite(v.dueAt)||!messages(v.messages,id.split('-')))return fail()
  if((v.messages as AccessMessage[]).length!==v.index||(v.messages as AccessMessage[]).some((m,i)=>m.text!==script[i].text||m.sender!==script[i].actor))return fail()
 }
 if(!Array.isArray(r.receipts)||r.receipts.some(v=>!obj(v)||typeof v.eventId!=='string'||typeof v.recipient!=='string'||!['group-recollection','private-message','player-disclosure','spy-unverified'].includes(String(v.source))||!Array.isArray(v.facts)||v.facts.some(f=>typeof f!=='string')))return fail()
}
