import { useState } from 'react'
import { activityEvents, partialSyncReceipt } from '../content/masterScene06'
import { fragmentExamination, masterFragments } from '../content/masterScene05'
import { canDocumentMissingHour, compareTimelineRecords, timelineReady, type MasterScene06, type MasterScene06Action } from '../game/masterScene06'
import { useGameStore } from '../game/store'
import './master-timeline.css'

type TimelineProps = { onSource: (id: string) => void; onOpenBoard?: () => void }

function Reconstruction({ p, act, onSource, onOpenBoard }: TimelineProps & {p:MasterScene06;act:(action:MasterScene06Action)=>void}) {
 const seenFragments=useGameStore(s=>s.save.masterScene05?.read)
 const [selected,setSelected]=useState<string>()
 const [left,setLeft]=useState(p.comparison?.[0]??'')
 const [right,setRight]=useState(p.comparison?.[1]??'')
 const [hypothesis,setHypothesis]=useState(p.timelineHypothesis?.text??'')
 const events=activityEvents.filter(event=>p.inspected.includes(event.id))
 const candidates=[...events.map(event=>({id:event.id,title:event.kind,time:`${event.time} · device time`,text:event.text})),
  ...(events.some(event=>event.id==='TA-PH-ACTIVITY-01-SYNC')?[{...partialSyncReceipt,text:'The receipt records a time in UTC. Its relationship to the device clock remains unknown.'}]:[]),
  ...masterFragments.filter(fragment=>seenFragments?.includes(fragment.id)).map(fragment=>({id:fragment.id,title:fragmentExamination[fragment.id].title,time:'Timestamp unavailable',text:fragment.body}))]
 const compared=p.comparison?.map(id=>candidates.find(record=>record.id===id))
 const order=p.order.map(id=>activityEvents.find(event=>event.id===id)!)
 const timelineSourceTitle=(id:string)=>candidates.find(record=>record.id===id)?.title??id
 return <article className="trace-module trace-activity trace-reconstruction" aria-label="Timeline Reconstruction">
  <small>PARTIAL RECOVERY · DEVICE TIMES</small>
  <h1>Recovered Activity Logs</h1>
  <p>Open an event to see what TRACE recovered. The source and device clock remain unverified.</p>
  <ol className="trace-activity-list">{activityEvents.map(e=><li key={e.id}>
   <button className="trace-item" aria-expanded={selected===e.id} onClick={()=>{act({type:'inspect',id:e.id});setSelected(selected===e.id?undefined:e.id)}}><time>{e.time}</time><strong>{e.kind}</strong></button>
   {selected===e.id&&<section className="trace-summary" aria-label="Activity event details">
    <strong>{e.kind}</strong><p>{e.text}</p><p>{e.uncertainty}</p>
    {e.id==='TA-PH-ACTIVITY-01-SYNC'&&<p>A separate partial receipt displays 20:02 UTC. The offset and clock accuracy are unknown.</p>}
    <details><summary>Source metadata</summary><p>{e.id} · {e.raw} · device local, offset unknown</p></details>
    <div className="trace-timeline-controls">
     <button className="trace-action" disabled={p.order.includes(e.id)} onClick={()=>act({type:'add',id:e.id})}>Add to working timeline</button>
     <button className="trace-action" aria-pressed={!!p.timelineFlags?.includes(e.id)} onClick={()=>act({type:'flag-time',id:e.id})}>Flag for timing review</button>
    </div>
   </section>}
   {p.timelineFlags?.includes(e.id)&&<small className="trace-time-flag">Timing flagged for review</small>}
  </li>)}</ol>
  <section className="trace-summary" aria-label="Compare timeline records">
   <h2>Compare timestamps</h2><p>Select a device event and another source. Compare the entries that could bound an unexplained interval.</p>
   <div className="trace-time-sources">
    <label>First event<select value={left} onChange={e=>setLeft(e.target.value)}><option value="">Choose an opened event</option>{events.map(e=><option value={e.id} key={e.id}>{e.time} · {e.kind}</option>)}</select></label>
    <label>Comparison source<select value={right} onChange={e=>setRight(e.target.value)}><option value="">Choose a source</option>{candidates.map(e=><option value={e.id} key={e.id}>{e.title}</option>)}</select></label>
   </div>
   <button className="trace-action" disabled={!left||!right||left===right} onClick={()=>act({type:'compare-times',left,right})}>Compare records</button>
   {compared?.every(item=>!!item)&&p.comparison&&<div className="trace-time-result">
    <div className="trace-time-sources">{compared.map(item=><article key={item!.id}><h3>{item!.title}</h3><small>{item!.time}</small><p>{item!.text}</p></article>)}</div>
    <p role="status">{compareTimelineRecords(...p.comparison)}</p>
    <form onSubmit={e=>{e.preventDefault();act({type:'timeline-hypothesis',text:hypothesis})}}>
     <label>Provisional timeline hypothesis<textarea value={hypothesis} maxLength={2000} rows={3} onChange={e=>setHypothesis(e.target.value)} /></label>
     <button className="trace-action" type="submit" disabled={!hypothesis.trim()&&!p.timelineHypothesis}>Save working hypothesis</button>
    </form>
   </div>}
   {p.timelineHypothesis&&<p><strong>Saved private hypothesis</strong><br />{p.timelineHypothesis.text}<br /><small>{p.timelineHypothesis.sources.map(timelineSourceTitle).join(' + ')}</small></p>}
   <details><summary>Open earlier Messages and Notes</summary>{masterFragments.map(f=><button className="trace-action" key={f.id} onClick={()=>onSource(f.id)}>{fragmentExamination[f.id].title}</button>)}</details>
  </section>
  {canDocumentMissingHour(p)&&<section className="trace-summary" aria-label="Missing-hour finding">
   <h2>19:00–20:00 · Unresolved interval</h2>
   <p>No readable entry falls between the recorded file access and the automatic sync. This copy leaves the cause, the people present and Daniel's whereabouts unresolved.</p>
   <button className="trace-action" disabled={p.saved} onClick={()=>act({type:'save'})}>{p.saved?'FINDING SAVED':'SAVE FINDING'}</button>
   {p.saved&&onOpenBoard&&<><p>You can link this finding to its supporting records in the Investigation Board.</p><button className="trace-action" onClick={onOpenBoard}>Open Investigation Board</button></>}
  </section>}
  <section className="trace-summary" aria-label="Working timeline">
   <h2>Working timeline</h2>
   <p>Arrange events using the move buttons or drag them into order. The sequence is private.</p>
   {!order.length&&<p>Add any opened event to start.</p>}
   <ol className="trace-work-order">{order.map((event,index)=><li key={event.id} draggable onDragStart={e=>{e.dataTransfer.setData('text/plain',event.id);e.dataTransfer.effectAllowed='move'}} onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();act({type:'reorder',id:e.dataTransfer.getData('text/plain'),target:event.id})}}>
    <span>{event.time} · {event.kind}</span><div className="trace-timeline-controls">
     <button aria-label={`Move ${event.kind} up`} disabled={index===0} onClick={()=>act({type:'move',id:event.id,direction:-1})}>↑</button>
     <button aria-label={`Move ${event.kind} down`} disabled={index===order.length-1} onClick={()=>act({type:'move',id:event.id,direction:1})}>↓</button>
    </div>
   </li>)}</ol>
   {order.some((event,index)=>index>0&&order[index-1].time>event.time)&&<p role="status">The working order differs from the reported device times.</p>}
  </section>
 </article>
}

export function MasterTimeline({onSource,onOpenBoard}:TimelineProps){
 const p=useGameStore(s=>s.save.masterScene06),act=useGameStore(s=>s.masterScene06Action)
 const [selected,setSelected]=useState<string>()
 if(!p)return null
 const event=activityEvents.find(e=>e.id===selected)
 if(p.revision==='investigation')return <Reconstruction p={p} act={act} onSource={onSource} onOpenBoard={onOpenBoard}/>
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
