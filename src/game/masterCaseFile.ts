import { masterFragments } from '../content/masterScene05'
import { activityEvents } from '../content/masterScene06'
import { captureId } from '../content/masterScene08'
import { referenceCardId, referenceCardImage } from '../content/masterScene09'
import { storyPhotos } from '../content/storyPhotos'
import type { GameSave } from './types'

const caseId = 'TA-CASE-001'
const initialQuestions = [
  { id: 'disappearance', prompt: "What do we know about Daniel's disappearance?", hint: "Separate what Sophie reported from what remains unknown about Daniel's whereabouts." },
  { id: 'starred-number', prompt: "Why was the player's number marked in Daniel's contact export?", hint: "Sophie described what she saw. Her account cannot identify who marked it or why." },
  { id: 'phone-recovery', prompt: "What information can be recovered from Daniel's phone?", hint: 'Compare the Messages and Notes fragments as they become available.' },
  { id: 'unverified', prompt: 'Which details remain unverified?', hint: 'Consider the source of each item and what it can actually establish.' },
]
const missingHourQuestions = [
  { id: 'missing-hour', prompt: "What happened during Daniel's missing hour?", hint: 'Compare the records either side of the gap. An absent entry leaves more than one explanation open.' },
  { id: 'device-times', prompt: 'Which recovered timestamps appear inconsistent?', hint: 'Distinguish device times from a verified clock, and automatic activity from human actions.' },
  { id: 'cross-reference', prompt: 'Which records corroborate or contradict one another?', hint: 'Compare the Activity Logs with the fragments. A database write need not correspond to a particular recovered message.' },
  { id: 'follow-up', prompt: 'What still needs to be verified about the missing hour?', hint: 'Identify what independent evidence would help you test your working theory.' },
]
const questionIds = new Set([...initialQuestions, ...missingHourQuestions].map(question => question.id))

type Position = { x: number; y: number }
type CaseNote = { text: string; evidenceIds: string[] }
type CaseLink = { from: string; to: string }
type CaseEvidence = {
  id: string
  title: string
  description: string
  source: string
  kind: 'photo' | 'message' | 'note' | 'log' | 'finding' | 'document'
  image?: string
  timestamp?: string
  recordedAt?: number
}

export interface MasterCaseFileState {
  version: 1
  id: typeof caseId
  notes: Record<string, CaseNote>
  positions: Record<string, Position>
  links: CaseLink[]
}

export interface MasterCaseFileView {
  id: typeof caseId
  title: string
  subject: string
  status: string
  primaryContact: string
  investigationStatus: string
  facts: string[]
  questions: typeof initialQuestions
  nodes: (CaseEvidence & { position: Position })[]
  notes: Record<string, CaseNote>
  links: CaseLink[]
}

export type MasterCaseFileAction =
  | { type: 'save-note'; questionId: string; text: string; evidenceIds: string[] }
  | { type: 'move-node'; id: string; x: number; y: number }
  | { type: 'toggle-link'; from: string; to: string }

export function createMasterCaseFile(): MasterCaseFileState {
  return { version: 1, id: caseId, notes: {}, positions: {}, links: [] }
}

const fragmentTitles: Record<(typeof masterFragments)[number]['id'], string> = {
  'TA-PH-MESSAGE-FAMILY-01': 'Family Thread',
  'TA-PH-MESSAGE-JUNE-01': 'June Thread',
  'TA-PH-NOTE-ORDINARY-01': 'Dinner Reminder',
  'TA-PH-NOTE-RECORDS-01': 'Greyhaven Records',
}

const historicalPhotoAssets: Record<string, string> = {
  [storyPhotos.sophieFamily.id]: '/media/chat/sophie-daniel-family.png',
  [storyPhotos.lucasFriends.id]: '/media/chat/lucas-daniel-friends.png',
}

function discoveredEvidence(save: GameSave): CaseEvidence[] {
  const evidence: CaseEvidence[] = []
  const five = save.masterScene05
  const six = save.masterScene06
  const opening = save.prologue?.scene01
  const photos = [
    { photo: storyPhotos.sophieFamily, title: 'Mercer family photo', source: 'Sophie · private message', lines: opening?.messages },
    { photo: storyPhotos.sophieBiscuits, title: 'Sophie’s kitchen photo', source: 'Sophie · private message', lines: opening?.messages },
    { photo: storyPhotos.mayaMugs, title: 'Maya’s photograph', source: 'Maya · private message', lines: save.masterScene08?.messages },
    { photo: storyPhotos.lucasFriends, title: 'Lucas and Daniel', source: 'Lucas · private message, capture date unknown', lines: save.lucasPhoto?.messages },
  ]
  for (const { photo, title, source, lines } of photos) {
    const receipt = lines?.find(line => line.id === photo.id && line.photo)
    if (receipt) {
      const image = receipt.photo === historicalPhotoAssets[photo.id] ? receipt.photo : photo.src
      evidence.push({ id: photo.id, title, source, description: photo.alt, kind: 'photo', image, recordedAt: receipt.at })
    }
  }
  const archiveOffer = five?.messages.find(message => message.id === 'TA-S05-INTRO-1')
  if (archiveOffer && (five?.archiveStatus === 'accepted' || five?.revision === undefined)) {
    evidence.push({ id: 'TA-S05-ARCHIVE-ACCEPTED', title: 'Encrypted phone archive', description: 'Unknown Sender believes this archive contains Daniel’s phone data. Its original source and contents have not been authenticated.', source: 'Unknown Sender · encrypted copy', kind: 'document', recordedAt: archiveOffer.at })
  }
  if (five?.recovered) {
    for (const fragment of masterFragments) {
      if (!five.read.includes(fragment.id)) continue
      evidence.push({ id: fragment.id, title: fragmentTitles[fragment.id], description: fragment.summary, source: 'TRACE first pass · incomplete archive fragment, source unverified', kind: fragment.category === 'Messages' ? 'message' : 'note', recordedAt: save.evidence[fragment.id]?.collectedAt })
    }
  }
  if (six?.recovered) {
    for (const event of activityEvents) {
      if (!six.inspected.includes(event.id)) continue
      evidence.push({ id: event.id, title: event.kind, description: `${event.text} ${event.uncertainty}`, source: 'TRACE activity recovery · device clock unverified', kind: 'log', timestamp: event.raw })
    }
  }
  const finding = save.evidence['TA-FN-MISSING-HOUR']
  if (six?.saved && finding) {
    evidence.push({ id: finding.id, title: 'Missing-hour observation', description: 'The recovered sequence has a gap between file access and an automatic sync. The records do not establish what happened during that interval.', source: 'Local timeline finding · archive source and device clock unverified', kind: 'finding', recordedAt: finding.collectedAt })
  }
  const exportEntry = save.masterScene07
  if (exportEntry?.opened && exportEntry.star) {
    evidence.push({ id: 'TA-EX-STARRED-ENTRY', title: 'Starred contact export', description: 'The copy contains an unnamed starred entry. The author and meaning of the star are unknown.', source: 'Sophie · shared-family-folder copy, original unverified', kind: 'document', recordedAt: save.evidence['TA-EX-STARRED-ENTRY']?.collectedAt })
  }
  if (save.masterScene08?.received && save.masterScene08.opened) {
    evidence.push({ id: captureId, title: 'Daniel’s last check-in', description: 'A cropped conversation includes the phrase “another copy”. The crop does not establish what the phrase refers to.', source: 'Maya · cropped message capture, original unverified', kind: 'message', timestamp: '21:14 · date and time zone unknown', recordedAt: save.evidence[captureId]?.collectedAt })
  }
  if (save.masterScene09?.received && save.masterScene09.opened) {
    evidence.push({ id: referenceCardId, title: 'Secondary reference card', description: 'The photograph shows the reference GH-DSC-03-A. The card does not establish the contents of any record.', source: 'Maya · shared-folder photograph, original unverified', kind: 'photo', image: referenceCardImage, recordedAt: save.evidence[referenceCardId]?.collectedAt })
  }
  const inventory = save.evidence['TA-S10-PUBLIC-INDEX']
  if (save.masterScene10?.saved && inventory) {
    evidence.push({ id: inventory.id, title: 'Public inventory match', description: 'The inventory has a matching reference. The underlying record remains unavailable.', source: 'Greyhaven public inventory · index match only', kind: 'document', recordedAt: inventory.collectedAt })
  }
  if (save.masterScene10?.warning && save.deliveredEvents.includes('TA-S10-WARNING')) {
    evidence.push({ id: 'TA-S10-WARNING-CARD', title: 'Starred number warning', description: 'Sophie described a separate warning card. Its handwriting and authorship are unverified.', source: 'Sophie · private call, family folder', kind: 'document', recordedAt: save.evidence['TA-S10-WARNING-CARD']?.collectedAt })
  }
  return evidence
}

export function selectMasterCaseFile(save: GameSave): MasterCaseFileView | undefined {
  if (save.masterScene05?.packageStatus !== 'installed') return undefined
  const state = save.masterCaseFile ?? createMasterCaseFile()
  const evidence = discoveredEvidence(save)
  const visibleIds = new Set(evidence.map(node => node.id))
  const rows = Math.ceil(evidence.length / 3)
  const nodes = evidence.map((node, index) => ({
    ...node,
    position: state.positions[node.id] ?? { x: 15 + (index % 3) * 35, y: rows === 1 ? 50 : 8 + Math.floor(index / 3) * (84 / (rows - 1)) },
  }))
  const facts = [
    'Sophie Mercer says her brother Daniel stopped answering her messages and calls. His whereabouts are unknown.',
  ]
  if (save.prologue?.scene01?.messages.some(line => line.id === 'TA-S01-AFTER-03-1')) {
    facts.push('Sophie reported finding the player’s unnamed, starred number in a contact-export copy. Who marked the entry and why remain unknown.')
  }
  if (nodes.some(node => node.id === 'TA-S05-ARCHIVE-ACCEPTED')) facts.push('Unknown Sender provided an encrypted copy believed to contain Daniel’s phone data. Its source remains unverified.')
  if (save.masterScene06?.recovered) facts.push('The deeper recovery pass recovered partial activity records. The device clock, who used the phone and what happened between records remain unverified.')
  const questions = save.masterScene06?.recovered ? [...initialQuestions, ...missingHourQuestions] : initialQuestions
  const notes: Record<string, CaseNote> = {}
  for (const question of questions) {
    const note = state.notes[question.id]
    if (note) notes[question.id] = { ...note, evidenceIds: note.evidenceIds.filter(id => visibleIds.has(id)) }
  }
  return {
    id: caseId,
    title: 'Case File 001 — The Disappearance of Daniel Mercer',
    subject: 'Daniel Mercer',
    status: 'Missing',
    primaryContact: 'Sophie Mercer',
    investigationStatus: 'Active',
    facts,
    questions,
    nodes,
    notes,
    links: state.links.filter(link => visibleIds.has(link.from) && visibleIds.has(link.to)),
  }
}

const validCoordinate = (value: unknown): value is number => typeof value === 'number' && Number.isFinite(value) && value >= 0 && value <= 100
const validId = (value: unknown): value is string => typeof value === 'string' && /^[A-Z0-9_-]{1,100}$/.test(value)
const maxNoteLength = 2000
const linkKey = ({ from, to }: CaseLink) => [from, to].sort().join(':')

export function masterCaseFileAction(save: GameSave, action: MasterCaseFileAction): GameSave {
  const view = selectMasterCaseFile(save)
  if (!view) return save
  const state = save.masterCaseFile ?? createMasterCaseFile()
  const visibleIds = new Set(view.nodes.map(node => node.id))
  if (action.type === 'save-note') {
    if (!view.questions.some(question => question.id === action.questionId)) return save
    if (action.text.length > maxNoteLength || action.evidenceIds.some(id => !visibleIds.has(id))) return save
    const notes = { ...state.notes }
    const text = action.text.trim()
    if (text) notes[action.questionId] = { text, evidenceIds: [...new Set(action.evidenceIds)] }
    else delete notes[action.questionId]
    return { ...save, masterCaseFile: { ...state, notes } }
  }
  if (action.type === 'move-node') {
    if (!visibleIds.has(action.id) || !validCoordinate(action.x) || !validCoordinate(action.y)) return save
    return { ...save, masterCaseFile: { ...state, positions: { ...state.positions, [action.id]: { x: action.x, y: action.y } } } }
  }
  if (action.from === action.to || !visibleIds.has(action.from) || !visibleIds.has(action.to)) return save
  const link = { from: action.from, to: action.to }
  const key = linkKey(link)
  const links = state.links.some(item => linkKey(item) === key)
    ? state.links.filter(item => linkKey(item) !== key)
    : [...state.links, link]
  return { ...save, masterCaseFile: { ...state, links } }
}

const isRecord = (value: unknown): value is Record<string, unknown> => value !== null && typeof value === 'object' && !Array.isArray(value)

export function validateMasterCaseFile(value: unknown): void {
  if (value === undefined) return
  if (!isRecord(value) || value.version !== 1 || value.id !== caseId || !isRecord(value.notes) || !isRecord(value.positions) || !Array.isArray(value.links)) {
    throw Error('Invalid TRACE Case File')
  }
  for (const [id, note] of Object.entries(value.notes)) {
    if (!questionIds.has(id) || !isRecord(note) || typeof note.text !== 'string' || !note.text.trim() || note.text.length > maxNoteLength || !Array.isArray(note.evidenceIds) || !note.evidenceIds.every(validId) || new Set(note.evidenceIds).size !== note.evidenceIds.length) {
      throw Error('Invalid TRACE case note')
    }
  }
  for (const [id, position] of Object.entries(value.positions)) {
    if (!validId(id) || !isRecord(position) || !validCoordinate(position.x) || !validCoordinate(position.y)) throw Error('Invalid TRACE board position')
  }
  const keys = new Set<string>()
  for (const link of value.links) {
    if (!isRecord(link) || !validId(link.from) || !validId(link.to) || link.from === link.to) throw Error('Invalid TRACE board connection')
    const key = linkKey({ from: link.from, to: link.to })
    if (keys.has(key)) throw Error('Duplicate TRACE board connection')
    keys.add(key)
  }
}
