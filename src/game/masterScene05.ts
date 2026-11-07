import { masterFragments, masterScene05Beats } from '../content/masterScene05'
import type { GameSave } from './types'

export interface MasterScene05 {
  version: 1; beat: number; draft?: number; messages: {id:string; sender:'unknown'|'player'; text:string; at:number}[]
  packageStatus:'conversation'|'offered'|'deferred'|'declined'|'installed'; inspected:boolean; risksRead:boolean
  opened:boolean; selected:boolean; recovered:boolean; read:string[]; saved:string[]; complete:boolean
}
export type MasterScene05Action = {type:'start'|'send'|'inspect'|'risks'|'install'|'defer'|'decline'|'reconsider'|'open-trace'|'select'|'recover'} | {type:'draft';index:number} | {type:'read'|'save';id:string}
const ids=masterFragments.map(f=>f.id as string)
export const masterRecoveryUnits=(p:MasterScene05)=>p.recovered?masterFragments.reduce((n,f)=>n+f.units,0):0
export function masterScene05Action(s:GameSave,a:MasterScene05Action,now=Date.now()):GameSave {
  let p=s.masterScene05
  if(a.type==='start') {
    if(p||!s.masterScene04?.complete||s.masterScene04.status!=='accepted'||!s.masterScene04.inspected)return s
    return {...s,masterScene05:{version:1,beat:0,messages:[{id:'TA-S05-INTRO-1',sender:'unknown',text:'You have the archive now.',at:now},{id:'TA-S05-INTRO-2',sender:'unknown',text:"It's still encrypted. Having the file doesn't make its contents readable.",at:now}],packageStatus:'conversation',inspected:false,risksRead:false,opened:false,selected:false,recovered:false,read:[],saved:[],complete:false}}
  }
  if(!p)return s
  const put=(next:MasterScene05):GameSave=>({...s,masterScene05:next})
  if(a.type==='draft'&&!p.complete&&((p.beat<8&&p.packageStatus==='conversation')||(p.beat>=8&&p.beat<10&&p.recovered&&ids.every(id=>p!.read.includes(id))&&p.saved.length>0))&&Number.isInteger(a.index)&&a.index>=0&&a.index<3)return put({...p,draft:a.index})
  if(a.type==='send'&&p.draft!==undefined&&!p.complete){
    const eligible=p.beat<8&&p.packageStatus==='conversation'||p.beat>=8&&p.beat<10&&p.recovered&&ids.every(id=>p!.read.includes(id))&&p.saved.length>0
    if(!eligible)return s
    const n=p.beat,choice=p.draft,beat=masterScene05Beats[n]
    const messages=[...p.messages,{id:`TA-S05-C${n+1}-P-${choice}`,sender:'player' as const,text:beat.choices[choice],at:now},{id:`TA-S05-C${n+1}-U-${choice}`,sender:'unknown' as const,text:beat.replies[choice],at:now}]
    if(n===9)messages.push({id:'TA-S05-CLOSING',sender:'unknown',text:'There may be activity records in another protected segment. If they become available, they might help you compare the times. A log will not tell you by itself who was holding the phone. For now, keep the archive and what you found separate.',at:now})
    const complete=n===9
    return {...s,deliveredEvents:complete?[...new Set([...s.deliveredEvents,'TA-S05-FINDINGS-SENT','TA-S05-COMPLETE','TA-S05-SCENE06-UNLOCKED'])]:s.deliveredEvents,masterScene05:{...p,beat:n+1,draft:undefined,messages,packageStatus:n===7?'offered':p.packageStatus,complete}}
  }
  if(a.type==='inspect'&&['offered','deferred','declined'].includes(p.packageStatus))return put({...p,inspected:true})
  if(a.type==='risks'&&p.inspected&&['offered','deferred','declined'].includes(p.packageStatus))return put({...p,risksRead:true})
  if((a.type==='defer'||a.type==='decline')&&p.packageStatus==='offered')return put({...p,packageStatus:a.type==='defer'?'deferred':'declined'})
  if(a.type==='reconsider'&&['deferred','declined'].includes(p.packageStatus))return put({...p,packageStatus:'offered'})
  if(a.type==='install'&&p.packageStatus==='offered'&&p.inspected&&p.risksRead)return put({...p,packageStatus:'installed'})
  if(a.type==='open-trace'&&p.packageStatus==='installed')return put({...p,opened:true})
  if(a.type==='select'&&p.opened)return put({...p,selected:true})
  if(a.type==='recover'&&p.opened&&p.selected&&!p.recovered)return put({...p,recovered:true})
  if(a.type==='read'&&p.recovered&&ids.includes(a.id)&&!p.read.includes(a.id))return put({...p,read:[...p.read,a.id]})
  if(a.type==='save'&&p.read.includes(a.id)&&!p.saved.includes(a.id))return {...s,evidence:{...s.evidence,[a.id]:{id:a.id,source:`${a.id} · partial, source unverified`,collectedAt:now,verified:false}},masterScene05:{...p,saved:[...p.saved,a.id]}}
  return s
}
export function validateMasterScene05(value:unknown):void {
  if(value===undefined)return
  const p=value as MasterScene05
  if(!p||p.version!==1||!Number.isInteger(p.beat)||p.beat<0||p.beat>10||!Array.isArray(p.messages)||!Array.isArray(p.read)||!Array.isArray(p.saved)||p.read.some(id=>!ids.includes(id))||p.saved.some(id=>!p.read.includes(id))||!['conversation','offered','deferred','declined','installed'].includes(p.packageStatus)||['inspected','risksRead','opened','selected','recovered','complete'].some(k=>typeof p[k as keyof MasterScene05]!=='boolean')||p.recovered&&(!p.selected||!p.opened||p.packageStatus!=='installed')||p.complete&&(p.beat!==10||!p.recovered||p.saved.length===0||ids.some(id=>!p.read.includes(id))))throw Error('Invalid Scene 5 progress')
}
