import { disclosureTopics, type DisclosureTopic } from '../content/mayaConversationV3'
import { useGameStore } from '../game/store'
import { PrivateChatTimeline } from './PrivateChatTimeline'

/** Optional and recipient-scoped. Only the exact text confirmed by Send enters this thread. */
export function MasterCardDisclosure() {
 const save=useGameStore(s=>s.save), act=useGameStore(s=>s.masterScene09Action)
 const nine=save.masterScene09
 if(!nine?.complete||nine.conversationRevision!=='conversation-v3')return null
 const d=nine.disclosure
 if(!d)return <div className="opening-actions"><span className="opening-action-heading">Share a clue · Choose recipient</span><button className="opening-choice" onClick={()=>act({type:'recipient'})}>Unknown Sender</button></div>
 const topic=d.topic?disclosureTopics[d.topic]:undefined
 const followup=topic?.followups[d.step-1]
 return <>
  <PrivateChatTimeline character="unknown" lines={d.messages} typing={!!d.pending?.length}/>
  {!d.pending?.length&&(!d.step||followup)&&<div className="opening-actions">
   <div className="opening-action-heading">{d.step?'Choose a reply':'Choose a clue for Unknown Sender'}</div>
   <div className="scene01-options">{!d.step?(Object.keys(disclosureTopics) as DisclosureTopic[]).filter(id=>id==='copy'?save.masterScene08?.opened:nine.received).map(id=><button className={'opening-choice '+(d.topic===id?'selected':'')} key={id} aria-pressed={d.topic===id} onClick={()=>act({type:'select-clue',topic:id})}>{disclosureTopics[id].text}</button>):<button className={'opening-choice '+(d.selected?'selected':'')} aria-pressed={!!d.selected} onClick={()=>act({type:'select-followup'})}>{followup}</button>}</div>
   <button className="opening-primary" disabled={!d.selected} onClick={()=>act({type:'send-disclosure'})}>Send</button>
  </div>}
 </>
}
