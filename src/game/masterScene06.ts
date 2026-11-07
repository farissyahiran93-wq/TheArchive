import { activityEvents, reportChoices, scene06Beats } from '../content/masterScene06'
import type { GameSave } from './types'

export interface MasterScene06 {
 version:1; beat:number; draft?:number; messages:{id:string;sender:'unknown'|'player';text:string;at:number}[];
 recovered:boolean; inspected:string[]; order:string[]; uncertainty:boolean; syncAcknowledged:boolean; gapAcknowledged:boolean; saved:boolean; reportDraft?:number; reportReviewed:boolean; reportSent:boolean; complete:boolean
}
export type MasterScene06Action = {type:'start'|'send'|'recover'|'uncertainty'|'sync'|'gap'|'save'|'review-report'|'send-report'} | {type:'draft'|'report-draft';index:number} | {type:'inspect'|'add';id:string} | {type:'move';id:string;direction:-1|1}
const ids=activityEvents.map(e=>e.id as string)
export const timelineReady=(p:MasterScene06)=>p.recovered&&ids.every(id=>p.inspected.includes(id))&&p.order.length===ids.length&&p.order.every((id,i)=>id===ids[i])&&p.uncertainty&&p.syncAcknowledged&&p.gapAcknowledged
export const scene06Units=(p:MasterScene06|undefined)=>p?.recovered?activityEvents.reduce((n,e)=>n+e.units,0):0
export function masterScene06Action(s:GameSave,a:MasterScene06Action,now=Date.now()):GameSave {
 let p=s.masterScene06
 if(a.type==='start'){
  const five=s.masterScene05
  if(p||!five?.complete||five.packageStatus!=='installed'||!five.recovered||!s.masterScene04?.complete||!s.deliveredEvents.includes('TA-S05-FINDINGS-SENT'))return s
  return {...s,masterScene06:{version:1,beat:0,messages:[{id:'TA-S06-INTRO',sender:'unknown',text:'The messages are only part of it. There may be activity records in another segment. If we can recover them, we can try to put the device events in order.',at:now}],recovered:false,inspected:[],order:[],uncertainty:false,syncAcknowledged:false,gapAcknowledged:false,saved:false,reportReviewed:false,reportSent:false,complete:false}}
 }
 if(!p)return s
 const put=(v:MasterScene06):GameSave=>({...s,masterScene06:v})
 if(a.type==='draft'&&!p.complete&&(p.beat<8||p.beat>=8&&p.beat<10&&p.reportSent)&&Number.isInteger(a.index)&&a.index>=0&&a.index<3)return put({...p,draft:a.index})
 if(a.type==='send'&&p.draft!==undefined&&!p.complete&&(p.beat<8||p.beat>=8&&p.beat<10&&p.reportSent)){
  const n=p.beat,i=p.draft,b=scene06Beats[n],complete=n===9
  const messages=[...p.messages,{id:`TA-S06-C${n+1}-P-${i}`,sender:'player' as const,text:b.choices[i],at:now},{id:`TA-S06-C${n+1}-U-${i}`,sender:'unknown' as const,text:b.replies[i],at:now}]
  if(complete)messages.push({id:'TA-S06-CLOSE',sender:'unknown',text:'The export is its own source. Ask her about it when you are ready; I will not send your timeline to her.',at:now})
  const scene=s.prologue?.scene01, sophieText="I went back to the contact export. I keep wondering why that number was starred. I still don't know who marked it."
  if(complete&&scene&&!s.deliveredEvents.includes('TA-S06-SOPHIE-EXPORT'))s={...s,prologue:{...s.prologue!,scene01:{...scene,messages:[...scene.messages,{id:'TA-S06-SOPHIE-EXPORT',sender:'sophie',text:sophieText,at:now}]}},messages:[...s.messages,{id:'TA-S06-SOPHIE-EXPORT',sender:'sophie',channel:'messages',text:sophieText,at:now,delivery:'delivered'}],notifications:[...s.notifications,{id:'TA-S06-SOPHIE-EXPORT',text:sophieText,read:false}],deliveredEvents:[...s.deliveredEvents,'TA-S06-SOPHIE-EXPORT']}
  return {...s,deliveredEvents:complete?[...new Set([...s.deliveredEvents,'TA-S06-COMPLETE','TA-S06-SCENE07-UNLOCKED'])]:s.deliveredEvents,masterScene06:{...p,beat:n+1,draft:undefined,messages,complete}}
 }
 if(a.type==='recover'&&p.beat===8&&!p.recovered)return put({...p,recovered:true})
 if(a.type==='inspect'&&p.recovered&&ids.includes(a.id)&&!p.inspected.includes(a.id))return put({...p,inspected:[...p.inspected,a.id]})
 if(a.type==='add'&&p.inspected.includes(a.id)&&!p.order.includes(a.id))return put({...p,order:[...p.order,a.id]})
 if(a.type==='move'&&!p.saved&&p.order.includes(a.id)){const order=[...p.order],i=order.indexOf(a.id),j=i+a.direction;if(j<0||j>=order.length)return s;[order[i],order[j]]=[order[j],order[i]];return put({...p,order})}
 if(a.type==='uncertainty'&&p.inspected.includes(ids[3]))return put({...p,uncertainty:true})
 if(a.type==='sync'&&p.inspected.includes(ids[3]))return put({...p,syncAcknowledged:true})
 if(a.type==='gap'&&p.inspected.includes(ids[2])&&p.inspected.includes(ids[3]))return put({...p,gapAcknowledged:true})
 if(a.type==='save'&&!p.saved&&timelineReady(p))return {...s,evidence:{...s.evidence,'TA-FN-MISSING-HOUR':{id:'TA-FN-MISSING-HOUR',source:`${ids.join(', ')}; device clock unverified; no person or location established`,collectedAt:now,verified:false}},masterScene06:{...p,saved:true}}
 if(a.type==='report-draft'&&p.saved&&!p.reportSent&&Number.isInteger(a.index)&&a.index>=0&&a.index<3)return put({...p,reportDraft:a.index,reportReviewed:false})
 if(a.type==='review-report'&&p.saved&&p.reportDraft!==undefined&&!p.reportSent)return put({...p,reportReviewed:true})
 if(a.type==='send-report'&&p.saved&&p.reportReviewed&&p.reportDraft!==undefined&&!p.reportSent){const i=p.reportDraft;return {...s,deliveredEvents:[...new Set([...s.deliveredEvents,'TA-S06-REPORT-SENT'])],masterScene06:{...p,reportSent:true,messages:[...p.messages,{id:`TA-S06-REPORT-P-${i}`,sender:'player',text:reportChoices[i],at:now},{id:'TA-S06-REPORT-U',sender:'unknown',text:'Thank you. A gap in this copy cannot tell us what happened during it. Keep the device times and their limitations together.',at:now}]}}}
 return s
}
export function validateMasterScene06(value:unknown):void {
 if(value===undefined)return
 const p=value as MasterScene06
 if(!p||p.version!==1||!Number.isInteger(p.beat)||p.beat<0||p.beat>10||!Array.isArray(p.messages)||!Array.isArray(p.inspected)||!Array.isArray(p.order)||p.inspected.some(id=>!ids.includes(id))||p.order.some(id=>!p.inspected.includes(id))||new Set(p.order).size!==p.order.length||['recovered','uncertainty','syncAcknowledged','gapAcknowledged','saved','reportReviewed','reportSent','complete'].some(k=>typeof p[k as keyof MasterScene06]!=='boolean')||p.saved&&!timelineReady(p)||p.reportSent&&!p.saved||p.complete&&(!p.reportSent||p.beat!==10))throw Error('Invalid Scene 6 progress')
}
