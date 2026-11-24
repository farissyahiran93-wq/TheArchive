import { ArrowLeft, Send } from 'lucide-react'
import { useLayoutEffect, useRef } from 'react'
import { PrivateChatTimeline } from './PrivateChatTimeline'
import { lucasConversation, lucasPhotoBeats } from '../content/lucasPhoto'
import { storyPhotos } from '../content/storyPhotos'
import { useGameStore } from '../game/store'
import { CharacterAvatar } from './CharacterAvatar'
import { NpcPhotoMessage } from './NpcPhotoMessage'
import { splitPhotoTranscript } from './photoTranscript'
import './opening.css'
import './opening-v4.css'

export function LucasPhotoChat({onBack}:{onBack:()=>void}) {
 const p=useGameStore(s=>s.save.lucasPhoto), act=useGameStore(s=>s.lucasPhotoAction)
 const thread=useRef<HTMLDivElement>(null), following=useRef(true)
 useLayoutEffect(()=>{if(thread.current&&following.current)thread.current.scrollTop=thread.current.scrollHeight},[p?.messages.length,p?.pending])
 const choices=p&&!p.complete&&!p.pending?(p.revision==='conversation-v3'?lucasConversation:lucasPhotoBeats)[p.beat]?.choices:undefined
 return <section className="opening-screen opening-v4 scene01-chat" aria-label="Lucas private conversation">
  <header className="opening-chat-header"><button className="icon-button bare" onClick={onBack} aria-label="Back to inbox"><ArrowLeft/></button><CharacterAvatar character="lucas" className="opening-avatar"/><div><strong>Lucas</strong><small>Private conversation</small></div></header>
  <div className="opening-thread" ref={thread} onScroll={event=>{const el=event.currentTarget;following.current=el.scrollHeight-el.scrollTop-el.clientHeight<90}}>{!p?<><p>Open a private conversation with Lucas.</p><button className="opening-primary" onClick={()=>act({type:'start'})}>OPEN LUCAS CONVERSATION</button></>:<PrivateChatTimeline character="lucas" lines={splitPhotoTranscript(p.messages)} typing={!!p.pending} renderContent={line=>line.photo?<NpcPhotoMessage src={line.photo} alt={storyPhotos.lucasFriends.alt} sender="Lucas"/>:undefined}/>}</div>
  {p&&choices&&<div className="opening-actions opening-v4-composer"><div className="opening-action-heading">Choose a reply</div><div className="scene01-options">{choices.map((choice,i)=><button key={choice} className={`opening-choice ${p.draft===i?'selected':''}`} aria-pressed={p.draft===i} onClick={()=>act({type:'draft',index:i})}>{choice}</button>)}</div><button className="opening-primary" disabled={p.draft===undefined} onClick={()=>act({type:'send'})}><Send size={17}/> Send</button></div>}
 </section>
}
