import { validateChapter1 } from './chapter1'
import { mirrorConnections, mirrorEntry, mirrorPairKey, recoverySources } from '../content/mirror'
import { validateAccessState } from './chapter2Access'
import { actINodes } from '../content/actIRegistry'
import { beginOpening, deliverPhoneOpeningEvent } from './opening'
import { fixtureChoices, fixtureLine, type FixtureEventId } from './fixture'
import { episodeRequirements } from '../content/episodes'
import { characterIds, type CharacterId, type GameSave, type Pronouns } from './types'
import { beginSlice, deliverSliceEvent } from './slice'
import { deliverPhase03bEvent } from './phase03b'
import { deliverFollowup } from './characterFollowups'

const eventIds: FixtureEventId[] = ['fixture.hello', 'fixture.check', 'fixture.reply', 'fixture.close']

function schedule(state: GameSave, id: FixtureEventId, dueAt: number): GameSave {
  if (state.deliveredEvents.includes(id) || state.pendingEvents.some(event => event.id === id)) return state
  return { ...state, pendingEvents: [...state.pendingEvents, { id, dueAt }] }
}

export function registerPlayer(state: GameSave, name: string, pronouns?: Pronouns): GameSave {
  const clean = name.trim().replace(/\s+/g, ' ')
  if (state.player || clean.length < 2 || clean.length > 24) return state
  const registered = { ...state, player: { name: clean, pronouns }, deliveredEvents: [...state.deliveredEvents, 'EV-E01-S01-IDENTITY'] }
  return beginOpening(beginSlice(registered))
}

export function enterFixture(state: GameSave, now: number): GameSave {
  if (!state.player) return state
  return schedule({ ...state, sceneId: 'fixture' }, 'fixture.hello', now + 750)
}

export function dueEvent(state: GameSave, now: number): GameSave {
  const event = [...state.pendingEvents].sort((a, b) => a.dueAt - b.dueAt)[0]
  if (!event || event.dueAt > now) return state
  if (event.id.startsWith('OPEN-V4-')) return deliverPhoneOpeningEvent(state, now)
  if (!state.player) return state
  if (event.id.startsWith('EV-E01-S11-')) return paceOverdueNpc(deliverSliceEvent(state, now), now)
  if (event.id.startsWith('EV-E01-P03B:')) return paceOverdueNpc(deliverPhase03bEvent(state, now), now)
  if (event.id.startsWith('ARC-E01-')) return paceOverdueNpc(deliverFollowup(state, now), now)
  if (!eventIds.includes(event.id as FixtureEventId)) return state
  const pendingEvents = state.pendingEvents.filter(item => item.id !== event.id)
  if (state.deliveredEvents.includes(event.id)) return { ...state, pendingEvents }
  const id = event.id as FixtureEventId
  let next: GameSave = {
    ...state, pendingEvents, deliveredEvents: [...state.deliveredEvents, id],
    messages: [...state.messages.map(message => id === 'fixture.reply' && message.sender === 'player' ? { ...message, delivery: 'read' as const } : message), { id, sender: 'fixture', text: fixtureLine(id, state.player.name, state.choices['fixture.response']), at: now, delivery: 'delivered' }],
    notifications: [...state.notifications, { id, text: 'New test message', read: false }],
  }
  if (id === 'fixture.hello') next = schedule(next, 'fixture.check', now + 1100)
  if (id === 'fixture.reply') next = schedule(next, 'fixture.close', now + 1250)
  return next
}

/** Rehydrate one NPC turn at a time after a hidden tab or long app suspension. */
function paceOverdueNpc(state: GameSave, now: number): GameSave {
  if (state.prologue?.dialogueVersion !== 4) return state
  let nextDue = now
  let changed = false
  const pendingEvents = [...state.pendingEvents].sort((a, b) => a.dueAt - b.dueAt).map(event => {
    const npc = event.id.startsWith('EV-E01-S11-') || event.id.startsWith('EV-E01-P03B:') && !event.id.includes('GCRO_ISSUE') || event.id.startsWith('ARC-E01-')
    if (!npc || event.dueAt > now) return event
    nextDue += event.id.includes('LUCAS') ? 1600 : event.id.includes('ELI') || event.id.includes('NORA') ? 2600 : 2100
    changed = true
    return { ...event, dueAt: nextDue }
  })
  return changed ? { ...state, pendingEvents } : state
}

export function sendFixtureChoice(state: GameSave, choiceId: string, now: number): GameSave {
  const choice = fixtureChoices.find(item => item.id === choiceId)
  if (!choice || !state.player || !state.deliveredEvents.includes('fixture.check') || state.choices['fixture.response']) return state
  const next: GameSave = {
    ...state,
    choices: { ...state.choices, 'fixture.response': choice.id },
    messages: [...state.messages, { id: `player.${choice.id}`, sender: 'player', recipient: 'fixture', text: choice.text, at: now, delivery: 'delivered' }],
  }
  return schedule(next, 'fixture.reply', now + 1450)
}

export function markMessagesRead(state: GameSave): GameSave {
  if (state.messages.every(message => message.sender !== 'fixture' || message.delivery === 'read') && state.notifications.every(notification => notification.read)) return state
  return {
    ...state,
    messages: state.messages.map(message => message.sender === 'fixture' ? { ...message, delivery: 'read' } : message),
    notifications: state.notifications.map(notification => notification.id.startsWith('fixture.') ? { ...notification, read: true } : notification),
  }
}

export function grantKnowledge(state: GameSave, character: CharacterId, factId: string, source: { kind: 'disclosure'; messageId: string } | { kind: 'public'; eventId: string }): GameSave {
  const valid = source.kind === 'disclosure'
    ? state.messages.some(message => message.id === source.messageId && message.sender === 'player' && message.recipient === character && message.disclosedFactIds?.includes(factId))
    : false // Public event fact mappings are intentionally absent until canonical content is authored.
  if (!valid || state.knowledge.characters[character].includes(factId)) return state
  return { ...state, knowledge: { ...state.knowledge, characters: { ...state.knowledge.characters, [character]: [...state.knowledge.characters[character], factId] } } }
}

export function canUnlockEpisode(state: GameSave, episodeId: string): boolean {
  const requiredEventIds = episodeRequirements[episodeId]
  return episodeId !== 'phase-00' && !!requiredEventIds?.length && requiredEventIds.every(id => state.deliveredEvents.includes(id))
}

export function normalizeSave(input: unknown): GameSave {
  const record = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null && !Array.isArray(value)
  if (!record(input) || input.schemaVersion !== 1) throw new Error('Unsupported save schema')
  validateChapter1(input.chapter1)
  if (input.narrativePlan !== undefined && !['ch01-master-18','legacy-access'].includes(String(input.narrativePlan))) throw new Error('Invalid narrative plan')
  validateAccessState(input.chapter2Access)
  if (input.saveRevision !== undefined && (!Number.isSafeInteger(input.saveRevision) || Number(input.saveRevision) < 0)) throw new Error('Invalid save revision')
  if (input.player !== null && (!record(input.player) || typeof input.player.name !== 'string')) throw new Error('Invalid player identity')
  if (input.episodeId !== 'phase-00' || !['home', 'fixture'].includes(String(input.sceneId))) throw new Error('Invalid story position')
  if (!Array.isArray(input.unlockedEpisodes) || !record(input.choices) || !Array.isArray(input.messages) || !Array.isArray(input.pendingEvents) || !Array.isArray(input.deliveredEvents)) throw new Error('Incomplete progress data')
  if (!record(input.knowledge) || !Array.isArray(input.knowledge.player) || !record(input.knowledge.characters)) throw new Error('Incomplete knowledge ledger')
  for (const id of characterIds) if (!Array.isArray(input.knowledge.characters[id])) throw new Error('Incomplete knowledge ledger')
  const relationships = input.relationships
  if (!record(relationships) || characterIds.some(id => !record(relationships[id]))) throw new Error('Incomplete relationship data')
  if (!record(input.evidence) || !Array.isArray(input.notifications) || !record(input.settings) || typeof input.settings.reduceMotion !== 'boolean') throw new Error('Incomplete device data')
  if (input.e01 !== undefined) {
    const slice = input.e01
    if (!record(slice) || typeof slice.sceneId !== 'string' || !/^E01-S(0[2-9]|[12][0-9]|30)$/.test(slice.sceneId) || typeof slice.briefRead !== 'boolean' || typeof slice.previewInspected !== 'boolean' || typeof slice.hintCount !== 'number' || typeof slice.attempts !== 'number' || typeof slice.compared !== 'boolean' || typeof slice.handle !== 'string' || typeof slice.editorChecked !== 'boolean') throw new Error('Invalid Episode 01 slice data')
    if (slice.editorHintCount !== undefined && (typeof slice.editorHintCount !== 'number' || slice.editorHintCount < 0 || slice.editorHintCount > 3)) throw new Error('Invalid editor hint state')
    for (const field of ['s12Choice','s13Primary','s13Followup'] as const) if (slice[field] !== undefined && typeof slice[field] !== 'string') throw new Error(`Invalid ${field}`)
    if (slice.s13Asked !== undefined && typeof slice.s13Asked !== 'boolean') throw new Error('Invalid S13 choice state')
    if (slice.s14Share !== undefined && !['image','text','none','defer'].includes(String(slice.s14Share))) throw new Error('Invalid S14 share scope')
    for (const field of ['s15NoteSeen','s16OfferSeen','messagesConsent','archiveConsent'] as const) if (slice[field] !== undefined && typeof slice[field] !== 'boolean') throw new Error(`Invalid ${field}`)
    for (const field of ['s16Primary','s16Followup'] as const) if (slice[field] !== undefined && typeof slice[field] !== 'string') throw new Error(`Invalid ${field}`)
    if (slice.s18Route !== undefined && !['public','archive'].includes(String(slice.s18Route))) throw new Error('Invalid S18 route')
    if (slice.s18Inspected !== undefined && !['preview','current','notice'].includes(String(slice.s18Inspected))) throw new Error('Invalid S18 source')
    if (slice.s18HintCount !== undefined && (typeof slice.s18HintCount !== 'number' || slice.s18HintCount < 0 || slice.s18HintCount > 3)) throw new Error('Invalid S18 hint state')
    if (slice.boardLinks !== undefined && (!Array.isArray(slice.boardLinks) || slice.boardLinks.some(link => !['E001|E002','E002|E012','E003|E012'].includes(String(link))))) throw new Error('Invalid Case Board links')
    if (slice.s27Status !== undefined && !['reviewing','issued','refused','delayed','unavailable'].includes(String(slice.s27Status))) throw new Error('Invalid GCRO request status')
    if (slice.s27Attempt !== undefined && (!Number.isSafeInteger(slice.s27Attempt) || Number(slice.s27Attempt) < 0)) throw new Error('Invalid GCRO request attempt')
    if (slice.s27OfficeResponse !== undefined && !['issue','delay','refuse','unavailable'].includes(String(slice.s27OfficeResponse))) throw new Error('Invalid GCRO office response')
    for (const field of ['s27ReviewRecorded','s28CorrectionRequested'] as const) if (slice[field] !== undefined && typeof slice[field] !== 'boolean') throw new Error(`Invalid ${field}`)
    if (slice.s28Payload !== undefined && (typeof slice.s28Payload !== 'string' || slice.s28Payload.length > 20000)) throw new Error('Invalid GCRO payload')
    if (slice.s28OfficeAvailability !== undefined && !['available','unavailable'].includes(String(slice.s28OfficeAvailability))) throw new Error('Invalid GCRO office availability')
  }
  if (input.prologue !== undefined) {
    const prologue = input.prologue
    if (!record(prologue) || !['chat','group','recovery','mirror','found','complete'].includes(String(prologue.stage)) ||
      ![0,1,2].includes(Number(prologue.step)) || !Array.isArray(prologue.messages) ||
      prologue.messages.some(message => !record(message) || typeof message.id !== 'string' ||
        !['sophie','player'].includes(String(message.sender)) || typeof message.text !== 'string' || message.at !== undefined && !Number.isFinite(message.at)) ||
      typeof prologue.noteSeen !== 'boolean' || typeof prologue.offerInspected !== 'boolean' ||
      typeof prologue.restored !== 'boolean' || !Array.isArray(prologue.viewed) ||
      prologue.viewed.some(area => typeof area !== 'string') || typeof prologue.indexCompared !== 'boolean' ||
      (prologue.inspectedRecords !== undefined && (!Array.isArray(prologue.inspectedRecords) || prologue.inspectedRecords.some(key => typeof key !== 'string'))) ||
      (prologue.unlockedMirrorRecords !== undefined && (!Array.isArray(prologue.unlockedMirrorRecords) || prologue.unlockedMirrorRecords.some(key => typeof key !== 'string'))) ||
      (prologue.mirrorHints !== undefined && (!record(prologue.mirrorHints) || Object.values(prologue.mirrorHints).some(level => !Number.isSafeInteger(level) || Number(level) < 0 || Number(level) > 3)))) {
      throw new Error('Invalid opening progress')
    }
    if (prologue.recoveredSourceIds !== undefined && (!Array.isArray(prologue.recoveredSourceIds) ||
      new Set(prologue.recoveredSourceIds).size !== prologue.recoveredSourceIds.length ||
      prologue.recoveredSourceIds.some(id => !prologue.restored || !recoverySources.some(source => source.id === id && source.requiredEvents.length > 0 && source.requiredEvents.every(event => (input.deliveredEvents as unknown[]).includes(event)))))) throw new Error('Invalid recovered source receipts')
    if (prologue.mirrorLocation !== undefined && (typeof prologue.mirrorLocation !== 'string' || !mirrorEntry(prologue.mirrorLocation))) throw new Error('Invalid mirror location')
    if (prologue.mirrorLinks !== undefined && (!Array.isArray(prologue.mirrorLinks) || prologue.mirrorLinks.some(key => typeof key !== 'string' || !mirrorConnections.some(link => mirrorPairKey(link.a, link.b) === key)))) throw new Error('Invalid mirror connections')
    if (prologue.dialogueVersion !== undefined && ![2,3,4].includes(Number(prologue.dialogueVersion))) throw new Error('Invalid opening dialogue version')
    if (prologue.v4Beat !== undefined && !['first','name','address','question','offline','waiting-group'].includes(String(prologue.v4Beat))) throw new Error('Invalid new opening beat')
    if (prologue.privateBeat !== undefined && !['apology','questions','checking','stay'].includes(String(prologue.privateBeat))) throw new Error('Invalid private conversation beat')
    if (prologue.scene01 !== undefined) {
      const scene = prologue.scene01
      const scene01Nodes = actINodes(scene as never)
      if (!record(scene) || scene.version !== 1 || scene.scriptRevision !== undefined && scene.scriptRevision !== 'final-2026-10-23' || typeof scene.nodeId !== 'string' || !scene01Nodes[scene.nodeId] || !Number.isFinite(scene.startedAt) ||
        typeof scene.introduced !== 'boolean' || typeof scene.nameDisclosed !== 'boolean' || typeof scene.invitationDismissed !== 'boolean' || typeof scene.complete !== 'boolean' ||
        !['none','declined','ready','joined'].includes(String(scene.invitation)) || scene.invitationApproved !== undefined && typeof scene.invitationApproved !== 'boolean' ||
        scene.disclosedName !== undefined && (typeof scene.disclosedName !== 'string' || scene.disclosedName.length < 1 || scene.disclosedName.length > 40) || scene.nameDisclosed && !scene.disclosedName ||
        !Array.isArray(scene.queue) || scene.queue.length > 1 || scene.queue.some(line => !record(line) || typeof line.id !== 'string' || !scene01Nodes[line.id] || !Number.isFinite(line.dueAt) || typeof line.typing !== 'boolean') ||
        !Array.isArray(scene.messages) || scene.messages.some(line => !record(line) || typeof line.id !== 'string' || !['sophie','player'].includes(String(line.sender)) || typeof line.text !== 'string' || !Number.isFinite(line.at)) ||
        !Array.isArray(scene.groupMessages) || scene.groupMessages.some(line => !record(line) || typeof line.id !== 'string' || !['sophie','maya','lucas','player','system'].includes(String(line.sender)) || typeof line.text !== 'string' || !Number.isFinite(line.at)) ||
        scene.groupScript !== undefined && scene.groupScript !== 'ch01_sc02_uninvited_guest' ||
        scene.groupSourceBoundary !== undefined && typeof scene.groupSourceBoundary !== 'boolean' ||
        scene.lucasLeftGroup !== undefined && typeof scene.lucasLeftGroup !== 'boolean' ||
        scene.groupComplete !== undefined && typeof scene.groupComplete !== 'boolean' ||
        scene.groupCompletedAt !== undefined && !Number.isFinite(scene.groupCompletedAt) ||
        scene.groupMembers !== undefined && (!record(scene.groupMembers) || ['sophie','maya','lucas'].some(actor => typeof (scene.groupMembers as Record<string, unknown>)[actor] !== 'boolean')) ||
        scene.privateHandoff !== undefined && (!record(scene.privateHandoff) || scene.privateHandoff.sceneId !== 'ch01_sc03_just_between_us' || !Number.isFinite(scene.privateHandoff.dueAt) || scene.privateHandoff.deliveredAt !== undefined && !Number.isFinite(scene.privateHandoff.deliveredAt) || scene.privateHandoff.openedAt !== undefined && (!Number.isFinite(scene.privateHandoff.openedAt) || scene.privateHandoff.deliveredAt === undefined) || scene.groupComplete !== true) ||
        scene.groupPresence !== undefined && (!record(scene.groupPresence) || ['sophie','maya','lucas'].some(actor => typeof (scene.groupPresence as Record<string, unknown>)[actor] !== 'boolean')) ||
        scene.groupReceipts !== undefined && (!Array.isArray(scene.groupReceipts) || scene.groupReceipts.some(receipt => !record(receipt) || typeof receipt.eventId !== 'string' || !['player','sophie','maya','lucas'].includes(String(receipt.recipient)) || !Array.isArray(receipt.factIds) || receipt.factIds.some(fact => typeof fact !== 'string')))) throw new Error('Invalid Scene 01 progress')
      if (scene.draft !== undefined) {
        const draft = scene.draft
        if (!record(draft) || typeof draft.nodeId !== 'string' || typeof draft.choiceId !== 'string') throw new Error('Invalid Act I draft')
        const node = scene01Nodes[draft.nodeId]
        if (node?.kind !== 'choice' || !node.choices.some(c => c.id === draft.choiceId)) throw new Error('Invalid Act I draft')
      }
      if (scene.privateScene03 !== undefined) {
        const privateScene = scene.privateScene03
        if (!record(privateScene) || privateScene.version !== 1 || !Number.isFinite(privateScene.startedAt) || typeof privateScene.reading !== 'boolean' || typeof privateScene.complete !== 'boolean' || typeof privateScene.nextEventReady !== 'boolean' || privateScene.completedAt !== undefined && !Number.isFinite(privateScene.completedAt) ||
          !Array.isArray(privateScene.receipts) || privateScene.receipts.some(receipt => !record(receipt) || typeof receipt.eventId !== 'string' || !['player','sophie'].includes(String(receipt.recipient)) || !Array.isArray(receipt.factIds) || receipt.factIds.some(fact => typeof fact !== 'string'))) throw new Error('Invalid Scene 03 progress')
        const paused = privateScene.paused, draft = privateScene.draft
        if (paused !== undefined && (!record(paused) || typeof paused.id !== 'string' || !paused.id.startsWith('OPEN-S03-') || !['npc','wait'].includes(scene01Nodes[paused.id]?.kind) || !Number.isFinite(paused.remainingMs) || Number(paused.remainingMs) < 0 || typeof paused.typing !== 'boolean' || privateScene.reading)) throw new Error('Invalid Scene 03 checkpoint')
        if (draft !== undefined) {
          if (!record(draft) || typeof draft.nodeId !== 'string' || typeof draft.choiceId !== 'string' || !draft.nodeId.startsWith('OPEN-S03-')) throw new Error('Invalid Scene 03 draft')
          const node = scene01Nodes[draft.nodeId]
          if (node?.kind !== 'choice' || !node.choices.some(choice => choice.id === draft.choiceId)) throw new Error('Invalid Scene 03 draft')
        }
      }
    }
    if (prologue.preGroupQuestions !== undefined && (!Array.isArray(prologue.preGroupQuestions) || new Set(prologue.preGroupQuestions).size !== prologue.preGroupQuestions.length || prologue.preGroupQuestions.some(id => !['daniel','number','help','proof'].includes(String(id))))) throw new Error('Invalid pre-group questions')
    if (prologue.flow !== undefined && prologue.flow !== 'mirror-first' || prologue.referenceStarted !== undefined && typeof prologue.referenceStarted !== 'boolean' || prologue.connectionReviewed !== undefined && typeof prologue.connectionReviewed !== 'boolean') throw new Error('Invalid message flow progress')
    if (prologue.disclosureFollowup !== undefined && !['proof','human','closing'].includes(String(prologue.disclosureFollowup))) throw new Error('Invalid disclosure followup')
    if (prologue.recoverySequence !== undefined) {
      const recovery = prologue.recoverySequence
      if (!record(recovery) || !['identity','source','interpretation','keep','reference','connection','done'].includes(String(recovery.beat)) ||
        !Array.isArray(recovery.order) || recovery.order.length !== 4 || new Set(recovery.order).size !== 4 || recovery.order.some(id => !['change','history','question','answer'].includes(String(id))) ||
        !Number.isSafeInteger(recovery.attempts) || Number(recovery.attempts) < 0 || !Number.isSafeInteger(recovery.hints) || Number(recovery.hints) < 0 || Number(recovery.hints) > 3 || typeof recovery.restored !== 'boolean' ||
        recovery.assisted !== undefined && typeof recovery.assisted !== 'boolean' || recovery.feedback !== undefined && typeof recovery.feedback !== 'string' ||
        !Array.isArray(recovery.messages) || recovery.messages.some(line => !record(line) || typeof line.id !== 'string' || !['relay','player'].includes(String(line.sender)) || typeof line.text !== 'string') ||
        !Array.isArray(recovery.queue) || recovery.queue.some(line => !record(line) || typeof line.id !== 'string' || typeof line.text !== 'string' || !Number.isFinite(line.dueAt))) throw new Error('Invalid recovery sequence')
    }
    if (prologue.addressPreference !== undefined && !['mr','ms','name'].includes(String(prologue.addressPreference))) throw new Error('Invalid form of address')
    if (prologue.pendingRecovery !== undefined && !['waiting','pending','accepted','rejected','retry'].includes(String(prologue.pendingRecovery))) throw new Error('Invalid pending recovery state')
    if (prologue.social !== undefined) {
      const social = prologue.social
      const senders = ['sophie','maya','lucas','eli','player','system']
      if (!record(social) || !['invitation','first','conflict','departure','second','done'].includes(String(social.phase)) || social.reactivation !== undefined && !['proposed','deferred','joining','active'].includes(String(social.reactivation)) || social.creator !== undefined && social.creator !== 'sophie' || social.createdAt !== undefined && !Number.isFinite(social.createdAt) || !Array.isArray(social.messages) || social.messages.some(message => !record(message) || typeof message.id !== 'string' || !senders.includes(String(message.sender)) || typeof message.text !== 'string' || message.at !== undefined && !Number.isFinite(message.at)) || !Array.isArray(social.members) || social.members.some(member => !['sophie','maya','lucas','eli','player'].includes(String(member))) || social.delayed !== undefined && typeof social.delayed !== 'boolean' || social.queue !== undefined && (!Array.isArray(social.queue) || social.queue.some(line => !record(line) || typeof line.id !== 'string' || !['sophie','maya','lucas','eli','system'].includes(String(line.sender)) || typeof line.text !== 'string' || typeof line.dueAt !== 'number' || !Number.isFinite(line.dueAt)))) throw new Error('Invalid opening group state')
    }
    if (prologue.beat !== undefined && !['quiet','offer','disclosure','bridge','ready'].includes(String(prologue.beat))) throw new Error('Invalid opening beat')
    if (prologue.disclosure !== undefined && !['counts','uncertain','withhold'].includes(String(prologue.disclosure))) throw new Error('Invalid opening disclosure')
    if (prologue.afterQueue !== undefined && prologue.afterQueue !== 'recovery') throw new Error('Invalid opening destination')
    if (prologue.queue !== undefined && (!Array.isArray(prologue.queue) || prologue.queue.some(line => !record(line) || typeof line.id !== 'string' || typeof line.text !== 'string' || typeof line.dueAt !== 'number' || !Number.isFinite(line.dueAt)))) throw new Error('Invalid opening schedule')
  }
  return input as unknown as GameSave
}
