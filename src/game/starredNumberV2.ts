import { starredConclusions, starredFollowups, starredNumberV2Id, starredOpening, starredQuestions, starredRequest } from '../content/starredNumberV2'
import type { GameSave } from './types'

type Line={id:string;sender:'sophie'|'player'|'maya';text:string;at:number}
export interface StarredNumberV2State {
  version:1;sceneId:typeof starredNumberV2Id;visible:boolean;phase:'opening'|'request'|'inspect'|'questions'|'conclusion'|'complete';
  lines:Line[];draft?:string;request?:string;mainChoice?:string;followups:string[];inspected:string[];groupSent:boolean;
  conclusion?:string;complete:boolean;feedback?:string;receipts:{eventId:string;recipient:string;factIds:string[]}[];
}
export type StarredAction={type:'enter'|'leave'|'open'|'send'|'conclude'|'group-send'}|{type:'draft';id:string}|{type:'inspect';field:'label'|'number'|'star'|'limits'}
const event='CH1-S07V2-SOPHIE-OPEN'
const unique=<T,>(items:T[],item:T)=>items.includes(item)?items:[...items,item]
const put=(s:GameSave,p:Partial<StarredNumberV2State>):GameSave=>s.chapter1?.starredNumberV2?{...s,chapter1:{...s.chapter1,starredNumberV2:{...s.chapter1.starredNumberV2,...p}}}:s
const line=(s:GameSave,id:string,sender:Line['sender'],value:string,now:number,factIds:string[]=[]):GameSave=>{
  const p=s.chapter1?.starredNumberV2
  if(!p||p.lines.some(x=>x.id===id))return s
  return put(s,{lines:[...p.lines,{id,sender,text:value,at:now}],receipts:sender==='player'?p.receipts:[...p.receipts,{eventId:id,recipient:'player',factIds}]})
}
export function starredNumberTick(s:GameSave,now:number):GameSave {
  const p=s.chapter1?.starredNumberV2,due=s.pendingEvents.find(x=>x.id===event)
  if(!p||!due||due.dueAt>now||p.phase!=='opening')return s
  s={...s,pendingEvents:s.pendingEvents.filter(x=>x.id!==event),deliveredEvents:unique(s.deliveredEvents,event),notifications:[...s.notifications,{id:event,text:"Sophie: I found the contact export again.",read:false}]}
  starredOpening.forEach((value,i)=>{s=line(s,`CH1-S07V2-OPEN-${i+1}`,'sophie',value,now+i*500)})
  return put(s,{phase:'request'})
}
export function starredNumberAction(s:GameSave,a:StarredAction,now=Date.now()):GameSave {
  if(a.type==='enter'){
    if(s.prologue?.scene01?.scriptRevision!=='final-2026-10-23'||!s.chapter1?.correctionsDesk?.complete||s.chapter2Access)return s
    if(s.chapter1.starredNumberV2)return put(s,{visible:true})
    const state:StarredNumberV2State={version:1,sceneId:starredNumberV2Id,visible:true,phase:'opening',lines:[],followups:[],inspected:[],groupSent:false,complete:false,receipts:[]}
    return {...s,chapter1:{...s.chapter1,starredNumberV2:state},pendingEvents:[...s.pendingEvents,{id:event,dueAt:now+1500}]}
  }
  const p=s.chapter1?.starredNumberV2
  if(!p)return s
  if(a.type==='leave')return put(s,{visible:false})
  if(a.type==='open')return put(s,{visible:true})
  if(a.type==='draft'){
    const options=p.phase==='request'?starredRequest:p.phase==='questions'?starredQuestions:p.phase==='conclusion'?starredConclusions:[]
    return options.some(x=>x.id===a.id)||p.phase==='questions'&&(a.id==='group'&&!p.groupSent&&!!p.mainChoice||starredFollowups.some(x=>x.id===a.id)&&!p.followups.includes(a.id))?put(s,{draft:a.id}):s
  }
  if(a.type==='send'&&p.draft){
    const options=p.phase==='request'?starredRequest:p.phase==='questions'?[...starredQuestions,...starredFollowups.filter(x=>!p.followups.includes(x.id))]:[]
    const choice=options.find(x=>x.id===p.draft)
    if(!choice)return s
    const id=`CH1-S07V2-${p.phase}-${choice.id}`
    s=line(s,id+'-PLAYER','player',choice.text,now)
    s={...s,deliveredEvents:unique(s.deliveredEvents,id),knowledge:{...s.knowledge,characters:{...s.knowledge.characters,sophie:unique(s.knowledge.characters.sophie,id+':asked')}}}
    s=line(s,id+'-SOPHIE','sophie',choice.reply,now+600)
    if(p.phase==='request')return put(s,{draft:undefined,request:choice.id,phase:'inspect'})
    const updated=s.chapter1!.starredNumberV2!,followup=starredFollowups.some(x=>x.id===choice.id)
    if(!followup){
      const effect=starredQuestions.find(x=>x.id===choice.id)!
      const rel=s.relationships.sophie
      s={...s,relationships:{...s.relationships,sophie:{...rel,trust:rel.trust+effect.trust,affinity:rel.affinity+effect.affinity,suspicion:rel.suspicion+effect.suspicion}}}
    }
    return put(s,{draft:undefined,mainChoice:followup?updated.mainChoice:choice.id,followups:followup?unique(updated.followups,choice.id):updated.followups,phase:'questions'})
  }
  if(a.type==='inspect'&&p.phase==='inspect'){
    const inspected=unique(p.inspected,a.field)
    s=put(s,{inspected,phase:inspected.length===4?'questions':'inspect',feedback:undefined})
    if(inspected.includes('number')&&inspected.includes('star')&&!s.evidence['EV-S07V2-CONTACT-ENTRY'])s={...s,evidence:{...s.evidence,'EV-S07V2-CONTACT-ENTRY':{id:'EV-S07V2-CONTACT-ENTRY',source:'Sophie-supplied saved export; unnamed player number and star observed; origin and author unverified',collectedAt:now,verified:false}}}
    return s
  }
  if(a.type==='group-send'&&p.phase==='questions'&&p.mainChoice&&!p.groupSent&&p.draft==='group'){
    const members=s.prologue?.scene01?.groupMembers,recipients=(['sophie','maya'] as const).filter(x=>members?.[x]===true)
    if(!recipients.includes('maya'))return s
    const id='CH1-S07V2-GROUP-SENT',text='The saved export shows my number without a name and with a star. We still do not know who marked it.'
    s=line(s,id+'-PLAYER','player',text,now)
    s=line(s,id+'-MAYA','maya',"Then let's keep the mark separate from whoever made it.",now+700)
    const characters={...s.knowledge.characters}
    for(const recipient of recipients)characters[recipient]=unique(characters[recipient],id+':claim')
    return put({...s,knowledge:{...s.knowledge,characters},deliveredEvents:unique(s.deliveredEvents,id)},{draft:undefined,groupSent:true,receipts:[...s.chapter1!.starredNumberV2!.receipts,...recipients.map(recipient=>({eventId:id,recipient,factIds:[id+':claim']}))]})
  }
  if(a.type==='conclude'&&p.phase==='questions'&&p.mainChoice)return put(s,{phase:'conclusion'})
  if(a.type==='conclude'&&p.phase==='conclusion'&&p.draft){
    const conclusion=starredConclusions.find(x=>x.id===p.draft)
    if(!conclusion)return s
    const id='EV-S07V2-PRIVATE-CONCLUSION'
    s={...s,deliveredEvents:unique(s.deliveredEvents,id),evidence:{...s.evidence,[id]:{id,source:'PLAYER_PRIVATE / '+conclusion.text,collectedAt:now,verified:false}}}
    return put(s,{phase:'complete',complete:true,conclusion:conclusion.id,draft:undefined,feedback:'The Last Check-In is your next lead.'})
  }
  return s
}
export function validateStarredNumberV2(value:unknown):void {
  if(value===undefined)return
  const p=value as StarredNumberV2State
  if(!p||p.version!==1||p.sceneId!==starredNumberV2Id||typeof p.visible!=='boolean'||!['opening','request','inspect','questions','conclusion','complete'].includes(p.phase)||!Array.isArray(p.lines)||p.lines.some(x=>!x||typeof x.id!=='string'||!['sophie','player','maya'].includes(x.sender)||typeof x.text!=='string'||!Number.isFinite(x.at))||!Array.isArray(p.inspected)||p.inspected.some(x=>!['label','number','star','limits'].includes(x))||!Array.isArray(p.followups)||typeof p.groupSent!=='boolean'||typeof p.complete!=='boolean'||p.complete!==(p.phase==='complete')||!Array.isArray(p.receipts))throw Error('Invalid starred-number scene')
}
