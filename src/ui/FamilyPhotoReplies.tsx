import { useState } from 'react'
import { familyPhotoReplies } from '../content/storyPhotos'
import { useGameStore } from '../game/store'
export function FamilyPhotoReplies(){
 const scene=useGameStore(s=>s.save.prologue?.scene01),act=useGameStore(s=>s.familyPhotoAction)
 const [open,setOpen]=useState(false),p=scene?.familyPhotoReply
 if(!p||p.replied!==undefined||!scene?.nodeId.startsWith('TA-S01-')||scene.invitation!=='none')return null
 return <div className="opening-actions" aria-label="Reply about family photo">{!open&&p.draft===undefined?<button className="opening-choice" onClick={()=>setOpen(true)}>REPLY ABOUT PHOTO</button>:<><p>What would you like to say?</p>{familyPhotoReplies.choices.map((c,i)=><button key={c} className="opening-choice" aria-pressed={p.draft===i} onClick={()=>act({type:'draft',index:i})}>{c}</button>)}<button className="opening-primary" disabled={p.draft===undefined} onClick={()=>act({type:'send'})}>Send photo reply</button></>}</div>
}
