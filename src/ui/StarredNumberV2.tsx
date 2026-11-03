import { ArrowLeft } from 'lucide-react'
import { fictionalPlayerNumber, starredConclusions, starredFollowups, starredQuestions, starredRequest } from '../content/starredNumberV2'
import { useGameStore } from '../game/store'
import { usePacedSceneLines } from './usePacedSceneLines'
import './version-history.css'

const fields = [
  { id:'label', title:'Export label', detail:'Saved copy labelled as Daniel’s contact export. Its creator and source device are unverified.' },
  { id:'number', title:'Contact entry', detail:`${fictionalPlayerNumber} appears without a saved name. This is the player's fictional in-game contact number.` },
  { id:'star', title:'Star marker', detail:'A star appears on the entry. The copy does not identify who added it.' },
  { id:'limits', title:'What this cannot prove', detail:'The entry does not establish that Daniel selected the number or knew the player.' },
] as const

export function StarredNumberV2({onHome}:{onHome:()=>void}) {
  const save=useGameStore(s=>s.save),act=useGameStore(s=>s.starredNumberAction),next=useGameStore(s=>s.lastCheckInAction),p=save.chapter1!.starredNumberV2!
  const paced=usePacedSceneLines(p.lines,7)
  const options=p.phase==='request'?starredRequest:p.phase==='questions'&&!p.mainChoice?starredQuestions:[]
  return <section className="c1-app version-history" aria-label="The Starred Number" data-chapter1-scene="7"><header className="opening-chat-header"><button className="icon-button bare" aria-label="Back to phone" onClick={onHome}><ArrowLeft size={21}/></button><div><strong>THE STARRED NUMBER</strong><small>CHAPTER 1 · SCENE 07</small></div></header><div className="c1-scroll">
    <h1>THE STARRED NUMBER</h1>
    <p>Sophie · private conversation</p>
    {paced.visible.map(l=><p className={`opening-bubble ${l.sender==='player'?'player':'sophie'}`} key={l.id}><small>{l.sender==='player'?'You':l.sender==='maya'?'Maya':'Sophie'}</small><br/>{l.text}</p>)}
    {(p.phase==='opening'||paced.typing)&&<p role="status">Sophie is typing…</p>}
    {options.length>0&&<><div className="vh-options" role="group" aria-label="Reply to Sophie">{options.map(o=><button key={o.id} className={`opening-choice ${p.draft===o.id?'selected':''}`} aria-pressed={p.draft===o.id} onClick={()=>act({type:'draft',id:o.id})}>{o.text}</button>)}</div><button className="opening-primary" disabled={!options.some(o=>o.id===p.draft)} onClick={()=>act({type:'send'})}>Send</button></>}
    {(p.phase==='inspect'||p.phase==='questions'||p.phase==='conclusion'||p.complete)&&<article aria-label="Saved contact export"><h2>Saved contact export</h2><p>Source: Sophie’s saved copy · Provenance unverified</p>{fields.map(f=><div key={f.id}><button className="opening-choice" onClick={()=>act({type:'inspect',field:f.id})} disabled={p.phase!=='inspect'}>{f.title}{p.inspected.includes(f.id)?' · examined':''}</button>{p.inspected.includes(f.id)&&<p>{f.detail}</p>}</div>)}</article>}
    {p.phase==='questions'&&p.mainChoice&&<><h2>Ask Sophie more</h2>{starredFollowups.filter(x=>!p.followups.includes(x.id)).map(o=><button key={o.id} className={`opening-choice ${p.draft===o.id?'selected':''}`} onClick={()=>act({type:'draft',id:o.id})}>{o.text}</button>)}<button className="opening-primary" disabled={!starredFollowups.some(o=>o.id===p.draft&&!p.followups.includes(o.id))} onClick={()=>act({type:'send'})}>Send question</button>{save.prologue?.scene01?.groupMembers?.maya&&<><h2>Optional group check</h2><p>Only the observed entry and its uncertainty will be shared with Maya and Sophie.</p><button className="opening-choice" disabled={p.groupSent} onClick={()=>act({type:'draft',id:'group'})}>{p.groupSent?'Shared with Find Daniel':'Select group message'}</button><button className="opening-primary" disabled={p.draft!=='group'||p.groupSent} onClick={()=>act({type:'group-send'})}>Send to group</button></>}<button className="opening-choice" onClick={()=>act({type:'conclude'})}>Record a private conclusion</button></>}
    {p.phase==='conclusion'&&<><h2>Private conclusion</h2><p>This note stays with the player.</p>{starredConclusions.map(o=><button key={o.id} className={`opening-choice ${p.draft===o.id?'selected':''}`} onClick={()=>act({type:'draft',id:o.id})}>{o.text}</button>)}<button className="opening-primary" disabled={!starredConclusions.some(o=>o.id===p.draft)} onClick={()=>act({type:'conclude'})}>Save privately</button></>}
    {p.complete&&<><h2>Scene 07 complete</h2><p>Next lead: Scene 08 — The Last Check-In.</p><button className="opening-primary" onClick={()=>next({type:'enter'})}>Open The Last Check-In</button></>}
    {p.feedback&&<p role="status">{p.feedback}</p>}
  </div></section>
}
