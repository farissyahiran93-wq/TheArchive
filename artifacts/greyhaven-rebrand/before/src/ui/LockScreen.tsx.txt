import { useEffect, useRef, useState } from 'react'
import { ChevronUp, LockKeyhole } from 'lucide-react'

export function LockScreen({ onContinue, onOpenMessage, time, sophieWaiting = false, legacyTestMode = false }: { onContinue: () => void; onOpenMessage?: () => void; time?: string; sophieWaiting?: boolean; legacyTestMode?: boolean }) {
  const touchStart = useRef<number | null>(null)
  const [now,setNow]=useState(()=>new Date())
  useEffect(()=>{const id=window.setInterval(()=>setNow(new Date()),30_000);return()=>window.clearInterval(id)},[])
  const displayTime=time??now.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})
  const displayDate=time?'Thursday, 8 October':now.toLocaleDateString([], {weekday:'long',day:'numeric',month:'long'})
  return <main className="lock-screen" aria-label="Phone lock screen" onTouchStart={event => { touchStart.current = event.touches[0].clientY }} onTouchEnd={event => { if (touchStart.current !== null && touchStart.current - event.changedTouches[0].clientY > 65) onContinue(); touchStart.current = null }}>
    <div className="lock-clock"><LockKeyhole size={20} strokeWidth={2.3}/><p>{displayDate}</p><h1>{displayTime.replace(/^0/, '')}</h1></div>
    {sophieWaiting && <button className="opening-lock-message" onClick={onOpenMessage ?? onContinue} aria-label={legacyTestMode ? "Open Sophie's new message" : 'Open unknown message notification'}><span>MESSAGES · UNKNOWN NUMBER</span><strong>{legacyTestMode ? 'My name is Sophie Mercer.' : 'New message'}</strong><small>{legacyTestMode ? 'My brother gave me this number before he disappeared…' : 'Hi. Sorry to message out of nowhere…'}</small></button>}
    <div className="lock-bottom"><p>YOUR PHONE <span>PRIVATE DEVICE</span></p><button onClick={onContinue} aria-label="Enter the archive"><ChevronUp size={20}/><span>Swipe up to open</span></button></div>
  </main>
}
