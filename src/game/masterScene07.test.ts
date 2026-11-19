import { describe, expect, it } from 'vitest'
import { callTurns, legacyCallTurns } from '../content/masterScene07'
import { ver1CallTurns } from '../content/masterScene07Ver1'
import { masterScene07Action as act, validateMasterScene07 } from './masterScene07'
import { newGame, type GameSave } from './types'
import { beginScene01 } from './scene01'
import { selectMasterCaseFile } from './masterCaseFile'
import { masterRecoveryUnits } from './masterScene05'
const drainPrivacy=(save:GameSave):GameSave=>{while(save.masterScene07?.privacy?.pending)save=act(save,{type:'tick'},save.masterScene07.privacy.pending.dueAt);return save}
const finishPrivacy=(save:GameSave,index=0):GameSave=>{save=drainPrivacy(save);save=act(save,{type:'privacy-draft',index});return drainPrivacy(act(save,{type:'privacy-send'}))}
function ready():GameSave {return {...newGame(),masterScene06:{version:1,beat:10,messages:[],recovered:true,inspected:[],order:[],uncertainty:true,syncAcknowledged:true,gapAcknowledged:true,saved:true,reportReviewed:true,reportSent:true,complete:true},masterScene05:{version:1,beat:10,messages:[],packageStatus:'installed',inspected:true,risksRead:true,opened:true,selected:true,recovered:true,read:[],saved:[],complete:true},deliveredEvents:['TA-S06-SOPHIE-EXPORT','TA-S06-REPORT-SENT','TA-S06-COMPLETE']}}
describe('Scene 7 voice call',()=>{
 it('records a limited statement comparison without turning it into authenticated evidence',()=>{
  let s=act(act(ready(),{type:'start'}),{type:'answer'})
  for(let i=0;i<10;i++){s=act(s,{type:'clip-ended'});s=act(s,{type:'draft',index:0});s=act(s,{type:'send'})}
  s=act(s,{type:'clip-ended'})
  const record={type:'record-assessment',id:'remark-unreadable'} as const
  expect(act(s,record)).toBe(s)
  s=act(s,{type:'open'});expect(act(s,{type:'finish'})).toBe(s)
  s=act(s,record,42000)
  expect(s.evidence['TA-EX-STARRED-ENTRY']).toMatchObject({verified:false,collectedAt:42000})
  expect(s.masterScene07?.transferred).toBeUndefined()
  expect(selectMasterCaseFile(s)!.nodes.some(n=>n.id==='TA-EX-STARRED-ENTRY')).toBe(false)
  expect(act(s,record,43000)).toBe(s)
  expect(s.deliveredEvents).not.toContain('TA-S07-SCENE08-UNLOCKED')
  s=finishPrivacy(s)
  expect(s.masterScene07?.phase).toBe('complete')
  expect(s.deliveredEvents).toContain('TA-S07-SCENE08-UNLOCKED')
  expect(act(s,{type:'finish'})).toBe(s)
  expect(()=>validateMasterScene07(JSON.parse(JSON.stringify(s.masterScene07)))).not.toThrow()
 })
 it('Sophie privately decides for all three responses, with queued idempotent delivery and no group disclosure',()=>{
  for(let option=0;option<3;option++){
   let s=act(act(ready(),{type:'start'}),{type:'answer'})
   for(let i=0;i<10;i++){s=act(s,{type:'clip-ended'});s=act(s,{type:'draft',index:0});s=act(s,{type:'send'})}
   s=act(s,{type:'clip-ended'});s=act(s,{type:'open'});s=act(s,{type:'record-assessment',id:'star-visible'},20000)
   const pending=s.masterScene07!.privacy!.pending!;expect(act(s,{type:'tick'},pending.dueAt-1)).toBe(s)
   s=act(s,{type:'tick'},pending.dueAt);s=JSON.parse(JSON.stringify(s)) as GameSave
   expect(()=>validateMasterScene07(s.masterScene07)).not.toThrow()
   expect(s.masterScene07!.privacy!.messages).toHaveLength(1)
   s=drainPrivacy(s);expect(s.masterScene07!.privacy!.stage).toBe('choice')
   const before=s.messages.length;s=act(s,{type:'privacy-draft',index:option});expect(s.messages).toHaveLength(before)
   s=act(s,{type:'privacy-send'},40000);expect(s.masterScene07!.phase).toBe('attachment')
   expect(act(s,{type:'privacy-send'})).toBe(s)
   s=drainPrivacy(s);expect(s.masterScene07!.phase).toBe('complete')
   expect(s.masterScene07!.privacy!.messages.at(-1)?.text).toBe("If I decide Maya needs to know something, I'll tell her myself.")
   expect(s.messages.some(m=>m.id.startsWith('TA-S07-GROUP-SHARE'))).toBe(false)
   expect(s.deliveredEvents.filter(id=>id==='TA-S07-SCENE08-UNLOCKED')).toHaveLength(1)
  }
 })
 it('never repeats or sends historical player-sharing drafts',()=>{
  const old={...ready(),masterScene07:{version:1 as const,phase:'complete' as const,clip:10,lines:[],questioned:true,opened:true,metadata:false,entry:false,star:false,imported:false,analysis:true,hypothesis:0,saved:true,shareDraft:1,shareReviewed:true,shareSent:false,shareDeclined:false}}
  for(const action of [{type:'share-draft',index:0},{type:'review-share'},{type:'send-share'},{type:'decline-share'}] as const)expect(act(old,action)).toBe(old)
  expect(()=>validateMasterScene07(old.masterScene07)).not.toThrow()
 })
 it('keeps the external export out of TRACE until a single explicit transfer',()=>{
  let s=act(act(ready(),{type:'start'}),{type:'answer'})
  for(let i=0;i<10;i++){s=act(s,{type:'clip-ended'});s=act(s,{type:'draft',index:0});s=act(s,{type:'send'})}
  s=act(s,{type:'clip-ended'})
  expect(act(s,{type:'transfer'})).toBe(s)
  s=act(s,{type:'open'})
  const sources=(save:GameSave)=>selectMasterCaseFile(save)!.nodes.filter(node=>node.id==='TA-EX-STARRED-ENTRY')
  expect(sources(s)).toHaveLength(0)
  const recovery=masterRecoveryUnits(s.masterScene05!)
  const beforeEvents=s.deliveredEvents
  const next=act(s,{type:'transfer'},12345)
  expect(next.masterScene07).toMatchObject({transferred:true,transferredAt:12345})
  expect(sources(next)).toHaveLength(1)
  expect(sources(next)[0].source).toContain('unverified')
  expect(masterRecoveryUnits(next.masterScene05!)).toBe(recovery)
  expect(next.deliveredEvents).toEqual(beforeEvents)
  expect(act(next,{type:'transfer'},23456)).toBe(next)
  const reloaded=JSON.parse(JSON.stringify(next)) as GameSave
  expect(()=>validateMasterScene07(reloaded.masterScene07)).not.toThrow()
  expect(sources(reloaded)).toHaveLength(1)
 })
 it('preserves previously opened legacy exports without implicitly transferring unopened ones',()=>{
  let s=act(act(ready(),{type:'start'}),{type:'answer'})
  for(let i=0;i<10;i++){s=act(s,{type:'clip-ended'});s=act(s,{type:'draft',index:0});s=act(s,{type:'send'})}
  s=act(s,{type:'clip-ended'})
  const old={...s,masterScene07:{...s.masterScene07!,transferRevision:undefined}}
  const oldOpened={...old,masterScene07:{...old.masterScene07,opened:true}}
  expect(selectMasterCaseFile(oldOpened)!.nodes.some(n=>n.id==='TA-EX-STARRED-ENTRY')).toBe(true)
  const opened=act(old,{type:'open'})
  expect(opened.masterScene07?.transferRevision).toBe('manual-v1')
  expect(selectMasterCaseFile(opened)!.nodes.some(n=>n.id==='TA-EX-STARRED-ENTRY')).toBe(false)
 })
 it('persists a single completed call record and leaves player choices in call state',()=>{
  const base=ready(), scene=beginScene01({...base,masterOpening:true,chapter1Edition:'ch01-v2-10'},0).prologue
  let s=act(act({...base,prologue:scene},{type:'start'}),{type:'answer'})
  for(let i=0;i<10;i++){s=act(s,{type:'clip-ended'});s=act(s,{type:'draft',index:i%3});s=act(s,{type:'send'})}
  expect(s.deliveredEvents).not.toContain('TA-S07-CALL-HISTORY')
  s=act(s,{type:'clip-ended'},12345)
  expect(s.prologue?.scene01?.messages.filter(m=>m.id==='TA-S07-CALL-HISTORY')).toHaveLength(1)
  s=JSON.parse(JSON.stringify(s)) as GameSave
  expect(()=>validateMasterScene07(s.masterScene07)).not.toThrow()
  expect(act(s,{type:'clip-ended'})).toBe(s)
  expect(s.prologue?.scene01?.messages.filter(m=>m.id==='TA-S07-CALL-HISTORY')).toHaveLength(1)
  expect(s.masterScene07?.lines.filter(l=>l.sender==='player')).toHaveLength(10)
 })
 it('checkpoints only the active clip and clears its offset at the next decision',()=>{
  let s=act(act(ready(),{type:'start'}),{type:'answer'})
  s=act(s,{type:'playback-checkpoint',clip:0,seconds:7.23})
  expect(s.masterScene07?.playbackSeconds).toBe(7.2)
  expect(act(s,{type:'playback-checkpoint',clip:1,seconds:9})).toBe(s)
  expect(act(s,{type:'playback-checkpoint',clip:0,seconds:Infinity})).toBe(s)
  s=JSON.parse(JSON.stringify(s)) as GameSave
  expect(()=>validateMasterScene07(s.masterScene07)).not.toThrow()
  s=act(s,{type:'clip-ended'});expect(s.masterScene07).toMatchObject({phase:'waiting',clip:0})
  expect(s.masterScene07?.playbackSeconds).toBeUndefined()
  expect(act(s,{type:'playback-checkpoint',clip:0,seconds:8})).toBe(s)
  s=act(act(s,{type:'draft',index:2}),{type:'send'})
  expect(s.masterScene07).toMatchObject({phase:'playing',clip:1})
  expect(s.masterScene07?.playbackSeconds).toBeUndefined()
 })
 it('honours the deferred export and lets the player request it later',()=>{
  let s=act(act(ready(),{type:'start'}),{type:'answer'})
  for(let i=0;i<10;i++){s=act(s,{type:'clip-ended'});s=act(s,{type:'draft',index:i===9?2:0});s=act(s,{type:'send'})}
  s=act(s,{type:'clip-ended'});expect(s.masterScene07?.exportStatus).toBe('deferred');expect(s.deliveredEvents).not.toContain('TA-S07-EXPORT-RECEIVED');expect(act(s,{type:'open'})).toBe(s)
  s=act(s,{type:'request-export'});expect(s.masterScene07?.exportStatus).toBe('accepted');expect(s.masterScene07?.opened).toBe(false);s=act(s,{type:'open'});expect(s.masterScene07?.opened).toBe(true)
 })
 it('pins existing call drafts to their original graph while new calls use the revised choices',()=>{
  let s=act(act(ready(),{type:'start'}),{type:'answer'})
  for(let n=0;n<2;n++){s=act(s,{type:'clip-ended'});s=act(s,{type:'draft',index:0});s=act(s,{type:'send'})}
  s=act(s,{type:'clip-ended'});s=act(s,{type:'draft',index:1})
  const old={...s,masterScene07:{...s.masterScene07!,conversationRevision:undefined}}
  expect(act(old,{type:'send'}).masterScene07!.lines.at(-1)?.text).toBe(legacyCallTurns[2].choices[1])
  expect(act({...s,masterScene07:{...s.masterScene07!,conversationRevision:'audio-v2'}},{type:'send'}).masterScene07!.lines.at(-1)?.text).toBe(callTurns[2].choices[1])
  expect(act(s,{type:'send'}).masterScene07!.lines.at(-1)?.text).toBe(ver1CallTurns[2].choices[1])
 })
 it('preserves all thirty choices and never advances on selection alone',()=>{
  for(let target=0;target<10;target++)for(let option=0;option<3;option++){
   let s=act(act(ready(),{type:'start'}),{type:'answer'})
   for(let beat=0;beat<=target;beat++){
    s=act(s,{type:'clip-ended'});const before=s.masterScene07!.lines.length,selected=beat===target?option:0
    s=act(s,{type:'draft',index:selected});expect(s.masterScene07!.phase).toBe('waiting');expect(s.masterScene07!.lines).toHaveLength(before)
    s=act(s,{type:'send'});expect(s.masterScene07!.lines.at(-1)?.text).toBe(ver1CallTurns[beat].choices[selected])
   }
  }
 })
 it('requires prior handoff and waits for an explicit response after every clip',()=>{
  const empty=newGame();expect(act(empty,{type:'start'})).toBe(empty)
  let s=act(ready(),{type:'start'});s=act(s,{type:'decline'});expect(s.masterScene07?.phase).toBe('missed');s=act(s,{type:'answer'})
  for(let i=0;i<10;i++){expect(s.masterScene07?.phase).toBe('playing');expect(act(s,{type:'send'})).toBe(s);s=act(s,{type:'clip-ended'});expect(s.masterScene07?.phase).toBe('waiting');expect(s.masterScene07?.lines.at(-1)?.text).toBe(ver1CallTurns[i].sophie);s=act(s,{type:'draft',index:i===9?0:i%3});s=act(s,{type:'send'})}
  s=act(s,{type:'clip-ended'});expect(s.masterScene07?.phase).toBe('attachment');expect(s.masterScene07?.opened).toBe(false)
  s=act(s,{type:'question-draft',index:1});s=act(s,{type:'send-question'});expect(s.masterScene07?.questioned).toBe(true)
  s=act(s,{type:'open'});expect(s.evidence['TA-EX-STARRED-ENTRY']).toBeUndefined();s=act(s,{type:'record-assessment',id:'star-visible'});expect(s.evidence['TA-EX-STARRED-ENTRY'].verified).toBe(false)
  s=finishPrivacy(s);expect(s.deliveredEvents).toContain('TA-S07-SCENE08-UNLOCKED');expect(s.masterScene07?.phase).toBe('complete');expect(act(s,{type:'finish'})).toBe(s)
 })
 it('lets a historical call resume without retaking inspection steps',()=>{
  let s=act(act(ready(),{type:'start'}),{type:'answer'})
  s={...s,masterScene07:{...s.masterScene07!,conversationRevision:'audio-v2'}}
  for(let i=0;i<10;i++){s=act(s,{type:'clip-ended'});s=act(s,{type:'draft',index:0});s=act(s,{type:'send'})}
  s=act(s,{type:'clip-ended'});s=act(s,{type:'open'})
  const save={type:'record-legacy-conclusion',index:1} as const
  expect(act(s,save)).toBe(s)
  s=act(s,{type:'question-draft',index:0});s=act(s,{type:'send-question'})
  s=act(s,save,42000)
  expect(s.masterScene07).toMatchObject({phase:'complete',metadata:false,entry:false,star:false,imported:false,analysis:false})
  expect(s.evidence['TA-EX-STARRED-ENTRY']).toMatchObject({verified:false,collectedAt:42000})
  expect(()=>validateMasterScene07(JSON.parse(JSON.stringify(s.masterScene07)))).not.toThrow()
  const unfinished={...s,masterScene07:{...s.masterScene07!,phase:'attachment' as const}}
  const resumed=act(unfinished,{type:'finish'},43000)
  expect(resumed.masterScene07?.phase).toBe('complete')
  expect(resumed.evidence['TA-EX-STARRED-ENTRY'].collectedAt).toBe(42000)
 })
})
