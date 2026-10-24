import type { GameSave } from './types'
import type { Scene01Node } from '../content/scene01'
import { scene04Article, scene04Notices } from '../content/scene04Final'

export interface PublicStoryState {
  version:1; flags:string[]; started:boolean; complete:boolean; panel:'home'|'article'|'index'; scroll:number;
  tooltip?:'byline'|'updated'; feedback?:string; reading?:'sophie'|'group'; senderReply?:string;
  paused?:{id:string;remainingMs:number;typing:boolean};
  parked?:{nodeId:string;paused?:{id:string;remainingMs:number;typing:boolean}};
  groupCheckpoint?:{nodeId:string;paused?:{id:string;remainingMs:number;typing:boolean}};
}
export const publicStoryInitial=():PublicStoryState=>({version:1,flags:[],started:false,complete:false,panel:'home',scroll:0})
export const publicStoryHas=(s:GameSave,id:string)=>!!s.chapter1?.publicStory?.flags.includes(id)
export function publicStoryPut(s:GameSave,patch:Partial<PublicStoryState>):GameSave {
  return s.chapter1?{...s,chapter1:{...s.chapter1,publicStory:{...s.chapter1.publicStory??publicStoryInitial(),...patch}}}:s
}
export function publicStoryFlag(s:GameSave,id:string):GameSave {
  return publicStoryHas(s,id)?s:publicStoryPut(s,{flags:[...s.chapter1?.publicStory?.flags??[],id]})
}
export function publicStorySave(s:GameSave,kind:'public'|'index',now:number):GameSave {
  const id=kind==='public'?'EV-PUBLIC-GB-001':'EV-INDEX-GB-041'
  if(s.evidence[id])return s
  return {...s,evidence:{...s.evidence,[id]:{id,source:kind==='public'?`${scene04Article.publisher} / ${scene04Article.byline} / GB-ARTICLE-001 / public published copy; claims not independently verified`:'ARC-IDX-GB-041 / recovered snapshot INDEX / source UNKNOWN / capture time and author NOT ESTABLISHED / verified original NO',collectedAt:now,verified:false}}}
}
/** Reuse the existing event ledger, message arrays and per-recipient receipt stores. */
export function publicStoryEvent(s:GameSave,node:Extract<Scene01Node,{kind:'event'}>,now:number):GameSave {
  if(node.event==='s04-feedback')return publicStoryPut(s,{feedback:node.text})
  if(node.event==='s04-group-notice'){
    const {id,text}=scene04Notices.group
    s=publicStoryFlag(s,'group-notice')
    if(s.deliveredEvents.includes(id))return s
    return {...s,deliveredEvents:[...s.deliveredEvents,id],prologue:{...s.prologue!,scene01:{...s.prologue!.scene01!,groupPresence:{sophie:true,maya:true,lucas:false},groupMessages:[...s.prologue!.scene01!.groupMessages,{id,sender:'maya',text,at:now}] }},notifications:[...s.notifications,{id,text:'FIND DANIEL · Maya: '+text,read:false}]}
  }
  if(node.event==='s04-index-available'){
    s=publicStoryFlag(s,'index-available')
    const {id,text:archiveText}=scene04Notices.archive
    if(!s.deliveredEvents.includes(id))s={...s,deliveredEvents:[...s.deliveredEvents,id],notifications:[...s.notifications,{id,text:archiveText,read:false}]}
    const {id:sender,text}=scene04Notices.sender
    if(!s.deliveredEvents.includes(sender)){
      s={...s,deliveredEvents:[...s.deliveredEvents,sender]}
      if(!s.chapter1!.sender.blocked){
        s=publicStoryFlag(s,'sender-hint')
        s={...s,chapter1:{...s.chapter1!,sender:{...s.chapter1!.sender,messages:[...s.chapter1!.sender.messages,{id:sender,sender:'unknown',text,at:now}]}},notifications:[...s.notifications,{id:sender,text,read:false}]}
      }
    }
    return {...publicStoryPut(s,{reading:undefined}),prologue:{...s.prologue!,scene01:{...s.prologue!.scene01!,groupPresence:{sophie:false,maya:true,lucas:false}}}}
  }
  if(node.event==='s04-complete'){
    if(!publicStoryHas(s,'article-inspected')||!publicStoryHas(s,'index-acknowledged'))return s
    return publicStoryPut(publicStoryFlag(s,'version-history-available'),{complete:true,reading:undefined})
  }
  return s
}

export function validatePublicStory(v:unknown):void {
  if(v===undefined)return
  if(!v||typeof v!=='object')throw Error('Invalid Scene 04 progress')
  const p=v as PublicStoryState
  const checkpoint=(c:PublicStoryState['paused'])=>!c||typeof c.id==='string'&&c.id.startsWith('OPEN-S04-')&&Number.isFinite(c.remainingMs)&&c.remainingMs>=0&&typeof c.typing==='boolean'
  if(p.version!==1||!Array.isArray(p.flags)||p.flags.some(f=>typeof f!=='string')||typeof p.started!=='boolean'||typeof p.complete!=='boolean'||!['home','article','index'].includes(p.panel)||!Number.isFinite(p.scroll)||p.scroll<0||p.tooltip!==undefined&&!['byline','updated'].includes(p.tooltip)||p.reading!==undefined&&!['sophie','group'].includes(p.reading)||p.feedback!==undefined&&typeof p.feedback!=='string'||p.senderReply!==undefined&&!['version','identity','proof','boundary','ignored'].includes(p.senderReply)||!checkpoint(p.paused)||p.parked!==undefined&&(typeof p.parked.nodeId!=='string'||!p.parked.nodeId.startsWith('OPEN-S04-')||!checkpoint(p.parked.paused))||p.groupCheckpoint!==undefined&&(typeof p.groupCheckpoint.nodeId!=='string'||!p.groupCheckpoint.nodeId.startsWith('OPEN-S04-')||!checkpoint(p.groupCheckpoint.paused))||p.complete&&(!p.flags.includes('article-inspected')||!p.flags.includes('index-acknowledged')))throw Error('Invalid Scene 04 progress')
}
