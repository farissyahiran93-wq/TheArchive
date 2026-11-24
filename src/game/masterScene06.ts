import { activityEvents, missingHourSources, partialSyncReceipt, reconstructionReportBeat, scene06Beats, missingHourConversation } from '../content/masterScene06'
import { scene06V3 } from '../content/masterScene06V3'
import { masterFragments } from '../content/masterScene05'
import type { GameSave } from './types'
import { npcDeliveryDelay } from './npcDelivery'

export interface MasterScene06 {
 version:1; revision?:'investigation'; beat:number; draft?:number; messages:{id:string;sender:'unknown'|'player';text:string;at:number}[];
 pending?:{id:string;text:string;dueAt:number;remaining?:string[];after?:'topic'|'bridge'|'complete'};
 scriptVersion?:'ch1-s5-s6-v3'; activeTopic?:'maya'|'sophie'|'lucas'|'june'|'gap'; completedTopics?:('maya'|'sophie'|'lucas'|'june')[]; missingHourAvailable?:boolean;
 timelineRevision?:'reconstruction'; comparison?:[string,string]; gapCompared?:boolean;
 firstPass20?:boolean;
 timelineFlags?:string[]; timelineHypothesis?:{text:string;sources:[string,string]};
 recovered:boolean; inspected:string[]; order:string[]; uncertainty:boolean; syncAcknowledged:boolean; gapAcknowledged:boolean; saved:boolean; reportDraft?:number; reportReviewed:boolean; reportSent:boolean; complete:boolean
}
export type MasterScene06Action = {type:'start'|'tick'|'send'|'recover'|'document-gap'|'inspect-gap'} | {type:'topic';topic:'maya'|'sophie'|'lucas'|'june'} | {type:'draft';index:number} | {type:'inspect'|'add'|'flag-time';id:string} | {type:'move';id:string;direction:-1|1} | {type:'reorder';id:string;target:string} | {type:'compare-times';left:string;right:string} | {type:'timeline-hypothesis';text:string}
const ids=activityEvents.map(e=>e.id as string)
const fragmentIds=masterFragments.map(f=>f.id as string)
const isGapPair=(pair:readonly string[])=>missingHourSources.every(id=>pair.includes(id))
const hasLocalSource=(p:MasterScene06,id:string)=>p.inspected.includes(id)||id===partialSyncReceipt.id&&p.inspected.includes(missingHourSources[1])
const isValidTimePair=(p:MasterScene06,pair:[string,string])=>pair[0]!==pair[1]&&p.inspected.includes(pair[0])&&(hasLocalSource(p,pair[1])||fragmentIds.includes(pair[1]))
export function compareTimelineRecords(left:string,right:string): string {
 if(isGapPair([left,right]))return 'No readable activity falls between the recorded file access and automatic sync. The device clock and the cause of the gap remain unverified.'
 if(right===partialSyncReceipt.id)return 'The receipt uses UTC and the log uses device time. The device offset is unknown, so this comparison cannot establish a delay or a contradiction.'
 if(fragmentIds.includes(right))return 'The recovered fragment has no usable timestamp. It cannot corroborate or contradict when this device event was recorded.'
 return 'Both entries use reported device time. That supports ordering the entries within this copy, but the clock and the person using the device remain unverified.'
}
export const scene06Units=(p:MasterScene06|undefined)=>p?.recovered&&!p.firstPass20?activityEvents.reduce((n,e)=>n+e.units,0):0
const hasGapBounds=(p:MasterScene06)=>p.recovered&&missingHourSources.every(id=>p.inspected.includes(id))
export function canDocumentMissingHour(p:MasterScene06):boolean {
 const first=p.order.indexOf(missingHourSources[0])
 return !p.saved&&hasGapBounds(p)&&first>=0&&p.order[first+1]===missingHourSources[1]
}
export const canReplyInMasterScene06=(p:MasterScene06)=>p.scriptVersion==='ch1-s5-s6-v3'?!!p.activeTopic&&!p.pending&&!p.complete:!p.pending&&!p.complete&&(p.beat<8||p.beat<10&&p.saved)
export const canRecoverActivity=(p:MasterScene06)=>!p.pending&&!p.recovered&&p.beat<=8
export const masterScene06Beat=(p:MasterScene06)=>p.scriptVersion==='ch1-s5-s6-v3'?{choices:(scene06V3[p.beat]??scene06V3[9]).choices,replies:(scene06V3[p.beat]??scene06V3[9]).branches.map(lines=>lines.join(' '))}:p.firstPass20?missingHourConversation[p.beat]:p.beat===8&&!p.reportSent?reconstructionReportBeat:scene06Beats[p.beat]
const closing='The export is its own source. Ask her about it when you are ready; I will not send your timeline to her.'
const naturalClosing='Ask Sophie when you are ready. I will keep your timeline private.'
const queueReply=(id:string,text:string,now:number,beat:number)=>({id,text,dueAt:now+Math.min(7000,npcDeliveryDelay('eli',text,beat))})

function recordMissingHour(s:GameSave,p:MasterScene06,now:number):GameSave {
 if(p.saved)return {...s,masterScene06:p}
 const id='TA-FN-MISSING-HOUR'
 const finding={id,source:`${missingHourSources.join(', ')}; device clock unverified; no person or location established`,collectedAt:now,verified:false}
 return {...s,evidence:{...s.evidence,[id]:s.evidence[id]??finding},masterScene06:{...p,saved:true,gapCompared:true}}
}

function completeScene(s:GameSave,p:MasterScene06,now:number):GameSave {
 const scene=s.prologue?.scene01, sophieText='Hey.'
 if(scene&&!s.deliveredEvents.includes('TA-S06-SOPHIE-EXPORT'))s={...s,prologue:{...s.prologue!,scene01:{...scene,messages:[...scene.messages,{id:'TA-S06-SOPHIE-EXPORT',sender:'sophie',text:sophieText,at:now}]}},messages:[...s.messages,{id:'TA-S06-SOPHIE-EXPORT',sender:'sophie',channel:'messages',text:sophieText,at:now,delivery:'delivered'}],notifications:[...s.notifications,{id:'TA-S06-SOPHIE-EXPORT',text:sophieText,read:false}],deliveredEvents:[...s.deliveredEvents,'TA-S06-SOPHIE-EXPORT']}
 return {...s,deliveredEvents:[...new Set([...s.deliveredEvents,'TA-S06-COMPLETE','TA-S06-SCENE07-UNLOCKED'])],masterScene06:{...p,complete:true}}
}
export function masterScene06Action(s:GameSave,a:MasterScene06Action,now=Date.now()):GameSave {
 const p=s.masterScene06
 if(a.type==='start'){
  const five=s.masterScene05
  if(p||!five?.complete||five.packageStatus!=='installed'||!five.recovered||!s.masterScene04?.complete||!s.deliveredEvents.includes('TA-S05-FINDINGS-SENT'))return s
  const revised=five.revision==='trace-first'
  if(five.conversationRevision==='archive-v3'){const lines=['So. You found something.',"I know twenty percent doesn't sound like much.","But if even a few of Daniel's conversations survived, we might have somewhere to start.",'What caught your attention?'];return {...s,masterScene06:{version:1,revision:'investigation',scriptVersion:'ch1-s5-s6-v3',firstPass20:true,beat:0,messages:[],pending:{id:'TA-S06-V3-INTRO',text:lines[0],dueAt:now+1200,remaining:lines.slice(1)},completedTopics:[],recovered:true,inspected:[],order:[],uncertainty:false,syncAcknowledged:false,gapAcknowledged:false,saved:false,reportReviewed:false,reportSent:false,complete:false}}}
  const firstPass20=!!five.discussion
  const intro=firstPass20?'There are activity records in what you recovered. Take a look at the times. See if anything stands out.':five.examination==='evidence'
   ?'There may be activity records in another segment. Compare the device times with what you could recover. What can you point to in the records, and what is still missing?'
   :'There may be activity records in another segment. If you recover them, compare their device times with the Messages and Notes fragments. Some records may be too incomplete to match.'
  return {...s,masterScene06:{version:1,...(firstPass20?{firstPass20:true}:{}),...(revised?{revision:'investigation' as const,pending:queueReply('TA-S06-INTRO',intro,now,0)}:{}),...(revised&&five.examination==='evidence'?{timelineRevision:'reconstruction' as const}:{}),beat:0,messages:revised?[]:[{id:'TA-S06-INTRO',sender:'unknown',text:'The messages are only part of it. There may be activity records in another segment. If we can recover them, we can try to put the device events in order.',at:now}],recovered:firstPass20,inspected:[],order:[],uncertainty:false,syncAcknowledged:false,gapAcknowledged:false,saved:false,reportReviewed:false,reportSent:false,complete:false}}
 }
 if(!p)return s
 const put=(v:MasterScene06):GameSave=>({...s,masterScene06:v})
 if(p.scriptVersion==='ch1-s5-s6-v3'){
  if(a.type==='tick'&&p.pending&&p.pending.dueAt<=now){
   const pending=p.pending,[text,...remaining]=pending.remaining??[]
   const messages=[...p.messages,{id:pending.id,sender:'unknown' as const,text:pending.text,at:now}]
   if(text)return put({...p,messages,pending:{id:`${pending.id}-next`,text,dueAt:now+Math.min(5000,npcDeliveryDelay('eli',text,p.beat)),remaining,after:pending.after}})
   if(pending.after==='complete'){const next=recordMissingHour(s,{...p,messages,pending:undefined},now);return completeScene(next,next.masterScene06!,now)}
   if(pending.after==='topic'&&p.activeTopic&&p.activeTopic!=='gap'){
    const completedTopics=[...new Set([...(p.completedTopics??[]),p.activeTopic])]
    const evidenceId={maya:'TA-PH-CHAT-MAYA',sophie:'TA-PH-CHAT-SOPHIE',lucas:'TA-PH-CHAT-LUCAS',june:'TA-PH-NOTE-RECORDS-01'}[p.activeTopic]
    if(s.masterScene05&&!s.masterScene05.read.includes(evidenceId))s={...s,masterScene05:{...s.masterScene05,read:[...s.masterScene05.read,evidenceId]}}
    if(completedTopics.length===4){const lines=["We've gone through quite a lot.","Something still doesn't feel right.","Is there anything else that doesn't add up?",'All right.','Let me know what you find.'];return {...s,masterScene06:{...p,messages,activeTopic:undefined,completedTopics,pending:{id:'TA-S06-V3-BRIDGE',text:lines[0],dueAt:now+1200,remaining:lines.slice(1),after:'bridge'}}}}
    return {...s,masterScene06:{...p,messages,activeTopic:undefined,completedTopics,pending:undefined}}
   }
   return put({...p,messages,pending:undefined,...(pending.after==='bridge'?{missingHourAvailable:true}:{})})
  }
  if(a.type==='topic'&&!p.pending&&!p.activeTopic&&!p.complete&&!p.completedTopics?.includes(a.topic)){
   const index={maya:0,sophie:2,lucas:4,june:6}[a.topic]
   return put({...p,activeTopic:a.topic,beat:index,draft:undefined})
  }
  if(a.type==='draft'&&canReplyInMasterScene06(p)&&Number.isInteger(a.index)&&a.index>=0&&a.index<3)return put({...p,draft:a.index})
  if(a.type==='send'&&p.draft!==undefined&&canReplyInMasterScene06(p)){
   const n=p.beat,choice=p.draft,beat=scene06V3[n],lines=[...beat.branches[choice],...beat.follow]
   const [text,...remaining]=lines,after=n===9?'complete':n%2===1?'topic':undefined
   return put({...p,beat:n+1,draft:undefined,messages:[...p.messages,{id:`TA-S06-V3-D${n+1}-P-${choice}`,sender:'player',text:beat.choices[choice],at:now}],pending:{id:`TA-S06-V3-D${n+1}-U-${choice}`,text,dueAt:now+Math.min(5000,npcDeliveryDelay('eli',text,n)),remaining,after}})
  }
  if(a.type==='inspect-gap'&&p.missingHourAvailable&&!p.pending&&!p.activeTopic&&p.draft===undefined&&!p.complete){
   const inspected=[...new Set([...p.inspected,...missingHourSources])]
   return put({...p,inspected,comparison:[...missingHourSources],activeTopic:'gap',beat:8})
  }
  if(a.type==='inspect'&&p.recovered&&ids.includes(a.id)&&!p.inspected.includes(a.id))return put({...p,inspected:[...p.inspected,a.id]})
  return s
 }
 if(a.type==='tick'&&p.pending&&p.pending.dueAt<=now){
  const pending=p.pending
  const messages=[...p.messages,{id:pending.id,sender:'unknown' as const,text:pending.text,at:now}]
  const next={...p,messages,pending:p.beat===10&&pending.id!=='TA-S06-CLOSE'?queueReply('TA-S06-CLOSE',p.firstPass20?naturalClosing:closing,now,10):undefined}
  return pending.id==='TA-S06-CLOSE'?completeScene(s,next,now):put(next)
 }
 if(a.type==='draft'&&canReplyInMasterScene06(p)&&Number.isInteger(a.index)&&a.index>=0&&a.index<3)return put({...p,draft:a.index})
 if(a.type==='send'&&p.draft!==undefined&&canReplyInMasterScene06(p)){
  const n=p.beat,i=p.draft,b=masterScene06Beat(p),complete=n===9
  const messages=[...p.messages,{id:`TA-S06-C${n+1}-P-${i}`,sender:'player' as const,text:b.choices[i],at:now}]
  const replyId=`TA-S06-C${n+1}-U-${i}`
  if(p.revision==='investigation')return put({...p,beat:n+1,draft:undefined,messages,pending:queueReply(replyId,b.replies[i],now,n)})
  messages.push({id:replyId,sender:'unknown',text:b.replies[i],at:now})
  if(complete)messages.push({id:'TA-S06-CLOSE',sender:'unknown',text:closing,at:now})
  const next={...p,beat:n+1,draft:undefined,messages}
  return complete?completeScene(s,next,now):put(next)
 }
 if(a.type==='recover'&&canRecoverActivity(p))return put({...p,recovered:true,beat:8,draft:undefined})
 if(a.type==='inspect'&&p.recovered&&ids.includes(a.id)&&!p.inspected.includes(a.id))return put({...p,inspected:[...p.inspected,a.id]})
 if(a.type==='add'&&p.inspected.includes(a.id)&&!p.order.includes(a.id))return put({...p,order:[...p.order,a.id]})
 if(a.type==='move'&&p.order.includes(a.id)){const order=[...p.order],i=order.indexOf(a.id),j=i+a.direction;if(j<0||j>=order.length)return s;[order[i],order[j]]=[order[j],order[i]];return put({...p,order})}
 if(a.type==='reorder'&&a.id!==a.target&&p.order.includes(a.id)&&p.order.includes(a.target)){
  const order=p.order.filter(id=>id!==a.id)
  order.splice(p.order.indexOf(a.target),0,a.id)
  return put({...p,order})
 }
 if(a.type==='compare-times'&&p.recovered){
  const pair:[string,string]=[a.left,a.right]
  if(!isValidTimePair(p,pair)||fragmentIds.includes(a.right)&&!s.masterScene05?.read.includes(a.right))return s
  const next={...p,comparison:pair}
  return isGapPair(pair)?recordMissingHour(s,next,now):put(next)
 }
 if(a.type==='inspect-gap'&&p.recovered){
  const inspected=[...new Set([...p.inspected,...missingHourSources])]
  return recordMissingHour(s,{...p,inspected,comparison:[...missingHourSources]},now)
 }
 if(a.type==='document-gap'&&canDocumentMissingHour(p))return recordMissingHour(s,{...p,comparison:[...missingHourSources]},now)
 if(a.type==='flag-time'&&p.inspected.includes(a.id)){
  const flags=p.timelineFlags??[]
  return put({...p,timelineFlags:flags.includes(a.id)?flags.filter(id=>id!==a.id):[...flags,a.id]})
 }
 if(a.type==='timeline-hypothesis'&&p.comparison&&a.text.length<=2000){
  const text=a.text.trim()
  return put({...p,timelineHypothesis:text?{text,sources:p.comparison}:undefined})
 }
 return s
}
export function validateMasterScene06(value:unknown):void {
 if(value===undefined)return
 const p=value as MasterScene06
 if(!p||p.version!==1||!Number.isInteger(p.beat)||p.beat<0||p.beat>10||!Array.isArray(p.messages)||!Array.isArray(p.inspected)||!Array.isArray(p.order)||p.inspected.some(id=>!ids.includes(id))||p.order.some(id=>!p.inspected.includes(id))||new Set(p.order).size!==p.order.length||['recovered','uncertainty','syncAcknowledged','gapAcknowledged','saved','reportReviewed','reportSent','complete'].some(k=>typeof p[k as keyof MasterScene06]!=='boolean')||p.revision!==undefined&&p.revision!=='investigation'||p.pending!==undefined&&(p.revision!=='investigation'||!p.pending||typeof p.pending.id!=='string'||typeof p.pending.text!=='string'||!Number.isFinite(p.pending.dueAt))||p.saved&&(!hasGapBounds(p)||p.timelineRevision==='reconstruction'&&!p.gapCompared)||p.reportSent&&!p.saved||p.complete&&(!p.saved||p.beat!==10||!!p.pending))throw Error('Invalid Scene 6 progress')
 if(p.timelineRevision!==undefined&&(p.revision!=='investigation'||p.timelineRevision!=='reconstruction'))throw Error('Invalid timeline reconstruction route')
 if(p.firstPass20!==undefined&&(typeof p.firstPass20!=='boolean'||p.firstPass20&&!p.recovered))throw Error('Invalid first-pass recovery')
 if(p.scriptVersion!==undefined&&(p.scriptVersion!=='ch1-s5-s6-v3'||!p.firstPass20||!Array.isArray(p.completedTopics)||p.completedTopics.some(id=>!['maya','sophie','lucas','june'].includes(id))||new Set(p.completedTopics).size!==p.completedTopics.length||p.activeTopic!==undefined&&!['maya','sophie','lucas','june','gap'].includes(p.activeTopic)||p.missingHourAvailable!==undefined&&typeof p.missingHourAvailable!=='boolean'||p.missingHourAvailable&&p.completedTopics.length!==4||p.activeTopic==='gap'&&!p.missingHourAvailable))throw Error('Invalid Scene 6 conversation')
 if(p.pending?.remaining!==undefined&&(!Array.isArray(p.pending.remaining)||p.pending.remaining.some(text=>typeof text!=='string')))throw Error('Invalid Scene 6 reply queue')

 const validComparison=(pair:[string,string])=>p.recovered&&Array.isArray(pair)&&pair.length===2&&isValidTimePair(p,pair)
 if(p.comparison!==undefined&&!validComparison(p.comparison))throw Error('Invalid timeline comparison')
 if(p.gapCompared!==undefined&&(typeof p.gapCompared!=='boolean'||p.gapCompared&&!missingHourSources.every(id=>p.inspected.includes(id))))throw Error('Invalid missing hour comparison')
 if(p.timelineFlags!==undefined&&(!Array.isArray(p.timelineFlags)||p.timelineFlags.some(id=>!p.inspected.includes(id))||new Set(p.timelineFlags).size!==p.timelineFlags.length))throw Error('Invalid timeline flags')
 const note=p.timelineHypothesis
 if(note!==undefined&&(!note||typeof note.text!=='string'||!note.text.trim()||note.text.length>2000||!validComparison(note.sources)))throw Error('Invalid timeline hypothesis')
}
