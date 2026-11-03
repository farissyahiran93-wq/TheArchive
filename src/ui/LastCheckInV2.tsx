import { ArrowLeft } from 'lucide-react'
import { capturedExchange, lastCheckInChoices, lastCheckInConclusions, lastCheckInQuestions } from '../content/lastCheckInV2'
import { useGameStore } from '../game/store'
import { usePacedSceneLines } from './usePacedSceneLines'
import './version-history.css'

const checks=[
  {id:'capture',title:'Open preserved capture',detail:'A text capture received from Lucas. The original image pixels are unavailable; this view preserves only the supplied exchange.'},
  {id:'date',title:'Check displayed date',detail:'No independently verified timestamp is available in this capture.'},
  {id:'provenance',title:'Check source',detail:'Lucas says the capture came from his conversation with Daniel. The source device and original chat export are unavailable.'},
  {id:'completeness',title:'Check context',detail:'The excerpt may omit earlier or later messages. The full thread is not held.'},
  {id:'authenticity',title:'Check sender',detail:'The displayed Daniel contact name does not authenticate the sender or prove the screenshot was unaltered.'},
] as const
export function LastCheckInV2({onHome}:{onHome:()=>void}) {
  const save=useGameStore(s=>s.save),act=useGameStore(s=>s.lastCheckInAction),next=useGameStore(s=>s.secondaryCardAction),p=save.chapter1!.lastCheckInV2!
  const paced=usePacedSceneLines(p.lines,8)
  return <section className="c1-app version-history" aria-label="The Last Check-In" data-chapter1-scene="8"><header className="opening-chat-header"><button className="icon-button bare" aria-label="Back to phone" onClick={onHome}><ArrowLeft size={21}/></button><div><strong>THE LAST CHECK-IN</strong><small>CHAPTER 1 · SCENE 08</small></div></header><div className="c1-scroll"><h1>THE LAST CHECK-IN</h1><p>{p.route==='maya'?'Maya · mediated contact':'Lucas · private conversation'}</p>
    {paced.visible.map(l=><p className={`opening-bubble ${l.sender==='player'?'player':'sophie'}`} key={l.id}><small>{l.sender==='player'?'You':l.sender==='maya'?'Maya':'Lucas'}</small><br/>{l.text}</p>)}
    {(p.phase==='opening'||paced.typing)&&<p role="status">{p.route==='maya'?'Maya':'Lucas'} is typing…</p>}
    {p.phase==='choice'&&<><h2>Reply</h2>{lastCheckInChoices.map(o=><button className={`opening-choice ${p.draft===o.id?'selected':''}`} key={o.id} onClick={()=>act({type:'draft',id:o.id})}>{o.text}</button>)}<button className="opening-primary" disabled={!lastCheckInChoices.some(o=>o.id===p.draft)} onClick={()=>act({type:'send'})}>Send</button></>}
    {['inspect','questions','conclusion','complete'].includes(p.phase)&&<article aria-label="Preserved message capture"><h2>Lucas’s preserved exchange</h2><p>Received capture · original image unavailable</p>{checks.map(x=><div key={x.id}><button className="opening-choice" disabled={p.phase!=='inspect'} onClick={()=>act({type:'inspect',field:x.id})}>{x.title}{p.inspected.includes(x.id)?' · examined':''}</button>{p.inspected.includes(x.id)&&<p>{x.detail}</p>}</div>)}{p.inspected.includes('capture')&&<blockquote>{capturedExchange.map((x,i)=><p key={i}><strong>{x.sender}:</strong> {x.text}</p>)}</blockquote>}</article>}
    {p.phase==='questions'&&<><h2>Discuss the capture</h2>{lastCheckInQuestions.filter(x=>!p.questions.includes(x.id)).map(o=><button className={`opening-choice ${p.draft===o.id?'selected':''}`} key={o.id} onClick={()=>act({type:'draft',id:o.id})}>{o.text}</button>)}<button className="opening-primary" disabled={!lastCheckInQuestions.some(o=>o.id===p.draft&&!p.questions.includes(o.id))} onClick={()=>act({type:'send'})}>Send question</button><button className="opening-choice" onClick={()=>act({type:'conclude'})}>Record a private conclusion</button></>}
    {p.phase==='conclusion'&&<><h2>Private conclusion</h2>{lastCheckInConclusions.map(o=><button className={`opening-choice ${p.draft===o.id?'selected':''}`} key={o.id} onClick={()=>act({type:'draft',id:o.id})}>{o.text}</button>)}<button className="opening-primary" disabled={!lastCheckInConclusions.some(o=>o.id===p.draft)} onClick={()=>act({type:'conclude'})}>Save privately</button></>}
    {p.complete&&<><h2>Scene 08 complete</h2><p>Next lead: Scene 09 — The Secondary Card.</p><button className="opening-primary" onClick={()=>next({type:'enter'})}>Open The Secondary Card</button></>}
  </div></section>
}
