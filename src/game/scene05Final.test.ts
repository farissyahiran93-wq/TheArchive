import { describe,expect,it } from 'vitest'
import { Scene05Fixture } from '../../tests/helpers/scene05Final'
import { Scene04Fixture } from '../../tests/helpers/scene04Final'
import { scene05Nodes,scene05Local,scene05Manifest,scene05Policy } from '../content/scene05Final'
import { actINodes } from '../content/actIRegistry'
import { normalizeSave } from './engine'
import { chapter1Action,chapter1Available } from './chapter1'
import { versionHistoryAction,versionHistoryReady } from './scene05'
import { deliverScene01,draftActIChoice,pauseScene03,openScene03,sendScene01Choice } from './scene01'
import { phoneNotices } from './phonePresentation'
import { readFileSync } from 'node:fs'

const round=(s:ReturnType<Scene05Fixture['core']>['save'])=>normalizeSave(JSON.parse(JSON.stringify(s)))
describe('Scene 05 final authoring',()=>{
  it('retains every authored NPC sentence and gives testimony only to the actual reading player',()=>{
    const source=readFileSync('docs/sources/scene05-final/FULL_SCRIPT.txt','utf8').replace(/\s+/g,' ')
    const nodes=Object.values(scene05Nodes).filter(n=>n.kind==='npc')
    for(const node of nodes){expect(source).toContain(node.text.replace(/\s+/g,' '));expect(node.heardFacts).toEqual([node.id+':reported'])}
    const full=readFileSync('docs/sources/scene05-final/FULL_SCRIPT.txt','utf8')
    const manuscript=full.split('Optional premium social branch')[0]+full.split('07. S05.06 — FIND DANIEL')[1]
    for(const line of manuscript.matchAll(/^ *(?:SOPHIE|MAYA)(?: \(if (?:active member|present)\))?: (.+)$/gm))expect(nodes.some(n=>n.text===line[1].trim())).toBe(true)
    const f=new Scene05Fixture().core(),before=f.save.knowledge.characters
    f.thread('sophie')
    expect(f.save.chapter1!.versionHistory!.receipts?.length).toBeGreaterThan(0)
    for(const r of f.save.chapter1!.versionHistory!.receipts??[]){expect(r.recipient).toBe('player');expect(f.save.knowledge.player).toEqual(expect.arrayContaining(r.factIds))}
    expect(f.save.knowledge.characters).toEqual(before)
  })
  it('applies authored social deltas at delivery once, with no evidence unlock',()=>{
    const cases=[['OPEN-S05-C05','a','sophie','trust',2],['OPEN-S05-C05','b','sophie','affinity',2],['OPEN-S05-C06','b','sophie','trust',1],['OPEN-S05-C07','c','sophie','affinity',1],['OPEN-S05-C09','a','maya','trust',2],['OPEN-S05-C09','c','maya','suspicion',1]] as const
    for(const [node,choice,actor,key,delta] of cases){
      const f=new Scene05Fixture().core().thread(actor==='maya'?'group':'sophie').at(node)
      f.save={...f.save,relationships:{...f.save.relationships,[actor]:{trust:40,affinity:40,suspicion:40}}}
      const evidence=f.save.evidence;f.send(choice);expect(f.save.relationships[actor][key]).toBe(40+delta);expect(f.save.evidence).toEqual(evidence)
      const rel=f.save.relationships;f.save=round(f.save);f.drain();expect(f.save.relationships).toEqual(rel)
    }
  })
  it('registers 11 main choices / 33 branches with existing typed runner targets',()=>{
    expect(scene05Manifest).toHaveLength(11);expect(scene05Manifest.reduce((n,m)=>n+m.branches,0)).toBe(33)
    for(const n of Object.values(scene05Nodes)){
      expect(n.id.startsWith('OPEN-S05-')).toBe(true)
      for(const target of [...('next' in n&&n.next?[n.next]:[]),...(n.kind==='condition'?[n.otherwise]:[]),...(n.kind==='choice'?n.choices.map(c=>c.next):[])])expect(scene05Nodes[target]).toBeDefined()
    }
    expect(scene05Policy).toHaveLength(3)
  })
  it('requires the actual final Scene 04 completion and a manual entry; never migrates historical routes',()=>{
    const f=new Scene04Fixture().at('OPEN-S04-C16'),before=f.save
    expect(versionHistoryAction(before,{type:'enter'})).toBe(before)
    f.at('complete04');expect(f.save.chapter1!.versionHistory).toBeUndefined()
    const old=round(f.save);delete old.prologue!.scene01!.scriptRevision
    expect(versionHistoryAction(old,{type:'enter'})).toBe(old)
    const s=versionHistoryAction(f.save,{type:'enter'});expect(s.chapter1!.completed).toEqual([4]);expect(s.chapter1!.versionHistory!.panel).toBe('home')
    expect(s.prologue!.scene01!.messages).toEqual(f.save.prologue!.scene01!.messages)
  })
  for(const id of Object.keys(scene05Local) as (keyof typeof scene05Local)[])for(const option of scene05Local[id])it(`${id}-${option.id}: exact local branch, scope and round-trip`,()=>{
    const f=new Scene05Fixture().core(),knowledge=f.save.knowledge,relationships=f.save.relationships
    if(id==='S05-C04')f.do({type:'panel',panel:'form'})
    f.do({type:'local',id,choice:option.id})
    expect(f.save.knowledge).toEqual(knowledge);expect(f.save.relationships).toEqual(relationships)
    if(id==='S05-C04'){expect(f.save.chapter1!.versionHistory!.inquiry.text).toBe(option.text);expect(f.save.chapter1!.versionHistory!.inquiry.receipt).toBeUndefined()}
    else if(id==='S05-C02'&&option.id!=='b')expect(f.save.chapter1!.versionHistory!.feedback).toBe(option.feedback)
    else expect(f.save.chapter1!.versionHistory!.localChoices[id]).toBe(option.id)
    expect(round(f.save)).toEqual(f.save)
  })
  for(const m of scene05Manifest.filter(m=>['sophie','group'].includes(m.channel))){const id='OPEN-'+m.id,n=scene05Nodes[id];if(n.kind!=='choice')throw Error(id)
    for(const choice of n.choices)it(`${m.id}-${choice.id}: authored reaction, actual Send, scoped recipients and once-only effect`,()=>{
      const f=new Scene05Fixture().core().thread(m.channel as 'sophie'|'group').at(id),before=f.save
      f.save=draftActIChoice(f.save,choice.id)
      expect(f.save.messages).toEqual(before.messages);expect(f.save.relationships).toEqual(before.relationships);expect(f.save.knowledge).toEqual(before.knowledge)
      expect(round(f.save)).toEqual(f.save)
      f.send(choice.id)
      expect(f.save.choices[id]).toBe(choice.id)
      const messages=f.save.messages.filter(x=>x.id.startsWith(id+'-PLAYER-'+choice.id))
      expect(messages.length).toBe(m.channel==='group'?2:1);expect(messages.every(x=>x.text===choice.text)).toBe(true)
      expect(f.save.knowledge.characters.lucas).toEqual(before.knowledge.characters.lucas)
      expect(f.save.knowledge.characters.eli).toEqual(before.knowledge.characters.eli)
      expect(f.save.knowledge.characters.nora).toEqual(before.knowledge.characters.nora)
      const rel=f.save.relationships
      expect(sendScene01Choice(f.save,choice.id,'',true,f.now).relationships).toEqual(rel)
      f.save=pauseScene03(f.save,f.now);expect(round(f.save)).toEqual(f.save)
    })
  }
  it('requires all independent core gates; wrong answers remain nonpunitive and optional threads do not block conclusion',()=>{
    const f=new Scene05Fixture(),before=f.save
    f.do({type:'local',id:'S05-C11',choice:'a'});expect(f.save).toBe(before)
    f.do({type:'panel',panel:'policy'});expect(f.save).toBe(before)
    f.core().do({type:'local',id:'S05-C11',choice:'a'})
    expect(f.save.chapter1!.versionHistory!.complete).toBe(true);expect(f.save.chapter1!.completed).toEqual([4,5])
    expect(f.save.chapter1!.versionHistory!.threads).toEqual({});expect(f.save.chapter1!.versionHistory!.inquiry.status).toBe('not_sent')
    expect(f.save.evidence['EV-S05-REVISION-LIMIT-001'].verified).toBe(false)
    f.do({type:'next-lead'});expect(f.save.chapter1!.versionHistory!.feedback).toBe('Next lead not yet available');expect(f.save.chapter1!.completed).toEqual([4,5])
    expect(chapter1Available(f.save)).toEqual([])
    expect(chapter1Action(f.save,{type:'step',id:'field-context'},f.now)).toBe(f.save)
  })
  it('retains both source attributions; zero bookmarks does not fabricate another snapshot',()=>{
    const f=new Scene05Fixture(),before=f.save.evidence;f.core()
    expect(f.save.evidence['EV-PUBLIC-GB-001']).toBeUndefined();expect(f.save.evidence['EV-INDEX-GB-041']).toBeUndefined()
    expect(f.save.evidence).toMatchObject(before);expect(Object.values(f.save.evidence).every(e=>e.verified===false)).toBe(true)
    const saved=new Scene05Fixture(new Scene04Fixture().at('complete04',{savePick:'a'}).save),sources=saved.save.evidence
    saved.core();expect(saved.save.evidence['EV-PUBLIC-GB-001']).toEqual(sources['EV-PUBLIC-GB-001']);expect(saved.save.evidence['EV-INDEX-GB-041']).toEqual(sources['EV-INDEX-GB-041'])
  })
  it('preserves blocked Unknown and sends one optional notification with no private knowledge or forced opening',()=>{
    const f=new Scene05Fixture();f.save=chapter1Action(f.save,{type:'block-sender'},f.now);const before=f.save.chapter1!.sender,knowledge=f.save.knowledge
    f.core();expect(f.save.chapter1!.sender).toEqual(before);expect(f.save.knowledge.characters).toEqual(knowledge.characters);expect(f.save.knowledge.player).toContain('POL-GB-UPDATES-001:read')
    expect(f.save.chapter1!.versionHistory!.reading).toBeUndefined()
    expect(phoneNotices(f.save).filter(n=>n.id==='EV-S05-SOPHIE-OPEN')).toHaveLength(1)
    f.do({type:'check',index:3});expect(f.save.prologue!.scene01!.messages.filter(m=>m.id==='EV-S05-SOPHIE-OPEN')).toHaveLength(1)
  })
  for(const closing of ['save-draft','cancel','back','request-failed'] as const)it(`form ${closing}: no disclosure, exact draft retained and safe retry`,()=>{
    const f=new Scene05Fixture().core().do({type:'panel',panel:'form'}).do({type:'local',id:'S05-C04',choice:'b'}).do({type:'review'}),before=f.save.knowledge
    f.do({type:closing});expect(f.save.chapter1!.versionHistory!.inquiry.receipt).toBeUndefined();expect(f.save.knowledge).toEqual(before)
    f.save=round(f.save);f.do({type:'panel',panel:'form'}).do({type:'review'}).do({type:'send-request'})
    const receipt=f.save.chapter1!.versionHistory!.inquiry.receipt!;expect(receipt.id).toBe('R-GB-VH-001');expect(receipt.text).toBe(scene05Local['S05-C04'][1].text)
    f.save=round(f.save);f.do({type:'send-request'});expect(f.save.deliveredEvents.filter(id=>id===receipt.id)).toHaveLength(1);expect(f.save.chapter1!.versionHistory!.inquiry.receipt).toEqual(receipt)
    expect(f.save.knowledge).toEqual(before);expect(f.save.messages.some(m=>m.recipient==='nora'&&m.id.startsWith('OPEN-S05-'))).toBe(false)
  })
  it('does not send an unreviewed form and invalidates review when question changes',()=>{
    const f=new Scene05Fixture().core().do({type:'panel',panel:'form'}).do({type:'local',id:'S05-C04',choice:'a'}).do({type:'send-request'})
    expect(f.save.chapter1!.versionHistory!.inquiry.receipt).toBeUndefined()
    f.do({type:'review'}).do({type:'local',id:'S05-C04',choice:'c'}).do({type:'send-request'});expect(f.save.chapter1!.versionHistory!.inquiry.receipt).toBeUndefined()
  })
  it('keeps optional thread cursors/drafts separate, paused delays exact and callbacks cancellable',()=>{
    const f=new Scene05Fixture().core();f.save=versionHistoryAction(f.save,{type:'thread',thread:'sophie'},f.now)
    const q=f.save.prologue!.scene01!.queue[0];expect(deliverScene01(f.save,q.dueAt-1)).toBe(f.save)
    f.save=pauseScene03(f.save,f.now+300);const paused=f.save.chapter1!.versionHistory!.threads.sophie!.paused!
    expect(paused.remainingMs).toBe(q.dueAt-f.now-300);expect(deliverScene01(f.save,q.dueAt+100000)).toBe(f.save)
    f.save=round(f.save);f.save=openScene03(f.save,f.now+1000);expect(f.save.prologue!.scene01!.queue[0].dueAt).toBe(f.now+1000+paused.remainingMs)
    f.drain().at('OPEN-S05-C05');f.save=draftActIChoice(f.save,'c');f.thread('group');expect(f.node().id).toBe('OPEN-S05-C09')
    f.save=draftActIChoice(f.save,'b');f.thread('sophie');expect(f.node().id).toBe('OPEN-S05-C05');expect(f.save.prologue!.scene01!.draft?.choiceId).toBe('c')
    f.thread('group');expect(f.save.prologue!.scene01!.draft?.choiceId).toBe('b');expect(f.save.deliveredEvents).not.toContain('EV-S05-GROUP-SENT')
  })
  it('never restores absent Maya/Sophie members or produces Lucas/Eli/Nora lines',()=>{
    const f=new Scene05Fixture().core(),scene=f.save.prologue!.scene01!
    f.save={...f.save,prologue:{...f.save.prologue!,scene01:{...scene,groupMembers:{maya:true,sophie:false,lucas:false}}}}
    f.thread('group').send('a').send('a')
    expect(f.save.prologue!.scene01!.groupMessages.filter(m=>m.id.startsWith('OPEN-S05-')).every(m=>m.sender==='maya'||m.sender==='player')).toBe(true)
    f.save={...f.save,prologue:{...f.save.prologue!,scene01:{...f.save.prologue!.scene01!,groupMembers:{maya:false,sophie:false,lucas:false}}}}
    const before=f.save;f.thread('group');expect(f.save).toBe(before)
  })
  it('supports optional premium using the established access gate and a separate continuation Send',()=>{
    const f=new Scene05Fixture().core().thread('sophie').at('OPEN-S05-C06').send('a').do({type:'bonus'}),before=f.save
    expect(sendScene01Choice(before,'bonus','',false,f.now)).not.toBe(before)
    f.send('bonus');expect(f.node().kind).toBe('choice');expect(f.save.prologue!.scene01!.messages.at(-1)!.text).toContain('A takeaway slip')
    const affinity=f.save.relationships.sophie.affinity;f.send('continue');expect(f.save.relationships.sophie.affinity).toBe(affinity+1)
    f.at('OPEN-S05-C08').send('b');expect(f.save.chapter1!.versionHistory!.threads.sophie!.complete).toBe(true)
  })
  it('round-trips each source/policy/checklist/conclusion gate and preserves old Scene 04 with no additive state',()=>{
    const f=new Scene05Fixture(),old=new Scene04Fixture().at('complete04').save
    expect(round(old)).toEqual(old);expect(round(old).chapter1!.versionHistory).toBeUndefined()
    for(const panel of ['public','index','home'] as const){f.do({type:'panel',panel});expect(round(f.save)).toEqual(f.save)}
    f.core();expect(versionHistoryReady(f.save)).toBe(true)
    for(const n of Object.values(scene05Nodes))expect(actINodes(f.save.prologue!.scene01)[n.id]).toBe(n)
    const bad=structuredClone(f.save);bad.chapter1!.versionHistory!.complete=true;expect(()=>round(bad)).toThrow('Invalid Scene 05')
  })
})
