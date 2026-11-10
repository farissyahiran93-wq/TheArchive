import { expect, test } from '@playwright/test'
import { masterScene04Action, masterScene04Dialogue } from '../../src/game/masterScene04'
import { beginScene01, beginScene02, deliverScene01, openScene03, scene01Invitation, sendScene01Choice } from '../../src/game/scene01'
import { newGame, type GameSave } from '../../src/game/types'
import { seedScene } from './scene01-helper'
function settle(s:GameSave):GameSave{for(let i=0;i<100;i++){const q=s.prologue?.scene01?.queue[0];if(!q)return s;s=deliverScene01(s,q.dueAt)}throw Error('Queue did not settle')}
function ready():GameSave{
 let s=settle(beginScene01({...newGame(),masterOpening:true,chapter1Edition:'ch01-v2-10'},1000))
 for(let i=0;i<9;i++)s=settle(sendScene01Choice(s,'a','',true,20000+i*1000))
 s=settle(beginScene02(scene01Invitation(s,'join'),40000))
 for(let i=0;i<9;i++)s=settle(sendScene01Choice(s,'a','',true,50000+i*1000))
 s=settle(openScene03(s,100000))
 for(let i=0;i<10;i++)s=settle(sendScene01Choice(s,'a','',true,140000+i*1000))
 s=masterScene04Action(s,{type:'start'},200000)
 s=masterScene04Action({...s,masterScene04:{...s.masterScene04!,revision:undefined}},{type:'open'})
 for(let i=0;i<masterScene04Dialogue(undefined).length;i++){s=masterScene04Action(s,{type:'draft',index:0});s=masterScene04Action(s,{type:'send'},210000+i*10000);s=masterScene04Action(s,{type:'tick'},s.masterScene04!.pending!.dueAt)}
 return masterScene04Action(masterScene04Action(s,{type:'inspect'}),{type:'accept'})
}
import { masterScene05Action as step5 } from '../../src/game/masterScene05'
import { masterFragments } from '../../src/content/masterScene05'
function afterFive():GameSave {
 let s=step5(ready(),{type:'start'})
 for(let i=0;i<8;i++){s=step5(s,{type:'draft',index:0});s=step5(s,{type:'send'})}
 s=step5(s,{type:'install'});s=step5(s,{type:'open-trace'});s=step5(s,{type:'recover'})
 s=step5(s,{type:'read',id:masterFragments[0].id})
 s=step5(s,{type:'observe',id:masterFragments[0].id})
 s=step5(s,{type:'save',id:masterFragments[0].id})
 for(let i=0;i<2;i++){s=step5(s,{type:'draft',index:0});s=step5(s,{type:'send'})}
 return s
}
import { activityEvents } from '../../src/content/masterScene06'
import { masterScene06Action as step6 } from '../../src/game/masterScene06'
test('Resuming an earlier timeline keeps its evidence and no longer requires the review checklist',async({page})=>{
 let earlier=step6(afterFive(),{type:'start'})
 for(let i=0;i<8;i++){earlier=step6(earlier,{type:'draft',index:i%3});earlier=step6(earlier,{type:'send'})}
 earlier=step6(earlier,{type:'recover'})
 earlier=step6(earlier,{type:'inspect',id:activityEvents[2].id})
 earlier=step6(earlier,{type:'add',id:activityEvents[2].id})
 await seedScene(page,earlier)
 await page.getByRole('button',{name:'Open Messages',exact:true}).first().click()
 await page.getByRole('button',{name:'Open Unknown conversation'}).click()
 await expect(page.getByRole('button',{name:'Send',exact:true})).toHaveCount(0)
 await page.getByRole('button',{name:'Go home'}).click();await page.getByRole('button',{name:'Open TRACE'}).click()
 await expect(page.getByText('Recovery: 20%')).toBeVisible()
 await page.getByRole('button',{name:'Open Activity Logs module'}).click()
 await page.getByRole('button',{name:'OPEN ACTIVITY LOGS & TIMELINE'}).click()
 const order=page.getByRole('region',{name:'Working timeline'})
 await expect(order.getByText('19:00 · File access')).toBeVisible()
 for(const name of ['Note modification','Message activity','Automatic backup sync'])await page.getByRole('button',{name:new RegExp(name)}).filter({has:page.locator('time')}).click()
 await expect(page.getByRole('region',{name:'Missing-hour finding'})).toHaveCount(0)
 await page.getByRole('button',{name:'Add to working timeline'}).click()
 await page.getByRole('button',{name:'Document unresolved interval'}).click()
 await expect(page.getByRole('region',{name:'Missing-hour finding'})).toContainText('Finding recorded in Case File.')
 await expect(page.getByRole('button',{name:/REVIEW TIMESTAMP|MARK SYNC|SAVE FINDING/})).toHaveCount(0)
 await page.waitForFunction(()=>!sessionStorage.getItem('the-archive-reboot:pending-save:v1'));await page.reload();await page.getByRole('button',{name:'Unlock phone'}).click()
 await page.getByRole('button',{name:'Open Messages',exact:true}).first().click();await page.getByRole('button',{name:'Open Unknown conversation'}).click()
 await expect(page.getByRole('button',{name:'REVIEW REPORT'})).toHaveCount(0)
 for(let i=0;i<2;i++){await expect(page.locator('.scene01-options .opening-choice')).toHaveCount(3);await page.locator('.scene01-options .opening-choice').first().click();await page.getByRole('button',{name:'Send',exact:true}).click()}
 await expect(page.getByText(/Scene 6 complete/)).toBeVisible()
 await page.getByRole('button',{name:'Back to inbox'}).click()
 await page.getByRole('button',{name:'Open Sophie conversation'}).click()
 await expect(page.getByRole('region',{name:'Sophie private conversation'}).getByText("I went back to the contact export. I keep wondering why that number was starred. I still don't know who marked it.")).toBeVisible()
})
