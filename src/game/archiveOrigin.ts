import { correctionsDeskAction, deskPut } from './scene06'
import { conversationNodeForValidation } from '../content/actIRegistry'
import type { GameSave } from './types'
import type { Scene01Node } from '../content/scene01'
import { conversationEntrances, conversationNodes, originOpening, originFollowup, revisedUnknownEntrance, revisedSocialEntrances, versionHistorySceneId } from '../content/versionHistoryConversation'
import { versionHistoryDialogue } from '../content/versionHistoryConversationData'
import { enterScene01, pauseScene03 } from './scene01'
import { publicStoryFlag, publicStoryPut } from './scene04'
import { versionHistoryPut, type VersionHistoryAction, type VersionHistoryState } from './scene05'

export type ConversationCheckpoint={nodeId:string;draft?:{nodeId:string;choiceId:string};paused?:{id:string;remainingMs:number;typing:boolean};complete?:boolean}
export interface ArchiveOriginState {
  version:1; contacted:boolean; packageDelivered:boolean; installed:boolean; legacyInstalled?:boolean;
  securityOpen:boolean; installStage?:'CONNECTING'|'DECRYPTING PACKAGE'|'INSTALLING'|'INSTALL COMPLETE';
  initialInspected:boolean; followupNotified:boolean; reading?:boolean; checkpoint?:ConversationCheckpoint;
  receipts:{eventId:string;recipient:'player'|'unknown';factIds:string[]}[]; scroll?:number;
}
export const alignedArticle=(s:GameSave)=>s.prologue?.scene01?.articleAlignment==='2026-10-28'
export const archiveInstalled=(s:GameSave)=>!!s.chapter1?.archiveOrigin?.installed||!!s.chapter2Access?.installCompleted||!alignedArticle(s)&&!!s.chapter1?.publicStory?.started
const originInitial=():ArchiveOriginState=>({version:1,contacted:false,packageDelivered:false,installed:false,securityOpen:false,initialInspected:false,followupNotified:false,receipts:[]})
export const originPut=(s:GameSave,p:Partial<ArchiveOriginState>):GameSave=>s.chapter1?{...s,chapter1:{...s.chapter1,archiveOrigin:{...s.chapter1.archiveOrigin??originInitial(),...p}}}:s
const schedule=(s:GameSave,id:string,at:number)=>s.deliveredEvents.includes(id)||s.pendingEvents.some(e=>e.id===id)?s:{...s,pendingEvents:[...s.pendingEvents,{id,dueAt:at}]}
export const archiveInstallStageMs = 1800
/** Presentation follows the saved stage deadline; it never installs or advances state. */
export function archiveInstallProgress(s:GameSave,now:number):number {
  const stage=s.chapter1?.archiveOrigin?.installStage
  if(!stage)return 0
  if(stage==='INSTALL COMPLETE')return 100
  const index=['CONNECTING','DECRYPTING PACKAGE','INSTALLING'].indexOf(stage)
  const due=s.pendingEvents.find(e=>e.id===`CH1-ARCHIVE-INSTALL-${index+1}`)?.dueAt
  const fraction=due===undefined?0:Math.max(0,Math.min(1,1-(due-now)/archiveInstallStageMs))
  return Math.min(99,Math.floor((index+fraction)*100/3))
}
function notice(s:GameSave,id:string,text:string,now:number,recipient:'unknown'|'sophie'|'group'='unknown'):GameSave {
  if(s.deliveredEvents.includes(id))return s
  s={...s,deliveredEvents:[...s.deliveredEvents,id],notifications:[...s.notifications,{id,text,read:false}]}
  if(recipient==='unknown')return {...s,chapter1:{...s.chapter1!,sender:{...s.chapter1!.sender,messages:[...s.chapter1!.sender.messages,{id,sender:'unknown',text,at:now}]}}}
  const scene=s.prologue!.scene01!
  return {...s,prologue:{...s.prologue!,scene01:{...scene,...(recipient==='sophie'?{messages:[...scene.messages,{id,sender:'sophie',text,at:now}]}:{groupMessages:[...scene.groupMessages,{id,sender:'maya',text,at:now}]})}}}
}
export function scheduleArchiveOrigin(s:GameSave,now:number):GameSave {
  if(!alignedArticle(s)||archiveInstalled(s))return s
  return schedule(originPut(s,{}),'CH1-ARCHIVE-FIRST',now+3000)
}
export function canonicalTick(s:GameSave,now:number):GameSave {
  const ids=['CH1-ARCHIVE-FIRST','CH1-ARCHIVE-INSTALL-1','CH1-ARCHIVE-INSTALL-2','CH1-ARCHIVE-INSTALL-3','CH1-ARCHIVE-FOLLOWUP','CH1-VH-START','CH1-VH-SOPHIE','CH1-VH-GROUP']
  const due=s.pendingEvents.filter(e=>ids.includes(e.id)&&e.dueAt<=now).sort((a,b)=>a.dueAt-b.dueAt||a.id.localeCompare(b.id))[0]
  if(!due)return s
  s={...s,pendingEvents:s.pendingEvents.filter(e=>e.id!==due.id)}
  if(s.deliveredEvents.includes(due.id))return s
  if(due.id==='CH1-ARCHIVE-FIRST')return originPut(notice(s,due.id,'About the Greyhaven Bulletin article.',now),{contacted:true,checkpoint:{nodeId:originOpening}})
  if(due.id.startsWith('CH1-ARCHIVE-INSTALL')){
    const stage=Number(due.id.at(-1)),done=stage===3
    s={...s,deliveredEvents:[...s.deliveredEvents,due.id]}
    s=originPut(s,{installStage:stage===1?'DECRYPTING PACKAGE':stage===2?'INSTALLING':'INSTALL COMPLETE',installed:done,securityOpen:true})
    if(!done)return schedule(s,`CH1-ARCHIVE-INSTALL-${stage+1}`,now+archiveInstallStageMs)
    return publicStoryFlag(s,'index-available')
  }
  if(due.id==='CH1-ARCHIVE-FOLLOWUP')return originPut(notice(s,due.id,'Did you find the reference?',now),{followupNotified:true,checkpoint:{nodeId:conversationNodes[originFollowup].kind==='npc'? (conversationNodes[originFollowup] as Extract<Scene01Node,{kind:'npc'}>).next:originFollowup}})
  if(due.id==='CH1-VH-START')return notice(s,due.id,s.chapter1?.versionHistory?.flags.includes('new_dialogue')?"Before you start looking, there's something I want you to check.":'The reference matches the title.',now)
  const thread=due.id==='CH1-VH-SOPHIE'?'sophie':'group'
  s=versionHistoryPut(s,thread==='sophie'?{sophieNotified:true}:{flags:[...new Set([...s.chapter1!.versionHistory!.flags,'group-notified'])]})
  return notice(s,due.id,thread==='sophie'?'I kept thinking about that article.':'Does anyone actually know what changed in that article?',now,thread)
}
export function pauseOrigin(s:GameSave,now:number):GameSave {
  const p=s.chapter1?.archiveOrigin,scene=s.prologue?.scene01
  if(!p?.reading||!scene)return s
  const q=scene.queue[0]
  s=originPut(s,{reading:false,checkpoint:{nodeId:scene.nodeId,draft:scene.draft,paused:q?{id:q.id,remainingMs:Math.max(0,q.dueAt-now),typing:q.typing}:undefined}})
  return {...s,prologue:{...s.prologue!,scene01:{...scene,queue:[],draft:undefined}}}
}
export function openOrigin(s:GameSave,now:number):GameSave {
  if(s.chapter1?.versionHistory?.revision)return openCanonicalThread(s,'unknown',now)
  const p=s.chapter1?.archiveOrigin
  if(!p?.contacted||p.reading||p.checkpoint?.complete)return s
  s=pauseScene03(s,now);s=originPut(s,{reading:true})
  return restore(s,p.checkpoint??{nodeId:originOpening},now)
}
function restore(s:GameSave,c:ConversationCheckpoint,now:number):GameSave {
  const scene=s.prologue!.scene01!
  s={...s,prologue:{...s.prologue!,scene01:{...scene,nodeId:c.nodeId,draft:c.draft,queue:[]}}}
  return c.paused?{...s,prologue:{...s.prologue!,scene01:{...s.prologue!.scene01!,queue:[{id:c.paused.id,dueAt:now+c.paused.remainingMs,typing:c.paused.typing}]}}}:enterScene01(s,c.nodeId,now)
}
export function originAction(s:GameSave,a:{type:'open'|'security'|'cancel'|'install'|'inspect'|'close-index'|'scroll';value?:number},now=Date.now()):GameSave {
  if(a.type==='open')return openOrigin(s,now)
  const p=s.chapter1?.archiveOrigin
  if(!p)return s
  if(a.type==='scroll')return Number.isFinite(a.value)&&a.value!>=0?originPut(s,{scroll:a.value}):s
  if(a.type==='security')return p.packageDelivered&&!p.installed?originPut(pauseScene03(s,now),{securityOpen:true}):s
  if(a.type==='cancel')return p.installStage&&p.installStage!=='INSTALL COMPLETE'?s:originPut(s,{securityOpen:false})
  if(a.type==='install')return !p.securityOpen||p.installed||p.installStage?s:schedule(originPut(s,{installStage:'CONNECTING'}),'CH1-ARCHIVE-INSTALL-1',now+archiveInstallStageMs)
  if(a.type==='close-index')return publicStoryPut(s,{panel:'home'})
  if(a.type==='inspect'&&p.installed){
    s=originPut(publicStoryPut(publicStoryFlag(publicStoryFlag(s,'index-opened'),'index-acknowledged'),{panel:'index'}),{initialInspected:true})
    if(!p.followupNotified)s=schedule(s,'CH1-ARCHIVE-FOLLOWUP',now+2000)
    return s
  }
  return s
}
export const conversationRevision=(s:GameSave)=>s.chapter1?.versionHistory?.revision==='conversation-2026-10-28'
export function canonicalSourceGate(s:GameSave,id:string):boolean {
  const p=s.chapter1?.versionHistory
  if(!p||id==='OPEN-VH-NEW-SOURCE-HUB')return false
  if(id.endsWith('02'))return p.flags.includes('article_metadata_inspected')&&(!p.flags.includes('article_flow')||p.flags.includes('update_analysis_saved'))
  if(id.endsWith('03'))return p.flags.includes('index')
  if(id.endsWith('04'))return p.flags.includes('policy')
  if(id.endsWith('05'))return ['public','index','policy'].every(f=>p.flags.includes(f))
  if(id.endsWith('06'))return p.checklist.length===4 || !!p.chatChoices?.s05_c05_comparison && ['public','index','policy'].every(f=>p.flags.includes(f))
  return true
}
export function openCanonicalThread(s:GameSave,t:'unknown'|'sophie'|'group',now:number):GameSave {
  const p=s.chapter1?.versionHistory
  if(!p?.revision||p.reading===t||t==='unknown'&&!s.deliveredEvents.includes('CH1-VH-START')||t==='sophie'&&!p.sophieNotified||t==='group'&&(!p.flags.includes('group-notified')||s.prologue?.scene01?.groupMembers?.maya!==true))return s
  const cp=p.threads[t]
  if(cp?.complete)return s
  s=pauseScene03(s,now);s=versionHistoryPut(s,{reading:t})
  let start=p.flags.includes('new_dialogue')?(t==='unknown'?revisedUnknownEntrance:revisedSocialEntrances[t]):conversationEntrances[t]
  const first=conversationNodes[start]
  const noticeId=t==='unknown'?'CH1-VH-START':t==='sophie'?'CH1-VH-SOPHIE':'CH1-VH-GROUP'
  if(!cp&&s.deliveredEvents.includes(noticeId)&&first?.kind==='npc'&&(!p.flags.includes('new_dialogue')||t==='unknown'))start=first.next
  return restore(s,cp??{nodeId:start},now)
}
export function canonicalIncoming(s:GameSave,node:Extract<Scene01Node,{kind:'npc'}>,now:number):GameSave {
  if(node.channel!=='unknown')return s
  const facts=node.heardFacts??[]
  s={...s,chapter1:{...s.chapter1!,sender:{...s.chapter1!.sender,messages:[...s.chapter1!.sender.messages,{id:node.id,sender:'unknown',text:node.text,at:now,...(node.attachment?{attachment:node.attachment}:{})}]}}}
  if(node.attachment==='archive-package')s=originPut(s,{packageDelivered:true})
  return node.id.startsWith('OPEN-ORIGIN-')?originPut(s,{receipts:[...s.chapter1!.archiveOrigin!.receipts,{eventId:node.id,recipient:'player',factIds:facts}]}):versionHistoryPut(s,{receipts:[...s.chapter1!.versionHistory!.receipts??[],{eventId:node.id,recipient:'player',factIds:facts}]})
}
export function canonicalSent(s:GameSave,node:Extract<Scene01Node,{kind:'choice'}>,choiceId:string,now:number):GameSave {
  const scene=s.prologue!.scene01!,choice=node.choices.find(c=>c.id===choiceId)
  if(!choice||scene.draft?.nodeId!==node.id||scene.draft.choiceId!==choiceId)return s
  const id=`${node.id}-PLAYER-${choiceId}`
  if(s.deliveredEvents.includes(id))return s
  const facts=[id+'-CLAIM']
  s={...s,deliveredEvents:[...s.deliveredEvents,id],choices:{...s.choices,[node.id]:choiceId}}
  if(node.channel==='unknown'){
    s={...s,chapter1:{...s.chapter1!,sender:{...s.chapter1!.sender,messages:[...s.chapter1!.sender.messages,{id,sender:'player',text:choice.text,at:now}]}}}
    if(node.id.startsWith('OPEN-ORIGIN-'))s=originPut(s,{receipts:[...s.chapter1!.archiveOrigin!.receipts,{eventId:id,recipient:'unknown',factIds:facts}]})
    else {
      const p=s.chapter1!.versionHistory!,num=Number(node.id.slice(-2))
      const patch:Partial<VersionHistoryState>={chatChoices:{...p.chatChoices,[node.number!]:choiceId},receipts:[...p.receipts??[],{eventId:id,recipient:'unknown',factIds:facts}]}
      const interpretation=num===1?'preference':num===6?'strategy':num===7?'shared_assessment':choiceId==='a'?'supported_observation':choice.text.endsWith('?')?'question':'hypothesis'
      patch.interpretations={...p.interpretations,[node.number!]:interpretation}
      if(num===5)patch.comparisonStatus='unavailable'
      if(num>=5 && ['public','index','policy'].every(flag=>p.flags.includes(flag)) && (num===5 || p.chatChoices?.s05_c05_comparison))patch.checklist=[0,1,2,3]
      if(num===6)patch.strategy=p.flags.includes('new_dialogue')&&!scene.traceIntroRevision?'publisher_clarification':({a:'publisher_clarification',b:'independent_copy',c:'preserve_uncertainty'} as const)[choiceId as 'a']
      if(num===7)patch.assessment=p.flags.includes('new_dialogue')&&!scene.traceIntroRevision?'reference_without_verified_revision':({a:'reference_without_verified_revision',b:'revision_question_unresolved',c:'maintain_source_separation'} as const)[choiceId as 'a']
      s=versionHistoryPut(s,patch)
    }
  }else {
    const group=node.channel==='group',recipients=group?(['sophie','maya','lucas'] as const).filter(a=>scene.groupMembers?.[a]===true):['sophie'] as const
    const characters={...s.knowledge.characters}
    for(const actor of recipients)characters[actor]=[...new Set([...characters[actor],...facts])]
    s={...s,knowledge:{...s.knowledge,characters},messages:[...s.messages,...recipients.map(recipient=>({id:id+'-TO-'+recipient,sender:'player' as const,recipient,text:choice.text,at:now,delivery:'delivered' as const,disclosedFactIds:facts}))],prologue:{...s.prologue!,scene01:{...scene,...(group?{groupMessages:[...scene.groupMessages,{id,sender:'player',text:choice.text,at:now}]}:{messages:[...scene.messages,{id,sender:'player',text:choice.text,at:now}]})}}}
    s=versionHistoryPut(s,{chatChoices:{...s.chapter1!.versionHistory!.chatChoices,[node.number!]:choiceId}})
  }
  s={...s,prologue:{...s.prologue!,scene01:{...s.prologue!.scene01!,draft:undefined}}}
  return enterScene01(s,choice.next,now)
}
export function canonicalEnd(s:GameSave,id:string,now:number):GameSave {
  if(id.startsWith('OPEN-ORIGIN-'))return originPut(s,{reading:false,checkpoint:{nodeId:id,complete:true}})
  const p=s.chapter1!.versionHistory!,thread=p.reading!
  s=versionHistoryPut(s,{reading:undefined,threads:{...p.threads,[thread]:{nodeId:id,complete:true}}})
  if(thread!=='unknown')return s
  s=versionHistoryPut(s,{complete:true})
  s={...s,chapter1:{...s.chapter1!,completed:[...new Set([...s.chapter1!.completed,4,5])]},evidence:{...s.evidence,'EV-S05-REVISION-LIMIT-001':{id:'EV-S05-REVISION-LIMIT-001',source:`PLAYER_PRIVATE / ${p.assessment} / revision history UNVERIFIED / no earlier text`,verified:false,collectedAt:now}}}
  s=deskPut(correctionsDeskAction(s,{type:'activate'},now),{visible:false})
  if(s.chapter1?.correctionsDesk?.flowRevision==='2026-10-31'&&!s.deliveredEvents.includes('CH1-S06-LEAD'))s={...s,deliveredEvents:[...s.deliveredEvents,'CH1-S06-LEAD'],notifications:[...s.notifications,{id:'CH1-S06-LEAD',text:'NEW LEAD — THE CORRECTIONS DESK',read:false}]}
  if(p.flags.includes('new_dialogue'))return versionHistoryPut(s,{sophieNotified:true,flags:[...new Set([...s.chapter1!.versionHistory!.flags,'group-notified'])]})
  return schedule(schedule(s,'CH1-VH-SOPHIE',now+3000),'CH1-VH-GROUP',now+4500)
}
export function canonicalVersionAction(s:GameSave,a:VersionHistoryAction,now:number):GameSave {
  if(a.type==='enter'){
    if(s.chapter1?.versionHistory)return pauseScene03(s,now)
    const c=s.chapter1
    if(s.prologue?.scene01?.scriptRevision!=='final-2026-10-23'||c?.completed.some(n=>n>4)||!c?.publicStory?.complete||!archiveInstalled(s)||!(c.archiveOrigin?.initialInspected||c.publicStory.flags.includes('index-acknowledged'))||s.chapter2Access)return s
    s=versionHistoryPut(s,{version:1,entered:true,revision:'conversation-2026-10-28',sceneId:versionHistorySceneId,complete:false,flags:['article_flow','new_dialogue','flexible_sources'],checklist:[],panel:'home',scroll:{},localChoices:{},chatChoices:{},inquiry:{status:'not_sent'},sophieNotified:false,threads:{}})
    s={...s,chapter1:{...s.chapter1!,completed:[...new Set([...s.chapter1!.completed,4])]}}
    return schedule(pauseScene03(s,now),'CH1-VH-START',now+1800)
  }
  const p=s.chapter1?.versionHistory
  if(!p?.revision)return s
  if(a.type==='thread')return openCanonicalThread(s,a.thread,now)
  if(a.type==='discuss-source'){
    const target={article:['02','s05_c02_update_label'],index:['03','s05_c03_index_meaning'],policy:['04','s05_c04_policy_meaning']}[a.source]
    if(!p.flags.includes('flexible_sources')||p.reading!=='unknown'||s.prologue?.scene01?.nodeId!=='OPEN-VH-NEW-SOURCE-HUB'||p.chatChoices?.[target[1]]||!canonicalSourceGate(s,'OPEN-VH-NEW-GATE-'+target[0]))return s
    return enterScene01(s,'OPEN-VH-NEW-BEFORE-'+target[0]+'-1',now)
  }
  if(a.type==='scroll')return Number.isFinite(a.value)&&a.value>=0?versionHistoryPut(s,{scroll:{...p.scroll,[a.key]:a.value}}):s
  if(a.type==='panel'){
    if(a.panel==='receipt'&&!p.inquiry.receipt||a.panel==='index'&&p.flags.includes('article_flow')&&!p.flags.includes('index_requested'))return s
    s=pauseScene03(s,now)
    return versionHistoryPut(s,{panel:a.panel,flags:a.panel==='index'?[...new Set([...p.flags,'index'])]:p.flags})
  }
  if(a.type==='back')return versionHistoryPut(pauseScene03(s,now),{panel:'home'})
  if(a.type==='inspect-metadata')return p.panel!=='public'?s:versionHistoryPut(s,{flags:[...new Set([...p.flags,'article_metadata_inspected'])]})
  if(a.type==='save-update-analysis')return p.panel!=='public'||!p.flags.includes('article_metadata_inspected')?s:versionHistoryPut(s,{flags:[...new Set([...p.flags,'update_analysis_saved'])]})
  if(a.type==='get-index')return p.panel!=='public'||!archiveInstalled(s)?s:versionHistoryPut(s,{flags:[...new Set([...p.flags,'index_requested'])]})
  if(a.type==='read-article')return p.panel!=='public'?s:versionHistoryPut(s,{flags:[...new Set([...p.flags,'public'])]})
  if(a.type==='read-policy')return p.panel==='policy'?versionHistoryPut(s,{flags:[...new Set([...p.flags,'policy'])]}):s
  if(a.type==='check')return !p.chatChoices?.s05_c05_comparison||p.flags.includes('new_dialogue')&&!s.deliveredEvents.includes('OPEN-VH-NEW-REPLY-05-4')||!Number.isInteger(a.index)||a.index<0||a.index>3?s:versionHistoryPut(s,{checklist:[...new Set([...p.checklist,a.index])]})
  if(a.type==='local'&&a.id==='S05-C04'){
    const opt=versionHistoryDialogue[7].branches.find(b=>b.id===a.choice)
    return !opt||p.inquiry.receipt?s:versionHistoryPut(s,{inquiry:{status:'draft',choice:a.choice,text:opt.text}})
  }
  if(a.type==='review')return p.inquiry.text?versionHistoryPut(s,{inquiry:{...p.inquiry,reviewed:true}}):s
  if(a.type==='cancel'||a.type==='save-draft')return versionHistoryPut(s,{panel:'home',inquiry:{...p.inquiry,reviewed:false}})
  if(a.type==='send-request'&&p.panel==='form'&&p.inquiry.reviewed&&p.inquiry.text&&!p.inquiry.receipt){
    const receipt={id:'R-GB-VH-001' as const,text:p.inquiry.text,at:now}
    s={...versionHistoryPut(s,{panel:'receipt',inquiry:{...p.inquiry,status:'delivered',receipt},chatChoices:{...p.chatChoices,s05_c08_corrections_question:p.inquiry.choice!}}),deliveredEvents:[...new Set([...s.deliveredEvents,receipt.id])]}
    const desk=s.chapter1?.correctionsDesk
    if(desk?.flowRevision==='2026-10-31'&&!desk.prior&&['a','b','c'].includes(p.inquiry.choice??'')){
      s=deskPut(s,{prior:{id:'R-GB-VH-001',choice:p.inquiry.choice as 'a'|'b'|'c',text:receipt.text}})
      s=schedule(s,'CH1-S06-DESK-REPLY',now+1600)
    }
    return s
  }
  return s
}

export function validateOrigin(value:unknown):void {
  if(value===undefined)return
  const p=value as ArchiveOriginState
  if(!p||p.version!==1||['contacted','packageDelivered','installed','securityOpen','initialInspected','followupNotified'].some(k=>typeof p[k as keyof ArchiveOriginState]!=='boolean')||!Array.isArray(p.receipts)||p.receipts.some(r=>!r||typeof r.eventId!=='string'||!['player','unknown'].includes(r.recipient)||!Array.isArray(r.factIds))||p.installStage!==undefined&&!['CONNECTING','DECRYPTING PACKAGE','INSTALLING','INSTALL COMPLETE'].includes(p.installStage)||p.initialInspected&&!p.installed)throw Error('Invalid Archive origin')
  validateConversationCheckpoint(p.checkpoint)
}
export function validateConversationCheckpoint(c:ConversationCheckpoint|undefined):void {
  if(!c)return
  const node=conversationNodeForValidation(c.nodeId)
  if(!node||c.complete!==undefined&&typeof c.complete!=='boolean'||c.paused&&(!conversationNodeForValidation(c.paused.id)||!Number.isFinite(c.paused.remainingMs)||c.paused.remainingMs<0||typeof c.paused.typing!=='boolean')||c.draft&&(c.draft.nodeId!==c.nodeId||node.kind!=='choice'||!node.choices.some(o=>o.id===c.draft!.choiceId)))throw Error('Invalid conversation checkpoint')
}
