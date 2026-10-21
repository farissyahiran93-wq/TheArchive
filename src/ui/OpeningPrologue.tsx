import { CharacterAvatar } from './CharacterAvatar'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, CheckCircle2, FileImage, Fingerprint, LockKeyhole, MessageCircle, Send, ShieldQuestion, Smartphone } from 'lucide-react'
import { recoveryToken } from '../content/opening'
import { DanielNoteContent } from './DanielNoteContent'
import { groupChoices, openingChoices } from '../game/opening'
import { useGameStore } from '../game/store'
import { DanielMirror } from './DanielMirror'
import './opening.css'

export function OpeningPrologue({ onHome }: { onHome: () => void }) {
  const prologue = useGameStore(state => state.save.prologue)
  const reply = useGameStore(state => state.replySophie)
  const sendGroup = useGameStore(state => state.sendGroup)
  const readOpening = useGameStore(state => state.readOpening)
  const unreadGroup = useGameStore(state => state.save.notifications.some(item => item.id === 'OPEN-GROUP-ADD' && !item.read))
  const unreadSophie = useGameStore(state => state.save.notifications.some(item => item.id === 'OPEN-SECOND-SOPHIE-1' && !item.read))
  const readNote = useGameStore(state => state.readDanielNote)
  const inspect = useGameStore(state => state.inspectRecovery)
  const restore = useGameStore(state => state.restoreMirror)
  const complete = useGameStore(state => state.finishOpening)
  const [draft,setDraft] = useState<string | null>(null)
  const [noteOpen,setNoteOpen] = useState(false)
  const [reviewRecovery, setReviewRecovery] = useState(false)
  const threadRef = useRef<HTMLDivElement>(null)
  const nearLatest = useRef(true)
  const [jump, setJump] = useState(false)
  useLayoutEffect(() => {
    if (threadRef.current && nearLatest.current) threadRef.current.scrollTop = threadRef.current.scrollHeight
    else setJump(true)
  }, [prologue?.messages.length, prologue?.social?.messages.length])
  useLayoutEffect(() => {
    if (noteOpen) document.querySelector<HTMLButtonElement>('.opening-note-close')?.focus()
  }, [noteOpen])
  useEffect(() => {
    if (prologue?.stage === 'group' && unreadGroup) readOpening('group')
    if (prologue?.stage === 'chat' && unreadSophie) readOpening('sophie')
  }, [prologue?.stage, unreadGroup, unreadSophie, readOpening])
  if (!prologue) return null
  const stage = prologue.stage
  const choices = openingChoices(prologue)
  if (stage === 'group' && prologue.social) {
    const options = groupChoices(prologue)
    return <section className="opening-screen opening-group" aria-label="FIND DANIEL group conversation">
      <header className="opening-chat-header"><button className="icon-button bare" onClick={onHome} aria-label="Back"><ArrowLeft size={20}/></button><span className="opening-group-avatar">FD</span><div><strong>FIND DANIEL</strong><small>{prologue.social.members.filter(id => id !== 'player').map(id => id[0].toUpperCase() + id.slice(1)).join(', ')}</small></div><MessageCircle size={20}/></header>
      <div className="opening-thread" ref={threadRef} onScroll={() => { const el = threadRef.current; if (el) { nearLatest.current = el.scrollHeight - el.scrollTop - el.clientHeight < 70; if (nearLatest.current) setJump(false) } }}>
        <div className="opening-timestamp">Thursday 8 October · 08:44</div>
        {prologue.social.messages.map(message => message.sender === 'system' ? <div key={message.id} className="opening-group-system">{message.text}</div> : <div key={message.id} className={`opening-group-line ${message.sender === 'player' ? 'player' : ''}`}><strong>{message.sender === 'player' ? 'You' : message.sender[0].toUpperCase() + message.sender.slice(1)}</strong><div className={`opening-bubble ${message.sender === 'player' ? 'player' : 'sophie'}`}>{message.text}</div></div>)}
        {!!prologue.social.queue?.length && <div className="opening-bubble sophie" role="status" aria-label="Someone is typing">...</div>}
      </div>
      {jump && <button className="opening-jump" onClick={() => { nearLatest.current = true; setJump(false); threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight }) }}>Jump to latest</button>}
      <div className="opening-actions"><div className="opening-action-heading">{prologue.social.queue?.length ? 'Someone is typing…' : 'Reply to the group'}</div>{options.map(option => <button key={option.id} aria-pressed={draft === option.id} className={`opening-choice ${draft === option.id ? 'selected' : ''}`} onClick={() => setDraft(option.id)}>{option.text}</button>)}{options.length > 0 && <button className="opening-primary" disabled={!draft} onClick={() => { if (draft) sendGroup(draft); setDraft(null) }}><Send size={17}/> Send message</button>}</div>
    </section>
  }
  if (stage === 'chat' || stage === 'found' || (stage === 'recovery' && reviewRecovery)) return <section className="opening-screen" aria-label="Sophie Mercer first contact">
    <header className="opening-chat-header"><button className="icon-button bare" onClick={onHome} aria-label="Back"><ArrowLeft size={20}/></button><CharacterAvatar character="sophie" fallback="S" className="opening-avatar"/><div><strong>Sophie Mercer</strong><small>Unknown number · identity unverified</small></div><MessageCircle size={20}/></header>
    <div className="opening-thread" ref={threadRef} onScroll={() => { const el = threadRef.current; if (el) { nearLatest.current = el.scrollHeight - el.scrollTop - el.clientHeight < 70; if (nearLatest.current) setJump(false) } }}>
      <div className="opening-timestamp">Thursday 8 October · 08:41</div>
      {prologue.messages.map(message => <div key={message.id} className={`opening-bubble ${message.sender}`}>{message.text}</div>)}
      {prologue.step >= 1 && (prologue.dialogueVersion !== 3 || prologue.social?.phase === 'done') && !prologue.queue?.length && <button className="opening-attachment" onClick={() => setNoteOpen(value => !value)}><FileImage size={22}/><span><strong>Daniel's handwritten note</strong><small>Photo received from Sophie · source unverified</small></span><ArrowRight size={17}/></button>}
      {prologue.step >= 1 && (prologue.dialogueVersion !== 3 || prologue.social?.phase === 'done') && noteOpen && <article className="opening-note" role="dialog" aria-modal="true" aria-label="Daniel handwritten note photo" onKeyDown={event => {
        if (event.key === 'Escape') setNoteOpen(false)
        if (event.key === 'Tab') {
          const buttons = event.currentTarget.querySelectorAll<HTMLElement>('button, summary')
          const first = buttons[0], last = buttons[buttons.length - 1]
          if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
          else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
        }
      }}><button className="opening-note-close" onClick={() => setNoteOpen(false)}>Close photo</button><DanielNoteContent/>{!prologue.noteSeen ? <button onClick={() => { readNote(); setNoteOpen(false) }}><CheckCircle2 size={17}/> Save note to evidence</button> : <span className="opening-confirm"><CheckCircle2 size={16}/> Note saved · token identified</span>}</article>}
      {!!prologue.queue?.length && <div className="opening-bubble sophie" role="status" aria-label="Sophie is typing">...</div>}
    </div>
    {jump && <button className="opening-jump" onClick={() => { nearLatest.current = true; setJump(false); threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight }) }}>Jump to latest</button>}
    <div className="opening-actions">
      {stage === 'recovery' && <button className="opening-primary" onClick={() => setReviewRecovery(false)}>Review recovery offer</button>}
      <div className="opening-action-heading">{prologue.queue?.length ? 'Sophie is typing...' : stage === 'found' ? 'Your findings stay private until you Send' : prologue.step === 0 ? 'Choose your iMessage reply' : prologue.noteSeen ? 'Reply to Sophie' : 'Open the photo Sophie sent'}</div>
      {choices.map(option => <button key={option.id} aria-pressed={draft === option.id} className={`opening-choice ${draft === option.id ? 'selected' : ''}`} onClick={() => setDraft(option.id)}>{option.text}</button>)}
      {choices.length > 0 && <button className="opening-primary" disabled={!draft} onClick={() => { if (draft) reply(draft); setDraft(null) }}><Send size={17}/> Send message</button>}
      {prologue.step === 1 && !prologue.queue?.length && !prologue.noteSeen && (prologue.dialogueVersion !== 3 || prologue.social?.phase === 'done') && <p className="opening-help">Sophie is waiting. Read the note before replying.</p>}
      {stage === 'found' && !prologue.queue?.length && (prologue.beat === 'ready' || !prologue.dialogueVersion) && <><p className="opening-help">Compare the older Bus 4 preview and current Escort field yourself. The index count and Bus 4 difference remain separate, unverified observations. Maya has received no mirror evidence.</p><button className="opening-primary" onClick={complete}>Continue the investigation <ArrowRight size={17}/></button></>}
    </div>
  </section>
  if (stage === 'recovery') return <section className="opening-screen opening-recovery">
    <header className="opening-stage-top"><LockKeyhole size={18}/> SECURE RECOVERY SERVICE <small>UNVERIFIED ORIGIN</small></header>
    <div className="opening-stage-scroll"><div className="opening-center-icon"><Fingerprint size={50}/></div><h1>Recovery package available</h1><button className="opening-choice" onClick={() => setReviewRecovery(true)}>Not yet - review Sophie conversation</button><p>A protected snapshot associated with Daniel Mercer has been assigned to this fictional device.</p><div className="opening-properties"><span>Device owner</span><strong>DANIEL MERCER</strong><span>Assigned role</span><strong>EXTERNAL WITNESS</strong><span>Claimed recovery token</span><strong>{recoveryToken}</strong><span>Sender</span><strong className="opening-warning">UNVERIFIED</strong></div>
      {!prologue.offerInspected ? <button className="opening-primary" onClick={inspect}><ShieldQuestion size={18}/> Inspect permission & origin</button> : <><div className="opening-legal"><ShieldQuestion size={19}/><p>This is a simulated, read-only archive inside the game—not a real APK installation. No access to your contacts, actual email or phone files is requested. The token matches the note, but its sender is not authenticated.</p></div><button className="opening-primary" onClick={restore}><Smartphone size={18}/> Restore The Archive</button><p className="opening-help">Choose when to proceed. No background installation will occur.</p></>}
    </div>
  </section>
  if (stage === 'mirror') return <section className="opening-screen opening-mirror-stage"><DanielMirror opening onExit={onHome}/></section>
  return null
}
