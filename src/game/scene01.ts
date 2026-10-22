import { scene01DelayedWarning, scene01Nodes, scene01Opening, type Scene01Choice } from '../content/scene01'
import { scene02After08, scene02Id, scene02Opening } from '../content/scene02'
import { scene03DeliveryDelay, scene03Opening } from '../content/scene03'
import { npcDeliveryDelay } from './npcDelivery'
import type { GameSave, OpeningState } from './types'

type Scene = NonNullable<OpeningState['scene01']>
function replace(state: GameSave, scene: Scene): GameSave { return { ...state, prologue: { ...state.prologue!, scene01: scene } } }
function event(state: GameSave, id: string): GameSave { return state.deliveredEvents.includes(id) ? state : { ...state, deliveredEvents: [...state.deliveredEvents, id] } }
export function scene01Text(text: string, name?: string): string { return text.replaceAll('[PLAYER_NAME]', name ?? '…') }
function enter(state: GameSave, id: string, now: number): GameSave {
  const node = scene01Nodes[id]
  if (!node || !state.prologue?.scene01) return state
  const scene = { ...state.prologue.scene01, nodeId: id, queue: [], ...(id.startsWith('OPEN-S03-') && state.prologue.scene01.privateScene03 ? { privateScene03: { ...state.prologue.scene01.privateScene03, draft: undefined } } : {}) } satisfies Scene
  let next = replace(state, scene)
  if (node.kind === 'wait' && node.duration === 0) return enter(event(next, id), node.next, now)
  if (node.kind === 'npc' || node.kind === 'wait') return replace(next, { ...scene, queue: [{ id, dueAt: now + (node.kind === 'wait' ? node.duration : id.startsWith('OPEN-S03-') ? scene03DeliveryDelay(node.text) : npcDeliveryDelay(node.sender ?? 'sophie', node.text)), typing: node.kind === 'npc' || node.typing }] })
  if (node.kind === 'choice') return next
  if (state.deliveredEvents.includes(id)) return node.next ? enter(next, node.next, now) : next
  next = event(next, id)
  if (node.event === 'private-complete' && scene.privateScene03) return event(replace(next, { ...scene, privateScene03: { ...scene.privateScene03, complete: true, completedAt: now, reading: false, nextEventReady: true, paused: undefined, draft: undefined } }), 'OPEN-S03-NEXT-EVENT-READY')
  if (node.event === 'private-effects') {
    const sophie = { ...next.relationships.sophie }
    for (const key of ['trust','affinity','suspicion'] as const) if (node.privateEffects?.[key] !== undefined) sophie[key] = Math.max(0, Math.min(100, sophie[key] + node.privateEffects[key]!))
    return enter({ ...next, relationships: { ...next.relationships, sophie } }, node.next!, now)
  }
  if (node.event === 'source-boundary') return node.next ? enter(replace(next, { ...scene, groupSourceBoundary: false }), node.next, now) : next
  if (node.event === 'deleted' || node.event === 'leave') {
    const leaving = node.event === 'leave'
    const text = leaving ? 'Lucas left the group.' : 'Maya deleted a message.'
    const changed = replace(next, { ...scene, groupMessages: [...scene.groupMessages, { id, sender: 'system', text, at: now }],
      groupReceipts: [...scene.groupReceipts ?? [], { eventId: id, recipient: 'player', factIds: [leaving ? 'OPEN-S02-LUCAS-LEFT' : 'OPEN-S02-MAYA-DELETED-MESSAGE'] }],
      ...(leaving ? { lucasLeftGroup: true, groupMembers: { sophie: true, maya: true, ...scene.groupMembers, lucas: false }, groupPresence: { sophie: true, maya: true, ...scene.groupPresence, lucas: false } } : {}),
    })
    return enter(changed, node.next!, now)
  }
  if (node.event === 'group-complete') {
    const dueAt = now + 5500
    return replace(next, { ...scene, groupComplete: true, groupCompletedAt: now, groupSourceBoundary: false, privateHandoff: { sceneId: 'ch01_sc03_just_between_us', dueAt }, queue: [{ id: 'OPEN-S03-FIRST-MESSAGE', dueAt, typing: false }] })
  }
  if (node.event === 'private-ready') return next
  if (node.event === 'presence') {
    const actor = node.actor ?? 'sophie'
    const line = { id, sender: 'system' as const, text: `${actor[0].toUpperCase() + actor.slice(1)} is ${node.online ? 'online' : 'offline'}.`, at: now }
    return enter(replace(next, { ...scene, groupPresence: { sophie: true, maya: true, lucas: true, ...scene.groupPresence, [actor]: !!node.online }, groupMessages: [...scene.groupMessages, line] }), node.next!, now)
  }
  if (node.event === 'effects') {
    const relationships = { ...next.relationships }
    for (const actor of ['sophie','maya','lucas'] as const) {
      const delta = node.effects?.[actor]
      if (delta) relationships[actor] = { ...relationships[actor], ...Object.fromEntries(Object.entries(delta).map(([key, value]) => [key, Math.max(-100, Math.min(100, relationships[actor][key as 'trust'] + value))])) }
    }
    return enter({ ...next, relationships }, node.next!, now)
  }
  if (node.event === 'reward') {
    next = { ...next, relationships: { ...next.relationships, sophie: { ...next.relationships.sophie, trust: Math.min(100, next.relationships.sophie.trust + (node.trust ?? 0)), affinity: Math.min(100, next.relationships.sophie.affinity + (node.affinity ?? 0)) } } }
    return enter(next, node.next!, now)
  }
  if (node.event === 'complete') return replace(next, { ...scene, complete: true })
  const invitation = node.event === 'declined' ? 'declined' : 'ready'
  return { ...replace(next, { ...scene, invitation, invitationDismissed: false, invitationApproved: invitation === 'ready' }), notifications: [...next.notifications, { id, text: 'Sophie sent a group invitation', read: false }] }
}

/** Fresh first contact or an owner-requested new transcript; older source data remains stored. */
export function beginScene01(state: GameSave, now = Date.now()): GameSave {
  if (state.prologue?.scene01) return state
  const prologue: OpeningState = state.prologue ?? { dialogueVersion: 4, stage: 'chat', step: 0, messages: [], noteSeen: false, offerInspected: false, restored: false, viewed: [], indexCompared: false }
  const scene: Scene = { version: 1, nodeId: scene01Opening, startedAt: now, introduced: false, nameDisclosed: false, invitation: 'none', invitationDismissed: false, complete: false, queue: [], messages: [], groupMessages: [] }
  const next = enter({ ...state, prologue: { ...prologue, scene01: scene } }, scene01Opening, now)
  return deliverScene01(replace(next, { ...next.prologue!.scene01!, queue: [{ id: scene01Opening, dueAt: now, typing: false }] }), now)
}

export function deliverScene01(state: GameSave, now: number): GameSave {
  const scene = state.prologue?.scene01, queued = scene?.queue[0]
  if (!scene || !queued || queued.dueAt > now) return state
  if (queued.id.startsWith('OPEN-S03-') && queued.id !== 'OPEN-S03-FIRST-MESSAGE' && !scene.privateScene03?.reading) return state
  const node = scene01Nodes[queued.id]
  if (!node || !['npc','wait'].includes(node.kind)) return state
  if (node.kind === 'npc' && node.channel === 'group' && node.sender === 'lucas' && scene.groupMembers?.lucas === false) return replace(state, { ...scene, queue: [] })
  let next = replace(state, { ...scene, queue: [] })
  if (node.kind === 'wait') return enter(event(next, node.id), node.next, now)
  if (node.kind !== 'npc') return state
  if (!state.deliveredEvents.includes(node.id)) {
    const text = scene01Text(node.text, scene.nameDisclosed ? scene.disclosedName : undefined)
    const sender = node.sender ?? 'sophie'
    const line = { id: node.id, sender, text, at: now }
    next = replace(next, { ...scene, queue: [], introduced: scene.introduced || !!node.introducesSophie, messages: node.channel === 'sophie' ? [...scene.messages, { ...line, sender: 'sophie' }] : scene.messages, groupMessages: node.channel === 'group' ? [...scene.groupMessages, line] : scene.groupMessages, groupReceipts: node.channel === 'group' ? [...scene.groupReceipts ?? [], { eventId: node.id, recipient: 'player', factIds: node.heardFacts ?? [] }] : scene.groupReceipts,
      ...(node.id === 'OPEN-S03-FIRST-MESSAGE' && scene.privateHandoff ? { privateHandoff: { ...scene.privateHandoff, deliveredAt: now } } : {}),
      ...(node.id.startsWith('OPEN-S03-') && scene.privateScene03 ? { privateScene03: { ...scene.privateScene03, receipts: [...scene.privateScene03.receipts, { eventId: node.id, recipient: 'player', factIds: node.heardFacts ?? [] }] } } : {}),
    })
    next = { ...event(next, node.id), notifications: [...next.notifications, { id: node.id, text: node.channel === 'group' ? `FIND DANIEL · ${sender[0].toUpperCase() + sender.slice(1)}: ${text}` : `${scene.introduced || node.introducesSophie ? 'Sophie' : 'Unknown number'}: ${text}`, read: false }] }
    if (node.heardFacts?.length) next = { ...next, knowledge: { ...next.knowledge, player: [...new Set([...next.knowledge.player, ...node.heardFacts])] } }
  }
  return enter(next, node.next, now)
}

export function scene01Choices(state: GameSave): Scene01Choice[] {
  const scene = state.prologue?.scene01
  if (!scene || scene.queue.length) return []
  if (scene.nodeId.startsWith('OPEN-S03-') && !scene.privateScene03?.reading) return []
  const node = scene01Nodes[scene.nodeId]
  return node?.kind === 'choice' ? node.choices : []
}
export function sendScene01Choice(state: GameSave, choiceId: string, name = '', premiumAllowed = false, now = Date.now()): GameSave {
  const scene = state.prologue?.scene01
  const choice = scene01Choices(state).find(item => item.id === choiceId)
  if (!scene || !choice || choice.premiumChoice && !premiumAllowed) return state
  const id = `${scene.nodeId}-PLAYER-${choice.id}`
  if (state.deliveredEvents.includes(id)) return state
  const clean = name.trim().replace(/\s+/gu, ' ')
  if (choice.discloseName && (!clean || clean.length > 40 || /[\p{Cc}\p{Cf}<>]/u.test(clean))) return state
  const text = scene01Text(choice.text, choice.discloseName ? clean : scene.disclosedName)
  if (scene.nodeId.startsWith('OPEN-S03-') && scene.privateScene03) {
    const factIds = [id + '-CLAIM']
    return enter({ ...state, deliveredEvents: [...state.deliveredEvents, id], choices: { ...state.choices, [scene.nodeId]: choice.id }, messages: [...state.messages, { id, sender: 'player', recipient: 'sophie', channel: 'messages', text, at: now, delivery: 'delivered', disclosedFactIds: factIds }], knowledge: { ...state.knowledge, characters: { ...state.knowledge.characters, sophie: [...new Set([...state.knowledge.characters.sophie, ...factIds])] } }, prologue: { ...state.prologue!, scene01: { ...scene, messages: [...scene.messages, { id, sender: 'player', text, at: now }], privateScene03: { ...scene.privateScene03, draft: undefined, receipts: [...scene.privateScene03.receipts, { eventId: id, recipient: 'sophie', factIds }] } } } }, choice.next, now)
  }
  if (scene.nodeId.startsWith('OPEN-S02-')) {
    const recipients = (['sophie','maya','lucas'] as const).filter(actor => scene.groupPresence?.[actor] && scene.groupMembers?.[actor] !== false)
    const factIds = [id + '-CLAIM']
    const characters = { ...state.knowledge.characters }
    for (const recipient of recipients) characters[recipient] = [...new Set([...characters[recipient], ...factIds])]
    return enter({ ...state, deliveredEvents: [...state.deliveredEvents, id], choices: { ...state.choices, [scene.nodeId]: choice.id }, knowledge: { ...state.knowledge, characters }, messages: [...state.messages, ...recipients.map(recipient => ({ id: `${id}-TO-${recipient}`, sender: 'player' as const, recipient, channel: 'messages' as const, text, at: now, delivery: 'delivered' as const, disclosedFactIds: factIds }))], prologue: { ...state.prologue!, scene01: { ...scene, groupMessages: [...scene.groupMessages, { id, sender: 'player', text, at: now }], groupReceipts: [...scene.groupReceipts ?? [], ...recipients.map(recipient => ({ eventId: id, recipient, factIds }))] } } }, choice.next, now)
  }
  const next: GameSave = { ...state, player: choice.discloseName ? { ...state.player, name: clean } : state.player, deliveredEvents: [...state.deliveredEvents, id], choices: { ...state.choices, [scene.nodeId]: choice.id }, messages: [...state.messages, { id, sender: 'player', recipient: 'sophie', channel: 'messages', text, at: now, delivery: 'delivered', disclosedFactIds: choice.discloseName ? ['OPEN-S01-PLAYER-CODENAME'] : [] }], knowledge: choice.discloseName ? { ...state.knowledge, characters: { ...state.knowledge.characters, sophie: [...new Set([...state.knowledge.characters.sophie, 'OPEN-S01-PLAYER-CODENAME'])] } } : state.knowledge, prologue: { ...state.prologue!, scene01: { ...scene, invitationApproved: scene.nodeId === 'OPEN-S01-C13' ? choice.id !== 'd' : scene.invitationApproved, nameDisclosed: scene.nameDisclosed || !!choice.discloseName, disclosedName: choice.discloseName ? clean : scene.disclosedName, messages: [...scene.messages, { id, sender: 'player', text, at: now }] } } }
  return enter(next, choice.next, now)
}

export function scene01Invitation(state: GameSave, action: 'accept' | 'join' | 'dismiss' | 'show', now = Date.now()): GameSave {
  const scene = state.prologue?.scene01
  if (!scene || scene.queue.length || scene.invitation === 'none' || scene.invitation === 'joined') return state
  if (action === 'show' || action === 'dismiss') return replace(state, { ...scene, invitationDismissed: action === 'dismiss' })
  if (action === 'accept' && scene.invitation === 'declined') return enter(replace(state, { ...scene, invitation: 'none', invitationApproved: true, invitationDismissed: false }), scene01DelayedWarning, now)
  if (action !== 'join' || scene.invitation !== 'ready') return state
  const id = 'OPEN-S01-GROUP-JOINED'
  return beginScene02(event(replace(state, { ...scene, invitation: 'joined' }), id), now)
}

/** Owner replacement of the group transcript. Existing Scene 01 private replies are preserved. */
export function beginScene02(state: GameSave, now = Date.now()): GameSave {
  const scene = state.prologue?.scene01
  if (!scene || scene.invitation !== 'joined' || scene.groupScript === scene02Id) return state
  return enter(replace(state, { ...scene, complete: true, groupScript: scene02Id, groupPresence: { sophie: true, maya: true, lucas: true }, groupMembers: { sophie: true, maya: true, lucas: true }, groupReceipts: [], groupMessages: [{ id: 'OPEN-S01-GROUP-JOINED', sender: 'system', text: 'You joined FIND DANIEL.', at: now }], queue: [] }), scene02Opening, now)
}

/** Continue an earlier save stopped at the old source limit, without replaying its branch. */
export function resumeScene02(state: GameSave, now = Date.now()): GameSave {
  const scene = state.prologue?.scene01
  if (!scene || scene.nodeId !== 'OPEN-S02-SOURCE-BOUNDARY' || scene.queue.length || scene.groupComplete) return state
  const next = state.choices['OPEN-S02-C08'] === 'd' ? scene01Nodes['OPEN-S02-C08'] : undefined
  const target = next?.kind === 'choice' ? next.choices.find(choice => choice.id === 'd')!.next : scene02After08
  return enter(replace(state, { ...scene, groupSourceBoundary: false }), target, now)
}

/** Manual opening resumes the authored scene after the already delivered handoff, without replaying Hey. */
export function openScene03(state: GameSave, now = Date.now()): GameSave {
  const scene = state.prologue?.scene01, handoff = scene?.privateHandoff
  if (!scene || handoff?.deliveredAt === undefined || !scene.groupComplete || !scene.lucasLeftGroup || scene.privateScene03?.complete) return state
  const current = scene.privateScene03
  if (current) {
    if (current.reading) return state
    return replace(state, { ...scene, privateScene03: { ...current, reading: true, paused: undefined }, queue: current.paused ? [{ id: current.paused.id, dueAt: now + current.paused.remainingMs, typing: current.paused.typing }] : scene.queue })
  }
  const next = event(replace(state, { ...scene, privateHandoff: { ...handoff, openedAt: handoff.openedAt ?? now }, privateScene03: { version: 1, startedAt: now, reading: true, complete: false, nextEventReady: false, receipts: [{ eventId: 'OPEN-S03-FIRST-MESSAGE', recipient: 'player', factIds: [] }] } }), 'OPEN-S03-ACTIVATED')
  return enter(next, scene03Opening, now)
}

export function pauseScene03(state: GameSave, now = Date.now()): GameSave {
  const scene = state.prologue?.scene01, current = scene?.privateScene03
  if (!scene || !current?.reading || current.complete) return state
  const queued = scene.queue[0]
  return replace(state, { ...scene, queue: [], privateScene03: { ...current, reading: false, paused: queued ? { id: queued.id, remainingMs: Math.max(0, queued.dueAt - now), typing: queued.typing } : current.paused } })
}

export function draftScene03Choice(state: GameSave, choiceId: string): GameSave {
  const scene = state.prologue?.scene01, current = scene?.privateScene03
  if (!scene || !current || !scene01Choices(state).some(choice => choice.id === choiceId) || current.draft?.nodeId === scene.nodeId && current.draft.choiceId === choiceId) return state
  return replace(state, { ...scene, privateScene03: { ...current, draft: { nodeId: scene.nodeId, choiceId } } })
}

export function markScene01Read(state: GameSave, thread: 'sophie' | 'group'): GameSave {
  const scene = state.prologue?.scene01
  if (!scene) return state
  const ids = new Set((thread === 'group' ? scene.groupMessages : scene.messages).map(line => line.id))
  if (thread === 'sophie') { ids.add('OPEN-S01-INVITATION'); ids.add('OPEN-S01-DECLINED') }
  if (!state.notifications.some(item => ids.has(item.id) && !item.read)) return state
  return { ...state, notifications: state.notifications.map(item => ids.has(item.id) ? { ...item, read: true } : item) }
}
