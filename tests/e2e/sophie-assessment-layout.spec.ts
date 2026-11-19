import { expect, test } from '@playwright/test'
import { mkdirSync } from 'node:fs'
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
import { masterScene07Action as step7 } from '../../src/game/masterScene07'
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

function attachmentReady():GameSave {
 let s=step7(afterSix(),{type:'start'},500000)
 s=step7(s,{type:'answer'},500010)
 for(let i=0;i<10;i++){s=step7(s,{type:'clip-ended'},500020+i*100);s=step7(s,{type:'draft',index:0});s=step7(s,{type:'send'},500030+i*100)}
 s=step7(s,{type:'clip-ended'},502000);s=step7(s,{type:'open'});s=step7(s,{type:'transfer'},502100)
 return s
}
for(const width of [320,375,390,430])test(`Sophie TRACE comparison stays full width at ${width}px`,async({page})=>{
 await page.setViewportSize({width,height:844});await seedScene(page,attachmentReady())
 await page.getByRole('button',{name:'Open TRACE'}).click()
 const assessment=page.getByRole('article',{name:'Sophie statement verification'})
 await assessment.getByRole('button',{name:'The starred entry'}).click()
 const cards=assessment.locator('.trace-assessment-sources > article')
 await expect(cards).toHaveCount(2)
 const first=(await cards.nth(0).boundingBox())!,second=(await cards.nth(1).boundingBox())!
 expect(second.y).toBeGreaterThan(first.y+first.height-1)
 expect(Math.abs(first.width-second.width)).toBeLessThan(2)
 const assessBox=(await assessment.boundingBox())!;expect(first.width).toBeGreaterThan(assessBox.width*.80)
 const titleBox=(await cards.nth(0).locator('strong').boundingBox())!,quoteBox=(await cards.nth(0).locator('blockquote').boundingBox())!;expect(quoteBox.y).toBeGreaterThan(titleBox.y+titleBox.height-1)
 const result=assessment.locator('.trace-assessment > .trace-summary');const resultHeading=(await result.locator('strong').boundingBox())!,resultText=(await result.locator('p').boundingBox())!;expect(resultText.y).toBeGreaterThan(resultHeading.y+resultHeading.height-1)
 const dimensions=await assessment.evaluate(el=>({client:el.clientWidth,scroll:el.scrollWidth}))
 expect(dimensions.scroll).toBeLessThanOrEqual(dimensions.client+1)
 await expect(cards.nth(0).locator('blockquote')).toContainText('The number itself is clear')
 await expect(cards.nth(1)).toContainText('The Remarks field is damaged and unreadable')
 if(width===320||width===390){mkdirSync('artifacts/rework-2026-11-19',{recursive:true});await assessment.scrollIntoViewIfNeeded();await page.screenshot({path:`artifacts/rework-2026-11-19/trace-sophie-${width}.png`})}
})

test('Sophie controls private disclosure with a manual reply',async({page})=>{
 await page.setViewportSize({width:390,height:844})
 let s=step7(attachmentReady(),{type:'record-assessment',id:'star-visible'},600000)
 while(s.masterScene07?.privacy?.pending)s=step7(s,{type:'tick'},s.masterScene07.privacy.pending.dueAt)
 await seedScene(page,s);await page.getByRole('button',{name:'Open Messages',exact:true}).first().click();await page.getByRole('button',{name:'Open Sophie conversation'}).click()
 const privacy=page.getByRole('region',{name:'Sophie private discussion'});await expect(privacy.getByText("I don't think sending everyone that file is a good idea.")).toBeVisible()
 await expect(page.getByText('Optional group sharing')).toHaveCount(0)
 await page.getByRole('button',{name:"That's your decision, Sophie. I understand."}).click();await page.getByRole('button',{name:'Send',exact:true}).click();await page.clock.runFor(120000)
 await expect(privacy.getByText("If I decide Maya needs to know something, I'll tell her myself.")).toBeVisible()
 mkdirSync('artifacts/rework-2026-11-19',{recursive:true});await page.screenshot({path:'artifacts/rework-2026-11-19/sophie-private-decision.png'})
})
