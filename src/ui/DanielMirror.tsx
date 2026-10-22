import { RecoveredThumbnail } from './RecoveredThumbnail'
import { RecoverySequence } from './RecoverySequence'
import { galleryMediaForRecord } from '../content/galleryMedia'
import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, LockKeyhole, Search, LayoutGrid, type LucideIcon, MessageCircle, Mail, Images, PhoneCall, NotebookPen, Folder, Globe, ContactRound, Database, MapPinned, KeyRound, Lock, Lightbulb, FileImage, ChevronLeft, Bookmark, Settings, Home } from 'lucide-react'
import { mirrorAreas, mirrorLocks, type MirrorArea } from '../content/opening'
import { mirrorEntry, mirrorFolders, recordFolder, mirrorUnavailableDescriptions } from '../content/mirror'
import { canInspectMirrorEntry, mirrorAvailability, visibleMirrorEntries } from '../game/mirror'
import { useGameStore } from '../game/store'
import { MirrorRecordView } from './MirrorRecordView'
import { MirrorMediaViewer } from './MirrorMediaViewer'
import { MirrorEvidenceBoard } from './MirrorEvidenceBoard'
import { MirrorRecordActions } from './MirrorRecordActions'
import { CharacterAvatar } from './CharacterAvatar'
import { mirrorAppNames, mirrorDisplayStamp } from '../content/mirrorPresentation'

const icons: Record<MirrorArea, LucideIcon> = { messages: MessageCircle, mail: Mail, gallery: Images, calls: PhoneCall, notes: NotebookPen, files: Folder, browser: Globe, contacts: ContactRound, protected: LockKeyhole, maps: MapPinned, index: Database }

/** Fictional read-only snapshot. Navigation, inspection, saving and linking are separate actions. */
export function DanielMirror({ opening = false, onExit }: { opening?: boolean; onExit?: () => void }) {
  const save = useGameStore(state => state.save)
  const prologue = save.prologue
  const inspectArea = useGameStore(state => state.inspectMirror)
  const inspectDetail = useGameStore(state => state.inspectMirrorDetail)
  const unlock = useGameStore(state => state.unlockMirror)
  const hint = useGameStore(state => state.mirrorHint)
  const compare = useGameStore(state => state.compareMirrorIndex)
  const retain = useGameStore(state => state.saveMirrorEvidence)
  const navigate = useGameStore(state => state.navigateMirror)
  const initial = visibleMirrorEntries(save).find(item => item.id === prologue?.mirrorLocation)
  const [area, setArea] = useState<MirrorArea | null>(prologue?.stage === 'mirror' ? initial?.area ?? null : null)
  const [record, setRecord] = useState(initial?.index ?? 0)
  const [passphrase, setPassphrase] = useState('')
  const [unlockError, setUnlockError] = useState('')
  const [showHelp, setShowHelp] = useState(false)
  const [query, setQuery] = useState('')
  const [folder, setFolder] = useState('All')
  const [mediaOpen, setMediaOpen] = useState(false)
  const [mediaId, setMediaId] = useState<string>()
  const [boardOpen, setBoardOpen] = useState(false)
  const [deviceInfo, setDeviceInfo] = useState(false)
  const [reviewRecovery, setReviewRecovery] = useState(false)
  const [reading, setReading] = useState(prologue?.stage === 'mirror' && !!initial)
  const [trail, setTrail] = useState<string[]>([])
  const scroller = useRef<HTMLDivElement>(null)
  const sources = area ? visibleMirrorEntries(save).filter(item => item.area === area) : []
  const visible = sources.filter(item => (folder === 'All' || recordFolder(item) === folder) &&
    `${item.title} ${canInspectMirrorEntry(save, item.id) ? item.body : ''}`.toLowerCase().includes(query.trim().toLowerCase()))
  const entry = visible.find(item => item.index === record)
  const lockId = entry?.lockId
  const lockOpen = !lockId || !!prologue?.unlockedMirrorRecords?.includes(lockId)
  const containerLocked = !!entry && !canInspectMirrorEntry(save, entry.id) && !lockId
  const readable = !!entry && canInspectMirrorEntry(save, entry.id)
  const readyToCompare = !!prologue?.inspectedRecords?.includes('notes:Untitled \u2014 last saved 22:30') && !!prologue?.inspectedRecords?.includes('index:Archive Index \u2014 integrity report')
  const hintCount = lockId ? prologue?.mirrorHints?.[lockId] ?? 0 : 0

  useEffect(() => { if (entry && readable && reading) inspectDetail(entry.area, entry.title) }, [entry, readable, reading, inspectDetail])
  useEffect(() => { scroller.current?.scrollTo({ top: 0 }) }, [area, record, boardOpen, reading])
  if (!prologue?.restored) return null
  if (prologue.recoverySequence && (prologue.recoverySequence.beat !== 'done' || prologue.recoverySequence.queue.length || prologue.stage === 'found')) return <RecoverySequence onExit={onExit}/>
  if (reviewRecovery && prologue.recoverySequence) return <RecoverySequence onExit={() => setReviewRecovery(false)}/>

  function resetTools() { setPassphrase(''); setUnlockError(''); setShowHelp(false); setQuery(''); setFolder('All'); setMediaOpen(false) }
  function goTo(id: string) {
    const target = mirrorEntry(id)
    if (!target || !visibleMirrorEntries(save).some(item => item.id === id)) return
    if (reading && entry) setTrail(items => [...items, entry.id])
    setArea(target.area); setRecord(target.index); setReading(true); setBoardOpen(false); resetTools()
    inspectArea(target.area); navigate(target.id)
  }
  function openArea(next: MirrorArea) { navigate(); setArea(next); setRecord(-1); setReading(false); setTrail([]); resetTools(); inspectArea(next) }
  function selectRecord(index: number) {
    const target = sources.find(item => item.index === index)
    if (!target) return
    setRecord(index); setReading(true); setMediaOpen(false); setPassphrase(''); setUnlockError(''); setShowHelp(false); navigate(target.id)
  }
  function unlockRecord() {
    if (!lockId) return
    unlock(lockId, passphrase)
    if (!useGameStore.getState().save.prologue?.unlockedMirrorRecords?.includes(lockId)) { setUnlockError('Incorrect password. No progress lost - examine another app or request a hint.'); return }
    setUnlockError(''); setPassphrase('')
  }
  const hasOtherUnlocked = area === 'notes' || area === 'gallery'
  const unlockedCount = sources.filter(item => !item.lockId || prologue.unlockedMirrorRecords?.includes(item.lockId)).length
  const home = () => { setArea(null); setReading(false); setTrail([]); setDeviceInfo(false); setBoardOpen(false); resetTools(); navigate() }
  function backToList() {
    const previous = trail.at(-1)
    if (previous) { const target = mirrorEntry(previous)!; setTrail(items => items.slice(0, -1)); setArea(target.area); setRecord(target.index); resetTools(); navigate(previous); return }
    setReading(false); setRecord(-1); resetTools(); navigate()
  }
  function appIcon(id: MirrorArea) {
    const Icon = icons[id]
    return <button key={id} className={`mirror-icon mirror-app-${id}`} onClick={() => openArea(id)}><span>{id === 'gallery' ? <span className="mirror-photos-flower" aria-hidden="true">{Array.from({ length: 8 }, (_, i) => <i key={i} style={{ transform: `rotate(${i * 45}deg)`, background: ['#ff453a','#ff9f0a','#ffd60a','#a8d73d','#32d7bd','#32ade6','#7d7aff','#ff6482'][i] }}/>)}</span> : <Icon size={29} strokeWidth={1.8}/>}</span><strong>{mirrorAppNames[id]}</strong></button>
  }
  const AppIcon = area ? icons[area] : icons.index
  const dock: MirrorArea[] = ['calls', 'messages', 'mail', 'browser']
  return <div className={`mirror ${area || boardOpen || deviceInfo ? 'mirror-in-app' : 'mirror-on-home'} ${reading ? 'mirror-reading' : ''} mirror-area-${area ?? 'home'}`} onKeyDown={event => { if (event.key === 'Escape') { event.stopPropagation(); if ((event.target as HTMLElement).closest('.mirror-media-viewer')) return; if (!mediaOpen) { if (reading && !boardOpen && !deviceInfo) backToList(); else home() } } }} aria-label="Daniel Mercer's phone">
    <div className="mirror-device-switch">{onExit && <button onClick={onExit}><ChevronLeft size={14}/> My phone</button>}<span>Daniel’s iPhone</span></div>
    {deviceInfo ? <div className="mirror-detail" ref={scroller}><button className="mirror-back" onClick={() => setDeviceInfo(false)}><ArrowLeft size={18}/> Daniel's Phone</button><h2>Device information</h2><p>Daniel Mercer’s iPhone</p><dl><dt>Integrity</dt><dd>Unverified</dd><dt>Coverage</dt><dd>Partial</dd><dt>Access</dt><dd>Read only · offline</dd></dl><p>Original metadata and other backups are unavailable. Passwords unlock individual items; they cannot recover missing data. Messaging and calling are unavailable.</p></div> :
    boardOpen ? <div className="mirror-detail" ref={scroller}><button className="mirror-back" onClick={() => setBoardOpen(false)}><ArrowLeft size={18}/> Back to app</button><MirrorEvidenceBoard onOpen={goTo}/></div>
    : !area ? <div className="mirror-main" ref={scroller}>
      <div className="mirror-widgets"><div className="mirror-calendar-widget"><small>THURSDAY</small><strong>8</strong><span>October</span></div><div className="mirror-photo-widget" aria-label="Decorative Greyhaven wallpaper"><span>Greyhaven</span></div></div>
      <div className="mirror-grid">{mirrorAreas.filter(item => !dock.includes(item.id)).map(item => appIcon(item.id))}</div>
      <div className="mirror-home-tools"><button onClick={() => setDeviceInfo(true)}><Settings size={16}/> Settings</button><button onClick={() => setBoardOpen(true)}><LayoutGrid size={16}/> Case Board</button></div>
      {initial && <button className="mirror-workspace-button" onClick={() => goTo(initial.id)}>Resume {mirrorAppNames[initial.area]}</button>}
      {prologue.recoverySequence?.restored && <button className="mirror-workspace-button" onClick={() => setReviewRecovery(true)}>Review recovered conversation · Unverified</button>}
      <div className="mirror-dock" aria-label="Daniel's app dock">{dock.map(appIcon)}</div>
    </div> : <div className="mirror-detail" ref={scroller}>
      <div className="mirror-app-toolbar">{reading && <button className="mirror-back" onClick={backToList}><ChevronLeft size={23}/> Back</button>}<button className="mirror-back" aria-label="Daniel's Phone" onClick={home}>{reading ? <Home size={20}/> : <><ChevronLeft size={23}/>Daniel’s iPhone</>}</button><div className="mirror-toolbar-actions"><button className="mirror-workspace-button" aria-label="Evidence" onClick={() => setBoardOpen(true)}><Bookmark size={20}/></button>{reading && entry && readable && <MirrorRecordActions key={entry.id} entry={entry} onNavigate={goTo}/>}</div></div>
      <h2>{mirrorAppNames[area]}</h2>
      {!reading && <>
      <label className="mirror-search"><Search size={17}/><input type="search" aria-label={`Search ${mirrorAppNames[area]}`} placeholder="Search" value={query} onChange={event => setQuery(event.target.value)}/></label>
      {mirrorFolders[area] && <nav className="mirror-tabs" aria-label="Folders">{mirrorFolders[area]!.map(name => <button key={name} aria-pressed={folder === name} onClick={() => setFolder(name)}>{name}</button>)}</nav>}
      {hasOtherUnlocked && <p className="mirror-folder-count">{unlockedCount} items · {sources.length - unlockedCount} locked</p>}

      <div aria-label={area === 'gallery' ? 'Albums' : undefined} className={`mirror-items ${area === 'gallery' ? 'mirror-album-list' : ''}`}>{visible.map(item => { const locked = !canInspectMirrorEntry(save, item.id); return <button key={item.id} aria-label={item.title} className={record === item.index ? 'mirror-file is-active' : 'mirror-file'} onClick={() => selectRecord(item.index)}>{area === 'gallery' ? <span className="mirror-album-cover">{locked ? <Lock size={28}/> : galleryMediaForRecord(item.id)[0] ? <RecoveredThumbnail src={galleryMediaForRecord(item.id)[0].thumbnail} alt=""/> : <FileImage size={28}/>}</span> : locked ? <Lock size={17}/> : ['messages', 'contacts'].includes(item.area) ? <CharacterAvatar character={item.title.split(' · ')[0]} fallback={item.title[0]} className="mirror-list-initial"/> : <AppIcon size={20}/>}<span className="mirror-file-copy"><strong>{item.title}</strong><small>{locked ? 'Locked' : mirrorDisplayStamp(item.stamp)}</small>{!locked && ['mail', 'messages', 'calls', 'browser'].includes(item.area) && !item.stamp.includes('ENCRYPTED') && <span className="mirror-file-preview">{item.body.slice(0, 85)}</span>}</span><ArrowRight size={15}/></button> })}</div>
      {!visible.length && <p role="status">No results</p>}
      </>}
      {reading && entry && <article className="mirror-document">{mirrorDisplayStamp(entry.stamp) && <small>{mirrorDisplayStamp(entry.stamp)}</small>}<h3>{entry.title}</h3>
        {containerLocked ? <div className="mirror-lock-panel"><LockKeyhole size={37}/><strong>{entry ? mirrorAvailability(save, entry).toUpperCase().replaceAll('-', ' ') : 'Unavailable'}</strong><p>{mirrorUnavailableDescriptions[mirrorAvailability(save, entry)]}</p></div>
        : lockId && !lockOpen ? <form className="mirror-lock-panel" onSubmit={event => { event.preventDefault(); unlockRecord() }}><LockKeyhole size={37}/><strong>{area === 'notes' ? 'This Note Is Locked' : 'This Hidden Album Is Locked'}</strong><p>Enter the password to view this item.</p>
          <label htmlFor="mirror-passphrase">Password</label><input id="mirror-passphrase" type="password" value={passphrase} onChange={event => {setPassphrase(event.target.value);setUnlockError('')}} autoComplete="off" autoCapitalize="characters" spellCheck={false}/>
          <button type="submit"><KeyRound size={16}/> Unlock</button>{unlockError && <p role="alert">{unlockError}</p>}
          <button type="button" className="mirror-hint-toggle" onClick={() => {setShowHelp(true);hint(lockId)}}><Lightbulb size={16}/> {hintCount === 0 ? 'Need a hint?' : hintCount < mirrorLocks[lockId].hints.length ? 'Another hint' : 'Review hints'}</button>
          {(showHelp || hintCount > 0) && <ol className="mirror-hints" aria-label="Password hints">{mirrorLocks[lockId].hints.slice(0,hintCount).map((text,i) => <li key={i}>{text}</li>)}</ol>}
        </form> : <><MirrorRecordView key={entry.id} entry={entry} onMedia={id => { setMediaId(id); setMediaOpen(true) }}/></>}
      </article>}
      {area === 'index' && <p className="mirror-guidance">Zero deletion entries does not establish what happened. Compare the signed count with the ordinary Untitled Note.</p>}
      {area === 'index' && opening && <button className="mirror-compare" disabled={!readyToCompare} onClick={compare}>{readyToCompare ? 'Record the missing-entry discrepancy' : 'Read the Untitled Note and Index report'} <ArrowRight size={17}/></button>}
    </div>}
    <button className="mirror-home-indicator" aria-label="Daniel phone home" onClick={home}><span/></button>
    {mediaOpen && entry && readable && <MirrorMediaViewer key={entry.id} initialMediaId={mediaId} entry={entry} onClose={() => setMediaOpen(false)} onSave={() => retain(entry.id)} saved={!!save.evidence[entry.id]}/>}
  </div>
}
