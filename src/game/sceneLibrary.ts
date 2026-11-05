import { canOpenScene6Register } from './investigationAccess'
import { chapter1ScenePlan } from '../content/chapter1Plan'
import { chapter1V2 } from '../content/chapter1V2'
import { sourceInvestigations } from '../content/sourceInvestigations'
import { versionHistorySceneId } from '../content/versionHistoryConversation'
import type { GameSave } from './types'

// Only integrated production screenplays belong here. Structural previews and
// the separate historical Chapter 2 arc are deliberately not new-game entries.
export const chapterLibrary = [{ id: 'chapter-1', number: 1, title: 'The Missing Entry', scenes: chapter1ScenePlan
  .filter(scene => scene.implementation === 'implemented' || scene.number in sourceInvestigations)
  .map(scene => ({ number: scene.number, id: scene.id, title: ({7:'The Byline',8:'The Missing Issuer',9:'The Transfer Register',10:'The Inventory Sheet'} as Record<number,string>)[scene.number] ?? scene.title })) }]
export const libraryScenes = chapterLibrary.flatMap(chapter => chapter.scenes)
export type LibraryScene = typeof libraryScenes[number]
export const chapterLibraryForSave=(save:GameSave)=>save.chapter1Edition==='ch01-v2-10'?[{id:'chapter-1-v2',number:1,title:'The Missing Entry',scenes:chapter1V2.scenes.map(({number,id,title})=>({number,id,title}))}]:chapterLibrary
export const libraryScenesForSave=(save:GameSave)=>chapterLibraryForSave(save).flatMap(chapter=>chapter.scenes)

export function sceneVisited(save: GameSave, n: number): boolean {
  const s = save.prologue?.scene01, c = save.chapter1
  if (s?.scriptRevision !== 'final-2026-10-23' || save.chapter2Access&&save.chapter1Edition!=='ch01-v2-10') return false
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
