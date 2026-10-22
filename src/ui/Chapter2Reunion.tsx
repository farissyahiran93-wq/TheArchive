import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ArrowLeft, Send } from 'lucide-react'
import { reunionNodes, mayaLucasInterception, type StoryThread } from '../content/chapter2Reunion'
import { eliLucasInterception } from '../content/reunionSource'
import { reunionChoices, type Active, type SpyId } from '../game/chapter2Reunion'
import { useGameStore } from '../game/store'
import { CharacterAvatar } from './CharacterAvatar'
import { useCaseNavigation } from './CaseNavigation'
import './chapter2-reunion.css'

const title=(id:string)=>id==='group'?'FIND DANIEL':id==='unknown'?'UNKNOWN':id[0].toUpperCase()+id.slice(1)
export function ReunionChat({thread,onBack,onThread}:{thread:Active;onBack:()=>void;onThread:(id:Active)=>void}){
 const save=useGameStore(s=>s.save),act=useGameStore(s=>s.accessAction)
 const c=save.chapter2Access!,r=c.story!
 const {openArchive}=useCaseNavigation()
 const isSpy=thread==='eli-lucas'||thread==='maya-lucas'
 const session=!isSpy?r.sessions[thread as StoryThread]:undefined
 const spy=isSpy?r.spy[thread as SpyId]:undefined
 const old=thread==='group'?save.prologue?.scene01?.groupMessages??[]:thread==='sophie'?save.prologue?.scene01?.messages??[]:[]
 const lines=isSpy?spy?.messages??[]:thread==='group'?[...old,...c.groupMessages]:thread==='unknown'?c.messages:[...old,...r.privateMessages[thread as 'maya'|'eli'|'sophie']]
 const options=isSpy?[]:reunionChoices(save,thread as StoryThread)
 const node=session?reunionNodes[session.node]:undefined
 const script=thread==='eli-lucas'?eliLucasInterception:mayaLucasInterception(spy?.fullDisclosure??false)
 const actor=isSpy?spy?.phase==='typing'?script[spy.index]?.actor:undefined:session?.queue&&node?.kind==='npc'?node.actor:undefined
 const scroll=useRef<HTMLDivElement>(null),near=useRef(true)
 const [behind,setBehind]=useState(false)
 useEffect(()=>{
  act({type:'story-open',thread})
  const pause=()=>act({type:'story-close',thread})
  const visibility=()=>{if(document.hidden)pause();else act({type:'story-open',thread})}
  document.addEventListener('visibilitychange',visibility);window.addEventListener('pagehide',pause)
  return()=>{pause();document.removeEventListener('visibilitychange',visibility);window.removeEventListener('pagehide',pause)}
 },[act,thread])
 useEffect(()=>{act({type:'story-open',thread})},[act,thread,lines.length])
 useLayoutEffect(()=>{if(near.current&&scroll.current)scroll.current.scrollTop=scroll.current.scrollHeight;else setBehind(true)},[lines.length,actor,spy?.phase])
 const subtitle=isSpy?'INTERCEPTED · READ ONLY · Source unverified':thread==='group'?Object.entries(r.members).filter(([,member])=>member).map(([who])=>title(who)).join(', '):thread==='unknown'?'Identity unverified':r.presence[thread as 'maya']?'Online':'Offline'
 return <section className={`opening-screen opening-v4 scene01-chat reunion-chat ${isSpy?'spy-chat':''}`} aria-label={isSpy?`${thread} intercepted conversation`:`${title(thread)} conversation`} data-story-node={session?.node}>
 <header className="opening-chat-header"><button className="icon-button bare" aria-label="Back to inbox" onClick={onBack}><ArrowLeft size={21}/></button><CharacterAvatar character={isSpy?'unknown':thread} fallback={thread==='group'?'FD':'?'} className="opening-avatar"/><div><strong>{isSpy?`SPY · ${thread.replace('-',' ↔ ').toUpperCase()}`:title(thread)}</strong><small>{subtitle}</small></div></header>
 <div className="opening-thread" ref={scroll} onScroll={e=>{const el=e.currentTarget;near.current=el.scrollHeight-el.scrollTop-el.clientHeight<80;if(near.current)setBehind(false)}}>
 {isSpy&&<div className="spy-source">A private conversation you were not invited to. Context may be missing.</div>}
 {lines.map(line=>line.sender==='system'?<div key={line.id} className="opening-group-system">{line.text}</div>:<div key={line.id} className={`conversation-line ${line.sender==='player'?'outgoing':'incoming'}`}>
 {line.sender!=='player'&&<span className="chat-contact-avatar"><CharacterAvatar character={line.sender} fallback={line.sender[0].toUpperCase()} className="message-avatar"/>{!isSpy&&r.presence[line.sender as 'maya']&&<i className="presence-dot" aria-label={`${title(line.sender)} online`}/>}</span>}
 <div className="conversation-body">{(isSpy||thread==='group')&&line.sender!=='player'&&<strong className="group-sender">{title(line.sender)}</strong>}<div className={`opening-bubble ${line.sender==='player'?'player':'sophie'}`}>{line.text}</div></div></div>)}
 {actor&&<div className="opening-v4-typing" role="status" aria-label={`${title(actor)} is typing`}><CharacterAvatar character={actor} fallback={actor[0].toUpperCase()} className="message-avatar"/><span className="typing-dots"><i/><i/><i/></span></div>}
 {spy?.complete&&<div className="opening-group-system">Interception ended.</div>}
 </div>
 {behind&&<button className="opening-jump" onClick={()=>{near.current=true;setBehind(false);if(scroll.current)scroll.current.scrollTop=scroll.current.scrollHeight}}>New messages · Jump to latest</button>}
 {!!options.length&&<div className="opening-actions opening-v4-composer"><div className="scene01-options">{options.map(o=><button key={o.id} className={`opening-choice ${session?.draft===o.id?'selected':''}`} aria-pressed={session?.draft===o.id} onClick={()=>act({type:'story-draft',thread:thread as StoryThread,id:o.id})}>{o.text}</button>)}</div><button className="send-button" disabled={!options.some(o=>o.id===session?.draft)} onClick={()=>{near.current=true;if(session?.draft)act({type:'story-send',thread:thread as StoryThread,id:session.draft})}}><Send size={17}/> Send</button></div>}
 {thread==='unknown'&&session?.finished&&r.spy['eli-lucas']&&!r.firstResolved&&<div className="reunion-links"><button className="opening-choice" onClick={()=>onThread('eli-lucas')}>Open Eli ↔ Lucas · Read only</button><button className="opening-choice" onClick={()=>act({type:'story-skip-first'})}>Continue without watching</button></div>}
 {isSpy&&<div className="reunion-links">{spy?.complete?<button className="opening-choice" onClick={()=>onThread('unknown')}>Return to UNKNOWN</button>:<button className="opening-choice" onClick={()=>{act({type:thread==='eli-lucas'?'story-skip-first':'story-skip-second'});onBack()}}>Leave interception</button>}</div>}
 {r.groupComplete&&!options.length&&!isSpy&&<div className="reunion-links"><button className="opening-choice" onClick={openArchive}>Explore Phone Mirror</button></div>}
 </section>
}
