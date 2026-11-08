import { describe, expect, it } from 'vitest'
import { masterFragments, masterScene05Beats } from '../content/masterScene05'
import { masterRecoveryUnits, masterScene05Action as act } from './masterScene05'
import { normalizeSave } from './engine'
import { newGame, type GameSave } from './types'

const ready=():GameSave=>({...newGame(),masterScene04:{version:1,opened:true,beat:10,messages:[],status:'accepted',inspected:true,complete:true,preview:false}})
const reload=(s:GameSave)=>normalizeSave(JSON.parse(JSON.stringify(s)))
describe('Scene 5 TRACE',()=>{
 it('requires a reviewed archive only after TRACE-first Scene 4, with persisted paced replies',()=>{
  const base=ready();base.masterScene04={...base.masterScene04!,revision:'trace-first'}
  let s=act(base,{type:'start'},1000)
  expect(s.masterScene05?.archiveStatus).toBe('offered');expect(act(s,{type:'archive-accept'})).toBe(s)
  s=act(s,{type:'archive-inspect'});s=act(s,{type:'archive-risks'});s=act(s,{type:'archive-decline'});s=reload(s);s=act(s,{type:'archive-reconsider'});s=act(s,{type:'archive-defer'});s=act(s,{type:'archive-reconsider'});s=act(s,{type:'archive-accept'})
  for(let i=0;i<8;i++){
   s=act(s,{type:'draft',index:i%3});const count=s.masterScene05!.messages.length;s=act(s,{type:'send'},10000+i*10000)
   expect(s.masterScene05!.messages.length).toBe(count+1);expect(act(s,{type:'send'})).toBe(s)
   const due=s.masterScene05!.pending!.dueAt;expect(due-(10000+i*10000)).toBeGreaterThanOrEqual(1500);s=reload(s);expect(act(s,{type:'tick'},due-1)).toBe(s);s=act(s,{type:'tick'},due);expect(act(s,{type:'tick'},due+10000)).toBe(s)
  }
  s=act(s,{type:'inspect'});s=act(s,{type:'risks'});s=act(s,{type:'install'});s=act(s,{type:'open-trace'});s=act(s,{type:'select'});s=act(s,{type:'recover'});expect(masterRecoveryUnits(s.masterScene05!)).toBe(120)
  expect(act(s,{type:'view',id:'timeline'})).toBe(s)
  s=act(s,{type:'view',id:'messages'});s=reload(s);expect(s.masterScene05?.traceView).toBe('messages')
  for(const f of masterFragments)s=act(s,{type:'read',id:f.id});s=act(s,{type:'save',id:masterFragments[0].id})
  for(let i=0;i<2;i++){s=act(s,{type:'draft',index:1});s=act(s,{type:'send'},200000+i*10000);s=act(s,{type:'tick'},s.masterScene05!.pending!.dueAt)}
  expect(s.masterScene05?.complete).toBe(false);s=act(s,{type:'tick'},s.masterScene05!.pending!.dueAt);expect(s.masterScene05?.complete).toBe(true)
 })
 it('requires the actual archive, explicit consent, recovery and source-limited disclosure',()=>{
  const empty=newGame();expect(act(empty,{type:'start'})).toBe(empty)
  let s=act(ready(),{type:'start'})
  for(let i=0;i<8;i++){s=act(s,{type:'draft',index:i%3});s=act(s,{type:'send'})}
  expect(s.masterScene05?.messages[2].text).toBe(masterScene05Beats[0].choices[0])
  expect(act(s,{type:'install'})).toBe(s)
  s=act(s,{type:'inspect'});s=act(s,{type:'risks'});s=act(s,{type:'decline'});s=reload(s)
  expect(s.masterScene05?.packageStatus).toBe('declined')
  s=act(s,{type:'reconsider'});s=act(s,{type:'defer'});s=act(s,{type:'reconsider'});s=act(s,{type:'install'})
  expect(act(s,{type:'recover'})).toBe(s)
  s=act(s,{type:'open-trace'});s=act(s,{type:'select'});s=act(s,{type:'recover'});s=reload(s)
  expect(masterRecoveryUnits(s.masterScene05!)).toBe(120)
  expect(act(s,{type:'recover'})).toBe(s)
  expect(s.masterScene05?.read).toEqual([])
  for(const f of masterFragments)s=act(s,{type:'read',id:f.id})
  expect(s.masterScene05?.saved).toEqual([])
  s=act(s,{type:'save',id:masterFragments[0].id});s=reload(s)
  expect(s.evidence[masterFragments[0].id].verified).toBe(false)
  for(let i=0;i<2;i++){s=act(s,{type:'draft',index:2});s=act(s,{type:'send'})}
  expect(s.masterScene05?.complete).toBe(true)
  expect(s.deliveredEvents).toContain('TA-S05-SCENE06-UNLOCKED')
  expect(s.masterScene05?.messages.slice(-4).map(m=>m.text).join(' ')).not.toContain('June Ellis')
  expect(reload(s).masterScene05?.complete).toBe(true)
 })
})
