import { useEffect, useRef, useState } from 'react'
import { scene10Clips } from '../content/masterScene10Media'
import { useGameStore } from '../game/store'
import { PhoneCallScreen } from './PhoneCallScreen'
import { useAudioPreferences } from './usePhoneAudio'
import './scene10-media.css'

export function MasterScene10Media(){
 const p=useGameStore(s=>s.save.masterScene10)!,m=p.media!,act=useGameStore(s=>s.masterScene10Action),audio=useRef<HTMLAudioElement>(null)
 const [armed,setArmed]=useState(false),[failedClip,setFailedClip]=useState<number>()
 const {preferences}=useAudioPreferences()
 useEffect(()=>{if(m.stage!=='hold'&&m.stage!=='fade')return;const timer=window.setTimeout(()=>act({type:m.stage==='hold'?'media-fade':'media-finish'}),m.stage==='hold'?3000:1400);return()=>window.clearTimeout(timer)},[m.stage,act])
 useEffect(()=>{if(m.stage!=='connecting')return;const timer=window.setTimeout(()=>act({type:'media-connect'}),1000);return()=>window.clearTimeout(timer)},[m.stage,act])
 const failed=failedClip===m.clip
 const clip=scene10Clips[m.clip],video=m.videoConsent&&m.clip>=6,choice='choices' in clip?clip.choices:undefined
 const lines=m.stage==='playing'?[...p.lines,{id:`TA-S10-MEDIA-LIVE-${m.clip}`,sender:'sophie' as const,text:clip.sophie,at:0}]:p.lines
 const videoName=m.clip===6?'1.mp4':m.clip===7?'2.mp4':m.clip===11?'6.mp4':undefined
 return <div className={`scene10-media ${m.stage==='fade'?'scene10-fade':''}`}>
 <PhoneCallScreen phase="call-first" lines={lines} connectedAt={m.connectedAt}>
  {m.stage==='connecting'&&<p role="status">Connecting video…</p>}
  {video&&m.stage!=='connecting'&&<div className="scene10-video-viewport" aria-label="Sophie video call">
   {videoName?<video key={videoName} src={`/media/video/scene10-owner/${videoName}`} autoPlay={armed} muted loop playsInline aria-label="Sophie camera footage"/>:<div className="scene10-card" aria-label="Text representation of the separate warning card"><small>Mercer family folder · source unverified</small><p>★ ••• ••• ••41</p>{m.clip>=10&&<strong>DO NOT CONTACT THE STARRED NUMBER.</strong>}</div>}
  </div>}
  {m.stage==='ready'&&<button className="opening-primary" onClick={()=>{setArmed(true);act({type:'media-play'})}}>PLAY SOPHIE’S CALL</button>}
  {m.stage==='playing'&&<><audio ref={audio} key={clip.file} src={`/media/audio/scene10-owner/${clip.file}`} aria-label={`Sophie ${clip.file}`} controls autoPlay={armed} muted={preferences.master===false||!preferences.effects} onEnded={()=>act({type:'media-ended'})} onError={()=>setFailedClip(m.clip)} onLoadedMetadata={e=>{e.currentTarget.volume=preferences.effectsVolume??1}}/>{!armed&&!failed&&<button className="opening-choice" onClick={()=>{setArmed(true);void audio.current?.play()}}>RESUME VOICE CLIP</button>}{failed&&<><p role="alert">Voice clip unavailable. Read the subtitle to continue.</p><button className="opening-choice" onClick={()=>act({type:'media-ended'})}>CONTINUE WITH SUBTITLES</button></>}</>}
  {m.stage==='waiting'&&choice&&<><p>Choose a reply</p>{choice.map((text,i)=><button className="opening-choice" key={text} aria-pressed={m.draft===i} onClick={()=>act({type:'media-draft',index:i})}>{text}</button>)}<button className="opening-primary" disabled={m.draft===undefined} onClick={()=>{setArmed(true);act({type:'media-send'})}}>Send</button>{m.clip===5&&m.responses.some(r=>r.decision===6&&r.choice!==0)&&<p>Video remains off. You can reconsider whenever you are ready.</p>}</>}
 </PhoneCallScreen></div>
}
