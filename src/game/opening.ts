import { canInspectMirrorEntry, recoverMirrorSource } from './mirror'
import { mirrorCatalog } from '../content/mirror'
import { openingLines, danielNote, mirrorLocks, mirrorRecords, recoveryToken, sophieChoices, sophieExpansion, sophieOpening, type MirrorArea, type MirrorLockId } from '../content/opening'
import { groupArrival, groupConflict, groupConflictChoices, groupConflictReplies, groupDeparture, groupFirstChoices, groupFirstReplies, groupInvitation, secondPrivate, secondPrivateChoices } from '../content/socialOpening'
import { addressChoices, firstContactChoices, firstPageMessage, firstQuestionChoices, offlineMessage, publicBridgeV4, recoveryConversationV4 } from '../content/openingV4'
import { groupArrivalV4, groupDepartureV4 } from '../content/groupV4'
import { npcDeliveryDelay } from './npcDelivery'
import { beginSlice } from './slice'
import type { GameSave, OpeningState } from './types'

const initialMessages: OpeningState['messages'] = sophieOpening.map((text, index) => ({ id: `OPEN-SOPHIE-${index + 1}`, sender: 'sophie', text }))
const firstContactId = 'OPEN-V4-FIRST-CONTACT'
const pendingRecoveryId = 'OPEN-V4-PENDING-RECOVERY'
const groupCreationId = 'OPEN-V4-GROUP-CREATE'

/** The first contact is clocked from phone unlock and survives app changes and reloads. */
export function startPhoneOpening(state: GameSave, now = Date.now()): GameSave {
  if (state.player || state.prologue || state.deliveredEvents.includes(firstContactId) || state.pendingEvents.some(event => event.id === firstContactId)) return state
  return { ...state, pendingEvents: [...state.pendingEvents, { id: firstContactId, dueAt: now + 20_000 }] }
}

export function deliverPhoneOpeningEvent(state: GameSave, now: number): GameSave {
  const event = state.pendingEvents.find(item => item.dueAt <= now && [firstContactId, pendingRecoveryId, groupCreationId].includes(item.id))
  if (!event) return state
  const base = { ...state, pendingEvents: state.pendingEvents.filter(item => item.id !== event.id) }
  if (state.deliveredEvents.includes(event.id)) return base
  if (event.id === firstContactId) return {
    ...base, deliveredEvents: [...state.deliveredEvents, event.id],
    notifications: [...state.notifications, { id: event.id, text: 'New message · Unknown number', read: false }],
    prologue: { dialogueVersion: 4, v4Beat: 'first', stage: 'chat', step: 0, messages: [{ id: event.id, sender: 'sophie', text: "Hi. Sorry to message out of nowhere. Is this a bad time?", at: now }], noteSeen: false, offerInspected: false, restored: false, viewed: [], indexCompared: false, inspectedRecords: [], unlockedMirrorRecords: [], mirrorHints: {} },
  }
  const opening = state.prologue
  if (!opening || opening.dialogueVersion !== 4 || !state.deliveredEvents.includes('OPEN-V4-SOPHIE-OFFLINE')) return base
  if (event.id === pendingRecoveryId) return { ...base, deliveredEvents: [...state.deliveredEvents, event.id], notifications: [...state.notifications, { id: event.id, text: 'Protected connection request · Pending review', read: false }], prologue: { ...opening, pendingRecovery: 'pending' } }
  if (opening.social || opening.v4Beat !== 'waiting-group') return base
  const system = [
    { id: 'OPEN-V4-GROUP-CREATED', sender: 'system' as const, text: 'Sophie created the group FIND DANIEL.', at: now },
    { id: 'OPEN-V4-GROUP-MEMBERS', sender: 'system' as const, text: 'Sophie added Maya Chen, Lucas Grey and Eli Ward.', at: now + 1 },
    { id: 'OPEN-V4-GROUP-PLAYER', sender: 'system' as const, text: 'Sophie added you.', at: now + 2 },
  ]
  const queue = groupArrivalV4.map((line, index) => ({ ...line, dueAt: now + 2_200 + index * 3_100 }))
  return { ...base, deliveredEvents: [...state.deliveredEvents, event.id, ...system.map(line => line.id)], notifications: [...state.notifications, { id: 'OPEN-GROUP-ADD', text: 'Sophie added you to FIND DANIEL', read: false }], prologue: { ...opening, stage: 'group', social: { creator: 'sophie', createdAt: now, phase: 'first', members: ['sophie','maya','lucas','eli','player'], messages: system, queue } } }
}

export function decidePendingRecovery(state: GameSave, decision: 'accepted' | 'rejected' | 'retry'): GameSave {
  const opening = state.prologue
  if (!opening || opening.dialogueVersion !== 4 || !opening.pendingRecovery || !['pending','rejected'].includes(opening.pendingRecovery)) return state
  if (decision === 'retry' && opening.pendingRecovery !== 'rejected') return state
  if (decision !== 'retry' && opening.pendingRecovery !== 'pending') return state
  return { ...state, prologue: { ...opening, pendingRecovery: decision }, deliveredEvents: [...state.deliveredEvents, `OPEN-V4-RECOVERY-${decision.toUpperCase()}`], notifications: state.notifications.map(item => item.id === pendingRecoveryId ? { ...item, read: true } : item) }
}

export function sendOpeningName(state: GameSave, value: string, now = Date.now()): GameSave {
  const opening = state.prologue
  const name = value.trim().replace(/\s+/gu, ' ')
  if (!opening || opening.dialogueVersion !== 4 || opening.v4Beat !== 'name' || opening.queue?.length || state.player || name.length < 1 || name.length > 40 || /[\p{Cc}\p{Cf}<>]/u.test(name)) return state
  const next: GameSave = { ...state, player: { name }, e01: state.e01, deliveredEvents: [...state.deliveredEvents, 'EV-E01-S01-IDENTITY','OPEN-V4-NAME-SENT'], prologue: { ...opening, v4Beat: 'address', messages: [...opening.messages, { id: 'OPEN-V4-NAME-SENT', sender: 'player', text: name, at: now }] } }
  return queueSophie(next, [{ id: 'OPEN-V4-NAME-REPLY', text: `Thank you, ${name}.` }, { id: 'OPEN-V4-ADDRESS-ASK', text: 'How would you like me to address you?' }], now)
}

export function sendOpeningAddress(state: GameSave, choiceId: string, now = Date.now()): GameSave {
  const opening = state.prologue
  const choice = addressChoices.find(item => item.id === choiceId)
  if (!opening || opening.dialogueVersion !== 4 || opening.v4Beat !== 'address' || opening.queue?.length || !choice || opening.addressPreference) return state
  const next: GameSave = { ...state, deliveredEvents: [...state.deliveredEvents, 'OPEN-V4-ADDRESS-SENT'], prologue: { ...opening, v4Beat: 'question', addressPreference: choice.id, messages: [...opening.messages, { id: 'OPEN-V4-ADDRESS-SENT', sender: 'player', text: choice.text, at: now }] } }
  return queueSophie(next, [{ id: 'OPEN-V4-ADDRESS-REPLY', text: choice.id === 'name' ? "All right. I'll use your name." : "All right. I won't make assumptions from that." }, { id: 'OPEN-V4-DANIEL-INTRO', text: 'My brother Daniel left me your number before he disappeared. I do not know why he chose it.' }], now)
}
export function beginOpening(state: GameSave, now = Date.now()): GameSave {
  if (!state.player || state.prologue) return state
  return queueSophie({ ...state, prologue: { dialogueVersion: 3, stage: 'chat', step: 0, messages: [], noteSeen: false, offerInspected: false, restored: false, viewed: [], indexCompared: false, inspectedRecords: [], unlockedMirrorRecords: [], mirrorHints: {} } }, initialMessages.map(message => ({ id: message.id, text: message.text })), now)
}

/** Queue contents, deadlines and ids are saved atomically with each explicit action. */
function queueSophie(state: GameSave, lines: { id: string; text: string }[], now: number): GameSave {
  if (!state.prologue) return state
  let dueAt = now
  return { ...state, prologue: { ...state.prologue, queue: lines.map((line, i) => ({ ...line, dueAt: dueAt += state.prologue!.dialogueVersion === 4 ? npcDeliveryDelay('sophie', line.text, i) : 420 })) } }
}

export function deliverOpening(state: GameSave, now: number): GameSave {
  const opening = state.prologue
  if (!opening) return state
  if (opening.social?.queue?.length) {
    const due = opening.dialogueVersion === 4 ? opening.social.queue[0]?.dueAt <= now ? [opening.social.queue[0]] : [] : opening.social.queue.filter(line => line.dueAt <= now)
    if (!due.length) return state
    let resumedAt = now
    const queue = opening.social.queue.filter(line => !due.includes(line)).map((line, index) => opening.dialogueVersion === 4 ? { ...line, dueAt: resumedAt = Math.max(line.dueAt, resumedAt + npcDeliveryDelay(line.sender === 'system' ? 'maya' : line.sender, line.text, index)) } : line)
    const delivered = due.filter(line => !opening.social!.messages.some(message => message.id === line.id) && (opening.dialogueVersion !== 4 || line.sender === 'system' || opening.social!.members.includes(line.sender as 'sophie' | 'maya' | 'lucas' | 'player')))
    const messages = [...opening.social.messages, ...delivered.map(({ id, sender, text }) => ({ id, sender, text, at: now }))]
    const members = delivered.reduce((list, line) => line.id === 'OPEN-GROUP-LUCAS-LEFT' ? list.filter(id => id !== 'lucas') : line.id === 'OPEN-GROUP-MAYA-LEFT' ? list.filter(id => id !== 'maya') : line.id === 'OPEN-GROUP-SOPHIE-LEFT' ? list.filter(id => id !== 'sophie') : list, opening.social.members)
    const social = { ...opening.social, messages, members, queue }
    const ended = !queue.length && social.phase === 'departure'
    const numberClaim = delivered.some(line => line.id === 'OPEN-GROUP-SOPHIE-1') && opening.dialogueVersion === 4
    const mayaContact = opening.dialogueVersion === 4 && delivered.some(line => line.sender === 'maya') && opening.social.messages.some(message => message.sender === 'player') && !state.deliveredEvents.includes('ARC-E01-MAYA-FIRST-CONTACT')
    const next = { ...state, deliveredEvents: [...new Set([...state.deliveredEvents, ...delivered.map(line => line.id), ...(numberClaim ? ['OPEN-GROUP-SOPHIE-1:maya','OPEN-GROUP-SOPHIE-1:lucas','OPEN-GROUP-SOPHIE-1:eli'] : []), ...(mayaContact ? ['ARC-E01-MAYA-FIRST-CONTACT'] : [])])], relationships: mayaContact ? { ...state.relationships, maya: { ...state.relationships.maya, trust: 50 + state.relationships.maya.trust, affinity: 45 + state.relationships.maya.affinity, suspicion: 20 + state.relationships.maya.suspicion } } : state.relationships, knowledge: numberClaim ? { ...state.knowledge, characters: { ...state.knowledge.characters, maya: [...new Set([...state.knowledge.characters.maya, 'OPEN.NUMBER_CLAIM_FROM_SOPHIE'])], lucas: [...new Set([...state.knowledge.characters.lucas, 'OPEN.NUMBER_CLAIM_FROM_SOPHIE'])], eli: [...new Set([...state.knowledge.characters.eli, 'OPEN.NUMBER_CLAIM_FROM_SOPHIE'])] } } : state.knowledge, notifications: opening.dialogueVersion === 4 ? [...state.notifications, ...delivered.filter(line => line.sender !== 'system').map(line => ({ id: line.id, text: `${line.sender} · FIND DANIEL: ${line.text}`, read: false }))] : state.notifications, prologue: { ...opening, stage: ended ? 'chat' as const : opening.stage, social: { ...social, phase: ended ? 'second' as const : social.phase } } }
    return ended ? queueSophie(next, secondPrivate.map((text, i) => ({ id: `OPEN-SECOND-SOPHIE-${i + 1}`, text })), Math.min(now, Date.now()) + 1000) : next
  }
  if (!opening.queue?.length) return state
  const due = opening.dialogueVersion === 4 ? opening.queue[0]?.dueAt <= now ? [opening.queue[0]] : [] : opening.queue.filter(line => line.dueAt <= now)
  if (!due.length) return state
  let resumedAt = now
  const queue = opening.queue.filter(line => !due.includes(line)).map((line, index) => opening.dialogueVersion === 4 ? { ...line, dueAt: resumedAt = Math.max(line.dueAt, resumedAt + npcDeliveryDelay('sophie', line.text, index)) } : line)
  const delivered = due.filter(line => !opening.messages.some(message => message.id === line.id))
  const secondContact = delivered.some(line => line.id === 'OPEN-SECOND-SOPHIE-1')
  const offline = opening.dialogueVersion === 4 && delivered.some(line => line.id === 'OPEN-V4-SOPHIE-OFFLINE')
  return { ...state, deliveredEvents: [...new Set([...state.deliveredEvents, ...due.map(line => line.id)])], prologue: {
    ...opening, queue, messages: [...opening.messages, ...delivered.map(({ id, text }) => ({ id, text, sender: 'sophie' as const, at: now }))],
    stage: !queue.length && opening.afterQueue ? opening.afterQueue : opening.stage,
    v4Beat: offline ? 'waiting-group' : opening.v4Beat,
    pendingRecovery: offline ? 'waiting' : opening.pendingRecovery,
    afterQueue: queue.length ? opening.afterQueue : undefined,
  }, pendingEvents: offline ? [...state.pendingEvents, { id: pendingRecoveryId, dueAt: now + 5_000 }, { id: groupCreationId, dueAt: now + 12_000 }] : state.pendingEvents,
  notifications: opening.dialogueVersion === 4 ? [...state.notifications, ...delivered.map(line => ({ id: line.id, text: `Unknown number: ${line.text}`, read: false }))] : secondContact ? [...state.notifications, { id: 'OPEN-SECOND-SOPHIE-1', text: 'New message from Sophie', read: false }] : state.notifications }
}

export function openingChoices(opening: OpeningState) {
  if (opening.queue?.length) return []
  if (opening.dialogueVersion === 4) {
    if (opening.social?.phase === 'second') return secondPrivateChoices
    if (opening.v4Beat === 'first') return firstContactChoices
    if (opening.v4Beat === 'address') return addressChoices
    if (opening.v4Beat === 'question') return firstQuestionChoices
    if (opening.beat === 'offer') return recoveryConversationV4.choices
    if (opening.beat === 'bridge') return publicBridgeV4
  }
  if (opening.social?.phase === 'invitation') return groupInvitation.choices
  if (opening.social?.phase === 'second') return secondPrivateChoices
  if (opening.dialogueVersion === 3 && opening.step === 1 && opening.social?.phase !== 'done') return []
  if (opening.beat && opening.beat !== 'ready') return sophieExpansion[opening.beat]
  return opening.stage === 'chat' ? opening.step === 0 ? sophieChoices.first : opening.step === 1 && opening.noteSeen ? sophieChoices.second : [] : []
}

export function replyToSophie(state: GameSave, choiceId: string, now = Date.now()): GameSave {
  const opening = state.prologue
  if (!opening || opening.queue?.length || !['chat', 'found'].includes(opening.stage)) return state
  if (opening.social?.phase === 'invitation') return answerGroupInvitation(state, choiceId, now)
  if (opening.social?.phase === 'second') return answerSecondPrivate(state, choiceId, now)
  if (opening.dialogueVersion === 4) {
    if (opening.v4Beat === 'first') {
      const choice = firstContactChoices.find(item => item.id === choiceId)
      if (!choice) return state
      const next = { ...state, choices: { ...state.choices, 'OPEN-V4-FIRST-CHOICE': choiceId }, deliveredEvents: [...state.deliveredEvents, 'OPEN-V4-FIRST-REPLY'], prologue: { ...opening, v4Beat: 'name' as const, messages: [...opening.messages, { id: 'OPEN-V4-FIRST-REPLY', sender: 'player' as const, text: choice.text, at: now }] } }
      return queueSophie(next, [{ id: `OPEN-V4-FIRST-ANSWER-${choiceId}`, text: choice.answer }, { id: 'OPEN-V4-NAME-ASK', text: 'Sorry, what should I call you?' }], now)
    }
    if (opening.v4Beat === 'address') return sendOpeningAddress(state, choiceId, now)
    if (opening.v4Beat === 'question') {
      const choice = firstQuestionChoices.find(item => item.id === choiceId)
      if (!choice) return state
      const next = { ...state, choices: { ...state.choices, 'OPEN-V4-QUESTION': choiceId }, deliveredEvents: [...state.deliveredEvents, 'OPEN-V4-QUESTION-SENT'], prologue: { ...opening, v4Beat: 'offline' as const, messages: [...opening.messages, { id: 'OPEN-V4-QUESTION-SENT', sender: 'player' as const, text: choice.text, at: now }] } }
      return queueSophie(next, [{ id: `OPEN-V4-QUESTION-ANSWER-${choiceId}`, text: choice.answer }, { id: 'OPEN-V4-FIRST-PAGE', text: firstPageMessage }, { id: 'OPEN-V4-SOPHIE-OFFLINE', text: offlineMessage }], now)
    }
  }
  if (opening.dialogueVersion === 3 && opening.step === 0) return answerFirstContact(state, choiceId, now)
  if (opening.beat) return replyExpansion(state, choiceId, now)
  const step = opening.step
  if (step === 1 && !opening.noteSeen) return state
  const choices = step === 0 ? sophieChoices.first : step === 1 ? sophieChoices.second : []
  const choice = choices.find(item => item.id === choiceId)
  if (!choice) return state
  const seq = step + 1
  const messages: OpeningState['messages'] = [
    ...opening.messages,
    { id: `OPEN-PLAYER-${seq}`, sender: 'player', text: choice.text },
    { id: `OPEN-SOPHIE-R${seq}`, sender: 'sophie', text: choice.answer },
    ...(step === 0 ? [
      { id: 'OPEN-SOPHIE-NOTE', sender: 'sophie' as const, text: openingLines.note },
    ] : [
      { id: 'OPEN-SOPHIE-LAST', sender: 'sophie' as const, text: openingLines.legacyOffer },
    ]),
  ]
  if (!opening.dialogueVersion) return { ...state, prologue: { ...opening, step: seq as 1 | 2, stage: step === 1 ? 'recovery' : 'chat', messages }, deliveredEvents: [...state.deliveredEvents, `OPEN-SOPHIE-REPLY-${seq}`] }
  const lines = messages.slice(opening.messages.length + 1).filter(message => message.id !== 'OPEN-SOPHIE-LAST')
  if (step === 0) lines.push({ id: 'OPEN-SOPHIE-WITNESS', sender: 'sophie', text: openingLines.witness })
  else lines.push({ id: 'OPEN-SOPHIE-QUIET', sender: 'sophie', text: openingLines.quiet })
  return queueSophie({ ...state, deliveredEvents: [...state.deliveredEvents, `OPEN-SOPHIE-REPLY-${seq}`], choices: { ...state.choices, [`OPEN-REPLY-${seq}`]: choiceId }, prologue: { ...opening, step: seq as 1 | 2, beat: step === 1 ? 'quiet' : undefined, messages: [...opening.messages, messages[opening.messages.length]] } }, lines, now)
}

function answerFirstContact(state: GameSave, choiceId: string, now: number): GameSave {
  const opening = state.prologue!
  const choice = sophieChoices.first.find(item => item.id === choiceId)
  if (!choice) return state
  const playerId = 'OPEN-PLAYER-1'
  const next: GameSave = { ...state, choices: { ...state.choices, 'OPEN-REPLY-1': choiceId }, deliveredEvents: [...state.deliveredEvents, 'OPEN-SOPHIE-REPLY-1', playerId], prologue: { ...opening, step: 1, social: { phase: 'invitation', messages: [], members: [] }, messages: [...opening.messages, { id: playerId, sender: 'player', text: choice.text }] } }
  return queueSophie(next, [{ id: `OPEN-SOPHIE-R1-${choiceId}`, text: choice.answer }, { id: 'OPEN-SOPHIE-GROUP-INVITE', text: groupInvitation.prompt }], now)
}

function answerGroupInvitation(state: GameSave, choiceId: string, now: number): GameSave {
  const opening = state.prologue!
  const social = opening.social!
  const choice = groupInvitation.choices.find(item => item.id === choiceId)
  if (!choice || choiceId === 'wait' && social.delayed) return state
  const playerId = `OPEN-P-INVITE-${choiceId}`
  if (choiceId === 'wait') return { ...state, deliveredEvents: [...state.deliveredEvents, playerId], choices: { ...state.choices, 'OPEN-INVITE-WAIT': choiceId }, prologue: { ...opening, messages: [...opening.messages, { id: playerId, sender: 'player', text: choice.text }, { id: 'OPEN-S-INVITE-WAIT', sender: 'sophie', text: "Of course. I'll wait. Tell me if you change your mind." }], social: { ...social, delayed: true } } }
  const first = groupArrival.slice(0, 2).map(line => ({ id: line.id, sender: line.sender, text: line.text }))
  const queue = groupArrival.slice(2).map((line, index) => ({ ...line, dueAt: now + 800 + index * 1100 }))
  const numberClaim = 'OPEN.NUMBER_CLAIM_FROM_SOPHIE'
  return { ...state, deliveredEvents: [...state.deliveredEvents, playerId, ...first.map(line => line.id), 'OPEN-GROUP-SOPHIE-1:maya', 'OPEN-GROUP-SOPHIE-1:lucas'], notifications: [...state.notifications, { id: 'OPEN-GROUP-ADD', text: 'Sophie added you to FIND DANIEL', read: false }], choices: { ...state.choices, 'OPEN-INVITE': choiceId }, knowledge: { ...state.knowledge, characters: { ...state.knowledge.characters, maya: [...state.knowledge.characters.maya, numberClaim], lucas: [...state.knowledge.characters.lucas, numberClaim] } }, prologue: { ...opening, stage: 'group', messages: [...opening.messages, { id: playerId, sender: 'player', text: choice.text }], social: { ...social, phase: 'first', members: ['sophie', 'maya', 'lucas', 'player'], messages: first, queue } } }
}

export function markOpeningRead(state: GameSave, thread: 'sophie' | 'group'): GameSave {
  const applies = (id: string) => thread === 'group' ? id.startsWith('OPEN-GROUP-') || id.startsWith('ARC-E01-GROUP-') : id === firstContactId || id.startsWith('OPEN-V4-') && id !== pendingRecoveryId || id.startsWith('OPEN-SECOND-') || id.startsWith('OPEN-SOPHIE-')
  if (!state.notifications.some(item => applies(item.id) && !item.read)) return state
  return { ...state, notifications: state.notifications.map(item => applies(item.id) ? { ...item, read: true } : item) }
}

export function groupChoices(opening: OpeningState) {
  if (opening.stage !== 'group' || opening.social?.queue?.length) return []
  return opening.social?.phase === 'first' ? opening.dialogueVersion === 4 ? groupFirstChoices.filter(item => item.id !== 'defensive') : groupFirstChoices : opening.social?.phase === 'conflict' ? groupConflictChoices : []
}

export function sendGroupChoice(state: GameSave, choiceId: string, now = Date.now()): GameSave {
  const opening = state.prologue
  const social = opening?.social
  if (!opening || !social || opening.stage !== 'group' || social.queue?.length) return state
  const first = social.phase === 'first'
  if (opening.dialogueVersion === 4 && first && choiceId === 'defensive') return state
  const choice = (first ? groupFirstChoices : groupConflictChoices).find(item => item.id === choiceId)
  if (!choice || !['first', 'conflict'].includes(social.phase)) return state
  const playerId = `OPEN-GROUP-PLAYER-${first ? 'FIRST' : 'CONFLICT'}-${choiceId}`
  const replies = first
    ? [...groupFirstReplies[choiceId].map((line, index) => ({ id: `OPEN-GROUP-${choiceId.toUpperCase()}-${index + 1}`, ...line })), ...groupConflict]
    : [{ id: `OPEN-GROUP-${choiceId.toUpperCase()}-REPLY`, ...groupConflictReplies[choiceId] }, ...(opening.dialogueVersion === 4 ? groupDepartureV4 : groupDeparture)]
  let dueAt = now
  const queue = replies.map((line, index) => ({ ...line, dueAt: dueAt += opening.dialogueVersion === 4 ? npcDeliveryDelay(line.sender === 'system' ? 'maya' : line.sender, line.text, index, first ? 'normal' : 'urgent') : index === 0 ? 900 : 1150 }))
  const trust = choiceId === 'calm' || choiceId === 'apologize' || choiceId === 'boundary' ? 1 : 0
  const suspicion = choiceId === 'defensive' || choiceId === 'challenge' ? 1 : 0
  return { ...state, choices: { ...state.choices, [first ? 'OPEN-GROUP-FIRST' : 'OPEN-GROUP-CONFLICT']: choiceId }, deliveredEvents: [...state.deliveredEvents, playerId], relationships: { ...state.relationships, maya: { ...state.relationships.maya, trust: state.relationships.maya.trust + trust, suspicion: state.relationships.maya.suspicion + suspicion }, sophie: { ...state.relationships.sophie, trust: state.relationships.sophie.trust + (choiceId === 'boundary' ? 1 : 0) }, lucas: { ...state.relationships.lucas, suspicion: state.relationships.lucas.suspicion + (choiceId === 'defensive' || choiceId === 'challenge' ? 1 : 0) } }, prologue: { ...opening, social: { ...social, phase: first ? 'conflict' : 'departure', messages: [...social.messages, { id: playerId, sender: 'player', text: choice.text, at: now }], queue } } }
}

function answerSecondPrivate(state: GameSave, choiceId: string, now: number): GameSave {
  const opening = state.prologue!
  const choice = secondPrivateChoices.find(item => item.id === choiceId)
  if (!choice) return state
  const playerId = `OPEN-P-SECOND-${choiceId}`
  const next: GameSave = { ...state, choices: { ...state.choices, 'OPEN-SECOND-PRIVATE': choiceId }, deliveredEvents: [...state.deliveredEvents, playerId], prologue: { ...opening, step: opening.dialogueVersion === 4 ? 1 : opening.step, social: { ...opening.social!, phase: 'done' }, messages: [...opening.messages, { id: playerId, sender: 'player', text: choice.text }] } }
  return queueSophie(next, [{ id: `OPEN-S-SECOND-${choiceId}`, text: choice.answer }, { id: 'OPEN-SOPHIE-NOTE', text: openingLines.note }], now)
}

function replyExpansion(state: GameSave, choiceId: string, now: number): GameSave {
  const opening = state.prologue!
  const beat = opening.beat!
  if (beat === 'ready') return state
  const choice = opening.dialogueVersion === 4 && beat === 'offer' ? recoveryConversationV4.choices.find(item => item.id === choiceId) : opening.dialogueVersion === 4 && beat === 'bridge' ? publicBridgeV4.find(item => item.id === choiceId) : sophieExpansion[beat].find(item => item.id === choiceId)
  if (!choice) return state
  const id = `OPEN-P-${beat}-${choiceId}`
  const fact = beat === 'disclosure' ? choiceId === 'counts' ? 'OPEN-INDEX-DISCREPANCY' : choiceId === 'uncertain' ? 'OPEN-UNVERIFIED-FINDING' : undefined : undefined
  const lines: { id: string; text: string }[] = [{ id: `OPEN-S-${beat}-${choiceId}`, text: choice.answer }]
  if (beat === 'quiet') lines.push(...(opening.dialogueVersion === 4 ? [recoveryConversationV4.bridge] : openingLines.recovery).map((text, i) => ({ id: `OPEN-QUIET-${i}`, text })))
  if (beat === 'disclosure') lines.push(...(opening.dialogueVersion === 4 ? ["Maya kept the older Bus 4 public preview on Greyhaven Bulletin. I won't share what you found in Daniel's copy without asking you."] : openingLines.bridge).map((text, i) => ({ id: `OPEN-BRIDGE-${i}`, text })))
  const next: GameSave = { ...state,
    choices: { ...state.choices, [`OPEN-${beat}`]: choiceId },
    messages: [...state.messages, { id, sender: 'player', recipient: 'sophie', channel: 'messages', text: choice.text, at: now, delivery: 'delivered', disclosedFactIds: fact ? [fact] : [] }],
    knowledge: fact ? { ...state.knowledge, characters: { ...state.knowledge.characters, sophie: [...new Set([...state.knowledge.characters.sophie, fact])] } } : state.knowledge,
    relationships: { ...state.relationships, sophie: { ...state.relationships.sophie, trust: state.relationships.sophie.trust + (beat === 'disclosure' && choiceId !== 'withhold' ? 1 : 0) } },
    deliveredEvents: [...state.deliveredEvents, id],
    prologue: { ...opening, messages: [...opening.messages, { id, sender: 'player', text: choice.text }],
      beat: beat === 'quiet' ? 'offer' : beat === 'disclosure' ? 'bridge' : 'ready',
      afterQueue: beat === 'offer' ? 'recovery' : undefined,
      disclosure: beat === 'disclosure' ? choiceId as 'counts' | 'uncertain' | 'withhold' : opening.disclosure,
    },
  }
  return queueSophie(next, lines, now)
}

export function readDanielNote(state: GameSave, now = Date.now()): GameSave {
  const opening = state.prologue
  if (!opening || opening.stage !== 'chat' || opening.step !== 1 || opening.queue?.length || opening.noteSeen || (opening.dialogueVersion === 3 || opening.dialogueVersion === 4) && opening.social?.phase !== 'done') return state
  return {
    ...state,
    prologue: { ...opening, noteSeen: true },
    evidence: { ...state.evidence, 'OPEN-NOTE': { id: 'OPEN-NOTE', source: `Photo of Daniel's note (unverified). Recovery phrase ${recoveryToken}; ${danielNote.length} lines.`, collectedAt: now, verified: false } },
    deliveredEvents: [...state.deliveredEvents, 'OPEN-NOTE-READ'],
  }
}

export function inspectRecoveryOffer(state: GameSave): GameSave {
  const opening = state.prologue
  if (!opening || opening.stage !== 'recovery' || opening.offerInspected) return state
  return { ...state, prologue: { ...opening, offerInspected: true } }
}

export function restoreDanielMirror(state: GameSave): GameSave {
  const opening = state.prologue
  if (!opening || opening.stage !== 'recovery' || !opening.offerInspected || !opening.noteSeen || opening.restored) return state
  return recoverMirrorSource({
    ...state,
    prologue: { ...opening, stage: 'mirror', restored: true },
    deliveredEvents: [...state.deliveredEvents, 'OPEN-MIRROR-RESTORED'],
    knowledge: { ...state.knowledge, player: [...new Set([...state.knowledge.player, 'OPEN-DANIEL-MIRROR-RESTORED', 'OPEN-RECOVERY-TOKEN-USED'])] },
    notifications: [...state.notifications, { id: 'OPEN-MIRROR-RESTORED', text: 'The Archive restored: Daniel Mercer (read-only mirror)', read: false }],
  }, 'DANIEL-SNAPSHOT-01')
}

export function inspectMirrorRecord(state: GameSave, area: MirrorArea): GameSave {
  const opening = state.prologue
  if (!opening || !opening.restored || !mirrorRecords[area] || opening.viewed.includes(area)) return state
  return { ...state, prologue: { ...opening, viewed: [...opening.viewed, area] }, deliveredEvents: [...state.deliveredEvents, `OPEN-MIRROR-${area.toUpperCase()}`] }
}

/** Record-level inspection. Opening an app alone does not mean its evidence was read. */
export function inspectMirrorDetail(state: GameSave, area: MirrorArea, title: string): GameSave {
  const opening = state.prologue
  const entry = mirrorRecords[area]?.find(record => record.title === title)
  if (!opening?.restored || !entry) return state
  const catalogEntry = mirrorCatalog.find(record => record.area === area && record.title === title)
  if (!catalogEntry || !canInspectMirrorEntry(state, catalogEntry.id)) return state
  const id = `${area}:${title}`
  if (opening.inspectedRecords?.includes(id)) return state
  return { ...state, prologue: { ...opening, inspectedRecords: [...(opening.inspectedRecords ?? []), id] } }
}

/** Each locked item is optional. Incorrect answers never lose progress or reveal data. */
export function unlockMirrorRecord(state: GameSave, lockId: MirrorLockId, attempt: string): GameSave {
  const opening = state.prologue
  if (!opening?.restored || !mirrorLocks[lockId]) return state
  const puzzle = mirrorLocks[lockId]
  if (!mirrorRecords[puzzle.area].some(entry => entry.lockId === lockId)) return state
  const normalized = attempt.trim().toUpperCase().replace(/[–—]/g, '-').replace(/\s/g, '')
  if (normalized !== puzzle.answer || opening.unlockedMirrorRecords?.includes(lockId)) return state
  return { ...state, prologue: { ...opening, unlockedMirrorRecords: [...(opening.unlockedMirrorRecords ?? []), lockId] } }
}

/** Progressive, optional password hints persist and do not block investigation. */
export function revealMirrorHint(state: GameSave, lockId: MirrorLockId): GameSave {
  const opening = state.prologue
  if (!opening?.restored || !mirrorLocks[lockId] || opening.unlockedMirrorRecords?.includes(lockId)) return state
  const old = opening.mirrorHints?.[lockId] ?? 0
  const next = Math.min(old + 1, mirrorLocks[lockId].hints.length)
  if (next === old) return state
  return { ...state, prologue: { ...opening, mirrorHints: { ...opening.mirrorHints, [lockId]: next } } }
}

export function compareMirrorIndex(state: GameSave, now = Date.now()): GameSave {
  const opening = state.prologue
  if (!opening || opening.stage !== 'mirror' || opening.indexCompared || !opening.inspectedRecords?.includes('notes:Untitled — last saved 22:30') || !opening.inspectedRecords?.includes('index:Archive Index — integrity report')) return state
  const next: GameSave = {
    ...state,
    prologue: { ...opening, stage: 'found', indexCompared: true, beat: opening.dialogueVersion ? 'disclosure' : undefined },
    deliveredEvents: [...state.deliveredEvents, 'OPEN-INDEX-DISCREPANCY'],
    evidence: { ...state.evidence, 'OPEN-INDEX': { id: 'OPEN-INDEX', source: 'Recovered device: signed index 14, visible records 13, deletion entries 0. Origin unverified.', collectedAt: now, verified: false } },
    knowledge: { ...state.knowledge, player: [...new Set([...state.knowledge.player, 'OPEN-INDEX-DISCREPANCY'])] },
  }
  return opening.dialogueVersion ? queueSophie(next, openingLines.followup.map((text, i) => ({ id: `OPEN-FOLLOWUP-${i + 1}`, text })), now) : next
}

export function finishOpening(state: GameSave): GameSave {
  const opening = state.prologue
  if (!opening || opening.stage !== 'found' || !opening.indexCompared || opening.queue?.length || (opening.dialogueVersion && opening.beat !== 'ready')) return state
  const completed = { ...state, prologue: { ...opening, stage: 'complete' as const }, deliveredEvents: [...state.deliveredEvents, 'OPEN-CHAPTER1-STARTED'] }
  return beginSlice(completed)
}
