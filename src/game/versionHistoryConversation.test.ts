import { describe,it,expect,vi } from 'vitest'
import { ConversationFixture } from '../../tests/helpers/versionHistoryConversation'
import { ActIFinalFixture } from '../../tests/helpers/actIFinal'
import { Scene04Fixture } from '../../tests/helpers/scene04Final'
import { versionHistoryDialogue } from '../content/versionHistoryConversationData'
import { alignedScene04Nodes, conversationNodes, versionHistoryManifest } from '../content/versionHistoryConversation'
import { scene04Nodes } from '../content/scene04Final'
import { archiveInstalled, archiveInstallProgress, originAction } from './archiveOrigin'
import { chapter1Action } from './chapter1'
import { normalizeSave } from './engine'
import { versionHistoryAction, versionHistoryReady } from './scene05'
import { correctionsDeskAction } from './scene06'
import { beginScene01, deliverScene01, draftActIChoice, pauseScene03, scene01Choices, sendScene01Choice } from './scene01'
import { newGame } from './types'
const round=(s:ReturnType<typeof newGame>)=>normalizeSave(JSON.parse(JSON.stringify(s)))

describe('canonical Unknown Number / Version History',()=>{
  it('gives every formerly single article/Unknown reply three tones with identical effects and continuations',()=>{
    const singles=Object.values(scene04Nodes).filter(n=>n.kind==='choice'&&n.choices.length===1)
    for(const old of singles){
      const revised=alignedScene04Nodes[old.id]
      if(old.kind!=='choice'||revised.kind!=='choice')throw Error(old.id)
      expect(revised.choices).toHaveLength(3)
      for(const option of revised.choices)expect({...option,id:old.choices[0].id,text:old.choices[0].text}).toEqual(old.choices[0])
      expect(old.choices).toHaveLength(1)
    }
    for(const n of Object.values(conversationNodes))if(n.kind==='choice')expect(n.choices).toHaveLength(3)
  })
  for(const tone of ['continue-tone-1','continue-tone-2'])it(`persists ${tone} before Send and resumes the same Unknown continuation`,()=>{
    const f=new ConversationFixture(); delete f.save.prologue!.scene01!.traceIntroRevision
    f.tickOne().origin('open').send('who'); const before=f.save
    expect(sendScene01Choice(before,tone,'',true,f.now)).toBe(before)
    f.save=draftActIChoice(f.save,tone);f.save=round(pauseScene03(f.save,f.now));f.origin('open')
    expect(f.save.prologue!.scene01!.draft?.choiceId).toBe(tone)
    f.send(tone)
    expect(f.node().id).toBe('OPEN-ORIGIN-TRUST')
    expect(f.save.chapter1!.sender.messages.filter(m=>m.id===`OPEN-ORIGIN-IDENTITY-PLAYER-${tone}`)).toHaveLength(1)
    expect(f.save.knowledge.characters).toEqual(before.knowledge.characters)
  })
  it('does not send the old unsolicited Maya article warning on the aligned route',()=>{
    const s=new ConversationFixture().save
    expect(s.prologue!.scene01!.groupMessages.some(m=>m.id==='scene04_group_article_boundary')).toBe(false)
    expect(s.notifications.some(n=>n.id==='scene04_group_article_boundary')).toBe(false)
  })
  it('restores installation progress from saved deadlines and holds 100 until dismissed',()=>{
    const f=new ConversationFixture().bridge().origin('security').origin('install')
    expect(archiveInstallProgress(f.save,f.now)).toBe(0)
    expect(archiveInstallProgress(round(f.save),f.now+900)).toBe(16)
    f.tickOne().tickOne().tickOne()
    expect(archiveInstallProgress(f.save,f.now)).toBe(100)
    expect(f.save.chapter1!.archiveOrigin!.securityOpen).toBe(true)
    f.origin('cancel');expect(f.save.chapter1!.archiveOrigin!.securityOpen).toBe(false)
  })
  for(const pick of ['a','b','c'])it(`new dialogue ${pick} requires Send and reveals credibility after C05`,()=>{
    const f=new ConversationFixture().bridge().install().enter().sources()
    f.save.chapter1!.versionHistory!.flags.push('new_dialogue')
    f.unknown()
    for(let i=1;i<=7;i++){
      if(i===6){for(let index=0;index<4;index++)f.do({type:'check',index});f.save=pauseScene03(f.save,f.now);f.unknown()}
      const n=f.node()
      expect(n.id).toBe(`OPEN-VH-NEW-C${String(i).padStart(2,'0')}`)
      if(n.kind!=='choice')throw Error(n.id)
      expect(n.choices).toHaveLength(3)
      if(i===5)expect(f.save.chapter1!.sender.messages.some(m=>m.text==='You found it.')).toBe(false)
      const before=f.save
      expect(sendScene01Choice(before,pick,'',true,f.now)).toBe(before)
      f.send(pick)
      if(i===5)expect(f.save.chapter1!.sender.messages.filter(m=>m.text==='You found it.')).toHaveLength(1)
    }
    expect(f.save.chapter1!.versionHistory!.complete).toBe(true)
    expect(round(f.save)).toEqual(f.save)
  })
  for(const order of [['index','policy','article'],['policy','article','index'],['article','index','policy']] as const)it(`new source discussions follow ${order.join(', ')}`,()=>{
    const f=new ConversationFixture().bridge().install().enter().sources()
    f.save.chapter1!.versionHistory!.flags.push('new_dialogue','flexible_sources')
    f.unknown().send('a')
    expect(f.node().id).toBe('OPEN-VH-NEW-SOURCE-HUB')
    for(const source of order){
      f.do({type:'discuss-source',source})
      expect(f.node().kind).toBe('choice')
      f.send('b')
    }
    expect(f.node().id).toBe('OPEN-VH-NEW-C05')
    expect(f.save.chapter1!.sender.messages.some(m=>m.text==='You found it.')).toBe(false)
    f.send('c');expect(f.save.chapter1!.sender.messages.filter(m=>m.text==='You found it.')).toHaveLength(1)
    f.save=round(f.save)
    for(let index=0;index<4;index++)f.do({type:'check',index})
    f.save=pauseScene03(f.save,f.now);f.unknown().send('a').send('b')
    expect(f.save.chapter1!.versionHistory!.complete).toBe(true)
    expect(f.save.chapter1!.correctionsDesk).toBeUndefined()
    f.save=correctionsDeskAction(f.save,{type:'enter'},f.now)
    expect(f.save.chapter1!.correctionsDesk!.visible).toBe(true)
  })
  it('new optional Sophie and group chats only disclose selected messages to their recipients',()=>{
    const f=new ConversationFixture().bridge().install().enter().sources()
    f.save.chapter1!.versionHistory!.flags.push('new_dialogue','flexible_sources')
    f.unknown().send('a')
    for(const source of ['article','index','policy'] as const)f.do({type:'discuss-source',source}).send('a')
    f.send('a');for(let index=0;index<4;index++)f.do({type:'check',index})
    f.save=pauseScene03(f.save,f.now);f.unknown().send('a').send('a')
    const before=f.save.knowledge.characters.maya
    f.do({type:'thread',thread:'sophie'})
    expect(f.node().id).toBe('OPEN-VH-NEW-C09');f.send('b').send('c')
    expect(f.save.knowledge.characters.maya).toEqual(before)
    f.do({type:'thread',thread:'group'})
    expect(f.node().id).toBe('OPEN-VH-NEW-C11');f.send('a')
    expect(f.save.knowledge.characters.maya.some(id=>id.startsWith('OPEN-VH-NEW-C11-PLAYER-a'))).toBe(true)
    expect(f.save.knowledge.characters.lucas.some(id=>id.startsWith('OPEN-VH-NEW-C11-PLAYER-a'))).toBe(false)
    expect(round(f.save)).toEqual(f.save)
  })
  it('has exactly 11 stable groups, 33 branches and resolvable runner edges',()=>{
    expect(versionHistoryManifest).toHaveLength(11)
    expect(versionHistoryManifest.reduce((n,g)=>n+g.branches,0)).toBe(33)
    expect(new Set(versionHistoryManifest.map(g=>g.id)).size).toBe(11)
    for(const n of Object.values(conversationNodes)){
      for(const id of [...('next' in n&&n.next?[n.next]:[]),...(n.kind==='choice'?n.choices.map(c=>c.next):[])])expect(conversationNodes[id]).toBeDefined()
    }
  })
  it('delays the article lead ten seconds from committed Goodbye without navigation',()=>{
    const f=new ActIFinalFixture(beginScene01(newGame(),1800000000000)).until('complete'),at=f.save.prologue!.scene01!.privateScene03!.completedAt!
    expect(f.save.prologue!.scene01!.messages.at(-1)?.text).toBe('Goodbye.')
    f.save=chapter1Action(f.save,{type:'tick'},at)
    expect(f.save.pendingEvents.find(e=>e.id==='CH1-S04-LEAD')?.dueAt).toBe(at+10000)
    expect(chapter1Action(f.save,{type:'tick'},at+9999).deliveredEvents).not.toContain('CH1-S04-LEAD')
    f.save=chapter1Action(f.save,{type:'tick'},at+10000)
    expect(f.save.prologue!.scene01!.messages.at(-1)?.text).toBe('I found that article. The one I mentioned.')
    expect(archiveInstalled(f.save)).toBe(false)
  })
  it('finishes Sophie before Unknown contact and keeps installation voluntary, resumable and once-only',()=>{
    const f=new ConversationFixture(),before=f.save
    expect(before.prologue!.scene01!.messages.at(-1)?.text).toBe('Thanks for actually reading it.')
    expect(before.chapter1?.archiveOrigin?.contacted).toBe(false)
    expect(archiveInstalled(before)).toBe(false)
    expect(versionHistoryAction(before,{type:'enter'},f.now)).toBe(before)
    f.bridge()
    expect(f.save.chapter1!.archiveOrigin!.packageDelivered).toBe(true)
    expect(f.save.chapter1!.sender.messages.filter(m=>m.attachment==='archive-package')).toHaveLength(1)
    expect(archiveInstalled(f.save)).toBe(false)
    f.origin('security').origin('cancel');expect(archiveInstalled(f.save)).toBe(false)
    f.origin('security').origin('install').tickOne();f.save=round(f.save)
    f.tickOne().tickOne()
    expect(archiveInstalled(f.save)).toBe(true)
    expect(f.save.chapter1!.archiveOrigin!.installStage).toBe('INSTALL COMPLETE')
    expect(originAction(f.save,{type:'install'},f.now)).toBe(f.save)
    expect(f.save.chapter1!.versionHistory).toBeUndefined()
    f.enter();expect(f.save.chapter1!.versionHistory!.sceneId).toBe('ch02_scene05_version_history')
  })
  for(const pick of ['a','b','c'])it(`all seven required exchanges converge on ${pick}, preserve uncertainty and unlock manual Scene 06`,()=>{
    const f=new ConversationFixture().core(pick),p=f.save.chapter1!.versionHistory!
    expect(p.complete).toBe(true);expect(versionHistoryReady(f.save)).toBe(true)
    expect(p.checklist).toHaveLength(4)
    expect(Object.keys(p.chatChoices!)).toHaveLength(7)
    expect(p.inquiry.receipt).toBeUndefined()
    expect(f.save.chapter1!.correctionsDesk).toBeUndefined()
    expect(f.save.knowledge.characters.sophie.some(id=>id.startsWith('OPEN-VH'))).toBe(false)
    expect(f.save.knowledge.characters.maya.some(id=>id.startsWith('OPEN-VH'))).toBe(false)
    expect(p.receipts?.filter(r=>r.recipient==='unknown')).toHaveLength(7)
    expect(Object.values(f.save.evidence).every(e=>e.verified===false)).toBe(true)
    expect(round(f.save)).toEqual(f.save)
    f.save=correctionsDeskAction(f.save,{type:'enter'},f.now)
    expect(f.save.chapter1!.correctionsDesk!.visible).toBe(true)
  })
  for(let i=0;i<7;i++)for(const branch of versionHistoryDialogue[i].branches)it(`${versionHistoryDialogue[i].id}/${branch.id}: selection, Send, scoped statement, persisted continuation`,()=>{
    const f=new ConversationFixture().bridge().install().enter().sources().unknown().atChoice(`OPEN-VH-C${String(i+1).padStart(2,'0')}`),before=f.save
    expect(sendScene01Choice(before,branch.id,'',true,f.now)).toBe(before)
    f.save=draftActIChoice(before,branch.id)
    expect(f.save.chapter1!.sender.messages).toEqual(before.chapter1!.sender.messages)
    f.save=round(f.save)
    const draft=f.save
    f.save=pauseScene03(f.save,f.now);f.save=round(f.save);f.unknown().send(branch.id)
    expect(f.save.choices[draft.prologue!.scene01!.nodeId]).toBe(branch.id)
    expect(f.save.chapter1!.sender.messages.some(m=>m.sender==='player'&&m.text===branch.text)).toBe(true)
    expect(f.save.knowledge.characters).toEqual(before.knowledge.characters)
    expect(f.save.relationships).toEqual(before.relationships)
    f.save=round(f.save)
  })
  it('waits for actual metadata/policy/gap inspection and supports out-of-order source reads',()=>{
    const f=new ConversationFixture().bridge().install().enter().unknown().send('b')
    expect(f.node().id).toBe('OPEN-VH-GATE-02');expect(scene01Choices(f.save)).toEqual([])
    f.do({type:'panel',panel:'policy'}).do({type:'read-policy'}).do({type:'panel',panel:'index'}).do({type:'back'}).unknown()
    expect(f.node().id).toBe('OPEN-VH-GATE-02')
    f.sources().unknown();expect(f.node().id).toBe('OPEN-VH-C02')
    f.atChoice('OPEN-VH-GATE-06');expect(f.save.chapter1!.versionHistory!.complete).toBe(false)
    expect(scene01Choices(f.save)).toEqual([])
  })
  for(const b of versionHistoryDialogue[7].branches)it(`C08/${b.id}: reviewed request, receipt only and Scene 06 continuity`,()=>{
    const f=new ConversationFixture().core(),sophie=f.save.knowledge.characters.sophie
    f.do({type:'panel',panel:'form'}).do({type:'local',id:'S05-C04',choice:b.id}).do({type:'send-request'})
    expect(f.save.chapter1!.versionHistory!.inquiry.receipt).toBeUndefined()
    f.do({type:'review'});f.save=round(f.save);f.do({type:'send-request'})
    const receipt=f.save.chapter1!.versionHistory!.inquiry.receipt
    expect(receipt?.text).toBe(b.text);f.do({type:'send-request'});expect(f.save.chapter1!.versionHistory!.inquiry.receipt).toEqual(receipt)
    expect(f.save.knowledge.characters.sophie).toEqual(sophie)
    f.save=correctionsDeskAction(f.save,{type:'enter'},f.now)
    expect(f.save.chapter1!.correctionsDesk!.prior?.text).toBe(b.text)
  })
  for(const i of [8,9,10])for(const b of versionHistoryDialogue[i].branches)it(`optional ${versionHistoryDialogue[i].id}/${b.id} uses Send and actual recipients`,()=>{
    const f=new ConversationFixture().core();f.tickOne().tickOne().tickOne().tickOne()
    f.do({type:'thread',thread:i===10?'group':'sophie'})
    if(i===9)f.send('a')
    const before=f.save;expect(sendScene01Choice(before,b.id,'',true,f.now)).toBe(before)
    f.send(b.id)
    expect(f.save.chapter1!.versionHistory!.chatChoices?.[versionHistoryDialogue[i].id]).toBe(b.id)
    expect(f.save.knowledge.characters.lucas).toEqual(before.knowledge.characters.lucas)
    expect(f.save.chapter1!.versionHistory!.complete).toBe(true)
    expect(round(f.save)).toEqual(f.save)
  })
  it('migrates obsolete blocking without replaying delivered nodes or discarding unrelated queues',()=>{
    const f=new ActIFinalFixture(),scene=f.save.prologue!.scene01!,held=scene.queue[0]
    const old={...f.save,prologue:{...f.save.prologue!,scene01:{...scene,sophieBlocked:true,blockedQueue:{id:held?.id??scene.nodeId,remainingMs:500,typing:true},queue:[]}}}
    const restored=normalizeSave(old)
    expect(restored.prologue!.scene01!.sophieBlocked).toBeUndefined()
    expect(restored.pendingEvents).toEqual(old.pendingEvents)
    expect(restored.prologue!.scene01!.messages).toEqual(old.prologue!.scene01!.messages)
    expect(normalizeSave(restored)).toEqual(restored)
    const pinned=new Scene04Fixture().at('complete04').save
    pinned.chapter1!.sender.blocked=true
    const migrated=normalizeSave(pinned)
    expect(migrated.chapter1!.sender.blocked).toBeUndefined()
    expect(archiveInstalled(migrated)).toBe(true)
    expect(migrated.chapter1!.archiveOrigin).toBeUndefined()
    expect(migrated.relationships).toEqual(pinned.relationships)
    expect(deliverScene01(migrated,Date.now()).deliveredEvents).toEqual(migrated.deliveredEvents)
  })
  it('normalizes equivalent stored and pending blocked saves identically across different wall times',()=>{
    const s=beginScene01(newGame(),1000),scene=s.prologue!.scene01!,queued=scene.queue[0]
    const raw={...s,prologue:{...s.prologue!,scene01:{...scene,sophieBlocked:true,blockedQueue:{id:queued.id,remainingMs:500,typing:true},queue:[]}}}
    const now=vi.spyOn(Date,'now')
    try{
      now.mockReturnValue(5000);const a=normalizeSave(raw)
      now.mockReturnValue(9000);const b=normalizeSave(raw)
      expect(a).toEqual(b)
      expect(a.prologue!.scene01!.queue).toHaveLength(1)
      expect(raw.prologue.scene01.sophieBlocked).toBe(true)
    }finally{now.mockRestore()}
  })
})
