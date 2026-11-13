import { cinematicBeats } from '../content/masterScene04Cinematic'
import { masterArchiveIdentifier, masterScene04Beats } from '../content/masterScene04'
import { traceFirstBeats, unknownSenderRevisedBeats, unknownSenderRevisedOpening } from '../content/masterTraceFirst'
import { npcDeliveryDelay } from './npcDelivery'
import type { GameSave } from './types'

export interface MasterScene04 {
  version: 1; revision?:'trace-first'|'guarded-chat'|'cinematic'; opened: boolean; beat: number; draft?: number; messages: { id:string; sender:'unknown'|'player'; text:string; at:number }[];
  status:'conversation'|'offered'|'deferred'|'declined'|'accepted'; inspected:boolean; complete:boolean; preview:boolean; traceInstalled?:boolean; pending?:{id:string;text:string;dueAt:number; remaining?:string[]; finalStatus?:'offered'|'deferred'|'declined'|'accepted'}
}
export type MasterScene04Action = {type:'start'|'open'|'close'|'send'|'tick'|'inspect'|'close-preview'|'setup-trace'|'accept'|'defer'|'decline'|'reconsider'} | {type:'draft';index:number}
const put=(s:GameSave,p:MasterScene04):GameSave=>({...s,masterScene04:p})
const event=(s:GameSave,id:string):GameSave=>s.deliveredEvents.includes(id)?s:{...s,deliveredEvents:[...s.deliveredEvents,id]}

export const usesScene04ToolPreview = (p?: MasterScene04) => p?.revision === 'trace-first' || p?.revision === 'guarded-chat' || p?.revision === 'cinematic'

export function masterScene04Dialogue(revision: MasterScene04['revision']) {
  if (revision === 'cinematic') return cinematicBeats
  if (revision === 'guarded-chat') return unknownSenderRevisedBeats
  if (revision === 'trace-first') return traceFirstBeats
  return masterScene04Beats
}

export function masterScene04Action(s:GameSave,a:MasterScene04Action,now=Date.now()):GameSave {
  let p=s.masterScene04
  if(a.type==='start') {
    const scene=s.prologue?.scene01
    if(p||!scene?.masterScene01||!scene.privateScene03?.complete||!s.deliveredEvents.includes('TA-S03-SCENE04-UNLOCKED')&&!scene.privateScene03.nextEventReady)return s
    const id='TA-S04-FIRST'
    const opening="You're looking for Daniel Mercer."
    p={version:1,revision:'cinematic',opened:false,beat:0,messages:[{id,sender:'unknown',text:opening,at:now}],pending:{id:'TA-S04-OPEN-2',text:'I think I can help.',dueAt:now+2500},status:'conversation',inspected:false,complete:false,preview:false}
    s=event(s,id)
    s={...s,notifications:[...s.notifications,{id,text:opening,read:false}]}
    return put(s,p)
  }
  if(!p)return s
  const beats=masterScene04Dialogue(p.revision)
  if(a.type==='tick'&&p.pending&&p.pending.dueAt<=now){
    const pending=p.pending
    const messages=p.messages.some(m=>m.id===pending.id)?p.messages:[...p.messages,{id:pending.id,sender:'unknown' as const,text:pending.text,at:now}]
    s=event(s,pending.id)
    if (!((p.revision==='guarded-chat'||p.revision==='cinematic')&&p.opened) && !s.notifications.some(n=>n.id===pending.id)) {
      s={...s,notifications:[...s.notifications,{id:pending.id,text:pending.text,read:false}]}
    }
    if(p.revision==='cinematic') {
      const [next,...remaining]=pending.remaining??[]
      if(next)return put(s,{...p,messages,pending:{id:`${pending.id}-next`,text:next,dueAt:now+Math.max(700,Math.min(3200,600+next.length*32)),remaining,finalStatus:pending.finalStatus}})
      const status=pending.finalStatus??'conversation'
      if(status==='accepted')s=event(event(event(s,'TA-S04-TRACE-PROCEED'),'TA-S04-COMPLETE'),'TA-S04-SCENE05-UNLOCKED')
      return put(s,{...p,pending:undefined,messages,status,complete:status==='accepted'})
    }
    return put(s,{...p,pending:undefined,messages,status:p.beat===beats.length?'offered':'conversation'})
  }
  if(a.type==='open'){
    const canUpgrade=p.revision==='trace-first'&&p.beat===0&&p.draft===undefined&&!p.pending&&p.messages.length===1&&p.messages[0].text===unknownSenderRevisedOpening
    return put({...s,notifications:s.notifications.map(n=>p!.messages.some(m=>m.id===n.id)?{...n,read:true}:n)}, {...p,...(canUpgrade?{revision:'guarded-chat' as const}:{}),opened:true,preview:false})
  }
  if(a.type==='close')return put(s,{...p,opened:false,preview:false})
  if(a.type==='draft'&&p.opened&&!p.pending&&p.status==='conversation'&&p.beat<beats.length&&Number.isInteger(a.index)&&a.index>=0&&a.index<3)return put(s,{...p,draft:a.index})
  if(a.type==='send'&&p.opened&&!p.pending&&p.status==='conversation'&&p.draft!==undefined&&p.beat<beats.length){
    const beat=beats[p.beat], n=String(p.beat+1).padStart(2,'0'), choice=p.draft, outgoing=`TA-S04-C${n}-PLAYER-${choice}`,incoming=`TA-S04-C${n}-UNKNOWN-${choice}`
    if(s.deliveredEvents.includes(outgoing))return s
    const messages=[...p.messages,{id:outgoing,sender:'player' as const,text:beat.choices[choice],at:now}]
    s=event(s,outgoing)
    s={...s,choices:{...s.choices,[`TA-S04-C${n}`]:String(choice)}}
    if(p.revision==='cinematic'){
      const item=cinematicBeats[p.beat]
      const sequence=[...item.replies[choice],...item.common]
      const ending=choice===0?['One more thing.','If you find something that looks out of place...','Don’t ignore it just because the rest seems normal.','That’s what I did at first.']:[]
      const all=[...sequence,...(p.beat===9?ending:[])]
      const [text,...remaining]=all
      const finalStatus=p.beat===9?(choice===0?'accepted':choice===1?'deferred':'declined'):undefined
      return put(s,{...p,beat:p.beat+1,draft:undefined,messages,pending:{id:incoming,text,dueAt:now+Math.max(700,Math.min(3200,600+text.length*32)),remaining,finalStatus}})
    }
    const text=beat.replies[choice] as string
    const delay=usesScene04ToolPreview(p)?Math.min(7000,npcDeliveryDelay('eli',text,p.beat)):900
    return put(s,{...p,beat:p.beat+1,draft:undefined,messages,pending:{id:incoming,text,dueAt:now+delay}})
  }
  if(a.type==='inspect'&&p.opened&&(p.status!=='conversation'||p.revision==='cinematic'&&p.beat===9&&!p.pending))return put(event(s,'TA-S04-METADATA-INSPECTED'),{...p,inspected:true,preview:true})
  if(a.type==='close-preview')return put(s,{...p,preview:false})
  if(a.type==='setup-trace'&&p.opened&&p.revision==='cinematic'&&p.complete&&!p.traceInstalled)return put(event(s,'TA-S04-TRACE-INSTALLED'),{...p,traceInstalled:true,preview:false})
  if((a.type==='defer'||a.type==='decline')&&p.opened&&['offered','deferred','declined'].includes(p.status))return put(s,{...p,status:a.type==='defer'?'deferred':'declined',preview:false})
  if(a.type==='reconsider'&&p.opened&&['deferred','declined'].includes(p.status)){
    if(p.revision==='cinematic')return put(event(s,'TA-S04-RECONSIDER-PLAYER'),{...p,status:'conversation',messages:[...p.messages,{id:'TA-S04-RECONSIDER-PLAYER',sender:'player',text:"I've thought about it. Send me TRACE.",at:now}],pending:{id:'TA-S04-RECONSIDER-UNKNOWN',text:'Okay.',dueAt:now+800,remaining:["I'll make it available.",'One more thing.','If you find something that looks out of place...','Don’t ignore it just because the rest seems normal.','That’s what I did at first.'],finalStatus:'accepted'}})
    return put(s,{...p,status:'offered'})
  }
  if(a.type==='accept'&&p.opened&&!p.complete&&(p.status==='offered'||p.status==='accepted')){
    s=event(s,usesScene04ToolPreview(p)?'TA-S04-TRACE-PROCEED':'TA-S04-ARCHIVE-ACCEPTED')
    s=event(event(s,'TA-S04-COMPLETE'),'TA-S04-SCENE05-UNLOCKED')
    if(!usesScene04ToolPreview(p))s={...s,evidence:{...s.evidence,'TA-S04-ARCHIVE':{id:'TA-S04-ARCHIVE',source:`${masterArchiveIdentifier} · encrypted; source claimed by Unknown; authenticity unverified`,collectedAt:now,verified:false}}}
    return put(s,{...p,status:'accepted',preview:false,complete:true})
  }
  return s
}

export function validateMasterScene04(value:unknown):void {
  if(value===undefined)return
  if(!value||typeof value!=='object')throw Error('Invalid Scene 4 progress')
  const p=value as MasterScene04
  const lastBeat=masterScene04Dialogue(p.revision).length
  if(p.version!==1||p.revision!==undefined&&!usesScene04ToolPreview(p)||typeof p.opened!=='boolean'||!Number.isInteger(p.beat)||p.beat<0||p.beat>lastBeat||p.draft!==undefined&&(!Number.isInteger(p.draft)||p.draft<0||p.draft>2)||p.pending!==undefined&&(!p.pending||typeof p.pending.id!=='string'||typeof p.pending.text!=='string'||!Number.isFinite(p.pending.dueAt))||!['conversation','offered','deferred','declined','accepted'].includes(p.status)||typeof p.inspected!=='boolean'||typeof p.complete!=='boolean'||typeof p.preview!=='boolean'||p.traceInstalled!==undefined&&(typeof p.traceInstalled!=='boolean'||p.traceInstalled&&!p.complete)||!Array.isArray(p.messages)||p.messages.some(m=>!m||typeof m.id!=='string'||!['unknown','player'].includes(m.sender)||typeof m.text!=='string'||!Number.isFinite(m.at))||p.complete&&p.status!=='accepted'||p.status==='conversation'&&p.beat===lastBeat&&!p.pending||p.status!=='conversation'&&(p.pending!==undefined||p.beat!==lastBeat))throw Error('Invalid Scene 4 progress')
}

