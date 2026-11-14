import { describe, expect, it } from 'vitest'
import { masterFragments, masterScene05Beats } from '../content/masterScene05'
import { unknownSenderRevisedBeats } from '../content/masterTraceFirst'
import { masterRecoveryUnits, masterScene05Action as act } from './masterScene05'
import { normalizeSave } from './engine'
import { newGame, type GameSave } from './types'
import { masterScene06Action, scene06Units } from './masterScene06'

const ready=():GameSave=>({...newGame(),masterScene04:{version:1,opened:true,beat:10,messages:[],status:'accepted',inspected:true,complete:true,preview:false}})
const reload=(s:GameSave)=>normalizeSave(JSON.parse(JSON.stringify(s)))
const drain=(s:GameSave):GameSave=>{while(s.masterScene05?.pending)s=act(s,{type:'tick'},s.masterScene05.pending.dueAt);return s}
const answer=(s:GameSave):GameSave=>drain(act(act(s,{type:'draft',index:0}),{type:'send'},20000))
describe('Scene 5 TRACE',()=>{
 it('records newly opened personal conversations as discussion topics',()=>{
  const base=ready();base.masterScene04={...base.masterScene04!,revision:'cinematic',traceInstalled:true}
  let s=drain(act(base,{type:'start'},1000))
  for(let i=0;i<3;i++)s=answer(s)
  s=act(s,{type:'archive-accept'})
  for(let i=0;i<5;i++)s=answer(s)
  s={...s,masterScene05:{...s.masterScene05!,opened:true,selected:true,recovered:true}}
  s=act(s,{type:'read',id:'TA-PH-CHAT-MAYA'})
  expect(s.masterScene05?.discussion?.discovered).toEqual(['maya'])
  s=reload(s)
  s=act(s,{type:'discussion',action:{type:'select',topic:'maya'}})
  expect(s.masterScene05?.discussion?.messages).toHaveLength(0)
  s=act(s,{type:'discussion',action:{type:'draft',index:0}})
  s=act(s,{type:'discussion',action:{type:'send'}})
  expect(s.masterScene05?.discussion?.messages).toHaveLength(1)
  expect(s.masterScene05?.discussion?.pending.length).toBeGreaterThan(0)
  expect(masterRecoveryUnits(s.masterScene05!)).toBe(200)
  while(s.masterScene05!.discussion!.pending.length)s=act(s,{type:'discussion',action:{type:'deliver'}})
  s=act(s,{type:'discussion',action:{type:'draft',index:0}})
  s=act(s,{type:'discussion',action:{type:'send'}})
  while(s.masterScene05!.discussion!.pending.length)s=act(s,{type:'discussion',action:{type:'deliver'}})
  s=act(s,{type:'discussion',action:{type:'select',topic:'finish'}})
  s=reload(act(s,{type:'discussion',action:{type:'send'}}))
  expect(s.masterScene05?.complete).toBe(true)
  s=masterScene06Action(s,{type:'start'})
  expect(s.masterScene06).toMatchObject({recovered:true,firstPass20:true})
  expect(masterRecoveryUnits(s.masterScene05!)+scene06Units(s.masterScene06)).toBe(200)
 })
 it('requires manual TRACE setup before the archive and keeps recovery locked until the conversation is ready',()=>{
  const base=ready();base.masterScene04={...base.masterScene04!,revision:'cinematic'}
  expect(act(base,{type:'start'})).toBe(base)
  let s=act({...base,masterScene04:{...base.masterScene04!,traceInstalled:true}},{type:'start'})
  expect(s.masterScene05).toMatchObject({earlySetup:true,packageStatus:'installed',archiveStatus:'unavailable'})
  s=act(s,{type:'open-trace'});expect(act(s,{type:'recover'})).toBe(s)
  expect(act(s,{type:'archive-accept'})).toBe(s)
  s=drain(s);for(let i=0;i<3;i++)s=answer(s)
  expect(s.masterScene05?.archiveStatus).toBe('offered')
  s=drain(act(s,{type:'archive-decline'}));s=reload(s);expect(act(s,{type:'archive-accept'})).toBe(s)
  s=act(s,{type:'archive-reconsider'});s=act(s,{type:'archive-accept'});expect(act(s,{type:'recover'})).toBe(s)
  for(let i=0;i<5;i++)s=answer(s)
  expect(s.masterScene05?.packageStatus).toBe('installed')
  s=reload(act(s,{type:'recover'},100000));expect(masterRecoveryUnits(s.masterScene05!)).toBe(0)
  expect(act(s,{type:'read',id:'TA-PH-CHAT-MAYA'})).toBe(s)
  s=reload(act(s,{type:'recovery-tick'},104000));expect(s.masterScene05?.recoveryAnimation?.percent).toBe(10)
  expect(s.masterScene05?.recovered).toBe(false)
  s=reload(act(s,{type:'recovery-tick'},108000));expect(masterRecoveryUnits(s.masterScene05!)).toBe(200)
  expect(s.masterScene05?.recoveryAnimation).toMatchObject({percent:20,acknowledged:false})
  s=reload(act(s,{type:'recovery-acknowledge'}));expect(s.masterScene05?.recoveryAnimation?.acknowledged).toBe(true)
 })

 it('requires explicit archive and installation consent with persisted paced replies',()=>{
  const base=ready();base.masterScene04={...base.masterScene04!,revision:'trace-first'}
  let s=act(base,{type:'start'},1000)
  expect(s.masterScene05?.archiveStatus).toBe('offered');expect(act(s,{type:'draft',index:0})).toBe(s)
  s=act(s,{type:'archive-decline'});s=reload(s);expect(act(s,{type:'archive-accept'})).toBe(s);s=act(s,{type:'archive-reconsider'});s=act(s,{type:'archive-defer'});s=act(s,{type:'archive-reconsider'});s=act(s,{type:'archive-accept'})
  for(let i=0;i<8;i++){
   s=act(s,{type:'draft',index:i%3});const count=s.masterScene05!.messages.length;s=act(s,{type:'send'},10000+i*10000)
   expect(s.masterScene05!.messages.length).toBe(count+1);expect(act(s,{type:'send'})).toBe(s)
   const due=s.masterScene05!.pending!.dueAt;expect(due-(10000+i*10000)).toBeGreaterThanOrEqual(1500);s=reload(s);expect(act(s,{type:'tick'},due-1)).toBe(s);s=act(s,{type:'tick'},due);expect(act(s,{type:'tick'},due+10000)).toBe(s)
  }
  s=act(s,{type:'install'});s=act(s,{type:'open-trace'});s=act(s,{type:'recover'});expect(masterRecoveryUnits(s.masterScene05!)).toBe(120)
  expect(act(s,{type:'view',id:'timeline'})).toBe(s)
  s=act(s,{type:'view',id:'messages'});s=reload(s);expect(s.masterScene05?.traceView).toBe('messages')
  for(const f of masterFragments)s=act(s,{type:'read',id:f.id})
  expect(act(s,{type:'save',id:masterFragments[0].id})).toBe(s)
  expect(act(s,{type:'draft',index:0})).toBe(s)
  s=act(s,{type:'observe',id:masterFragments[0].id});s=act(s,{type:'save',id:masterFragments[0].id})
  for(let i=0;i<2;i++){s=act(s,{type:'draft',index:1});s=act(s,{type:'send'},200000+i*10000);s=act(s,{type:'tick'},s.masterScene05!.pending!.dueAt)}
  expect(s.masterScene05?.complete).toBe(false);s=act(s,{type:'tick'},s.masterScene05!.pending!.dueAt);expect(s.masterScene05?.complete).toBe(true)
 })
 it('requires the actual archive, explicit consent, recovery and source-limited disclosure',()=>{
  const empty=newGame();expect(act(empty,{type:'start'})).toBe(empty)
  let s=act(ready(),{type:'start'})
  for(let i=0;i<8;i++){s=act(s,{type:'draft',index:i%3});s=act(s,{type:'send'})}
  expect(s.masterScene05?.messages[2].text).toBe(masterScene05Beats[0].choices[0])
  s=act(s,{type:'decline'});s=reload(s)
  expect(act(s,{type:'install'})).toBe(s)
  expect(s.masterScene05?.packageStatus).toBe('declined')
  s=act(s,{type:'reconsider'});s=act(s,{type:'defer'});s=act(s,{type:'reconsider'});s=act(s,{type:'install'})
  expect(act(s,{type:'recover'})).toBe(s)
  s=act(s,{type:'open-trace'});s=act(s,{type:'recover'});s=reload(s)
  expect(masterRecoveryUnits(s.masterScene05!)).toBe(120)
  expect(act(s,{type:'recover'})).toBe(s)
  expect(s.masterScene05?.read).toEqual([])
  s=act(s,{type:'read',id:masterFragments[0].id})
  expect(s.masterScene05?.saved).toEqual([])
  s=act(s,{type:'observe',id:masterFragments[0].id})
  s=act(s,{type:'save',id:masterFragments[0].id});s=reload(s)
  expect(s.evidence[masterFragments[0].id].verified).toBe(false)
  for(let i=0;i<2;i++){s=act(s,{type:'draft',index:2});s=act(s,{type:'send'})}
  expect(s.masterScene05?.complete).toBe(true)
  expect(s.deliveredEvents).toContain('TA-S05-SCENE06-UNLOCKED')
  expect(s.masterScene05?.messages.slice(-4).map(m=>m.text).join(' ')).not.toContain('June Ellis')
  expect(reload(s).masterScene05?.complete).toBe(true)
 })
 it('requires a source observation or comparison on the examination route',()=>{
  const base=ready()
  let s=act({...base,masterScene04:{...base.masterScene04!,beat:unknownSenderRevisedBeats.length,revision:'guarded-chat'}},{type:'start'})
  s=act(s,{type:'archive-accept'})
  for(let i=0;i<8;i++){
   s=act(act(s,{type:'draft',index:0}),{type:'send'})
   s=act(s,{type:'tick'},s.masterScene05!.pending!.dueAt)
  }
  for(const type of ['install','open-trace','recover'] as const)s=act(s,{type})
  const june=masterFragments[1].id, records=masterFragments[3].id
  expect(act(s,{type:'observe',id:june})).toBe(s)
  s=act(s,{type:'read',id:june})
  expect(act(s,{type:'save',id:june})).toBe(s)
  expect(act(s,{type:'compare-fragments',left:june,right:'unrecovered'})).toBe(s)
  s=act(s,{type:'compare-fragments',left:june,right:records})
  s=reload(act(s,{type:'save',id:june}))
  expect(s.masterScene05).toMatchObject({read:[june,records],saved:[june],comparison:[june,records]})
  expect(s.evidence[june].verified).toBe(false)
  expect(masterRecoveryUnits(s.masterScene05!)).toBe(120)
  expect(act(s,{type:'draft',index:0}).masterScene05?.draft).toBe(0)
 })
})
