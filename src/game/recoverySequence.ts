import { initialRecoveryOrder, recoveryCards, recoveryHints, relayConversation, referenceConversation } from '../content/recoverySequence'
import { npcDeliveryDelay } from './npcDelivery'
import type { GameSave, OpeningState } from './types'

type Recovery = NonNullable<OpeningState['recoverySequence']>
function replace(state: GameSave, recovery: Recovery): GameSave {
  return { ...state, prologue: { ...state.prologue!, recoverySequence: recovery } }
}
function queue(recovery: Recovery, lines: string[], prefix: string, now: number): Recovery {
  let dueAt = now
  return { ...recovery, queue: lines.map((text, index) => ({ id: `${prefix}-${index}`, text, dueAt: dueAt += npcDeliveryDelay('eli', text, index) })) }
}
export function beginRecoverySequence(state: GameSave, now = Date.now()): GameSave {
  if (!state.prologue?.restored || state.prologue.recoverySequence) return state
  return replace(state, queue({ beat: 'identity', messages: [], queue: [], order: [...initialRecoveryOrder], attempts: 0, hints: 0, restored: false }, relayConversation.identity.prompt, 'OPEN-RELAY-INTRO', now))
}
export function beginReferenceInvestigation(state: GameSave, now = Date.now()): GameSave {
  const opening = state.prologue
  if (!opening?.recoverySequence?.restored || opening.referenceStarted) return state
  const recovery = queue({ ...opening.recoverySequence, beat: 'reference' }, referenceConversation.prompt, 'OPEN-RELAY-REFERENCE', now)
  return { ...state, prologue: { ...opening, flow: 'mirror-first', referenceStarted: true, stage: 'mirror', beat: undefined, recoverySequence: recovery }, deliveredEvents: [...new Set([...state.deliveredEvents, 'OPEN-REFERENCE-INVESTIGATION'])] }
}
export function beginConnectionConversation(state: GameSave, now = Date.now()): GameSave {
  const opening = state.prologue
  if (!opening?.recoverySequence || opening.connectionReviewed) return state
  return { ...state, prologue: { ...opening, stage: 'mirror', recoverySequence: queue({ ...opening.recoverySequence, beat: 'connection' }, relayConversation.connection.prompt, 'OPEN-RELAY-CONNECTION', now) } }
}
/** Explicit continuation for earlier reboot saves; retains their history, evidence and S02–S30 state. */
export function continueMessageFlow(state: GameSave, now = Date.now()): GameSave {
  const opening = state.prologue
  if (!opening?.restored) return state
  const next: GameSave = { ...state, prologue: { ...opening, dialogueVersion: 4, flow: 'mirror-first', stage: 'mirror' } }
  if (!opening.recoverySequence) return beginRecoverySequence(next, now)
  if (opening.referenceStarted && opening.indexCompared && !opening.connectionReviewed) return beginConnectionConversation(next, now)
  return opening.recoverySequence.restored && !opening.referenceStarted && state.choices['OPEN-RECOVERY-DISCLOSURE-choice'] ? beginReferenceInvestigation(next, now) : next
}
export function deliverRecoverySequence(state: GameSave, now: number): GameSave {
  const recovery = state.prologue?.recoverySequence
  const line = recovery?.queue[0]
  if (!recovery || !line || line.dueAt > now) return state
  let dueAt = now
  const next = replace(state, { ...recovery, messages: recovery.messages.some(item => item.id === line.id) ? recovery.messages : [...recovery.messages, { id: line.id, sender: 'relay', text: line.text }], queue: recovery.queue.slice(1).map((item, index) => ({ ...item, dueAt: dueAt = Math.max(item.dueAt, dueAt + npcDeliveryDelay('eli', item.text, index)) })) })
  const delivered = { ...next, deliveredEvents: [...new Set([...state.deliveredEvents, line.id])] }
  if (recovery.beat === 'done' && !next.prologue!.recoverySequence!.queue.length && state.prologue!.referenceStarted && state.prologue!.indexCompared && !state.prologue!.connectionReviewed) return beginConnectionConversation(delivered, now)
  if (recovery.beat === 'done' && !next.prologue!.recoverySequence!.queue.length && !state.prologue!.referenceStarted && !state.choices['OPEN-RECOVERY-DISCLOSURE-choice']) {
    return { ...delivered, prologue: { ...delivered.prologue!, stage: 'found', beat: 'disclosure', queue: [
      { id: 'OPEN-RECOVERY-SOPHIE-CHECKIN', text: 'Hey, are you still there? No rush. I just wanted to check in.', dueAt: now + 2500 },
    ] }, notifications: [...delivered.notifications, { id: 'OPEN-SECOND-RECOVERY-CHECKIN', text: 'New private message from Sophie', read: false }] }
  }
  return delivered
}
export function recoveryReplyOptions(state: GameSave) {
  const recovery = state.prologue?.recoverySequence
  if (!recovery || recovery.queue.length || recovery.beat === 'done' || recovery.beat === 'source' && state.choices['OPEN-RELAY-source']) return []
  return relayConversation[recovery.beat].choices
}
export function sendRecoveryReply(state: GameSave, choiceId: string, now = Date.now()): GameSave {
  const recovery = state.prologue?.recoverySequence
  const choice = recoveryReplyOptions(state).find(item => item.id === choiceId)
  if (!recovery || !choice) return state
  if (recovery.beat === 'reference' || recovery.beat === 'connection') {
    const next = replace(state, queue({ ...recovery, beat: 'done', messages: [...recovery.messages, { id: `OPEN-RELAY-P-${recovery.beat}`, sender: 'player', text: choice.text }] }, choice.lines, `OPEN-RELAY-R-${recovery.beat}-${choiceId}`, now))
    return { ...next, prologue: { ...next.prologue!, connectionReviewed: recovery.beat === 'connection' ? true : state.prologue?.connectionReviewed }, choices: { ...state.choices, [`OPEN-RELAY-${recovery.beat}`]: choiceId }, deliveredEvents: [...new Set([...state.deliveredEvents, `OPEN-RELAY-P-${recovery.beat}`])] }
  }
  const beat = recovery.beat
  const nextBeat = beat === 'identity' ? 'source' : beat === 'interpretation' ? 'keep' : beat === 'keep' ? 'done' : 'source'
  const id = `OPEN-RELAY-P-${beat}`
  const next = replace(state, queue({ ...recovery, beat: nextBeat, messages: [...recovery.messages, { id, sender: 'player', text: choice.text }] }, [...choice.lines, ...(nextBeat !== beat && nextBeat !== 'done' ? relayConversation[nextBeat].prompt : [])], `OPEN-RELAY-R-${beat}-${choiceId}`, now))
  return { ...next, choices: { ...state.choices, [`OPEN-RELAY-${beat}`]: choiceId }, deliveredEvents: [...new Set([...state.deliveredEvents, id])] }
}
export function swapRecoveryCards(state: GameSave, a: number, b: number): GameSave {
  const recovery = state.prologue?.recoverySequence
  if (!recovery || recovery.restored || recovery.queue.length || !state.choices['OPEN-RELAY-source'] || !Number.isInteger(a) || !Number.isInteger(b) || a < 0 || b < 0 || a > 3 || b > 3 || a === b) return state
  const order = [...recovery.order]
  ;[order[a], order[b]] = [order[b], order[a]]
  return replace(state, { ...recovery, order, feedback: undefined })
}
export function hintRecovery(state: GameSave): GameSave {
  const recovery = state.prologue?.recoverySequence
  if (!recovery || recovery.restored || recovery.beat !== 'source' || !state.choices['OPEN-RELAY-source'] || recovery.queue.length || recovery.hints >= recoveryHints.length) return state
  return replace(state, { ...recovery, hints: recovery.hints + 1 })
}
export function assistRecovery(state: GameSave): GameSave {
  const recovery = state.prologue?.recoverySequence
  if (!recovery || recovery.restored || recovery.attempts < 4 || recovery.assisted || recovery.queue.length) return state
  // Anchor the opening only; the player must still identify the question/answer relationship.
  return replace(state, { ...recovery, assisted: true, order: ['change', 'history', 'answer', 'question'], feedback: 'Opening and instruction placed. Put the direct question before its answer, then verify.' })
}
export function resetRecovery(state: GameSave): GameSave {
  const recovery = state.prologue?.recoverySequence
  if (!recovery || recovery.restored || recovery.queue.length || !state.choices['OPEN-RELAY-source']) return state
  return replace(state, { ...recovery, order: [...initialRecoveryOrder], feedback: undefined })
}
export function verifyRecovery(state: GameSave, now = Date.now()): GameSave {
  const recovery = state.prologue?.recoverySequence
  if (!recovery || recovery.restored || recovery.queue.length || !state.choices['OPEN-RELAY-source']) return state
  if (!recoveryCards.every((card, index) => recovery.order[index] === card.id)) return replace(state, { ...recovery, attempts: recovery.attempts + 1, feedback: 'The reply references do not fit yet. Check which message each reply points to.' })
  const id = 'OPEN-RECOVERED-CHAT-001'
  const next = replace(state, queue({ ...recovery, restored: true, beat: 'interpretation', feedback: 'Sequence restored. Source identity remains unverified.' }, relayConversation.interpretation.prompt, 'OPEN-RELAY-RESTORED', now))
  return { ...next, deliveredEvents: [...new Set([...state.deliveredEvents, id])], knowledge: { ...state.knowledge, player: [...new Set([...state.knowledge.player, id])] } }
}
/** Retention is separate from solving; no NPC receives this copy. */
export function retainRecovery(state: GameSave, now = Date.now()): GameSave {
  const recovery = state.prologue?.recoverySequence
  const id = 'OPEN-RECOVERED-CHAT-001'
  if (!recovery?.restored || state.evidence[id]) return state
  return { ...state, evidence: { ...state.evidence, [id]: { id, source: 'Reconstructed conversation D.M. / UNKNOWN. Reply references restored; author, origin and removal claim unverified. ' + recoveryCards.map(card => `${card.speaker}: ${card.text}`).join('\n'), collectedAt: now, verified: false } } }
}
