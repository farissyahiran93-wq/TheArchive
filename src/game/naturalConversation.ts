import { naturalDeskAck, naturalDeskInstruction, naturalInquiryChoice, naturalInquiryEntrance, naturalInquiryOffer, naturalInquiryQuestions, naturalNodes, naturalOriginEntrance, naturalRegisterEntrance, naturalSourceEvents, naturalSourceKeys, naturalSources, naturalSummaryChoice, naturalSynthesis, naturalUnknownEntrance, type NaturalSource } from '../content/naturalConversation'
import { versionHistoryDialogue } from '../content/versionHistoryConversationData'
import { versionHistorySceneId } from '../content/versionHistoryConversation'
import type { GameSave } from './types'
import type { Scene01Node } from '../content/scene01'
import { canOpenPublisherInquiry, canOpenScene6Register, hasPublisherReceipt, investigationLocksApply, legitimateCompletedDesk, naturalConversation, naturalCore } from './investigationAccess'
import { canonicalIncoming, originPut } from './archiveOrigin'
import { correctionsDeskAction, deskPut } from './scene06'
import { versionHistoryPut } from './scene05'
import { enterScene01, pauseScene03 } from './scene01'
import { bridgeEnd, bridgeReportChoice } from '../content/traceBridgeV3'
import { bridgeFindingsReviewed, traceBridgeV3 } from './traceBridge'

export const naturalStartEvent='CH1-VH-NAT-START'
export const naturalRegisterEvent='CH1-VH-NAT-REGISTER'
const ledger=(s:GameSave,id:string):GameSave=>s.deliveredEvents.includes(id)?s:{...s,deliveredEvents:[...s.deliveredEvents,id]}
function schedule(s:GameSave,id:string,now:number):GameSave{return s.deliveredEvents.includes(id)||s.pendingEvents.some(e=>e.id===id)?s:{...s,pendingEvents:[...s.pendingEvents,{id,dueAt:now+1800}]}}
export function sourceActivity(s:GameSave,source:NaturalSource):GameSave{
  if(!naturalCore(s))return s
  s=ledger(s,naturalSourceEvents[source])
  const p=s.chapter1!.versionHistory!,cp=p.threads.unknown
  // A source deliberately opened out of order can become the next topic.
  // Keep a selected draft and its pending reply pinned to their own topic.
  const waiting=(['article','index','policy'] as const).find(key=>cp&&Object.values(naturalSources[key]).includes(cp.nodeId))
  if(waiting&&waiting!==source&&!cp?.draft&&!naturalSourceDiscussed(s,source))s=versionHistoryPut(s,{threads:{...p.threads,unknown:{nodeId:'OPEN-VH-NAT-SOURCE-ROUTE'}}})
  return s
}
export function naturalSourceReady(s:GameSave,source:NaturalSource):boolean {
  const p=s.chapter1?.versionHistory
  if(!p)return false
  if(source==='article')return p.flags.includes('public')&&p.flags.includes('article_metadata_inspected')&&p.flags.includes('update_analysis_saved')
  if(source==='index')return p.flags.includes('index')&&!!(s.chapter1?.archiveOrigin?.initialInspected||s.deliveredEvents.includes('TRACE_INDEX_FINDINGS_VIEWED'))
  return p.flags.includes('policy')
}
export function naturalSourceDiscussed(s:GameSave,source:NaturalSource):boolean {
  const key=naturalSourceKeys[source],choice=s.chapter1?.versionHistory?.chatChoices?.[key],id=naturalSources[source].choice
  return !!choice&&s.deliveredEvents.includes(`${id}-PLAYER-${choice}`)&&!!s.chapter1?.versionHistory?.receipts?.some(r=>r.eventId===`${id}-PLAYER-${choice}`&&r.recipient==='unknown')
}
export function nextNaturalSource(s:GameSave):NaturalSource|undefined {
  const todo=(['article','index','policy'] as const).filter(source=>!naturalSourceDiscussed(s,source))
  if(!todo.length)return undefined
  const openingChoice = traceBridgeV3(s) ? bridgeReportChoice : 'OPEN-VH-NAT-C01'
  const start=s.deliveredEvents.findIndex(id=>id.startsWith(openingChoice + '-PLAYER-'))
  const recent=todo.filter(source=>naturalSourceReady(s,source)&&s.deliveredEvents.indexOf(naturalSourceEvents[source])>start).sort((a,b)=>s.deliveredEvents.indexOf(naturalSourceEvents[b])-s.deliveredEvents.indexOf(naturalSourceEvents[a]))
  return recent[0]??(todo.includes('article')&&naturalSourceReady(s,'article')?'article':todo.includes('policy')&&naturalSourceReady(s,'policy')?'policy':todo[0])
}
export function naturalGateNext(s:GameSave,id:string):string|undefined {
  if(id==='OPEN-VH-NAT-REGISTER-WAIT')return canOpenScene6Register(s)&&!!s.evidence['NOTE-S06-DESK-LIMITS']?naturalNodes[id].kind==='gate'?naturalNodes[id].next:undefined:undefined
  const current=(['article','index','policy'] as const).find(source=>naturalSources[source].wait===id)
  const next=nextNaturalSource(s)
  if(!next)return naturalSynthesis
  if(current===next)return naturalSourceReady(s,next)?naturalSources[next].question:undefined
  return naturalSourceReady(s,next)?naturalSources[next].question:naturalSources[next].prompt
}
export function naturalCoreReady(s:GameSave):boolean {
  const p=s.chapter1?.versionHistory
  return !!p&&(['article','index','policy'] as const).every(source=>naturalSourceReady(s,source)&&naturalSourceDiscussed(s,source))&&versionHistoryDialogue.slice(0,7).every((g,i)=>{
    const nodeId = i === 0 && traceBridgeV3(s) ? bridgeReportChoice : `OPEN-VH-NAT-C0${i+1}`
    const choice=p.chatChoices?.[g.id],id=`${nodeId}-PLAYER-${choice}`
    return !!choice&&s.deliveredEvents.includes(id)&&p.receipts?.some(r=>r.eventId===id&&r.recipient==='unknown')
  })
}
export function naturalCanSend(s:GameSave,node:Extract<Scene01Node,{kind:'choice'}>):boolean {
  if(node.id.startsWith('OPEN-ORIGIN-NAT-'))return !!s.chapter1?.publicStory?.complete&&!!s.chapter1?.archiveOrigin?.reading
  const p=s.chapter1?.versionHistory
  if(!p||p.reading!=='unknown')return false
  const source=(['article','index','policy'] as const).find(source=>naturalSources[source].choice===node.id)
  if(source)return naturalSourceReady(s,source)&&!naturalSourceDiscussed(s,source)
  if(node.id==='OPEN-VH-NAT-C01')return !!s.chapter1?.archiveOrigin?.initialInspected&&p.flags.includes('public')
  if(node.id==='OPEN-VH-NAT-C05')return (['article','index','policy'] as const).every(source=>naturalSourceReady(s,source)&&naturalSourceDiscussed(s,source))
  if(node.id==='OPEN-VH-NAT-C06')return !!p.chatChoices?.[versionHistoryDialogue[4].id]
  if(node.id==='OPEN-VH-NAT-C07')return !!p.chatChoices?.[versionHistoryDialogue[5].id]
  if(node.id===naturalDeskAck)return p.complete&&s.deliveredEvents.includes(naturalDeskInstruction)
  if(node.id===naturalSummaryChoice)return canOpenScene6Register(s)&&!!s.evidence['NOTE-S06-DESK-LIMITS']
  if(node.id===naturalInquiryChoice)return !!s.chapter1?.correctionsDesk?.complete&&s.deliveredEvents.includes(naturalInquiryOffer)
  return false
}
export function naturalChoices(s:GameSave,node:Extract<Scene01Node,{kind:'choice'}>) {
  if(!naturalCanSend(s,node))return []
  const choices=node.id===naturalInquiryChoice?node.choices.filter(c=>!s.deliveredEvents.includes(`${node.id}-PLAYER-${c.id}`)):node.choices
  return node.id===naturalInquiryChoice&&hasPublisherReceipt(s)?choices.map(c=>c.id==='a'?{...c,text:'Let me review the question I already sent.'}:c):choices
}
function completeDesk(s:GameSave,now:number):GameSave {
  const d=s.chapter1?.correctionsDesk
  const choice=s.choices[naturalSummaryChoice]
  if(!d||d.complete||!canOpenScene6Register(s)||!s.evidence['NOTE-S06-DESK-LIMITS']||!choice||!s.deliveredEvents.includes(`${naturalSummaryChoice}-PLAYER-${choice}`))return s
  s=deskPut(s,{complete:true})
  s={...s,chapter1:{...s.chapter1!,completed:[...new Set([...s.chapter1!.completed,6])]}}
  if(s.chapter1Edition==='ch01-v2-10')return {...s,deliveredEvents:[...new Set([...s.deliveredEvents,'CH1-S07V2-LEAD'])],notifications:s.notifications.some(n=>n.id==='CH1-S07V2-LEAD')?s.notifications:[...s.notifications,{id:'CH1-S07V2-LEAD',text:'NEW LEAD — THE STARRED NUMBER',read:false}]}
  // The next scene remains a manual action in CorrectionsDesk.
  void now
  return s
}
export function naturalSent(s:GameSave,node:Extract<Scene01Node,{kind:'choice'}>,choiceId:string,now:number):GameSave {
  const scene=s.prologue?.scene01,choice=naturalChoices(s,node).find(c=>c.id===choiceId)
  if(!scene||scene.nodeId!==node.id||scene.queue.length||!choice||scene.draft?.nodeId!==node.id||scene.draft.choiceId!==choiceId)return s
  const id=`${node.id}-PLAYER-${choiceId}`
  if(s.deliveredEvents.includes(id))return s
  const factIds=[id+'-CLAIM']
  s={...ledger(s,id),choices:{...s.choices,[node.id]:choiceId},chapter1:{...s.chapter1!,sender:{...s.chapter1!.sender,messages:[...s.chapter1!.sender.messages,{id,sender:'player',text:choice.text,at:now}]}}}
  if(node.id.startsWith('OPEN-ORIGIN-NAT-'))s=originPut(s,{receipts:[...s.chapter1!.archiveOrigin!.receipts,{eventId:id,recipient:'unknown',factIds}]})
  else {
    const p=s.chapter1!.versionHistory!
    s=versionHistoryPut(s,{receipts:[...p.receipts??[],{eventId:id,recipient:'unknown',factIds}],...(node.number?{chatChoices:{...p.chatChoices,[node.number]:choiceId}}:{})})
    if(node.id==='OPEN-VH-NAT-C05')s=versionHistoryPut(s,{comparisonStatus:'unavailable'})
    if(node.id==='OPEN-VH-NAT-C06')s=versionHistoryPut(s,{strategy:({a:'publisher_clarification',b:'independent_copy',c:'preserve_uncertainty'} as const)[choiceId as 'a']})
    if(node.id==='OPEN-VH-NAT-C07')s=versionHistoryPut(s,{assessment:({a:'reference_without_verified_revision',b:'revision_question_unresolved',c:'maintain_source_separation'} as const)[choiceId as 'a']})
    if(node.id===naturalDeskAck){
      s=deskPut(correctionsDeskAction(s,{type:'activate'},now),{visible:false,flowRevision:'2026-10-31'})
      // Activation prepares the private desk without interrupting this sent
      // acknowledgment's reply or leaving a checkpoint on the old choice.
      s=versionHistoryPut(s,{reading:'unknown'})
    }
    if(node.id===naturalInquiryChoice&&choiceId==='c'&&!hasPublisherReceipt(s)){
      const d=s.chapter1?.correctionsDesk
      if(d&&!d.inquiry.text&&!p.inquiry.text)s=deskPut(s,{inquiry:{status:'draft',choice:'a',text:naturalInquiryQuestions[0],reviewed:false}})
    }
  }
  s={...s,prologue:{...s.prologue!,scene01:{...s.prologue!.scene01!,draft:undefined}}}
  return enterScene01(s,choice.next,now)
}
export function queueRegisterInstruction(s:GameSave,now:number):GameSave {
  if(!investigationLocksApply(s)||!s.chapter1?.versionHistory?.complete||legitimateCompletedDesk(s))return s
  const p=s.chapter1.versionHistory
  if(!p.flags.includes('natural_tail'))s=versionHistoryPut(s,{flags:[...p.flags,'natural_tail']})
  return schedule(s,naturalRegisterEvent,now)
}
export function naturalEvent(s:GameSave,node:Extract<Scene01Node,{kind:'event'}>,now:number):GameSave {
  const p=s.chapter1?.versionHistory
  if(!p)return s
  if(node.event==='natural-desk-complete'){
    s=completeDesk(s,now)
    return s.chapter1?.correctionsDesk?.complete&&node.next?enterScene01(s,node.next,now):s
  }
  if(node.event==='natural-assessment'){
    if(!naturalCoreReady(s))return s
    s=versionHistoryPut(s,{complete:true,reading:undefined,threads:{...p.threads,unknown:{nodeId:node.id,complete:true}},sophieNotified:true,flags:[...new Set([...p.flags,'group-notified'])]})
    s={...s,chapter1:{...s.chapter1!,completed:[...new Set([...s.chapter1!.completed,4,5])]},evidence:{...s.evidence,'EV-S05-REVISION-LIMIT-001':s.evidence['EV-S05-REVISION-LIMIT-001']??{id:'EV-S05-REVISION-LIMIT-001',verified:false,collectedAt:now,source:`PLAYER_PRIVATE / ${p.assessment} / revision history UNVERIFIED / no earlier text`}}}
    return queueRegisterInstruction(s,now)
  }
  return versionHistoryPut(s,{reading:undefined,threads:{...p.threads,unknown:{nodeId:node.id,complete:true}}})
}
export function scheduleNaturalStart(s:GameSave,now:number):GameSave {
  if(!naturalConversation(s)||traceBridgeV3(s)||s.chapter1?.versionHistory||!s.chapter1?.archiveOrigin?.initialInspected)return s
  return schedule(s,naturalStartEvent,now)
}
/** Reuse the actual report receipt as the opening discussion in Version History. */
export function handoffTraceBridge(s: GameSave, now: number): GameSave {
  const chapter = s.chapter1
  const origin = chapter?.archiveOrigin
  if (!traceBridgeV3(s) || !chapter || chapter.versionHistory || !origin?.reading ||
    !chapter.publicStory?.complete || !chapter.publicStory.flags.includes('article-inspected') ||
    !bridgeFindingsReviewed(s)) return s
  const choice = s.choices[bridgeReportChoice]
  const eventId = bridgeReportChoice + '-PLAYER-' + choice
  const receipt = origin.receipts.find(r => r.eventId === eventId && r.recipient === 'unknown')
  if (!['a', 'b', 'c'].includes(choice) || !receipt || !s.deliveredEvents.includes(eventId)) return s

  const wait = naturalSources.article.wait
  s = originPut(s, {
    reading: false, followupNotified: true,
    checkpoint: { nodeId: bridgeEnd, complete: true },
  })
  s = ledger(s, 'CH1-VH-START')
  s = { ...s, chapter1: { ...s.chapter1!, completed: [...new Set([...chapter.completed, 4])] } }
  s = versionHistoryPut(s, {
    version: 1, entered: true, revision: 'conversation-2026-10-28', sceneId: versionHistorySceneId,
    complete: false, flags: ['public', 'index', 'index_requested', 'article_flow', 'natural_flow'],
    checklist: [], panel: 'home', scroll: origin.scroll === undefined ? {} : { unknown: origin.scroll },
    localChoices: {}, chatChoices: { [versionHistoryDialogue[0].id]: choice },
    inquiry: { status: 'not_sent' }, sophieNotified: false, reading: 'unknown',
    threads: { unknown: { nodeId: wait } }, receipts: [receipt],
  })
  return enterScene01(s, wait, now)
}
export function naturalTick(s:GameSave,now:number):GameSave {
  const due=s.pendingEvents.filter(e=>[naturalStartEvent,naturalRegisterEvent].includes(e.id)&&e.dueAt<=now).sort((a,b)=>a.dueAt-b.dueAt)[0]
  if(!due)return s
  s={...s,pendingEvents:s.pendingEvents.filter(e=>e.id!==due.id)}
  if(s.deliveredEvents.includes(due.id))return s
  s=ledger(s,due.id)
  if(due.id===naturalStartEvent){
    if(traceBridgeV3(s)||s.chapter1?.versionHistory||!s.chapter1?.archiveOrigin?.initialInspected||!s.chapter1.publicStory?.flags.includes('article-inspected'))return s
    s=versionHistoryPut(s,{version:1,entered:true,revision:'conversation-2026-10-28',sceneId:versionHistorySceneId,complete:false,flags:['public','index','index_requested','article_flow','natural_flow'],checklist:[],panel:'home',scroll:{},localChoices:{},chatChoices:{},inquiry:{status:'not_sent'},sophieNotified:false,threads:{unknown:{nodeId:'OPEN-VH-NAT-C01'}}})
    s=originPut(s,{followupNotified:true})
    const first=naturalNodes[naturalUnknownEntrance]
    if(first.kind!=='npc')return s
    s=ledger(s,'CH1-VH-START')
    return versionHistoryPut({...s,chapter1:{...s.chapter1!,completed:[...new Set([...s.chapter1!.completed,4])],sender:{...s.chapter1!.sender,messages:[...s.chapter1!.sender.messages,{id:'CH1-VH-START',sender:'unknown',text:first.text,at:now}]}},notifications:[...s.notifications,{id:'CH1-VH-START',text:first.text,read:false}]},{receipts:[{eventId:'CH1-VH-START',recipient:'player',factIds:[]}]})
  }
  if(!s.chapter1?.versionHistory?.complete||legitimateCompletedDesk(s)||s.deliveredEvents.includes(naturalDeskInstruction))return s
  const first=naturalNodes[naturalRegisterEntrance]
  if(first.kind!=='npc')return s
  s=canonicalIncoming(s,first,now)
  s=ledger(s,first.id)
  return versionHistoryPut({...s,notifications:[...s.notifications,{id:first.id,text:first.text,read:false}]},{threads:{...s.chapter1!.versionHistory!.threads,unknown:{nodeId:first.next}}})
}
/** Existing history is retained. An old completion/receipt never fabricates an Unknown opt-in. */
export function migrateNaturalLocks(s:GameSave,now:number):GameSave {
  if(!investigationLocksApply(s)||legitimateCompletedDesk(s)||!s.chapter1?.versionHistory?.complete)return s
  if(!canOpenScene6Register(s)){
    if(s.chapter1.correctionsDesk?.visible)s=deskPut(s,{visible:false})
    if(s.notifications.some(n=>n.id==='CH1-S06-LEAD'&&!n.read))s={...s,notifications:s.notifications.map(n=>n.id==='CH1-S06-LEAD'?{...n,read:true}:n)}
    if(s.pendingEvents.some(e=>e.id==='CH1-S06-LEAD'))s={...s,pendingEvents:s.pendingEvents.filter(e=>e.id!=='CH1-S06-LEAD')}
    return queueRegisterInstruction(s,now)
  }
  return s
}

export const naturalOriginFirst=()=>naturalNodes[naturalOriginEntrance]
export function revisitNaturalInquiry(s:GameSave,now:number):GameSave {
  if(!canOpenScene6Register(s)||!s.chapter1?.correctionsDesk?.complete||hasPublisherReceipt(s)||canOpenPublisherInquiry(s))return s
  s=pauseScene03(s,now)
  const nodeId=s.deliveredEvents.includes(naturalInquiryOffer)?naturalInquiryChoice:naturalInquiryEntrance
  s=versionHistoryPut(s,{reading:'unknown',threads:{...s.chapter1!.versionHistory!.threads,unknown:{nodeId}}})
  return enterScene01(s,nodeId,now)
}
export { canOpenPublisherInquiry }
