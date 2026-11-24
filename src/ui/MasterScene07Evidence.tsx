import { useEffect, useState } from 'react'
import { FileText } from 'lucide-react'
import { sophieFollowup } from '../content/masterScene07'
import { useGameStore } from '../game/store'
import { ContactExportViewer } from './ContactExportViewer'

export function MasterScene07Evidence(){
 const p=useGameStore(s=>s.save.masterScene07),act=useGameStore(s=>s.masterScene07Action)
 const [viewing,setViewing]=useState(false)
 // Historic assessment receipts and pending privacy conversations keep their original IDs.
 useEffect(()=>{
  if(p?.phase!=='attachment'||p.chat||p.privacy)return
  if(p.saved&&p.questioned){act({type:p.conversationRevision==='starred-v2'?'begin-privacy':'finish'});return}
  if(p.opened&&p.questioned)act({type:'resume-chat'})
 },[p,act])
 if(!p||!['attachment','complete'].includes(p.phase))return null
 const legacyQuestion=p.conversationRevision!=='starred-v2'&&p.conversationRevision!=='conversation-v3'&&!p.questioned
 return <article className="scene01-invitation" aria-label="Sophie contact export">
  {legacyQuestion&&<><p>{sophieFollowup.question}</p>{sophieFollowup.choices.map((text,i)=><button className="opening-choice" key={text} aria-pressed={p.questionDraft===i} onClick={()=>act({type:'question-draft',index:i})}>{text}</button>)}<button className="opening-primary" disabled={p.questionDraft===undefined} onClick={()=>act({type:'send-question'})}>Send</button></>}
  {p.conversationRevision!=='starred-v2'&&p.conversationRevision!=='conversation-v3'&&p.questioned&&p.questionDraft!==undefined&&<><p>{sophieFollowup.question}</p><p>You: {sophieFollowup.choices[p.questionDraft]}</p><p>Sophie: {sophieFollowup.replies[p.questionDraft]}</p></>}
  <FileText size={20} aria-hidden="true"/><h3>Daniel_Contacts_Export</h3>
  {p.exportStatus==='deferred'?<button className="opening-choice" onClick={()=>act({type:'request-export'})}>REQUEST EXPORT</button>:
  <button className="opening-choice" onClick={()=>{act({type:'open'});setViewing(true)}}>OPEN ATTACHMENT</button>}
  {viewing&&<ContactExportViewer damaged={p.conversationRevision==='starred-v2'||p.conversationRevision==='conversation-v3'} onAnalyse={()=>act({type:'analyse-fragment'})} onClose={()=>setViewing(false)}/>}
 </article>
}
