import { describe, expect, it } from 'vitest'
import { scene08Beats, captureId } from '../content/masterScene08'
import { masterScene08Action as act, captureFields } from './masterScene08'
import { newGame, type GameSave } from './types'
function ready(shared=false):GameSave{return {...newGame(),masterScene07:{phase:'complete',saved:true,shareSent:shared} as GameSave['masterScene07'],deliveredEvents:['TA-S07-SCENE08-UNLOCKED']}}
describe('Scene 8 Maya capture',()=>{
 it('delivers Maya’s ordinary photo once only for conversations started with the new revision',()=>{
  for(const isOld of [false,true]){
   let s=act(ready(),{type:'start'})
   if(isOld)s={...s,masterScene08:{...s.masterScene08!,photoRevision:undefined}}
   for(let n=0;n<7;n++){
    if(n===4){s=act(s,{type:'open'});for(const field of captureFields)s=act(s,{type:'inspect',field})}
    s=act(s,{type:'draft',index:0});s=act(s,{type:'send'})
   }
   expect(s.masterScene08!.messages.filter(m=>m.id==='TA-S08-PHOTO-MUGS')).toHaveLength(isOld?0:1)
   expect(s.evidence['TA-S08-PHOTO-MUGS']).toBeUndefined()
  }
 })
 it('locks before Scene 7 and permits all thirty choices only after Send',()=>{
  const empty=newGame();expect(act(empty,{type:'start'})).toBe(empty)
  for(const shared of [false,true])for(let target=0;target<10;target++)for(let option=0;option<3;option++){
   let s=act(ready(shared),{type:'start'})
   for(let n=0;n<=target;n++){
    if(n===4){s=act(s,{type:'open'});for(const field of captureFields)s=act(s,{type:'inspect',field})}
    if(n===8){s=act(s,{type:'import'});s=act(s,{type:'analyse'});s=act(s,{type:'compare'});s=act(s,{type:'hypothesis',index:1});s=act(s,{type:'review'});s=act(s,{type:'save'})}
    const selected=n===target?option:0,count=s.masterScene08!.messages.length;s=act(s,{type:'draft',index:selected});expect(s.masterScene08!.messages).toHaveLength(count);s=act(s,{type:'send'});expect(s.masterScene08!.messages.find(m=>m.id===`TA-S08-C${n+1}-P-${selected}`)?.text).toBe(scene08Beats[n].choices[selected]);expect(s.masterScene08!.messages.find(m=>m.id===`TA-S08-C${n+1}-M-${selected}`)?.text).toBe(scene08Beats[n].replies[selected])
   }
   if(target===9){expect(s.masterScene08?.complete).toBe(true);expect(s.deliveredEvents).toContain('TA-S08-SCENE09-UNLOCKED');expect(s.evidence[captureId].verified).toBe(false)}
  }
 })
 it('requires actual inspection and explicit review before saving',()=>{
  let s=act(ready(),{type:'start'});for(let n=0;n<4;n++){s=act(s,{type:'draft',index:0});s=act(s,{type:'send'})}
  expect(act(s,{type:'import'})).toBe(s);expect(act(s,{type:'draft',index:0})).toBe(s)
  s=act(s,{type:'open'});for(const field of captureFields)s=act(s,{type:'inspect',field})
  for(let n=0;n<4;n++){s=act(s,{type:'draft',index:1});s=act(s,{type:'send'})}
  s=act(s,{type:'import'});s=act(s,{type:'analyse'});s=act(s,{type:'compare'});s=act(s,{type:'hypothesis',index:2});expect(act(s,{type:'save'})).toBe(s);s=act(s,{type:'review'});s=act(s,{type:'save'});expect(s.evidence[captureId].verified).toBe(false)
 })
})
