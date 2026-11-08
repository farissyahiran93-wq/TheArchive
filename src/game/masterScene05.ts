import { masterFragments, masterScene05Beats, traceFirstScene05Beats } from '../content/masterScene05'
import type { GameSave } from './types'
import { npcDeliveryDelay } from './npcDelivery'
import { createMasterCaseFile } from './masterCaseFile'

export interface MasterScene05 {
  version: 1; revision?:'trace-first'; beat: number; draft?: number; messages: {id:string; sender:'unknown'|'player'; text:string; at:number}[]; pending?:{id:string;text:string;dueAt:number}; archiveStatus?:'offered'|'deferred'|'declined'|'accepted'; archiveInspected?:boolean; archiveRisks?:boolean
  packageStatus:'conversation'|'offered'|'deferred'|'declined'|'installed'; inspected:boolean; risksRead:boolean
  opened:boolean; selected:boolean; recovered:boolean; read:string[]; saved:string[]; complete:boolean; traceView?:string; traceReturn?:'messages'|'notes'|'timeline'|'summary'|'board'
}
export type MasterScene05Action = {type:'start'|'send'|'tick'|'inspect'|'risks'|'install'|'defer'|'decline'|'reconsider'|'open-trace'|'select'|'recover'|'archive-inspect'|'archive-risks'|'archive-accept'|'archive-defer'|'archive-decline'|'archive-reconsider'} | {type:'draft';index:number} | {type:'read'|'save'|'view';id:string}
const ids=masterFragments.map(f=>f.id as string)
const sourceViews=['messages','notes','timeline','summary','board'] as const
const traceViews=['home','activity','case-files','media',...sourceViews,...ids]
const readyToDiscuss=(p:MasterScene05)=>p.recovered&&p.saved.length>0&&(p.revision==='trace-first'||ids.every(id=>p.read.includes(id)))
export const canReplyInMasterScene05=(p:MasterScene05)=>!p.complete&&!p.pending&&(p.revision!=='trace-first'||p.archiveStatus==='accepted')&&(p.beat<8&&p.packageStatus==='conversation'||p.beat>=8&&p.beat<10&&readyToDiscuss(p))
export function masterScene05Beat(p:MasterScene05) {
  const beat=(p.revision==='trace-first'?traceFirstScene05Beats:masterScene05Beats)[p.beat]
  if(!beat||p.revision!=='trace-first')return beat
  if(p.beat===7)return {...beat,replies:beat.replies.map(reply=>`${reply} Case Files is there if you want to keep track of what Sophie told you and what still needs checking.`)}
  if(p.beat===8&&!p.read.some(id=>id==='TA-PH-MESSAGE-JUNE-01'||id==='TA-PH-NOTE-RECORDS-01'))return {choices:['What can one incomplete fragment tell us?',beat.choices[1],beat.choices[2]],replies:['It gives us a starting point. Keep what you could read separate from the context that is still missing.',beat.replies[1],beat.replies[2]]}
  if(p.beat===9&&p.read.length<4)return {...beat,choices:['I saved a fragment with its context still missing.',beat.choices[1],beat.choices[2]]}
  return beat
}
export const masterRecoveryUnits=(p:MasterScene05)=>p.recovered?masterFragments.reduce((n,f)=>n+f.units,0):0
export function masterScene05Action(s:GameSave,a:MasterScene05Action,now=Date.now()):GameSave {
  let p=s.masterScene05
  if(a.type==='start') {
    if(p||!s.masterScene04?.complete||s.masterScene04.status!=='accepted'||!s.masterScene04.inspected)return s
    const revised=s.masterScene04.revision==='trace-first'
    return {...s,masterScene05:{version:1,...(revised?{revision:'trace-first' as const,archiveStatus:'offered' as const,archiveInspected:false,archiveRisks:false}:{}),beat:0,messages:revised?[{id:'TA-S05-INTRO-1',sender:'unknown',text:"You asked to continue. Here is an encrypted archive I believe contains Daniel's phone data. Its origin and contents have not been verified.",at:now}]:[{id:'TA-S05-INTRO-1',sender:'unknown',text:'You have the archive now.',at:now},{id:'TA-S05-INTRO-2',sender:'unknown',text:"It's still encrypted. Having the file doesn't make its contents readable.",at:now}],packageStatus:'conversation',inspected:false,risksRead:false,opened:false,selected:false,recovered:false,read:[],saved:[],complete:false}}
  }
  if(!p)return s
  const put=(next:MasterScene05):GameSave=>({...s,masterScene05:next})
  if(a.type==='tick'&&p.pending&&p.pending.dueAt<=now){const pending=p.pending,closing='There may be activity records in another protected segment. If they become available, they might help you compare the times. A log will not tell you by itself who was holding the phone. For now, keep the archive and what you found separate.',finished=p.beat===10&&pending.id==='TA-S05-CLOSING';return {...s,deliveredEvents:[...new Set([...s.deliveredEvents,pending.id,...(finished?['TA-S05-FINDINGS-SENT','TA-S05-COMPLETE','TA-S05-SCENE06-UNLOCKED']:[])])],masterScene05:{...p,pending:p.beat===10&&!finished?{id:'TA-S05-CLOSING',text:closing,dueAt:now+Math.min(7000,npcDeliveryDelay('eli',closing,10))}:undefined,messages:[...p.messages,{id:pending.id,sender:'unknown',text:pending.text,at:now}],packageStatus:p.beat===8?'offered':p.packageStatus,complete:finished}}}
  if(p.revision==='trace-first'){
   if(a.type==='archive-inspect'&&p.archiveStatus!=='accepted')return put({...p,archiveInspected:true})
   if(a.type==='archive-risks'&&p.archiveInspected&&p.archiveStatus!=='accepted')return put({...p,archiveRisks:true})
   if(a.type==='archive-accept'&&p.archiveStatus==='offered'&&p.archiveInspected&&p.archiveRisks)return {...s,deliveredEvents:[...new Set([...s.deliveredEvents,'TA-S05-ARCHIVE-ACCEPTED'])],masterScene05:{...p,archiveStatus:'accepted'}}
   if((a.type==='archive-defer'||a.type==='archive-decline')&&p.archiveStatus==='offered')return put({...p,archiveStatus:a.type==='archive-defer'?'deferred':'declined'})
   if(a.type==='archive-reconsider'&&['deferred','declined'].includes(p.archiveStatus??''))return put({...p,archiveStatus:'offered'})
  }
  if(a.type==='draft'&&canReplyInMasterScene05(p)&&Number.isInteger(a.index)&&a.index>=0&&a.index<3)return put({...p,draft:a.index})
  if(a.type==='send'&&p.draft!==undefined&&canReplyInMasterScene05(p)){
    const n=p.beat,choice=p.draft,beat=masterScene05Beat(p)
    if(p.revision==='trace-first')return put({...p,beat:n+1,draft:undefined,messages:[...p.messages,{id:`TA-S05-C${n+1}-P-${choice}`,sender:'player',text:beat.choices[choice],at:now}],pending:{id:`TA-S05-C${n+1}-U-${choice}`,text:beat.replies[choice],dueAt:now+Math.min(7000,npcDeliveryDelay('eli',beat.replies[choice],n))}})
    const messages=[...p.messages,{id:`TA-S05-C${n+1}-P-${choice}`,sender:'player' as const,text:beat.choices[choice],at:now},{id:`TA-S05-C${n+1}-U-${choice}`,sender:'unknown' as const,text:beat.replies[choice],at:now}]
    if(n===9)messages.push({id:'TA-S05-CLOSING',sender:'unknown',text:'There may be activity records in another protected segment. If they become available, they might help you compare the times. A log will not tell you by itself who was holding the phone. For now, keep the archive and what you found separate.',at:now})
    const complete=n===9
    return {...s,deliveredEvents:complete?[...new Set([...s.deliveredEvents,'TA-S05-FINDINGS-SENT','TA-S05-COMPLETE','TA-S05-SCENE06-UNLOCKED'])]:s.deliveredEvents,masterScene05:{...p,beat:n+1,draft:undefined,messages,packageStatus:n===7?'offered':p.packageStatus,complete}}
  }
  if(a.type==='inspect'&&['offered','deferred','declined'].includes(p.packageStatus))return put({...p,inspected:true})
  if(a.type==='risks'&&p.inspected&&['offered','deferred','declined'].includes(p.packageStatus))return put({...p,risksRead:true})
  if((a.type==='defer'||a.type==='decline')&&p.packageStatus==='offered')return put({...p,packageStatus:a.type==='defer'?'deferred':'declined'})
  if(a.type==='reconsider'&&['deferred','declined'].includes(p.packageStatus))return put({...p,packageStatus:'offered'})
  if(a.type==='install'&&p.packageStatus==='offered'&&p.inspected&&p.risksRead)return {...put({...p,packageStatus:'installed'}),masterCaseFile:s.masterCaseFile??createMasterCaseFile()}
  if(a.type==='open-trace'&&p.packageStatus==='installed'&&(!p.opened||!s.masterCaseFile))return {...put({...p,opened:true}),masterCaseFile:s.masterCaseFile??createMasterCaseFile()}
  if(a.type==='view'&&p.packageStatus==='installed'&&traceViews.includes(a.id)&&(!ids.includes(a.id)||p.recovered)&&(a.id!=='timeline'||!!s.masterScene06?.recovered)){const from=sourceViews.find(view=>view===p.traceView);return put({...p,traceView:a.id,...(ids.includes(a.id)&&from?{traceReturn:from}:{})})}
  if(a.type==='select'&&p.opened)return put({...p,selected:true})
  if(a.type==='recover'&&p.opened&&p.selected&&!p.recovered)return put({...p,recovered:true})
  if(a.type==='read'&&p.recovered&&ids.includes(a.id)&&!p.read.includes(a.id))return put({...p,read:[...p.read,a.id]})
  if(a.type==='save'&&p.read.includes(a.id)&&!p.saved.includes(a.id))return {...s,evidence:{...s.evidence,[a.id]:{id:a.id,source:`${a.id} · partial, source unverified`,collectedAt:now,verified:false}},masterScene05:{...p,saved:[...p.saved,a.id]}}
  return s
}
export function validateMasterScene05(value:unknown):void {
  if(value===undefined)return
  const p=value as MasterScene05
  if(!p||p.version!==1||p.traceReturn!==undefined&&!sourceViews.includes(p.traceReturn)||p.traceView!==undefined&&(!traceViews.includes(p.traceView)||ids.includes(p.traceView)&&!p.recovered)||p.revision!==undefined&&p.revision!=='trace-first'||p.pending!==undefined&&(!p.pending||typeof p.pending.id!=='string'||typeof p.pending.text!=='string'||!Number.isFinite(p.pending.dueAt))||p.revision==='trace-first'&&(!['offered','deferred','declined','accepted'].includes(p.archiveStatus??'')||typeof p.archiveInspected!=='boolean'||typeof p.archiveRisks!=='boolean'||p.archiveStatus==='accepted'&&(!p.archiveInspected||!p.archiveRisks))||!Number.isInteger(p.beat)||p.beat<0||p.beat>10||!Array.isArray(p.messages)||!Array.isArray(p.read)||!Array.isArray(p.saved)||p.read.some(id=>!ids.includes(id))||p.saved.some(id=>!p.read.includes(id))||!['conversation','offered','deferred','declined','installed'].includes(p.packageStatus)||['inspected','risksRead','opened','selected','recovered','complete'].some(k=>typeof p[k as keyof MasterScene05]!=='boolean')||p.recovered&&(!p.selected||!p.opened||p.packageStatus!=='installed')||p.complete&&(p.beat!==10||!readyToDiscuss(p)))throw Error('Invalid Scene 5 progress')
}
