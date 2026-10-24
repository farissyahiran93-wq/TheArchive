import { scene01DelayedWarning, scene01Nodes, scene01Opening, type Scene01Choice } from '../content/scene01'
import { scene02After08, scene02Id, scene02Opening } from '../content/scene02'
import { scene03DeliveryDelay, scene03Opening } from '../content/scene03'
import { npcDeliveryDelay } from './npcDelivery'
import type { GameSave, OpeningState } from './types'
import { actINodes } from '../content/actIRegistry'
import { actIFinalEntrances, actIFinalSenderRequest } from '../content/actIFinal'
import { ensureChapter1, chapter1Action } from './chapter1'
import { publicStoryEvent, publicStoryFlag, publicStoryHas, publicStoryPut, publicStorySave } from './scene04'
import { scene04Entrances } from '../content/scene04Final'

type Scene = NonNullable<OpeningState['scene01']>
export const beginLegacyScene01 = (state: GameSave, now = Date.now()) => beginScene01(state, now, 'legacy')
function replace(state: GameSave, scene: Scene): GameSave { return { ...state, prologue: { ...state.prologue!, scene01: scene } } }
function event(state: GameSave, id: string): GameSave { return state.deliveredEvents.includes(id) ? state : { ...state, deliveredEvents: [...state.deliveredEvents, id] } }
export function scene01Text(text: string, name?: string): string { return text.replaceAll('[PLAYER_NAME]', name ?? '…') }
function enter(state: GameSave, id: string, now: number): GameSave {
  const node = actINodes(state.prologue?.scene01)[id]
  if (!node || !state.prologue?.scene01) return state
  const scene = { ...state.prologue.scene01, nodeId: id, queue: [], ...(id.startsWith('OPEN-S03-') && state.prologue.scene01.privateScene03 ? { privateScene03: { ...state.prologue.scene01.privateScene03, draft: undefined } } : {}) } satisfies Scene
  let next = replace(state, scene)
  if (node.kind === 'wait' && node.duration === 0) return enter(event(next, id), node.next, now)
  if (node.kind === 'npc' || node.kind === 'wait') return replace(next, { ...scene, queue: [{ id, dueAt: now + (node.kind === 'wait' ? node.duration : id.startsWith('OPEN-S03-') ? scene03DeliveryDelay(node.text) : npcDeliveryDelay(node.sender ?? 'sophie', node.text)), typing: node.kind === 'npc' || node.typing }] })
  if (node.kind === 'gate' && node.action === 's04-article') return publicStoryFlag(next,'link-delivered')
  if (node.kind === 'choice' || node.kind === 'gate') return next
  if (node.kind === 'condition') return enter(next, (node.test === 'name-disclosed' ? scene.nameDisclosed : node.test === 's04-group-opened' ? publicStoryHas(next,'group-opened') : next.chapter1?.sender.seen && !next.chapter1.sender.disclosed) ? node.next : node.otherwise, now)
  if (state.deliveredEvents.includes(id)) return node.next ? enter(next, node.next, now) : next
  next = event(next, id)
  if (node.event.startsWith('s04-')) {
    next = publicStoryEvent(next,node,now)
    return node.next ? enter(next,node.next,now) : next
  }
  if (node.event === 'route') return node.next ? enter(next, node.next, now) : next
  if (node.event === 'sender-arrival') {
    next = ensureChapter1(next)
    if (!next.chapter1) return next
    const {id:first,text} = actIFinalSenderRequest
    if (!next.deliveredEvents.includes(first)) next = { ...event(next, first), chapter1: { ...next.chapter1, sender: { ...next.chapter1.sender, messages: [...next.chapter1.sender.messages, { id: first, sender: 'unknown', text, at: now }] } }, notifications: [...next.notifications, { id: first, text, read: false }] }
    return enter(next, node.next!, now)
  }
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
    return enter(replace(next, { ...scene, groupPresence: { sophie: true, maya: true, lucas: true, ...scene.groupPresence, [actor]: !!node.online }, groupMessages: /^OPEN-S0[34]-/.test(id) ? scene.groupMessages : [...scene.groupMessages, line] }), node.next!, now)
  }
  if (node.event === 'effects') {
    const relationships = { ...next.relationships }
    for (const actor of ['sophie','maya','lucas'] as const) {
      const delta = node.effects?.[actor]
      if (delta) relationships[actor] = { ...relationships[actor], ...Object.fromEntries(Object.entries(delta).map(([key, value]) => [key, Math.max(scene.scriptRevision ? 0 : -100, Math.min(100, relationships[actor][key as 'trust'] + value))])) }
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
export function beginScene01(state: GameSave, now = Date.now(), revision: 'legacy' | 'final-2026-10-23' = state.narrativePlan === 'ch01-master-18' ? 'final-2026-10-23' : 'legacy'): GameSave {
  if (state.prologue?.scene01) return state
  const prologue: OpeningState = state.prologue ?? { dialogueVersion: 4, stage: 'chat', step: 0, messages: [], noteSeen: false, offerInspected: false, restored: false, viewed: [], indexCompared: false }
  const opening = revision === 'legacy' ? scene01Opening : actIFinalEntrances.scene01
  const scene: Scene = { version: 1, ...(revision === 'legacy' ? {} : { scriptRevision: revision }), nodeId: opening, startedAt: now, introduced: false, nameDisclosed: false, invitation: 'none', invitationDismissed: false, complete: false, queue: [], messages: [], groupMessages: [] }
  const next = enter({ ...state, prologue: { ...prologue, scene01: scene } }, opening, now)
  return deliverScene01(replace(next, { ...next.prologue!.scene01!, queue: [{ id: opening, dueAt: now, typing: false }] }), now)
}

export function deliverScene01(state: GameSave, now: number): GameSave {
  const scene = state.prologue?.scene01, queued = scene?.queue[0]
  if (!scene || !queued || queued.dueAt > now) return state
  if (queued.id.startsWith('OPEN-S03-') && queued.id !== 'OPEN-S03-FIRST-MESSAGE' && !scene.privateScene03?.reading) return state
  if (queued.id.startsWith('OPEN-S04-') && !state.chapter1?.publicStory?.reading) return state
  const node = actINodes(scene)[queued.id]
  if (!node || !['npc','wait'].includes(node.kind)) return state
  if (node.kind === 'npc' && node.channel === 'group' && node.sender === 'lucas' && scene.groupMembers?.lucas === false) return replace(state, { ...scene, queue: [] })
  let next = replace(state, { ...scene, queue: [] })
  if (node.kind === 'wait') return enter(event(next, node.id), node.next, now)
  if (node.kind !== 'npc') return state
  if (!state.deliveredEvents.includes(node.id)) {
    const text = scene01Text(node.text, scene.nameDisclosed ? scene.disclosedName : undefined)
    const sender = node.sender ?? 'sophie'
    const line = { id: node.id, sender, text, at: now }
    // Even the branch without a self-introduction learns her visible group sender name on delivery.
    next = replace(next, { ...scene, queue: [], introduced: scene.introduced || !!node.introducesSophie || !!scene.scriptRevision && node.channel === 'group' && sender === 'sophie', messages: node.channel === 'sophie' ? [...scene.messages, { ...line, sender: 'sophie' }] : scene.messages, groupMessages: node.channel === 'group' ? [...scene.groupMessages, line] : scene.groupMessages, groupReceipts: node.channel === 'group' ? [...scene.groupReceipts ?? [], { eventId: node.id, recipient: 'player', factIds: node.heardFacts ?? [] }] : scene.groupReceipts,
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
  const node = actINodes(scene)[scene.nodeId]
  if (scene.nodeId.startsWith('OPEN-S04-') && node?.kind === 'choice' && !node.uiChoice && state.chapter1?.publicStory?.reading !== (node.channel ?? 'sophie')) return []
  const replied = !!state.chapter1?.sender.branch && !['ignore','ignored'].includes(state.chapter1.sender.branch)
  return node?.kind === 'choice' ? node.choices.filter(choice => !choice.requires || (choice.requires === 'sender-replied' ? replied : !replied)) : []
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
  if (scene.nodeId.startsWith('OPEN-S04-')) {
    const node = actINodes(scene)[scene.nodeId]
    let next = { ...event(state,id), choices:{...state.choices,[scene.nodeId]:choice.id} }
    if(node.kind==='choice'&&node.uiChoice){
      if(scene.nodeId==='OPEN-S04-C11'){
        if(['a','c'].includes(choice.id))next=publicStorySave(next,'public',now)
        if(['a','b'].includes(choice.id))next=publicStorySave(next,'index',now)
      }
      return enter(next,choice.next,now)
    }
    const group=node.kind==='choice'&&node.channel==='group'||scene.nodeId.includes('FINAL-C07-')
    const recipients = group ? (['sophie','maya'] as const).filter(actor=>scene.groupMembers?.[actor]!==false) : ['sophie'] as const
    const factIds=[id+'-CLAIM',...(text==='In a recovered index on this device. I haven\'t verified its source.'||scene.nodeId==='OPEN-S04-C13'&&choice.id==='e'?['S04-SOPHIE-INDEX-CLAIM']:[]),...(scene.nodeId==='OPEN-S04-C13'&&choice.id==='b'?['S04-SOPHIE-UNSPECIFIED-LEAD']:[])]
    const characters={...state.knowledge.characters}
    for(const actor of recipients)characters[actor]=[...new Set([...characters[actor],...factIds])]
    next={...next,knowledge:{...next.knowledge,characters},messages:[...next.messages,...recipients.map(recipient=>({id:id+'-TO-'+recipient,sender:'player' as const,recipient,channel:'messages' as const,text,at:now,delivery:'delivered' as const,disclosedFactIds:factIds}))],prologue:{...next.prologue!,scene01:{...scene,...(group?{groupMessages:[...scene.groupMessages,{id,sender:'player',text,at:now}]}:{messages:[...scene.messages,{id,sender:'player',text,at:now}]}),draft:undefined}}}
    return enter(next,choice.next,now)
  }
  if (scene.nodeId.startsWith('OPEN-S03-') && scene.privateScene03) {
    const disclosure = !!scene.scriptRevision && text.includes("You shouldn't be talking to her.") && !!state.chapter1?.sender.seen && !state.chapter1.sender.disclosed
    if (disclosure && state.chapter1) state = { ...state, chapter1: { ...state.chapter1, sender: { ...state.chapter1.sender, disclosed: true } }, relationships: { ...state.relationships, sophie: { ...state.relationships.sophie, trust: Math.min(100, state.relationships.sophie.trust + 1) } } }
    const factIds = [id + '-CLAIM', ...(disclosure ? ['CH1-SENDER-WARNING-DISCLOSED'] : [])]
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
  if (action === 'accept' && scene.invitation === 'declined') return enter(replace(state, { ...scene, invitation: 'none', invitationApproved: true, invitationDismissed: false }), scene.scriptRevision ? actIFinalEntrances.deferred : scene01DelayedWarning, now)
  if (action !== 'join' || scene.invitation !== 'ready') return state
  const id = 'OPEN-S01-GROUP-JOINED'
  const joined = event(replace(state, { ...scene, invitation: 'joined', complete: true }), id)
  return scene.scriptRevision ? joined : beginScene02(joined, now)
}

/** Owner replacement of the group transcript. Existing Scene 01 private replies are preserved. */
export function beginScene02(state: GameSave, now = Date.now()): GameSave {
  const scene = state.prologue?.scene01
  if (!scene || scene.invitation !== 'joined' || scene.groupScript === scene02Id) return state
  return enter(replace(state, { ...scene, complete: true, groupScript: scene02Id, groupPresence: { sophie: true, maya: true, lucas: true }, groupMembers: { sophie: true, maya: true, lucas: true }, groupReceipts: [], groupMessages: [{ id: 'OPEN-S01-GROUP-JOINED', sender: 'system', text: 'You joined FIND DANIEL.', at: now }], queue: [] }), scene.scriptRevision ? actIFinalEntrances.scene02 : scene02Opening, now)
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
  if (scene?.privateScene03?.complete) return openPublicStory(state,now)
  if (!scene || handoff?.deliveredAt === undefined || !scene.groupComplete || !scene.lucasLeftGroup || scene.privateScene03?.complete) return state
  const current = scene.privateScene03
  if (current) {
    if (current.reading) return state
    return replace(state, { ...scene, privateScene03: { ...current, reading: true, paused: undefined }, queue: current.paused ? [{ id: current.paused.id, dueAt: now + current.paused.remainingMs, typing: current.paused.typing }] : scene.queue })
  }
  const next = event(replace(state, { ...scene, privateHandoff: { ...handoff, openedAt: handoff.openedAt ?? now }, privateScene03: { version: 1, startedAt: now, reading: true, complete: false, nextEventReady: false, receipts: [{ eventId: 'OPEN-S03-FIRST-MESSAGE', recipient: 'player', factIds: [] }] } }), 'OPEN-S03-ACTIVATED')
  return enter(next, scene.scriptRevision ? actIFinalEntrances.scene03 : scene03Opening, now)
}

export function pauseScene03(state: GameSave, now = Date.now()): GameSave {
  const scene = state.prologue?.scene01, current = scene?.privateScene03
  if(state.chapter1?.publicStory?.reading&&scene){
    const queued=scene.queue[0]
    return publicStoryPut(replace(state,{...scene,queue:[]}),{reading:undefined,paused:queued?{id:queued.id,remainingMs:Math.max(0,queued.dueAt-now),typing:queued.typing}:state.chapter1.publicStory.paused})
  }
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

export type ActIAction = 'open-group' | 'open-sender' | 'later' | 'tell' | 'keep' | 'continue'
/** Manual navigation gates have no outgoing bubble and never impersonate a player reply. */
export function actIAction(state: GameSave, action: ActIAction, now = Date.now()): GameSave {
  const scene = state.prologue?.scene01
  if (!scene?.scriptRevision) return state
  if(action==='open-group'&&state.chapter1?.publicStory?.groupCheckpoint&&!state.chapter1.publicStory.complete){
    const p=state.chapter1.publicStory,checkpoint=p.groupCheckpoint!,queued=scene.queue[0]
    const parked={nodeId:scene.nodeId,paused:queued?{id:queued.id,remainingMs:Math.max(0,queued.dueAt-now),typing:queued.typing}:p.paused}
    const next=publicStoryPut(replace(state,{...scene,nodeId:checkpoint.nodeId,queue:checkpoint.paused?[{id:checkpoint.paused.id,dueAt:now+checkpoint.paused.remainingMs,typing:checkpoint.paused.typing}]:[]}),{reading:'group',parked,groupCheckpoint:undefined,paused:undefined})
    return next
  }
  if(action==='open-group'&&publicStoryHas(state,'group-notice')&&!state.chapter1?.publicStory?.complete&&!publicStoryHas(state,'group-opened')){
    const queued=scene.queue[0],node=actINodes(scene)[scene.nodeId]
    const parked={nodeId:node?.kind==='gate'&&node.action==='s04-group'?node.next:scene.nodeId,paused:queued?{id:queued.id,remainingMs:Math.max(0,queued.dueAt-now),typing:queued.typing}:state.chapter1?.publicStory?.paused}
    return enter(publicStoryPut(publicStoryFlag(state,'group-opened'),{reading:'group',paused:undefined,parked}),scene04Entrances.group,now)
  }
  if(action==='open-group'&&state.chapter1?.publicStory?.reading!=='group'&&isPublicGroupNode(state)&&!state.chapter1?.publicStory?.complete)return resumePublicStory(state,'group',now)
  if (action === 'open-group' && scene.invitation === 'joined' && !scene.groupScript) return beginScene02(state, now)
  const node = actINodes(scene)[scene.nodeId]
  if (node?.kind !== 'gate') return state
  if (node.action === 'sender-request') {
    if (action === 'open-sender') return chapter1Action(state, { type: 'read-sender' }, now)
    if (action === 'later' || action === 'open-group' && state.chapter1?.sender.seen) return enter(state, node.next, now)
  }
  if (node.action === 'disclosure' && ['tell','keep'].includes(action)) return enter(state, action === 'tell' && state.chapter1?.sender.seen ? node.next : node.skip!, now)
  if (node.action === 'deferred' && action === 'continue') return enter(state, node.next, now)
  return state
}

export function draftActIChoice(state: GameSave, choiceId: string): GameSave {
  const scene = state.prologue?.scene01
  if (!scene?.scriptRevision || !scene01Choices(state).some(c => c.id === choiceId)) return state
  return replace(state, { ...scene, draft: { nodeId: scene.nodeId, choiceId } })
}

function resumePublicStory(state:GameSave,reading:'sophie'|'group',now:number):GameSave {
  const p=state.chapter1?.publicStory,scene=state.prologue?.scene01
  if(!p||!scene)return state
  if(p.reading===reading)return state
  return publicStoryPut(replace(state,{...scene,queue:p.paused?[{id:p.paused.id,dueAt:now+p.paused.remainingMs,typing:p.paused.typing}]:scene.queue}),{reading,paused:undefined})
}

function openPublicStory(state:GameSave,now:number):GameSave {
  const p=state.chapter1?.publicStory,scene=state.prologue?.scene01
  if(!p||!scene||p.complete||!state.deliveredEvents.includes('CH1-S04-LEAD'))return state
  if(!p.started)return enter(publicStoryPut(state,{started:true,reading:'sophie'}),scene04Entrances.opening,now)
  if(scene.nodeId==='OPEN-S04-FOLLOWUP-WAIT'&&state.deliveredEvents.includes('CH1-S04-FOLLOWUP'))return enter(publicStoryPut(state,{reading:'sophie'}),'OPEN-S04-FOLLOWUP',now)
  if(isPublicGroupNode(state)&&p.parked){
    const target=p.parked?.nodeId??'OPEN-S04-AFTER-GROUP',paused=p.parked?.paused
    const finished=scene.nodeId==='OPEN-S04-GROUP-END',queued=scene.queue[0]
    const groupCheckpoint=finished?undefined:{nodeId:scene.nodeId,paused:queued?{id:queued.id,remainingMs:Math.max(0,queued.dueAt-now),typing:queued.typing}:p.paused}
    const next=publicStoryPut(replace(state,{...scene,nodeId:target,queue:[]}),{reading:'sophie',parked:undefined,groupCheckpoint,paused:undefined})
    return paused?replace(next,{...next.prologue!.scene01!,queue:[{id:paused.id,dueAt:now+paused.remainingMs,typing:paused.typing}]}):enter(next,target,now)
  }
  return resumePublicStory(state,'sophie',now)
}

function isPublicGroupNode(state:GameSave):boolean {
  const id=state.prologue?.scene01?.nodeId??'',node=actINodes(state.prologue?.scene01)[id]
  return id.startsWith('OPEN-S04-')&&(id==='OPEN-S04-GROUP-END'||id.includes('-FINAL-AFTER-07-')||id.includes('-FINAL-GROUP-OPENING-')||node?.kind==='npc'&&node.channel==='group'||node?.kind==='choice'&&node.channel==='group')
}

export type PublicStoryAction = {type:'open-article'|'mark-read'|'return-sophie'|'open-index'|'acknowledge'|'device'|'group-later'|'version-history'|'save-public'|'close-tooltip'|'close-index'} | {type:'tooltip';id:'byline'|'updated'} | {type:'scroll';value:number}
/** Actual player actions are the only way across Browser and Archive gates. */
export function publicStoryAction(state:GameSave,action:PublicStoryAction,now=Date.now()):GameSave {
  const p=state.chapter1?.publicStory,scene=state.prologue?.scene01
  if(!p||!scene?.scriptRevision)return state
  const node=actINodes(scene)[scene.nodeId]
  if(action.type==='open-article'){
    if(!publicStoryHas(state,'link-delivered'))return state
    return publicStoryPut(publicStoryFlag(pauseScene03(state,now),'article-opened'),{panel:'article'})
  }
  if(action.type==='scroll')return publicStoryHas(state,'article-opened')?publicStoryPut(state,{scroll:Math.max(0,action.value)}):state
  if(action.type==='tooltip')return publicStoryHas(state,'article-opened')?publicStoryPut(state,{tooltip:action.id}):state
  if(action.type==='close-tooltip')return publicStoryPut(state,{tooltip:undefined})
  if(action.type==='mark-read')return publicStoryHas(state,'article-opened')?publicStoryFlag(state,'article-inspected'):state
  if(action.type==='save-public')return publicStoryHas(state,'article-opened')?publicStorySave(state,'public',now):state
  if(action.type==='return-sophie'){
    if(scene.nodeId==='OPEN-S04-ARTICLE-GATE'&&publicStoryHas(state,'article-inspected'))return enter(publicStoryPut(state,{reading:'sophie'}),'OPEN-S04-AFTER-ARTICLE',now)
    return openPublicStory(state,now)
  }
  if(action.type==='group-later'&&node?.kind==='gate'&&node.action==='s04-group')return enter(publicStoryFlag(state,'group-deferred'),node.next,now)
  if(action.type==='close-index')return publicStoryPut(state,{panel:'home'})
  if(action.type==='open-index'){
    if(!publicStoryHas(state,'index-available'))return state
    const next=publicStoryPut(publicStoryFlag(pauseScene03(state,now),'index-opened'),{panel:'index'})
    return scene.nodeId==='OPEN-S04-ARCHIVE-GATE'?enter(next,'OPEN-S04-C10',now):next
  }
  if(action.type==='acknowledge'&&scene.nodeId==='OPEN-S04-INDEX-ACK'&&publicStoryHas(state,'index-opened'))return enter(publicStoryFlag(state,'index-acknowledged'),'OPEN-S04-C11',now)
  if(action.type==='device'&&scene.nodeId==='OPEN-S04-RETURN-DEVICE'){
    const next=publicStoryFlag(state,'followup-scheduled')
    return {...replace(next,{...scene,nodeId:'OPEN-S04-FOLLOWUP-WAIT',queue:[]}),pendingEvents:[...next.pendingEvents,{id:'CH1-S04-FOLLOWUP',dueAt:now+2300}]}
  }
  if(action.type==='version-history'&&p.complete)return chapter1Action(state,{type:'advance'},now)
  return state
}
