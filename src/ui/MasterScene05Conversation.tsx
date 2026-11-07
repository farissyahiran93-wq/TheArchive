import { MasterScene06Conversation } from './MasterScene06Conversation'
import { masterScene05Beats } from '../content/masterScene05'
import { useGameStore } from '../game/store'

export function MasterScene05Conversation() {
  const p=useGameStore(s=>s.save.masterScene05), six=useGameStore(s=>s.save.masterScene06), act=useGameStore(s=>s.masterScene05Action)
  if(!p)return <button className="opening-primary" onClick={()=>act({type:'start'})}>START SCENE 5</button>
  const beat=masterScene05Beats[p.beat]
  const canReply=p.beat<8&&p.packageStatus==='conversation'||p.beat>=8&&p.beat<10&&p.recovered&&p.read.length===4&&p.saved.length>0
  return <>
    {p.messages.map(m=><div key={m.id} className={`conversation-line ${m.sender==='player'?'outgoing':'incoming'}`}><div className="conversation-body"><div className={`opening-bubble ${m.sender==='player'?'player':'sophie'}`}>{m.text}</div></div></div>)}
    {p.beat>=8&&p.packageStatus!=='installed'&&<article className="scene01-invitation" aria-label="TRACE package offer"><strong>TRACE.pkg</strong><p>Fictional in-game package · developer claim unverified · {p.packageStatus}</p><button className="opening-choice" onClick={()=>act({type:'inspect'})}>INSPECT PACKAGE</button>{p.inspected&&<><p>TRACE — Digital Evidence Analyzer. Local copy of the selected archive; original preserved as a claim, not independently verified.</p><button className="opening-choice" onClick={()=>act({type:'risks'})}>REVIEW CAPABILITIES AND RISKS</button></>}{p.risksRead&&<p>Access: selected archive and local results. No contacts or location requested. Source and safety are unverified; archive content may be incomplete or altered.</p>}{p.packageStatus==='offered'&&<><button className="opening-primary" disabled={!p.inspected||!p.risksRead} onClick={()=>act({type:'install'})}>INSTALL TRACE</button><button className="opening-choice" onClick={()=>act({type:'defer'})}>NOT NOW</button><button className="opening-choice" onClick={()=>act({type:'decline'})}>DECLINE TRACE</button></>}{['deferred','declined'].includes(p.packageStatus)&&<button className="opening-choice" onClick={()=>act({type:'reconsider'})}>RECONSIDER TRACE</button>}</article>}
    {p.packageStatus==='installed'&&!p.recovered&&<p>TRACE is installed. Open it from Home and choose when to begin recovery.</p>}
    {p.recovered&&!canReply&&!p.complete&&<p>Open all four recovered fragments and save a finding before returning.</p>}
    {canReply&&beat&&<div className="opening-actions"><div className="opening-action-heading">Choose a reply</div><div className="scene01-options">{beat.choices.map((choice,i)=><button key={choice} className={`opening-choice ${p.draft===i?'selected':''}`} aria-pressed={p.draft===i} onClick={()=>act({type:'draft',index:i})}>{choice}</button>)}</div><button className="opening-primary" disabled={p.draft===undefined} onClick={()=>act({type:'send'})}>Send</button></div>}
    {p.complete&&<>{!six&&<p role="status">Scene 5 complete · Scene 6 unlocked for manual entry · Recovery 12%</p>}<MasterScene06Conversation/></>}
  </>
}
