import { playtestEnabled } from '../game/playtest'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ArrowLeft, Send, Star } from 'lucide-react'
import { useGameStore } from '../game/store'
import { scene01Choices, scene01Text } from '../game/scene01'
import { scene01Nodes } from '../content/scene01'
import { openingPresence } from '../game/phonePresentation'
import { CharacterAvatar } from './CharacterAvatar'
import { useCaseNavigation } from './CaseNavigation'
import './opening.css'
import './opening-v4.css'

export function Scene01Chat({ thread, onBack }: { thread: 'sophie' | 'group'; onBack: () => void }) {
  const save = useGameStore(state => state.save)
  const scene = save.prologue?.scene01
  const send = useGameStore(state => state.sendScene01)
  const invitation = useGameStore(state => state.scene01Invitation)
  const read = useGameStore(state => state.readOpening)
  const openPrivate = useGameStore(state => state.openSophiePrivate)
  const pausePrivate = useGameStore(state => state.pauseSophiePrivate)
  const draftPrivate = useGameStore(state => state.draftSophiePrivate)
  const navigation = useCaseNavigation()
  const [selected, setSelected] = useState<string | null>(null)
  const [name, setName] = useState(save.player?.name ?? '')
  const [error, setError] = useState('')
  const scroller = useRef<HTMLDivElement>(null)
  const nearEnd = useRef(true)
  const [behind, setBehind] = useState(false)
  const [unseen, setUnseen] = useState(0)
  const group = thread === 'group'
  const queueId = scene?.queue[0]?.id
  const count = group ? scene?.groupMessages.length ?? 0 : scene?.messages.length ?? 0
  const lastCount = useRef(count)
  const handoffAt = scene?.privateHandoff?.deliveredAt
  useEffect(() => {
    if (group) return
    const visibility = () => { if (document.visibilityState === 'visible') openPrivate(); else pausePrivate() }
    visibility()
    document.addEventListener('visibilitychange', visibility)
    window.addEventListener('pagehide', pausePrivate)
    return () => { document.removeEventListener('visibilitychange', visibility); window.removeEventListener('pagehide', pausePrivate); pausePrivate() }
  }, [group, handoffAt, openPrivate, pausePrivate])
  useEffect(() => { if (nearEnd.current) read(thread) }, [count, read, thread])
  useLayoutEffect(() => {
    const added = count - lastCount.current
    if (nearEnd.current && scroller.current) { scroller.current.scrollTop = scroller.current.scrollHeight; setBehind(false); setUnseen(0) }
    else { setBehind(true); if (added > 0) setUnseen(value => value + added) }
    lastCount.current = count
  }, [count, queueId])
  if (!scene) return null
  const privateTurn = scene.nodeId.startsWith('OPEN-S03-')
  const options = privateTurn ? group ? [] : scene01Choices(save) : (group === (scene.invitation === 'joined')) ? scene01Choices(save) : []
  const selection = scene.privateScene03 ? scene.privateScene03.draft?.nodeId === scene.nodeId ? scene.privateScene03.draft.choiceId : null : selected
  const choice = options.find(item => item.id === selection)
  const named = scene.introduced
  const lines = group ? scene.groupMessages : scene.messages
  const typing = !!scene.queue[0]?.typing && (privateTurn ? !group : group ? scene.invitation === 'joined' : scene.invitation !== 'joined')
  const pendingNode = queueId ? scene01Nodes[queueId] : undefined
  const typingActor = pendingNode?.kind === 'npc' ? pendingNode.sender ?? 'sophie' : pendingNode?.kind === 'wait' ? pendingNode.actor ?? 'sophie' : 'sophie'
  const actorName = (actor: string) => actor[0].toUpperCase() + actor.slice(1)
  const participants = ['You', ...(['sophie','maya','lucas'] as const).filter(actor => scene.groupMembers?.[actor] !== false).map(actorName)]
  const online = openingPresence(save, 'sophie') === 'online'
  const canSend = !!choice && (!choice.premiumChoice || playtestEnabled)
  const sendSelected = () => {
    if (!canSend) return
    const clean = name.trim().replace(/\s+/gu, ' ')
    if (choice.discloseName && (!clean || clean.length > 40 || /[\p{Cc}\p{Cf}<>]/u.test(clean))) { setError('Enter a codename of up to 40 characters.'); return }
    nearEnd.current = true
    send(choice.id, clean)
    setSelected(null)
    setError('')
  }
  const jump = () => { nearEnd.current = true; setBehind(false); setUnseen(0); if (scroller.current) scroller.current.scrollTop = scroller.current.scrollHeight; read(thread) }
  return <section className="opening-screen opening-v4 scene01-chat" data-scene-node={scene.nodeId} data-group-complete={scene.groupComplete ? 'true' : undefined} aria-label={group ? 'FIND DANIEL group conversation' : scene.privateHandoff?.openedAt !== undefined ? 'Sophie private conversation' : 'Sophie first contact conversation'}>
    <header className="opening-chat-header"><button className="icon-button bare" aria-label="Back to inbox" onClick={onBack}><ArrowLeft size={21}/></button>{group ? <span className="opening-group-avatar">FD</span> : <span className="chat-contact-avatar"><CharacterAvatar character={named ? 'sophie' : 'unknown'} fallback={named ? 'S' : '?'} className="opening-avatar"/>{online && <i className="presence-dot" aria-label="Online"/>}</span>}<div><strong>{group ? 'FIND DANIEL' : named ? 'Sophie' : 'Unknown number'}</strong><small aria-label={group ? 'Group participants' : undefined}>{group ? `${participants.length} members · ${participants.join(', ')}` : online ? 'Online' : 'Offline'}</small></div></header>
    <div className="opening-thread" ref={scroller} onScroll={event => { const node = event.currentTarget; nearEnd.current = node.scrollHeight - node.scrollTop - node.clientHeight < 90; if (nearEnd.current) { setBehind(false); read(thread) } }}>
      <div className="opening-timestamp">{new Date(scene.startedAt).toLocaleDateString([], { weekday: 'long', day: 'numeric', month: 'long' })} · {new Date(scene.startedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
      {lines.map(line => line.sender === 'system' ? <div key={line.id} className="opening-group-system">{line.text}</div> : <div key={line.id} className={`conversation-line ${line.sender === 'player' ? 'outgoing' : 'incoming'}`}>{line.sender !== 'player' && <span className="chat-contact-avatar"><CharacterAvatar character={group ? line.sender : named ? 'sophie' : 'unknown'} fallback={group ? line.sender[0].toUpperCase() : named ? 'S' : '?'} className="message-avatar"/>{group && openingPresence(save, line.sender) === 'online' && <i className="presence-dot" aria-label={`${actorName(line.sender)} online`}/>}</span>}<div className="conversation-body">{group && line.sender !== 'player' && <strong className="group-sender">{actorName(line.sender)}</strong>}<div className={`opening-bubble ${line.sender === 'player' ? 'player' : 'sophie'}`}>{line.text}</div></div></div>)}
      {typing && <div className="opening-v4-typing" role="status" aria-label={group ? `${actorName(typingActor)} is typing` : named ? 'Sophie is typing' : 'Unknown number is typing'}><CharacterAvatar character={group ? typingActor : named ? 'sophie' : 'unknown'} fallback={group ? typingActor[0].toUpperCase() : named ? 'S' : '?'} className="message-avatar"/><span className="typing-dots"><i/><i/><i/></span></div>}
      {!group && !online && <div className="presence-event">Sophie is offline.</div>}
      {!group && scene.invitation !== 'none' && scene.invitation !== 'joined' && !scene.queue.length && <article className="scene01-invitation" aria-label="FIND DANIEL invitation"><strong>FIND DANIEL</strong><p>Please keep anything related to Daniel here.</p>{!scene.invitationDismissed ? <><button className="opening-primary" onClick={() => { invitation(scene.invitation === 'declined' ? 'accept' : 'join'); if (scene.invitation === 'ready') navigation.openGroup() }}>{scene.invitation === 'declined' ? 'Accept invitation' : 'JOIN GROUP'}</button><button className="opening-choice" onClick={() => invitation('dismiss')}>NOT NOW</button></> : <button className="opening-choice" onClick={() => invitation('show')}>View invitation</button>}</article>}
      {!group && scene.invitation === 'joined' && <button className="opening-choice" onClick={() => navigation.openGroup()}>Open FIND DANIEL</button>}
    </div>
    {behind && <button className="opening-jump" onClick={jump}>{unseen ? `${unseen} new · Jump to latest` : 'Jump to latest'}</button>}
    {!!options.length && <div className="opening-actions opening-v4-composer"><div className="opening-action-heading">Choose a reply</div><div className="scene01-options">{options.map(option => <button key={`${scene.nodeId}-${option.id}`} className={`opening-choice ${selection === option.id ? 'selected' : ''}`} aria-pressed={selection === option.id} disabled={option.premiumChoice && !playtestEnabled} onClick={() => { if (scene.privateScene03) draftPrivate(option.id); else setSelected(option.id); setError('') }}>{option.premiumChoice && <Star size={14} aria-label="Premium"/>}{scene01Text(option.text, option.discloseName ? name.trim() || '…' : scene.disclosedName)}</button>)}{choice?.discloseName && <label className="scene01-codename">Your codename<input aria-label="Your codename" maxLength={40} value={name} onChange={event => setName(event.target.value)} autoComplete="nickname"/></label>}{error && <p role="alert">{error}</p>}</div><button className="opening-primary" disabled={!canSend} onClick={sendSelected}><Send size={17}/> Send</button></div>}
  </section>
}
