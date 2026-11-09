import { reportChoices } from '../content/masterScene06'
import { useGameStore } from '../game/store'
import { canReplyInMasterScene06, masterScene06Beat } from '../game/masterScene06'
import { UnknownTypingBubble } from './UnknownTypingBubble'
export function MasterScene06Conversation(){
 const p=useGameStore(s=>s.save.masterScene06), act=useGameStore(s=>s.masterScene06Action)
 if(!p)return <button className="opening-primary" onClick={()=>act({type:'start'})}>START SCENE 6</button>
 const beat=masterScene06Beat(p), canReply=canReplyInMasterScene06(p)
 return <>
  {p.messages.map(m=><div key={m.id} className={`conversation-line ${m.sender==='player'?'outgoing':'incoming'}`}><div className="conversation-body"><div className={`opening-bubble ${m.sender==='player'?'player':'sophie'}`}>{m.text}</div></div></div>)}
  {p.pending&&<UnknownTypingBubble/>}
  {canReply&&beat&&<div className="opening-actions"><div className="opening-action-heading">Choose a reply</div><div className="scene01-options">{beat.choices.map((c,i)=><button key={c} className={`opening-choice ${p.draft===i?'selected':''}`} aria-pressed={p.draft===i} onClick={()=>act({type:'draft',index:i})}>{c}</button>)}</div><button className="opening-primary" disabled={p.draft===undefined} onClick={()=>act({type:'send'})}>Send</button></div>}
  {(p.beat===8||p.revision==='investigation'&&p.messages.length>0)&&!p.saved&&<p>Open TRACE when you want to compare the activity records. Your work stays private.</p>}
  {p.revision!=='investigation'&&p.saved&&!p.reportSent&&<article className="scene01-invitation" aria-label="Findings report"><h3>Choose a report to Unknown</h3>{reportChoices.map((c,i)=><button className="opening-choice" key={c} aria-pressed={p.reportDraft===i} onClick={()=>act({type:'report-draft',index:i})}>{c}</button>)}<button className="opening-choice" disabled={p.reportDraft===undefined} onClick={()=>act({type:'review-report'})}>REVIEW REPORT</button>{p.reportReviewed&&p.reportDraft!==undefined&&<><p>To: Unknown</p><blockquote>{reportChoices[p.reportDraft]}</blockquote><button className="opening-primary" onClick={()=>act({type:'send-report'})}>SEND REPORT</button></>}</article>}
  {p.complete&&<p role="status">Scene 6 complete · Scene 7 unlocked for manual entry · Recovery 20%</p>}
 </>
}
