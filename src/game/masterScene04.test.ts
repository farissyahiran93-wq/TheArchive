import { describe, expect, it } from 'vitest'
import { cinematicBeats } from '../content/masterScene04Cinematic'
import { masterScene04Action } from './masterScene04'
import { beginScene01, beginScene02, deliverScene01, openScene03, scene01Invitation, sendScene01Choice } from './scene01'
import { normalizeSave } from './engine'
import { prepareReplay } from './sceneLibrary'
import { newGame, type GameSave } from './types'
function settle(s:GameSave):GameSave{for(let i=0;i<100;i++){const q=s.prologue?.scene01?.queue[0];if(!q)return s;s=deliverScene01(s,q.dueAt)}throw Error('Queue did not settle')}
function before():GameSave{
 let s=settle(beginScene01({...newGame(),masterOpening:true,chapter1Edition:'ch01-v2-10'},1000))
 for(let i=0;i<9;i++)s=settle(sendScene01Choice(s,'a','',true,20000+i*1000))
 s=settle(beginScene02(scene01Invitation(s,'join'),40000));s=settle(sendScene01Choice(s,'c','Alex',true,41000))
 for(let i=0;i<9;i++)s=settle(sendScene01Choice(s,'a','',true,50000+i*1000))
 s=settle(openScene03(s,100000))
 for(let i=0;i<10;i++)s=settle(sendScene01Choice(s,'a','',true,140000+i*1000))
 return s
}
function drain(s:GameSave):GameSave { while(s.masterScene04?.pending) { s=normalizeSave(JSON.parse(JSON.stringify(s))); const due=s.masterScene04!.pending!.dueAt; expect(masterScene04Action(s,{type:'tick'},due-1)).toBe(s); s=masterScene04Action(s,{type:'tick'},due) } return s }
describe('cinematic Scene 4',()=>{
 it('requires the previous scene and retains historical entries when continuing',()=>{
  expect(masterScene04Action(newGame(),{type:'start'}).masterScene04).toBeUndefined()
  const fresh=masterScene04Action(before(),{type:'start'},200000)
  expect(fresh.masterScene04?.revision).toBe('cinematic')
  expect(fresh.messages.some(m=>m.id==='TA-S04-SOPHIE-ELI-ENQUIRY')).toBe(false)
  const old={...fresh,masterScene04:{...fresh.masterScene04!,revision:undefined}}
  expect(prepareReplay({save:old,capturedAt:200000},300000,4).masterScene04?.revision).toBe('cinematic')
  expect(old.masterScene04.revision).toBeUndefined()
 })
 for(let selected=0;selected<10;selected++)for(let option=0;option<3;option++)it(`decision ${selected+1} branch ${option+1} delivers in order`,()=>{
  let s=drain(masterScene04Action(masterScene04Action(before(),{type:'start'},200000),{type:'open'}))
  for(let i=0;i<10;i++){
   const index=i===selected?option:0, beat=cinematicBeats[i], count=s.masterScene04!.messages.length
   if(i===9){s=masterScene04Action(s,{type:'inspect'});expect(s.masterScene04?.preview).toBe(true);s=masterScene04Action(s,{type:'close-preview'})}
   s=masterScene04Action(s,{type:'draft',index});s=masterScene04Action(s,{type:'send'},300000+i*50000)
   expect(s.masterScene04!.messages.slice(count).map(m=>m.text)).toEqual([beat.choices[index]])
   expect(masterScene04Action(s,{type:'draft',index:0})).toBe(s)
   s=drain(s)
   const lines=s.masterScene04!.messages.slice(count+1).map(m=>m.text)
   expect(lines.slice(0,beat.replies[index].length+beat.common.length)).toEqual([...beat.replies[index],...beat.common])
  }
  expect(s.masterScene05).toBeUndefined()
  expect(s.masterScene04?.status).toBe(selected===9&&option!==0?(option===1?'deferred':'declined'):'accepted')
  if(selected===9&&option!==0){s=masterScene04Action(s,{type:'reconsider'},900000);expect(s.masterScene04?.messages.at(-1)?.sender).toBe('player');s=drain(s);expect(s.masterScene04?.complete).toBe(true)}
  expect(s.deliveredEvents).toContain('TA-S04-SCENE05-UNLOCKED')
  expect(s.evidence['TA-S04-ARCHIVE']).toBeUndefined()
 })
})
