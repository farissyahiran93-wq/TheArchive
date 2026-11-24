import { useLayoutEffect, useRef, useState } from 'react'
import { ArrowLeft, Send } from 'lucide-react'
import { mayaCard } from '../content/mayaConversationV3'
import { storyPhotos } from '../content/storyPhotos'
import { canReplyInScene08, scene08CurrentBeat } from '../game/masterScene08'
import { canReplyInScene09, historicalCardBeat } from '../game/masterScene09'
import type { MayaLine } from '../game/mayaConversationV3'
import { useGameStore } from '../game/store'
import { CharacterAvatar } from './CharacterAvatar'
import { ChatPhotoViewer } from './ChatPhotoViewer'
import { NpcPhotoMessage } from './NpcPhotoMessage'
import { PrivateChatTimeline } from './PrivateChatTimeline'
import { splitPhotoTranscript } from './photoTranscript'
import { SecondaryCardPhoto } from './MasterScene09Evidence'
import { MasterCapturePreview } from './MasterScene08Evidence'
import './opening.css'
import './opening-v4.css'
import './master-scene08.css'

function timelineWithAttachment(messages:MayaLine[], received:boolean, scene:'08'|'09'):MayaLine[] {
 const lines=splitPhotoTranscript(messages)
 const attachment=scene==='08'?'capture':'card'
 if (!received || lines.some(line=>line.attachment===attachment)) return lines
 const index=lines.findIndex(line=>line.id.startsWith('TA-S'+scene+'-C4-M-'))
 const at=index<0?lines.length:index+1
 // Older saves recorded receipt separately from their transcript. Project it at its delivery beat.
 const source:MayaLine={id:'TA-S'+scene+'-ATTACHMENT',text:'',sender:'maya',at:lines[Math.max(0,at-1)]?.at??0,attachment}
 return [...lines.slice(0,at),source,...lines.slice(at)]
}

export function MasterScene08Chat({onBack,onUnknown}:{onBack:()=>void;onUnknown:()=>void}){
 const eight=useGameStore(s=>s.save.masterScene08), nine=useGameStore(s=>s.save.masterScene09)
 const act8=useGameStore(s=>s.masterScene08Action),act9=useGameStore(s=>s.masterScene09Action)
 const scroll=useRef<HTMLDivElement>(null), nearEnd=useRef(true), lastCount=useRef(0)
 const [captureVisible,setCaptureVisible]=useState(false), [newCount,setNewCount]=useState(0)
 const count=(eight?.messages.length??0)+(nine?.messages.length??0)
 const typing=!!(eight?.pending?.length||nine?.pending?.length)
 useLayoutEffect(()=>{
  const el=scroll.current
  if(!el)return
  const added=Math.max(0,count-lastCount.current)
  if(nearEnd.current){el.scrollTop=el.scrollHeight;setNewCount(0)}
  else if(added)setNewCount(n=>n+added)
  lastCount.current=count
 },[count,typing])

 if(!eight)return null
 const active=nine??eight
 const canReply=nine?canReplyInScene09(nine):canReplyInScene08(eight)
 const beat=nine?(nine.conversationRevision?mayaCard[nine.beat]:historicalCardBeat(nine)):scene08CurrentBeat(eight)
 const act=nine?act9:act8
 const lines=[...timelineWithAttachment(eight.messages,eight.received,'08'),...(nine?timelineWithAttachment(nine.messages,nine.received,'09'):[])]
 const expanded=eight.conversationRevision==='conversation-v3'

 function attachment(line:MayaLine){
  if(line.attachment==='capture')return <button className="maya-attachment" aria-label="Open Maya’s message screenshot" onClick={()=>{act8({type:'open'});setCaptureVisible(true)}}>
   <div aria-hidden="true"><MasterCapturePreview expanded={expanded}/></div><small>Message screenshot</small>
  </button>
  if(line.attachment==='card')return <SecondaryCardPhoto onOpen={()=>act9({type:'open'})}/>
  if(line.photo)return <NpcPhotoMessage src={line.photo} alt={storyPhotos.mayaMugs.alt} sender="Maya"/>
 }
 return <section className="opening-screen opening-v4 scene01-chat" aria-label="Maya conversation">
  <header className="opening-chat-header"><button className="icon-button bare" onClick={onBack} aria-label="Back to inbox"><ArrowLeft/></button><CharacterAvatar character="maya" className="opening-avatar"/><div><strong>Maya Chen</strong><small>Private conversation</small></div></header>
  <div className="opening-thread" ref={scroll} onScroll={e=>{const el=e.currentTarget;nearEnd.current=el.scrollHeight-el.scrollTop-el.clientHeight<90;if(nearEnd.current)setNewCount(0)}}>
   <PrivateChatTimeline character="maya" lines={lines} renderContent={attachment} typing={typing}/>
  </div>
  {newCount>0&&<button className="opening-jump" onClick={()=>{if(scroll.current)scroll.current.scrollTop=scroll.current.scrollHeight;nearEnd.current=true;setNewCount(0)}}>{newCount} new · Jump to latest</button>}
  {canReply&&beat&&<div className="opening-actions opening-v4-composer"><div className="opening-action-heading">Choose a reply</div><div className="scene01-options">{beat.choices.map((choice,i)=><button className={'opening-choice '+(active.draft===i?'selected':'')} key={choice} aria-pressed={active.draft===i} onClick={()=>act({type:'draft',index:i})}>{choice}</button>)}</div><button className="opening-primary" disabled={active.draft===undefined} onClick={()=>act({type:'send'})}><Send size={17}/> Send</button></div>}
  {nine?.complete&&nine.conversationRevision==='conversation-v3'&&<div className="opening-actions"><button className="opening-choice" onClick={onUnknown}>Discuss a clue with Unknown Sender</button></div>}
  {captureVisible&&<ChatPhotoViewer alt="Maya’s saved message screenshot" onClose={()=>setCaptureVisible(false)}><MasterCapturePreview expanded={expanded}/></ChatPhotoViewer>}
 </section>
}
