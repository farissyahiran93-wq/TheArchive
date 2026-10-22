import { createPortal } from 'react-dom'
import { useLayoutEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Info, Bookmark, Check, Minus, Plus } from 'lucide-react'
import type { MirrorEntry } from '../content/mirror'
import { galleryMediaForRecord } from '../content/galleryMedia'

/** Presentation only: viewing and zooming never award a finding or recipient receipt. */
export function MirrorMediaViewer({ entry, initialMediaId, onClose, onSave, saved }: { entry: MirrorEntry; initialMediaId?: string; onClose: () => void; onSave: () => void; saved: boolean }) {
  const items = galleryMediaForRecord(entry.id)
  const [info, setInfo] = useState(false)
  const [index, setIndex] = useState(Math.max(0, items.findIndex(item => item.id === initialMediaId)))
  const [zoom, setZoom] = useState(1)
  const [loaded, setLoaded] = useState('')
  const [failed, setFailed] = useState('')
  const [retry, setRetry] = useState(0)
  const close = useRef<HTMLButtonElement>(null)
  const pan = useRef<HTMLDivElement>(null)
  const media = items[index]
  const imageKey = `${media?.id}:${retry}`
  useLayoutEffect(() => { const previous = document.activeElement as HTMLElement | null; close.current?.focus(); return () => previous?.focus() }, [])
  function select(next: number) { setIndex(next); setZoom(1); pan.current?.scrollTo(0, 0) }
  return createPortal(<section className="mirror-media-viewer" role="dialog" aria-modal="true" aria-label="Photo viewer" onKeyDown={event => {
    if (event.key === 'Escape') onClose()
    if (event.key === 'Tab') {
      const buttons = event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled), [tabindex="0"]')
      const first = buttons[0], last = buttons[buttons.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
    }
  }}><header><button ref={close} aria-label="Back to album" onClick={onClose}><ChevronLeft size={26}/></button><strong>{media?.title ?? entry.title}</strong><button aria-label="Photo info" aria-expanded={info} onClick={() => setInfo(!info)}><Info size={22}/></button></header><div className="mirror-media-scroll">
    <h2 className="sr-only">{media?.title ?? entry.title}</h2>
    {items.length > 1 && <nav className="mirror-image-navigation" aria-label="Album image navigation"><button aria-label="Previous image" disabled={index === 0} onClick={() => select(index - 1)}><ChevronLeft size={22}/></button><span>{index + 1} / {items.length}</span><button aria-label="Next image" disabled={index === items.length - 1} onClick={() => select(index + 1)}><ChevronRight size={22}/></button></nav>}
    {media && failed !== imageKey ? <>
      {loaded !== imageKey && <p role="status">Loading photo…</p>}
      <div className="mirror-image-pan" ref={pan} tabIndex={0} aria-label="Image pan area"><img key={imageKey} src={media.src} alt={media.caption} decoding="async" onLoad={() => setLoaded(imageKey)} onError={() => setFailed(imageKey)} style={{ width: `${zoom * 100}%`, maxWidth: 'none', maxHeight: zoom === 1 ? '65dvh' : 'none' }}/></div>
      <div className="mirror-zoom-controls" aria-label="Image zoom"><button disabled={zoom <= 1 || loaded !== imageKey} onClick={() => setZoom(value => Math.max(1, value - .5))} aria-label="Zoom out"><Minus size={18}/></button><output aria-label="Zoom level">{Math.round(zoom * 100)}%</output><button disabled={zoom >= 4 || loaded !== imageKey} onClick={() => setZoom(value => Math.min(4, value + .5))} aria-label="Zoom in"><Plus size={18}/></button><button onClick={() => { setZoom(1); pan.current?.scrollTo(0, 0) }}>Fit image</button></div>

    </> : <div role="status"><p>Photo unavailable.</p>{media && <button onClick={() => setRetry(value => value + 1)}>Retry image</button>}</div>}
    {info && <section className="mirror-photo-info" aria-label="Photo details"><h3>{media?.title}</h3><p>{media?.caption}</p><p>{entry.body}</p><dl><dt>Capture time</dt><dd>Unknown</dd><dt>Location</dt><dd>Unknown</dd><dt>Source</dt><dd>{entry.id} · Unverified</dd></dl></section>}
    {failed === imageKey && <p>{media?.caption}</p>}
    </div><footer className="mirror-photo-footer"><button aria-label={saved ? 'Saved to Case Board' : 'Save to Case Board'} disabled={saved} onClick={onSave}>{saved ? <Check size={23}/> : <Bookmark size={23}/>}</button><span>{index + 1} of {items.length}</span><button aria-label="Photo details" aria-expanded={info} onClick={() => setInfo(!info)}><Info size={23}/></button></footer></section>, document.querySelector('.device') ?? document.body)
}
