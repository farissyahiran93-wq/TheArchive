import { Activity, Archive, AudioLines, BookOpen, ChevronLeft, CircleHelp, FileText, FolderOpen, FolderSearch, GalleryHorizontal, LockKeyhole, Mail, Network, Phone, ScanLine, Users } from 'lucide-react'
import { useEffect, useMemo } from 'react'
import { masterFragments } from '../content/masterScene05'
import { masterArchiveIdentifier } from '../content/masterScene04'
import { canRecoverActivity, scene06Units } from '../game/masterScene06'
import { masterRecoveryUnits } from '../game/masterScene05'
import { selectMasterCaseFile } from '../game/masterCaseFile'
import { useGameStore } from '../game/store'
import { MasterTimeline } from './MasterTimeline'
import { MasterCaseFile, MasterInvestigationBoard } from './MasterCaseFile'
import { MasterScene07Evidence } from './MasterScene07Evidence'
import { MasterScene08Evidence } from './MasterScene08Evidence'
import { MasterScene09Evidence } from './MasterScene09Evidence'
import { usePhoneBack } from './usePhoneBack'
import './master-trace-workspace.css'

const labels:Record<string,string>={
 'TA-PH-MESSAGE-FAMILY-01':'Family Thread',
 'TA-PH-MESSAGE-JUNE-01':'June Thread',
 'TA-PH-NOTE-ORDINARY-01':'Dinner Reminder',
 'TA-PH-NOTE-RECORDS-01':'Greyhaven Records',
}
export function MasterTrace({onHome}:{onHome:()=>void}) {
 const p=useGameStore(s=>s.save.masterScene05),act=useGameStore(s=>s.masterScene05Action)
 const six=useGameStore(s=>s.save.masterScene06),act6=useGameStore(s=>s.masterScene06Action)
 const save=useGameStore(s=>s.save), caseAction=useGameStore(s=>s.masterCaseFileAction)
 const caseFile=useMemo(()=>selectMasterCaseFile(save),[save])
 const view=p?.traceView??'home',fragment=masterFragments.find(f=>f.id===view)
 usePhoneBack(()=>act({type:'view',id:fragment?p?.traceReturn??(fragment.category==='Messages'?'messages':'notes'):'home'}),!!p&&view!=='home')
 useEffect(()=>{act({type:'open-trace'})},[act])
 if(!p||p.packageStatus!=='installed')return null
 const open=(id:string)=>{act({type:'read',id});act({type:'view',id})}
 const navigate=(id:string)=>act({type:'view',id})
 const back=()=>{if(fragment)navigate(p.traceReturn??(fragment.category==='Messages'?'messages':'notes'));else navigate('home')}
 const recovery=(masterRecoveryUnits(p)+scene06Units(six))/10
 const photos=caseFile?.nodes.filter(node=>node.image)??[]
 const modules=[{id:'case-files',label:'Case Files',icon:FolderOpen,status:'AVAILABLE'}, {id:'board',label:'Investigation Board',icon:Network,status:'AVAILABLE'}, {id:'messages',label:'Messages',icon:Mail,status:p.recovered?'PARTIAL':'LOCKED'}, {id:'notes',label:'Notes',icon:FileText,status:p.recovered?'PARTIAL':'LOCKED'}, {id:'activity',label:'Activity Logs',icon:Activity,status:six?.recovered?'AVAILABLE':'LOCKED'}, {id:'media',label:'Case Media',icon:GalleryHorizontal,status:photos.length?'AVAILABLE':'EMPTY'}, {id:'calls',label:'Call History',icon:Phone,status:'LOCKED'}, {id:'gallery',label:'Gallery',icon:GalleryHorizontal,status:'LOCKED'}, {id:'audio',label:'Audio',icon:AudioLines,status:'LOCKED'}, {id:'contacts',label:'Contacts',icon:Users,status:'LOCKED'}, {id:'summary',label:'Evidence Summary',icon:FolderSearch,status:'AVAILABLE'}] as const
 return <section className="master-trace" aria-label="TRACE Digital Evidence Analyzer">
  <header className="trace-top"><button onClick={view==='home'?onHome:back} aria-label={view==='home'?'Home':fragment&&p.traceReturn==='timeline'?'RETURN TO TIMELINE':'BACK TO TRACE'}><ChevronLeft size={19}/><span>{view==='home'?'Phone':'Back'}</span></button><div><small>GREYHAVEN · LOCAL WORKSPACE</small><strong>TRACE<span> / </span>FORENSIC VIEWER</strong><small>Recovery: {recovery}%</small></div>{view!=='home'&&<button onClick={onHome} aria-label="Home">Phone</button>}<ScanLine size={20}/></header>
  <div className="trace-body">
   {view==='home'&&<><div className="trace-hero"><div><small>RECOVERY OPERATION</small><h1>Investigation workspace</h1><p>Source unverified · results remain on this device</p></div><div className="trace-meter"><strong>{recovery}%</strong><small>RECOVERED</small></div><div className="trace-meter-bar"><span style={{width:`${recovery}%`}}/></div></div>
    <section className="trace-recovery"><div><small>RECOVERY MODULE · {p.recovered?'FIRST PASS COMPLETE':'READY'}</small><h2>Protected archive</h2><p>Source and contents are unverified. Recovery uses a local copy.</p></div><button aria-pressed={p.selected} onClick={()=>act({type:'select'})}>{p.selected?'✓ SOURCE SELECTED':'SELECT ARCHIVE'}</button><button disabled={!p.selected||p.recovered} onClick={()=>act({type:'recover'})}>{p.recovered?'FIRST PASS COMPLETE':'START RECOVERY'}</button><details><summary>Source metadata</summary><p>{masterArchiveIdentifier} · first-pass fragments only</p></details></section>
    <div className="trace-section-title"><h2>Modules</h2><span>FIRST PASS / {recovery}%</span></div><div className="trace-grid">{modules.map(({id,label,icon:Icon,status})=><button className="trace-tile" key={id} onClick={()=>navigate(['calls','gallery','audio','contacts'].includes(id)?'activity':id)} disabled={['calls','gallery','audio','contacts'].includes(id)} aria-label={`Open ${label} module`}><span className="trace-tile-icon"><Icon size={23}/></span><strong>{label}</strong><small className={status==='LOCKED'?'locked':''}>{status}</small></button>)}</div>
    <MasterScene07Evidence inTrace/><MasterScene08Evidence/><MasterScene09Evidence/>
   </>}
   {view==='case-files'&&caseFile&&<MasterCaseFile caseFile={caseFile} onAction={caseAction} onOpenBoard={()=>navigate('board')}/>}
   {view==='board'&&caseFile&&<MasterInvestigationBoard caseFile={caseFile} onAction={caseAction} onOpenCase={()=>navigate('case-files')}/>}
   {view==='media'&&<section className="trace-module"><small>CASE FILE 001 · LOCAL MEDIA</small><h1>Case Media</h1><p>Images already received during the investigation. The protected phone gallery remains locked.</p>{photos.map(node=><details className="trace-summary" key={node.id}><summary>{node.title}</summary><img src={node.image} alt={node.description} style={{display:'block',width:'100%',height:'auto'}}/><p>{node.source}</p></details>)}{!photos.length&&<p>No case images have been received.</p>}</section>}
   {(view==='messages'||view==='notes')&&<section className="trace-module"><small>PARTIAL RECOVERY · {view.toUpperCase()}</small><h1>{view==='messages'?'Messages':'Notes'}</h1><p>Fragments are incomplete and their source is unverified.</p>{p.recovered?masterFragments.filter(f=>f.category.toLowerCase()===view).map(f=><button className="trace-item" key={f.id} onClick={()=>open(f.id)}><span>{view==='messages'?<Mail size={20}/>:<BookOpen size={20}/>}</span><div><strong>{labels[f.id]}</strong><small>{p.read.includes(f.id)?'OPENED · PARTIAL':'UNOPENED · PARTIAL'}</small></div><ChevronLeft className="trace-item-arrow" size={18}/></button>):<div className="trace-empty"><LockKeyhole/> <strong>Locked</strong><p>Run the first recovery pass to make fragments available.</p></div>}</section>}
   {view==='activity'&&<section className="trace-module"><small>ACTIVITY LOGS</small><h1>Activity Logs</h1>{!p.complete?<div className="trace-empty"><LockKeyhole/><strong>Locked</strong><p>Requires deeper recovery pass. Available in a later operation.</p></div>:!six?<><p>The first pass is complete. Continue the investigation when ready.</p><button className="trace-action" onClick={()=>act6({type:'start'})}>START SCENE 6</button></>:!six.recovered?<><p>{canRecoverActivity(six)?'Deeper recovery is ready when you choose.':'Continue the conversation with Unknown before recovery.'}</p><button className="trace-action" disabled={!canRecoverActivity(six)} onClick={()=>act6({type:'recover'})}>START ACTIVITY LOG RECOVERY</button></>:<button className="trace-action" onClick={()=>navigate('timeline')}>OPEN ACTIVITY LOGS &amp; TIMELINE</button>}</section>}
   {view==='timeline'&&<MasterTimeline onSource={open}/>}
   {fragment&&<article className="trace-reader"><small>PARTIAL FRAGMENT · {fragment.category.toUpperCase()}</small><h1>{labels[fragment.id]}</h1><p className="trace-source">Archive source unverified · context incomplete</p><blockquote>{fragment.body}</blockquote><p className="trace-corruption">[Unrecovered segment]</p><p>Missing context does not establish why Daniel disappeared.</p><details><summary>View metadata</summary><p>Source ID: {fragment.id}</p><p>Timestamp unavailable · authenticity unverified</p></details><button className="trace-action" disabled={p.saved.includes(fragment.id)} onClick={()=>act({type:'save',id:fragment.id})}>{p.saved.includes(fragment.id)?'FINDING SAVED':'SAVE FINDING'}</button></article>}
   {view==='summary'&&<section className="trace-module"><small>LOCAL · PRIVATE</small><h1>Evidence Summary</h1><p>Observations from opened fragments are not authentication.</p>{masterFragments.filter(f=>p.read.includes(f.id)).map(f=><article className="trace-summary" key={f.id}><strong>{labels[f.id]}</strong><p>{f.summary}</p><button onClick={()=>open(f.id)}>INSPECT SOURCE · {labels[f.id]}</button></article>)}{!p.read.length&&<div className="trace-empty"><CircleHelp/><p>No fragments opened yet.</p></div>}</section>}
  </div><footer className="trace-footer"><span><Archive size={13}/> LOCAL ANALYSIS</span><span>SOURCE UNVERIFIED</span></footer>
 </section>
}
