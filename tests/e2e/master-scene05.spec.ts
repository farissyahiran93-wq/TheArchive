import { expect, test } from '@playwright/test'
import { masterScene04Action } from '../../src/game/masterScene04'
import { cinematicBeats } from '../../src/content/masterScene04Cinematic'
import { beginScene01, beginScene02, deliverScene01, openScene03, scene01Invitation, sendScene01Choice } from '../../src/game/scene01'
import { newGame, type GameSave } from '../../src/game/types'
import { prepareMasterScene05Recovery, seedScene } from './scene01-helper'
function settle(s:GameSave):GameSave{for(let i=0;i<100;i++){const q=s.prologue?.scene01?.queue[0];if(!q)return s;s=deliverScene01(s,q.dueAt)}throw Error('Queue did not settle')}
function ready():GameSave{
 let s=settle(beginScene01({...newGame(),masterOpening:true,chapter1Edition:'ch01-v2-10'},1000))
 for(let i=0;i<9;i++)s=settle(sendScene01Choice(s,'a','',true,20000+i*1000))
 // This fixture exercises a save from the previous group screenplay.
 s={...s,prologue:{...s.prologue!,scene01:{...s.prologue!.scene01!,masterScene02Revision:3}}}
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
test('Scene 5 manually recovers and preserves opened sources and sent choices',async({page})=>{
 // Earlier consent and the six pre-recovery choices are driven through the real state machine;
 // the companion archive-conversation browser test exercises their decline, reconsider and reload path.
 await seedScene(page,prepareMasterScene05Recovery(ready()))
 await page.getByRole('button',{name:'Open TRACE'}).click()
 await expect(page.getByText('Recovery: 0%',{exact:true})).toBeVisible()
 await expect(page.getByRole('button',{name:'START RECOVERY'})).toBeEnabled()
 await page.getByRole('button',{name:'START RECOVERY'}).click()
 await page.clock.runFor(9000)
 await page.getByRole('button',{name:'OPEN RECOVERED DATA'}).click()
 await expect(page.getByText('Recovery: 20%',{exact:true})).toBeVisible()
 await page.waitForFunction(()=>!sessionStorage.getItem('the-archive-reboot:pending-save:v1'))
 await page.reload();await page.getByRole('button',{name:'Unlock phone'}).click();await page.getByRole('button',{name:'Open TRACE'}).click()
 await expect(page.getByText('Recovery: 20%',{exact:true})).toBeVisible()
 for(const [module,names] of [['Messages',['Maya Chen','Sophie Mercer','Lucas Grey']],['Notes',['Dinner Reminder','Greyhaven Records']]] as const){
  await page.getByRole('button',{name:`Open ${module} module`}).click()
  for(const name of names){
   await page.getByRole('button',{name:new RegExp(name)}).click()
   await expect(page.getByRole('heading',{name,exact:true})).toBeVisible()
   await page.getByRole('button',{name:'BACK TO TRACE'}).click()
  }
  await page.getByRole('button',{name:'BACK TO TRACE'}).click()
 }
 await page.getByRole('button',{name:'Open Activity Logs module'}).click()
 await expect(page.getByText('Activity unavailable · 19:00–20:00')).toBeVisible()
 await page.getByRole('button',{name:'Home',exact:true}).click()
 await page.getByRole('button',{name:'Open Messages',exact:true}).first().click();await page.getByRole('button',{name:'Open Unknown conversation'}).click()
 await page.clock.runFor(120000)
 for(let i=0;i<4;i++){
  const choices=page.locator('.scene01-options .opening-choice');await expect(choices).toHaveCount(3)
  const text=(await choices.nth(i%3).textContent())!.trim()
  await choices.nth(i%3).click();await expect(page.locator('.conversation-line.outgoing').filter({hasText:text})).toHaveCount(0)
  await page.getByRole('button',{name:'Send',exact:true}).click();await expect(page.locator('.conversation-line.outgoing').filter({hasText:text})).toHaveCount(1)
  await page.clock.runFor(120000)
 }
 await expect(page.getByText('So. You found something.',{exact:true})).toBeVisible()
 await expect(page.getByRole('button',{name:'START SCENE 6'})).toHaveCount(0)
})
