import { cardHypotheses, referenceCardId, scene09Beats } from '../content/masterScene09'
import type { GameSave } from './types'
import { cardAssessments } from '../content/masterSceneAssessments'

export interface MasterScene09 {
 version:1; beat:number; draft?:number; messages:{id:string;sender:'maya'|'player';text:string;at:number}[]
 received:boolean; opened:boolean; inspected:string[]; imported:boolean; analysis:boolean; comparisons:string[]; hypothesis?:number; assessment?:typeof cardAssessments[number]['id']; reviewed:boolean; saved:boolean; complete:boolean
}
export type MasterScene09Action={type:'start'|'send'|'open'|'import'|'analyse'|'review'|'save'}|{type:'draft'|'hypothesis';index:number}|{type:'inspect'|'compare';field:string}|{type:'record-assessment';id:string}
export const cardFields=['heading','title','code','reference','unverified','appearance','metadata'] as const
const validChoice=(n:number)=>Number.isInteger(n)&&n>=0&&n<3
const comparisons=['contact','capture','timeline']
export const canReplyInScene09=(p:MasterScene09)=>!p.complete&&(p.beat<4||p.beat<8&&p.inspected.includes('code')||p.beat<10&&p.saved)
export function availableCardAssessments(save:GameSave){
 return cardAssessments.filter(item=>item.id==='card-capture'?!!save.masterScene08?.saved:!!save.masterScene07?.saved)
}
export function masterScene09Action(s:GameSave,a:MasterScene09Action,now=Date.now()):GameSave{
 let p=s.masterScene09
 if(a.type==='start'){
  if(p||!s.masterScene08?.complete||!s.masterScene08.saved||!s.deliveredEvents.includes('TA-S08-SCENE09-UNLOCKED'))return s
  const text=s.relationships.maya.trust>0?'I went back to the photograph I mentioned. Thank you for taking the time to look with me.':'I went back to the photograph I mentioned. Could we take a careful look at it?'
  return {...s,masterScene09:{version:1,beat:0,messages:[{id:'TA-S09-FIRST',sender:'maya',text,at:now}],received:false,opened:false,inspected:[],imported:false,analysis:false,comparisons:[],reviewed:false,saved:false,complete:false}}
 }
 if(!p)return s
 const put=(next:MasterScene09):GameSave=>({...s,masterScene09:next})
 const canReply=canReplyInScene09(p)
 if(a.type==='draft'&&canReply&&!p.complete&&validChoice(a.index))return put({...p,draft:a.index})
 if(a.type==='send'&&canReply&&!p.complete&&p.draft!==undefined){
  const n=p.beat,i=p.draft,b=scene09Beats[n],player=`TA-S09-C${n+1}-P-${i}`,maya=`TA-S09-C${n+1}-M-${i}`,complete=n===9
  const messages=[...p.messages,{id:player,sender:'player' as const,text:b.choices[i],at:now},{id:maya,sender:'maya' as const,text:b.replies[i],at:now}]
  return {...s,messages:[...s.messages,{id:player,sender:'player',recipient:'maya',channel:'messages',text:b.choices[i],at:now,delivery:'delivered'},{id:maya,sender:'maya',channel:'messages',text:b.replies[i],at:now,delivery:'delivered'}],deliveredEvents:[...new Set([...s.deliveredEvents,player,maya,...(n===3?['TA-S09-PHOTO-RECEIVED']:[]),...(complete?['TA-S09-PUBLIC-SEARCH-TARGET','TA-S09-COMPLETE','TA-S09-SCENE10-UNLOCKED']:[])])],masterScene09:{...p,beat:n+1,draft:undefined,messages,received:n===3||p.received,complete}}
 }
 if(a.type==='open'&&p.received)return put({...p,opened:true})
 if(a.type==='inspect'&&p.opened&&cardFields.includes(a.field as typeof cardFields[number])&&!p.inspected.includes(a.field))return put({...p,inspected:[...p.inspected,a.field]})
 if(a.type==='record-assessment'&&p.received&&p.opened&&p.beat>=8&&p.inspected.includes('code')&&!p.saved){
  const assessment=availableCardAssessments(s).find(item=>item.id===a.id)
  if(!assessment)return s
  return {...s,evidence:{...s.evidence,[referenceCardId]:{id:referenceCardId,source:`Maya’s shared-folder photograph; provenance unverified. ${assessment.finding}`,collectedAt:now,verified:false}},masterScene09:{...p,assessment:assessment.id,comparisons:[...new Set([...p.comparisons,assessment.id==='card-capture'?'capture':'contact'])],saved:true}}
 }
 if(a.type==='import'&&p.beat>=8&&cardFields.every(f=>p!.inspected.includes(f)))return put({...p,imported:true})
 if(a.type==='analyse'&&p.imported)return put({...p,analysis:true})
 if(a.type==='compare'&&p.analysis&&comparisons.includes(a.field)&&!p.comparisons.includes(a.field)&&((a.field==='contact'&&!!s.masterScene07?.saved)||(a.field==='capture'&&!!s.masterScene08?.saved)||(a.field==='timeline'&&!!s.masterScene06?.saved)))return put({...p,comparisons:[...p.comparisons,a.field]})
 if(a.type==='hypothesis'&&p.analysis&&p.comparisons.includes('contact')&&p.comparisons.includes('capture')&&!p.saved&&validChoice(a.index))return put({...p,hypothesis:a.index,reviewed:false})
 if(a.type==='review'&&p.hypothesis!==undefined&&p.analysis&&!p.saved)return put({...p,reviewed:true})
 if(a.type==='save'&&p.reviewed&&p.hypothesis!==undefined&&!p.saved)return {...s,evidence:{...s.evidence,[referenceCardId]:{id:referenceCardId,source:`Maya's shared-folder photograph, provenance unverified; GH-DSC-03-A; ${cardHypotheses[p.hypothesis]}`,collectedAt:now,verified:false}},masterScene09:{...p,saved:true}}
 return s
}
export function validateMasterScene09(value:unknown):void{
 if(value===undefined)return
 const p=value as MasterScene09
 if(!p||p.version!==1||!Number.isInteger(p.beat)||p.beat<0||p.beat>10||!Array.isArray(p.messages)||!Array.isArray(p.inspected)||!Array.isArray(p.comparisons)||p.inspected.some(x=>!cardFields.includes(x as typeof cardFields[number]))||p.comparisons.some(x=>!comparisons.includes(x))||['received','opened','imported','analysis','reviewed','saved','complete'].some(k=>typeof p[k as keyof MasterScene09]!=='boolean')||p.draft!==undefined&&!validChoice(p.draft)||p.hypothesis!==undefined&&!validChoice(p.hypothesis)||p.opened&&!p.received||p.imported&&cardFields.some(f=>!p.inspected.includes(f))||p.assessment!==undefined&&(!cardAssessments.some(item=>item.id===p.assessment)||!p.saved||!p.opened||!p.inspected.includes('code')||p.beat<8)||p.saved&&!p.assessment&&(!p.analysis||!p.reviewed||!p.comparisons.includes('contact')||!p.comparisons.includes('capture')||p.hypothesis===undefined)||p.complete&&(!p.saved||p.beat!==10))throw Error('Invalid Scene 9 progress')
}
