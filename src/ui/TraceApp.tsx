import { canOpenScene6Register, naturalConversation, naturalCore } from '../game/investigationAccess'
import { GuidanceDot } from './GuidanceDot'
import { guidanceTarget } from '../game/guidance'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Activity, ArrowLeft, ArrowUpRight, Check, Database, Fingerprint, FolderLock, GitBranch, House, LockKeyhole, Play, Radar, RotateCcw, ShieldQuestion } from 'lucide-react'
import { canonicalIndexFields } from '../content/versionHistoryConversation'
import { bridgeTraceLogs, traceAnalysisId, traceDurationMs, traceFindings, traceLogs, traceReferenceId } from '../content/traceReference'
import { useGameStore } from '../game/store'
import { traceIndexInspected, traceInitial, tracePresentation, traceReferenceAvailable, type TraceTab } from '../game/trace'
import { traceToolStates } from '../game/traceTools'
import { readMenuPreferences } from '../game/menuPreferences'
import { useCaseNavigation } from './CaseNavigation'
import { usePhoneBack } from './usePhoneBack'
import { bridgeInspectionEvent, traceBridgeV3 } from '../game/traceBridge'
import { TraceBridgeFindings } from './TraceBridgeFindings'
import { useTraceScan } from './useTraceScan'
import './trace-app.css'

const tabs = [ ['workspace','Workspace',House], ['tracker','Tracker',Radar], ['decryptor','Decryptor',FolderLock], ['vault','Vault',Database], ['activity','Activity',Activity] ] as const

export function TraceApp({onHome}:{onHome:()=>void}) {
  const save=useGameStore(s=>s.save),act=useGameStore(s=>s.traceAction),nav=useCaseNavigation()
  const p=save.chapter1?.trace??traceInitial(),vh=save.chapter1?.versionHistory
  const bridge = traceBridgeV3(save)
  const firstRun = bridge && !vh
  const referenceOpened = save.deliveredEvents.includes(bridgeInspectionEvent)
  const available=traceReferenceAvailable(save),inspected=traceIndexInspected(save),analysis=save.evidence[traceAnalysisId]
  const [mediaReduced,setMediaReduced]=useState(()=>matchMedia('(prefers-reduced-motion: reduce)').matches)
  useEffect(()=>{const media=matchMedia('(prefers-reduced-motion: reduce)'),change=()=>setMediaReduced(media.matches);media.addEventListener('change',change);return()=>media.removeEventListener('change',change)},[])
  const reduced=mediaReduced||save.settings.reduceMotion||readMenuPreferences().reduceMotion
  const elapsed=useTraceScan(p.tab==='tracker'&&!p.findingsOpen,reduced),presentation=tracePresentation(elapsed, bridge)
  const scroll=useRef<HTMLDivElement>(null)
  const scrollKey=p.findingsOpen?'findings':p.tab
  const [node,setNode]=useState<typeof traceFindings[number]['id']>('match')
  const tab=(value:TraceTab)=>act({type:'tab',tab:value})
  const back=()=>{if(p.findingsOpen)tab('workspace');else if(p.tab!=='workspace')tab('workspace');else onHome()}
  usePhoneBack(back)
  useLayoutEffect(()=>{if(scroll.current)scroll.current.scrollTop=useGameStore.getState().save.chapter1?.trace?.scroll?.[scrollKey]??0},[scrollKey])
  const viewFindings=()=>act({type:'findings'})
  const openIndex=()=>{if(inspected||p.scan.status==='complete')viewFindings();else if (bridge) act({type:'inspect-reference'});else tab('tracker')}
  const waiting=naturalConversation(save)&&inspected||!!save.chapter1?.archiveOrigin?.followupNotified||!!vh&&!vh.threads.unknown?.complete
  const continuation=<>{waiting&&<button className="trace-button secondary" onClick={()=>nav.openCharacter('unknown')}>{firstRun ? 'RETURN TO MESSAGES' : 'RETURN TO UNKNOWN NUMBER'} <GuidanceDot save={save} thread="unknown"/><ArrowUpRight size={16}/></button>}{!naturalConversation(save)&&!vh&&inspected&&save.chapter1?.publicStory?.complete&&<button className="trace-button" onClick={()=>{useGameStore.getState().versionHistoryAction({type:'enter'});tab('workspace')}}>REVIEW VERSION HISTORY <GuidanceDot save={save} action="enter-version-history"/><ArrowUpRight size={16}/></button>}</>
  const guide=guidanceTarget(save)
  const chosen=traceFindings.find(f=>f.id===node)!
  return <section className="trace-app version-history" aria-label={vh?'Version History investigation':'TRACE recovered references'} data-scene-id={vh?.sceneId}>
    <header className="trace-header"><button className="trace-back" aria-label={p.findingsOpen?'Back to version history':p.tab!=='workspace'?'Back to TRACE':'Back to phone'} onClick={back}><ArrowLeft size={20}/></button><div><strong>TRACE<span>.</span></strong><small>DIGITAL FORENSICS · LOCAL WORKSPACE</small></div><span className="trace-access">ACCESS: PARTIAL</span></header>
    <div className="trace-scroll" ref={scroll} onScroll={e=>{const value=e.currentTarget.scrollTop;if(Math.abs(value-(p.scroll?.[scrollKey]??0))>24)act({type:'scroll',key:scrollKey,value})}}>
      {p.tab === 'workspace' && firstRun && <article className="trace-card target trace-bridge-home">
        <div className="trace-eyebrow">INCOMING REFERENCE</div>
        <h1>{traceReferenceId}</h1>
        <p>Metadata status: UNRESOLVED</p>
        <button className="trace-button" disabled={!available} onClick={openIndex}>
          {inspected || p.scan.status === 'complete' ? 'VIEW FINDINGS' : 'INSPECT REFERENCE'}
          <GuidanceDot save={save} action={['inspect-reference','start-trace','view-findings']}/>
          <ArrowUpRight size={16}/>
        </button>
      </article>}
      {p.tab==='workspace'&&!firstRun&&<>
        <div className="trace-eyebrow"><span className="trace-live-dot"/> INVESTIGATION / 001</div>
        <h1>Follow the reference.<br/><span>Keep the uncertainty.</span></h1>
        <p className="trace-description">A local workspace for recovered references and the limits of what they establish.</p>
        <div className="trace-section-title">ACTIVE TARGET <span>REFERENCE ONLY</span></div>
        <article className="trace-card target"><div className="trace-card-heading"><Radar size={20}/><span>Recovered index</span><small>UNVERIFIED</small></div><button className="trace-target-id" onClick={openIndex} disabled={!available}>{available?traceReferenceId:'NO REFERENCE AVAILABLE'}<ArrowUpRight size={17}/></button><dl><div><dt>Public reference</dt><dd>{available?canonicalIndexFields[1][1]:'—'}</dd></div><div><dt>Original body</dt><dd className="trace-warning">UNAVAILABLE</dd></div><div><dt>Local analysis</dt><dd>{analysis?'SAVED':p.scan.status==='complete'?'READY TO INSPECT':p.scan.status==='paused'?'PAUSED':'NOT RUN'}</dd></div></dl><button className="trace-button" disabled={!available} onClick={()=>analysis?viewFindings():p.scan.status==='complete'?tab('tracker'):act({type:'start'})}><Play size={15}/>{analysis?'VIEW FINDINGS':p.scan.status==='paused'?'RESUME REFERENCE TRACE':p.scan.status==='complete'?'VIEW TRACKER':'START REFERENCE TRACE'}<GuidanceDot save={save} action={p.scan.status==='complete'?'view-findings':'start-trace'}/></button></article>
        <div className="trace-summary"><span><b>0</b> recovered bodies</span><span><b>{available?1:0}</b> recovered reference</span></div><small className="trace-count">RECOVERED RECORDS: 0</small>
        {vh&&!naturalCore(save)&&<article className="trace-card trace-continuation"><div className="trace-eyebrow">SOURCE INVESTIGATION</div><h2>VERSION HISTORY{vh.complete?' — REVIEWED':''}</h2><p>{vh.flags.includes('public')?'Public article already read.':'The public article is available in the Bulletin browser.'} Article text and publication guidance stay with the publisher.</p><div className="trace-source-links"><button onClick={nav.openPublicArticle}>VIEW ARTICLE <GuidanceDot save={save} action={['open-article','mark-article-read','inspect-update','save-update-analysis']}/><ArrowUpRight size={14}/></button><button disabled={!available} onClick={openIndex}>VIEW INDEX <GuidanceDot save={save} action="view-findings"/><ArrowUpRight size={14}/></button><button onClick={()=>nav.openPublication('policy')}>HOW THE BULLETIN LABELS UPDATES <GuidanceDot save={save} action={['open-policy','read-policy']}/><ArrowUpRight size={14}/></button></div>{vh.flags.includes('policy')&&<small><Check size={12}/> Policy reviewed</small>}</article>}
        {vh?.complete&&canOpenScene6Register(save)&&<article className="trace-card"><h2>THE CORRECTIONS DESK</h2><p>{vh.inquiry.receipt?'Request submitted · Response pending':'No request sent.'}</p><button className="trace-button" onClick={()=>useGameStore.getState().correctionsDeskAction({type:'enter'})}>{save.chapter1?.correctionsDesk?.flowRevision==='2026-10-31'?'THE CORRECTIONS DESK':'OPEN NEXT LEAD'}<GuidanceDot save={save} action="enter-desk"/><ArrowUpRight size={16}/></button></article>}
        {naturalCore(save)&&<div className="trace-source-links"><button onClick={nav.openPublicArticle}>VIEW BULLETIN<GuidanceDot save={save} app="bulletin"/><ArrowUpRight size={14}/></button></div>}
        {continuation}
      </>}
      {p.tab==='tracker'&&<>
        <div className="trace-eyebrow">REFERENCE TRACKER / LOCAL</div><h1>{p.findingsOpen?'Findings':'Trace the connection.'}</h1><p className="trace-description">{traceReferenceId} · Reference only</p>
        {p.findingsOpen?<>
          <div className="trace-result-banner"><Check size={18}/><div><b>Reference ID matched</b><small>Revision history NOT VERIFIED</small></div></div>
          {bridge ? <TraceBridgeFindings/> : <>
          <div className="trace-graph" aria-label="Reference findings">{traceFindings.map((f,i)=><button key={f.id} aria-pressed={node===f.id} onClick={()=>setNode(f.id)} className={i>1?'unresolved':''}><span>{i<2?<GitBranch size={18}/>:<ShieldQuestion size={18}/>}</span><b>{f.label}</b><small>{f.value}</small></button>)}</div>
          <article className="trace-card finding-detail" aria-live="polite"><div className="trace-eyebrow">{chosen.label}</div><h2>{chosen.value}</h2><p>{chosen.detail}</p></article>
          <details className="trace-fields"><summary>Inspect recovered index fields</summary><pre>{canonicalIndexFields.map(([k,v])=>`${k}: ${v}`).join('\n')}</pre></details>
          </>}
          <p className="trace-footnote">{analysis?'Local analysis saved to Evidence Vault.':'Previously inspected index. No new analysis receipt has been created.'}</p>
          {!firstRun && <button className="trace-button secondary" onClick={()=>tab('vault')}>OPEN EVIDENCE VAULT <Database size={16}/></button>}{continuation}
        </>:<>
          {bridge && <p className="trace-description">Target: {traceReferenceId}<br/>Available container: Recovered index / authenticity unknown</p>}
          <div className="trace-scanner"><span className={p.scan.status==='running'?'scanning':''}><Radar size={21}/></span><div><small>ENGINE STATUS</small><b role="status">{p.scan.status==='idle'?'STANDBY':p.scan.status==='paused'?'PAUSED':presentation.stage}</b></div><strong>{presentation.progress}<small>%</small></strong></div>
          <progress aria-label="Reference trace progress" value={presentation.progress} max={100}/>
          <div className="trace-terminal"><div><span>TRACE ENGINE // LOCAL INDEX</span><i className={p.scan.status==='running'?'trace-live-dot':''}/></div><pre aria-live="off">{p.scan.status==='idle'?'Waiting for a local trace request.':(bridge ? bridgeTraceLogs : traceLogs).slice(0,presentation.logCount).join('\n')}</pre><span className="trace-prompt">trace@local:~ <b>▌</b></span></div>
          <div className="trace-mini-map"><span><Database size={18}/> Index</span><GitBranch size={20}/><span><Fingerprint size={18}/> Public ID</span><small>Original body unavailable · Revision unverified</small></div>
          {p.scan.status==='complete'?<><div className="trace-result-banner"><Check size={18}/><div><b>Local trace complete</b><small>Inspect the findings to save your analysis.</small></div></div><button className="trace-button" onClick={viewFindings}>VIEW FINDINGS <GuidanceDot save={save} action="view-findings"/><ArrowUpRight size={16}/></button>{!firstRun && <button className="trace-text-button" onClick={()=>act({type:'start'})}><RotateCcw size={14}/> Replay animation</button>}</>:p.scan.status==='running'?<button className="trace-button secondary" disabled={elapsed<800&&!reduced} onClick={()=>act({type:'checkpoint',elapsedMs:traceDurationMs,status:'complete'})}>SKIP ANIMATION</button>:<button className="trace-button" disabled={!available} onClick={()=>act({type:bridge&&!referenceOpened?'inspect-reference':'start'})}><Play size={15}/>{bridge&&!referenceOpened?'INSPECT REFERENCE':p.scan.status==='paused'?'RESUME REFERENCE TRACE':bridge?'SCAN REFERENCE':'RUN LOCAL TRACE'}<GuidanceDot save={save} action={['inspect-reference','start-trace']}/></button>}
          {analysis&&<button className="trace-text-button" onClick={viewFindings}>View saved findings</button>}
        </>}
      </>}
      {p.tab==='decryptor'&&<><div className="trace-eyebrow">TOOL / DECRYPTOR</div><h1>Nothing to decode.<br/><span>Yet.</span></h1><p className="trace-description">Recovery starts with an eligible payload.</p><div className="trace-terminal decryptor"><div><span>PAYLOAD INTEGRITY</span><LockKeyhole size={14}/></div><pre>PAYLOAD      — NONE{'\n'}ELIGIBILITY  — LOCKED{'\n'}INTEGRITY    — NOT ESTABLISHED</pre></div><article className="trace-card trace-empty"><FolderLock size={36}/><h2>NO ENCRYPTED PAYLOAD</h2><p>The current index contains reference fields. Decoding its header reads existing metadata. Decryption requires an encrypted payload.</p><button className="trace-button" disabled={!traceToolStates(save).find(t=>t.id==='decryptor')?.available}>DECRYPT UNAVAILABLE</button><small>An eligible fragment must become available through the investigation.</small></article><ol className="trace-decode-steps"><li>Validate payload <LockKeyhole size={13}/></li><li>Stabilize bytes <LockKeyhole size={13}/></li><li>Decode fragment <LockKeyhole size={13}/></li></ol></>}
      {p.tab==='vault'&&<><div className="trace-eyebrow">CASE / EVIDENCE VAULT</div><h1>Keep the trace.</h1><p className="trace-description">Sources and local analysis retain their limitations.</p>{available?<button className="trace-card vault-record" onClick={openIndex}><span className="trace-record-icon"><Database size={23}/></span><span><small>RECOVERED REFERENCE</small><b>{traceReferenceId}</b><em>Origin unverified · Original body unavailable</em></span><ArrowUpRight size={17}/></button>:<p>No recovered reference available.</p>}{analysis&&<button className="trace-card vault-record" onClick={viewFindings}><span className="trace-record-icon"><GitBranch size={23}/></span><span><small>LOCAL ANALYSIS</small><b>{analysis.id}</b><em>Public ID matched · Revision NOT VERIFIED</em></span><ArrowUpRight size={17}/></button>}<article className="trace-card"><h2>Source boundaries</h2><p>Public article text and publisher policy remain in the Bulletin browser. A reference match supplies no missing body or verified change.</p></article>{vh&&<div className="trace-source-links"><button onClick={nav.openPublicArticle}>VIEW ARTICLE <GuidanceDot save={save} action={['open-article','mark-article-read','inspect-update','save-update-analysis']}/><ArrowUpRight size={14}/></button><button onClick={()=>nav.openPublication('policy')}>HOW THE BULLETIN LABELS UPDATES <GuidanceDot save={save} action={['open-policy','read-policy']}/><ArrowUpRight size={14}/></button>{vh.inquiry.receipt&&<button onClick={()=>nav.openPublication('receipt')}>VIEW REQUEST RECEIPT <ArrowUpRight size={14}/></button>}</div>}{continuation}</>}
      {p.tab==='activity'&&<><div className="trace-eyebrow">LOCAL AUDIT TRAIL</div><h1>What happened here.</h1><p className="trace-description">Saved events from this investigation.</p><ol className="trace-activity">{save.chapter1?.archiveOrigin?.installed&&<li><Check size={15}/><div><b>TRACE installation completed</b><small>Voluntary local installation</small></div></li>}{available&&<li><Database size={15}/><div><b>Reference available</b><small>{traceReferenceId} · Unverified origin</small></div></li>}{inspected&&<li><Fingerprint size={15}/><div><b>Index fields inspected</b><small>Reference only · No article body</small></div></li>}{analysis&&<li><GitBranch size={15}/><div><b>Local analysis saved</b><small>{analysis.id} · ID match, revision unverified</small></div></li>}{vh?.flags.includes('policy')&&<li><Check size={15}/><div><b>Publication policy reviewed</b><small>General guidance, not an article-specific history</small></div></li>}{vh?.inquiry.receipt&&<li><Check size={15}/><div><b>Request delivered</b><small>{vh.inquiry.receipt.id} · Delivery only</small></div></li>}</ol>{!available&&<p>No reference analysis recorded.</p>}</>}
    </div>
    <nav className="trace-tabs" aria-label="TRACE navigation">{tabs.map(([id,label,Icon])=><button key={id} aria-current={p.tab===id?'page':undefined} onClick={()=>tab(id)}><Icon size={19}/><span>{label}</span><GuidanceDot save={save} active={guide?.app==='archive'&&(id==='tracker'&&['inspect-reference','start-trace','view-findings'].includes(guide.action)&&p.tab!=='tracker'&&p.tab!=='workspace'||id==='workspace'&&['enter-version-history','enter-desk'].includes(guide.action)&&p.tab!=='workspace'&&!p.findingsOpen)}/></button>)}</nav>
  </section>
}
