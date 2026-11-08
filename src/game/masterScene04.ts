import { masterArchiveIdentifier, masterScene04Beats } from '../content/masterScene04'
import { traceFirstBeats } from '../content/masterTraceFirst'
import { npcDeliveryDelay } from './npcDelivery'
import type { GameSave } from './types'

export interface MasterScene04 {
  version: 1; revision?:'trace-first'; opened: boolean; beat: number; draft?: number; messages: { id:string; sender:'unknown'|'player'; text:string; at:number }[];
  status:'conversation'|'offered'|'deferred'|'declined'|'accepted'; inspected:boolean; complete:boolean; preview:boolean; pending?:{id:string;text:string;dueAt:number}
}
export type MasterScene04Action = {type:'start'|'open'|'close'|'send'|'tick'|'inspect'|'close-preview'|'accept'|'defer'|'decline'|'reconsider'} | {type:'draft';index:number}
const put=(s:GameSave,p:MasterScene04):GameSave=>({...s,masterScene04:p})
const event=(s:GameSave,id:string):GameSave=>s.deliveredEvents.includes(id)?s:{...s,deliveredEvents:[...s.deliveredEvents,id]}
export function masterScene04Action(s:GameSave,a:MasterScene04Action,now=Date.now()):GameSave {
  let p=s.masterScene04
  if(a.type==='start') {
    const scene=s.prologue?.scene01
    if(p||!scene?.masterScene01||!scene.privateScene03?.complete||!s.deliveredEvents.includes('TA-S03-SCENE04-UNLOCKED')&&!scene.privateScene03.nextEventReady)return s
    const id='TA-S04-FIRST'
    p={version:1,revision:'trace-first',opened:false,beat:0,messages:[{id,sender:'unknown',text:"I know you're looking for Daniel.",at:now}],status:'conversation',inspected:false,complete:false,preview:false}
    s=event(event(s,'TA-S04-SOPHIE-ELI-ENQUIRY'),id)
    s={...s,messages:[...s.messages,{id:'TA-S04-SOPHIE-ELI-ENQUIRY',sender:'sophie',recipient:'eli',channel:'messages',text:'I contacted the owner of the unnamed entry in the shared folder and invited them to help. Do you recognise that entry?',at:now-1,delivery:'delivered',disclosedFactIds:['TA-S04-SOPHIE-ELI-ENQUIRY']}],knowledge:{...s.knowledge,characters:{...s.knowledge.characters,eli:[...new Set([...s.knowledge.characters.eli,'TA-S04-SOPHIE-ELI-ENQUIRY'])]}},notifications:[...s.notifications,{id,text:"I know you're looking for Daniel.",read:false}]}
    return put(s,p)
  }
  if(!p)return s
  if(a.type==='tick'&&p.pending&&p.pending.dueAt<=now){
    const pending=p.pending
    if(s.deliveredEvents.includes(pending.id))return put(s,{...p,pending:undefined})
    s=event(s,pending.id)
    s={...s,notifications:[...s.notifications,{id:pending.id,text:pending.text,read:false}]}
    return put(s,{...p,pending:undefined,messages:[...p.messages,{id:pending.id,sender:'unknown',text:pending.text,at:now}],status:p.beat===masterScene04Beats.length?'offered':'conversation'})
  }
  if(a.type==='open')return put({...s,notifications:s.notifications.map(n=>p!.messages.some(m=>m.id===n.id)?{...n,read:true}:n)},{...p,opened:true,preview:false})
  if(a.type==='close')return put(s,{...p,opened:false,preview:false})
  if(a.type==='draft'&&p.opened&&!p.pending&&p.status==='conversation'&&Number.isInteger(a.index)&&a.index>=0&&a.index<3)return put(s,{...p,draft:a.index})
  if(a.type==='send'&&p.opened&&!p.pending&&p.status==='conversation'&&p.draft!==undefined&&p.beat<masterScene04Beats.length){
    const beat=(p.revision==='trace-first'?traceFirstBeats:masterScene04Beats)[p.beat], n=String(p.beat+1).padStart(2,'0'), choice=p.draft, outgoing=`TA-S04-C${n}-PLAYER-${choice}`,incoming=`TA-S04-C${n}-UNKNOWN-${choice}`
    if(s.deliveredEvents.includes(outgoing))return s
    const messages=[...p.messages,{id:outgoing,sender:'player' as const,text:beat.choices[choice],at:now}]
    s=event(s,outgoing)
    s={...s,choices:{...s.choices,[`TA-S04-C${n}`]:String(choice)}}
    return put(s,{...p,beat:p.beat+1,draft:undefined,messages,pending:{id:incoming,text:beat.replies[choice],dueAt:now+(p.revision==='trace-first'?Math.min(7000,npcDeliveryDelay('eli',beat.replies[choice],p.beat)):900)}})
  }
  if(a.type==='inspect'&&p.opened&&p.status!=='conversation'){s=event(s,'TA-S04-METADATA-INSPECTED');p={...p,inspected:true,preview:true}}
  if(a.type==='close-preview')return put(s,{...p,preview:false})
  if((a.type==='defer'||a.type==='decline')&&p.opened&&['offered','deferred','declined'].includes(p.status))return put(s,{...p,status:a.type==='defer'?'deferred':'declined',preview:false})
  if(a.type==='reconsider'&&p.opened&&['deferred','declined'].includes(p.status))return put(s,{...p,status:'offered'})
  if(a.type==='accept'&&p.opened&&p.status==='offered'){
    s=event(s,p.revision==='trace-first'?'TA-S04-TRACE-PROCEED':'TA-S04-ARCHIVE-ACCEPTED')
    p={...p,status:'accepted',preview:false}
  }
  if((a.type==='accept'||a.type==='inspect')&&p.status==='accepted'&&p.inspected&&!p.complete){
    s=event(event(s,'TA-S04-COMPLETE'),'TA-S04-SCENE05-UNLOCKED')
    if(p.revision!=='trace-first')s={...s,evidence:{...s.evidence,'TA-S04-ARCHIVE':{id:'TA-S04-ARCHIVE',source:`${masterArchiveIdentifier} · encrypted; source claimed by Unknown; authenticity unverified`,collectedAt:now,verified:false}}}
    p={...p,complete:true}
  }
  return put(s,p)
}

export function validateMasterScene04(value:unknown):void {
  if(value===undefined)return
  if(!value||typeof value!=='object')throw Error('Invalid Scene 4 progress')
  const p=value as MasterScene04
  if(p.version!==1||p.revision!==undefined&&p.revision!=='trace-first'||typeof p.opened!=='boolean'||!Number.isInteger(p.beat)||p.beat<0||p.beat>masterScene04Beats.length||p.draft!==undefined&&(!Number.isInteger(p.draft)||p.draft<0||p.draft>2)||p.pending!==undefined&&(!p.pending||typeof p.pending.id!=='string'||typeof p.pending.text!=='string'||!Number.isFinite(p.pending.dueAt))||!['conversation','offered','deferred','declined','accepted'].includes(p.status)||typeof p.inspected!=='boolean'||typeof p.complete!=='boolean'||typeof p.preview!=='boolean'||!Array.isArray(p.messages)||p.messages.some(m=>!m||typeof m.id!=='string'||!['unknown','player'].includes(m.sender)||typeof m.text!=='string'||!Number.isFinite(m.at))||p.complete&&(!p.inspected||p.status!=='accepted')||p.status==='conversation'&&p.beat>=masterScene04Beats.length&&!p.pending||p.status!=='conversation'&&(p.pending!==undefined||p.beat!==masterScene04Beats.length))throw Error('Invalid Scene 4 progress')
}
