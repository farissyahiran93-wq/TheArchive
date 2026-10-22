import { useState } from 'react'
import { Bookmark, Check, ChevronRight, Info, MoreHorizontal, X } from 'lucide-react'
import { mirrorEntry, relatedMirrorRecords, type MirrorEntry } from '../content/mirror'
import { mirrorAppNames } from '../content/mirrorPresentation'
import { visibleMirrorEntries } from '../game/mirror'
import { useGameStore } from '../game/store'

/** Optional player tools, kept outside the phone's messages and documents. */
export function MirrorRecordActions({ entry, onNavigate }: { entry: MirrorEntry; onNavigate: (id: string) => void }) {
  const [open, setOpen] = useState(false)
  const save = useGameStore(state => state.save)
  const retain = useGameStore(state => state.saveMirrorEvidence)
  const visible = new Set(visibleMirrorEntries(save).map(record => record.id))
  const saved = !!save.evidence[entry.id]
  return <div className="mirror-options">
    <button aria-label="More options" aria-expanded={open} onClick={() => setOpen(!open)}><MoreHorizontal size={24}/></button>
    {open && <section className="mirror-options-sheet" aria-label="Record options" onKeyDown={event => { if (event.key === 'Escape') { event.stopPropagation(); setOpen(false) } }}>
      <header><strong>Options</strong><button aria-label="Close options" onClick={() => setOpen(false)}><X size={20}/></button></header>
      <button disabled={saved} onClick={() => retain(entry.id)}>{saved ? <Check size={19}/> : <Bookmark size={19}/>} {saved ? 'Saved to Case Board' : 'Save to Case Board'}</button>
      <details className="mirror-source-details"><summary><Info size={18}/> Info</summary><dl><dt>Record</dt><dd>{entry.id}</dd><dt>Source</dt><dd>Daniel’s phone · {mirrorAppNames[entry.area]}</dd><dt>Status</dt><dd>Unverified</dd><dt>Original label</dt><dd>{entry.stamp}</dd></dl><p>{entry.body}</p>{entry.area === 'gallery' && <p>Original capture time, location and provenance are unavailable.</p>}</details>
      {(relatedMirrorRecords[entry.id] ?? []).map(id => { const record = mirrorEntry(id); return record && visible.has(id) ? <button key={id} aria-label={`${record.area} / ${record.title}`} onClick={() => { setOpen(false); onNavigate(id) }}>{mirrorAppNames[record.area]} · {record.title}<ChevronRight size={16}/></button> : null })}
    </section>}
  </div>
}
