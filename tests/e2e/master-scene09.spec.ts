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
import { masterScene08Action as step8, captureFields } from '../../src/game/masterScene08'
function afterEight():GameSave{
 let s=step8(afterSeven(),{type:'start'})
 for(let n=0;n<4;n++){s=step8(s,{type:'draft',index:0});s=step8(s,{type:'send'})}
 s=step8(s,{type:'open'});for(const field of captureFields)s=step8(s,{type:'inspect',field})
 for(let n=0;n<4;n++){s=step8(s,{type:'draft',index:0});s=step8(s,{type:'send'})}
 s=step8(s,{type:'import'});s=step8(s,{type:'analyse'});s=step8(s,{type:'compare'});s=step8(s,{type:'hypothesis',index:0});s=step8(s,{type:'review'});s=step8(s,{type:'save'})
 for(let n=0;n<2;n++){s=step8(s,{type:'draft',index:0});s=step8(s,{type:'send'})}return s
}
test('Maya card photograph inspection, source comparison and deliberate Scene 10 unlock',async({page})=>{
 await seedScene(page,afterEight());await page.getByRole('button',{name:'Open Messages',exact:true}).first().click();await page.getByRole('button',{name:'Open Maya Scene 8 conversation'}).click();await expect(page.getByRole('article',{name:'Message capture attachment'})).toBeVisible();await page.getByRole('button',{name:'START SCENE 9'}).click()
 for(let i=0;i<4;i++){await expect(page.locator('[aria-label="Scene 9 Maya conversation"] .scene01-options .opening-choice')).toHaveCount(3);await page.locator('[aria-label="Scene 9 Maya conversation"] .scene01-options .opening-choice').nth(i%3).click();await page.getByRole('button',{name:'Send',exact:true}).click()}
 await page.route('**/media/evidence/secondary-reference-card.png',route=>route.abort());await page.getByRole('button',{name:'OPEN CARD PHOTO'}).click();await expect(page.getByRole('alert')).toContainText('could not be loaded');await expect(page.getByRole('button',{name:'INSPECT REFERENCE CODE'})).toBeDisabled();await page.unroute('**/media/evidence/secondary-reference-card.png');await page.getByRole('button',{name:'RETRY IMAGE'}).click();const img=page.getByRole('img',{name:'Photograph of a Greyhaven secondary reference card'});await expect.poll(()=>img.evaluate((e:HTMLImageElement)=>e.complete&&e.naturalWidth>0)).toBe(true)
 await page.getByRole('button',{name:'ENLARGE PHOTO'}).click();await page.getByRole('button',{name:'Zoom in'}).click();await page.getByRole('button',{name:'Close photo'}).click()
 for(const label of ['INSPECT HEADING','INSPECT CARD TITLE','INSPECT REFERENCE CODE','INSPECT REFERENCE STAMP','INSPECT CONTENTS MARKING','INSPECT PHOTO BOUNDARIES','REVIEW PHOTO PROVENANCE'])await page.getByRole('button',{name:label}).click()
 await page.waitForFunction(()=>!sessionStorage.getItem('the-archive-reboot:pending-save:v1'));await page.reload();await page.getByRole('button',{name:'Unlock phone'}).click();await page.getByRole('button',{name:'Open Messages',exact:true}).first().click();await page.getByRole('button',{name:'Open Maya Scene 8 conversation'}).click();await expect(page.getByRole('button',{name:/✓ INSPECT REFERENCE CODE/})).toBeVisible()
 for(let i=0;i<4;i++){await page.locator('[aria-label="Scene 9 Maya conversation"] .scene01-options .opening-choice').nth(i%3).click();await page.getByRole('button',{name:'Send',exact:true}).click()}
 await page.getByRole('button',{name:'Go home'}).click();await page.getByRole('button',{name:'Open TRACE'}).click();await expect(page.getByText('Recovery: 20%')).toBeVisible();await page.getByRole('button',{name:'IMPORT CARD PHOTO'}).click();await page.getByRole('button',{name:'ANALYSE VISIBLE TEXT'}).click();await page.getByRole('button',{name:'COMPARE MESSAGE CAPTURE'}).click();await page.getByRole('button',{name:'COMPARE CONTACT EXPORT'}).click();await page.getByRole('button',{name:/A reference alone cannot establish/}).click();await page.getByRole('button',{name:'REVIEW CARD FINDING'}).click();await page.getByRole('button',{name:'SAVE CARD FINDING'}).click()
 await page.waitForFunction(()=>!sessionStorage.getItem('the-archive-reboot:pending-save:v1'));await page.reload();await page.getByRole('button',{name:'Unlock phone'}).click();await page.getByRole('button',{name:'Open Messages',exact:true}).first().click();await page.getByRole('button',{name:'Open Maya Scene 8 conversation'}).click()
 for(let i=0;i<2;i++){await page.locator('[aria-label="Scene 9 Maya conversation"] .scene01-options .opening-choice').last().click();await page.getByRole('button',{name:'Send',exact:true}).click()}
 await expect(page.getByText(/Scene 9 complete/)).toBeVisible();await expect(page.getByRole('dialog',{name:'Incoming call from Sophie'})).toHaveCount(0)
 await page.getByRole('button',{name:'Go home'}).click();await page.getByRole('button',{name:/OPEN GREYHAVEN PUBLIC INVENTORY/}).click()
 await page.getByLabel('Inventory reference').fill('GH-DSC-03-A');await expect(page.getByText('Matching reference · GH-DSC-03-A')).toHaveCount(0);await page.getByRole('button',{name:'SEARCH',exact:true}).click()
 for(const label of ['INSPECT PUBLIC METADATA','REVIEW SOURCE LIMITATIONS','COMPARE WITH MAYA’S CARD'])await page.getByRole('button',{name:label}).click()
 await page.getByRole('button',{name:/The inventory match may support/}).click();await page.getByRole('button',{name:'SAVE PRIVATE CONCLUSION'}).click();await page.getByRole('button',{name:'RETURN HOME'}).click()
 await expect(page.getByLabel('Incoming call from Sophie')).toBeVisible();await page.getByRole('button',{name:'Decline'}).click();await page.getByRole('button',{name:'CALL SOPHIE BACK'}).click()
 await page.getByRole('button',{name:'PLAY SOPHIE’S CALL'}).click()
 for(let i=0;i<10;i++){const a=page.locator('audio');await expect(a).toHaveAttribute('src',new RegExp(`SOP10_${i<6?'VC':'VD'}_0${i<6?i+1:i-5}.mp3`));await expect(page.locator('.phone-call-controls .opening-choice')).toHaveCount(0);await a.evaluate(e=>e.dispatchEvent(new Event('ended')));const buttons=page.locator('.phone-call-controls .opening-choice');await expect(buttons).toHaveCount(3);if(i===5){await buttons.nth(2).click();await page.getByRole('button',{name:'Send',exact:true}).click();await expect(page.getByText(/Video remains off/)).toBeVisible()}await buttons.nth(i===5?0:i%3).click();await page.getByRole('button',{name:'Send',exact:true}).click();if(i===5)await page.clock.runFor(1100);if(i===2){await page.waitForFunction(()=>!sessionStorage.getItem('the-archive-reboot:pending-save:v1'));await page.reload();await page.getByRole('button',{name:'Unlock phone'}).click();await page.getByRole('button',{name:'RESUME VOICE CLIP'}).click()}}
 await expect(page.getByLabel('Text representation of the separate warning card')).toContainText('DO NOT CONTACT THE STARRED NUMBER.');await expect(page.locator('audio')).toHaveAttribute('src',/SOP10_VD_05.mp3/);await page.locator('audio').evaluate(e=>e.dispatchEvent(new Event('ended')));await expect(page.locator('audio')).toHaveAttribute('src',/SOP10_VD_06.mp3/);await expect(page.getByRole('button',{name:'Send',exact:true})).toHaveCount(0);await page.locator('audio').evaluate(e=>e.dispatchEvent(new Event('ended')));await expect(page.getByText(/But… I already did/).first()).toBeVisible();await page.clock.runFor(3100);await expect(page.locator('.scene10-fade')).toBeVisible();await page.clock.runFor(1500);await expect(page.getByText('Chapter 2 — The Other Copy unlocked')).toBeVisible()
})
