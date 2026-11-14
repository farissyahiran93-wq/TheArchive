import { describe, expect, it } from 'vitest'
import { advanceMasterContinuations } from './masterContinuations'
import { beginScene01 } from './scene01'
import { captureSceneEntries, libraryScenesForSave, snapshotKey } from './sceneLibrary'
import { newGame, type GameSave } from './types'

function ready():GameSave {
 const save=beginScene01({...newGame(),masterOpening:true,chapter1Edition:'ch01-v2-10'},1000)
 return {...save,masterScene04:{version:1,revision:'cinematic',opened:true,beat:10,messages:[],status:'accepted',inspected:false,complete:true,preview:false,traceInstalled:true}}
}
describe('natural master scene continuations',()=>{
 it('starts Scene 5 once after actual installation, without sending for the player',()=>{
  const input=ready(), first=advanceMasterContinuations(input,10000)
  expect(first.masterScene05?.conversationRevision).toBe('archive-v1')
  expect(first.masterScene05?.messages.every(m=>m.sender==='unknown')).toBe(true)
  expect(first.masterScene05?.archiveStatus).toBe('unavailable')
  const captured=captureSceneEntries(input,first,10000)
  const scene=libraryScenesForSave(captured).find(item=>item.number===5)!
  expect(captured.replayEntries?.[snapshotKey(captured,scene)]?.save.masterScene05?.beat).toBe(0)
  expect(advanceMasterContinuations(first,20000)).toBe(first)
  const notInstalled={...input,masterScene04:{...input.masterScene04!,traceInstalled:false}}
  expect(advanceMasterContinuations(notInstalled)).toBe(notInstalled)
 })
 it('requires actual Scene 5 completion and receipt before starting Scene 6',()=>{
  const five=advanceMasterContinuations(ready(),10000)
  const incomplete={...five,masterScene05:{...five.masterScene05!,complete:true,recovered:true,selected:true,opened:true}}
  expect(advanceMasterContinuations(incomplete).masterScene06).toBeUndefined()
  const completed={...incomplete,deliveredEvents:[...incomplete.deliveredEvents,'TA-S05-FINDINGS-SENT']}
  const next=advanceMasterContinuations(completed,20000)
  expect(next.masterScene06?.firstPass20).toBe(true)
  expect(next.masterScene06?.messages).toEqual([])
  expect(advanceMasterContinuations(next,30000)).toBe(next)
 })
 it('starts the incoming call only after the actual Scene 6 receipts, without answering it',()=>{
  const five=advanceMasterContinuations(ready(),10000)
  const s={...five,masterScene05:{...five.masterScene05!,complete:true,recovered:true,selected:true,opened:true},masterScene06:{complete:true,recovered:true,saved:true} as GameSave['masterScene06'],deliveredEvents:['TA-S06-SOPHIE-EXPORT','TA-S06-COMPLETE']}
  const next=advanceMasterContinuations(s,20000)
  expect(next.masterScene07?.phase).toBe('ringing')
  expect(next.masterScene07?.lines).toEqual([])
  expect(advanceMasterContinuations(next,30000)).toBe(next)
 })
})
