import { scheduleNaturalStart, sourceActivity } from './naturalConversation'
import { bridgeTraceStages, traceAnalysisId, traceDurationMs, traceFindings, traceReferenceId, traceStages } from '../content/traceReference'
import { archiveInstalled, originAction } from './archiveOrigin'
import { versionHistoryAction } from './scene05'
import { publicStorySave } from './scene04'
import type { GameSave } from './types'
import { bridgeComparisonEvent, bridgeInspectionEvent, traceBridgeV3 } from './traceBridge'

export type TraceTab = 'workspace' | 'tracker' | 'decryptor' | 'vault' | 'activity'
export type TraceScrollKey = TraceTab | 'findings'
export interface TraceState {
  version: 1
  tab: TraceTab
  scan: { status: 'idle' | 'running' | 'paused' | 'complete'; elapsedMs: number }
  findingsOpen: boolean
  scroll?: Partial<Record<TraceScrollKey, number>>
}
export const bulletinLinkReceived = (s: GameSave) => s.deliveredEvents.includes('OPEN-S04-ARTICLE-ATTACHMENT') && !!s.prologue?.scene01?.messages.some(m => m.id === 'OPEN-S04-ARTICLE-ATTACHMENT' && m.sender === 'sophie' && m.attachment === 'article')
export const traceReferenceAvailable = (s: GameSave) => archiveInstalled(s) && !!(s.chapter1?.publicStory?.flags.includes('index-available') || s.chapter1?.archiveOrigin?.initialInspected || s.chapter1?.versionHistory?.flags.some(f => f === 'index_requested' || f === 'index'))
export const traceIndexInspected = (s: GameSave) => !!(s.chapter1?.archiveOrigin?.initialInspected || s.chapter1?.versionHistory?.flags.includes('index'))
export const traceInitial = (): TraceState => ({ version: 1, tab: 'workspace', scan: { status: 'idle', elapsedMs: 0 }, findingsOpen: false })
export function tracePresentation(elapsedMs: number, bridge = false) {
  const elapsed = Math.max(0, Math.min(traceDurationMs, elapsedMs))
  const progress = Math.floor(elapsed / traceDurationMs * 100)
  if (bridge) {
    const reached = bridgeTraceStages.filter(([threshold]) => progress >= threshold)
    return { progress, stage: reached.at(-1)![1], logCount: reached.length }
  }
  return { progress, stage: traceStages[Math.min(4, Math.floor(elapsed / (traceDurationMs / 4)))]!, logCount: [0,25,50,75,80,86,93,100].filter(at=>progress>=at).length }
}
export type TraceAction = { type: 'tab'; tab: TraceTab } | { type: 'inspect-reference' | 'start' | 'findings' | 'close-findings' } | { type: 'compare'; field: 'PUBLIC_ARTICLE' | 'TITLE' } | { type: 'checkpoint'; elapsedMs: number; status: 'paused' | 'complete' } | { type: 'scroll'; key: TraceScrollKey; value: number }
/** Animation state is presentation only. Only explicit findings inspection records an analysis. */
export function traceAction(s: GameSave, a: TraceAction, now = Date.now()): GameSave {
  if (!s.chapter1 || !archiveInstalled(s)) return s
  const p = s.chapter1.trace ?? traceInitial()
  const put = (state: GameSave, patch: Partial<TraceState>): GameSave => ({ ...state, chapter1: { ...state.chapter1!, trace: { ...p, ...patch } } })
  if (a.type === 'tab') return p.tab === a.tab && !p.findingsOpen && s.chapter1.trace ? s : put(s, { tab: a.tab, findingsOpen: false })
  if (a.type === 'scroll') return !Number.isFinite(a.value) || a.value < 0 ? s : put(s, { scroll: { ...p.scroll, [a.key]: a.value } })
  if (a.type === 'close-findings') return put(s, { findingsOpen: false })
  if (!traceReferenceAvailable(s)) return s
  const bridge = traceBridgeV3(s)
  if (a.type === 'inspect-reference') {
    if (!bridge) return s
    const inspected = s.deliveredEvents.includes(bridgeInspectionEvent) ? s :
      { ...s, deliveredEvents: [...s.deliveredEvents, bridgeInspectionEvent] }
    return put(inspected, { tab: 'tracker', findingsOpen: false })
  }
  if (a.type === 'compare') {
    if (!bridge || !p.findingsOpen || a.field !== 'PUBLIC_ARTICLE' ||
      !s.deliveredEvents.includes('TRACE_INDEX_FINDINGS_VIEWED') || s.deliveredEvents.includes(bridgeComparisonEvent)) return s
    return { ...s, deliveredEvents: [...s.deliveredEvents, bridgeComparisonEvent] }
  }
  if (a.type === 'start') {
    if (bridge && (!s.deliveredEvents.includes(bridgeInspectionEvent) || p.scan.status === 'running' ||
      p.scan.status === 'complete' && !s.chapter1.versionHistory)) return s
    return put(s, { tab: 'tracker', findingsOpen: false, scan: { status: 'running', elapsedMs: p.scan.status === 'paused' ? p.scan.elapsedMs : 0 } })
  }
  if (a.type === 'checkpoint') {
    if (p.scan.status !== 'running' || !Number.isFinite(a.elapsedMs) || a.elapsedMs < p.scan.elapsedMs) return s
    const elapsedMs = Math.min(traceDurationMs, Math.max(0, a.elapsedMs))
    return put(s, { scan: { status: elapsedMs === traceDurationMs ? 'complete' : 'paused', elapsedMs } })
  }
  if (a.type === 'findings' && (p.scan.status === 'complete' || traceIndexInspected(s))) {
    if (s.chapter1.archiveOrigin?.installed && !s.chapter1.archiveOrigin.initialInspected) s = originAction(s, { type: 'inspect' }, now)
    if (s.chapter1?.versionHistory?.revision) s = versionHistoryAction(s, { type: 'panel', panel: 'index' }, now)
    s = publicStorySave(s, 'index', now)
    if(!s.deliveredEvents.includes('TRACE_INDEX_FINDINGS_VIEWED'))s={...s,deliveredEvents:[...s.deliveredEvents,'TRACE_INDEX_FINDINGS_VIEWED']}
    s=sourceActivity(scheduleNaturalStart(s,now),'index')
    // Replays and repeated inspections never replace a receipt or its timestamp.
    if (!s.evidence[traceAnalysisId] && p.scan.status === 'complete') s = { ...s, evidence: { ...s.evidence, [traceAnalysisId]: { id: traceAnalysisId, collectedAt: now, verified: false, source: `${traceReferenceId} / local reference analysis / public ID ${traceFindings[1].value} match only / origin and capture time UNVERIFIED / original body UNAVAILABLE / revision NOT VERIFIED` } } }
    return put(s, { tab: 'tracker', findingsOpen: true })
  }
  return s
}
export function validateTrace(p: TraceState | undefined) {
  if (p === undefined) return
  if (!p || p.version !== 1 || !['workspace','tracker','decryptor','vault','activity'].includes(p.tab) || typeof p.findingsOpen !== 'boolean' || !p.scan || !['idle','running','paused','complete'].includes(p.scan.status) || !Number.isFinite(p.scan.elapsedMs) || p.scan.elapsedMs < 0 || p.scan.elapsedMs > traceDurationMs || p.scan.status === 'complete' && p.scan.elapsedMs !== traceDurationMs || p.scroll !== undefined && (!p.scroll || typeof p.scroll !== 'object' || Array.isArray(p.scroll) || Object.entries(p.scroll).some(([k,v]) => !['workspace','tracker','decryptor','vault','activity','findings'].includes(k) || !Number.isFinite(v) || v < 0))) throw Error('Invalid TRACE presentation state')
}
