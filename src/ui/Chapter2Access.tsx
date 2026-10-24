import { ChatProfile } from './ChatProfile'
import { chatGroup } from './chatGrouping'
import { ContinuationLinks,ContinuationPanel } from './Chapter2Continuation'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ArrowLeft, Send, X } from 'lucide-react'
import { accessChoices } from '../game/chapter2Access'
import { DanielLifePhone } from './DanielLifePhone'
import { accessGroupLines, accessNodes, accessPackageQuestions, accessPlayerLines } from '../content/chapter2Access'
import { useGameStore } from '../game/store'
import { CharacterAvatar } from './CharacterAvatar'
import { openingPresence } from '../game/phonePresentation'
import './chapter2-access.css'

export function AccessChat({ group = false, onBack }: { group?: boolean; onBack: () => void }) {
  const save = useGameStore(s => s.save)
  const act = useGameStore(s => s.accessAction)
  const c = save.chapter2Access!
  const [selected, select] = useState(c.draft?.option ?? '')
  const [ask, setAsk] = useState(false)
  const [inspectDeclined, setInspectDeclined] = useState(false)
  const [confirmation, confirm] = useState(false)
  const scroller = useRef<HTMLDivElement>(null)
  const nearEnd = useRef(true)
  const [behind, setBehind] = useState(false)
  const old = group ? save.prologue?.scene01?.groupMessages ?? [] : []
  const lines = group ? [...old, ...c.groupMessages] : [...c.messages, ...(save.chapter1?.sender.messages??[])].sort((a,b)=>a.at-b.at)
  const count = lines.length
  useEffect(() => { act({ type: group ? 'open-group' : 'open-unknown' }) }, [act, group, count])
  useLayoutEffect(() => { if (nearEnd.current && scroller.current) scroller.current.scrollTop = scroller.current.scrollHeight; else setBehind(true) }, [count, c.queue?.id])
  const options = group ? [] : accessChoices(save)
  const packageVisible = !group && (c.node === 'PACKAGE' || c.node === 'DECLINED' && inspectDeclined) && !c.queue && !c.installAuthorized
  const questionTexts = accessPackageQuestions
  const typing = c.queue && (group ? c.queue.id.startsWith('C2-GROUP-') : accessNodes[c.queue.id]?.kind === 'npc')
  const actor = group && c.queue?.id.startsWith('C2-GROUP-') ? accessGroupLines[Number(c.queue.id.slice(9))]?.sender ?? 'maya' : 'unknown'
  const send = () => {
    nearEnd.current = true
    if (options.some(o => o.id === selected)) act({ type: 'send', id: selected })
    else if (selected === 'accept') confirm(true)
    else if (selected === 'reject') act({ type: 'decline' })
    else if (selected === 'ask') setAsk(true)
    else if (selected.startsWith('U07Q_')) { act({ type: 'question', id: selected }); setAsk(false) }
    else if (selected === 'R_A' || selected === 'R_B') act({ type: 'failed-reply', id: selected })
    select('')
  }
  const choice = (id: string, text: string, disabled = false) => <button key={id} className={`opening-choice ${selected === id ? 'selected' : ''}`} aria-pressed={selected === id} disabled={disabled} onClick={() => { select(id); if (options.some(o => o.id === id)) act({ type: 'draft', id }) }}>{text}</button>
  const hasFailed = c.messages.some(m => m.id === 'C2-FAILED-REPLY')
  const hasChoices = options.length > 0 || packageVisible || !group && c.unknownOffline && !hasFailed
  return <section className="opening-screen opening-v4 scene01-chat" aria-label={group ? 'FIND DANIEL group conversation' : 'UNKNOWN conversation'} data-access-node={c.node}>
    <header className="opening-chat-header"><button className="icon-button bare" aria-label="Back to inbox" onClick={onBack}><ArrowLeft size={21}/></button><CharacterAvatar character={group ? 'group' : 'unknown'} fallback={group ? 'FD' : '?'} className="opening-avatar"/><div><strong>{group ? 'FIND DANIEL' : 'UNKNOWN'}</strong><small>{group ? `${save.player?.name?.trim() || 'You'}, Sophie, Maya, Lucas, Eli, Nora` : 'Number unavailable · Identity unverified'}</small>{!group && <small>{c.unknownOffline ? 'Offline' : 'Online'}</small>}</div><ChatProfile contact={group ? 'group' : 'unknown'}/></header>
    <div className="opening-thread" ref={scroller} onScroll={e => { const el = e.currentTarget; nearEnd.current = el.scrollHeight-el.scrollTop-el.clientHeight < 80; if (nearEnd.current) setBehind(false) }}>
      {lines.map((line, index) => line.sender === 'system' ? <div key={line.id} className="opening-group-system">{line.text}</div> : <div key={line.id} className={`conversation-line ${line.sender === 'player' ? 'outgoing' : 'incoming'} ${chatGroup(lines, index).className}`}>{line.sender !== 'player' && chatGroup(lines, index).last && <span className="chat-contact-avatar"><CharacterAvatar character={line.sender} fallback={line.sender === 'unknown' ? '?' : line.sender[0].toUpperCase()} className="message-avatar"/>{(group ? openingPresence(save, line.sender) === 'online' : !c.unknownOffline) && <i className="presence-dot" aria-label={`${line.sender} online`}/>}</span>}<div className="conversation-body">{group && line.sender !== 'player' && chatGroup(lines, index).first && <strong className="group-sender">{line.sender[0].toUpperCase()+line.sender.slice(1)}</strong>}<div className={`opening-bubble ${line.sender === 'player' ? 'player' : 'sophie'}`}>{line.text}</div></div></div>)}
      {!group && c.packageStatus && <article className="access-package"><small>INCOMING ACCESS PACKAGE</small><strong>REMOTE ACCESS EXTENSION</strong><code>archive://session/access-02</code><p>Target: THE ARCHIVE<br/>Sender: UNVERIFIED<br/>Package signature: UNKNOWN</p><p>Installation source cannot be authenticated.</p><b>{c.installCompleted ? 'ACCESS EXTENSION INSTALLED' : c.installAuthorized ? 'Preparing session...' : c.packageStatus === 'declined' ? 'ACCESS DECLINED — NO CHANGES MADE.' : 'PACKAGE AVAILABLE'}</b>{c.packageStatus === 'declined' && <button className="opening-choice" onClick={() => { setAsk(false); setInspectDeclined(true); select('') }}>Inspect package again</button>}</article>}
      {typing && <div className="opening-v4-typing" role="status" aria-label={`${actor === 'unknown' ? 'Unknown' : actor} is typing`}><CharacterAvatar character={actor} fallback={actor === 'unknown' ? '?' : actor[0].toUpperCase()} className="message-avatar"/><span className="typing-dots"><i/><i/><i/></span></div>}
      {!group && c.unknownOffline && <div className="presence-event">Unknown is offline.</div>}
    </div>
    {behind && <button className="opening-jump" onClick={() => { nearEnd.current = true; setBehind(false); if (scroller.current) scroller.current.scrollTop = scroller.current.scrollHeight }}>New messages · Jump to latest</button>}
    {!!hasChoices && <div className="opening-actions opening-v4-composer"><div className="scene01-options">
      {options.map(o => choice(o.id, o.text))}
      {packageVisible && !ask && <>{choice('accept', c.packageStatus === 'declined' ? 'ACCEPT PACKAGE' : 'ACCEPT — Open access package')}{c.packageStatus !== 'declined' ? <>{choice('reject', 'REJECT — Decline the package')}{choice('ask', 'Ask one more question')}</> : <button className="opening-choice" onClick={() => { select(''); onBack() }}>KEEP DECLINED</button>}</>}
      {packageVisible && ask && <>{Object.entries(questionTexts).map(([id, text]) => choice(id, text, c.questionsAsked.includes(id)))}<button className="opening-choice" onClick={() => { setAsk(false); select('') }}>Back to package</button></>}
      {!group && c.unknownOffline && !hasFailed && <>{choice('R_A', accessPlayerLines.R_A)}{choice('R_B', accessPlayerLines.R_B)}<button className="opening-choice" onClick={() => { select(''); onBack() }}>Don't send anything</button></>}
    </div><button className="opening-primary" disabled={!selected} onClick={send}><Send size={17}/> Send</button></div>}
    {confirmation && <div className="access-modal" role="dialog" aria-modal="true" aria-label="Install extension confirmation"><div><h2>Install extension?</h2><p>The sender and package signature cannot be verified. This extends access to the local recovered dataset and Messages interface.</p><button className="opening-primary" onClick={() => { confirm(false); act({ type: 'confirm-install' }) }}>INSTALL EXTENSION</button><button className="opening-choice" onClick={() => confirm(false)}>CANCEL</button></div></div>}
  </section>
}

export function RelaySheet({ onClose }: { onClose: () => void }) {
  const available=useGameStore(s=>s.save.chapter2Access?.relayAvailable)
  return <div className="access-modal" role="dialog" aria-modal="true" aria-label="SPY MODE"><div><button className="icon-button bare" aria-label="Close relay status" onClick={onClose}><X size={20}/></button><h2>SPY MODE</h2><p>Installed in Messages</p><strong>Relay: {available?'AVAILABLE':'STANDBY'}</strong><p>{available?'A limited intercepted thread is available in Messages. Opening it is your choice.':'This feature can reveal limited recovered message layers when a compatible relay is available. Nothing is currently being intercepted.'}</p><button className="opening-primary" onClick={onClose}>GOT IT</button></div></div>
}

export function AccessInstallation() {
  return <div className="access-takeover" role="status" aria-live="polite"><small>SESSION CONTROL TRANSFER</small><h2>THE ARCHIVE</h2><strong>REMOTE ACCESS EXTENSION</strong><p>Synchronizing session</p><pre>Checking local archive ........ OK{'\n'}Resolving session key ......... OK{'\n'}Loading device mirror ......... OK{'\n'}Extending message interface ... OK{'\n'}Registering passive relay ..... OK</pre></div>
}

export function AccessArchive({ onHome }: { onHome: () => void }) {
  const c = useGameStore(s => s.save.chapter2Access)
  const act = useGameStore(s => s.accessAction)
  const [page, setPage] = useState<'archive' | 'intro' | 'mirror'>('archive')
  const [relay, setRelay] = useState(false)
  if(c?.story?.continuation?.panel)return <ContinuationPanel/>
  if (page === 'mirror' && c?.mirrorOpened) return <DanielLifePhone onExit={() => setPage('archive')}/>
  return <section className="access-archive" aria-label="The Archive access extension">
    <header className="opening-chat-header"><button className="icon-button bare" aria-label={page === 'archive' ? 'Back to home' : 'Back to The Archive'} onClick={() => page === 'archive' ? onHome() : setPage('archive')}><ArrowLeft size={21}/></button><div><strong>THE ARCHIVE</strong><small>{c?.installCompleted ? 'ACCESS: EXPANDED' : 'ACCESS: INACTIVE'}</small></div></header>
    <div className="access-content">{!c?.installCompleted ? <><h2>The Archive</h2><p>Access extension not activated.</p><p>No device mirror is available.</p></> : page === 'archive' ? <><h2>Daniel Mercer's Phone</h2><ContinuationLinks/><p>Mirrored dataset · Partially indexed</p><p>Access available</p><p>Content may be incomplete. Changes made in this mirror do not affect the original device.</p><button className="opening-primary" onClick={() => setPage('intro')}>OPEN PHONE MIRROR</button><button className="opening-choice" onClick={() => setRelay(true)}>RELAY MONITOR · {c?.relayAvailable?'AVAILABLE':'STANDBY'}</button><p>SESSION SOURCE: UNVERIFIED</p></> : <><h2>Daniel Mercer</h2><p>Dataset: MIRROR/02<br/>Device: NOT CONNECTED</p><p>This is a reconstruction of recovered records, not a connection to Daniel's physical phone.</p><p>Source integrity: UNVERIFIED</p><p>Recovered entries may be incomplete, reordered or outdated.</p><button className="opening-primary" onClick={() => {act({type:'open-mirror'});setPage('mirror')}}>ENTER MIRROR</button></>}</div>
    {relay&&<RelaySheet onClose={() => setRelay(false)}/>}
  </section>
}
