import { useLayoutEffect, useRef, useState } from 'react'
import { ArrowLeft, Send, X } from 'lucide-react'
import { captureId } from '../content/masterScene08'
import { canReplyInScene08, scene08CurrentBeat } from '../game/masterScene08'
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
 const scroller=useRef<HTMLDivElement>(null),nearEnd=useRef(true),[captureVisible,setCaptureVisible]=useState(false),[newCount,setNewCount]=useState(0),lastCount=useRef(p?.messages.length??0)
 const count=p?.messages.length??0,typing=!!p?.pending?.length
 useLayoutEffect(()=>{const el=scroller.current;if(!el)return;const added=Math.max(0,count-lastCount.current);if(nearEnd.current){el.scrollTop=el.scrollHeight;setNewCount(0)}else if(added)setNewCount(n=>n+added);lastCount.current=count},[count,typing])
 if(!p)return null
 const beat=scene08CurrentBeat(p),canReply=canReplyInScene08(p),revised=p.conversationRevision==='cinematic-v1'
 const capture=<article className="scene01-invitation" aria-label="Message capture attachment"><strong>{captureId}</strong><p>Maya's cropped capture · source unverified</p><button className="opening-choice" onClick={()=>{act({type:'open'});if(revised)setCaptureVisible(true)}}>OPEN CAPTURE</button>{!revised&&p.opened&&<><MasterCapturePreview/><p>Maya says she made the crop from her own conversation. Its 21:14 label supplies no date or time zone, and the original conversation has not been authenticated.</p></>}</article>
 return <section className="opening-screen opening-v4 scene01-chat" aria-label="Maya conversation"><header className="opening-chat-header"><button className="icon-button bare" onClick={onBack} aria-label="Back to inbox"><ArrowLeft/></button><CharacterAvatar character="maya" className="opening-avatar"/><div><strong>Maya</strong><small>Private conversation</small></div></header><div className="opening-thread" ref={scroller} onScroll={e=>{const el=e.currentTarget;nearEnd.current=el.scrollHeight-el.scrollTop-el.clientHeight<90;if(nearEnd.current)setNewCount(0)}}>
  {splitPhotoTranscript(p.messages).map(m=><div key={m.id} className={`conversation-line ${m.sender==='player'?'outgoing':'incoming'}`}>{m.sender==='maya'&&<CharacterAvatar character="maya" className="message-avatar"/>}<div className="conversation-body">{m.attachment==='capture'?capture:m.id===storyPhotos.mayaMugs.id&&m.photo?<NpcPhotoMessage src={m.photo} alt={storyPhotos.mayaMugs.alt} sender="Maya"/>:<div className={`opening-bubble ${m.sender==='player'?'player':'sophie'}`}>{m.text}</div>}</div></div>)}
  {!revised&&p.received&&capture}
  {typing&&<div className="opening-v4-typing" role="status" aria-label="Maya is typing"><CharacterAvatar character="maya" className="message-avatar"/><span className="typing-dots" aria-hidden="true"><i/><i/><i/></span></div>}
  {!revised&&p.beat===8&&!p.saved&&<p>Open TRACE to compare Maya’s account with the capture and save what the sources support.</p>}
  {p.complete&&<MasterScene09Conversation/>}
 </div>{newCount>0&&<button className="opening-jump" onClick={()=>{if(scroller.current)scroller.current.scrollTop=scroller.current.scrollHeight;nearEnd.current=true;setNewCount(0)}}>{newCount} new · Jump to latest</button>}{canReply&&beat&&!p.complete&&<div className="opening-actions opening-v4-composer"><div className="opening-action-heading">Choose a reply</div><div className="scene01-options">{beat.choices.map((choice,i)=><button className={`opening-choice ${p.draft===i?'selected':''}`} key={choice} aria-pressed={p.draft===i} onClick={()=>act({type:'draft',index:i})}>{choice}</button>)}</div><button className="opening-primary" disabled={p.draft===undefined} onClick={()=>act({type:'send'})}><Send size={17}/> Send</button></div>}
 {captureVisible&&<div className="scene08-capture-overlay" role="dialog" aria-modal="true" aria-label="Maya's cropped capture"><button className="icon-button" aria-label="Close capture" onClick={()=>setCaptureVisible(false)}><X size={22}/></button><MasterCapturePreview/></div>}</section>
}
