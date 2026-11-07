import { describe, expect, it } from 'vitest'
import { callTurns, legacyCallTurns } from '../content/masterScene07'
import { ver1CallTurns } from '../content/masterScene07Ver1'
import { masterScene07Action as act } from './masterScene07'
import { newGame, type GameSave } from './types'
function ready():GameSave {return {...newGame(),masterScene06:{version:1,beat:10,messages:[],recovered:true,inspected:[],order:[],uncertainty:true,syncAcknowledged:true,gapAcknowledged:true,saved:true,reportReviewed:true,reportSent:true,complete:true},masterScene05:{version:1,beat:10,messages:[],packageStatus:'installed',inspected:true,risksRead:true,opened:true,selected:true,recovered:true,read:[],saved:[],complete:true},deliveredEvents:['TA-S06-SOPHIE-EXPORT','TA-S06-REPORT-SENT','TA-S06-COMPLETE']}}
describe('Scene 7 voice call',()=>{
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
  s=act(s,{type:'open'});s=act(s,{type:'metadata'});s=act(s,{type:'entry'});s=act(s,{type:'star'});s=act(s,{type:'import'});s=act(s,{type:'analyse'});s=act(s,{type:'hypothesis',index:1});expect(s.evidence['TA-EX-STARRED-ENTRY']).toBeUndefined();s=act(s,{type:'save'});expect(s.evidence['TA-EX-STARRED-ENTRY'].verified).toBe(false)
  s=act(s,{type:'decline-share'});s=act(s,{type:'finish'});expect(s.deliveredEvents).toContain('TA-S07-SCENE08-UNLOCKED');expect(s.masterScene07?.phase).toBe('complete');expect(act(s,{type:'finish'})).toBe(s)
 })
})
