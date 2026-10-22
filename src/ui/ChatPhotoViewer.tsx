import { useEffect, useRef, useState } from 'react'
import { X, ZoomIn, ZoomOut } from 'lucide-react'

export function ChatPhotoViewer({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const pointers = useRef(new Map<number, { x: number; y: number }>())
  const previousDistance = useRef<number | null>(null)
  const close = useRef<HTMLButtonElement>(null)
  useEffect(() => { const previous = document.activeElement as HTMLElement | null; close.current?.focus(); return () => previous?.focus() }, [])
  return <div className="chat-photo-viewer" role="dialog" aria-modal="true" aria-label="Photo viewer" onKeyDown={event => { if (event.key === 'Escape') onClose(); if (event.key === 'Tab') { const buttons = event.currentTarget.querySelectorAll<HTMLButtonElement>('button:not(:disabled)'); const first = buttons[0], last = buttons[buttons.length - 1]; if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() } else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() } } }}>
    <header><button ref={close} onClick={onClose} aria-label="Close photo"><X size={25}/></button><div><button aria-label="Zoom out" disabled={zoom <= 1} onClick={() => { setZoom(value => Math.max(1, value - .5)); setPan({ x: 0, y: 0 }) }}><ZoomOut size={23}/></button><button aria-label="Zoom in" disabled={zoom >= 4} onClick={() => setZoom(value => Math.min(4, value + .5))}><ZoomIn size={23}/></button></div></header>
    <div className="chat-photo-canvas" onDoubleClick={() => { setZoom(value => value === 1 ? 2 : 1); setPan({ x: 0, y: 0 }) }} onPointerDown={event => { event.currentTarget.setPointerCapture(event.pointerId); pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY }) }} onPointerMove={event => {
      const previous = pointers.current.get(event.pointerId)
      if (!previous) return
      pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY })
      if (pointers.current.size === 2) { const [a,b] = [...pointers.current.values()]; const distance = Math.hypot(a.x-b.x, a.y-b.y); if (previousDistance.current) setZoom(value => Math.min(4, Math.max(1, value * distance / previousDistance.current!))); previousDistance.current = distance }
      else if (zoom > 1) setPan(value => ({ x: Math.max(-600, Math.min(600, value.x + event.clientX - previous.x)), y: Math.max(-800, Math.min(800, value.y + event.clientY - previous.y)) }))
    }} onPointerUp={event => { pointers.current.delete(event.pointerId); previousDistance.current = null }} onPointerCancel={event => { pointers.current.delete(event.pointerId); previousDistance.current = null }}><img src={src} alt={alt} draggable={false} style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})` }}/></div>
  </div>
}
