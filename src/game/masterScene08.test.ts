import { describe, expect, it } from 'vitest'
import { scene08Beats, scene08Cinematic, captureId } from '../content/masterScene08'
import { masterScene08Action as act, validateMasterScene08 } from './masterScene08'
import { newGame, type GameSave } from './types'
function ready(shared=false):GameSave{return {...newGame(),masterScene07:{phase:'complete',saved:true,shareSent:shared} as GameSave['masterScene07'],deliveredEvents:['TA-S07-SCENE08-UNLOCKED']}}
function legacyStart(save:GameSave):GameSave{const s=act(save,{type:'start'});return {...s,masterScene08:{...s.masterScene08!,conversationRevision:undefined,pending:undefined,messages:[{id:'TA-S08-FIRST',sender:'maya',text:'Historical opening',at:0}]}}}
function drain(save:GameSave):GameSave{for(let n=0;n<100&&save.masterScene08?.pending?.length;n++){const due=save.masterScene08.pending[0].dueAt;save=act(save,{type:'tick'},due)}return save}
describe('Scene 8 Maya capture',()=>{
 it('delivers Maya’s ordinary photo once only for conversations started with the new revision',()=>{
  for(const isOld of [false,true]){
   let s=legacyStart(ready())
   if(isOld)s={...s,masterScene08:{...s.masterScene08!,photoRevision:undefined}}
   for(let n=0;n<7;n++){
    if(n===4)s=act(s,{type:'open'})
    s=act(s,{type:'draft',index:0});s=act(s,{type:'send'})
   }
   expect(s.masterScene08!.messages.filter(m=>m.id==='TA-S08-PHOTO-MUGS')).toHaveLength(isOld?0:1)
   expect(s.evidence['TA-S08-PHOTO-MUGS']).toBeUndefined()
  }
 })
 it('locks before Scene 7 and permits all thirty choices only after Send',()=>{
  const empty=newGame();expect(act(empty,{type:'start'})).toBe(empty)
  for(const shared of [false,true])for(let target=0;target<10;target++)for(let option=0;option<3;option++){
   let s=legacyStart(ready(shared))
   for(let n=0;n<=target;n++){
    if(n===4)s=act(s,{type:'open'})
    if(n===8)s=act(s,{type:'record-assessment',id:'crop-original'})
    const selected=n===target?option:0,count=s.masterScene08!.messages.length;s=act(s,{type:'draft',index:selected});expect(s.masterScene08!.messages).toHaveLength(count);s=act(s,{type:'send'});expect(s.masterScene08!.messages.find(m=>m.id===`TA-S08-C${n+1}-P-${selected}`)?.text).toBe(scene08Beats[n].choices[selected]);expect(s.masterScene08!.messages.find(m=>m.id===`TA-S08-C${n+1}-M-${selected}`)?.text).toBe(scene08Beats[n].replies[selected])
   }
   if(target===9){expect(s.masterScene08?.complete).toBe(true);expect(s.deliveredEvents).toContain('TA-S08-SCENE09-UNLOCKED');expect(s.evidence[captureId].verified).toBe(false)}
  }
 })
 it('requires comparing a discovered source and records an unresolved conclusion without authenticating the crop',()=>{
  let s=legacyStart(ready());for(let n=0;n<4;n++){s=act(s,{type:'draft',index:0});s=act(s,{type:'send'})}
  expect(act(s,{type:'record-assessment',id:'crop-wording'})).toBe(s);expect(act(s,{type:'draft',index:0})).toBe(s)
  s=act(s,{type:'open'})
  for(let n=0;n<4;n++){s=act(s,{type:'draft',index:1});s=act(s,{type:'send'})}
  expect(act(s,{type:'draft',index:0}).masterScene08?.draft).toBe(0)
  expect(act(s,{type:'record-assessment',id:'crop-lucas'})).toBe(s)
  s=act(s,{type:'record-assessment',id:'crop-original'})
  expect(s.evidence[captureId].verified).toBe(false)
  expect(s.masterScene08?.inspected).toHaveLength(0)
  expect(()=>validateMasterScene08(JSON.parse(JSON.stringify(s.masterScene08)))).not.toThrow()
 })
 it('paces and persists every branch, attachment and photo without inventing a finding',()=>{
  for(let target=0;target<10;target++)for(let option=0;option<3;option++){
   let s=legacyStart(ready())
   s={...s,masterScene08:{...s.masterScene08!,conversationRevision:'cinematic-v1',messages:[],pending:scene08Cinematic[0].intro.map((text,i)=>({id:'TA-S08-FIRST-'+i,text,dueAt:1000+i*2000}))}}
   expect(s.masterScene08?.messages).toHaveLength(0)
   expect(act(s,{type:'draft',index:0})).toBe(s)
   s=drain(s)
   for(let beat=0;beat<=target;beat++){
    if(beat===4){expect(s.masterScene08?.received).toBe(true);expect(act(s,{type:'draft',index:0})).toBe(s);s=drain(act(s,{type:'open'},200000))}
    const i=beat===target?option:0
    s=act(s,{type:'draft',index:i});const before=s.masterScene08!.messages.length
    s=act(s,{type:'send'},300000+beat*100000)
    expect(s.masterScene08!.messages).toHaveLength(before+1)
    expect(s.masterScene08!.messages.at(-1)?.text).toBe(scene08Cinematic[beat].choices[i])
    expect(act(s,{type:'draft',index:0})).toBe(s)
    const due=s.masterScene08!.pending![0].dueAt
    expect(act(s,{type:'tick'},due-1)).toBe(s)
    s=act(s,{type:'tick'},due)
    s=JSON.parse(JSON.stringify(s)) as GameSave
    expect(()=>validateMasterScene08(s.masterScene08)).not.toThrow()
    s=drain(s)
   }
   if(target===9){
    expect(s.masterScene08?.complete).toBe(true)
    expect(s.masterScene08?.saved).toBe(false)
    expect(s.deliveredEvents).toContain('TA-S08-SCENE09-UNLOCKED')
    expect(s.masterScene08?.messages.filter(m=>m.attachment==='capture')).toHaveLength(1)
    expect(s.masterScene08?.messages.filter(m=>m.id==='TA-S08-PHOTO-MUGS')).toHaveLength(1)
    expect(s.evidence[captureId]).toBeUndefined()
    s=act(s,{type:'record-assessment',id:'crop-original'},9999999)
    expect(s.evidence[captureId]?.verified).toBe(false)
   }
  }
 })

})
