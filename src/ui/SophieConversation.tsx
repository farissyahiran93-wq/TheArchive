import { CharacterAvatar } from './CharacterAvatar'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { DanielNoteContent } from './DanielNoteContent'
import { ChevronLeft, LockKeyhole, Plus }  from 'lucide-react'
import { useGameStore } from '../game/store'
import './opening.css'

/** Read-only continuation of the consented first-contact transcript. */
export function SophieConversation({ onBack }: { onBack: () => void }) {
  const [noteOpen, setNoteOpen] = useState<'first' | 'full' | null>(null)
  const closePhoto = useRef<HTMLButtonElement>(null)
  useLayoutEffect(() => { if (noteOpen) closePhoto.current?.focus() }, [noteOpen])
  const prologue = useGameStore(state => state.save.prologue)
  const readOpening = useGameStore(state => state.readOpening)
  useEffect(() => { readOpening('sophie') }, [readOpening])
  return <section className="opening-screen opening-sophie-imessage" aria-label="Sophie Mercer iMessage conversation">
    <header className="opening-chat-header"><button className="icon-button bare" onClick={onBack} aria-label="Back to inbox"><ChevronLeft size={23}/></button><CharacterAvatar character="sophie" fallback="S" className="opening-avatar"/><div><strong>Sophie Mercer</strong><small>Number shared by Daniel · still unverified</small></div></header>
    <div className="opening-thread"><div className="opening-timestamp">FIRST CONTACT · 08:41</div>{prologue?.messages.map(message => <div key={message.id}><div className={`opening-bubble ${message.sender}`}>{message.text}</div>{prologue.dialogueVersion === 4 && message.id === 'OPEN-V4-FIRST-PAGE' && <button className="opening-v4-attachment" onClick={() => setNoteOpen('first')}><img src="/daniel-first-page.svg" alt="First page from Sophie"/><span>Photo · first page</span></button>}{prologue.dialogueVersion === 4 && message.id === 'OPEN-SOPHIE-NOTE' && <button className="opening-v4-attachment" onClick={() => setNoteOpen('full')}><img src="/daniel-note.svg" alt="Later handwritten note"/><span>Photo · handwritten note</span></button>}</div>)}{prologue?.noteSeen && prologue.dialogueVersion !== 4 && <button className="opening-attachment" onClick={() => setNoteOpen('full')}>Daniel's handwritten note - saved attachment</button>}</div>
    {noteOpen && <article className="opening-note" onKeyDown={event => {
      if (event.key === 'Escape') setNoteOpen(null)
      if (event.key === 'Tab') {
        const controls = event.currentTarget.querySelectorAll<HTMLElement>('button, summary')
        const first = controls[0], last = controls[controls.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
      }
    }} role="dialog" aria-modal="true" aria-label={noteOpen === 'first' ? 'First page photo' : 'Saved handwritten note'}><button className="opening-note-close" ref={closePhoto} onClick={() => setNoteOpen(null)}>Close photo</button>{noteOpen === 'first' ? <img className="opening-v4-full-photo" src="/daniel-first-page.svg" alt="Sophie — if I stop answering, use the number I gave you. Show them this page, not the originals."/> : <DanielNoteContent/>}</article>}
    <div className="imessage-preserved"><Plus size={20} aria-hidden="true"/><span className="imessage-pill">Conversation saved · read-only</span><LockKeyhole size={17} aria-hidden="true"/></div>
  </section>
}
