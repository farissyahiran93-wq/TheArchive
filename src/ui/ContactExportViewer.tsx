import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { FileText, X, ZoomIn, ZoomOut } from 'lucide-react'
import { usePhoneBack } from './usePhoneBack'
import './contact-export-viewer.css'

// Only damaged character spans are available in this external fragment.
const remarksFragment = [null, '�', null, '�', null] as const
function analyseFragment(fragment: readonly (string|null)[]) {
  const missingSpans = fragment.filter(span => span === null).length
  const readable = fragment.filter(span => span !== null && span !== '�').join('')
  return {missingSpans, readable}
}

export function ContactExportViewer({damaged,onAnalyse,onClose}:{damaged:boolean;onAnalyse:()=>void;onClose:()=>void}){
 const [zoom,setZoom]=useState(1),[mode,setMode]=useState<'document'|'confirm'|'result'>('document')
 const [analysis,setAnalysis]=useState<ReturnType<typeof analyseFragment>>()
 const close=useRef<HTMLButtonElement>(null), cancel=useRef<HTMLButtonElement>(null), remarks=useRef<HTMLButtonElement>(null), done=useRef<HTMLButtonElement>(null)
 const dismiss=()=>{if(mode==='confirm'){setMode('document');remarks.current?.focus()}else onClose()}
 usePhoneBack(dismiss)
 useEffect(()=>{const previous=document.activeElement as HTMLElement|null;close.current?.focus();return()=>previous?.focus()},[])
 useEffect(()=>{if(mode==='confirm')cancel.current?.focus();if(mode==='result')done.current?.focus()},[mode])
 return createPortal(<section className="contact-document-viewer" role="dialog" aria-modal="true" aria-label={mode==='result'?'TRACE fragment analysis':'Daniel contacts export document'} onKeyDown={event=>{
   if(event.key==='Escape'){event.stopPropagation();dismiss()}
   if(event.key!=='Tab')return
   const scope=mode==='confirm'?event.currentTarget.querySelector('[role="alertdialog"]'):event.currentTarget
   const buttons=scope?.querySelectorAll<HTMLButtonElement>('button:not(:disabled)')
   if(!buttons?.length)return
   const first=buttons[0],last=buttons[buttons.length-1]
   if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}
   else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
 }}>
  {mode==='result'&&analysis?<div className="contact-fragment-analysis">
   <header>TRACE · CORRUPTION ANALYSIS</header>
   <h2>Contact entry remarks</h2><p>Temporary session · external fragment</p>
   <dl><dt>Missing spans</dt><dd>{analysis.missingSpans}</dd><dt>Reconstructed text</dt><dd>{analysis.readable||'Unreadable'}</dd></dl>
   <p>The available bytes cannot reconstruct the remark.</p>
   <button ref={done} className="opening-primary" onClick={onClose}>RETURN TO SOPHIE</button>
  </div>:<>
  <header className="contact-document-toolbar"><button ref={close} type="button" onClick={onClose} aria-label="Close document"><X size={21}/></button><span>DOCUMENT</span><div><button type="button" aria-label="Zoom out" disabled={zoom<=1} onClick={()=>setZoom(v=>Math.max(1,v-.25))}><ZoomOut size={20}/></button><button type="button" aria-label="Zoom in" disabled={zoom>=2} onClick={()=>setZoom(v=>Math.min(2,v+.25))}><ZoomIn size={20}/></button></div></header>
  <div className="contact-document-scroll"><article className="contact-document-sheet" style={{fontSize:`${zoom}rem`}}>
   <small className="contact-document-kicker"><FileText size={15}/> EXTERNAL DOCUMENT · UNVERIFIED</small>
   <h1 className="contact-document-filename">Daniel_Contacts_Export</h1>
   <p className="contact-document-origin">Copy shared by Sophie from Daniel’s family folder</p>
   <div className="contact-document-rule"/>
   <h2>Contact entry</h2><dl><div><dt>Contact name</dt><dd>No saved name</dd></div><div><dt>Number</dt><dd>••• ••• ••41</dd></div><div><dt>Starred</dt><dd>★ Yes</dd></div><div><dt>Remarks</dt><dd>{damaged?<button ref={remarks} className="contact-damaged-remarks" aria-label="Inspect damaged remarks" onClick={()=>setMode('confirm')}><span aria-hidden="true">{remarksFragment.map(span=>span??'▰▰').join(' ')}</span><small>Damaged entry</small></button>:'A separate remark reads “Don’t call this number”. Its associated entry is unknown.'}</dd></div></dl>
   <div className="contact-document-rule"/><h2>Source details</h2><dl><div><dt>Source</dt><dd>Copy shared by Sophie from the family folder</dd></div><div><dt>Exporter</dt><dd>Unknown</dd></div><div><dt>Original date</dt><dd>Unknown</dd></div><div><dt>Possible modifications</dt><dd>Unknown</dd></div><div><dt>Authenticity</dt><dd>Unverified</dd></div></dl>
  </article></div>
  {mode==='confirm'&&<div className="contact-document-backdrop"><section className="contact-document-confirm" role="alertdialog" aria-modal="true" aria-labelledby="contact-transfer-title"><h2 id="contact-transfer-title">This section is damaged. Transfer the corrupted fragment to TRACE for analysis?</h2><div><button ref={cancel} type="button" onClick={dismiss}>CANCEL</button><button type="button" onClick={()=>{onAnalyse();setAnalysis(analyseFragment(remarksFragment));setMode('result')}}>ANALYSE WITH TRACE</button></div></section></div>}
  </>}
 </section>,document.querySelector('.device')??document.body)
}
