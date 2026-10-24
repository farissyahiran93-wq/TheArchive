import { PublicStoryArchive } from './PublicStory'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ArrowLeft, Send } from 'lucide-react'
import { chapter1ScenePlan } from '../content/chapter1Plan'
import { chapter1Record, chapter1Replies } from '../content/chapter1Investigation'
import { chapter1Available, chapter1Current, chapter1Gate, chapter1Lifecycle, chapter1OptionsFor } from '../game/chapter1'
import { useGameStore } from '../game/store'
import { CharacterAvatar } from './CharacterAvatar'
import { ChatProfile } from './ChatProfile'
import { chatGroup } from './chatGrouping'
import './chapter1.css'
import { useCaseNavigation } from './CaseNavigation'

export function Chapter1Composer({choiceKey}:{choiceKey:string}) {
  const save=useGameStore(s=>s.save),act=useGameStore(s=>s.chapter1Action)
  const options=chapter1OptionsFor(save,choiceKey),draft=save.chapter1?.drafts[choiceKey]
  if(!options.length)return null
  return <div className="c1-composer" aria-label="Choose a message"><div className="scene01-options">{options.map(o=><button className={`opening-choice ${draft===o.id?'selected':''}`} aria-pressed={draft===o.id} key={o.id} onClick={()=>act({type:'draft',key:choiceKey,id:o.id})}>{o.text}</button>)}</div><button className="opening-primary" disabled={!options.some(o=>o.id===draft)} onClick={()=>act({type:'send',key:choiceKey})}>{(choiceKey==='sender'&&draft==='ignore'||choiceKey==='sender04'&&draft==='ignored')?'Leave unanswered':choiceKey==='eli'&&draft==='decline'?'Read guidance without sharing':<><Send size={16}/> Send</>}</button></div>
}

export function Chapter1ContactChat({thread,onBack}:{thread:'unknown'|'nora'|'eli'|'maya'|'lucas';onBack:()=>void}) {
  const save=useGameStore(s=>s.save),act=useGameStore(s=>s.chapter1Action)
  const navigation=useCaseNavigation()
  const n=chapter1Current(save),c=save.chapter1
  const unknown=thread==='unknown'
  const lines=unknown?c?.sender.messages??[]:save.messages.filter(m=>m.id.startsWith('CH1-')&&(m.sender===thread||m.recipient===thread))
  const final=!!save.prologue?.scene01?.scriptRevision
  const name=unknown?(final?'Unknown Number':'Unknown Sender'):thread[0].toUpperCase()+thread.slice(1)
  const scroll=useRef<HTMLDivElement>(null),near=useRef(true)
  const [behind,setBehind]=useState(false)
  const typing=save.pendingEvents.some(e=>e.id.startsWith('CH1-')&&chapter1Replies[e.id]?.actor===thread)
  useLayoutEffect(()=>{if(near.current&&scroll.current)scroll.current.scrollTop=scroll.current.scrollHeight;else setBehind(true)},[lines.length,typing])
  useEffect(()=>{if(near.current)act({type:'read-contact',id:thread});if(unknown&&final)act({type:'read-sender'})},[act,thread,lines.length,unknown,final])
  const key=unknown?'sender':thread==='nora'&&n===8?'page':n===16?'original':thread
  return <section className="opening-screen opening-v4 scene01-chat c1-contact" aria-label={`${name} Chapter 1 conversation`}>
    <header className="opening-chat-header"><button className="icon-button bare" aria-label="Back from conversation" onClick={onBack}><ArrowLeft size={21}/></button><CharacterAvatar character={thread} fallback="?" className="opening-avatar"/><div><strong>{name}</strong><small>{unknown?'Identity unverified':typing?'Online':'Offline'}</small></div><ChatProfile contact={thread}/></header>
    <div className="opening-thread" ref={scroll} onScroll={e=>{const el=e.currentTarget;near.current=el.scrollHeight-el.scrollTop-el.clientHeight<80;if(near.current)setBehind(false)}}>
      {!final&&<p className="c1-preview">Narrative preview · bridge dialogue</p>}
      {lines.map((line,i)=><div key={line.id} className={`conversation-line ${line.sender==='player'?'outgoing':'incoming'} ${chatGroup(lines,i).className}`}>{line.sender!=='player'&&chatGroup(lines,i).last&&<span className="chat-contact-avatar"><CharacterAvatar character={thread} fallback="?" className="message-avatar"/></span>}<div className="conversation-body"><div className={`opening-bubble ${line.sender==='player'?'player':'sophie'}`}>{line.text}</div></div></div>)}
      {typing&&<div className="opening-v4-typing" role="status" aria-label={`${name} is typing`}><CharacterAvatar character={thread} className="message-avatar"/><span className="typing-dots"><i/><i/><i/></span></div>}
      {unknown&&!final&&!c?.sender.seen&&<button className="opening-choice" onClick={()=>act({type:'read-sender'})}>Read warning and show responses</button>}
      {unknown&&c?.sender.branch==='ignore'&&<p className="presence-event">Left unanswered.</p>}
    </div>
    {behind&&<button className="opening-jump" onClick={()=>{near.current=true;setBehind(false);if(scroll.current)scroll.current.scrollTop=scroll.current.scrollHeight}}>Jump to latest</button>}
    {unknown&&final&&<div className="opening-actions"><button className="chat-group-action" onClick={()=>navigation.openGroup()}>BACK TO FIND DANIEL</button>{!c?.sender.blocked?<button className="opening-choice" onClick={()=>act({type:'block-sender'})}>BLOCK NUMBER</button>:<p className="presence-event">Number blocked.</p>}</div>}
    {unknown&&c?.publicStory?.flags.includes('sender-hint')?<><Chapter1Composer choiceKey="sender04"/>{!c.sender.branch&&<details><summary>Reply to the first message</summary><Chapter1Composer choiceKey="sender"/></details>}</>:<Chapter1Composer choiceKey={key}/>} 
  </section>
}

function Interpretation({kind,options}:{kind:string;options:readonly [string,string][]}){
  const save=useGameStore(s=>s.save),act=useGameStore(s=>s.chapter1Action),id=save.chapter1?.drafts['interpret:'+kind]??''
  const [error,setError]=useState('')
  return <div className="c1-choice-block"><label>Choose your interpretation<select aria-label={`Interpret ${kind}`} value={id} onChange={e=>{setError('');act({type:'choice-draft',key:kind,id:e.target.value})}}><option value="">Choose…</option>{options.map(([value,text])=><option key={value} value={value}>{text}</option>)}</select></label><button className="opening-choice" disabled={!id} onClick={()=>{if(kind==='index'&&id!=='14-13'||kind==='claim'&&id!=='unverified')setError('Recheck the displayed source and what it actually supports. You can try again.');act({type:'interpret',key:kind,id})}}>Record interpretation</button>{error&&<p role="status">{error}</p>}</div>
}

export function Chapter1Investigation({onHome}:{onHome:()=>void}) {
  const save=useGameStore(s=>s.save),act=useGameStore(s=>s.chapter1Action),continueChapter2=useGameStore(s=>s.continueChapter2)
  const [contact,setContact]=useState<'nora'|'eli'|'maya'|'lucas'|null>(null)
  const c=save.chapter1,n=chapter1Current(save),plan=chapter1ScenePlan[n-1]
  const available=chapter1Available(save),gates=chapter1Gate(save)
  const record=c?.panel==='record'&&c.record?available.find(r=>r.id===c.record):undefined
  const has=(id:string)=>c?.flags.includes(id)
  if(c?.publicStory&&!c.completed.includes(4))return <PublicStoryArchive onHome={onHome}/>
  if(contact)return <Chapter1ContactChat thread={contact} onBack={()=>setContact(null)}/>
  const step=(id:string)=>act({type:'step',id})
  const card=(id:string)=>{const r=chapter1Record(id);return r&&available.some(x=>x.id===id)?<button key={id} className="c1-record-link" onClick={()=>act({type:'inspect',id})}><strong>{r.title}</strong><small>{r.kind} · {c?.inspected.includes(id)?'Inspected':'Not inspected'}</small></button>:null}
  return <section className="c1-app" aria-label="Chapter 1 investigation" data-chapter1-scene={n}>
    <header className="opening-chat-header"><button className="icon-button bare" aria-label={c?.panel&&c.panel!=='hub'?'Back to investigation':'Back to home'} onClick={()=>c?.panel&&c.panel!=='hub'?act({type:'panel',panel:'hub'}):onHome()}><ArrowLeft size={21}/></button><div><strong>THE ARCHIVE</strong><small>{chapter1Lifecycle(save).replaceAll('_',' ').toUpperCase()}</small></div></header>
    <div className="c1-scroll">
      {n<4?<><h2>Investigation dormant</h2><p>No investigation records are available yet. Messages, calls and contacts remain available on your phone.</p><button className="opening-choice" onClick={onHome}>Return to phone</button></>:record?<article aria-label="Investigation record"><small>{record.kind.toUpperCase()} · VERIFIED: NO</small><h2>{record.title}</h2><pre>{record.body}</pre><details><summary>Source and limitations</summary><dl><dt>Source</dt><dd>{record.source}</dd><dt>Date</dt><dd>{record.date}</dd><dt>Confidence</dt><dd>{record.confidence}</dd><dt>Provenance</dt><dd>{record.provenance}</dd></dl></details><button className="opening-choice" disabled={!!save.evidence[record.id]} onClick={()=>act({type:'save-record',id:record.id})}>{save.evidence[record.id]?'Saved with limitations':'Save source with limitations'}</button></article>:<>
      <p className="c1-preview">Chapter 1 · structural preview · dialogue awaiting full authoring</p>
      {c?.chapterComplete?<><h1>CHAPTER 1 COMPLETE</h1><h2>THE MISSING ENTRY</h2><p>The records differ. Their sources, actor and relationship to Daniel’s disappearance remain unresolved.</p><h3>CHAPTER 2 — THE PEOPLE HE LEFT BEHIND</h3><button className="opening-primary" onClick={continueChapter2}>Continue to Chapter 2</button></>:<><small>ACT {plan.act} · SCENE {String(n).padStart(2,'0')}</small><h2>{plan.title}</h2>
      {n===4&&<><p>Follow the public report before examining any recovered layer.</p>{card('CH1-PUBLIC')}<button className="opening-choice" disabled={!c?.inspected.includes('CH1-PUBLIC')} onClick={()=>step('first-record')}>Activate recovered reference</button>{card('CH1-FIRST')}</>}
      {n===5&&<>{card('CH1-OLDER')}<button className="opening-choice" onClick={()=>act({type:'panel',panel:'compare'})}>Open version comparison</button>{c?.panel==='compare'&&<div className="c1-diff" aria-label="Version comparison"><article><h3>Current linked section</h3><pre>{chapter1Record('CH1-PUBLIC')!.body}</pre></article><article><h3>Earlier recovered section</h3><pre>{chapter1Record('CH1-OLDER')!.body}</pre></article><p>Visible change: <del>Escort: JUNE ELLIS</del> → <ins>Escort: —</ins>. Source and reason remain unverified.</p><button className="opening-choice" onClick={()=>step('comparison-saved')}>Inspect and save comparison</button></div>}</>}
      {n===6&&<><p>The linked record section differs. Examine the field in context before choosing a hypothesis.</p><button className="opening-choice" onClick={()=>step('field-context')}>Examine changed Escort field</button>{has('field-context')&&<><pre>Earlier: Escort: JUNE ELLIS{'\n'}Current: Escort: —{'\n'}Neither view authenticates the original or identifies an editor.</pre><Interpretation kind="missing" options={[["accidental","Possibly an accidental edit"],["deliberate","Possibly a deliberate omission — unproven"],["insufficient","Insufficient evidence to explain it"]]}/></>}</>}
      {n===7&&<><p>Public contact route: Greyhaven Bulletin reporting inbox · Nora Vance. Private recovered files are not attached.</p><button className="opening-choice" onClick={()=>setContact('nora')}>Open Nora reporting inbox</button></>}
      {n===8&&<><button className="opening-choice" onClick={()=>setContact('nora')}>Ask Nora about her retained page</button>{card('CH1-NORA-PAGE')}<button className="opening-choice" onClick={()=>act({type:'panel',panel:'compare'})}>Compare retained page with both source layers</button>{c?.panel==='compare'&&<div className="c1-diff" aria-label="Retained page comparison">{['CH1-PUBLIC','CH1-OLDER','CH1-NORA-PAGE'].map(id=><article key={id}><h3>{chapter1Record(id)!.title}</h3><pre>{chapter1Record(id)!.body}</pre><p>{chapter1Record(id)!.provenance}</p></article>)}<button className="opening-choice" onClick={()=>step('page-compared')}>Record retained-page comparison</button></div>}<p>The retained copy is not established as the original.</p></>}
      {n===9&&<>{card('CH1-PROVENANCE')}<button className="opening-choice" onClick={()=>step('provenance-ack')}>Record source uncertainty; sender identity remains unknown</button></>}
      {n===10&&<><p>Limited, read-only Recovered Device Snapshot. No live phone session, sending capability, PHONE MIRROR or SPY access is granted.</p><button className="opening-choice" onClick={()=>step('snapshot-consent')}>Authorize limited snapshot</button><button className="opening-choice" onClick={onHome}>Not now — return to phone</button>{card('CH1-LIFE')}</>}
      {n===11&&<>{card('CH1-INDEX')}{card('CH1-INDEX-NOTE')}<Interpretation kind="index" options={[["14-13","14 signed positions / 13 visible entries"],["13-14","13 signed positions / 14 visible entries"],["equal","The counts are equal"]]}/><p>Zero available deletion entries does not establish that no deletion occurred.</p></>}
      {n===12&&<><p>Eli is Daniel’s technical colleague. Ask Sophie for a contact route; no private file will be sent.</p><Chapter1Composer choiceKey="eli-intro"/>{save.prologue?.scene01?.messages.filter(m=>m.id==='CH1-ELI-INTRO').map(m=><p key={m.id}><strong>Sophie:</strong> {m.text}</p>)}{has('heard:CH1-ELI-INTRO')&&<button className="opening-choice" onClick={()=>setContact('eli')}>Open Eli conversation</button>}{has('technical-fallback')&&<p>General recovery guidance: copied metadata, missing context and corrupt fields can create false confidence. Unavailable logs cannot settle a deletion claim.</p>}<button className="opening-choice" onClick={()=>step('technical-ack')}>Acknowledge recovery limitations</button></>}
      {n===13&&<><p>Maya’s perspective is personal testimony. Nothing private from The Archive is shared automatically.</p><button className="opening-choice" onClick={()=>setContact('maya')}>Open Maya conversation</button></>}
      {n===14&&<><p>Lucas remains outside FIND DANIEL. A private exchange does not rejoin him.</p><button className="opening-choice" onClick={()=>setContact('lucas')}>Open Lucas conversation</button></>}
      {n===15&&<>{card('CH1-CLAIM')}<button className="opening-choice" onClick={()=>step('claim-phrase')}>Examine “after verification” against the index</button>{has('claim-phrase')&&<div className="c1-diff"><pre>{chapter1Record('CH1-CLAIM')!.body}</pre><pre>{chapter1Record('CH1-INDEX')!.body}</pre><p>A timing claim and a count mismatch do not authenticate each other.</p></div>}<Interpretation kind="claim" options={[["unverified","An attributed, unverified recovered claim"],["proof","Proof that an entry was deliberately deleted"],["identity","Proof of the operator’s identity"]]}/></>}
      {n===16&&<><p>Request only the earliest copy of the public linked record. No private note, snapshot or interpretation is attached.</p><Chapter1Composer choiceKey="original"/>{has('original-requested')&&<p>Request sent. Response: {save.pendingEvents.some(e=>/CH1-.*-REQUEST/u.test(e.id))?'pending':'no authenticated original supplied'}. You can continue without waiting.</p>}</>}
      {n===17&&<div aria-label="Evidence classification board"><p>Separate observations, reports, gaps and hypotheses.</p>{[['diff','Displayed Escort difference and 14/13 count'],['claim','Recovered post-verification sentence'],['source','Missing acquisition and custody fields'],['theory','An accidental edit or deliberate omission']].map(([key,label])=><label key={key}>{label}<select aria-label={`Classify ${key}`} value={c?.drafts['board-'+key]??''} onChange={e=>act({type:'draft',key:'board-'+key,id:e.target.value})}><option value="">Choose…</option>{['observed','reported','unknown','interpretation'].map(v=><option key={v} value={v}>{v}</option>)}</select></label>)}<button className="opening-choice" onClick={()=>step('board-classified')}>Check classifications</button><p>{has('board-classified')?'Classifications recorded.':'Observations describe displayed material; recovered statements remain reports. No identity is established.'}</p><button className="opening-choice" disabled={!has('board-classified')} onClick={()=>step('summary-saved')}>Save conclusion: versions differ; source and actor remain unproven</button></div>}
      {n===18&&<>{card('CH1-ROLE')}<Interpretation kind="ending" options={[["preserve","Preserve the trace without guessing who controls the role"],["question","Ask what an active role actually permits"],["cautious","Keep the operator and last use unresolved"],["pause","Take a moment before continuing"]]}/></>}
      <ul className="c1-checklist">{gates.map(g=><li key={g.label}>{g.done?'✓':'○'} {g.label}</li>)}</ul><button className="opening-primary" disabled={!gates.every(g=>g.done)} onClick={()=>act({type:'advance'})}>{n===18?'End Chapter':'Continue investigation'}</button>
      </>}
      <details><summary>Previously available sources</summary>{available.map(r=>card(r.id))}</details>
      <details><summary>Chapter progress</summary><ol>{chapter1ScenePlan.map((p,i)=><li key={p.id}>{p.title} — {i+1<n||c?.completed.includes(i+1)?'Complete':i+1===n?'Current':'Locked'}</li>)}</ol></details>
      </>}
    </div>
  </section>
}
