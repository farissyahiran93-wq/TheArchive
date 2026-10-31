import {describe,it,expect} from 'vitest'
import {existsSync} from 'node:fs'
import {actINodes} from '../content/actIRegistry'
import {beginScene01,actIAction,deliverScene01,scene01Choices} from './scene01'
import {newGame} from './types'

describe('phone continuity revision',()=>{
  it('keeps starred choices available as ordinary explicit Sends',()=>{
    const s=beginScene01(newGame(),1000),p=s.prologue!.scene01!
    const next={...s,prologue:{...s.prologue!,scene01:{...p,nodeId:'OPEN-S01-C02',queue:[]}}}
    expect(scene01Choices(next).some(option=>option.premiumChoice)).toBe(true)
  })
  it('ignores obsolete blocking actions and keeps legitimate delivery active',()=>{
    const s=beginScene01(newGame(),1000),p=s.prologue!.scene01!
    const queued={...s,prologue:{...s.prologue!,scene01:{...p,queue:[{id:p.nodeId,dueAt:2000,typing:true}]}}}
    expect(actIAction(queued,'block-sophie',1200)).toBe(queued)
    expect(actIAction(queued,'unblock-sophie',5000)).toBe(queued)
    expect(deliverScene01(queued,99999)).not.toBe(queued)
  })
  it('delivers one real dinner image, converges at the original Lucas response and keeps the C08 choice',()=>{
    const nodes=actINodes({scriptRevision:'final-2026-10-23'})
    let id='OPEN-S02-FINAL-AFTER-07-7';const lines:string[]=[];let photo=0
    for(let i=0;i<40;i++){
      const node=nodes[id]
      if(id==='OPEN-S02-C08')break
      expect(node).toBeDefined()
      if(node.kind==='npc'){lines.push(node.text);if(node.photo){photo++;expect(node.sender).toBe('sophie');expect(node.photo).toBe('/sophie-dinner.png')}}
      id=node.kind==='npc'||node.kind==='wait'?node.next:''
    }
    expect(id).toBe('OPEN-S02-C08')
    expect(photo).toBe(1)
    expect(lines).toContain('Fine. One photo.')
    expect(lines).toContain('Why are you being funny?')
    expect(lines).toContain('I have a personality outside this conversation.')
    expect(lines).not.toContain('Is there a form I should sign?')
    expect(existsSync('public/sophie-dinner.png')).toBe(true)
  })
})
