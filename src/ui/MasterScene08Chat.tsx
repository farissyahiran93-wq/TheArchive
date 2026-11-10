import { ArrowLeft, Send } from 'lucide-react'
import { captureId, scene08Beats } from '../content/masterScene08'
import { canReplyInScene08 } from '../game/masterScene08'
import { useGameStore } from '../game/store'
import { CharacterAvatar } from './CharacterAvatar'
import './opening.css'
import './opening-v4.css'
import './master-scene08.css'
import { MasterScene09Conversation } from './MasterScene09Conversation'
import { storyPhotos } from '../content/storyPhotos'
import { NpcPhotoMessage } from './NpcPhotoMessage'
import { splitPhotoTranscript } from './photoTranscript'
import { MasterCapturePreview } from './MasterScene08Evidence'

export function MasterScene08Chat({onBack}:{onBack:()=>void}){
 const p=useGameStore(s=>s.save.masterScene08),act=useGameStore(s=>s.masterScene08Action)
 if(!p)return <section className="opening-screen opening-v4"><header className="opening-chat-header"><button className="icon-button bare" onClick={onBack} aria-label="Back to inbox"><ArrowLeft/></button><CharacterAvatar character="maya" className="opening-avatar"/><strong>Maya</strong></header><div className="opening-thread"><p>Sophie said Maya had found an earlier check-in. Open the conversation when ready.</p><button className="opening-primary" onClick={()=>act({type:'start'})}>OPEN MAYA CONVERSATION</button></div></section>
 const beat=scene08Beats[p.beat],canReply=canReplyInScene08(p)
 return <section className="opening-screen opening-v4 scene01-chat" aria-label="Maya conversation"><header className="opening-chat-header"><button className="icon-button bare" onClick={onBack} aria-label="Back to inbox"><ArrowLeft/></button><CharacterAvatar character="maya" className="opening-avatar"/><div><strong>Maya</strong><small>Private conversation</small></div></header><div className="opening-thread">
  {splitPhotoTranscript(p.messages).map(m=><div key={m.id} className={`conversation-line ${m.sender==='player'?'outgoing':'incoming'}`}><div className="conversation-body">{m.id===storyPhotos.mayaMugs.id&&m.photo?<NpcPhotoMessage src={m.photo} alt={storyPhotos.mayaMugs.alt} sender="Maya"/>:<div className={`opening-bubble ${m.sender==='player'?'player':'sophie'}`}>{m.text}</div>}</div></div>)}
  {p.received&&<article className="scene01-invitation" aria-label="Message capture attachment"><strong>{captureId}</strong><p>Maya's cropped capture · source unverified</p><button className="opening-choice" onClick={()=>act({type:'open'})}>OPEN CAPTURE</button>
   {p.opened&&<><MasterCapturePreview/><p>Maya says she made the crop from her own conversation. Its 21:14 label supplies no date or time zone, and the original conversation has not been authenticated.</p></>}
  </article>}
  {p.beat===8&&!p.saved&&<p>Open TRACE to compare Maya’s account with the capture and save what the sources support.</p>}
  {p.complete&&<p role="status">Scene 8 complete · Scene 9 unlocked for manual entry · Phone recovery remains 20%</p>}
  {p.complete&&<MasterScene09Conversation/>}
 </div>{canReply&&beat&&!p.complete&&<div className="opening-actions opening-v4-composer"><div className="opening-action-heading">Choose a reply</div><div className="scene01-options">{beat.choices.map((choice,i)=><button className={`opening-choice ${p.draft===i?'selected':''}`} key={choice} aria-pressed={p.draft===i} onClick={()=>act({type:'draft',index:i})}>{choice}</button>)}</div><button className="opening-primary" disabled={p.draft===undefined} onClick={()=>act({type:'send'})}><Send size={17}/> Send</button></div>}</section>
}
