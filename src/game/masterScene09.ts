import { referenceCardId, scene09Beats } from '../content/masterScene09'
import { mayaCardOpening, mayaCard } from '../content/mayaConversationV3'
import { mayaConversationAction, queueMayaLines, validQueue, type PendingMayaLine, type MayaLine } from './mayaConversationV3'
import { disclosureAction, validDisclosure, type CardDisclosure, type DisclosureAction } from './cardDisclosure'
import type { GameSave } from './types'
import { cardAssessments } from '../content/masterSceneAssessments'

export interface MasterScene09 {
 version:1; conversationRevision?:'conversation-v3'; pending?:PendingMayaLine[]; disclosure?:CardDisclosure; beat:number; draft?:number; messages:MayaLine[]
 received:boolean; opened:boolean; inspected:string[]; imported:boolean; analysis:boolean; comparisons:string[]; hypothesis?:number; assessment?:typeof cardAssessments[number]['id']; reviewed:boolean; saved:boolean; complete:boolean
}
export type MasterScene09Action=DisclosureAction|{type:'start'}|{type:'send'|'open'|'tick'}|{type:'draft';index:number}|{type:'record-assessment';id:string}
export const cardFields=['heading','title','code','reference','unverified','appearance','metadata'] as const
const validChoice=(n:number)=>Number.isInteger(n)&&n>=0&&n<3
const comparisons=['contact','capture','timeline']
export const canReplyInScene09=(p:MasterScene09)=>!p.complete&&!p.pending?.length&&(p.conversationRevision==='conversation-v3'?p.beat<mayaCard.length:p.beat<10&&(p.beat<4||p.opened))
export function historicalCardBeat(p:MasterScene09){
 const beat=scene09Beats[p.beat]
 if(p.beat!==8||p.saved)return beat
 return {...beat,choices:['The photograph gives us somewhere to look.',beat.choices[1], "I still don't know whether the card and the copy are connected."]}
}
export function availableCardAssessments(save:GameSave){
 return cardAssessments.filter(item=>item.id==='card-capture'?!!save.masterScene08?.saved:!!save.masterScene07?.saved)
}
export function masterScene09Action(s:GameSave,a:MasterScene09Action,now=Date.now()):GameSave{
 let p=s.masterScene09
 if(a.type==='start'){
  if(p||!s.masterScene08?.complete||!s.deliveredEvents.includes('TA-S08-SCENE09-UNLOCKED'))return s
  return {...s,masterScene09:{version:1,conversationRevision:'conversation-v3',beat:0,messages:[],pending:queueMayaLines('TA-S09V3-FIRST',mayaCardOpening,now),received:false,opened:false,inspected:[],imported:false,analysis:false,comparisons:[],reviewed:false,saved:false,complete:false}}
 }
 if(!p)return s
 if(a.type==='recipient'||a.type==='select-clue'||a.type==='select-followup'||a.type==='send-disclosure'||a.type==='tick-disclosure')return disclosureAction(s,a,now)
 if(p.conversationRevision==='conversation-v3'){
  if(a.type==='record-assessment')return s
  if(a.type==='send'||a.type==='draft'||a.type==='open'||a.type==='tick')return mayaConversationAction(s,'masterScene09',a,now)
  return s
 }
 const put=(next:MasterScene09):GameSave=>({...s,masterScene09:next})
 const canReply=canReplyInScene09(p)
 if(a.type==='draft'&&canReply&&!p.complete&&validChoice(a.index))return put({...p,draft:a.index})
 if(a.type==='send'&&canReply&&!p.complete&&p.draft!==undefined){
  const n=p.beat,i=p.draft,b=historicalCardBeat(p),player=`TA-S09-C${n+1}-P-${i}`,maya=`TA-S09-C${n+1}-M-${i}`,complete=n===9
  const messages=[...p.messages,{id:player,sender:'player' as const,text:b.choices[i],at:now},{id:maya,sender:'maya' as const,text:b.replies[i],at:now}]
  return {...s,messages:[...s.messages,{id:player,sender:'player',recipient:'maya',channel:'messages',text:b.choices[i],at:now,delivery:'delivered'},{id:maya,sender:'maya',channel:'messages',text:b.replies[i],at:now,delivery:'delivered'}],deliveredEvents:[...new Set([...s.deliveredEvents,player,maya,...(n===3?['TA-S09-PHOTO-RECEIVED']:[]),...(complete?['TA-S09-PUBLIC-SEARCH-TARGET','TA-S09-COMPLETE','TA-S09-SCENE10-UNLOCKED']:[])])],masterScene09:{...p,beat:n+1,draft:undefined,messages,received:n===3||p.received,complete}}
 }
 if(a.type==='open'&&p.received)return put({...p,opened:true})
 if(a.type==='record-assessment'&&p.received&&p.opened&&p.beat>=8&&!p.saved){
  const assessment=availableCardAssessments(s).find(item=>item.id===a.id)
  if(!assessment)return s
  return {...s,evidence:{...s.evidence,[referenceCardId]:{id:referenceCardId,source:`Maya’s shared-folder photograph; provenance unverified. ${assessment.finding}`,collectedAt:now,verified:false}},masterScene09:{...p,assessment:assessment.id,comparisons:[...new Set([...p.comparisons,assessment.id==='card-capture'?'capture':'contact'])],saved:true}}
 }
 return s
}
export function validateMasterScene09(value:unknown):void{
 if(value===undefined)return
 const p=value as MasterScene09
 if(!p||p.version!==1||!Number.isInteger(p.beat)||p.beat<0||p.beat>10||!Array.isArray(p.messages)||!Array.isArray(p.inspected)||!Array.isArray(p.comparisons)||p.inspected.some(x=>!cardFields.includes(x as typeof cardFields[number]))||p.comparisons.some(x=>!comparisons.includes(x))||['received','opened','imported','analysis','reviewed','saved','complete'].some(k=>typeof p[k as keyof MasterScene09]!=='boolean')||p.draft!==undefined&&!validChoice(p.draft)||p.hypothesis!==undefined&&!validChoice(p.hypothesis)||p.opened&&!p.received||p.imported&&cardFields.some(f=>!p.inspected.includes(f))||p.assessment!==undefined&&(!cardAssessments.some(item=>item.id===p.assessment)||!p.saved||!p.opened||p.beat<8)||p.saved&&!p.assessment&&(!p.analysis||!p.reviewed||!p.comparisons.includes('contact')||!p.comparisons.includes('capture')||p.hypothesis===undefined)||p.complete&&p.beat!==(p.conversationRevision==='conversation-v3'?mayaCard.length:10))throw Error('Invalid Scene 9 progress')
 if(p.conversationRevision==='conversation-v3'){
  if(!validQueue(p.pending)||p.beat>mayaCard.length||p.complete&&p.pending?.length||p.draft!==undefined&&!mayaCard[p.beat]?.choices[p.draft]||p.saved||p.imported||p.analysis||p.beat>3&&!p.received||p.disclosure!==undefined&&(!p.complete||!validDisclosure(p.disclosure)))throw Error('Invalid Maya card conversation')
 }else if(p.conversationRevision!==undefined||p.pending!==undefined||p.disclosure!==undefined)throw Error('Invalid historical card conversation')
}
