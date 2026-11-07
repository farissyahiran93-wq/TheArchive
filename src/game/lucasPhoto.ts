import { lucasPhotoBeats } from '../content/lucasPhoto'
import { storyPhotos } from '../content/storyPhotos'
import type { GameSave } from './types'
type Line={id:string;sender:'lucas'|'player';text:string;at:number;photo?:string}
export interface LucasPhotoState{version:1;beat:number;draft?:number;messages:Line[];complete:boolean}
export type LucasPhotoAction={type:'start'|'send'}|{type:'draft';index:number}
export function lucasPhotoAction(s:GameSave,a:LucasPhotoAction,now=Date.now()):GameSave{
 let p=s.lucasPhoto
 if(a.type==='start'){
  if(p||!s.masterScene08||s.masterScene08.beat<2||!s.prologue?.scene01?.lucasLeftGroup)return s
  return {...s,lucasPhoto:{version:1,beat:0,messages:[{id:'TA-S08-LUCAS-PHOTO-INTRO',sender:'lucas',text:"I saw you in FIND DANIEL before I left. I'm still looking for him, but I'm not ready to share his private messages.",at:now}],complete:false}}
 }
 if(!p)return s
 if(a.type==='draft'&&!p.complete&&Number.isInteger(a.index)&&a.index>=0&&a.index<3)return {...s,lucasPhoto:{...p,draft:a.index}}
 if(a.type==='send'&&!p.complete&&p.draft!==undefined&&p.beat<lucasPhotoBeats.length){
  const n=p.beat,i=p.draft,b=lucasPhotoBeats[n],id=`TA-S08-LUCAS-PHOTO-C${n+1}-${i}`,replyId=`TA-S08-LUCAS-PHOTO-R${n+1}-${i}`,photo=n===1?storyPhotos.lucasFriends:undefined
  const messages:Line[]=[...p.messages,{id,sender:'player',text:b.choices[i],at:now},{id:replyId,sender:'lucas',text:b.replies[i],at:now},...(photo?[{id:photo.id,sender:'lucas' as const,text:photo.caption,photo:photo.src,at:now}]:[])]
  return {...s,choices:{...s.choices,[`TA-S08-LUCAS-PHOTO-C${n+1}`]:String(i)},messages:[...s.messages,{id,sender:'player',recipient:'lucas',channel:'messages',text:b.choices[i],at:now,delivery:'delivered'},{id:replyId,sender:'lucas',channel:'messages',text:b.replies[i],at:now,delivery:'delivered'},...(photo?[{id:photo.id,sender:'lucas' as const,channel:'messages' as const,text:photo.caption,attachmentIds:[photo.id],at:now,delivery:'delivered' as const}]:[])],deliveredEvents:[...new Set([...s.deliveredEvents,id,replyId,...(photo?[photo.id]:[])])],lucasPhoto:{...p,beat:n+1,draft:undefined,messages,complete:n===lucasPhotoBeats.length-1}}
 }
 return s
}
export function validateLucasPhoto(value:unknown):void{
 if(value===undefined)return
 const p=value as LucasPhotoState
 if(!p||p.version!==1||!Number.isInteger(p.beat)||p.beat<0||p.beat>3||typeof p.complete!=='boolean'||!Array.isArray(p.messages)||p.draft!==undefined&&(!Number.isInteger(p.draft)||p.draft<0||p.draft>2)||p.complete&&p.beat!==3)throw Error('Invalid Lucas photo conversation')
}
