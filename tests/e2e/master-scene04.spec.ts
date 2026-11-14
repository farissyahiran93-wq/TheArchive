import { expect, test } from '@playwright/test'
import { cinematicBeats } from '../../src/content/masterScene04Cinematic'
import { newGame, type GameSave } from '../../src/game/types'
import { beginScene01, beginScene02, deliverScene01, openScene03, scene01Invitation, sendScene01Choice } from '../../src/game/scene01'
import { seedScene } from './scene01-helper'
function settle(s:GameSave):GameSave{for(let i=0;i<100;i++){const q=s.prologue?.scene01?.queue[0];if(!q)return s;s=deliverScene01(s,q.dueAt)}throw Error('Queue did not settle')}
function before():GameSave{
 let s=settle(beginScene01({...newGame(),masterOpening:true,chapter1Edition:'ch01-v2-10'},1800000000000))
 for(let i=0;i<9;i++)s=settle(sendScene01Choice(s,'a','',true,1800000100000+i*1000))
 s=settle(beginScene02(scene01Invitation(s,'join'),1800000200000))
 s = settle(sendScene01Choice(s, 'c', 'Alex', true, 1800000201000))
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
 await expect(page.getByRole('region',{name:'Unknown conversation'}).getByText("You're looking for Daniel Mercer.",{exact:true})).toHaveCount(1)
})
test('cinematic conversation preserves typing and continues to Scene 5 after TRACE installation',async({page})=>{
 await page.setViewportSize({width:320,height:720})
 await seedScene(page,before(),{pauseClock:true})
 await page.getByRole('button',{name:'Open Messages',exact:true}).first().click()
 await page.getByRole('button',{name:'Open Unknown conversation',exact:true}).click()
 const chat=page.getByRole('region',{name:'Unknown conversation'})
 const options=chat.locator('.scene01-options .opening-choice')
 const typing=chat.getByRole('status',{name:'Unknown is typing',exact:true})
 await expect(typing).toBeVisible()
 await page.clock.runFor(3000)
 for(let i=0;i<cinematicBeats.length;i++){
  await expect(options).toHaveCount(3)
  if(i===9){await chat.getByRole('button',{name:'VIEW TRACE'}).click();await expect(page.getByRole('dialog',{name:'TRACE information'})).toBeVisible();await page.getByRole('button',{name:'DONE'}).click()}
  await options.first().click()
  await chat.getByRole('button',{name:'Send',exact:true}).click()
  await expect(typing).toBeVisible()
  await expect(options).toHaveCount(0)
  for(let n=0;n<12;n++)await page.clock.runFor(4000)
 }
 await expect(chat.getByRole('button',{name:'START SCENE 5'})).toHaveCount(0)
 await chat.getByRole('button',{name:'INSTALL TRACE'}).click()
 await page.clock.runFor(7000)
 await page.getByRole('button',{name:'CONTINUE',exact:true}).click()
 await expect(chat.getByRole('button',{name:'START SCENE 5'})).toHaveCount(0)
 await expect(chat.getByText('Did TRACE open?',{exact:true})).toBeVisible()
 await page.getByRole('button',{name:'Go home'}).click()
 await page.getByRole('button',{name:'Open TRACE'}).click()
 await expect(page.getByText('Recovery: 0%',{exact:true})).toBeVisible()
 await expect(page.getByText('DNL_PHONE_ARCHIVE.arc')).toHaveCount(0)
 await expect(page.getByText('DNL_PHONE_ARCHIVE.arc')).toHaveCount(0)
 await expect(page.getByText('Eli Ward',{exact:true})).toHaveCount(0)
})
