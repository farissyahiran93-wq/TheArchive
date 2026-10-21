import { useGameStore } from '../game/store'
import { visibleMirrorEntries } from '../game/mirror'
import { RecoveredThumbnail } from './RecoveredThumbnail'
import { CharacterAvatar } from './CharacterAvatar'
import { galleryMediaForRecord } from '../content/galleryMedia'
import { useState } from 'react'
import { MapPin, PhoneIncoming, PhoneMissed, PhoneOutgoing } from 'lucide-react'
import { mirrorEntry, recordFolder, relatedMirrorRecords, type MirrorEntry } from '../content/mirror'

export function MirrorRecordView({ entry, onNavigate, onMedia }: { entry: MirrorEntry; onNavigate: (id: string) => void; onMedia: (id?: string) => void }) {
  const [history, setHistory] = useState(false)
  const save = useGameStore(state => state.save)
  const visibleIds = new Set(visibleMirrorEntries(save).map(record => record.id))
  const related = relatedMirrorRecords[entry.id] ?? []
  return <>
    {entry.area === 'messages' ? <div className="mirror-message-history" aria-label="Recovered iMessage conversation">
      <div className="mirror-identity"><CharacterAvatar character={entry.title} fallback="?" className="contact-avatar"/><strong>{entry.title}</strong></div><p className="mirror-time">{entry.stamp} / Individual message times not recovered</p>
      {entry.body.split('\n').map((line, i) => { const colon = line.indexOf(':'); if (colon < 0) return <p key={i} className="mirror-time" role="status">{line}</p>; return <div key={i} className={`mirror-chat-bubble ${line.startsWith('Daniel:') ? 'outgoing' : 'incoming'}`}><small>{colon > 0 ? line.slice(0, colon) : 'Recovered description'}</small><span>{colon > 0 ? line.slice(colon + 1).trim() : line}</span></div> })}
      <div className="mirror-readonly-composer">Recovered snapshot / Replies unavailable</div>
    </div> : entry.area === 'mail' ? <div className="mirror-email-body"><span className="mirror-mail-label">{recordFolder(entry).toUpperCase()} / RECOVERED MAIL</span><h4>{entry.body.split('\n')[0]}</h4><p className="mirror-time">Address headers and exact delivery time unavailable. {recordFolder(entry) === 'Drafts' ? 'This draft was not sent.' : 'Read-only recovered copy.'}</p><p>{entry.body.split('\n').slice(1).join('\n') || entry.body}</p>{entry.index === 1 && <p className="mirror-time">Referenced preview: original attachment bytes were not recovered with this email.</p>}</div>
      : entry.area === 'gallery' ? <div className="mirror-photo-record"><div className="mirror-record-images">{galleryMediaForRecord(entry.id).map(media => <button key={media.id} onClick={() => onMedia(media.id)} aria-label={`View ${media.title}`}><RecoveredThumbnail src={media.thumbnail} alt={media.title}/><span>{media.title}</span></button>)}</div><p>{entry.body}</p><button onClick={() => onMedia()}>Open full-screen record</button><p className="mirror-time">Capture timestamp: not recovered. GPS: not recovered. Supplied visual props are unverified; their availability does not authenticate an original.</p></div>
      : entry.area === 'maps' ? <div className="mirror-place-card"><MapPin size={32}/><strong>{entry.title}</strong><p>{entry.body}</p><p className="mirror-time">Offline record only. No location service, route reconstruction or verified visit.</p></div>
      : entry.area === 'contacts' ? <div className="mirror-contact-profile"><CharacterAvatar character={entry.title} fallback={entry.title[0]} className="mirror-contact-avatar"/><h4>{entry.title}</h4><small>Character identity artwork / not a recovered contact photograph</small><p>{entry.body}</p><p className="mirror-time">Linked threads below are recovered history. No outgoing contact is available.</p></div>
      : entry.area === 'calls' ? <div className="mirror-call-detail"><CharacterAvatar character={entry.title} fallback="?" className="contact-avatar"/>{entry.stamp.includes('MISSED') ? <PhoneMissed/> : entry.stamp.includes('INCOMING') ? <PhoneIncoming/> : <PhoneOutgoing/>}<strong>{entry.stamp}</strong><p>{entry.body}</p><p className="mirror-time">Duration and audio unavailable. Calls cannot be placed from this snapshot.</p></div>
      : entry.area === 'browser' ? <div className="mirror-browser-page"><div className="mirror-address-bar">Archived local view / {recordFolder(entry)}</div><h4>{entry.title}</h4><p>{entry.body}</p><p className="mirror-time">Only this recovered text survives. This does not load the current website.</p></div>
      : <div className={entry.area === 'notes' ? 'mirror-note-body' : 'mirror-file-body'}><p>{entry.body}</p>{entry.area === 'notes' && <><button onClick={() => setHistory(value => !value)} aria-expanded={history}>Recovered edit history</button>{history && <p className="mirror-time">{entry.index === 0 ? 'Only the last-saved label 22:30 survived. Its calendar date and earlier revisions are unavailable.' : 'Earlier revisions and exact edit timestamps were not recovered.'}</p>}</>}</div>}
    <details className="mirror-source-details"><summary>Source and metadata</summary><dl><dt>Record</dt><dd>{entry.id}</dd><dt>Source</dt><dd>Daniel snapshot / {entry.area}</dd><dt>Recovered label</dt><dd>{entry.stamp === 'LOCKED' ? 'Unlocked local item / timestamp unavailable' : entry.stamp}</dd><dt>Verification</dt><dd>Unverified recovered observation</dd><dt>Original bytes</dt><dd>{entry.area === 'gallery' ? 'Supplied visual prop / original provenance unverified' : 'Full original and chain of custody not authenticated'}</dd></dl></details>
    {!!related.length && <nav className="mirror-related" aria-label="Related recovered records"><strong>Related recovered records</strong>{related.map(id => { const record = mirrorEntry(id); return record && visibleIds.has(id) ? <button key={id} onClick={() => onNavigate(id)}>{record.area} / {record.title}</button> : null })}</nav>}
  </>
}
