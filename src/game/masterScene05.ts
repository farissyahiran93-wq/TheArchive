import { compareRecoveredFragments, masterFragments, masterScene05Beats, traceFirstScene05Beats } from '../content/masterScene05'
import type { GameSave } from './types'
import { npcDeliveryDelay } from './npcDelivery'
import { createMasterCaseFile } from './masterCaseFile'
import { usesScene04ToolPreview } from './masterScene04'
import { discussionAction, newDiscussion, type DiscussionAction, type DiscussionState } from './digitalArchiveDiscussion'
import { archiveConversation } from '../content/masterScene05ArchiveConversation'

export interface MasterScene05 {
  version: 1; revision?:'trace-first'; conversationRevision?:'archive-v1'; beat: number; draft?: number; messages: {id:string; sender:'unknown'|'player'; text:string; at:number}[]; pending?:{id:string;text:string;dueAt:number;remaining?:string[]}; archiveStatus?:'unavailable'|'offered'|'deferred'|'declined'|'accepted'; archiveInspected?:boolean; archiveRisks?:boolean
  packageStatus:'conversation'|'offered'|'deferred'|'declined'|'installed'; inspected:boolean; risksRead:boolean
  opened:boolean; selected:boolean; recovered:boolean; read:string[]; saved:string[]; complete:boolean; traceView?:string; traceReturn?:'messages'|'notes'|'timeline'|'summary'|'board'
  earlySetup?:boolean; examination?:'evidence'; observations?:string[]; comparison?:[string,string]
  discussion?: DiscussionState
  recoveryAnimation?: { startedAt:number; percent:number; acknowledged:boolean }
}
export type MasterScene05Action = {type:'start'|'send'|'tick'|'install'|'defer'|'decline'|'reconsider'|'open-trace'|'select'|'recover'|'recovery-tick'|'recovery-acknowledge'|'archive-accept'|'archive-defer'|'archive-decline'|'archive-reconsider'} | {type:'draft';index:number} | {type:'read'|'save'|'view'|'observe';id:string} | {type:'compare-fragments';left:string;right:string} | {type:'discussion'; action:DiscussionAction}
const ids=[...masterFragments.map(f=>f.id as string),'TA-PH-CHAT-MAYA','TA-PH-CHAT-SOPHIE','TA-PH-CHAT-LUCAS','TA-PH-ACTIVITY-FIRST']
const sourceViews=['messages','notes','timeline','summary','board'] as const
const traceViews=['home','activity','case-files','media',...sourceViews,...ids]
export const canSaveFragmentFinding=(p:MasterScene05,id:string)=>p.recovered&&p.read.includes(id)&&!p.saved.includes(id)&&!!p.observations?.includes(id)
const readyToDiscuss=(p:MasterScene05)=>p.recovered&&(p.discussion? p.discussion.finished:p.saved.length>0)
export const canReplyInMasterScene05=(p:MasterScene05)=>p.conversationRevision==='archive-v1'?!p.complete&&!p.pending&&p.beat<8&&(p.beat<3||p.archiveStatus==='accepted'):!p.complete&&!p.pending&&(p.revision!=='trace-first'||p.archiveStatus==='accepted')&&(p.beat<8&&(p.packageStatus==='conversation'||p.earlySetup&&p.packageStatus==='installed')||p.beat>=8&&p.beat<10&&readyToDiscuss(p))
export function masterScene05Beat(p:MasterScene05) {
  if(p.conversationRevision==='archive-v1'){
    const beat=archiveConversation[p.beat]
    return beat?{choices:beat.choices,replies:beat.replies.map(lines=>lines.join(' '))}:undefined
  }
  const beat=(p.revision==='trace-first'?traceFirstScene05Beats:masterScene05Beats)[p.beat]
  if(!beat)return beat
  if(p.earlySetup&&p.beat===0)return {choices:['Can TRACE examine this copy?','What should I do with the archive?','Can I inspect it without starting recovery?'],replies:['TRACE can work on a copy and show which fragments become readable.','Review the archive and its limits first. You decide whether to use it.','Yes. Opening or accepting the archive does not start recovery.']}
  if(p.earlySetup&&p.beat===4)return {choices:['Could using it compromise my privacy?',beat.choices[1],beat.choices[2]],replies:["I can't prove it is completely safe. Review its stated limits and stop if you aren't comfortable.",beat.replies[1],beat.replies[2]]}
  if(p.earlySetup&&p.beat===6)return {choices:['Show me what TRACE can do.','I want to review the risks again.','I may decide not to use it.'],replies:['It can inspect a selected copy and keep the original unchanged.','The source and safety claims remain unverified. You can stop at any time.',"That's your choice. You can leave the archive unopened."]}
  if(p.earlySetup&&p.beat===7)return {choices:['What should I look at first?','Does opening TRACE start recovery automatically?','I want to control each step.'],replies:['Open TRACE, select the archive, and start recovery only when you are ready.','No. Opening TRACE, selecting the archive and starting recovery are separate actions.','You should. TRACE will not read a record or send me your findings for you.']}
  if(p.beat===7&&p.revision==='trace-first')return {...beat,replies:beat.replies.map(reply=>`${reply} Case Files is there if you want to keep track of what Sophie told you and what still needs checking.`)}
  const sawJuneThread=p.read.includes('TA-PH-MESSAGE-JUNE-01')
  if(p.beat===8&&!sawJuneThread){
    const sawRecordsNote=p.read.includes('TA-PH-NOTE-RECORDS-01')
    const question=sawRecordsNote?'The note mentions June and a copy. Can you tell what it refers to?':'What can one incomplete fragment tell us?'
    const reply=sawRecordsNote?'I can’t identify the copy from that note alone. Keep it as a question until we have another source.':'It gives us a starting point. Keep what you could read separate from the context that is still missing.'
    return {choices:[question,beat.choices[1],beat.choices[2]],replies:[reply,beat.replies[1],beat.replies[2]]}
  }
  if(p.beat===9&&(!sawJuneThread||!masterFragments.some(f=>f.category==='Notes'&&p.read.includes(f.id))))return {...beat,choices:['I saved a fragment with its context still missing.',beat.choices[1],beat.choices[2]]}
  return beat
}
export const masterRecoveryUnits=(p:MasterScene05)=>p.recovered?(p.discussion?200:masterFragments.reduce((n,f)=>n+f.units,0)):0
export function masterScene05Action(s:GameSave,a:MasterScene05Action,now=Date.now()):GameSave {
  let p=s.masterScene05
  if(a.type==='start') {
    if(p||!s.masterScene04?.complete||s.masterScene04.status!=='accepted'||s.masterScene04.revision==='cinematic'&&!s.masterScene04.traceInstalled)return s
    const revised=usesScene04ToolPreview(s.masterScene04)
    const introduction=s.masterScene04.revision==='guarded-chat'
      ? "The viewer is called TRACE. Here's the encrypted copy I mentioned. I believe it contains Daniel's phone data. Its source hasn't been verified."
      : "You asked to continue. Here is an encrypted archive I believe contains Daniel's phone data. Its origin and contents have not been verified."
    if(s.masterScene04.revision==='cinematic')return {...s,masterCaseFile:s.masterCaseFile??createMasterCaseFile(),masterScene05:{version:1,revision:'trace-first',conversationRevision:'archive-v1',discussion:newDiscussion(),earlySetup:true,examination:'evidence',archiveStatus:'unavailable',archiveInspected:false,archiveRisks:false,beat:0,messages:[{id:'TA-S05-ARCHIVE-INTRO-1',sender:'unknown',text:'Did TRACE open?',at:now}],pending:{id:'TA-S05-ARCHIVE-INTRO-2',text:'You should be looking at an empty workspace.',dueAt:now+1500,remaining:["That's normal. We haven't given it anything to read yet."]},packageStatus:'installed',inspected:false,risksRead:false,opened:false,selected:false,recovered:false,read:[],saved:[],complete:false}}
    return {...s,...(s.masterScene04.traceInstalled?{masterCaseFile:s.masterCaseFile??createMasterCaseFile()}:{}),masterScene05:{version:1,...(s.masterScene04.traceInstalled?{earlySetup:true}:{}),...(revised?{revision:'trace-first' as const,archiveStatus:'offered' as const,archiveInspected:false,archiveRisks:false}:{}),...(s.masterScene04.revision==='guarded-chat'?{examination:'evidence' as const}:{}),beat:0,messages:revised?[{id:'TA-S05-INTRO-1',sender:'unknown',text:introduction,at:now}]:[{id:'TA-S05-INTRO-1',sender:'unknown',text:'You have the archive now.',at:now},{id:'TA-S05-INTRO-2',sender:'unknown',text:"It's still encrypted. Having the file doesn't make its contents readable.",at:now}],packageStatus:s.masterScene04.traceInstalled?'installed':'conversation',inspected:false,risksRead:false,opened:false,selected:false,recovered:false,read:[],saved:[],complete:false}}
  }
  if(!p)return s
  const put=(next:MasterScene05):GameSave=>({...s,masterScene05:next})
  if(a.type==='discussion'){
    if(!p.discussion||a.action.type==='discover')return s
    const discussion=discussionAction(p.discussion,a.action)
    if(discussion===p.discussion)return s
    if(discussion.finished&&!p.discussion.finished)return {...s,deliveredEvents:[...new Set([...s.deliveredEvents,'TA-S05-FINDINGS-SENT','TA-S05-COMPLETE','TA-S05-SCENE06-UNLOCKED'])],masterScene05:{...p,discussion,beat:10,complete:true}}
    return put({...p,discussion})
  }
  if(a.type==='tick'&&p.pending&&p.pending.dueAt<=now&&p.conversationRevision==='archive-v1'){
    const pending=p.pending,[text,...remaining]=pending.remaining??[]
    const next=text?{id:`${pending.id}-next`,text,dueAt:now+Math.min(7000,npcDeliveryDelay('eli',text,p.beat)),remaining}:undefined
    return {...s,deliveredEvents:[...new Set([...s.deliveredEvents,pending.id])],masterScene05:{...p,messages:[...p.messages,{id:pending.id,sender:'unknown',text:pending.text,at:now}],pending:next,archiveStatus:!next&&p.beat===3&&p.archiveStatus==='unavailable'?'offered':p.archiveStatus}}
  }
  if(a.type==='tick'&&p.pending&&p.pending.dueAt<=now){const pending=p.pending,closing='There may be activity records in another protected segment. If they become available, they might help you compare the times. A log will not tell you by itself who was holding the phone. For now, keep the archive and what you found separate.',finished=p.beat===10&&pending.id==='TA-S05-CLOSING';return {...s,deliveredEvents:[...new Set([...s.deliveredEvents,pending.id,...(finished?['TA-S05-FINDINGS-SENT','TA-S05-COMPLETE','TA-S05-SCENE06-UNLOCKED']:[])])],masterScene05:{...p,pending:p.beat===10&&!finished?{id:'TA-S05-CLOSING',text:closing,dueAt:now+Math.min(7000,npcDeliveryDelay('eli',closing,10))}:undefined,messages:[...p.messages,{id:pending.id,sender:'unknown',text:pending.text,at:now}],packageStatus:p.beat===8&&!p.earlySetup?'offered':p.packageStatus,complete:finished}}}
  if(p.revision==='trace-first'){
   if(a.type==='archive-accept'&&p.archiveStatus==='offered')return {...s,deliveredEvents:[...new Set([...s.deliveredEvents,'TA-S05-ARCHIVE-ACCEPTED'])],masterScene05:{...p,archiveStatus:'accepted'}}
   if((a.type==='archive-defer'||a.type==='archive-decline')&&p.archiveStatus==='offered'&&p.conversationRevision==='archive-v1'&&!p.pending){
    const text=a.type==='archive-defer'?"That's fine. Take your time.":"I understand. It's your decision."
    return put({...p,archiveStatus:a.type==='archive-defer'?'deferred':'declined',pending:{id:`TA-S05-ARCHIVE-DEFER-${p.messages.length}`,text,dueAt:now+Math.min(7000,npcDeliveryDelay('eli',text,p.beat)),remaining:['The file will be here if you want to reconsider.']}})
   }
   if((a.type==='archive-defer'||a.type==='archive-decline')&&p.archiveStatus==='offered')return put({...p,archiveStatus:a.type==='archive-defer'?'deferred':'declined'})
   if(a.type==='archive-reconsider'&&!p.pending&&['deferred','declined'].includes(p.archiveStatus??''))return put({...p,archiveStatus:'offered'})
  }
  if(a.type==='draft'&&canReplyInMasterScene05(p)&&Number.isInteger(a.index)&&a.index>=0&&a.index<3)return put({...p,draft:a.index})
  if(a.type==='send'&&p.draft!==undefined&&canReplyInMasterScene05(p)){
    const n=p.beat,choice=p.draft,beat=masterScene05Beat(p)
    if(!beat)return s
    if(p.conversationRevision==='archive-v1'){
      const [text,...remaining]=archiveConversation[n].replies[choice]
      return put({...p,beat:n+1,draft:undefined,messages:[...p.messages,{id:`TA-S05-ARCHIVE-C${n+1}-P-${choice}`,sender:'player',text:beat.choices[choice],at:now}],pending:{id:`TA-S05-ARCHIVE-C${n+1}-U-${choice}`,text,dueAt:now+Math.min(7000,npcDeliveryDelay('eli',text,n)),remaining:[...remaining,...(n===2?["This is the copy I told you about.","It's encrypted. TRACE might get further than I did."]:[])]}})
    }
    if(p.revision==='trace-first')return put({...p,beat:n+1,draft:undefined,messages:[...p.messages,{id:`TA-S05-C${n+1}-P-${choice}`,sender:'player',text:beat.choices[choice],at:now}],pending:{id:`TA-S05-C${n+1}-U-${choice}`,text:beat.replies[choice],dueAt:now+Math.min(7000,npcDeliveryDelay('eli',beat.replies[choice],n))}})
    const messages=[...p.messages,{id:`TA-S05-C${n+1}-P-${choice}`,sender:'player' as const,text:beat.choices[choice],at:now},{id:`TA-S05-C${n+1}-U-${choice}`,sender:'unknown' as const,text:beat.replies[choice],at:now}]
    if(n===9)messages.push({id:'TA-S05-CLOSING',sender:'unknown',text:'There may be activity records in another protected segment. If they become available, they might help you compare the times. A log will not tell you by itself who was holding the phone. For now, keep the archive and what you found separate.',at:now})
    const complete=n===9
    return {...s,deliveredEvents:complete?[...new Set([...s.deliveredEvents,'TA-S05-FINDINGS-SENT','TA-S05-COMPLETE','TA-S05-SCENE06-UNLOCKED'])]:s.deliveredEvents,masterScene05:{...p,beat:n+1,draft:undefined,messages,packageStatus:n===7?'offered':p.packageStatus,complete}}
  }
  if((a.type==='defer'||a.type==='decline')&&p.packageStatus==='offered')return put({...p,packageStatus:a.type==='defer'?'deferred':'declined'})
  if(a.type==='reconsider'&&['deferred','declined'].includes(p.packageStatus))return put({...p,packageStatus:'offered'})
  if(a.type==='install'&&p.packageStatus==='offered')return {...put({...p,packageStatus:'installed'}),masterCaseFile:s.masterCaseFile??createMasterCaseFile()}
  if(a.type==='open-trace'&&p.packageStatus==='installed'&&(!p.opened||!s.masterCaseFile))return {...put({...p,opened:true}),masterCaseFile:s.masterCaseFile??createMasterCaseFile()}
  if(a.type==='view'&&p.packageStatus==='installed'&&traceViews.includes(a.id)&&(!ids.includes(a.id)||p.recovered)&&(a.id!=='timeline'||!!s.masterScene06?.recovered)){const from=sourceViews.find(view=>view===p.traceView);return put({...p,traceView:a.id,...(ids.includes(a.id)&&from?{traceReturn:from}:{})})}
  if(a.type==='select'&&p.opened&&(!p.earlySetup||p.archiveStatus==='accepted'&&p.beat>=8))return put({...p,selected:true})
  if(a.type==='recover'&&p.packageStatus==='installed'&&p.opened&&!p.recovered&&!p.recoveryAnimation&&(!p.earlySetup||p.archiveStatus==='accepted'&&p.beat>=8))return p.discussion?put({...p,selected:true,recoveryAnimation:{startedAt:now,percent:0,acknowledged:false}}):put({...p,selected:true,recovered:true})
  if(a.type==='recovery-tick'&&p.recoveryAnimation&&!p.recovered){
    const percent=Math.min(20,Math.max(p.recoveryAnimation.percent,Math.floor(Math.max(0,now-p.recoveryAnimation.startedAt)/400)))
    if(percent===p.recoveryAnimation.percent)return s
    return put({...p,recovered:percent===20,recoveryAnimation:{...p.recoveryAnimation,percent}})
  }
  if(a.type==='recovery-acknowledge'&&p.recoveryAnimation&&p.recovered&&!p.recoveryAnimation.acknowledged)return put({...p,recoveryAnimation:{...p.recoveryAnimation,acknowledged:true}})
  if(a.type==='read'&&p.recovered&&ids.includes(a.id)&&(!a.id.startsWith('TA-PH-CHAT-')||!!p.discussion)&&!p.read.includes(a.id)){
    const topic=a.id==='TA-PH-NOTE-ORDINARY-01'?'dinner':a.id==='TA-PH-NOTE-RECORDS-01'?'records':a.id==='TA-PH-CHAT-MAYA'?'maya':a.id==='TA-PH-CHAT-SOPHIE'?'sophie':a.id==='TA-PH-CHAT-LUCAS'?'lucas':a.id==='TA-PH-ACTIVITY-FIRST'?'activity':undefined
    const discussion=topic&&p.discussion?discussionAction(p.discussion,{type:'discover',topic}):p.discussion
    return put({...p,read:[...p.read,a.id],discussion})
  }
  if(a.type==='observe'&&p.recovered&&p.read.includes(a.id)&&!p.observations?.includes(a.id))return put({...p,observations:[...p.observations??[],a.id]})
  if(a.type==='compare-fragments'&&p.recovered&&p.read.includes(a.left)&&compareRecoveredFragments(a.left,a.right)){
    return put({...p,read:[...new Set([...p.read,a.right])],observations:[...new Set([...p.observations??[],a.left,a.right])],comparison:[a.left,a.right]})
  }
  if(a.type==='save'&&canSaveFragmentFinding(p,a.id)){
    const source=`${a.id} · partial, source unverified`
    return {...s,evidence:{...s.evidence,[a.id]:{id:a.id,source,collectedAt:now,verified:false}},masterScene05:{...p,saved:[...p.saved,a.id]}}
  }
  return s
}
export function validateMasterScene05(value:unknown):void {
  if(value===undefined)return
  const p=value as MasterScene05
  if(!p||p.version!==1||p.traceReturn!==undefined&&!sourceViews.includes(p.traceReturn)||p.traceView!==undefined&&(!traceViews.includes(p.traceView)||ids.includes(p.traceView)&&!p.recovered)||p.revision!==undefined&&p.revision!=='trace-first'||p.pending!==undefined&&(!p.pending||typeof p.pending.id!=='string'||typeof p.pending.text!=='string'||!Number.isFinite(p.pending.dueAt))||p.revision==='trace-first'&&(!['offered','deferred','declined','accepted',...(p.conversationRevision==='archive-v1'?['unavailable']:[])].includes(p.archiveStatus??'')||typeof p.archiveInspected!=='boolean'||typeof p.archiveRisks!=='boolean')||!Number.isInteger(p.beat)||p.beat<0||p.beat>10||!Array.isArray(p.messages)||!Array.isArray(p.read)||!Array.isArray(p.saved)||p.read.some(id=>!ids.includes(id))||p.saved.some(id=>!p.read.includes(id))||!['conversation','offered','deferred','declined','installed'].includes(p.packageStatus)||['inspected','risksRead','opened','selected','recovered','complete'].some(k=>typeof p[k as keyof MasterScene05]!=='boolean')||p.recovered&&(!p.selected||!p.opened||p.packageStatus!=='installed')||p.complete&&(p.beat!==10||!readyToDiscuss(p)))throw Error('Invalid Scene 5 progress')
  if(p.conversationRevision!==undefined&&(p.conversationRevision!=='archive-v1'||p.revision!=='trace-first'||!p.earlySetup||!p.discussion||p.archiveStatus==='unavailable'&&p.beat>3))throw Error('Invalid archive conversation')
  if(p.pending?.remaining!==undefined&&(!Array.isArray(p.pending.remaining)||p.pending.remaining.some(text=>typeof text!=='string')))throw Error('Invalid queued reply')
  if(p.earlySetup!==undefined&&typeof p.earlySetup!=='boolean')throw Error('Invalid TRACE setup')
  if(p.recoveryAnimation!==undefined&&(!p.discussion||!p.recoveryAnimation||!Number.isFinite(p.recoveryAnimation.startedAt)||!Number.isInteger(p.recoveryAnimation.percent)||p.recoveryAnimation.percent<0||p.recoveryAnimation.percent>20||typeof p.recoveryAnimation.acknowledged!=='boolean'||p.recoveryAnimation.acknowledged&&!p.recovered||p.recovered!==(p.recoveryAnimation.percent===20)))throw Error('Invalid recovery animation')
  if(p.examination!==undefined&&(p.examination!=='evidence'||p.revision!=='trace-first'))throw Error('Invalid Scene 5 evidence route')
  if(p.observations!==undefined&&(!p.recovered||!Array.isArray(p.observations)||p.observations.some(id=>!p.read.includes(id))||new Set(p.observations).size!==p.observations.length))throw Error('Invalid Scene 5 observations')
  if(p.comparison!==undefined&&(!Array.isArray(p.comparison)||p.comparison.length!==2||!compareRecoveredFragments(...p.comparison)||p.comparison.some(id=>!p.observations?.includes(id))))throw Error('Invalid Scene 5 comparison')
  if(p.examination==='evidence'&&p.saved.some(id=>!p.observations?.includes(id)))throw Error('Missing Scene 5 finding support')
}
