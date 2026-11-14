/** State for the new Scene 5 route. Historical scene state is deliberately separate. */
export type ArchivePhase = 'installation-offer' | 'installing' | 'setup' | 'archive-offer' | 'importing' | 'ready' | 'recovering' | 'interrupted' | 'complete'
export type ArchiveTopic = 'maya' | 'sophie' | 'lucas' | 'june' | 'dinner' | 'records' | 'activity'
export interface DigitalArchiveFlow {
  phase: ArchivePhase
  progress: number
  deferred: boolean
  discovered: ArchiveTopic[]
  discussed: ArchiveTopic[]
  topic?: ArchiveTopic
  draft?: number
}
export type DigitalArchiveAction =
  | { type: 'install' | 'open-workspace' | 'accept' | 'reject' | 'reconsider' | 'recover' | 'send' }
  | { type: 'advance'; amount: number }
  | { type: 'discover' | 'topic'; topic: ArchiveTopic }
  | { type: 'draft'; index: number }

export const newDigitalArchiveFlow = (): DigitalArchiveFlow => ({ phase: 'installation-offer', progress: 0, deferred: false, discovered: [], discussed: [] })

/** Pure, deterministic transitions; simulations never grant access merely by being opened. */
export function digitalArchiveFlow(state: DigitalArchiveFlow, action: DigitalArchiveAction): DigitalArchiveFlow {
  switch (action.type) {
    case 'install': return state.phase === 'installation-offer' && !state.deferred ? { ...state, phase: 'installing', progress: 0 } : state
    case 'open-workspace': return state.phase === 'setup' ? { ...state, phase: 'archive-offer', progress: 0 } : state
    case 'accept': return state.phase === 'archive-offer' && !state.deferred ? { ...state, phase: 'importing', progress: 0 } : state
    case 'reject': return (state.phase === 'archive-offer' || state.phase === 'installation-offer') && !state.deferred ? { ...state, deferred: true } : state
    case 'reconsider': return state.deferred ? { ...state, deferred: false } : state
    case 'recover': return state.phase === 'ready' ? { ...state, phase: 'recovering', progress: 0 } : state
    case 'advance': {
      if (!Number.isFinite(action.amount) || action.amount <= 0) return state
      const limit = state.phase === 'recovering' ? 20 : 100
      if (!['installing', 'importing', 'recovering'].includes(state.phase)) return state
      const progress = Math.min(limit, state.progress + action.amount)
      if (progress < limit) return { ...state, progress }
      return { ...state, progress, phase: state.phase === 'installing' ? 'setup' : state.phase === 'importing' ? 'ready' : 'interrupted' }
    }
    case 'discover':
      return (state.phase === 'interrupted' || state.phase === 'complete') && !state.discovered.includes(action.topic)
        ? { ...state, discovered: [...state.discovered, action.topic] } : state
    case 'topic': return state.discovered.includes(action.topic) ? { ...state, topic: action.topic, draft: undefined } : state
    case 'draft': return state.topic && Number.isInteger(action.index) && action.index >= 0 && action.index < 3 ? { ...state, draft: action.index } : state
    case 'send': return state.topic && state.draft !== undefined && state.discovered.includes(state.topic)
      ? { ...state, discussed: [...new Set([...state.discussed, state.topic])], draft: undefined } : state
  }
}
