import { useState } from 'react'
import { availableCardAssessments } from '../game/masterScene09'
import { cardHypotheses, referenceCardImage, referenceCode } from '../content/masterScene09'
import { useGameStore } from '../game/store'
import { ChatPhotoViewer } from './ChatPhotoViewer'
import { MasterStatementAssessment } from './MasterStatementAssessment'
import { MasterCapturePreview } from './MasterScene08Evidence'

export function MasterScene09Evidence(){
 const save=useGameStore(s=>s.save),act=useGameStore(s=>s.masterScene09Action),[zoom,setZoom]=useState(false),p=save.masterScene09
 if(!p?.opened||p.beat<8)return null
 return <article className="trace-summary" aria-label="Secondary card comparison"><h3>Compare the secondary card</h3><p>Use the visible reference to plan a search. Earlier sources can help frame the question, but neither connects the card to Daniel’s disappearance.</p>
  <MasterStatementAssessment options={availableCardAssessments(save)} saved={p.saved} savedId={p.assessment} legacyFinding={p.hypothesis===undefined?undefined:cardHypotheses[p.hypothesis]} saveLabel="Save card finding" onSave={id=>act({type:'record-assessment',id})} compare={({id})=><>
   <article className="trace-summary"><strong>Maya’s reference-card photo</strong><p><mark>{referenceCode}</mark> · Reference Only · Contents Unverified</p><p>Photographer, capture date and physical custody are unknown.</p><button className="trace-action" onClick={()=>setZoom(true)}>View card photograph</button></article>
   <article className="trace-summary">{id==='card-capture'?<><strong>Maya’s earlier crop</strong><MasterCapturePreview/></>:<><strong>Sophie’s starred contact export</strong><p>Unnamed starred entry. The copy does not identify this reference code.</p></>}</article>
  </>}/>
  {zoom&&<ChatPhotoViewer src={referenceCardImage} alt="Photograph of a Greyhaven secondary reference card" onClose={()=>setZoom(false)}/>}
 </article>
}
