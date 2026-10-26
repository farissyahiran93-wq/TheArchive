import { sourceAction, sourcePut } from './sourceInvestigation'
import type { GameSave } from './types'
import type { Scene01Node } from '../content/scene01'
import { scene06Entrances, scene06Local, scene06Nodes } from '../content/scene06Final'
import { enterScene01, pauseScene03 } from './scene01'
export type DeskThread='desk'|'sophie'|'maya'|'group'
type Checkpoint={nodeId:string;draft?:{nodeId:string;choiceId:string};paused?:{id:string;remainingMs:number;typing:boolean};complete?:boolean}
type Line={id:string;sender:'desk'|'maya'|'player';text:string;at:number}
export interface CorrectionsDeskState {
 version:1;entered:true;complete:boolean;visible:boolean;panel:'home'|'register'|'scope'|'inbox'|'form';flags:string[];cards:string[];choices:Record<string,string>;scroll:Record<string,number>;feedback?:string;
 reply?:{id:'EV-S06-DESK-REPLY-001';requestId:'R-GB-VH-001';text:string[];at:number};
 prior?:{id:'R-GB-VH-001';choice:'a'|'b'|'c';text:string};replyDelivered:boolean;replyRead:boolean;
 inquiry:{status:'not_sent'|'draft'|'failed'|'delivered';choice?:string;text?:string;reviewed?:boolean;receipt?:{id:'R-GB-CD-002';text:string;at:number}};
 conclusion?:{version_authenticated:false;article_body_changed:'unknown';author_equals_editor:'unknown';index_validated:false;choice:string};
 followupStatus?:'referral_requested'|'byline_question_sent'|'acknowledgment_sent';
 reading?:DeskThread;threads:Partial<Record<DeskThread,Checkpoint>>;inbox:Line[];receipts:{eventId:string;recipient:string;factIds:string[]}[];
}
export const deskPut=(s:GameSave,p:Partial<CorrectionsDeskState>):GameSave=>s.chapter1?.correctionsDesk?{...s,chapter1:{...s.chapter1,correctionsDesk:{...s.chapter1.correctionsDesk,...p}}}:s
export const deskReady=(s:GameSave)=>{const p=s.chapter1?.correctionsDesk;return !!p&&['register-read','scope-read','claim','provenance','byline'].every(f=>p.flags.includes(f))&&p.cards.length===3}
export function deskEligible(s:GameSave,t:DeskThread){
 const scene=s.prologue?.scene01,p=s.chapter1?.correctionsDesk
 if(!p||!scene)return false
 if(t==='desk')return p.replyDelivered
 if(t==='sophie')return scene.introduced&&!!scene.privateScene03?.complete
 // This final route has no authorized two-way Maya DM. Historical structural DMs are separate.
 if(t==='maya')return false
 return scene.invitation==='joined'&&(['sophie','maya'] as const).some(a=>scene.groupMembers?.[a]===true)
}
export function pauseDesk(s:GameSave,now:number):GameSave {
 const p=s.chapter1?.correctionsDesk,scene=s.prologue?.scene01
 if(!p?.reading||!scene)return s
 const q=scene.queue[0],checkpoint={...p.threads[p.reading],nodeId:scene.nodeId,draft:scene.draft,paused:q?{id:q.id,remainingMs:Math.max(0,q.dueAt-now),typing:q.typing}:undefined}
 s=deskPut(s,{reading:undefined,threads:{...p.threads,[p.reading]:checkpoint}})
 return {...s,prologue:{...s.prologue!,scene01:{...scene,queue:[],draft:undefined}}}
}
export function openDeskThread(s:GameSave,t:DeskThread,now:number):GameSave {
 const p=s.chapter1?.correctionsDesk
 if(!p||p.reading===t||!deskEligible(s,t))return s
 s=pauseScene03(s,now)
 const c=s.chapter1!.correctionsDesk!,cp=c.threads[t]
 s=deskPut(s,{reading:cp?.complete?undefined:t,replyRead:t==='desk'?true:c.replyRead,panel:t==='desk'?'inbox':c.panel})
 if(t==='desk')s={...s,notifications:s.notifications.map(n=>n.id==='EV-S06-DESK-REPLY-001'?{...n,read:true}:n)}
 if(cp?.complete)return s
 const id=cp?.nodeId??(scene06Entrances as Record<string,string>)[t==='desk'?`desk_${c.prior!.choice}`:t]
 s={...s,prologue:{...s.prologue!,scene01:{...s.prologue!.scene01!,nodeId:id,queue:[],draft:cp?.draft}}}
 if(cp?.paused)return {...s,prologue:{...s.prologue!,scene01:{...s.prologue!.scene01!,queue:[{id:cp.paused.id,dueAt:now+cp.paused.remainingMs,typing:cp.paused.typing}]}}}
 return enterScene01(s,id,now)
}
export function deskEnd(s:GameSave,node:Extract<Scene01Node,{kind:'event'}>):GameSave {
 const p=s.chapter1!.correctionsDesk!,scene=s.prologue!.scene01!,t=p.reading!
 s=deskPut(s,{reading:undefined,threads:{...p.threads,[t]:{nodeId:node.id,complete:true}}})
 return {...s,prologue:{...s.prologue!,scene01:{...scene,queue:[],draft:undefined,groupPresence:{...scene.groupPresence,sophie:false,maya:false,lucas:false}}}}
}
export function deskIncoming(s:GameSave,node:Extract<Scene01Node,{kind:'npc'}>,now:number):GameSave {
 const p=s.chapter1!.correctionsDesk!,t=p.reading!,facts=node.heardFacts??[]
 s=deskPut(s,{receipts:[...p.receipts,{eventId:node.id,recipient:'player',factIds:facts}],...(['desk','maya'].includes(t)?{inbox:[...p.inbox,{id:node.id,sender:t as 'desk'|'maya',text:node.text,at:now}]}:{})})
 if(node.id==='OPEN-S06-SOPHIE-OPEN-1')s={...s,deliveredEvents:[...new Set([...s.deliveredEvents,'EV-S06-SOPHIE-OPEN'])]}
 return s
}
export function deskSend(s:GameSave,choiceId:string,now:number):GameSave {
 const p=s.chapter1?.correctionsDesk,scene=s.prologue?.scene01
 if(!p?.reading||!scene||scene.queue.length||!deskEligible(s,p.reading))return s
 const node=scene06Nodes[scene.nodeId]
 if(node?.kind!=='choice'||scene.draft?.nodeId!==node.id||scene.draft.choiceId!==choiceId)return s
 const choice=node.choices.find(o=>o.id===choiceId),id=node.id+'-PLAYER-'+choiceId
 if(!choice||s.deliveredEvents.includes(id))return s
 const t=p.reading,recipients=t==='group'?(['sophie','maya'] as const).filter(a=>scene.groupMembers?.[a]===true):[t]
 const facts=[id+':claim'],characters={...s.knowledge.characters}
 for(const a of recipients)if(a==='sophie'||a==='maya')characters[a]=[...new Set([...characters[a],...facts])]
 s=deskPut(s,{choices:{...p.choices,[node.id.replace('OPEN-','')]:choiceId},receipts:[...p.receipts,...recipients.map(recipient=>({eventId:id,recipient,factIds:facts}))],...(['desk','maya'].includes(t)?{inbox:[...p.inbox,{id,sender:'player',text:choice.text,at:now}]}:{})})
 if(t==='desk')s=deskPut(s,{followupStatus:choiceId==='a'?'referral_requested':choiceId==='b'?'byline_question_sent':'acknowledgment_sent'})
 s={...s,deliveredEvents:[...s.deliveredEvents,id,...(t==='desk'?['EV-S06-DESK-FOLLOWUP-001']:t==='group'?['EV-S06-GROUP-SENT']:[])],knowledge:{...s.knowledge,characters},messages:[...s.messages,...recipients.filter((a):a is 'sophie'|'maya'=>a==='sophie'||a==='maya').map(recipient=>({id:id+'-TO-'+recipient,sender:'player' as const,recipient,channel:'messages' as const,text:choice.text,at:now,delivery:'delivered' as const,disclosedFactIds:facts}))],prologue:{...s.prologue!,scene01:{...scene,draft:undefined,...(t==='sophie'?{messages:[...scene.messages,{id,sender:'player',text:choice.text,at:now}]}:t==='group'?{groupMessages:[...scene.groupMessages,{id,sender:'player',text:choice.text,at:now}]}:{})}}}
 return enterScene01(s,choice.next,now)
}
export type DeskAction={type:'enter'|'back'|'archive'|'read'|'review'|'send-request'|'save-draft'|'cancel'|'request-failed'|'next-lead'}|{type:'panel';panel:CorrectionsDeskState['panel']}|{type:'local';id:keyof typeof scene06Local;choice:string}|{type:'card';id:'article'|'index'|'register'}|{type:'thread';thread:DeskThread}|{type:'scroll';key:string;value:number}
export function correctionsDeskAction(s:GameSave,a:DeskAction,now=Date.now()):GameSave {
 if(a.type==='enter'){
  if(s.prologue?.scene01?.scriptRevision!=='final-2026-10-23'||!s.chapter1?.versionHistory?.complete||s.chapter2Access)return s
  s=pauseScene03(s,now)
  if(!s.chapter1!.correctionsDesk){
   const q=s.chapter1!.versionHistory!.inquiry,prior=q.status==='delivered'&&q.receipt?.id==='R-GB-VH-001'&&['a','b','c'].includes(q.choice??'')?{id:'R-GB-VH-001' as const,choice:q.choice as 'a'|'b'|'c',text:q.receipt.text}:undefined
   s={...s,chapter1:{...s.chapter1!,correctionsDesk:{version:1,entered:true,visible:true,complete:false,panel:'home',flags:[],cards:[],choices:{},scroll:{},prior,replyDelivered:false,replyRead:false,inquiry:{status:'not_sent'},threads:{},inbox:[],receipts:[]}}}
   if(prior)s={...s,pendingEvents:[...s.pendingEvents,{id:'CH1-S06-DESK-REPLY',dueAt:now+1600}]}
  }
  s=sourcePut(sourcePut(sourcePut(sourcePut(s,7,{visible:false}),8,{visible:false}),9,{visible:false}),10,{visible:false})
  return deskPut(s,{visible:true})
 }
 const p=s.chapter1?.correctionsDesk
 if(!p)return s
 if(a.type==='thread')return openDeskThread(s,a.thread,now)
 if(a.type==='scroll')return Number.isFinite(a.value)&&a.value>=0?deskPut(s,{scroll:{...p.scroll,[a.key]:a.value}}):s
 if(a.type==='archive')return deskPut(pauseScene03(s,now),{visible:false})
 if(a.type==='back')return deskPut(pauseScene03(s,now),{panel:'home'})
 if(a.type==='panel')return a.panel==='inbox'?openDeskThread(s,'desk',now):deskPut(pauseScene03(s,now),{panel:a.panel,flags:[...new Set([...p.flags,a.panel+'-opened'])],feedback:undefined})
 if(a.type==='read'){
  if(!['register','scope'].includes(p.panel))return s
  s=deskPut(s,{flags:[...new Set([...p.flags,p.panel+'-read'])]})
  return {...s,knowledge:{...s.knowledge,player:[...new Set([...s.knowledge.player,(p.panel==='register'?'GB-CORR-REGISTER-001':'GB-CORR-SCOPE-001')+':read'])]}}
 }
 if(a.type==='card')return !p.flags.includes('claim')?s:deskPut(s,{cards:[...new Set([...p.cards,a.id])]})
 if(a.type==='local'){
  const opt=scene06Local[a.id].find(o=>o.id===a.choice)
  if(!opt||a.id==='S06-C02'&&!p.flags.includes('register-read')||a.id==='S06-C03'&&!['scope-read','register-read'].every(f=>p.flags.includes(f))||a.id==='S06-C04'&&(p.cards.length!==3||!p.flags.includes('claim'))||a.id==='S06-C07'&&!p.flags.includes('provenance')||a.id==='S06-C14'&&(!deskReady(s)||p.complete)||a.id==='S06-C06'&&(p.prior||p.inquiry.receipt||p.panel!=='form'))return s
  if(a.id==='S06-C06')return deskPut(s,{inquiry:{status:'draft',choice:a.choice,text:opt.text},feedback:undefined})
  const pass=({'S06-C03':'b','S06-C04':'c','S06-C07':'a'} as Record<string,string>)[a.id]
  if(pass&&pass!==a.choice)return deskPut(s,{feedback:opt.feedback})
  const flag=({'S06-C03':'claim','S06-C04':'provenance','S06-C07':'byline'} as Record<string,string>)[a.id]
  s=deskPut(s,{choices:{...p.choices,[a.id]:a.choice},feedback:a.id==='S06-C01'&&a.choice==='b'&&!p.prior?'Only a local draft or no request exists.':opt.feedback,flags:flag?[...new Set([...p.flags,flag])]:p.flags})
  if(a.id==='S06-C14'){
   const evidence={...s.evidence}
   for(const id of ['NOTE-S06-DESK-LIMITS','EV-S06-PUBLIC-REGISTER-OBSERVED','EV-S06-BYLINE-LIMIT-001'])if(!evidence[id])evidence[id]={id,collectedAt:now,verified:false,source:`PLAYER_PRIVATE / PUBLISHER_PUBLIC_CLAIM / GB-CORR-REGISTER-001 + GB-CORR-SCOPE-001 / revision NOT AUTHENTICATED; index NOT VALIDATED; body change and editor UNKNOWN / ${opt.text}`}
   s={...s,evidence,chapter1:{...s.chapter1!,completed:[...new Set([...s.chapter1!.completed,6])]}}
   return deskPut(s,{complete:true,conclusion:{version_authenticated:false,article_body_changed:'unknown',author_equals_editor:'unknown',index_validated:false,choice:opt.text}})
  }return s
 }
 if(a.type==='next-lead')return p.complete?sourceAction(s,7,{type:'enter'},now):s
 if(a.type==='review')return p.inquiry.text&&!p.inquiry.receipt?deskPut(s,{inquiry:{...p.inquiry,reviewed:true},feedback:'Only this public question will be sent. A delivery receipt is not a reply and does not verify a revision.'}):s
 if(a.type==='send-request'){
  if(p.prior||p.panel!=='form'||!p.inquiry.reviewed||!p.inquiry.text||p.inquiry.receipt)return s
  s=deskPut(s,{inquiry:{...p.inquiry,status:'delivered',receipt:{id:'R-GB-CD-002',text:p.inquiry.text,at:now}},feedback:'Request delivered. Reply not yet received.'})
  return {...s,deliveredEvents:[...new Set([...s.deliveredEvents,'R-GB-CD-002','EV-S06-INQUIRY-DELIVERED'])]}
 }
 if(['save-draft','cancel','request-failed'].includes(a.type)&&!p.inquiry.receipt)return deskPut(s,{inquiry:{...p.inquiry,status:p.inquiry.text?a.type==='request-failed'?'failed':'draft':'not_sent'},panel:a.type==='request-failed'?'form':'home',feedback:a.type==='request-failed'?'Could not deliver. Your draft is safe.':'Draft stored locally. Nothing sent.'})
 return s
}
/** Reuses the Chapter 1 saved-event clock; delivery never opens the inbox. */
export function deskTick(s:GameSave,now:number):GameSave {
 const p=s.chapter1?.correctionsDesk,q=s.pendingEvents.find(e=>e.id==='CH1-S06-DESK-REPLY')
 if(!q||q.dueAt>now||!p?.prior||p.replyDelivered)return s
 const text:string[]=[];let id:string=scene06Entrances[`desk_${p.prior.choice}`]
 for(let i=0;i<60;i++){const node=scene06Nodes[id];if(!node||node.kind==='choice')break;if(node.kind==='npc')text.push(node.text);if(!('next'in node)||!node.next)break;id=node.next}
 const eventId='EV-S06-DESK-REPLY-001'
 s=deskPut(s,{replyDelivered:true,reply:{id:eventId,requestId:p.prior.id,text,at:now}})
 return {...s,pendingEvents:s.pendingEvents.filter(e=>e.id!==q.id),deliveredEvents:[...new Set([...s.deliveredEvents,eventId])],notifications:[...s.notifications,{id:eventId,text:'Greyhaven Bulletin — Corrections Desk: Re: your article question',read:false}]}
}
export function validateCorrectionsDesk(v:unknown):void {
 if(v===undefined)return
 if(!v||typeof v!=='object')throw Error('Invalid Scene 06 state')
 const p=v as CorrectionsDeskState
 if(p.version!==1||p.entered!==true||typeof p.visible!=='boolean'||typeof p.complete!=='boolean'||!['home','register','scope','inbox','form'].includes(p.panel)||!Array.isArray(p.flags)||p.flags.some(f=>typeof f!=='string')||!Array.isArray(p.cards)||p.cards.some(c=>!['article','index','register'].includes(c))||new Set(p.cards).size!==p.cards.length||!p.choices||!p.scroll||Object.values(p.scroll).some(n=>!Number.isFinite(n)||n<0)||!p.inquiry||!['not_sent','draft','failed','delivered'].includes(p.inquiry.status)||p.inquiry.text!==undefined&&!scene06Local['S06-C06'].some(o=>o.id===p.inquiry.choice&&o.text===p.inquiry.text)||p.inquiry.status==='delivered'&&(!p.inquiry.receipt||p.inquiry.receipt.id!=='R-GB-CD-002'||p.inquiry.receipt.text!==p.inquiry.text||!Number.isFinite(p.inquiry.receipt.at))||p.inquiry.status!=='delivered'&&p.inquiry.receipt!==undefined||typeof p.replyDelivered!=='boolean'||typeof p.replyRead!=='boolean'||p.replyDelivered&&!p.prior||p.prior&&(p.prior.id!=='R-GB-VH-001'||!['a','b','c'].includes(p.prior.choice)||typeof p.prior.text!=='string')||!p.threads||Object.values(p.threads).some(c=>!scene06Nodes[c.nodeId]||c.paused&&(!scene06Nodes[c.paused.id]||!Number.isFinite(c.paused.remainingMs)||c.paused.remainingMs<0))||!Array.isArray(p.inbox)||!Array.isArray(p.receipts)||p.complete&&(!p.choices['S06-C14']||!['register-read','scope-read','claim','provenance','byline'].every(f=>p.flags.includes(f))||p.cards.length!==3))throw Error('Invalid Scene 06 state')
}
