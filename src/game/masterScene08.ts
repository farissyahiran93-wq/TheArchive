import { captureId, scene08Beats, scene08Cinematic, scene08CinematicEnding } from '../content/masterScene08'
import { mayaCheckIn, mayaOpening } from '../content/mayaConversationV3'
import { mayaConversationAction, queueMayaLines, validQueue, type PendingMayaLine, type MayaLine } from './mayaConversationV3'
import type { GameSave } from './types'
import { storyPhotos } from '../content/storyPhotos'
import { captureAssessments } from '../content/masterSceneAssessments'

export interface MasterScene08 {
 version:1; photoRevision?:1; conversationRevision?:'cinematic-v1'|'conversation-v3'; pending?:PendingMayaLine[]; beat:number; draft?:number; messages:MayaLine[]
 received:boolean; opened:boolean; inspected:string[]; imported:boolean; analysis:boolean; compared:boolean; hypothesis?:number; assessment?:typeof captureAssessments[number]['id']; reviewed:boolean; saved:boolean; complete:boolean
}
export type MasterScene08Action={type:'start'}|{type:'send'|'open'|'tick'}|{type:'draft';index:number}|{type:'record-assessment';id:string}
export const captureFields=['header','text','time','crop','source'] as const
const validChoice=(n:number)=>Number.isInteger(n)&&n>=0&&n<3
export const canReplyInScene08=(p:MasterScene08)=>!p.complete&&!p.pending?.length&&(p.conversationRevision==='conversation-v3'
 ? p.beat<mayaCheckIn.length&&(p.beat!==3||p.opened)
 : p.beat<10&&(p.beat<4||p.opened))
function historicalCheckInBeat(p:MasterScene08) {
 const beat=scene08Beats[p.beat]
 if(p.beat!==8||p.saved)return beat
 return {...beat,choices:['Thank you for trusting me.',beat.choices[1],beat.choices[2]]}
}
export const scene08CurrentBeat=(p:MasterScene08)=>p.conversationRevision==='conversation-v3'?mayaCheckIn[p.beat]:p.conversationRevision==='cinematic-v1'?scene08Cinematic[p.beat]:historicalCheckInBeat(p)
type ScheduledBubble=NonNullable<MasterScene08['pending']>[number]
/** Small deterministic variation and length-dependent typing; deadlines survive reload. */
export function mayaTypingDelay(text:string,sequence:number):number {
 const n=text.length, base=n<=20?850:n<=50?1400:n<=100?2200:n<=160?3200:4200
 return Math.min(5000,base+((n*13+sequence*137)%300)+(/[?…]|\.\.\./u.test(text)?120:0))
}
function queueBubbles(items:Omit<ScheduledBubble,'dueAt'>[],now:number):ScheduledBubble[]{let due=now;return items.map((item,index)=>({...item,dueAt:due+=mayaTypingDelay(item.text,index)+(index?250:0)}))}
function bubbleItems(id:string,lines:readonly string[]):Omit<ScheduledBubble,'dueAt'>[]{return lines.map((text,i)=>({id:i?`${id}-${i+1}`:id,text}))}

export function availableCaptureAssessments(save:GameSave){
 return captureAssessments.filter(item=>item.id==='crop-export'?!!save.masterScene07?.saved:item.id==='crop-lucas'?save.lucasPhoto?.messages.some(line=>line.id==='TA-S08-LUCAS-PHOTO-INTRO')===true:true)
}
export function masterScene08Action(s:GameSave,a:MasterScene08Action,now=Date.now()):GameSave {
 let p=s.masterScene08
 if(a.type==='start'){
  if(p||s.masterScene07?.phase!=='complete'||(!s.masterScene07.saved&&s.masterScene07.chat?.stage!=='done')||!s.deliveredEvents.includes('TA-S07-SCENE08-UNLOCKED'))return s
  const contextShared=s.messages.some(line=>line.id==='TA-S07-RELAY-SOPHIE-MAYA'&&line.sender==='sophie'&&line.recipient==='maya')
  const opening = contextShared ? mayaOpening : [mayaOpening[0], 'I found something in an old conversation with Daniel.', mayaOpening[2]]
  return {...s,masterScene08:{version:1,photoRevision:1,conversationRevision:'conversation-v3',beat:0,messages:[],pending:queueMayaLines('TA-S08V3-FIRST',opening,now),received:false,opened:false,inspected:[],imported:false,analysis:false,compared:false,reviewed:false,saved:false,complete:false}}
 }
 if(!p)return s
 if(p.conversationRevision==='conversation-v3')return a.type==='record-assessment'?s:mayaConversationAction(s,'masterScene08',a,now)
 const put=(next:MasterScene08):GameSave=>({...s,masterScene08:next})
 const canReply=canReplyInScene08(p)
 if(p.conversationRevision==='cinematic-v1'){
  if(a.type==='tick'&&p.pending?.length&&p.pending[0].dueAt<=now){
   const [item,...tail]=p.pending, already=s.deliveredEvents.includes(item.id)
   const message={id:item.id,sender:'maya' as const,text:item.text,at:now,...(item.kind==='photo'?{photo:storyPhotos.mayaMugs.src}:{}),...(item.kind==='capture'?{attachment:'capture' as const}:{})}
   const messages=already?p.messages:[...p.messages,message]
   const pending=tail.length?queueBubbles(tail.map(({id,text,kind})=>({id,text,...(kind?{kind}:{})})),now):undefined
   const received=p.received||item.kind==='capture'
   const complete=p.beat===10&&!pending
   return {...s,messages:already?s.messages:[...s.messages,{id:item.id,sender:'maya',channel:'messages',text:item.kind==='photo'?'Photo':item.kind==='capture'?'Capture':item.text,...(item.kind?{attachmentIds:[item.kind==='photo'?storyPhotos.mayaMugs.id:captureId]}:{}),at:now,delivery:'delivered'}],deliveredEvents:[...new Set([...s.deliveredEvents,item.id,...(complete?['TA-S08-COMPLETE','TA-S08-SCENE09-UNLOCKED']:[])])],masterScene08:{...p,messages,pending,received,complete}}
  }
  if(a.type==='open'&&p.received&&!p.opened){return put({...p,opened:true,...(p.beat===4?{pending:queueBubbles(bubbleItems('TA-S08-CAPTURE-FOLLOW',scene08Cinematic[4].intro),now)}:{})})}
  if(a.type==='draft'&&canReply&&validChoice(a.index))return put({...p,draft:a.index})
  if(a.type==='send'&&canReply&&p.draft!==undefined){
   const n=p.beat,i=p.draft,b=scene08Cinematic[n],player=`TA-S08-C${n+1}-P-${i}`,reply=`TA-S08-C${n+1}-M-${i}`
   const items=bubbleItems(reply,b.replies[i])
   if(n===3)items.push({id:'TA-S08-CAPTURE-RECEIVED',text:'',kind:'capture'})
   else if(n===6){items.push(...bubbleItems('TA-S08-PHOTO-LEAD',['Sorry.',"I know that's a lot."]),{id:storyPhotos.mayaMugs.id,text:'',kind:'photo'},...bubbleItems(`${storyPhotos.mayaMugs.id}-DIALOGUE`,['I took this at home.','I still catch myself making tea for two.']),...bubbleItems('TA-S08-INTRO-8',scene08Cinematic[7].intro))}
   else if(n===9)items.push(...bubbleItems('TA-S08-ENDING',scene08CinematicEnding))
   else items.push(...bubbleItems(`TA-S08-INTRO-${n+2}`,scene08Cinematic[n+1].intro))
   return {...s,messages:[...s.messages,{id:player,sender:'player',recipient:'maya',channel:'messages',text:b.choices[i],at:now,delivery:'delivered'}],deliveredEvents:[...new Set([...s.deliveredEvents,player])],masterScene08:{...p,beat:n+1,draft:undefined,messages:[...p.messages,{id:player,sender:'player',text:b.choices[i],at:now}],pending:queueBubbles(items,now)}}
  }
 }
 if(a.type==='draft'&&canReply&&!p.complete&&validChoice(a.index))return put({...p,draft:a.index})
 if(a.type==='send'&&canReply&&!p.complete&&p.draft!==undefined){
  const n=p.beat,i=p.draft,b=historicalCheckInBeat(p),player=`TA-S08-C${n+1}-P-${i}`,maya=`TA-S08-C${n+1}-M-${i}`,complete=n===9
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
 if(!p||p.version!==1||p.conversationRevision!==undefined&&!['cinematic-v1','conversation-v3'].includes(p.conversationRevision)||p.pending!==undefined&&(!p.conversationRevision||!Array.isArray(p.pending)||p.pending.some(q=>!q||typeof q.id!=='string'||typeof q.text!=='string'||!Number.isFinite(q.dueAt)||q.kind!==undefined&&!['photo','capture'].includes(q.kind))||p.complete&&p.pending.length>0)||p.photoRevision!==undefined&&p.photoRevision!==1||!Number.isInteger(p.beat)||p.beat<0||p.beat>10||!Array.isArray(p.messages)||!Array.isArray(p.inspected)||p.inspected.some(x=>!captureFields.includes(x as typeof captureFields[number]))||['received','opened','imported','analysis','compared','reviewed','saved','complete'].some(k=>typeof p[k as keyof MasterScene08]!=='boolean')||p.draft!==undefined&&!validChoice(p.draft)||p.hypothesis!==undefined&&!validChoice(p.hypothesis)||p.opened&&!p.received||p.imported&&captureFields.some(x=>!p.inspected.includes(x))||p.assessment!==undefined&&(!captureAssessments.some(item=>item.id===p.assessment)||!p.saved||!p.opened||p.beat<8)||p.saved&&!p.assessment&&(!p.analysis||!p.compared||!p.reviewed||p.hypothesis===undefined)||p.complete&&p.beat!==(p.conversationRevision==='conversation-v3'?mayaCheckIn.length:10))throw Error('Invalid Scene 8 progress')
 if(p.conversationRevision==='conversation-v3'&&(!validQueue(p.pending)||p.beat>mayaCheckIn.length||p.draft!==undefined&&!mayaCheckIn[p.beat]?.choices[p.draft]||p.saved||p.imported||p.analysis||p.beat>3&&!p.opened||p.complete&&!p.opened))throw Error('Invalid Maya check-in conversation')
}
