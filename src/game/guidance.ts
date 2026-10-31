import type { GameSave } from './types'
import { archiveInstalled } from './archiveOrigin'
import { actINodes } from '../content/actIRegistry'
import { accessChoices } from './chapter2Access'
import { visibleSource, sourceState, sourceLocalEligible, sourceFinalChoice } from './sourceInvestigation'
import { deskReady } from './scene06'

export type GuidanceObjective = { app: 'messages' | 'archive'; title: string; detail: string }
/** Conservative projections: only actions already available in the saved route are surfaced. */
export function currentObjective(save: GameSave): GuidanceObjective | undefined {
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
