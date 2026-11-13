import { expect, test } from '@playwright/test'
import { masterScene04Action } from '../../src/game/masterScene04'
import { cinematicBeats } from '../../src/content/masterScene04Cinematic'
import { beginScene01, beginScene02, deliverScene01, openScene03, scene01Invitation, sendScene01Choice } from '../../src/game/scene01'
import { newGame, type GameSave } from '../../src/game/types'
import { seedScene } from './scene01-helper'
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
test('Scene 5 preserves consent, manual recovery, opened fragments and explicit report',async({page})=>{
 await seedScene(page,ready())
 await page.getByRole('button',{name:'Open Messages',exact:true}).first().click()
 await page.getByRole('button',{name:'Open Unknown conversation'}).click()
 await page.getByRole('button',{name:'START SCENE 5'}).click()
 await expect(page.getByText('The archive may be incomplete or altered.',{exact:false})).toBeVisible()
 await page.getByRole('button',{name:'DECLINE ARCHIVE'}).click();await page.getByRole('button',{name:'RECONSIDER ARCHIVE'}).click();await page.getByRole('button',{name:'ACCEPT ARCHIVE'}).click()
 for(let i=0;i<8;i++){await expect(page.locator('.scene01-options .opening-choice')).toHaveCount(3);await page.locator('.scene01-options .opening-choice').nth(i%3).click();await page.getByRole('button',{name:'Send',exact:true}).click();await expect(page.getByRole('status',{name:'Unknown is typing'})).toBeVisible();if(i===0){await page.waitForFunction(()=>!sessionStorage.getItem('the-archive-reboot:pending-save:v1'));await page.reload();await page.getByRole('button',{name:'Unlock phone'}).click();await page.getByRole('button',{name:'Open Messages',exact:true}).first().click();await page.getByRole('button',{name:'Open Unknown conversation'}).click();await expect(page.getByRole('status',{name:'Unknown is typing'})).toBeVisible();await page.evaluate(()=>{Object.defineProperty(document,'visibilityState',{configurable:true,value:'hidden'});document.dispatchEvent(new Event('visibilitychange'));Object.defineProperty(document,'visibilityState',{configurable:true,value:'visible'});document.dispatchEvent(new Event('visibilitychange'))});await page.waitForFunction(()=>!sessionStorage.getItem('the-archive-reboot:pending-save:v1'));await page.goto('about:blank');await page.goBack();await page.getByRole('button',{name:'Unlock phone'}).click();await page.getByRole('button',{name:'Open Messages',exact:true}).first().click();await page.getByRole('button',{name:'Open Unknown conversation'}).click()}await page.clock.runFor(10000)}
 await page.getByRole('button',{name:'Go home'}).click()
 await page.getByRole('button',{name:'Open TRACE'}).click()
 await expect(page.getByText('Recovery: 0%')).toBeVisible()
 await page.getByRole('button',{name:'START RECOVERY'}).click()
 await expect(page.getByText('Recovery: 12%')).toBeVisible()
 await page.screenshot({path:'artifacts/trace-workspace-home.png'})
  await page.waitForFunction(()=>!sessionStorage.getItem('the-archive-reboot:pending-save:v1'))
  await page.reload()
  await page.getByRole('button',{name:'Unlock phone'}).click()
  await page.getByRole('button',{name:'Open TRACE'}).click()
  await expect(page.getByText('Recovery: 12%')).toBeVisible()
  await expect(page.getByRole('button',{name:'FIRST PASS COMPLETE'})).toBeDisabled()
 await page.getByRole('button',{name:'Open Activity Logs module'}).click();await expect(page.getByText('Requires deeper recovery pass. Available in a later operation.')).toBeVisible();await page.getByRole('button',{name:'BACK TO TRACE'}).click()
 for(const [module,names] of [['Messages',['Family Thread','June Thread']],['Notes',['Dinner Reminder','Greyhaven Records']]] as const){
  await page.getByRole('button',{name:`Open ${module} module`}).click()
  for(const name of names){
   await page.getByRole('button',{name:new RegExp(name)}).click()
   await expect(page.getByRole('button',{name:'SAVE FINDING',exact:true})).toBeDisabled()
   await page.getByRole('button',{name:'BACK TO TRACE'}).click()
  }
  await page.getByRole('button',{name:'BACK TO TRACE'}).click()
 }
 await page.getByRole('button',{name:'Home',exact:true}).click()
 await page.getByRole('button',{name:'Open Messages',exact:true}).first().click()
 await page.getByRole('button',{name:'Open Unknown conversation'}).click()
 await expect(page.getByRole('button',{name:'Send',exact:true})).toHaveCount(0)
 await expect(page.getByRole('button',{name:'START SCENE 6'})).toHaveCount(0)
 await page.getByRole('button',{name:'Go home'}).click()
 await page.getByRole('button',{name:'Open TRACE'}).click()
 await page.getByRole('button',{name:'Open Evidence Summary module'}).click()
 await expect(page.getByRole('button',{name:/OPEN SOURCE/})).toHaveCount(4)
 await page.getByRole('button',{name:/OPEN SOURCE.*Family Thread/}).click()
 await page.getByLabel('Compare fragment with').selectOption({label:'Dinner Reminder'})
 await page.getByRole('button',{name:'Compare fragments'}).click()
 await expect(page.getByText(/Both fragments mention biscuits in different contexts/)).toBeVisible()
 await page.getByRole('button',{name:'SAVE FINDING',exact:true}).click()
 await page.waitForFunction(()=>!sessionStorage.getItem('the-archive-reboot:pending-save:v1'))
 await page.reload()
 await page.getByRole('button',{name:'Unlock phone'}).click()
 await page.getByRole('button',{name:'Open TRACE'}).click()
 await expect(page.getByRole('heading',{name:'Family Thread',level:1})).toBeVisible()
 await expect(page.getByRole('button',{name:'FINDING SAVED'})).toBeDisabled()
 await page.getByText('View metadata').click();await expect(page.getByText('Source ID: TA-PH-MESSAGE-FAMILY-01')).toBeVisible()
 await page.getByRole('button',{name:'Home',exact:true}).click()
 await page.getByRole('button',{name:'Open Messages',exact:true}).first().click()
 await page.getByRole('button',{name:'Open Unknown conversation'}).click()
 for(let i=0;i<2;i++){await page.locator('.scene01-options .opening-choice').last().click();await page.getByRole('button',{name:'Send',exact:true}).click();await page.clock.runFor(10000)}
 await page.clock.runFor(10000);await expect(page.getByRole('button',{name:'START SCENE 6'})).toBeVisible()
})
