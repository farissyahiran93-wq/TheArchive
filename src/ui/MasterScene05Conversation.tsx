import { Fragment, useEffect } from 'react'
import { archiveDiscussions } from '../content/digitalArchiveDiscussion'
import type { ArchiveTopic } from '../game/digitalArchiveFlow'
import { MasterScene06Conversation } from './MasterScene06Conversation'
import { canReplyInMasterScene05, masterScene05Beat } from '../game/masterScene05'
import { useGameStore } from '../game/store'
import { useCaseNavigation } from './CaseNavigation'
import { UnknownTypingBubble } from './UnknownTypingBubble'

export function MasterScene05Conversation() {
  const p=useGameStore(s=>s.save.masterScene05), act=useGameStore(s=>s.masterScene05Action)
  const {openArchive}=useCaseNavigation()
  const discussion=p?.discussion
  useEffect(()=>{
    if(!discussion?.pending.length)return
    const timer=window.setTimeout(()=>act({type:'discussion',action:{type:'deliver'}}),Math.min(3200,700+discussion.pending[0].length*30))
    return()=>window.clearTimeout(timer)
  },[act,discussion?.pending])
  if(!p)return null
  const beat=masterScene05Beat(p)
  const canReply=canReplyInMasterScene05(p)
  const newConversation=p.conversationRevision==='archive-v1'
  const archive=p.revision==='trace-first'&&(!newConversation||p.archiveStatus!=='unavailable')&&<article className="scene01-invitation" aria-label="Encrypted archive attachment">
    <strong>{newConversation?'MERCER_DEVICE_ARCHIVE.enc':'DNL_PHONE_ARCHIVE.arc'}</strong>
    <p>Encrypted attachment · sender's claimed source · authenticity unverified</p>
    <p>The archive may be incomplete or altered. Accepting keeps a local copy of the encrypted file.</p>
    <details><summary>Archive metadata</summary><p>Container size and original provenance are unavailable. The metadata cannot authenticate its contents.</p></details>
    {p.archiveStatus==='offered'&&<><button className="opening-primary" onClick={()=>act({type:'archive-accept'})}>ACCEPT ARCHIVE</button><button className="opening-choice" onClick={()=>act({type:'archive-defer'})}>NOT NOW</button><button className="opening-choice" onClick={()=>act({type:'archive-decline'})}>DECLINE ARCHIVE</button></>}
    {['deferred','declined'].includes(p.archiveStatus??'')&&<button className="opening-choice" onClick={()=>act({type:'archive-reconsider'})}>RECONSIDER ARCHIVE</button>}
    {p.archiveStatus==='accepted'&&<p>Accepted · contents remain encrypted and unverified.</p>}
  </article>
  // The offer follows the third answer. Keep the attachment at that point even
  // after later messages have been sent or a declined offer is reconsidered.
  const firstPostOffer=newConversation?p.messages.findIndex(m=>m.id.startsWith('TA-S05-ARCHIVE-C4-P-')):-1
  const archiveAfter=newConversation?(firstPostOffer<0?p.messages.length-1:firstPostOffer-1):0
  return <>
    {p.messages.map((m,i)=><Fragment key={m.id}><div className={`conversation-line ${m.sender==='player'?'outgoing':'incoming'}`}><div className="conversation-body"><div className={`opening-bubble ${m.sender==='player'?'player':'sophie'}`}>{m.text}</div></div></div>{i===archiveAfter&&archive}</Fragment>)}
    {discussion?.messages.map(m=><div key={m.id} className={`conversation-line ${m.sender==='player'?'outgoing':'incoming'}`}><div className="conversation-body"><div className={`opening-bubble ${m.sender==='player'?'player':'sophie'}`}>{m.text}</div></div></div>)}
    {!!discussion?.pending.length&&<UnknownTypingBubble/>}
    {discussion&&p.recovered&&discussion.discovered.length>0&&!discussion.finished&&<div className="opening-actions">
      <label>Discuss with Unknown <select aria-label="Discuss with Unknown" disabled={!!discussion.pending.length} value={discussion.topic??''} onChange={e=>{if(e.target.value)act({type:'discussion',action:{type:'select',topic:e.target.value as ArchiveTopic|'finish'}})}}><option value="">Choose something to discuss...</option>{discussion.discovered.map(id=><option key={id} value={id}>{archiveDiscussions[id].label}</option>)}<option value="finish">Finish — nothing to discuss</option></select></label>
      {discussion.topic&&discussion.topic!=='finish'&&archiveDiscussions[discussion.topic].turns[discussion.turn].choices.map((choice,index)=><button key={choice} className={`opening-choice ${discussion.draft===index?'selected':''}`} aria-pressed={discussion.draft===index} disabled={!!discussion.pending.length} onClick={()=>act({type:'discussion',action:{type:'draft',index}})}>{choice}</button>)}
      <button className="opening-primary" disabled={!!discussion.pending.length||!discussion.topic||(discussion.topic==='finish'?!discussion.discussed.length:discussion.draft===undefined)} onClick={()=>act({type:'discussion',action:{type:'send'}})}>Send</button>
    </div>}
    {p.pending&&<UnknownTypingBubble/>}
    {p.beat>=8&&!p.pending&&p.packageStatus!=='conversation'&&p.packageStatus!=='installed'&&<article className="scene01-invitation" aria-label="TRACE package offer">
      <strong>TRACE.pkg</strong><p>Fictional in-game package · developer claim unverified · {p.packageStatus}</p>
      <p>TRACE works on the archive you select and keeps results local. It requests neither contacts nor location. Its source, safety and archive contents remain unverified.</p>
      {p.packageStatus==='offered'&&<><button className="opening-primary" onClick={()=>{act({type:'install'});openArchive()}}>INSTALL TRACE</button><button className="opening-choice" onClick={()=>act({type:'defer'})}>NOT NOW</button><button className="opening-choice" onClick={()=>act({type:'decline'})}>DECLINE TRACE</button></>}
      {['deferred','declined'].includes(p.packageStatus)&&<button className="opening-choice" onClick={()=>act({type:'reconsider'})}>RECONSIDER TRACE</button>}
    </article>}
    {p.packageStatus==='installed'&&!p.recovered&&(!newConversation||p.archiveStatus==='accepted'&&p.beat>=8)&&<p>TRACE is installed. Open it from Home when you are ready to begin recovery.</p>}
    {p.recovered&&!p.discussion&&!canReply&&!p.pending&&!p.complete&&<p>What can you support from the recovered fragments? Bring back one observation or comparison worth discussing.</p>}
    {canReply&&beat&&<div className="opening-actions"><div className="opening-action-heading">Choose a reply</div><div className="scene01-options">{beat.choices.map((choice,i)=><button key={choice} className={`opening-choice ${p.draft===i?'selected':''}`} aria-pressed={p.draft===i} onClick={()=>act({type:'draft',index:i})}>{choice}</button>)}</div><button className="opening-primary" disabled={p.draft===undefined} onClick={()=>act({type:'send'})}>Send</button></div>}
    {p.complete&&<MasterScene06Conversation/>}
  </>
}
