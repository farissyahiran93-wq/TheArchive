import { expect, test } from '@playwright/test'
import { beginScene01, beginScene02, deliverScene01, openScene03, scene01Invitation, sendScene01Choice } from '../../src/game/scene01'
import { newGame, type GameSave } from '../../src/game/types'
import { seedScene } from './scene01-helper'

function settle(s:GameSave):GameSave{for(let i=0;i<100;i++){const q=s.prologue?.scene01?.queue[0];if(!q)return s;s=deliverScene01(s,q.dueAt)}throw Error('Queue did not settle')}
function ready():GameSave{
 let s=settle(beginScene01({...newGame(),masterOpening:true,chapter1Edition:'ch01-v2-10'},1800000000000))
 for(let i=0;i<9;i++)s=settle(sendScene01Choice(s,'a','',true,1800000100000+i*1000))
 s=settle(beginScene02(scene01Invitation(s,'join'),1800000200000))
 s=settle(sendScene01Choice(s,'c','Alex',true,1800000201000))
 for(let i=0;i<9;i++)s=settle(sendScene01Choice(s,'a','',true,1800000300000+i*1000))
 s=settle(openScene03(s,1800000400000))
 for(let i=0;i<10;i++)s=settle(sendScene01Choice(s,'a','',true,1800000500000+i*1000))
 return {...s,masterScene04:{version:1,revision:'cinematic',opened:false,beat:10,messages:[{id:'TA-S04-FIRST',sender:'unknown',text:'You are looking for Daniel Mercer.',at:1800000600000}],status:'accepted',inspected:false,complete:true,preview:false}}
}

test('TRACE installation resumes after reload and starts the next conversation without a scene button',async({page})=>{
 await seedScene(page,ready(),{pauseClock:true})
 const open=async()=>{await page.getByRole('button',{name:'Open Messages',exact:true}).first().click();await page.getByRole('button',{name:'Open Unknown conversation',exact:true}).click()}
 await open()
 await page.getByRole('button',{name:'INSTALL TRACE',exact:true}).click()
 const progress=page.getByRole('progressbar',{name:'TRACE installation'})
 await expect(progress).toHaveAttribute('aria-valuenow','0')
 await expect(page.getByRole('button',{name:'CONTINUE',exact:true})).toHaveCount(0)
 await page.clock.runFor(3000)
 const partial=Number(await progress.getAttribute('aria-valuenow'))
 expect(partial).toBeGreaterThan(0);expect(partial).toBeLessThan(100)
 await page.waitForFunction(()=>!sessionStorage.getItem('the-archive-reboot:pending-save:v1'))
 await page.reload()
 await page.getByRole('button',{name:'Unlock phone'}).click()
 await open()
 expect(Number(await progress.getAttribute('aria-valuenow'))).toBeGreaterThanOrEqual(partial)
 await page.clock.runFor(4000)
 await expect(progress).toHaveAttribute('aria-valuenow','100')
 await expect(page.getByRole('button',{name:'START SCENE 5'})).toHaveCount(0)
 await page.getByRole('button',{name:'CONTINUE',exact:true}).click()
 await expect(page.getByRole('button',{name:/^(START|CONTINUE TO) SCENE 5$/i})).toHaveCount(0)
 await expect(page.getByText('Did TRACE open?',{exact:true})).toBeVisible()
 await page.waitForFunction(()=>!sessionStorage.getItem('the-archive-reboot:pending-save:v1'))
 await page.reload()
 await page.getByRole('button',{name:'Unlock phone'}).click()
 await open()
 await expect(page.getByText('Did TRACE open?',{exact:true})).toHaveCount(1)
 await expect(page.getByRole('button',{name:/^(START|CONTINUE TO) SCENE 5$/i})).toHaveCount(0)
})
