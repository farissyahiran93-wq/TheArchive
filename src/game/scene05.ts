import type { GameSave } from './types'
import type { Scene01Node } from '../content/scene01'
import { scene05Entrances, scene05Local, scene05Nodes } from '../content/scene05Final'
import { enterScene01, pauseScene03 } from './scene01'

type Thread='sophie'|'group'
type Checkpoint={nodeId:string;draft?:{nodeId:string;choiceId:string};paused?:{id:string;remainingMs:number;typing:boolean};complete?:boolean;scroll?:number}
export interface VersionHistoryState {
  version:1; entered:boolean; complete:boolean; flags:string[]; checklist:number[];
  panel:'home'|'public'|'index'|'policy'|'form'|'receipt'; scroll:Record<string,number>;
  localChoices:Record<string,string>; feedback?:string;
  inquiry:{status:'not_sent'|'draft'|'delivered'|'failed';choice?:string;text?:string;reviewed?:boolean;receipt?:{id:'R-GB-VH-001';text:string;at:number}};
  receipts?:{eventId:string;recipient:'player';factIds:string[]}[];
  sophieNotified:boolean; reading?:Thread; threads:Partial<Record<Thread,Checkpoint>>;
}
const initial=():VersionHistoryState=>({version:1,entered:true,complete:false,flags:[],checklist:[],panel:'home',scroll:{},localChoices:{},inquiry:{status:'not_sent'},sophieNotified:false,threads:{}})
export const versionHistoryEligible=(s:GameSave)=>s.prologue?.scene01?.scriptRevision==='final-2026-10-23'&&!!s.chapter1?.publicStory?.complete&&!s.chapter1.completed.some(n=>n>4)&&!s.chapter1.inspected.some(id=>['CH1-OLDER','CH1-DIFF-OBS'].includes(id))&&!s.chapter2Access
export const versionHistoryReady=(s:GameSave)=>{
  const p=s.chapter1?.versionHistory
  return !!p&&['public','index','policy','observation'].every(f=>p.flags.includes(f))&&p.checklist.length===4
}
export function versionHistoryPut(s:GameSave,patch:Partial<VersionHistoryState>):GameSave {
  return s.chapter1?{...s,chapter1:{...s.chapter1,versionHistory:{...s.chapter1.versionHistory??initial(),...patch}}}:s
}
const addFlag=(s:GameSave,id:string)=>versionHistoryPut(s,{flags:[...new Set([...s.chapter1!.versionHistory!.flags,id])]})
function note(s:GameSave,id:string,source:string,now:number):GameSave {
  return s.evidence[id]?s:{...s,evidence:{...s.evidence,[id]:{id,source,collectedAt:now,verified:false}}}
}
export function pauseVersionHistory(s:GameSave,now:number):GameSave {
  const p=s.chapter1?.versionHistory,scene=s.prologue?.scene01
  if(!p?.reading||!scene)return s
  const q=scene.queue[0],thread=p.reading
  const checkpoint={...p.threads[thread],nodeId:scene.nodeId,draft:scene.draft,paused:q?{id:q.id,remainingMs:Math.max(0,q.dueAt-now),typing:q.typing}:undefined}
  s=versionHistoryPut(s,{reading:undefined,threads:{...p.threads,[thread]:checkpoint}})
  return {...s,prologue:{...s.prologue!,scene01:{...scene,queue:[],draft:undefined}}}
}
export function openVersionHistoryThread(s:GameSave,thread:Thread,now:number):GameSave {
  const p=s.chapter1?.versionHistory,scene=s.prologue?.scene01
  if(!p||!scene||p.reading===thread||thread==='sophie'&&!p.sophieNotified||thread==='group'&&(!versionHistoryReady(s)||scene.groupMembers?.maya!==true))return s
  s=pauseScene03(s,now)
  const current=s.chapter1!.versionHistory!,checkpoint=current.threads[thread]
  if(checkpoint?.complete)return s
  s=versionHistoryPut(s,{reading:thread})
  const next={...s,prologue:{...s.prologue!,scene01:{...s.prologue!.scene01!,draft:checkpoint?.draft,queue:[],nodeId:checkpoint?.nodeId??scene05Entrances[thread]}}}
  if(checkpoint?.paused)return {...next,prologue:{...next.prologue!,scene01:{...next.prologue!.scene01!,queue:[{id:checkpoint.paused.id,dueAt:now+checkpoint.paused.remainingMs,typing:checkpoint.paused.typing}]}}}
  return enterScene01(next,checkpoint?.nodeId??scene05Entrances[thread],now)
}
export function versionHistoryEvent(s:GameSave,node:Extract<Scene01Node,{kind:'event'}>):GameSave {
  const p=s.chapter1?.versionHistory,scene=s.prologue?.scene01
  if(!p?.reading||!scene)return s
  const thread=p.reading
  s=versionHistoryPut(s,{reading:undefined,threads:{...p.threads,[thread]:{nodeId:node.id,complete:true}}})
  return {...s,prologue:{...s.prologue!,scene01:{...scene,queue:[],draft:undefined,groupPresence:{...scene.groupPresence,sophie:false,maya:thread==='group'?false:scene.groupPresence?.maya??false,lucas:false}}}}
}
export type VersionHistoryAction = {type:'enter'|'back'|'read-policy'|'not-now'|'review'|'send-request'|'save-draft'|'cancel'|'request-failed'|'next-lead'|'bonus'|'skip-bonus'}
  |{type:'panel';panel:VersionHistoryState['panel']}
  |{type:'local';id:keyof typeof scene05Local;choice:string}
  |{type:'check';index:number}
  |{type:'thread';thread:Thread}
  |{type:'scroll';key:string;value:number}
/** All navigation and disclosure is explicit. The fictional desk performs no network I/O. */
export function versionHistoryAction(s:GameSave,a:VersionHistoryAction,now=Date.now()):GameSave {
  if(a.type==='enter'){
    if(!s.chapter1?.versionHistory){
      if(!versionHistoryEligible(s))return s
      s={...s,chapter1:{...s.chapter1!,completed:[4],versionHistory:initial()}}
    }
    return pauseScene03(s,now)
  }
  let p=s.chapter1?.versionHistory
  if(!p||!s.prologue?.scene01?.scriptRevision||s.chapter2Access)return s
  if(a.type==='thread')return openVersionHistoryThread(s,a.thread,now)
  if(a.type==='scroll')return Number.isFinite(a.value)&&a.value>=0?versionHistoryPut(s,{scroll:{...p.scroll,[a.key]:a.value}}):s
  if(a.type==='bonus'||a.type==='skip-bonus')return s.prologue.scene01.nodeId==='OPEN-S05-BONUS-OFFER'&&p.reading==='sophie'?enterScene01(s,a.type==='bonus'?'OPEN-S05-BONUS-CHOICE':'OPEN-S05-AFTER-06-1-WAIT',now):s
  if(a.type==='back'){
    if(p.panel==='form'&&p.inquiry.status!=='delivered'&&p.inquiry.text)s=versionHistoryPut(s,{inquiry:{...p.inquiry,status:'draft'},feedback:'Draft saved locally. No message sent.'})
    return versionHistoryPut(pauseScene03(s,now),{panel:'home'})
  }
  if(a.type==='panel'){
    if(p.panel==='form'&&p.inquiry.text&&p.inquiry.status!=='delivered')s=versionHistoryPut(s,{inquiry:{...p.inquiry,status:'draft'}})
    if(a.panel==='receipt'&&!p.inquiry.receipt||a.panel==='policy'&&!p.localChoices['S05-C01']||a.panel==='form'&&!p.localChoices['S05-C03'])return s
    s=pauseScene03(s,now)
    if(a.panel==='public'||a.panel==='index')s=addFlag(s,a.panel)
    return versionHistoryPut(s,{panel:a.panel,feedback:undefined})
  }
  if(a.type==='read-policy'){
    if(p.panel!=='policy')return s
    s=addFlag(s,'policy')
    return {...s,knowledge:{...s.knowledge,player:[...new Set([...s.knowledge.player,'POL-GB-UPDATES-001:read'])]}}
  }
  if(a.type==='check'){
    if(!p.flags.includes('observation')||!Number.isInteger(a.index)||a.index<0||a.index>3)return s
    s=versionHistoryPut(s,{checklist:[...new Set([...p.checklist,a.index])]})
    if(versionHistoryReady(s)){
      s=note(s,'NOTE-S05-VERSION-LIMITS','OBSERVED LIMITATION / player inspection of GB-ARTICLE-001 + ARC-IDX-GB-041 metadata / revision NOT VERIFIED',now)
      if(!p.sophieNotified){
        const id='EV-S05-SOPHIE-OPEN',scene=s.prologue!.scene01!
        // Existing Scene 04 thread availability is required; no new contact is forged.
        if(scene.introduced&&scene.privateScene03?.complete){
          s=versionHistoryPut(s,{sophieNotified:true})
          if(!s.deliveredEvents.includes(id))s={...s,deliveredEvents:[...s.deliveredEvents,id],notifications:[...s.notifications,{id,text:'Sophie: Hey. You around?',read:false}],prologue:{...s.prologue!,scene01:{...scene,messages:[...scene.messages,{id,sender:'sophie',text:'Hey. You around?',at:now}]}}}
        }
      }
    }
    return s
  }
  if(a.type==='local'){
    const option=scene05Local[a.id].find(o=>o.id===a.choice)
    if(!option||a.id==='S05-C01'&&!['public','index'].every(f=>p!.flags.includes(f))||a.id==='S05-C02'&&!p.flags.includes('policy')||a.id==='S05-C03'&&!versionHistoryReady(s)||a.id==='S05-C04'&&p.panel!=='form'||a.id==='S05-C11'&&(!versionHistoryReady(s)||!p.localChoices['S05-C03']))return s
    if(a.id==='S05-C04')return p.inquiry.receipt?s:versionHistoryPut(s,{inquiry:{status:'draft',choice:a.choice,text:option.text},feedback:undefined})
    if(a.id==='S05-C11'&&p.complete)return s
    if(a.id==='S05-C02'&&a.choice!=='b')return versionHistoryPut(s,{feedback:option.feedback})
    s=versionHistoryPut(s,{localChoices:{...p.localChoices,[a.id]:a.choice},feedback:option.feedback})
    if(a.id==='S05-C02')s=addFlag(s,'observation')
    if(a.id==='S05-C11'){
      s=note(s,'EV-S05-REVISION-LIMIT-001',`PLAYER_PRIVATE / GB-ARTICLE-001 / ARC-IDX-GB-041 REFERENCE ONLY / NOT VERIFIED / ${option.text}`,now)
      s=versionHistoryPut(s,{complete:true})
      return {...s,chapter1:{...s.chapter1!,completed:[4,5]}}
    }
    return s
  }
  if(a.type==='not-now')return p.inquiry.receipt?s:versionHistoryPut(s,{inquiry:{...p.inquiry,status:p.inquiry.text?'draft':'not_sent'},panel:'home',feedback:'No request sent. You can come back later.'})
  if(a.type==='cancel'&&!p.inquiry.text)return versionHistoryPut(s,{panel:'home',feedback:'No request sent. You can come back later.'})
  if(['review','send-request','save-draft','cancel','request-failed'].includes(a.type)){
    if(p.inquiry.receipt||!p.inquiry.text)return s
    if(a.type==='review')return versionHistoryPut(s,{inquiry:{...p.inquiry,reviewed:true},feedback:'This message will be sent to the corrections desk. It does not contact Nora Vance privately. Sending is not permission to access private records.'})
    if(a.type==='send-request'){
      if(p.panel!=='form'||!p.inquiry.reviewed)return s
      const receipt={id:'R-GB-VH-001' as const,text:p.inquiry.text,at:now}
      s=versionHistoryPut(s,{inquiry:{...p.inquiry,status:'delivered',receipt},panel:'receipt',feedback:'Request delivered to corrections desk.'})
      return {...s,deliveredEvents:[...new Set([...s.deliveredEvents,receipt.id])]}
    }
    return versionHistoryPut(s,{inquiry:{...p.inquiry,status:a.type==='request-failed'?'failed':'draft'},panel:a.type==='request-failed'?'form':'home',feedback:a.type==='request-failed'?'Request not delivered. Your draft is still here.':'Draft saved locally. No message sent.'})
  }
  if(a.type==='next-lead')return p.complete?versionHistoryPut(s,{feedback:'Next lead not yet available'}):s
  return s
}
export function validateVersionHistory(value:unknown):void {
  if(value===undefined)return
  if(!value||typeof value!=='object')throw Error('Invalid Scene 05 state')
  const p=value as VersionHistoryState
  if(p.receipts!==undefined&&(!Array.isArray(p.receipts)||p.receipts.some(r=>!r||typeof r.eventId!=='string'||r.recipient!=='player'||!Array.isArray(r.factIds)||r.factIds.some(f=>typeof f!=='string'))))throw Error('Invalid Scene 05 receipts')
  const strings=(v:unknown)=>Array.isArray(v)&&v.every(x=>typeof x==='string')
  if(p.version!==1||p.entered!==true||typeof p.complete!=='boolean'||!strings(p.flags)||!Array.isArray(p.checklist)||new Set(p.checklist).size!==p.checklist.length||p.checklist.some(i=>!Number.isInteger(i)||i<0||i>3)||!['home','public','index','policy','form','receipt'].includes(p.panel)||!p.scroll||Object.values(p.scroll).some(n=>!Number.isFinite(n)||n<0)||!p.localChoices||Object.entries(p.localChoices).some(([id,choice])=>!scene05Local[id as keyof typeof scene05Local]?.some(o=>o.id===choice))||typeof p.sophieNotified!=='boolean'||!p.inquiry||!['not_sent','draft','delivered','failed'].includes(p.inquiry.status)||p.inquiry.text!==undefined&&!scene05Local['S05-C04'].some(o=>o.id===p.inquiry.choice&&o.text===p.inquiry.text)||p.inquiry.reviewed!==undefined&&typeof p.inquiry.reviewed!=='boolean'||p.inquiry.status==='delivered'&&(!p.inquiry.receipt||p.inquiry.receipt.id!=='R-GB-VH-001'||p.inquiry.receipt.text!==p.inquiry.text||!Number.isFinite(p.inquiry.receipt.at))||p.inquiry.status!=='delivered'&&p.inquiry.receipt!==undefined||p.reading!==undefined&&!['sophie','group'].includes(p.reading)||!p.threads||Object.entries(p.threads).some(([thread,c])=>!['sophie','group'].includes(thread)||!scene05Nodes[c.nodeId]||c.paused&&(!scene05Nodes[c.paused.id]||!Number.isFinite(c.paused.remainingMs)||c.paused.remainingMs<0||typeof c.paused.typing!=='boolean')||c.draft&&(scene05Nodes[c.draft.nodeId]?.kind!=='choice'||!(scene05Nodes[c.draft.nodeId] as Extract<Scene01Node,{kind:'choice'}>).choices.some(o=>o.id===c.draft!.choiceId)))||p.complete&&(!p.localChoices['S05-C11']||p.checklist.length!==4||!['public','index','policy','observation'].every(f=>p.flags.includes(f))))throw Error('Invalid Scene 05 state')
}
