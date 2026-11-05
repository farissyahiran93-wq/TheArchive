import { useEffect, useRef, useState } from 'react'
import { App as NativeApp } from '@capacitor/app'
import { Capacitor } from '@capacitor/core'
import { traceDurationMs } from '../content/traceReference'
import { useGameStore } from '../game/store'
import { traceInitial } from '../game/trace'

/** A single elapsed-time clock. Persistence contains checkpoints, never frames. */
export function useTraceScan(active: boolean, reduced: boolean) {
  const scan = useGameStore(s => s.save.chapter1?.trace?.scan)
  const status = scan?.status ?? 'idle', base = scan?.elapsedMs ?? 0
  const [frame, setFrame] = useState(base)
  const elapsed = useRef(base), resume = useRef(false)
  useEffect(() => {
    const visible = (shown: boolean) => {
      const p=useGameStore.getState().save.chapter1?.trace ?? traceInitial()
      if (!shown && p.scan.status === 'running') {
        resume.current = active
        useGameStore.getState().traceAction({type:'checkpoint',elapsedMs:elapsed.current,status:'paused'})
      } else if (shown && active && resume.current && p.scan.status === 'paused') {
        resume.current=false
        useGameStore.getState().traceAction({type:'start'})
      }
    }
    const visibility=()=>visible(document.visibilityState==='visible')
    const hide=()=>visible(false), show=()=>visible(true)
    document.addEventListener('visibilitychange',visibility)
    window.addEventListener('pagehide',hide);window.addEventListener('pageshow',show)
    const native=Capacitor.isNativePlatform()?NativeApp.addListener('appStateChange',s=>visible(s.isActive)):undefined
    return()=>{document.removeEventListener('visibilitychange',visibility);window.removeEventListener('pagehide',hide);window.removeEventListener('pageshow',show);void native?.then(h=>h.remove())}
  },[active])
  useEffect(() => {
    elapsed.current=base
    if (status !== 'running' || !active) return
    const started=performance.now()
    const update=()=>{
      if(document.visibilityState!=='visible')return
      elapsed.current=reduced?traceDurationMs:Math.min(traceDurationMs,base+performance.now()-started)
      setFrame(elapsed.current)
      if(elapsed.current>=traceDurationMs)useGameStore.getState().traceAction({type:'checkpoint',elapsedMs:traceDurationMs,status:'complete'})
    }
    update()
    const timer=window.setInterval(update,80)
    return()=>{
      window.clearInterval(timer)
      // Also checkpoints on tab change, phone Home, app exit and React unmount.
      if(useGameStore.getState().save.chapter1?.trace?.scan.status==='running')useGameStore.getState().traceAction({type:'checkpoint',elapsedMs:elapsed.current,status:'paused'})
    }
  },[status,base,active,reduced])
  return status==='running'?Math.max(base,frame):base
}
