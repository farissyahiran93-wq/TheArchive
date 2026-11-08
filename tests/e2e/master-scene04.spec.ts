import { expect, test } from '@playwright/test'
import { newGame, type GameSave } from '../../src/game/types'
import { beginScene01, beginScene02, deliverScene01, openScene03, scene01Invitation, sendScene01Choice } from '../../src/game/scene01'
import { seedScene } from './scene01-helper'
function settle(s:GameSave):GameSave{for(let i=0;i<100;i++){const q=s.prologue?.scene01?.queue[0];if(!q)return s;s=deliverScene01(s,q.dueAt)}throw Error('Queue did not settle')}
function before():GameSave{
 let s=settle(beginScene01({...newGame(),masterOpening:true,chapter1Edition:'ch01-v2-10'},1800000000000))
 for(let i=0;i<9;i++)s=settle(sendScene01Choice(s,'a','',true,1800000100000+i*1000))
 s=settle(beginScene02(scene01Invitation(s,'join'),1800000200000))
 for(let i=0;i<9;i++)s=settle(sendScene01Choice(s,'a','',true,1800000300000+i*1000))
 s=settle(openScene03(s,1800000400000))
 for(let i=0;i<10;i++)s=settle(sendScene01Choice(s,'a','',true,1800000500000+i*1000))
 return s
}
test.use({reducedMotion:'reduce',viewport:{width:390,height:844}})
test('fresh game reaches Unknown after the actual first three scenes without leaving Messages',async({page})=>{
 test.setTimeout(150000)
 await page.clock.install()
 await page.goto('/')
 await page.getByRole('button',{name:'NEW GAME',exact:true}).click()
 await page.getByRole('button',{name:'Unlock phone',exact:true}).click()
 await page.clock.runFor(30000)
 await page.getByRole('button',{name:'Open Messages',exact:true}).first().click()
 await page.getByRole('button',{name:'Open Sophie conversation',exact:true}).click()
 await page.clock.runFor(120000)
 for(let i=0;i<9;i++){await page.locator('.scene01-options .opening-choice').first().click();await page.getByRole('button',{name:'Send',exact:true}).click();await page.clock.runFor(120000)}
 await page.getByRole('button',{name:'JOIN GROUP',exact:true}).click()
 await page.getByRole('button',{name:'Back to inbox'}).click()
 await page.getByRole('button',{name:'Open FIND DANIEL group conversation'}).click()
 await page.clock.runFor(120000)
 for(let i=0;i<9;i++){await page.locator('.scene01-options .opening-choice').first().click();await page.getByRole('button',{name:'Send',exact:true}).click();await page.clock.runFor(120000)}
 await page.getByRole('button',{name:'Back to inbox'}).click()
 await page.getByRole('button',{name:'Open Sophie conversation',exact:true}).click()
 await page.clock.runFor(120000)
 for(let i=0;i<10;i++){await page.locator('.scene01-options .opening-choice').first().click();await page.getByRole('button',{name:'Send',exact:true}).click();await page.clock.runFor(120000)}
 await expect(page.locator('[aria-label="Unknown conversation"]')).toHaveCount(0)
 await page.getByRole('button',{name:'Back to inbox'}).click()
 await page.getByRole('button',{name:'Open Unknown conversation',exact:true}).click()
 await expect(page.getByText("I know you're looking for Daniel.",{exact:true})).toHaveCount(1)
})
test('Unknown arrives on Home; archive inspection, refusal and acceptance are explicit and persisted',async({page})=>{
 await seedScene(page,before())
 await expect(page.locator('[aria-label="Unknown conversation"]')).toHaveCount(0)
 await page.getByRole('button',{name:'Open Messages',exact:true}).first().click()
 await page.getByRole('button',{name:'Open Unknown conversation',exact:true}).click()
 await expect(page.getByText("I know you're looking for Daniel.",{exact:true})).toHaveCount(1)
 for(let i=0;i<10;i++){
  await expect(page.locator('.scene01-options .opening-choice')).toHaveCount(3)
  await page.locator('.scene01-options .opening-choice').nth(i%3).click()
  await page.getByRole('button',{name:'Send',exact:true}).click()
  await expect(page.getByRole('status',{name:'Unknown is typing'})).toBeVisible()
  await expect(page.locator('.scene01-options .opening-choice')).toHaveCount(0)
  await page.clock.runFor(10000)
 }
 await expect(page.getByRole('article',{name:'TRACE information'})).toBeVisible()
 await expect(page.getByText('DNL_PHONE_ARCHIVE.arc')).toHaveCount(0)
 await page.getByRole('button',{name:'INSPECT TRACE INFORMATION'}).click()
 await expect(page.getByRole('dialog',{name:'TRACE information'})).toContainText('unverified')
 await page.getByRole('button',{name:'DONE'}).click()
 await page.getByRole('button',{name:'DECLINE FOR NOW'}).click()
 await page.waitForFunction(()=>!sessionStorage.getItem('the-archive-reboot:pending-save:v1'))
 await page.reload()
 await page.getByRole('button',{name:'Unlock phone',exact:true}).click()
 await page.getByRole('button',{name:'Open Messages',exact:true}).first().click()
 await page.getByRole('button',{name:'Open Unknown conversation',exact:true}).click()
 await expect(page.getByText("I know you're looking for Daniel.",{exact:true})).toHaveCount(1)
 await expect(page.getByText('Declined for now',{exact:true})).toBeVisible()
 await page.getByRole('button',{name:'RECONSIDER OFFER'}).click()
 await page.getByRole('button',{name:'NOT NOW'}).click()
 await page.getByRole('button',{name:'RECONSIDER OFFER'}).click()
 await page.getByRole('button',{name:'PROCEED'}).click()
 await expect(page.getByRole('button',{name:'START SCENE 5'})).toBeVisible()
 await expect(page.getByText('TRACE.pkg',{exact:true})).toHaveCount(0)
 await expect(page.getByText('Eli Ward',{exact:true})).toHaveCount(0)
 await page.getByRole('button',{name:'Go home'}).click()
 await expect(page.getByText('Scene 5 — The Digital Archive unlocked · Recovery 0%')).toBeVisible()
 await expect(page.getByRole('button',{name:'Open TRACE'})).toHaveCount(0)
})
