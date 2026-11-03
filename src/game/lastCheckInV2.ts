import { capturedExchange, lastCheckInChoices, lastCheckInConclusions, lastCheckInQuestions, lastCheckInV2Id } from '../content/lastCheckInV2'
import type { GameSave } from './types'

type Actor='lucas'|'maya'|'player'
export interface LastCheckInV2State {version:1;sceneId:typeof lastCheckInV2Id;visible:boolean;route:'lucas'|'maya';phase:'opening'|'choice'|'inspect'|'questions'|'conclusion'|'complete';lines:{id:string;sender:Actor;text:string;at:number}[];draft?:string;choice?:string;inspected:string[];questions:string[];conclusion?:string;complete:boolean;receipts:{eventId:string;recipient:string;factIds:string[]}[]}
export type LastCheckInAction={type:'enter'|'open'|'leave'|'send'|'conclude'}|{type:'draft';id:string}|{type:'inspect';field:'capture'|'date'|'provenance'|'completeness'|'authenticity'}
const event='CH1-S08V2-CONTACT'
const unique=<T,>(xs:T[],x:T)=>xs.includes(x)?xs:[...xs,x]
const put=(s:GameSave,p:Partial<LastCheckInV2State>):GameSave=>s.chapter1?.lastCheckInV2?{...s,chapter1:{...s.chapter1,lastCheckInV2:{...s.chapter1.lastCheckInV2,...p}}}:s
const line=(s:GameSave,id:string,sender:Actor,text:string,at:number):GameSave=>{const p=s.chapter1?.lastCheckInV2;if(!p||p.lines.some(x=>x.id===id))return s;return put(s,{lines:[...p.lines,{id,sender,text,at}],receipts:sender==='player'?p.receipts:[...p.receipts,{eventId:id,recipient:'player',factIds:[]}]})}
export function lastCheckInTick(s:GameSave,now:number):GameSave {
  const p=s.chapter1?.lastCheckInV2,due=s.pendingEvents.find(x=>x.id===event)
  if(!p||!due||due.dueAt>now||p.phase!=='opening')return s
  s={...s,pendingEvents:s.pendingEvents.filter(x=>x.id!==event),deliveredEvents:unique(s.deliveredEvents,event),notifications:[...s.notifications,{id:event,text:p.route==='maya'?'Maya: Lucas left something for you.':'Lucas: I kept a message from Daniel.',read:false}]}
  if(p.route==='maya')s=line(s,'CH1-S08V2-MAYA','maya',"Lucas isn't ready to talk directly. He asked me to pass on a capture from his chat with Daniel. I'm sending what he gave me, without speaking for him.",now)
  else{s=line(s,'CH1-S08V2-LUCAS-1','lucas',"I still don't know why your number was in his contacts. And I haven't decided if I trust you.",now);s=line(s,'CH1-S08V2-LUCAS-2','lucas',"But Daniel sent me something before he disappeared. I didn't think it mattered until now.",now+700)}
  return put(s,{phase:'choice'})
}
export function lastCheckInAction(s:GameSave,a:LastCheckInAction,now=Date.now()):GameSave {
  if(a.type==='enter'){
    if(!s.chapter1?.starredNumberV2?.complete||s.chapter2Access)return s
    if(s.chapter1.lastCheckInV2)return put(s,{visible:true})
    const rel=s.relationships.lucas,route:LastCheckInV2State['route']=rel.suspicion>=60||rel.trust<=-30?'maya':'lucas'
    const state:LastCheckInV2State={version:1,sceneId:lastCheckInV2Id,visible:true,route,phase:'opening',lines:[],inspected:[],questions:[],complete:false,receipts:[]}
    return {...s,chapter1:{...s.chapter1,lastCheckInV2:state},pendingEvents:[...s.pendingEvents,{id:event,dueAt:now+1600}]}
  }
  const p=s.chapter1?.lastCheckInV2;if(!p)return s
  if(a.type==='open')return put(s,{visible:true})
  if(a.type==='leave')return put(s,{visible:false})
  if(a.type==='draft'){
    const valid=p.phase==='choice'?lastCheckInChoices.some(x=>x.id===a.id):p.phase==='questions'?lastCheckInQuestions.some(x=>x.id===a.id&&!p.questions.includes(x.id)):p.phase==='conclusion'?lastCheckInConclusions.some(x=>x.id===a.id):false
    return valid?put(s,{draft:a.id}):s
  }
  if(a.type==='send'&&p.draft&&p.phase==='choice'){
    const choice=lastCheckInChoices.find(x=>x.id===p.draft);if(!choice)return s
    const id='CH1-S08V2-CHOICE-'+choice.id
    s=line(s,id+'-PLAYER','player',choice.text,now)
    s=line(s,id+'-REPLY',p.route==='maya'?'maya':'lucas',p.route==='maya'?"I asked Lucas why he waited. He said he was angry and unsure what the star meant. He hasn't asked me to tell you more than the capture shows.":choice.reply,now+700)
    if(p.route==='lucas'){
      const rel=s.relationships.lucas
      s={...s,relationships:{...s.relationships,lucas:{...rel,trust:Math.max(-100,Math.min(100,rel.trust+choice.trust)),affinity:Math.max(-100,Math.min(100,rel.affinity+choice.affinity)),suspicion:Math.max(-100,Math.min(100,rel.suspicion+choice.suspicion))}}}
      s={...s,knowledge:{...s.knowledge,characters:{...s.knowledge.characters,lucas:unique(s.knowledge.characters.lucas,id+':sent')}}}
    }else s={...s,knowledge:{...s.knowledge,characters:{...s.knowledge.characters,maya:unique(s.knowledge.characters.maya,id+':sent')}}}
    return put(s,{draft:undefined,choice:choice.id,phase:'inspect'})
  }
  if(a.type==='inspect'&&p.phase==='inspect'){
    const inspected=unique(p.inspected,a.field)
    s=put(s,{inspected,phase:inspected.length===5?'questions':'inspect'})
    if(a.field==='capture')s={...s,evidence:{...s.evidence,'EV-S08V2-LUCAS-CAPTURE':{id:'EV-S08V2-LUCAS-CAPTURE',source:`Received ${p.route==='maya'?'via Maya from Lucas':'from Lucas'}; displayed exchange: ${capturedExchange.map(x=>x.sender+': '+x.text).join(' / ')}; date, origin, completeness and authenticity unverified`,collectedAt:now,verified:false}}}
    return s
  }
  if(a.type==='send'&&p.draft&&p.phase==='questions'){
    const q=lastCheckInQuestions.find(x=>x.id===p.draft&&!p.questions.includes(x.id));if(!q)return s
    const id='CH1-S08V2-ASK-'+q.id
    s=line(s,id+'-PLAYER','player',q.text,now)
    s=line(s,id+'-REPLY',p.route==='maya'?'maya':'lucas',p.route==='maya'?"I can ask Lucas, but I won't guess for him. The capture is all he gave me.":q.reply,now+650)
    return put(s,{questions:unique(p.questions,q.id),draft:undefined})
  }
  if(a.type==='conclude'&&p.phase==='questions')return put(s,{phase:'conclusion',draft:undefined})
  if(a.type==='conclude'&&p.phase==='conclusion'&&p.draft){const c=lastCheckInConclusions.find(x=>x.id===p.draft);if(!c)return s;const id='EV-S08V2-PRIVATE-CONCLUSION';s={...s,evidence:{...s.evidence,[id]:{id,source:'PLAYER_PRIVATE / '+c.text,collectedAt:now,verified:false}},deliveredEvents:unique(s.deliveredEvents,id)};return put(s,{phase:'complete',complete:true,conclusion:c.id,draft:undefined})}
  return s
}
export function validateLastCheckInV2(value:unknown):void {if(value===undefined)return;const p=value as LastCheckInV2State;if(!p||p.version!==1||p.sceneId!==lastCheckInV2Id||typeof p.visible!=='boolean'||!['lucas','maya'].includes(p.route)||!['opening','choice','inspect','questions','conclusion','complete'].includes(p.phase)||!Array.isArray(p.lines)||p.lines.some(x=>!x||typeof x.id!=='string'||!['lucas','maya','player'].includes(x.sender)||typeof x.text!=='string'||!Number.isFinite(x.at))||!Array.isArray(p.inspected)||p.inspected.some(x=>!['capture','date','provenance','completeness','authenticity'].includes(x))||!Array.isArray(p.questions)||typeof p.complete!=='boolean'||p.complete!==(p.phase==='complete')||!Array.isArray(p.receipts))throw Error('Invalid last check-in scene')}
