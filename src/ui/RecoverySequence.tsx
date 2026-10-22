import { useLayoutEffect, useRef, useState } from 'react'
import { ArrowLeft, Send } from 'lucide-react'
import { recoveryCards, recoveryHints } from '../content/recoverySequence'
import { recoveryReplyOptions } from '../game/recoverySequence'
import { useGameStore } from '../game/store'
import { CharacterAvatar } from './CharacterAvatar'
import { useCaseNavigation } from './CaseNavigation'
import './recovery-sequence.css'

export function RecoverySequence({ onExit }: { onExit?: () => void }) {
  const store = useGameStore()
  const navigation = useCaseNavigation()
  const recovery = store.save.prologue?.recoverySequence
  const [selected, setSelected] = useState<string | null>(null)
  const [card, setCard] = useState<number | null>(null)
  const scroll = useRef<HTMLDivElement>(null)
  const nearEnd = useRef(true)
  const lastBeat = useRef(recovery?.beat)
  const [behind, setBehind] = useState(false)
  useLayoutEffect(() => {
    if (lastBeat.current !== recovery?.beat) nearEnd.current = true
    lastBeat.current = recovery?.beat
    if (nearEnd.current && scroll.current) { scroll.current.scrollTop = scroll.current.scrollHeight; setBehind(false) }
    else setBehind(true)
  }, [recovery?.messages.length, recovery?.queue.length, recovery?.beat])
  if (!recovery) return null
  const options = recoveryReplyOptions(store.save)
  const puzzleReady = !store.save.prologue?.referenceStarted && !!store.save.choices['OPEN-RELAY-source'] && (!recovery.queue.length || recovery.restored)
  return <section className="opening-screen recovery-sequence" aria-label="MIRROR recovery session">
    <header className="opening-chat-header"><button className="icon-button bare" onClick={onExit} aria-label="Leave recovery session"><ArrowLeft size={20}/></button><div><strong>MIRROR / RECOVERY</strong><small>Read only · Source unverified</small></div></header>
    <div className="opening-thread" ref={scroll} onScroll={event => { const node = event.currentTarget; nearEnd.current = node.scrollHeight - node.scrollTop - node.clientHeight < 90; if (nearEnd.current) setBehind(false) }}>
      <p className="recovery-caption">Recovered channel · {store.save.choices['OPEN-RELAY-identity'] ? 'Relay (alias)' : 'Unknown'}</p>
      {recovery.messages.map(message => <div className={`conversation-line ${message.sender === 'player' ? 'outgoing' : 'incoming'}`} key={message.id}>{message.sender !== 'player' && <CharacterAvatar character="unknown" fallback="?" className="message-avatar"/>}<div className="conversation-body"><div className={`opening-bubble ${message.sender === 'player' ? 'player' : 'sophie'}`}>{message.text}</div></div></div>)}
      {!!recovery.queue.length && <div role="status" aria-label="Relay is typing" className="opening-v4-typing"><CharacterAvatar character="unknown" fallback="?" className="message-avatar"/><span className="typing-dots"><i/><i/><i/></span></div>}
      {puzzleReady && <article className="recovery-puzzle" aria-label="Deleted Chat Reconstruction">
        <h1>Fragment 001</h1><p>D.M. / UNKNOWN · 4 recovered entries · Identity unverified</p>
        <p>{recovery.restored ? 'Reply sequence restored. This does not authenticate the words or their author.' : 'Select two records to swap them. Follow the surviving reply references; timestamps are unavailable.'}</p>
        <ol className="recovery-cards">{recovery.order.map((id, index) => { const item = recoveryCards.find(candidate => candidate.id === id)!; return <li key={id}><button disabled={recovery.restored} className={`opening-choice ${card === index ? 'selected' : ''}`} aria-pressed={card === index} aria-label={`Slot ${index + 1}: ${item.text}`} onClick={() => { if (card === null) setCard(index); else { store.swapRecoveryCards(card, index); setCard(null) } }}><small>Slot {index + 1} · {item.speaker}</small><span>{item.text}</span><small>Trace: {item.trace}</small></button></li> })}</ol>
        {!recovery.restored && <><p>Attempts: {recovery.attempts}</p><div className="recovery-tools"><button className="opening-primary" onClick={() => { store.verifyRecovery(); setCard(null) }}>Verify Reconstruction</button><button className="opening-choice" disabled={recovery.hints >= recoveryHints.length} onClick={store.hintRecovery}>Request Hint</button><button className="opening-choice" onClick={() => { store.resetRecovery(); setCard(null) }}>Reset arrangement</button>{recovery.attempts >= 4 && !recovery.assisted && <button className="opening-choice" onClick={() => { store.assistRecovery(); setCard(null) }}>Assisted Reconstruction</button>}</div></>}
        {!!recovery.hints && <aside aria-label="Recovery hints">{recoveryHints.slice(0, recovery.hints).map(hint => <p key={hint}>{hint}</p>)}</aside>}
        {recovery.feedback && <p role="status">{recovery.feedback}</p>}
        {recovery.restored && <button className="opening-choice" disabled={!!store.save.evidence['OPEN-RECOVERED-CHAT-001']} onClick={store.retainRecovery}>{store.save.evidence['OPEN-RECOVERED-CHAT-001'] ? 'Saved privately · Unverified' : 'Save recovered conversation privately'}</button>}
      </article>}
    </div>
    {behind && <button className="opening-jump" onClick={() => { nearEnd.current = true; setBehind(false); if (scroll.current) scroll.current.scrollTop = scroll.current.scrollHeight }}>Jump to latest</button>}
    {store.save.prologue?.stage === 'found' && recovery.beat === 'done' && !recovery.queue.length && <div className="opening-actions"><button className="opening-primary" onClick={navigation.openSophie}>Open Sophie's message</button></div>}
    {!!options.length && <div className="opening-actions"><div className="opening-action-heading">Choose a reply</div>{options.map(option => <button className={`opening-choice ${selected === option.id ? 'selected' : ''}`} key={option.id} aria-pressed={selected === option.id} onClick={() => setSelected(option.id)}>{option.text}</button>)}<button className="opening-primary" disabled={!options.some(option => option.id === selected)} onClick={() => { if (selected) store.sendRecoveryReply(selected); setSelected(null) }}><Send size={17}/> Send</button></div>}
  </section>
}
