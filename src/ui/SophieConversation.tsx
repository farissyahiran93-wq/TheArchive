import { useEffect, useState } from 'react'
import { ChevronLeft } from 'lucide-react'
import { CharacterAvatar } from './CharacterAvatar'
import { ChatPhotoViewer } from './ChatPhotoViewer'
import { useGameStore } from '../game/store'
import './opening.css'

/** Preserved history; opening the attachment does not grant or share evidence. */
export function SophieConversation({ onBack }: { onBack: () => void }) {
  const [noteOpen, setNoteOpen] = useState(false)
  const prologue = useGameStore(state => state.save.prologue)
  const readOpening = useGameStore(state => state.readOpening)
  useEffect(() => { readOpening('sophie') }, [readOpening])
  return <section className="opening-screen" aria-label="Sophie Mercer conversation history">
    <header className="opening-chat-header"><button className="icon-button bare" onClick={onBack} aria-label="Back to inbox"><ChevronLeft size={23}/></button><CharacterAvatar character="sophie" fallback="S" className="opening-avatar"/><div><strong>Sophie Mercer</strong><small>Offline</small></div></header>
    <div className="opening-thread"><div className="opening-timestamp">Thursday 8 October</div>{prologue?.messages.filter(message => message.id !== 'OPEN-V4-FIRST-PAGE').map(message => <div key={message.id} className={`conversation-line ${message.sender === 'player' ? 'outgoing' : 'incoming'}`}>{message.sender !== 'player' && <CharacterAvatar character="sophie" fallback="S" className="message-avatar"/>}<div className="conversation-body"><div className={`opening-bubble ${message.sender}`}>{message.text}</div>{message.id === 'OPEN-SOPHIE-NOTE' && <button className="chat-attachment" onClick={() => setNoteOpen(true)} aria-label="Open later handwritten note"><img src="/daniel-note.svg" alt="Handwritten note from Sophie"/></button>}</div></div>)}<div className="presence-event">Sophie is offline.</div></div>
    {noteOpen && <ChatPhotoViewer src="/daniel-note.svg" alt="Handwritten note from Sophie" onClose={() => setNoteOpen(false)}/>}
  </section>
}
