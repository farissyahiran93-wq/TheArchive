import { describe, expect, it } from 'vitest'
import { masterScene04Beats } from '../content/masterScene04'
import { masterScene04Action } from './masterScene04'
import { beginScene01, beginScene02, deliverScene01, openScene03, scene01Invitation, sendScene01Choice } from './scene01'
import { normalizeSave } from './engine'
import { sceneComplete, sceneVisited } from './sceneLibrary'
import { newGame, type GameSave } from './types'
function settle(s:GameSave):GameSave{for(let i=0;i<100;i++){const q=s.prologue?.scene01?.queue[0];if(!q)return s;s=deliverScene01(s,q.dueAt)}throw Error('Queue did not settle')}
function before():GameSave{
 let s=settle(beginScene01({...newGame(),masterOpening:true,chapter1Edition:'ch01-v2-10'},1000))
 for(let i=0;i<9;i++)s=settle(sendScene01Choice(s,'a','',true,20000+i*1000))
 s=settle(beginScene02(scene01Invitation(s,'join'),40000))
 for(let i=0;i<9;i++)s=settle(sendScene01Choice(s,'a','',true,50000+i*1000))
 s=settle(openScene03(s,100000))
 for(let i=0;i<10;i++)s=settle(sendScene01Choice(s,'a','',true,140000+i*1000))
 return s
}
describe('Scene 4 archive and dialogue',()=>{
 it('requires actual Scene 3 completion and opens only after the player acts',()=>{
  const empty=newGame();expect(masterScene04Action(empty,{type:'start'})).toBe(empty)
  const s=masterScene04Action(before(),{type:'start'},200000)
  expect(s.masterScene04?.opened).toBe(false)
  expect(s.masterScene04?.messages).toHaveLength(1)
  expect(s.messages.filter(m=>m.id==='TA-S04-SOPHIE-ELI-ENQUIRY')).toHaveLength(1)
  expect(masterScene04Action(s,{type:'start'})).toBe(s)
 })
 it('executes all 30 alternatives and persists inspection and acceptance separately',()=>{
  for(let selected=0;selected<10;selected++)for(let option=0;option<3;option++){
   let s=masterScene04Action(masterScene04Action(before(),{type:'start'},200000),{type:'open'})
   for(let beat=0;beat<10;beat++){
    const index=beat===selected?option:0, item=masterScene04Beats[beat]
    s=masterScene04Action(s,{type:'draft',index})
    s=normalizeSave(JSON.parse(JSON.stringify(s)))
    s=masterScene04Action(s,{type:'send'},210000+beat)
    expect(s.masterScene04?.messages.at(-1)?.text).toBe(item.choices[index])
    s=normalizeSave(JSON.parse(JSON.stringify(s)))
    s=masterScene04Action(s,{type:'tick'},220000+beat)
    expect(s.masterScene04?.messages.at(-2)?.text).toBe(item.choices[index])
    expect(s.masterScene04?.messages.at(-1)?.text).toBe(item.replies[index])
   }
   expect(s.masterScene04?.status).toBe('offered')
   expect(s.evidence['TA-S04-ARCHIVE']).toBeUndefined()
   s=masterScene04Action(s,{type:'inspect'})
   expect(s.masterScene04?.inspected).toBe(true);expect(s.masterScene04?.complete).toBe(false)
   s=masterScene04Action(s,{type:'close-preview'})
   s=masterScene04Action(s,{type:'decline'})
   s=normalizeSave(JSON.parse(JSON.stringify(s)))
   expect(s.masterScene04?.status).toBe('declined')
   s=masterScene04Action(s,{type:'reconsider'})
   s=masterScene04Action(s,{type:'defer'})
   expect(s.masterScene04?.status).toBe('deferred')
   s=masterScene04Action(s,{type:'reconsider'})
   s=masterScene04Action(s,{type:'accept'},300000)
   expect(s.masterScene04?.complete).toBe(true)
   expect(s.deliveredEvents).toContain('TA-S04-SCENE05-UNLOCKED')
   expect(sceneVisited(s,4)).toBe(true);expect(sceneComplete(s,4)).toBe(true)
   expect(s.evidence['TA-S04-ARCHIVE'].verified).toBe(false)
   expect(s.chapter1?.archiveOrigin?.installed).not.toBe(true)
   expect(normalizeSave(JSON.parse(JSON.stringify(s))).masterScene04?.status).toBe('accepted')
  }
 })
 it('supports accepting before inspecting without completing early',()=>{
  let s=masterScene04Action(masterScene04Action(before(),{type:'start'}),{type:'open'})
  for(let i=0;i<10;i++){s=masterScene04Action(s,{type:'draft',index:1});s=masterScene04Action(s,{type:'send'},100000+i*1000);s=masterScene04Action(s,{type:'tick'},100999+i*1000)}
  s=masterScene04Action(s,{type:'accept'});expect(s.masterScene04?.complete).toBe(false)
  s=masterScene04Action(s,{type:'inspect'});expect(s.masterScene04?.complete).toBe(true)
 })
})
