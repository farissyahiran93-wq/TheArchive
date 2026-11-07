import { describe, expect, it } from 'vitest'
import { activityEvents, scene06Beats } from '../content/masterScene06'
import { masterScene06Action as act, scene06Units, timelineReady } from './masterScene06'
import { newGame, type GameSave } from './types'
import { normalizeSave } from './engine'
const ready=():GameSave=>({...newGame(),masterScene04:{version:1,opened:true,beat:10,messages:[],status:'accepted',inspected:true,complete:true,preview:false},masterScene05:{version:1,beat:10,messages:[],packageStatus:'installed',inspected:true,risksRead:true,opened:true,selected:true,recovered:true,read:['TA-PH-MESSAGE-FAMILY-01','TA-PH-MESSAGE-JUNE-01','TA-PH-NOTE-ORDINARY-01','TA-PH-NOTE-RECORDS-01'],saved:['TA-PH-MESSAGE-FAMILY-01'],complete:true},deliveredEvents:['TA-S05-FINDINGS-SENT']})
const reload=(s:GameSave)=>normalizeSave(JSON.parse(JSON.stringify(s)))
describe('Scene 6 timeline',()=>{it('delivers all three authored opening alternatives only after Send',()=>{
 for(let target=0;target<8;target++)for(let option=0;option<3;option++){
  let s=act(ready(),{type:'start'})
  for(let beat=0;beat<=target;beat++){const choice=beat===target?option:0, count=s.masterScene06!.messages.length;s=act(s,{type:'draft',index:choice});expect(s.masterScene06!.messages).toHaveLength(count);s=act(s,{type:'send'});expect(s.masterScene06!.messages.at(-2)?.text).toBe(scene06Beats[beat].choices[choice]);expect(s.masterScene06!.messages.at(-1)?.text).toBe(scene06Beats[beat].replies[choice])}
 }
})
it('gates recovery, orders inspected events, saves privately and explicitly sends the report',()=>{
 let s=newGame();expect(act(s,{type:'start'})).toBe(s);s=act(ready(),{type:'start'});expect(scene06Units(s.masterScene06)).toBe(0);expect(act(s,{type:'recover'})).toBe(s)
 for(let i=0;i<8;i++){s=act(s,{type:'draft',index:i%3});s=act(s,{type:'send'})}
 s=act(s,{type:'recover'});expect(scene06Units(s.masterScene06)).toBe(80);expect(act(s,{type:'recover'})).toBe(s)
 for(const e of [...activityEvents].reverse()){s=act(s,{type:'inspect',id:e.id});s=act(s,{type:'add',id:e.id})}
 s=reload(s);expect(timelineReady(s.masterScene06!)).toBe(false)
 for(let end=3;end>0;end--)for(let i=0;i<end;i++){const ids=s.masterScene06!.order;if(activityEvents.findIndex(e=>e.id===ids[i])>activityEvents.findIndex(e=>e.id===ids[i+1]))s=act(s,{type:'move',id:ids[i],direction:1})}
 s=act(s,{type:'uncertainty'});s=act(s,{type:'sync'});s=act(s,{type:'gap'});expect(timelineReady(s.masterScene06!)).toBe(true)
 expect(s.evidence['TA-FN-MISSING-HOUR']).toBeUndefined();s=act(s,{type:'save'});expect(s.evidence['TA-FN-MISSING-HOUR'].verified).toBe(false)
 s=act(s,{type:'report-draft',index:2});s=act(s,{type:'review-report'});expect(s.deliveredEvents).not.toContain('TA-S06-REPORT-SENT');s=act(s,{type:'send-report'});s=reload(s)
 for(let i=0;i<2;i++){s=act(s,{type:'draft',index:1});s=act(s,{type:'send'})}
 expect(s.masterScene06?.complete).toBe(true);expect(s.deliveredEvents).toContain('TA-S06-SCENE07-UNLOCKED');expect(reload(s).masterScene06?.order).toEqual(activityEvents.map(e=>e.id))
})})
