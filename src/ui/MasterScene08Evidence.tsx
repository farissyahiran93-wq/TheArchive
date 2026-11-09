import { captureHypotheses } from '../content/masterScene08'
import { availableCaptureAssessments } from '../game/masterScene08'
import { useGameStore } from '../game/store'
import { MasterStatementAssessment } from './MasterStatementAssessment'

export function MasterCapturePreview(){
 return <div className="scene08-capture" aria-label="Cropped message capture"><small>— cropped above —</small><h3>Messages · Maya &amp; Daniel</h3><p>Daniel <time>21:14</time></p><blockquote>Lucas checked in. He said there was another copy.</blockquote><p>Maya</p><blockquote>Another copy of what?</blockquote><p>Daniel</p><blockquote>I'll explain when I can.</blockquote><small>— cropped below —</small></div>
}

export function MasterScene08Evidence(){
 const save=useGameStore(s=>s.save),act=useGameStore(s=>s.masterScene08Action),p=save.masterScene08
 if(!p?.opened||p.beat<8)return null
 const maya=(beat:number)=>p.messages.find(line=>line.id.startsWith(`TA-S08-C${beat}-M-`))?.text
 const lucas=save.lucasPhoto?.messages.find(line=>line.id==='TA-S08-LUCAS-PHOTO-INTRO')?.text
 return <article className="trace-summary" aria-label="Check-in statement verification"><h3>Verify the last check-in</h3><p>The visible words can corroborate Maya’s description of the excerpt. They cannot authenticate the thread or establish what Lucas did.</p>
  <MasterStatementAssessment options={availableCaptureAssessments(save)} saved={p.saved} savedId={p.assessment} legacyFinding={p.hypothesis===undefined?undefined:captureHypotheses[p.hypothesis]} saveLabel="Save check-in finding" onSave={id=>act({type:'record-assessment',id})} compare={({id})=><>
   <article className="trace-summary"><strong>Maya’s capture</strong><MasterCapturePreview/><p>21:14 is displayed. Date, time zone and context outside the crop are unavailable.</p></article>
   <article className="trace-summary"><strong>{id==='crop-export'?'Separate contact export':id==='crop-lucas'?'Lucas’s private account':'Maya’s statement'}</strong>
    {id==='crop-export'?<p>Unnamed starred entry. Sophie shared this external copy. Its source history is unknown.</p>:<blockquote>{id==='crop-lucas'?lucas:maya(id==='crop-wording'?2:3)}</blockquote>}
   </article>
  </>}/>
 </article>
}
