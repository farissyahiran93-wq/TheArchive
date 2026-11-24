import { callEnding, callTurns, legacyCallTurns, exportHypotheses, sophieFollowup, sophiePrivacyIntro, sophiePrivacyChoices, sophiePrivacyReplies, sophiePrivacyFinal } from '../content/masterScene07'
import { ver1CallTurns, ver1CallEnding } from '../content/masterScene07Ver1'
import { contactAssessments } from '../content/masterSceneAssessments'
import { advanceSophieChat, afterSophieCall, beginSophieChat, resumeHistoricalSophieChat, validateSophieChat, type SophieScene07Chat } from './sophieScene07Chat'
import type { GameSave } from './types'
import { npcDeliveryDelay } from './npcDelivery'
type Line={id:string;sender:'sophie'|'player';text:string;at:number}
type PrivacyPending={id:string;text:string;dueAt:number;remaining:{id:string;text:string}[];after:'choice'|'complete'}
export type SophiePrivacy={stage:'intro'|'choice'|'reply'|'complete';draft?:number;messages:Line[];pending?:PrivacyPending}
export interface MasterScene07 {version:1;conversationRevision?:'audio-v2'|'starred-v2'|'conversation-v3';chat?:SophieScene07Chat;fragmentAnalysedAt?:number;exportStatus?:'accepted'|'deferred';transferRevision?:'manual-v1';transferred?:boolean;transferredAt?:number;phase:'chat'|'ringing'|'missed'|'playing'|'waiting'|'attachment'|'complete';clip:number;playbackSeconds?:number;draft?:number;lines:Line[];privacy?:SophiePrivacy;questioned:boolean;questionDraft?:number;opened:boolean;metadata:boolean;entry:boolean;star:boolean;imported:boolean;analysis:boolean;hypothesis?:number;assessment?:typeof contactAssessments[number]['id'];saved:boolean;shareDraft?:number;shareReviewed:boolean;shareSent:boolean;shareDeclined:boolean}
export type MasterScene07Action={type:'start'|'answer'|'decline'|'clip-ended'|'send'|'send-question'|'request-export'|'open'|'transfer'|'review-share'|'send-share'|'decline-share'|'finish'|'begin-privacy'|'privacy-send'|'chat-send'|'analyse-fragment'|'resume-chat'|'tick'}|{type:'draft'|'question-draft'|'share-draft'|'record-legacy-conclusion'|'privacy-draft'|'chat-draft';index:number}|{type:'record-assessment';id:string}|{type:'playback-checkpoint';clip:number;seconds:number}
export const hasTransferredScene07Export=(p:MasterScene07|undefined):boolean => !!p && (!!p.transferred || p.transferRevision === undefined && p.opened)
const choice=(n:number)=>Number.isInteger(n)&&n>=0&&n<3
function privacyQueue(texts:readonly string[],prefix:string,now:number,after:'choice'|'complete'):PrivacyPending{
 const [text,...rest]=texts
 return {id:`${prefix}-1`,text,dueAt:now+npcDeliveryDelay('sophie',text,0),remaining:rest.map((line,i)=>({id:`${prefix}-${i+2}`,text:line})),after}
}
function beginPrivacy(save:GameSave,p:MasterScene07,now:number):GameSave{
 if(p.privacy)return {...save,masterScene07:p}
 return {...save,masterScene07:{...p,privacy:{stage:'intro',messages:[],pending:privacyQueue(sophiePrivacyIntro,'TA-S07-PRIVACY-INTRO',now,'choice')}}}
}
function completeScene07(save:GameSave,p:MasterScene07,now:number):GameSave{
 const scene=save.prologue?.scene01
 const leadId='TA-S07-SCENE08-LEAD',relayId='TA-S07-MAYA-SOPHIE'
 if(scene&&!save.deliveredEvents.includes(leadId)){
  const maya='I found an earlier check-in from Daniel. Could you ask them to look at it when they are ready?',sophie='Maya found an earlier check-in from Daniel. She can show you when you are ready.'
  save={...save,
   messages:[...save.messages,{id:relayId,sender:'maya',recipient:'sophie',channel:'messages',text:maya,at:now,delivery:'delivered'},{id:leadId,sender:'sophie',channel:'messages',text:sophie,at:now,delivery:'delivered'}],
   knowledge:{...save.knowledge,characters:{...save.knowledge.characters,sophie:[...new Set([...save.knowledge.characters.sophie,relayId])]}},
   prologue:{...save.prologue!,scene01:{...scene,messages:[...scene.messages,{id:leadId,sender:'sophie',text:sophie,at:now}]}},
   deliveredEvents:[...new Set([...save.deliveredEvents,relayId,leadId])],
  }
 }
 return {...save,deliveredEvents:[...new Set([...save.deliveredEvents,'TA-S07-COMPLETE','TA-S07-SCENE08-UNLOCKED'])],masterScene07:{...p,phase:'complete'}}
}
export function masterScene07Action(s:GameSave,a:MasterScene07Action,now=Date.now()):GameSave{
 let p=s.masterScene07
 if(a.type==='start'){
  const six=s.masterScene06
  if(p||!six?.complete||!six.recovered||!six.saved||!s.masterScene05?.recovered||s.masterScene05.packageStatus!=='installed'||!['TA-S06-SOPHIE-EXPORT','TA-S06-COMPLETE'].every(id=>s.deliveredEvents.includes(id)))return s
  return {...s,masterScene07:{version:1,conversationRevision:'conversation-v3',chat:beginSophieChat(s,now),transferRevision:'manual-v1',phase:'chat',clip:0,lines:[],questioned:false,opened:false,metadata:false,entry:false,star:false,imported:false,analysis:false,saved:false,shareReviewed:false,shareSent:false,shareDeclined:false}}
 }
 if(!p)return s
 if(a.type==='resume-chat')return resumeHistoricalSophieChat(s,p,now)
 if(p.chat&&!(p.chat.stage==='call'&&['answer','decline','playback-checkpoint','clip-ended','draft','send'].includes(a.type)))return advanceSophieChat(s,p,a,now)
 const acceptedAudio=p.conversationRevision==='starred-v2'||p.conversationRevision==='conversation-v3'
 const put=(x:MasterScene07):GameSave=>({...s,masterScene07:x})
 if(a.type==='begin-privacy'&&p.phase==='attachment'&&p.saved&&!p.privacy&&p.conversationRevision==='starred-v2')return beginPrivacy(s,p,now)
 if(a.type==='tick'&&p.privacy?.pending&&p.privacy.pending.dueAt<=now){
  const privacy=p.privacy,pending=privacy.pending!,[next,...remaining]=pending.remaining
  const message:Line={id:pending.id,sender:'sophie',text:pending.text,at:now}
  const messages=privacy.messages.some(line=>line.id===message.id)?privacy.messages:[...privacy.messages,message]
  const state={...privacy,messages,pending:next?{...pending,...next,dueAt:now+npcDeliveryDelay('sophie',next.text,messages.length),remaining}:undefined,stage:next?privacy.stage:pending.after} as SophiePrivacy
  const delivered=s.deliveredEvents.includes(message.id)?s:{...s,messages:[...s.messages,{...message,channel:'messages' as const,delivery:'delivered' as const}],deliveredEvents:[...s.deliveredEvents,message.id]}
  return !next&&pending.after==='complete'?completeScene07(delivered,{...p,privacy:state},now):{...delivered,masterScene07:{...p,privacy:state}}
 }
 if(a.type==='privacy-draft'&&p.phase==='attachment'&&p.privacy?.stage==='choice'&&!p.privacy.pending&&choice(a.index))return put({...p,privacy:{...p.privacy,draft:a.index}})
 if(a.type==='privacy-send'&&p.phase==='attachment'&&p.privacy?.stage==='choice'&&!p.privacy.pending&&p.privacy.draft!==undefined){
  const index=p.privacy.draft,id=`TA-S07-PRIVACY-P-${index}`,text=sophiePrivacyChoices[index],message:Line={id,sender:'player',text,at:now}
  return {...s,messages:[...s.messages,{...message,recipient:'sophie',channel:'messages',delivery:'delivered'}],deliveredEvents:[...new Set([...s.deliveredEvents,id])],masterScene07:{...p,privacy:{...p.privacy,stage:'reply',draft:undefined,messages:[...p.privacy.messages,message],pending:privacyQueue([...sophiePrivacyReplies[index],sophiePrivacyFinal],`TA-S07-PRIVACY-R-${index}`,now,'complete')}}}
 }
 if(a.type==='playback-checkpoint'&&p.phase==='playing'&&a.clip===p.clip&&Number.isFinite(a.seconds)&&a.seconds>=0&&a.seconds<=3600){const seconds=Math.round(a.seconds*10)/10;return seconds===(p.playbackSeconds??0)?s:put({...p,playbackSeconds:seconds})}
 if(a.type==='decline'&&p.phase==='ringing')return put({...p,phase:'missed'})
 if(a.type==='answer'&&(p.phase==='ringing'||p.phase==='missed'))return put({...p,phase:'playing'})
 if(a.type==='clip-ended'&&p.phase==='playing'){
  const clip=p.clip,id=`TA-S07-CALL-S${clip+1}`,text=acceptedAudio?(clip<10?ver1CallTurns[clip].sophie:ver1CallEnding):(clip<10?callTurns[clip].sophie:callEnding)
  const lines=p.lines.some(l=>l.id===id)?p.lines:[...p.lines,{id,sender:'sophie' as const,text,at:now}]
  if(clip===10){
   const historyId='TA-S07-CALL-HISTORY',scene=s.prologue?.scene01
   if(!s.deliveredEvents.includes(historyId))s={...s,deliveredEvents:[...s.deliveredEvents,historyId],...(scene?{prologue:{...s.prologue!,scene01:{...scene,messages:[...scene.messages,{id:historyId,sender:'sophie' as const,text:'Voice call with Sophie',at:now}]}}}:{} )}
   if(p.chat)return {...s,masterScene07:afterSophieCall({...p,playbackSeconds:undefined,lines},now)}
   if(p.conversationRevision==='starred-v2')return {...s,deliveredEvents:[...new Set([...s.deliveredEvents,...(p.exportStatus==='accepted'?['TA-S07-EXPORT-RECEIVED']:[])])],masterScene07:{...p,playbackSeconds:undefined,lines,questioned:true,phase:'attachment'}};return {...s,messages:[...s.messages,{id:'TA-S07-PERSONAL-QUESTION',sender:'sophie',channel:'messages',text:sophieFollowup.question,at:now,delivery:'delivered'}],deliveredEvents:[...new Set([...s.deliveredEvents,'TA-S07-EXPORT-RECEIVED','TA-S07-PERSONAL-QUESTION'])],masterScene07:{...p,playbackSeconds:undefined,lines,phase:'attachment'}}}
  return put({...p,playbackSeconds:undefined,lines,phase:'waiting'})
 }
 if(a.type==='draft'&&p.phase==='waiting'&&choice(a.index))return put({...p,draft:a.index})
 if(a.type==='send'&&p.phase==='waiting'&&p.draft!==undefined&&p.clip<10){
  const clip=p.clip,i=p.draft,id=`TA-S07-C${clip+1}-P-${i}`,text=(acceptedAudio?ver1CallTurns:p.conversationRevision==='audio-v2'?callTurns:legacyCallTurns)[clip].choices[i]
  const disclosed=acceptedAudio?[]:clip===5&&i===0?['TA-S07-OTHER-CONTACT-DISCLOSED']:clip===5&&i===1?['TA-S07-UNKNOWN-CONTACT-DISCLOSED']:[]
  if(disclosed.length)s={...s,knowledge:{...s.knowledge,characters:{...s.knowledge.characters,sophie:[...new Set([...s.knowledge.characters.sophie,...disclosed])]}}}
  return {...s,messages:[...s.messages,{id,sender:'player',recipient:'sophie',text,at:now,delivery:'delivered',disclosedFactIds:disclosed}],deliveredEvents:[...new Set([...s.deliveredEvents,id])],masterScene07:{...p,...(acceptedAudio&&clip===9?{exportStatus:i===2?'deferred' as const:'accepted' as const}:{}),clip:clip+1,playbackSeconds:undefined,phase:'playing',draft:undefined,lines:[...p.lines,{id,sender:'player',text,at:now}]}}
 }
 if(a.type==='question-draft'&&p.phase==='attachment'&&!p.questioned&&choice(a.index))return put({...p,questionDraft:a.index})
 if(a.type==='send-question'&&p.phase==='attachment'&&!p.questioned&&p.questionDraft!==undefined){
  const i=p.questionDraft,id=`TA-S07-PERSONAL-REPLY-${i}`,text=sophieFollowup.choices[i],reply=sophieFollowup.replies[i]
  return {...s,messages:[...s.messages,{id,sender:'player',recipient:'sophie',channel:'messages',text,at:now,delivery:'delivered',disclosedFactIds:['TA-S07-NO-DANIEL-RELATIONSHIP']},{id:'TA-S07-PERSONAL-REPLY-SOPHIE',sender:'sophie',channel:'messages',text:reply,at:now,delivery:'delivered'}],knowledge:{...s.knowledge,characters:{...s.knowledge.characters,sophie:[...new Set([...s.knowledge.characters.sophie,'TA-S07-NO-DANIEL-RELATIONSHIP'])]}},deliveredEvents:[...new Set([...s.deliveredEvents,id,'TA-S07-PERSONAL-REPLY-SOPHIE'])],masterScene07:{...p,questioned:true,lines:[...p.lines,{id,sender:'player',text,at:now},{id:'TA-S07-PERSONAL-REPLY-SOPHIE',sender:'sophie',text:reply,at:now}]}}
 }
 if(a.type==='request-export'&&p.phase==='attachment'&&p.exportStatus==='deferred')return {...s,deliveredEvents:[...new Set([...s.deliveredEvents,'TA-S07-EXPORT-RECEIVED'])],masterScene07:{...p,exportStatus:'accepted'}}
 if(a.type==='open'&&['attachment','complete'].includes(p.phase)&&(p.conversationRevision!=='starred-v2'||p.exportStatus==='accepted')&&!p.opened)return put({...p,opened:true,transferRevision:p.transferRevision??'manual-v1'})
 if(a.type==='transfer'&&['attachment','complete'].includes(p.phase)&&p.opened&&(p.conversationRevision!=='starred-v2'||p.exportStatus==='accepted')&&!hasTransferredScene07Export(p))return put({...p,transferRevision:'manual-v1',transferred:true,transferredAt:now})
 if(a.type==='record-assessment'&&p.phase==='attachment'&&p.conversationRevision==='starred-v2'&&p.exportStatus==='accepted'&&p.questioned&&p.opened&&!p.saved){
  const assessment=contactAssessments.find(item=>item.id===a.id)
  if(!assessment)return s
  return beginPrivacy({...s,evidence:{...s.evidence,'TA-EX-STARRED-ENTRY':{id:'TA-EX-STARRED-ENTRY',source:`Sophie’s shared-family-folder copy; original unverified. ${assessment.finding}`,collectedAt:now,verified:false}}},{...p,assessment:assessment.id,saved:true},now)
 }
 if(a.type==='record-legacy-conclusion'&&p.conversationRevision!=='starred-v2'&&p.phase==='attachment'&&p.opened&&p.questioned&&!p.saved&&choice(a.index)){
  return completeScene07({...s,evidence:{...s.evidence,'TA-EX-STARRED-ENTRY':{id:'TA-EX-STARRED-ENTRY',source:`Sophie shared-family-folder copy; original and star attribution unverified; private hypothesis: ${exportHypotheses[a.index]}`,collectedAt:now,verified:false}}},{...p,hypothesis:a.index,saved:true},now)
 }
 if(a.type==='finish'&&p.phase==='attachment'&&p.questioned&&p.saved&&p.conversationRevision!=='starred-v2')return completeScene07(s,p,now)
 return s
}
export function validateMasterScene07(value:unknown):void{
 if(value===undefined)return
 const p=value as MasterScene07
 if(p?.privacy){
  const q=p.privacy
  if(!['intro','choice','reply','complete'].includes(q.stage)||!Array.isArray(q.messages)||q.messages.some(m=>!m||typeof m.id!=='string'||!['sophie','player'].includes(m.sender)||typeof m.text!=='string'||!Number.isFinite(m.at))||new Set(q.messages.map(m=>m.id)).size!==q.messages.length||q.draft!==undefined&&(!choice(q.draft)||q.stage!=='choice')||!p.saved||q.stage==='complete'&&p.phase!=='complete'||q.stage!=='complete'&&p.phase!=='attachment'||['intro','reply'].includes(q.stage)!==!!q.pending||q.pending!==undefined&&(!q.pending||typeof q.pending.id!=='string'||typeof q.pending.text!=='string'||!Number.isFinite(q.pending.dueAt)||!['choice','complete'].includes(q.pending.after)||!Array.isArray(q.pending.remaining)||q.pending.remaining.some(x=>!x||typeof x.id!=='string'||typeof x.text!=='string')))throw Error('Invalid Scene 7 privacy conversation')
 }
 if(!p||!validateSophieChat(p)||p.fragmentAnalysedAt!==undefined&&(!p.opened||!Number.isFinite(p.fragmentAnalysedAt))||p.phase==='chat'&&!p.chat||p.version!==1||!['chat','ringing','missed','playing','waiting','attachment','complete'].includes(p.phase)||!Number.isInteger(p.clip)||p.clip<0||p.clip>10||!Array.isArray(p.lines)||p.transferRevision!==undefined&&p.transferRevision!=='manual-v1'||p.transferred!==undefined&&typeof p.transferred!=='boolean'||p.transferredAt!==undefined&&(!Number.isFinite(p.transferredAt)||!p.transferred)||p.transferred&&(!p.opened||p.transferRevision!=='manual-v1')||p.playbackSeconds!==undefined&&(!Number.isFinite(p.playbackSeconds)||p.playbackSeconds<0||p.playbackSeconds>3600||p.phase!=='playing')||['questioned','opened','metadata','entry','star','imported','analysis','saved','shareReviewed','shareSent','shareDeclined'].some(k=>typeof p[k as keyof MasterScene07]!=='boolean')||p.draft!==undefined&&!choice(p.draft)||p.questionDraft!==undefined&&!choice(p.questionDraft)||p.hypothesis!==undefined&&!choice(p.hypothesis)||p.shareDraft!==undefined&&!choice(p.shareDraft)||p.assessment!==undefined&&(!contactAssessments.some(item=>item.id===p.assessment)||!p.saved||!p.opened||!p.questioned||p.conversationRevision!=='starred-v2'||p.exportStatus!=='accepted')||p.saved&&!p.assessment&&(p.hypothesis===undefined||!p.analysis&&(!p.opened||!p.questioned||p.conversationRevision==='starred-v2'))||p.phase==='complete'&&p.chat?.stage!=='done'&&(!p.saved||!p.questioned)||p.shareSent&&!p.shareReviewed)throw Error('Invalid Scene 7 progress')
}
