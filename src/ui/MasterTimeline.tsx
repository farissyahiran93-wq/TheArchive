import { useState } from 'react'
import { activityEvents } from '../content/masterScene06'
import { useGameStore } from '../game/store'
import { useCaseNavigation } from './CaseNavigation'
import './master-timeline.css'

type TimelineProps = { onSource: (id: string) => void; onOpenBoard?: () => void }
const descriptions = ["A note was changed on the device. The record doesn't tell us who changed it.", "Message activity was recorded. The original message may not have survived.", "A file was opened. We don't know who was using the phone.", "The phone performed an automatic backup. That can happen without anyone touching it."]
export function MasterTimeline(_props: TimelineProps){
 const p=useGameStore(s=>s.save.masterScene06),act=useGameStore(s=>s.masterScene06Action)
 const [selected,setSelected]=useState<string>()
 const {openCharacter}=useCaseNavigation()
 return <article className="trace-module trace-activity" aria-label="Daniel's last activity">
  <small>ACTIVITY LOGS · 20% RECOVERED</small><h1>Daniel's Last Activity</h1><p>Partial device records. Times have not been independently verified.</p>
  <ol className="trace-activity-list">{activityEvents.map((event,index)=><li key={event.id}>
   {index===3&&<section className="trace-summary trace-gap"><h2>Activity unavailable · {activityEvents[2].time}–{activityEvents[3].time}</h2><p>No usable activity records were recovered for this interval. This does not establish whether the phone was active or who was using it.</p>{p&&(p.scriptVersion==='ch1-s5-s6-v3'?p.missingHourAvailable&&!p.activeTopic:p.beat===8)&&!p.pending&&p.draft===undefined&&!p.complete&&<button className="trace-action" onClick={()=>{act({type:'inspect-gap'});openCharacter('unknown')}}>DISCUSS WITH UNKNOWN</button>}</section>}
   <button className="trace-item" aria-expanded={selected===event.id} onClick={()=>{if(p?.recovered)act({type:'inspect',id:event.id});setSelected(selected===event.id?undefined:event.id)}}><time>{event.time}</time><strong>{event.kind}</strong></button>
   {selected===event.id&&<section className="trace-summary"><p>{descriptions[index]}</p><details><summary>Source metadata</summary><p>{event.id} · {event.raw} · device local, offset unknown</p></details></section>}
  </li>)}</ol>
 </article>
}
