import { useEffect, useLayoutEffect, useRef } from 'react'
import { ArrowLeft, Send } from 'lucide-react'
import { masterArchiveIdentifier, masterScene04Beats } from '../content/masterScene04'
import { useGameStore } from '../game/store'
import { CharacterAvatar } from './CharacterAvatar'
import { MasterScene05Conversation } from './MasterScene05Conversation'
import './opening.css'
import './opening-v4.css'

export function MasterUnknownConversation({onBack}:{onBack:()=>void}) {
  const scene05=useGameStore(s=>s.save.masterScene05)
  const p=useGameStore(s=>s.save.masterScene04),act=useGameStore(s=>s.masterScene04Action)
  const scroll=useRef<HTMLDivElement>(null)
  useEffect(()=>{act({type:'open'});return()=>act({type:'close'})},[act])
  useLayoutEffect(()=>{if(scroll.current)scroll.current.scrollTop=scroll.current.scrollHeight},[p?.messages.length])
  if(!p)return null
  const beat=masterScene04Beats[p.beat]
  return <section className="opening-screen opening-v4 scene01-chat" aria-label="Unknown conversation" data-scene-node={`TA-S04-C${String(p.beat+1).padStart(2,'0')}`}>
    <header className="opening-chat-header"><button className="icon-button bare" aria-label="Back to inbox" onClick={onBack}><ArrowLeft size={21}/></button><CharacterAvatar character="unknown" fallback="?" className="opening-avatar"/><div><strong>Unknown</strong><small>Identity unverified</small></div></header>
    <div className="opening-thread" ref={scroll}>
      {p.messages.map(m=><div key={m.id} className={`conversation-line ${m.sender==='player'?'outgoing':'incoming'}`}><div className="conversation-body"><div className={`opening-bubble ${m.sender==='player'?'player':'sophie'}`}>{m.text}</div></div></div>)}
      {p.pending&&<div className="opening-v4-typing" role="status" aria-label="Unknown is typing"><CharacterAvatar character="unknown" className="message-avatar"/><span className="typing-dots"><i/><i/><i/></span></div>}
      {p.status!=='conversation'&&<article className="scene01-invitation" aria-label="Encrypted archive offer"><strong>{masterArchiveIdentifier}</strong><p>Encrypted archive · Source claimed by Unknown · Authenticity unverified</p><p>{p.status==='accepted'?'Accepted and saved':p.status==='deferred'?'Deferred':p.status==='declined'?'Declined for now':'Offered — not accepted'}</p><button className="opening-choice" onClick={()=>act({type:'inspect'})}>INSPECT METADATA</button>{p.status==='offered'&&<><button className="opening-primary" onClick={()=>act({type:'accept'})}>ACCEPT ARCHIVE</button><button className="opening-choice" onClick={()=>act({type:'defer'})}>NOT NOW</button><button className="opening-choice" onClick={()=>act({type:'decline'})}>DECLINE FOR NOW</button></>}{['deferred','declined'].includes(p.status)&&<button className="opening-choice" onClick={()=>act({type:'reconsider'})}>RECONSIDER OFFER</button>}</article>}
      {p.complete&&!scene05&&<p role="status">Scene 5 — The Digital Archive is unlocked. Recovery: 0%. The archive remains locked.</p>}
      {p.complete&&<MasterScene05Conversation/>}
    </div>
    {p.status==='conversation'&&!p.pending&&beat&&<div className="opening-actions opening-v4-composer"><div className="opening-action-heading">Choose a reply</div><div className="scene01-options">{beat.choices.map((choice,i)=><button className={`opening-choice ${p.draft===i?'selected':''}`} key={choice} aria-pressed={p.draft===i} onClick={()=>act({type:'draft',index:i})}>{choice}</button>)}</div><button className="opening-primary" disabled={p.draft===undefined} onClick={()=>act({type:'send'})}><Send size={17}/> Send</button></div>}
    {p.preview&&<div className="access-modal" role="dialog" aria-modal="true" aria-label="Encrypted archive metadata"><div><h2>Archive metadata</h2><p>File: {masterArchiveIdentifier}</p><p>Type: encrypted archive</p><p>Size: unavailable</p><p>Claimed source: Daniel's phone, according to Unknown</p><p>Authenticity: unverified</p><p>Manifest: limited; contents unavailable</p><p>No messages, notes or recovered data are available.</p><button className="opening-primary" onClick={()=>act({type:'close-preview'})}>DONE</button></div></div>}
  </section>
}
