import { continuationFacts as facts, disclosureA,disclosureB,disclosureCKnown,disclosureCNew,disclosureDrafts,eli14Entry,lucas10Entry,nora14Entry,scene10Entry,scene12Entry,scene15FinalEntry } from '../content/chapter2Continuation'
import { investigationChoices, type JournalChoice,type RecoveredId } from '../content/continuationInvestigation'
import type { StoryThread } from '../content/chapter2Reunion'
import type { GameSave } from './types'
export type InvestigationPanel='compare'|'recovery'|'cross'|'disclosure'
export interface ContinuationState {
 version:1; interpretation:'empathic'|'skeptical'|'neutral';completed:number[];startedAt:number;scene10DueAt?:number;lucasDueAt?:number;finalDueAt?:number
 panel?:InvestigationPanel;viewed:string[];journal:{id:string;text:string;refs:string[]}[];choices:Partial<Record<JournalChoice,number>>;bookmarks:string[];comparisonScope?:'all'|'lucas_only'|'none_new';recoveryBookmark?:'fragment'|'question'|'none';preview?:'a'|'b'|'c'|'d';disclosure?:'limited_group'|'private_nora'|'group_access'|'withheld';sophieStarted:boolean;recoveryNotified:boolean;finalQueued:boolean;finalDelivered:boolean;finalRead:boolean;lucasCompleted:boolean
}
export type ContinuationAction={type:'continuation-save-source';id:'lucas'|'maya'|'draft'|'index'}|{type:'continuation-messages-open'|'continuation-final-viewed'}|{type:'continuation-panel';panel?:InvestigationPanel}|{type:'continuation-inspect';id:string}|{type:'continuation-journal';choice:JournalChoice;index:number}|{type:'continuation-bookmark';scope:'all'|'lucas_only'|'none_new'|'fragment'|'question'|'none'}|{type:'continuation-help';who:'eli'|'nora'|'none'}|{type:'continuation-preview';choice?:'a'|'b'|'c'|'d'}|{type:'continuation-confirm'}
export interface StoryPort {testing?:boolean;start:(s:GameSave,thread:StoryThread,entry:string,now:number,incoming?:boolean)=>GameSave;append:(s:GameSave,thread:StoryThread,id:string,actor:string,text:string,now:number,facts?:string[])=>GameSave}
const state=(s:GameSave)=>s.chapter2Access?.story?.continuation
export function patchContinuation(s:GameSave,x:Partial<ContinuationState>):GameSave{const c=s.chapter2Access!,r=c.story!;return {...s,chapter2Access:{...c,story:{...r,revision:r.revision+1,continuation:{...r.continuation!,...x}}}}}
const mark=(s:GameSave,id:string)=>({...s,deliveredEvents:[...new Set([...s.deliveredEvents,id])]})
function notice(s:GameSave,id:string,text:string){return s.notifications.some(n=>n.id===id)?s:{...s,notifications:[...s.notifications,{id,text,read:false}]}}
const done=(s:GameSave,id:number)=>patchContinuation(mark(s,`C2S${id}_COMPLETE`),{completed:[...new Set([...state(s)!.completed,id])]})
export function continuationGuard(s:GameSave,g:string){const c=s.chapter2Access!,r=c.story!,x=r.continuation;const k=s.knowledge.characters;return g==='empathic'?x?.interpretation==='empathic':g==='skeptical'?x?.interpretation==='skeptical':g==='playful'?r.choices.S12_02==='a':g==='sophie-mirror'?k.sophie.includes(facts.mirror):g==='picture-basis'?c.viewed.includes('sophie')||c.viewed.includes('LIFE-M3')||k.sophie.includes(facts.mirror):g==='limited-group'?x?.disclosure==='limited_group':g==='group-access'?x?.disclosure==='group_access':false}
export const groupKnowsMirror=(s:GameSave)=>s.knowledge.characters.maya.includes(facts.mirror)
export function continuationEvent(s:GameSave,flag:string,_thread:StoryThread,now:number):GameSave{
 const x=state(s);if(!x)return s
 if(flag==='10-done')return notice(patchContinuation(done(s,10),{lucasDueAt:now+12000}),'C2S11_AVAILABLE','Indexed conversations available for comparison.')
 if(flag==='lucas-done')return patchContinuation(s,{lucasCompleted:true})
 if(flag==='12-done')return done(s,12)
 if(flag==='14-done')return done(s,14)
 if(flag.startsWith('15-')&&flag!=='15-final-done')return patchContinuation(s,{disclosure:flag.slice(3) as ContinuationState['disclosure'],finalDueAt:now+14000})
 if(flag==='15-final-done')return patchContinuation(s,{finalDelivered:true})
 return s
}
export function continuationNextDue(s:GameSave,testing=false){const x=state(s),r=s.chapter2Access?.story,recovery=s.chapter2Access?.recovery;if(!r?.complete)return Infinity;if(!x)return 0;const recoveryDue=x.completed.includes(12)&&recovery?.readyAt!==undefined&&!x.recoveryNotified?testing||!recovery.testOpened?0:recovery.dueAt:Infinity;return Math.min(recoveryDue,x.scene10DueAt??Infinity,x.lucasDueAt??Infinity,x.finalDueAt??Infinity)}
export function tickContinuation(s:GameSave,now:number,port:StoryPort):GameSave{
 let r=s.chapter2Access?.story;if(!r?.complete)return s
 let x=r.continuation
 if(!x){
  const pick=r.choices['S09-R1'],interpretation=pick==='a'?'empathic':pick==='b'?'skeptical':'neutral'
  const next:ContinuationState={version:1,interpretation,completed:[],startedAt:now,scene10DueAt:now+4000,viewed:[],journal:[],choices:{},bookmarks:[],sophieStarted:false,recoveryNotified:false,finalQueued:false,finalDelivered:false,finalRead:false,lucasCompleted:false}
  s={...s,chapter2Access:{...s.chapter2Access!,unknownOffline:true,story:{...r,revision:r.revision+1,continuation:next}}};return s
 }
 if(x.scene10DueAt!==undefined&&x.scene10DueAt<=now){
  s=patchContinuation(s,{scene10DueAt:undefined});r=s.chapter2Access!.story!
  if(!r.members.nora)return s
  return port.start(s,'group',scene10Entry,now,true)
 }
 if(x.lucasDueAt!==undefined&&x.lucasDueAt<=now){s=patchContinuation(s,{lucasDueAt:undefined});return port.start(s,'lucas',lucas10Entry,now,true)}
 if(x.completed.includes(12)&&recoveryAvailable(s,now,port.testing)&&!x.recoveryNotified){return notice(patchContinuation(s,{recoveryNotified:true}),'C2S13_RECOVERY_READY','Recently Deleted recovery complete. 3 partial items reconstructed. Some data unavailable.')}
 if(x.finalDueAt!==undefined&&x.finalDueAt<=now){s=patchContinuation(s,{finalDueAt:undefined,finalQueued:true});s=port.append(s,'group','C2S15_FINAL_NOTICE','maya',"There's something I need to tell you.",now);return port.start(s,'group',scene15FinalEntry,now)}
 return s
}
function journal(s:GameSave,id:string,text:string,refs:string[]=[]){const x=state(s)!;return x.journal.some(j=>j.id===id)?s:patchContinuation(s,{journal:[...x.journal,{id,text,refs}]})}
export function continuationAction(s:GameSave,a:ContinuationAction,now:number,port:StoryPort):GameSave{
 const x=state(s),c=s.chapter2Access,r=c?.story;if(!x||!c||!r)return s
 if(a.type==='continuation-final-viewed')return x.finalDelivered&&!x.finalRead&&r.active==='group'?patchContinuation(done(s,15),{finalRead:true}):s
 if(a.type==='continuation-messages-open'){
  if(x.completed.includes(11)&&!x.sophieStarted){s=patchContinuation(s,{sophieStarted:true});return port.start(s,'sophie',scene12Entry,now,true)}
  return s
 }
 if(a.type==='continuation-panel'){
  if(a.panel==='compare'&&!x.completed.includes(10)||a.panel==='recovery'&&(!x.completed.includes(12)||!recoveryAvailable(s,now,port.testing))||a.panel==='cross'&&!x.completed.includes(13)||a.panel==='disclosure'&&!x.completed.includes(14))return s
  if(x.panel==='compare'&&a.panel!=='compare'&&x.choices.C11_01!==undefined)s=done(s,11)
  s=patchContinuation(s,{panel:a.panel});const noticeId=a.panel==='compare'?'C2S11_AVAILABLE':a.panel==='recovery'?'C2S13_RECOVERY_READY':undefined;return noticeId?{...s,notifications:s.notifications.map(n=>n.id===noticeId?{...n,read:true}:n)}:s
 }
 if(a.type==='continuation-inspect'){
  if(!x.panel||x.panel!=='compare'&&!recoveryAvailable(s,now,port.testing))return s
  const legal=x.panel==='compare'?['lucas','maya','draft','index','metadata']:x.panel==='recovery'?['RD-01','RD-02','RD-03']:x.panel==='cross'?['token','token-search']:[]
  if(!legal.includes(a.id)||x.viewed.includes(a.id))return s
  s=patchContinuation(s,{viewed:[...x.viewed,a.id]})
  return mark(s,`C2S-READ-${a.id}`)
 }
 if(a.type==='continuation-save-source'){
  if(x.panel!=='compare'||!x.viewed.includes(a.id))return s
  const notes={lucas:'A recovered exchange shows a cancellation. Date and surrounding context have not been verified.',maya:"Maya's surviving messages show concern, not the reason for it.",draft:'Daniel considered calling someone, but the draft cannot identify a recipient or prove a call happened.',index:"Daniel's note directly warns against treating export order as event order. The note is also part of an unverified copy."}
  return journal(s,`SOURCE-${a.id}`,notes[a.id],[a.id])
 }
 if(a.type==='continuation-journal'){
  const opts=investigationChoices[a.choice];if(!opts||!Number.isInteger(a.index)||a.index<0||a.index>=opts.length||x.choices[a.choice]!==undefined)return s
  if(a.choice!=='C11_01'&&a.choice!=='M12_01'&&!recoveryAvailable(s,now,port.testing))return s
  const eligible=a.choice==='C11_01'?x.panel==='compare'&&['lucas','maya','draft'].every(id=>x.viewed.includes(id)):a.choice==='E14_01'?x.panel==='cross'&&x.viewed.includes('token'):a.choice==='M12_01'?x.completed.includes(12)&&(x.viewed.includes('RD-03')||c.viewed.includes('0419')):x.panel==='recovery'&&x.viewed.includes(({R13_NOTE:'RD-02',R13_PHOTO:'RD-03',R13_01:'RD-01'} as Record<string,string>)[a.choice])
  if(!eligible)return s
  s=journal(s,a.choice,opts[a.index][1]);s=patchContinuation(s,{choices:{...x.choices,[a.choice]:a.index}})
  return a.choice==='R13_01'?done(s,13):s
 }
 if(a.type==='continuation-bookmark'){
  if(x.panel==='compare'&&x.choices.C11_01!==undefined&&['all','lucas_only','none_new'].includes(a.scope)){const refs=a.scope==='all'?['group-lucas-claim','lucas','group-maya-claim','draft']:a.scope==='lucas_only'?['lucas']:[];s=patchContinuation(s,{comparisonScope:a.scope as ContinuationState['comparisonScope'],bookmarks:[...new Set([...x.bookmarks,...refs])]});return done(s,11)}
  if(x.panel==='recovery'&&x.completed.includes(13)&&['fragment','question','none'].includes(a.scope)){s=patchContinuation(s,{recoveryBookmark:a.scope as ContinuationState['recoveryBookmark']});if(a.scope==='fragment')return patchContinuation(s,{bookmarks:[...new Set([...x.bookmarks,'RD-01-with-warnings'])]});if(a.scope==='none')return s;if(a.scope==='question')return journal(s,'RD-01-QUESTION','Why does 7-14 appear verified in one state and absent in the export? Need original index history.')}
  return s
 }
 if(a.type==='continuation-help'){
  if(!recoveryAvailable(s,now,port.testing))return s
  if(!x.completed.includes(13)||x.choices.E14_01===undefined||x.completed.includes(14))return s
  if(a.who==='none')return done(journal(s,'E14-HOLD','E—I saved privately as unverified external reference.'),14)
  return port.start(patchContinuation(s,{panel:undefined}),a.who,a.who==='eli'?eli14Entry:nora14Entry,now)
 }
 if(a.type==='continuation-preview')return recoveryAvailable(s,now,port.testing)&& x.completed.includes(14)&&!x.disclosure?patchContinuation(s,{preview:a.choice}):s
 if(a.type==='continuation-confirm'){
  if(!recoveryAvailable(s,now,port.testing)||!x.preview||!x.completed.includes(14)||x.disclosure)return s
  const pick=x.preview,thread=pick==='b'?'nora':'group'
  s=patchContinuation(s,{preview:undefined,panel:undefined})
  if(pick==='d')return patchContinuation(journal(s,'D15-HOLD','I am withholding an unverified reconstructed record until I know whether sharing it would help more than harm.'),{disclosure:'withheld',finalDueAt:now+14000})
  const known=groupKnowsMirror(s),text=pick==='c'?known?disclosureDrafts.cKnown:disclosureDrafts.c:disclosureDrafts[pick]
  const exposed=pick==='c'?[facts.mirror,facts.unverified]:[facts.discrepancy,facts.unverified]
  s=port.append(s,thread,`C2S15_PLAYER_${pick}`,'player',text,now,exposed)
  s=patchContinuation(s,{disclosure:pick==='a'?'limited_group':pick==='b'?'private_nora':'group_access'})
  return port.start(s,thread,pick==='a'?disclosureA:pick==='b'?disclosureB:known?disclosureCKnown:disclosureCNew,now)
 }
 return s
}
export function validateContinuation(value:unknown){
 if(value===undefined)return
 const fail=()=>{throw Error('Invalid Chapter 2 continuation state')}
 if(!value||typeof value!=='object'||Array.isArray(value))return fail()
 const x=value as ContinuationState
 if(x.version!==1||!['empathic','skeptical','neutral'].includes(x.interpretation)||!Number.isFinite(x.startedAt)||!Array.isArray(x.completed)||x.completed.some(n=>![10,11,12,13,14,15].includes(n))||new Set(x.completed).size!==x.completed.length)return fail()
 for(const [current,previous]of [[11,10],[12,11],[13,12],[14,13],[15,14]])if(x.completed.includes(current)&&!x.completed.includes(previous))return fail()
 if(x.finalRead&&(!x.finalDelivered||!x.finalQueued||!x.completed.includes(15))||x.finalDelivered&&!x.finalQueued||x.completed.includes(15)&&!x.finalRead||x.panel==='compare'&&!x.completed.includes(10)||x.panel==='recovery'&&!x.completed.includes(12)||x.panel==='cross'&&!x.completed.includes(13)||x.panel==='disclosure'&&!x.completed.includes(14))return fail()
 if(x.comparisonScope!==undefined&&!['all','lucas_only','none_new'].includes(x.comparisonScope)||x.recoveryBookmark!==undefined&&!['fragment','question','none'].includes(x.recoveryBookmark))return fail()
 for(const key of ['scene10DueAt','lucasDueAt','finalDueAt'] as const)if(x[key]!==undefined&&!Number.isFinite(x[key]))return fail()
 for(const key of ['sophieStarted','recoveryNotified','finalQueued','finalDelivered','finalRead','lucasCompleted'] as const)if(typeof x[key]!=='boolean')return fail()
 if(x.panel!==undefined&&!['compare','recovery','cross','disclosure'].includes(x.panel)||x.preview!==undefined&&!['a','b','c','d'].includes(x.preview)||x.disclosure!==undefined&&!['limited_group','private_nora','group_access','withheld'].includes(x.disclosure))return fail()
 if(!Array.isArray(x.viewed)||x.viewed.some(v=>typeof v!=='string')||!Array.isArray(x.bookmarks)||x.bookmarks.some(v=>typeof v!=='string')||!Array.isArray(x.journal)||x.journal.some(j=>typeof j.id!=='string'||typeof j.text!=='string'||!Array.isArray(j.refs)||j.refs.some(v=>typeof v!=='string'))||new Set(x.journal.map(j=>j.id)).size!==x.journal.length||!x.choices||typeof x.choices!=='object')return fail()
 for(const [key,index]of Object.entries(x.choices)){const options=investigationChoices[key as JournalChoice];if(!options||!Number.isInteger(index)||index<0||index>=options.length)return fail()}
}
export function recoveryAvailable(s:GameSave,now:number,testing=false){const recovery=s.chapter2Access?.recovery;return !!recovery&&recovery.readyAt!==undefined&&(now>=recovery.dueAt||testing&&recovery.testOpened===true)}
export function recoveredViewAllowed(s:GameSave,id:RecoveredId){const x=state(s);return !!x?.completed.includes(12)&&s.chapter2Access?.recovery?.readyAt!==undefined&&['RD-01','RD-02','RD-03'].includes(id)}
