import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import type { GameSave } from '../game/types'
import { phoneNotices, type PhoneNotice } from '../game/phonePresentation'
import { CharacterAvatar } from './CharacterAvatar'

export function PhoneNotifications({ save, onOpen }: { save: GameSave; onOpen: (notice: PhoneNotice) => void }) {
  const known = useRef<Set<string> | null>(null)
  const [queue, setQueue] = useState<PhoneNotice[]>([])
  const [drag, setDrag] = useState({ x: 0, y: 0 })
  const start = useRef<{ x: number; y: number } | null>(null)
  const notice = queue[0]
  useEffect(() => {
    const current = phoneNotices(save)
    if (!known.current) { known.current = new Set(current.map(item => item.id)); return }
    const incoming = current.filter(item => !known.current!.has(item.id))
    current.forEach(item => known.current!.add(item.id))
    if (incoming.length) setQueue(items => incoming.reduce((next, item) => { const index = next.findIndex(current => current.thread === item.thread); return index < 0 ? [...next, item] : next.map((current, i) => i === index ? item : current) }, items))
  }, [save])
  useEffect(() => {
    if (!notice) return
    const timer = window.setTimeout(() => { setQueue(items => items.slice(1)); setDrag({ x: 0, y: 0 }) }, 5000)
    return () => window.clearTimeout(timer)
  }, [notice])
  if (!notice) return null
  const dismiss = () => { setQueue(items => items.slice(1)); setDrag({ x: 0, y: 0 }); start.current = null }
  return <aside className="phone-notification-layer" aria-label="Incoming notification" aria-live="polite">
    <div className="phone-notification" style={{ transform: `translate(${drag.x}px, ${Math.min(0, drag.y)}px)`, opacity: Math.max(.3, 1 - Math.max(Math.abs(drag.x), -drag.y) / 240) }} onPointerDown={event => { if ((event.target as HTMLElement).closest('.phone-notification-dismiss')) return; start.current = { x: event.clientX, y: event.clientY }; event.currentTarget.setPointerCapture(event.pointerId) }} onPointerMove={event => { if (start.current) setDrag({ x: event.clientX - start.current.x, y: event.clientY - start.current.y }) }} onPointerUp={event => { if (!start.current) return; const x = event.clientX - start.current.x, y = event.clientY - start.current.y; start.current = null; if (Math.abs(x) > 65 || y < -35) dismiss(); else { setDrag({ x: 0, y: 0 }); onOpen(notice); dismiss() } }} onPointerCancel={() => { start.current = null; setDrag({ x: 0, y: 0 }) }}>
      <button className="phone-notification-open" aria-label={notice.title === 'Unknown number' ? 'Open unknown message' : `Open notification from ${notice.title}`} onClick={event => { if (event.detail === 0) { onOpen(notice); dismiss() } }}><CharacterAvatar character={notice.avatar} fallback={notice.thread === 'group' ? 'FD' : '?'} className="notice-avatar"/><span><small>MESSAGES <time>now</time></small><strong>{notice.title}</strong><span>{notice.text}</span>{notice.id === 'OPEN-S03-FIRST-MESSAGE' && <small>Tap to open conversation</small>}</span></button>
      <button className="phone-notification-dismiss" aria-label="Dismiss notification" onClick={dismiss}><X size={15}/></button>
    </div>
  </aside>
}
