import { campaign, compatibilityFixturesEnabled } from './campaign'
import { masterChapterMetadata } from '../content/masterChapterMetadata'
import { masterScene07Action } from './masterScene07'
import { masterScene08Action } from './masterScene08'
import { masterScene09Action } from './masterScene09'
import { canOpenScene6Register } from './investigationAccess'
import { chapter1ScenePlan } from '../content/chapter1Plan'
import { chapter1V2 } from '../content/chapter1V2'
import { sourceInvestigations } from '../content/sourceInvestigations'
import { versionHistorySceneId } from '../content/versionHistoryConversation'
import type { GameSave } from './types'
import { masterScene04Action } from './masterScene04'
import { masterScene05Action } from './masterScene05'
import { masterScene06Action } from './masterScene06'
import { beginScene01, beginScene02 } from './scene01'

// Only integrated production screenplays belong here. Structural previews and
// the separate historical Chapter 2 arc are deliberately not new-game entries.
export const chapterLibrary = [{ id: 'chapter-1', number: 1, title: 'The Missing Entry', scenes: chapter1ScenePlan
  .filter(scene => scene.implementation === 'implemented' || scene.number in sourceInvestigations)
  .map(scene => ({ number: scene.number, id: scene.id, title: ({7:'The Byline',8:'The Missing Issuer',9:'The Transfer Register',10:'The Inventory Sheet'} as Record<number,string>)[scene.number] ?? scene.title })) }]
export const libraryScenes = chapterLibrary.flatMap(chapter => chapter.scenes)
export type LibraryScene = typeof libraryScenes[number]
export const chapterLibraryForSave=(save:GameSave)=>!compatibilityFixturesEnabled||save.masterOpening?[campaign[0]]:save.chapter1Edition==='ch01-v2-10'?[{id:'chapter-1-v2',number:1,title:save.masterOpening?'The First Trace':'The Missing Entry',scenes:chapter1V2.scenes.map(({number,id,title})=>({number,id,title:save.masterOpening?masterChapterMetadata[0].scenes.find(scene=>scene.number===number)?.title??title:title}))}]:chapterLibrary
export const libraryScenesForSave=(save:GameSave)=>chapterLibraryForSave(save).flatMap(chapter=>chapter.scenes)

export function sceneVisited(save: GameSave, n: number): boolean {
  const s = save.prologue?.scene01, c = save.chapter1
  if (s?.scriptRevision !== 'final-2026-10-23' || save.chapter2Access&&save.chapter1Edition!=='ch01-v2-10') return false
  if (s.masterScene01 && n === 4) return !!save.masterScene04
  if (s.masterScene01 && n === 5) return !!save.masterScene05
  if (s.masterScene01 && n === 6) return !!save.masterScene06
  if (s.masterScene01 && n === 7) return !!save.masterScene07
  if (s.masterScene01 && n === 8) return !!save.masterScene08
  if (s.masterScene01 && n === 9) return !!save.masterScene09
  if (s.masterScene01 && n === 10) return !!save.masterScene10
  if(save.chapter1Edition==='ch01-v2-10'&&n>=7)return n===7?!!c?.starredNumberV2:n===8?!!c?.lastCheckInV2:n===9?!!c?.secondaryCardV2:n===10?!!c?.inventoryFinaleV2:false
  switch (n) {
    case 1: return !!s
    case 2: return !!s.groupScript
    case 3: return !!s.privateScene03
    case 4: return !!c?.publicStory?.started
    case 5: return !!c?.versionHistory?.entered
    case 6: return canOpenScene6Register(save)&&!!c?.correctionsDesk?.entered
    case 7: return !!c?.byline
    case 8: return !!c?.issuer
    case 9: return !!c?.transferRegister
    case 10: return !!c?.inventorySheet
    default: return false
  }
}
export function sceneComplete(save: GameSave, n: number): boolean {
  const s = save.prologue?.scene01, c = save.chapter1
  if (!sceneVisited(save, n)) return false
  if (s?.masterScene01 && n === 4) return !!save.masterScene04?.complete
  if (s?.masterScene01 && n === 5) return !!save.masterScene05?.complete
  if (s?.masterScene01 && n === 6) return !!save.masterScene06?.complete
  if (s?.masterScene01 && n === 7) return save.masterScene07?.phase==='complete'
  if (s?.masterScene01 && n === 8) return !!save.masterScene08?.complete
  if (s?.masterScene01 && n === 9) return !!save.masterScene09?.complete
  if (s?.masterScene01 && n === 10) return save.masterScene10?.phase==='complete'
  if (s?.masterScene01 && n === 2) return !!s.groupComplete && save.deliveredEvents.includes('TA-S02-SCENE03-UNLOCKED')
  if(save.chapter1Edition==='ch01-v2-10'&&n>=7)return n===7?!!c?.starredNumberV2?.complete:n===8?!!c?.lastCheckInV2?.complete:n===9?!!c?.secondaryCardV2?.complete:!!c?.inventoryFinaleV2?.complete
  return n === 1 ? s?.invitation === 'joined' : n === 2 ? !!s?.groupComplete : n === 3 ? !!s?.privateScene03?.complete
    : n === 4 ? !!c?.publicStory?.complete : n === 5 ? !!c?.versionHistory?.complete : n === 6 ? !!c?.correctionsDesk?.complete
    : n === 7 ? !!c?.byline?.complete : n === 8 ? !!c?.issuer?.complete : n === 9 ? !!c?.transferRegister?.complete : !!c?.inventorySheet?.complete
}
export function snapshotKey(save: GameSave, scene: LibraryScene): string {
  return scene.number === 5 && save.prologue?.scene01?.articleAlignment ? versionHistorySceneId : scene.id
}
export function captureSceneEntries(before: GameSave, next: GameSave, now = Date.now()): GameSave {
  const entered = libraryScenesForSave(next).filter(scene => !sceneVisited(before, scene.number) && sceneVisited(next, scene.number))
  if (!entered.length) return next
  const entries = { ...before.replayEntries, ...next.replayEntries }
  const { replayEntries: _entries, ...snapshot } = next
  for (const scene of entered) {
    const key = snapshotKey(next, scene)
    if (!entries[key]) entries[key] = { capturedAt: now, save: structuredClone(snapshot) }
  }
  return { ...next, replayEntries: entries }
}
export const hasInvestigation = (s: GameSave) => !!(s.prologue || s.player || s.chapter1 || s.chapter2Access || s.e01)
export function resumeLabel(s: GameSave): string {
  if (s.chapter2Access) return 'The People He Left Behind · historical route'
  if (s.prologue?.scene01?.scriptRevision !== 'final-2026-10-23') return 'Saved investigation'
  const scene = [...libraryScenesForSave(s)].reverse().find(scene => sceneVisited(s, scene.number))
  return scene ? `Chapter 1 · Scene ${String(scene.number).padStart(2, '0')} · ${scene.title}` : 'Saved investigation'
}

/** Rebase deadlines, not history. Preserve relative timing without delivering an
 * entire old queue at once. All pending queues in this save use dueAt/readyAt. */
export function prepareReplay(entry: NonNullable<GameSave['replayEntries']>[string], now: number, sceneNumber?: number): GameSave {
  const rebase = (value: unknown): unknown => {
    if (Array.isArray(value)) return value.map(rebase)
    if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).filter(([key]) => key !== 'replayEntries').map(([key, child]) =>
      [key, (key === 'dueAt' || key === 'readyAt') && typeof child === 'number' ? now + Math.max(0, child - entry.capturedAt) : rebase(child)]))
    return value
  }
  const replay = rebase(entry.save) as GameSave
  const scene = replay.prologue?.scene01
  // A deliberate Scene 1 restart starts the current script, while Continue
  // still resumes the exact historical graph and already-delivered text.
  if (sceneNumber === 1 && scene?.masterScene01 && (scene.masterScene01Revision !== 5 || scene.masterScene02Revision !== 4)) {
    const oldIds = new Set(scene.messages.map(line => line.id))
    const base: GameSave = { ...replay,
      deliveredEvents: replay.deliveredEvents.filter(id => !oldIds.has(id)),
      notifications: replay.notifications.filter(item => !oldIds.has(item.id)),
      prologue: { ...replay.prologue!, scene01: undefined },
    }
    return beginScene01(base, now)
  }
  if (sceneNumber === 2 && scene?.masterScene01 && scene.invitation === 'joined') {
    const isGroupEvent = (id: string) => /^(TA|OPEN)-S02-/.test(id) || ['TA-S03-FIRST-MESSAGE','OPEN-S03-FIRST-MESSAGE','TA-S03-ACTIVATED','OPEN-S03-ACTIVATED'].includes(id)
    const base: GameSave = { ...replay,
      player: { name: replay.player?.name || 'Alex', pronouns: replay.player?.pronouns ?? 'he/him' },
      choices: Object.fromEntries(Object.entries(replay.choices).filter(([id]) => !isGroupEvent(id))),
      knowledge:{player:replay.knowledge.player.filter(id=>!isGroupEvent(id)),characters:Object.fromEntries(Object.entries(replay.knowledge.characters).map(([actor,ids])=>[actor,ids.filter(id=>!isGroupEvent(id))])) as GameSave['knowledge']['characters']},
      deliveredEvents: replay.deliveredEvents.filter(id => !isGroupEvent(id)),
      notifications: replay.notifications.filter(item => !isGroupEvent(item.id)),
      messages: replay.messages.filter(item => !isGroupEvent(item.id)),
      prologue: { ...replay.prologue!, scene01: { ...scene,
        masterScene01Revision: 5, masterScene02Revision: 4, nameDisclosed: true, disclosedName: replay.player?.name || 'Alex', groupScript: undefined, draft: undefined, groupNameDraft: undefined,
        groupComplete: undefined, groupCompletedAt: undefined, lucasLeftGroup: undefined, privateHandoff: undefined,
        queue: [], groupMessages: [], groupReceipts: [],
      } },
    }
    return beginScene02(base, now)
  }
  if(sceneNumber===4&&scene?.masterScene01&&replay.masterScene04){
    const id='TA-S04-SOPHIE-ELI-ENQUIRY',first='TA-S04-FIRST'
    const base:GameSave={...replay,masterScene04:undefined,deliveredEvents:replay.deliveredEvents.filter(x=>x!==id&&x!==first),notifications:replay.notifications.filter(x=>x.id!==first),messages:replay.messages.filter(x=>x.id!==id),knowledge:{...replay.knowledge,characters:{...replay.knowledge.characters,eli:replay.knowledge.characters.eli.filter(x=>x!==id)}}}
    return masterScene04Action(base,{type:'restart-v5'},now)
  }
  // A deliberate Scene 5 restart starts today's archive flow. Historical
  // continuing saves remain pinned to their existing conversation state.
  if (sceneNumber === 5 && scene?.masterScene01 && replay.masterScene04?.complete && replay.masterScene04.traceInstalled) {
    const base: GameSave = { ...replay, masterScene05: undefined,
      deliveredEvents: replay.deliveredEvents.filter(id => !id.startsWith('TA-S05-')),
      notifications: replay.notifications.filter(item => !item.id.startsWith('TA-S05-')),
    }
    return masterScene05Action(base, {type:'start'}, now)
  }
  if (sceneNumber === 6 && scene?.masterScene01 && replay.masterScene05?.complete && replay.masterScene05.recovered && replay.masterScene05.discussion) {
    const { ['TA-FN-MISSING-HOUR']: _oldGap, ...earlierEvidence } = replay.evidence
    const base: GameSave = { ...replay, evidence: earlierEvidence, masterScene05: {...replay.masterScene05, conversationRevision:'archive-v3'}, masterScene06: undefined,
      deliveredEvents: replay.deliveredEvents.filter(id => !id.startsWith('TA-S06-')),
      notifications: replay.notifications.filter(item => !item.id.startsWith('TA-S06-')),
      messages: replay.messages.filter(item => !item.id.startsWith('TA-S06-')),
    }
    return masterScene06Action(base, {type:'start'}, now)
  }
  // Re-enter from the recorded boundary. Keep contemporaneous receipts from
  // earlier conversations, including independently started Lucas exchanges.
  if (scene?.masterScene01 && sceneNumber && [7,8,9].includes(sceneNumber)) {
    const number=String(sceneNumber).padStart(2,'0')
    const sourceId = sceneNumber===7 ? 'TA-EX-STARRED-ENTRY' : sceneNumber===8 ? 'CAP_LAST_CHECKIN_01' : 'TA-EX-REFERENCE-CARD'
    const sceneEvent=(id:string)=>id===sourceId || (id.startsWith(`TA-S${number}-`)||id.startsWith(`TA-S${number}V3-`))&&!id.startsWith('TA-S08-LUCAS-')
    const characters={...replay.knowledge.characters}
    for(const actor of Object.keys(characters) as (keyof typeof characters)[])characters[actor]=characters[actor].filter(id=>!sceneEvent(id))
    const base:GameSave={...replay,
      evidence:Object.fromEntries(Object.entries(replay.evidence).filter(([id])=>!sceneEvent(id))),
      knowledge:{player:replay.knowledge.player.filter(id=>!sceneEvent(id)),characters},
      deliveredEvents:replay.deliveredEvents.filter(id=>!sceneEvent(id)),
      notifications:replay.notifications.filter(item=>!sceneEvent(item.id)),
      messages:replay.messages.filter(item=>!sceneEvent(item.id)),
      choices:Object.fromEntries(Object.entries(replay.choices).filter(([id])=>!sceneEvent(id))),
      prologue:{...replay.prologue!,scene01:{...scene,messages:scene.messages.filter(item=>!sceneEvent(item.id))}},
    }
    const restarted=sceneNumber===7?masterScene07Action({...base,masterScene07:undefined},{type:'start'},now)
      :sceneNumber===8?masterScene08Action({...base,masterScene08:undefined},{type:'start'},now)
      :masterScene09Action({...base,masterScene09:undefined},{type:'start'},now)
    const state=sceneNumber===7?restarted.masterScene07:sceneNumber===8?restarted.masterScene08:restarted.masterScene09
    if(!state)throw Error('The preceding scene must be completed before restarting this conversation.')
    return restarted
  }
  // A requested Scene 4 replay uses today's authored bridge, even when its
  // recorded entry predates the natural-flow revisions. Keep the entry immutable.
  if (sceneNumber === 4 && scene?.scriptRevision === 'final-2026-10-23' &&
    scene.articleAlignment === '2026-10-28' && !replay.chapter1?.archiveOrigin?.contacted &&
    !replay.chapter1?.versionHistory && !replay.chapter2Access) {
    return { ...replay, prologue: { ...replay.prologue!, scene01: {
      ...scene, naturalFlowRevision: '2026-11-03', traceBridgeRevision: '2026-11-04',
    } } }
  }
  return replay
}
