import { describe, expect, it } from 'vitest'
import { scene09Beats, referenceCardId } from '../content/masterScene09'
import { masterScene09Action as act, cardFields, validateMasterScene09 } from './masterScene09'
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
 it('unlocks the searchable code through examination, comparison and the existing final conversation',()=>{
  let s=act(ready(),{type:'start'});for(let i=0;i<4;i++){s=act(s,{type:'draft',index:0});s=act(s,{type:'send'})}
  const record={type:'record-assessment',id:'card-capture'} as const
  expect(act(s,record)).toBe(s);s=act(s,{type:'open'});expect(act(s,{type:'draft',index:0})).toBe(s)
  s=act(s,{type:'inspect',field:'code'})
  for(let i=0;i<4;i++){s=act(s,{type:'draft',index:0});s=act(s,{type:'send'})}
  expect(act(s,{type:'draft',index:0})).toBe(s)
  s=act(s,record);expect(s.evidence[referenceCardId].verified).toBe(false)
  expect(s.deliveredEvents).not.toContain('TA-S09-SCENE10-UNLOCKED')
  for(let i=0;i<2;i++){s=act(s,{type:'draft',index:0});s=act(s,{type:'send'})}
  expect(s.deliveredEvents).toContain('TA-S09-SCENE10-UNLOCKED')
  expect(s.masterScene09?.inspected).toEqual(['code'])
  expect(()=>validateMasterScene09(JSON.parse(JSON.stringify(s.masterScene09)))).not.toThrow()
 })
})
