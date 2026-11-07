import { familyPhotoReplies, storyPhotos } from '../content/storyPhotos'
import type { GameSave } from './types'
export type FamilyPhotoAction={type:'draft';index:number}|{type:'send'}
export function familyPhotoAction(s:GameSave,a:FamilyPhotoAction,now=Date.now()):GameSave{
 const scene=s.prologue?.scene01,progress=scene?.familyPhotoReply
 if(!scene?.masterScene01||!progress||progress.replied!==undefined||!scene.nodeId.startsWith('TA-S01-')||scene.invitation!=='none'||!s.deliveredEvents.includes(storyPhotos.sophieFamily.id))return s
 if(a.type==='draft'&&Number.isInteger(a.index)&&a.index>=0&&a.index<3)return {...s,prologue:{...s.prologue!,scene01:{...scene,familyPhotoReply:{...progress,draft:a.index}}}}
 if(a.type==='send'&&progress.draft!==undefined){
  const i=progress.draft,id=`TA-S01-FAMILY-REPLY-${i}`,replyId=`TA-S01-FAMILY-SOPHIE-${i}`,text=familyPhotoReplies.choices[i],reply=familyPhotoReplies.replies[i]
  return {...s,choices:{...s.choices,'TA-S01-FAMILY-REPLY':String(i)},deliveredEvents:[...new Set([...s.deliveredEvents,id,replyId])],messages:[...s.messages,{id,sender:'player',recipient:'sophie',channel:'messages',text,at:now,delivery:'delivered',disclosedFactIds:['TA-S01-FAMILY-NO-RECOGNITION']},{id:replyId,sender:'sophie',channel:'messages',text:reply,at:now,delivery:'delivered'}],knowledge:{...s.knowledge,characters:{...s.knowledge.characters,sophie:[...new Set([...s.knowledge.characters.sophie,'TA-S01-FAMILY-NO-RECOGNITION'])]}},prologue:{...s.prologue!,scene01:{...scene,messages:[...scene.messages,{id,sender:'player',text,at:now},{id:replyId,sender:'sophie',text:reply,at:now}],familyPhotoReply:{replied:i}}}}
 }
 return s
}
