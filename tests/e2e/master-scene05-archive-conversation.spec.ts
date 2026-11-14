import { expect, test } from '@playwright/test'
import { beginScene01, beginScene02, deliverScene01, openScene03, scene01Invitation, sendScene01Choice } from '../../src/game/scene01'
import { newGame, type GameSave } from '../../src/game/types'
import { seedScene } from './scene01-helper'

function settle(s:GameSave):GameSave {
 for(let i=0;i<100;i++){const next=s.prologue?.scene01?.queue[0];if(!next)return s;s=deliverScene01(s,next.dueAt)}
 throw Error('Opening queue did not settle')
}
function ready():GameSave {
 let s=settle(beginScene01({...newGame(),masterOpening:true,chapter1Edition:'ch01-v2-10'},1800000000000))
 for(let i=0;i<9;i++)s=settle(sendScene01Choice(s,'a','',true,1800000100000+i*1000))
 s=settle(beginScene02(scene01Invitation(s,'join'),1800000200000))
 s=settle(sendScene01Choice(s,'c','Alex',true,1800000201000))
 for(let i=0;i<9;i++)s=settle(sendScene01Choice(s,'a','',true,1800000300000+i*1000))
 s=settle(openScene03(s,1800000400000))
 for(let i=0;i<10;i++)s=settle(sendScene01Choice(s,'a','',true,1800000500000+i*1000))
 return {...s,masterScene04:{version:1,revision:'cinematic',opened:false,beat:10,messages:[{id:'TA-S04-FIRST',sender:'unknown',text:'You are looking for Daniel Mercer.',at:1800000600000}],status:'accepted',inspected:false,complete:true,preview:false}}
}

test('installation continues directly to an archive conversation and a reversible archive offer',async({page})=>{
 await seedScene(page,ready(),{pauseClock:true})
 const open=async()=>{await page.getByRole('button',{name:'Open Messages',exact:true}).first().click();await page.getByRole('button',{name:'Open Unknown conversation',exact:true}).click()}
 await open()
 await page.getByRole('button',{name:'INSTALL TRACE',exact:true}).click()
 await expect(page.getByRole('button',{name:'START SCENE 5'})).toHaveCount(0)
 await page.clock.runFor(7000)
 await page.getByRole('button',{name:'CONTINUE',exact:true}).click()
 await expect(page.getByRole('button',{name:/^(START|CONTINUE TO) SCENE 5$/i})).toHaveCount(0)
 await expect(page.getByText('Did TRACE open?',{exact:true})).toBeVisible()
 const attachment=page.getByRole('article',{name:'Encrypted archive attachment'})
 await expect(attachment).toHaveCount(0)
 await page.clock.runFor(30000)
 const choices=page.locator('.scene01-options .opening-choice')
 await expect(choices).toHaveCount(3)
 const firstChoice=(await choices.nth(1).textContent())!.trim()
 await expect(page.getByRole('button',{name:'Send',exact:true})).toBeDisabled()
 await choices.nth(1).click()
 await page.waitForFunction(()=>!sessionStorage.getItem('the-archive-reboot:pending-save:v1'))
 await page.reload()
 await page.getByRole('button',{name:'Unlock phone'}).click()
 await open()
 await expect(choices.nth(1)).toHaveAttribute('aria-pressed','true')
 await expect(page.locator('.conversation-line.outgoing').filter({hasText:firstChoice})).toHaveCount(0)
 await page.getByRole('button',{name:'Send',exact:true}).click()
 await expect(page.locator('.conversation-line.outgoing').filter({hasText:firstChoice})).toHaveCount(1)
 await page.clock.runFor(30000)
 for(let i=0;i<2;i++){
  await expect(choices).toHaveCount(3)
  await expect(attachment).toHaveCount(0)
  await choices.first().click()
  await page.getByRole('button',{name:'Send',exact:true}).click()
  await page.clock.runFor(30000)
 }
 await expect(attachment).toBeVisible()
 await page.getByRole('button',{name:'DECLINE ARCHIVE',exact:true}).click()
 await expect(page.getByRole('button',{name:'RECONSIDER ARCHIVE',exact:true})).toBeVisible()
 await page.waitForFunction(()=>!sessionStorage.getItem('the-archive-reboot:pending-save:v1'))
 await page.reload()
 await page.getByRole('button',{name:'Unlock phone'}).click()
 await open()
 await page.clock.runFor(30000)
 await page.getByRole('button',{name:'RECONSIDER ARCHIVE',exact:true}).click()
 await page.getByRole('button',{name:'ACCEPT ARCHIVE',exact:true}).click()
 await expect(choices).toHaveCount(3)
 await expect(page.getByRole('button',{name:'Send',exact:true})).toBeDisabled()
 for(let i=0;i<5;i++){
  await choices.nth(i%3).click()
  await page.getByRole('button',{name:'Send',exact:true}).click()
  await page.clock.runFor(30000)
 }
 await expect(page.getByRole('button',{name:'START SCENE 6'})).toHaveCount(0)
 await page.getByRole('button',{name:'Go home'}).click()
 await page.getByRole('button',{name:'Open TRACE',exact:true}).click()
 await expect(page.getByRole('button',{name:'START RECOVERY'})).toBeEnabled()
 await expect(page.getByText('Recovery: 0%',{exact:true})).toBeVisible()
})
