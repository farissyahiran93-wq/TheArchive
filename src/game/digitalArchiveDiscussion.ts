import { archiveDiscussions } from '../content/digitalArchiveDiscussion'
import type { ArchiveTopic } from './digitalArchiveFlow'

export interface DiscussionState {
  discovered: ArchiveTopic[]
  discussed: ArchiveTopic[]
  topic?: ArchiveTopic | 'finish'
  turn: number
  draft?: number
  messages: { id: string; sender: 'player' | 'unknown'; text: string }[]
  pending: string[]
  finished: boolean
}
export type DiscussionAction =
  | { type: 'discover'; topic: ArchiveTopic }
  | { type: 'select'; topic: ArchiveTopic | 'finish' }
  | { type: 'draft'; index: number }
  | { type: 'send' | 'deliver' }

export const newDiscussion = (): DiscussionState => ({ discovered: [], discussed: [], turn: 0, messages: [], pending: [], finished: false })

/** Player selection never sends; each pending NPC bubble requires its own delivery. */
export function discussionAction(state: DiscussionState, action: DiscussionAction): DiscussionState {
  if (state.finished) return state
  if (action.type === 'discover') return state.discovered.includes(action.topic) ? state : { ...state, discovered: [...state.discovered, action.topic] }
  if (action.type === 'deliver') {
    if (!state.pending.length) return state
    const [text, ...pending] = state.pending
    return { ...state, pending, messages: [...state.messages, { id: `discussion-${state.messages.length}`, sender: 'unknown', text }] }
  }
  if (state.pending.length) return state
  if (action.type === 'select') {
    if (action.topic !== 'finish' && !state.discovered.includes(action.topic)) return state
    return { ...state, topic: action.topic, turn: 0, draft: undefined }
  }
  if (action.type === 'draft') {
    if (!state.topic || state.topic === 'finish' || !Number.isInteger(action.index) || action.index < 0 || action.index > 2) return state
    return { ...state, draft: action.index }
  }
  if (action.type === 'send') {
    if (state.topic === 'finish') {
      if (!state.discussed.length) return state
      return { ...state, finished: true, messages: [...state.messages, { id: `discussion-${state.messages.length}`, sender: 'player', text: "That's everything for now." }] }
    }
    if (!state.topic || state.draft === undefined) return state
    const topic = archiveDiscussions[state.topic], turn = topic.turns[state.turn]
    if (!turn) return state
    const nextTurn = state.turn + 1
    const complete = nextTurn === topic.turns.length
    return { ...state, draft: undefined, turn: complete ? 0 : nextTurn, topic: complete ? undefined : state.topic,
      discussed: complete ? [...new Set([...state.discussed, state.topic])] : state.discussed,
      messages: [...state.messages, { id: `discussion-${state.messages.length}`, sender: 'player', text: turn.choices[state.draft] }],
      pending: [...turn.replies[state.draft]] }
  }
  return state
}
