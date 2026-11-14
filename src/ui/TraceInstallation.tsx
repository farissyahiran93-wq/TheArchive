import { useEffect, useState } from 'react'
import { traceInstallationLabel, traceInstallationProgress } from '../game/traceInstallation'
import './trace-installation.css'

/** Reads elapsed time from the saved start, so leaving or refreshing cannot restart the operation. */
export function TraceInstallation({startedAt,onContinue,reduceMotion=false}:{startedAt:number;onContinue:()=>void;reduceMotion?:boolean}) {
  const [now,setNow]=useState(Date.now)
  useEffect(()=>{
    const id=window.setInterval(()=>setNow(Date.now()),100)
    return()=>window.clearInterval(id)
  },[startedAt])
  const progress=traceInstallationProgress(startedAt,now)
  return <div className="trace-install-overlay" data-reduce-motion={reduceMotion||undefined} role="dialog" aria-modal="true" aria-labelledby="trace-install-title">
    <div className="trace-install-card">
      <span className="trace-install-brand">TRACE</span>
      <small>SECURE RECOVERY INTERFACE</small>
      <div className="trace-install-symbol" aria-hidden="true">◎</div>
      <h2 id="trace-install-title">{progress===100?'TRACE installed successfully':'Installing TRACE'}</h2>
      <div className="trace-install-number" aria-hidden="true">{progress}<span>%</span></div>
      <div className="trace-install-track" role="progressbar" aria-label="TRACE installation" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}><div style={{width:`${progress}%`}}/></div>
      <p role="status">{progress===100?'Recovery workspace ready.':`${traceInstallationLabel(progress)}…`}</p>
      {progress===100&&<button className="opening-primary" onClick={onContinue}>CONTINUE</button>}
    </div>
  </div>
}
