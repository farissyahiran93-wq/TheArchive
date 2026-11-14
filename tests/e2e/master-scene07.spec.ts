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
 await page.getByRole('button',{name:'OPEN ATTACHMENT'}).click()
 await expect(page.getByText(/Remarks field is damaged and unreadable/)).toBeVisible()
 await page.getByRole('button',{name:'Go home'}).click();await page.getByRole('button',{name:'Open TRACE'}).click();await expect(page.getByText('Recovery: 20%')).toBeVisible()
 const verification=page.getByRole('article',{name:'Sophie statement verification'})
 await expect(verification.getByRole('button',{name:'Save contact finding'})).toHaveCount(0)
 await verification.getByRole('button',{name:'What the remark means'}).click()
 await expect(verification.getByText(/Neither the copy nor Sophie.s account can establish/)).toBeVisible()
 await expect(verification.getByText('DO NOT CONTACT THE STARRED NUMBER.')).toHaveCount(0)
 await verification.getByRole('button',{name:'Save contact finding'}).click()
 await page.waitForFunction(()=>!sessionStorage.getItem('the-archive-reboot:pending-save:v1'));await page.reload();await page.getByRole('button',{name:'Unlock phone'}).click();await page.getByRole('button',{name:'Open Messages',exact:true}).first().click();await page.getByRole('button',{name:'Open Sophie conversation'}).click()
 await page.getByRole('button',{name:'KEEP PRIVATE'}).click()
 await page.getByRole('button',{name:"The copy has a starred entry; we don't know who marked it or why."}).click()
 await page.getByRole('button',{name:'REVIEW GROUP MESSAGE'}).click()
 await page.getByRole('button',{name:'CONFIRM SEND TO GROUP'}).click()
 await expect(page.getByRole('button',{name:'FINISH SCENE 7'})).toHaveCount(0);await expect(page.getByText(/Scene 7 complete/)).toBeVisible()
 await page.getByRole('button',{name:'Back to inbox'}).click();await page.getByRole('button',{name:'Open Same Old Chaos group conversation'}).click()
 await expect(page.getByText("The copy has a starred entry; we don't know who marked it or why.")).toBeVisible()
 for(let i=1;i<=11;i++){const res=await page.request.get(`/media/audio/scene07-ver1/call-${String(i).padStart(2,'0')}.wav`);expect(res.status()).toBe(200)}
})
