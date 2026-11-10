import { fragmentExamination, masterFragments } from '../content/masterScene05'
import { activityEvents } from '../content/masterScene06'
import { captureId } from '../content/masterScene08'
import { referenceCardId, referenceCardImage } from '../content/masterScene09'
import { storyPhotos } from '../content/storyPhotos'
import { assessmentLabel, captureAssessments, cardAssessments, contactAssessments, type StatementAssessment } from '../content/masterSceneAssessments'
import type { GameSave } from './types'
import { selectInvestigationGuidance } from './masterInvestigationGuidance'

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
const laterQuestions = [
  { id: 'export-provenance', prompt: 'What does the contact export support?', hint: 'A star can appear in the copy without identifying who marked it. The damaged remark is a separate uncertainty.' },
  { id: 'another-copy', prompt: 'What does “another copy” refer to?', hint: 'The crop supports the wording. Its date, missing context and subject remain open.' },
  { id: 'card-reference', prompt: 'What can the secondary reference establish?', hint: 'Compare the exact reference and markings. A reference cannot identify the contents behind it.' },
  { id: 'inventory-theory', prompt: 'How do the reference card and public listing fit the investigation?', hint: 'Distinguish a matching catalogue reference from the unavailable record, and note what might disprove your theory.' },
]
const questionIds = new Set([...initialQuestions, ...missingHourQuestions, ...laterQuestions].map(question => question.id))

type Position = { x: number; y: number }
type CaseNote = { text: string; evidenceIds: string[]; alternative?: string; counterEvidenceIds?: string[] }
export const caseLinkAssessments = ['tentative', 'supported', 'contradicted'] as const
export type CaseLinkAssessment = typeof caseLinkAssessments[number]
type CaseLink = { from: string; to: string; label?: string; assessment?: CaseLinkAssessment }
type CaseEvidence = {
  id: string
  title: string
  description: string
  source: string
  kind: 'photo' | 'message' | 'note' | 'log' | 'finding' | 'document' | 'statement'
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
  summary?: NonNullable<GameSave['masterScene10']>['theory']
  guidance?: ReturnType<typeof selectInvestigationGuidance>
  questionStatus?: Record<string, string>
}

export type MasterCaseFileAction =
  | { type: 'save-note'; questionId: string; text: string; evidenceIds: string[]; alternative?: string; counterEvidenceIds?: string[] }
  | { type: 'move-node'; id: string; x: number; y: number }
  | { type: 'toggle-link'; from: string; to: string }
  | { type: 'update-link'; from: string; to: string; label: string; assessment: CaseLinkAssessment }

export function createMasterCaseFile(): MasterCaseFileState {
  return { version: 1, id: caseId, notes: {}, positions: {}, links: [] }
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
      const examination = fragmentExamination[fragment.id]
      evidence.push({ id: fragment.id, title: examination.title, description: fragment.body, source: 'TRACE first pass · incomplete archive fragment, source unverified', kind: fragment.category === 'Messages' ? 'message' : 'note', recordedAt: save.evidence[fragment.id]?.collectedAt })
      const savedFinding=save.evidence[fragment.id]
      if (five.saved.includes(fragment.id)&&savedFinding&&five.observations?.includes(fragment.id)) {
        evidence.push({ id: `${fragment.id}-FINDING`, title: `${examination.title} observation`, description: examination.observation, source: `Private observation · ${examination.title} · source unverified`, kind: 'finding', recordedAt: savedFinding.collectedAt })
      }
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
  const addStatement = (line: { id: string; text: string; at: number } | undefined, title: string, source: string) => {
    if (line) evidence.push({ id: line.id, title, description: line.text, source, kind: 'statement', recordedAt: line.at })
  }
  const addAssessment = (assessment: StatementAssessment | undefined, id: string, evidenceId: string, title: string) => {
    const receipt = save.evidence[evidenceId]
    if (assessment && receipt) evidence.push({ id, title, description: assessment.finding, source: `Private assessment · ${assessmentLabel(assessment.outcome)}`, kind: 'finding', recordedAt: receipt.collectedAt })
  }
  if (exportEntry?.opened) {
    evidence.push({ id: 'TA-EX-STARRED-ENTRY', title: 'Starred contact export', description: 'The copy contains an unnamed starred entry. The author and meaning of the star are unknown.', source: 'Sophie · shared-family-folder copy, original unverified', kind: 'document', recordedAt: save.evidence['TA-EX-STARRED-ENTRY']?.collectedAt })
    addStatement(exportEntry.lines.find(line => line.id === 'TA-S07-CALL-S1'), 'Sophie’s account of the export', 'Sophie · voice call testimony')
    if(exportEntry.saved)addAssessment(contactAssessments.find(item=>item.id===exportEntry.assessment), 'TA-FN-SOPHIE-EXPORT', 'TA-EX-STARRED-ENTRY', 'Contact-export assessment')
  }
  if (save.masterScene08?.received && save.masterScene08.opened) {
    evidence.push({ id: captureId, title: 'Daniel’s last check-in', description: 'A cropped conversation includes the phrase “another copy”. The crop does not establish what the phrase refers to.', source: 'Maya · cropped message capture, original unverified', kind: 'message', timestamp: '21:14 · date and time zone unknown', recordedAt: save.evidence[captureId]?.collectedAt })
    addStatement(save.masterScene08.messages.find(line => /^TA-S08-C3-M-/.test(line.id)), 'Maya’s account of the crop', 'Maya · private message testimony')
    addStatement(save.lucasPhoto?.messages.find(line => line.id === 'TA-S08-LUCAS-PHOTO-INTRO'), 'Lucas’s account', 'Lucas · private message testimony')
    if(save.masterScene08.saved)addAssessment(captureAssessments.find(item=>item.id===save.masterScene08?.assessment), 'TA-FN-CHECK-IN', captureId, 'Last check-in assessment')
  }
  if (save.masterScene09?.received && save.masterScene09.opened) {
    evidence.push({ id: referenceCardId, title: 'Secondary reference card', description: 'The photograph shows the reference GH-DSC-03-A. The card does not establish the contents of any record.', source: 'Maya · shared-folder photograph, original unverified', kind: 'photo', image: referenceCardImage, recordedAt: save.evidence[referenceCardId]?.collectedAt })
    if(save.masterScene09.saved)addAssessment(cardAssessments.find(item=>item.id===save.masterScene09?.assessment), 'TA-FN-CARD-REFERENCE', referenceCardId, 'Secondary card assessment')
  }
  const inventory = save.evidence['TA-S10-PUBLIC-INDEX']
  if ((save.masterScene10?.investigationRevision === 'theory-v1' && save.masterScene10.compared) || (save.masterScene10?.saved && inventory)) {
    evidence.push({ id: 'TA-S10-PUBLIC-INDEX', title: 'Public inventory match', description: 'The inventory has a matching reference. The underlying record remains unavailable.', source: 'Greyhaven public inventory · index match only', kind: 'document', recordedAt: inventory?.collectedAt })
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
  const questions = [...initialQuestions]
  if (save.masterScene06?.recovered) questions.push(...missingHourQuestions)
  if (save.masterScene07?.opened) questions.push(laterQuestions[0])
  if (save.masterScene08?.opened) questions.push(laterQuestions[1])
  if (save.masterScene09?.opened) questions.push(laterQuestions[2])
  if (save.masterScene10?.compared) questions.push(laterQuestions[3])
  const questionStatus: Record<string, string> = {}
  if (save.masterScene05.saved.length) questionStatus['phone-recovery'] = 'Observation recorded · archive source unverified'
  if (save.masterScene06?.saved) questionStatus['missing-hour'] = 'Gap documented · cause unresolved'
  if (save.masterScene07?.saved) questionStatus['starred-number'] = 'Entry documented · significance unresolved'
  if (save.masterScene08?.saved) questionStatus['another-copy'] = 'Crop assessed · subject of the copy unresolved'
  if (save.masterScene09?.saved) questionStatus['card-reference'] = 'Search reference recorded · original unverified'
  if (save.masterScene10?.saved) questionStatus['inventory-theory'] = 'Summary recorded · investigation open'
  const notes: Record<string, CaseNote> = {}
  for (const question of questions) {
    const note = state.notes[question.id]
    if (note) notes[question.id] = { ...note, evidenceIds: note.evidenceIds.filter(id => visibleIds.has(id)), ...(note.counterEvidenceIds ? { counterEvidenceIds: note.counterEvidenceIds.filter(id => visibleIds.has(id)) } : {}) }
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
    summary: save.masterScene10?.saved ? save.masterScene10.theory : undefined,
    guidance: selectInvestigationGuidance(save),
    questionStatus,
  }
}

const validCoordinate = (value: unknown): value is number => typeof value === 'number' && Number.isFinite(value) && value >= 0 && value <= 100
const validId = (value: unknown): value is string => typeof value === 'string' && /^[A-Z0-9_-]{1,100}$/.test(value)
const maxNoteLength = 2000
const maxLinkLabelLength = 120
const validAssessment = (value: unknown): value is CaseLinkAssessment => caseLinkAssessments.some(assessment => assessment === value)
const linkKey = ({ from, to }: CaseLink) => [from, to].sort().join(':')

export function masterCaseFileAction(save: GameSave, action: MasterCaseFileAction): GameSave {
  const view = selectMasterCaseFile(save)
  if (!view) return save
  const state = save.masterCaseFile ?? createMasterCaseFile()
  const visibleIds = new Set(view.nodes.map(node => node.id))
  if (action.type === 'save-note') {
    if (!view.questions.some(question => question.id === action.questionId)) return save
    const alternative = action.alternative?.trim()
    const counterEvidenceIds = [...new Set(action.counterEvidenceIds)]
    if (action.text.length > maxNoteLength || (alternative?.length ?? 0) > maxNoteLength || [...action.evidenceIds, ...counterEvidenceIds].some(id => !visibleIds.has(id)) || counterEvidenceIds.some(id => action.evidenceIds.includes(id))) return save
    const notes = { ...state.notes }
    const text = action.text.trim()
    if (text) notes[action.questionId] = { text, evidenceIds: [...new Set(action.evidenceIds)], ...(alternative ? { alternative } : {}), ...(counterEvidenceIds.length ? { counterEvidenceIds } : {}) }
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
  if (action.type === 'update-link') {
    if (action.label.length > maxLinkLabelLength || !validAssessment(action.assessment) || !state.links.some(item => linkKey(item) === key)) return save
    const label = action.label.trim()
    return { ...save, masterCaseFile: { ...state, links: state.links.map(item => linkKey(item) === key ? { ...item, label: label || undefined, assessment: action.assessment } : item) } }
  }
  const links = state.links.some(item => linkKey(item) === key)
    ? state.links.filter(item => linkKey(item) !== key)
    : [...state.links, link]
  return { ...save, masterCaseFile: { ...state, links } }
}

const isRecord = (value: unknown): value is Record<string, unknown> => value !== null && typeof value === 'object' && !Array.isArray(value)
const validIds = (value: unknown): value is string[] => Array.isArray(value) && value.every(validId) && new Set(value).size === value.length

export function validateMasterCaseFile(value: unknown): void {
  if (value === undefined) return
  if (!isRecord(value) || value.version !== 1 || value.id !== caseId || !isRecord(value.notes) || !isRecord(value.positions) || !Array.isArray(value.links)) {
    throw Error('Invalid TRACE Case File')
  }
  for (const [id, note] of Object.entries(value.notes)) {
    if (!questionIds.has(id) || !isRecord(note) || typeof note.text !== 'string' || !note.text.trim() || note.text.length > maxNoteLength || !validIds(note.evidenceIds) || (note.alternative !== undefined && (typeof note.alternative !== 'string' || note.alternative.length > maxNoteLength)) || (note.counterEvidenceIds !== undefined && (!validIds(note.counterEvidenceIds) || note.counterEvidenceIds.some(evidenceId => (note.evidenceIds as string[]).includes(evidenceId))))) {
      throw Error('Invalid TRACE case note')
    }
  }
  for (const [id, position] of Object.entries(value.positions)) {
    if (!validId(id) || !isRecord(position) || !validCoordinate(position.x) || !validCoordinate(position.y)) throw Error('Invalid TRACE board position')
  }
  const keys = new Set<string>()
  for (const link of value.links) {
    if (!isRecord(link) || !validId(link.from) || !validId(link.to) || link.from === link.to || (link.label !== undefined && (typeof link.label !== 'string' || link.label.length > maxLinkLabelLength)) || (link.assessment !== undefined && !validAssessment(link.assessment))) throw Error('Invalid TRACE board connection')
    const key = linkKey({ from: link.from, to: link.to })
    if (keys.has(key)) throw Error('Duplicate TRACE board connection')
    keys.add(key)
  }
}
