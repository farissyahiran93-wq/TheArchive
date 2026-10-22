import { accessMirrorItems } from '../content/chapter2AccessMirror'
export { accessMirrorItems } from '../content/chapter2AccessMirror'
import { accessGroupLines, accessNodes, accessPackageQuestions, accessPlayerLines, type AccessOption } from '../content/chapter2Access'
import type { GameSave } from './types'
import { lifeRecords } from '../content/danielLife'
import { ensureLife, reduceLife, validateLife, type LifeAction, type LifeState } from './danielLife'
import { noteReunionExploration, reunionAction, reunionNextDue, startReunion, tickReunion, validateReunion, type ReunionAction, type ReunionState } from './chapter2Reunion'

export type AccessMessage = { id: string; sender: string; text: string; at: number }
export interface Chapter2Access {
  version: 1
  phase: 'pending' | 'unknown' | 'package' | 'declined' | 'accepted' | 'installing' | 'installed' | 'mirror' | 'recovery' | 'ready'
  unknownDueAt: number
  unknownCreated: boolean
  unknownOffline: boolean
  node: string
  queue?: { id: string; dueAt: number }
  messages: AccessMessage[]
  choices: Record<string, string>
  draft?: { node: string; option: string }
  unknownStance: 'neutral' | 'confrontational' | 'cautious' | 'skeptical' | 'transactional'
  privacyStance: 'neutral' | 'alert' | 'reluctant' | 'pragmatic' | 'worried'
  packageStatus?: 'offered' | 'declined' | 'accepted'
  questionsAsked: string[]
  installAuthorized: boolean
  installCompleted: boolean
  takeoverStartedAt?: number
  mirrorUnlocked: boolean
  spyInstalled: boolean
  relayAvailable: boolean
  story?: ReunionState
  mirrorOpened: boolean
  viewed: string[]
  recovery?: { startedAt: number; dueAt: number; readyAt?: number; testOpened?: boolean }
  details?: LifeState
  groupDueAt?: number
  groupQueued: boolean
  groupMessages: AccessMessage[]
  groupOpened: boolean
  complete: boolean
  hintDueAt?: number
  receipts: { eventId: string; recipient: 'player' | 'unknown'; source: 'unknown-claim' | 'player-message' | 'group-message' | 'mirror-fragment' }[]
}

export type AccessAction =
  | ReunionAction
  | LifeAction
  | { type: 'tick' }
  | { type: 'open-unknown' | 'open-group' | 'open-mirror' | 'decline' | 'confirm-install' | 'start-recovery' | 'read-integration' | 'open-recovery-test' }
  | { type: 'draft' | 'send' | 'question' | 'inspect' | 'failed-reply'; id: string }

const put = (s: GameSave, c: Chapter2Access): GameSave => ({ ...s, chapter2Access: c })
const event = (s: GameSave, id: string): GameSave => s.deliveredEvents.includes(id) ? s : { ...s, deliveredEvents: [...s.deliveredEvents, id] }
const notice = (s: GameSave, id: string, text: string): GameSave => s.notifications.some(n => n.id === id) ? s : { ...s, notifications: [...s.notifications, { id, text, read: false }] }
const read = (s: GameSave, prefix: string): GameSave => s.notifications.some(n => n.id.startsWith(prefix) && !n.read) ? { ...s, notifications: s.notifications.map(n => n.id.startsWith(prefix) ? { ...n, read: true } : n) } : s
export const accessDelay = (text: string) => Math.min(3800, Math.max(900, 650 + text.split(/\s+/).length * 110))
export function accessNextDue(s: GameSave): number {
  const c = s.chapter2Access
  if (!c) return s.prologue?.scene01?.privateScene03?.complete && s.prologue.scene01.groupComplete && s.prologue.scene01.lucasLeftGroup ? (s.prologue.scene01.privateScene03.completedAt ?? Date.now()) + 7000 : Infinity
  return Math.min(reunionNextDue(s),!c.unknownCreated ? c.unknownDueAt : Infinity, c.queue?.dueAt ?? Infinity, c.groupDueAt ?? Infinity, !c.mirrorOpened ? c.hintDueAt ?? Infinity : Infinity, c.recovery && c.recovery.readyAt === undefined ? c.recovery.dueAt : Infinity)
}

function append(s: GameSave, id: string, text: string, sender: string, now: number, group = false): GameSave {
  const c = s.chapter2Access!
  if (s.deliveredEvents.includes(id)) return s
  const message = { id, sender, text, at: now }
  const receipt = { eventId: id, recipient: sender === 'player' ? 'unknown' as const : 'player' as const, source: sender === 'player' ? 'player-message' as const : group ? 'group-message' as const : 'unknown-claim' as const }
  let next = event(put(s, { ...c, [group ? 'groupMessages' : 'messages']: [...(group ? c.groupMessages : c.messages), message], receipts: id === 'C2-FAILED-REPLY' ? c.receipts : [...c.receipts, receipt] }), id)
  if (sender !== 'player') next = notice(next, id, text)
  return next
}

function enter(s: GameSave, id: string, now: number): GameSave {
  let c: Chapter2Access = { ...s.chapter2Access!, node: id, queue: undefined, draft: undefined }
  const node = accessNodes[id]
  if (!node) return s
  if (node.kind === 'reference') {
    // Only an actual earlier retained reference permits the source-specific line.
    const hasReference = s.knowledge.player.includes('N01.literal-7-14')
    return enter(put(s, c), hasReference ? node.yes : node.no, now)
  }
  if (node.kind === 'npc') {
    const extra = node.text === "Daniel left behind something like that." ? 1800 : node.text === 'The Archive is already installed on your device.' ? 2500 : node.text === 'And if you find something...' ? 1800 : 0
    c = { ...c, queue: { id, dueAt: now + accessDelay(node.text) + extra } }
  }
  if (node.kind === 'package') c = { ...c, phase: 'package', packageStatus: c.packageStatus === 'accepted' ? 'accepted' : 'offered' }
  if (node.kind === 'declined') c = { ...c, phase: 'declined' }
  if (node.kind === 'offline') c = { ...c, unknownOffline: true, phase: 'accepted', queue: { id: 'C2-INSTALL-BEGIN', dueAt: now + 1800 } }
  return put(s, c)
}

export function accessChoices(s: GameSave): AccessOption[] {
  const c = s.chapter2Access
  if (!c || c.queue || c.unknownOffline) return []
  const node = accessNodes[c.node]
  return node?.kind === 'choice' ? node.options : []
}

export function chapter2Access(s: GameSave, action: AccessAction, now = Date.now(), testing = false): GameSave {
  if (action.type.startsWith('story-')) return reunionAction(s,action as ReunionAction,now)
  if (action.type.startsWith('life-')) return noteReunionExploration(reduceLife(s, action as LifeAction))
  let c = s.chapter2Access
  if (!c) {
    const completed = s.prologue?.scene01?.privateScene03
    if (action.type !== 'tick' || !completed?.complete || !s.prologue?.scene01?.groupComplete || !s.prologue.scene01.lucasLeftGroup) return s
    c = { version: 1, phase: 'pending', unknownDueAt: (completed.completedAt ?? now) + 7000, unknownCreated: false, unknownOffline: false, node: 'U01', messages: [], choices: {}, unknownStance: 'neutral', privacyStance: 'neutral', questionsAsked: [], installAuthorized: false, installCompleted: false, mirrorUnlocked: false, spyInstalled: false, relayAvailable: false, mirrorOpened: false, viewed: [], groupQueued: false, groupOpened: false, groupMessages: [], complete: false, receipts: [] }
    s = put(s, c)
  }
  if (action.type === 'tick') {
    const directed=tickReunion(s,now)
    if(directed!==s)return directed
    if (c.recovery && c.recovery.readyAt === undefined && now >= c.recovery.dueAt) return event(put(s,{...c,recovery:{...c.recovery,readyAt:now}}),'C2-RECOVERY-READY')
    if (!c.unknownCreated && now >= c.unknownDueAt) return append(put(s, { ...c, unknownCreated: true, phase: 'unknown' }), 'C2-UNKNOWN-FIRST', "You're looking in the wrong place.", 'unknown', now)
    if (c.queue && now >= c.queue.dueAt) {
      const id = c.queue.id
      if (id === 'C2-INSTALL-BEGIN' && c.installAuthorized && !c.installCompleted) return event(put(s, { ...c, phase: 'installing', takeoverStartedAt: now, queue: { id: 'C2-INSTALL-DONE', dueAt: now + 1800 } }), id)
      if (id === 'C2-INSTALL-DONE' && c.installAuthorized) return notice(event(put(s, { ...c, queue: undefined, phase: 'installed', installCompleted: true, mirrorUnlocked: true, spyInstalled: true, hintDueAt: now + 20000 }), id), 'C2-INTEGRATION', 'Passive relay integration complete. New message capability available.')
      if (id.startsWith('C2-GROUP-')) {
        const index = Number(id.slice('C2-GROUP-'.length))
        const line = accessGroupLines[index]
        if (!line) return s
        const last = index === accessGroupLines.length - 1
        const next = append(s, id, line.text, line.sender, now, true)
        return put(next, { ...next.chapter2Access!, queue: last ? undefined : { id: `C2-GROUP-${index+1}`, dueAt: now + (index === 9 ? 1800 : 1100) }, complete: last && c.groupOpened, phase: last && c.groupOpened ? 'ready' : 'recovery' })
      }
      const node = accessNodes[id]
      if (node?.kind === 'npc') return enter(append(s, 'C2-UNKNOWN-'+id, node.text, 'unknown', now), node.next, now)
    }
    if (c.groupDueAt !== undefined && now >= c.groupDueAt && !c.groupQueued) {
      return startReunion(s,now)
    }
    if (!c.mirrorOpened && c.hintDueAt !== undefined && now >= c.hintDueAt) return notice(put(s, { ...c, hintDueAt: undefined }), 'C2-MIRROR-HINT', 'Phone Mirror available.')
    return s
  }
  if (action.type === 'open-unknown') return c.unknownCreated ? read(s, 'C2-UNKNOWN-') : s
  if (action.type === 'open-group') {
    if (!c.groupQueued) return s
    return reunionAction(c.story?s:startReunion(s,now,true),{type:'story-open',thread:'group'},now)

  }
  if (action.type === 'read-integration') return read(s, 'C2-INTEGRATION')
  if (action.type === 'draft') {
    if (!accessChoices(s).some(o => o.id === action.id) || c.draft?.node === c.node && c.draft.option === action.id) return s
    return put(s, { ...c, draft: { node: c.node, option: action.id } })
  }
  if (action.type === 'send') {
    const option = accessChoices(s).find(o => o.id === action.id)
    if (!option || c.draft?.node !== c.node || c.draft.option !== option.id) return s
    let next = append(s, 'C2-PLAYER-'+option.id, option.text, 'player', now)
    const unknownStance = ({ U02_B: 'confrontational', U02_C: 'cautious', U04_C: 'skeptical', U05_C: 'transactional' } as const)[option.id as 'U02_B'] ?? c.unknownStance
    const privacyStance = ({ U03_B: 'alert', U04_B: 'alert', U06_A: 'reluctant', U06_B: 'pragmatic', U06_C: 'worried' } as const)[option.id as 'U03_B'] ?? c.privacyStance
    next = put(next, { ...next.chapter2Access!, choices: { ...c.choices, [c.node]: option.id }, unknownStance, privacyStance })
    return enter(next, option.next, now)
  }
  if (action.type === 'question') {
    if (!['PACKAGE','DECLINED'].includes(c.node) || c.queue || c.packageStatus === 'accepted' || !['U07Q_A','U07Q_B','U07Q_C'].includes(action.id) || c.questionsAsked.includes(action.id)) return s
    const next = append(s, 'C2-PLAYER-'+action.id, accessPackageQuestions[action.id], 'player', now)
    return enter(put(next, { ...next.chapter2Access!, questionsAsked: [...c.questionsAsked, action.id] }), action.id+'-0', now)
  }
  if (action.type === 'decline') {
    if (c.node !== 'PACKAGE' || c.queue || c.installAuthorized) return s
    return enter(append(put(s, { ...c, packageStatus: 'declined' }), 'C2-PLAYER-DECLINE', accessPlayerLines.reject, 'player', now), 'DECLINE-0', now)
  }
  if (action.type === 'confirm-install') {
    if (!['PACKAGE','DECLINED'].includes(c.node) || c.queue || c.installAuthorized) return s
    return enter(append(put(s, { ...c, installAuthorized: true, packageStatus: 'accepted', phase: 'accepted' }), 'C2-PLAYER-ACCEPT', accessPlayerLines.accept, 'player', now), 'ACCEPT-0', now)
  }
  if (action.type === 'failed-reply') {
    if (!c.unknownOffline || !['R_A','R_B'].includes(action.id) || c.messages.some(m => m.id === 'C2-FAILED-REPLY')) return s
    const next = append(s, 'C2-FAILED-REPLY', accessPlayerLines[action.id as 'R_A' | 'R_B'], 'player', now)
    return event(put(next, { ...next.chapter2Access!, messages: [...next.chapter2Access!.messages, { id: 'C2-DELIVERY-FAILURE', sender: 'system', text: 'MESSAGE NOT DELIVERED — RECIPIENT UNAVAILABLE', at: now }] }), 'C2-DELIVERY-FAILURE')
  }
  if (action.type === 'open-mirror') return c.mirrorUnlocked ? ensureLife(c.mirrorOpened ? s : read(put(s, { ...c, mirrorOpened: true, phase: 'mirror', hintDueAt: undefined }), 'C2-MIRROR-HINT')) : s
  if (action.type === 'inspect') {
    if (!c.mirrorOpened || !accessMirrorItems.some(i => i.id === action.id) || c.viewed.includes(action.id)) return s
    const id = 'C2-INSPECT-'+action.id
    return event(put(s, { ...c, viewed: [...c.viewed, action.id], receipts: [...c.receipts, { eventId: id, recipient: 'player', source: 'mirror-fragment' }] }), id)
  }
  if (action.type === 'start-recovery') {
    if (!c.mirrorOpened || c.recovery || !c.details?.observations.includes('OBS_STORAGE_NOTICE_READ')) return s
    const next = event({...put(s, { ...c, recovery: { startedAt: now, dueAt: now+1500000, ...(testing ? {readyAt:now,testOpened:true} : {}) }, details:{...c.details,observations:[...new Set([...c.details.observations,'OBS_RECOVERY_STARTED'])]}, receipts:[...c.receipts,{eventId:'OBS_RECOVERY_STARTED',recipient:'player',source:'mirror-fragment'}], phase: 'recovery', groupDueAt: now+18000 }), knowledge:{...s.knowledge,player:[...new Set([...s.knowledge.player,'OBS_RECOVERY_STARTED'])]}}, 'C2-RECOVERY-START')
    return testing ? event(next,'C2-RECOVERY-READY') : next
  }
  if (action.type === 'open-recovery-test') {
    if (!testing || !c.recovery || c.recovery.readyAt !== undefined) return s
    return event(put(s,{...c,recovery:{...c.recovery,readyAt:now,testOpened:true}}),'C2-RECOVERY-READY')
  }
  return s
}



/** Optional extension: old reboot saves remain valid and never acquire live-device capabilities. */
export function validateAccessState(value: unknown): void {
  if (value === undefined) return
  const obj = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v)
  const fail = () => { throw new Error('Invalid Chapter 2 access state') }
  if (!obj(value)) return fail()
  const c = value
  validateLife(c.details)
  validateReunion(c.story)
  if (c.version !== 1 || !['pending','unknown','package','declined','accepted','installing','installed','mirror','recovery','ready'].includes(String(c.phase)) || !Number.isFinite(c.unknownDueAt) || !accessNodes[String(c.node)] || typeof c.relayAvailable !== 'boolean' || c.relayAvailable && c.story===undefined) return fail()
  for (const field of ['unknownCreated','unknownOffline','installAuthorized','installCompleted','mirrorUnlocked','spyInstalled','mirrorOpened','groupQueued','groupOpened','complete']) if (typeof c[field] !== 'boolean') return fail()
  if (!['neutral','confrontational','cautious','skeptical','transactional'].includes(String(c.unknownStance)) || !['neutral','alert','reluctant','pragmatic','worried'].includes(String(c.privacyStance))) return fail()
  if (c.packageStatus !== undefined && !['offered','declined','accepted'].includes(String(c.packageStatus))) return fail()
  if (!obj(c.choices) || Object.entries(c.choices).some(([key, id]) => { const n = accessNodes[key]; return n?.kind !== 'choice' || !n.options.some(o => o.id === id) })) return fail()
  if (c.draft !== undefined && (!obj(c.draft) || c.draft.node !== c.node || !accessNodes[String(c.node)] || (() => { const n = accessNodes[String(c.node)]; return n.kind !== 'choice' || !n.options.some(o => o.id === (c.draft as Record<string, unknown>).option) })())) return fail()
  if (!Array.isArray(c.questionsAsked) || c.questionsAsked.some(id => !['U07Q_A','U07Q_B','U07Q_C'].includes(String(id))) || new Set(c.questionsAsked).size !== c.questionsAsked.length) return fail()
  if (!Array.isArray(c.viewed) || c.viewed.some(id => !accessMirrorItems.some(i => i.id === id) && !lifeRecords.some(i=>i.id===id))) return fail()
  for (const field of ['groupDueAt','hintDueAt','takeoverStartedAt']) if (c[field] !== undefined && !Number.isFinite(c[field])) return fail()
  if (c.queue !== undefined && (!obj(c.queue) || !Number.isFinite(c.queue.dueAt) || !(accessNodes[String(c.queue.id)]?.kind === 'npc' || ['C2-INSTALL-BEGIN','C2-INSTALL-DONE'].includes(String(c.queue.id)) || /^C2-GROUP-(?:[0-9]|1[01])$/.test(String(c.queue.id))))) return fail()
  for (const field of ['messages','groupMessages']) {
    const list = c[field]
    if (!Array.isArray(list) || list.some(m => !obj(m) || typeof m.id !== 'string' || typeof m.text !== 'string' || !Number.isFinite(m.at) || !(field === 'messages' ? ['unknown','player','system'] : ['sophie','maya','lucas','eli','nora','player','system']).includes(String(m.sender))) || new Set(list.map(m => m.id)).size !== list.length) return fail()
  }
  if (!Array.isArray(c.receipts) || c.receipts.some(r => !obj(r) || typeof r.eventId !== 'string' || !['player','unknown'].includes(String(r.recipient)) || !['unknown-claim','player-message','group-message','mirror-fragment'].includes(String(r.source)))) return fail()
  if (c.recovery !== undefined && (!obj(c.recovery) || !Number.isFinite(c.recovery.startedAt) || Number(c.recovery.dueAt) !== Number(c.recovery.startedAt)+1500000 || !c.mirrorOpened)) return fail()
  if (obj(c.recovery) && (c.recovery.readyAt !== undefined && !Number.isFinite(c.recovery.readyAt) || c.recovery.testOpened !== undefined && typeof c.recovery.testOpened !== 'boolean')) return fail()
  if (obj(c.recovery) && c.recovery.readyAt !== undefined && (Number(c.recovery.readyAt)<Number(c.recovery.startedAt) || Number(c.recovery.readyAt)<Number(c.recovery.dueAt) && c.recovery.testOpened!==true)) return fail()
  if ((c.mirrorUnlocked || c.spyInstalled || c.installCompleted) && (!c.installAuthorized || c.packageStatus !== 'accepted') || c.complete && c.story===undefined && (!c.groupOpened || (c.groupMessages as unknown[]).length !== accessGroupLines.length)) return fail()
}
