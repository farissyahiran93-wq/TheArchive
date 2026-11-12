import { describe, expect, it } from 'vitest'
import { traceFirstBeats, unknownSenderRevisedBeats } from '../content/masterTraceFirst'
import { masterScene04Action } from './masterScene04'
import { beginScene01, beginScene02, deliverScene01, openScene03, scene01Invitation, sendScene01Choice } from './scene01'
import { normalizeSave } from './engine'
import { prepareReplay, sceneComplete, sceneVisited } from './sceneLibrary'
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
describe('Scene 4 archive and dialogue',()=>{
 it('requires actual Scene 3 completion and opens only after the player acts',()=>{
  const empty=newGame();expect(masterScene04Action(empty,{type:'start'})).toBe(empty)
  const s=masterScene04Action(before(),{type:'start'},200000)
  expect(s.masterScene04?.opened).toBe(false)
  expect(s.masterScene04?.messages).toHaveLength(1)
  expect(s.messages.filter(m=>m.id==='TA-S04-SOPHIE-ELI-ENQUIRY')).toHaveLength(1)
  expect(masterScene04Action(s,{type:'start'})).toBe(s)
  const older=before();older.deliveredEvents=older.deliveredEvents.filter(id=>id!=='TA-S03-SCENE04-UNLOCKED')
  expect(masterScene04Action(older,{type:'start'}).masterScene04?.opened).toBe(false)
 })
 it('restarts an archive-first Scene 4 checkpoint on the new graph without future evidence',()=>{
  const old=masterScene04Action(before(),{type:'start'},200000)
  old.masterScene04={...old.masterScene04!,revision:undefined}
  const saved=structuredClone(old)
  const replay=prepareReplay({save:old,capturedAt:200000},300000,4)
  expect(replay.masterScene04?.revision).toBe('guarded-chat')
  expect(replay.masterScene04?.messages.map(m=>m.text)).toEqual(["I know you're looking for Daniel."])
  expect(replay.evidence['TA-S04-ARCHIVE']).toBeUndefined()
  expect(old).toEqual(saved)
 })
 it('executes all 36 alternatives one bubble at a time and persists inspection and acceptance separately',()=>{
  for(let selected=0;selected<unknownSenderRevisedBeats.length;selected++)for(let option=0;option<3;option++){
   let s=masterScene04Action(masterScene04Action(before(),{type:'start'},200000),{type:'open'})
   for(const [beat,item] of unknownSenderRevisedBeats.entries()){
    const index=beat===selected?option:0, count=s.masterScene04!.messages.length
    s=masterScene04Action(s,{type:'draft',index})
    s=normalizeSave(JSON.parse(JSON.stringify(s)))
    s=masterScene04Action(s,{type:'send'},210000+beat)
    expect(s.masterScene04?.messages).toHaveLength(count+1)
    expect(s.masterScene04?.messages.at(-1)?.text).toBe(item.choices[index])
    expect(s.masterScene04?.draft).toBeUndefined()
    expect(masterScene04Action(s,{type:'send'},210000+beat)).toBe(s)
    s=normalizeSave(JSON.parse(JSON.stringify(s)))
    const dueAt=s.masterScene04!.pending!.dueAt
    expect(masterScene04Action(s,{type:'tick'},dueAt-1)).toBe(s)
    s=masterScene04Action(s,{type:'tick'},dueAt)
    expect(s.masterScene04?.messages).toHaveLength(count+2)
    expect(s.masterScene04?.messages.at(-2)?.text).toBe(item.choices[index])
    expect(s.masterScene04?.messages.at(-1)?.text).toBe(item.replies[index])
    expect(masterScene04Action(s,{type:'tick'},dueAt+20000)).toBe(s)
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
   expect(s.evidence['TA-S04-ARCHIVE']).toBeUndefined()
   expect(s.chapter1?.archiveOrigin?.installed).not.toBe(true)
   expect(normalizeSave(JSON.parse(JSON.stringify(s))).masterScene04?.status).toBe('accepted')
  }
 })
 it('opens the manual Scene 5 handoff on Proceed without a preview receipt',()=>{
  let s=masterScene04Action(masterScene04Action(before(),{type:'start'}),{type:'open'})
  for(let i=0;i<unknownSenderRevisedBeats.length;i++){s=masterScene04Action(s,{type:'draft',index:1});s=masterScene04Action(s,{type:'send'},100000+i*1000);s=masterScene04Action(s,{type:'tick'},s.masterScene04!.pending!.dueAt)}
  const previouslyAccepted=normalizeSave(JSON.parse(JSON.stringify({...s,masterScene04:{...s.masterScene04!,status:'accepted'}})))
  for(const offered of [s,previouslyAccepted]){
   const continued=masterScene04Action(offered,{type:'accept'})
   expect(continued.masterScene04).toMatchObject({complete:true,inspected:false,preview:false})
   expect(continued.deliveredEvents).toContain('TA-S04-SCENE05-UNLOCKED')
   expect(continued.deliveredEvents).not.toContain('TA-S04-METADATA-INSPECTED')
   expect(continued.masterScene05).toBeUndefined()
   expect(normalizeSave(JSON.parse(JSON.stringify(continued))).masterScene04?.complete).toBe(true)
  }
 })
 it('upgrades an untouched opener and preserves a drafted choice and in-flight reply from an older save',()=>{
  const fresh=masterScene04Action(before(),{type:'start'},200000)
  const previous={...fresh,masterScene04:{...fresh.masterScene04!,revision:'trace-first' as const}}
  const upgrade=masterScene04Action(previous,{type:'open'})
  expect(upgrade.masterScene04?.revision).toBe('guarded-chat')
  expect(upgrade.masterScene04?.messages).toEqual(previous.masterScene04.messages)

  let s:GameSave={...previous,masterScene04:{...previous.masterScene04,draft:1}}
  s=masterScene04Action(s,{type:'open'})
  expect(s.masterScene04?.revision).toBe('trace-first')
  s=masterScene04Action(s,{type:'send'},210000)
  expect(s.masterScene04?.messages.at(-1)?.text).toBe(traceFirstBeats[0].choices[1])
  s=normalizeSave(JSON.parse(JSON.stringify(s)))
  s=masterScene04Action(s,{type:'tick'},s.masterScene04!.pending!.dueAt)
  expect(s.masterScene04?.messages.at(-1)?.text).toBe(traceFirstBeats[0].replies[1])
  expect(s.masterScene04?.messages).toHaveLength(3)
 })
})
