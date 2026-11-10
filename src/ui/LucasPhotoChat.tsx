import { ArrowLeft, Send } from 'lucide-react'
import { lucasPhotoBeats } from '../content/lucasPhoto'
import { storyPhotos } from '../content/storyPhotos'
import { useGameStore } from '../game/store'
import { CharacterAvatar } from './CharacterAvatar'
import { NpcPhotoMessage } from './NpcPhotoMessage'
import { splitPhotoTranscript } from './photoTranscript'
import './opening.css'
import './opening-v4.css'

export function LucasPhotoChat({onBack}:{onBack:()=>void}) {
 const p=useGameStore(s=>s.save.lucasPhoto), act=useGameStore(s=>s.lucasPhotoAction)
 return <section className="opening-screen opening-v4 scene01-chat" aria-label="Lucas private conversation">
  <header className="opening-chat-header"><button className="icon-button bare" onClick={onBack} aria-label="Back to inbox"><ArrowLeft/></button><CharacterAvatar character="lucas" className="opening-avatar"/><div><strong>Lucas</strong><small>Private conversation</small></div></header>
  <div className="opening-thread">{!p?<><p>Open a private conversation with Lucas.</p><button className="opening-primary" onClick={()=>act({type:'start'})}>OPEN LUCAS CONVERSATION</button></>:splitPhotoTranscript(p.messages).map(m=><div key={m.id} className={`conversation-line ${m.sender==='player'?'outgoing':'incoming'}`}><div className="conversation-body">{m.photo?<NpcPhotoMessage src={m.photo} alt={storyPhotos.lucasFriends.alt} sender="Lucas"/>:<div className={`opening-bubble ${m.sender==='player'?'player':'sophie'}`}>{m.text}</div>}</div></div>)}</div>
  {p&&!p.complete&&<div className="opening-actions opening-v4-composer"><div className="opening-action-heading">Choose a reply</div><div className="scene01-options">{lucasPhotoBeats[p.beat].choices.map((choice,i)=><button key={choice} className={`opening-choice ${p.draft===i?'selected':''}`} aria-pressed={p.draft===i} onClick={()=>act({type:'draft',index:i})}>{choice}</button>)}</div><button className="opening-primary" disabled={p.draft===undefined} onClick={()=>act({type:'send'})}><Send size={17}/> Send</button></div>}
 </section>
}
