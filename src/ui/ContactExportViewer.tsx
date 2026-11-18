import { useEffect, useRef, useState } from 'react'
import { FileText, X, ZoomIn, ZoomOut } from 'lucide-react'
import { usePhoneBack } from './usePhoneBack'
import './contact-export-viewer.css'

/** Readable external copy; opening it does not import it or authenticate its source. */
export function ContactExportViewer({damaged,transferred,onTransfer,onOpenTrace,onClose}:{damaged:boolean;transferred:boolean;onTransfer:()=>void;onOpenTrace?:()=>void;onClose:()=>void}){
 const [zoom,setZoom]=useState(1),[confirm,setConfirm]=useState(false),[success,setSuccess]=useState(false)
 const close=useRef<HTMLButtonElement>(null),cancel=useRef<HTMLButtonElement>(null),filename=useRef<HTMLButtonElement>(null)
 const dismiss=()=>{if(confirm)setConfirm(false);else onClose()}
 usePhoneBack(dismiss)
 useEffect(()=>{const previous=document.activeElement as HTMLElement|null;close.current?.focus();return()=>previous?.focus()},[])
 useEffect(()=>{if(confirm)cancel.current?.focus()},[confirm])
 return <section className="contact-document-viewer" role="dialog" aria-modal="true" aria-label="Daniel contacts export document" onKeyDown={e=>{if(e.key==='Escape'){e.stopPropagation();dismiss()}else if(e.key==='Tab'){const scope=confirm?e.currentTarget.querySelector<HTMLElement>('[role="alertdialog"]'):e.currentTarget;const buttons=scope?.querySelectorAll<HTMLButtonElement>('button:not(:disabled)');if(!buttons?.length)return;const first=buttons[0],last=buttons[buttons.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}}}>
  <header className="contact-document-toolbar"><button ref={close} type="button" onClick={onClose} aria-label="Close document"><X size={21}/></button><span>DOCUMENT</span><div><button type="button" aria-label="Zoom out" disabled={zoom<=1} onClick={()=>setZoom(v=>Math.max(1,v-.25))}><ZoomOut size={20}/></button><button type="button" aria-label="Zoom in" disabled={zoom>=2} onClick={()=>setZoom(v=>Math.min(2,v+.25))}><ZoomIn size={20}/></button></div></header>
  <div className="contact-document-scroll"><article className="contact-document-sheet" style={{fontSize:`${zoom}rem`}}>
   <small className="contact-document-kicker"><FileText size={15}/> EXTERNAL DOCUMENT · UNVERIFIED</small>
   <button ref={filename} className="contact-document-filename" type="button" onClick={()=>{setSuccess(false);setConfirm(true)}}>Daniel_Contacts_Export</button>
   <p className="contact-document-origin">Copy shared by Sophie from Daniel’s family folder</p>
   <div className="contact-document-rule"/>
   <h2>Contact entry</h2><dl><div><dt>Contact name</dt><dd>No saved name</dd></div><div><dt>Number</dt><dd>••• ••• ••41</dd></div><div><dt>Starred</dt><dd>★ Yes</dd></div><div><dt>Remarks</dt><dd>{damaged?'The Remarks field is damaged and unreadable.':'A separate remark reads “Don’t call this number”. Its associated entry is unknown.'}</dd></div></dl>
   <div className="contact-document-rule"/><h2>Source details</h2><dl><div><dt>Source</dt><dd>Copy shared by Sophie from the family folder</dd></div><div><dt>Exporter</dt><dd>Unknown</dd></div><div><dt>Original date</dt><dd>Unknown</dd></div><div><dt>Possible modifications</dt><dd>Unknown</dd></div><div><dt>Authenticity</dt><dd>Unverified</dd></div></dl>
   {transferred&&<p className="contact-document-status" role="status">{success?'Transferred to TRACE.':'Already transferred to TRACE.'}</p>}
   {transferred&&onOpenTrace&&<button className="contact-document-open-trace" type="button" onClick={onOpenTrace}>OPEN IN TRACE</button>}
  </article></div>
  {confirm&&<div className="contact-document-backdrop"><section className="contact-document-confirm" role="alertdialog" aria-modal="true" aria-labelledby="contact-transfer-title" aria-describedby="contact-transfer-description"><h2 id="contact-transfer-title">Transfer to TRACE?</h2><div id="contact-transfer-description"><p>This file was shared by Sophie and hasn't been verified.</p><p>Transfer it to TRACE for further analysis?</p></div>{transferred&&<p>Already transferred.</p>}<div><button ref={cancel} type="button" onClick={()=>{setConfirm(false);filename.current?.focus()}}>CANCEL</button><button type="button" disabled={transferred} onClick={()=>{onTransfer();setConfirm(false);setSuccess(true)}}>TRANSFER</button></div></section></div>}
 </section>
}
