import { useEffect, useLayoutEffect, useRef } from 'react'
import { ArrowLeft, Send } from 'lucide-react'
import { masterArchiveIdentifier } from '../content/masterScene04'
import { masterScene04Dialogue, usesScene04ToolPreview } from '../game/masterScene04'
import { useGameStore } from '../game/store'
import { CharacterAvatar } from './CharacterAvatar'
import { readMenuPreferences } from '../game/menuPreferences'
import { MasterScene05Conversation } from './MasterScene05Conversation'
import { UnknownTypingBubble } from './UnknownTypingBubble'
import './opening.css'
import './opening-v4.css'

export function MasterUnknownConversation({onBack}:{onBack:()=>void}) {
  const scene05=useGameStore(s=>s.save.masterScene05), scene06=useGameStore(s=>s.save.masterScene06)
  const p=useGameStore(s=>s.save.masterScene04),act=useGameStore(s=>s.masterScene04Action)
  const scroll=useRef<HTMLDivElement>(null),nearEnd=useRef(true)
  useEffect(()=>{act({type:'open'});return()=>act({type:'close'})},[act])
  useLayoutEffect(()=>{if(scroll.current&&nearEnd.current)scroll.current.scrollTo({top:scroll.current.scrollHeight,behavior:useGameStore.getState().save.settings.reduceMotion||readMenuPreferences().reduceMotion||window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})},[p?.messages.length,scene05?.messages.length,scene06?.messages.length,scene06?.pending?.id])
  if(!p)return null
  const beat=masterScene04Dialogue(p.revision)[p.beat]
  const toolPreview=usesScene04ToolPreview(p)
  const canProceed=!p.complete&&(p.status==='offered'||p.status==='accepted')
  return <section className="opening-screen opening-v4 scene01-chat" aria-label="Unknown conversation" data-scene-node={`TA-S04-C${String(p.beat+1).padStart(2,'0')}`}>
    <header className="opening-chat-header"><button className="icon-button bare" aria-label="Back to inbox" onClick={onBack}><ArrowLeft size={21}/></button><CharacterAvatar character="unknown" fallback="?" className="opening-avatar"/><div><strong>Unknown</strong><small>{p.revision==='cinematic'&&['accepted','deferred','declined'].includes(p.status)?'Offline · Identity unverified':'Identity unverified'}</small></div></header>
    <div className="opening-thread" ref={scroll} onScroll={e=>{const el=e.currentTarget;nearEnd.current=el.scrollHeight-el.scrollTop-el.clientHeight<90}}>
      {p.messages.map(m=><div key={m.id} className={`conversation-line ${m.sender==='player'?'outgoing':'incoming'}`}><div className="conversation-body"><div className={`opening-bubble ${m.sender==='player'?'player':'sophie'}`}>{m.text}</div></div></div>)}
      {p.pending&&<UnknownTypingBubble/>}
      {(p.status!=='conversation'||p.revision==='cinematic'&&p.beat===9&&!p.pending)&&<article className="scene01-invitation" aria-label={toolPreview?'TRACE information':'Encrypted archive offer'}>
        <strong>{toolPreview?(p.revision==='cinematic'?'TRACE · DATA RECOVERY INTERFACE':'TRACE · tool information'):masterArchiveIdentifier}</strong>
        <p>{toolPreview?(p.revision==='cinematic'?'Status: Not connected · Source: Pending verification · Recovered: 0% · Access: Not configured':'A viewer for incomplete recovered data. Its developer and safety claims are unverified. Proceeding does not install it.'):'Encrypted archive · Source claimed by Unknown · Authenticity unverified'}</p>
        <p>{p.status==='accepted'?'Ready to continue':p.status==='deferred'?'Deferred':p.status==='declined'?'Declined for now':'Continue when you’re ready.'}</p>
        <button className="opening-choice" onClick={()=>act({type:'inspect'})}>{toolPreview?(p.revision==='cinematic'?'VIEW TRACE':'INSPECT TRACE INFORMATION'):'INSPECT METADATA'}</button>
        {canProceed&&p.revision!=='cinematic'&&<button className="opening-primary" onClick={()=>act({type:'accept'})}>{toolPreview?'PROCEED':'ACCEPT ARCHIVE'}</button>}
        {p.status==='offered'&&p.revision!=='cinematic'&&<><button className="opening-choice" onClick={()=>act({type:'defer'})}>NOT NOW</button><button className="opening-choice" onClick={()=>act({type:'decline'})}>DECLINE FOR NOW</button></>}
        {['deferred','declined'].includes(p.status)&&<button className="opening-choice" onClick={()=>act({type:'reconsider'})}>{p.revision==='cinematic'?"I've thought about it. Send me TRACE. · Send":'RECONSIDER OFFER'}</button>}
      </article>}
      {p.complete&&p.revision==='cinematic'&&!p.traceInstalled&&<article className="scene01-invitation" aria-label="TRACE setup"><strong>TRACE setup is available</strong><p>Local simulated interface · source and safety unverified · no contacts or location access. No archive will be opened and no recovery will start.</p><button className="opening-primary" onClick={()=>act({type:'setup-trace'})}>SET UP TRACE</button></article>}
      {p.complete&&(p.revision!=='cinematic'||p.traceInstalled)&&<MasterScene05Conversation/>}
    </div>
    {p.status==='conversation'&&!p.pending&&beat&&<div className="opening-actions opening-v4-composer"><div className="opening-action-heading">Choose a reply</div><div className="scene01-options">{beat.choices.map((choice,i)=><button className={`opening-choice ${p.draft===i?'selected':''}`} key={choice} aria-pressed={p.draft===i} onClick={()=>act({type:'draft',index:i})}>{choice}</button>)}</div><button className="opening-primary" disabled={p.draft===undefined} onClick={()=>act({type:'send'})}><Send size={17}/> Send</button></div>}
    {p.preview&&<div className="access-modal" role="dialog" aria-modal="true" aria-label={toolPreview?'TRACE information':'Encrypted archive metadata'}><div>{toolPreview?<><h2>TRACE · information</h2><p>A proposed recovery and source-comparison tool. Developer, safety and claims are unverified.</p><p>Inspecting this information installs nothing and recovers no records.</p></>:<><h2>Archive metadata</h2><p>File: {masterArchiveIdentifier}</p><p>Type: encrypted archive</p><p>Size: unavailable</p><p>Claimed source: Daniel's phone, according to Unknown</p><p>Authenticity: unverified</p><p>Manifest: limited; contents unavailable</p><p>No messages, notes or recovered data are available.</p></>}<button className="opening-primary" onClick={()=>act({type:'close-preview'})}>DONE</button></div></div>}
  </section>
}
