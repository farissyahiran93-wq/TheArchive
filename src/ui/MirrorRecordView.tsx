import { CharacterAvatar } from './CharacterAvatar'
import { RecoveredThumbnail } from './RecoveredThumbnail'
import { galleryMediaForRecord } from '../content/galleryMedia'
import { mirrorDisplayStamp } from '../content/mirrorPresentation'
import { MapPin, PhoneIncoming, PhoneMissed, PhoneOutgoing, ChevronRight } from 'lucide-react'
import { recordFolder, type MirrorEntry } from '../content/mirror'

export function MirrorRecordView({ entry, onMedia }: { entry: MirrorEntry; onMedia: (id?: string) => void }) {
  const contact = entry.title.split(' · ')[0]
  if (entry.area === 'messages') return <div className="mirror-message-history" aria-label="iMessage conversation">
    <div className="mirror-identity"><CharacterAvatar character={contact} fallback="?" className="contact-avatar"/><strong>{contact} <ChevronRight size={12}/></strong></div>
    <p className="mirror-time">{entry.title.split(' · ')[1]}</p>
    {entry.body.split('\n').map((line, i) => {
      const colon = line.indexOf(':')
      if (colon < 0) return <p key={i} className="mirror-time" role="status">{line}</p>
      return <div key={i} className={`mirror-chat-bubble ${line.startsWith('Daniel:') ? 'outgoing' : 'incoming'}`}><span className="sr-only">{line.slice(0, colon)}: </span><span>{line.slice(colon + 1).trim()}</span></div>
    })}
  </div>
  if (entry.area === 'mail') return <div className="mirror-email-body"><span className="mirror-mail-label">{recordFolder(entry)}</span><h4>{entry.body.split('\n')[0].replace(/^Subject: /, '')}</h4><p>{entry.body.split('\n').slice(1).join('\n') || entry.body}</p></div>
  if (entry.area === 'gallery') return <div className="mirror-photo-record"><div className="mirror-record-images">{galleryMediaForRecord(entry.id).map(media => <button key={media.id} onClick={() => onMedia(media.id)} aria-label={`View ${media.title}`}><RecoveredThumbnail src={media.thumbnail} alt={media.title}/></button>)}</div><button className="mirror-open-photos" onClick={() => onMedia()}>View photos</button></div>
  if (entry.area === 'maps') return <div className="mirror-place-card"><div className="mirror-map-placeholder"><MapPin size={40}/><span>Map unavailable</span></div><strong>{entry.title}</strong><p>{entry.body}</p></div>
  if (entry.area === 'contacts') return <div className="mirror-contact-profile"><CharacterAvatar character={contact} fallback={contact[0]} className="mirror-contact-avatar"/><h4>{contact}</h4><p>{entry.body}</p></div>
  if (entry.area === 'calls') return <div className="mirror-call-detail"><CharacterAvatar character={contact} fallback="?" className="contact-avatar"/>{entry.stamp.includes('MISSED') ? <PhoneMissed/> : entry.stamp.includes('INCOMING') ? <PhoneIncoming/> : <PhoneOutgoing/>}<strong>{mirrorDisplayStamp(entry.stamp)}</strong><p>{entry.body}</p></div>
  if (entry.area === 'browser') return <div className="mirror-browser-page"><div className="mirror-address-bar">{recordFolder(entry)}</div><h4>{entry.title}</h4><p>{entry.body}</p></div>
  return <div className={entry.area === 'notes' ? 'mirror-note-body' : 'mirror-file-body'}><p>{entry.body}</p></div>
}
