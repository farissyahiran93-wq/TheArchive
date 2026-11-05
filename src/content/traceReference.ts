import { canonicalIndexFields } from './versionHistoryConversation'
import { scene04Article } from './scene04Final'

export const traceReferenceId = canonicalIndexFields[0][1]
export const traceAnalysisId = 'EV-TRACE-REF-001'
export const traceDurationMs = 5600
export const bridgeTraceStages = [
  [0, 'INITIALIZING INDEX READER'],
  [18, 'READING REFERENCE HEADER'],
  [37, 'PARSING AVAILABLE FIELDS'],
  [62, 'MATCHING PUBLIC ARTICLE IDENTIFIER'],
  [83, 'CHECKING DATA AVAILABILITY'],
  [100, 'SCAN COMPLETE'],
] as const
export const bridgeTraceLogs = [
  `Loading reference ${traceReferenceId}`,
  'Header decoded: reference fields recovered',
  `PUBLIC_ARTICLE: ${scene04Article.id}\nTITLE: ${scene04Article.title}`,
  'SOURCE: UNKNOWN\nCAPTURE_TIME: NOT ESTABLISHED',
  'ORIGINAL_BODY: UNAVAILABLE\nEncrypted payload: NONE DETECTED',
  'Result: MATCHING REFERENCE — REVISION UNVERIFIED',
] as const
export const traceStages = ['INITIALIZING', 'INDEX LOOKUP', 'FIELD MATCH', 'VERIFYING SOURCE LIMITATIONS', 'COMPLETE'] as const
export const traceLogs = [
  '[INIT] Opening recovered reference store…',
  `[FOUND] ${traceReferenceId}`,
  `[MATCH] Public article reference: ${scene04Article.id}`,
  '[WARN] Provenance: UNVERIFIED',
  '[MISSING] Original article text: NOT AVAILABLE',
  '[CHECK] Authenticated capture time: NOT ESTABLISHED',
  '[LIMIT] No earlier text available for a before/after comparison',
  '[DONE] Reference linked. Revision history NOT VERIFIED.',
] as const
export const traceFindings = [
  { id: 'reference', label: 'Index record', value: traceReferenceId, detail: 'The recovered index holds reference fields. It contains no original article body.' },
  { id: 'match', label: 'Public ID match', value: scene04Article.id, detail: 'The index field matches the known public article ID. A matching reference does not establish an earlier version.' },
  { id: 'origin', label: 'Origin / capture time', value: 'UNVERIFIED', detail: 'Who assembled the index and its authenticated capture time are not established.' },
  { id: 'body', label: 'Original body', value: 'UNAVAILABLE', detail: 'No earlier readable article text is held in this index. The public article remains in the Bulletin browser.' },
  { id: 'revision', label: 'Revision comparison', value: 'NOT VERIFIED', detail: 'Without earlier text or an authenticated change log, a wording change cannot be established.' },
] as const
