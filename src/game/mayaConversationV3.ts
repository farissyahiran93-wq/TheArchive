import { captureId } from '../content/masterScene08'
import { referenceCardId, referenceCardImage } from '../content/masterScene09'
import { storyPhotos } from '../content/storyPhotos'
import { captureFollowup, mayaCard, mayaCheckIn, type MayaMedia, type MayaPart } from '../content/mayaConversationV3'
import type { GameSave } from './types'

export interface MayaLine {
  id: string
  sender: 'player' | 'maya'
  text: string
  at: number
  photo?: string
  attachment?: 'capture' | 'card'
}
export interface PendingMayaLine { id: string; text: string; kind?: MayaMedia; dueAt: number }
export type MayaAction = {type:'tick'|'send'|'open'} | {type:'draft'; index:number}

export function lineDelay(text: string, sequence: number) {
  return Math.min(5200, Math.max(950, 750 + text.length * 30 + (sequence * 79) % 200))
}

export function queueMayaLines(prefix: string, parts: readonly MayaPart[], now: number): PendingMayaLine[] {
  let dueAt = now
  return parts.map((part, index) => {
    const line = typeof part === 'string' ? { id: prefix + '-' + (index + 1), text: part } : {id:part.id, text:'', kind:part.kind}
    dueAt += lineDelay(line.text, index) + (index ? 300 : 0)
    return { ...line, dueAt }
  })
}

/** Keep a real interval after a late delivery (including resume from a suspended WebView). */
export function remainingLines<T extends PendingMayaLine>(queue: T[], now: number): T[] | undefined {
  const [delivered, ...tail] = queue
  const overdue = Math.max(0, now - delivered.dueAt)
  return tail.length ? tail.map(line => ({ ...line, dueAt: line.dueAt + overdue })) : undefined
}

export function mayaConversationAction(save: GameSave, scene: 'masterScene08' | 'masterScene09', action: MayaAction, now: number): GameSave {
  const p = save[scene]
  if (!p || p.conversationRevision !== 'conversation-v3') return save
  const checkIn = scene === 'masterScene08'
  const turns = checkIn ? mayaCheckIn : mayaCard
  const prefix = checkIn ? 'TA-S08V3' : 'TA-S09V3'
  const turn = turns[p.beat]

  if (action.type === 'open') {
    if (!p.received || p.opened) return save
    const pending = checkIn && p.beat === 3 ? queueMayaLines(prefix + '-OPEN', captureFollowup, now) : p.pending
    return { ...save, [scene]: { ...p, opened: true, pending } }
  }

  if (action.type === 'tick') {
    const queue = p.pending
    if (!queue?.length || queue[0].dueAt > now) return save
    const item = queue[0]
    const pending = remainingLines(queue, now)
    const duplicate = p.messages.some(message => message.id === item.id)
    const line: MayaLine = { id:item.id, text:item.text, sender:'maya', at:now }
    if (item.kind === 'capture' || item.kind === 'card') line.attachment = item.kind
    if (item.kind === 'photo') line.photo = storyPhotos.mayaMugs.src
    if (item.kind === 'card') line.photo = referenceCardImage
    const received = p.received || item.kind === (checkIn ? 'capture' : 'card')
    const complete = p.beat === turns.length && !pending
    const completedEvents = checkIn ? ['TA-S08-COMPLETE','TA-S08-SCENE09-UNLOCKED'] : ['TA-S09-PUBLIC-SEARCH-TARGET','TA-S09-COMPLETE','TA-S09-SCENE10-UNLOCKED']
    const sourceEvent = item.kind === 'capture' ? ['TA-S08-CAPTURE-RECEIVED'] : item.kind === 'card' ? ['TA-S09-PHOTO-RECEIVED'] : []
    const attachmentId = item.kind === 'capture' ? captureId : item.kind === 'card' ? referenceCardId : storyPhotos.mayaMugs.id
    return {
      ...save,
      [scene]: {...p, received, complete, pending, messages:duplicate ? p.messages : [...p.messages, line]},
      messages: duplicate ? save.messages : [...save.messages, { id:item.id, text:item.kind ? item.kind === 'capture' ? 'Screenshot' : 'Photo' : item.text, sender:'maya', channel:'messages', delivery:'delivered', at:now, ...(item.kind ? {attachmentIds:[attachmentId]} : {}) }],
      deliveredEvents: [...new Set([...save.deliveredEvents, item.id, ...sourceEvent, ...(complete ? completedEvents : [])])],
    }
  }

  if (p.complete || !turn || p.pending?.length || checkIn && p.beat === 3 && !p.opened) return save
  if (action.type === 'draft') {
    if (!Number.isInteger(action.index) || !turn.choices[action.index]) return save
    return { ...save, [scene]: {...p, draft:action.index} }
  }

  if (p.draft === undefined || !turn.choices[p.draft]) return save
  const text = turn.choices[p.draft]
  const id = prefix + '-C' + (p.beat + 1) + '-P' + p.draft
  const line: MayaLine = {id, text, sender:'player', at:now}
  return {
    ...save,
    [scene]: {...p, beat:p.beat + 1, draft:undefined, messages:[...p.messages,line], pending:queueMayaLines(id + '-M',turn.after,now)},
    messages:[...save.messages,{...line,sender:'player',recipient:'maya',channel:'messages',delivery:'delivered'}],
    deliveredEvents:[...new Set([...save.deliveredEvents,id])],
  }
}

export function validQueue(queue: PendingMayaLine[] | undefined) {
  return queue === undefined || Array.isArray(queue) && queue.every((line,index) =>
    line && typeof line.id === 'string' && typeof line.text === 'string' && Number.isFinite(line.dueAt) &&
    (!index || line.dueAt > queue[index - 1].dueAt) && (line.kind === undefined || ['capture','card','photo'].includes(line.kind))
  ) && new Set(queue.map(line => line.id)).size === queue.length
}
