import { expect, test } from '@playwright/test'
import { masterScene04Action } from '../../src/game/masterScene04'
import { cinematicBeats } from '../../src/content/masterScene04Cinematic'
import { beginScene01, beginScene02, deliverScene01, openScene03, scene01Invitation, sendScene01Choice } from '../../src/game/scene01'
import { newGame, type GameSave } from '../../src/game/types'
import { completeMasterScene06, prepareMasterScene05Recovery, seedScene } from './scene01-helper'
function settle(s:GameSave):GameSave{for(let i=0;i<100;i++){const q=s.prologue?.scene01?.queue[0];if(!q)return s;s=deliverScene01(s,q.dueAt)}throw Error('Queue did not settle')}
function ready():GameSave{
 let s=settle(beginScene01({...newGame(),masterOpening:true,chapter1Edition:'ch01-v2-10'},1000))
 for(let i=0;i<9;i++)s=settle(sendScene01Choice(s,'a','',true,20000+i*1000))
 s=settle(beginScene02(scene01Invitation(s,'join'),40000))
 s = settle(sendScene01Choice(s, 'c', 'Alex', true, 41000))
 for(let i=0;i<9;i++)s=settle(sendScene01Choice(s,'a','',true,50000+i*1000))
 s=settle(openScene03(s,100000))
 for(let i=0;i<10;i++)s=settle(sendScene01Choice(s,'a','',true,140000+i*1000))
 s=masterScene04Action(masterScene04Action(s,{type:'start'},200000),{type:'open'})
 while(s.masterScene04?.pending)s=masterScene04Action(s,{type:'tick'},s.masterScene04.pending.dueAt)
 for(let i=0;i<cinematicBeats.length;i++){s=masterScene04Action(s,{type:'draft',index:0});s=masterScene04Action(s,{type:'send'},210000+i*50000);while(s.masterScene04?.pending)s=masterScene04Action(s,{type:'tick'},s.masterScene04.pending.dueAt)}
 return masterScene04Action(s,{type:'setup-trace'})
}
import { masterScene05Action as step5 } from '../../src/game/masterScene05'
import { masterFragments } from '../../src/content/masterScene05'
function afterFive():GameSave {
 let s=prepareMasterScene05Recovery(ready())
 s=step5(s,{type:'install'});s=step5(s,{type:'open-trace'});s=step5(s,{type:'recover'});s=step5(s,{type:'recovery-tick'},s.masterScene05!.recoveryAnimation!.startedAt+8000);s=step5(s,{type:'recovery-acknowledge'})
 for(const f of masterFragments)s=step5(s,{type:'read',id:f.id})
 s=step5(s,{type:'observe',id:masterFragments[0].id})
 s=step5(s,{type:'save',id:masterFragments[0].id})
 s=step5(s,{type:'discussion',action:{type:'select',topic:'dinner'}})
 for(let i=0;i<2;i++){s=step5(s,{type:'discussion',action:{type:'draft',index:0}});s=step5(s,{type:'discussion',action:{type:'send'}});while(s.masterScene05?.discussion?.pending.length)s=step5(s,{type:'discussion',action:{type:'deliver'}})}
 s=step5(s,{type:'discussion',action:{type:'select',topic:'finish'}});s=step5(s,{type:'discussion',action:{type:'send'}})
 return s
}
function afterSix():GameSave {
 return completeMasterScene06(afterFive())
}
import { masterScene07Action as step7 } from '../../src/game/masterScene07'
function afterSeven(shared=false):GameSave {
 let s=step7(afterSix(),{type:'start'});s=step7(s,{type:'answer'})
 for(let i=0;i<10;i++){s=step7(s,{type:'clip-ended'});s=step7(s,{type:'draft',index:0});s=step7(s,{type:'send'})}
 s=step7(s,{type:'clip-ended'});s=step7(s,{type:'open'});s=step7(s,{type:'record-assessment',id:'copy-provenance'})
 if(shared){s=step7(s,{type:'share-draft',index:0});s=step7(s,{type:'review-share'});s=step7(s,{type:'send-share'})}else s=step7(s,{type:'decline-share'})
 return s
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
 await expect(page.getByText(/Lucas checked in. He said there was another copy/)).toBeVisible()
 for(let i=0;i<4;i++){await page.locator('.scene01-options .opening-choice').nth(i%3).click();await page.getByRole('button',{name:'Send',exact:true}).click()}
 await page.getByRole('button',{name:/Open Maya.s photo: Two mugs/}).click();await expect(page.getByRole('dialog',{name:'Photo viewer'})).toBeVisible();await page.getByRole('button',{name:'Close photo'}).click()
 await page.getByRole('button',{name:'Go home'}).click();await page.getByRole('button',{name:'Open TRACE'}).click();await expect(page.getByText('Recovery: 20%')).toBeVisible()
 const verification=page.getByRole('article',{name:'Check-in statement verification'})
 if(shared){
  await expect(verification.getByRole('button',{name:'What Lucas can corroborate directly'})).toHaveCount(0)
  await verification.getByRole('button',{name:'What Daniel’s message says'}).click()
  await expect(verification.getByText('Corroborated within the available copy')).toBeVisible()
 }else{
  await verification.getByRole('button',{name:'What Lucas can corroborate directly'}).click()
  await expect(verification.getByText(/His privacy boundary is not a contradiction/)).toBeVisible()
 }
 await verification.getByRole('button',{name:'Save check-in finding'}).click()
 await page.waitForFunction(()=>!sessionStorage.getItem('the-archive-reboot:pending-save:v1'));await page.reload();await page.getByRole('button',{name:'Unlock phone'}).click();await page.getByRole('button',{name:'Open Messages',exact:true}).first().click();await page.getByRole('button',{name:'Open Maya Scene 8 conversation'}).click()
 await expect(page.getByRole('button',{name:/Open Maya.s photo: Two mugs/})).toHaveCount(1)
 for(let i=0;i<2;i++){await page.locator('.scene01-options .opening-choice').last().click();await page.getByRole('button',{name:'Send',exact:true}).click()}
 await expect(page.getByText(/Scene 8 complete/)).toBeVisible()
})
