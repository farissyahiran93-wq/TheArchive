import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ChevronRight, Fingerprint, FolderOpen, LockKeyhole, Play, Plus, Settings, ShieldCheck } from 'lucide-react'
import { PhoneShell } from './PhoneShell'
import { masterChapterMetadata } from '../content/masterChapterMetadata'
import { chapterLibraryForSave, hasInvestigation, resumeLabel, sceneComplete, sceneVisited, snapshotKey } from '../game/sceneLibrary'
import { readMenuPreferences, writeMenuPreferences, type MenuPreferences } from '../game/menuPreferences'
import { useAudioPreferences, usePhoneAudio } from './usePhoneAudio'
import type { GameSave } from '../game/types'
import { listHistoricalSaves } from '../game/save'

export type MenuPage = 'main' | 'chapters' | 'scenes' | 'settings'
export function CinematicBackground({ animated }: { animated: boolean }) {
  const video = useRef<HTMLVideoElement>(null)
  const [failed, setFailed] = useState(false)
  const [playing, setPlaying] = useState(false)
  useEffect(() => {
    const element = video.current
    const sync = () => {
      if (!element) return
      if (!animated || failed || document.visibilityState === 'hidden') { element.pause(); setPlaying(false) }
      else void element.play().catch(() => setPlaying(false))
    }
    sync()
    document.addEventListener('visibilitychange', sync)
    return () => { document.removeEventListener('visibilitychange', sync); element?.pause() }
  }, [animated, failed])
  return <div className="cinematic-background" aria-hidden="true">
    <img src="/images/investigation-room-poster.jpg" alt=""/>
    {animated && !failed && <video ref={video} autoPlay muted loop playsInline preload="auto" poster="/images/investigation-room-poster.jpg" onPlaying={()=>setPlaying(true)} onError={()=>{setFailed(true);setPlaying(false)}} className={playing ? 'is-playing' : ''}><source src="/videos/investigation-room.mp4" type="video/mp4"/></video>}
    <div className="cinematic-shade"/>
  </div>
}

function NewGameDialog({ cancel, confirm, busy }: { cancel: () => void; confirm: () => void; busy: boolean }) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => { const dialog=ref.current; dialog?.showModal(); return () => dialog?.close() }, [])
  return <dialog ref={ref} className="menu-dialog" aria-labelledby="new-game-title" onCancel={e=>{e.preventDefault();if(!busy)cancel()}}>
    <ShieldCheck size={27}/><p className="menu-kicker">NEW INVESTIGATION</p><h2 id="new-game-title">Start again?</h2><p>Your current investigation will be archived on this device before a new Chapter 1 begins. You can restore it from Settings.</p>
    <button autoFocus disabled={busy} onClick={cancel}>Cancel</button><button disabled={busy} className="menu-danger" onClick={confirm}>{busy ? 'Starting…' : 'Start New Game'}</button>
  </dialog>
}

function SceneRestartDialog({number,busy,cancel,confirm}:{number:number;busy:boolean;cancel:()=>void;confirm:()=>void}){
  const ref=useRef<HTMLDialogElement>(null)
  useEffect(()=>{const dialog=ref.current;dialog?.showModal();return()=>dialog?.close()},[])
  return <dialog ref={ref} className="menu-dialog" aria-labelledby="scene-restart-title" onCancel={e=>{e.preventDefault();if(!busy)cancel()}}><ShieldCheck size={27}/><p className="menu-kicker">PLAY FROM SCENE {String(number).padStart(2,'0')}</p><h2 id="scene-restart-title">Start this scene again?</h2><p>Your current save will return to the beginning of this scene. Your choices and progress from this point onward will be permanently replaced. Earlier story progress is kept.</p><button autoFocus disabled={busy} onClick={cancel}>Cancel</button><button disabled={busy} className="menu-danger" onClick={confirm}>{busy?'Starting…':'Start scene'}</button></dialog>
}

export function MainMenu({ save, page, onPage, onContinue, onBeginChapter2, onNewGame, onRestore, onReplay, error }: { save: GameSave; page: MenuPage; onPage: (page: MenuPage) => void; onContinue: () => void; onBeginChapter2: () => void; onNewGame: () => Promise<boolean>; onRestore: (key:string) => Promise<boolean>; onReplay: (number: number) => Promise<void>; error?: string }) {
  const [preferences, setPreferences] = useState(readMenuPreferences)
  const [systemReduced, setSystemReduced] = useState(()=>window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false)
  const { preferences: audio, setPreferences: setAudio } = useAudioPreferences()
  usePhoneAudio(audio, [], true)
  const [confirming, setConfirming] = useState(false)
  const [busy, setBusy] = useState(false)
  const [localError, setLocalError] = useState('')
  const [restartScene,setRestartScene]=useState<number | null>(null)
  const [archives,setArchives]=useState<{key:string;save:GameSave}[]>([])
  const titleRef = useRef<HTMLHeadingElement>(null)
  const visited = hasInvestigation(save)
  const reduced = systemReduced || preferences.reduceMotion || save.settings.reduceMotion
  useEffect(()=>{
    const media=window.matchMedia?.('(prefers-reduced-motion: reduce)')
    const change=()=>setSystemReduced(media?.matches ?? false)
    media?.addEventListener('change',change)
    return()=>media?.removeEventListener('change',change)
  },[])
  useEffect(()=>{if(page !== 'main')titleRef.current?.focus()},[page])
  useEffect(()=>{if(page==='settings')void listHistoricalSaves().then(setArchives).catch(e=>setLocalError(String(e)))},[page,save.saveRevision])
  const update=(next:Partial<MenuPreferences>)=>{const p={...preferences,...next};setPreferences(p);writeMenuPreferences(p)}
  const start=async()=>{setBusy(true);setLocalError('');try{if(await onNewGame())setConfirming(false)}catch(e){setLocalError(String(e))}finally{setBusy(false)}}
  const replay=async(n:number)=>{setBusy(true);setLocalError('');try{await onReplay(n);setRestartScene(null)}catch(e){setLocalError(e instanceof Error?e.message:'Scene could not start.')}finally{setBusy(false)}}
  const restore=async(key:string)=>{setBusy(true);setLocalError('');try{if(await onRestore(key))onPage('main');else setLocalError('Historical save could not be restored.')}catch(e){setLocalError(String(e))}finally{setBusy(false)}}
  const back=()=>onPage(page==='scenes'?'chapters':'main')
  const library=chapterLibraryForSave(save),chapter=library[0]
  const chapterStarted=chapter.scenes.some(scene=>sceneVisited(save,scene.number))
  const chapterStatus=save.chapter1?.chapterComplete||save.chapter1?.inventoryFinaleV2?.complete?'COMPLETED':chapterStarted?'IN PROGRESS':'LOCKED'
  return <PhoneShell onHome={back} isHome={false} theme="dark" reduceMotion={reduced} surface="menu">
    <main className={`archive-menu${page==='main'?'':' menu-subpage'}`} aria-label={page==='main'?'GREYHAVEN main menu':page==='settings'?'Game settings':'Chapter archive'}>
      <CinematicBackground animated={page==='main' && preferences.animatedBackground && !reduced}/>
      {page==='main' ? <div className="menu-main-content">
        <header className="menu-brand"><Fingerprint size={32} strokeWidth={1}/><p className="menu-kicker">A PRIVATE INVESTIGATION</p><h1>GREYHAVEN</h1><div className="menu-rule"/><p className="menu-tagline">Every secret leaves a trace.</p></header>
        <div className="menu-actions">
          <p className="menu-section-label"><i/> INVESTIGATION TERMINAL</p>
          <button className="menu-action menu-continue" disabled={!visited || busy} onClick={onContinue}><Play size={19}/><span><strong>CONTINUE GAME</strong><small>{visited?resumeLabel(save):'No saved investigation yet'}</small></span><ChevronRight size={16}/></button>
          <button className="menu-action" disabled={busy} onClick={()=>visited?setConfirming(true):void start()}><Plus size={20}/><span><strong>NEW GAME</strong></span><ChevronRight size={16}/></button>
          <button className="menu-action" onClick={()=>onPage('chapters')}><FolderOpen size={19}/><span><strong>CHAPTERS &amp; SCENES</strong></span><ChevronRight size={16}/></button>
          <button className="menu-action" onClick={()=>onPage('settings')}><Settings size={19}/><span><strong>SETTINGS</strong></span><ChevronRight size={16}/></button>
          <footer className="menu-footer"><span>GREYHAVEN</span><span>LOCAL SAVE · PRIVATE DEVICE</span></footer>
        </div>
      </div> : <div className="menu-page-content">
        <header className="menu-page-header"><button onClick={back} aria-label={page==='scenes'?'Back to chapters':'Back to main menu'}><ArrowLeft size={20}/></button><span>GREYHAVEN</span></header>
        <div className="menu-page-scroll">
          <p className="menu-kicker">{page==='settings'?'DEVICE PREFERENCES':page==='scenes'?(save.masterOpening?'CHAPTER 1 · THE FIRST TRACE':'CHAPTER 1 · THE MISSING ENTRY'):'YOUR INVESTIGATION'}</p>
          <h1 ref={titleRef} tabIndex={-1}>{page==='settings'?'Settings':page==='scenes'?'Scenes':'Chapter archive'}</h1>
          <p className="menu-description">{page==='settings'?'Make the investigation your own.':page==='scenes'?'Start again from a scene and continue your story with new choices. Progress from that scene onward will be replaced.':'Choose where to continue your investigation.'}</p>
          {page==='scenes'&&save.prologue?.scene01?.masterScene01&&save.masterScene04&&save.masterScene04.revision!=='trace-first'&&<p role="status">This save uses the earlier archive-first conversation. To use the new TRACE-first flow, restart Scene 4; an old Scene 5 checkpoint cannot be safely converted. Your save changes only after confirmation.</p>}
          {page==='chapters' && <>{library.map(c=><button className="chapter-card" key={c.id} onClick={()=>onPage('scenes')}><span className="chapter-number">01</span><span className="chapter-status">{chapterStatus}</span><FolderOpen size={29} strokeWidth={1}/><small>CHAPTER {c.number}</small><h2>{c.title}</h2><p>{c.scenes.length} available scenes</p><span className="chapter-open">VIEW SCENES <ChevronRight size={16}/></span></button>)}{save.masterOpening?<button className="chapter-card" disabled><span className="chapter-number">02</span><span className="chapter-status">{save.deliveredEvents.includes('TA-CH02-UNLOCKED')?'UNLOCKED':'LOCKED'}</span><FolderOpen size={29} strokeWidth={1}/><small>CHAPTER 2</small><h2>THE OTHER COPY</h2><p>{save.deliveredEvents.includes('TA-CH02-UNLOCKED')?'Unlocked · scenes not yet available.':'Complete Chapter 1 to unlock.'}</p></button>:<button className="chapter-card" disabled={!save.unlockedEpisodes.includes('chapter2')} onClick={onBeginChapter2}><span className="chapter-number">02</span><span className="chapter-status">{save.unlockedEpisodes.includes('chapter2')?'UNLOCKED':'LOCKED'}</span><FolderOpen size={29} strokeWidth={1}/><small>CHAPTER 2</small><h2>THE PEOPLE HE LEFT BEHIND</h2><p>{save.unlockedEpisodes.includes('chapter2')?'Begin when you are ready.':'Complete Chapter 1 to unlock.'}</p><span className="chapter-open">{save.unlockedEpisodes.includes('chapter2')?'BEGIN CHAPTER 2':'LOCKED'} <ChevronRight size={16}/></span></button>}{save.masterOpening&&masterChapterMetadata.slice(2).map(({title},i)=><button className="chapter-card" disabled key={title}><span className="chapter-number">0{i+3}</span><span className="chapter-status">LOCKED</span><FolderOpen size={29} strokeWidth={1}/><small>CHAPTER {i+3}</small><h2>{title}</h2><p>10 scenes · not yet available.</p></button>)}</>}
          {page==='scenes' && <div className="scene-library">{chapter.scenes.map(scene=>{
            const seen=sceneVisited(save,scene.number), complete=sceneComplete(save,scene.number), entry=save.replayEntries?.[snapshotKey(save,scene)]
            return <article className={`library-scene${seen?' discovered':''}`} key={scene.id} data-scene-number={scene.number}>
              <span className="scene-number">{String(scene.number).padStart(2,'0')}</span><div><small>{complete?'COMPLETED':seen?'VISITED':'LOCKED'}</small><h2>{seen?scene.title:'Undiscovered scene'}</h2>{seen&&!entry&&<p>No recorded scene-entry context in this save.</p>}<button disabled={!seen||!entry||busy} onClick={()=>setRestartScene(scene.number)}>{seen&&entry?<><Play size={13}/> Play from this scene</>:<><LockKeyhole size={13}/>{seen?'Play unavailable':'Undiscovered'}</>}</button></div>
            </article>
          })}</div>}
          {page==='settings' && <div className="menu-settings">
            <h2>Audio</h2>
            <label><span>Master sound</span><input type="checkbox" checked={audio.master!==false} onChange={e=>setAudio({...audio,master:e.target.checked})}/></label>
            <label><span>Background music</span><input type="checkbox" checked={audio.music} onChange={e=>setAudio({...audio,music:e.target.checked})}/></label>
            <label className="menu-slider"><span>Music volume <small>{Math.round((audio.musicVolume??1)*100)}%</small></span><input aria-label="Music volume" type="range" min="0" max="1" step=".05" value={audio.musicVolume??1} onChange={e=>setAudio({...audio,musicVolume:Number(e.target.value)})}/></label>
            <label><span>Notification sounds</span><input type="checkbox" checked={audio.effects} onChange={e=>setAudio({...audio,effects:e.target.checked})}/></label>
            <label className="menu-slider"><span>Sound effects volume <small>{Math.round((audio.effectsVolume??1)*100)}%</small></span><input aria-label="Sound effects volume" type="range" min="0" max="1" step=".05" value={audio.effectsVolume??1} onChange={e=>setAudio({...audio,effectsVolume:Number(e.target.value)})}/></label>
            <h2>Dialogue</h2><label><span>Typing speed</span><select aria-label="Typing speed" value={preferences.typingSpeed} onChange={e=>update({typingSpeed:e.target.value as MenuPreferences['typingSpeed']})}><option value="slow">Slow</option><option value="normal">Normal</option><option value="fast">Fast</option></select></label>
            <p>Changes apply to newly scheduled messages. Every reply still needs Send.</p>
            <h2>Investigation guidance</h2><label><span>Guidance</span><select aria-label="Investigation guidance" value={preferences.guidance} onChange={e=>update({guidance:e.target.value as MenuPreferences['guidance']})}><option value="on">On</option><option value="minimal">Minimal</option><option value="off">Off</option></select></label><p>Guidance does not change story access or progression.</p>
            <h2>Visuals</h2><label><span>Animated background</span><input type="checkbox" checked={preferences.animatedBackground} onChange={e=>update({animatedBackground:e.target.checked})}/></label><label><span>Reduce motion</span><input type="checkbox" checked={preferences.reduceMotion} onChange={e=>update({reduceMotion:e.target.checked})}/></label>
            {(systemReduced||save.settings.reduceMotion)&&<p>Reduced motion is also enabled by your device or phone settings.</p>}
            <h2>Language</h2><p>English · current story language</p><h2>Save management</h2><button className="menu-reset" disabled={!visited||busy} onClick={()=>setConfirming(true)}>Start a new investigation</button><p>Starting again archives the current save on this device. Restore an archived investigation below.</p>{archives.map(({key,save:archived})=><button key={key} className="menu-reset" disabled={busy} onClick={()=>void restore(key)}>Restore {archived.chapter1Edition==='ch01-v2-10'?'Chapter 1 v2':'historical investigation'} · {archived.player?.name??'Unnamed player'}</button>)}
          </div>}
        </div>
      </div>}
      {(error||localError)&&<p className="menu-error" role="alert">{error||localError}</p>}
      {restartScene!==null&&<SceneRestartDialog number={restartScene} busy={busy} cancel={()=>setRestartScene(null)} confirm={()=>void replay(restartScene)}/>}
      {confirming&&<NewGameDialog cancel={()=>setConfirming(false)} confirm={()=>void start()} busy={busy}/>}
    </main>
  </PhoneShell>
}
