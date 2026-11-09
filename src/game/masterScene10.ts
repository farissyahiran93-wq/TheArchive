import { finaleLast, finaleTurns, finaleWarning, inventoryCode, inventoryConclusions } from '../content/masterScene10'
import type { GameSave } from './types'
import { scene10Clips } from '../content/masterScene10Media'
import { selectMasterCaseFile } from './masterCaseFile'
type Line={id:string;sender:'sophie'|'player';text:string;at:number}
export interface MasterInventoryTheory {
 questionId:string
 hypothesis:string
 alternative:string
 outstanding:string
 supportingIds:string[]
 contradictingIds:string[]
}
export interface MasterScene10 {version:1;investigationRevision?:'theory-v1';theoryDraft?:MasterInventoryTheory;theory?:MasterInventoryTheory;query:string;searched:boolean;matched:boolean;metadata:boolean;limitations:boolean;compared:boolean;conclusion?:number;saved:boolean;phase:'inventory'|'return'|'ringing'|'missed'|'call'|'warning'|'ending'|'complete';beat:number;draft?:number;lines:Line[];warning:boolean;media?:{revision:1;stage:'ready'|'playing'|'waiting'|'connecting'|'hold'|'fade';clip:number;draft?:number;connectedAt?:number;completionSeen?:boolean;videoConsent:boolean;responses:{decision:number;choice:number;text:string}[]}}
export type MasterScene10Action={type:'start'|'search'|'compare'|'save'|'save-theory'|'discard-theory-draft'|'home'|'answer'|'decline'|'send'|'reveal-final'|'finish'|'media-play'|'media-ended'|'media-send'|'media-connect'|'media-fade'|'media-finish'|'media-dismiss'}|{type:'query';value:string}|{type:'conclusion'|'draft'|'media-draft';index:number}
 | {type:'theory-text';field:'hypothesis'|'alternative'|'outstanding';value:string}
 | {type:'theory-question';questionId:string}
 | {type:'theory-evidence';id:string;use:'support'|'challenge'|'none'}
export const emptyInventoryTheory:MasterInventoryTheory={questionId:'',hypothesis:'',alternative:'',outstanding:'',supportingIds:[],contradictingIds:[]}
export const inventoryTheoryTextLimit=1500
export function inventoryTheoryReady(theory:MasterInventoryTheory):boolean {
 return !!(theory.questionId&&theory.hypothesis.trim()&&theory.outstanding.trim()&&theory.supportingIds.length)
}
const valid=(n:number)=>Number.isInteger(n)&&n>=0&&n<3
export function masterScene10Action(s:GameSave,a:MasterScene10Action,now=Date.now()):GameSave{
 const p=s.masterScene10
 if(a.type==='start')return p||!s.masterScene09?.complete||!s.masterScene09.saved||!s.deliveredEvents.includes('TA-S09-SCENE10-UNLOCKED')?s:{...s,masterScene10:{version:1,...(s.masterScene05?.packageStatus==='installed'?{investigationRevision:'theory-v1' as const}:{}),query:'',searched:false,matched:false,metadata:false,limitations:false,compared:false,saved:false,phase:'inventory',beat:0,lines:[],warning:false,media:{revision:1,stage:'ready',clip:0,videoConsent:false,responses:[]}}}
 if(!p)return s
 const put=(v:MasterScene10):GameSave=>({...s,masterScene10:v})
 if(a.type==='media-dismiss'&&p.phase==='complete'&&p.media)return put({...p,media:{...p.media,completionSeen:true}})
 if(a.type==='query'&&p.phase==='inventory')return put({...p,query:a.value,searched:false,matched:false,metadata:false,limitations:false,compared:false,conclusion:undefined})
 if(a.type==='search'&&p.phase==='inventory')return put({...p,searched:true,matched:p.query.trim().toUpperCase()===inventoryCode})
 if(a.type==='compare'&&p.matched&&p.phase==='inventory'&&s.masterScene09?.saved)return put({...p,compared:true})
 if(a.type==='conclusion'&&!p.investigationRevision&&p.compared&&valid(a.index)&&!p.saved)return put({...p,conclusion:a.index})
 if(a.type==='save'&&!p.investigationRevision&&p.phase==='inventory'&&p.compared&&p.conclusion!==undefined)return {...s,evidence:{...s.evidence,'TA-S10-PUBLIC-INDEX':{id:'TA-S10-PUBLIC-INDEX',source:`Public inventory reference match; underlying record unavailable; private conclusion: ${inventoryConclusions[p.conclusion]}`,collectedAt:now,verified:false}},masterScene10:{...p,saved:true,phase:'return'}}
 if(p.investigationRevision==='theory-v1'&&p.compared&&(p.phase==='inventory'||p.phase==='return')){
  const draft=p.theoryDraft??p.theory??emptyInventoryTheory
  if(a.type==='discard-theory-draft'&&p.theory&&p.theoryDraft)return put({...p,theoryDraft:undefined})
  if(a.type==='theory-text'&&a.value.length<=inventoryTheoryTextLimit)return put({...p,theoryDraft:{...draft,[a.field]:a.value}})
  if(a.type==='theory-question'||a.type==='theory-evidence'||a.type==='save-theory'){
   const caseFile=selectMasterCaseFile(s)
   if(!caseFile)return s
   const evidenceIds=new Set(caseFile.nodes.map(node=>node.id))
   if(a.type==='theory-question'&&caseFile.questions.some(question=>question.id===a.questionId))return put({...p,theoryDraft:{...draft,questionId:a.questionId}})
   if(a.type==='theory-evidence'&&evidenceIds.has(a.id)){
    const supportingIds=draft.supportingIds.filter(id=>id!==a.id),contradictingIds=draft.contradictingIds.filter(id=>id!==a.id)
    if(a.use==='support')supportingIds.push(a.id)
    if(a.use==='challenge')contradictingIds.push(a.id)
    return put({...p,theoryDraft:{...draft,supportingIds,contradictingIds}})
   }
   if(a.type==='save-theory'&&inventoryTheoryReady(draft)&&caseFile.questions.some(question=>question.id===draft.questionId)&&[...draft.supportingIds,...draft.contradictingIds].every(id=>evidenceIds.has(id))){
    const theory={...draft,hypothesis:draft.hypothesis.trim(),alternative:draft.alternative.trim(),outstanding:draft.outstanding.trim()}
    const id='TA-S10-PUBLIC-INDEX'
    const index=s.evidence[id]??{id,source:'Public inventory and Maya’s card show the same reference. The underlying record and card provenance remain unverified.',collectedAt:now,verified:false}
    return {...s,evidence:{...s.evidence,[id]:index},masterScene10:{...p,theory,theoryDraft:undefined,saved:true,phase:'return'}}
   }
  }
 }
 if(a.type==='home'&&p.phase==='return'&&!p.theoryDraft)return put({...p,phase:'ringing'})
 if(a.type==='decline'&&p.phase==='ringing')return put({...p,phase:'missed'})
 if(a.type==='answer'&&(p.phase==='ringing'||p.phase==='missed'))return put({...p,phase:'call',...(p.media?{media:{...p.media,connectedAt:now}}:{}),lines:p.media?[]:[{id:'TA-S10-SOP-01',sender:'sophie',text:finaleTurns[0].sophie,at:now}]})
 const media=p.media
 if(media&&p.phase==='call'){
  const saveMedia=(m:typeof media):GameSave=>put({...p,media:m})
  if(a.type==='media-play'&&media.stage==='ready')return saveMedia({...media,stage:'playing'})
  if(a.type==='media-connect'&&media.stage==='connecting'&&media.videoConsent)return saveMedia({...media,stage:'playing'})
  if(a.type==='media-ended'&&media.stage==='playing'){
   const n=media.clip,id=`TA-S10-MEDIA-S${n+1}`,line={id,sender:'sophie' as const,text:scene10Clips[n].sophie,at:now},lines=p.lines.some(x=>x.id===id)?p.lines:[...p.lines,line]
   if(n===10)return {...s,evidence:{...s.evidence,'TA-S10-WARNING-CARD':{id:'TA-S10-WARNING-CARD',source:'Sophie describes a physical card in the Mercer family folder; handwriting and authorship unverified; related to starred contact export; DO NOT CONTACT THE STARRED NUMBER.',collectedAt:now,verified:false}},deliveredEvents:[...new Set([...s.deliveredEvents,'TA-S10-WARNING'])],masterScene10:{...p,lines,warning:true,media:{...media,clip:11,stage:'playing'}}}
   if(n===11)return {...s,deliveredEvents:[...new Set([...s.deliveredEvents,'TA-S10-FINAL'])],masterScene10:{...p,lines,media:{...media,stage:'hold'}}}
   return put({...p,lines,media:{...media,stage:'waiting'}})
  }
  if(a.type==='media-draft'&&media.stage==='waiting'&&valid(a.index))return saveMedia({...media,draft:a.index})
  if(a.type==='media-send'&&media.stage==='waiting'&&media.draft!==undefined&&media.clip<10){
   const n=media.clip,i=media.draft,t=scene10Clips[n];if(!('choices' in t))return s
   const id=`TA-S10-RESPONSE-${n+1}-${media.responses.length}`,text=t.choices[i],responses=[...media.responses,{decision:n+1,choice:i,text}],stay=n===5&&i!==0
   return {...s,messages:[...s.messages,{id,sender:'player',recipient:'sophie',channel:'messages',text,at:now,delivery:'delivered'}],deliveredEvents:[...new Set([...s.deliveredEvents,id])],masterScene10:{...p,lines:[...p.lines,{id,sender:'player',text,at:now}],media:{...media,responses,draft:undefined,videoConsent:media.videoConsent||(n===5&&i===0),stage:stay?'waiting':n===5?'connecting':'playing',clip:stay?n:n+1}}}
  }
  if(a.type==='media-fade'&&media.stage==='hold')return saveMedia({...media,stage:'fade'})
  if(a.type==='media-finish'&&media.stage==='fade'&&p.warning)return {...s,deliveredEvents:[...new Set([...s.deliveredEvents,'TA-S10-COMPLETE','TA-CH01-COMPLETE','TA-CH02-UNLOCKED'])],masterScene10:{...p,phase:'complete'}}
  return s
 }
 if(a.type==='draft'&&p.phase==='call'&&valid(a.index))return put({...p,draft:a.index})
 if(a.type==='send'&&p.phase==='call'&&p.draft!==undefined&&p.beat<finaleTurns.length){
  const n=p.beat,i=p.draft,t=finaleTurns[n],id=`TA-S10-C${n+1}-P-${i}`,reply=`TA-S10-C${n+1}-S-${i}`,lines:Line[]=[...p.lines,{id,sender:'player',text:t.choices[i],at:now},{id:reply,sender:'sophie',text:t.replies[i],at:now}]
  if(n===finaleTurns.length-1){lines.push({id:'TA-S10-WARNING',sender:'sophie',text:finaleWarning,at:now});return {...s,messages:[...s.messages,{id,sender:'player',recipient:'sophie',channel:'messages',text:t.choices[i],at:now,delivery:'delivered'}],deliveredEvents:[...new Set([...s.deliveredEvents,id,'TA-S10-WARNING'])],masterScene10:{...p,lines,beat:n+1,draft:undefined,warning:true,phase:'warning'}}}
  lines.push({id:`TA-S10-SOP-${String(n+2).padStart(2,'0')}`,sender:'sophie',text:finaleTurns[n+1].sophie,at:now})
  return {...s,messages:[...s.messages,{id,sender:'player',recipient:'sophie',channel:'messages',text:t.choices[i],at:now,delivery:'delivered'}],deliveredEvents:[...new Set([...s.deliveredEvents,id])],masterScene10:{...p,lines,beat:n+1,draft:undefined}}
 }
 if(a.type==='reveal-final'&&p.phase==='warning')return {...s,deliveredEvents:[...new Set([...s.deliveredEvents,'TA-S10-FINAL'])],masterScene10:{...p,phase:'ending',lines:[...p.lines,{id:'TA-S10-FINAL',sender:'sophie',text:finaleLast,at:now}]}}
 if(a.type==='finish'&&p.phase==='ending'&&p.warning)return {...s,deliveredEvents:[...new Set([...s.deliveredEvents,'TA-S10-COMPLETE','TA-CH01-COMPLETE','TA-CH02-UNLOCKED'])],masterScene10:{...p,phase:'complete'}}
 return s
}
function validInventoryTheory(t:MasterInventoryTheory):boolean {
 if(!t||typeof t.questionId!=='string'||t.questionId.length>100)return false
 if(![t.hypothesis,t.alternative,t.outstanding].every(value=>typeof value==='string'&&value.length<=inventoryTheoryTextLimit))return false
 if(!Array.isArray(t.supportingIds)||!Array.isArray(t.contradictingIds))return false
 const ids=[...t.supportingIds,...t.contradictingIds]
 return ids.every(id=>typeof id==='string'&&/^[A-Z0-9_-]{1,100}$/.test(id))&&new Set(ids).size===ids.length
}
export function validateMasterScene10(v:unknown):void{
 if(v===undefined)return
 const p=v as MasterScene10,m=p?.media
 if(!p||p.version!==1||!['inventory','return','ringing','missed','call','warning','ending','complete'].includes(p.phase)||!Number.isInteger(p.beat)||p.beat<0||p.beat>8||!Array.isArray(p.lines)||p.draft!==undefined&&!valid(p.draft)||p.conclusion!==undefined&&!valid(p.conclusion)||p.saved&&!p.compared||['warning','ending','complete'].includes(p.phase)&&!p.warning||m!==undefined&&(m.revision!==1||!['ready','playing','waiting','connecting','hold','fade'].includes(m.stage)||!Number.isInteger(m.clip)||m.clip<0||m.clip>11||!Array.isArray(m.responses)||typeof m.videoConsent!=='boolean'||m.clip>=6&&!m.videoConsent||m.draft!==undefined&&!valid(m.draft)))throw Error('Invalid Scene 10 progress')
 if(p.investigationRevision==='theory-v1'){
  if(p.compared&&!p.matched||p.phase!=='inventory'&&!p.saved||p.saved&&(!p.theory||!validInventoryTheory(p.theory)||!inventoryTheoryReady(p.theory))||!p.saved&&p.theory!==undefined||p.theoryDraft!==undefined&&!validInventoryTheory(p.theoryDraft))throw Error('Invalid Scene 10 theory')
 }else if(p.investigationRevision!==undefined||p.theory!==undefined||p.theoryDraft!==undefined||p.saved&&p.conclusion===undefined)throw Error('Invalid legacy Scene 10 progress')
}
