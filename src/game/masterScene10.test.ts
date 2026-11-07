import { describe, expect, it } from 'vitest'
import { finaleLast, finaleTurns, finaleWarning } from '../content/masterScene10'
import { masterScene10Action as act } from './masterScene10'
import { newGame, type GameSave } from './types'
import { normalizeSave } from './engine'

function ready():GameSave{return {...newGame(),masterScene09:{complete:true,saved:true} as GameSave['masterScene09'],deliveredEvents:['TA-S09-SCENE10-UNLOCKED']}}
function legacyStart():GameSave{const s=act(ready(),{type:'start'});return {...s,masterScene10:{...s.masterScene10!,media:undefined}}}
describe('Scene 10 finale',()=>{
 it('requires explicit source review, private conclusion, return home and a manual answer',()=>{
  const empty=newGame();expect(act(empty,{type:'start'})).toBe(empty)
  let s=legacyStart();expect(s.masterScene10!.searched).toBe(false)
  s=act(s,{type:'query',value:'GH-DSC-O3-A'});s=act(s,{type:'search'});expect(s.masterScene10!.matched).toBe(false)
  s=act(s,{type:'query',value:'GH-DSC-03-A'});expect(s.masterScene10!.matched).toBe(false);s=act(s,{type:'search'})
  expect(act(s,{type:'save'})).toBe(s);s=act(s,{type:'metadata'});s=act(s,{type:'limitations'});s=act(s,{type:'compare'});s=act(s,{type:'conclusion',index:1});expect(s.masterScene10!.saved).toBe(false);s=act(s,{type:'save'})
  expect(s.masterScene10!.phase).toBe('return');expect(s.messages).toHaveLength(0);expect(s.deliveredEvents).not.toContain('TA-CH02-UNLOCKED')
  s=act(s,{type:'home'});expect(s.masterScene10!.phase).toBe('ringing');s=act(s,{type:'decline'});expect(s.masterScene10!.phase).toBe('missed');s=act(s,{type:'answer'})
  for(let i=0;i<8;i++){const n=i%3,count=s.masterScene10!.lines.length;s=act(s,{type:'draft',index:n});expect(s.masterScene10!.lines).toHaveLength(count);s=act(s,{type:'send'});expect(s.masterScene10!.lines.some(x=>x.text===finaleTurns[i].choices[n])).toBe(true)}
  expect(s.masterScene10!.phase).toBe('warning');expect(s.masterScene10!.lines.at(-1)!.text).toBe(finaleWarning);expect(s.deliveredEvents).not.toContain('TA-CH02-UNLOCKED')
  s=act(s,{type:'reveal-final'});expect(s.masterScene10!.lines.at(-1)!.text).toBe(finaleLast);s=act(s,{type:'finish'});expect(s.masterScene10!.phase).toBe('complete');expect(s.deliveredEvents).toContain('TA-CH02-UNLOCKED');expect(act(s,{type:'finish'})).toBe(s)
 })
 it('round-trips valid save state without fabricating notifications or early progression',()=>{
  const s=act(ready(),{type:'start'});const onlyScene={...newGame(),masterScene10:s.masterScene10};expect(normalizeSave(JSON.parse(JSON.stringify(onlyScene))).masterScene10).toEqual(s.masterScene10)
 })
 it('delivers the matching Sophie response for every choice without sending drafts',()=>{
  for(let beat=0;beat<8;beat++)for(let option=0;option<3;option++){
   let s=legacyStart();s=act(s,{type:'query',value:'GH-DSC-03-A'});s=act(s,{type:'search'});s=act(s,{type:'metadata'});s=act(s,{type:'limitations'});s=act(s,{type:'compare'});s=act(s,{type:'conclusion',index:0});s=act(s,{type:'save'});s=act(s,{type:'home'});s=act(s,{type:'answer'})
   for(let n=0;n<=beat;n++){const choice=n===beat?option:0,before=s.messages.length;s=act(s,{type:'draft',index:choice});expect(s.messages).toHaveLength(before);s=act(s,{type:'send'});expect(s.masterScene10!.lines.some(l=>l.text===finaleTurns[n].replies[choice])).toBe(true)}
  }
 })
 it('waits for each recording, enforces video consent, then finishes without another choice',()=>{
  let s=act(ready(),{type:'start'});s=act(s,{type:'query',value:'GH-DSC-03-A'});s=act(s,{type:'search'});s=act(s,{type:'metadata'});s=act(s,{type:'limitations'});s=act(s,{type:'compare'});s=act(s,{type:'conclusion',index:0});s=act(s,{type:'save'});s=act(s,{type:'home'});s=act(s,{type:'answer'});s=act(s,{type:'media-play'})
  for(let n=0;n<10;n++){
   expect(s.masterScene10!.media!.clip).toBe(n);s=act(s,{type:'media-ended'});expect(s.masterScene10!.media!.stage).toBe('waiting')
   if(n===5){s=act(s,{type:'media-draft',index:2});s=act(s,{type:'media-send'});expect(s.masterScene10!.media!.videoConsent).toBe(false);expect(s.masterScene10!.media!.clip).toBe(5)}
   s=act(s,{type:'media-draft',index:0});s=act(s,{type:'media-send'});if(n===5){expect(s.masterScene10!.media!.stage).toBe('connecting');s=act(s,{type:'media-connect'})}
   s=normalizeSave(JSON.parse(JSON.stringify({...s,masterScene09:undefined})))
  }
  expect(s.evidence['TA-S10-WARNING-CARD']).toBeUndefined();s=act(s,{type:'media-ended'});expect(s.evidence['TA-S10-WARNING-CARD'].verified).toBe(false);expect(s.masterScene10!.media!.clip).toBe(11);s=act(s,{type:'media-ended'});expect(s.masterScene10!.lines.at(-1)!.text).toContain(finaleLast);expect(s.masterScene10!.media!.stage).toBe('hold');s=act(s,{type:'media-fade'});s=act(s,{type:'media-finish'});expect(s.masterScene10!.phase).toBe('complete')
 })
})
