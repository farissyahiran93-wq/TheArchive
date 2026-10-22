import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ArrowLeft, Send } from 'lucide-react'
import { type FollowupContact } from '../content/characterFollowups'
import { followupAvailable, followupChoices } from '../game/characterFollowups'
import { useGameStore } from '../game/store'
import { CharacterAvatar } from './CharacterAvatar'
import './opening-v4.css'

export function CharacterFollowupChat({ contact, onBack, readOnly = false }: { contact: FollowupContact; onBack: () => void; readOnly?: boolean }) {
  const save = useGameStore(state => state.save)
  const sendIntro = useGameStore(state => state.sendFollowupIntro)
  const sendChoice = useGameStore(state => state.sendFollowupChoice)
  const read = useGameStore(state => state.readFollowup)
  const [selected, setSelected] = useState<string | null>(null)
  const [newCount, setNewCount] = useState(0)
  const scroller = useRef<HTMLDivElement>(null)
  const nearEnd = useRef(true)
  const lines = save.messages.filter(message => (message.sender === contact || message.recipient === contact) && (!readOnly || !message.id.startsWith('OPEN-S02-')))
  const lastCount = useRef(lines.length)
  const label = contact[0].toUpperCase() + contact.slice(1)
  const pending = !readOnly && save.pendingEvents.some(event => event.id.startsWith(`ARC-E01-${contact.toUpperCase()}-`))
  const options = readOnly ? [] : followupChoices(save, contact)
  const allowed = followupAvailable(save, contact)

  useEffect(() => { if (nearEnd.current) read(contact) }, [contact, read, lines.length])
  useLayoutEffect(() => {
    const node = scroller.current
    if (!node) return
    const added = Math.max(0, lines.length - lastCount.current)
    if (nearEnd.current) { node.scrollTop = node.scrollHeight; setNewCount(0) }
    else if (added) setNewCount(value => value + added)
    lastCount.current = lines.length
  }, [lines.length, pending])

  return <section className="opening-screen opening-v4" aria-label={`${label} private conversation`}>
    <header className="opening-chat-header"><button className="icon-button bare" onClick={onBack} aria-label="Back to inbox"><ArrowLeft size={21}/></button><CharacterAvatar character={contact} fallback={label[0]} className="opening-avatar"/><div><strong>{contact === 'lucas' ? 'Lucas Grey' : contact === 'eli' ? 'Eli Ward' : 'Nora Vance'}</strong><small>{pending || options.length ? 'Online' : 'Offline'}</small></div></header>
    <div className="opening-thread" ref={scroller} onScroll={event => { const node = event.currentTarget; nearEnd.current = node.scrollHeight - node.scrollTop - node.clientHeight < 90; if (nearEnd.current) { setNewCount(0); read(contact) } }}>
      {lines.map(message => <div key={message.id} className={`conversation-line ${message.sender === 'player' ? 'outgoing' : 'incoming'}`}>{message.sender !== 'player' && <CharacterAvatar character={contact} fallback={label[0]} className="message-avatar"/>}<div className="conversation-body"><div className={`opening-bubble ${message.sender === 'player' ? 'player' : 'sophie'}`}>{message.text}</div></div></div>)}
      {pending && <div className="opening-v4-typing" role="status" aria-label={`${label} is typing`}><CharacterAvatar character={contact} fallback={label[0]} className="message-avatar"/><span className="typing-dots"><i/><i/><i/></span></div>}
    </div>
    {newCount > 0 && <button className="opening-jump" onClick={() => { if (scroller.current) scroller.current.scrollTop = scroller.current.scrollHeight; nearEnd.current = true; setNewCount(0); read(contact) }}>{newCount} new · Jump to latest</button>}
    {!readOnly && <div className="opening-actions opening-v4-composer">
      {allowed && !lines.length && <button className="opening-primary" onClick={() => sendIntro(contact)}><Send size={17}/> Send introduction</button>}
      {!!options.length && !pending && <><div className="opening-action-heading">Choose a reply</div>{options.map(option => <button key={option.id} className={`opening-choice ${selected === option.id ? 'selected' : ''}`} aria-pressed={selected === option.id} onClick={() => setSelected(option.id)}>{option.text}</button>)}<button className="opening-primary" disabled={!selected || !options.some(option => option.id === selected)} onClick={() => { if (!selected) return; sendChoice(contact, selected); setSelected(null) }}><Send size={17}/> Send</button></>}
      {!allowed && <span className="opening-v4-idle">This contact is not available on your current route.</span>}

    </div>}
  </section>
}
