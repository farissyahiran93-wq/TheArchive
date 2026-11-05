import { LegacySourceAction, NaturalConversationActions } from './NaturalConversationActions'
import { canOpenPublisherInquiry, canOpenScene6Register, hasPublisherReceipt, naturalConversation, naturalCore } from '../game/investigationAccess'
import { GuidanceDot } from './GuidanceDot'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ArrowLeft, Send } from 'lucide-react'
import { actINodes } from '../content/actIRegistry'
import { TraceApp } from './TraceApp'
import { scene04Article } from '../content/scene04Final'
import { scene01Choices } from '../game/scene01'
import { bridgeArticleLine, bridgeFindingsWait } from '../content/traceBridgeV3'
import { bridgeFindingsReviewed, traceBridgeV3, visibleUnknownMessages } from '../game/traceBridge'
import { archiveInstallLabel, archiveInstallProgress } from '../game/archiveOrigin'
import { useGameStore } from '../game/store'
import { CharacterAvatar } from './CharacterAvatar'
import { chatGroup } from './chatGrouping'
import { useCaseNavigation } from './CaseNavigation'
import { SceneStartMarker } from './SceneStartMarker'
import { sceneStartMarkers } from './sceneMarkers'
import './version-history.css'

export function ArchivePackageSecurity(){
  const save=useGameStore(s=>s.save),p=save.chapter1?.archiveOrigin,act=useGameStore(s=>s.originAction)
  const [clock,setClock]=useState(()=>Date.now())
  useEffect(()=>{if(!p?.securityOpen||!p.installStage||p.installed)return;const timer=window.setInterval(()=>setClock(Date.now()),50);return()=>window.clearInterval(timer)},[p?.securityOpen,p?.installStage,p?.installed])
  const progress=archiveInstallProgress(save,clock)
  useEffect(()=>{if(!p?.securityOpen)return;const cancel=(e:KeyboardEvent)=>{if(e.key==='Escape'){e.stopImmediatePropagation();act({type:'cancel'})}};window.addEventListener('keydown',cancel,true);return()=>window.removeEventListener('keydown',cancel,true)},[p?.securityOpen,act])
  if(!p?.securityOpen)return null
  const bridge = traceBridgeV3(save)
  const close = () => act({ type: 'cancel' })
  return <section className="access-modal" role="dialog" aria-modal="true" aria-label="Device security">
    <div>
      <small>DEVICE SECURITY</small><h2>TRACE</h2>
      {bridge ? <>
        <p>Package: TRACE.pkg<br/>Publisher: UNKNOWN<br/>Origin: UNVERIFIED<br/>Integrity: NOT ESTABLISHED</p>
        <p>Requested in-game data: Packaged recovered references</p>
        <p>This is an unverified in-game package.</p>
      </> : <>
        <p>Digital Investigation Tool · TRACE.pkg</p>
        <p>Package origin: UNKNOWN<br/>Publisher: UNVERIFIED<br/>Integrity: NOT ESTABLISHED<br/>Access: RESTRICTED</p>
        <p>This package was shared by an unknown contact. Its origin cannot be authenticated.</p>
      </>}
      {p.installStage ? <div className="archive-install">
        <div className="archive-install-label"><span role="status">{archiveInstallLabel(save)}</span><strong>{progress}%</strong></div>
        <progress aria-label="TRACE installation" max={100} value={progress}/>
        {p.installed ? <button autoFocus className="opening-primary" onClick={close}>DONE<GuidanceDot save={save} action="installation-done"/></button>
          : bridge && <button className="opening-choice" onClick={close}>CANCEL INSTALLATION</button>}
      </div> : <>
        <button autoFocus className="opening-primary" onClick={()=>act({type:'install'})}>INSTALL<GuidanceDot save={save} action="install"/></button>
        <button className="opening-choice" onClick={close}>{bridge ? 'NOT NOW' : 'CANCEL'}</button>
      </>}
    </div>
  </section>
}

export function UnknownConversation({onBack}:{onBack:()=>void}){
  const save=useGameStore(s=>s.save),act=useGameStore(s=>s.originAction),pause=useGameStore(s=>s.pauseSophiePrivate),draft=useGameStore(s=>s.draftActI),send=useGameStore(s=>s.sendScene01),read=useGameStore(s=>s.chapter1Action)
  const nav=useCaseNavigation(),scroll=useRef<HTMLDivElement>(null),near=useRef(true),restored=useRef(false)
  const p=save.chapter1!.versionHistory,origin=save.chapter1!.archiveOrigin,scene=save.prologue!.scene01!,lines=visibleUnknownMessages(save),markers=sceneStartMarkers(lines)
  const previous=useRef(p?.scroll.unknown??origin?.scroll)
  const [behind,setBehind]=useState(false)
  const startNotified=save.deliveredEvents.includes('CH1-VH-START'),followupNotified=origin?.followupNotified,naturalNotice=save.deliveredEvents.includes('CH1-VH-NAT-REGISTER')
  const bridge = traceBridgeV3(save)
  const bridgeSecurityOpen = bridge && origin?.securityOpen
  useEffect(()=>{const visible=()=>{if(document.visibilityState==='visible')act({type:'open'});else pause()};visible();document.addEventListener('visibilitychange',visible);window.addEventListener('pagehide',pause);return()=>{document.removeEventListener('visibilitychange',visible);window.removeEventListener('pagehide',pause);pause()}},[act,pause,startNotified,followupNotified,naturalNotice,bridgeSecurityOpen])
  useLayoutEffect(()=>{if(!scroll.current)return;if(!restored.current&&previous.current!==undefined){scroll.current.scrollTop=previous.current;near.current=scroll.current.scrollHeight-scroll.current.scrollTop-scroll.current.clientHeight<90;restored.current=true}else if(near.current)scroll.current.scrollTop=scroll.current.scrollHeight},[lines.length,scene.queue.length])
  useEffect(()=>{if(near.current)read({type:'read-contact',id:'unknown'})},[read,lines.length])
  const reading=origin?.reading||p?.reading==='unknown',options=reading?scene01Choices(save).filter(()=>{const n=actINodes(scene)[scene.nodeId];return n.kind==='choice'&&n.channel==='unknown'}):[],selected=scene.draft?.nodeId===scene.nodeId?scene.draft.choiceId:undefined
  const node=actINodes(scene)[scene.nodeId],typing=reading&&!!scene.queue[0]?.typing
  return <section className="opening-screen opening-v4 scene01-chat" aria-label="Unknown Number conversation" data-scene-node={scene.nodeId}><header className="opening-chat-header"><button className="icon-button bare" aria-label="Back to inbox" onClick={onBack}><ArrowLeft/></button><CharacterAvatar character="unknown" fallback="?" className="opening-avatar"/><div><strong>Unknown Number</strong><small>Availability unknown · Identity unverified</small></div></header><div className="opening-thread" ref={scroll} onScroll={e=>{const el=e.currentTarget;near.current=el.scrollHeight-el.scrollTop-el.clientHeight<90;setBehind(!near.current);if(p?.revision)useGameStore.getState().versionHistoryAction({type:'scroll',key:'unknown',value:el.scrollTop});else act({type:'scroll',value:el.scrollTop});if(near.current)read({type:'read-contact',id:'unknown'})}}>
    {lines.map((line,index)=><div className={`conversation-line ${line.sender==='player'?'outgoing':'incoming'} ${chatGroup(lines,index).className}`} key={line.id}>{line.sender!=='player'&&chatGroup(lines,index).last&&<span className="chat-contact-avatar"><CharacterAvatar character="unknown" className="message-avatar"/></span>}<div className="conversation-body"><SceneStartMarker line={line} markers={markers}/><div className={`opening-bubble ${line.sender==='player'?'player':'sophie'}`}>{line.text}</div>{line.attachment&&<article className="public-link-card"><strong>{line.attachment==='archive-package'?'TRACE.pkg':line.attachment==='article'?scene04Article.title:line.attachment==='register'?'CORRECTIONS REGISTER AVAILABLE':line.attachment==='inquiry'?'OPTIONAL PUBLISHER INQUIRY':'ARC-IDX-GB-041'}</strong><small>{line.attachment==='archive-package'?(bridge?'Local reference viewer · Publisher unknown · Integrity not verified':'Restricted access package · Source unknown · Authenticity unverified'):line.attachment==='index'?'INDEX ADDED TO TRACE · Reference only · Authenticity unverified':line.attachment==='article'?'Greyhaven Bulletin · Nora Vance':'Greyhaven Bulletin · Public channel'}</small><button className="opening-choice" disabled={bridge&&line.attachment==='archive-package'&&origin?.installed||line.attachment==='index'&&!origin?.installed&&!origin?.packageDelivered||line.attachment==='register'&&!canOpenScene6Register(save)||line.attachment==='inquiry'&&!canOpenPublisherInquiry(save)&&!hasPublisherReceipt(save)} onClick={()=>{if(line.attachment==='archive-package')act({type:'security'});else if(line.attachment==='article')nav.openPublicArticle();else if(line.attachment==='register')nav.openPublication('register');else if(line.attachment==='inquiry')nav.openPublication('form');else if(!origin?.installed)act({type:'security'});else if(naturalConversation(save)&&origin.initialInspected){useGameStore.getState().traceAction({type:'findings'});nav.openArchive()}else nav.openTraceTracker()}}>{line.attachment==='archive-package'?origin?.installed?'INSTALLED':bridge?'INSPECT PACKAGE':'VIEW ACCESS PACKAGE':line.attachment==='article'?(line.id===bridgeArticleLine?'OPEN BULLETIN ARTICLE':'VIEW ARTICLE'):line.attachment==='register'?'OPEN PUBLIC REGISTER':line.attachment==='inquiry'?'OPEN OPTIONAL REQUEST':'OPEN TRACE'}<GuidanceDot save={save} action={line.attachment==='archive-package'?'review-package':line.attachment==='article'?['open-article','inspect-update','save-update-analysis']:line.attachment==='register'?'open-register':line.attachment==='inquiry'?'open-inquiry':'start-trace'}/></button></article>}</div></div>)}
    {reading && node?.id === bridgeFindingsWait && !bridgeFindingsReviewed(save) &&
      <div className="natural-context"><button className="opening-choice" onClick={nav.openArchive}>
        CONTINUE INSPECTING<GuidanceDot save={save} app="archive"/>
      </button></div>}
    {typing&&<div className="opening-v4-typing" role="status" aria-label="Unknown Number is typing"><CharacterAvatar character="unknown" className="message-avatar"/><span className="typing-dots"><i/><i/><i/></span></div>}
    {(naturalCore(save)||p?.flags.includes('natural_tail'))&&<NaturalConversationActions save={save}/>}
    {reading&&!naturalCore(save)&&node?.id==='OPEN-VH-NEW-SOURCE-HUB'&&<LegacySourceAction save={save}/>}
    {reading&&!naturalCore(save)&&node?.kind==='gate'&&node.action==='vh-source'&&node.id!=='OPEN-VH-NEW-SOURCE-HUB'&&<div className="vh-source-actions">{!['02','03','04'].some(suffix=>node.id.endsWith(suffix))&&<p>Review the public article, the index and the publication policy to understand what each source can establish.</p>}{node.id.endsWith('02')?<button className="opening-choice" onClick={nav.openPublicArticle}>VIEW ARTICLE<GuidanceDot save={save} app="bulletin"/></button>:node.id.endsWith('04')?<button className="opening-choice" onClick={()=>nav.openPublication('policy')}>HOW THE BULLETIN LABELS UPDATES</button>:<button className="opening-choice" onClick={()=>{if(node.id.endsWith('03'))nav.openTraceTracker();else nav.openArchive()}}>{node.id.endsWith('03')?'VIEW INDEX':'REVIEW EVIDENCE COMPARISON'}</button>}</div>}
  </div>{behind&&<button className="opening-jump" onClick={()=>{near.current=true;setBehind(false);if(scroll.current)scroll.current.scrollTop=scroll.current.scrollHeight}}>Jump to latest</button>}{!!options.length&&<div className="opening-actions opening-v4-composer"><div className="opening-action-heading">Choose a reply {!selected&&<GuidanceDot save={save} action="choose-reply"/>}</div><div className="scene01-options">{options.map(o=><button className={`opening-choice ${selected===o.id?'selected':''}`} aria-pressed={selected===o.id} key={o.id} onClick={()=>draft(o.id)}>{o.text}</button>)}</div><button className="opening-primary" disabled={!options.some(o=>o.id===selected)} onClick={()=>{near.current=true;setBehind(false);send(selected!)}}><Send size={17}/> Send{selected&&<GuidanceDot save={save} action="send-reply"/>}</button></div>}</section>
}

export function ArchiveOrigin({onHome}:{onHome:()=>void}){
  return <TraceApp onHome={onHome}/>
}

export function ConversationWorkspace({onHome}:{onHome:()=>void}){
  return <TraceApp onHome={onHome}/>
}
