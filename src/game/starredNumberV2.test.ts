import { describe, expect, it } from 'vitest'
import { Scene05Fixture } from '../../tests/helpers/scene05Final'
import { correctionsDeskAction } from './scene06'
import { starredNumberAction, starredNumberTick } from './starredNumberV2'
import { normalizeSave } from './engine'

function ready() {
  const f=new Scene05Fixture();f.core();f.do({type:'local',id:'S05-C11',choice:'a'})
  f.save=correctionsDeskAction(f.save,{type:'activate'},f.now)
  f.save=correctionsDeskAction(f.save,{type:'panel',panel:'register'},f.now)
  f.save=correctionsDeskAction(f.save,{type:'save-finding'},f.now)
  expect(f.save.chapter1?.correctionsDesk?.complete).toBe(true)
  return f
}
describe('Scene 07 v2 — The Starred Number',()=>{
  it('requires Scene 06 and delivers Sophie’s opening once after the delay',()=>{
    const f=new Scene05Fixture();f.core()
    expect(starredNumberAction(f.save,{type:'enter'},f.now)).toBe(f.save)
    const r=ready();r.save=starredNumberAction(r.save,{type:'enter'},r.now)
    expect(r.save.chapter1?.starredNumberV2?.lines).toHaveLength(0)
    expect(starredNumberTick(r.save,r.now+1499)).toBe(r.save)
    r.save=starredNumberTick(r.save,r.now+1500)
    expect(r.save.chapter1?.starredNumberV2?.lines).toHaveLength(2)
    expect(starredNumberTick(r.save,r.now+5000)).toBe(r.save)
  })
  it('requires explicit Send, inspection and private conclusion without claiming provenance',()=>{
    const f=ready();f.save=starredNumberAction(f.save,{type:'enter'},f.now);f.save=starredNumberTick(f.save,f.now+1500)
    expect(starredNumberAction(f.save,{type:'send'},f.now)).toBe(f.save)
    f.save=starredNumberAction(f.save,{type:'draft',id:'original'},f.now)
    f.save=starredNumberAction(f.save,{type:'send'},f.now)
    expect(f.save.chapter1?.starredNumberV2?.phase).toBe('inspect')
    for(const field of ['label','number'] as const)f.save=starredNumberAction(f.save,{type:'inspect',field},f.now)
    expect(f.save.evidence['EV-S07V2-CONTACT-ENTRY']).toBeUndefined()
    for(const field of ['star','limits'] as const)f.save=starredNumberAction(f.save,{type:'inspect',field},f.now)
    expect(f.save.evidence['EV-S07V2-CONTACT-ENTRY'].verified).toBe(false)
    expect(f.save.chapter1?.starredNumberV2?.phase).toBe('questions')
    f.save=starredNumberAction(f.save,{type:'draft',id:'verify'},f.now)
    expect(f.save.chapter1?.starredNumberV2?.mainChoice).toBeUndefined()
    f.save=starredNumberAction(f.save,{type:'send'},f.now)
    expect(f.save.chapter1?.starredNumberV2?.mainChoice).toBe('verify')
    f.save=starredNumberAction(f.save,{type:'conclude'},f.now)
    f.save=starredNumberAction(f.save,{type:'draft',id:'limit'},f.now)
    f.save=starredNumberAction(f.save,{type:'conclude'},f.now)
    expect(f.save.chapter1?.starredNumberV2?.complete).toBe(true)
    expect(f.save.evidence['EV-S07V2-PRIVATE-CONCLUSION'].verified).toBe(false)
    expect(normalizeSave(JSON.parse(JSON.stringify(f.save)))).toEqual(f.save)
  })
  it('does not send a group message without selection and explicit Send',()=>{
    const f=ready();f.save=starredNumberAction(f.save,{type:'enter'},f.now);f.save=starredNumberTick(f.save,f.now+1500)
    f.save=starredNumberAction(f.save,{type:'draft',id:'exact'},f.now);f.save=starredNumberAction(f.save,{type:'send'},f.now)
    for(const field of ['label','number','star','limits'] as const)f.save=starredNumberAction(f.save,{type:'inspect',field},f.now)
    f.save=starredNumberAction(f.save,{type:'draft',id:'memory'},f.now);f.save=starredNumberAction(f.save,{type:'send'},f.now)
    expect(starredNumberAction(f.save,{type:'group-send'},f.now)).toBe(f.save)
  })
})
