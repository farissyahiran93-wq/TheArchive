import { callEnding, callTurns, legacyCallTurns, exportHypotheses, exportShares, sophieFollowup } from '../content/masterScene07'
import { ver1CallTurns, ver1CallEnding } from '../content/masterScene07Ver1'
import type { GameSave } from './types'
type Line={id:string;sender:'sophie'|'player';text:string;at:number}
export interface MasterScene07 {version:1;conversationRevision?:'audio-v2'|'starred-v2';exportStatus?:'accepted'|'deferred';phase:'ringing'|'missed'|'playing'|'waiting'|'attachment'|'complete';clip:number;draft?:number;lines:Line[];questioned:boolean;questionDraft?:number;opened:boolean;metadata:boolean;entry:boolean;star:boolean;imported:boolean;analysis:boolean;hypothesis?:number;saved:boolean;shareDraft?:number;shareReviewed:boolean;shareSent:boolean;shareDeclined:boolean}
export type MasterScene07Action={type:'start'|'answer'|'decline'|'clip-ended'|'send'|'send-question'|'request-export'|'open'|'metadata'|'entry'|'star'|'import'|'analyse'|'save'|'review-share'|'send-share'|'decline-share'|'finish'}|{type:'draft'|'question-draft'|'hypothesis'|'share-draft';index:number}
const choice=(n:number)=>Number.isInteger(n)&&n>=0&&n<3
export function masterScene07Action(s:GameSave,a:MasterScene07Action,now=Date.now()):GameSave{
 let p=s.masterScene07
 if(a.type==='start'){
  if(p||!s.masterScene06?.complete||!s.masterScene06.recovered||!s.masterScene06.saved||!s.masterScene06.reportSent||!s.masterScene05?.recovered||s.masterScene05.packageStatus!=='installed'||!['TA-S06-SOPHIE-EXPORT','TA-S06-REPORT-SENT','TA-S06-COMPLETE'].every(id=>s.deliveredEvents.includes(id)))return s
  return {...s,masterScene07:{version:1,conversationRevision:'starred-v2',phase:'ringing',clip:0,lines:[],questioned:false,opened:false,metadata:false,entry:false,star:false,imported:false,analysis:false,saved:false,shareReviewed:false,shareSent:false,shareDeclined:false}}
 }
 if(!p)return s
 const put=(x:MasterScene07):GameSave=>({...s,masterScene07:x})
 if(a.type==='decline'&&p.phase==='ringing')return put({...p,phase:'missed'})
 if(a.type==='answer'&&(p.phase==='ringing'||p.phase==='missed'))return put({...p,phase:'playing'})
 if(a.type==='clip-ended'&&p.phase==='playing'){
  const clip=p.clip,id=`TA-S07-CALL-S${clip+1}`,text=p.conversationRevision==='starred-v2'?(clip<10?ver1CallTurns[clip].sophie:ver1CallEnding):(clip<10?callTurns[clip].sophie:callEnding)
  const lines=p.lines.some(l=>l.id===id)?p.lines:[...p.lines,{id,sender:'sophie' as const,text,at:now}]
  if(clip===10){if(p.conversationRevision==='starred-v2')return {...s,deliveredEvents:[...new Set([...s.deliveredEvents,...(p.exportStatus==='accepted'?['TA-S07-EXPORT-RECEIVED']:[])])],masterScene07:{...p,lines,questioned:true,phase:'attachment'}};return {...s,messages:[...s.messages,{id:'TA-S07-PERSONAL-QUESTION',sender:'sophie',channel:'messages',text:sophieFollowup.question,at:now,delivery:'delivered'}],deliveredEvents:[...new Set([...s.deliveredEvents,'TA-S07-EXPORT-RECEIVED','TA-S07-PERSONAL-QUESTION'])],masterScene07:{...p,lines,phase:'attachment'}}}
  return put({...p,lines,phase:'waiting'})
 }
 if(a.type==='draft'&&p.phase==='waiting'&&choice(a.index))return put({...p,draft:a.index})
 if(a.type==='send'&&p.phase==='waiting'&&p.draft!==undefined&&p.clip<10){
  const clip=p.clip,i=p.draft,id=`TA-S07-C${clip+1}-P-${i}`,text=(p.conversationRevision==='starred-v2'?ver1CallTurns:p.conversationRevision==='audio-v2'?callTurns:legacyCallTurns)[clip].choices[i]
  const disclosed=p.conversationRevision==='starred-v2'?[]:clip===5&&i===0?['TA-S07-OTHER-CONTACT-DISCLOSED']:clip===5&&i===1?['TA-S07-UNKNOWN-CONTACT-DISCLOSED']:[]
  if(disclosed.length)s={...s,knowledge:{...s.knowledge,characters:{...s.knowledge.characters,sophie:[...new Set([...s.knowledge.characters.sophie,...disclosed])]}}}
  return {...s,messages:[...s.messages,{id,sender:'player',recipient:'sophie',text,at:now,delivery:'delivered',disclosedFactIds:disclosed}],deliveredEvents:[...new Set([...s.deliveredEvents,id])],masterScene07:{...p,...(p.conversationRevision==='starred-v2'&&clip===9?{exportStatus:i===2?'deferred' as const:'accepted' as const}:{}),clip:clip+1,phase:'playing',draft:undefined,lines:[...p.lines,{id,sender:'player',text,at:now}]}}
 }
 if(a.type==='question-draft'&&p.phase==='attachment'&&!p.questioned&&choice(a.index))return put({...p,questionDraft:a.index})
 if(a.type==='send-question'&&p.phase==='attachment'&&!p.questioned&&p.questionDraft!==undefined){
  const i=p.questionDraft,id=`TA-S07-PERSONAL-REPLY-${i}`,text=sophieFollowup.choices[i],reply=sophieFollowup.replies[i]
  return {...s,messages:[...s.messages,{id,sender:'player',recipient:'sophie',channel:'messages',text,at:now,delivery:'delivered',disclosedFactIds:['TA-S07-NO-DANIEL-RELATIONSHIP']},{id:'TA-S07-PERSONAL-REPLY-SOPHIE',sender:'sophie',channel:'messages',text:reply,at:now,delivery:'delivered'}],knowledge:{...s.knowledge,characters:{...s.knowledge.characters,sophie:[...new Set([...s.knowledge.characters.sophie,'TA-S07-NO-DANIEL-RELATIONSHIP'])]}},deliveredEvents:[...new Set([...s.deliveredEvents,id,'TA-S07-PERSONAL-REPLY-SOPHIE'])],masterScene07:{...p,questioned:true,lines:[...p.lines,{id,sender:'player',text,at:now},{id:'TA-S07-PERSONAL-REPLY-SOPHIE',sender:'sophie',text:reply,at:now}]}}
 }
 if(a.type==='request-export'&&p.phase==='attachment'&&p.exportStatus==='deferred')return {...s,deliveredEvents:[...new Set([...s.deliveredEvents,'TA-S07-EXPORT-RECEIVED'])],masterScene07:{...p,exportStatus:'accepted'}}
 if(a.type==='open'&&p.phase==='attachment'&&(p.conversationRevision!=='starred-v2'||p.exportStatus==='accepted'))return put({...p,opened:true})
 if(a.type==='metadata'&&p.opened)return put({...p,metadata:true})
 if(a.type==='entry'&&p.opened)return put({...p,entry:true})
 if(a.type==='star'&&p.entry)return put({...p,star:true})
 if(a.type==='import'&&p.opened&&p.metadata&&p.star)return put({...p,imported:true})
 if(a.type==='analyse'&&p.imported)return put({...p,analysis:true})
 if(a.type==='hypothesis'&&p.analysis&&choice(a.index)&&!p.saved)return put({...p,hypothesis:a.index})
 if(a.type==='save'&&p.analysis&&p.hypothesis!==undefined&&!p.saved)return {...s,evidence:{...s.evidence,'TA-EX-STARRED-ENTRY':{id:'TA-EX-STARRED-ENTRY',source:`Sophie shared-family-folder copy; original and star attribution unverified; private hypothesis: ${exportHypotheses[p.hypothesis]}`,collectedAt:now,verified:false}},masterScene07:{...p,saved:true}}
 if(a.type==='share-draft'&&p.saved&&!p.shareSent&&choice(a.index))return put({...p,shareDraft:a.index,shareReviewed:false,shareDeclined:false})
 if(a.type==='review-share'&&p.saved&&p.shareDraft!==undefined&&!p.shareSent)return put({...p,shareReviewed:true})
 if(a.type==='decline-share'&&p.saved&&!p.shareSent)return put({...p,shareDeclined:true,shareReviewed:false,shareDraft:undefined})
 if(a.type==='send-share'&&p.saved&&p.shareReviewed&&p.shareDraft!==undefined&&!p.shareSent&&s.prologue?.scene01){
  const id='TA-S07-GROUP-SHARE',text=exportShares[p.shareDraft],scene=s.prologue.scene01,recipients=(['sophie','maya'] as const).filter(who=>scene.groupMembers?.[who]!==false)
  const characters={...s.knowledge.characters};for(const who of recipients)characters[who]=[...new Set([...characters[who],id])]
  return {...s,knowledge:{...s.knowledge,characters},messages:[...s.messages,...recipients.map(recipient=>({id:`${id}-${recipient}`,sender:'player' as const,recipient,channel:'messages' as const,text,at:now,delivery:'delivered' as const,disclosedFactIds:[id]}))],deliveredEvents:[...new Set([...s.deliveredEvents,id])],prologue:{...s.prologue,scene01:{...scene,groupMessages:[...scene.groupMessages,{id,sender:'player',text,at:now}]}},masterScene07:{...p,shareSent:true}}
 }
 if(a.type==='finish'&&p.phase==='attachment'&&p.questioned&&p.saved&&p.metadata&&p.entry&&p.star&&p.analysis){
  const scene=s.prologue?.scene01
  if(scene){const maya='I found an earlier check-in from Daniel. Could you ask them to look at it when they are ready?',sophie='Maya found an earlier check-in from Daniel. She can show you when you are ready.';s={...s,messages:[...s.messages,{id:'TA-S07-MAYA-SOPHIE',sender:'maya',recipient:'sophie',channel:'messages',text:maya,at:now,delivery:'delivered'},{id:'TA-S07-SCENE08-LEAD',sender:'sophie',channel:'messages',text:sophie,at:now,delivery:'delivered'}],knowledge:{...s.knowledge,characters:{...s.knowledge.characters,sophie:[...new Set([...s.knowledge.characters.sophie,'TA-S07-MAYA-SOPHIE'])]}},prologue:{...s.prologue!,scene01:{...scene,messages:[...scene.messages,{id:'TA-S07-SCENE08-LEAD',sender:'sophie',text:sophie,at:now}]}},deliveredEvents:[...new Set([...s.deliveredEvents,'TA-S07-MAYA-SOPHIE','TA-S07-SCENE08-LEAD'])]}}
  return {...s,deliveredEvents:[...new Set([...s.deliveredEvents,'TA-S07-COMPLETE','TA-S07-SCENE08-UNLOCKED'])],masterScene07:{...p,phase:'complete'}}
 }
 return s
}
export function validateMasterScene07(value:unknown):void{
 if(value===undefined)return
 const p=value as MasterScene07
 if(!p||p.version!==1||!['ringing','missed','playing','waiting','attachment','complete'].includes(p.phase)||!Number.isInteger(p.clip)||p.clip<0||p.clip>10||!Array.isArray(p.lines)||['questioned','opened','metadata','entry','star','imported','analysis','saved','shareReviewed','shareSent','shareDeclined'].some(k=>typeof p[k as keyof MasterScene07]!=='boolean')||p.draft!==undefined&&!choice(p.draft)||p.questionDraft!==undefined&&!choice(p.questionDraft)||p.hypothesis!==undefined&&!choice(p.hypothesis)||p.shareDraft!==undefined&&!choice(p.shareDraft)||p.saved&&(!p.analysis||p.hypothesis===undefined)||p.phase==='complete'&&(!p.saved||!p.questioned)||p.shareSent&&!p.shareReviewed)throw Error('Invalid Scene 7 progress')
}
