import { describe, expect, it } from 'vitest'
import { beginScene01, draftActIChoice, pauseScene03, sendScene01Choice } from './scene01'
import { newGame } from './types'
import { actINodes } from '../content/actIRegistry'
import { currentObjective } from './guidance'
import { normalizeSave } from './engine'
import { canonicalSent, canonicalSourceGate } from './archiveOrigin'
import { ConversationFixture } from '../../tests/helpers/versionHistoryConversation'
import { SourceFixture } from '../../tests/helpers/sourceInvestigation'
import { readMenuPreferences, writeMenuPreferences } from './menuPreferences'

describe('TRACE introduction and conservative guidance', () => {
  it('pins the revised introduction for new saves and keeps old saves on the earlier graph', () => {
    const save = beginScene01(newGame(), 1800000000000)
    const scene = save.prologue!.scene01!
    expect(scene.traceIntroRevision).toBe('2026-10-31')
    const nodes = actINodes(scene)
    const choice = nodes['OPEN-ORIGIN-EXPLAIN-4']
    expect(choice.kind).toBe('choice')
    if (choice.kind !== 'choice') throw Error('Missing choice')
    expect(new Set(choice.choices.map(c=>c.text)).size).toBe(3)
    for (const option of choice.choices) {
      const response = nodes[option.next]
      expect(response.kind).toBe('npc')
      if (response.kind !== 'npc') throw Error('Missing reply')
      expect(nodes[response.next!]).toBeDefined()
    }
    const old = { ...scene, traceIntroRevision: undefined, traceUiRevision: undefined, naturalFlowRevision: undefined }
    const legacyChoice = actINodes(old)['OPEN-ORIGIN-EXPLAIN-4']
    expect(legacyChoice.kind === 'choice' && legacyChoice.choices[0].text).toBe('What is TRACE?')
    expect(normalizeSave(JSON.parse(JSON.stringify(save))).prologue!.scene01!.traceIntroRevision).toBe('2026-10-31')
  })
  it('does not offer an objective or mutate a fresh save', () => {
    const save = newGame(), before = JSON.stringify(save)
    expect(currentObjective(save)).toBeUndefined()
    expect(JSON.stringify(save)).toBe(before)
  })
  it('only guides the installed reference after installation and clears it after inspection and reload', () => {
    const f = new ConversationFixture().bridge()
    expect(currentObjective(f.save)?.app).toBe('messages')
    f.install()
    expect(currentObjective(f.save)?.title).toBe('Inspect the recovered reference')
    expect(currentObjective(normalizeSave(JSON.parse(JSON.stringify(f.save))))?.title).toBe('Inspect the recovered reference')
    f.origin('inspect')
    expect(currentObjective(f.save)?.title).not.toBe('Inspect the recovered reference')
  })
  it('persists guidance preferences independently from story saves', () => {
    const original = readMenuPreferences()
    for (const guidance of ['on','minimal','off'] as const) {
      writeMenuPreferences({ ...original, guidance })
      expect(readMenuPreferences().guidance).toBe(guidance)
    }
    writeMenuPreferences(original)
  })
  it('keeps all revised choice options distinct and their destination nodes present', () => {
    const scene = beginScene01(newGame(),1800000000000).prologue!.scene01!
    const nodes = actINodes(scene)
    for (const number of ['01','02','03','04','05','06','07','09','10','11']) {
      const id = 'OPEN-VH-NEW-C'+number, node = nodes[id]
      expect(node?.kind, id).toBe('choice')
      if (node?.kind !== 'choice') continue
      expect(new Set(node.choices.map(c => c.text.trim().toLowerCase())).size, id).toBe(node.choices.length)
      for (const choice of node.choices) expect(nodes[choice.next], `${id}/${choice.id}`).toBeDefined()
    }
  })

  for (const choice of ['continue','continue-tone-1','continue-tone-2']) it(`requires Send for introduction branch ${choice} and resumes its draft`, () => {
    const f = new ConversationFixture().tickOne().origin('open')
    for(let i=0;i<15 && f.node().id !== 'OPEN-ORIGIN-EXPLAIN-4';i++) {
      const node=f.node()
      if(node.kind !== 'choice') throw Error(`Unexpected node ${node.id}`)
      f.send(node.choices[0].id)
    }
    expect(f.node().id).toBe('OPEN-ORIGIN-EXPLAIN-4')
    const before=f.save
    expect(sendScene01Choice(before,choice,'',true,f.now)).toBe(before)
    f.save=draftActIChoice(f.save,choice)
    f.save=normalizeSave(JSON.parse(JSON.stringify(pauseScene03(f.save,f.now))))
    f.origin('open')
    expect(f.save.prologue!.scene01!.draft?.choiceId).toBe(choice)
    f.send(choice)
    expect(f.save.chapter1!.sender.messages.filter(m=>m.sender==='player' && m.id.includes('OPEN-ORIGIN-EXPLAIN-4'))).toHaveLength(1)
    expect(f.save.chapter1!.archiveOrigin!.installed).toBe(false)
  })

  for (const [choice,strategy] of [['a','publisher_clarification'],['b','independent_copy'],['c','preserve_uncertainty']] as const) it(`records the selected strategy ${choice}`, () => {
    const f = new ConversationFixture().bridge().install().enter()
    const p=f.save.chapter1!.versionHistory!
    p.flags.push('new_dialogue')
    p.reading='unknown'
    const scene=f.save.prologue!.scene01!
    scene.nodeId='OPEN-VH-NEW-C06'
    scene.draft={nodeId:scene.nodeId,choiceId:choice}
    const node=actINodes(scene)[scene.nodeId]
    if(node.kind!=='choice')throw Error('Choice missing')
    const result=canonicalSent(f.save,node,choice,f.now)
    expect(result.chapter1!.versionHistory!.strategy).toBe(strategy)
  })

  it('restores a paused new branch reply using its new checkpoint ID', () => {
    const f = new ConversationFixture().tickOne().origin('open')
    for(let i=0;i<15 && f.node().id!=='OPEN-ORIGIN-EXPLAIN-4';i++) {
      const node=f.node()
      if(node.kind!=='choice')throw Error(node.id)
      f.send(node.choices[0].id)
    }
    f.save=draftActIChoice(f.save,'continue-tone-1')
    f.save=sendScene01Choice(f.save,'continue-tone-1','',true,f.now+=100)
    expect(f.save.prologue!.scene01!.queue[0]?.id).toBe('OPEN-ORIGIN-INTRO-SUSPICIOUS')
    f.save=normalizeSave(JSON.parse(JSON.stringify(pauseScene03(f.save,f.now))))
    expect(f.save.chapter1!.archiveOrigin!.checkpoint?.paused?.id).toBe('OPEN-ORIGIN-INTRO-SUSPICIOUS')
    f.origin('open')
    expect(f.save.chapter1!.sender.messages.some(m=>m.id==='OPEN-ORIGIN-INTRO-SUSPICIOUS')).toBe(true)
  })
  it('restores a paused Version History intention reply without changing the selected strategy', () => {
    const f = new ConversationFixture().bridge().install().enter()
    const p=f.save.chapter1!.versionHistory!;p.flags.push('new_dialogue');p.reading='unknown'
    const scene=f.save.prologue!.scene01!;scene.nodeId='OPEN-VH-NEW-C06';scene.draft={nodeId:scene.nodeId,choiceId:'b'}
    const node=actINodes(scene)[scene.nodeId];if(node.kind!=='choice')throw Error('Choice missing')
    f.save=canonicalSent(f.save,node,'b',f.now)
    expect(f.save.prologue!.scene01!.queue[0]?.id).toBe('OPEN-VH-NEW-C06-INTENT-b')
    const paused=normalizeSave(JSON.parse(JSON.stringify(pauseScene03(f.save,f.now))))
    expect(paused.chapter1!.versionHistory!.threads.unknown?.paused?.id).toBe('OPEN-VH-NEW-C06-INTENT-b')
    expect(paused.chapter1!.versionHistory!.strategy).toBe('independent_copy')
  })

  it('points to the actual Sophie handoff only while it is unopened', () => {
    const save=beginScene01(newGame(),1800000000000),scene=save.prologue!.scene01!
    scene.groupComplete=true
    scene.privateHandoff={sceneId:'ch01_sc03_just_between_us',dueAt:1800000005500,deliveredAt:1800000005500}
    expect(currentObjective(save)?.title).toBe('Open Sophie’s message')
    scene.privateHandoff.openedAt=1800000006000
    expect(currentObjective(save)?.title).not.toBe('Open Sophie’s message')
  })

  it('derives later public leads from actual scene state and does not start the next scene', () => {
    const f=new SourceFixture()
    expect(currentObjective(f.save)?.title).toBe('Review the public article')
    f.inspect('article')
    expect(currentObjective(f.save)?.title).toBe('Review the public byline')
    f.core7().enter8()
    expect(currentObjective(f.save)?.title).toBe('Read the civic directory')
    f.core8().enter9()
    expect(currentObjective(f.save)?.title).toBe('Read the public transfer register')
    f.core9().enter10()
    expect(currentObjective(f.save)?.title).toBe('Inspect the public box index')
    expect(f.save.chapter1!.inventorySheet!.flags).not.toContain('box-index-read')
    expect(f.save.chapter1!.completed).not.toContain(10)
  })

  it('resumes an older in-progress comparison without the visual checklist but still requires all source reads', () => {
    const f = new ConversationFixture().bridge().install().enter()
    const p=f.save.chapter1!.versionHistory!;p.chatChoices={...p.chatChoices,s05_c05_comparison:'a'};p.checklist=[]
    expect(canonicalSourceGate(f.save,'OPEN-VH-NEW-GATE-06')).toBe(false)
    f.sources()
    expect(canonicalSourceGate(f.save,'OPEN-VH-NEW-GATE-06')).toBe(true)
    const scene=f.save.prologue!.scene01!;scene.nodeId='OPEN-VH-NEW-C06';scene.draft={nodeId:scene.nodeId,choiceId:'a'}
    const node=actINodes(scene)[scene.nodeId];if(node.kind!=='choice')throw Error('Missing choice')
    const result=canonicalSent(f.save,node,'a',f.now)
    expect(result.chapter1!.versionHistory!.checklist).toEqual([0,1,2,3])
    expect(result.chapter1!.versionHistory!.complete).toBe(false)
  })

})
