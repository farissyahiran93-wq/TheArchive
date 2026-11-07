import { expect, test } from '@playwright/test'
import { newGame, type GameSave } from '../../src/game/types'
import { beginScene01, beginScene02, deliverScene01, scene01Invitation, sendScene01Choice } from '../../src/game/scene01'
import { openSophie, seedScene } from './scene01-helper'
function settle(s: GameSave, stopAtHandoff=false): GameSave {
  for(let i=0;i<100;i++){const q=s.prologue?.scene01?.queue[0];if(!q || stopAtHandoff && q.id==='TA-S03-FIRST-MESSAGE')return s;s=deliverScene01(s,q.dueAt)}
  throw Error('Queue did not settle')
}
function beforePrivate(pending=false): GameSave {
  let s=settle(beginScene01({...newGame(),masterOpening:true,chapter1Edition:'ch01-v2-10'},1800000000000))
  for(let i=0;i<9;i++)s=settle(sendScene01Choice(s,'a','',true,1800000100000+i*1000))
  s=settle(beginScene02(scene01Invitation(s,'join'),1800000200000))
  for(let i=0;i<9;i++)s=settle(sendScene01Choice(s,'a','',true,1800000300000+i*1000),pending && i===8)
  return s
}
test.use({reducedMotion:'reduce'})
test('opening Sophie before the handoff does not start Scene 3 until reopening',async({page})=>{
  await seedScene(page,beforePrivate(true),{pauseClock:true})
  await openSophie(page)
  await page.clock.runFor(120000)
  await expect(page.getByText('Hey. Are you okay after all of that?',{exact:true})).toHaveCount(1)
  await page.evaluate(() => { Object.defineProperty(document,'visibilityState',{configurable:true,value:'hidden'}); document.dispatchEvent(new Event('visibilitychange')) })
  await page.evaluate(() => { Object.defineProperty(document,'visibilityState',{configurable:true,value:'visible'}); document.dispatchEvent(new Event('visibilitychange')) })
  await expect(page.locator('.scene01-chat')).not.toHaveAttribute('data-scene-node','TA-S03-C01')
  await page.getByRole('button',{name:'Back to inbox'}).click()
  await page.getByRole('button',{name:'Open Sophie conversation',exact:true}).click()
  await page.clock.runFor(120000)
  await expect(page.locator('.scene01-chat')).toHaveAttribute('data-scene-node','TA-S03-C01')
})
test('private handoff opens manually, preserves draft after reload and ends offline',async({page})=>{
  await seedScene(page,beforePrivate())
  await expect(page.locator('.scene01-chat')).toHaveCount(0)
  await openSophie(page)
  await page.clock.runFor(120000)
  await expect(page.locator('.scene01-chat')).toHaveAttribute('data-scene-node','TA-S03-C01')
  await expect(page.getByText('Hey. Are you okay after all of that?',{exact:true})).toHaveCount(1)
  await page.locator('.scene01-options .opening-choice').nth(1).click()
  await page.waitForFunction(()=>!sessionStorage.getItem('the-archive-reboot:pending-save:v1'))
  await page.reload()
  await page.getByRole('button',{name:'Unlock phone',exact:true}).click()
  await openSophie(page)
  await expect(page.locator('.scene01-options .opening-choice').nth(1)).toHaveAttribute('aria-pressed','true')
  for(let i=1;i<=10;i++){
    await expect(page.locator('.scene01-chat')).toHaveAttribute('data-scene-node',`TA-S03-C${String(i).padStart(2,'0')}`)
    await expect(page.locator('.scene01-options .opening-choice')).toHaveCount(3)
    if(i>1)await page.locator('.scene01-options .opening-choice').nth((i-1)%3).click()
    await page.getByRole('button',{name:'Send',exact:true}).click()
    await page.clock.runFor(120000)
  }
  await page.getByRole('button',{name:/Open Sophie.s photo: Two packets/}).click()
  await expect(page.getByRole('dialog',{name:'Photo viewer'})).toBeVisible()
  await page.getByRole('button',{name:'Zoom in'}).click()
  await page.getByRole('button',{name:'Close photo'}).click()
  await expect(page.getByText('Goodbye.',{exact:true})).toHaveCount(1)
  await expect(page.getByText('Sophie is offline.',{exact:true})).toBeVisible()
  await expect(page.getByText('Scene 4 — The Unknown Sender is unlocked. Its conversation is not available yet.')).toBeVisible()
  await expect(page.getByText("I know you're looking for Daniel.",{exact:true})).toHaveCount(0)
  await expect(page.getByText('I found that article. The one I mentioned.',{exact:true})).toHaveCount(0)
})
