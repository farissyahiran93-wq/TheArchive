import { useEffect, useState } from 'react'
import { exportHypotheses, exportShares, sophieFollowup } from '../content/masterScene07'
import { contactAssessments } from '../content/masterSceneAssessments'
import { useGameStore } from '../game/store'
import { MasterStatementAssessment } from './MasterStatementAssessment'

function StarredContactCopy({damaged=true}:{damaged?:boolean}){
 return <article className="trace-summary" aria-label="Masked contact entry"><strong>Starred contact export</strong><p>★ · ••• ••• ••41 · no saved name</p><p>{damaged?'The Remarks field is damaged and unreadable.':'A separate remark reads “Don’t call this number”. Its associated entry is unknown.'}</p><p>Source: copy shared by Sophie from the family folder. Exporter, original date and any changes are unknown.</p></article>
}

export function MasterScene07Evidence({inTrace=false}:{inTrace?:boolean}){
 const p=useGameStore(s=>s.save.masterScene07),act=useGameStore(s=>s.masterScene07Action)
 const [legacyDraft,setLegacyDraft]=useState<number>()
 const resumeSavedFinding=p?.phase==='attachment'&&p.saved&&p.questioned
 useEffect(()=>{if(resumeSavedFinding)act({type:'finish'})},[act,resumeSavedFinding])
 if(!p||!['attachment','complete'].includes(p.phase))return null
 const verify=p.conversationRevision==='starred-v2'
 const legacyChoice=legacyDraft??p.hypothesis
 if(!inTrace)return <article className="scene01-invitation" aria-label="Sophie contact export">{p.conversationRevision!=='starred-v2'&&<><h3>Message from Sophie</h3><p>{sophieFollowup.question}</p>{!p.questioned?<>{sophieFollowup.choices.map((x,i)=><button className="opening-choice" key={x} aria-pressed={p.questionDraft===i} onClick={()=>act({type:'question-draft',index:i})}>{x}</button>)}<button className="opening-primary" disabled={p.questionDraft===undefined} onClick={()=>act({type:'send-question'})}>SEND REPLY TO SOPHIE</button></>:p.questionDraft!==undefined&&<><p>You: {sophieFollowup.choices[p.questionDraft]}</p><p>Sophie: {sophieFollowup.replies[p.questionDraft]}</p></>}</>}<h3>Daniel_Contacts_Export</h3>{p.exportStatus==='deferred'?<><p>The copy remains private until you request it.</p><button className="opening-choice" onClick={()=>act({type:'request-export'})}>REQUEST EXPORT</button></>:<><p>Received from Sophie · external copy · authenticity unverified</p><button className="opening-choice" onClick={()=>act({type:'open'})}>OPEN ATTACHMENT</button></>}
 {p.opened&&<><StarredContactCopy damaged={verify}/>{!p.saved&&<p>In TRACE, compare a point from the call with the copy Sophie sent.</p>}</>}
 {p.saved&&<><h3>Optional group sharing</h3><p>Recipients: Sophie and Maya. Lucas has left. Only the selected sentence is sent; no number or file is shared.</p>{!p.shareSent&&exportShares.map((x,i)=><button className="opening-choice" key={x} aria-pressed={p.shareDraft===i} onClick={()=>act({type:'share-draft',index:i})}>{x}</button>)}{!p.shareSent&&<><button className="opening-choice" disabled={p.shareDraft===undefined} onClick={()=>act({type:'review-share'})}>REVIEW GROUP MESSAGE</button><button className="opening-choice" onClick={()=>act({type:'decline-share'})}>KEEP PRIVATE</button>{p.shareDeclined&&<p>Kept private. You may reconsider later.</p>}{p.shareReviewed&&p.shareDraft!==undefined&&<><blockquote>{exportShares[p.shareDraft]}</blockquote><button className="opening-primary" onClick={()=>act({type:'send-share'})}>CONFIRM SEND TO GROUP</button></>}</>}{p.shareSent&&<p>Selected observation sent to FIND DANIEL.</p>}</>}
 {p.phase==='complete'&&<p role="status">Scene 7 complete · Scene 8 unlocked for manual entry · Recovery remains 20%</p>}
 </article>
 if(verify){
  if(!p.opened)return null
  return <article className="trace-summary" aria-label="Sophie statement verification"><h3>Verify Sophie’s account</h3><p>The call and the copy can support a limited observation. The source remains unverified.</p><MasterStatementAssessment options={contactAssessments} saved={p.saved} savedId={p.assessment} legacyFinding={p.hypothesis===undefined?undefined:exportHypotheses[p.hypothesis]} saveLabel="Save contact finding" onSave={id=>act({type:'record-assessment',id})} compare={({id})=>{
   const line=p.lines.find(line=>line.id===`TA-S07-CALL-S${id==='star-visible'?5:id==='copy-provenance'?6:4}`)
   return <><article className="trace-summary"><strong>Sophie’s call</strong>{line&&<blockquote>{line.text}</blockquote>}</article><StarredContactCopy/></>
  }}/></article>
 }
 if(!p.opened)return null
 const legacyLine=p.lines.find(line=>line.id==='TA-S07-CALL-S4')
 return <article className="trace-summary" aria-label="External evidence analysis"><h3>Compare Sophie’s account with the contact export</h3>
  <div className="trace-assessment-sources">{legacyLine&&<article className="trace-summary"><strong>Sophie’s call</strong><blockquote>{legacyLine.text}</blockquote></article>}<StarredContactCopy damaged={false}/></div>
  {p.saved&&p.hypothesis!==undefined?<p role="status">Private finding saved. {exportHypotheses[p.hypothesis]}</p>:p.questioned?<>
   <h3>Private hypothesis</h3>{exportHypotheses.map((x,i)=><button key={x} className="opening-choice" aria-pressed={legacyChoice===i} onClick={()=>setLegacyDraft(i)}>{x}</button>)}
   <button className="opening-primary" disabled={legacyChoice===undefined} onClick={()=>{if(legacyChoice!==undefined)act({type:'record-legacy-conclusion',index:legacyChoice})}}>Save contact finding</button>
  </>:<p>Sophie is waiting for your reply in Messages.</p>}
 </article>
}
