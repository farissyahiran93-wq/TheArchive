import { useEffect, useRef, useState } from 'react'
import { callEnding, callTurns, legacyCallTurns } from '../content/masterScene07'
import { ver1CallTurns, ver1CallEnding } from '../content/masterScene07Ver1'
import cues from '../content/scene07SubtitleCues.json'
import { useGameStore } from '../game/store'
import { PhoneCallScreen } from './PhoneCallScreen'
import { useAudioPreferences } from './usePhoneAudio'

export function MasterScene07Call(){
 const p=useGameStore(s=>s.save.masterScene07),act=useGameStore(s=>s.masterScene07Action)
 const {preferences}=useAudioPreferences(), audio=useRef<HTMLAudioElement>(null)
 const [time,setTime]=useState(0),[duration,setDuration]=useState(0),[blocked,setBlocked]=useState(false),[failed,setFailed]=useState(false)
 const phase=p?.phase,clip=p?.clip,revision=p?.conversationRevision
 useEffect(()=>{
  const element=audio.current
  if(!element||phase!=='playing'||clip===undefined)return
  let disposed=false,started=false,lastSaved=useGameStore.getState().save.masterScene07?.playbackSeconds??0
  setTime(lastSaved);setDuration(0);setBlocked(false);setFailed(false)
  const checkpoint=()=>{
   if(!started||!Number.isFinite(element.currentTime))return
   const seconds=element.currentTime
   if(Math.abs(seconds-lastSaved)<0.1)return
   lastSaved=seconds
   act({type:'playback-checkpoint',clip,seconds})
  }
  const start=()=>{
   if(disposed||started)return
   started=true
   const position=Math.min(lastSaved,Number.isFinite(element.duration)?Math.max(0,element.duration-0.15):lastSaved)
   if(position>0){element.currentTime=position;setTime(position)}
   setDuration(element.duration)
   void element.play().catch(()=>{if(!disposed)setBlocked(true)})
  }
  const tick=()=>{setTime(element.currentTime);if(Math.abs(element.currentTime-lastSaved)>=2)checkpoint()}
  const hide=()=>{if(document.visibilityState==='hidden')checkpoint()}
  element.addEventListener('loadedmetadata',start)
  element.addEventListener('timeupdate',tick)
  document.addEventListener('visibilitychange',hide)
  window.addEventListener('pagehide',checkpoint)
  if(element.readyState>=1)start()
  return()=>{checkpoint();disposed=true;element.pause();element.removeEventListener('loadedmetadata',start);element.removeEventListener('timeupdate',tick);document.removeEventListener('visibilitychange',hide);window.removeEventListener('pagehide',checkpoint)}
 },[phase,clip,revision,act])
 useEffect(()=>()=>{const element=audio.current;if(element){element.pause();element.removeAttribute('src');element.load()}},[])
 if(!p)return null
 const src=p.conversationRevision==='starred-v2'?`/media/audio/scene07-ver1/call-${String(p.clip+1).padStart(2,'0')}.wav`:`/media/audio/scene07-sophie-call/call-${String(p.clip+1).padStart(2,'0')}.mp3`
 const turn=(p.conversationRevision==='starred-v2'?ver1CallTurns:p.conversationRevision==='audio-v2'?callTurns:legacyCallTurns)[p.clip]
 const spoken=p.clip===10?(p.conversationRevision==='starred-v2'?ver1CallEnding:callEnding):turn?.sophie??''
 // Historic audio revisions have no aligned cue file; their separate sentence timings use media duration.
 const fallback=spoken.match(/[^.!?]+[.!?]+|[^.!?]+$/g)?.map(x=>x.trim()).filter(Boolean)??[]
 const caption=p.phase==='playing'&&!blocked&&!failed?(p.conversationRevision==='starred-v2'?cues[p.clip]?.find(c=>time>=c.start&&time<c.end)?.text:duration>0?fallback[Math.min(fallback.length-1,Math.floor(time/duration*fallback.length))]:'')??'':''
 const answer=()=>{const element=audio.current;if(element)void element.play().catch(()=>{});act({type:'answer'})}
 return <>
  <audio ref={audio} src={src} preload="auto" muted={preferences.master===false||!preferences.effects} aria-label={`Sophie voice clip ${p.clip+1}`} onLoadedMetadata={e=>{e.currentTarget.volume=preferences.effectsVolume??1;setDuration(e.currentTarget.duration)}} onEnded={()=>act({type:'clip-ended'})} onError={()=>{if(p.phase==='playing')setFailed(true)}}/>
  {p.phase==='ringing'?<PhoneCallScreen phase="ringing" onAnswer={answer} onDecline={()=>act({type:'decline'})}/>:p.phase==='missed'?<PhoneCallScreen phase="voicemail"><p>Sophie called. You can call her back when ready.</p><button className="opening-primary" onClick={answer}>CALL SOPHIE BACK</button></PhoneCallScreen>:<PhoneCallScreen phase="call-first" subtitle={caption}>
   {p.phase==='playing'&&blocked&&!failed&&<><p role="status">Tap to reconnect the call.</p><button className="opening-choice" onClick={()=>{void audio.current?.play().then(()=>setBlocked(false)).catch(()=>setBlocked(true))}}>RESUME CALL</button></>}
   {p.phase==='playing'&&failed&&<><p role="alert">Sophie’s audio is unavailable.</p><p>{spoken}</p><button className="opening-choice" onClick={()=>act({type:'clip-ended'})}>CONTINUE CALL</button></>}
   {p.phase==='waiting'&&turn&&<><p>Choose your reply</p>{turn.choices.map((text,i)=><button key={text} className={`opening-choice ${p.draft===i?'selected':''}`} aria-pressed={p.draft===i} onClick={()=>act({type:'draft',index:i})}>{text}</button>)}<button className="opening-primary" disabled={p.draft===undefined} onClick={()=>act({type:'send'})}>Send</button></>}
  </PhoneCallScreen>}
 </>
}
