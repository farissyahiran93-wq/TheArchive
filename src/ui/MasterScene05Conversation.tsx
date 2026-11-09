import { Fragment } from 'react'
import { MasterScene06Conversation } from './MasterScene06Conversation'
import { canReplyInMasterScene05, masterScene05Beat } from '../game/masterScene05'
import { useGameStore } from '../game/store'
import { useCaseNavigation } from './CaseNavigation'
import { UnknownTypingBubble } from './UnknownTypingBubble'

export function MasterScene05Conversation() {
  const p=useGameStore(s=>s.save.masterScene05), six=useGameStore(s=>s.save.masterScene06), act=useGameStore(s=>s.masterScene05Action)
  const {openArchive}=useCaseNavigation()
  if(!p)return <button className="opening-primary" onClick={()=>act({type:'start'})}>START SCENE 5</button>
  const beat=masterScene05Beat(p)
  const canReply=canReplyInMasterScene05(p)
  const archive=p.revision==='trace-first'&&<article className="scene01-invitation" aria-label="Encrypted archive attachment">
    <strong>DNL_PHONE_ARCHIVE.arc</strong>
    <p>Encrypted attachment · sender's claimed source · authenticity unverified</p>
    <p>The archive may be incomplete or altered. Accepting keeps a local copy of the encrypted file.</p>
    <details><summary>Archive metadata</summary><p>Container size and original provenance are unavailable. The metadata cannot authenticate its contents.</p></details>
    {p.archiveStatus==='offered'&&<><button className="opening-primary" onClick={()=>act({type:'archive-accept'})}>ACCEPT ARCHIVE</button><button className="opening-choice" onClick={()=>act({type:'archive-defer'})}>NOT NOW</button><button className="opening-choice" onClick={()=>act({type:'archive-decline'})}>DECLINE ARCHIVE</button></>}
    {['deferred','declined'].includes(p.archiveStatus??'')&&<button className="opening-choice" onClick={()=>act({type:'archive-reconsider'})}>RECONSIDER ARCHIVE</button>}
    {p.archiveStatus==='accepted'&&<p>Accepted · contents remain encrypted and unverified.</p>}
  </article>
  return <>
    {p.messages.map((m,i)=><Fragment key={m.id}><div className={`conversation-line ${m.sender==='player'?'outgoing':'incoming'}`}><div className="conversation-body"><div className={`opening-bubble ${m.sender==='player'?'player':'sophie'}`}>{m.text}</div></div></div>{i===0&&archive}</Fragment>)}
    {p.pending&&<UnknownTypingBubble/>}
    {p.beat>=8&&!p.pending&&p.packageStatus!=='conversation'&&p.packageStatus!=='installed'&&<article className="scene01-invitation" aria-label="TRACE package offer">
      <strong>TRACE.pkg</strong><p>Fictional in-game package · developer claim unverified · {p.packageStatus}</p>
      <p>TRACE works on the archive you select and keeps results local. It requests neither contacts nor location. Its source, safety and archive contents remain unverified.</p>
      {p.packageStatus==='offered'&&<><button className="opening-primary" onClick={()=>{act({type:'install'});openArchive()}}>INSTALL TRACE</button><button className="opening-choice" onClick={()=>act({type:'defer'})}>NOT NOW</button><button className="opening-choice" onClick={()=>act({type:'decline'})}>DECLINE TRACE</button></>}
      {['deferred','declined'].includes(p.packageStatus)&&<button className="opening-choice" onClick={()=>act({type:'reconsider'})}>RECONSIDER TRACE</button>}
    </article>}
    {p.packageStatus==='installed'&&!p.recovered&&<p>TRACE is installed. Open it from Home whenever you want to use Case Files or begin recovery.</p>}
    {p.recovered&&!canReply&&!p.pending&&!p.complete&&<p>What can you support from the recovered fragments? Bring back one observation or comparison worth discussing.</p>}
    {canReply&&beat&&<div className="opening-actions"><div className="opening-action-heading">Choose a reply</div><div className="scene01-options">{beat.choices.map((choice,i)=><button key={choice} className={`opening-choice ${p.draft===i?'selected':''}`} aria-pressed={p.draft===i} onClick={()=>act({type:'draft',index:i})}>{choice}</button>)}</div><button className="opening-primary" disabled={p.draft===undefined} onClick={()=>act({type:'send'})}>Send</button></div>}
    {p.complete&&<>{!six&&p.revision!=='trace-first'&&<p role="status">Scene 5 complete · Scene 6 unlocked for manual entry · Recovery 12%</p>}<MasterScene06Conversation/></>}
  </>
}
