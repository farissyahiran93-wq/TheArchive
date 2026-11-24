import { describe, it, expect } from 'vitest'
import { disclosureTopics, mayaCard, mayaCheckIn, type DisclosureTopic } from '../content/mayaConversationV3'
import { masterScene08Action as eight, validateMasterScene08 } from './masterScene08'
import { masterScene09Action as nine, validateMasterScene09 } from './masterScene09'
import { masterScene10Action } from './masterScene10'
import { newGame, type GameSave } from './types'

function ready():GameSave {
 return {...newGame(),masterScene04:{complete:true} as GameSave['masterScene04'],masterScene07:{phase:'complete',saved:true} as GameSave['masterScene07'],deliveredEvents:['TA-S07-SCENE08-UNLOCKED']}
}
function runScene(scene:'masterScene08'|'masterScene09',save:GameSave,option:number) {
 const act=scene==='masterScene08'?eight:nine
 const turns=scene==='masterScene08'?mayaCheckIn:mayaCard
 let now=10000
 save=act(save,{type:'start'},now)
 const drain=()=>{
  while(save[scene]?.pending?.length){
   const pending=save[scene]!.pending!
   now=Math.max(now,pending[0].dueAt)+300
   const count=save[scene]!.messages.length
   save=act(save,{type:'tick'},now)
   expect(save[scene]!.messages).toHaveLength(count+1)
   expect(act(save,{type:'tick'},now)).toBe(save)
   save=JSON.parse(JSON.stringify(save))
   if(scene==='masterScene08')validateMasterScene08(save.masterScene08)
   else validateMasterScene09(save.masterScene09)
  }
 }
 drain()
 for(let i=0;i<turns.length;i++){
  if(i===3&&scene==='masterScene08'){
   expect(act(save,{type:'draft',index:0})).toBe(save)
   save=act(save,{type:'open'},++now)
   drain()
  }
  const index=Math.min(option,turns[i].choices.length-1)
  expect(act(save,{type:'send'},now)).toBe(save)
  save=act(save,{type:'draft',index},now)
  expect(save[scene]!.messages.at(-1)?.sender).toBe('maya')
  save=act(save,{type:'send'},++now)
  expect(save[scene]!.messages.at(-1)?.text).toBe(turns[i].choices[index])
  expect(act(save,{type:'draft',index:0},now)).toBe(save)
  drain()
 }
 return save
}
describe('Maya’s conversation across Scenes 8 and 9',()=>{
 it.each([0,1,2])('paces option %i, de-duplicates attachments, and unlocks the public search without an assessment',option=>{
  let s=runScene('masterScene08',ready(),option)
  expect(s.masterScene08?.messages.filter(m=>m.attachment==='capture')).toHaveLength(1)
  expect(s.masterScene08?.messages.filter(m=>m.photo)).toHaveLength(1)
  expect(s.masterScene08?.complete).toBe(true)
  expect(s.masterScene08?.saved).toBe(false)
  s=runScene('masterScene09',s,option)
  expect(s.masterScene09?.messages.filter(m=>m.attachment==='card')).toHaveLength(1)
  expect(s.masterScene09?.disclosure).toBeUndefined()
  expect(s.masterScene09?.saved).toBe(false)
  expect(s.masterScene09?.complete).toBe(true)
  expect(masterScene10Action(s,{type:'start'}).masterScene10?.phase).toBe('inventory')
  expect(s.evidence).toEqual(ready().evidence)
 })
 it.each(Object.keys(disclosureTopics) as DisclosureTopic[])('only discloses the selected %s after every explicit Send',topic=>{
  let s=runScene('masterScene09',runScene('masterScene08',ready(),0),0)
  expect(nine(s,{type:'select-clue',topic})).toBe(s)
  s=nine(s,{type:'recipient'})
  s=nine(s,{type:'select-clue',topic})
  expect(s.masterScene09?.disclosure?.messages).toEqual([])
  const lines=disclosureTopics[topic]
  for(let i=0;i<lines.replies.length;i++){
   if(i){expect(nine(s,{type:'send-disclosure'})).toBe(s);s=nine(s,{type:'select-followup'})}
   s=nine(s,{type:'send-disclosure'})
   expect(s.masterScene09?.disclosure?.messages.at(-1)).toMatchObject({recipient:'unknown',text:i?lines.followups[i-1]:lines.text})
   expect(nine(s,{type:'send-disclosure'})).toBe(s)
   while(s.masterScene09?.disclosure?.pending?.length)s=nine(s,{type:'tick-disclosure'},s.masterScene09.disclosure.pending[0].dueAt)
   s=JSON.parse(JSON.stringify(s))
   validateMasterScene09(s.masterScene09)
  }
  expect(nine(s,{type:'send-disclosure'})).toBe(s)
  expect(s.masterScene09?.disclosure?.messages.filter(m=>m.sender==='unknown').map(m=>m.text)).toEqual(lines.replies.flat())
 })
})
