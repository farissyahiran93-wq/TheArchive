import { describe, expect, it } from 'vitest'
import { newGame, type GameSave } from './types'
import { masterScene05Action as five } from './masterScene05'
import { masterScene06Action as six } from './masterScene06'
import { scene06V3 } from '../content/masterScene06V3'
import { normalizeSave } from './engine'
import { beginScene01 } from './scene01'
import { prepareReplay } from './sceneLibrary'
import { masterScene07Action } from './masterScene07'
import { masterCaseFileAction, selectMasterCaseFile } from './masterCaseFile'
const drain5=(s:GameSave):GameSave=>{while(s.masterScene05?.pending)s=five(s,{type:'tick'},s.masterScene05.pending.dueAt);return s}
const drain6=(s:GameSave):GameSave=>{while(s.masterScene06?.pending)s=six(s,{type:'tick'},s.masterScene06.pending.dueAt);return s}
function ready():GameSave{
 let s:GameSave={...beginScene01({...newGame(),masterOpening:true,chapter1Edition:'ch01-v2-10'},0),masterScene04:{version:1,revision:'cinematic',opened:true,beat:10,messages:[],status:'accepted',inspected:false,complete:true,preview:false,traceInstalled:true}}
 s=drain5(five(s,{type:'start'},1000))
 for(let i=0;i<10;i++){
  if(i===4){s=five(s,{type:'archive-accept'},100000);s=drain5(five(s,{type:'import-tick'},104000))}
  if(i===6){s=five(s,{type:'open-trace'});s=five(s,{type:'recover'},200000);s=five(s,{type:'recovery-tick'},208000);s=drain5(five(s,{type:'recovery-acknowledge'},208001))}
  s=drain5(five(five(s,{type:'draft',index:0}),{type:'send'},300000+i*10000))
 }
 return s
}
describe('Scene 6 v3',()=>{
 it('delivers four topics in any order before the explicitly triggered finale',()=>{
  let s=drain6(six(ready(),{type:'start'},500000))
  expect(scene06V3).toHaveLength(10)
  expect(scene06V3.every(beat=>beat.choices.length===3)).toBe(true)
  expect(six(s,{type:'inspect-gap'})).toBe(s)
  for(const topic of ['june','maya','lucas','sophie'] as const){
   s=six(s,{type:'topic',topic})
   for(let i=0;i<2;i++){
    s=six(s,{type:'draft',index:1});s=six(s,{type:'send'},600000)
    expect(six(s,{type:'topic',topic:'maya'})).toBe(s)
    s=normalizeSave(JSON.parse(JSON.stringify(s)))
    s=drain6(s)
   }
   expect(s.masterScene06?.completedTopics).toContain(topic)
   expect(six(s,{type:'topic',topic})).toBe(s)
  }
  expect(s.masterScene06?.missingHourAvailable).toBe(true)
  expect(s.masterScene06?.messages.some(m=>m.text==='June Ellis?')).toBe(true)
  expect(s.masterScene06?.messages.some(m=>m.text==='You know June Ellis?')).toBe(true)
  expect(s.masterScene06?.messages.some(m=>m.text==='Open Activity Logs.')).toBe(false)
  s=drain6(six(s,{type:'inspect-gap'},700000))
  expect(s.evidence['TA-FN-MISSING-HOUR']).toBeUndefined()
  expect(s.masterScene06?.pending).toBeUndefined()
  s=six(s,{type:'draft',index:1});expect(s.masterScene06?.pending).toBeUndefined()
  s=drain6(six(s,{type:'send'},710000))
  expect(s.masterScene06?.messages.some(m=>m.text==='A gap?')).toBe(true)
  expect(s.evidence['TA-FN-MISSING-HOUR']).toBeUndefined()
  s=six(s,{type:'draft',index:1});s=drain6(six(s,{type:'send'},720000))
  const nodes=selectMasterCaseFile(s)?.nodes??[]
  expect(new Set(nodes.map(n=>n.id)).size).toBe(nodes.length)
  const gap=nodes.filter(n=>n.id==='TA-FN-MISSING-HOUR')
  expect(gap).toHaveLength(1);expect(gap?.[0].title).toBe('The Missing Hour')
  s=masterCaseFileAction(s,{type:'move-node',id:'TA-FN-MISSING-HOUR',x:23,y:34})
  s=normalizeSave(JSON.parse(JSON.stringify(s)))
  expect(selectMasterCaseFile(s)?.nodes.find(n=>n.id==='TA-FN-MISSING-HOUR')?.position).toEqual({x:23,y:34})
  expect(six(s,{type:'inspect-gap'})).toBe(s)
  expect(s.masterScene06?.complete).toBe(true)
  expect(s.deliveredEvents).toContain('TA-S06-SCENE07-UNLOCKED')
  expect(masterScene07Action(s,{type:'start'},800000).masterScene07?.phase).toBe('chat')
  expect(s.masterScene05?.recoveryAnimation?.percent).toBe(20)
  const restarted=prepareReplay({capturedAt:800000,save:s},900000,6)
  expect(restarted.masterScene06?.scriptVersion).toBe('ch1-s5-s6-v3')
  expect(restarted.masterScene06?.completedTopics).toEqual([])
  expect(restarted.masterScene06?.messages).toEqual([])
  expect(restarted.masterScene05?.recoveryAnimation?.percent).toBe(20)
  expect(restarted.evidence['TA-FN-MISSING-HOUR']).toBeUndefined()
 })
 it('sends each selected reply and queues its matching response for all 30 alternatives',()=>{
  const initial=drain6(six(ready(),{type:'start'},500000))
  for(let n=0;n<10;n++)for(let choice=0;choice<3;choice++){
   const activeTopic=(n<2?'maya':n<4?'sophie':n<6?'lucas':n<8?'june':'gap') as 'maya'|'sophie'|'lucas'|'june'|'gap'
   let s:GameSave={...initial,masterScene06:{...initial.masterScene06!,activeTopic,beat:n,missingHourAvailable:n>=8,completedTopics:n>=8?(['maya','sophie','lucas','june'] as ('maya'|'sophie'|'lucas'|'june')[]):[]}}
   s=six(s,{type:'draft',index:choice});s=six(s,{type:'send'},600000)
   expect(s.masterScene06?.messages.at(-1)?.text).toBe(scene06V3[n].choices[choice])
   expect(s.masterScene06?.pending?.text).toBe((scene06V3[n].branches[choice][0] ?? scene06V3[n].follow[0]))
  }
 })

})
