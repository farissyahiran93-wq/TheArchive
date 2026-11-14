import { useGameStore } from '../game/store'
import { canReplyInMasterScene06, masterScene06Beat } from '../game/masterScene06'
import { UnknownTypingBubble } from './UnknownTypingBubble'
export function MasterScene06Conversation(){
 const p=useGameStore(s=>s.save.masterScene06), act=useGameStore(s=>s.masterScene06Action)
 if(!p)return null
 const beat=masterScene06Beat(p), canReply=canReplyInMasterScene06(p)
 return <>
  {p.messages.map(m=><div key={m.id} className={`conversation-line ${m.sender==='player'?'outgoing':'incoming'}`}><div className="conversation-body"><div className={`opening-bubble ${m.sender==='player'?'player':'sophie'}`}>{m.text}</div></div></div>)}
  {p.pending&&<UnknownTypingBubble/>}
  {canReply&&beat&&<div className="opening-actions"><div className="opening-action-heading">Choose a reply</div><div className="scene01-options">{beat.choices.map((c,i)=><button key={c} className={`opening-choice ${p.draft===i?'selected':''}`} aria-pressed={p.draft===i} onClick={()=>act({type:'draft',index:i})}>{c}</button>)}</div><button className="opening-primary" disabled={p.draft===undefined} onClick={()=>act({type:'send'})}>Send</button></div>}
  {(p.beat===8||p.revision==='investigation'&&p.messages.length>0)&&!p.saved&&<p>Open TRACE when you want to compare the activity records. Your work stays private.</p>}
 </>
}
