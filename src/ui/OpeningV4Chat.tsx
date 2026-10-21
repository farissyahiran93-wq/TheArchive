import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ArrowLeft, Send } from 'lucide-react'
import { useGameStore } from '../game/store'
import { groupChoices, openingChoices } from '../game/opening'
import { groupFollowupOptions } from '../game/characterFollowups'
import { CharacterAvatar } from './CharacterAvatar'
import { DanielNoteContent } from './DanielNoteContent'
import './opening.css'
import './opening-v4.css'

export function OpeningV4Chat({ thread, onBack }: { thread: 'sophie' | 'group'; onBack: () => void }) {
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
  const [photo, setPhoto] = useState<'first' | 'full' | null>(null)
  const scroller = useRef<HTMLDivElement>(null)
  const nearEnd = useRef(true)
  const [newCount, setNewCount] = useState(0)
  const count = thread === 'group' ? opening?.social?.messages.length ?? 0 : opening?.messages.length ?? 0
  const queueLength = thread === 'group' ? opening?.social?.queue?.length ?? 0 : opening?.queue?.length ?? 0
  const lastCount = useRef(count)
  const closeButton = useRef<HTMLButtonElement>(null)

  useEffect(() => { if (nearEnd.current) read(thread) }, [read, thread, count])
  useLayoutEffect(() => {
    const node = scroller.current
    if (!node) return
    const added = Math.max(0, count - lastCount.current)
    if (nearEnd.current) { node.scrollTop = node.scrollHeight; setNewCount(0) }
    else if (added) setNewCount(value => value + added)
    lastCount.current = count
  }, [count, queueLength])
  useLayoutEffect(() => { if (photo) closeButton.current?.focus() }, [photo])

  if (!opening || opening.dialogueVersion !== 4) return null
  const group = thread === 'group'
  const lines = group ? opening.social?.messages ?? [] : opening.messages
  const queued = group ? opening.social?.queue ?? [] : opening.queue ?? []
  const typing = group ? opening.social?.queue?.[0]?.sender === 'system' ? null : opening.social?.queue?.[0]?.sender : opening.queue?.length ? 'sophie' : null
  const options = group ? opening.stage === 'group' ? groupChoices(opening) : groupFollowupOptions(save) : openingChoices(opening)
  const allowedOptions = options
  const fullNoteReady = !group && opening.social?.phase === 'done' && opening.messages.some(message => message.id === 'OPEN-SOPHIE-NOTE')
  const identified = save.deliveredEvents.some(id => id.startsWith('OPEN-V4-FIRST-ANSWER-'))
  const nameGate = !group && opening.v4Beat === 'name' && !queued.length && !save.player
  const sendTypedName = () => {
    const clean = name.trim().replace(/\s+/gu, ' ')
    if (!clean || clean.length > 40 || /[\p{Cc}\p{Cf}<>]/u.test(clean)) { setNameError('Enter a name of up to 40 characters without control symbols.'); return }
    sendName(clean); setName(''); setNameError('')
  }
  const jump = () => { const node = scroller.current; if (!node) return; node.scrollTop = node.scrollHeight; nearEnd.current = true; setNewCount(0); read(thread) }

  return <section className="opening-screen opening-v4" aria-label={group ? 'FIND DANIEL group conversation' : 'Unknown number conversation'}>
    <header className="opening-chat-header"><button className="icon-button bare" onClick={onBack} aria-label="Back to inbox"><ArrowLeft size={21}/></button>{group ? <span className="opening-group-avatar">FD</span> : identified ? <CharacterAvatar character="sophie" fallback="S" className="opening-avatar"/> : <span className="opening-group-avatar">?</span>}<div><strong>{group ? 'FIND DANIEL' : identified ? 'Sophie Mercer' : 'Unknown number'}</strong><small>{group ? (opening.social?.members.filter(id => id !== 'player').join(', ') || 'Group inactive') : 'Messages'}</small></div></header>
    <div className="opening-thread" ref={scroller} onScroll={event => { const node = event.currentTarget; nearEnd.current = node.scrollHeight - node.scrollTop - node.clientHeight < 90; if (nearEnd.current) { setNewCount(0); read(thread) } }}>
      <div className="opening-timestamp">Thursday 8 October · {group ? '08:44' : '08:41'}</div>
      {lines.map(message => <div key={message.id}>{message.sender === 'system' ? <div className="opening-group-system">{message.text}</div> : <div className={group ? `opening-group-line ${message.sender === 'player' ? 'player' : ''}` : ''}>{group && <strong>{message.sender === 'player' ? 'You' : message.sender[0].toUpperCase() + message.sender.slice(1)}</strong>}<div className={`opening-bubble ${message.sender === 'player' ? 'player' : 'sophie'}`}>{message.text}</div></div>}
        {!group && message.id === 'OPEN-V4-FIRST-PAGE' && <button className="opening-v4-attachment" onClick={() => setPhoto('first')} aria-label="Open first page photo from unknown number"><img src="/daniel-first-page.svg" alt="First page: Sophie, if I stop answering, use the number I gave you. Show them this page, not the originals."/><span>Photo · first page</span></button>}
        {!group && message.id === 'OPEN-SOPHIE-NOTE' && <button className="opening-v4-attachment" onClick={() => setPhoto('full')} aria-label="Open later handwritten note"><img src="/daniel-note.svg" alt="Later handwritten note with recovery wording"/><span>Photo · handwritten note</span></button>}
      </div>)}
      {typing && <div className="opening-v4-typing" role="status" aria-label={`${typing[0].toUpperCase() + typing.slice(1)} is typing`}><span className="typing-dots"><i/><i/><i/></span><span>{typing[0].toUpperCase() + typing.slice(1)} is typing…</span></div>}
    </div>
    {newCount > 0 && <button className="opening-jump" onClick={jump}>{newCount} new {newCount === 1 ? 'message' : 'messages'} · Jump to latest</button>}
    <div className="opening-actions opening-v4-composer">
      {nameGate && <form onSubmit={event => { event.preventDefault(); sendTypedName() }}><label htmlFor="chat-display-name">Your name</label><div className="opening-v4-name-row"><input id="chat-display-name" autoComplete="name" maxLength={40} value={name} onChange={event => { setName(event.target.value); setNameError('') }} placeholder="Type your name…"/><button className="opening-primary" type="submit" disabled={!name.trim()}><Send size={16}/> Send</button></div>{nameError && <p role="alert">{nameError}</p>}</form>}
      {!!allowedOptions.length && !nameGate && <><div className="opening-action-heading">Choose a reply</div>{allowedOptions.map(option => <button key={option.id} aria-pressed={selected === option.id} className={`opening-choice ${selected === option.id ? 'selected' : ''}`} onClick={() => setSelected(option.id)}>{option.text}</button>)}<button className="opening-primary" disabled={!selected || !allowedOptions.some(item => item.id === selected)} onClick={() => { if (!selected) return; if (group) sendGroup(selected); else reply(selected); setSelected(null) }}><Send size={17}/> Send</button></>}
      {fullNoteReady && !opening.noteSeen && !queued.length && <button className="opening-choice" onClick={readNote}>Save the later note to your private evidence</button>}
      {!group && opening.stage === 'found' && opening.beat === 'ready' && !queued.length && <button className="opening-primary" onClick={finish}>Close chat and keep investigating</button>}
      {!nameGate && !allowedOptions.length && !fullNoteReady && <span className="opening-v4-idle">{typing ? 'Waiting for a reply…' : group ? 'No one is writing in this group right now.' : 'You can keep using your phone.'}</span>}
    </div>
    {photo && <div className="settings-dialog-backdrop" onKeyDown={event => { if (event.key === 'Escape') setPhoto(null) }}><div className="photo-viewer" role="dialog" aria-modal="true" aria-label={photo === 'first' ? 'First page photo' : 'Later handwritten note'}><button className="opening-note-close" ref={closeButton} onClick={() => setPhoto(null)}>Close photo</button>{photo === 'first' ? <img className="opening-v4-full-photo" src="/daniel-first-page.svg" alt="Sophie — if I stop answering, use the number I gave you. Show them this page, not the originals."/> : <DanielNoteContent/>}</div></div>}
  </section>
}
