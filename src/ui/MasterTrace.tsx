import { MasterTimeline } from './MasterTimeline'
import { MasterScene07Evidence } from './MasterScene07Evidence'
import { MasterScene08Evidence } from './MasterScene08Evidence'
import { MasterScene09Evidence } from './MasterScene09Evidence'
import { scene06Units } from '../game/masterScene06'
import { useEffect, useState } from 'react'
import { masterFragments } from '../content/masterScene05'
import { masterArchiveIdentifier } from '../content/masterScene04'
import { masterRecoveryUnits } from '../game/masterScene05'
import { useGameStore } from '../game/store'
import './opening.css'

export function MasterTrace({onHome}:{onHome:()=>void}) {
  const p=useGameStore(s=>s.save.masterScene05),act=useGameStore(s=>s.masterScene05Action)
  const [view,setView]=useState<string>('home')
  const [returnTimeline,setReturnTimeline]=useState(false)
  const six=useGameStore(s=>s.save.masterScene06), act6=useGameStore(s=>s.masterScene06Action)
  useEffect(()=>{act({type:'open-trace'})},[act])
  if(!p||p.packageStatus!=='installed')return null
  const fragment=masterFragments.find(f=>f.id===view)
  const open=(id:string)=>{act({type:'read',id});setView(id)}
  return <section className="opening-screen opening-v4" aria-label="TRACE Digital Evidence Analyzer"><header className="opening-chat-header"><button className="icon-button bare" onClick={onHome}>Home</button><strong>TRACE · Digital Evidence Analyzer</strong></header><div className="opening-thread" style={{padding:'1rem',overflowY:'auto'}}>
    <h2>Recovery: {(masterRecoveryUnits(p)+scene06Units(six))/10}%</h2><p>Manifest TA-R01 · {masterRecoveryUnits(p)+scene06Units(six)} / 1,000 unique recovery units. Phone archive source unverified.</p>
    {view!=='home'&&<button className="opening-choice" onClick={()=>{setView(returnTimeline?'timeline':'home');setReturnTimeline(false)}}>{returnTimeline?'RETURN TO TIMELINE':'BACK TO TRACE'}</button>}
    {view==='home'&&<><h3>Archive Recovery</h3><button className="opening-choice" aria-pressed={p.selected} onClick={()=>act({type:'select'})}>SELECT {masterArchiveIdentifier}</button><button className="opening-primary" disabled={!p.selected||p.recovered} onClick={()=>act({type:'recover'})}>START RECOVERY</button><p>Only designated first-pass fragments are recoverable. The accepted original remains separate.</p><h3>Messages &amp; Notes</h3>{p.recovered?masterFragments.map(f=><button key={f.id} className="opening-choice" onClick={()=>open(f.id)}>{f.category} · {f.id} {p.read.includes(f.id)?'· Read':''}</button>):<p>Locked until the first recovery operation.</p>}<h3>Activity Logs</h3>{!p.complete?<p>Unavailable — awaiting a later operation.</p>:!six?<button className="opening-choice" onClick={()=>act6({type:'start'})}>START SCENE 6</button>:six.beat<8?<p>Continue the conversation with Unknown before recovery.</p>:!six.recovered?<button className="opening-primary" onClick={()=>act6({type:'recover'})}>START ACTIVITY LOG RECOVERY</button>:<button className="opening-choice" onClick={()=>setView('timeline')}>OPEN ACTIVITY LOGS &amp; TIMELINE</button>}<p>Gallery, Call History, Audio and protected records remain locked.</p><button className="opening-choice" onClick={()=>setView('summary')}>EVIDENCE SUMMARY</button></>}
    {view==='timeline'&&<MasterTimeline onSource={id=>{setReturnTimeline(true);open(id)}}/>}
    {view==='home'&&<MasterScene07Evidence inTrace/>}
    {view==='home'&&<MasterScene08Evidence/>}
    {view==='home'&&<MasterScene09Evidence/>}
    {fragment&&<article><h3>{fragment.category} · original fragment</h3><p>Source file: {fragment.id}</p><p>Recovery: partial · Timestamp: unavailable · Authenticity: unverified</p><blockquote>{fragment.body}</blockquote><p>[Unrecovered segment]</p><p>Metadata and missing text do not establish why Daniel disappeared.</p><button className="opening-primary" disabled={p.saved.includes(fragment.id)} onClick={()=>act({type:'save',id:fragment.id})}>{p.saved.includes(fragment.id)?'FINDING SAVED':'SAVE FINDING'}</button></article>}
    {view==='summary'&&<article><h3>TRACE summary · source-linked observations</h3><p>Generated locally from fragments you opened. These observations are not authentication or a conclusion about Daniel's disappearance.</p>{masterFragments.filter(f=>p.read.includes(f.id)).map(f=><div key={f.id}><p>{f.summary}</p><button className="opening-choice" onClick={()=>open(f.id)}>INSPECT SOURCE · {f.id}</button></div>)}{!p.read.length&&<p>No opened sources yet.</p>}</article>}
  </div></section>
}
