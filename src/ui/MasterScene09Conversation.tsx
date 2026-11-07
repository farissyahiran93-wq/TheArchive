import { useState } from 'react'
import { cardFields } from '../game/masterScene09'
import { referenceCardId, referenceCardImage, scene09Beats } from '../content/masterScene09'
import { useGameStore } from '../game/store'
import { ChatPhotoViewer } from './ChatPhotoViewer'

export function MasterScene09Conversation(){
 const p=useGameStore(s=>s.save.masterScene09),act=useGameStore(s=>s.masterScene09Action)
 const [zoom,setZoom]=useState(false),[failed,setFailed]=useState(false),[loaded,setLoaded]=useState(false)
 if(!p)return <article className="scene01-invitation"><p>Maya mentioned a photograph. Continue when you are ready.</p><button className="opening-primary" onClick={()=>act({type:'start'})}>START SCENE 9</button></article>
 const beat=scene09Beats[p.beat],canReply=p.beat<4||p.beat>=4&&p.beat<8&&cardFields.every(f=>p.inspected.includes(f))||p.beat>=8&&p.beat<10&&p.saved
 const fields=[['heading','INSPECT HEADING'],['title','INSPECT CARD TITLE'],['code','INSPECT REFERENCE CODE'],['reference','INSPECT REFERENCE STAMP'],['unverified','INSPECT CONTENTS MARKING'],['appearance','INSPECT PHOTO BOUNDARIES'],['metadata','REVIEW PHOTO PROVENANCE']] as const
 return <article aria-label="Scene 9 Maya conversation">
  {p.messages.map(m=><div key={m.id} className={`conversation-line ${m.sender==='player'?'outgoing':'incoming'}`}><div className="conversation-body"><div className={`opening-bubble ${m.sender==='player'?'player':'sophie'}`}>{m.text}</div></div></div>)}
  {p.received&&<article className="scene01-invitation" aria-label="Secondary card photograph"><strong>{referenceCardId}</strong><p>Photo from Maya · source unverified</p><button className="opening-choice" onClick={()=>act({type:'open'})}>OPEN CARD PHOTO</button>
   {p.opened&&<>{failed?<p role="alert">The photograph could not be loaded. Retry the image or return later.</p>:<img src={referenceCardImage} alt="Photograph of a Greyhaven secondary reference card" onLoad={()=>setLoaded(true)} onError={()=>{setLoaded(false);setFailed(true)}} style={{display:'block',width:'100%',maxWidth:560,borderRadius:8}}/>}{failed?<button className="opening-choice" onClick={()=>setFailed(false)}>RETRY IMAGE</button>:<button className="opening-choice" disabled={!loaded} onClick={()=>setZoom(true)}>ENLARGE PHOTO</button>}
    {fields.map(([f,label])=><button key={f} className="opening-choice" disabled={!loaded} onClick={()=>act({type:'inspect',field:f})}>{p.inspected.includes(f)?'✓ ':''}{label}</button>)}
    {p.inspected.includes('heading')&&<p>Visible heading: Greyhaven Records. A label alone does not authenticate a source.</p>}{p.inspected.includes('title')&&<p>The card is labelled Secondary Reference Card. It is not the referenced document.</p>}{p.inspected.includes('code')&&<p>Visible reference: GH-DSC-03-A. It is a possible search term, not a verified document match.</p>}{p.inspected.includes('reference')&&<p>The image shows a “Reference Only” stamp. Its official status is unverified.</p>}{p.inspected.includes('unverified')&&<p>The image says “Contents Unverified”. No underlying record content is shown.</p>}{p.inspected.includes('appearance')&&<p>The image shows an aged card and surrounding surface. Anything outside the photographed frame is unavailable; appearance does not prove age or authenticity.</p>}{p.inspected.includes('metadata')&&<p>Maya found this copy in a shared folder. Photographer, capture date, original image and physical custody are unverified.</p>}</>}
  </article>}
  {p.beat===8&&!p.saved&&<p>Open TRACE to review the external photo, compare sources and save a private finding.</p>}
  {canReply&&beat&&!p.complete&&<div className="opening-actions"><div className="opening-action-heading">Choose a reply</div><div className="scene01-options">{beat.choices.map((choice,i)=><button key={choice} className={`opening-choice ${p.draft===i?'selected':''}`} aria-pressed={p.draft===i} onClick={()=>act({type:'draft',index:i})}>{choice}</button>)}</div><button className="opening-primary" disabled={p.draft===undefined} onClick={()=>act({type:'send'})}>Send</button></div>}
  {p.complete&&<p role="status">Scene 9 complete · Scene 10 unlocked for manual entry · Recovery remains 20%</p>}
  {zoom&&<ChatPhotoViewer src={referenceCardImage} alt="Photograph of a Greyhaven secondary reference card" onClose={()=>setZoom(false)}/>}
 </article>
}
