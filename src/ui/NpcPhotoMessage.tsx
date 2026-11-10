import { useState } from 'react'
import { ChatPhotoViewer } from './ChatPhotoViewer'
import './npc-photo-message.css'

export function NpcPhotoMessage({src,alt,sender}:{src:string;alt:string;sender:string}){
 const [open,setOpen]=useState(false),[failed,setFailed]=useState(false)
 return <div className="npc-photo-message"><button className="npc-photo-open" aria-label={`Open ${sender}'s photo: ${alt}`} onClick={()=>setOpen(true)}>
  {failed?<span className="npc-photo-fallback">Photo unavailable · open to retry</span>:<img src={src} alt={alt} loading="lazy" onError={()=>setFailed(true)}/>}</button>
  {open&&<ChatPhotoViewer src={src} alt={alt} onClose={()=>setOpen(false)}/>}
 </div>
}
