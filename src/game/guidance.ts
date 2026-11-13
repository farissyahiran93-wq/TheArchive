import { canOpenPublisherInquiry, canOpenScene6Register, hasPublisherReceipt, investigationLocksApply, naturalConversation, naturalCore } from './investigationAccess'
import { naturalInquiryChoice, naturalSources } from '../content/naturalConversation'
import type { GameSave } from './types'
import { archiveInstalled } from './archiveOrigin'
import { actINodes } from '../content/actIRegistry'
import { accessChoices } from './chapter2Access'
import { visibleSource, sourceState, sourceLocalEligible, sourceFinalChoice } from './sourceInvestigation'
import { deskReady } from './scene06'
import { bridgeFindingsWait, bridgeInstallWait } from '../content/traceBridgeV3'
import { bridgeComparisonEvent, bridgeInspectionEvent, traceBridgeV3 } from './traceBridge'

export type GuidanceObjective = { app: 'messages' | 'archive'; title: string; detail: string }
export type GuidanceAction = 'open-thread'|'choose-reply'|'send-reply'|'review-package'|'install'|'installation-done'|'open-article'|'mark-article-read'|'inspect-update'|'save-update-analysis'|'open-policy'|'read-policy'|'inspect-reference'|'start-trace'|'view-findings'|'compare-reference'|'enter-version-history'|'discuss-article'|'discuss-index'|'discuss-policy'|'open-register'|'save-register-finding'|'enter-desk'|'next-lead'|'open-inquiry'|'choose-inquiry'|'review-inquiry'|'send-inquiry'|'open-app'
export type GuidanceTarget = { app: 'messages'|'archive'|'bulletin'; action: GuidanceAction; thread?: 'sophie'|'group'|'unknown' }

/** One next action, derived from actual progress. Pure presentation; never a gate. */
export function guidanceTarget(save: GameSave): GuidanceTarget | undefined {
  if(save.masterScene09){if(save.masterScene09.complete)return undefined;return save.masterScene09.beat===8&&!save.masterScene09.saved?{app:'archive',action:'open-app'}:{app:'messages',action:'open-app'}}
  if(save.masterScene08?.complete)return {app:'messages',action:'open-app'}
  if(save.masterScene08)return save.masterScene08.beat===8&&!save.masterScene08.saved?{app:'archive',action:'open-app'}:{app:'messages',action:'open-app'}
  if(save.masterScene07?.phase==='complete')return {app:'messages',action:'open-app'}
  if(save.masterScene04?.complete){const p=save.masterScene05,six=save.masterScene06;if(p?.complete){if(six?.complete)return undefined;if(six&&six.beat===8&&!six.saved)return {app:'archive',action:'open-app'};return {app:'messages',thread:'unknown',action:'open-thread'}}if(p?.packageStatus==='installed'&&(!p.earlySetup||p.archiveStatus==='accepted'&&p.beat>=8)&&(!p.recovered||p.read.length<4||!p.saved.length))return {app:'archive',action:'open-app'};return {app:'messages',thread:'unknown',action:'open-thread'}}
  if(save.masterScene04&&!save.masterScene04.complete){if(save.masterScene04.pending)return undefined;return {app:'messages',thread:'unknown',action:save.masterScene04.opened?(save.masterScene04.draft===undefined?'choose-reply':'send-reply'):'open-thread'}}
  const scene=save.prologue?.scene01,c=save.chapter1,p=c?.publicStory,origin=c?.archiveOrigin,vh=c?.versionHistory,desk=c?.correctionsDesk
  const reply=(thread:'sophie'|'group'|'unknown'):GuidanceTarget=>({app:'messages',thread,action:scene?.draft?'send-reply':'choose-reply'})
  if(scene?.privateHandoff?.deliveredAt!==undefined&&scene.privateHandoff.openedAt===undefined)return {app:'messages',thread:'sophie',action:'open-thread'}
  if(p&&!p.complete&&save.deliveredEvents.includes('CH1-S04-LEAD')) {
    if(p.flags.includes('link-delivered')&&!p.flags.includes('article-inspected'))return {app:'bulletin',action:p.flags.includes('article-opened')?'mark-article-read':'open-article'}
    return reply('sophie')
  }
  if(origin?.securityOpen){
    if(origin.installed)return {app:'messages',thread:'unknown',action:'installation-done'}
    if(!origin.installStage)return {app:'messages',thread:'unknown',action:'install'}
    return undefined
  }
  if (traceBridgeV3(save) && origin?.contacted && !vh) {
    const checkpoint = origin.reading ? scene?.nodeId : origin.checkpoint?.nodeId
    if (!origin.installed) {
      if (origin.packageDelivered && checkpoint === bridgeInstallWait) return {app:'messages',thread:'unknown',action:'review-package'}
      return reply('unknown')
    }
    if (c?.trace?.scan.status === 'running') return undefined
    if (!origin.reading && c?.trace?.findingsOpen && !save.deliveredEvents.includes(bridgeComparisonEvent)) return {app:'archive',action:'compare-reference'}
    if (origin.initialInspected || checkpoint !== bridgeFindingsWait) return reply('unknown')
    if (c?.trace?.scan.status === 'complete') return {app:'archive',action:'view-findings'}
    const inspected = save.deliveredEvents.includes(bridgeInspectionEvent)
    return {app:'archive',action:inspected ? 'start-trace' : 'inspect-reference'}
  }
  if(origin?.contacted&&!origin.installed){
    if(origin.packageDelivered&&origin.checkpoint?.complete)return {app:'messages',thread:'unknown',action:'review-package'}
    return reply('unknown')
  }
  if(origin?.installed&&!origin.initialInspected){
    if(c?.trace?.scan.status==='running')return undefined
    return {app:'archive',action:c?.trace?.scan.status==='complete'?'view-findings':'start-trace'}
  }
  if(origin?.installed&&origin.initialInspected&&!vh&&p?.complete&&naturalConversation(save))return {app:'messages',thread:'unknown',action:'open-thread'}
  if(origin?.installed&&origin.initialInspected&&!vh&&p?.complete)return {app:'archive',action:'enter-version-history'}
  if(investigationLocksApply(save)&&vh?.complete&&!c?.starredNumberV2&&!c?.byline&&!c?.issuer&&!c?.transferRegister&&!c?.inventorySheet){
    if(!canOpenScene6Register(save))return reply('unknown')
    if(!desk?.complete){
      if(save.evidence['NOTE-S06-DESK-LIMITS'])return reply('unknown')
      return {app:'bulletin',action:desk?.panel==='register'?'save-register-finding':'open-register'}
    }
    if(scene?.nodeId===naturalInquiryChoice&&vh.reading==='unknown')return reply('unknown')
    if(canOpenPublisherInquiry(save)&&!hasPublisherReceipt(save)){
      const inquiry=!desk.inquiry.text&&vh.inquiry.text?vh.inquiry:desk.inquiry
      return {app:'bulletin',action:desk.panel==='form'?inquiry.reviewed?'send-inquiry':inquiry.text?'review-inquiry':'choose-inquiry':'open-inquiry'}
    }
    return {app:'archive',action:'next-lead'}
  }
  if(desk?.visible){
    if(desk.complete)return {app:'archive',action:'next-lead'}
    if(desk.flowRevision==='2026-10-31')return {app:'archive',action:desk.panel==='register'?'save-register-finding':'open-register'}
  }
  if(vh&&!vh.complete){
    const node=scene?actINodes(scene)[scene.nodeId]:undefined
    if(naturalCore(save)){
      if(node?.kind==='choice'&&node.channel==='unknown')return reply('unknown')
      const source=(['article','index','policy'] as const).find(source=>naturalSources[source].wait===node?.id)
      if(source==='article')return {app:'bulletin',action:vh.flags.includes('article_metadata_inspected')?'save-update-analysis':'inspect-update'}
      if(source==='index')return {app:'archive',action:'view-findings'}
      if(source==='policy')return {app:'bulletin',action:vh.panel==='policy'?'read-policy':'open-policy'}
      return {app:'messages',thread:'unknown',action:'open-thread'}
    }
    if(!vh.chatChoices?.s05_c01_investigation_order)return reply('unknown')
    if(node?.kind==='choice'&&node.channel==='unknown')return reply('unknown')
    if(vh.flags.includes('flexible_sources')&&node?.id==='OPEN-VH-NEW-SOURCE-HUB'){
      if(vh.flags.includes('update_analysis_saved')&&!vh.chatChoices?.s05_c02_update_label)return {app:'messages',thread:'unknown',action:'discuss-article'}
      if(vh.flags.includes('index')&&!vh.chatChoices?.s05_c03_index_meaning)return {app:'messages',thread:'unknown',action:'discuss-index'}
      if(vh.flags.includes('policy')&&!vh.chatChoices?.s05_c04_policy_meaning)return {app:'messages',thread:'unknown',action:'discuss-policy'}
    }
    if(!vh.flags.includes('article_metadata_inspected'))return {app:'bulletin',action:'inspect-update'}
    if(!vh.flags.includes('update_analysis_saved')&&vh.flags.includes('article_flow'))return {app:'bulletin',action:'save-update-analysis'}
    if(!vh.flags.includes('index'))return {app:'archive',action:'view-findings'}
    if(!vh.flags.includes('policy'))return {app:'bulletin',action:vh.panel==='policy'?'read-policy':'open-policy'}
    return {app:'messages',thread:'unknown',action:'open-thread'}
  }
  if(vh?.complete&&!desk?.complete)return {app:'archive',action:'enter-desk'}
  const node=scene?actINodes(scene)[scene.nodeId]:undefined
  if(node?.kind==='choice'&&!scene?.queue.length&&/^OPEN-S0[123]-/.test(node.id))return reply(node.channel==='group'?'group':'sophie')
  const objective=currentObjective(save)
  return objective?{app:objective.app,action:'open-app'}:undefined
}
/** Conservative projections: only actions already available in the saved route are surfaced. */
export function currentObjective(save: GameSave): GuidanceObjective | undefined {
  if(save.masterScene09?.complete)return {app:'messages',title:'Scene 10 unlocked',detail:'The public inventory search is the next lead.'}
  if(save.masterScene09)return save.masterScene09.beat===8&&!save.masterScene09.saved?{app:'archive',title:'Examine the reference card',detail:'Analyse the photo, compare sources and save a private finding.'}:{app:'messages',title:'Continue with Maya',detail:'Discuss the photograph and inspect its source.'}
  if(save.masterScene08?.complete)return {app:'messages',title:'Scene 9 unlocked',detail:'Open Maya’s conversation when ready to inspect the photograph.'}
  if(save.masterScene08)return save.masterScene08.beat===8&&!save.masterScene08.saved?{app:'archive',title:'Examine Maya’s capture',detail:'Compare sources and save a provisional finding.'}:{app:'messages',title:'Continue with Maya',detail:'Discuss and inspect the earlier check-in.'}
  if(save.masterScene07?.phase==='complete')return {app:'messages',title:'Scene 8 unlocked',detail:'Open Maya’s conversation when ready.'}
  if(save.masterScene04?.complete){const p=save.masterScene05,six=save.masterScene06;if(p?.complete){if(six?.complete)return {app:'messages',title:'Scene 7 unlocked',detail:'Sophie’s contact export is a separate source for the next investigation.'};if(six&&six.beat===8&&!six.saved)return {app:'archive',title:'Reconstruct the timeline',detail:'Inspect the activity log and save a source-grounded finding.'};return {app:'messages',title:six?'Continue with Unknown':'Scene 6 unlocked',detail:six?'Continue the conversation or review your report.':'Start The Missing Hour when ready.'}}if(p?.packageStatus==='installed'&&(!p.earlySetup||p.archiveStatus==='accepted'&&p.beat>=8)&&(!p.recovered||p.read.length<4||!p.saved.length))return {app:'archive',title:'Examine Daniel’s archive',detail:'Open TRACE and inspect the available sources.'};return {app:'messages',title:p?'Continue with Unknown':'Scene 5 unlocked',detail:p?'Review the offer or send your selected response.':'Open Unknown and start The Digital Archive when ready.'}}
  if(save.masterScene04)return {app:'messages',title:'Review Unknown’s message',detail:'Question the sender and decide whether to set up TRACE.'}
  const scene = save.prologue?.scene01
  if (scene?.privateHandoff?.deliveredAt !== undefined && scene.privateHandoff.openedAt === undefined) return {app:'messages',title:'Open Sophie’s message',detail:'Sophie has sent a private message.'}
  if (save.chapter2Access?.groupQueued && save.chapter2Access.groupMessages.length && !save.chapter2Access.groupOpened) return {app:'messages',title:'Open FIND DANIEL',detail:'The group conversation is ready to read.'}
  if (save.chapter2Access?.unknownCreated && !save.chapter2Access.complete && accessChoices(save).length) return { app:'messages', title:'Reply to Unknown', detail:'Choose a response and send it when you are ready.' }
  if (scene && !scene.queue.length && /^OPEN-S0[123]-/.test(scene.nodeId)) {
    const node = actINodes(scene)[scene.nodeId]
    if (node?.kind === 'choice' && node.channel !== 'archive') return { app:'messages', title:'Continue the conversation', detail:'Choose a response and send it when you are ready.' }
  }
  const origin = save.chapter1?.archiveOrigin
  if (origin?.contacted && !origin.checkpoint?.complete && !origin.installed) return { app:'messages', title:'Read the Unknown Number conversation', detail:'Review the message and choose whether to respond.' }
  if (origin?.packageDelivered && !origin.installed && !origin.installStage) return { app:'messages', title:'Review the TRACE package', detail:'Inspect its origin and decide whether to install it.' }
  if (origin?.installed && !origin.initialInspected) return { app:'archive', title:'Inspect the recovered reference', detail:'The reference is not an earlier article copy.' }
  const source = visibleSource(save)
  if (source) {
    const p = sourceState(save,source)!
    if (p.complete) return undefined
    const pages = source===7 ? [['article-read','Review the public article'],['profile-read','Review the public byline'],['note-read','Read the reporting note'],['reference-read','Review the publisher reference'],['catalogue-read','Review the public catalogue']] : source===8 ? [['directory-read','Read the civic directory'],['index-read','Read the public index guide'],['guide-read','Read the former office guide']] : source===9 ? [['register-read','Read the public transfer register'],['finding-aid-read','Read the public finding aid']] : [['box-index-read','Inspect the public box index'],['access-read','Read the catalogue access note']]
    const missing=pages.find(([flag])=>!p.flags.includes(flag))
    if(missing)return {app:'archive',title:missing[1],detail:'Review the available public source and its limits.'}
    if(sourceLocalEligible(save,source,sourceFinalChoice(source)))return {app:'archive',title:'Record your private conclusion',detail:'Use only the sources you have inspected.'}
    return undefined
  }
  const desk=save.chapter1?.correctionsDesk
  if(desk?.visible && !desk.complete) {
    if(!desk.flags.includes('register-read'))return {app:'archive',title:'Read the public corrections register',detail:'Review the publisher listing and acknowledge it.'}
    if(!desk.flags.includes('scope-read'))return {app:'archive',title:'Read the corrections scope',detail:'Review what the desk says it can handle.'}
    if(deskReady(save))return {app:'archive',title:'Record your private conclusion',detail:'The sources do not establish a wording change.'}
    return undefined
  }
  const vh = save.chapter1?.versionHistory
  if (!vh || vh.complete || !archiveInstalled(save)) return undefined
  if (!vh.flags.includes('public')) return { app:'archive', title:'Review the public article', detail:'Inspect the available article before drawing a conclusion.' }
  if (!vh.flags.includes('index') && (!vh.flags.includes('article_flow') || vh.flags.includes('index_requested'))) return { app:'archive', title:'Inspect the related index', detail:'The index is a reference, not a recovered article body.' }
  if (!vh.flags.includes('policy')) return { app:'archive', title:'Read the publication policy', detail:'Review what the publisher says about updates.' }
  return undefined
}
