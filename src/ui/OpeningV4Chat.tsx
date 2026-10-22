import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ArrowLeft, Send } from 'lucide-react'
import { useGameStore } from '../game/store'
import { groupChoices, openingChoices } from '../game/opening'
import { groupFollowupOptions } from '../game/characterFollowups'
import { CharacterAvatar } from './CharacterAvatar'
import { ChatPhotoViewer } from './ChatPhotoViewer'
import { openingPresence } from '../game/phonePresentation'
import { useCaseNavigation } from './CaseNavigation'
import './opening.css'
import './opening-v4.css'

export function OpeningV4Chat({ thread, onBack }: { thread: 'sophie' | 'group'; onBack: () => void }) {
  const navigation = useCaseNavigation()
  const save = useGameStore(state => state.save)
  const opening = save.prologue
  const reply = useGameStore(state => state.replySophie)
  const sendGroup = useGameStore(state => state.sendGroup)
  const sendName = useGameStore(state => state.sendOpeningName)
  const read = useGameStore(state => state.readOpening)
  const readNote = useGameStore(state => state.readDanielNote)
  const finish = useGameStore(state => state.finishOpening)
  const [selected, setSelected] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [nameError, setNameError] = useState('')
  const [photo, setPhoto] = useState(false)
  const scroller = useRef<HTMLDivElement>(null)
  const nearEnd = useRef(true)
  const [newCount, setNewCount] = useState(0)
  const count = thread === 'group' ? opening?.social?.messages.length ?? 0 : opening?.messages.length ?? 0
  const queueLength = thread === 'group' ? opening?.social?.queue?.length ?? 0 : opening?.queue?.length ?? 0
  const lastCount = useRef(count)

  useEffect(() => { if (nearEnd.current) read(thread) }, [read, thread, count])
  useLayoutEffect(() => {
    const node = scroller.current
    if (!node) return
    const added = Math.max(0, count - lastCount.current)
    if (nearEnd.current) { node.scrollTop = node.scrollHeight; setNewCount(0) }
    else if (added) setNewCount(value => value + added)
    lastCount.current = count
  }, [count, queueLength])

  if (!opening || opening.dialogueVersion !== 4) return null
  const group = thread === 'group'
  const lines = (group ? opening.social?.messages ?? [] : opening.messages).filter(message => message.id !== 'OPEN-V4-FIRST-PAGE')
  const queued = group ? opening.social?.queue ?? [] : opening.queue ?? []
  const typing = group ? opening.social?.queue?.[0]?.sender === 'system' ? null : opening.social?.queue?.[0]?.sender : opening.queue?.length ? 'sophie' : null
  const options = group ? opening.stage === 'group' ? groupChoices(opening) : groupFollowupOptions(save) : openingChoices(opening)
  const presence = openingPresence(save, 'sophie')
  const onlineMembers = opening.social?.members.filter(id => id !== 'player' && openingPresence(save, id) === 'online') ?? []
  const lastNpc = group ? [...lines].reverse().find(line => line.sender !== 'player' && line.sender !== 'system')?.sender : undefined
  const allowedOptions = options
  const fullNoteReady = !group && opening.social?.phase === 'done' && opening.messages.some(message => message.id === 'OPEN-SOPHIE-NOTE')
  const identified = save.deliveredEvents.some(id => id.startsWith('OPEN-V4-FIRST-ANSWER-')) || opening.flow === 'mirror-first' && opening.restored
  const nameGate = !group && opening.v4Beat === 'name' && !queued.length && !save.player
  const sendTypedName = () => {
    const clean = name.trim().replace(/\s+/gu, ' ')
    if (!clean || clean.length > 40 || /[\p{Cc}\p{Cf}<>]/u.test(clean)) { setNameError('Enter a name of up to 40 characters without control symbols.'); return }
    sendName(clean); setName(''); setNameError('')
  }
  const jump = () => { const node = scroller.current; if (!node) return; node.scrollTop = node.scrollHeight; nearEnd.current = true; setNewCount(0); read(thread) }

  return <section className="opening-screen opening-v4" aria-label={group ? 'FIND DANIEL group conversation' : 'Unknown number conversation'}>
    <header className="opening-chat-header"><button className="icon-button bare" onClick={onBack} aria-label="Back to inbox"><ArrowLeft size={21}/></button>{group ? <span className="opening-group-avatar">FD</span> : <span className="chat-contact-avatar">{identified ? <CharacterAvatar character="sophie" fallback="S" className="opening-avatar"/> : <span className="opening-group-avatar">?</span>}{presence === 'online' && <i className="presence-dot" aria-label="Online"/>}</span>}<div><strong>{group ? 'FIND DANIEL' : identified ? 'Sophie Mercer' : 'Unknown number'}</strong><small>{group ? `${opening.social?.members.length ?? 0} members${onlineMembers.length ? ` · ${onlineMembers.length} online` : ' · Offline'}` : presence === 'online' ? 'Online' : 'Offline'}</small></div></header>
    <div className="opening-thread" ref={scroller} onScroll={event => { const node = event.currentTarget; nearEnd.current = node.scrollHeight - node.scrollTop - node.clientHeight < 90; if (nearEnd.current) { setNewCount(0); read(thread) } }}>
      <div className="opening-timestamp">Thursday 8 October · {group ? '08:44' : '08:41'}</div>
      {lines.map(message => message.sender === 'system' ? <div key={message.id} className="opening-group-system">{message.text}</div> : <div className={`conversation-line ${message.sender === 'player' ? 'outgoing' : 'incoming'}`} key={message.id}>
        {message.sender !== 'player' && <CharacterAvatar character={group || identified ? message.sender : 'unknown'} fallback={group || identified ? message.sender[0].toUpperCase() : '?'} className="message-avatar"/>}
        <div className="conversation-body">{group && message.sender !== 'player' && <strong className="group-sender">{message.sender[0].toUpperCase() + message.sender.slice(1)}</strong>}<div className={`opening-bubble ${message.sender === 'player' ? 'player' : 'sophie'}`}>{message.text}</div>
        {!group && message.id === 'OPEN-SOPHIE-NOTE' && <button className="chat-attachment" onClick={() => setPhoto(true)} aria-label="Open later handwritten note"><img src="/daniel-note.svg" alt="Handwritten note from Sophie"/></button>}</div>
      </div>)}
      {typing && <div className="opening-v4-typing" role="status" aria-label={`${typing[0].toUpperCase() + typing.slice(1)} is typing`}><CharacterAvatar character={group || identified ? typing : 'unknown'} fallback={group || identified ? typing[0].toUpperCase() : '?'} className="message-avatar"/><span className="typing-dots"><i/><i/><i/></span></div>}
      {!typing && group && lastNpc && openingPresence(save, lastNpc) === 'offline' && <div className="presence-event">{lastNpc[0].toUpperCase() + lastNpc.slice(1)} is offline.</div>}
      {!typing && !group && presence === 'offline' && <div className="presence-event">{identified ? 'Sophie' : 'Unknown number'} is offline.</div>}
    </div>
    {newCount > 0 && <button className="opening-jump" onClick={jump}>{newCount} new {newCount === 1 ? 'message' : 'messages'} · Jump to latest</button>}
    <div className="opening-actions opening-v4-composer">
      {nameGate && <form onSubmit={event => { event.preventDefault(); sendTypedName() }}><label htmlFor="chat-display-name">Your name</label><div className="opening-v4-name-row"><input id="chat-display-name" autoComplete="name" maxLength={40} value={name} onChange={event => { setName(event.target.value); setNameError('') }} placeholder="Type your name…"/><button className="opening-primary" type="submit" disabled={!name.trim()}><Send size={16}/> Send</button></div>{nameError && <p role="alert">{nameError}</p>}</form>}
      {!!allowedOptions.length && !nameGate && <><div className="opening-action-heading">Choose a reply</div>{allowedOptions.map(option => <button key={option.id} aria-pressed={selected === option.id} className={`opening-choice ${selected === option.id ? 'selected' : ''}`} onClick={() => setSelected(option.id)}>{option.text}</button>)}<button className="opening-primary" disabled={!selected || !allowedOptions.some(item => item.id === selected)} onClick={() => { if (!selected) return; if (group) sendGroup(selected); else reply(selected); setSelected(null) }}><Send size={17}/> Send</button></>}
      {fullNoteReady && !opening.noteSeen && !queued.length && <button className="opening-choice" onClick={readNote}>Save the later note to your private evidence</button>}
      {!group && opening.stage === 'found' && opening.beat === 'ready' && !queued.length && <button className="opening-primary" onClick={() => { finish(); if (opening.recoverySequence) navigation.openArchive() }}>Close chat and keep investigating</button>}

    </div>
    {photo && <ChatPhotoViewer src="/daniel-note.svg" alt="Handwritten note from Sophie" onClose={() => setPhoto(false)}/>}

  </section>
}
