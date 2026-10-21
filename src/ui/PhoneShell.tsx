import { useEffect, useState, type ReactNode } from 'react'
import { Capacitor } from '@capacitor/core'
import { Wifi } from 'lucide-react'

function useVisualHeight() {
  useEffect(() => {
    const viewport = window.visualViewport
    const sync = () => document.documentElement.style.setProperty('--visual-height', `${viewport?.height ?? window.innerHeight}px`)
    sync()
    viewport?.addEventListener('resize', sync)
    viewport?.addEventListener('scroll', sync)
    window.addEventListener('resize', sync)
    return () => {
      viewport?.removeEventListener('resize', sync)
      viewport?.removeEventListener('scroll', sync)
      window.removeEventListener('resize', sync)
      document.documentElement.style.removeProperty('--visual-height')
    }
  }, [])
}

export function PhoneShell({ children, onHome, isHome, theme, reduceMotion, storyTime, surface = 'app', screenKey }: { children: ReactNode; onHome: () => void; isHome: boolean; theme: 'light' | 'dark'; reduceMotion: boolean; storyTime?: string; surface?: 'home' | 'lock' | 'app'; screenKey?: string }) {
  useVisualHeight()
  const native = Capacitor.isNativePlatform()
  const [time, setTime] = useState(() => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
    const id = window.setInterval(update, 30_000)
    return () => window.clearInterval(id)
  }, [])
  return <div className={`app-root theme-${theme}${reduceMotion ? ' reduce-motion' : ''}${native ? ' native-app' : ''}`}>
    <div className={`device surface-${surface}`}>
      {!native && <div className="status-bar" aria-label={storyTime ? `Greyhaven story time 8 October 2026 ${storyTime}` : `Local time ${time}`}><span className="status-time">{(storyTime ?? time).replace(/^0/, '')}</span><span className="device-island" aria-hidden="true"><i/></span><span className="status-indicators" aria-hidden="true"><span className="signal-bars"><i/><i/><i/><i/></span><Wifi size={17} strokeWidth={2.5}/><span className="battery-icon"><span/></span></span></div>}
      <div className="phone-content" key={screenKey}>{children}</div>
      {!native && <nav className="system-nav" aria-label="Phone navigation"><button onClick={onHome} aria-label="Go home" disabled={isHome}><span className="gesture-line"/></button></nav>}
    </div>
  </div>
}
