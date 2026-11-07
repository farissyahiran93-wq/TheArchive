import { useEffect, useState } from 'react'
import { finaleTurns, finaleWarning, inventoryConclusions } from '../content/masterScene10'
import { useGameStore } from '../game/store'
import { PhoneCallScreen } from './PhoneCallScreen'
import { MasterScene10Media } from './MasterScene10Media'

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
 return <section className="opening-screen opening-v4" aria-label="Greyhaven Public Inventory"><header className="opening-chat-header"><button className="icon-button bare" onClick={onClose}>Back</button><strong>Greyhaven Public Inventory</strong></header><div className="opening-thread" style={{padding:'1rem',overflowY:'auto'}}>
  <h2>Search public records</h2><p>Enter the reference from Maya’s secondary card photograph.</p>
  <label>Reference <input aria-label="Inventory reference" value={p.query} disabled={p.saved} onChange={e=>act({type:'query',value:e.target.value})}/></label><button className="opening-primary" disabled={p.saved||!p.query.trim()} onClick={()=>act({type:'search'})}>SEARCH</button>
  {p.searched&&!p.matched&&<p role="status">No matching public index entry. Check the reference and try again.</p>}
  {p.matched&&<article className="utility-card"><h3>Matching reference · GH-DSC-03-A</h3><p>Secondary index entry · reference only. The underlying record is not available here.</p><button className="opening-choice" onClick={()=>act({type:'metadata'})}>INSPECT PUBLIC METADATA</button>{p.metadata&&<p>The public index lists this reference. It supplies no document body or verified physical custody.</p>}<button className="opening-choice" onClick={()=>act({type:'limitations'})}>REVIEW SOURCE LIMITATIONS</button>{p.limitations&&<p>A matching reference does not authenticate the photograph, reveal the record contents, or establish a connection to Daniel, June or another copy.</p>}<button className="opening-choice" disabled={!p.metadata||!p.limitations} onClick={()=>act({type:'compare'})}>COMPARE WITH MAYA’S CARD</button>{p.compared&&<><p>The strings match; the photograph and public index remain separate sources.</p><h3>Private conclusion</h3>{inventoryConclusions.map((c,i)=><button key={c} disabled={p.saved} className="opening-choice" aria-pressed={p.conclusion===i} onClick={()=>act({type:'conclusion',index:i})}>{c}</button>)}<button className="opening-primary" disabled={p.conclusion===undefined||p.saved} onClick={()=>act({type:'save'})}>SAVE PRIVATE CONCLUSION</button></>}</article>}
  {p.phase==='return'&&<><p role="status">Finding saved privately. Return to Home.</p><button className="opening-primary" onClick={()=>act({type:'home'})}>RETURN HOME</button></>}
 </div></section>
}
