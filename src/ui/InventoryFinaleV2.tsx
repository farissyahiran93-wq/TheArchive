import { useEffect, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { finaleConclusions, finaleFirstChoices, finaleSecondChoices } from '../content/inventoryFinaleV2'
import type { InventoryFinaleV2State } from '../game/inventoryFinaleV2'
import { useGameStore } from '../game/store'
import { PhoneCallScreen } from './PhoneCallScreen'
import { useCallSubtitleReady } from './useCallSubtitleReady'
import './version-history.css'
import './phone-call.css'

const sources=[
  {id:'transfer',title:'Transfer Register',detail:'A public series transfer is listed. It does not identify an individual notice or GB-REF-017.'},
  {id:'finding',title:'Public Finding Aid',detail:'A series-level summary is available. Item-level contents are absent.'},
  {id:'box',title:'Box Inventory',detail:'GH-INV-2022-063-EX1 lists Box 03, GH-PN-BOX-03, and refers to GH-DSC-03-A. Descriptor text and item list are not included.'},
  {id:'issuer',title:'Issuer reference',detail:'GB-REF-017 remains a publisher label. No civic source here matches it to an issuing office or transferred item.'},
  {id:'board',title:'Case Board',detail:'Maya’s separate reference card, Lucas’s capture and public inventory may be compared. Their shared event or provenance is not verified.'},
] as const

function CallConversation({p}:{p:InventoryFinaleV2State}){
  const act=useGameStore(s=>s.inventoryFinaleV2Action),ready=useCallSubtitleReady(p.lines)
  if(p.phase==='ringing')return <PhoneCallScreen phase="ringing" onAnswer={()=>act({type:'answer'})} onDecline={()=>act({type:'decline'})}/>
  if(p.phase==='voicemail')return <PhoneCallScreen phase="voicemail" lines={p.lines}><button className="opening-primary" onClick={()=>act({type:'callback'})}>Call Sophie back</button></PhoneCallScreen>
  return <PhoneCallScreen phase={p.phase} lines={p.lines} connectedAt={p.connectedAt} endedAt={p.endedAt}>
    {p.phase==='call-first'&&<>{finaleFirstChoices.map(c=><button className={`opening-choice ${p.draft===c.id?'selected':''}`} aria-pressed={p.draft===c.id} key={c.id} onClick={()=>act({type:'draft',id:c.id})}>{c.text}</button>)}<button className="opening-primary" disabled={!ready||!finaleFirstChoices.some(c=>c.id===p.draft)} onClick={()=>act({type:'send'})}>Say this</button></>}
    {p.phase==='call-second'&&<>{finaleSecondChoices.map(c=><button className={`opening-choice ${p.draft===c.id?'selected':''}`} aria-pressed={p.draft===c.id} key={c.id} onClick={()=>act({type:'draft',id:c.id})}>{c.text}</button>)}<button className="opening-primary" disabled={!ready||!finaleSecondChoices.some(c=>c.id===p.draft)} onClick={()=>act({type:'send'})}>Say this</button></>}
    {p.phase==='warning'&&<button className="opening-primary" disabled={!ready} onClick={()=>act(p.lines.some(x=>x.id==='CH1-S10V2-END')?{type:'finish'}:{type:'continue-call'})}>{p.lines.some(x=>x.id==='CH1-S10V2-END')?'End call':'Continue'}</button>}
  </PhoneCallScreen>
}

function ChapterComplete({onChapterSelect}:{onChapterSelect?:()=>void}){
  const continueC2=useGameStore(s=>s.continueChapter2)
  return <section className="chapter-finale" aria-label="Chapter 1 complete"><div className="chapter-finale-inner"><p className="chapter-finale-kicker">THE ARCHIVE</p><div className="chapter-finale-rule"/><h1 className="chapter-finale-status">CHAPTER 1 COMPLETE</h1><h2 className="chapter-finale-title">THE MISSING ENTRY</h2><blockquote>A number without a name.<br/>A warning without a sender.</blockquote><div className="chapter-finale-summary"><h2>Evidence retained</h2><p>Public inventory reference recorded.</p><p>Contact and physical card observations retained with their provenance limits.</p><p>Private conclusion saved. The missing document remains unresolved.</p></div><p className="chapter-finale-unlock">CHAPTER 2 UNLOCKED</p><h2>THE PEOPLE HE LEFT BEHIND</h2><button className="opening-primary" onClick={onChapterSelect}>Continue to Chapter Select</button><button className="opening-choice" onClick={continueC2}>Begin Chapter 2</button></div></section>
}

function EndingTransition({p,onChapterSelect}:{p:InventoryFinaleV2State;onChapterSelect?:()=>void}){
  const [ready,setReady]=useState(()=>!p.endedAt||Date.now()-p.endedAt>=1100)
  useEffect(()=>{if(ready)return;const timer=window.setTimeout(()=>setReady(true),Math.max(0,1100-(Date.now()-(p.endedAt??0))));return()=>window.clearTimeout(timer)},[ready,p.endedAt])
  return ready?<ChapterComplete onChapterSelect={onChapterSelect}/>:<PhoneCallScreen phase="ending" lines={p.lines} connectedAt={p.connectedAt} endedAt={p.endedAt}/>
}

export function InventoryFinaleV2({onHome,onChapterSelect}:{onHome:()=>void;onChapterSelect?:()=>void}){
  const save=useGameStore(s=>s.save),act=useGameStore(s=>s.inventoryFinaleV2Action),p=save.chapter1!.inventoryFinaleV2!
  if(['ringing','voicemail','call-first','call-second','warning'].includes(p.phase))return <CallConversation p={p}/>
  if(p.phase==='ending')return <EndingTransition p={p} onChapterSelect={onChapterSelect}/>
  return <section className="c1-app version-history" aria-label="The Inventory Sheet finale" data-chapter1-scene="10"><header className="opening-chat-header"><button className="icon-button bare" aria-label="Back to phone" onClick={onHome}><ArrowLeft size={21}/></button><div><strong>THE INVENTORY SHEET</strong><small>CHAPTER 1 · SCENE 10</small></div></header><div className="c1-scroll">
    {p.phase==='investigation'&&<><h1>THE INVENTORY SHEET</h1><p>Find what the public box index actually lists.</p>{sources.map(x=><article key={x.id}><button className="opening-choice" onClick={()=>act({type:'inspect',field:x.id})}>{x.title}{p.inspected.includes(x.id)?' · inspected':''}</button>{p.inspected.includes(x.id)&&<p>{x.detail}</p>}</article>)}<button className="opening-primary" disabled={p.inspected.length!==5} onClick={()=>act({type:'conclude'})}>Record private conclusion</button></>}
    {p.phase==='conclusion'&&<><h1>What can the inventory tell us?</h1>{finaleConclusions.map(c=><button className={`opening-choice ${p.draft===c.id?'selected':''}`} key={c.id} onClick={()=>act({type:'draft',id:c.id})}>{c.text}</button>)}<button className="opening-primary" disabled={!finaleConclusions.some(c=>c.id===p.draft)} onClick={()=>act({type:'conclude'})}>Save privately</button></>}
    {p.phase==='quiet'&&<><h1>For now, that is all the page says.</h1><p>The descriptor remains unopened. The phone is quiet.</p><button className="opening-primary" onClick={()=>{act({type:'return-home'});onHome()}}>Return to Home</button></>}
  </div></section>
}
