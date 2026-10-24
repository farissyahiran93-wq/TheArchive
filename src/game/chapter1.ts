import { publicStoryPut, publicStoryHas, validatePublicStory, type PublicStoryState } from './scene04'
import { chapter1Options, chapter1Record, chapter1Records, chapter1Replies } from '../content/chapter1Investigation'
import type { CharacterId, GameSave, Message } from './types'

export interface Chapter1State {
  publicStory?:PublicStoryState;
  version:1; completed:number[]; inspected:string[]; flags:string[];
  drafts:Record<string,string>; interpretations:Record<string,string>;
  record?:string; panel:'hub'|'record'|'compare'|'board'; chapterComplete:boolean;
  sender:{messages:{id:string;sender:string;text:string;at:number}[];seen:boolean;branch?:string;disclosed:boolean;blocked?:boolean};
}
export type Chapter1Action = {type:'tick'} | {type:'inspect';id:string} | {type:'save-record';id:string}
  | {type:'choice-draft';key:string;id:string}
  | {type:'draft';key:string;id:string} | {type:'send';key:string} | {type:'interpret';key:string;id:string}
  | {type:'panel';panel:Chapter1State['panel']} | {type:'step';id:string} | {type:'advance'} | {type:'read-sender'} | {type:'block-sender'} | {type:'read-contact';id:string}

export const chapter1Active=(s:GameSave)=>s.narrativePlan==='ch01-master-18'&&!s.chapter2Access&&(!s.prologue||!!s.prologue.scene01)&&!s.e01
const unique=<T,>(items:T[],item:T)=>items.includes(item)?items:[...items,item]
const put=(s:GameSave,c:Chapter1State):GameSave=>({...s,chapter1:c})
export function ensureChapter1(s:GameSave):GameSave {
  if(!chapter1Active(s)||s.chapter1)return s
  return put(s,{version:1,completed:[],inspected:[],flags:[],drafts:{},interpretations:{},panel:'hub',chapterComplete:false,sender:{messages:[],seen:false,disclosed:false}})
}
export function chapter1Current(s:GameSave):number {
  const first=s.prologue?.scene01
  if(first?.invitation!=='joined')return 1
  if(!first.groupComplete)return 2
  if(!first.privateScene03?.complete)return 3
  return Array.from({length:15},(_,i)=>i+4).find(n=>!s.chapter1?.completed.includes(n))??18
}
export const chapter1Lifecycle=(s:GameSave)=>s.chapter1?.publicStory?(publicStoryHas(s,'index-acknowledged')?'investigation_active':publicStoryHas(s,'index-available')?'first_record_available':'installed_dormant'):s.chapter1?.flags.includes('first-record')?s.chapter1.inspected.includes('CH1-FIRST')?'investigation_active':'first_record_available':'installed_dormant'
export function chapter1Available(s:GameSave) {
  const n=chapter1Current(s),c=s.chapter1??ensureChapter1(s).chapter1
  if(!c||n<4||s.prologue?.scene01?.scriptRevision&&!c.completed.includes(4))return []
  return chapter1Records.filter(r=>r.scene<=n&&(r.id!=='CH1-FIRST'||c.flags.includes('first-record'))&&(r.scene!==10||c.flags.includes('snapshot-consent'))&&(r.id!=='CH1-NORA-PAGE'||c.flags.includes('heard:CH1-NORA-PAGE-REPLY')))
}
const flag=(s:GameSave,id:string)=>put(s,{...s.chapter1!,flags:unique(s.chapter1!.flags,id)})
function event(s:GameSave,id:string):GameSave{return {...s,deliveredEvents:unique(s.deliveredEvents,id)}}
function queue(s:GameSave,id:string,now:number):GameSave {
  if(s.deliveredEvents.includes(id)||s.pendingEvents.some(e=>e.id===id))return s
  const delays:Record<string,number>={unknown:1800,sophie:1700,nora:2200,eli:2600,maya:2100,lucas:1900}
  return {...s,pendingEvents:[...s.pendingEvents,{id,dueAt:now+(delays[chapter1Replies[id]?.actor]??1800)}]}
}
function fact(s:GameSave,id:string,recipient:CharacterId|'player'='player'):GameSave {
  return {...s,knowledge:recipient==='player'?{...s.knowledge,player:unique(s.knowledge.player,id)}:{...s.knowledge,characters:{...s.knowledge.characters,[recipient]:unique(s.knowledge.characters[recipient],id)}}}
}
function message(s:GameSave,id:string,actor:string,text:string,now:number,recipient?:CharacterId|'unknown'):GameSave {
  if(s.deliveredEvents.includes(id))return s
  s=event(s,id)
  if(actor==='unknown')return put(s,{...s.chapter1!,sender:{...s.chapter1!.sender,messages:[...s.chapter1!.sender.messages,{id,sender:actor,text,at:now}]}})
  if(recipient==='unknown')return put(s,{...s.chapter1!,sender:{...s.chapter1!.sender,messages:[...s.chapter1!.sender.messages,{id,sender:'player',text,at:now}]}})
  if(actor==='sophie'||recipient==='sophie') {
    const scene=s.prologue?.scene01
    if(!scene)return s
    return {...s,prologue:{...s.prologue!,scene01:{...scene,messages:[...scene.messages,{id,sender:actor==='sophie'?'sophie':'player',text,at:now}]}}}
  }
  const line:Message={id,sender:actor as CharacterId|'player',recipient,text,at:now,delivery:'delivered'}
  return {...s,messages:[...s.messages,line]}
}
const inspected=(s:GameSave,id:string)=>s.chapter1?.inspected.includes(id)??false
export function chapter1Gate(s:GameSave):{label:string;done:boolean}[] {
  const c=s.chapter1,n=chapter1Current(s),has=(f:string)=>c?.flags.includes(f)??false
  const q=(label:string,done:boolean)=>({label,done})
  switch(n){
    case 1:return [q('Complete Sophie’s first contact and choose JOIN GROUP',false)]
    case 2:return [q('Resolve all authored group choices and Lucas’s departure',false)]
    case 3:return [q('Open Sophie manually and complete her private conversation',false)]
    case 4:if(c?.publicStory)return [q('Inspect the public article manually',publicStoryHas(s,'article-inspected')),q('Open and acknowledge the recovered index',publicStoryHas(s,'index-acknowledged')),q("Finish Sophie’s final conversation",c.publicStory.complete)];return [q('Read the public report',inspected(s,'CH1-PUBLIC')),q('Activate and inspect the limited recovered reference',inspected(s,'CH1-FIRST'))]
    case 5:return [q('Inspect the earlier recovered layer',inspected(s,'CH1-OLDER')),q('Inspect and save the comparison',has('comparison-saved'))]
    case 6:return [q('Examine the changed Escort field',has('field-context')),q('Record an interpretation without claiming proof',!!c?.interpretations.missing)]
    case 7:return [q('Contact Nora through the public reporting route and receive her reply',has('heard:CH1-NORA-INTRO'))]
    case 8:return [q('Request and view Nora’s retained page',inspected(s,'CH1-NORA-PAGE')),q('Compare its limitations with the other copies',has('page-compared'))]
    case 9:return [q('Inspect the provenance gaps',inspected(s,'CH1-PROVENANCE')),q('Acknowledge that source and sender are different questions',has('provenance-ack'))]
    case 10:return [q('Authorize this limited read-only snapshot',has('snapshot-consent')),q('Inspect the ordinary core fragment',inspected(s,'CH1-LIFE'))]
    case 11:return [q('Inspect both the index and its ordinary context record',inspected(s,'CH1-INDEX')&&inspected(s,'CH1-INDEX-NOTE')),q('Record the displayed 14/13 count discrepancy',has('index-counted'))]
    case 12:return [q('Hear the authorized technical warning or read the no-sharing alternative',has('heard:CH1-ELI-WARNING')||has('technical-fallback')),q('Acknowledge the limits',has('technical-ack'))]
    case 13:return [q('Choose how to approach Maya and hear her perspective',has('heard:CH1-MAYA-CONTEXT'))]
    case 14:return [q('Contact Lucas and respect his answer or boundary',has('heard:CH1-LUCAS-CONTEXT'))]
    case 15:return [q('Inspect the recovered statement',inspected(s,'CH1-CLAIM')),q('Examine “after verification”',has('claim-phrase')),q('Classify it as an unverified recovered claim',has('claim-classified'))]
    case 16:return [q('Send a scoped request through an established contact',has('original-requested'))]
    case 17:return [q('Classify all four findings by what they support',has('board-classified')),q('Save a limited conclusion',has('summary-saved'))]
    case 18:return [q('Inspect the active-role trace',inspected(s,'CH1-ROLE')),q('Choose a reaction without identifying the operator',!!c?.interpretations.ending)]
    default:return []
  }
}
function retain(s:GameSave,id:string,source:string,now:number):GameSave {
  if(s.evidence[id])return s
  return {...s,evidence:{...s.evidence,[id]:{id,source,collectedAt:now,verified:false}}}
}
export function chapter1OptionsFor(s:GameSave,key:string) {
  const c=s.chapter1,n=chapter1Current(s),has=(f:string)=>c?.flags.includes(f)
  if(!c||!chapter1Active(s))return []
  if(key==='sender04')return publicStoryHas(s,'sender-hint')&&c.sender.seen&&!c.sender.blocked&&!c.publicStory?.senderReply?[{id:'version',text:'What version?'},{id:'identity',text:'Who are you?'},{id:'proof',text:'How would you know?'},{id:'boundary',text:'Stop messaging me.'},{id:'ignored',text:'KEEP SILENT'}]:[]
  if(key==='sender')return c.sender.seen&&!c.sender.branch&&!c.sender.blocked?(s.prologue?.scene01?.scriptRevision?[{id:'who',text:'Who is this?'},{id:'her',text:'Who do you mean by “her”?'},{id:'number',text:'How did you get my number?'},{id:'boundary',text: "Don't contact me again."},{id:'ignore',text: "DON’T REPLY"}]:chapter1Options.sender):[]
  if(key==='disclose')return !s.prologue?.scene01?.scriptRevision&&n>=3&&!c.chapterComplete&&c.sender.seen&&!c.sender.disclosed?chapter1Options.disclose:[]
  if(key==='nora')return n===7&&!has('sent:nora')?chapter1Options.nora:[]
  if(key==='page')return n===8&&!has('sent:page')?chapter1Options.page:[]
  if(key==='eli-intro')return n===12&&!has('sent:eli-intro')?[{id:'introduce',text:'Sophie, could you put me in touch with Eli for a general recovery question?'}]:[]
  if(key==='eli')return n===12&&has('heard:CH1-ELI-INTRO')&&!has('sent:eli')?chapter1Options.eli:[]
  if(key==='maya')return n===13&&!has('sent:maya')?chapter1Options.maya:[]
  if(key==='lucas')return n===14&&!has('sent:lucas')?chapter1Options.lucas:[]
  if(key==='original')return n===16&&!has('original-requested')?(['nora','maya','lucas'] as const).filter(a=>has(`heard:CH1-${a.toUpperCase()}-${a==='nora'?'INTRO':'CONTEXT'}`)).map(a=>({id:a,text:`${a[0].toUpperCase()+a.slice(1)}, can you provide the earliest copy of the public linked record? I am not attaching private recovered files.`})):[]
  return []
}
export function chapter1NextDue(s:GameSave) {
  return (chapter1Active(s)||!!s.chapter1&&!!s.chapter2Access)?Math.min(...s.pendingEvents.filter(e=>e.id.startsWith('CH1-')).map(e=>e.dueAt)):Infinity
}
export function chapter1Action(input:GameSave,a:Chapter1Action,now=Date.now()):GameSave {
  if(!chapter1Active(input)&&!(input.chapter1&&input.chapter2Access&&['tick','read-contact','read-sender'].includes(a.type)))return input
  let s=ensureChapter1(input),c=s.chapter1!,n=chapter1Current(s)
  if(a.type==='tick'){
    if(s.prologue?.scene01?.scriptRevision&&s.prologue.scene01.privateScene03?.complete&&!publicStoryHas(s,'lead-scheduled')){
      s=publicStoryPut(s,{flags:['lead-scheduled']})
      s={...s,pendingEvents:[...s.pendingEvents,{id:'CH1-S04-LEAD',dueAt:now+8000}]}
    }
    // A stable pause after Lucas's first confrontation; the pending group choice stays untouched.
    if(!s.prologue?.scene01?.scriptRevision&&!s.prologue?.scene01?.privateScene03?.complete&&s.prologue?.scene01?.groupMessages.some(m=>m.text==="Then maybe our new guest would like to explain why they're here."))s=queue(s,'CH1-SENDER-FIRST',now)
    const due=s.pendingEvents.filter(e=>e.id.startsWith('CH1-')&&e.dueAt<=now).sort((a,b)=>a.dueAt-b.dueAt||a.id.localeCompare(b.id))[0]
    if(!due)return s
    s={...s,pendingEvents:s.pendingEvents.filter(e=>e.id!==due.id)}
    const reply=chapter1Replies[due.id]
    if(!reply)return s
    s=message(s,due.id,reply.actor,reply.text,now)
    if(due.id==='CH1-S04-LEAD')s=event(s,'scene04_public_article_lead')
    if(due.id==='CH1-S04-FOLLOWUP')s=event(s,'scene04_sophie_followup')
    s=flag(s,'heard:'+due.id)
    s=fact(s,due.id+':reported')
    return {...s,notifications:[...s.notifications,{id:due.id,text:reply.text,read:false}]}
  }
  if(a.type==='read-contact'){
    const ids=new Set(a.id==='unknown'?c.sender.messages.map(m=>m.id):s.messages.filter(m=>m.id.startsWith('CH1-')&&m.sender===a.id).map(m=>m.id))
    if(!s.notifications.some(e=>ids.has(e.id)&&!e.read))return s
    return {...s,notifications:s.notifications.map(e=>ids.has(e.id)?{...e,read:true}:e),messages:s.messages.map(m=>ids.has(m.id)?{...m,delivery:'read'}:m)}
  }
  if(a.type==='block-sender')return c.sender.messages.length?put(s,{...c,sender:{...c.sender,blocked:true}}):s
  if(a.type==='read-sender'&&!c.sender.messages.length)return s
  if(a.type==='read-sender')return put({...s,notifications:s.notifications.map(e=>e.id.startsWith('CH1-SENDER')?{...e,read:true}:e)},{...c,sender:{...c.sender,seen:true}})
  if(a.type==='panel')return put(s,{...c,panel:a.panel})
  if(a.type==='choice-draft'){
    const choices:Record<string,{scene:number;values:string[]}>={missing:{scene:6,values:['accidental','deliberate','insufficient']},index:{scene:11,values:['14-13','13-14','equal']},claim:{scene:15,values:['unverified','proof','identity']},ending:{scene:18,values:['preserve','question','cautious','pause']}}
    const choice=choices[a.key]
    return choice?.scene===n&&choice.values.includes(a.id)?put(s,{...c,drafts:{...c.drafts,['interpret:'+a.key]:a.id}}):s
  }
  if(a.type==='inspect'){
    if(!chapter1Available(s).some(r=>r.id===a.id))return s
    s=put(s,{...c,record:a.id,panel:'record',inspected:unique(c.inspected,a.id)})
    return fact(s,`${a.id}:viewed`)
  }
  if(a.type==='save-record'){
    const r=chapter1Record(a.id)
    return r&&inspected(s,a.id)?retain(s,r.id,`${r.kind}: ${r.source}; ${r.provenance}`,now):s
  }
  if(a.type==='draft'&&a.key.startsWith('board-'))return chapter1BoardDraft(s,a.key,a.id)
  if(a.type==='draft')return chapter1OptionsFor(s,a.key).some(o=>o.id===a.id)?put(s,{...c,drafts:{...c.drafts,[a.key]:a.id}}):s
  if(a.type==='send'){
    const id=c.drafts[a.key],option=chapter1OptionsFor(s,a.key).find(o=>o.id===id)
    if(!option)return s
    if(a.key==='sender04'&&id==='ignored')return publicStoryPut(s,{senderReply:id})
    if(a.key==='sender04'){s=message(s,'OPEN-S04-UNKNOWN-01-PLAYER-'+id,'player',option.text,now,'unknown');return publicStoryPut(s,{senderReply:id})}
    if(a.key==='sender'&&id==='ignore')return put(s,{...c,sender:{...c.sender,branch:id}})
    const actor=a.key==='sender'?'unknown':a.key==='disclose'||a.key==='eli-intro'?'sophie':a.key==='page'?'nora':a.key==='original'?id:a.key
    if(a.key==='eli'&&id==='decline')return flag(flag(s,'technical-fallback'),'sent:eli')
    s=message(s,`CH1-PLAYER-${a.key}`, 'player',option.text,now,actor as CharacterId|'unknown')
    s=flag(s,'sent:'+a.key)
    if(a.key==='sender')return put(s,{...s.chapter1!,sender:{...s.chapter1!.sender,branch:id}})
    if(a.key==='disclose'){
      s=put(s,{...s.chapter1!,sender:{...s.chapter1!.sender,disclosed:true}})
      return queue(fact(s,'CH1-SENDER-WARNING-DISCLOSED','sophie'),'CH1-SENDER-SOPHIE',now)
    }
    if(a.key==='original')return queue(flag(s,'original-requested'),`CH1-${id.toUpperCase()}-REQUEST`,now)
    const replies:Record<string,string>={nora:'CH1-NORA-INTRO',page:'CH1-NORA-PAGE-REPLY','eli-intro':'CH1-ELI-INTRO',eli:'CH1-ELI-WARNING',maya:'CH1-MAYA-CONTEXT',lucas:'CH1-LUCAS-CONTEXT'}
    return queue(s,replies[a.key],now)
  }
  if(a.type==='interpret'){
    const valid:Record<string,{scene:number;choices:string[];requires:boolean}>={
      missing:{scene:6,choices:['accidental','deliberate','insufficient'],requires:c.flags.includes('field-context')},
      ending:{scene:18,choices:['preserve','question','cautious','pause'],requires:inspected(s,'CH1-ROLE')},
      index:{scene:11,choices:['14-13'],requires:inspected(s,'CH1-INDEX')&&inspected(s,'CH1-INDEX-NOTE')},
      claim:{scene:15,choices:['unverified'],requires:inspected(s,'CH1-CLAIM')&&c.flags.includes('claim-phrase')},
    }
    const v=valid[a.key]
    if(!v||v.scene!==n||!v.requires||!v.choices.includes(a.id))return s
    s=put(s,{...c,interpretations:{...c.interpretations,[a.key]:a.id}})
    if(a.key==='index')return retain(flag(s,'index-counted'),'CH1-COUNT-OBS','OBSERVED displayed 14/13; recovered source unverified; no deletion conclusion',now)
    if(a.key==='claim')return flag(s,'claim-classified')
    return s
  }
  if(a.type==='step'){
    const conditions:Record<string,boolean>={
      'first-record':n===4&&inspected(s,'CH1-PUBLIC'),
      'comparison-saved':n===5&&c.panel==='compare'&&inspected(s,'CH1-PUBLIC')&&inspected(s,'CH1-OLDER'),
      'field-context':n===6&&c.flags.includes('comparison-saved'),
      'page-compared':n===8&&c.panel==='compare'&&inspected(s,'CH1-NORA-PAGE')&&inspected(s,'CH1-OLDER'),
      'provenance-ack':n===9&&inspected(s,'CH1-PROVENANCE'),
      'snapshot-consent':n===10,
      'technical-ack':n===12&&(c.flags.includes('heard:CH1-ELI-WARNING')||c.flags.includes('technical-fallback')),
      'claim-phrase':n===15&&inspected(s,'CH1-CLAIM'),
      'board-classified':n===17&&c.drafts['board-diff']==='observed'&&c.drafts['board-claim']==='reported'&&c.drafts['board-source']==='unknown'&&c.drafts['board-theory']==='interpretation',
      'summary-saved':n===17&&c.flags.includes('board-classified'),
    }
    if(!conditions[a.id])return s
    s=flag(s,a.id)
    if(a.id==='comparison-saved')return retain(s,'CH1-DIFF-OBS','OBSERVED linked Escort field differs; source provenance unresolved',now)
    if(a.id==='summary-saved')return retain(s,'CH1-SUMMARY','Observed versions/counts differ; sources, actor, motive and original status remain unproven',now)
    return s
  }
  if(a.type==='advance'){
    if(n<4||c.chapterComplete||!chapter1Gate(s).every(g=>g.done))return s
    s=event(put(s,{...c,completed:unique(c.completed,n),panel:'hub',record:undefined,chapterComplete:n===18}),`CH1-S${n}-COMPLETE`)
    return n===18?{...event(s,'CH1-COMPLETE'),unlockedEpisodes:unique(s.unlockedEpisodes,'chapter2')}:s
  }
  return s
}

/** Saved board selections are drafts; interpretation is committed only by its explicit action. */
export function chapter1BoardDraft(s:GameSave,key:string,id:string):GameSave {
  if(!chapter1Active(s)||chapter1Current(s)!==17||!['board-diff','board-claim','board-source','board-theory'].includes(key)||!['observed','reported','unknown','interpretation'].includes(id))return s
  s=ensureChapter1(s);return put(s,{...s.chapter1!,drafts:{...s.chapter1!.drafts,[key]:id}})
}
export function validateChapter1(value:unknown):void {
  if(value===undefined)return
  if(!value||typeof value!=='object')throw Error('Invalid Chapter 1 state')
  const c=value as Chapter1State
  validatePublicStory(c.publicStory)
  const strings=(v:unknown):v is string[]=>Array.isArray(v)&&v.every(x=>typeof x==='string')
  const map=(v:unknown)=>!!v&&typeof v==='object'&&!Array.isArray(v)&&Object.values(v).every(x=>typeof x==='string')
  if(c.version!==1||!Array.isArray(c.completed)||c.completed.some((n,i)=>n!==i+4)||c.completed.length>15||!strings(c.inspected)||c.inspected.some(id=>!chapter1Record(id))||!strings(c.flags)||!map(c.drafts)||!map(c.interpretations)||!['hub','record','compare','board'].includes(c.panel)||typeof c.chapterComplete!=='boolean'||c.chapterComplete!==(c.completed.length===15)||!c.sender||!Array.isArray(c.sender.messages)||c.sender.messages.some(m=>!m||typeof m.id!=='string'||!['unknown','player'].includes(m.sender)||typeof m.text!=='string'||!Number.isFinite(m.at))||typeof c.sender.seen!=='boolean'||typeof c.sender.disclosed!=='boolean'||c.sender.blocked!==undefined&&typeof c.sender.blocked!=='boolean'||c.sender.branch!==undefined&&![...chapter1Options.sender.map(o=>o.id),'who','her','number','boundary'].includes(c.sender.branch)||c.record!==undefined&&!chapter1Record(c.record))throw Error('Invalid Chapter 1 state')
  const maxScene=Math.min(18,c.completed.length+4)
  if(c.inspected.some(id=>chapter1Record(id)!.scene>maxScene)||c.record&&chapter1Record(c.record)!.scene>maxScene||c.inspected.includes('CH1-FIRST')&&!c.flags.includes('first-record')||c.inspected.includes('CH1-LIFE')&&!c.flags.includes('snapshot-consent')||c.inspected.includes('CH1-NORA-PAGE')&&!c.flags.includes('heard:CH1-NORA-PAGE-REPLY'))throw Error('Invalid Chapter 1 source availability')
}
