import { s12CheckReplies, s12QuietReply, s12Replies, s13Followups, s13Opening, s13OptionalIntro, s13Replies, s14Defer, s14Request, s14Share, s15Direct, s15Followups, s15Personal, s15Replies, s16Followups, s16Opening, s16OptionalIntro, s16Replies, s20Question, s24Questions, s25Followups, s25Memory, s25Opening, s25Replies, s26Frames, s26Opening, s27Question, s29Disclosure, s30Disclosure } from '../content/e01Phase03b'
import { mayaMessageAt } from './slice'
import { storyClockByScene, storyMessageAt } from '../content/e01Slice'
import { checkGcroBytes, gcroIssueBytes, gcroIssueDigest, gcroMaster, gcroPages } from '../content/gcroExport'
import type { GameSave } from './types'
import { npcDeliveryDelay } from './npcDelivery'

const prefix = 'EV-E01-P03B:'
const once = (values: string[], id: string) => values.includes(id) ? values : [...values,id]
const pending = (state: GameSave) => state.pendingEvents.some(event => event.id.startsWith(prefix))
const clamp = (value: number) => Math.max(0, Math.min(100, value))

function linesFor(state: GameSave, group: string): readonly string[] {
  if (group === 'S12_CHECK') {
    const selected = state.e01?.s11Primary
    const first = selected === 'P-S11-A' || selected === 'P-S11-B' ? s12CheckReplies[selected] : s12CheckReplies.quiet
    return selected === 'P-S11-C' || !selected ? [first, s12QuietReply] : [first]
  }
  if (group === 'S13_OPEN') return s13Opening
  if (group === 'S13_OPTIONAL') return s13OptionalIntro
  if (group === 'S14_REQUEST') return s14Request
  if (group === 'S15_DIRECT') return s15Direct
  if (group === 'S15_PERSONAL') return s15Personal
  if (group === 'S16_OPEN') return s16Opening
  if (group === 'S16_OPTIONAL') return s16OptionalIntro
  if (group === 'S25_OPEN') return s25Opening
  if (group === 'S25_MEMORY') return s25Memory
  if (group === 'S26_OPEN') return s26Opening
  const reply = [...s12Replies, ...s13Replies, ...s13Followups, ...s14Share, s14Defer, ...s15Replies, ...s15Followups, ...s16Replies, ...s16Followups, ...s20Question, ...s24Questions, ...s25Replies, ...s25Followups, ...s26Frames, ...s27Question, ...s29Disclosure, ...s30Disclosure].find(item => item.id === group)
  return reply?.reply ?? []
}

function schedule(state: GameSave, group: string, now: number, offset = 0): GameSave {
  const lines = linesFor(state, group)
  if (!lines.length) return state
  const earlierMaya = state.prologue?.dialogueVersion === 4 ? state.pendingEvents.filter(event => event.id.startsWith(prefix) && !event.id.includes('GCRO_ISSUE')).reduce((last, event) => Math.max(last, event.dueAt), now) : now
  let dueAt = Math.max(now + offset, earlierMaya)
  const events = lines.map((line, index) => ({ id: `${prefix}${group}:${index}`, dueAt: dueAt += state.prologue?.dialogueVersion === 4 ? npcDeliveryDelay('maya', line, index) : index === 0 ? 320 : 260 }))
  if (events.some(event => state.deliveredEvents.includes(event.id) || state.pendingEvents.some(item => item.id === event.id))) return state
  return { ...state, pendingEvents: [...state.pendingEvents, ...events] }
}

export function deliverPhase03bEvent(state: GameSave, now: number): GameSave {
  const event = state.pendingEvents.filter(item => item.id.startsWith(prefix) && item.dueAt <= now).sort((a,b) => a.dueAt - b.dueAt)[0]
  if (!event) return state
  if (event.id.startsWith(`${prefix}GCRO_ISSUE:`)) {
    const pendingEvents = state.pendingEvents.filter(item => item.id !== event.id)
    const attempt = Number(event.id.slice(`${prefix}GCRO_ISSUE:`.length))
    if (state.deliveredEvents.includes(event.id) || state.e01?.s27Status !== 'reviewing' || !state.e01.s27Session || state.e01.s27Attempt !== attempt) return { ...state, pendingEvents }
    const response = state.e01.s27OfficeResponse ?? 'issue'
    if (response !== 'issue') return { ...state, pendingEvents, deliveredEvents: once(state.deliveredEvents,event.id), e01: { ...state.e01, s27Status: response === 'delay' ? 'delayed' : response === 'refuse' ? 'refused' : 'unavailable' }, notifications: [...state.notifications,{ id: event.id, text: 'GCRO request status updated', read: false }] }
    const issue = { issuer: 'GCRO duty records officer', certificate: 'GCRO-REG-01/GH-CR-01-v1', recipient: state.e01.s27Session, digest: gcroIssueDigest, byteLength: gcroIssueBytes, issuedAt: Date.UTC(2026,9,8,15,42), tokenSpent: true }
    return { ...state, pendingEvents, deliveredEvents: once(state.deliveredEvents,event.id), e01: { ...state.e01, s27Status: 'issued', s27OfficeResponse: undefined, s28Issue: issue, s28Payload: gcroMaster, s28CorrectionRequested: false, s28Checks: [], s28OpenedPages: [], s28DirectorySeen: false, s28OfficeAvailability: 'available', sceneId: 'E01-S28' }, notifications: [...state.notifications,{ id: event.id, text: 'GCRO request status updated', read: false }] }
  }
  const nextPending = state.pendingEvents.filter(item => item.id !== event.id)
  if (state.deliveredEvents.includes(event.id)) return { ...state, pendingEvents: nextPending }
  const [group, indexText] = event.id.slice(prefix.length).split(':')
  const index = Number(indexText), text = linesFor(state, group)[index]
  if (!text) return { ...state, pendingEvents: nextPending }
  const groupScene = group.match(/^(?:P-)?S(\d{2})/)?.[1] ?? (group.startsWith('C02-') ? '14' : group.startsWith('C03-') ? '26' : '15')
  const [hour, minute] = storyClockByScene[`E01-S${groupScene}`].split(':').map(Number)
  const authoredAt = Date.UTC(2026, 9, 8, hour, minute, Math.min(index * 3, 59))
  const triggeringMessage = state.messages.find(message => message.id === `player.${group}`)
  const channel = triggeringMessage ? triggeringMessage.channel ?? 'bulletin' : state.deliveredEvents.includes('CONN-E01-01') && (group.startsWith('S25') || group.startsWith('S26') || group.startsWith('P-S20') || group.startsWith('P-S24') || group.startsWith('P-S27') || group.startsWith('P-S29') || group.startsWith('P-S30')) ? 'messages' : 'bulletin'
  return { ...state, pendingEvents: nextPending, deliveredEvents: once(state.deliveredEvents,event.id), messages: [...state.messages, { id: event.id, sender: 'maya', channel, text, at: mayaMessageAt(state, authoredAt), delivery: 'delivered' }] }
}

export function showEditorHint(state: GameSave): GameSave {
  if (state.e01?.sceneId !== 'E01-S12' || state.e01.editorChecked) return state
  return { ...state, e01: { ...state.e01, editorHintCount: Math.min(3,(state.e01.editorHintCount ?? 0)+1) } }
}

export function onEditorChecked(state: GameSave, now: number): GameSave {
  if (state.e01?.sceneId !== 'E01-S12' || !state.e01.editorChecked || state.deliveredEvents.includes(`${prefix}S12_CHECK:0`) || state.pendingEvents.some(event => event.id === `${prefix}S12_CHECK:0`)) return state
  return schedule(state,'S12_CHECK',now)
}

export function enterAfterEditor(state: GameSave, now: number): GameSave {
  if (state.e01?.sceneId !== 'E01-S12' || !state.e01.editorChecked || pending(state)) return state
  const next: GameSave = { ...state, e01: { ...state.e01, sceneId: 'E01-S13', draftChoice: undefined } }
  const quiet = !state.e01.s11Primary || state.e01.s11Primary === 'P-S11-C' || state.e01.s12Choice === 'P-S12-C'
  return quiet ? next : schedule(next,'S13_OPEN',now)
}

export function askMayaAboutRow(state: GameSave, now: number): GameSave {
  if (state.e01?.sceneId !== 'E01-S13' || state.e01.s13Asked || state.pendingEvents.some(event => event.id.startsWith(`${prefix}S13_OPEN:`))) return state
  return schedule({ ...state, e01: { ...state.e01, s13Asked: true } },'S13_OPEN',now)
}

export function continueToShare(state: GameSave, now: number): GameSave {
  if (state.e01?.sceneId !== 'E01-S13' || pending(state)) return state
  const next: GameSave = { ...state, e01: { ...state.e01, sceneId: 'E01-S14', draftChoice: undefined } }
  return ['P-S13-A','P-S13-B'].includes(state.e01.s13Primary ?? '') ? schedule(next,'S14_REQUEST',now) : next
}

export function draftPhase03b(state: GameSave, id?: string): GameSave {
  const slice = state.e01
  if (!slice || !['E01-S12','E01-S13','E01-S14','E01-S15','E01-S16','E01-S20','E01-S24','E01-S25','E01-S26','E01-S27','E01-S30'].includes(slice.sceneId)) return state
  let allowed: string[] = []
  if (slice.sceneId === 'E01-S12' && slice.editorChecked && !slice.s12Choice) allowed = s12Replies.map(item => item.id)
  if (slice.sceneId === 'E01-S13' && (slice.s13Asked || state.deliveredEvents.includes(`${prefix}S13_OPEN:0`))) allowed = !slice.s13Primary ? s13Replies.map(item => item.id) : ['P-S13-A','P-S13-B'].includes(slice.s13Primary) && !slice.s13Followup ? s13Followups.map(item => item.id) : []
  if (slice.sceneId === 'E01-S14' && !slice.s14Share) allowed = [...s14Share.map(item => item.id), 'C02-SHARE.C', s14Defer.id]
  if (slice.sceneId === 'E01-S15' && slice.s14Share !== 'none') allowed = !slice.s15Primary ? s15Replies.map(item => item.id) : ['image','text'].includes(slice.s14Share ?? '') && !slice.s15Followup ? s15Followups.map(item => item.id) : []
  if (slice.sceneId === 'E01-S16') allowed = !slice.s16Primary ? s16Replies.map(item => item.id) : ['P-S16-A','P-S16-B'].includes(slice.s16Primary) && !slice.s16Followup ? s16Followups.map(item => item.id) : []
  if (slice.sceneId === 'E01-S20' && state.deliveredEvents.includes('R01') && slice.editorChecked && !slice.s20Share) allowed = s20Question.map(item => item.id)
  if (slice.sceneId === 'E01-S24' && slice.s24NoteViewed && state.deliveredEvents.includes('R03') && !slice.s24Share) allowed = s24Questions.map(item => item.id)
  if (slice.sceneId === 'E01-S25') allowed = !slice.s25Primary ? s25Replies.map(item => item.id) : slice.s25Primary === 'P-S25-A' ? !slice.s25Followup ? s25Followups.filter(item => ['P-S25-D','P-S25-E','P-S25-F'].includes(item.id)).map(item => item.id) : [] : slice.s25Primary === 'P-S25-B' && !slice.s25Followup ? s25Followups.filter(item => ['P-S25-G','P-S25-H'].includes(item.id)).map(item => item.id) : []
  if (slice.sceneId === 'E01-S26' && !slice.s26Frame) allowed = s26Frames.map(item => item.id)
  if (slice.sceneId === 'E01-S27' && state.deliveredEvents.includes('R01') && slice.editorChecked && !slice.s27Share) allowed = s27Question.map(item => item.id)
  if (slice.sceneId === 'E01-S30' && !slice.e01Complete) allowed = [...(!slice.s29Share ? s29Disclosure.map(item => item.id) : []), ...(slice.s30RoleChecked && !slice.s30Share ? s30Disclosure.filter(item => slice.s30Hook === 'valid' ? item.id !== 'P-S30-C' : item.id === 'P-S30-C').map(item => item.id) : [])]
  if (id !== undefined && !allowed.includes(id)) return state
  return { ...state, e01: { ...slice, draftChoice: id } }
}

export function sendPhase03b(state: GameSave, now: number): GameSave {
  const slice = state.e01, id = slice?.draftChoice
  if (!slice || !id || pending(state) || !['E01-S12','E01-S13','E01-S14','E01-S15','E01-S16','E01-S20','E01-S24','E01-S25','E01-S26','E01-S27','E01-S30'].includes(slice.sceneId)) return state
  if (slice.sceneId === 'E01-S12' && (!slice.editorChecked || slice.s12Choice || !s12Replies.some(item => item.id === id))) return state
  if (slice.sceneId === 'E01-S13' && (!slice.s13Asked && !state.deliveredEvents.includes(`${prefix}S13_OPEN:0`) || slice.s13Primary && (slice.s13Followup || !s13Followups.some(item => item.id === id)) || !slice.s13Primary && !s13Replies.some(item => item.id === id))) return state
  if (slice.sceneId === 'E01-S14' && (slice.s14Share || ![...s14Share.map(item => item.id),s14Defer.id].some(allowed => allowed === id))) return state
  if (slice.sceneId === 'E01-S15' && (slice.s14Share === 'none' || slice.s15Primary && (slice.s15Followup || !['image','text'].includes(slice.s14Share ?? '') || !s15Followups.some(item => item.id === id)) || !slice.s15Primary && !s15Replies.some(item => item.id === id))) return state
  if (slice.sceneId === 'E01-S16' && (slice.s16Primary && (slice.s16Followup || !s16Followups.some(item => item.id === id)) || !slice.s16Primary && !s16Replies.some(item => item.id === id))) return state
  if (slice.sceneId === 'E01-S24' && (!slice.s24NoteViewed || !state.deliveredEvents.includes('R03') || !!slice.s24Share || !s24Questions.some(item => item.id === id))) return state
  if (slice.sceneId === 'E01-S20' && (!state.deliveredEvents.includes('R01') || !slice.editorChecked || !!slice.s20Share || !s20Question.some(item => item.id === id))) return state
  if (slice.sceneId === 'E01-S25' && (slice.s25Primary ? slice.s25Followup || !s25Followups.some(item => item.id === id) || (slice.s25Primary === 'P-S25-A' && !['P-S25-D','P-S25-E','P-S25-F'].includes(id)) || (slice.s25Primary === 'P-S25-B' && !['P-S25-G','P-S25-H'].includes(id)) || slice.s25Primary === 'P-S25-C' : !s25Replies.some(item => item.id === id))) return state
  if (slice.sceneId === 'E01-S26' && (slice.s26Frame || !s26Frames.some(item => item.id === id))) return state
  if (slice.sceneId === 'E01-S27' && (!state.deliveredEvents.includes('R01') || !slice.editorChecked || !!slice.s27Share || !s27Question.some(item => item.id === id))) return state
  if (slice.sceneId === 'E01-S30' && (slice.e01Complete || !state.deliveredEvents.includes('R01') || !slice.editorChecked || !state.knowledge.player.includes('K02') || (id.startsWith('P-S29-') ? !!slice.s29Share || !s29Disclosure.some(item => item.id === id) : !slice.s30RoleChecked || !!slice.s30Share || !s30Disclosure.some(item => item.id === id && (slice.s30Hook === 'valid' ? item.id !== 'P-S30-C' : item.id === 'P-S30-C'))))) return state
  const item = [...s12Replies,...s13Replies,...s13Followups,...s14Share,s14Defer,...s15Replies,...s15Followups,...s16Replies,...s16Followups,...s20Question,...s24Questions,...s25Replies,...s25Followups,...s26Frames,...s27Question,...s29Disclosure,...s30Disclosure].find(option => option.id === id)
  if (!item) return state
  const factIds = id.startsWith('C02-') ? ['R02.public-escort-row'] : id === 'P-S13-A' || id === 'P-S13-B' ? ['S13.public-source-location'] : id === 'P-S24-A' ? ['N01.literal-7-14'] : id.startsWith('P-S29-') || id === 'P-S30-B' ? ['K02.public-finding'] : id === 'P-S30-A' ? ['S30.role-class-capability'] : id === 'P-S30-C' ? ['S30.process-open-role-unknown'] : []
  const isShare = id.startsWith('C02-')
  const minute = slice.sceneId === 'E01-S12' ? 29 : slice.sceneId === 'E01-S13' ? 33 : slice.sceneId === 'E01-S14' ? 38 : slice.sceneId === 'E01-S20' ? 88 : slice.sceneId === 'E01-S24' ? 181 : slice.sceneId === 'E01-S25' ? 241 : slice.sceneId === 'E01-S26' ? 246 : slice.sceneId === 'E01-S27' ? 366 : slice.sceneId === 'E01-S30' ? 526 : 44
  const channel = state.deliveredEvents.includes('CONN-E01-01') && ['E01-S20','E01-S24','E01-S25','E01-S26','E01-S27','E01-S30'].includes(slice.sceneId) ? 'messages' as const : 'bulletin' as const
  const message = { id: `player.${id}`, sender: 'player' as const, recipient: 'maya' as const, channel, text: item.text, at: mayaMessageAt(state, storyMessageAt(minute)), delivery: 'delivered' as const, ...(factIds.length ? { disclosedFactIds: factIds } : {}), ...(id === 'C02-SHARE.A' ? { attachmentIds: ['E001.cropped-public-escort-row'] } : {}) }
  const choiceKey = slice.sceneId === 'E01-S12' ? 'S12.optional' : slice.sceneId === 'E01-S13' && slice.s13Primary ? 'S13.followup' : slice.sceneId === 'E01-S13' ? 'S13.primary' : slice.sceneId === 'E01-S15' && slice.s15Primary ? 'S15.followup' : slice.sceneId === 'E01-S15' ? 'S15.primary' : slice.sceneId === 'E01-S16' && slice.s16Primary ? 'S16.followup' : slice.sceneId === 'E01-S16' ? 'S16.primary' : slice.sceneId === 'E01-S20' ? 'S20.optional' : slice.sceneId === 'E01-S24' ? 'S24.optional' : slice.sceneId === 'E01-S25' && slice.s25Primary ? 'S25.followup' : slice.sceneId === 'E01-S25' ? 'S25.primary' : slice.sceneId === 'E01-S26' ? 'C03-FRAME' : slice.sceneId === 'E01-S27' ? 'S27.optional' : slice.sceneId === 'E01-S30' ? id.startsWith('P-S29') ? 'S29.disclosure' : 'S30.disclosure' : 'C02-SHARE'
  const choiceUpdate = slice.sceneId === 'E01-S12' ? { s12Choice: id } : slice.sceneId === 'E01-S13' && !slice.s13Primary ? { s13Primary: id } : slice.sceneId === 'E01-S13' ? { s13Followup: id } : slice.sceneId === 'E01-S15' && !slice.s15Primary ? { s15Primary: id } : slice.sceneId === 'E01-S15' ? { s15Followup: id } : slice.sceneId === 'E01-S16' && !slice.s16Primary ? { s16Primary: id } : slice.sceneId === 'E01-S16' ? { s16Followup: id } : slice.sceneId === 'E01-S20' ? { s20Share: id } : slice.sceneId === 'E01-S24' ? { s24Share: id } : slice.sceneId === 'E01-S25' && !slice.s25Primary ? { s25Primary: id } : slice.sceneId === 'E01-S25' ? { s25Followup: id } : slice.sceneId === 'E01-S26' ? { s26Frame: id } : slice.sceneId === 'E01-S27' ? { s27Share: id } : slice.sceneId === 'E01-S30' ? id.startsWith('P-S29') ? { s29Share: id } : { s30Share: id } : { s14Share: isShare ? id === 'C02-SHARE.A' ? 'image' as const : 'text' as const : 'defer' as const }
  let next: GameSave = { ...state, messages: [...state.messages,message], choices: { ...state.choices, [choiceKey]: id }, e01: { ...slice, draftChoice: undefined, ...choiceUpdate } }
  if (id === 'P-S12-C' || id === s14Defer.id || isShare) {
    const delta = id === 'P-S12-C' || id === s14Defer.id ? -1 : id === 'C02-SHARE.A' ? 2 : 1
    next = { ...next, relationships: { ...next.relationships, maya: { ...next.relationships.maya, trust: clamp(next.relationships.maya.trust + delta), suspicion: clamp(next.relationships.maya.suspicion + (delta < 0 ? 1 : 0)) } } }
  }
  if (isShare) next = { ...next, deliveredEvents: once(next.deliveredEvents,'R02'), knowledge: { ...next.knowledge, characters: { ...next.knowledge.characters, maya: once(next.knowledge.characters.maya,'R02.public-escort-row') } } }
  if (factIds.includes('S13.public-source-location')) next = { ...next, knowledge: { ...next.knowledge, characters: { ...next.knowledge.characters, maya: once(next.knowledge.characters.maya,'S13.public-source-location') } } }
  for (const factId of factIds.filter(fact => fact.startsWith('K02.') || fact.startsWith('S30.') || fact.startsWith('N01.'))) next = { ...next, knowledge: { ...next.knowledge, characters: { ...next.knowledge.characters, maya: once(next.knowledge.characters.maya,factId) } } }
  if (id === 'P-S16-F') next = { ...next, relationships: { ...next.relationships, maya: { ...next.relationships.maya, trust: clamp(next.relationships.maya.trust+1) } } }
  const changes: Record<string,[number,number,number]> = { 'P-S15-C': [-1,-1,0], 'P-S15-F': [1,0,0], 'P-S25-A': [0,2,0], 'P-S25-B': [1,0,0], 'C03-FRAME.A': [2,0,-1], 'C03-FRAME.B': [-3,0,4], 'C03-FRAME.C': [1,0,0] }
  if (changes[id]) { const [trust,affinity,suspicion] = changes[id]; const maya = next.relationships.maya; next = { ...next, relationships: { ...next.relationships, maya: { ...maya, trust: clamp(maya.trust+trust), affinity: clamp(maya.affinity+affinity), suspicion: clamp(maya.suspicion+suspicion) } } } }
  next = schedule(next,id,now)
  if (id === 'P-S13-A' || id === 'P-S13-B') next = schedule(next,'S13_OPTIONAL',now,item.reply.length*260 + 250)
  if (id === 'P-S16-A' || id === 'P-S16-B') next = schedule(next,'S16_OPTIONAL',now,item.reply.length*260 + 250)
  if (slice.sceneId === 'E01-S15' && !slice.s15Primary && ['image','text'].includes(slice.s14Share ?? '')) next = schedule(next,'S15_PERSONAL',now,item.reply.length*260 + 250)
  if (id === 'P-S25-A') next = schedule(next,'S25_MEMORY',now,item.reply.length*260 + 250)
  return next
}

export function closeShareWithoutSend(state: GameSave): GameSave {
  if (state.e01?.sceneId !== 'E01-S14' || state.e01.s14Share || pending(state)) return state
  return { ...state, choices: { ...state.choices, 'C02-SHARE': 'C02-SHARE.C' }, e01: { ...state.e01, s14Share: 'none', draftChoice: undefined } }
}

export function continueToEditorNote(state: GameSave, now: number): GameSave {
  if (state.e01?.sceneId !== 'E01-S14' || pending(state)) return state
  const next: GameSave = { ...state, e01: { ...state.e01, sceneId: 'E01-S15', draftChoice: undefined, s14Share: state.e01.s14Share ?? 'none' } }
  return next.e01?.s14Share && next.e01.s14Share !== 'none' ? schedule(next,'S15_DIRECT',now) : next
}

export function openOptionalConnections(state: GameSave, now: number): GameSave {
  if (state.e01?.sceneId !== 'E01-S15' || !state.e01.s14Share || state.e01.s14Share === 'none' || pending(state)) return state
  const next: GameSave = { ...state, e01: { ...state.e01, sceneId: 'E01-S16', s15NoteSeen: true, s16OfferSeen: true }, deliveredEvents: once(state.deliveredEvents,'EV-E01-S15-EDITOR-NOTE') }
  return schedule(next,'S16_OPEN',now)
}

export function continueToPermissionSheet(state: GameSave): GameSave {
  if (state.e01?.sceneId !== 'E01-S16' || pending(state)) return state
  return { ...state, e01: { ...state.e01, sceneId: 'E01-S17', draftChoice: undefined } }
}

export function decideConnection(state: GameSave, kind: 'messages' | 'archive', accept: boolean): GameSave {
  if (state.e01?.sceneId !== 'E01-S17' || !state.e01.s16OfferSeen) return state
  if (kind === 'messages') {
    if (state.e01.messagesConsent === true) return state
    return { ...state, e01: { ...state.e01, messagesConsent: accept }, deliveredEvents: accept ? once(state.deliveredEvents,'CONN-E01-01') : state.deliveredEvents }
  }
  if (state.e01.archiveConsent === true) return state
  return { ...state, e01: { ...state.e01, archiveConsent: accept }, deliveredEvents: accept ? once(state.deliveredEvents,'R03') : state.deliveredEvents, knowledge: accept ? { ...state.knowledge, player: once(state.knowledge.player,'archive.invitation.accepted') } : state.knowledge }
}

export function enterPublicSources(state: GameSave): GameSave {
  const slice = state.e01
  if (!slice || !['E01-S15','E01-S16','E01-S17'].includes(slice.sceneId) || pending(state)) return state
  return { ...state, e01: { ...slice, sceneId: 'E01-S18', s15NoteSeen: true, s18Route: state.deliveredEvents.includes('R03') ? 'archive' : 'public', draftChoice: undefined }, deliveredEvents: once(state.deliveredEvents,'EV-E01-S15-EDITOR-NOTE') }
}

export function reopenConnections(state: GameSave): GameSave {
  if (state.e01?.sceneId !== 'E01-S18' || !state.e01.s16OfferSeen) return state
  return { ...state, e01: { ...state.e01, sceneId: 'E01-S17' } }
}

export function inspectSourceStatus(state: GameSave, source: 'preview' | 'current' | 'notice'): GameSave {
  if (state.e01?.sceneId !== 'E01-S18') return state
  return { ...state, e01: { ...state.e01, s18Inspected: source } }
}

export function showSourceStatusHint(state: GameSave): GameSave {
  if (state.e01?.sceneId !== 'E01-S18') return state
  return { ...state, e01: { ...state.e01, s18HintCount: Math.min(3,(state.e01.s18HintCount ?? 0)+1) } }
}

export function answerSourceStatus(state: GameSave, answer: string): GameSave {
  if (state.e01?.sceneId !== 'E01-S18' || !state.e01.s18Inspected || answer !== 'preview') return state
  return { ...state, e01: { ...state.e01, sceneId: 'E01-S19' }, deliveredEvents: once(state.deliveredEvents,'EV-E01-S18-SOURCE-STATUS') }
}

export function continuePublicWithoutTip(state: GameSave): GameSave {
  if (!state.e01 || !['E01-S08','E01-S09'].includes(state.e01.sceneId) || !state.knowledge.player.includes('K01') || state.deliveredEvents.includes('R01')) return state
  return { ...state, e01: { ...state.e01, sceneId: 'E01-S18', tipMode: undefined, handle: '', s18Route: 'public', draftChoice: undefined }, deliveredEvents: once(state.deliveredEvents,'EV-E01-S08-TIP-DEFERRED') }
}

export function openLateTip(state: GameSave): GameSave {
  if (state.e01?.sceneId !== 'E01-S30' || !state.knowledge.player.includes('K02') || state.deliveredEvents.includes('R01')) return state
  return { ...state, e01: { ...state.e01, sceneId: 'E01-S08', tipMode: undefined, handle: '', draftChoice: undefined } }
}

export function returnToFinding(state: GameSave): GameSave {
  if (state.e01?.sceneId !== 'E01-S12' || !state.e01.editorChecked || !state.deliveredEvents.includes('R01') || !state.deliveredEvents.includes('R04') || !state.knowledge.player.includes('K02') || pending(state)) return state
  return { ...state, e01: { ...state.e01, sceneId: 'E01-S30', draftChoice: undefined } }
}

const scene = (state: GameSave, id: number): GameSave => ({ ...state, e01: { ...state.e01!, sceneId: `E01-S${id}` as const } })
const mark = (state: GameSave, id: string): GameSave => ({ ...state, deliveredEvents: once(state.deliveredEvents, id) })

export function recordS19Observation(state: GameSave, answer: string): GameSave {
  if (state.e01?.sceneId !== 'E01-S19' || !['reported','full','publication'].includes(answer)) return state
  return { ...state, e01: { ...state.e01, s19Observation: true }, choices: { ...state.choices, 'S19.observation': answer } }
}

const dateLabels = ['event','stamp','transfer','publication']
export function labelS19Date(state: GameSave, index: number, label: string): GameSave {
  if (state.e01?.sceneId !== 'E01-S19' || !state.e01.s19Observation || index < 0 || index > 3 || !dateLabels.includes(label)) return state
  const dates = [...(state.e01.s19Dates ?? ['', '', '', ''])]
  dates[index] = label
  return { ...state, e01: { ...state.e01, s19Dates: dates } }
}

export function finishS19(state: GameSave): GameSave {
  if (state.e01?.sceneId !== 'E01-S19' || state.e01.s19Dates?.join('|') !== dateLabels.join('|')) return state
  return mark(scene(state,20),'EV-E01-S19-DATES')
}

export function inspectS20Notice(state: GameSave): GameSave {
  if (state.e01?.sceneId !== 'E01-S20') return state
  return { ...state, e01: { ...state.e01, s20NoticeSeen: true } }
}

export function answerS20Approval(state: GameSave, answer: string): GameSave {
  if (state.e01?.sceneId !== 'E01-S20' || !state.e01.s20NoticeSeen || answer !== 'approval') return state
  return mark({ ...state, e01: { ...state.e01, sceneId: 'E01-S21', s20ApprovalChecked: true } },'EV-E01-S20-NOTICE')
}

const correctOrder = ['event','verification','approval']
export function placeS21Card(state: GameSave, card: string): GameSave {
  if (state.e01?.sceneId !== 'E01-S21' || !correctOrder.includes(card)) return state
  const order = state.e01.s21Order ?? []
  return { ...state, e01: { ...state.e01, s21Order: order.includes(card) ? order : [...order,card] } }
}

export function resetS21Order(state: GameSave): GameSave {
  if (state.e01?.sceneId !== 'E01-S21') return state
  return { ...state, e01: { ...state.e01, s21Order: [] } }
}

export function classifyS21(state: GameSave, answer: string): GameSave {
  if (state.e01?.sceneId !== 'E01-S21' || state.e01.s21Order?.join('|') !== correctOrder.join('|') || answer !== 'archive-needed') return state
  return mark({ ...state, e01: { ...state.e01, sceneId: 'E01-S22', s21Classified: true } },'EV-E01-S21-TENTATIVE-ORDER')
}

export function answerS22(state: GameSave, kind: 'alternative' | 'test', answer: string): GameSave {
  if (state.e01?.sceneId !== 'E01-S22') return state
  if (kind === 'alternative') return { ...state, e01: { ...state.e01, s22Alternative: true }, choices: { ...state.choices, 'S22.alternative': answer } }
  if (!state.e01.s22Alternative || answer !== 'lineage') return state
  return mark({ ...state, e01: { ...state.e01, sceneId: 'E01-S23', s22Test: true } },'EV-E01-S22-ALTERNATIVE')
}

export function setS23Query(state: GameSave, query: string): GameSave {
  if (state.e01?.sceneId !== 'E01-S23') return state
  return { ...state, e01: { ...state.e01, s23Query: query.slice(0,80) } }
}

export function openS23Result(state: GameSave, id: string): GameSave {
  if (state.e01?.sceneId !== 'E01-S23' || !['SR-01','SR-02','SR-03','SR-04'].includes(id)) return state
  return { ...state, e01: { ...state.e01, s23Opened: once(state.e01.s23Opened ?? [],id) } }
}

export function matchS23Source(state: GameSave, id: string): GameSave {
  if (state.e01?.sceneId !== 'E01-S23' || !state.e01.s23Opened?.includes(id) || !['SR-02','SR-04','SR-01'].includes(id)) return state
  const expected = ['SR-02','SR-04','SR-01'], matches = state.e01.s23Matches ?? []
  if (id !== expected[matches.length]) return state
  return { ...state, e01: { ...state.e01, s23Matches: [...matches,id] } }
}

export function finishS23(state: GameSave): GameSave {
  if (state.e01?.sceneId !== 'E01-S23' || state.e01.s23Matches?.join('|') !== 'SR-02|SR-04|SR-01') return state
  return mark(scene(state,24),'EV-E01-S23-SOURCE-MAP')
}

export function finishS24(state: GameSave, viewed: boolean): GameSave {
  if (state.e01?.sceneId !== 'E01-S24' || pending(state)) return state
  const noteViewed = viewed && state.e01.s24NoteViewed && state.deliveredEvents.includes('R03')
  const next = { ...state, e01: { ...state.e01, s24NoteViewed: noteViewed, s24Skipped: !noteViewed } }
  return mark(scene(next,27),'EV-E01-S24-NOTE')
}

export function viewS24Note(state: GameSave): GameSave {
  if (state.e01?.sceneId !== 'E01-S24' || !state.deliveredEvents.includes('R03')) return state
  return { ...state, e01: { ...state.e01, s24NoteViewed: true } }
}

export function openS25Checkin(state: GameSave, now: number): GameSave {
  if (state.e01?.sceneId !== 'E01-S27' || state.e01.s27Status || state.e01.s25Opened || !state.e01.s13Primary || !['image','text','defer'].includes(state.e01.s14Share ?? '')) return state
  return schedule({ ...state, e01: { ...state.e01, sceneId: 'E01-S25', s25Opened: true } },'S25_OPEN',now)
}

export function openS26Frame(state: GameSave, now: number): GameSave {
  if (state.e01?.sceneId !== 'E01-S25' || pending(state)) return state
  return schedule(scene(state,26),'S26_OPEN',now)
}

export function returnToS27(state: GameSave): GameSave {
  if (!state.e01 || !['E01-S25','E01-S26'].includes(state.e01.sceneId) || pending(state)) return state
  return scene(state,27)
}

export function keepS26Private(state: GameSave): GameSave {
  if (state.e01?.sceneId !== 'E01-S26' || state.e01.s26Frame || pending(state)) return state
  return scene({ ...state, e01: { ...state.e01, s26Frame: 'private' } },27)
}

export function selectS27Scope(state: GameSave, scope: 'redacted' | 'residents' | 'logs'): GameSave {
  if (state.e01?.sceneId !== 'E01-S27' || state.e01.s27Status === 'issued') return state
  return { ...state, e01: { ...state.e01, s27Scope: scope, s27Status: state.e01.s27Status === 'refused' ? undefined : state.e01.s27Status } }
}

export function submitS27Request(state: GameSave, now: number): GameSave {
  if (state.e01?.sceneId !== 'E01-S27' || ['reviewing','issued','delayed','unavailable'].includes(state.e01.s27Status ?? '') || !state.e01.s27Scope) return state
  if (state.e01.s27Scope !== 'redacted') return { ...state, e01: { ...state.e01, s27Status: 'refused' } }
  const attempt = (state.e01.s27Attempt ?? 0)+1
  const session = crypto.randomUUID()
  return { ...state, e01: { ...state.e01, s27Session: session, s27Attempt: attempt, s27Status: 'reviewing', s27ReviewRecorded: false }, deliveredEvents: once(state.deliveredEvents,`EV-E01-S27-REQUEST:${attempt}`), pendingEvents: [...state.pendingEvents,{ id: `${prefix}GCRO_ISSUE:${attempt}`, dueAt: now+1200 }] }
}

export function recordS27Review(state: GameSave): GameSave {
  if (state.e01?.sceneId !== 'E01-S27' || !['refused','delayed','unavailable'].includes(state.e01.s27Status ?? '') || state.e01.s27ReviewRecorded) return state
  return { ...state, e01: { ...state.e01, s27ReviewRecorded: true, s27Status: 'delayed' }, deliveredEvents: once(state.deliveredEvents,`EV-E01-S27-REVIEW-REQUEST:${state.e01.s27Attempt ?? 0}`) }
}

export function requestS28Correction(state: GameSave): GameSave {
  if (state.e01?.sceneId !== 'E01-S28' || state.e01.s27Status !== 'issued' || state.deliveredEvents.includes('R04') || state.e01.s28CorrectionRequested) return state
  const attempt = (state.e01.s27Attempt ?? 0)+1
  return { ...state, e01: { ...state.e01, sceneId: 'E01-S27', s27Status: 'delayed', s27Attempt: attempt, s27Session: crypto.randomUUID(), s27ReviewRecorded: false, s27OfficeResponse: undefined, s28CorrectionRequested: true, s28Checks: [] }, deliveredEvents: once(state.deliveredEvents,`EV-E01-S28-CORRECTION-REQUEST:${attempt}`) }
}

export function openS28Page(state: GameSave, page: number): GameSave {
  if (state.e01?.sceneId !== 'E01-S28' || state.e01.s27Status !== 'issued' || page < 1 || page > 4) return state
  return { ...state, e01: { ...state.e01, s28OpenedPages: [...new Set([...(state.e01.s28OpenedPages ?? []),page])] } }
}

export function openS28Directory(state: GameSave): GameSave {
  if (state.e01?.sceneId !== 'E01-S28' || state.e01.s27Status !== 'issued') return state
  return { ...state, e01: { ...state.e01, s28DirectorySeen: true } }
}

export type GcroAssessment = 'valid' | 'not-issued' | 'missing' | 'incomplete' | 'wrong-issuer' | 'wrong-recipient' | 'integrity-mismatch'

export async function assessGcroIssue(state: GameSave): Promise<GcroAssessment> {
  const slice = state.e01, issue = slice?.s28Issue, payload = slice?.s28Payload
  if (!slice || slice.s27Status !== 'issued') return 'not-issued'
  if (!issue) return 'not-issued'
  if (typeof payload !== 'string' || !payload.length) return 'missing'
  if (issue.issuer !== 'GCRO duty records officer' || issue.certificate !== 'GCRO-REG-01/GH-CR-01-v1') return 'wrong-issuer'
  if (issue.recipient !== slice.s27Session || !issue.tokenSpent) return 'wrong-recipient'
  const pages = gcroPages(payload)
  if (pages.length !== 4 || pages.some((page,index) => !page.startsWith(`PAGE ${index+1} OF 4`)) || !payload.includes('REDACTION AND RELEASE STATEMENT / RED-041') || !payload.includes('Resident names, contacts, care details and private destinations: REDACTED') || !['SNAP-20191124-1520','COR-20191125-B4','GH-NQ-BUS4-2019-11-23/v2'].every(id => payload.includes(id))) return 'incomplete'
  if (!await checkGcroBytes(new TextEncoder().encode(payload),issue.digest,issue.byteLength)) return 'integrity-mismatch'
  return 'valid'
}

export async function checkS28(state: GameSave, kind: 'office' | 'lineage' | 'pages' | 'transfer', choice: string): Promise<GameSave> {
  const slice = state.e01, issue = slice?.s28Issue, payload = slice?.s28Payload
  if (slice?.sceneId !== 'E01-S28' || !issue || slice.s27Status !== 'issued') return state
  const valid = kind === 'office' ? choice === 'GCRO' && slice.s28DirectorySeen && slice.s28OpenedPages?.includes(1) && issue.issuer === 'GCRO duty records officer' && issue.certificate === 'GCRO-REG-01/GH-CR-01-v1'
    : kind === 'lineage' ? choice === 'full-chain' && slice.s28OpenedPages?.includes(3) && state.deliveredEvents.includes('EV-E01-S20-NOTICE') && !!payload && payload.includes('SNAP-20191124-1520') && payload.includes('COR-20191125-B4') && payload.includes('GH-NQ-BUS4-2019-11-23/v2')
    : kind === 'pages' ? choice === 'four-redacted' && [1,2,3,4].every(page => slice.s28OpenedPages?.includes(page)) && !!payload && gcroPages(payload).length === 4 && gcroPages(payload).every((page,index) => page.startsWith(`PAGE ${index+1} OF 4`)) && payload.includes('REDACTION AND RELEASE STATEMENT / RED-041') && payload.includes('Resident names, contacts, care details and private destinations: REDACTED')
    : choice === 'own-session' && slice.s28OpenedPages?.includes(4) && !!payload && issue.recipient === slice.s27Session && issue.tokenSpent && await checkGcroBytes(new TextEncoder().encode(payload),issue.digest,issue.byteLength)
  if (!valid) return state
  return { ...state, e01: { ...slice, s28Checks: once(slice.s28Checks ?? [],kind) } }
}

export async function finishS28(state: GameSave): Promise<GameSave> {
  if (state.e01?.sceneId !== 'E01-S28' || state.deliveredEvents.includes('R04') || !state.e01.s28DirectorySeen || !state.deliveredEvents.includes('EV-E01-S20-NOTICE') || [1,2,3,4].some(page => !state.e01!.s28OpenedPages?.includes(page)) || ['office','lineage','pages','transfer'].some(id => !state.e01!.s28Checks?.includes(id)) || await assessGcroIssue(state) !== 'valid') return state
  return mark({ ...state, e01: { ...state.e01, sceneId: 'E01-S29' } },'R04')
}

export function citeS29(state: GameSave, source: string): GameSave {
  if (state.e01?.sceneId !== 'E01-S29' || !state.deliveredEvents.includes('R04')) return state
  const expected = ['E012','E003','E002'], citations = state.e01.s29Citations ?? []
  if (source !== expected[citations.length]) return state
  return { ...state, e01: { ...state.e01, s29Citations: [...citations,source] } }
}

export function saveS29Finding(state: GameSave): GameSave {
  if (state.e01?.sceneId !== 'E01-S29' || state.e01.s29Citations?.join('|') !== 'E012|E003|E002' || !state.deliveredEvents.includes('R04') || !state.deliveredEvents.includes('EV-E01-S20-NOTICE')) return state
  return { ...mark(scene(state,30),'EV-E01-S29-K02-CITED'), knowledge: { ...state.knowledge, player: once(state.knowledge.player,'K02') } }
}

const publicRoleCard = { issuer: 'Civic Portal Validation Desk', rule: 'GH-PV-02 v1', role: 'correction queue submitter', capability: 'ENABLED' } as const
export function checkS30Role(state: GameSave): GameSave {
  if (state.e01?.sceneId !== 'E01-S30' || !state.knowledge.player.includes('K02')) return state
  const valid = state.e01.s30PublicStatus !== 'unavailable' && publicRoleCard.issuer === 'Civic Portal Validation Desk' && publicRoleCard.rule === 'GH-PV-02 v1' && publicRoleCard.capability === 'ENABLED'
  return { ...state, e01: { ...state.e01, s30RoleChecked: true, s30Hook: valid ? 'valid' : 'fallback' }, deliveredEvents: once(state.deliveredEvents,'EV-E01-S30-PUBLIC-SERVICE') }
}

export function saveS30Question(state: GameSave, answer: string): GameSave {
  if (state.e01?.sceneId !== 'E01-S30' || !state.e01.s30RoleChecked || answer !== (state.e01.s30Hook === 'valid' ? 'role-class' : 'process-open')) return state
  return { ...state, e01: { ...state.e01, s30QuestionSaved: true }, deliveredEvents: once(state.deliveredEvents,'EV-E01-S30-QUESTION') }
}

export function completeS30(state: GameSave): GameSave {
  if (state.e01?.sceneId !== 'E01-S30' || pending(state) || !state.e01.s30RoleChecked || !state.e01.s30QuestionSaved || !state.deliveredEvents.includes('R01') || !state.e01.editorChecked || !state.knowledge.player.includes('K02')) return state
  return mark({ ...state, e01: { ...state.e01, e01Complete: true } },'E01.complete')
}
