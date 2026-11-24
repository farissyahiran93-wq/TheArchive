import { describe, expect, it } from 'vitest'
import { captureId } from '../content/masterScene08'
import { referenceCardId } from '../content/masterScene09'
import { beginScene01 } from './scene01'
import { captureSceneEntries, libraryScenesForSave, prepareReplay, snapshotKey } from './sceneLibrary'
import { masterScene07Action as seven, validateMasterScene07 } from './masterScene07'
import { masterScene08Action as eight, validateMasterScene08 } from './masterScene08'
import { masterScene09Action as nine, validateMasterScene09 } from './masterScene09'
import { newGame, type GameSave } from './types'

function beforeSophie(): GameSave {
 const s=beginScene01({...newGame(),masterOpening:true,chapter1Edition:'ch01-v2-10'},0)
 return {...s,
  masterScene05:{version:1,beat:10,messages:[],packageStatus:'installed',inspected:true,risksRead:true,opened:true,selected:true,recovered:true,read:[],saved:[],complete:true},
  masterScene06:{version:1,beat:10,messages:[],recovered:true,inspected:[],order:[],uncertainty:true,syncAcknowledged:true,gapAcknowledged:true,saved:true,reportReviewed:true,reportSent:true,complete:true},
  deliveredEvents:[...s.deliveredEvents,'TA-S06-SOPHIE-EXPORT','TA-S06-COMPLETE','TA-S08-LUCAS-PHOTO-INTRO'],
  messages:[...s.messages,{id:'TA-S08-LUCAS-PHOTO-INTRO',sender:'lucas',channel:'messages',delivery:'delivered',text:'Hey.',at:90}],
 }
}

function replayCheckpoint(before:GameSave,active:GameSave,number:number) {
 const live=captureSceneEntries(before,active,100000)
 const scene=libraryScenesForSave(live).find(item=>item.number===number)!
 const entry=live.replayEntries![snapshotKey(live,scene)]
 expect(entry).toBeDefined()
 const unchanged=structuredClone(live)
 const restarted=prepareReplay(entry,900000,number)
 expect(live).toEqual(unchanged)
 expect(restarted.masterScene06).toEqual(before.masterScene06)
 expect(restarted.masterScene05).toEqual(before.masterScene05)
 expect(restarted.messages).toContainEqual(before.messages.find(m=>m.id==='TA-S08-LUCAS-PHOTO-INTRO'))
 expect(restarted.deliveredEvents).toContain('TA-S06-SOPHIE-EXPORT')
 expect(restarted.deliveredEvents).toContain('TA-S08-LUCAS-PHOTO-INTRO')
 return restarted
}

function oldCall(before:GameSave,revision:'audio-v2'|'starred-v2'):GameSave {
 const s=seven(before,{type:'start'})
 return {...s,masterScene07:{...s.masterScene07!,conversationRevision:revision,phase:'ringing',chat:undefined}}
}

function oldCallTo(before:GameSave,clip:number):GameSave {
 let s=seven(oldCall(before,'audio-v2'),{type:'answer'})
 for(let i=0;i<clip;i++){
  s=seven(s,{type:'clip-ended'})
  s=seven(s,{type:'draft',index:0})
  s=seven(s,{type:'send'})
 }
 return s
}

function previousSophieCompleted(before:GameSave):GameSave {
 let s=seven(oldCallTo(before,10),{type:'clip-ended'})
 s=seven(s,{type:'question-draft',index:1})
 s=seven(s,{type:'send-question'})
 s=seven(s,{type:'open'})
 return seven(s,{type:'record-legacy-conclusion',index:0})
}

function afterEightReplies(s:GameSave,count:number) {
 for(let i=0;i<count;i++) {
  if(i===4)s=eight(s,{type:'open'})
  if(i===8)s=eight(s,{type:'record-assessment',id:'crop-original'})
  s=eight(s,{type:'draft',index:0})
  s=eight(s,{type:'send'})
 }
 return s
}

function oldMayaStart(before:GameSave):GameSave {
 const start=eight(before,{type:'start'})
 return {...start,masterScene08:{...start.masterScene08!,conversationRevision:undefined,pending:undefined,messages:[{id:'TA-S08-FIRST',sender:'maya',text:'Previously delivered opening',at:1000}]}}
}

describe('Play from Scene uses a fresh conversation with the earlier case history',()=>{
 it('replays a current Scene 7 entry after the original, already delivered Hey',()=>{
  const before=beforeSophie()
  before.messages.push({id:'TA-S06-SOPHIE-EXPORT',sender:'sophie',text:'Hey.',at:1000,channel:'messages',delivery:'delivered'})
  const restarted=replayCheckpoint(before,seven(before,{type:'start'},9000),7)
  expect(restarted.masterScene07).toMatchObject({conversationRevision:'conversation-v3',phase:'chat',lines:[],chat:{stage:'intro',pending:{index:1}}})
  expect(restarted.masterScene07!.chat!.pending!.dueAt).toBeGreaterThan(900000)
  validateMasterScene07(restarted.masterScene07)
 })
 it('restarts a previous audio call without keeping its draft, playback position or disclosed answer',()=>{
  const before=beforeSophie()
  let old=oldCallTo(before,6)
  old=seven(old,{type:'playback-checkpoint',clip:6,seconds:3.2})
  expect(old.knowledge.characters.sophie).toContain('TA-S07-OTHER-CONTACT-DISCLOSED')
  const restarted=replayCheckpoint(before,old,7)
  expect(restarted.masterScene07).toMatchObject({conversationRevision:'conversation-v3',phase:'chat',clip:0,lines:[],chat:{stage:'intro'}})
  expect(restarted.masterScene07?.playbackSeconds).toBeUndefined()
  expect(restarted.masterScene07?.draft).toBeUndefined()
  expect(restarted.knowledge.characters.sophie).not.toContain('TA-S07-OTHER-CONTACT-DISCLOSED')
  expect(restarted.messages.some(item=>item.id.startsWith('TA-S07-C'))).toBe(false)
  validateMasterScene07(restarted.masterScene07)
 })
 it('replaces an old Scene 8 screenshot and cursor with one paced introduction',()=>{
  const before=previousSophieCompleted(beforeSophie())
  let active=afterEightReplies(oldMayaStart(before),9)
  active=eight(active,{type:'draft',index:1})
  expect(active.evidence[captureId]).toBeDefined()
  const replay=replayCheckpoint(before,active,8)
  expect(replay.masterScene07).toEqual(before.masterScene07)
  expect(replay.evidence['TA-EX-STARRED-ENTRY']).toEqual(before.evidence['TA-EX-STARRED-ENTRY'])
  expect(replay.masterScene08).toMatchObject({conversationRevision:'conversation-v3',beat:0,opened:false,saved:false,messages:[]})
  expect(replay.evidence[captureId]).toBeUndefined()
  expect(replay.masterScene08?.draft).toBeUndefined()
  const first=replay.masterScene08!.pending![0]
  expect(first.text).toBe('Hey.')
  const next=eight(replay,{type:'tick'},first.dueAt)
  expect(next.masterScene08?.messages.map(m=>m.text)).toEqual(['Hey.'])
  expect(eight(next,{type:'tick'},first.dueAt)).toBe(next)
  validateMasterScene08(next.masterScene08)
 })
 it('restarts historical Scene 9 in the existing Maya conversation with its previous transcript intact',()=>{
  const before=afterEightReplies(oldMayaStart(previousSophieCompleted(beforeSophie())),10)
  let active=nine(before,{type:'start'})
  active={...active,masterScene09:{...active.masterScene09!,conversationRevision:undefined,pending:undefined}}
  for(let i=0;i<9;i++){
   if(i===4)active=nine(active,{type:'open'})
   if(i===8)active=nine(active,{type:'record-assessment',id:'card-capture'})
   active=nine(active,{type:'draft',index:1});active=nine(active,{type:'send'})
  }
  expect(active.evidence[referenceCardId]).toBeDefined()
  const replay=replayCheckpoint(before,active,9)
  expect(replay.masterScene08).toEqual(before.masterScene08)
  expect(replay.evidence[captureId]).toEqual(before.evidence[captureId])
  expect(replay.masterScene09).toMatchObject({conversationRevision:'conversation-v3',beat:0,received:false,opened:false,complete:false,messages:[]})
  expect(replay.evidence[referenceCardId]).toBeUndefined()
  const first=replay.masterScene09!.pending![0]
  const next=nine(replay,{type:'tick'},first.dueAt)
  expect(next.masterScene09?.messages.map(m=>m.text)).toEqual(["There's something else."])
  validateMasterScene09(next.masterScene09)
 })
})
