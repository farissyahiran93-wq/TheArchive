import { useGameStore } from '../game/store'
import { GuidanceDot } from './GuidanceDot'
import { currentObjective, guidanceTarget } from '../game/guidance'
import { readMenuPreferences } from '../game/menuPreferences'
import { useRef, useState } from 'react'
import { ChevronRight, LockKeyhole } from 'lucide-react'
import { apps, type AppId } from '../content/phone'
import { AppIcon } from './AppIcon'
import { bulletinLinkReceived } from '../game/trace'
import { scene04Article } from '../content/scene04Final'
import './bulletin-widget.css'
import { MasterScene10 } from './MasterScene10'

const dockIds: AppId[] = ['calls', 'messages', 'bulletin']
const pages: AppId[][] = [
  ['photos', 'calendar', 'files', 'notes', 'maps', 'search', 'contacts', 'alerts', 'mail'],
  ['settings', 'calls', 'bulletin', 'messages'],
]

export function HomeScreen({ name, open, unread, alertsUnread = 0, archiveBadge = 0, archiveUnlocked, storyMode = false, bulletinEnabled = true, scene01Mode = false, onContinueInvestigation, onLock, incoming }: { name: string; open: (id: AppId) => void; unread: number; alertsUnread?: number; archiveBadge?: number; archiveUnlocked: boolean; storyMode?: boolean; bulletinEnabled?: boolean; scene01Mode?: boolean; onContinueInvestigation?: () => void; onLock: () => void; incoming?: { text: string; open: () => void; label?: string; source?: string } }) {
  const save = useGameStore(s => s.save)
  const bulletinWidget = !bulletinEnabled
  const linkReceived = bulletinLinkReceived(save)
  const objective = readMenuPreferences().guidance !== 'off' ? currentObjective(save) : undefined
  const target = readMenuPreferences().guidance !== 'off' ? guidanceTarget(save) : undefined
  const [page, setPage] = useState(0)
  const [inventoryOpen,setInventoryOpen]=useState(false)
  const [today] = useState(() => storyMode ? new Date(2026, 9, 8, 9, 0) : new Date())
  const touch = useRef<{ x: number; y: number } | null>(null)
  const list = (page === 1 ? [...pages[1], ...(storyMode ? ['board' as AppId] : [])] : bulletinEnabled&&archiveUnlocked ? ['archive' as AppId,...pages[0].filter(id=>id!=='alerts')] : [...pages[0], ...(archiveUnlocked ? ['archive' as AppId] : [])]).filter(id => (bulletinEnabled || !['bulletin','search'].includes(id)) && (!scene01Mode || id !== 'board'))
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1).getDay()
  const monthDays = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()

  if(save.masterScene10&&(['ringing','missed','call','warning','ending'].includes(save.masterScene10.phase)||save.masterScene10.phase==='complete'&&!!save.masterScene10.media&&!save.masterScene10.media.completionSeen||inventoryOpen))return <MasterScene10 onClose={()=>setInventoryOpen(false)}/>
  return <main className="home" aria-label={name === 'Your' ? 'Phone home screen' : `${name}'s home screen`} onTouchStart={event => { touch.current = { x: event.touches[0].clientX, y: event.touches[0].clientY } }} onTouchEnd={event => { if (!touch.current) return; const dx = event.changedTouches[0].clientX - touch.current.x; const dy = event.changedTouches[0].clientY - touch.current.y; if (Math.abs(dx) > 65 && Math.abs(dx) > Math.abs(dy) * 1.5) setPage(dx < 0 ? 1 : 0); touch.current = null }}>
    <div className="home-content">
      <div className="home-topline"><span>{name === 'Your' ? 'Your phone' : `${name}'s phone`}</span><button onClick={onLock} aria-label="Lock phone"><LockKeyhole size={14}/></button></div>
      {page === 0 ? <section className="widgets" aria-label="Home widgets">
        <button className="widget photo-widget" onClick={() => open('photos')} aria-label="Open photo widget"><span className="photo-widget-caption"><small>GREYHAVEN</small><strong>Along the water</strong></span></button>
        <button className="widget month-widget" onClick={() => open('calendar')} aria-label="Open calendar widget"><strong>{today.toLocaleDateString('en', { month: 'long' }).toUpperCase()}</strong><div className="widget-month" aria-hidden="true">{['S','M','T','W','T','F','S'].map((day, i) => <span className="week-letter" key={`d${i}`}>{day}</span>)}{Array.from({ length: monthStart }, (_, i) => <span key={`b${i}`}/>)}{Array.from({ length: monthDays }, (_, i) => <span key={i} className={i + 1 === today.getDate() ? 'current-day' : ''}>{i + 1}</span>)}</div></button>
        {bulletinWidget && (linkReceived ? <button className="widget bulletin-home-widget populated" aria-label="Open Greyhaven Bulletin article" onClick={()=>open('bulletin')}><small>GREYHAVEN BULLETIN <span>LINK FROM SOPHIE</span></small><strong>{scene04Article.title}</strong><ChevronRight size={17}/><GuidanceDot save={save} app="bulletin" home/></button> : <section className="widget bulletin-home-widget empty" aria-label="Greyhaven Bulletin widget"><small>GREYHAVEN BULLETIN</small></section>)}
      </section> : <section className="home-summary"><small>YOUR DEVICE</small><strong>Everything you need.</strong><span>Your notes, your settings, your pace.</span></section>}
      {page===0&&save.masterScene04?.complete&&!save.masterScene05&&<p role="status">Scene 5 — The Digital Archive unlocked · Recovery 0%</p>}
      {page===0&&save.masterScene09?.complete&&save.deliveredEvents.includes('TA-S09-SCENE10-UNLOCKED')&&<button className="story-home-alert" onClick={()=>{if(!save.masterScene10)useGameStore.getState().masterScene10Action({type:'start'});setInventoryOpen(true)}}>{save.masterScene10?.phase==='complete'?'Chapter 1 complete · View ending':'OPEN GREYHAVEN PUBLIC INVENTORY · Scene 10'}</button>}
      <section className="home-apps" aria-label={`Home page ${page + 1} apps`} key={page}>{list.map(id => <button className="app-tile" key={id} onClick={() => open(id)} aria-label={`Open ${apps.find(item => item.id === id)!.label}`} aria-description={target?.app===id?objective?.app===id?`Investigation action available: ${objective.title}`:'Next action available':undefined}><AppIcon id={id} badge={id === 'messages' ? unread : id === 'alerts' ? alertsUnread : id === 'archive' ? archiveBadge : id === 'mail' && save.chapter1?.versionHistory?.inquiry.receipt?.id === 'R-GB-VH-001' && save.deliveredEvents.includes('R-GB-VH-001') && save.chapter1?.correctionsDesk?.prior?.text === save.chapter1.versionHistory.inquiry.receipt.text && save.chapter1.correctionsDesk.replyDelivered && !!save.chapter1.correctionsDesk.reply && save.deliveredEvents.includes('EV-S06-DESK-REPLY-001') && !save.chapter1.correctionsDesk.flags.includes('email-read') ? 1 : 0} date={today}/><span>{apps.find(item => item.id === id)!.label}</span><GuidanceDot save={save} app={id==='archive'?'archive':id==='messages'?'messages':undefined} home active={target?.app===id}/></button>)}</section>
      {incoming && page === 0 && <button className="story-home-alert" onClick={incoming.open} aria-label={incoming.label ?? 'Open unknown message'}><span className="notification-app-mark">{incoming.source === 'ALERTS' ? 'A' : 'M'}</span><span className="notification-copy"><span className="notification-source">{incoming.source ?? 'MESSAGES'} <time>now</time></span><strong>{incoming.source === 'ALERTS' ? 'Connection request' : 'Unknown number'}</strong><span>{incoming.text}</span></span><ChevronRight size={15}/></button>}
      {bulletinEnabled && storyMode && page === 0 && <button className="story-home-alert" onClick={() => open('bulletin')} aria-label="Read Daniel Mercer brief"><span className="notification-app-mark">G</span><span className="notification-copy"><span className="notification-source">BULLETIN <time>now</time></span><strong>New lead: Bus 4 record</strong><span>Compare the older public preview · Daniel last contacted 4 October</span></span><ChevronRight size={15}/></button>}
      {onContinueInvestigation && page === 0 && <button className="story-home-alert" onClick={onContinueInvestigation}>Continue MIRROR conversation</button>}
    </div>
    <div className="home-bottom"><div className="page-indicators" aria-label="Home pages">{pages.map((_, index) => <button key={index} className={page === index ? 'active' : ''} onClick={() => setPage(index)} aria-label={`Show home page ${index + 1}`} aria-current={page === index ? 'page' : undefined}><span/></button>)}</div><nav className="dock" aria-label="Quick apps">{(bulletinEnabled ? dockIds : ['calls', 'messages', 'contacts'] as AppId[]).map(id => <button key={id} onClick={() => open(id)} aria-label={`Open ${apps.find(item => item.id === id)!.label}`} aria-description={target?.app===id?objective?.app===id?`Investigation action available: ${objective.title}`:'Next action available':undefined}><AppIcon id={id} badge={id === 'messages' ? unread : 0}/><GuidanceDot save={save} app={id==='archive'?'archive':id==='messages'?'messages':undefined} home active={target?.app===id}/></button>)}</nav></div>
  </main>
}
