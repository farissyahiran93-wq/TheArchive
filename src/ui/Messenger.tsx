import { Chapter1ContactChat } from './Chapter1Investigation'
import { ReunionChat } from './Chapter2Reunion'
import type { Active } from '../game/chapter2Reunion'
import { AccessChat, RelaySheet } from './Chapter2Access'
import { openingPresence } from '../game/phonePresentation'
import { Scene01Chat } from './Scene01Chat'
import { CharacterAvatar } from './CharacterAvatar'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ArrowDown, Check, ChevronLeft, ChevronRight, LockKeyhole, Search, Send } from 'lucide-react'
import { fixtureChoices } from '../game/fixture'
import { SophieConversation } from './SophieConversation'
import { OpeningV4Chat } from './OpeningV4Chat'
import { CharacterFollowupChat } from './CharacterFollowupChat'
import { followupAvailable } from '../game/characterFollowups'
import type { FollowupContact } from '../content/characterFollowups'
import { OpeningPrologue } from './OpeningPrologue'
import { useGameStore } from '../game/store'
import { useCaseNavigation } from './CaseNavigation'
import { mayaMessages as messagesForMaya } from '../game/mayaMessages'
import type { Message } from '../game/types'
import { s20Question, s27Question, s24Questions, s25Followups, s25Replies, s26Frames, s29Disclosure, s30Disclosure } from '../content/e01Phase03b'

const clock = (at: number) => new Date(at).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
const day = (at: number) => new Date(at).toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })
const storyClock = (at: number) => new Date(at).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', timeZone: 'UTC' })
const storyDay = (at: number) => new Date(at).toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC' })
const belongsToFixture = (message: Message) => message.sender === 'fixture' || (message.sender === 'player' && message.recipient === 'fixture')

function ChatBubble({ message, groupStart, avatar = 'T', fictionalClock = false }: { message: Message; groupStart: boolean; avatar?: string; fictionalClock?: boolean }) {
  return <div className={`bubble-row ${message.sender}${groupStart ? ' group-start' : ''}`}>
    {message.sender !== 'player' && <CharacterAvatar character={message.sender === 'maya' ? 'maya' : 'fixture'} fallback={avatar} className={`bubble-avatar ${groupStart ? '' : 'invisible'}`}/>}
    <div className={`bubble ${message.sender}`}><p>{message.text}</p><small><time dateTime={new Date(message.at).toISOString()}>{fictionalClock ? storyClock(message.at) : clock(message.at)}</time>{message.sender === 'player' && <span className="delivery"><Check size={12}/>{message.delivery}</span>}</small></div>
  </div>
}

function MayaConversation({ onBack }: { onBack: () => void }) {
  const { openBulletin } = useCaseNavigation()
  const discuss = useGameStore(state => state.openS26Frame)
  const publicRequest = useGameStore(state => state.returnToS27)
  const keepPrivate = useGameStore(state => state.keepS26Private)
  const save = useGameStore(state => state.save)
  const select = useGameStore(state => state.draftPhase03b)
  const send = useGameStore(state => state.sendPhase03b)
  const messages = messagesForMaya(save)
  const slice = save.e01
  const pending = save.pendingEvents.some(event => event.id.startsWith('EV-E01-P03B:'))
  const scroller = useRef<HTMLDivElement>(null)
  const nearLatest = useRef(true)
  const [jumpToLatest, setJumpToLatest] = useState(false)
  useLayoutEffect(() => {
    const element = scroller.current
    if (element && nearLatest.current) element.scrollTop = element.scrollHeight
    else if (element) setJumpToLatest(true)
  }, [messages.length])
  const choices = !slice ? [] : slice.sceneId === 'E01-S20' && slice.s20NoticeSeen && !slice.s20Share ? s20Question
    : slice.sceneId === 'E01-S27' && !slice.s27Share ? s27Question
    : slice.sceneId === 'E01-S24' && slice.s24NoteViewed && !slice.s24Share ? s24Questions
    : slice.sceneId === 'E01-S25' && !slice.s25Primary ? s25Replies
    : slice.sceneId === 'E01-S25' && slice.s25Primary === 'P-S25-A' && !slice.s25Followup ? s25Followups.filter(item => ['P-S25-D','P-S25-E','P-S25-F'].includes(item.id))
    : slice.sceneId === 'E01-S25' && slice.s25Primary === 'P-S25-B' && !slice.s25Followup ? s25Followups.filter(item => ['P-S25-G','P-S25-H'].includes(item.id))
    : slice.sceneId === 'E01-S26' && !slice.s26Frame ? s26Frames
    : slice.sceneId === 'E01-S30' && !slice.e01Complete ? [...(!slice.s29Share ? s29Disclosure : []), ...(slice.s30RoleChecked && !slice.s30Share ? s30Disclosure.filter(item => slice.s30Hook === 'valid' ? item.id !== 'P-S30-C' : item.id === 'P-S30-C') : [])] : []
  return <section className="chat-screen native-messenger" aria-label="Maya Chen conversation"><header className="chat-header native-chat-header"><button className="icon-button bare native-back-button" onClick={onBack} aria-label="Back to inbox"><ChevronLeft size={29}/><span>Messages</span></button><div className="native-chat-contact"><CharacterAvatar character="maya" fallback="M" className="contact-avatar"/><span className="chat-title"><strong>Maya Chen</strong><small>Case connection · accepted separately from Archive</small></span></div></header><div className="chat-area"><div className="chat-scroll" ref={scroller} onScroll={event => { const el = event.currentTarget; nearLatest.current = el.scrollHeight - el.scrollTop - el.clientHeight < 70; if (nearLatest.current) setJumpToLatest(false) }}><div className="fixture-disclaimer">Earlier replies remain in your Bulletin inbox.</div>{messages.map((message,index) => { const previous = messages[index-1]; return <div key={message.id}>{(!previous || storyDay(previous.at) !== storyDay(message.at)) && <div className="chat-date">{storyDay(message.at)}</div>}<ChatBubble message={message} avatar="M" fictionalClock groupStart={!previous || previous.sender !== message.sender || message.at-previous.at > 5*60_000}/></div> })}{!messages.length && <p className="inbox-no-results">Connected. No new messages yet.</p>}{pending && <div className="typing" role="status"><CharacterAvatar character="maya" fallback="M" className="bubble-avatar"/><span className="typing-dots"><i/><i/><i/></span><span className="sr-only">Maya is typing</span></div>}</div>{jumpToLatest && <button className="new-messages" onClick={() => { nearLatest.current = true; setJumpToLatest(false); if (scroller.current) scroller.current.scrollTop = scroller.current.scrollHeight }}>Jump to latest</button>}</div><div className="composer">{slice?.sceneId === 'E01-S25' && <button className="choice" disabled={pending} onClick={discuss}>Discuss the revision notice</button>}{slice?.sceneId === 'E01-S26' && !slice.s26Frame && <button className="choice" disabled={pending} onClick={() => { keepPrivate(); openBulletin() }}>Keep this private for now</button>}{['E01-S25','E01-S26'].includes(slice?.sceneId ?? '') && <button className="choice" disabled={pending} onClick={() => { publicRequest(); openBulletin() }}>Continue public request</button>}<button className="choice maya-return" onClick={openBulletin}>Return to case in Bulletin</button>{choices.length ? <><div className="composer-title"><span>SELECT THEN SEND</span><small>Maya sees only the sent line</small></div><div className="choices">{choices.map(choice => <button key={choice.id} className={slice?.draftChoice === choice.id ? 'choice selected' : 'choice'} aria-pressed={slice?.draftChoice === choice.id} onClick={() => select(choice.id)}>{choice.text}</button>)}</div><button className="send-button" disabled={!slice?.draftChoice || !choices.some(choice => choice.id === slice.draftChoice) || pending} onClick={send}><Send size={17}/> Send</button></> : <div className="composer-wait"><LockKeyhole size={15}/>No reply required. Your case remains in Bulletin.</div>}</div></section>
}

function TypingIndicator() {
  return <div className="typing" role="status" aria-label="Test channel is typing"><span className="bubble-avatar">T</span><span className="typing-dots"><i/><i/><i/></span><span className="sr-only">Test channel is typing</span></div>
}

function Conversation({ onBack }: { onBack: () => void }) {
  const save = useGameStore(state => state.save)
  const messages = save.messages.filter(belongsToFixture)
  const readMessages = useGameStore(state => state.readMessages)
  const send = useGameStore(state => state.send)
  const [selected, setSelected] = useState<string | null>(null)
  const [filter, setFilter] = useState('')
  const [newCount, setNewCount] = useState(0)
  const scroller = useRef<HTMLDivElement>(null)
  const nearBottom = useRef(true)
  const seenLength = useRef(messages.length)
  const firstLayout = useRef(true)
  const typing = save.pendingEvents.some(item => item.id.startsWith('fixture.'))
  const canChoose = save.deliveredEvents.includes('fixture.check') && !save.choices['fixture.response']

  useEffect(() => { if (nearBottom.current) readMessages() }, [readMessages, messages.length])
  useLayoutEffect(() => {
    const element = scroller.current
    if (!element) return
    const added = Math.max(0, messages.length - seenLength.current)
    const shouldPin = firstLayout.current || nearBottom.current
    const frame = requestAnimationFrame(() => {
      if (shouldPin) { element.scrollTop = element.scrollHeight; setNewCount(0) }
      else if (added) setNewCount(count => count + added)
      firstLayout.current = false
    })
    seenLength.current = messages.length
    return () => cancelAnimationFrame(frame)
  }, [messages.length, typing])

  const jump = () => {
    const element = scroller.current
    if (!element) return
    element.scrollTop = element.scrollHeight
    requestAnimationFrame(() => { element.scrollTop = element.scrollHeight })
    nearBottom.current = true
    setNewCount(0)
    readMessages()
  }
  const options = fixtureChoices.filter(item => item.text.toLowerCase().includes(filter.toLowerCase()))

  return <section className="chat-screen native-messenger" aria-label="Test channel conversation">
    <header className="chat-header native-chat-header">
      <button className="icon-button bare native-back-button" onClick={onBack} aria-label="Back to inbox"><ChevronLeft size={29}/><span>Messages</span></button>
      <div className="native-chat-contact"><span className="contact-avatar" aria-hidden="true">T</span><span className="chat-title"><strong>Test channel</strong><small>Local development fixture</small></span></div>
    </header>
    <div className="chat-area"><div className="chat-scroll" ref={scroller} onScroll={event => { const element = event.currentTarget; nearBottom.current = element.scrollHeight - element.scrollTop - element.clientHeight < 96; if (nearBottom.current) { setNewCount(0); readMessages() } }}>
      <div className="fixture-disclaimer">This is a non-canonical test conversation. It contains no case facts.</div>
      {messages.map((message, index) => {
        const previous = messages[index - 1]
        return <div key={message.id}>{(!previous || day(previous.at) !== day(message.at)) && <div className="chat-date">{day(message.at)}</div>}<ChatBubble message={message} groupStart={!previous || previous.sender !== message.sender || message.at - previous.at > 5 * 60_000}/></div>
      })}
      {typing && <TypingIndicator/>}
    </div>{newCount > 0 && <button className="new-messages" onClick={jump}>{newCount} new {newCount === 1 ? 'message' : 'messages'} <ArrowDown size={15}/></button>}</div>
    <div className="composer">{canChoose ? <><div className="composer-title"><span>CHOOSE A REPLY</span><small>Text is sent only after confirmation</small></div><label className="reply-search"><Search size={16}/><input value={filter} onChange={event => setFilter(event.target.value)} placeholder="Find a reply…" aria-label="Find an available reply"/></label><div className="choices">{options.map(choice => <button key={choice.id} className={selected === choice.id ? 'choice selected' : 'choice'} onClick={() => setSelected(choice.id)} aria-pressed={selected === choice.id}>{choice.text}</button>)}</div><button className="send-button" disabled={!selected} onClick={() => { if (!selected) return; send(selected); setSelected(null); setFilter('') }}><Send size={17}/> Send</button></> : <div className="composer-wait"><LockKeyhole size={15}/>{typing ? 'Waiting for a reply…' : save.choices['fixture.response'] ? 'Conversation complete' : 'Replies appear when the test message arrives'}</div>}</div>
  </section>
}

function GroupHistory({ onBack }: { onBack: () => void }) {
  const social = useGameStore(state => state.save.prologue?.social)
  const readOpening = useGameStore(state => state.readOpening)
  useEffect(() => { readOpening('group') }, [readOpening])
  return <section className="chat-screen native-messenger" aria-label="FIND DANIEL group conversation"><header className="chat-header native-chat-header"><button className="icon-button bare native-back-button" onClick={onBack} aria-label="Back to inbox"><ChevronLeft size={29}/><span>Messages</span></button><div className="native-chat-contact"><span className="contact-avatar">FD</span><span className="chat-title"><strong>FIND DANIEL</strong><small>{social?.members.filter(id => id !== 'player').join(', ') || 'Group inactive'}</small></span></div></header><div className="chat-scroll">{social?.messages.map(message => message.sender === 'system' ? <div className="opening-group-system" key={message.id}>{message.text}</div> : <div key={message.id} className={`opening-group-line ${message.sender === 'player' ? 'player' : ''}`}><strong>{message.sender === 'player' ? 'You' : message.sender[0].toUpperCase() + message.sender.slice(1)}</strong><div className={`opening-bubble ${message.sender === 'player' ? 'player' : 'sophie'}`}>{message.text}</div></div>)}</div><div className="composer composer-wait">Offline</div></section>
}

export function Messenger({ onHome, initialThread = null }: { onHome: () => void; initialThread?: 'unknown' | 'group' | 'eli-lucas' | 'maya-lucas' | 'maya' | 'sophie' | FollowupContact | null }) {
  const [threadOpen, setThreadOpen] = useState<'unknown' | 'eli-lucas' | 'maya-lucas' | 'fixture' | 'maya' | 'sophie' | 'group' | FollowupContact | null>(initialThread)
  const [relay, setRelay] = useState(false)
  const openSophiePrivate=useGameStore(s=>s.openSophiePrivate)
  const [query, setQuery] = useState('')
  const save = useGameStore(state => state.save)
  const openFixture = useGameStore(state => state.openFixture)
  const accessAction=useGameStore(state=>state.accessAction)
  const comparisonComplete=save.chapter2Access?.story?.continuation?.completed.includes(11)
  useEffect(()=>{accessAction({type:'continuation-messages-open'})},[accessAction,comparisonComplete])
  const devTools = import.meta.env.DEV && new URLSearchParams(window.location.search).has('devtools')
  useEffect(() => { if (devTools) openFixture() }, [openFixture, devTools])
  const reunion=save.chapter2Access?.story
  if(save.chapter1&&!save.chapter2Access?.unknownCreated&&threadOpen==='unknown'&&save.chapter1?.sender.messages.length)return <Chapter1ContactChat thread="unknown" onBack={()=>setThreadOpen(null)}/>
  if(save.chapter1&&threadOpen&&['nora','eli','maya','lucas'].includes(threadOpen)&&!reunion?.sessions[threadOpen as 'nora'|'eli'|'maya'|'lucas']&&save.messages.some(m=>m.id.startsWith('CH1-')&&(m.sender===threadOpen||m.recipient===threadOpen)))return <Chapter1ContactChat thread={threadOpen as 'nora'|'eli'|'maya'|'lucas'} onBack={()=>setThreadOpen(null)}/>
  if (reunion && threadOpen && (threadOpen==='group'||threadOpen==='eli-lucas'||threadOpen==='maya-lucas'||Object.hasOwn(reunion.sessions,threadOpen))) return <ReunionChat key={threadOpen} thread={threadOpen as Active} onBack={() => setThreadOpen(null)} onThread={setThreadOpen}/>
  if (threadOpen === 'unknown' && save.chapter2Access?.unknownCreated) return <AccessChat onBack={() => setThreadOpen(null)}/>
  if (threadOpen === 'group' && save.chapter2Access?.groupQueued) return <AccessChat group onBack={() => setThreadOpen(null)}/>
  if ((threadOpen === 'sophie' || threadOpen === 'group') && save.prologue?.scene01) return <Scene01Chat thread={threadOpen === 'group' && save.prologue.scene01.invitation === 'joined' ? 'group' : 'sophie'} onBack={() => setThreadOpen(null)}/>
  if (threadOpen === 'sophie' && save.prologue?.dialogueVersion === 4 && save.prologue.stage !== 'complete') return <OpeningV4Chat thread="sophie" onBack={() => setThreadOpen(null)}/>
  if (threadOpen === 'group' && save.prologue?.dialogueVersion === 4) return <OpeningV4Chat thread="group" onBack={() => setThreadOpen(null)}/>
  if (threadOpen === 'sophie' && save.prologue && !['complete','mirror'].includes(save.prologue.stage)) return <OpeningPrologue onHome={() => setThreadOpen(null)}/>
  if (threadOpen === 'sophie') return <SophieConversation onBack={() => setThreadOpen(null)}/>
  if (threadOpen === 'group' && save.prologue?.stage === 'group') return <OpeningPrologue onHome={() => setThreadOpen(null)}/>
  if (threadOpen === 'group') return <GroupHistory onBack={() => setThreadOpen(null)}/>
  if (threadOpen === 'fixture') return <Conversation onBack={() => setThreadOpen(null)}/>
  if (threadOpen === 'maya') return <MayaConversation onBack={() => setThreadOpen(null)}/>
  if (threadOpen === 'lucas' || threadOpen === 'eli' || threadOpen === 'nora') return <CharacterFollowupChat contact={threadOpen} readOnly={!!save.prologue?.scene01} onBack={() => setThreadOpen(null)}/>
  const messages = save.messages.filter(belongsToFixture)
  const latest = messages.at(-1)
  const unread = messages.filter(message => message.sender === 'fixture' && message.delivery !== 'read').length
  const matches = devTools && `Test channel ${latest?.text ?? ''}`.toLowerCase().includes(query.trim().toLowerCase())
  const mayaConnected = !save.prologue?.scene01 && save.deliveredEvents.includes('CONN-E01-01')
  const sophieConnected = !!save.prologue
  const sophieLatest = reunion?.privateMessages.sophie.at(-1)?.text ?? save.prologue?.scene01?.messages.at(-1)?.text ?? save.prologue?.messages.at(-1)?.text ?? ''
  const sophieLabel = save.prologue?.scene01 ? save.prologue.scene01.introduced ? 'Sophie' : 'Unknown number' : save.prologue?.dialogueVersion === 4 && !(save.prologue.flow === 'mirror-first' && save.prologue.restored) && !save.deliveredEvents.some(id => id.startsWith('OPEN-V4-FIRST-ANSWER-')) ? 'Unknown number' : 'Sophie Mercer'
  const sophieMatches = sophieConnected && `${sophieLabel} ${sophieLatest}`.toLowerCase().includes(query.trim().toLowerCase())
  const groupLatest = save.chapter2Access?.groupMessages.at(-1)?.text ?? save.prologue?.scene01?.groupMessages.at(-1)?.text ?? save.prologue?.social?.messages.at(-1)?.text ?? ''
  const groupMatches = (save.prologue?.scene01 ? save.prologue.scene01.invitation === 'joined' : !!save.prologue?.social?.messages.length) && `FIND DANIEL ${groupLatest}`.toLowerCase().includes(query.trim().toLowerCase())
  const groupUnread = save.notifications.some(n=>!n.read&&(save.chapter2Access?.groupMessages.some(m=>m.id===n.id)||save.prologue?.scene01?.groupMessages.some(m=>m.id===n.id))) || save.notifications.some(item => (item.id === 'OPEN-GROUP-ADD' || item.id.startsWith('OPEN-GROUP-') || item.id.startsWith('ARC-E01-GROUP-')) && !item.read)
  const sophieUnread = save.notifications.some(n=>!n.read&&(reunion?.privateMessages.sophie.some(m=>m.id===n.id)||save.prologue?.scene01?.messages.some(m=>m.id===n.id)||['OPEN-S01-INVITATION','OPEN-S01-DECLINED'].includes(n.id))) || save.notifications.some(item => (item.id === 'OPEN-V4-FIRST-CONTACT' || item.id.startsWith('OPEN-SECOND-') || item.id.startsWith('OPEN-V4-') && item.id !== 'OPEN-V4-PENDING-RECOVERY') && !item.read)
  const mayaMessages = messagesForMaya(save)
  const mayaLatest = mayaMessages.at(-1)
  const mayaMatches = mayaConnected && `Maya Chen ${mayaLatest?.text ?? ''}`.toLowerCase().includes(query.trim().toLowerCase())
  const followups = (save.prologue?.scene01 ? ['lucas'] as FollowupContact[] : ['lucas','eli','nora'] as FollowupContact[]).filter(contact => !reunion?.sessions[contact as 'lucas'] && followupAvailable(save, contact) && `${contact} ${save.messages.filter(message => message.sender === contact || message.recipient === contact).at(-1)?.text ?? ''}`.toLowerCase().includes(query.trim().toLowerCase()))
  const chapter1Matches = !!save.chapter1 && (!!save.chapter1.sender.messages.length && !save.chapter2Access?.unknownCreated && 'unknown sender unknown number'.includes(query.toLowerCase()) || (['nora','eli','maya','lucas'] as const).some(who=>!reunion?.sessions[who]&&who.includes(query.toLowerCase())&&save.messages.some(m=>m.id.startsWith('CH1-')&&(m.sender===who||m.recipient===who))))
  const extraMatches = chapter1Matches || !!save.chapter2Access?.unknownCreated && `UNKNOWN ${save.chapter2Access.messages.map(m=>m.text).join(' ')}`.toLowerCase().includes(query.trim().toLowerCase()) || !!reunion && ((['eli-lucas','maya-lucas'] as const).some(id=>reunion.spy[id]?.unlocked&&id.replace('-',' ').includes(query.toLowerCase())) || (['maya','eli','lucas','nora'] as const).some(who=>(reunion.privateMessages[who]?.length||reunion.sessions[who])&&who.includes(query.toLowerCase())))
  return <section className="inbox-screen native-messenger" aria-label="Messages inbox">
    <header className="native-inbox-header">
      <div className="native-inbox-toolbar"><button className="icon-button bare native-back-button" onClick={onHome} aria-label="Back to home"><ChevronLeft size={27}/><span>Home</span></button></div>
      <h1>Messages</h1>{save.chapter2Access?.spyInstalled && <button className="relay-indicator" aria-label={`Relay status: ${save.chapter2Access?.relayAvailable?'available':'standby'}`} onClick={() => {useGameStore.getState().accessAction({type:'read-integration'});setRelay(true)}}>◌ {save.chapter2Access.relayAvailable?'AVAILABLE':'STANDBY'}</button>}
      <label className="search-field native-inbox-search"><Search size={18}/><input aria-label="Search conversations" placeholder="Search" value={query} onChange={event => setQuery(event.target.value)}/></label>
    </header>
    <div className="inbox-content">
      {save.chapter1&&!save.chapter2Access?.unknownCreated&&!!save.chapter1.sender.messages.length&&'unknown sender unknown number'.includes(query.toLowerCase())&&<button className="thread-row" aria-label="Open Chapter 1 Unknown Sender conversation" onClick={()=>setThreadOpen('unknown')}><CharacterAvatar character="unknown" fallback="?" className="contact-avatar"/><span className="thread-text"><strong>{save.prologue?.scene01?.scriptRevision?'Unknown Number':'Unknown Sender'}</strong><small>{save.chapter1.sender.messages.at(-1)?.text}</small></span><span className="thread-meta"><ChevronRight size={15}/>{save.notifications.some(n=>!n.read&&save.chapter1?.sender.messages.some(m=>m.id===n.id))&&<b>1</b>}</span></button>}
      {save.chapter1&&(['nora','eli','maya','lucas'] as const).filter(who=>!reunion?.sessions[who]&&who.includes(query.toLowerCase())&&save.messages.some(m=>m.id.startsWith('CH1-')&&(m.sender===who||m.recipient===who))).map(who=><button key={who} className="thread-row" aria-label={`Open Chapter 1 ${who} conversation`} onClick={()=>setThreadOpen(who)}><CharacterAvatar character={who} className="contact-avatar"/><span className="thread-text"><strong>{who[0].toUpperCase()+who.slice(1)}</strong><small>{save.messages.filter(m=>m.id.startsWith('CH1-')&&(m.sender===who||m.recipient===who)).at(-1)?.text}</small></span><span className="thread-meta"><ChevronRight size={15}/>{save.notifications.some(n=>!n.read&&save.messages.some(m=>m.id===n.id&&m.sender===who))&&<b>1</b>}</span></button>)}
      {reunion&&(['eli-lucas','maya-lucas'] as const).filter(id=>reunion.spy[id]?.unlocked&&id.replace('-',' ').includes(query.toLowerCase())).map(id=><button key={id} className="thread-row" aria-label={`Open ${id} interception`} onClick={()=>setThreadOpen(id)}><span className="contact-avatar">◌</span><span className="thread-text"><strong>SPY · {id.replace('-',' ↔ ').toUpperCase()}</strong><small>{reunion.spy[id]?.complete?'Interception ended · Read only':'Private thread · Read only'}</small></span><span className="thread-meta"><ChevronRight size={15}/>{!reunion.spy[id]?.viewed&&<b>1</b>}</span></button>)}
      {reunion&&(['maya','eli','lucas','nora'] as const).filter(who=>(reunion.privateMessages[who]?.length||reunion.sessions[who])&&who.includes(query.toLowerCase())).map(who=><button key={who} className="thread-row" aria-label={`Open ${who==='maya'?'Maya Chen':who==='eli'?'Eli Ward':who==='lucas'?'Lucas Grey':'Nora Vance'} conversation`} onClick={()=>setThreadOpen(who)}><CharacterAvatar character={who} fallback={who[0]} className="contact-avatar"/><span className="thread-text"><strong>{who==='maya'?'Maya Chen':who==='eli'?'Eli Ward':who==='lucas'?'Lucas Grey':'Nora Vance'}</strong><small>{reunion.privateMessages[who]?.at(-1)?.text}</small></span><span className="thread-meta"><ChevronRight size={15}/>{reunion.privateMessages[who]?.some(m=>save.notifications.some(n=>n.id===m.id&&!n.read))&&<b>1</b>}</span></button>)}
      {save.chapter2Access?.unknownCreated && `UNKNOWN ${save.chapter2Access.messages.map(m=>m.text).join(' ')}`.toLowerCase().includes(query.toLowerCase())&&<button className="thread-row" aria-label="Open UNKNOWN conversation" onClick={()=>setThreadOpen('unknown')}><CharacterAvatar character="unknown" fallback="?" className="contact-avatar"/><span className="thread-text"><strong>UNKNOWN</strong><small>{save.chapter2Access.messages.at(-1)?.text}</small></span><span className="thread-meta"><ChevronRight size={15}/>{save.notifications.some(n=>!n.read&&save.chapter2Access?.messages.some(m=>m.id===n.id))&&<b>1</b>}</span></button>}

      {sophieMatches && <button className="thread-row" onClick={() => {openSophiePrivate();setThreadOpen('sophie')}} aria-label={`Open ${sophieLabel} conversation`}>{sophieLabel === 'Unknown number' ? <span className="contact-avatar">?</span> : <CharacterAvatar character="sophie" fallback="S" className="contact-avatar"/>}{openingPresence(save,'sophie')==='online'&&<i className="thread-online" aria-label="Sophie online"/>}<span className="thread-text"><strong>{sophieLabel}</strong><small>{sophieLatest}</small></span><span className="thread-meta"><ChevronRight size={15}/>{sophieUnread && <b>1</b>}</span></button>}
      {groupMatches && <button className="thread-row" onClick={() => setThreadOpen('group')} aria-label="Open FIND DANIEL group conversation"><span className="contact-avatar">FD</span><span className="thread-text"><strong>FIND DANIEL</strong><small>{groupLatest}</small></span><span className="thread-meta"><ChevronRight size={15}/>{groupUnread && <b>1</b>}</span></button>}
      {mayaMatches && <button className="thread-row" onClick={() => setThreadOpen('maya')} aria-label="Open Maya Chen conversation"><CharacterAvatar character="maya" fallback="M" className="contact-avatar"/><span className="thread-text"><strong>Maya Chen</strong><small>{mayaLatest?.text ?? 'Case connection · no new messages yet'}</small></span><span className="thread-meta"><span className="thread-timestamp"><time>{mayaLatest ? storyClock(mayaLatest.at) : ''}</time><ChevronRight size={15}/></span></span></button>}
      {followups.map(contact => { const latest = save.messages.filter(message => message.sender === contact || message.recipient === contact).at(-1); const name = contact === 'lucas' ? 'Lucas Grey' : contact === 'eli' ? 'Eli Ward' : 'Nora Vance'; const unreadContact = save.notifications.some(item => item.id.startsWith(`ARC-E01-${contact.toUpperCase()}-`) && !item.read); return <button key={contact} className="thread-row" onClick={() => setThreadOpen(contact)} aria-label={`Open ${name} conversation`}><CharacterAvatar character={contact} fallback={name[0]} className="contact-avatar"/><span className="thread-text"><strong>{name}</strong><small>{latest?.text ?? 'Case contact · send a private question'}</small></span><span className="thread-meta"><ChevronRight size={15}/>{unreadContact && <b>1</b>}</span></button> })}
      {matches ? <button className="thread-row" onClick={() => setThreadOpen('fixture')} aria-label="Open Test channel conversation"><span className="contact-avatar" aria-hidden="true">T</span><span className="thread-text"><strong>Test channel</strong><small>{latest?.text ?? 'Local development conversation'}</small></span><span className="thread-meta"><span className="thread-timestamp"><time>{latest ? clock(latest.at) : ''}</time><ChevronRight size={15}/></span>{unread > 0 && <b>{unread}</b>}</span></button> : !mayaMatches && !sophieMatches && !groupMatches && !followups.length && !extraMatches && <p className="inbox-no-results" role="status">No conversations found.</p>}
      {devTools && <div className="inbox-footnote"><LockKeyhole size={15}/><span>Developer test channel</span></div>}
    </div>{relay&&<RelaySheet onClose={()=>setRelay(false)}/>}
  </section>
}
