import 'fake-indexeddb/auto'
import { beforeEach, describe, expect, it } from 'vitest'
import { beginScene01, deliverScene01 } from './scene01'
import { newGame } from './types'
import { captureSceneEntries, chapterLibrary, prepareReplay, sceneComplete, sceneVisited } from './sceneLibrary'
import { flushGameWrites, resumeRuntime, startSceneReplay, suspendRuntime, useGameStore } from './store'
import { discardPendingSave, loadGame, writeGame } from './save'
import { ActIFinalFixture } from '../../tests/helpers/actIFinal'
import { SourceFixture } from '../../tests/helpers/sourceInvestigation'
import { naturalScene04 } from '../../tests/helpers/naturalConversation'
import { Scene04Fixture } from '../../tests/helpers/scene04Final'
import { ConversationFixture } from '../../tests/helpers/versionHistoryConversation'
import { traceBridgePrefix } from '../content/traceBridgeV3'

const now=1800000000000
function recordedOpening() { return captureSceneEntries(newGame(),beginScene01(newGame(),now),now) }
beforeEach(async()=>{suspendRuntime();resumeRuntime();await flushGameWrites();discardPendingSave();localStorage.clear();useGameStore.setState({save:newGame(),ready:true,recoveryRequired:false,saveError:null})})

describe('production scene library',()=>{
  it('lists only ten integrated Chapter 1 scenes with the final titles and preserved IDs',()=>{
    expect(chapterLibrary.map(c=>c.number)).toEqual([1])
    expect(chapterLibrary[0].scenes.map(s=>s.number)).toEqual([1,2,3,4,5,6,7,8,9,10])
    expect(chapterLibrary[0].scenes.slice(6).map(s=>s.title)).toEqual(['The Byline','The Missing Issuer','The Transfer Register','The Inventory Sheet'])
    expect(chapterLibrary[0].scenes[9].id).toBe('ch01_sc10_a_life_in_fragments')
  })
  it('captures immutable entry context once without recursively copying snapshots',()=>{
    const entry=recordedOpening(),key='OPEN-S01',snapshot=entry.replayEntries![key]
    const originalCount=snapshot.save.prologue!.scene01!.messages.length
    const next={...entry,prologue:{...entry.prologue!,scene01:{...entry.prologue!.scene01!,messages:[...entry.prologue!.scene01!.messages,{id:'test',sender:'player' as const,text:'later',at:now+1}]}}}
    expect(snapshot.save.replayEntries).toBeUndefined()
    expect(snapshot.save.prologue!.scene01!.messages).toHaveLength(originalCount)
    expect(next.prologue!.scene01!.messages.length).toBeGreaterThan(originalCount)
    expect(captureSceneEntries(entry,next).replayEntries![key]).toBe(snapshot)
  })
  it('does not invent old replay context or treat later availability as completion',()=>{
    const old=new ActIFinalFixture().until('OPEN-S03-C01').save
    expect(sceneVisited(old,3)).toBe(true)
    expect(sceneComplete(old,3)).toBe(false)
    expect(captureSceneEntries(old,{...old}).replayEntries).toBeUndefined()
    const final=new SourceFixture().core7().enter8().core8().enter9().core9().enter10().core10().commit10().save
    expect(sceneComplete(final,10)).toBe(true)
    expect(final.chapter1?.chapterComplete).toBe(false)
  })
  it('rebases pending deadlines and preserves dialogue history and recipient knowledge',()=>{
    const entry=recordedOpening().replayEntries!['OPEN-S01']
    const replay=prepareReplay(entry,now+999999)
    expect(replay.prologue!.scene01!.queue[0].dueAt-entry.save.prologue!.scene01!.queue[0].dueAt).toBe(999999)
    expect(replay.knowledge).toEqual(entry.save.knowledge)
    expect(replay.relationships).toEqual(entry.save.relationships)
  })
})

describe('scene restart replaces the primary save',()=>{
  it('uses the current trust flow when replaying an old Scene 4 entry without a reload',async()=>{
    const f=naturalScene04()
    delete f.save.prologue!.scene01!.naturalFlowRevision
    delete f.save.prologue!.scene01!.traceBridgeRevision
    const snapshot=structuredClone(f.save)
    const main=f.at('complete04').save
    const key=chapterLibrary[0].scenes.find(s=>s.number===4)!.id
    main.replayEntries={[key]:{capturedAt:f.now,save:snapshot}}
    await writeGame(main);useGameStore.setState({save:main})
    await startSceneReplay(4)
    const replay=useGameStore.getState().save
    expect(replay.prologue!.scene01!.traceBridgeRevision).toBe('2026-11-04')
    expect(replay.replayEntries![key].save).toEqual(snapshot)
    const finished=new Scene04Fixture(replay).at('complete04')
    const unknown=new ConversationFixture(finished.save).tickOne().origin('open')
    expect(unknown.node().id).toBe(traceBridgePrefix+'C01')
    expect(unknown.save.chapter1!.archiveOrigin!.packageDelivered).toBe(false)
  })
  it('rewinds to the real entry, saves new choices to primary and survives reload',async()=>{
    const main=new ActIFinalFixture(recordedOpening()).until('OPEN-S01-C02').save
    await writeGame(main);useGameStore.setState({save:main})
    await startSceneReplay(1)
    let s=useGameStore.getState().save
    expect((await loadGame()).save).toEqual(s)
    while(s.prologue?.scene01?.queue[0]){useGameStore.setState({save:deliverScene01(s,s.prologue.scene01.queue[0].dueAt)});s=useGameStore.getState().save}
    expect(s.prologue!.scene01!.nodeId).toBe('OPEN-S01-C01')
    useGameStore.getState().draftActI('b');useGameStore.getState().sendScene01('b');await flushGameWrites()
    const saved=(await loadGame()).save
    expect(saved.choices['OPEN-S01-C01']).toBe('b')
    expect(saved.choices['OPEN-S01-C02']).toBeUndefined()
    expect(saved.replayEntries!['OPEN-S01']).toBeDefined()
    await useGameStore.getState().reloadPersisted()
    expect(useGameStore.getState().save.choices['OPEN-S01-C01']).toBe('b')
  })
  it('keeps earlier choices and removes later scene checkpoints when rewinding',async()=>{
    const start=recordedOpening()
    const before=new ActIFinalFixture(start).until('OPEN-S01-C14').save
    const scene2=new ActIFinalFixture(start).until('OPEN-S02-C01').save
    const main=captureSceneEntries(before,scene2,now+1000)
    main.replayEntries!['future-unrelated']={capturedAt:now+2000,save:structuredClone(main.replayEntries!['OPEN-S01'].save)}
    await writeGame(main);useGameStore.setState({save:main})
    await startSceneReplay(2)
    const rewound=useGameStore.getState().save
    expect(rewound.choices['OPEN-S01-C01']).toBe(scene2.choices['OPEN-S01-C01'])
    expect(rewound.knowledge).toEqual(scene2.knowledge)
    expect(rewound.replayEntries!['OPEN-S01']).toBeDefined()
    expect(rewound.replayEntries!['future-unrelated']).toBeUndefined()
    expect((await loadGame()).save).toEqual(rewound)
  })
  it('rejects unvisited scenes and missing or corrupt checkpoints without overwriting',async()=>{
    const main=recordedOpening();await writeGame(main);useGameStore.setState({save:main})
    await expect(startSceneReplay(10)).rejects.toThrow('not been discovered')
    expect((await loadGame()).save).toEqual(main)
    const missing={...main,replayEntries:undefined};useGameStore.setState({save:missing})
    await expect(startSceneReplay(1)).rejects.toThrow('No reliable')
    const broken=structuredClone(main);broken.replayEntries!['OPEN-S01'].save.prologue!.scene01!.nodeId='not-a-node'
    useGameStore.setState({save:broken});await expect(startSceneReplay(1)).rejects.toThrow('Invalid Scene 01')
    expect((await loadGame()).save).toEqual(main)
  })
  it('rejects a stale primary revision instead of overwriting a newer save',async()=>{
    const main=recordedOpening();await writeGame({...main,saveRevision:8});useGameStore.setState({save:{...main,saveRevision:7}})
    await expect(startSceneReplay(1)).rejects.toThrow('another tab')
    expect((await loadGame()).save.saveRevision).toBe(8)
  })
})
