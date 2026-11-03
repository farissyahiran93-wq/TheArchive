import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Phone, PhoneOff } from 'lucide-react'
import { CharacterAvatar } from './CharacterAvatar'
import { useAudioPreferences } from './usePhoneAudio'
import type { InventoryFinaleV2State } from '../game/inventoryFinaleV2'
import './phone-call.css'

type CallPhase=InventoryFinaleV2State['phase']
type CallLine=InventoryFinaleV2State['lines'][number]
let callAudioGesture=false
if(typeof window!=='undefined'){
  window.addEventListener('pointerdown',()=>{callAudioGesture=true},{once:true})
  window.addEventListener('keydown',()=>{callAudioGesture=true},{once:true})
}
function useCallClock(){const [now,setNow]=useState(Date.now);useEffect(()=>{const update=()=>setNow(Date.now());const timer=window.setInterval(update,200);document.addEventListener('visibilitychange',update);return()=>{window.clearInterval(timer);document.removeEventListener('visibilitychange',update)}},[]);return now}
function timeLabel(ms:number){const seconds=Math.max(0,Math.floor(ms/1000));return `${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(seconds%60).padStart(2,'0')}`}

/** Generated tones use Web Audio. No external sound files or device contacts are read. */
function useCallAudio(phase:CallPhase){const {preferences}=useAudioPreferences();useEffect(()=>{
  if(!['ringing','call-first','call-second','warning','ending'].includes(phase)||preferences.master===false||preferences.effects===false||!(callAudioGesture||navigator.userActivation?.hasBeenActive))return
  const Audio=window.AudioContext;if(!Audio)return
  let context:AudioContext
  try{context=new Audio()}catch{return}
  void context.resume().catch(()=>{})
  const tones:OscillatorNode[]=[]
  const play=(frequency:number,duration:number,volume:number,delay=0)=>{if(context.state==='closed')return;const start=context.currentTime+delay,osc=context.createOscillator(),gain=context.createGain();osc.type='sine';osc.frequency.value=frequency;gain.gain.setValueAtTime(0.0001,start);gain.gain.exponentialRampToValueAtTime(Math.max(.0001,volume),start+.025);gain.gain.exponentialRampToValueAtTime(.0001,start+duration);osc.connect(gain);gain.connect(context.destination);osc.start(start);osc.stop(start+duration+.02);osc.onended=()=>{osc.disconnect();gain.disconnect()}}
  const volume=(preferences.effectsVolume??1)*.045
  let interval:number|undefined
  if(phase==='ringing'){const ring=()=>{play(440,.32,volume);play(554,.32,volume,.37)};ring();interval=window.setInterval(ring,1700)}
  if(phase==='call-first')play(620,.15,volume)
  if(phase==='ending')play(390,.18,volume)
  if(['call-first','call-second'].includes(phase)&&preferences.music){for(const frequency of [82.41,123.47]){const osc=context.createOscillator(),gain=context.createGain();osc.type='sine';osc.frequency.value=frequency;gain.gain.value=.0025*(preferences.musicVolume??1);osc.connect(gain);gain.connect(context.destination);osc.start();tones.push(osc)}}
  return()=>{if(interval!==undefined)window.clearInterval(interval);for(const osc of tones){try{osc.stop()}catch{/**/}}void context.close().catch(()=>{})}
},[phase,preferences.master,preferences.effects,preferences.music,preferences.effectsVolume,preferences.musicVolume])}

export function PhoneCallScreen({phase,lines=[],connectedAt,endedAt,onAnswer,onDecline,children}:{phase:CallPhase;lines?:CallLine[];connectedAt?:number;endedAt?:number;onAnswer?:()=>void;onDecline?:()=>void;children?:ReactNode}){
  const now=useCallClock(),scroll=useRef<HTMLDivElement>(null)
  useCallAudio(phase)
  const visible=lines.filter(line=>line.at<=now)
  useEffect(()=>{const element=scroll.current;if(element&&element.scrollHeight-element.scrollTop-element.clientHeight<180)element.scrollTop=element.scrollHeight},[visible.length])
  const ringing=phase==='ringing',ended=phase==='ending'
  return <section className={`phone-call-screen${ringing?' is-ringing':''}${ended?' is-ended':''}`} aria-label={ringing?'Incoming call from Sophie':'Call with Sophie'}>
    <header className="phone-call-header"><CharacterAvatar character="sophie" fallback="S" className="phone-call-portrait"/><p className="phone-call-eyebrow">{ringing?'INCOMING CALL':ended?'CALL ENDED':'CONNECTED'}</p><h1>Sophie Mercer</h1><p className="phone-call-status" role="status">{ringing?'Ringing…':connectedAt?`${ended?'Call ended · ':''}${timeLabel((ended?endedAt??now:now)-connectedAt)}`:'Connecting…'}</p></header>
    {ringing?<div className="phone-call-actions"><button className="call-decline" onClick={onDecline}><PhoneOff size={22}/>Decline</button><button className="call-answer" onClick={onAnswer}><Phone size={22}/>Answer</button></div>:<><div className="phone-call-transcript" ref={scroll} role="log" aria-label="Call subtitles" aria-live="polite">{visible.map(line=><p key={line.id} className={`call-subtitle ${line.sender}`}><small>{line.sender==='player'?'You':'Sophie'}</small><span>{line.text}</span></p>)}</div><div className="phone-call-controls">{children}</div></>}
  </section>
}
