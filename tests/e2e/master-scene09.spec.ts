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
import { masterScene08Action as step8 } from '../../src/game/masterScene08'
function afterEight():GameSave{
 let s=step8(afterSeven(),{type:'start'})
 for(let n=0;n<4;n++){s=step8(s,{type:'draft',index:0});s=step8(s,{type:'send'})}
 s=step8(s,{type:'open'})
 for(let n=0;n<4;n++){s=step8(s,{type:'draft',index:0});s=step8(s,{type:'send'})}
 s=step8(s,{type:'record-assessment',id:'crop-wording'})
 for(let n=0;n<2;n++){s=step8(s,{type:'draft',index:0});s=step8(s,{type:'send'})}return s
}
test('Maya card photograph inspection, source comparison and deliberate Scene 10 unlock',async({page})=>{
 await seedScene(page,afterEight());await page.getByRole('button',{name:'Open Messages',exact:true}).first().click();await page.getByRole('button',{name:'Open Maya Scene 8 conversation'}).click();await expect(page.getByRole('article',{name:'Message capture attachment'})).toBeVisible();await expect(page.getByRole('button',{name:'START SCENE 9'})).toHaveCount(0);await expect(page.getByLabel('Scene 9 Maya conversation')).toBeVisible()
 for(let i=0;i<4;i++){await expect(page.locator('[aria-label="Scene 9 Maya conversation"] .scene01-options .opening-choice')).toHaveCount(3);await page.locator('[aria-label="Scene 9 Maya conversation"] .scene01-options .opening-choice').nth(i%3).click();await page.getByRole('button',{name:'Send',exact:true}).click()}
 await page.route('**/media/evidence/secondary-reference-card.png',route=>route.abort());await page.getByRole('button',{name:'OPEN CARD PHOTO'}).click();await expect(page.getByRole('alert')).toContainText('could not be loaded');await expect(page.getByRole('button',{name:'Highlight reference code'})).toHaveCount(0);await page.unroute('**/media/evidence/secondary-reference-card.png');await page.getByRole('button',{name:'RETRY IMAGE'}).click();const img=page.getByRole('img',{name:'Photograph of a Greyhaven secondary reference card'});await expect.poll(()=>img.evaluate((e:HTMLImageElement)=>e.complete&&e.naturalWidth>0)).toBe(true)
 await page.getByRole('button',{name:'ENLARGE PHOTO'}).click();await page.getByRole('button',{name:'Zoom in'}).click();await page.getByRole('button',{name:'Close photo'}).click()
 await page.waitForFunction(()=>!sessionStorage.getItem('the-archive-reboot:pending-save:v1'));await page.reload();await page.getByRole('button',{name:'Unlock phone'}).click();await page.getByRole('button',{name:'Open Messages',exact:true}).first().click();await page.getByRole('button',{name:'Open Maya Scene 8 conversation'}).click();await expect(page.getByRole('img',{name:'Photograph of a Greyhaven secondary reference card'})).toBeVisible();await expect(page.getByRole('button',{name:'Highlight reference code'})).toHaveCount(0)
 for(let i=0;i<4;i++){await page.locator('[aria-label="Scene 9 Maya conversation"] .scene01-options .opening-choice').nth(i%3).click();await page.getByRole('button',{name:'Send',exact:true}).click()}
 await page.getByRole('button',{name:'Go home'}).click();await page.getByRole('button',{name:'Open TRACE'}).click();await expect(page.getByText('Recovery: 20%')).toBeVisible()
 const comparison=page.getByRole('article',{name:'Secondary card comparison'})
 await comparison.getByRole('button',{name:'Compare with the cropped check-in'}).click()
 await expect(comparison.getByText(/does not name this reference/)).toBeVisible()
 await comparison.getByRole('button',{name:'Save card finding'}).click()
 await page.waitForFunction(()=>!sessionStorage.getItem('the-archive-reboot:pending-save:v1'));await page.reload();await page.getByRole('button',{name:'Unlock phone'}).click();await page.getByRole('button',{name:'Open Messages',exact:true}).first().click();await page.getByRole('button',{name:'Open Maya Scene 8 conversation'}).click()
 for(let i=0;i<2;i++){await page.locator('[aria-label="Scene 9 Maya conversation"] .scene01-options .opening-choice').last().click();await page.getByRole('button',{name:'Send',exact:true}).click()}
 await expect(page.getByText(/Scene 9 complete/)).toBeVisible();await expect(page.getByRole('dialog',{name:'Incoming call from Sophie'})).toHaveCount(0)
 await page.getByRole('button',{name:'Go home'}).click();await page.getByRole('button',{name:/OPEN GREYHAVEN PUBLIC INVENTORY/}).click()
 await page.getByLabel('Inventory reference').fill('GH-DSC-03-A');await expect(page.getByText('Matching reference · GH-DSC-03-A')).toHaveCount(0);await page.getByRole('button',{name:'SEARCH',exact:true}).click()
 await page.getByRole('button',{name:'COMPARE WITH MAYA’S CARD'}).click()
 await page.getByLabel('Investigation question').selectOption({index:1})
 await page.getByLabel('Provisional explanation').fill('The matching index gives us a place to ask about the record.')
 await page.getByLabel('Competing explanation').fill('The reference might have been preserved separately from Daniel’s investigation.')
 await page.getByLabel('Outstanding question').fill('Who can show us the underlying record?')
 await page.getByLabel('Use Secondary reference card in theory').selectOption({label:'Supports this theory'})
 await page.getByRole('button',{name:'SAVE INVESTIGATION SUMMARY'}).click()
 await page.getByRole('button',{name:'RETURN HOME'}).click()
 await expect(page.getByLabel('Incoming call from Sophie')).toBeVisible();await page.getByRole('button',{name:'Decline'}).click();await page.getByRole('button',{name:'CALL SOPHIE BACK'}).click()
 await page.getByRole('button',{name:'PLAY SOPHIE’S CALL'}).click()
 for(let i=0;i<10;i++){const a=page.locator('audio');await expect(a).toHaveAttribute('src',new RegExp(`SOP10_${i<6?'VC':'VD'}_0${i<6?i+1:i-5}.mp3`));await expect(page.locator('.phone-call-controls .opening-choice')).toHaveCount(0);await a.evaluate(e=>e.dispatchEvent(new Event('ended')));const buttons=page.locator('.phone-call-controls .opening-choice');await expect(buttons).toHaveCount(3);if(i===5){await buttons.nth(2).click();await page.getByRole('button',{name:'Send',exact:true}).click();await expect(page.getByText(/Video remains off/)).toBeVisible()}await buttons.nth(i===5?0:i%3).click();await page.getByRole('button',{name:'Send',exact:true}).click();if(i===5)await page.clock.runFor(1100);if(i===2){await page.waitForFunction(()=>!sessionStorage.getItem('the-archive-reboot:pending-save:v1'));await page.reload();await page.getByRole('button',{name:'Unlock phone'}).click();await page.getByRole('button',{name:'RESUME VOICE CLIP'}).click()}}
 await expect(page.getByLabel('Text representation of the separate warning card')).toContainText('DO NOT CONTACT THE STARRED NUMBER.');await expect(page.locator('audio')).toHaveAttribute('src',/SOP10_VD_05.mp3/);await page.locator('audio').evaluate(e=>e.dispatchEvent(new Event('ended')));await expect(page.locator('audio')).toHaveAttribute('src',/SOP10_VD_06.mp3/);await expect(page.getByRole('button',{name:'Send',exact:true})).toHaveCount(0);await page.locator('audio').evaluate(e=>e.dispatchEvent(new Event('ended')));await expect(page.getByText(/But… I already did/).first()).toBeVisible();await page.clock.runFor(3100);await expect(page.locator('.scene10-fade')).toBeVisible();await page.clock.runFor(1500);await expect(page.getByText('Chapter 2 — The Other Copy unlocked')).toBeVisible()
})
