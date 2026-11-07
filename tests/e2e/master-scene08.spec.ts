import { expect, test } from '@playwright/test'
import { masterScene04Action } from '../../src/game/masterScene04'
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
 s=masterScene04Action(masterScene04Action(s,{type:'start'},200000),{type:'open'})
 for(let i=0;i<10;i++){s=masterScene04Action(s,{type:'draft',index:0});s=masterScene04Action(s,{type:'send'},210000+i*1000);s=masterScene04Action(s,{type:'tick'},210999+i*1000)}
 return masterScene04Action(masterScene04Action(s,{type:'inspect'}),{type:'accept'})
}
import { masterScene05Action as step5 } from '../../src/game/masterScene05'
import { masterFragments } from '../../src/content/masterScene05'
function afterFive():GameSave {
 let s=step5(ready(),{type:'start'})
 for(let i=0;i<8;i++){s=step5(s,{type:'draft',index:0});s=step5(s,{type:'send'})}
 s=step5(s,{type:'inspect'});s=step5(s,{type:'risks'});s=step5(s,{type:'install'});s=step5(s,{type:'open-trace'});s=step5(s,{type:'select'});s=step5(s,{type:'recover'})
 for(const f of masterFragments)s=step5(s,{type:'read',id:f.id})
 s=step5(s,{type:'save',id:masterFragments[0].id})
 for(let i=0;i<2;i++){s=step5(s,{type:'draft',index:0});s=step5(s,{type:'send'})}
 return s
}
import { masterScene06Action as step6 } from '../../src/game/masterScene06'
import { activityEvents } from '../../src/content/masterScene06'
function afterSix():GameSave {
 let s=step6(afterFive(),{type:'start'})
 for(let i=0;i<8;i++){s=step6(s,{type:'draft',index:0});s=step6(s,{type:'send'})}
 s=step6(s,{type:'recover'});for(const e of activityEvents){s=step6(s,{type:'inspect',id:e.id});s=step6(s,{type:'add',id:e.id})}
 s=step6(s,{type:'uncertainty'});s=step6(s,{type:'sync'});s=step6(s,{type:'gap'});s=step6(s,{type:'save'});s=step6(s,{type:'report-draft',index:2});s=step6(s,{type:'review-report'});s=step6(s,{type:'send-report'})
 for(let i=0;i<2;i++){s=step6(s,{type:'draft',index:0});s=step6(s,{type:'send'})}return s
}
import { masterScene07Action as step7 } from '../../src/game/masterScene07'
function afterSeven(shared=false):GameSave {
 let s=step7(afterSix(),{type:'start'});s=step7(s,{type:'answer'})
 for(let i=0;i<10;i++){s=step7(s,{type:'clip-ended'});s=step7(s,{type:'draft',index:0});s=step7(s,{type:'send'})}
 s=step7(s,{type:'clip-ended'});s=step7(s,{type:'question-draft',index:0});s=step7(s,{type:'send-question'});s=step7(s,{type:'open'});s=step7(s,{type:'metadata'});s=step7(s,{type:'entry'});s=step7(s,{type:'star'});s=step7(s,{type:'import'});s=step7(s,{type:'analyse'});s=step7(s,{type:'hypothesis',index:1});s=step7(s,{type:'save'})
 if(shared){s=step7(s,{type:'share-draft',index:0});s=step7(s,{type:'review-share'});s=step7(s,{type:'send-share'})}else s=step7(s,{type:'decline-share'})
 return step7(s,{type:'finish'})
}
for(const shared of [false,true])test(`Maya crop investigation preserves uncertainty and 20% recovery (shared: ${shared})`,async({page})=>{
 await seedScene(page,afterSeven(shared));await page.getByRole('button',{name:'Open Messages',exact:true}).first().click();await page.getByRole('button',{name:'Open Maya Scene 8 conversation'}).click();await page.getByRole('button',{name:'OPEN MAYA CONVERSATION'}).click()
 for(let i=0;i<4;i++){await expect(page.locator('.scene01-options .opening-choice')).toHaveCount(3);await page.locator('.scene01-options .opening-choice').nth(i%3).click();await page.getByRole('button',{name:'Send',exact:true}).click()}
 if(!shared){
  await page.getByRole('button',{name:'Back to inbox'}).click();await page.getByRole('button',{name:'Open Lucas private photo conversation'}).click();await page.getByRole('button',{name:'OPEN LUCAS CONVERSATION'}).click()
  for(let i=0;i<3;i++){await expect(page.locator('.scene01-options .opening-choice')).toHaveCount(3);await page.locator('.scene01-options .opening-choice').nth(i).click();await page.getByRole('button',{name:'Send',exact:true}).click()}
  await page.getByRole('button',{name:/Open Lucas.s photo: Lucas and Daniel/}).click();await expect(page.getByRole('dialog',{name:'Photo viewer'})).toBeVisible();await page.getByRole('button',{name:'Close photo'}).click()
  await page.getByRole('button',{name:'Back to inbox'}).click();await page.getByRole('button',{name:'Open Maya Scene 8 conversation'}).click()
 }
 await expect(page.getByRole('article',{name:'Message capture attachment'})).toBeVisible();await page.getByRole('button',{name:'OPEN CAPTURE'}).click()
 for(const label of ['INSPECT SENDER LABELS','INSPECT MESSAGE TEXT','INSPECT TIMESTAMP','MARK CROPPED CONTEXT','INSPECT SOURCE'])await page.getByRole('button',{name:label}).click()
 await expect(page.getByText(/The displayed text refers to/)).toBeVisible()
 for(let i=0;i<4;i++){await page.locator('.scene01-options .opening-choice').nth(i%3).click();await page.getByRole('button',{name:'Send',exact:true}).click()}
 await page.getByRole('button',{name:/Open Maya.s photo: Two mugs/}).click();await expect(page.getByRole('dialog',{name:'Photo viewer'})).toBeVisible();await page.getByRole('button',{name:'Close photo'}).click()
 await page.getByRole('button',{name:'Go home'}).click();await page.getByRole('button',{name:'Open TRACE'}).click();await expect(page.getByText('Recovery: 20%')).toBeVisible();await page.getByRole('button',{name:'IMPORT MESSAGE CAPTURE'}).click();await page.getByRole('button',{name:'REVIEW CAPTURE LIMITATIONS'}).click();await page.getByRole('button',{name:'COMPARE WITH CONTACT EXPORT'}).click();await page.getByRole('button',{name:/A digital backup is possible/}).click();await page.getByRole('button',{name:'REVIEW FINDING'}).click();await page.getByRole('button',{name:'SAVE FINDING',exact:true}).click()
 await page.waitForFunction(()=>!sessionStorage.getItem('the-archive-reboot:pending-save:v1'));await page.reload();await page.getByRole('button',{name:'Unlock phone'}).click();await page.getByRole('button',{name:'Open Messages',exact:true}).first().click();await page.getByRole('button',{name:'Open Maya Scene 8 conversation'}).click()
 await expect(page.getByRole('button',{name:/Open Maya.s photo: Two mugs/})).toHaveCount(1)
 for(let i=0;i<2;i++){await page.locator('.scene01-options .opening-choice').last().click();await page.getByRole('button',{name:'Send',exact:true}).click()}
 await expect(page.getByText(/Scene 8 complete/)).toBeVisible()
})
