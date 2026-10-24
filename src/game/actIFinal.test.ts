import { describe, expect, it } from 'vitest'
import { ActIFinalFixture } from '../../tests/helpers/actIFinal'
import { actIFinalManifest, actIFinalNodes } from '../content/actIFinal'
import { actINodes } from '../content/actIRegistry'
import { normalizeSave } from './engine'
import { newGame } from './types'
import { beginLegacyScene01, beginScene01, deliverScene01, scene01Choices, scene01Invitation, draftActIChoice, openScene03, pauseScene03 } from './scene01'
import { chapter1Action, chapter1Lifecycle } from './chapter1'

describe('final owner Act I replacement',()=>{
  it('compiles all 46 main IDs and 201 branches, with only one optional premium per menu',()=>{
    expect(actIFinalManifest).toHaveLength(46)
    expect(actIFinalManifest.reduce((n,m)=>n+m.branches,0)).toBe(201)
    for(const m of actIFinalManifest){expect([4,5]).toContain(m.branches);expect(m.premium).toBeLessThanOrEqual(1)}
    expect(actINodes(beginScene01(newGame(),1).prologue!.scene01)['OPEN-S01-C01']).toBe(actIFinalNodes['OPEN-S01-C01'])
    expect(beginLegacyScene01(newGame(),1).prologue!.scene01!.scriptRevision).toBeUndefined()
  })
  it('plays the new opening, retains selected-but-unsent drafts, and discloses a name only on Send',()=>{
    const f=new ActIFinalFixture().until('OPEN-S01-C08')
    expect(f.save.prologue!.scene01!.messages[0].text).toBe('Hi.')
    f.save=draftActIChoice(f.save,'a')
    expect(normalizeSave(JSON.parse(JSON.stringify(f.save))).prologue!.scene01!.draft?.choiceId).toBe('a')
    expect(f.save.prologue!.scene01!.nameDisclosed).toBe(false)
    f.send('a');expect(f.save.knowledge.characters.sophie).toContain('OPEN-S01-PLAYER-CODENAME')
    expect(f.save.prologue!.scene01!.messages.some(m=>m.sender==='sophie'&&m.text==='Alex. Got it.')).toBe(true)
  })
  it('keeps deferred invitation paused and requires Continue, JOIN, and actual group opening',()=>{
    const f=new ActIFinalFixture().until('OPEN-S01-C13').send('d')
    expect(f.save.prologue!.scene01!.invitation).toBe('declined')
    f.save=scene01Invitation(f.save,'accept',f.now+=100);f.drain()
    expect(f.node().kind).toBe('gate');expect(scene01Choices(f.save)).toEqual([])
    f.act('continue').until('OPEN-S01-C14').send('a')
    f.save=scene01Invitation(f.save,'join',f.now+=100)
    expect(f.save.prologue!.scene01!.groupScript).toBeUndefined()
    f.act('open-group').until('OPEN-S02-C01')
    expect(f.save.prologue!.scene01!.groupMessages.filter(m=>m.text==='You joined FIND DANIEL.')).toHaveLength(1)
  })
  it('learns Sophie’s displayed group name without inventing a missing C01-B introduction or disclosing the player name',()=>{
    const f=new ActIFinalFixture().send('b').until('OPEN-S01-C08')
    expect(f.save.prologue!.scene01!.introduced).toBe(false)
    f.send('b').until('OPEN-S02-C01')
    expect(f.save.prologue!.scene01!.introduced).toBe(true)
    expect(f.save.prologue!.scene01!.nameDisclosed).toBe(false)
    expect(f.save.knowledge.characters.sophie).not.toContain('OPEN-S01-PLAYER-CODENAME')
  })
  it('arrives once after the entire C09 branch and leaves a private request readable later',()=>{
    const f=new ActIFinalFixture().until('OPEN-S02-C09')
    expect(f.save.chapter1?.sender.messages??[]).toHaveLength(0)
    f.send('e')
    expect(f.save.chapter1?.sender.messages??[]).toHaveLength(0) // premium continuation awaits its own Send
    f.send('continue')
    expect(f.save.prologue!.scene01!.nodeId).toBe('OPEN-S02-UNKNOWN-01')
    expect(f.save.chapter1!.sender.messages.map(m=>m.text)).toEqual(["You shouldn't be talking to her."])
    expect(f.save.chapter1!.sender.seen).toBe(false)
    f.act('later').until('OPEN-S02-C10')
    f.sender('who');expect(f.save.chapter1!.sender.messages).toHaveLength(2)
    const later=chapter1Action(f.save,{type:'tick'},f.now+999999)
    expect(later.chapter1!.sender.messages).toHaveLength(2)
    expect(later.knowledge.characters.sophie).not.toContain('CH1-SENDER-WARNING-DISCLOSED')
    expect(later.prologue!.scene01!.groupMessages.some(m=>m.text.includes("You shouldn't"))).toBe(false)
  })
  it('only resumes group after returning, permits blocking and never creates sender responses',()=>{
    const f=new ActIFinalFixture().until('OPEN-S02-C09').send('a').act('open-sender')
    expect(f.save.prologue!.scene01!.nodeId).toBe('OPEN-S02-UNKNOWN-01')
    f.save=chapter1Action(f.save,{type:'block-sender'},f.now)
    f.act('open-group').until('OPEN-S02-C10')
    expect(f.save.chapter1!.sender.blocked).toBe(true)
    expect(f.save.prologue!.scene01!.groupMessages.filter(m=>m.text==='Maya deleted a message.')).toHaveLength(1)
    expect(normalizeSave(JSON.parse(JSON.stringify(f.save))).chapter1!.sender.blocked).toBe(true)
  })
  for(const choice of ['a','b','c','d','e'])it(`C11 ${choice}: Lucas leaves once; the new handoff remains exactly 5.5s and never opens itself`,()=>{
    const f=new ActIFinalFixture().until('OPEN-S02-C11').send(choice).until('OPEN-S02-C13').send('d')
    const scene=f.save.prologue!.scene01!,handoff=scene.privateHandoff!
    expect(scene.groupMessages.filter(m=>m.text==='Lucas left the group.')).toHaveLength(1)
    expect(handoff.deliveredAt).toBe(scene.groupCompletedAt!+5500)
    expect(scene.messages.filter(m=>m.id==='OPEN-S03-FIRST-MESSAGE').map(m=>m.text)).toEqual(['Hey. You got a minute?'])
    expect(scene.privateScene03).toBeUndefined()
    expect(openScene03(f.save,f.now).prologue!.scene01!.privateScene03?.reading).toBe(true)
  })
  it('completes all 14/13/19 free decisions without disclosure, notes, recovered records or Chapter 2',()=>{
    const f=new ActIFinalFixture().until('complete')
    for(const m of actIFinalManifest)expect(f.save.choices[m.id]).toBeTruthy()
    expect(f.save.chapter2Access).toBeUndefined();expect(chapter1Lifecycle(f.save)).toBe('installed_dormant')
    expect(f.save.prologue!.scene01!.messages.at(-1)?.text).toBe('Goodnight.')
    expect(f.save.knowledge.player).toContain('OPEN-S03-SOPHIE-DANIEL-SIBLINGS')
    expect(f.save.knowledge.player).toContain('OPEN-S03-LUCAS-CHILDHOOD-FRIEND')
    expect(f.save.prologue!.scene01!.groupMessages.some(m=>/my brother|fiancée|Axiom Recovery/.test(m.text))).toBe(false)
    expect(f.save.prologue!.scene01!.messages.some(m=>/7-14|entry was removed|first page|Nora Vance/.test(m.text))).toBe(false)
    expect(f.save.chapter1!.sender.disclosed).toBe(false)
  })
  it('reveals optional disclosure only after reading, commits it only after quote Send, and filters impossible reply claims',()=>{
    const f=new ActIFinalFixture().until('OPEN-S02-C09').send('a').sender().act('open-group').until('OPEN-S03-FINAL-DISCLOSURE-OFFER')
    f.act('tell').send('a')
    expect(f.save.chapter1!.sender.disclosed).toBe(false)
    f.send('continue');expect(f.save.chapter1!.sender.disclosed).toBe(true)
    expect(f.save.knowledge.characters.sophie).toContain('CH1-SENDER-WARNING-DISCLOSED')
    expect(f.save.knowledge.characters.maya).not.toContain('CH1-SENDER-WARNING-DISCLOSED')
    f.send('1');expect(f.save.prologue!.scene01!.nodeId).toBe('OPEN-S03-SENDER-RESPONSE')
    expect(scene01Choices(f.save).map(c=>c.id)).toEqual(['1','3','4'])
    f.save=pauseScene03(f.save,f.now);const restored=normalizeSave(JSON.parse(JSON.stringify(f.save)))
    f.save=openScene03(restored,f.now);f.send('3').until('complete')
    expect(f.save.prologue!.scene01!.messages.filter(m=>m.text==='Thanks for telling me.')).toHaveLength(1)
  })
  it('supports keep-private with no outgoing disclosure and a replied-only secondary response when appropriate',()=>{
    const f=new ActIFinalFixture().until('OPEN-S02-C09').send('a').sender('her').act('open-group').until('OPEN-S03-FINAL-DISCLOSURE-OFFER')
    const count=f.save.prologue!.scene01!.messages.filter(m=>m.sender==='player').length
    f.act('keep')
    expect(f.save.prologue!.scene01!.messages.filter(m=>m.sender==='player')).toHaveLength(count)
    expect(f.save.chapter1!.sender.disclosed).toBe(false)
    const g=new ActIFinalFixture().until('OPEN-S02-C09').send('a').sender('her').act('open-group').until('OPEN-S03-FINAL-DISCLOSURE-OFFER').act('tell').send('c').send('continue').send('2')
    expect(scene01Choices(g.save).map(c=>c.id)).toEqual(['1','2','4'])
  })
  it('keeps historical cursors, queued nodes, scores and transcripts unchanged on load',()=>{
    let s=beginLegacyScene01(newGame(),100)
    s=deliverScene01(s,99999)
    expect(normalizeSave(JSON.parse(JSON.stringify(s)))).toEqual(s)
    expect(beginScene01(s,99999)).toBe(s)
  })
  for(const manifest of actIFinalManifest){
    const menu=actIFinalNodes[manifest.id]
    if(menu.kind!=='choice')throw Error('Invalid manifest')
    for(const option of menu.choices)it(`${manifest.id} ${option.id}: branch has an explicit action path and converges`,()=>{
    const f=new ActIFinalFixture().until(manifest.id)
    const initial=f.save.prologue!.scene01!.nodeId
    f.send(option.id)
    for(let i=0;i<50;i++){
      const node=f.node()
      if(node.kind!=='choice'||node.number)break
      expect(scene01Choices(f.save)).toHaveLength(1)
      f.send(scene01Choices(f.save)[0].id)
    }
    expect(f.save.choices[initial]).toBe(option.id)
    expect(normalizeSave(JSON.parse(JSON.stringify(f.save)))).toEqual(f.save)
  })
  }
})
