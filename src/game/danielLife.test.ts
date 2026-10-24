import { describe, expect, it } from 'vitest'
import { lifeRecords, mayaBirthday, mirrorApps } from '../content/danielLife'
import { chapter2Access } from './chapter2Access'
import { canReadLife, lifeKey, reduceLife, visibleLifeRecords } from './danielLife'
import { beginLegacyScene01 as beginScene01 } from './scene01'
import { normalizeSave } from './engine'
import { newGame, type GameSave } from './types'

const time=1800000000000
function expanded() {
  const s=beginScene01({ ...newGame(), narrativePlan: 'legacy-access' },time)
  s.prologue!.scene01={...s.prologue!.scene01!,queue:[],groupComplete:true,lucasLeftGroup:true,privateScene03:{version:1,startedAt:time,complete:true,completedAt:time,reading:false,nextEventReady:true,receipts:[]}}
  const next=chapter2Access(s,{type:'tick'},time+7000)
  next.chapter2Access={...next.chapter2Access!,node:'OFFLINE',phase:'installed',packageStatus:'accepted',installAuthorized:true,installCompleted:true,mirrorUnlocked:true,spyInstalled:true,unknownOffline:true}
  return chapter2Access(next,{type:'open-mirror'},time+10000)
}
function view(s:GameSave,id:string) {const item=lifeRecords.find(i=>i.id===id)!;return reduceLife(s,{type:'life-navigate',location:{app:item.app,item:id}})}

describe('Daniel — Life in Fragments',()=>{
  it('has 67 stable authored records, twelve apps, valid references and a fixed calendar',()=>{
    expect(lifeRecords).toHaveLength(67)
    expect(mirrorApps).toHaveLength(12)
    expect(new Set(lifeRecords.map(i=>i.id)).size).toBe(lifeRecords.length)
    for(const r of lifeRecords){
      expect(mirrorApps).toContain(r.app)
      if(r.related)expect(lifeRecords.some(i=>i.id===r.related)).toBe(true)
      if(r.date){expect(r.date).toMatch(/^2026-\d{2}-\d{2}$/);expect(Number.isNaN(Date.parse(r.date))).toBe(false)}
      if(r.chat)expect(r.chat.every(m=>['maya','lucas','sophie','eli','nora','daniel'].includes(m.sender))).toBe(true)
    }
    expect(mayaBirthday).toEqual({day:18,month:9})
    expect(lifeRecords.find(i=>i.id==='LIFE-CAL1')?.date).toBe('2026-09-18')
    expect(lifeRecords.find(i=>i.id==='LIFE-E2')?.body).toContain('Thursday, 1 October')
  })
  it('keeps affectionate chats read-only and aligns Daniel as their existing sender',()=>{
    expect(lifeRecords.find(i=>i.id==='LIFE-M1')?.chat).toHaveLength(14)
    expect(lifeRecords.find(i=>i.id==='LIFE-M4')?.chat?.[0]).toEqual({sender:'eli',text:'Did you take my blue mug?'})
    expect(lifeRecords.find(i=>i.id==='LIFE-M6')).toMatchObject({unavailable:true,body:'This item is not present in the mirrored snapshot.'})
    const s=expanded();let next=s
    for(const r of lifeRecords.filter(i=>i.app==='Messages'))next=view(next,r.id)
    expect(next.messages).toEqual(s.messages)
    expect(next.chapter2Access?.messages).toEqual(s.chapter2Access?.messages)
    expect(next.knowledge.characters).toEqual(s.knowledge.characters)
    expect(next.relationships).toEqual(s.relationships)
  })
  it('never indexes the locked note body and wrong codes preserve all progress',()=>{
    const start=expanded(), note=lifeRecords.find(i=>i.id==='LIFE-N7')!
    expect(canReadLife(start,note)).toBe(false)
    expect(visibleLifeRecords(start,'Notes','If I am wrong')).toEqual([])
    let s=view(start,note.id)
    expect(s.chapter2Access?.viewed).not.toContain(note.id)
    for(let i=0;i<3;i++)s=reduceLife(s,{type:'life-unlock',answer:'0000'})
    expect(s.chapter2Access?.details?.attempts).toBe(3)
    expect(s.chapter2Access?.recovery).toBeUndefined()
    expect(s.prologue).toEqual(start.prologue)
    expect(s.chapter2Access?.details?.unlocked).toEqual([])
    s=reduceLife(s,{type:'life-unlock',answer:'1809'})
    expect(canReadLife(s,note)).toBe(true)
    expect(s.chapter2Access?.details?.observations).toContain('OBS_DANIEL_PRIVATE_NOTE_UNLOCKED')
    expect(visibleLifeRecords(s,'Notes','If I am wrong').map(i=>i.id)).toEqual([note.id])
    expect(normalizeSave(JSON.parse(JSON.stringify(s)))).toEqual(s)
    expect(s.knowledge.characters).toEqual(start.knowledge.characters)
    expect(s.knowledge.player).not.toContain('K01')
    expect(s.knowledge.player).not.toContain('K02')
  })
  for(const [id,observation] of [['LIFE-CAL1','OBS_MAYA_BIRTHDAY_READ'],['LIFE-CONTACT2','OBS_MAYA_BIRTHDAY_READ'],['LIFE-ARTICLE','OBS_NORA_ARTICLE_READ'],['LIFE-CAL7','OBS_NORA_APPOINTMENT_READ'],['LIFE-P5','OBS_RIDGEWAY_SEARCH_VIEWED'],['LIFE-E4','OBS_STORAGE_NOTICE_READ']])it(`records only explicit player inspection of ${id}`,()=>{
    const s=expanded();const next=view(s,id)
    expect(s.chapter2Access?.details?.observations).not.toContain(observation)
    expect(next.chapter2Access?.details?.observations).toEqual([observation])
    expect(next.knowledge.characters).toEqual(s.knowledge.characters)
    expect(next.chapter2Access?.receipts.filter(r=>r.eventId===observation)).toEqual([{eventId:observation,recipient:'player',source:'mirror-fragment'}])
    expect(reduceLife(next,{type:'life-inspect',id})).toBe(next)
  })
  it('only reveals the voice transcript on an explicit request, with independent receipt',()=>{
    let s=view(expanded(),'LIFE-V5')
    expect(s.chapter2Access?.details?.observations).not.toContain('OBS_VOICE_UNSENT_READ')
    s=reduceLife(s,{type:'life-transcript',id:'LIFE-V5'})
    expect(s.chapter2Access?.details?.transcripts).toEqual(['LIFE-V5'])
    expect(s.chapter2Access?.details?.observations).toContain('OBS_VOICE_UNSENT_READ')
    expect(reduceLife(s,{type:'life-transcript',id:'LIFE-V5'})).toBe(s)
  })
  it('remembers navigation, scroll, calendar month, queries and forward history after reload',()=>{
    let s=expanded();s=reduceLife(s,{type:'life-navigate',location:{app:'Calendar',month:'2026-09',day:'2026-09-18',mode:'day'}})
    const loc=s.chapter2Access!.details!.location
    s=reduceLife(s,{type:'life-scroll',key:lifeKey(loc),value:240})
    s=view(s,'LIFE-CAL1')
    s=normalizeSave(JSON.parse(JSON.stringify(s)))
    s=reduceLife(s,{type:'life-back'})
    expect(s.chapter2Access?.details?.location).toEqual(loc)
    expect(s.chapter2Access?.details?.scroll[lifeKey(loc)]).toBe(240)
    s=reduceLife(s,{type:'life-forward'})
    expect(s.chapter2Access?.details?.location.item).toBe('LIFE-CAL1')
  })
  it('requires the actual storage notice, preserves 25 minutes in production, and deduplicates completion',()=>{
    let s=expanded()
    expect(chapter2Access(s,{type:'start-recovery'},time)).toBe(s)
    s=reduceLife(s,{type:'life-navigate',location:{app:'Mail'}})
    expect(chapter2Access(s,{type:'start-recovery'},time)).toBe(s)
    s=view(s,'LIFE-E4')
    s=chapter2Access(s,{type:'start-recovery'},time)
    expect(s.chapter2Access?.recovery).toEqual({startedAt:time,dueAt:time+1500000})
    expect(chapter2Access(s,{type:'start-recovery'},time+1)).toBe(s)
    expect(chapter2Access(s,{type:'open-recovery-test'},time+1)).toBe(s)
    s=normalizeSave(JSON.parse(JSON.stringify(s)))
    s=chapter2Access(s,{type:'tick'},time+1500000)
    expect(s.chapter2Access?.recovery?.readyAt).toBe(time+1500000)
    const again=chapter2Access(s,{type:'tick'},time+1500001)
    expect(again.deliveredEvents.filter(id=>id==='C2-RECOVERY-READY')).toHaveLength(1)
    expect(again.chapter2Access?.recovery?.readyAt).toBe(time+1500000)
    expect(again.chapter2Access).not.toHaveProperty('recoveredContents')
  })
  it('opens immediately for authorized testing without altering the original deadline or inventing contents',()=>{
    let s=view(expanded(),'LIFE-E4')
    s=chapter2Access(s,{type:'start-recovery'},time,true)
    expect(s.chapter2Access?.recovery).toEqual({startedAt:time,dueAt:time+1500000,readyAt:time,testOpened:true})
    expect(s.chapter2Access?.groupDueAt).toBe(time+18000)
    expect(s.chapter2Access?.groupMessages).toEqual([])
    const loaded=normalizeSave(JSON.parse(JSON.stringify(s)))
    expect(loaded.chapter2Access?.recovery).toEqual(s.chapter2Access?.recovery)
  })
  it('can open an existing running test job immediately without resetting it',()=>{
    let s=view(expanded(),'LIFE-E4')
    s=chapter2Access(s,{type:'start-recovery'},time)
    s=chapter2Access(s,{type:'open-recovery-test'},time+10,true)
    expect(s.chapter2Access?.recovery).toEqual({startedAt:time,dueAt:time+1500000,readyAt:time+10,testOpened:true})
    expect(chapter2Access(s,{type:'open-recovery-test'},time+20,true)).toBe(s)
  })
})
