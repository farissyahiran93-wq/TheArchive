import { useEffect, useState } from 'react'
import { exportHypotheses, sophieFollowup } from '../content/masterScene07'
import { contactAssessments } from '../content/masterSceneAssessments'
import { useGameStore } from '../game/store'
import { hasTransferredScene07Export } from '../game/masterScene07'
import { useCaseNavigation } from './CaseNavigation'
import { ContactExportViewer } from './ContactExportViewer'
import { MasterStatementAssessment } from './MasterStatementAssessment'

function StarredContactCopy({damaged=true}:{damaged?:boolean}){
 return <article className="trace-summary" aria-label="Masked contact entry"><strong>Source 02 — Contact export</strong><p>Starred contact: ★ ••• ••• ••41<br/>Saved name: Unknown</p><p>{damaged?'The Remarks field is damaged and unreadable.':'A separate remark reads “Don’t call this number”. Its associated entry is unknown.'}</p><p>Source: copy shared by Sophie from the family folder. Exporter, original date and any changes are unknown.</p></article>
}

export function MasterScene07Evidence({inTrace=false}:{inTrace?:boolean}){
 const p=useGameStore(s=>s.save.masterScene07),act=useGameStore(s=>s.masterScene07Action)
 const [viewing,setViewing]=useState(false),[analysisVisible,setAnalysisVisible]=useState(false)
 const navigation=useCaseNavigation()
 const resumeSavedFinding=p?.phase==='attachment'&&p.saved&&p.questioned
 useEffect(()=>{if(resumeSavedFinding){if(p?.conversationRevision==='starred-v2'){if(!p.privacy)act({type:'begin-privacy'})}else act({type:'finish'})}},[act,resumeSavedFinding,p?.conversationRevision,p?.privacy])
 if(!p||!['attachment','complete'].includes(p.phase))return null
 const verify=p.conversationRevision==='starred-v2'
 const transferred=hasTransferredScene07Export(p)
 const viewer=viewing&&<ContactExportViewer damaged={verify} transferred={transferred} onTransfer={()=>act({type:'transfer'})} onClose={()=>setViewing(false)} {...(!inTrace?{onOpenTrace:()=>{setViewing(false);useGameStore.getState().masterScene05Action({type:'view',id:'home'});navigation.openArchive()}}:{})}/>
 const openViewer=()=>{act({type:'open'});setViewing(true)}
 const analysis=<MasterScene07Analysis/>
 if(!inTrace)return <article className="scene01-invitation" aria-label="Sophie contact export">{p.conversationRevision!=='starred-v2'&&<><h3>Message from Sophie</h3><p>{sophieFollowup.question}</p>{!p.questioned?<>{sophieFollowup.choices.map((x,i)=><button className="opening-choice" key={x} aria-pressed={p.questionDraft===i} onClick={()=>act({type:'question-draft',index:i})}>{x}</button>)}<button className="opening-primary" disabled={p.questionDraft===undefined} onClick={()=>act({type:'send-question'})}>SEND REPLY TO SOPHIE</button></>:p.questionDraft!==undefined&&<><p>You: {sophieFollowup.choices[p.questionDraft]}</p><p>Sophie: {sophieFollowup.replies[p.questionDraft]}</p></>}</>}<h3>Daniel_Contacts_Export</h3>{p.exportStatus==='deferred'?<><p>The copy remains private until you request it.</p><button className="opening-choice" onClick={()=>act({type:'request-export'})}>REQUEST EXPORT</button></>:<><p>Received from Sophie · external copy · authenticity unverified</p><button className="opening-choice" onClick={openViewer}>OPEN ATTACHMENT</button></>}
 {p.opened&&!p.saved&&<><button className="opening-choice" aria-expanded={analysisVisible} onClick={()=>setAnalysisVisible(value=>!value)}>COMPARE SOURCES</button>{analysisVisible&&analysis}</>}

 {viewer}</article>
 if(!transferred)return null
 return <><section className="trace-summary" aria-label="External Sophie document"><h2>Daniel_Contacts_Export</h2><p>Shared by Sophie · external copy · authenticity unverified</p><button className="trace-action" onClick={()=>setViewing(true)}>OPEN DOCUMENT</button></section>{analysis}{viewer}</>
}

function MasterScene07Analysis(){
 const p=useGameStore(s=>s.save.masterScene07),act=useGameStore(s=>s.masterScene07Action)
 const [legacyDraft,setLegacyDraft]=useState<number>()
 if(!p)return null
 const verify=p.conversationRevision==='starred-v2',legacyChoice=legacyDraft??p.hypothesis
 if(verify){
  if(!p.opened)return null
  return <article className="trace-summary" aria-label="Sophie statement verification"><h3>Verify Sophie’s account</h3><p>Compare what Sophie said during the call with the copy she sent. The source remains unverified.</p><MasterStatementAssessment options={contactAssessments} saved={p.saved} savedId={p.assessment} legacyFinding={p.hypothesis===undefined?undefined:exportHypotheses[p.hypothesis]} saveLabel="Save contact finding" onSave={id=>act({type:'record-assessment',id})} compare={({id})=>{
   const line=p.lines.find(line=>line.id===`TA-S07-CALL-S${id==='star-visible'?5:id==='copy-provenance'?6:4}`)
   return <><article className="trace-summary"><strong>Source 01 — Sophie’s call</strong>{line&&<blockquote>{line.text}</blockquote>}</article><StarredContactCopy/></>
  }}/></article>
 }
 if(!p.opened)return null
 const legacyLine=p.lines.find(line=>line.id==='TA-S07-CALL-S4')
 return <article className="trace-summary" aria-label="External evidence analysis"><h3>Compare Sophie’s account with the contact export</h3>
  <div className="trace-assessment-sources">{legacyLine&&<article className="trace-summary"><strong>Source 01 — Sophie’s call</strong><blockquote>{legacyLine.text}</blockquote></article>}<StarredContactCopy damaged={false}/></div>
  {p.saved&&p.hypothesis!==undefined?<p role="status">Private finding saved. {exportHypotheses[p.hypothesis]}</p>:p.questioned?<>
   <h3>Private hypothesis</h3>{exportHypotheses.map((x,i)=><button key={x} className="opening-choice" aria-pressed={legacyChoice===i} onClick={()=>setLegacyDraft(i)}>{x}</button>)}
   <button className="opening-primary" disabled={legacyChoice===undefined} onClick={()=>{if(legacyChoice!==undefined)act({type:'record-legacy-conclusion',index:legacyChoice})}}>Save contact finding</button>
  </>:<p>Sophie is waiting for your reply in Messages.</p>}
 </article>
}
