import 'fake-indexeddb/auto'
import { describe, expect, it } from 'vitest'
import { beginScene01,beginScene02,deliverScene01,openScene03,scene01Invitation,sendScene01Choice } from './scene01'
import { masterScene04Action as four, masterScene04Dialogue } from './masterScene04'
import { masterScene05Action as five, masterRecoveryUnits } from './masterScene05'
import { masterFragments } from '../content/masterScene05'
import { masterScene06Action as six, scene06Units } from './masterScene06'
import { masterScene10Action as ten } from './masterScene10'
import { captureSceneEntries,libraryScenesForSave,prepareReplay,snapshotKey } from './sceneLibrary'
import { newGame,type GameSave } from './types'
import { masterChapterMetadata } from '../content/masterChapterMetadata'
import { writeGame,loadGame,discardPendingSave } from './save'
import { flushGameWrites,resumeRuntime,startSceneReplay,useGameStore } from './store'

function settle(s:GameSave):GameSave{for(let i=0;i<100;i++){const q=s.prologue?.scene01?.queue[0];if(!q)return s;s=deliverScene01(s,q.dueAt)}throw Error('Queue')}
function finishUnknown(s: GameSave): GameSave {
 const turns = masterScene04Dialogue(s.masterScene04?.revision)
 s = four(s, { type: 'open' })
 for (let i = 0; i < turns.length; i++) {
  s = four(s, { type: 'draft', index: 0 })
  s = four(s, { type: 'send' }, 210000 + i * 10000)
  s = four(s, { type: 'tick' }, s.masterScene04!.pending!.dueAt)
 }
 return four(four(s, { type: 'inspect' }), { type: 'accept' })
}
function entries():GameSave{
 let s=newGame();let next=beginScene01({...s,masterOpening:true,chapter1Edition:'ch01-v2-10'},1000);s=captureSceneEntries(s,next,1000);s=settle(s)
 for(let i=0;i<9;i++)s=settle(sendScene01Choice(s,'a','',true,20000+i*1000))
 s=settle(beginScene02(scene01Invitation(s,'join'),40000));for(let i=0;i<9;i++)s=settle(sendScene01Choice(s,'a','',true,50000+i*1000))
 s=settle(openScene03(s,100000));for(let i=0;i<10;i++)s=settle(sendScene01Choice(s,'a','',true,140000+i*1000))
 next=four(s,{type:'start'},200000);s=finishUnknown(captureSceneEntries(s,next,200000))
 next=five(s,{type:'start'},400000);s=captureSceneEntries(s,next,400000)
 s=five(s,{type:'archive-accept'})
 for(let i=0;i<8;i++){s=five(s,{type:'draft',index:0});s=five(s,{type:'send'},410000+i*10000);s=five(s,{type:'tick'},s.masterScene05!.pending!.dueAt)}
 s=five(five(five(s,{type:'install'}),{type:'open-trace'}),{type:'recover'})
 for(const f of masterFragments)s=five(s,{type:'read',id:f.id})
 s=five(s,{type:'observe',id:masterFragments[0].id});s=five(s,{type:'save',id:masterFragments[0].id})
 for(let i=0;i<2;i++){s=five(s,{type:'draft',index:0});s=five(s,{type:'send'},510000+i*10000);s=five(s,{type:'tick'},s.masterScene05!.pending!.dueAt)}
 if(s.masterScene05?.pending)s=five(s,{type:'tick'},s.masterScene05.pending.dueAt)
 s=six(s,{type:'start'},550000);s=six(s,{type:'tick'},s.masterScene06!.pending!.dueAt);s=six(s,{type:'recover'})
 s={...s,masterScene09:{version:1,beat:10,messages:[],received:true,opened:true,inspected:['heading','title','code','reference','unverified','appearance','metadata'],imported:true,analysis:true,comparisons:['contact','capture'],hypothesis:0,reviewed:true,saved:true,complete:true},deliveredEvents:[...s.deliveredEvents,'TA-S09-SCENE10-UNLOCKED']}
 next=ten(s,{type:'start'},600000);s=captureSceneEntries(s,next,600000)
 return {...s,evidence:{...s.evidence,FUTURE:{id:'FUTURE',source:'later',collectedAt:900000,verified:false}}}
}
describe('master route scene-entry checkpoints',()=>{
 it('defines five chapters with ten ordered scene titles each',()=>{
  expect(masterChapterMetadata).toHaveLength(5)
  for(const chapter of masterChapterMetadata)expect(chapter.scenes.map(scene=>scene.number)).toEqual([1,2,3,4,5,6,7,8,9,10])
 })
 it('rebases Scenes 1, 4, 5 and 10 without future evidence or skipped openings',()=>{
  const s=entries()
  for(const n of [1,4,5,10]){
   const scene=libraryScenesForSave(s).find(x=>x.number===n)!,entry=s.replayEntries![snapshotKey(s,scene)]
   expect(entry).toBeDefined();const restored=prepareReplay(entry,1000000,n)
   expect(restored.masterCaseFile?.id).toBe(n===10?'TA-CASE-001':undefined)
   expect(restored.evidence.FUTURE).toBeUndefined()
   if(n===1)expect(restored.prologue?.scene01?.masterScene01).toBe(true)
   if(n===4){expect(restored.masterScene04?.revision).toBe('guarded-chat');expect(restored.masterScene04?.beat).toBe(0);expect(restored.masterScene05).toBeUndefined()}
   if(n===5){expect(restored.masterScene05?.archiveStatus).toBe('offered');expect(masterRecoveryUnits(restored.masterScene05!)).toBe(0);expect(restored.masterScene10).toBeUndefined()}
   if(n===10){expect(restored.masterScene10?.phase).toBe('inventory');expect(masterRecoveryUnits(restored.masterScene05!)+scene06Units(restored.masterScene06)).toBe(200);expect(restored.deliveredEvents).not.toContain('TA-CH02-UNLOCKED')}
  }
 })
 it('atomically replaces the active timeline from each recorded entry and survives reload',async()=>{
  resumeRuntime();await flushGameWrites();discardPendingSave()
  for(const n of [1,4,5,10]){
   const main=entries();await writeGame(main);useGameStore.setState({save:main,ready:true,recoveryRequired:false,saveError:null})
   await startSceneReplay(n)
   const active=useGameStore.getState().save,loaded=(await loadGame()).save
   expect(loaded).toEqual(active);expect(active.evidence.FUTURE).toBeUndefined()
   if(n===4)expect(active.masterScene04?.revision).toBe('guarded-chat')
   if(n===5)expect(active.masterScene05?.archiveStatus).toBe('offered')
   if(n===10)expect(active.masterScene10?.phase).toBe('inventory')
  }
 })
 it('refuses to overwrite with an incompatible old Scene 5 checkpoint',async()=>{
  const main=entries(),scenes=libraryScenesForSave(main)
  const fourEntry=main.replayEntries![snapshotKey(main,scenes.find(x=>x.number===4)!)]
  const fiveEntry=main.replayEntries![snapshotKey(main,scenes.find(x=>x.number===5)!)]
  const historical=finishUnknown({...fourEntry.save,masterScene04:{...fourEntry.save.masterScene04!,revision:undefined}})
  fiveEntry.save=five(historical,{type:'start'},fiveEntry.capturedAt)
  await writeGame(main);useGameStore.setState({save:main,ready:true,recoveryRequired:false,saveError:null})
  await expect(startSceneReplay(5)).rejects.toThrow('Restart Scene 4')
  expect((await loadGame()).save).toEqual(main)
 })
})
