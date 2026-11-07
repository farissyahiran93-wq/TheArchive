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
test('Sophie call pauses for a three-tone answer and the external export keeps recovery at 20%',async({page})=>{
 await seedScene(page,afterSix());await page.getByRole('button',{name:'Open Messages',exact:true}).first().click();await page.getByRole('button',{name:'Open Sophie conversation'}).click()
 await page.getByRole('button',{name:'OPEN INCOMING CALL'}).click();await page.getByRole('button',{name:'Answer'}).click()
 for(let i=0;i<10;i++){
  const audio=page.locator('audio');await expect(audio).toHaveAttribute('src',new RegExp(`call-${String(i+1).padStart(2,'0')}.wav`));await expect.poll(()=>audio.evaluate((node:HTMLAudioElement)=>Number.isFinite(node.duration)&&node.duration>0)).toBe(true);await expect(page.getByRole('button',{name:'Send',exact:true})).toHaveCount(0)
  await audio.evaluate(e=>e.dispatchEvent(new Event('ended')));await expect(page.locator('.phone-call-controls .opening-choice')).toHaveCount(3)
  await page.locator('.phone-call-controls .opening-choice').nth(i%3).click()
  if(i===2){await page.waitForFunction(()=>!sessionStorage.getItem('the-archive-reboot:pending-save:v1'));await page.reload();await page.getByRole('button',{name:'Unlock phone'}).click();await page.getByRole('button',{name:'Open Messages',exact:true}).first().click();await page.getByRole('button',{name:'Open Sophie conversation'}).click();await expect(page.locator('audio')).toHaveCount(0);await expect(page.locator('.phone-call-controls .opening-choice').nth(i%3)).toHaveAttribute('aria-pressed','true')}
  await page.getByRole('button',{name:'Send',exact:true}).click()
 }
 await page.locator('audio').evaluate(e=>e.dispatchEvent(new Event('ended')))
 await page.getByRole('button',{name:'OPEN ATTACHMENT'}).click();await page.getByRole('button',{name:'INSPECT METADATA'}).click();await page.getByRole('button',{name:'INSPECT CONTACT LIST'}).click();await page.getByRole('button',{name:'INSPECT STAR ★'}).click()
 await expect(page.getByText(/Remarks field is damaged and unreadable/)).toBeVisible()
 await page.getByRole('button',{name:'Go home'}).click();await page.getByRole('button',{name:'Open TRACE'}).click();await expect(page.getByText('Recovery: 20%')).toBeVisible()
 await page.getByRole('button',{name:'IMPORT CONTACT COPY'}).click();await page.getByRole('button',{name:'COMPARE SOURCE LIMITATIONS'}).click();await page.getByRole('button',{name:/We cannot establish who marked/}).click();await page.getByRole('button',{name:'SAVE PRIVATE FINDING'}).click()
 await page.waitForFunction(()=>!sessionStorage.getItem('the-archive-reboot:pending-save:v1'));await page.reload();await page.getByRole('button',{name:'Unlock phone'}).click();await page.getByRole('button',{name:'Open Messages',exact:true}).first().click();await page.getByRole('button',{name:'Open Sophie conversation'}).click()
 await page.getByRole('button',{name:'KEEP PRIVATE'}).click()
 await page.getByRole('button',{name:"The copy has a starred entry; we don't know who marked it or why."}).click()
 await page.getByRole('button',{name:'REVIEW GROUP MESSAGE'}).click()
 await page.getByRole('button',{name:'CONFIRM SEND TO GROUP'}).click()
 await page.getByRole('button',{name:'FINISH SCENE 7'}).click();await expect(page.getByText(/Scene 7 complete/)).toBeVisible()
 await page.getByRole('button',{name:'Back to inbox'}).click();await page.getByRole('button',{name:'Open FIND DANIEL group conversation'}).click()
 await expect(page.getByText("The copy has a starred entry; we don't know who marked it or why.")).toBeVisible()
 for(let i=1;i<=11;i++){const res=await page.request.get(`/media/audio/scene07-ver1/call-${String(i).padStart(2,'0')}.wav`);expect(res.status()).toBe(200)}
})
