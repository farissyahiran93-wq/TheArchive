import { useEffect, useState } from 'react'
import { App as NativeApp } from '@capacitor/app'
import { Capacitor } from '@capacitor/core'
import App from './App'
import { resumeRuntime, startSceneReplay, suspendRuntime, useGameStore } from './game/store'
import { MainMenu, type MenuPage } from './ui/MainMenu'
import './ui/main-menu.css'

export default function GameEntry() {
  const { save, ready, recoveryRequired, hydrate, saveError } = useGameStore()
  const legacy = import.meta.env.DEV && new URLSearchParams(location.search).has('legacyopening')
  const gameplayTest = import.meta.env.DEV && new URLSearchParams(location.search).has('gameplaytest')
  const [playing,setPlaying]=useState(legacy || gameplayTest)
  const [page,setPage]=useState<MenuPage>('main')
  const [session,setSession]=useState(0)
  const [error,setError]=useState('')
  const [startScene,setStartScene]=useState<number | undefined>()
  useEffect(()=>{void hydrate()},[hydrate])
  useEffect(()=>{
    if(playing)return
    const back=()=>setPage(p=>p==='scenes'?'chapters':'main')
    const key=(e:KeyboardEvent)=>{if(e.key==='Escape'&&!document.querySelector('dialog[open]'))back()}
    window.addEventListener('keydown',key);window.addEventListener('popstate',back)
    const native=Capacitor.isNativePlatform()?NativeApp.addListener('backButton',back):undefined
    return()=>{window.removeEventListener('keydown',key);window.removeEventListener('popstate',back);void native?.then(h=>h.remove())}
  },[playing])
  const enter=()=>{setStartScene(undefined);resumeRuntime();setSession(s=>s+1);setPlaying(true)}
  const leave=()=>{suspendRuntime();setPage('main');setPlaying(false)}
  // Reuse the existing recoverable-save screen, preserving its backup controls.
  if(recoveryRequired)return <App/>
  if(!ready)return <div className="boot-message">Opening GREYHAVEN…</div>
  if(playing)return <App key={session} onMenu={leave} onChapterSelect={()=>{suspendRuntime();setPage('chapters');setPlaying(false)}} startScene={startScene}/>
  return <MainMenu save={save} page={page} onPage={setPage} error={error||saveError||undefined} onContinue={enter} onBeginChapter2={()=>{if(!useGameStore.getState().save.chapter2Access)useGameStore.getState().continueChapter2();enter()}} onRestore={async key=>useGameStore.getState().restoreHistorical(key)} onNewGame={async()=>{
    setError('');const ok=await useGameStore.getState().restartStory()
    if(ok){enter()}else setError(useGameStore.getState().saveError??'Could not start a new investigation.')
    return ok
  }} onReplay={async number=>{setError('');await startSceneReplay(number);setStartScene(number);setSession(s=>s+1);setPlaying(true)}}/>
}
