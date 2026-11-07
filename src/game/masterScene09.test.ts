import { describe, expect, it } from 'vitest'
import { scene09Beats, referenceCardId } from '../content/masterScene09'
import { masterScene09Action as act, cardFields } from './masterScene09'
import { newGame, type GameSave } from './types'
function ready():GameSave{return {...newGame(),masterScene06:{saved:true} as GameSave['masterScene06'],masterScene07:{saved:true} as GameSave['masterScene07'],masterScene08:{complete:true,saved:true} as GameSave['masterScene08'],deliveredEvents:['TA-S08-SCENE09-UNLOCKED']}}
describe('Scene 9 reference photograph',()=>{
 it('gates entry, supports every reply and keeps the record unverified',()=>{
  const empty=newGame();expect(act(empty,{type:'start'})).toBe(empty)
  for(let target=0;target<10;target++)for(let option=0;option<3;option++){
   let s=act(ready(),{type:'start'})
   for(let n=0;n<=target;n++){
    if(n===4){s=act(s,{type:'open'});for(const field of cardFields)s=act(s,{type:'inspect',field})}
    if(n===8){s=act(s,{type:'import'});s=act(s,{type:'analyse'});s=act(s,{type:'compare',field:'contact'});s=act(s,{type:'compare',field:'capture'});s=act(s,{type:'hypothesis',index:1});s=act(s,{type:'review'});s=act(s,{type:'save'})}
    const choice=n===target?option:0,count=s.masterScene09!.messages.length;s=act(s,{type:'draft',index:choice});expect(s.masterScene09!.messages).toHaveLength(count);s=act(s,{type:'send'});expect(s.masterScene09!.messages.at(-2)?.text).toBe(scene09Beats[n].choices[choice]);expect(s.masterScene09!.messages.at(-1)?.text).toBe(scene09Beats[n].replies[choice])
   }
   if(target===9){expect(s.masterScene09?.complete).toBe(true);expect(s.deliveredEvents).toContain('TA-S09-SCENE10-UNLOCKED');expect(s.evidence[referenceCardId].verified).toBe(false)}
  }
 })
 it('does not allow opening, inspection or saving to be skipped',()=>{
  let s=act(ready(),{type:'start'});for(let i=0;i<4;i++){s=act(s,{type:'draft',index:0});s=act(s,{type:'send'})}
  expect(act(s,{type:'import'})).toBe(s);s=act(s,{type:'open'});for(const f of cardFields)s=act(s,{type:'inspect',field:f})
  for(let i=0;i<4;i++){s=act(s,{type:'draft',index:0});s=act(s,{type:'send'})}
  s=act(s,{type:'import'});s=act(s,{type:'analyse'});s=act(s,{type:'compare',field:'contact'});s=act(s,{type:'compare',field:'capture'});s=act(s,{type:'hypothesis',index:2});expect(act(s,{type:'save'})).toBe(s);s=act(s,{type:'review'});s=act(s,{type:'save'});expect(s.evidence[referenceCardId].verified).toBe(false)
 })
})
