import { followupContacts, type FollowupContact } from '../content/characterFollowups'
import { npcDeliveryDelay } from './npcDelivery'
import type { GameSave } from './types'

const contacts: FollowupContact[] = ['lucas', 'eli', 'nora']
const prefix = 'ARC-E01-'
const id = (contact: FollowupContact, beat: string) => `${prefix}${contact.toUpperCase()}-${beat}`
const referralId = 'ARC-E01-MAYA-REFERRAL'
const referralText = "We met in FIND DANIEL, so I won't pretend this is a first introduction. If you want another view of the public Bus 4 difference, Lucas can speak for his own fleet knowledge. Eli Ward can explain damaged data; Nora Vance can help separate a source from a claim. Their case-contact routes are in Contacts. Please keep private recovered files with you."
const proposalId = 'ARC-E01-GROUP-PROPOSAL'
const joinId = 'ARC-E01-GROUP-LUCAS-REJOIN'
const sourceId = 'ARC-E01-GROUP-LUCAS-SOURCE'
const proposalText = "Lucas has answered you privately. If you're comfortable, I can ask Maya and Lucas to return so we can compare only the two public Bus 4 views. No recovered files in the group."
const legacyProposalText = "Lucas answered you directly. If you're comfortable, we can bring him back here to compare only the two public Bus 4 views. No recovered files in the group."

export const groupFollowupChoices = [
  { id: 'public', text: 'Yes. Invite Lucas to compare the public fields only.' },
  { id: 'wait', text: 'Keep the conversation private for now.' },
] as const

export function scheduleGroupProposal(state: GameSave, now: number): GameSave {
  const social = state.prologue?.social
  if (state.prologue?.dialogueVersion !== 4 || social?.phase !== 'done' || social.reactivation || !state.deliveredEvents.includes(id('lucas', 'ANSWER') + ':' + state.choices[id('lucas', 'ANSWER')]) || !state.knowledge.player.includes('K01') || state.pendingEvents.some(event => event.id === proposalId) || state.deliveredEvents.includes(proposalId)) return state
  return { ...state, pendingEvents: [...state.pendingEvents, { id: proposalId, dueAt: now + npcDeliveryDelay('sophie', proposalText, 0) }] }
}

export function groupFollowupOptions(state: GameSave) {
  return state.prologue?.dialogueVersion === 4 && ['proposed','deferred'].includes(state.prologue.social?.reactivation ?? '') && !state.pendingEvents.some(event => event.id === joinId) ? groupFollowupChoices : []
}

export function answerGroupFollowup(state: GameSave, choiceId: string, now: number): GameSave {
  const choice = groupFollowupOptions(state).find(item => item.id === choiceId)
  const opening = state.prologue
  const social = opening?.social
  if (!choice || !opening || !social) return state
  const messageId = `ARC-E01-GROUP-PLAYER-${choiceId}${social.reactivation === 'deferred' ? '-LATE' : ''}`
  if (state.deliveredEvents.includes(messageId)) return state
  const nextSocial = { ...social, reactivation: choiceId === 'public' ? 'joining' as const : 'deferred' as const, messages: [...social.messages, { id: messageId, sender: 'player' as const, text: choice.text, at: now }] }
  return { ...state, deliveredEvents: [...state.deliveredEvents, messageId], choices: { ...state.choices, 'ARC-E01-GROUP-CHOICE': choiceId }, prologue: { ...opening, social: nextSocial }, pendingEvents: choiceId === 'public' ? [...state.pendingEvents, { id: joinId, dueAt: now + npcDeliveryDelay('lucas', 'Lucas joined the group.', 0) }] : state.pendingEvents }
}

export function scheduleMayaReferral(state: GameSave, now: number): GameSave {
  if (state.prologue?.dialogueVersion !== 4 || state.prologue.social?.phase !== 'done' || !state.deliveredEvents.includes('EV-E01-S12-EDITOR-CHECK') || !state.knowledge.player.includes('K01') || state.deliveredEvents.includes(referralId) || state.pendingEvents.some(event => event.id === referralId)) return state
  return { ...state, pendingEvents: [...state.pendingEvents, { id: referralId, dueAt: now + npcDeliveryDelay('maya', referralText, 0) }] }
}

/** A separate, public-fact-only route; old v2/v3 saves are never assigned it. */
export function followupAvailable(state: GameSave, contact: FollowupContact): boolean {
  if (state.prologue?.dialogueVersion !== 4 || state.prologue.social?.phase !== 'done' || !state.knowledge.player.includes('K01') || !state.deliveredEvents.includes(referralId)) return false
  if (contact === 'lucas') return state.prologue.social.messages.some(message => message.sender === 'lucas')
  return state.deliveredEvents.includes(id('lucas', 'REPLY'))
}

export function followupChoices(state: GameSave, contact: FollowupContact) {
  return followupAvailable(state, contact) && state.deliveredEvents.includes(id(contact, 'REPLY')) && !state.choices[id(contact, 'ANSWER')] ? followupContacts[contact].choices : []
}

export function sendFollowupIntro(state: GameSave, contact: FollowupContact, now: number): GameSave {
  if (!followupAvailable(state, contact) || state.deliveredEvents.includes(id(contact, 'INTRO')) || state.pendingEvents.some(event => event.id === id(contact, 'REPLY'))) return state
  const line = followupContacts[contact]
  const receipt = contact === 'eli' ? [] : ['ARC.PUBLIC_BUS4_QUERY_FROM_PLAYER']
  return { ...state, deliveredEvents: [...state.deliveredEvents, id(contact, 'INTRO'), `${id(contact, 'INTRO')}:${contact}`], knowledge: { ...state.knowledge, characters: { ...state.knowledge.characters, [contact]: [...new Set([...state.knowledge.characters[contact], ...receipt])] } }, messages: [...state.messages, { id: id(contact, 'INTRO'), sender: 'player', recipient: contact, channel: 'messages', disclosedFactIds: receipt, text: line.intro, at: now, delivery: 'delivered' }], pendingEvents: [...state.pendingEvents, { id: id(contact, 'REPLY'), dueAt: now + npcDeliveryDelay(contact, line.reply, 0, contact === 'eli' || contact === 'nora' ? 'reflective' : 'normal') }] }
}

export function sendFollowupChoice(state: GameSave, contact: FollowupContact, choiceId: string, now: number): GameSave {
  const choice = followupChoices(state, contact).find(item => item.id === choiceId)
  if (!choice) return state
  const eventId = id(contact, 'ANSWER')
  return { ...state, choices: { ...state.choices, [eventId]: choiceId }, messages: [...state.messages, { id: `${eventId}:${choiceId}:player`, sender: 'player', recipient: contact, channel: 'messages', text: choice.text, at: now, delivery: 'delivered' }], pendingEvents: [...state.pendingEvents, { id: `${eventId}:${choiceId}`, dueAt: now + npcDeliveryDelay(contact, choice.answer, 1) }] }
}

export function deliverFollowup(state: GameSave, now: number): GameSave {
  const event = state.pendingEvents.filter(item => item.id.startsWith(prefix)).sort((a, b) => a.dueAt - b.dueAt)[0]
  if (!event || event.dueAt > now) return state
  const pendingEvents = state.pendingEvents.filter(item => item.id !== event.id)
  if (state.deliveredEvents.includes(event.id)) return { ...state, pendingEvents }
  if (event.id === referralId) return { ...state, pendingEvents, deliveredEvents: [...state.deliveredEvents, referralId], messages: [...state.messages, { id: referralId, sender: 'maya', channel: state.deliveredEvents.includes('CONN-E01-01') ? 'messages' : 'bulletin', text: referralText, at: now, delivery: 'delivered' }], notifications: [...state.notifications, { id: referralId, text: 'Maya sent a case-contact referral', read: false }] }
  if (event.id === proposalId && state.prologue?.social) {
    const social = state.prologue.social
    if (social.reactivation) return { ...state, pendingEvents }
    const sender = social.members.includes('sophie') ? 'sophie' : social.members.includes('maya') ? 'maya' : null
    if (!sender) return { ...state, pendingEvents }
    return { ...state, pendingEvents, deliveredEvents: [...state.deliveredEvents, proposalId], prologue: { ...state.prologue, social: { ...social, reactivation: 'proposed', messages: [...social.messages, { id: proposalId, sender, text: sender === 'sophie' ? proposalText : legacyProposalText, at: now }] } }, notifications: [...state.notifications, { id: proposalId, text: `${sender === 'sophie' ? 'Sophie' : 'Maya'} · FIND DANIEL: a public-only proposal`, read: false }] }
  }
  if (event.id === joinId && state.prologue?.social?.reactivation === 'joining') {
    const social = state.prologue.social
    const mayaReturns = !social.members.includes('maya')
    return { ...state, pendingEvents: [...pendingEvents, { id: sourceId, dueAt: now + npcDeliveryDelay('lucas', 'Public views only. The escort field differs; the full source still needs checking.', 0) }], deliveredEvents: [...state.deliveredEvents, joinId, ...(mayaReturns ? ['ARC-E01-GROUP-MAYA-REJOIN'] : [])], prologue: { ...state.prologue, social: { ...social, reactivation: 'active', members: [...new Set([...social.members, 'maya' as const, 'lucas' as const])], messages: [...social.messages, ...(mayaReturns ? [{ id: 'ARC-E01-GROUP-MAYA-REJOIN', sender: 'system' as const, text: 'Maya rejoined FIND DANIEL.', at: now }] : []), { id: joinId, sender: 'system', text: 'Lucas rejoined FIND DANIEL.', at: now + 1 }] } }, notifications: [...state.notifications, { id: joinId, text: mayaReturns ? 'Maya and Lucas rejoined FIND DANIEL' : 'Lucas rejoined FIND DANIEL', read: false }] }
  }
  if (event.id === sourceId && state.prologue?.social?.members.includes('lucas')) {
    const social = state.prologue.social
    return { ...state, pendingEvents, deliveredEvents: [...state.deliveredEvents, sourceId], prologue: { ...state.prologue, social: { ...social, messages: [...social.messages, { id: sourceId, sender: 'lucas', text: 'Public views only. The escort field differs; the full source still needs checking.', at: now }] } }, notifications: [...state.notifications, { id: sourceId, text: 'Lucas · FIND DANIEL: public source comparison', read: false }] }
  }
  const contact = contacts.find(item => event.id.startsWith(`${prefix}${item.toUpperCase()}-`))
  if (!contact || !followupAvailable(state, contact)) return { ...state, pendingEvents }
  const line = followupContacts[contact]
  const first = event.id === id(contact, 'REPLY')
  const choiceId = event.id.startsWith(`${id(contact, 'ANSWER')}:`) ? event.id.split(':')[1] : undefined
  const choice = line.choices.find(item => item.id === choiceId)
  const text = first ? line.reply : choice?.answer
  if (!text) return { ...state, pendingEvents }
  const baseline = contact === 'lucas' ? { trust: 42, affinity: 40, suspicion: 30, romance: 0 } : contact === 'eli' ? { trust: 50, affinity: 48, suspicion: 15, romance: 0 } : { trust: 40, affinity: 38, suspicion: 30, romance: 0 }
  const current = state.relationships[contact]
  const relationship = first ? { trust: Math.max(current.trust, baseline.trust), affinity: Math.max(current.affinity, baseline.affinity), suspicion: Math.max(current.suspicion, baseline.suspicion), romance: current.romance } : { ...current, trust: current.trust + (choiceId === 'careful' || choiceId === 'evidence' || choiceId === 'source' || choiceId === 'limits' ? 1 : 0) }
  return { ...state, pendingEvents, deliveredEvents: [...state.deliveredEvents, event.id], messages: [...state.messages, { id: event.id, sender: contact, channel: 'messages', text, at: now, delivery: 'delivered' }], notifications: [...state.notifications, { id: event.id, text: `${contact[0].toUpperCase() + contact.slice(1)} replied`, read: false }], relationships: { ...state.relationships, [contact]: relationship } }
}

export function readFollowup(state: GameSave, contact: FollowupContact): GameSave {
  const messages = state.messages.map(message => message.sender === contact && message.delivery !== 'read' ? { ...message, delivery: 'read' as const } : message)
  const notifications = state.notifications.map(item => item.id.startsWith(`${prefix}${contact.toUpperCase()}-`) && !item.read ? { ...item, read: true } : item)
  if (messages.every((message, index) => message === state.messages[index]) && notifications.every((item, index) => item === state.notifications[index])) return state
  return { ...state, messages, notifications }
}
