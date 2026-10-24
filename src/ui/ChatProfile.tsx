import { useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import { characterArtwork } from '../content/characters'
import { contactBios } from '../content/contactProfiles'
import { useGameStore } from '../game/store'
import { openingPresence } from '../game/phonePresentation'
import { CharacterAvatar } from './CharacterAvatar'
import './chat-profile.css'

type Contact = keyof typeof characterArtwork
const known = (id: string): id is Contact => id in characterArtwork && id !== 'daniel'

/** Read-only contact information. Opening a profile never changes story state. */
export function ChatProfile({ contact }: { contact: string }) {
  const save = useGameStore(s => s.save)
  const [view, setView] = useState<string | null>(null)
  const [host, setHost] = useState<Element | null>(null)
  const group = contact === 'group'
  if (!group && !known(contact)) return null
  const story = save.chapter2Access?.story
  const scene = save.prologue?.scene01
  const members = story ? Object.entries(story.members).filter(([, joined]) => joined).map(([id]) => id).filter(known)
    : ['sophie', 'maya', 'lucas'].filter(id => scene?.groupMembers?.[id as 'sophie' | 'maya' | 'lucas'] !== false).filter(known)
  const presence = (id: string) => story ? story.presence[id as 'maya'] ? 'Online' : 'Offline' : openingPresence(save, id) === 'online' ? 'Online' : 'Offline'
  const art = view && known(view) ? characterArtwork[view] : undefined
  return <>
    <button className="chat-profile-trigger" aria-label={group ? 'View FIND DANIEL group info' : `View ${characterArtwork[contact as Contact].name} profile`} onClick={e => { setHost(e.currentTarget.closest('.opening-screen')); setView(contact) }}/>
    {view && host && createPortal(<section className="chat-profile-panel" role="dialog" aria-modal="true" aria-label={view === 'group' ? 'FIND DANIEL group info' : `${art?.name} profile`} onKeyDown={e => { if (e.key === 'Escape') setView(group && view !== 'group' ? 'group' : null) }}>
      <header><button autoFocus className="icon-button bare" aria-label="Back from profile" onClick={() => setView(group && view !== 'group' ? 'group' : null)}><ArrowLeft size={22}/></button><strong>{view === 'group' ? 'Group info' : 'Contact info'}</strong></header>
      <div className="chat-profile-scroll">
        <CharacterAvatar character={view} fallback={view === 'group' ? 'FD' : '?'} className="chat-profile-portrait"/>
        <h2>{view === 'group' ? 'FIND DANIEL' : art?.name}</h2>
        {view === 'group' ? <><p>{members.length + 1} members</p><article><h3>Members</h3><div className="profile-self">You</div>{members.map(id => <button className="profile-member" key={id} onClick={() => setView(id)}><CharacterAvatar character={id}/><span><strong>{characterArtwork[id].name}</strong><small>{presence(id)}</small></span><ChevronRight size={18}/></button>)}</article></>
          : <><p>{presence(view)}</p><article><h3>About</h3><p>{contactBios[view]}</p></article></>}
      </div>
    </section>, host)}
  </>
}
