import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, Bell, Check, ChevronRight, Download, FileText, LockKeyhole, Moon, Music2, Phone, RotateCcw, Search, Sun, Volume2, type LucideIcon } from 'lucide-react'
import { apps, searchResults, type AppId } from '../content/phone'
import { downloadBackup } from '../game/save'
import { useGameStore } from '../game/store'
import type { Appearance } from './useAppearance'
import type { AudioPreferences } from './usePhoneAudio'
import { MapsApp } from './MapsApp'
import { s18SourceLabels, s23Results } from '../content/e01Phase03b'
import { gcroPages } from '../content/gcroExport'
import { downloadDevTelemetry, readDevTelemetry } from '../game/devTelemetry'
import { CaseBoardApp } from './CaseBoardApp'
import { DanielMirror } from './DanielMirror'
import { CharacterAvatar } from './CharacterAvatar'
import { followupAvailable } from '../game/characterFollowups'
import type { FollowupContact } from '../content/characterFollowups'
import { ChatPhotoViewer } from './ChatPhotoViewer'
import { useCaseNavigation } from './CaseNavigation'
import './opening.css'

export function AppHeader({ title, detail, back }: { title: string; detail?: string; back: () => void }) {
  return <header className="app-header"><button className="icon-button bare" onClick={back} aria-label="Back to home"><ArrowLeft size={23}/></button><div>{detail && <p>{detail}</p>}<h1>{title}</h1></div></header>
}

function EmptyCard({ Icon, title, text }: { Icon: LucideIcon; title: string; text: string }) {
  return <div className="empty-card"><Icon size={30}/><h2>{title}</h2><p>{text}</p></div>
}

function SearchApp() {
  const slice = useGameStore(state => state.save.e01)
  const setStoryQuery = useGameStore(state => state.setS23Query)
  const openStoryResult = useGameStore(state => state.openS23Result)
  const [query, setQuery] = useState('')
  const caseMode = !!slice && Number(slice.sceneId.slice(-2)) >= 23
  const caseQuery = slice?.sceneId === 'E01-S23' ? slice.s23Query ?? '' : query
  if (caseMode) {
    const aliases = ['bus 4','north quay','escort','correction','archive','daniel','version']
    const matches = aliases.some(alias => caseQuery.toLowerCase().includes(alias)) ? s23Results : []
    return <div className="utility-content"><label className="search-field"><Search size={19}/><input aria-label="Search Greyhaven" placeholder="Bus 4 2019 version" value={caseQuery} onChange={event => slice.sceneId === 'E01-S23' ? setStoryQuery(event.target.value) : setQuery(event.target.value)}/></label><p className="section-caption">{matches.length} RESULTS · PUBLIC INDEX</p>{matches.map(result => <article className="utility-card result-card" key={result.id}><small>{result.id} · {result.source}</small><h2>{result.title}</h2><p>{result.detail}</p>{slice.sceneId === 'E01-S23' && <button className="choice" onClick={() => openStoryResult(result.id)}>Inspect publisher · {result.id}</button>}</article>)}{caseQuery && !matches.length && <p className="utility-note">No public result for that wording. Try the record title, year or office; private records are not indexed here.</p>}</div>
  }
  const matches = searchResults.filter(result => `${result.title} ${result.excerpt} ${result.tags}`.toLowerCase().includes(query.toLowerCase()))
  return <div className="utility-content"><label className="search-field"><Search size={19}/><input aria-label="Search Greyhaven" placeholder="Search the local index" value={query} onChange={event => setQuery(event.target.value)}/></label><p className="section-caption">{matches.length} RESULTS</p>{matches.map(result => <article className="utility-card result-card" key={result.id}><small>{result.source}</small><h2>{result.title}</h2><p>{result.excerpt}</p></article>)}{!matches.length && <EmptyCard Icon={Search} title="No local results" text="Try transit, library or bulletin."/>}</div>
}

function CaseFiles() {
  const slice = useGameStore(state => state.save.e01)
  const r04 = useGameStore(state => state.save.deliveredEvents.includes('R04'))
  const [page,setPage] = useState<number | null>(null)
  const pages = gcroPages(slice?.s28Payload ?? '')
  if (!slice?.s28Issue) return <EmptyCard Icon={LockKeyhole} title="Investigation files unavailable" text="A request receipt is not an issued copy. Files appear only when the story grants a sourced release."/>
  return <><article className="utility-card"><small>FICTIONAL GCRO · REQUEST SESSION ONLY</small><h2>GCRO-EXP-20261008-041</h2><p>{r04 ? 'Previously verified local release · R04. Later office availability does not erase this saved receipt.' : slice.s28CorrectionRequested ? 'Earlier issue quarantined; correction requested. No valid replacement has arrived.' : 'Issued but not yet validated. Return to the case investigation to check it.'}</p><p>Resident details remain redacted. The file is not shared with Maya.</p></article>{pages.length ? pages.map((_,index) => <button className="choice" key={index} onClick={() => setPage(index+1)}>Read delivered page {index+1} of {pages.length}</button>) : <p role="status">The delivered file is missing; the issue envelope alone is not evidence.</p>}{page && pages[page-1] && <pre className="phase-export-page">{pages[page-1]}</pre>}</>
}

function ArchiveCase() {
  const hasAccess = useGameStore(state => state.save.deliveredEvents.includes('R03'))
  const [selected,setSelected] = useState<string | null>(null)
  if (!hasAccess) return <EmptyCard Icon={LockKeyhole} title="Case workspace locked" text="A voluntary invitation is required before case files appear."/>
  return <><p className="utility-note">Greyhaven Memory Project · read-only folder. Your private Board and Files are not shared.</p>{s18SourceLabels.map(item => <button className="choice" key={item.id} onClick={() => setSelected(item.id)}>{item.title} · {item.status}</button>)}{selected && <article className="utility-card"><small>{s18SourceLabels.find(item => item.id === selected)?.source}</small><h2>{s18SourceLabels.find(item => item.id === selected)?.title}</h2><p>{s18SourceLabels.find(item => item.id === selected)?.status}</p><p>A folder label does not certify the older audit. The independent GCRO request remains separate.</p></article>}</>
}

function CalendarApp() {
  const storyMode = useGameStore(state => !!state.save.e01)
  const [offset, setOffset] = useState(0)
  const [now] = useState(() => storyMode ? new Date(2026, 9, 8) : new Date())
  const first = new Date(now.getFullYear(), now.getMonth() + offset, 1)
  const count = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate()
  const leading = (first.getDay() + 6) % 7
  return <div className="utility-content"><div className="month-controls"><button onClick={() => setOffset(value => value - 1)} aria-label="Previous month">‹</button><strong>{first.toLocaleDateString([], { month: 'long', year: 'numeric' })}</strong><button onClick={() => setOffset(value => value + 1)} aria-label="Next month">›</button></div><div className="calendar-grid">{['M','T','W','T','F','S','S'].map((label, index) => <span className="calendar-weekday" key={`${label}-${index}`}>{label}</span>)}{Array.from({ length: leading }, (_, index) => <span key={`blank-${index}`}/>)}{Array.from({ length: count }, (_, index) => <span key={index} className={offset === 0 && now.getDate() === index + 1 ? 'today' : ''}>{index + 1}</span>)}</div><div className="utility-note">No events.</div></div>
}

const notesKey = 'the-archive-reboot:personal-notes:v1'
function NotesApp() {
  const [note, setNote] = useState(() => { try { return localStorage.getItem(notesKey) ?? '' } catch { return '' } })
  const [saved, setSaved] = useState(true)
  const saveNote = () => { try { localStorage.setItem(notesKey, note); setSaved(true) } catch { setSaved(false) } }
  return <div className="utility-content"><p className="section-caption">PERSONAL NOTES · NOT CASE EVIDENCE</p><label className="sr-only" htmlFor="personal-note">Personal note</label><textarea id="personal-note" className="note-editor" value={note} onChange={event => { setNote(event.target.value); setSaved(false) }} placeholder="Write a private reminder…"/><button className="action-button" onClick={saveNote}><Check size={17}/> Save note</button><p className="utility-note">{saved ? 'Saved on this browser only.' : 'Unsaved changes. Your note is separate from story progress.'}</p></div>
}

function ContactsApp() {
  const save = useGameStore(state => state.save)
  const { openSophie, openMaya, openCharacter } = useCaseNavigation()
  const sophie = save.prologue?.scene01 ? save.prologue.scene01.introduced : !!save.prologue && (save.prologue.dialogueVersion !== 4 || save.deliveredEvents.some(id => id.startsWith('OPEN-V4-FIRST-ANSWER-')))
  const maya = !save.prologue?.scene01 && save.deliveredEvents.includes('CONN-E01-01')
  const followups = (save.prologue?.scene01 ? ['lucas'] as FollowupContact[] : ['lucas','eli','nora'] as FollowupContact[]).filter(contact => followupAvailable(save, contact))
  return <div className="utility-content"><p className="section-caption">CONTACTS</p>{sophie && <button className="contact-entry" onClick={openSophie}><CharacterAvatar character="sophie" fallback="S" className="contact-avatar"/><span><strong>{save.prologue?.scene01 ? 'Sophie' : 'Sophie Mercer'}</strong><small>Messages</small></span><ChevronRight size={18}/></button>}{maya && <button className="contact-entry" onClick={openMaya}><CharacterAvatar character="maya" fallback="M" className="contact-avatar"/><span><strong>Maya Chen</strong><small>Messages</small></span><ChevronRight size={18}/></button>}{followups.map(contact => { const name = contact === 'lucas' ? 'Lucas Grey' : contact === 'eli' ? 'Eli Ward' : 'Nora Vance'; return <button key={contact} className="contact-entry" onClick={() => openCharacter(contact)}><CharacterAvatar character={contact} fallback={name[0]} className="contact-avatar"/><span><strong>{name}</strong><small>{contact === 'lucas' ? 'From FIND DANIEL' : 'Maya’s case-contact referral'}</small></span><ChevronRight size={18}/></button> })}{!sophie && !maya && !followups.length && <p className="utility-note">No contacts yet.</p>}</div>
}

function PhotosApp() {
  const noteSeen = useGameStore(state => !state.save.prologue?.scene01 && state.save.prologue?.noteSeen)
  const [photo, setPhoto] = useState<string | null>(null)
  return <div className="utility-content"><div className="photos-grid"><button className="photo-tile" onClick={() => setPhoto('/greyhaven-phone-wallpaper.png')} aria-label="Open wallpaper"><img src="/greyhaven-phone-wallpaper.png" alt="Greyhaven canal wallpaper"/></button>{noteSeen && <button className="photo-tile" onClick={() => setPhoto('/daniel-note.svg')} aria-label="Open photo from Sophie"><img src="/daniel-note.svg" alt="Handwritten note from Sophie"/></button>}</div>{photo && (!photo.includes('daniel-note') || noteSeen) && <ChatPhotoViewer src={photo} alt={photo.includes('daniel-note') ? 'Handwritten note from Sophie' : 'Greyhaven canal wallpaper'} onClose={() => setPhoto(null)}/>}</div>
}

function AlertsApp() {
  const save = useGameStore(state => state.save)
  const decide = useGameStore(state => state.decidePendingRecovery)
  const { openSophie } = useCaseNavigation()
  const pending = save.prologue?.dialogueVersion === 4 ? save.prologue.pendingRecovery : undefined
  return <><p className="section-caption">NOTIFICATIONS</p>{save.notifications.length ? save.notifications.slice().reverse().map(item => <article className="utility-card alert-row" key={item.id}><Bell size={18}/><span>{item.id === 'OPEN-V4-FIRST-CONTACT' ? <button className="settings-row setting-action" onClick={openSophie}>{item.text}</button> : item.text}</span></article>) : <EmptyCard Icon={Bell} title="All caught up" text="No new alerts."/>}{pending && <article className="utility-card"><h2>Protected connection request</h2><p>{pending === 'waiting' ? 'Preparing a request.' : pending === 'pending' ? 'A protected connection is waiting for your decision. No recovered records are available yet.' : pending === 'rejected' ? 'Request declined. You can reconsider later; nothing has been imported.' : pending === 'retry' ? 'Request reopened. Full access still waits for the later story step.' : 'Request acknowledged. Full access still waits for the later story step.'}</p>{pending === 'pending' && <div className="choices"><button className="choice" onClick={() => decide('accepted')}>Accept pending request</button><button className="choice" onClick={() => decide('rejected')}>Reject pending request</button></div>}{pending === 'rejected' && <button className="choice" onClick={() => decide('retry')}>Reconsider request</button>}</article>}</>
}

function SettingsApp({ appearance, setAppearance, audio, setAudio, onRestart }: { appearance: Appearance; setAppearance: (value: Appearance) => void; audio: AudioPreferences; setAudio: (value: AudioPreferences) => void; onRestart: () => void }) {
  const save = useGameStore(state => state.save)
  const setReduceMotion = useGameStore(state => state.setReduceMotion)
  const restartStory = useGameStore(state => state.restartStory)
  const [confirm, setConfirm] = useState(false)
  const [restarting, setRestarting] = useState(false)
  const cancel = useRef<HTMLButtonElement>(null)
  const telemetry = import.meta.env.DEV && new URLSearchParams(window.location.search).has('devtools') ? readDevTelemetry() : null
  useEffect(() => { if (confirm) cancel.current?.focus() }, [confirm])
  const restart = async () => {
    setRestarting(true)
    const finished = await restartStory()
    setRestarting(false)
    if (finished) onRestart()
  }
  return <div className="utility-content settings-content">
    <p className="section-caption">DISPLAY</p>
    <div className="settings-group">
      <label className="settings-row"><span className="setting-icon"><Sun size={18}/></span><span className="setting-copy"><strong>Appearance</strong><small>Phone theme</small></span><select aria-label="Appearance" value={appearance} onChange={event => setAppearance(event.target.value as Appearance)}><option value="system">System</option><option value="light">Light</option><option value="dark">Dark</option></select></label>
      <label className="settings-row"><span className="setting-icon"><Moon size={18}/></span><span className="setting-copy"><strong>Reduce Motion</strong><small>Reduce screen animations</small></span><input aria-label="Reduce Motion" type="checkbox" checked={save.settings.reduceMotion} onChange={event => setReduceMotion(event.target.checked)}/></label>
    </div>
    <p className="section-caption">AUDIO</p>
    <div className="settings-group">
      <label className="settings-row"><span className="setting-icon"><Volume2 size={18}/></span><span className="setting-copy"><strong>Sound Effects</strong><small>Message and notification sounds</small></span><input aria-label="Sound Effects" type="checkbox" checked={audio.effects} onChange={event => setAudio({ ...audio, effects: event.target.checked })}/></label>
      <label className="settings-row"><span className="setting-icon"><Music2 size={18}/></span><span className="setting-copy"><strong>Background Music</strong><small>Quiet atmospheric sound</small></span><input aria-label="Background Music" type="checkbox" checked={audio.music} onChange={event => setAudio({ ...audio, music: event.target.checked })}/></label>
    </div>
    <p className="section-caption">GAME DATA</p>
    <div className="settings-group">
      <div className="settings-row"><span className="setting-icon"><LockKeyhole size={18}/></span><span className="setting-copy"><strong>Saved Progress</strong><small>Automatically saved on this device</small></span><Check size={18}/></div>
      <button className="settings-row setting-action" onClick={() => void downloadBackup(save)}><span className="setting-icon"><Download size={18}/></span><span className="setting-copy"><strong>Export Backup</strong><small>Save a copy of your progress</small></span><ChevronRight size={18}/></button>
    </div>
    <p className="section-caption">NEW GAME</p>
    <div className="settings-group"><button className="settings-row setting-action" onClick={() => setConfirm(true)}><span className="setting-icon setting-icon-danger"><RotateCcw size={18}/></span><span className="setting-copy"><strong>Restart Story</strong><small>Start the mystery from the beginning.</small></span><ChevronRight size={18}/></button></div>
    {telemetry && <aside className="settings-devtools"><h2>Developer tools</h2><p>Local timing sample · elapsed {Math.round(telemetry.elapsedMs / 60000)}m · active {Math.round(telemetry.activeMs / 60000)}m · retries {telemetry.puzzleRetries}</p><button onClick={downloadDevTelemetry}>Export playtest metrics</button></aside>}
    {confirm && <div className="settings-dialog-backdrop"><div className="settings-dialog" role="dialog" aria-modal="true" aria-labelledby="restart-title" onKeyDown={event => {
      if (event.key === 'Escape' && !restarting) setConfirm(false)
      if (event.key === 'Tab') {
        const controls = event.currentTarget.querySelectorAll<HTMLButtonElement>('button')
        const first = controls[0], last = controls[controls.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
      }
    }}><h2 id="restart-title">Restart the story?</h2><p>Your current story progress, conversations, choices, relationships and discovered evidence will be erased. This action cannot be undone unless you have a backup.</p><button className="settings-dialog-backup" onClick={() => void downloadBackup(save)}>Export Backup</button><div className="settings-dialog-actions"><button ref={cancel} disabled={restarting} onClick={() => setConfirm(false)}>Cancel</button><button className="settings-restart-confirm" disabled={restarting} onClick={() => void restart()}>{restarting ? 'Restarting…' : 'Restart Story'}</button></div></div></div>}
  </div>
}

export function UtilityApp({ app, back, appearance, setAppearance, audio, setAudio, onRestart }: { app: AppId; back: () => void; appearance: Appearance; setAppearance: (value: Appearance) => void; audio: AudioPreferences; setAudio: (value: AudioPreferences) => void; onRestart: () => void }) {
  const save = useGameStore(state => state.save)
  const title = apps.find(item => item.id === app)?.label ?? app
  if (app === 'maps') return <MapsApp back={back}/>
  if (app === 'archive' && save.prologue?.restored) return <section className="utility-screen"><DanielMirror onExit={back}/></section>
  return <section className="utility-screen"><AppHeader title={title}  back={back}/>
    {app === 'search' ? <SearchApp/> : app === 'board' ? <CaseBoardApp/> : app === 'calendar' ? <CalendarApp/> : app === 'notes' ? <NotesApp/> : app === 'contacts' ? <ContactsApp/> : app === 'photos' ? <PhotosApp/> : app === 'settings' ? <SettingsApp appearance={appearance} setAppearance={setAppearance} audio={audio} setAudio={setAudio} onRestart={onRestart}/> : <div className="utility-content">
      {app === 'calls' && <><p className="section-caption">RECENT CALLS</p><EmptyCard Icon={Phone} title="No calls yet" text="Calls appear when a conversation actually becomes available."/></>}
      {app === 'bulletin' && <><p className="section-caption">PUBLIC BULLETIN</p><article className="utility-card bulletin-card"><span>GREYHAVEN CIVIC DESK</span><h2>A city of records</h2><p>Public notices and historical documents are indexed for residents. Check back for new records.</p></article></>}
      {app === 'files' && <><p className="section-caption">LOCAL FILES</p><article className="utility-card file-row"><FileText size={21}/><div><strong>Welcome.txt</strong><small>Device setup · read only</small></div></article><CaseFiles/></>}
      {app === 'archive' && (save.prologue?.restored ? <DanielMirror/> : <><p className="section-caption">THE ARCHIVE</p><ArchiveCase/></>)}
      {app === 'alerts' && <AlertsApp/>}
      {app === 'mail' && <><p className="section-caption">SHARED MAIL</p><EmptyCard Icon={LockKeyhole} title="No mail shared" text="Only messages explicitly shared through the story will appear here."/></>}
    </div>}
  </section>
}
