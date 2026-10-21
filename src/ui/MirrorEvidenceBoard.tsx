import { CharacterAvatar } from './CharacterAvatar'
import { MirrorMediaViewer } from './MirrorMediaViewer'
import { galleryMediaForRecord } from '../content/galleryMedia'
import { canInspectMirrorEntry, visibleMirrorEntries } from '../game/mirror'
import { useState } from 'react'
import { mirrorCatalog, mirrorConnections, mirrorPairKey } from '../content/mirror'
import { canMirrorLink } from '../game/mirror'
import { useGameStore } from '../game/store'

/** A separate private workspace; it never awards canonical knowledge or source authentication. */
export function MirrorEvidenceBoard({ onOpen }: { onOpen?: (id: string) => void }) {
  const save = useGameStore(state => state.save)
  const link = useGameStore(state => state.linkMirrorEvidence)
  const unlink = useGameStore(state => state.unlinkMirrorEvidence)
  const [selected, setSelected] = useState<string[]>([])
  const [feedback, setFeedback] = useState('')
  const [mediaRecord, setMediaRecord] = useState<string>()
  const retain = useGameStore(state => state.saveMirrorEvidence)
  const mediaEntry = mirrorCatalog.find(record => record.id === mediaRecord && canInspectMirrorEntry(save, record.id))
  const sources = visibleMirrorEntries(save).filter(record => !!save.evidence[record.id])
  const links = save.prologue?.mirrorLinks ?? []
  return <section className="mirror-evidence-board" aria-label="Recovered evidence workspace">
    <div className="mirror-identity"><CharacterAvatar character="daniel" fallback="D" className="contact-avatar"/><h2>Recovered evidence</h2></div><p>Private observations and hypotheses. Opening or linking a recovered record cannot verify it or tell Sophie or Maya.</p>
    {!sources.length && <p>Open a record and choose Save recovered observation to retain its source here.</p>}
    <div className="mirror-board-sources">{sources.map(record => <div key={record.id}><button aria-pressed={selected.includes(record.id)} className={selected.includes(record.id) ? 'selected' : ''} onClick={() => { setFeedback(''); setSelected(current => current.includes(record.id) ? current.filter(id => id !== record.id) : [...current.slice(-1), record.id]) }}>{record.title}<small>{record.area} / OBSERVATION / UNVERIFIED</small></button>{onOpen && <button onClick={() => onOpen(record.id)} aria-label={`Reopen ${record.title}`}>Open source</button>}{galleryMediaForRecord(record.id).length > 0 && canInspectMirrorEntry(save, record.id) && <button onClick={() => setMediaRecord(record.id)} aria-label={`View retained ${record.title}`}>View images</button>}</div>)}</div>
    <button disabled={selected.length !== 2} onClick={() => {
      if (selected.length !== 2) return
      const [a, b] = selected
      if (!canMirrorLink(save, a, b)) { setFeedback('These records do not support an authored connection. No link or verified finding was created.'); return }
      link(a, b)
      setFeedback('Private association saved. Source status and recipient knowledge are unchanged.')
    }}>Connect recovered sources</button>
    {feedback && <p role="status">{feedback}</p>}
    <h3>Private connections</h3>
    {links.map(key => {
      const connection = mirrorConnections.find(item => mirrorPairKey(item.a, item.b) === key)
      return connection ? <article key={key}><strong>{connection.kind}</strong><p>{connection.text}</p><button onClick={() => unlink(key)} aria-label={`Remove recovered link ${key}`}>Remove connection</button></article> : null
    })}
    {mediaEntry && <MirrorMediaViewer key={mediaEntry.id} entry={mediaEntry} saved={!!save.evidence[mediaEntry.id]} onSave={() => retain(mediaEntry.id)} onClose={() => setMediaRecord(undefined)}/>}
    <p>Verified findings stay in the canonical Case Board: K02 still requires the GCRO release, R04 and the cited version order. The 14/13 count and Bus 4 remain separate observations.</p>
  </section>
}
