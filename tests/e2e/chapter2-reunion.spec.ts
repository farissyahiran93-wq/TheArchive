import { test,expect,type Page } from '@playwright/test'
import { expandedMirror,storedLife } from './life-helper'
import { seedScene,sceneNow } from './scene01-helper'
import { chapter2Access } from '../../src/game/chapter2Access'
import { startReunion } from '../../src/game/chapter2Reunion'
function reunionSave(){let s=expandedMirror();const now=sceneNow(s);s=chapter2Access(s,{type:'life-navigate',location:{app:'Mail',item:'LIFE-E4'}},now);s=chapter2Access(s,{type:'start-recovery'},now,true);return startReunion(s,now)}
async function openInbox(page:Page){await page.getByRole('button',{name:'Open Messages',exact:true}).first().click()}
async function choose(page:Page,index=0){const buttons=page.locator('.scene01-options .opening-choice');await expect(buttons.first()).toBeVisible();await buttons.nth(index).click();await page.getByRole('button',{name:'Send',exact:true}).click();await page.clock.runFor(180000)}

test('reunion, privacy, optional humanizing SPY, quiet Mirror interlude and Maya/Lucas reflection',async({page})=>{
 test.setTimeout(240000)
 await page.setViewportSize({width:390,height:844})
 await seedScene(page,reunionSave());await page.clock.pauseAt(await page.evaluate(()=>Date.now()))
 await openInbox(page);await page.getByRole('button',{name:'Open FIND DANIEL group conversation',exact:true}).click();await page.clock.runFor(180000)
 const group=page.getByRole('region',{name:'FIND DANIEL conversation',exact:true})
 await expect(group).toBeVisible()
 const send=page.getByRole('button',{name:'Send',exact:true})
 await expect(send).toBeDisabled()
 let choices=0
 for(let i=0;i<25;i++){
  const save=await storedLife(page),r=save.chapter2Access!.story!,node=r.sessions.group!.node
  if(r.groupComplete)break
  if(/^G0[1-8]$/.test(node))choices++
  await choose(page,node==='G04'?1:0) // no unobserved clue option: index 1 withholds
 }
 const completed=await storedLife(page)
 expect(choices).toBe(8);expect(completed.chapter2Access!.story!.disclosure).toBe('none')
 expect(completed.chapter2Access!.groupMessages.some(m=>m.sender==='nora')).toBe(false)
 expect(completed.knowledge.characters.maya.some(k=>k.startsWith('C2-DISCLOSED'))).toBe(false)
 await page.screenshot({path:test.info().outputPath('reunion-390.png')})
 await page.getByRole('button',{name:'Back to inbox',exact:true}).click()
 await expect(page.getByRole('button',{name:'Open Sophie conversation',exact:true})).toBeVisible()
 await page.getByRole('button',{name:'Open UNKNOWN conversation',exact:true}).click();await page.clock.runFor(180000)
 for(let i=0;i<8;i++){const r=(await storedLife(page)).chapter2Access!.story!;if(r.spy['eli-lucas'])break;await choose(page)}
 await expect(page.getByRole('button',{name:'Open Eli ↔ Lucas · Read only',exact:true})).toBeVisible()
 await page.getByRole('button',{name:'Open Eli ↔ Lucas · Read only',exact:true}).click()
 await expect(page.getByRole('button',{name:'Send',exact:true})).toHaveCount(0)
 await page.clock.runFor(6000)
 await page.getByRole('button',{name:'Back to inbox',exact:true}).click()
 const paused=(await storedLife(page)).chapter2Access!.story!.spy['eli-lucas']!
 expect(paused.complete).toBe(false)
 await page.clock.runFor(500000)
 expect((await storedLife(page)).chapter2Access!.story!.spy['eli-lucas']!.messages).toHaveLength(paused.messages.length)
 await page.getByRole('button',{name:'Open eli-lucas interception',exact:true}).click();await page.clock.runFor(240000)
 expect((await storedLife(page)).chapter2Access!.story!.spy['eli-lucas']!.messages).toHaveLength(33)
 await page.screenshot({path:test.info().outputPath('spy-eli-lucas-390.png')})
 await page.getByRole('button',{name:'Return to UNKNOWN',exact:true}).click();await page.clock.runFor(180000)
 for(let i=0;i<8;i++){if((await storedLife(page)).chapter2Access!.story!.firstResolved)break;await choose(page)}
 await page.getByRole('button',{name:'Explore Phone Mirror',exact:true}).click()
 await page.getByRole('button',{name:'OPEN PHONE MIRROR',exact:true}).click();await page.getByRole('button',{name:'ENTER MIRROR',exact:true}).click()
 await page.getByRole('button',{name:'Mirror home',exact:true}).click();await page.getByRole('button',{name:'Open mirrored Notes',exact:true}).click();await page.clock.runFor(1000)
 await expect(page.getByRole('complementary',{name:'Incoming notification'})).toContainText('MAYA ↔ LUCAS')
 await page.getByRole('button',{name:'Open notification from SPY · READ ONLY',exact:true}).click()
 await expect(page.getByRole('button',{name:'Send',exact:true})).toHaveCount(0)
 await page.clock.runFor(180000)
 await page.screenshot({path:test.info().outputPath('scene09-maya-lucas-390.png')})
 const before=(await storedLife(page)).knowledge.characters
 await page.getByRole('button',{name:'Return to UNKNOWN',exact:true}).click();await page.clock.runFor(180000);await choose(page)
 const end=await storedLife(page);expect(end.chapter2Access!.story!.complete).toBe(true);expect(end.knowledge.characters).toEqual(before)
 await expect.poll(()=>page.evaluate(()=>sessionStorage.getItem('the-archive-reboot:pending-save:v1'))).toBeNull()
 await page.reload();await page.getByRole('button',{name:'Enter the archive',exact:true}).click();expect((await storedLife(page)).chapter2Access!.story!.complete).toBe(true)
})


test('matching access threads suppress the empty inbox message while an unmatched search shows it',async({page})=>{
 await seedScene(page,reunionSave())
 await openInbox(page)
 await page.getByRole('textbox',{name:'Search conversations',exact:true}).fill('UNKNOWN')
 await expect(page.getByRole('button',{name:'Open UNKNOWN conversation',exact:true})).toBeVisible()
 await expect(page.getByText('No conversations found.',{exact:true})).toHaveCount(0)
 await page.getByRole('textbox',{name:'Search conversations',exact:true}).fill('nothing-will-match-this')
 await expect(page.getByText('No conversations found.',{exact:true})).toBeVisible()
})
