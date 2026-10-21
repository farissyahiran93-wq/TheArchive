import { createPortal } from 'react-dom'
import { useLayoutEffect, useRef, useState } from 'react'
import type { MirrorEntry } from '../content/mirror'
import { galleryMediaForRecord } from '../content/galleryMedia'

/** Presentation only: viewing and zooming never award a finding or recipient receipt. */
export function MirrorMediaViewer({ entry, initialMediaId, onClose, onSave, saved }: { entry: MirrorEntry; initialMediaId?: string; onClose: () => void; onSave: () => void; saved: boolean }) {
  const items = galleryMediaForRecord(entry.id)
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
  return createPortal(<section className="mirror-media-viewer" role="dialog" aria-modal="true" aria-label="Recovered media viewer" onKeyDown={event => {
    if (event.key === 'Escape') onClose()
    if (event.key === 'Tab') {
      const buttons = event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled), [tabindex="0"]')
      const first = buttons[0], last = buttons[buttons.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
    }
  }}><header><button ref={close} onClick={onClose}>Back to album</button><strong>Recovered media</strong></header><div className="mirror-media-scroll">
    <h2>{media?.title ?? entry.title}</h2>
    {items.length > 1 && <nav className="mirror-image-navigation" aria-label="Album image navigation"><button disabled={index === 0} onClick={() => select(index - 1)}>Previous image</button><span>{index + 1} / {items.length}</span><button disabled={index === items.length - 1} onClick={() => select(index + 1)}>Next image</button></nav>}
    {media && failed !== imageKey ? <>
      {loaded !== imageKey && <p role="status">Loading recovered image...</p>}
      <div className="mirror-image-pan" ref={pan} tabIndex={0} aria-label="Image pan area"><img key={imageKey} src={media.src} alt={media.caption} decoding="async" onLoad={() => setLoaded(imageKey)} onError={() => setFailed(imageKey)} style={{ width: `${zoom * 100}%`, maxWidth: 'none', maxHeight: zoom === 1 ? '48dvh' : 'none' }}/></div>
      <div className="mirror-zoom-controls" aria-label="Image zoom"><button disabled={zoom <= 1 || loaded !== imageKey} onClick={() => setZoom(value => Math.max(1, value - .5))} aria-label="Zoom out">-</button><output aria-label="Zoom level">{Math.round(zoom * 100)}%</output><button disabled={zoom >= 4 || loaded !== imageKey} onClick={() => setZoom(value => Math.min(4, value + .5))} aria-label="Zoom in">+</button><button onClick={() => { setZoom(1); pan.current?.scrollTo(0, 0) }}>Fit image</button></div>
      <p>Scroll across the enlarged image to inspect details.</p>
    </> : <div role="status"><p>Image unavailable. The recovered description remains readable.</p>{media && <button onClick={() => setRetry(value => value + 1)}>Retry image</button>}</div>}
    <p>{media?.caption}</p><p>{entry.body}</p><dl><dt>Capture timestamp</dt><dd>Not recovered</dd><dt>Location / GPS</dt><dd>Not recovered / no visit established</dd><dt>Provenance</dt><dd>{entry.id} / read-only snapshot / unverified visual prop. Supplied artwork is not an authenticated original.</dd></dl><button disabled={saved} onClick={onSave}>{saved ? 'Observation saved' : 'Save recovered observation'}</button><p>Retaining this observation does not authenticate the image, verify a finding or share it with anyone.</p></div></section>, document.querySelector('.device') ?? document.body)
}
