import { useEffect, useMemo, useState } from 'react'
import { finaleTurns, finaleWarning, inventoryCode, inventoryConclusions } from '../content/masterScene10'
import { referenceCardImage } from '../content/masterScene09'
import { selectMasterCaseFile } from '../game/masterCaseFile'
import { emptyInventoryTheory, inventoryTheoryReady, inventoryTheoryTextLimit, type MasterScene10 as InventoryProgress, type MasterScene10Action } from '../game/masterScene10'
import { useGameStore } from '../game/store'
import { PhoneCallScreen } from './PhoneCallScreen'
import { MasterScene10Media } from './MasterScene10Media'
import { MasterCaseFile, MasterInvestigationBoard } from './MasterCaseFile'
import './master-scene10-inventory.css'

function MasterScene10Investigation({ progress, onAction }: { progress: InventoryProgress; onAction: (action: MasterScene10Action) => void }) {
 const save = useGameStore(s => s.save)
 const caseAction = useGameStore(s => s.masterCaseFileAction)
 const caseFile = useMemo(() => selectMasterCaseFile(save), [save])
 const [panel, setPanel] = useState<'theory'|'case'|'board'>('theory')
 if (!caseFile) return null
 const draft = progress.theoryDraft ?? progress.theory ?? emptyInventoryTheory
 const canSave = inventoryTheoryReady(draft) && (!progress.theory || !!progress.theoryDraft)
 return <section className="inventory-investigation" aria-labelledby="inventory-theory-heading">
  <p className="inventory-eyebrow">TRACE / PRIVATE WORKSPACE</p>
  <h2 id="inventory-theory-heading">Case File 001 · Working theory</h2>
  <nav className="inventory-workspace-tabs" aria-label="Investigation workspace">
   <button type="button" className="opening-choice" aria-pressed={panel==='theory'} onClick={()=>setPanel('theory')}>Working theory</button>
   <button type="button" className="opening-choice" aria-pressed={panel==='case'} onClick={()=>setPanel('case')}>Case File 001</button>
   <button type="button" className="opening-choice" aria-pressed={panel==='board'} onClick={()=>setPanel('board')}>Investigation Board</button>
  </nav>
  {panel==='case'&&<MasterCaseFile caseFile={caseFile} onAction={caseAction} onOpenBoard={()=>setPanel('board')}/>}
  {panel==='board'&&<MasterInvestigationBoard caseFile={caseFile} onAction={caseAction} onOpenCase={()=>setPanel('case')}/>}
  {panel==='theory'&&<form className="inventory-theory-form" onSubmit={event=>{event.preventDefault();if(canSave)onAction({type:'save-theory'})}}>
   <p>Record what the available evidence supports and what you still need to find out.</p>
   <label>Investigation question<select value={draft.questionId} onChange={e=>onAction({type:'theory-question',questionId:e.target.value})}>
    <option value="" disabled>Choose a question</option>
    {caseFile.questions.map(question=><option key={question.id} value={question.id}>{question.prompt}</option>)}
   </select></label>
   <label>Provisional explanation<textarea value={draft.hypothesis} maxLength={inventoryTheoryTextLimit} rows={3} onChange={e=>onAction({type:'theory-text',field:'hypothesis',value:e.target.value})}/></label>
   <label>Competing explanation <small>Optional</small><textarea value={draft.alternative} maxLength={inventoryTheoryTextLimit} rows={2} onChange={e=>onAction({type:'theory-text',field:'alternative',value:e.target.value})}/></label>
   <fieldset className="inventory-theory-sources">
    <legend>Evidence references</legend>
    <p>Attach at least one supporting clue. Add evidence that challenges the theory if you have any.</p>
    <div className="inventory-source-list">{caseFile.nodes.map(node=>{
     const use=draft.supportingIds.includes(node.id)?'support':draft.contradictingIds.includes(node.id)?'challenge':'none'
     return <label key={node.id}><strong>{node.title}</strong><small>{node.source}</small><select aria-label={`Use ${node.title} in theory`} value={use} onChange={e=>onAction({type:'theory-evidence',id:node.id,use:e.target.value as typeof use})}>
      <option value="none">Leave unattached</option><option value="support">Supports this theory</option><option value="challenge">Challenges this theory</option>
     </select></label>
    })}</div>
   </fieldset>
   <label>Outstanding question<textarea value={draft.outstanding} maxLength={inventoryTheoryTextLimit} rows={2} onChange={e=>onAction({type:'theory-text',field:'outstanding',value:e.target.value})}/></label>
   {progress.theory&&!progress.theoryDraft&&<p role="status">Summary saved privately. You can revise it before returning Home.</p>}
   <button className="opening-primary" disabled={!canSave}>SAVE INVESTIGATION SUMMARY</button>
   {progress.theory&&progress.theoryDraft&&<button type="button" className="opening-choice" onClick={()=>onAction({type:'discard-theory-draft'})}>Discard unsaved changes</button>}
  </form>}
 </section>
}

export function MasterScene10({onClose}:{onClose:()=>void}){
 const p=useGameStore(s=>s.save.masterScene10),act=useGameStore(s=>s.masterScene10Action)
 const [pauseOver,setPauseOver]=useState(false)
 useEffect(()=>{if(p?.phase!=='ending')return;const timer=window.setTimeout(()=>setPauseOver(true),3000);return()=>window.clearTimeout(timer)},[p?.phase])
 if(!p)return null
 if(p.phase==='ringing')return <PhoneCallScreen phase="ringing" onAnswer={()=>act({type:'answer'})} onDecline={()=>act({type:'decline'})}/>
 if(p.phase==='missed')return <PhoneCallScreen phase="voicemail"><p>Missed call from Sophie. Call back when ready.</p><button className="opening-primary" onClick={()=>act({type:'answer'})}>CALL SOPHIE BACK</button></PhoneCallScreen>
 if(p.phase==='call'&&p.media)return <MasterScene10Media/>
 if(['call','warning','ending'].includes(p.phase))return <PhoneCallScreen phase="call-first" lines={p.lines}>
  {p.phase==='call'&&<><p>Choose a reply</p>{finaleTurns[p.beat].choices.map((c,i)=><button key={c} className="opening-choice" aria-pressed={p.draft===i} onClick={()=>act({type:'draft',index:i})}>{c}</button>)}<button className="opening-primary" disabled={p.draft===undefined} onClick={()=>act({type:'send'})}>Send</button></>}
  {p.phase==='warning'&&<><article className="utility-card" aria-label="Description of Sophie's separate warning card"><strong>Handwritten card · Sophie’s paper folder</strong><p>★ ••• ••• ••41</p><blockquote>{finaleWarning}</blockquote><small>Sophie describes the card. The number is masked; handwriting and authorship are unverified.</small></article><button className="opening-primary" onClick={()=>act({type:'reveal-final'})}>CONTINUE</button></>}
  {p.phase==='ending'&&<button className="opening-primary" disabled={!pauseOver} onClick={()=>act({type:'finish'})}>END CHAPTER</button>}
 </PhoneCallScreen>
 if(p.phase==='complete')return <section className="opening-screen opening-v4"><div className="opening-thread" style={{padding:'2rem'}}><p>CHAPTER 1 COMPLETE</p><h1>The First Trace</h1><p>Chapter 2 — The Other Copy unlocked</p><p>TRACE recovery: 20%</p><p>Continue when the next chapter is available.</p><button className="opening-primary" onClick={()=>{if(p.media)act({type:'media-dismiss'});onClose()}}>RETURN HOME</button></div></section>
 if(p.investigationRevision==='theory-v1')return <section className="opening-screen opening-v4" aria-label="Greyhaven Public Inventory">
  <header className="opening-chat-header"><button className="icon-button bare" onClick={onClose}>Back</button><strong>Greyhaven Public Inventory</strong></header>
  <div className="opening-thread inventory-screen">
   <p className="inventory-eyebrow">GREYHAVEN RECORDS / PUBLIC INDEX</p>
   <h2>Search public records</h2>
   <form className="inventory-search" onSubmit={event=>{event.preventDefault();if(!p.saved&&p.query.trim())act({type:'search'})}}>
    <label>Reference<input aria-label="Inventory reference" value={p.query} disabled={p.saved} maxLength={60} autoCapitalize="characters" onChange={e=>act({type:'query',value:e.target.value})}/></label>
    <button className="opening-primary" disabled={p.saved||!p.query.trim()}>SEARCH</button>
   </form>
   {p.searched&&!p.matched&&<p role="status">No matching public index entry. Check the reference on Maya’s card and try again.</p>}
   {p.matched&&<article className="utility-card inventory-record">
    <h3>Matching reference · {inventoryCode}</h3>
    <p>The public inventory lists a secondary index reference. The underlying record and its physical custody remain unavailable.</p>
    <button className="opening-choice" disabled={p.compared} onClick={()=>act({type:'compare'})}>COMPARE WITH MAYA’S CARD</button>
    {p.compared&&<>
     <div className="inventory-comparison">
      <figure><img src={referenceCardImage} alt="Maya’s photograph of the Secondary Reference Card"/><figcaption>Maya’s shared-folder photograph</figcaption></figure>
      <div><small>GREYHAVEN PUBLIC INDEX</small><strong>{inventoryCode}</strong><span>Secondary index entry</span><span>Reference only</span></div>
     </div>
     <p>The two references match. The photograph’s origin, the record’s contents and any connection to Daniel remain unverified.</p>
    </>}
   </article>}
   {p.compared&&<MasterScene10Investigation progress={p} onAction={act}/>}
   {p.phase==='return'&&<button className="opening-primary" disabled={!!p.theoryDraft} onClick={()=>act({type:'home'})}>RETURN HOME</button>}
  </div>
 </section>
 return <section className="opening-screen opening-v4" aria-label="Greyhaven Public Inventory"><header className="opening-chat-header"><button className="icon-button bare" onClick={onClose}>Back</button><strong>Greyhaven Public Inventory</strong></header><div className="opening-thread" style={{padding:'1rem',overflowY:'auto'}}>
  <h2>Search public records</h2><p>Enter the reference from Maya’s secondary card photograph.</p>
  <label>Reference <input aria-label="Inventory reference" value={p.query} disabled={p.saved} onChange={e=>act({type:'query',value:e.target.value})}/></label><button className="opening-primary" disabled={p.saved||!p.query.trim()} onClick={()=>act({type:'search'})}>SEARCH</button>
  {p.searched&&!p.matched&&<p role="status">No matching public index entry. Check the reference and try again.</p>}
  {p.matched&&<article className="utility-card"><h3>Matching reference · GH-DSC-03-A</h3><p>Secondary index entry · reference only. The underlying record and its physical custody remain unavailable.</p><button className="opening-choice" disabled={p.compared} onClick={()=>act({type:'compare'})}>COMPARE WITH MAYA’S CARD</button>{p.compared&&<><div className="inventory-comparison"><figure><img src={referenceCardImage} alt="Maya’s photograph of the Secondary Reference Card"/><figcaption>Maya’s photograph</figcaption></figure><div><small>GREYHAVEN PUBLIC INDEX</small><strong>{inventoryCode}</strong><span>Reference only</span></div></div><p>The two references match. The photograph’s origin, the record’s contents and any connection to Daniel remain unverified.</p><h3>Private conclusion</h3>{inventoryConclusions.map((c,i)=><button key={c} disabled={p.saved} className="opening-choice" aria-pressed={p.conclusion===i} onClick={()=>act({type:'conclusion',index:i})}>{c}</button>)}<button className="opening-primary" disabled={p.conclusion===undefined||p.saved} onClick={()=>act({type:'save'})}>SAVE PRIVATE CONCLUSION</button></>}</article>}
  {p.phase==='return'&&<><p role="status">Finding saved privately. Return to Home.</p><button className="opening-primary" onClick={()=>act({type:'home'})}>RETURN HOME</button></>}
 </div></section>
}
