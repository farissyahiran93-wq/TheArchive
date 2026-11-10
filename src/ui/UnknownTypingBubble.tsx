import { CharacterAvatar } from './CharacterAvatar'

export function UnknownTypingBubble() {
  return <div className="opening-v4-typing unknown-typing" role="status" aria-label="Unknown is typing">
    <CharacterAvatar character="unknown" className="message-avatar" />
    <span className="typing-dots" aria-hidden="true"><i /><i /><i /></span>
  </div>
}
