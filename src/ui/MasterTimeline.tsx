import { useState } from 'react'
import { activityEvents } from '../content/masterScene06'
import { useGameStore } from '../game/store'
import './master-timeline.css'

type TimelineProps = { onSource: (id: string) => void; onOpenBoard?: () => void }
const descriptions = ["A note was changed on the device. The record doesn't tell us who changed it.", "Message activity was recorded. The original message may not have survived.", "A file was opened. We don't know who was using the phone.", "The phone performed an automatic backup. That can happen without anyone touching it."]
export function MasterTimeline(_props: TimelineProps){
 const p=useGameStore(s=>s.save.masterScene06),act=useGameStore(s=>s.masterScene06Action)
 const [selected,setSelected]=useState<string>()
 const [gap,setGap]=useState(false)
 if(!p)return null
 return <article className="trace-module trace-activity" aria-label="Daniel's last activity">
  <small>ACTIVITY LOGS · 20% RECOVERED</small><h1>Daniel's Last Activity</h1><p>Some records are missing.</p>
  <ol className="trace-activity-list">{activityEvents.map((event,index)=><li key={event.id}>
   {index===3&&<section className="trace-summary"><button className="trace-item" aria-expanded={gap} onClick={()=>setGap(!gap)}> ? · WHAT HAPPENED NEXT?</button>{gap&&<><h2>Something is missing.</h2><p>We don't have enough records to explain what happened during this time.</p><button className="trace-action" onClick={()=>act({type:'inspect-gap'})}>{p.saved?'Ready to discuss with Unknown':'ASK UNKNOWN ABOUT THIS'}</button></>}</section>}
   <button className="trace-item" aria-expanded={selected===event.id} onClick={()=>{act({type:'inspect',id:event.id});setSelected(selected===event.id?undefined:event.id)}}><time>{event.time}</time><strong>{event.kind}</strong></button>
   {selected===event.id&&<section className="trace-summary"><p>{descriptions[index]}</p><details><summary>Source metadata</summary><p>{event.id} · {event.raw} · device local, offset unknown</p></details></section>}
  </li>)}</ol>
 </article>
}
