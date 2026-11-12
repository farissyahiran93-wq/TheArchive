import { groupTitle, isOldFriendsGroup } from '../game/groupTitle'
import { usePhoneBack } from './usePhoneBack'
import { ChatPhotoViewer } from './ChatPhotoViewer'
import { useCaseNavigation } from './CaseNavigation'
import { scene04Article } from '../content/scene04Final'
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
  const [photo,setPhoto]=useState<string|null>(null)
  const nav=useCaseNavigation()
  const [host, setHost] = useState<Element | null>(null)
  const group = contact === 'group'
  const title = groupTitle(save)
  const danielMember = isOldFriendsGroup(save) && save.prologue?.scene01?.groupMembers?.daniel === true
  usePhoneBack(()=>photo?setPhoto(null):setView(group&&view!=='group'?'group':null),!!view)
  if (!group && !known(contact)) return null
  const story = save.chapter2Access?.story
  const scene = save.prologue?.scene01
  const members = story ? Object.entries(story.members).filter(([, joined]) => joined).map(([id]) => id).filter(known)
    : ['sophie', 'maya', 'lucas'].filter(id => scene?.groupMembers?.[id as 'sophie' | 'maya' | 'lucas'] !== false).filter(known)
  const presence = (id: string) => story ? story.presence[id as 'maya'] ? 'Online' : 'Offline' : openingPresence(save, id) === 'online' ? 'Online' : 'Offline'
  const art = view && known(view) ? characterArtwork[view] : undefined
  return <>
    <button className="chat-profile-trigger" aria-label={group ? `View ${title} group info` : `View ${characterArtwork[contact as Contact].name} profile`} onClick={e => { setHost(e.currentTarget.closest('.opening-screen')); setView(contact) }}/>
    {view && host && createPortal(<section className="chat-profile-panel" role="dialog" aria-modal="true" aria-label={view === 'group' ? `${title} group info` : `${art?.name} profile`} onKeyDown={e => { if (e.key === 'Escape') {e.stopPropagation();setView(group && view !== 'group' ? 'group' : null)} }}>
      <header><button autoFocus className="icon-button bare" aria-label="Back from profile" onClick={() => setView(group && view !== 'group' ? 'group' : null)}><ArrowLeft size={22}/></button><strong>{view === 'group' ? 'Group info' : 'Contact info'}</strong></header>
      <div className="chat-profile-scroll">
        <CharacterAvatar character={view} fallback={view === 'group' ? 'FD' : '?'} className="chat-profile-portrait"/>
        {photo&&<ChatPhotoViewer src={photo} alt={photo.includes('sticky')?"WANTING IT TO BE CLEARER. DOESN'T MAKE IT CLEARER.":"Photo shared by Sophie"} onClose={()=>setPhoto(null)}/>}<h2>{view === 'group' ? title : art?.name}</h2>
        {view === 'group' ? <><p>{members.length + 1 + (danielMember ? 1 : 0)} members{danielMember ? ' · Group created before Daniel disappeared' : ''}</p><article><h3>Members</h3><div className="profile-self">{danielMember ? 'You · Invited member · Online' : 'You'}</div>{danielMember && <div className="profile-member"><CharacterAvatar character="daniel"/><span><strong>Daniel Mercer</strong><small>Original member · Offline</small></span></div>}{members.map(id => <button className="profile-member" key={id} onClick={() => setView(id)}><CharacterAvatar character={id}/><span><strong>{characterArtwork[id].name}</strong><small>{danielMember ? ({sophie: 'Admin', maya: "Daniel's fiancée", lucas: "Daniel's best friend"} as Record<string,string>)[id] + ' · ' : ''}{presence(id)}</small></span><ChevronRight size={18}/></button>)}</article></>
          : <><p>{presence(view)}</p><article><h3>About</h3><p>{contactBios[view]}</p></article></>}
        {view==='sophie'&&<><article><h3>Links</h3>{scene?.messages.some(m=>m.attachment==='article')?<button className="opening-choice" onClick={()=>{setView(null);nav.openPublicArticle()}}>{scene04Article.title}</button>:<p>No links shared.</p>}</article><article><h3>Photos</h3>{scene?.messages.filter(m=>m.photo).map(m=><button className="opening-choice" key={m.id} onClick={()=>setPhoto(m.photo!)}>{m.photo!.includes('sticky')?'Handwritten reminder · Personal photo':'Shared photo'}</button>)}{!scene?.messages.some(m=>m.photo)&&<p>No photos shared.</p>}</article></>}
      </div>
    </section>, host)}
  </>
}
