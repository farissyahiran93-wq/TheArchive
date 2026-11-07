import { useState } from 'react'
import { activityEvents } from '../content/masterScene06'
import { masterFragments } from '../content/masterScene05'
import { timelineReady } from '../game/masterScene06'
import { useGameStore } from '../game/store'
export function MasterTimeline({onSource}:{onSource:(id:string)=>void}){
 const p=useGameStore(s=>s.save.masterScene06),act=useGameStore(s=>s.masterScene06Action)
 const [selected,setSelected]=useState<string>()
 if(!p)return null
 const event=activityEvents.find(e=>e.id===selected)
 return <article aria-label="Timeline Reconstruction"><h3>Recovered Activity Logs</h3><p>Source: TA-PH-ACTIVITY-01 · partial · origin and clock unverified. Device-local times; UTC offset and clock accuracy unavailable.</p>
 {activityEvents.map(e=><button className="opening-choice" key={e.id} onClick={()=>{act({type:'inspect',id:e.id});setSelected(e.id)}}>{e.time} · {e.kind} · {p.inspected.includes(e.id)?'inspected':'inspect'}</button>)}
 {event&&<section aria-label="Activity event details"><h4>{event.kind}</h4><p>Evidence ID: {event.id} · Source file: TA-PH-ACTIVITY-01</p><p>Original: {event.raw} · Display: 26 Oct 2026 {event.time} · Timezone: device local, offset unknown</p><p>Partial recovery · verification unverified</p><p>{event.text}</p><p>{event.uncertainty}</p>{event.id==='TA-PH-ACTIVITY-01-SYNC'&&<p>The partial sync receipt separately displays 20:02 UTC. The device offset and clock accuracy are unknown, so the two readings cannot establish a two-minute delay.</p>}<button className="opening-choice" disabled={p.order.includes(event.id)} onClick={()=>act({type:'add',id:event.id})}>ADD TO TIMELINE</button></section>}
 <h3>Timeline workspace</h3><p>Add inspected events, then order them using Move Up and Move Down. These controls work with keyboard and touch.</p>
 <ol>{p.order.map((id,i)=>{const e=activityEvents.find(item=>item.id===id)!;return <li key={id}>{e.time} · {e.kind} <button disabled={i===0||p.saved} onClick={()=>act({type:'move',id,direction:-1})} aria-label={`Move ${e.kind} up`}>Move Up</button> <button disabled={i===p.order.length-1||p.saved} onClick={()=>act({type:'move',id,direction:1})} aria-label={`Move ${e.kind} down`}>Move Down</button> <button onClick={()=>{act({type:'inspect',id});setSelected(id)}}>Inspect Source</button></li>})}</ol>
 {p.order.length===4&&!p.order.every((id,i)=>id===activityEvents[i].id)&&<p role="status">Recorded device times are not in order. Recheck the entries.</p>}
 <h3>Conflicts &amp; uncertainty</h3><p>The readable activity log contains no entries between 19:00 and 20:00 on 26 October. This is a gap in the recovered copy, not proof of deletion, a person's location, or when Daniel disappeared. The device clock has not been independently checked.</p>
 <button className="opening-choice" disabled={p.uncertainty||!p.inspected.includes(activityEvents[3].id)} onClick={()=>act({type:'uncertainty'})}>{p.uncertainty?'TIMESTAMP LIMITS REVIEWED':'REVIEW TIMESTAMP LIMITS'}</button>
 <button className="opening-choice" disabled={p.syncAcknowledged||!p.inspected.includes(activityEvents[3].id)} onClick={()=>act({type:'sync'})}>{p.syncAcknowledged?'AUTOMATIC SYNC ACKNOWLEDGED':'MARK SYNC AS AUTOMATIC'}</button>
 <button className="opening-choice" disabled={p.gapAcknowledged||!p.inspected.includes(activityEvents[2].id)||!p.inspected.includes(activityEvents[3].id)} onClick={()=>act({type:'gap'})}>{p.gapAcknowledged?'GAP MARKED UNRESOLVED':'MARK 19:00–20:00 UNRESOLVED'}</button>
 <h3>Earlier Messages &amp; Notes</h3><p>Earlier fragment timestamps remain unavailable. They are context, not evidence identifying the activity-log entries.</p>{masterFragments.map(f=><button className="opening-choice" key={f.id} onClick={()=>onSource(f.id)}>INSPECT SOURCE · {f.id}</button>)}
 {timelineReady(p)&&<section><h3>Evidence summary</h3><p>The four recorded device events can be ordered by their reported times. The 20:00 sync is automatic; no actor or location is established. The 19:00–20:00 interval remains unresolved. Sources: {activityEvents.map(e=>e.id).join(', ')}.</p><button className="opening-primary" disabled={p.saved} onClick={()=>act({type:'save'})}>{p.saved?'FINDING SAVED':'SAVE FINDING'}</button></section>}
 </article>
}
