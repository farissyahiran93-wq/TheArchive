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
  {p.scriptVersion==='ch1-s5-s6-v3'&&!p.pending&&!p.activeTopic&&!p.missingHourAvailable&&!p.complete&&<div className="opening-actions"><label>What caught your attention? <select aria-label="Choose a discussion" defaultValue="" onChange={event=>{const topic=event.target.value as 'maya'|'sophie'|'lucas'|'june';if(topic)act({type:'topic',topic})}}><option value="">Choose a topic...</option>{([['maya',"Maya's Dinner"],['sophie',"Sophie's Messages"],['lucas',"Lucas's Conversation"],['june',"Daniel's Notes"]] as const).filter(([id])=>!p.completedTopics?.includes(id)).map(([id,label])=><option value={id} key={id}>{label}</option>)}</select></label></div>}
  {canReply&&beat&&<div className="opening-actions"><div className="opening-action-heading">Choose a reply</div><div className="scene01-options">{beat.choices.map((c,i)=><button key={c} className={`opening-choice ${p.draft===i?'selected':''}`} aria-pressed={p.draft===i} onClick={()=>act({type:'draft',index:i})}>{c}</button>)}</div><button className="opening-primary" disabled={p.draft===undefined} onClick={()=>act({type:'send'})}>Send</button></div>}
  {p.scriptVersion!=='ch1-s5-s6-v3'&&(p.beat===8||p.revision==='investigation'&&p.messages.length>0)&&!p.saved&&<p>Open TRACE when you are ready to look at the activity timeline.</p>}
 </>
}
