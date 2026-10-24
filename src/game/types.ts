export type Pronouns = 'she/her' | 'he/him' | 'they/them' | 'prefer not to say'
export type CharacterId = 'maya' | 'daniel' | 'lucas' | 'sophie' | 'eli' | 'nora'
export type Relationship = { trust: number; affinity: number; suspicion: number; romance: number }
export type Message = { id: string; sender: 'player' | 'fixture' | CharacterId; recipient?: CharacterId | 'fixture'; channel?: 'bulletin' | 'messages'; disclosedFactIds?: string[]; attachmentIds?: string[]; text: string; at: number; delivery: 'delivered' | 'read' }
export type ScheduledEvent = { id: string; dueAt: number }
export type Evidence = { id: string; source: string; collectedAt: number; verified: boolean }

export interface Episode01Slice {
  sceneId: `E01-S${string}`
  briefRead: boolean
  previewInspected: boolean
  hintCount: number
  attempts: number
  compared: boolean
  tipMode?: 'anonymous' | 'handle'
  handle: string
  s11Primary?: string
  s11Followup?: string
  draftChoice?: string
  editorChecked: boolean
  editorHintCount?: number
  s12Choice?: string
  s13Asked?: boolean
  s13Primary?: string
  s13Followup?: string
  s14Share?: 'image' | 'text' | 'none' | 'defer'
  s15NoteSeen?: boolean
  s15Primary?: string
  s15Followup?: string
  s16OfferSeen?: boolean
  s16Primary?: string
  s16Followup?: string
  messagesConsent?: boolean
  archiveConsent?: boolean
  s18Route?: 'public' | 'archive'
  s18Inspected?: 'preview' | 'current' | 'notice'
  s18HintCount?: number
  s19Observation?: boolean
  s19Dates?: string[]
  s20NoticeSeen?: boolean
  s20ApprovalChecked?: boolean
  s20Share?: string
  s21Order?: string[]
  s21Classified?: boolean
  s22Alternative?: boolean
  s22Test?: boolean
  s23Query?: string
  s23Opened?: string[]
  s23Matches?: string[]
  s24NoteViewed?: boolean
  s24Share?: string
  s24Skipped?: boolean
  s25Opened?: boolean
  s25Primary?: string
  s25Followup?: string
  s26Frame?: string
  s27Scope?: 'redacted' | 'residents' | 'logs'
  s27Status?: 'reviewing' | 'issued' | 'refused' | 'delayed' | 'unavailable'
  s27Session?: string
  s27Share?: string
  s27Attempt?: number
  s27ReviewRecorded?: boolean
  s27OfficeResponse?: 'issue' | 'delay' | 'refuse' | 'unavailable'
  s28Issue?: { issuer: string; certificate: string; recipient: string; digest: string; byteLength: number; issuedAt: number; tokenSpent: boolean }
  s28Payload?: string
  s28CorrectionRequested?: boolean
  s28OfficeAvailability?: 'available' | 'unavailable'
  s28OpenedPages?: number[]
  s28DirectorySeen?: boolean
  s28Checks?: string[]
  s29Citations?: string[]
  s29Share?: string
  s30RoleChecked?: boolean
  s30Hook?: 'valid' | 'fallback'
  s30PublicStatus?: 'available' | 'unavailable'
  s30QuestionSaved?: boolean
  s30Share?: string
  e01Complete?: boolean
  boardLinks?: string[]
}

export interface OpeningState {
  scene01?: {
    version: 1
    scriptRevision?: 'final-2026-10-23'
    draft?: { nodeId: string; choiceId: string }
    nodeId: string
    startedAt: number
    introduced: boolean
    nameDisclosed: boolean
    disclosedName?: string
    invitation: 'none' | 'declined' | 'ready' | 'joined'
    invitationDismissed: boolean
    invitationApproved?: boolean
    complete: boolean
    queue: { id: string; dueAt: number; typing: boolean }[]
    messages: { id: string; sender: 'sophie' | 'player'; text: string; at: number }[]
    groupMessages: { id: string; sender: 'sophie' | 'maya' | 'lucas' | 'player' | 'system'; text: string; at: number }[]
    groupScript?: 'ch01_sc02_uninvited_guest'
    groupPresence?: { sophie: boolean; maya: boolean; lucas: boolean }
    groupSourceBoundary?: boolean
    groupMembers?: { sophie: boolean; maya: boolean; lucas: boolean }
    lucasLeftGroup?: boolean
    groupComplete?: boolean
    groupCompletedAt?: number
    privateHandoff?: { sceneId: 'ch01_sc03_just_between_us'; dueAt: number; deliveredAt?: number; openedAt?: number }
    privateScene03?: {
      version: 1
      startedAt: number
      reading: boolean
      complete: boolean
      completedAt?: number
      nextEventReady: boolean
      paused?: { id: string; remainingMs: number; typing: boolean }
      draft?: { nodeId: string; choiceId: string }
      receipts: { eventId: string; recipient: 'player' | 'sophie'; factIds: string[] }[]
    }
    groupReceipts?: { eventId: string; recipient: 'player' | 'sophie' | 'maya' | 'lucas'; factIds: string[] }[]
  }
  flow?: 'mirror-first'
  preGroupQuestions?: string[]
  referenceStarted?: boolean
  connectionReviewed?: boolean
  privateBeat?: import('../content/recoverySequence').PrivateBeat
  disclosureFollowup?: 'proof' | 'human' | 'closing'
  recoverySequence?: {
    beat: import('../content/recoverySequence').RelayBeat
    messages: { id: string; sender: 'relay' | 'player'; text: string }[]
    queue: { id: string; text: string; dueAt: number }[]
    order: string[]
    attempts: number
    hints: number
    restored: boolean
    assisted?: boolean
    feedback?: string
  }
  dialogueVersion?: 2 | 3 | 4
  v4Beat?: 'first' | 'name' | 'address' | 'question' | 'offline' | 'waiting-group'
  addressPreference?: 'mr' | 'ms' | 'name'
  firstPageViewed?: boolean
  pendingRecovery?: 'waiting' | 'pending' | 'accepted' | 'rejected' | 'retry'
  beat?: 'quiet' | 'offer' | 'disclosure' | 'bridge' | 'ready'
  queue?: { id: string; text: string; dueAt: number }[]
  afterQueue?: 'recovery'
  disclosure?: 'counts' | 'uncertain' | 'withhold'
  stage: 'chat' | 'group' | 'recovery' | 'mirror' | 'found' | 'complete'
  step: 0 | 1 | 2
  messages: { id: string; sender: 'sophie' | 'player'; text: string; at?: number }[]
  noteSeen: boolean
  offerInspected: boolean
  restored: boolean
  viewed: string[]
  indexCompared: boolean
  /** Stable per-record ids; optional for backward-compatible old prologue saves. */
  inspectedRecords?: string[]
  unlockedMirrorRecords?: string[]
  mirrorHints?: Record<string, number>
  mirrorLinks?: string[]
  recoveredSourceIds?: string[]
  mirrorLocation?: string
  social?: {
    creator?: 'sophie'
    createdAt?: number
    phase: 'invitation' | 'first' | 'conflict' | 'departure' | 'second' | 'done'
    messages: { id: string; sender: 'sophie' | 'maya' | 'lucas' | 'eli' | 'player' | 'system'; text: string; at?: number }[]
    members: ('sophie' | 'maya' | 'lucas' | 'eli' | 'player')[]
    queue?: { id: string; sender: 'sophie' | 'maya' | 'lucas' | 'eli' | 'system'; text: string; dueAt: number }[]
    delayed?: boolean
    reactivation?: 'proposed' | 'deferred' | 'joining' | 'active'
  }
}

export interface GameSave {
  chapter1?: import('./chapter1').Chapter1State
  /** Absent in historical saves; never inferred from editorial scene numbers. */
  narrativePlan?: 'ch01-master-18' | 'legacy-access'
  chapter2Access?: import('./chapter2Access').Chapter2Access
  schemaVersion: 1
  saveRevision?: number
  player: { name: string; pronouns?: Pronouns } | null
  episodeId: 'phase-00'
  sceneId: 'home' | 'fixture'
  unlockedEpisodes: string[]
  choices: Record<string, string>
  messages: Message[]
  pendingEvents: ScheduledEvent[]
  deliveredEvents: string[]
  knowledge: { player: string[]; characters: Record<CharacterId, string[]> }
  relationships: Record<CharacterId, Relationship>
  evidence: Record<string, Evidence>
  notifications: { id: string; text: string; read: boolean }[]
  settings: { reduceMotion: boolean }
  e01?: Episode01Slice
  prologue?: OpeningState
}

export const characterIds: CharacterId[] = ['maya', 'daniel', 'lucas', 'sophie', 'eli', 'nora']
const neutral = (): Relationship => ({ trust: 0, affinity: 0, suspicion: 0, romance: 0 })

export function newGame(): GameSave {
  return {
    schemaVersion: 1, narrativePlan: 'ch01-master-18', player: null, episodeId: 'phase-00', sceneId: 'home', unlockedEpisodes: [],
    choices: {}, messages: [], pendingEvents: [], deliveredEvents: [],
    knowledge: { player: [], characters: { maya: [], daniel: [], lucas: [], sophie: [], eli: [], nora: [] } },
    relationships: { maya: neutral(), daniel: neutral(), lucas: neutral(), sophie: neutral(), eli: neutral(), nora: neutral() },
    evidence: {}, notifications: [], settings: { reduceMotion: false },
  }
}
