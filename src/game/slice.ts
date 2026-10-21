import { comparisonAnswers, editorAnswers, followupReplies, leadChoices, mayaOpening, mayaOptional, primaryReplies, storyMessageAt, tipText } from '../content/e01Slice'
import { npcDeliveryDelay } from './npcDelivery'
import type { Episode01Slice, GameSave } from './types'

const scene = (n: number): Episode01Slice['sceneId'] => `E01-S${String(n).padStart(2, '0')}`
const has = (state: GameSave, id: string) => state.deliveredEvents.includes(id)
const add = (values: string[], id: string) => values.includes(id) ? values : [...values, id]
/** Keep new Maya turns after their conversation history; never use the device clock or rewrite old saves. */
export function mayaMessageAt(state: GameSave, authoredAt: number): number {
  const last = state.messages.filter(message => message.sender === 'maya' || message.recipient === 'maya')
    .reduce((latest, message) => Math.max(latest, message.at), 0)
  return Math.max(authoredAt, last + 1000)
}

const evidence = (state: GameSave, id: string, source: string, now: number) => ({ ...state.evidence, [id]: { id, source, collectedAt: now, verified: false } })

export function beginSlice(state: GameSave): GameSave {
  if (!state.player || state.e01) return state
  return { ...state, e01: { sceneId: scene(2), briefRead: false, previewInspected: false, hintCount: 0, attempts: 0, compared: false, handle: '', editorChecked: false } }
}

export function advanceSlice(state: GameSave, now: number): GameSave {
  if (!state.e01) return state
  const current = state.e01.sceneId
  if (current === scene(2)) return { ...state, e01: { ...state.e01, sceneId: scene(3) } }
  if (current === scene(3)) return { ...state, e01: { ...state.e01, sceneId: scene(4) } }
  if (current === scene(4) && state.e01.previewInspected) return { ...state, e01: { ...state.e01, sceneId: scene(5) } }
  if (current === scene(5) && state.evidence.E001) return { ...state, e01: { ...state.e01, sceneId: scene(6) }, evidence: evidence(state, 'E002', 'Greyhaven civic portal public redacted v2', now) }
  if (current === scene(8) && state.e01.tipMode && (state.e01.tipMode === 'anonymous' || /^[a-z\d ]{2,20}$/i.test(state.e01.handle.trim()))) return { ...state, e01: { ...state.e01, sceneId: scene(9) } }
  if (current === scene(9) && !has(state, 'R01')) return { ...state, e01: { ...state.e01, sceneId: scene(8) } }
  if (current === scene(11) && has(state, 'EV-E01-S11-MAYA-REPLY') && !state.pendingEvents.some(event => event.id.startsWith('EV-E01-S11-'))) return { ...state, e01: { ...state.e01, sceneId: scene(12) } }
  return state
}

export function inspectPreview(state: GameSave, now: number): GameSave {
  if (state.e01?.sceneId !== scene(4) || state.e01.previewInspected) return state
  return { ...state, e01: { ...state.e01, previewInspected: true }, evidence: evidence(state, 'E001', 'B01 cropped preview, not original audit', now) }
}

export function readBrief(state: GameSave): GameSave {
  if (state.e01?.sceneId !== scene(3) || has(state, 'EV-E01-S03-READ')) return state
  return { ...state, e01: { ...state.e01, briefRead: true }, deliveredEvents: add(state.deliveredEvents, 'EV-E01-S03-READ'), knowledge: { ...state.knowledge, player: add(state.knowledge.player, 'K03') } }
}

export function answerComparison(state: GameSave, answer: string): GameSave {
  if (state.e01?.sceneId !== scene(6) || !state.evidence.E001 || !state.evidence.E002 || !comparisonAnswers.some(item => item.id === answer)) return state
  if (answer !== 'escort') return { ...state, e01: { ...state.e01, attempts: state.e01.attempts + 1 } }
  return { ...state, e01: { ...state.e01, compared: true, sceneId: scene(7) }, deliveredEvents: add(state.deliveredEvents, 'EV-E01-S06-COMPARE') }
}

export function recheckComparison(state: GameSave): GameSave {
  if (state.e01?.sceneId !== scene(7) || !state.e01.compared || has(state, 'EV-E01-S07-LEAD')) return state
  return { ...state, e01: { ...state.e01, compared: false, sceneId: scene(6) } }
}

export function showComparisonHint(state: GameSave): GameSave {
  if (state.e01?.sceneId !== scene(6)) return state
  return { ...state, e01: { ...state.e01, hintCount: Math.min(3, state.e01.hintCount + 1) } }
}

export function saveLead(state: GameSave, choiceId: string, now: number): GameSave {
  if (state.e01?.sceneId !== scene(7) || !state.e01.compared || has(state, 'EV-E01-S07-LEAD') || !leadChoices.some(item => item.id === choiceId)) return state
  return {
    ...state, e01: { ...state.e01, sceneId: scene(8) }, choices: { ...state.choices, 'S07.lead': choiceId },
    evidence: evidence(state, 'K01', 'E001 observed preview + E002 current public v2; LEAD only', now),
    knowledge: { ...state.knowledge, player: add(state.knowledge.player, 'K01') },
    deliveredEvents: add(state.deliveredEvents, 'EV-E01-S07-LEAD'),
  }
}

export function setTipDraft(state: GameSave, mode: Episode01Slice['tipMode'], handle: string): GameSave {
  if (state.e01?.sceneId !== scene(8) || has(state, 'R01') || !mode || !['anonymous', 'handle'].includes(mode)) return state
  return { ...state, e01: { ...state.e01, tipMode: mode, handle: mode === 'handle' ? handle.slice(0, 20) : '' } }
}

export function sendTip(state: GameSave, now: number): GameSave {
  if (state.e01?.sceneId !== scene(9) || !state.e01.tipMode || !state.knowledge.player.includes('K01') || has(state, 'R01')) return state
  if (state.e01.tipMode === 'handle' && !/^[a-z\d ]{2,20}$/i.test(state.e01.handle.trim())) return state
  let dueAt = now
  const events = mayaOpening.map((line, index) => ({ id: `EV-E01-S11-MAYA-REPLY:${index}`, dueAt: dueAt += state.prologue?.dialogueVersion === 4 ? npcDeliveryDelay('maya', line, index) : index === 0 ? 450 : 380 }))
  return {
    ...state, e01: { ...state.e01, sceneId: scene(10) }, choices: { ...state.choices, 'C01-TIP': state.e01.tipMode === 'anonymous' ? 'C01-TIP.A' : 'C01-TIP.B' },
    deliveredEvents: add(state.deliveredEvents, 'R01'), pendingEvents: [...state.pendingEvents, ...events],
    messages: [...state.messages, { id: 'R01.tip', sender: 'player', recipient: 'maya', disclosedFactIds: ['R01.public-escort-observation'], text: tipText, at: mayaMessageAt(state, storyMessageAt(20)), delivery: 'delivered' }],
    knowledge: { ...state.knowledge, characters: { ...state.knowledge.characters, maya: add(state.knowledge.characters.maya, 'R01.public-escort-observation') } },
  }
}

export function openSliceInbox(state: GameSave): GameSave {
  if (!state.e01 || !has(state, 'R01')) return state
  if (state.e01.sceneId === scene(10) && has(state, 'EV-E01-S11-MAYA-REPLY')) return { ...state, e01: { ...state.e01, sceneId: scene(11) }, deliveredEvents: add(state.deliveredEvents, 'EV-E01-S10-RECEIPT-VIEWED') }
  return state
}

export function sendS11Choice(state: GameSave, choiceId: string, now: number): GameSave {
  const s = state.e01
  if (s?.sceneId !== scene(11) || s.draftChoice !== choiceId || !has(state, 'EV-E01-S11-MAYA-REPLY') || state.pendingEvents.some(event => event.id.startsWith('EV-E01-S11-'))) return state
  const primary = primaryReplies.find(item => item.id === choiceId)
  const followup = followupReplies.find(item => item.id === choiceId)
  if (primary && !s.s11Primary) {
    return {
      ...state, e01: { ...s, s11Primary: choiceId, draftChoice: undefined }, choices: { ...state.choices, 'S11.primary': choiceId },
      messages: [...state.messages, { id: `player.${choiceId}`, sender: 'player', recipient: 'maya', text: primary.text, at: mayaMessageAt(state, storyMessageAt(24)), delivery: 'delivered' }],
      pendingEvents: [...state.pendingEvents, { id: `EV-E01-S11-PRIMARY:${choiceId}`, dueAt: now + (state.prologue?.dialogueVersion === 4 ? npcDeliveryDelay('maya', primary.reply[0], 0) : 550) }],
    }
  }
  if (followup && ['P-S11-A', 'P-S11-B'].includes(s.s11Primary ?? '') && !s.s11Followup && has(state, `EV-E01-S11-PRIMARY:${s.s11Primary}`)) {
    return {
      ...state, e01: { ...s, s11Followup: choiceId, draftChoice: undefined }, choices: { ...state.choices, 'S11.followup': choiceId },
      messages: [...state.messages, { id: `player.${choiceId}`, sender: 'player', recipient: 'maya', text: followup.text, at: mayaMessageAt(state, storyMessageAt(26)), delivery: 'delivered' }],
      pendingEvents: [...state.pendingEvents, { id: `EV-E01-S11-FOLLOWUP:${choiceId}`, dueAt: now + (state.prologue?.dialogueVersion === 4 ? npcDeliveryDelay('maya', followup.reply[0], 0) : 550) }],
    }
  }
  return state
}

export function setS11Draft(state: GameSave, choiceId?: string): GameSave {
  if (state.e01?.sceneId !== scene(11)) return state
  const primary = !state.e01.s11Primary && primaryReplies.some(item => item.id === choiceId)
  const followup = ['P-S11-A', 'P-S11-B'].includes(state.e01.s11Primary ?? '') && !state.e01.s11Followup && followupReplies.some(item => item.id === choiceId)
  if (choiceId !== undefined && !primary && !followup) return state
  return { ...state, e01: { ...state.e01, draftChoice: choiceId } }
}

export function answerEditor(state: GameSave, answer: string): GameSave {
  if (state.e01?.sceneId !== scene(12) || !has(state, 'R01') || !has(state, 'EV-E01-S11-MAYA-REPLY') || !editorAnswers.some(item => item.id === answer)) return state
  if (answer !== 'code-route') return state
  return { ...state, e01: { ...state.e01, editorChecked: true }, deliveredEvents: add(state.deliveredEvents, 'EV-E01-S12-EDITOR-CHECK') }
}

export function deliverSliceEvent(state: GameSave, now: number): GameSave {
  const event = [...state.pendingEvents].filter(item => item.id.startsWith('EV-E01-S11-')).sort((a, b) => a.dueAt - b.dueAt)[0]
  if (!event || event.dueAt > now || !state.e01 || !has(state, 'R01')) return state
  const pendingEvents = state.pendingEvents.filter(item => item.id !== event.id)
  if (has(state, event.id)) return { ...state, pendingEvents }
  const base = { ...state, pendingEvents, deliveredEvents: add(state.deliveredEvents, event.id) }
  if (event.id === 'EV-E01-S11-MAYA-REPLY:3:tail:1') {
    return { ...base, messages: [...state.messages, { id: event.id, sender: 'maya', text: mayaOpening[3], at: mayaMessageAt(state, storyMessageAt(22, 10)), delivery: 'delivered' }] }
  }
  if (event.id.startsWith('EV-E01-S11-MAYA-REPLY:')) {
    const index = Number(event.id.split(':')[1])
    if (!Number.isInteger(index) || index < 0 || index >= mayaOpening.length || (index > 0 && !has(state, `EV-E01-S11-MAYA-REPLY:${index - 1}`))) return state
    const modeLine = state.e01.tipMode === 'handle' ? 'I can see the handle you chose, and nothing behind it.' : 'You can stay anonymous. I can answer here.'
    const firstLine = index === 0 && state.prologue?.dialogueVersion === 4 && state.prologue.social?.messages.some(message => message.sender === 'maya')
      ? "It's Maya, from FIND DANIEL. I edited the Daniel Mercer brief. I can answer your public-record tip here."
      : mayaOpening[index]
    const lines = index === 3 ? [modeLine, mayaOpening[index]] : [firstLine]
    const paced = state.prologue?.dialogueVersion === 4 && lines.length > 1
    const messages = (paced ? lines.slice(0, 1) : lines).map((text, offset) => ({ id: `${event.id}:${offset}`, sender: 'maya' as const, text, at: mayaMessageAt(state, storyMessageAt(22, index * 3)) + offset * 1000, delivery: 'delivered' as const }))
    const first = index === 0 && !has(state, 'EV-E01-S11-MAYA-REPLY')
    return {
      ...base,
      deliveredEvents: first ? add(base.deliveredEvents, 'EV-E01-S11-MAYA-REPLY') : base.deliveredEvents,
      messages: [...state.messages, ...messages],
      pendingEvents: paced ? [...pendingEvents.map(pending => pending.id === 'EV-E01-S11-MAYA-REPLY:4' ? { ...pending, dueAt: Math.max(pending.dueAt, now + npcDeliveryDelay('maya', lines[1], 1) + npcDeliveryDelay('maya', mayaOpening[4], 2)) } : pending), { id: `${event.id}:tail:1`, dueAt: now + npcDeliveryDelay('maya', lines[1], 1) }] : pendingEvents,
      relationships: first ? { ...state.relationships, maya: { ...state.relationships.maya,
        trust: Math.max(state.relationships.maya.trust, state.e01.tipMode === 'handle' ? 52 : 50),
        affinity: Math.max(state.relationships.maya.affinity, 45),
        suspicion: Math.max(state.relationships.maya.suspicion, state.e01.tipMode === 'anonymous' ? 21 : 20) } } : state.relationships,
      notifications: first ? [...state.notifications, { id: 'EV-E01-S11-MAYA-REPLY', text: 'Maya replied in the Bulletin case inbox', read: false }] : state.notifications,
    }
  }
  const primary = primaryReplies.find(item => event.id === `EV-E01-S11-PRIMARY:${item.id}`)
  const followup = followupReplies.find(item => event.id === `EV-E01-S11-FOLLOWUP:${item.id}`)
  const tail = event.id.match(/^EV-E01-S11-(PRIMARY|FOLLOWUP):([^:]+):tail:(\d+)$/)
  const tailPrimary = tail?.[1] === 'PRIMARY' ? primaryReplies.find(item => item.id === tail[2]) : undefined
  const tailFollowup = tail?.[1] === 'FOLLOWUP' ? followupReplies.find(item => item.id === tail[2]) : undefined
  const allLines = primary?.reply ? [...primary.reply, ...(primary.id === 'P-S11-C' ? [] : mayaOptional)] : followup?.reply ? [...followup.reply] : tailPrimary ? [...tailPrimary.reply, ...(tailPrimary.id === 'P-S11-C' ? [] : mayaOptional)] : tailFollowup ? [...tailFollowup.reply] : []
  const tailIndex = tail ? Number(tail[3]) : 0
  const lines = tail ? allLines.slice(tailIndex, tailIndex + 1) : state.prologue?.dialogueVersion === 4 ? allLines.slice(0, 1) : allLines
  if (!lines.length) return state
  const nextIndex = tailIndex + 1
  const nextId = `${event.id.replace(/:tail:\d+$/, '')}:tail:${nextIndex}`
  const nextPending = state.prologue?.dialogueVersion === 4 && nextIndex < allLines.length ? [...base.pendingEvents, { id: nextId, dueAt: now + npcDeliveryDelay('maya', allLines[nextIndex], nextIndex) }] : base.pendingEvents
  return { ...base, pendingEvents: nextPending, messages: [...state.messages, ...lines.map((text, index) => ({ id: tail ? event.id : `${event.id}:${index}`, sender: 'maya' as const, text, at: mayaMessageAt(state, storyMessageAt(primary || tailPrimary ? 25 : 27)) + index * 1000, delivery: 'delivered' as const }))] }
}

export function readSliceMessages(state: GameSave): GameSave {
  const messages = state.messages.map(item => item.sender === 'maya' && item.delivery !== 'read' ? { ...item, delivery: 'read' as const } : item)
  if (messages.every((item, i) => item === state.messages[i]) && !state.notifications.some(item => (item.id === 'EV-E01-S11-MAYA-REPLY' || item.id === 'ARC-E01-MAYA-REFERRAL') && !item.read)) return state
  return { ...state, messages, notifications: state.notifications.map(item => item.id === 'EV-E01-S11-MAYA-REPLY' || item.id === 'ARC-E01-MAYA-REFERRAL' ? { ...item, read: true } : item) }
}
