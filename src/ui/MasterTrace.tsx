import { Activity, Archive, AudioLines, BookOpen, ChevronLeft, FileText, GalleryHorizontal, LockKeyhole, Mail, Phone, ScanLine, Users } from 'lucide-react'
import { useEffect, useState } from 'react'
import { compareRecoveredFragments, fragmentExamination, masterFragments } from '../content/masterScene05'
import { recoveredConversations, recoveredNotes } from '../content/digitalArchive'
import { masterArchiveIdentifier } from '../content/masterScene04'
import { canRecoverActivity, scene06Units } from '../game/masterScene06'
import { canSaveFragmentFinding, masterRecoveryUnits, type MasterScene05Action, type MasterScene05 } from '../game/masterScene05'
import { useGameStore } from '../game/store'
import { MasterTimeline } from './MasterTimeline'
import { EvidenceComparison } from './MasterCaseFile'
import { NpcPhotoMessage } from './NpcPhotoMessage'
import { usePhoneBack } from './usePhoneBack'
import './master-trace-workspace.css'

type Fragment=typeof masterFragments[number]
const chatId=(id:string)=>`TA-PH-CHAT-${id.toUpperCase()}`
const noteId=(id:string)=>id==='dinner'?'TA-PH-NOTE-ORDINARY-01':'TA-PH-NOTE-RECORDS-01'
function PersonalLibrary({view,onOpen}:{view:'messages'|'notes';onOpen:(id:string)=>void}) {
 const [query,setQuery]=useState('')
 const search=query.trim().toLocaleLowerCase()
 const items=view==='messages'?recoveredConversations.map(c=>({id:chatId(c.id),title:c.name,body:c.lines.map(line=>line.text).join(' '),preview:c.preview})):recoveredNotes.map(n=>({id:noteId(n.id),title:n.title,body:n.body,preview:n.body}))
 return <section className="trace-module"><small>RECOVERED CONTENT · SOME CONTENT INCOMPLETE</small><h1>{view==='messages'?'Messages':'Notes'}</h1><label className="trace-record-search">Search recovered {view}<input type="search" value={query} onChange={e=>setQuery(e.target.value)}/></label>{items.filter(item=>`${item.title} ${item.body}`.toLocaleLowerCase().includes(search)).map(item=><button className="trace-item" key={item.id} onClick={()=>onOpen(item.id)}><span>{view==='messages'?<Mail size={20}/>:<BookOpen size={20}/>}</span><div><strong>{item.title}</strong><small>{item.preview}</small></div><ChevronLeft className="trace-item-arrow" size={18}/></button>)}</section>
}
function PersonalReader({id}:{id:string}) {
 const chat=recoveredConversations.find(c=>chatId(c.id)===id),note=recoveredNotes.find(n=>noteId(n.id)===id)
 if(chat)return <article className="trace-reader"><small>RECOVERED CONVERSATION · INCOMPLETE</small><h1>{chat.name}</h1><p>Dates unavailable</p><div className="trace-recovered-chat">{chat.lines.map((line,index)=><div key={index} className={`conversation-line ${line.speaker==='daniel'?'outgoing':'incoming'} ${index>0&&chat.lines[index-1].speaker!==line.speaker?'speaker-change':''}`}><div className="conversation-body"><div className={`opening-bubble ${line.speaker==='daniel'?'player':'sophie'}`}>{line.photo&&<NpcPhotoMessage src={line.photo.src} alt={line.photo.alt} sender={chat.name}/>}<span>{line.text}</span></div></div></div>)}</div></article>
 if(note)return <article className="trace-reader"><small>RECOVERED NOTE · DATE UNAVAILABLE</small><h1>{note.title}</h1><p style={{whiteSpace:'pre-wrap'}}>{note.body}</p></article>
 return null
}
function TraceFragment({fragment, progress, act}:{fragment:Fragment;progress:MasterScene05;act:(action:MasterScene05Action)=>void}) {
 const {id,body,category}=fragment
 const {title,detail,observation}=fragmentExamination[id]
 const selected=progress.comparison?.includes(id)?progress.comparison.find(source=>source!==id):undefined
 const [target,setTarget]=useState(selected??'')
 const compared=masterFragments.find(item=>item.id===selected)
 const recoveredMessage=category==='Messages'&&body.startsWith('Daniel: ')
 const excerpt=recoveredMessage?body.slice('Daniel: '.length):body
 const offset=excerpt.indexOf(detail)
 const highlighted=offset>=0&&!!progress.observations?.includes(id)
 const saved=progress.saved.includes(id)
 return <article className="trace-reader">
  <small>PARTIAL FRAGMENT · {category.toUpperCase()}</small><h1>{title}</h1>
  <p className="trace-source">Archive source unverified · context incomplete</p>
  {recoveredMessage&&<p className="trace-message-author">Daniel · recovered excerpt</p>}
  <blockquote className={recoveredMessage?'trace-message-excerpt':undefined}>{offset>=0?<>{excerpt.slice(0,offset)}{highlighted?<mark>{detail}</mark>:<button type="button" className="trace-citation" aria-label={`Highlight detail: ${detail}`} onClick={()=>act({type:'observe',id})}>{detail}</button>}{excerpt.slice(offset+detail.length)}</>:excerpt}</blockquote>
  <p className="trace-corruption">[Unrecovered segment]</p>
  <details><summary>View metadata</summary><p>Source ID: {id}</p><p>Timestamp unavailable · authenticity unverified</p></details>
  {highlighted&&<p>{observation}</p>}
  <div className="trace-fragment-compare">
   <label>Compare fragment with <select value={target} onChange={event=>setTarget(event.target.value)}><option value="">Choose another recovered fragment</option>{masterFragments.filter(item=>item.id!==id).map(item=><option key={item.id} value={item.id}>{fragmentExamination[item.id].title}</option>)}</select></label>
   <button className="trace-action" disabled={!target} onClick={()=>act({type:'compare-fragments',left:id,right:target})}>Compare fragments</button>
  </div>
  {compared&&<EvidenceComparison entries={[fragment,compared].map(item=>({title:fragmentExamination[item.id].title,description:item.body,source:`Recovered ${item.category.toLowerCase()} · incomplete · timestamp unavailable`}))}>
   <p>{compareRecoveredFragments(id,compared.id)}</p>
  </EvidenceComparison>}
  <button className="trace-action" disabled={!canSaveFragmentFinding(progress,id)} onClick={()=>act({type:'save',id})}>{saved?'FRAGMENT RETAINED':'RETAIN FRAGMENT'}</button>
 </article>
}

function RecoveredLibrary({view,recovered,onOpen}:{view:'messages'|'notes';recovered:boolean;onOpen:(id:string)=>void}) {
 const title=view==='messages'?'Messages':'Notes'
 const [query,setQuery]=useState('')
 const search=query.trim().toLocaleLowerCase()
 const fragments=masterFragments.filter(fragment=>fragment.category===title&&`${fragmentExamination[fragment.id].title} ${fragment.body}`.toLocaleLowerCase().includes(search))
 return <section className="trace-module"><small>PARTIAL RECOVERY · {view.toUpperCase()}</small><h1>{title}</h1>
  {recovered?<>
   <p>Fragments are incomplete and their source is unverified.</p>
   <label className="trace-record-search">Search recovered {view}<input type="search" value={query} onChange={event=>setQuery(event.target.value)} /></label>
   {fragments.map(fragment=><button className="trace-item" key={fragment.id} onClick={()=>onOpen(fragment.id)}>
    <span>{view==='messages'?<Mail size={20}/>:<BookOpen size={20}/>}</span><div><strong>{fragmentExamination[fragment.id].title}</strong><small>Partial {view==='messages'?'conversation':'document'}</small></div><ChevronLeft className="trace-item-arrow" size={18}/>
   </button>)}
   {!fragments.length&&<p role="status">No recovered {view} match that search.</p>}
  </>:<div className="trace-empty"><LockKeyhole/><strong>Locked</strong><p>Run the first recovery pass to make fragments available.</p></div>}
 </section>
}
export function MasterTrace({onHome}:{onHome:()=>void}) {
 const p=useGameStore(s=>s.save.masterScene05),act=useGameStore(s=>s.masterScene05Action)
 const six=useGameStore(s=>s.save.masterScene06),act6=useGameStore(s=>s.masterScene06Action)
 const previousView=p?.traceView??'home'
 const view=['board','media','case-files','summary'].includes(previousView)?'home':previousView
 const fragment=masterFragments.find(f=>f.id===view)
 const personal=!!p?.discussion&&(view.startsWith('TA-PH-CHAT-')||view==='TA-PH-NOTE-ORDINARY-01'||view==='TA-PH-NOTE-RECORDS-01')
 usePhoneBack(()=>act({type:'view',id:personal?(view.startsWith('TA-PH-CHAT-')?'messages':'notes'):fragment?p?.traceReturn??(fragment.category==='Messages'?'messages':'notes'):'home'}),!!p&&view!=='home')
 useEffect(()=>{act({type:'open-trace'})},[act])
 useEffect(()=>{
  if(p?.recoveryAnimation?.startedAt===undefined||p.recovered)return
  act({type:'recovery-tick'})
  const timer=window.setInterval(()=>act({type:'recovery-tick'}),400)
  return()=>window.clearInterval(timer)
 },[act,p?.recoveryAnimation?.startedAt,p?.recovered])
 if(!p||p.packageStatus!=='installed')return null
 const open=(id:string)=>{act({type:'read',id});act({type:'view',id})}
 const navigate=(id:string)=>act({type:'view',id})
 const back=()=>{if(personal)navigate(view.startsWith('TA-PH-CHAT-')?'messages':'notes');else if(fragment)navigate(p.traceReturn??(fragment.category==='Messages'?'messages':'notes'));else navigate('home')}
 const recovery=p.discussion ? (p.recovered ? 20 : p.recoveryAnimation?.percent ?? 0) : (masterRecoveryUnits(p)+scene06Units(six))/10
 const sourceReady=(!p.earlySetup||p.archiveStatus==='accepted'&&p.beat>=(p.conversationRevision==='archive-v3'?6:8))&&(!p.directImport||!!p.importComplete)&&!(p.conversationRevision==='archive-v3'&&p.pending)
 const modules=[
  {id:'messages',label:'Messages',icon:Mail,status:p.recovered?'PARTIAL':'LOCKED'},
  {id:'notes',label:'Notes',icon:FileText,status:p.recovered?'PARTIAL':'LOCKED'},
  {id:'activity',label:'Activity Logs',icon:Activity,status:p.discussion&&p.recovered?'PARTIAL':six?.recovered?'AVAILABLE':'LOCKED'},
  {id:'calls',label:'Call History',icon:Phone,status:'LOCKED'},
  {id:'gallery',label:'Gallery',icon:GalleryHorizontal,status:'LOCKED'},
  {id:'audio',label:'Audio',icon:AudioLines,status:'LOCKED'},
  {id:'contacts',label:'Contacts',icon:Users,status:'LOCKED'},
 ] as const
 return <section className="master-trace" aria-label="TRACE Digital Evidence Analyzer">
  <header className="trace-top"><button onClick={view==='home'?onHome:back} aria-label={view==='home'?'Home':fragment&&p.traceReturn==='timeline'?'RETURN TO TIMELINE':'BACK TO TRACE'}><ChevronLeft size={19}/><span>{view==='home'?'Phone':'Back'}</span></button><div><small>GREYHAVEN · LOCAL WORKSPACE</small><strong>TRACE<span> / </span>FORENSIC VIEWER</strong><small>Recovery: {recovery}%</small></div>{view!=='home'&&<button onClick={onHome} aria-label="Home">Phone</button>}<ScanLine size={20}/></header>
  <div className="trace-body">
   {view==='home'&&<><div className="trace-hero"><div><small>RECOVERY OPERATION</small><h1>Daniel’s phone archive</h1><p>Source unverified · results remain on this device</p></div><div className="trace-meter"><strong>{recovery}%</strong><small>RECOVERED</small></div><div className="trace-meter-bar" role="progressbar" aria-label="Dashboard archive recovery" aria-valuemin={0} aria-valuemax={100} aria-valuenow={recovery}><span style={{width:`${recovery}%`}}/></div></div>
    <section className="trace-recovery"><div><small>RECOVERY MODULE · {p.recovered?'FIRST PASS INTERRUPTED':p.recoveryAnimation?'RECOVERING':'READY'}</small><h2>Protected archive</h2><p>{sourceReady?`${masterArchiveIdentifier} · local copy · source and contents unverified`:'No source ready. Continue the conversation with Unknown.'}</p></div><button disabled={p.recovered||!!p.recoveryAnimation||!sourceReady} onClick={()=>act({type:'recover'})}>{p.recovered?'FIRST PASS INTERRUPTED':p.recoveryAnimation?'RECOVERING':'START RECOVERY'}</button><details><summary>Source metadata</summary><p>The first pass recovers partial Messages and Notes.</p></details></section>
    <div className="trace-section-title"><h2>Modules</h2><span>FIRST PASS / {recovery}%</span></div><div className="trace-grid">{modules.map(({id,label,icon:Icon,status})=><button className="trace-tile" key={id} onClick={()=>{if(id==='activity'&&p.discussion&&p.recovered)act({type:'read',id:'TA-PH-ACTIVITY-FIRST'});navigate(id)}} disabled={['calls','gallery','audio','contacts'].includes(id)} aria-label={`Open ${label} module`}><span className="trace-tile-icon"><Icon size={23}/></span><strong>{label}</strong><small className={status==='LOCKED'?'locked':''}>{status}</small></button>)}</div>
   </>}
   {(view==='messages'||view==='notes')&&(p.discussion&&p.recovered?<PersonalLibrary key={view} view={view} onOpen={open}/>:<RecoveredLibrary key={view} view={view} recovered={p.recovered} onOpen={open}/>)}
   {view==='activity'&&p.discussion&&p.recovered&&<MasterTimeline onSource={open}/>}
   {view==='activity'&&!(p.discussion&&p.recovered)&&<section className="trace-module"><small>ACTIVITY LOGS</small><h1>Activity Logs</h1>{!p.complete?<div className="trace-empty"><LockKeyhole/><strong>Locked</strong><p>Requires deeper recovery pass. Available in a later operation.</p></div>:!six?<p>The first pass is complete.</p>:!six.recovered?<><p>{canRecoverActivity(six)?'Deeper recovery is ready when you choose.':'Continue the conversation with Unknown before recovery.'}</p><button className="trace-action" disabled={!canRecoverActivity(six)} onClick={()=>act6({type:'recover'})}>START ACTIVITY LOG RECOVERY</button></>:<button className="trace-action" onClick={()=>navigate('timeline')}>OPEN ACTIVITY LOGS &amp; TIMELINE</button>}</section>}
   {view==='timeline'&&<MasterTimeline onSource={open}/>}
   {personal?<PersonalReader id={view}/>:fragment&&<TraceFragment key={fragment.id} fragment={fragment} progress={p} act={act}/>}
  </div><footer className="trace-footer"><span><Archive size={13}/> LOCAL ANALYSIS</span><span>SOURCE UNVERIFIED</span></footer>
  {p.recoveryAnimation&&!p.recoveryAnimation.acknowledged&&<div className="trace-recovery-overlay" role="dialog" aria-modal="true" aria-label={p.recovered?'Recovery interrupted':'Recovering encrypted data'}><div className={`trace-recovery-panel ${p.recovered?'interrupted':''}`}><small>TRACE · DANIEL MERCER DEVICE ARCHIVE</small><h1>{p.recovered?'RECOVERY INTERRUPTED':'RECOVERING ENCRYPTED DATA'}</h1><p>{p.recovered?'Source synchronization lost.':recovery<4?'Preparing recovery session…':recovery<8?'Reading archive blocks…':recovery<12?'First data fragments detected…':recovery<16?'Reconstructing message records…':recovery<19?'Indexing notes and activity logs…':'Checking remaining archive blocks…'}</p><div className="trace-recovery-progress" role="progressbar" aria-label="Archive recovery" aria-valuemin={0} aria-valuemax={100} aria-valuenow={recovery}><span style={{width:`${recovery}%`}}/></div><strong className="trace-recovery-percent">{recovery}% / 100%</strong>{p.recovered&&<><p>20% RECOVERED · 80% UNAVAILABLE</p><p>Recovered fragments preserved.</p><button className="trace-action" onClick={()=>act({type:'recovery-acknowledge'})}>OPEN RECOVERED DATA</button></>}</div></div>}
 </section>
}
