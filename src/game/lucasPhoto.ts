import { lucasConversation, lucasIntroduction, lucasPhotoBeats } from '../content/lucasPhoto'
import { storyPhotos } from '../content/storyPhotos'
import type { GameSave } from './types'
type Line={id:string;sender:'lucas'|'player';text:string;at:number;photo?:string}
export interface LucasPhotoState{version:1;revision?:'conversation-v3';pending?:{index:number;dueAt:number};beat:number;draft?:number;messages:Line[];complete:boolean}
export type LucasPhotoAction={type:'start'|'send'|'tick'}|{type:'draft';index:number}
export function canStartLucasConversation(save:GameSave) {
 const opening=save.prologue?.scene01
 return !!opening?.lucasLeftGroup && ((opening.masterScene02Revision??0)>=3 || !!save.masterScene08 && save.masterScene08.beat>=2)
}
function lucasBatch(beat:number):readonly string[] {
 return beat===0?lucasIntroduction:lucasConversation[beat-1].lines
}
function scheduleLucasLine(p:LucasPhotoState,index:number,now:number):LucasPhotoState {
 const text=lucasBatch(p.beat)[index]
 const pause=text==='Found it.'||text==='And, hey...'?950:260
 const dueAt=now+pause+Math.min(5200,Math.max(950,750+text.length*30))
 return {...p,pending:{index,dueAt}}
}
function advanceLucasConversation(s:GameSave,p:LucasPhotoState,a:LucasPhotoAction,now:number):GameSave {
 if(p.complete)return s
 if(a.type==='tick'){
  if(!p.pending||now<p.pending.dueAt)return s
  const index=p.pending.index, batch=lucasBatch(p.beat), content=batch[index]
  const photo=content==='[photo]'?storyPhotos.lucasFriends:undefined
  const id=photo?.id??`TA-LUCAS-V3-B${p.beat}-M${index+1}`
  const line:Line={id,sender:'lucas',text:photo?'':content,at:now,...(photo?{photo:photo.src}:{})}
  let next:LucasPhotoState={...p,messages:[...p.messages,line],pending:undefined,complete:index===batch.length-1&&p.beat===lucasConversation.length}
  if(index+1<batch.length)next=scheduleLucasLine(next,index+1,now)
  return {...s,lucasPhoto:next,deliveredEvents:[...s.deliveredEvents,id],messages:[...s.messages,{id,sender:'lucas',channel:'messages',delivery:'delivered',text:photo?'Photo':content,at:now,...(photo?{attachmentIds:[id]}:{})}]}
 }
 const choices:readonly string[]|undefined=lucasConversation[p.beat]?.choices
 if(p.pending||!choices)return s
 if(a.type==='draft'&&Number.isInteger(a.index)&&choices[a.index]!==undefined)return {...s,lucasPhoto:{...p,draft:a.index}}
 if(a.type!=='send'||p.draft===undefined)return s
 const key=`TA-LUCAS-V3-C${p.beat+1}`,id=`${key}-${p.draft}`,text=choices[p.draft]
 const line:Line={id,sender:'player',text,at:now}
 return {...s,choices:{...s.choices,[key]:String(p.draft)},deliveredEvents:[...s.deliveredEvents,id],
  messages:[...s.messages,{...line,recipient:'lucas',channel:'messages',delivery:'delivered'}],
  lucasPhoto:scheduleLucasLine({...p,beat:p.beat+1,draft:undefined,messages:[...p.messages,line]},0,now)}
}
export function lucasPhotoAction(s:GameSave,a:LucasPhotoAction,now=Date.now()):GameSave{
 const p=s.lucasPhoto
 if(a.type==='start'){
  if(p||!canStartLucasConversation(s))return s
  return {...s,lucasPhoto:scheduleLucasLine({version:1,revision:'conversation-v3',beat:0,messages:[],complete:false},0,now)}
 }
 if(!p)return s
 if(p.revision==='conversation-v3')return advanceLucasConversation(s,p,a,now)
 if(a.type==='draft'&&!p.complete&&Number.isInteger(a.index)&&a.index>=0&&a.index<3)return {...s,lucasPhoto:{...p,draft:a.index}}
 if(a.type==='send'&&!p.complete&&p.draft!==undefined&&p.beat<lucasPhotoBeats.length){
  const n=p.beat,i=p.draft,b=lucasPhotoBeats[n],id=`TA-S08-LUCAS-PHOTO-C${n+1}-${i}`,replyId=`TA-S08-LUCAS-PHOTO-R${n+1}-${i}`,photo=n===1?storyPhotos.lucasFriends:undefined
  const messages:Line[]=[...p.messages,{id,sender:'player',text:b.choices[i],at:now},{id:replyId,sender:'lucas',text:b.replies[i],at:now},...(photo?[{id:photo.id,sender:'lucas' as const,text:'',photo:photo.src,at:now},{id:`${photo.id}-DIALOGUE`,sender:'lucas' as const,text:photo.caption,at:now}]:[])]
  return {...s,choices:{...s.choices,[`TA-S08-LUCAS-PHOTO-C${n+1}`]:String(i)},messages:[...s.messages,{id,sender:'player',recipient:'lucas',channel:'messages',text:b.choices[i],at:now,delivery:'delivered'},{id:replyId,sender:'lucas',channel:'messages',text:b.replies[i],at:now,delivery:'delivered'},...(photo?[{id:photo.id,sender:'lucas' as const,channel:'messages' as const,text:'Photo',attachmentIds:[photo.id],at:now,delivery:'delivered' as const},{id:`${photo.id}-DIALOGUE`,sender:'lucas' as const,channel:'messages' as const,text:photo.caption,at:now,delivery:'delivered' as const}]:[])],deliveredEvents:[...new Set([...s.deliveredEvents,id,replyId,...(photo?[photo.id,`${photo.id}-DIALOGUE`]:[])])],lucasPhoto:{...p,beat:n+1,draft:undefined,messages,complete:n===lucasPhotoBeats.length-1}}
 }
 return s
}
export function validateLucasPhoto(value:unknown):void{
 if(value===undefined)return
 const p=value as LucasPhotoState
 if(p?.revision==='conversation-v3'){
  const finalBeat=lucasConversation.length
  if(p.version!==1||!Number.isInteger(p.beat)||p.beat<0||p.beat>finalBeat||typeof p.complete!=='boolean'||!Array.isArray(p.messages)||p.complete!==(p.beat===finalBeat&&!p.pending)||
   p.pending&&(!Number.isFinite(p.pending.dueAt)||!Number.isInteger(p.pending.index)||!lucasBatch(p.beat)[p.pending.index])||
   p.draft!==undefined&&(p.pending||!Number.isInteger(p.draft)||!lucasConversation[p.beat]?.choices[p.draft])||
   p.messages.some(m=>!m||typeof m.id!=='string'||!Number.isFinite(m.at)||!['lucas','player'].includes(m.sender)||typeof m.text!=='string')||
   new Set(p.messages.map(m=>m.id)).size!==p.messages.length)throw Error('Invalid Lucas conversation')
  return
 }
 if(!p||p.revision!==undefined||p.version!==1||!Number.isInteger(p.beat)||p.beat<0||p.beat>3||typeof p.complete!=='boolean'||!Array.isArray(p.messages)||p.draft!==undefined&&(!Number.isInteger(p.draft)||p.draft<0||p.draft>2)||p.complete&&p.beat!==3)throw Error('Invalid Lucas photo conversation')
}
