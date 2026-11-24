import { disclosureTopics, type DisclosureTopic } from '../content/mayaConversationV3'
import { queueMayaLines, remainingLines, validQueue, type PendingMayaLine } from './mayaConversationV3'
import type { GameSave } from './types'

export interface CardDisclosure {
  recipient: 'unknown'
  topic?: DisclosureTopic
  step: number
  selected?: boolean
  messages: {id:string; sender:'player'|'unknown'; text:string; at:number; recipient:'player'|'unknown'}[]
  pending?: PendingMayaLine[]
}
export type DisclosureAction = {type:'recipient'|'select-followup'|'send-disclosure'|'tick-disclosure'} | {type:'select-clue';topic:DisclosureTopic}

export function disclosureAction(save: GameSave, action: DisclosureAction, now:number): GameSave {
  const p = save.masterScene09
  if (!p?.complete || p.conversationRevision !== 'conversation-v3' || !save.masterScene04) return save
  const d = p.disclosure
  const put = (disclosure: CardDisclosure):GameSave => ({ ...save, masterScene09:{...p, disclosure} })
  if (action.type === 'recipient') return d ? save : put({recipient:'unknown', step:0, messages:[]})
  if (!d) return save
  if (action.type === 'tick-disclosure') {
    if (!d.pending?.length || d.pending[0].dueAt > now) return save
    const first = d.pending[0]
    const messages = [...d.messages, {id:first.id, sender:'unknown' as const, recipient:'player' as const, text:first.text, at:now}]
    return {...put({...d, messages, pending:remainingLines(d.pending,now)}), deliveredEvents:[...new Set([...save.deliveredEvents,first.id])]}
  }
  if (d.pending?.length) return save
  if (action.type === 'select-clue') {
    if (d.step || !Object.hasOwn(disclosureTopics,action.topic) || (action.topic === 'copy' ? !save.masterScene08?.opened : !p.received)) return save
    return put({...d,topic:action.topic,selected:true})
  }
  if (!d.topic) return save
  const topic = disclosureTopics[d.topic]
  const nextText = d.step ? topic.followups[d.step - 1] : topic.text
  if (!nextText) return save
  if (action.type === 'select-followup') return d.step ? put({...d,selected:true}) : save
  if (action.type !== 'send-disclosure' || !d.selected) return save
  const id = 'TA-S09V3-UNKNOWN-' + d.topic + '-' + (d.step + 1)
  const messages = [...d.messages,{id, text:nextText, at:now, sender:'player' as const, recipient:'unknown' as const}]
  const pending = queueMayaLines(id + '-REPLY',topic.replies[d.step],now)
  return {...put({...d,messages, pending, step:d.step + 1, selected:false}), deliveredEvents:[...new Set([...save.deliveredEvents,id])]}
}

export function validDisclosure(d:CardDisclosure) {
  if (!d || d.recipient !== 'unknown' || !Number.isInteger(d.step) || d.step < 0 ||
      !Array.isArray(d.messages) || !validQueue(d.pending) || (d.selected !== undefined && typeof d.selected !== 'boolean')) return false
  if (!d.topic) return d.step === 0 && !d.messages.length && !d.pending?.length && !d.selected
  return Object.hasOwn(disclosureTopics,d.topic) && d.step <= disclosureTopics[d.topic].replies.length &&
    d.messages.every(line => line && typeof line.id === 'string' && typeof line.text === 'string' && Number.isFinite(line.at) && (line.sender === 'player' ? line.recipient === 'unknown' : line.sender === 'unknown' && line.recipient === 'player')) &&
    d.messages.filter(line => line.sender === 'player').length === d.step
}
