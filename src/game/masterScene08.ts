import { captureId, scene08Beats } from '../content/masterScene08'
import type { GameSave } from './types'
import { storyPhotos } from '../content/storyPhotos'
import { captureAssessments } from '../content/masterSceneAssessments'

export interface MasterScene08 {
 version:1; photoRevision?:1; beat:number; draft?:number; messages:{id:string;sender:'maya'|'player';text:string;at:number;photo?:string}[]
 received:boolean; opened:boolean; inspected:string[]; imported:boolean; analysis:boolean; compared:boolean; hypothesis?:number; assessment?:typeof captureAssessments[number]['id']; reviewed:boolean; saved:boolean; complete:boolean
}
export type MasterScene08Action={type:'start'|'send'|'open'}|{type:'draft';index:number}|{type:'record-assessment';id:string}
export const captureFields=['header','text','time','crop','source'] as const
const validChoice=(n:number)=>Number.isInteger(n)&&n>=0&&n<3
export const canReplyInScene08=(p:MasterScene08)=>!p.complete&&(p.beat<4||p.beat<8&&p.opened||p.beat<10&&p.saved)
export function availableCaptureAssessments(save:GameSave){
 return captureAssessments.filter(item=>item.id==='crop-export'?!!save.masterScene07?.saved:item.id==='crop-lucas'?save.lucasPhoto?.messages.some(line=>line.id==='TA-S08-LUCAS-PHOTO-INTRO')===true:true)
}
export function masterScene08Action(s:GameSave,a:MasterScene08Action,now=Date.now()):GameSave {
 let p=s.masterScene08
 if(a.type==='start'){
  if(p||s.masterScene07?.phase!=='complete'||!s.masterScene07.saved||!s.deliveredEvents.includes('TA-S07-SCENE08-UNLOCKED'))return s
  const line=s.relationships.maya.trust>0?'Sophie said you might be willing to look at something I found. Thank you for staying with us.':'Sophie said you might be willing to look at something I found. I hope it is all right that I messaged you.'
  return {...s,masterScene08:{version:1,photoRevision:1,beat:0,messages:[{id:'TA-S08-FIRST',sender:'maya',text:line,at:now}],received:false,opened:false,inspected:[],imported:false,analysis:false,compared:false,reviewed:false,saved:false,complete:false}}
 }
 if(!p)return s
 const put=(next:MasterScene08):GameSave=>({...s,masterScene08:next})
 const canReply=canReplyInScene08(p)
 if(a.type==='draft'&&canReply&&!p.complete&&validChoice(a.index))return put({...p,draft:a.index})
 if(a.type==='send'&&canReply&&!p.complete&&p.draft!==undefined){
  const n=p.beat,i=p.draft,b=scene08Beats[n],player=`TA-S08-C${n+1}-P-${i}`,maya=`TA-S08-C${n+1}-M-${i}`,complete=n===9
  const photo=n===6&&p.photoRevision===1&&!s.deliveredEvents.includes(storyPhotos.mayaMugs.id)?storyPhotos.mayaMugs:undefined
  const messages=[...p.messages,{id:player,sender:'player' as const,text:b.choices[i],at:now},{id:maya,sender:'maya' as const,text:b.replies[i],at:now},...(photo?[{id:photo.id,sender:'maya' as const,text:'',photo:photo.src,at:now},{id:`${photo.id}-DIALOGUE`,sender:'maya' as const,text:photo.caption,at:now}]:[])]
  const events=[...new Set([...s.deliveredEvents,player,maya,...(photo?[photo.id,`${photo.id}-DIALOGUE`]:[]),...(n===3?['TA-S08-CAPTURE-RECEIVED']:[]),...(complete?['TA-S08-COMPLETE','TA-S08-SCENE09-UNLOCKED']:[])])]
  return {...s,messages:[...s.messages,{id:player,sender:'player',recipient:'maya',channel:'messages',text:b.choices[i],at:now,delivery:'delivered'},{id:maya,sender:'maya',channel:'messages',text:b.replies[i],at:now,delivery:'delivered'},...(photo?[{id:photo.id,sender:'maya' as const,channel:'messages' as const,text:'Photo',attachmentIds:[photo.id],at:now,delivery:'delivered' as const},{id:`${photo.id}-DIALOGUE`,sender:'maya' as const,channel:'messages' as const,text:photo.caption,at:now,delivery:'delivered' as const}]:[])],deliveredEvents:events,masterScene08:{...p,beat:n+1,draft:undefined,messages,received:n===3||p.received,complete}}
 }
 if(a.type==='open'&&p.received)return put({...p,opened:true})
 if(a.type==='record-assessment'&&p.received&&p.opened&&p.beat>=8&&!p.saved){
  const assessment=availableCaptureAssessments(s).find(item=>item.id===a.id)
  if(!assessment)return s
  return {...s,evidence:{...s.evidence,[captureId]:{id:captureId,source:`Maya’s cropped capture of her own conversation; original unverified. ${assessment.finding}`,collectedAt:now,verified:false}},masterScene08:{...p,assessment:assessment.id,saved:true}}
 }
 return s
}
export function validateMasterScene08(value:unknown):void{
 if(value===undefined)return
 const p=value as MasterScene08
 if(!p||p.version!==1||p.photoRevision!==undefined&&p.photoRevision!==1||!Number.isInteger(p.beat)||p.beat<0||p.beat>10||!Array.isArray(p.messages)||!Array.isArray(p.inspected)||p.inspected.some(x=>!captureFields.includes(x as typeof captureFields[number]))||['received','opened','imported','analysis','compared','reviewed','saved','complete'].some(k=>typeof p[k as keyof MasterScene08]!=='boolean')||p.draft!==undefined&&!validChoice(p.draft)||p.hypothesis!==undefined&&!validChoice(p.hypothesis)||p.opened&&!p.received||p.imported&&captureFields.some(x=>!p.inspected.includes(x))||p.assessment!==undefined&&(!captureAssessments.some(item=>item.id===p.assessment)||!p.saved||!p.opened||p.beat<8)||p.saved&&!p.assessment&&(!p.analysis||!p.compared||!p.reviewed||p.hypothesis===undefined)||p.complete&&(!p.saved||p.beat!==10))throw Error('Invalid Scene 8 progress')
}
