import { groupTitle, isOldFriendsGroup } from '../game/groupTitle'
import { GuidanceDot } from './GuidanceDot'
import { storyPhotos } from '../content/storyPhotos'
import { NpcPhotoMessage } from './NpcPhotoMessage'
import { splitPhotoTranscript } from './photoTranscript'
import { FamilyPhotoReplies } from './FamilyPhotoReplies'
import { MasterScene07Call } from './MasterScene07Call'
import { MasterScene07Evidence } from './MasterScene07Evidence'
import { sceneStartMarkers } from './sceneMarkers'
import { SceneStartMarker } from './SceneStartMarker'
import { sourceState, visibleSource, sourceAskFirst } from '../game/sourceInvestigation'
import { scene04Article } from '../content/scene04Final'
import { Chapter1Composer } from './Chapter1Investigation'
import { ChatProfile } from './ChatProfile'
import { chatGroup } from './chatGrouping'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ArrowLeft, Send, Star } from 'lucide-react'
import { useGameStore } from '../game/store'
import { scene01Choices, scene01Text } from '../game/scene01'
import { actINodes } from '../content/actIRegistry'
import { openingPresence } from '../game/phonePresentation'
import { CharacterAvatar } from './CharacterAvatar'
import { ChatPhotoViewer } from './ChatPhotoViewer'
import { chatPhotoSource } from '../content/chatMedia'
import { useCaseNavigation } from './CaseNavigation'
import './opening.css'
import './opening-v4.css'

export function Scene01Chat({ thread, onBack }: { thread: 'sophie' | 'group'; onBack: () => void }) {
  const save = useGameStore(state => state.save)
  const scene = save.prologue?.scene01
  const actI = useGameStore(state => state.actIAction)
  const draftActI = useGameStore(state => state.draftActI)
  const draftGroupName = useGameStore(state => state.draftGroupName)
  useEffect(() => { if (thread === 'group') actI('open-group') }, [thread, actI])
  const send = useGameStore(state => state.sendScene01)
  const invitation = useGameStore(state => state.scene01Invitation)
  const read = useGameStore(state => state.readOpening)
  const openPrivate = useGameStore(state => state.openSophiePrivate)
  const pausePrivate = useGameStore(state => state.pauseSophiePrivate)
  const draftPrivate = useGameStore(state => state.draftSophiePrivate)
  useEffect(()=>()=>{if(thread==='group')pausePrivate()},[thread,pausePrivate])
  const historyEnabled=!!save.chapter1?.versionHistory
  useEffect(()=>{
    if(thread!=='group'||!historyEnabled)return
    const visibility=()=>{if(document.visibilityState==='visible')actI('open-group');else pausePrivate()}
    visibility()
    document.addEventListener('visibilitychange',visibility)
    window.addEventListener('pagehide',pausePrivate)
    return ()=>{document.removeEventListener('visibilitychange',visibility);window.removeEventListener('pagehide',pausePrivate);pausePrivate()}
  },[thread,historyEnabled,actI,pausePrivate])
  const navigation = useCaseNavigation()
  const [selected, setSelected] = useState<string | null>(null)
  const [name, setName] = useState(scene?.groupNameDraft ?? save.player?.name ?? '')
  const [error, setError] = useState('')
  const [photo,setPhoto]=useState<string|null>(null)
  const [invitationMembers, setInvitationMembers] = useState(false)
  const scroller = useRef<HTMLDivElement>(null)
  const nearEnd = useRef(true)
  const [behind, setBehind] = useState(false)
  const [unseen, setUnseen] = useState(0)
  const group = thread === 'group'
  const title = groupTitle(save)
  const oldFriends = isOldFriendsGroup(save)
  const queueId = scene?.queue[0]?.id
  const count = group ? scene?.groupMessages.length ?? 0 : scene?.messages.length ?? 0
  const lastCount = useRef(count)
  const source=visibleSource(save),sourceScene=source?sourceState(save,source):undefined
  const historyPosition=useRef(sourceScene?sourceScene.scroll[thread]:save.chapter1?.publicStory&&!save.chapter1.versionHistory?save.chapter1.publicStory.chatScroll:save.chapter1?.correctionsDesk?.visible?save.chapter1.correctionsDesk.scroll[thread]:save.chapter1?.versionHistory?.scroll[thread])
  useLayoutEffect(()=>{const top=historyPosition.current;if(top!==undefined&&scroller.current){scroller.current.scrollTop=top;nearEnd.current=scroller.current.scrollHeight-top-scroller.current.clientHeight<90}},[thread])
  const handoffAt = scene?.privateHandoff?.deliveredAt
  const privateHandoffDependency = scene?.masterScene01 ? undefined : handoffAt
  const articleLead=save.deliveredEvents.includes('CH1-S04-LEAD'),articleFollowup=save.deliveredEvents.includes('CH1-S04-FOLLOWUP')
  useEffect(() => {
    if (group) return
    const visibility = () => {
      if (document.visibilityState !== 'visible') { pausePrivate(); return }
      const current = useGameStore.getState().save.prologue?.scene01
      if (!current?.masterScene01 || current.privateHandoff?.openedAt !== undefined) openPrivate()
    }
    if (document.visibilityState === 'visible') openPrivate(); else pausePrivate()
    document.addEventListener('visibilitychange', visibility)
    window.addEventListener('pagehide', pausePrivate)
    return () => { document.removeEventListener('visibilitychange', visibility); window.removeEventListener('pagehide', pausePrivate); pausePrivate() }
  }, [group, privateHandoffDependency, articleLead, articleFollowup, openPrivate, pausePrivate])
  useEffect(() => { if (nearEnd.current) read(thread) }, [count, read, thread])
  const firstChatLayout=useRef(true)
  useLayoutEffect(() => {
    if(firstChatLayout.current){firstChatLayout.current=false;if(historyPosition.current!==undefined)return}
    const added = count - lastCount.current
    if (nearEnd.current && scroller.current) { scroller.current.scrollTop = scroller.current.scrollHeight; setBehind(false); setUnseen(0) }
    else { setBehind(true); if (added > 0) setUnseen(value => value + added) }
    lastCount.current = count
  }, [count, queueId, scene?.invitation, scene?.queue.length])
  if (!scene) return null
  if(thread==='sophie'&&save.masterScene07&&['ringing','missed','playing','waiting'].includes(save.masterScene07.phase))return <MasterScene07Call/>
  const s06=scene.nodeId.startsWith('OPEN-S06-')
  const s05=scene.nodeId.startsWith('OPEN-VH-')||scene.nodeId.startsWith('OPEN-S05-')
  const s04=scene.nodeId.startsWith('OPEN-VH-')||scene.nodeId.startsWith('OPEN-S04-')||s05||s06||/^OPEN-(?:S0[789]|S10)-/.test(scene.nodeId)
  const currentNode=actINodes(scene)[scene.nodeId]
  const publicStory=save.chapter1?.publicStory
  const privateTurn = scene.nodeId.startsWith('OPEN-S03-') || scene.nodeId.startsWith('TA-S03-')
  const options = s04 ? currentNode?.kind==='choice'&&currentNode.channel===(group?'group':'sophie')?scene01Choices(save):[] : privateTurn ? group ? [] : scene01Choices(save) : (group === (scene.invitation === 'joined')) ? scene01Choices(save) : []
  const selection = s04 || scene.scriptRevision && !scene.privateScene03 ? scene.draft?.nodeId === scene.nodeId ? scene.draft.choiceId : null : scene.privateScene03 ? scene.privateScene03.draft?.nodeId === scene.nodeId ? scene.privateScene03.draft.choiceId : null : selected
  const choice = options.find(item => item.id === selection)
  const named = scene.introduced
  const lines = splitPhotoTranscript(group ? scene.groupMessages : scene.messages, line => line.id===storyPhotos.sophieFamily.id||line.id===storyPhotos.sophieBiscuits.id)
  const markers = sceneStartMarkers(lines)
  const chapter1Typing = !group && save.pendingEvents.some(e => ['CH1-SENDER-SOPHIE','CH1-ELI-INTRO'].includes(e.id))
  const typing = !!scene.queue[0]?.typing && (s04 ? (sourceScene?sourceScene.reading:s06?save.chapter1?.correctionsDesk?.reading:s05?save.chapter1?.versionHistory?.reading:publicStory?.reading)===(group?'group':'sophie') : privateTurn ? !group : group ? scene.invitation === 'joined' : scene.invitation !== 'joined')
  const graph = actINodes(scene)
  const gate = graph[scene.nodeId]
  const pendingNode = queueId ? graph[queueId] : undefined
  const typingActor = pendingNode?.kind === 'npc' ? pendingNode.sender ?? 'sophie' : pendingNode?.kind === 'wait' ? pendingNode.actor ?? 'sophie' : 'sophie'
  const actorName = (actor: string) => actor[0].toUpperCase() + actor.slice(1)
  const participants = ['You', ...(oldFriends && scene.groupMembers?.daniel ? ['Daniel'] : []), ...(['sophie','maya','lucas'] as const).filter(actor => scene.groupMembers?.[actor] !== false).map(actorName)]
  const online = openingPresence(save, 'sophie') === 'online'
  const canSend = !!choice
  const sendSelected = () => {
    if (!canSend) return
    const clean = name.trim().replace(/\s+/gu, ' ')
    if (choice.discloseName && (!clean || clean.length > 40 || /[\p{Cc}\p{Cf}<>]/u.test(clean))) { setError(group ? 'Enter your name (up to 40 characters).' : 'Enter a codename of up to 40 characters.'); return }
    nearEnd.current = true
    send(choice.id, clean)
    setSelected(null)
    setError('')
  }
  const jump = () => { nearEnd.current = true; setBehind(false); setUnseen(0); if (scroller.current) scroller.current.scrollTop = scroller.current.scrollHeight; read(thread) }
  return <section className="opening-screen opening-v4 scene01-chat" data-scene-node={scene.nodeId} data-group-complete={scene.groupComplete ? 'true' : undefined} aria-label={group ? `${title} group conversation` : scene.privateHandoff?.openedAt !== undefined ? 'Sophie private conversation' : 'Sophie first contact conversation'}>
    <header className="opening-chat-header"><button className="icon-button bare" aria-label="Back to inbox" onClick={onBack}><ArrowLeft size={21}/></button>{group ? <span className="opening-group-avatar">{oldFriends ? 'SC' : 'FD'}</span> : <span className="chat-contact-avatar"><CharacterAvatar character={named ? 'sophie' : 'unknown'} fallback={named ? 'S' : '?'} className="opening-avatar"/>{online && <i className="presence-dot" aria-label="Online"/>}</span>}<div><strong>{group ? title : named ? 'Sophie' : 'Unknown number'}</strong><small aria-label={group ? 'Group participants' : undefined}>{group ? `${participants.length} members · ${participants.join(', ')}` : online ? 'Online' : 'Offline'}</small></div><ChatProfile contact={group ? 'group' : named ? 'sophie' : 'unknown'}/></header>
    <>{!group&&(source===9&&scene.nodeId==='OPEN-S09-C15'||source===10&&scene.nodeId==='OPEN-S10-C16')&&<p className="public-system-feedback">No case-update permission has been granted for this exchange. Option A shares case details; Sophie may decline.</p>}</><>{source&&group&&<p className="public-system-feedback">{source===10?'Only these current members will receive what you Send. ':source===9?'Review recipients before Send. ':''}Current recipients: {(['sophie','maya'] as const).filter(actor=>scene.groupMembers?.[actor]===true).map(actorName).join(", ")}. Only the selected sentence will be sent. {sourceAskFirst(save)?"Sophie asked you to check before sharing case details here.":""}</p>}</><div className="opening-thread" ref={scroller} onScroll={event => { const node = event.currentTarget; if(publicStory&&!save.chapter1?.versionHistory&&Math.abs(node.scrollTop-(publicStory.chatScroll??0))>24)useGameStore.getState().publicStoryAction({type:'chat-scroll',value:node.scrollTop}); if(source)useGameStore.getState().sourceAction(source,{type:'scroll',key:thread,value:node.scrollTop}); if(!source&&save.chapter1?.correctionsDesk?.visible)useGameStore.getState().correctionsDeskAction({type:'scroll',key:thread,value:node.scrollTop}); if(!source&&!save.chapter1?.correctionsDesk?.visible&&save.chapter1?.versionHistory&&Math.abs(node.scrollTop-(save.chapter1.versionHistory.scroll[thread]??0))>24)useGameStore.getState().versionHistoryAction({type:'scroll',key:thread,value:node.scrollTop}); nearEnd.current = node.scrollHeight - node.scrollTop - node.clientHeight < 90; if (nearEnd.current) { setBehind(false); read(thread) } }}>
      <div className="opening-timestamp">{new Date(scene.startedAt).toLocaleDateString([], { weekday: 'long', day: 'numeric', month: 'long' })} · {new Date(scene.startedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
      {lines.map((line, index) => line.sender === 'system' ? <div key={line.id} className="opening-group-system">{line.text}</div> : <div key={line.id} className={`conversation-line ${line.sender === 'player' ? 'outgoing' : 'incoming'} ${chatGroup(lines, index).className}`}>{line.sender !== 'player' && chatGroup(lines, index).last && <span className="chat-contact-avatar"><CharacterAvatar character={group ? line.sender : named ? 'sophie' : 'unknown'} fallback={group ? line.sender[0].toUpperCase() : named ? 'S' : '?'} className="message-avatar"/>{group && openingPresence(save, line.sender) === 'online' && <i className="presence-dot" aria-label={`${actorName(line.sender)} online`}/>}</span>}<div className="conversation-body">{line.id==='EV-S05-SOPHIE-OPEN'&&<div className="opening-timestamp">The following morning</div>}{group && line.sender !== 'player' && chatGroup(lines, index).first && <strong className="group-sender">{actorName(line.sender)}</strong>}<SceneStartMarker line={line} markers={markers} label={group || named ? actorName(line.sender) : 'Unknown number'}/>{(line.id===storyPhotos.sophieFamily.id)&&line.photo?<><NpcPhotoMessage src={line.photo} alt={line.photo===storyPhotos.sophieFamily.src?storyPhotos.sophieFamily.alt:"Framed family photograph of Sophie with her brother Daniel"} sender="Sophie"/></>:line.id===storyPhotos.sophieBiscuits.id&&line.photo?<NpcPhotoMessage src={line.photo} alt={storyPhotos.sophieBiscuits.alt} sender="Sophie"/>:line.attachment==='article'?<article className="public-link-card" aria-label="Public article link"><small>GREYHAVEN BULLETIN · LOCAL NEWS</small><strong>{scene04Article.title}</strong><small>{scene04Article.byline}</small><button className="opening-choice" onClick={navigation.openPublicArticle}>READ ARTICLE<GuidanceDot save={save} app="bulletin"/></button></article>:line.photo?<button className="sophie-dinner-photo" onClick={()=>setPhoto(line.photo!)} aria-label={line.photo.includes('sticky')?"Open Sophie's handwritten reminder":"Open Sophie's dinner photo"}><img src={chatPhotoSource(line.photo)} alt={line.photo.includes('sticky')?line.text:"Sophie's chicken mushroom pasta dinner"} onError={e=>{e.currentTarget.style.display='none';e.currentTarget.nextElementSibling?.removeAttribute('hidden')}} onLoad={()=>{if(nearEnd.current&&scroller.current)scroller.current.scrollTop=scroller.current.scrollHeight}}/>{line.photo.includes('sticky')&&<span className="sticky-photo-caption" hidden>{line.text}<small>Image unavailable</small></span>}</button>:<><div className={`opening-bubble ${line.sender === 'player' ? 'player' : 'sophie'}`}>{line.text}</div>{line.id===`${storyPhotos.sophieFamily.id}-DIALOGUE`&&<FamilyPhotoReplies/>}</>}</div></div>)}
      {(typing || chapter1Typing) && <div className="opening-v4-typing" role="status" aria-label={group ? `${actorName(typingActor)} is typing` : named ? 'Sophie is typing' : 'Unknown number is typing'}><CharacterAvatar character={group ? typingActor : named ? 'sophie' : 'unknown'} fallback={group ? typingActor[0].toUpperCase() : named ? 'S' : '?'} className="message-avatar"/><span className="typing-dots"><i/><i/><i/></span></div>}
      {!scene.scriptRevision && !group && privateTurn && save.chapter1?.sender.seen && !save.chapter1.sender.disclosed && <details className="c1-disclosure"><summary>Optional: tell Sophie about the warning</summary><Chapter1Composer choiceKey="disclose"/></details>}
      {!group && !online && <div className="presence-event">Sophie is offline.</div>}
      {!group&&save.masterScene07&&<MasterScene07Evidence/>}
      {!group && scene.invitation !== 'none' && scene.invitation !== 'joined' && !scene.queue.length && <article className="scene01-invitation" aria-label={`${title} invitation`}><strong>{title}</strong><p>{oldFriends ? "Sophie invited you to their private group." : "Please keep anything related to Daniel here."}</p>{oldFriends ? <><button className="opening-choice" aria-expanded={invitationMembers} onClick={() => setInvitationMembers(value => !value)}>VIEW MEMBERS</button>{invitationMembers && <p>Sophie · Daniel · Maya · Lucas</p>}<button className="opening-primary" onClick={() => { if (scene.invitation === 'declined') invitation('accept'); invitation('join') }}>JOIN GROUP</button></> : !scene.invitationDismissed ? <><button className="opening-primary" onClick={() => { invitation(scene.invitation === 'declined' ? 'accept' : 'join'); if (scene.invitation === 'ready' && !scene.scriptRevision) navigation.openGroup() }}>{scene.invitation === 'declined' ? scene.masterScene01 ? 'Reconsider invitation' : 'Accept invitation' : 'JOIN GROUP'}</button><button className="opening-choice" onClick={() => invitation('dismiss')}>NOT NOW</button>{scene.masterScene01 && scene.invitation !== 'declined' && <button className="opening-choice" onClick={() => invitation('decline')}>DECLINE FOR NOW</button>}</> : <button className="opening-choice" onClick={() => invitation('show')}>View invitation{scene.masterScene01 && scene.invitation === 'declined' ? ' · declined' : ''}</button>}</article>}
    </div>
    {behind && <button className="opening-jump" onClick={jump}>{unseen ? `${unseen} new · Jump to latest` : 'Jump to latest'}</button>}
    {gate?.kind === 'gate' && ['sender-request','disclosure','deferred'].includes(gate.action) && (group === (gate.action === 'sender-request')) && <div className="opening-actions opening-v4-composer">
      {gate.action === 'sender-request' ? <><button className="opening-primary" onClick={() => { actI('open-sender'); navigation.openCharacter('unknown') }}>OPEN MESSAGE</button><button className="opening-choice" onClick={() => actI('later')}>LATER</button></> : gate.action === 'disclosure' ? <><button className="opening-primary" onClick={() => actI('tell')}>TELL SOPHIE ABOUT THE MESSAGE</button><button className="opening-choice" onClick={() => actI('keep')}>KEEP IT TO YOURSELF</button></> : <button className="opening-primary" onClick={() => actI('continue')}>Continue</button>}
    </div>}
    {s05&&gate?.kind==='gate'&&gate.action==='s05-bonus'&&!group&&<div className="opening-actions"><button className="opening-choice" onClick={()=>useGameStore.getState().versionHistoryAction({type:'bonus'})}>★ Ask about the receipt</button><button className="opening-choice" onClick={()=>useGameStore.getState().versionHistoryAction({type:'skip-bonus'})}>Continue</button></div>}
    {s04&&gate?.kind==='gate'&&<div className="opening-actions opening-v4-composer">
      {!group&&['s04-archive','s04-index-ack','s04-device'].includes(gate.action)&&<button className="opening-primary" onClick={navigation.openArchive}>Open TRACE</button>}
    </div>}
    {!!options.length && <div className="opening-actions opening-v4-composer"><div className="opening-action-heading">Choose a reply {!selection&&<GuidanceDot save={save} action="choose-reply"/>}</div><div className="scene01-options">{options.map(option => <button key={`${scene.nodeId}-${option.id}`} className={`opening-choice ${selection === option.id ? 'selected' : ''}`} aria-pressed={selection === option.id} onClick={() => { if (s04) draftActI(option.id); else if (scene.privateScene03) draftPrivate(option.id); else if (scene.scriptRevision) draftActI(option.id); else setSelected(option.id); setError('') }}>{option.premiumChoice && <Star size={14} aria-label="Starred reply"/>}{scene01Text(option.text, option.discloseName ? name.trim() || '…' : scene.disclosedName)}</button>)}{choice?.discloseName && <label className="scene01-codename">{group ? 'Your name' : 'Your codename'}<input aria-label={group ? 'Your name' : 'Your codename'} maxLength={40} value={name} onChange={event => { setName(event.target.value); if (group && ['TA-S02-NAME-CHOICE','TA-S02-V3-NAME-CHOICE'].includes(scene.nodeId)) draftGroupName(event.target.value) }} autoComplete="nickname"/></label>}{error && <p role="alert">{error}</p>}</div><button className="opening-primary" disabled={!canSend} onClick={sendSelected}><Send size={17}/> Send{canSend&&<GuidanceDot save={save} action="send-reply"/>}</button></div>}
    {photo&&<ChatPhotoViewer src={photo} alt={photo.includes('sticky')?"WANTING IT TO BE CLEARER. DOESN'T MAKE IT CLEARER.":"Sophie's chicken mushroom pasta dinner"} onClose={()=>setPhoto(null)}/>}
  </section>
}
