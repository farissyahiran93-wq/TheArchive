import { revisedScene0607Nodes, revisedNoraEntrances, revisedSourceSocial, revisedNoraQuestions } from '../content/scene0607Revision'
import { scene10Action,scene10Required,scene10Tiles,scene10Matches,scene10Passes,scene10LocalEligible,scene10Prepared } from './scene10Config'
import { scene09Required, scene09Tiles, scene09PrivateBoundary, scene09LocalEligible } from './scene09Config'
import type { GameSave } from './types'
import type { Scene01Choice, Scene01Node } from '../content/scene01'
import { sourceInvestigations, sourceInvestigationNodes } from '../content/sourceInvestigations'
import { enterScene01, pauseScene03 } from './scene01'

export type SourceScene=7|8|9|10
export type SourceThread='professional'|'civic'|'sophie'|'group'
type Checkpoint={nodeId:string;draft?:{nodeId:string;choiceId:string};paused?:{id:string;remainingMs:number;typing:boolean};complete?:boolean}
export interface SourceInvestigationState {
 version:1;flowRevision?:'2026-10-31';visible:boolean;complete:boolean;panel:string;flags:string[];inspections:string[];choices:Record<string,string>;scroll:Record<string,number>;feedback?:string;
 reading?:SourceThread;threads:Partial<Record<SourceThread,Checkpoint>>;privateConsent:boolean;
 descriptorReference?:{code:'GH-DSC-03-A';source:'GH-BOX-INDEX-EXTRACT-001';bodyObserved:false};finalDraft?:string;matches?:string[];searches?:string[];lastQuery?:string;
 inventoryObservation?:{public_box_extract_observed:true;descriptor_code_observed:true;descriptor_body_observed:false;public_original_notice_observed:false;GB_REF_017_item_link_verified:false;GB_REF_017_box_link_verified:false;GB_REF_017_descriptor_link_verified:false;specific_notice_issuer_verified:false;article_body_revision_verified:false;catalogue_deletion_verified:false;suspect_identified:false;Daniel_fate_known:false;source_attribution:string[]};
 entry?:{from:8|9;finalChoice:'S08-C16'|'S09-C18';manual:true;at:number};
 inquiry:{status:'not_sent'|'draft'|'failed'|'delivered';choice?:string;text?:string;reviewed?:boolean;receipt?:{id:string;text:string;at:number;route:string;returnToken?:string;scope?:{seriesContext:boolean;publisherLabel:boolean;boxReference?:boolean;descriptorReference?:boolean;extractReference?:boolean;attachments:[]}}};
 reply?:{id:string;text:string[];at:number};replyRead:boolean;
 inbox:{id:string;sender:'professional'|'civic'|'player';thread?:SourceThread;text:string;at:number}[];
 receipts:{eventId:string;recipient:string;factIds:string[];text?:string}[];
 seriesObservation?:{public_listed_series_transfer:true;source_ref:string[];specific_notice_identified:false;GB_REF_017_series_match:false;GB_REF_017_transfer_verified:false;verified_issuer:false;verified_article_revision:false};
 conclusion?:{stance:string;notice_exists:'unknown';verified:false;authenticated_notice:false;authenticated_revision:false;original_text_available:false;issuer_identified:false;custodian_identified:false;transfer_established:false;transfer_verified:false;article_body_revision_verified:false;culprit_identified:false;Daniel_fate_known:false;nora_editor_identified:false;crime_or_culprit_established:false};
}
const sourceKey=(n:SourceScene)=>n===7?'byline':n===8?'issuer':n===9?'transferRegister':'inventorySheet'
export const sourcePrefix=(n:SourceScene)=>`S${String(n).padStart(2,'0')}`
export const sourceNumber=(id:string):SourceScene=>Number(id.match(/^OPEN-S(\d{2})-/)?.[1]) as SourceScene
export const sourceFormChoice=(n:SourceScene)=>n===10?12:n===9?11:8
export const sourceFinalChoice=(n:SourceScene)=>n===7?15:n===8?16:n===9?18:20
const followupChoice=(n:SourceScene)=>n===10?13:n===9?12:9
export const sourceState=(s:GameSave,n:SourceScene)=>s.chapter1?.[sourceKey(n)]
export const visibleSource=(s:GameSave):SourceScene|undefined=>s.chapter1?.inventorySheet?.visible?10:s.chapter1?.transferRegister?.visible?9:s.chapter1?.issuer?.visible?8:s.chapter1?.byline?.visible?7:undefined
export const readingSource=(s:GameSave):SourceScene|undefined=>s.chapter1?.inventorySheet?.reading?10:s.chapter1?.transferRegister?.reading?9:s.chapter1?.issuer?.reading?8:s.chapter1?.byline?.reading?7:undefined
export const sourcePut=(s:GameSave,n:SourceScene,p:Partial<SourceInvestigationState>):GameSave=>sourceState(s,n)?{...s,chapter1:{...s.chapter1!,[sourceKey(n)]:{...sourceState(s,n)!,...p}}}:s
const ident=(n:SourceScene,i:number)=>`${sourcePrefix(n)}-C${String(i).padStart(2,'0')}`
export const sourceReceipt=(n:SourceScene)=>n===7?'R-GB-NV-001':n===8?'R-GH-PN-001':n===9?'R-GH-TR-001':'R-GH-INV-001'
export const sourceReplyEvent=(n:SourceScene)=>n===7?'EV-S07-NORA-PRO-REPLY-001':n===8?'EV-S08-CIVIC-ROUTE-REPLY-001':n===9?'EV-S09-SERIES-DESK-REPLY-001':'EV-S10-CATALOGUE-DESK-REPLY-001'
const route=(n:SourceScene)=>n===7?'GB-NV-CHANNEL-001':n===8?'GH-PN-ROUTE':n===9?'browser://greyhaven/civic-records/requests/series-enquiry':'browser://greyhaven/civic-records/requests/catalogue-description'
const role=(n:SourceScene):SourceThread=>n===7?'professional':'civic'
export function sourceReady(s:GameSave,n:SourceScene){
 const p=sourceState(s,n);if(!p)return false
 const required=n===10?scene10Required:n===9?scene09Required:n===7?['article-read','profile-read','note-read','reference-read','catalogue-read','pass-2','pass-3','pass-5','pass-6','pass-13']:['directory-read','index-read','guide-read','pass-2','pass-3','pass-4','pass-6','pass-7','pass-10']
 return required.every(f=>p.flags.includes(f))
}
export function sourceEligible(s:GameSave,n:SourceScene,t:SourceThread){
 const p=sourceState(s,n),scene=s.prologue?.scene01;if(!p||!scene)return false
 if(t==='sophie')return scene.introduced&&!!scene.privateScene03?.complete&&(n===10?p.flags.includes('box-index-read')&&p.flags.includes('reference-read'):n===9?p.flags.includes('register-read'):n!==7||p.flags.includes(p.flowRevision==='2026-10-31'?'article-read':'note-read'))
 if(t==='group')return (n===10?p.flags.includes('box-index-read')&&p.flags.includes('reference-read'):n===9?p.flags.includes('register-read')&&p.flags.includes('finding-aid-read'):p.flags.includes(n===7?(p.flowRevision==='2026-10-31'?'article-read':'note-read'):'directory-read'))&&scene.invitation==='joined'&&(['sophie','maya'] as const).some(a=>scene.groupMembers?.[a]===true)
 if(t===role(n))return !!p.reply
 return (n===8||n===9||n===10)&&t==='professional'&&(n===10?p.flags.includes('box-index-read')&&p.flags.includes('reference-read'):n===9?p.flags.includes('register-read')&&p.flags.includes('finding-aid-read'):p.flags.includes('directory-read'))&&s.chapter1?.byline?.inquiry.receipt?.id==='R-GB-NV-001'&&!!s.chapter1.byline.reply&&s.chapter1.byline.replyRead&&s.chapter1.byline.flags.includes('pass-3')
}
export const sourceAskFirst=(s:GameSave)=>s.chapter1?.correctionsDesk?.choices['S06-C09']==='c'&&!!s.chapter1.correctionsDesk.receipts.find(r=>r.recipient==='sophie'&&r.eventId==='OPEN-S06-C09-PLAYER-c')
export function pauseSource(s:GameSave,n:SourceScene,now:number):GameSave{
 const p=sourceState(s,n),scene=s.prologue?.scene01;if(!p?.reading||!scene)return s
 const q=scene.queue[0];s=sourcePut(s,n,{reading:undefined,threads:{...p.threads,[p.reading]:{...p.threads[p.reading],nodeId:scene.nodeId,draft:scene.draft,paused:q?{id:q.id,remainingMs:Math.max(0,q.dueAt-now),typing:q.typing}:undefined}}})
 return {...s,prologue:{...s.prologue!,scene01:{...scene,queue:[],draft:undefined}}}
}
export function openSourceThread(s:GameSave,n:SourceScene,t:SourceThread,now:number):GameSave{
 const p=sourceState(s,n);if(!p||p.reading===t||!sourceEligible(s,n,t))return s
 s=pauseScene03(s,now);const current=sourceState(s,n)!,cp=current.threads[t]
 const entrances=sourceInvestigations[n].entrances as Record<string,string>
 const id=cp?.nodeId??(n===7&&p.flowRevision==='2026-10-31'&&(t!=='professional'||revisedNoraQuestions.includes(current.inquiry.text??''))?(t==='professional'?revisedNoraEntrances['abc'.indexOf(current.inquiry.choice??'')]:revisedSourceSocial[t as 'sophie'|'group']):entrances[t===role(n)?`${t}_${current.inquiry.choice}`:t])
 if(!id)return s
 s=sourcePut(s,n,{visible:true,reading:cp?.complete?undefined:t,panel:t==='professional'||t==='civic'?t:current.panel})
 if(t===role(n))s={...s,notifications:s.notifications.map(r=>r.id===sourceReplyEvent(n)?{...r,read:true}:r)}
 if(cp?.complete)return s
 s={...s,prologue:{...s.prologue!,scene01:{...s.prologue!.scene01!,nodeId:id,queue:[],draft:cp?.draft}}}
 if(cp?.paused)return {...s,prologue:{...s.prologue!,scene01:{...s.prologue!.scene01!,queue:[{id:cp.paused.id,dueAt:now+cp.paused.remainingMs,typing:cp.paused.typing}]}}}
 return enterScene01(s,id,now)
}
export function sourceEnd(s:GameSave,node:Extract<Scene01Node,{kind:'event'}>):GameSave{
 const n=sourceNumber(node.id),p=sourceState(s,n)!,scene=s.prologue!.scene01!,t=p.reading!
 s=sourcePut(s,n,{reading:undefined,threads:{...p.threads,[t]:{nodeId:node.id,complete:true}}})
 return {...s,prologue:{...s.prologue!,scene01:{...scene,queue:[],draft:undefined,groupPresence:{...scene.groupPresence,sophie:false,maya:false,lucas:false}}}}
}
export function sourceNpcText(s:GameSave,node:Extract<Scene01Node,{kind:'npc'}>):string{
 const n:SourceScene=sourceNumber(node.id),p=sourceState(s,n)!,t=p.reading!
 if(n===10){
  if(node.id==='OPEN-S10-C16-A-1'&&!p.privateConsent)return 'I asked you not to make this a case update tonight.'
  if(node.id==='OPEN-S10-C16-A-2'&&!p.privateConsent)return "I know you meant well. I just can't do it right now."
  if(t==='group'&&node.sender==='sophie'&&sourceAskFirst(s)){
   if(node.id.includes('GROUP-C17-A-'))return 'Could you please ask before posting more case material?'
   if(node.id.includes('GROUP-C17-B-'))return "I didn't agree to an update here."
   if(node.id.includes('GROUP-C18-B-'))return 'Please leave me out of the detailed requests for now.'
  }
 }
 if(n===9){if(node.id==='OPEN-S09-C15-A-1'&&scene09PrivateBoundary(s))return "I didn't say I wanted a case update right now.";if(t==='group'&&node.sender==='sophie'&&sourceAskFirst(s)){if(p.choices['S09-C16']==='a')return "I wish you'd checked before posting another case detail here.";if(p.choices['S09-C16']==='b')return "Can we talk about this only after you've asked me?"}}
 const text=n===7&&node.id.includes('AFTER-11-2')&&p.choices['S07-C10']!=='a'?'Thanks for talking to me.':t==='group'&&node.sender==='sophie'&&sourceAskFirst(s)&&((n===7&&p.choices['S07-C12']==='a')||(n===8&&['a','b'].includes(p.choices['S08-C15'])))?(n===7?'Could you ask before dropping the case details in here? Please.':p.choices['S08-C15']==='a'?'Please ask before dropping case details in here.':'Could we not do this without checking with me?'):node.text
 return text
}
export function sourceIncoming(s:GameSave,node:Extract<Scene01Node,{kind:'npc'}>,now:number):GameSave{
 const n:SourceScene=sourceNumber(node.id),p=sourceState(s,n)!,t=p.reading!,facts=node.heardFacts??[]
 const text=sourceNpcText(s,node)
 s=sourcePut(s,n,{receipts:[...p.receipts,{eventId:node.id,recipient:'player',factIds:facts}],...(t==='professional'||t==='civic'?{inbox:[...p.inbox,{id:node.id,sender:t,thread:t,text,at:now}]}:{}),...(n===7&&node.id==='OPEN-S07-C10-A-2'?{privateConsent:true}:{}),...(t===role(n)&&(node.next===`OPEN-${sourcePrefix(n)}-C${String(followupChoice(n)).padStart(2,'0')}`||node.next==='OPEN-S07-REV-NORA-FOCUS')?{replyRead:true}:{})})
 if(n===7&&node.id==='OPEN-S07-SOPHIE-OPEN-1')s={...s,deliveredEvents:[...new Set([...s.deliveredEvents,'EV-S07-SOPHIE-OPEN'])]}
 return s
}
export function sourceChoices(s:GameSave,node:Extract<Scene01Node,{kind:'choice'}>):Scene01Choice[]{
 const n=sourceNumber(node.id),p=sourceState(s,n);if(!p?.reading)return []
 if(n===7&&p.flowRevision==='2026-10-31'&&node.id.startsWith('OPEN-S07-REV-')){
  if(node.id==='OPEN-S07-REV-GROUP')return node.choices.filter(o=>o.id==='a'?p.flags.includes('article-read'):o.id==='b'?p.complete||p.receipts.some(r=>r.eventId==='OPEN-S07-REV-NORA-FOCUS-B-2'&&r.recipient==='player'):p.flags.includes('profile-read')).map(o=>o.id==='c'&&p.inquiry.receipt?{...o,text:'I contacted Nora through her professional channel.'}:o)
  return node.choices.map(o=>node.id==='OPEN-S07-REV-GROUP'&&o.id==='c'&&p.inquiry.receipt?{...o,text:'I contacted Nora through her professional channel.'}:o)
 }
 const set=(sourceInvestigations[n].choices as Record<string,{mode:string}>)[node.id.replace('OPEN-','')]
 if(set?.mode!==p.reading)return []
 if(node.id===`OPEN-${sourcePrefix(n)}-C${String(followupChoice(n)).padStart(2,'0')}`&&!p.replyRead)return []
 return node.choices.map(o=>o.withoutConsent&&!p.privateConsent?{...o,...o.withoutConsent}:o)
}
export function sourceSend(s:GameSave,choiceId:string,now:number):GameSave{
 const scene=s.prologue?.scene01;if(!scene)return s
 const n:SourceScene=sourceNumber(scene.nodeId),p=sourceState(s,n),node=sourceInvestigationNodes[scene.nodeId]??revisedScene0607Nodes[scene.nodeId]
 if(!p?.reading||scene.queue.length||node?.kind!=='choice'||scene.draft?.nodeId!==node.id||scene.draft.choiceId!==choiceId||!sourceEligible(s,n,p.reading))return s
 const choice=sourceChoices(s,node).find(o=>o.id===choiceId),id=node.id+'-PLAYER-'+choiceId;if(!choice||s.deliveredEvents.includes(id))return s
 const t=p.reading,recipients=t==='group'?(n===7&&p.flowRevision==='2026-10-31'?(['sophie','maya','lucas'] as const):(['sophie','maya'] as const)).filter(a=>scene.groupMembers?.[a]===true):[t==='professional'?'nora':t==='civic'?route(n):'sophie']
 const facts=[id+':claim'],characters={...s.knowledge.characters}
 for(const a of recipients)if(a==='sophie'||a==='maya'||a==='nora'||a==='lucas')characters[a]=[...new Set([...characters[a],...facts])]
 s=sourcePut(s,n,{choices:{...p.choices,[node.id.replace('OPEN-','')]:choiceId},receipts:[...p.receipts,...recipients.map(recipient=>({eventId:id,recipient,factIds:facts,text:choice.text}))],...(t==='professional'||t==='civic'?{inbox:[...p.inbox,{id,sender:'player',thread:t,text:choice.text,at:now}]}:{})})
 const relationships={...s.relationships}
 if(t==='group'&&recipients.includes('sophie')&&sourceAskFirst(s)&&(n===7&&choiceId==='a'||(n===8||n===9)&&choiceId!=='c'||n===10&&(node.id==='OPEN-S10-C17'&&choiceId!=='c'||node.id==='OPEN-S10-C18'&&choiceId==='b')))relationships.sophie={...relationships.sophie,trust:Math.max(0,relationships.sophie.trust-1)}
 if(n===10&&node.id==='OPEN-S10-C16'&&choiceId==='a')relationships.sophie={...relationships.sophie,trust:Math.max(0,Math.min(100,relationships.sophie.trust+(p.privateConsent?1:-1)))}
 if(n===9&&node.id==='OPEN-S09-C15'&&choiceId==='a')relationships.sophie={...relationships.sophie,trust:Math.max(0,Math.min(100,relationships.sophie.trust+(scene09PrivateBoundary(s)?-1:1)))}
 if(n===7&&t==='professional'){
  const delta=choiceId==='a'?{trust:1}:choiceId==='b'?{suspicion:1}:{trust:1,affinity:1}
  relationships.nora={...relationships.nora,...Object.fromEntries(Object.entries(delta).map(([k,v])=>[k,Math.min(100,relationships.nora[k as 'trust']+v)]))}
 }
 const alias=t==='group'?`EV-${sourcePrefix(n)}-GROUP-SENT`:t==='sophie'?`EV-${sourcePrefix(n)}-SOPHIE-SENT`:t==='civic'?(n===10?'EV-S10-CATALOGUE-DESK-FOLLOWUP-001':n===9?'EV-S09-SERIES-DESK-FOLLOWUP-001':'EV-S08-CIVIC-FOLLOWUP-001'):n===7?'EV-S07-NORA-FOLLOWUP-SENT':`EV-${sourcePrefix(n)}-NORA-SENT`
 s={...s,relationships,deliveredEvents:[...new Set([...s.deliveredEvents,id,alias])],knowledge:{...s.knowledge,characters},messages:[...s.messages,...recipients.filter((a):a is 'sophie'|'maya'|'lucas'=>a==='sophie'||a==='maya'||a==='lucas').map(recipient=>({id:id+'-TO-'+recipient,sender:'player' as const,recipient,channel:'messages' as const,text:choice.text,at:now,delivery:'delivered' as const,disclosedFactIds:facts}))],prologue:{...s.prologue!,scene01:{...scene,draft:undefined,...(t==='sophie'?{messages:[...scene.messages,{id,sender:'player',text:choice.text,at:now}]}:t==='group'?{groupMessages:[...scene.groupMessages,{id,sender:'player',text:choice.text,at:now}]}:{})}}}
 return enterScene01(s,choice.next,now)
}
export type SourceAction={type:'enter'|'back'|'archive'|'review'|'send-request'|'cancel'|'save-draft'|'request-failed'|'next-lead'|'save-source-question'|'pending-professional'}|{type:'panel';panel:string}|{type:'read';page:string}|{type:'inspect';id:string}|{type:'local';id:string;choice:string}|{type:'thread';thread:SourceThread}|{type:'scroll';key:string;value:number}|{type:'query';term:string}|{type:'match';from:string;to:string}|{type:'unmatch';from?:string}|{type:'stance-draft';choice:string}
const passes:Record<SourceScene,Record<number,string>>={7:{2:'a',3:'b',5:'c',6:'b',13:'a'},8:{2:'b',3:'a',4:'c',6:'b',7:'c',10:'b'},9:{2:'b',3:'a',4:'c',5:'b',6:'c',7:'a',8:'b',9:'c',17:'a'},10:scene10Passes}
export function sourceLocalEligible(s:GameSave,n:SourceScene,i:number){
 if(n===10)return scene10LocalEligible(s,i)
 if(n===9)return scene09LocalEligible(s,i)
 const p=sourceState(s,n);if(!p)return false;const has=(f:string)=>p.flags.includes(f)
 if(i===1)return true
 if(n===7&&i===8&&p.flowRevision==='2026-10-31')return has('profile-read')
 if(i===sourceFinalChoice(n))return sourceReady(s,n)&&!p.complete
 if(n===7)return i===2||i===3?has('article-read')&&has('profile-read'):i===4||i===7||i===8?has('note-read')&&has('pass-3'):i===5||i===6?has('reference-read'):i===13?has('catalogue-read'):i===14?has('pass-13'):false
 return i===2?has('directory-read'):i===3?['issuer','custodian','routing'].every(k=>p.inspections.includes(k)):i===4||i===5?has('index-read'):i===6||i===7?has('guide-read'):i===8?has('directory-read')&&has('index-read')&&has('pass-6'):i===10||i===11?has('pass-7')&&has('pass-4')&&has('pass-3'):false
}
export function sourceAction(s:GameSave,n:SourceScene,a:SourceAction,now=Date.now()):GameSave{
 if(a.type==='enter'){
  if(s.prologue?.scene01?.scriptRevision!=='final-2026-10-23'||s.chapter2Access||!(n===10?s.chapter1?.transferRegister?.complete&&sourceReady(s,9)&&s.chapter1.transferRegister.choices['S09-C18']&&s.deliveredEvents.includes('EV-S09-TRANSFER-LIMIT-001')&&s.chapter1.completed.includes(9):n===9?s.chapter1?.byline?.complete&&s.chapter1.byline.choices['S07-C15']&&s.deliveredEvents.includes('EV-S07-BYLINE-LIMIT-001')&&s.chapter1?.issuer?.complete&&s.chapter1.issuer.choices['S08-C16']&&s.deliveredEvents.includes('EV-S08-ISSUER-LIMIT-001'):n===7?s.chapter1?.correctionsDesk?.complete:s.chapter1?.byline?.complete&&s.chapter1.byline.choices['S07-C15']&&s.deliveredEvents.includes('EV-S07-BYLINE-LIMIT-001')))return s
  s=pauseScene03(s,now)
  if(!sourceState(s,n))s={...s,chapter1:{...s.chapter1!,[sourceKey(n)]:{version:1,...(n===7&&s.chapter1?.correctionsDesk?.flowRevision==='2026-10-31'?{flowRevision:'2026-10-31' as const}:{}),visible:true,complete:false,panel:'home',flags:[],inspections:[],choices:{},scroll:{},privateConsent:false,inquiry:{status:'not_sent'},replyRead:false,inbox:[],receipts:[],threads:{},...(n===10?{matches:[],searches:[],entry:{from:9,finalChoice:'S09-C18',manual:true,at:now}}:n===9?{entry:{from:8,finalChoice:'S08-C16',manual:true,at:now}}:{})}}}
  if(n!==10)s=sourcePut(s,10,{visible:false})
  if(n<9)s=sourcePut(s,9,{visible:false})
  if(n===7&&s.chapter1?.issuer)s=sourcePut(s,8,{visible:false})
  return sourcePut(s,n,{visible:true})
 }
 const p=sourceState(s,n);if(!p)return s
 if(n===10){const handled=scene10Action(s,a,now);if(handled!==undefined)return handled}
 if(a.type==='save-source-question'){
  if(n!==7||p.flowRevision!=='2026-10-31'||p.complete||!['article-read','profile-read'].every(f=>p.flags.includes(f)))return s
  const stance="The byline gives me a person to ask, not proof of who edited the page. The next useful question is where the published information first came from."
  s=sourcePut(s,n,{complete:true,choices:{...p.choices,'S07-C15':'a'},flags:[...p.flags,'streamlined-finding'],conclusion:{stance,notice_exists:'unknown',verified:false,authenticated_notice:false,authenticated_revision:false,original_text_available:false,issuer_identified:false,custodian_identified:false,transfer_established:false,transfer_verified:false,article_body_revision_verified:false,culprit_identified:false,Daniel_fate_known:false,nora_editor_identified:false,crime_or_culprit_established:false},feedback:'Source question saved privately.'})
  s={...s,chapter1:{...s.chapter1!,completed:[...new Set([...s.chapter1!.completed,7])]},deliveredEvents:[...new Set([...s.deliveredEvents,'EV-S07-BYLINE-LIMIT-001'])],evidence:{...s.evidence,'EV-S07-BYLINE-LIMIT-001':{id:'EV-S07-BYLINE-LIMIT-001',source:'PLAYER_PRIVATE / '+stance,verified:false,collectedAt:now}}}
  s=sourceAction(s,8,{type:'enter'},now)
  return sourcePut(sourcePut(s,8,{visible:false}),7,{visible:true})
 }
 if(a.type==='pending-professional')return n===7&&p.flowRevision==='2026-10-31'&&p.inquiry.receipt?sourcePut(pauseScene03(s,now),n,{panel:'professional'}):s
 if(a.type==='thread')return openSourceThread(s,n,a.thread,now)
 if(a.type==='scroll')return Number.isFinite(a.value)&&a.value>=0?sourcePut(s,n,{scroll:{...p.scroll,[a.key]:a.value}}):s
 if(a.type==='archive'){s=sourcePut(pauseScene03(s,now),n,{visible:false});return s}
 if(a.type==='back')return sourcePut(pauseScene03(s,now),n,{panel:'home',feedback:undefined})
 if(a.type==='panel'){
  const pages=sourceInvestigations[n].pages as Record<string,unknown>
  if(n===7&&p.flowRevision==='2026-10-31'&&a.panel==='profile'&&!p.flags.includes('article-read')||a.panel==='note'&&!p.flags.includes('profile-read')||a.panel==='form'&&!sourceLocalEligible(s,n,sourceFormChoice(n)))return s
  if(!(pages[a.panel]||['home','article','roles','form','reference',...(n===9?['search','status','last-note']:[])].includes(a.panel)))return s
  s=sourcePut(pauseScene03(s,now),n,{panel:a.panel,feedback:undefined})
  return n===7&&p.flowRevision==='2026-10-31'&&['article','profile'].includes(a.panel)?sourceAction(s,n,{type:'read',page:a.panel},now):s
 }
 if(a.type==='inspect'){
  const allowed:Record<string,string[]>=n===9?{register:scene09Tiles.slice(0,3),'finding-aid':scene09Tiles.slice(3)}:n===7?{reference:['issuer','content','cross-reference'],catalogue:['search-scope','no-match-limit']}:{roles:['issuer','custodian','routing'],guide:['name-role-limit','transfer-limit']}
  if(!allowed[p.panel]?.includes(a.id))return s
  s=sourcePut(s,n,{inspections:[...new Set([...p.inspections,a.id])]})
  if(n===9){const inspected=sourceState(s,n)!.inspections;const event=p.panel==='register'?'EV-S09-ROW-FIELDS-INSPECTED':'EV-S09-LIMITATIONS-INSPECTED';const needed=p.panel==='register'?scene09Tiles.slice(0,3):scene09Tiles.slice(3);if(needed.every(id=>inspected.includes(id)))s={...s,deliveredEvents:[...new Set([...s.deliveredEvents,event])]};return s}
  return n===8&&['issuer','custodian','routing'].every(id=>sourceState(s,n)!.inspections.includes(id))?{...s,deliveredEvents:[...new Set([...s.deliveredEvents,'EV-S08-ROLES-INSPECTED'])]}:s
 }
 if(a.type==='read'){
  if(a.page!==p.panel)return s
  const needed=n===9&&a.page==='finding-aid'?scene09Tiles.slice(3):a.page==='reference'?['issuer','content','cross-reference']:a.page==='catalogue'?['search-scope','no-match-limit']:a.page==='guide'?['name-role-limit','transfer-limit']:[]
  const allowed=n===9?['register','finding-aid']:n===7?['article','profile','note','reference','catalogue']:['directory','index','guide']
  if(!allowed.includes(a.page)||!needed.every(k=>p.inspections.includes(k)))return s
  const id=`EV-${sourcePrefix(n)}-${a.page==='article'?'ARTICLE-CREDIT':a.page==='note'?'REPORT-NOTE':a.page==='guide'?'FORMER-OFFICE':a.page.toUpperCase()}-READ`
  s=sourcePut(s,n,{flags:[...new Set([...p.flags,a.page+'-read'])]})
  return {...s,deliveredEvents:[...new Set([...s.deliveredEvents,id])],knowledge:{...s.knowledge,player:[...new Set([...s.knowledge.player,id+':observed'])]}}
 }
 if(a.type==='local'){
  const i=Number(a.id.slice(-2));if(a.id!==ident(n,i)||!sourceLocalEligible(s,n,i))return s
  const set=(sourceInvestigations[n].choices as Record<string,{options:readonly {id:string;text:string;feedback:string}[]}>)[a.id],o=n===7&&p.flowRevision==='2026-10-31'&&i===8?revisedNoraQuestions.map((text,j)=>({id:'abc'[j],text,feedback:''})).find(o=>o.id===a.choice):set?.options.find(o=>o.id===a.choice);if(!o)return s
  if(i===sourceFormChoice(n))return p.inquiry.receipt?s:sourcePut(s,n,{inquiry:{status:'draft',choice:o.id,text:o.text,reviewed:false},feedback:'Draft — not sent.'})
  if(passes[n][i]&&passes[n][i]!==o.id)return sourcePut(s,n,{feedback:o.feedback})
  s=sourcePut(s,n,{choices:{...p.choices,[a.id]:o.id},flags:[...new Set([...p.flags,...(passes[n][i]?[`pass-${i}`]:[])])],feedback:n===9&&i===1&&o.id==='b'?(s.chapter1?.issuer?.replyRead?'The reply supplied locating guidance. It named no custodian for the particular notice.':'No read civic reply establishes a custodian. The previous request retains its actual saved status.'):o.feedback})
  if(n===10&&i===19)s={...s,deliveredEvents:[...new Set([...s.deliveredEvents,'EV-S10-CATALOGUE-PATH-ASSEMBLED'])]}
  if(n===9&&i===17)s={...s,deliveredEvents:[...new Set([...s.deliveredEvents,'EV-S09-LINK-STRENGTH-PASSED'])]}
  if(n===7&&sourceState(s,n)!.flags.includes('pass-5')&&sourceState(s,n)!.flags.includes('pass-6')&&!s.evidence['NOTE-S07-REFERENCE-LIMITS'])s={...s,evidence:{...s.evidence,'NOTE-S07-REFERENCE-LIMITS':{id:'NOTE-S07-REFERENCE-LIMITS',source:"PLAYER_PRIVATE / GB-REPORT-NOTE-001: The Bulletin's NEW reporting note lists GB-REF-017 as a public notice lead. No source document, issuing office, original number, date or authenticated relationship to the article is available.",collectedAt:now,verified:false}}}
  if(i===sourceFinalChoice(n)){
   s=sourcePut(s,n,{complete:true,conclusion:{stance:o.text,notice_exists:'unknown',verified:false,authenticated_notice:false,authenticated_revision:false,original_text_available:false,issuer_identified:false,custodian_identified:false,transfer_established:false,transfer_verified:false,article_body_revision_verified:false,culprit_identified:false,Daniel_fate_known:false,nora_editor_identified:false,crime_or_culprit_established:false}})
   const event=n===10?'EV-S10-INDEX-LIMIT-001':n===9?'EV-S09-TRANSFER-LIMIT-001':n===7?'EV-S07-BYLINE-LIMIT-001':'EV-S08-ISSUER-LIMIT-001',note=n===10?'NOTE-S10-DESCRIPTOR-NOT-DOCUMENT':n===9?'NOTE-S09-SERIES-NOT-ITEM':n===7?'NOTE-S07-REFERENCE-LIMITS':'NOTE-S08-ROUTING-AND-ISSUER-GAP'
   s={...s,chapter1:{...s.chapter1!,completed:[...new Set([...s.chapter1!.completed,n])]},deliveredEvents:[...new Set([...s.deliveredEvents,event])],evidence:{...s.evidence,[note]:s.evidence[note]??{id:note,source:(n===10?'PLAYER_PRIVATE / GH-TRANSFER-REGISTER-001 + GH-TRANSFER-FINDING-AID-001 + GH-BOX-INDEX-EXTRACT-001 + GH-CATALOGUE-ACCESS-NOTE-001 / CASE LINK UNVERIFIED / ':n===9?'PLAYER_PRIVATE / GH-TRANSFER-REGISTER-001 + GH-TRANSFER-FINDING-AID-001 / CASE LINK UNVERIFIED / ':'PLAYER_PRIVATE / ')+o.text,collectedAt:now,verified:false},[event]:{id:event,source:(n===10?'PLAYER_PRIVATE / GH-TRANSFER-REGISTER-001 + GH-TRANSFER-FINDING-AID-001 + GH-BOX-INDEX-EXTRACT-001 + GH-CATALOGUE-ACCESS-NOTE-001 / CASE LINK UNVERIFIED / ':n===9?'PLAYER_PRIVATE / GH-TRANSFER-REGISTER-001 + GH-TRANSFER-FINDING-AID-001 / CASE LINK UNVERIFIED / ':'PLAYER_PRIVATE / ')+o.text,collectedAt:now,verified:false}}}
  }
  if(n===10&&i===20)s=sourcePut(s,n,{inventoryObservation:{public_box_extract_observed:true,descriptor_code_observed:true,descriptor_body_observed:false,public_original_notice_observed:false,GB_REF_017_item_link_verified:false,GB_REF_017_box_link_verified:false,GB_REF_017_descriptor_link_verified:false,specific_notice_issuer_verified:false,article_body_revision_verified:false,catalogue_deletion_verified:false,suspect_identified:false,Daniel_fate_known:false,source_attribution:['GH-TRANSFER-REGISTER-001','GH-TRANSFER-FINDING-AID-001','GH-BOX-INDEX-EXTRACT-001','GH-CATALOGUE-ACCESS-NOTE-001']}})
  if(n===9&&i===18)s=sourcePut(s,n,{seriesObservation:{public_listed_series_transfer:true,source_ref:['GH-TRANSFER-REGISTER-001','GH-TRANSFER-FINDING-AID-001'],specific_notice_identified:false,GB_REF_017_series_match:false,GB_REF_017_transfer_verified:false,verified_issuer:false,verified_article_revision:false}})
  return s
 }
 if(a.type==='review')return p.panel==='form'&&p.inquiry.text&&!p.inquiry.receipt?sourcePut(s,n,{inquiry:{...p.inquiry,reviewed:true},feedback:'Only this selected public question and its stated context will be delivered. Delivery is not a read receipt.'}):s
 if(a.type==='request-failed')return p.inquiry.receipt?s:sourcePut(s,n,{inquiry:{...p.inquiry,status:'failed'},feedback:'Not delivered. Your draft is safe. Retry when ready.'})
 if(a.type==='cancel'||a.type==='save-draft')return sourcePut(s,n,{panel:'home',feedback:p.inquiry.receipt?'Request already delivered.':'Draft saved here. Nothing has been sent.'})
 if(a.type==='send-request'){
  if(p.panel!=='form'||p.inquiry.receipt||!p.inquiry.text||!p.inquiry.reviewed||!sourceLocalEligible(s,n,sourceFormChoice(n)))return s
  const id=sourceReceipt(n),eventId=id+'-SENT',text=p.inquiry.text,facts=[eventId+':claim'],recipient=n===7?'nora':route(n)
  s=sourcePut(s,n,{inquiry:{...p.inquiry,status:'delivered',receipt:{id,text,at:now,route:route(n),...(n===10?{returnToken:'local:R-GH-INV-001',scope:{seriesContext:text.includes('GH-PN-GEN-2017-2021'),publisherLabel:text.includes('GB-REF-017'),boxReference:text.includes('GH-PN-BOX-03'),descriptorReference:text.includes('GH-DSC-03-A'),extractReference:text.includes('GH-INV-2022-063-EX1'),attachments:[] as []}}:n===9?{returnToken:'local:R-GH-TR-001',scope:{seriesContext:true,publisherLabel:text.includes('GB-REF-017'),attachments:[] as []}}:{})}},receipts:[...p.receipts,{eventId,recipient,factIds:facts,text}],...(n===7&&p.flowRevision==='2026-10-31'?{inbox:[...p.inbox,{id:eventId,sender:'player' as const,thread:'professional' as const,text,at:now}]}:{}),feedback:n===9?'Request delivered. This receipt proves only the question was sent; it does not identify the original notice.':'Question delivered. Reply not yet received.'})
  return {...s,deliveredEvents:[...new Set([...s.deliveredEvents,eventId])],pendingEvents:[...s.pendingEvents,{id:`CH1-${sourcePrefix(n)}-SOURCE-REPLY`,dueAt:now+1600}],knowledge:{...s.knowledge,characters:n===7?{...s.knowledge.characters,nora:[...new Set([...s.knowledge.characters.nora,...facts])]}:s.knowledge.characters}}
 }
 if(a.type==='next-lead')return !p.complete?s:n===7?sourceAction(s,8,{type:'enter'},now):n===8?sourceAction(s,9,{type:'enter'},now):n===9?sourceAction(s,10,{type:'enter'},now):sourcePut(s,n,{feedback:'Next lead not yet available'})
 return s
}
export function sourceTick(s:GameSave,now:number):GameSave{
 for(const n of [7,8,9,10] as const){
  const p=sourceState(s,n),q=s.pendingEvents.find(e=>e.id===`CH1-${sourcePrefix(n)}-SOURCE-REPLY`);if(!p?.inquiry.receipt||p.reply||!q||q.dueAt>now)continue
  const text:string[]=[];let id=n===7&&p.flowRevision==='2026-10-31'&&revisedNoraQuestions.includes(p.inquiry.text??'')?revisedNoraEntrances['abc'.indexOf(p.inquiry.choice??'')]:(sourceInvestigations[n].entrances as Record<string,string>)[`${role(n)}_${p.inquiry.choice}`]
  for(let i=0;i<80;i++){const node=sourceInvestigationNodes[id]??revisedScene0607Nodes[id];if(!node||node.kind==='choice')break;if(node.kind==='npc')text.push(node.text);if(!('next' in node)||!node.next)break;id=node.next}
  const event=sourceReplyEvent(n);s=sourcePut(s,n,{reply:{id:event,text,at:now}})
  s={...s,pendingEvents:s.pendingEvents.filter(e=>e.id!==q.id),deliveredEvents:[...new Set([...s.deliveredEvents,event])],notifications:[...s.notifications,{id:event,text:n===10?'Records Centre — Catalogue enquiry reply':n===9?'Greyhaven Records Centre — Reply to your series question':n===7?'Greyhaven Bulletin — Reporter Inbox: Reply to your article question':'Greyhaven Civic Services — Routing Inbox: Your locating question',read:false}]}
 }
 return s
}
export function validateSourceInvestigation(v:unknown,n:SourceScene):void{
 if(v===undefined)return
 const p=v as SourceInvestigationState
 if(!p||p.version!==1||typeof p.visible!=='boolean'||typeof p.complete!=='boolean'||!Array.isArray(p.flags)||!Array.isArray(p.inspections)||!p.choices||!p.threads||!p.scroll||Object.values(p.scroll).some(v=>!Number.isFinite(v)||v<0)||!p.inquiry||!['not_sent','draft','failed','delivered'].includes(p.inquiry.status)||typeof p.replyRead!=='boolean'||typeof p.privateConsent!=='boolean'||!Array.isArray(p.inbox)||!Array.isArray(p.receipts)||p.inquiry.status==='delivered'&&p.inquiry.receipt?.id!==sourceReceipt(n)||p.reply&&!p.inquiry.receipt||p.replyRead&&!p.reply||p.complete&&(!p.conclusion||!p.choices[ident(n,sourceFinalChoice(n))]))throw Error(`Invalid Scene ${n} state`)
 const invalid=()=>{throw Error(`Invalid Scene ${n} state`)}
 if(n===9&&(!p.entry||p.entry.from!==8||p.entry.finalChoice!=='S08-C16'||p.entry.manual!==true||!Number.isFinite(p.entry.at)))invalid()
 if(n===9&&p.inquiry.receipt&&(p.inquiry.receipt.returnToken!=='local:R-GH-TR-001'||p.inquiry.receipt.scope?.seriesContext!==true||p.inquiry.receipt.scope.publisherLabel!==p.inquiry.text?.includes('GB-REF-017')||p.inquiry.receipt.scope.attachments.length!==0))invalid()
 if(n===10){
  if(!p.entry||p.entry.from!==9||p.entry.finalChoice!=='S09-C18'||p.entry.manual!==true||!Number.isFinite(p.entry.at)||!Array.isArray(p.matches)||p.matches.some(m=>!(m in scene10Matches))||new Set(p.matches).size!==p.matches.length||!Array.isArray(p.searches)||p.searches.some(t=>!sourceInvestigations[10].queries.some(q=>q.term===t)))invalid()
  if(p.finalDraft!==undefined&&!['a','b','c'].includes(p.finalDraft)||p.lastQuery!==undefined&&!p.searches?.includes(p.lastQuery)||p.flags.includes('reference-read')&&(!p.descriptorReference||p.descriptorReference.code!=='GH-DSC-03-A'||p.descriptorReference.source!=='GH-BOX-INDEX-EXTRACT-001'||p.descriptorReference.bodyObserved!==false))invalid()
  if(p.inquiry.receipt&&(p.inquiry.receipt.returnToken!=='local:R-GH-INV-001'||p.inquiry.receipt.scope?.seriesContext!==p.inquiry.text?.includes('GH-PN-GEN-2017-2021')||p.inquiry.receipt.scope?.publisherLabel!==p.inquiry.text?.includes('GB-REF-017')||p.inquiry.receipt.scope?.boxReference!==p.inquiry.text?.includes('GH-PN-BOX-03')||p.inquiry.receipt.scope?.descriptorReference!==p.inquiry.text?.includes('GH-DSC-03-A')||p.inquiry.receipt.scope?.attachments.length!==0))invalid()
  if(p.complete&&(!scene10Prepared(p)||!p.inventoryObservation||p.inventoryObservation.public_box_extract_observed!==true||p.inventoryObservation.descriptor_code_observed!==true||JSON.stringify(p.inventoryObservation.source_attribution)!==JSON.stringify(['GH-TRANSFER-REGISTER-001','GH-TRANSFER-FINDING-AID-001','GH-BOX-INDEX-EXTRACT-001','GH-CATALOGUE-ACCESS-NOTE-001'])||Object.entries(p.inventoryObservation).some(([key,value])=>!['source_attribution','public_box_extract_observed','descriptor_code_observed'].includes(key)&&value!==false)))invalid()
 }
 const config=sourceInvestigations[n],sets=config.choices as Record<string,{options:readonly {id:string;text:string}[]}>
 const panels=[...(n===10?['fields','descriptor','dates','compare','search','puzzle','case-board','status']:[]),...(n===9?['search','status','last-note']:[]),'home','article','roles','form','reference','professional','civic',...Object.keys(config.pages)]
 if(!panels.includes(p.panel)||p.flags.some(f=>typeof f!=='string')||p.inspections.some(f=>typeof f!=='string')||new Set(p.inspections).size!==p.inspections.length||Object.entries(p.choices).some(([id,choice])=>!(sets[id]?.options.some(o=>o.id===choice)||(p.flowRevision==='2026-10-31'&&id.startsWith('S07-REV-')&&['a','b','c'].includes(choice)))))invalid()
 if(p.inquiry.text!==undefined&&!(n===7&&p.flowRevision==='2026-10-31'&&revisedNoraQuestions.some((text,i)=>'abc'[i]===p.inquiry.choice&&text===p.inquiry.text)||sets[ident(n,sourceFormChoice(n))].options.some(o=>o.id===p.inquiry.choice&&o.text===p.inquiry.text))||p.inquiry.receipt&&(p.inquiry.status!=='delivered'||p.inquiry.receipt.route!==route(n)||p.inquiry.receipt.text!==p.inquiry.text||!Number.isFinite(p.inquiry.receipt.at)))invalid()
 if(p.reply&&(p.reply.id!==sourceReplyEvent(n)||!Number.isFinite(p.reply.at)||!Array.isArray(p.reply.text)||p.reply.text.some(t=>typeof t!=='string')))invalid()
 if(p.reading&&!['sophie','group','professional','civic'].includes(p.reading)||Object.entries(p.threads).some(([thread,c])=>!['sophie','group','professional','civic'].includes(thread)||!c||!(sourceInvestigationNodes[c.nodeId]??revisedScene0607Nodes[c.nodeId])||!c.nodeId.startsWith(`OPEN-${sourcePrefix(n)}-`)||c.draft&&(!(sourceInvestigationNodes[c.draft.nodeId]??revisedScene0607Nodes[c.draft.nodeId])||!['a','b','c'].includes(c.draft.choiceId))||c.paused&&(!(sourceInvestigationNodes[c.paused.id]??revisedScene0607Nodes[c.paused.id])||!Number.isFinite(c.paused.remainingMs)||c.paused.remainingMs<0)))invalid()
 if(p.inbox.some(l=>!l||!['player','professional','civic'].includes(l.sender)||typeof l.text!=='string'||!Number.isFinite(l.at))||p.receipts.some(r=>!r||typeof r.eventId!=='string'||typeof r.recipient!=='string'||!Array.isArray(r.factIds)||r.factIds.some(f=>typeof f!=='string')))invalid()
 if(p.privateConsent&&(n!==7||p.choices['S07-C10']!=='a'||!p.receipts.some(r=>r.eventId==='OPEN-S07-C10-A-2'&&r.recipient==='player')))invalid()
 if(n===9&&p.complete&&(!p.seriesObservation||p.seriesObservation.public_listed_series_transfer!==true||p.seriesObservation.specific_notice_identified!==false||p.seriesObservation.GB_REF_017_series_match!==false||p.seriesObservation.GB_REF_017_transfer_verified!==false||p.seriesObservation.verified_issuer!==false||p.seriesObservation.verified_article_revision!==false||JSON.stringify(p.seriesObservation.source_ref)!==JSON.stringify(['GH-TRANSFER-REGISTER-001','GH-TRANSFER-FINDING-AID-001'])))invalid()
 if(p.complete){
  const required=n===7&&p.flags.includes('streamlined-finding')?['article-read','profile-read']:n===10?scene10Required:n===9?scene09Required:n===7?['article-read','profile-read','note-read','reference-read','catalogue-read','pass-2','pass-3','pass-5','pass-6','pass-13']:['directory-read','index-read','guide-read','pass-2','pass-3','pass-4','pass-6','pass-7','pass-10']
  const tiles=n===7&&p.flags.includes('streamlined-finding')?[]:n===10?scene10Tiles:n===9?scene09Tiles:n===7?['issuer','content','cross-reference','search-scope','no-match-limit']:['issuer','custodian','routing','name-role-limit','transfer-limit']
  if(!required.every(f=>p.flags.includes(f))||!tiles.every(f=>p.inspections.includes(f))||Object.entries(p.conclusion!).some(([k,v])=>k==='stance'?typeof v!=='string':k==='notice_exists'?v!=='unknown':v!==false))invalid()
 }
}
