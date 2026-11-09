import { useState } from 'react'
import { canReplyInScene09 } from '../game/masterScene09'
import { referenceCardId, referenceCardImage, referenceCode, scene09Beats } from '../content/masterScene09'
import { useGameStore } from '../game/store'
import { ChatPhotoViewer } from './ChatPhotoViewer'

export function MasterScene09Conversation(){
 const p=useGameStore(s=>s.save.masterScene09),act=useGameStore(s=>s.masterScene09Action)
 const [zoom,setZoom]=useState(false),[failed,setFailed]=useState(false),[loaded,setLoaded]=useState(false)
 if(!p)return <article className="scene01-invitation"><p>Maya mentioned a photograph. Continue when you are ready.</p><button className="opening-primary" onClick={()=>act({type:'start'})}>START SCENE 9</button></article>
 const beat=scene09Beats[p.beat],canReply=canReplyInScene09(p)
 return <article aria-label="Scene 9 Maya conversation">
  {p.messages.map(m=><div key={m.id} className={`conversation-line ${m.sender==='player'?'outgoing':'incoming'}`}><div className="conversation-body"><div className={`opening-bubble ${m.sender==='player'?'player':'sophie'}`}>{m.text}</div></div></div>)}
  {p.received&&<article className="scene01-invitation" aria-label="Secondary card photograph"><strong>{referenceCardId}</strong><p>Photo from Maya · source unverified</p><button className="opening-choice" onClick={()=>act({type:'open'})}>OPEN CARD PHOTO</button>
   {p.opened&&<>{failed?<p role="alert">The photograph could not be loaded. Retry the image or return later.</p>:<img src={referenceCardImage} alt="Photograph of a Greyhaven secondary reference card" onLoad={()=>setLoaded(true)} onError={()=>{setLoaded(false);setFailed(true)}} style={{display:'block',width:'100%',maxWidth:560,borderRadius:8}}/>}{failed?<button className="opening-choice" onClick={()=>setFailed(false)}>RETRY IMAGE</button>:<button className="opening-choice" disabled={!loaded} onClick={()=>setZoom(true)}>ENLARGE PHOTO</button>}
    <details><summary>Card transcription</summary><p>Greyhaven Records · Secondary Reference Card · <mark>{referenceCode}</mark> · “Reference Only” · “Contents Unverified”.</p></details>
    <details><summary>Photo provenance</summary><p>Maya found this copy in a shared folder. Photographer, capture date, original image and physical custody are unverified.</p></details></>}
  </article>}
  {p.beat===8&&!p.saved&&<p>Open TRACE to review the external photo, compare sources and save a private finding.</p>}
  {canReply&&beat&&!p.complete&&<div className="opening-actions"><div className="opening-action-heading">Choose a reply</div><div className="scene01-options">{beat.choices.map((choice,i)=><button key={choice} className={`opening-choice ${p.draft===i?'selected':''}`} aria-pressed={p.draft===i} onClick={()=>act({type:'draft',index:i})}>{choice}</button>)}</div><button className="opening-primary" disabled={p.draft===undefined} onClick={()=>act({type:'send'})}>Send</button></div>}
  {p.complete&&<p role="status">Scene 9 complete · Scene 10 unlocked for manual entry · Recovery remains 20%</p>}
  {zoom&&<ChatPhotoViewer src={referenceCardImage} alt="Photograph of a Greyhaven secondary reference card" onClose={()=>setZoom(false)}/>}
 </article>
}
