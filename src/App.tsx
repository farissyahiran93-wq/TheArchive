import { PublicStoryBrowser } from './ui/PublicStory'
import { armStoryTick } from './game/storyTimer'
import { Chapter1Investigation } from './ui/Chapter1Investigation'
import { chapter1Active, chapter1NextDue } from './game/chapter1'
import { playtestEnabled } from './game/playtest'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Download } from 'lucide-react'
import { useGameStore } from './game/store'
import type { Pronouns } from './game/types'
import type { AppId } from './content/phone'
import { storyClockByScene } from './content/e01Slice'
import { downloadBackup } from './game/save'
import { markDevActivity, sampleDevTelemetry } from './game/devTelemetry'
import { HomeScreen } from './ui/HomeScreen'
import { accessNextDue } from './game/chapter2Access'
import { AccessArchive, AccessInstallation } from './ui/Chapter2Access'
import { LockScreen } from './ui/LockScreen'
import { Messenger } from './ui/Messenger'
import { BulletinSlice } from './ui/BulletinSlice'
import { PhoneShell } from './ui/PhoneShell'
import { PhoneNotifications } from './ui/PhoneNotifications'
import './ui/phone-interaction.css'
import { UtilityApp } from './ui/UtilityApps'
import { useAppearance } from './ui/useAppearance'
import { useAudioPreferences, usePhoneAudio } from './ui/usePhoneAudio'
import { OpeningPrologue } from './ui/OpeningPrologue'
import { CaseNavigation } from './ui/CaseNavigation'
import type { FollowupContact } from './content/characterFollowups'
import './App.css'
import './ui/phone-polish.css'
import './ui/maps-bulletin.css'
import './ui/ios-overhaul.css'
import './ui/mirror.css'
import './ui/settings-polish.css'

/** Development-only entrance for regression tests that exercise authentic pre-v4 saves. */
function LegacySetup({ onFinish }: { onFinish: (name: string, pronouns?: Pronouns) => void }) {
  const [name, setName] = useState('')
  const [pronouns, setPronouns] = useState<Pronouns | ''>('')
  const clean = name.trim().replace(/\s+/g, ' ')
  const valid = clean.length >= 2 && clean.length <= 24
  return <main className="setup"><p className="eyebrow">UNKNOWN NUMBER / GREYHAVEN</p><h1>Someone is trying to reach you.</h1><p>Sophie Mercer has left you a message about her missing brother. Choose your display name to open the conversation.</p><form onSubmit={event => { event.preventDefault(); if (valid) onFinish(clean, pronouns || undefined) }}><label htmlFor="player-name">Your name</label><input id="player-name" maxLength={24} placeholder="Display name" value={name} onChange={event => setName(event.target.value)}/><label htmlFor="pronouns">Pronouns <span>(optional)</span></label><select id="pronouns" value={pronouns} onChange={event => setPronouns(event.target.value as Pronouns | '')}><option value="">Choose later</option><option>she/her</option><option>he/him</option><option>they/them</option><option>prefer not to say</option></select><button className="primary-button" disabled={!valid}>Set up phone <ArrowRight size={19}/></button></form></main>
}

export default function App() {
  const { save, ready, saveError, recoveryRequired, recoveryRaw, hydrate, reloadPersisted, tick } = useGameStore()
  const installationSeen=useRef(false)
  const [entered, setEntered] = useState(false)
  const [app, setApp] = useState<AppId | null>(null)
  const [messagesThread, setMessagesThread] = useState<'unknown' | 'maya' | 'sophie' | FollowupContact | 'group' | 'eli-lucas' | 'maya-lucas' | null>(null)
  const [openingHome, setOpeningHome] = useState(false)
  const [publicArticleOpen,setPublicArticleOpen]=useState(false)
  const legacyTestMode = import.meta.env.DEV && new URLSearchParams(window.location.search).has('legacyopening')
  const { appearance, setAppearance, theme } = useAppearance()
  const { preferences: audio, setPreferences: setAudio } = useAudioPreferences()
  const soundEvents = [
    ...save.notifications,
    ...(save.prologue?.messages.filter(message => message.sender === 'sophie') ?? []),
    ...(save.prologue?.social?.messages.filter(message => ['sophie','maya','lucas'].includes(message.sender)) ?? []),
    ...save.messages.filter(message => message.sender === 'maya'),
  ]
  usePhoneAudio(audio, soundEvents, ready)
  const authoredOpening = !!save.prologue?.scene01
  const nextDue = Math.min(chapter1NextDue(save), accessNextDue(save,playtestEnabled), (save.prologue?.scene01 ? save.prologue.scene01.queue : [...save.pendingEvents.filter(event => save.prologue?.flow !== 'mirror-first' || event.id.startsWith('OPEN-V4-')), ...(save.prologue?.queue ?? []), ...(save.prologue?.social?.queue ?? []), ...(save.prologue?.recoverySequence?.queue ?? [])]).reduce((earliest, event) => Math.min(earliest, event.dueAt), Infinity))
  const openingImmediate = save.settings.reduceMotion || (typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches)

  useEffect(() => { void hydrate() }, [hydrate])
  useEffect(() => {
    if(save.chapter2Access?.phase==='installing')installationSeen.current=true
    if (!save.chapter2Access?.installCompleted||!installationSeen.current) return
    installationSeen.current=false
    const frame = requestAnimationFrame(() => { setApp(null); setMessagesThread(null) })
    return () => cancelAnimationFrame(frame)
  }, [save.chapter2Access?.installCompleted,save.chapter2Access?.phase])
  useEffect(() => {
    if (!ready || recoveryRequired || !Number.isFinite(nextDue)) return
    const immediate=!!(openingImmediate&&!authoredOpening&&save.prologue?.dialogueVersion!==4&&(save.prologue?.queue?.length||save.prologue?.social?.queue?.length))
    return armStoryTick(nextDue,tick,immediate)
  }, [save.chapter1?.flags.length, save.pendingEvents.length, save.chapter2Access?.recovery?.readyAt, save.chapter2Access?.story?.revision, ready, recoveryRequired, nextDue, tick, openingImmediate, authoredOpening, save.prologue?.dialogueVersion, save.prologue?.queue?.length, save.prologue?.social?.queue?.length])
  useEffect(() => {
    const onVisible = () => { if (document.visibilityState === 'visible') tick() }
    document.addEventListener('visibilitychange', onVisible)
    return () => document.removeEventListener('visibilitychange', onVisible)
  }, [tick])
  useEffect(() => {
    if (!app) return
    const onEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setApp(null) }
    window.addEventListener('keydown', onEscape)
    return () => window.removeEventListener('keydown', onEscape)
  }, [app])
  useEffect(() => {
    if (!import.meta.env.DEV || !ready || !save.player || recoveryRequired) return
    const mark = () => markDevActivity()
    const sample = () => sampleDevTelemetry(useGameStore.getState().save,app,document.visibilityState === 'visible')
    mark()
    sample()
    document.addEventListener('pointerdown',mark)
    document.addEventListener('keydown',mark)
    document.addEventListener('visibilitychange',sample)
    const timer = window.setInterval(sample,5000)
    return () => { sample(); window.clearInterval(timer); document.removeEventListener('pointerdown',mark); document.removeEventListener('keydown',mark); document.removeEventListener('visibilitychange',sample) }
  }, [ready,save.player,save.e01?.sceneId,save.e01?.e01Complete,app,recoveryRequired])

  if (!ready) return <div className="boot-message">Opening THE ARCHIVE…</div>
  if (recoveryRequired) return <div className="boot-message"><div className="recovery"><h1>Save needs attention</h1><p>{saveError}</p><p>Your stored progress has not been overwritten. Download a copy before choosing to reload; any unsaved changes in this tab may be lost.</p>{recoveryRaw !== undefined && <button className="primary-button" onClick={() => void downloadBackup(recoveryRaw)}><Download size={18}/> Download local backup</button>}<button className="recovery-secondary" onClick={() => void reloadPersisted()}>Reload stored save</button></div></div>

  const onHome = () => { if (save.chapter2Access?.phase === 'installing') return; useGameStore.getState().publicStoryAction({type:'device'});setPublicArticleOpen(false); setApp(null); setMessagesThread(null); if (save.prologue && save.prologue.dialogueVersion !== 4 && save.prologue.stage !== 'complete') setOpeningHome(true) }
  const unread = save.messages.filter(message => message.sender === 'fixture' && message.delivery !== 'read').length + save.notifications.filter(item => !item.read && (item.id === 'OPEN-GROUP-ADD' || item.id === 'OPEN-V4-FIRST-CONTACT' || item.id.startsWith('OPEN-SECOND-') || item.id.startsWith('OPEN-S01-') || item.id.startsWith('OPEN-V4-') && item.id !== 'OPEN-V4-PENDING-RECOVERY' || item.id.startsWith('OPEN-GROUP-') || item.id.startsWith('ARC-E01-') || item.id.startsWith('C2-') || item.id.startsWith('CH1-'))).length
  const archiveUnlocked = chapter1Active(save) || !!save.prologue?.scene01?.privateScene03?.complete || !save.prologue?.scene01 && (save.knowledge.player.includes('archive.invitation.accepted') || !!save.prologue?.restored || save.prologue?.dialogueVersion === 4 && ['recovery','mirror','found','complete'].includes(save.prologue.stage))
  const storyTime = save.prologue?.scene01 ? new Date(save.prologue.scene01.startedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : save.prologue && save.prologue.stage !== 'complete'
    ? (save.prologue.stage === 'chat' ? save.prologue.social && ['second','done'].includes(save.prologue.social.phase) ? '08:45' : '08:41' : save.prologue.stage === 'group' ? '08:44' : save.prologue.stage === 'recovery' ? '08:46' : '08:49')
    : save.e01 ? storyClockByScene[save.e01.sceneId] ?? storyClockByScene['E01-S12'] : '08:41'
  const openingActive = !save.prologue?.scene01 && !!save.player && !!save.prologue && save.prologue.dialogueVersion !== 4 && save.prologue.stage !== 'complete' && !openingHome
  const beforeCase = !save.player || !!save.prologue && save.prologue.stage !== 'complete'
  const firstUnread = save.notifications.some(item => item.id === 'OPEN-V4-FIRST-CONTACT' && !item.read)
  const content = !entered ? <LockScreen onContinue={() => { setEntered(true); if (!legacyTestMode) useGameStore.getState().startPhone() }} onOpenMessage={legacyTestMode ? undefined : () => { useGameStore.getState().openSophiePrivate(); setEntered(true); setMessagesThread('sophie'); setApp('messages') }} time={storyTime} sophieWaiting={legacyTestMode && !save.player && !save.prologue || firstUnread} legacyTestMode={legacyTestMode}/> : legacyTestMode && !save.player && !save.prologue ? <LegacySetup onFinish={(name, pronouns) => useGameStore.getState().register(name, pronouns)}/> : openingActive ? <OpeningPrologue onHome={onHome}/> : publicArticleOpen ? <PublicStoryBrowser onClose={()=>setPublicArticleOpen(false)}/> : app === 'archive' && chapter1Active(save) ? <Chapter1Investigation onHome={onHome}/> : app === 'archive' && save.prologue?.scene01?.privateScene03?.complete ? <AccessArchive onHome={onHome}/> : save.prologue?.scene01 && app && !['messages','contacts','photos','notes','calendar','settings','alerts','calls'].includes(app) ? <Messenger onHome={onHome}/> : app === 'messages' ? <Messenger key={messagesThread ?? 'inbox'} onHome={onHome} initialThread={messagesThread}/> : app === 'archive' && !save.prologue?.scene01 && save.prologue?.dialogueVersion === 4 && ['recovery','mirror'].includes(save.prologue.stage) ? <OpeningPrologue onHome={onHome}/> : app === 'bulletin' && !legacyTestMode ? <Messenger onHome={onHome}/> : app === 'bulletin' && !beforeCase ? <BulletinSlice back={onHome}/> : app ? <UtilityApp app={app} back={onHome} appearance={appearance} setAppearance={setAppearance} audio={audio} setAudio={setAudio} onRestart={() => { setEntered(false); setApp(null); setMessagesThread(null); setOpeningHome(false) }}/> : <HomeScreen name={save.player?.name ?? 'Your'} open={id => { if (!legacyTestMode && id === 'search' || save.prologue?.scene01 && ['bulletin','board','files','maps','mail'].includes(id) || id === 'archive' && !chapter1Active(save) && save.prologue?.scene01 && !save.prologue.scene01.privateScene03?.complete) return; if (id === 'archive' && !archiveUnlocked && !(!save.prologue?.scene01 && save.prologue?.dialogueVersion === 4 && ['recovery','mirror'].includes(save.prologue.stage))) return; if (save.prologue?.stage === 'mirror' && id === 'archive' && save.prologue.dialogueVersion !== 4) { setOpeningHome(false); setApp(null); return } setApp(id) }} unread={unread} alertsUnread={save.notifications.filter(item => item.id === 'OPEN-V4-PENDING-RECOVERY' && !item.read).length} archiveBadge={save.chapter1?.publicStory?.flags.includes('index-available')&&!save.chapter1.publicStory.flags.includes('index-opened')?1:0} archiveUnlocked={archiveUnlocked} bulletinEnabled={legacyTestMode} scene01Mode={!!save.prologue?.scene01} onContinueInvestigation={!save.prologue?.scene01 && !legacyTestMode && save.prologue?.restored && save.prologue.stage === 'complete' ? () => { useGameStore.getState().continueMessageFlow(); setApp('archive') } : undefined} storyMode={legacyTestMode && !!save.e01 && !beforeCase} onLock={() => setEntered(false)}/>

  return <PhoneShell onHome={onHome} isHome={!app && !openingActive && entered} theme={theme} reduceMotion={save.settings.reduceMotion} storyTime={save.prologue?.scene01 || !legacyTestMode && !save.prologue ? undefined : storyTime} surface={!entered ? 'lock' : !app && !openingActive ? 'home' : 'app'} screenKey={!entered ? 'lock' : openingActive ? 'opening' : app ?? 'home'} overlay={<>{save.chapter2Access?.phase === 'installing' && <AccessInstallation/>}{legacyTestMode ? undefined : <PhoneNotifications save={save} onDismiss={notice => { if (notice.id === 'CH1-SENDER-FIRST') useGameStore.getState().actIAction('later') }} onOpen={notice => { setPublicArticleOpen(false);if (notice.thread === 'sophie') useGameStore.getState().openSophiePrivate(); setEntered(true); if (notice.thread === 'archive') setApp('archive'); else if (notice.thread === 'alerts') setApp('alerts'); else { setMessagesThread(notice.thread); setApp('messages') } }}/> }</>}>{saveError && <div className="save-error" role="alert">Save warning: {saveError}. Download a backup in Settings.</div>}<CaseNavigation.Provider value={{ openMaya: () => { setMessagesThread('maya'); setApp('messages') }, openSophie: () => { setPublicArticleOpen(false);useGameStore.getState().openSophiePrivate(); setMessagesThread('sophie'); setApp('messages') }, openCharacter: contact => { setMessagesThread(contact); setApp('messages') }, openBulletin: () => setApp(legacyTestMode ? 'bulletin' : 'messages'), openArchive: () => {setPublicArticleOpen(false);setApp('archive')}, openPublicArticle: () => {useGameStore.getState().publicStoryAction({type:'open-article'});if(useGameStore.getState().save.chapter1?.publicStory?.flags.includes('article-opened'))setPublicArticleOpen(true)}, openGroup: () => { setMessagesThread('group'); setApp('messages') } }}>{content}</CaseNavigation.Provider></PhoneShell>
}
