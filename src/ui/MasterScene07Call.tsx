import { callTurns, legacyCallTurns } from '../content/masterScene07'
import { ver1CallTurns, ver1CallEnding } from '../content/masterScene07Ver1'
import { useGameStore } from '../game/store'
import { PhoneCallScreen } from './PhoneCallScreen'
import { useAudioPreferences } from './usePhoneAudio'
export function MasterScene07Call(){
 const p=useGameStore(s=>s.save.masterScene07),act=useGameStore(s=>s.masterScene07Action)
 const {preferences}=useAudioPreferences()
 if(!p)return null
 if(p.phase==='ringing')return <PhoneCallScreen phase="ringing" onAnswer={()=>act({type:'answer'})} onDecline={()=>act({type:'decline'})}/>
 if(p.phase==='missed')return <PhoneCallScreen phase="voicemail"><p>Sophie called. You can call her back when ready.</p><button className="opening-primary" onClick={()=>act({type:'answer'})}>CALL SOPHIE BACK</button></PhoneCallScreen>
 if(!['playing','waiting'].includes(p.phase))return null
 const turn=(p.conversationRevision==='starred-v2'?ver1CallTurns:p.conversationRevision==='audio-v2'?callTurns:legacyCallTurns)[p.clip]
 const live=p.phase==='playing'&&p.conversationRevision==='starred-v2'?[...p.lines,{id:`TA-S07-CALL-S${p.clip+1}`,sender:'sophie' as const,text:p.clip===10?ver1CallEnding:ver1CallTurns[p.clip].sophie,at:0}]:p.lines
 return <PhoneCallScreen phase="call-first" lines={live}>
  {p.phase==='playing'&&<><p>Sophie is speaking. Playback pauses at the end of this turn.</p><audio key={`${p.conversationRevision}-${p.clip}`} controls autoPlay muted={preferences.master===false||!preferences.effects} ref={node=>{if(node)node.volume=preferences.effectsVolume??1}} aria-label={`Sophie voice clip ${p.clip+1}`} src={p.conversationRevision==='starred-v2'?`/media/audio/scene07-ver1/call-${String(p.clip+1).padStart(2,'0')}.wav`:`/media/audio/scene07-sophie-call/call-${String(p.clip+1).padStart(2,'0')}.mp3`} onEnded={()=>act({type:'clip-ended'})}/><button className="opening-choice" onClick={()=>act({type:'clip-ended'})}>CONTINUE WITHOUT AUDIO</button></>}
  {p.phase==='waiting'&&turn&&<><p>Choose your reply</p>{turn.choices.map((text,i)=><button key={text} className={`opening-choice ${p.draft===i?'selected':''}`} aria-pressed={p.draft===i} onClick={()=>act({type:'draft',index:i})}>{text}</button>)}<button className="opening-primary" disabled={p.draft===undefined} onClick={()=>act({type:'send'})}>Send</button></>}
 </PhoneCallScreen>
}
