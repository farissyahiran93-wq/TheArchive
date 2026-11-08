import { describe, expect, it } from 'vitest'
import { masterScene03Nodes } from '../content/masterScene03'
import { normalizeSave } from './engine'
import { openingPresence } from './phonePresentation'
import { sceneComplete } from './sceneLibrary'
import { chapter1Action } from './chapter1'
import { beginScene01, beginScene02, deliverScene01, draftScene03Choice, openScene03, pauseScene03, scene01Invitation, scene01Choices, sendScene01Choice } from './scene01'
import { newGame, type GameSave } from './types'

function settle(s: GameSave): GameSave {
  for (let i=0;i<100;i++) { const q=s.prologue?.scene01?.queue[0]; if(!q)return s; s=deliverScene01(s,q.dueAt) }
  throw Error('Queue did not settle')
}
function beforePrivate(): GameSave {
  let s=settle(beginScene01({...newGame(),masterOpening:true,chapter1Edition:'ch01-v2-10'},1000))
  for(let i=0;i<9;i++)s=settle(sendScene01Choice(s,'a','',true,20000+i*1000))
  s=settle(beginScene02(scene01Invitation(s,'join'),40000))
  for(let i=0;i<9;i++)s=settle(sendScene01Choice(s,'a','',true,50000+i*1000))
  return s
}
describe('master Scene 3',()=>{
  it('delivers the new biscuit photo once at the authored beat without changing already-started saves',()=>{
    for(const isOld of [false,true]){
      let s=settle(openScene03(beforePrivate(),100000))
      if(isOld){const scene=s.prologue!.scene01!;s={...s,prologue:{...s.prologue!,scene01:{...scene,privateScene03:{...scene.privateScene03!,photoRevision:undefined}}}}}
      for(let beat=1;beat<=8;beat++)s=settle(sendScene01Choice(s,'a','',true,140000+beat*1000))
      const photos=s.prologue!.scene01!.messages.filter(m=>m.id==='TA-S03-PHOTO-BISCUITS')
      expect(photos).toHaveLength(isOld?0:1)
      expect(s.evidence['TA-S03-PHOTO-BISCUITS']).toBeUndefined()
      expect(normalizeSave(JSON.parse(JSON.stringify(s))).prologue!.scene01!.messages.filter(m=>m.id==='TA-S03-PHOTO-BISCUITS')).toHaveLength(isOld?0:1)
    }
  })
  it('requires the actual handoff, offers all 30 responses, saves facts and ends offline',()=>{
    expect(openScene03(newGame())).toEqual(newGame())
    for(let selected=1;selected<=10;selected++)for(const option of ['a','b','c']){
      const handoff=beforePrivate()
      expect(handoff.prologue!.scene01!.privateScene03).toBeUndefined()
      let s=settle(openScene03(handoff,100000))
      for(let beat=1;beat<=10;beat++){
        const id=`TA-S03-C${String(beat).padStart(2,'0')}`,node=masterScene03Nodes[id]
        expect(s.prologue!.scene01!.nodeId).toBe(id)
        expect(node.kind).toBe('choice')
        if(node.kind!=='choice')throw Error('Missing choice')
        expect(scene01Choices(s)).toHaveLength(3)
        const choice=node.choices.find(c=>c.id===(beat===selected?option:'a'))!
        const response=masterScene03Nodes[choice.next]
        s=draftScene03Choice(s,choice.id)
        s=normalizeSave(JSON.parse(JSON.stringify(pauseScene03(s,120000))))
        s=openScene03(s,130000)
        s=settle(sendScene01Choice(s,choice.id,'',true,140000+beat*1000))
        if(response.kind==='npc')expect(s.prologue!.scene01!.messages.some(m=>m.id===response.id&&m.text===response.text)).toBe(true)
      }
      expect(s.prologue!.scene01!.messages.filter(m=>m.id==='TA-S03-FIRST-MESSAGE')).toHaveLength(1)
      expect(s.deliveredEvents).toContain('TA-S03-SCENE04-UNLOCKED')
      expect(s.knowledge.player).toContain('TA-S03-SOPHIE-WORK-OBSERVATION')
      expect(sceneComplete(s,3)).toBe(true)
      expect(openingPresence(s,'sophie')).toBe('offline')
      expect(s.chapter1?.archiveOrigin).toBeUndefined()
      const afterWaiting = chapter1Action(s, { type: 'tick' }, 9999999)
      expect(afterWaiting.pendingEvents.some(e => e.id === 'CH1-S04-LEAD')).toBe(false)
      expect(afterWaiting.deliveredEvents).not.toContain('scene04_public_article_lead')
      expect(normalizeSave(JSON.parse(JSON.stringify(s))).prologue!.scene01!.privateScene03?.complete).toBe(true)
    }
  })
})
