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
 for(let i=0;i<10;i++){s=masterScene04Action(s,{type:'draft',index:0});s=masterScene04Action(s,{type:'send'},210000+i*1000);s=masterScene04Action(s,{type:'tick'},s.masterScene04!.pending!.dueAt)}
 return masterScene04Action(masterScene04Action(s,{type:'inspect'}),{type:'accept'})
}
import { masterScene05Action as step5 } from '../../src/game/masterScene05'
import { masterFragments } from '../../src/content/masterScene05'
function afterFive():GameSave {
 let s=step5(ready(),{type:'start'});s=step5(s,{type:'archive-inspect'});s=step5(s,{type:'archive-risks'});s=step5(s,{type:'archive-accept'})
 for(let i=0;i<8;i++){s=step5(s,{type:'draft',index:0});s=step5(s,{type:'send'});s=step5(s,{type:'tick'},s.masterScene05!.pending!.dueAt)}
 s=step5(s,{type:'inspect'});s=step5(s,{type:'risks'});s=step5(s,{type:'install'});s=step5(s,{type:'open-trace'});s=step5(s,{type:'select'});s=step5(s,{type:'recover'})
 for(const f of masterFragments)s=step5(s,{type:'read',id:f.id})
 s=step5(s,{type:'save',id:masterFragments[0].id})
 for(let i=0;i<2;i++){s=step5(s,{type:'draft',index:0});s=step5(s,{type:'send'});s=step5(s,{type:'tick'},s.masterScene05!.pending!.dueAt)}
 if(s.masterScene05?.pending)s=step5(s,{type:'tick'},s.masterScene05.pending.dueAt)
 return s
}
test('Legacy Scene 6 preserves the earlier timeline and report flow',async({page})=>{
 const save=afterFive()
 await seedScene(page,{...save,masterScene05:{...save.masterScene05!,revision:undefined}})
 await page.getByRole('button',{name:'Open Messages',exact:true}).first().click()
 await page.getByRole('button',{name:'Open Unknown conversation'}).click()
 await page.getByRole('button',{name:'START SCENE 6'}).click()
 for(let i=0;i<8;i++){await expect(page.locator('.scene01-options .opening-choice')).toHaveCount(3);await page.locator('.scene01-options .opening-choice').nth(i%3).click();await page.getByRole('button',{name:'Send',exact:true}).click()}
 await page.getByRole('button',{name:'Go home'}).click();await page.getByRole('button',{name:'Open TRACE'}).click()
 await expect(page.getByText('Recovery: 12%')).toBeVisible()
 await page.getByRole('button',{name:'Open Activity Logs module'}).click()
 await page.getByRole('button',{name:'START ACTIVITY LOG RECOVERY'}).click()
 await expect(page.getByText('Recovery: 20%')).toBeVisible()
 await page.getByRole('button',{name:'OPEN ACTIVITY LOGS & TIMELINE'}).click()
 for(const name of ['Automatic backup sync','File access','Message activity','Note modification']){await page.getByRole('button',{name:new RegExp(name+' · inspect')}).click();await page.getByRole('button',{name:'ADD TO TIMELINE'}).click()}
 for(let i=0;i<3;i++)await page.getByRole('button',{name:'Move Note modification up'}).click()
 for(let i=0;i<2;i++)await page.getByRole('button',{name:'Move Message activity up'}).click()
 await page.getByRole('button',{name:'Move File access up'}).click()
 await page.getByRole('button',{name:'REVIEW TIMESTAMP LIMITS'}).click();await page.getByRole('button',{name:'MARK SYNC AS AUTOMATIC'}).click();await page.getByRole('button',{name:'MARK 19:00–20:00 UNRESOLVED'}).click()
 await page.getByRole('button',{name:/INSPECT SOURCE · TA-PH-MESSAGE-FAMILY/}).click();await page.getByRole('button',{name:'RETURN TO TIMELINE'}).click()
 await page.getByRole('button',{name:'SAVE FINDING'}).click()
 await page.waitForFunction(()=>!sessionStorage.getItem('the-archive-reboot:pending-save:v1'));await page.reload();await page.getByRole('button',{name:'Unlock phone'}).click()
 await page.getByRole('button',{name:'Open Messages',exact:true}).first().click();await page.getByRole('button',{name:'Open Unknown conversation'}).click()
 await page.getByRole('button',{name:/The recovered records leave a one-hour interval/}).click();await page.getByRole('button',{name:'REVIEW REPORT'}).click();await page.getByRole('button',{name:'SEND REPORT'}).click()
 for(let i=0;i<2;i++){await expect(page.locator('.scene01-options .opening-choice')).toHaveCount(3);await page.locator('.scene01-options .opening-choice').first().click();await page.getByRole('button',{name:'Send',exact:true}).click()}
 await expect(page.getByText(/Scene 6 complete/)).toBeVisible()
 await page.getByRole('button',{name:'Back to inbox'}).click()
 await page.getByRole('button',{name:'Open Sophie conversation'}).click()
 await expect(page.getByRole('region',{name:'Sophie private conversation'}).getByText("I went back to the contact export. I keep wondering why that number was starred. I still don't know who marked it.")).toBeVisible()
})
