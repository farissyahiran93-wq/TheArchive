import {startReunion} from '../../src/game/chapter2Reunion'
import {noraInviteReceiptId} from '../../src/content/noraReunion'
import { test,expect,type Page } from '@playwright/test'
import {ContinuationFixture} from '../helpers/continuation'
import {seedScene} from './scene01-helper'
import {storedLife} from './life-helper'
async function fixture(page:Page,f:ContinuationFixture){await seedScene(page,f.save);await page.clock.pauseAt(new Date(f.now))}
async function inbox(page:Page){await page.getByRole('button',{name:'Open Messages',exact:true}).first().click()}
async function send(page:Page,text:string,silent=false,delay=45000){await page.getByRole('button',{name:text,exact:true}).click();await page.getByRole('button',{name:silent?'Keep reading':'Send',exact:true}).click();await page.clock.runFor(delay)}
async function reflect(page:Page,key:string,text:string){const area=page.locator(`[aria-label="${key} private reflection"]`);await area.getByRole('button',{name:text,exact:true}).click();await area.getByRole('button',{name:'Save reflection',exact:true}).click()}
async function homeFromChat(page:Page){await page.getByRole('button',{name:'Back to inbox',exact:true}).click();await page.getByRole('button',{name:'Back to home',exact:true}).click()}

test('Scenes 10–15: silent group, optional Lucas, comparison, Sophie, recovery, private help and Nora-only disclosure end at Maya',async({page})=>{
 test.setTimeout(240000)
 await page.setViewportSize({width:390,height:844})
 const f=new ContinuationFixture().scene10('a')
 await fixture(page,f);await inbox(page);await page.getByRole('button',{name:'Open FIND DANIEL group conversation',exact:true}).click()
 await send(page,'Lucas, do you still have the message?')
 const before=(await storedLife(page)).chapter2Access!.groupMessages.filter(m=>m.sender==='player').length
 await send(page,'[Read without replying]',true)
 expect((await storedLife(page)).chapter2Access!.groupMessages.filter(m=>m.sender==='player')).toHaveLength(before)
 await page.screenshot({path:test.info().outputPath('scene10-group.png')})
 await homeFromChat(page)
 await page.getByRole('button',{name:'Open The Archive',exact:true}).click();await page.getByRole('button',{name:'Compare observations',exact:true}).click()
 for(const name of ['Lucas','Maya','Unsent draft'])await page.getByRole('button',{name:`Open source · ${name}`,exact:true}).click()
 await reflect(page,'C11_01',"There isn't enough context yet.")
 await page.getByRole('button',{name:'Save all source references for later',exact:true}).click()
 await expect(page.getByRole('status')).toContainText('Comparison retained privately')
 await page.screenshot({path:test.info().outputPath('scene11-comparison.png')})
 await page.getByRole('button',{name:'Close investigation',exact:true}).click();await page.getByRole('button',{name:'Back to home',exact:true}).click();await inbox(page)
 await expect(page.getByRole('button',{name:'Open Lucas Grey conversation',exact:true})).toBeVisible()
 expect((await storedLife(page)).chapter2Access!.story!.continuation!.lucasCompleted).toBe(false)
 await page.getByRole('button',{name:'Open Sophie conversation',exact:true}).click();await page.clock.runFor(15000)
 await send(page,"I'm here. What's going on?")
 await send(page,'A sunflower clock? He had interesting taste.')
 await expect(page.getByRole('button',{name:'I found an old message about a picture in a recovered copy.',exact:true})).toHaveCount(0)
 await send(page,'It sounds like he kept promises, even small ones.')
 await send(page,"You don't need to justify missing him.")
 expect((await storedLife(page)).chapter2Access!.story!.continuation!.completed).toContain(12)
 await homeFromChat(page);await page.getByRole('button',{name:'Open The Archive',exact:true}).click();await page.getByRole('button',{name:'Review Recently Deleted results',exact:true}).click()
 await page.getByRole('button',{name:'RD-02 · unsent_note.txt',exact:true}).click();await expect(page.getByText('PARTIAL · Author attribution from mirror index only, not verified.',{exact:false})).toBeVisible()
 await reflect(page,'R13_NOTE',"I shouldn't infer a recipient.")
 await page.getByRole('button',{name:'RD-03 · IMG_0419.thumb',exact:true}).click();await expect(page.getByRole('img',{name:/A kitchen wall/})).toBeVisible();await reflect(page,'R13_PHOTO','Leave unlinked pending a source check.')
 await page.getByRole('button',{name:'RD-01 · index_history.part',exact:true}).click();await expect(page.getByText('PARTIAL · Order may be reconstructed incorrectly.',{exact:false})).toBeVisible()
 await reflect(page,'R13_01','The history is too damaged to settle what happened.')
 await page.screenshot({path:test.info().outputPath('scene13-recovery.png')})
 await page.getByRole('button',{name:'View cross-reference',exact:true}).click();await page.getByRole('button',{name:'Inspect E—I',exact:true}).click();await page.getByRole('button',{name:'Search existing index',exact:true}).click()
 await expect(page.getByRole('status')).toContainText('no exact verified match')
 await reflect(page,'E14_01','It could be a file or system reference.')
 await page.getByRole('button',{name:'Ask Eli a general technical question',exact:true}).click()
 const beforeHelp=(await storedLife(page)).knowledge.characters.eli
 expect(beforeHelp).not.toContain('C2-GENERAL-CORRUPT-ID-QUESTION')
 await send(page,"Can a damaged export turn an ID into something that looks like a person's name?")
 await send(page,'What would you check first?')
 const helped=await storedLife(page);expect(helped.knowledge.characters.eli).toContain('C2-GENERAL-CORRUPT-ID-QUESTION');expect(helped.knowledge.characters.eli).not.toContain('C2-714-DISCREPANCY')
 await page.getByRole('button',{name:'Explore Phone Mirror',exact:true}).click();await page.getByRole('button',{name:'Evidence journal · Disclosure decision',exact:true}).click()
 const beforeDisclosure=(await storedLife(page)).knowledge.characters
 await page.getByRole('button',{name:'Share only the 7-14 discrepancy with FIND DANIEL',exact:true}).click();await expect(page.getByRole('dialog',{name:'Disclosure preview',exact:true})).toContainText('No private texts or E—I token sent.')
 await page.getByRole('button',{name:'CANCEL',exact:true}).click();expect((await storedLife(page)).knowledge.characters).toEqual(beforeDisclosure)
 await page.getByRole('button',{name:'Ask Nora privately to review the source limitations',exact:true}).click();await page.getByRole('button',{name:'SEND TO NORA',exact:true}).click();await page.clock.runFor(15000)
 await send(page,'I want to verify it before I name anyone.',false,15000)
 const sent=await storedLife(page)
 expect(sent.knowledge.characters.nora).toContain('C2-714-DISCREPANCY')
 for(const who of ['maya','lucas','sophie','eli'] as const)expect(sent.knowledge.characters[who]).toEqual(beforeDisclosure[who])
 await homeFromChat(page);await page.getByRole('button',{name:'Show home page 2',exact:true}).click();await page.getByRole('button',{name:'Open Settings',exact:true}).click()
 const now=await page.evaluate(()=>Date.now());await page.clock.runFor(Math.max(0,sent.chapter2Access!.story!.continuation!.finalDueAt!-now)+100)
 await expect(page.getByRole('complementary',{name:'Incoming notification'})).toContainText("There's something I need to tell you.")
 expect((await storedLife(page)).chapter2Access!.story!.continuation!.completed).not.toContain(15)
 await page.getByRole('button',{name:'Dismiss notification',exact:true}).click();await page.getByRole('button',{name:'Back to home',exact:true}).click();await inbox(page);await page.getByRole('button',{name:'Open FIND DANIEL group conversation',exact:true}).click();await page.clock.runFor(45000)
 await expect(page.getByText("I just don't know if I'm ready to read it in front of everyone.",{exact:true})).toBeVisible()
 await expect(page.getByRole('button',{name:'Send',exact:true})).toHaveCount(0)
 const final=await storedLife(page);expect(final.chapter2Access!.story!.continuation!.completed).toContain(15);expect(final.chapter2Access!.story!.continuation!.finalRead).toBe(true)
 await page.screenshot({path:test.info().outputPath('scene15-maya-hard-stop.png')})
 await expect.poll(()=>page.evaluate(()=>sessionStorage.getItem('the-archive-reboot:pending-save:v1'))).toBeNull();await page.reload();await page.getByRole('button',{name:'Enter the archive',exact:true}).click();expect((await storedLife(page)).chapter2Access!.story!.continuation!.completed).toContain(15)
})

test('disclosure preview is retained at 320px and cancel cannot send to anyone',async({page})=>{
 await page.setViewportSize({width:320,height:720});const f=new ContinuationFixture().scene15();await fixture(page,f);await page.getByRole('button',{name:'Open The Archive',exact:true}).click()
 await page.getByRole('button',{name:'Tell FIND DANIEL that a Phone Mirror exists',exact:true}).click();await expect(page.getByRole('dialog',{name:'Disclosure preview',exact:true})).toBeVisible()
 const k=(await storedLife(page)).knowledge.characters
 await expect.poll(()=>page.evaluate(()=>sessionStorage.getItem('the-archive-reboot:pending-save:v1'))).toBeNull();await page.reload();await page.getByRole('button',{name:'Enter the archive',exact:true}).click();await page.getByRole('button',{name:'Open The Archive',exact:true}).click();await expect(page.getByRole('dialog',{name:'Disclosure preview',exact:true})).toBeVisible()
 await page.getByRole('button',{name:'CANCEL',exact:true}).click();expect((await storedLife(page)).knowledge.characters).toEqual(k)
 await page.screenshot({path:test.info().outputPath('scene15-disclosure-320.png')})
})


test('Nora appears in the roster only after Maya invites her and the visible join event survives reload',async({page})=>{
 const f=new ContinuationFixture();f.act({type:'life-navigate',location:{app:'Mail',item:'LIFE-E4'}}).act({type:'start-recovery'});f.now+=18000;f.save=startReunion(f.save,f.now)
 await fixture(page,f);await inbox(page);await page.getByRole('button',{name:'Open FIND DANIEL group conversation',exact:true}).click()
 const roster=page.locator('.opening-chat-header small')
 await expect(roster).not.toContainText('Nora')
 for(let i=0;i<30;i++){const save=await storedLife(page);if(save.deliveredEvents.includes(noraInviteReceiptId))break;const due=save.chapter2Access!.story!.sessions.group!.queue!.dueAt!,now=await page.evaluate(()=>Date.now());await page.clock.runFor(Math.max(0,due-now)+1)}
 await expect(page.getByText("I asked if she'd be willing to join us.",{exact:true})).toBeVisible();await expect(roster).not.toContainText('Nora')
 await expect.poll(()=>page.evaluate(()=>sessionStorage.getItem('the-archive-reboot:pending-save:v1'))).toBeNull();await page.reload();await page.getByRole('button',{name:'Enter the archive',exact:true}).click();await inbox(page);await page.getByRole('button',{name:'Open FIND DANIEL group conversation',exact:true}).click()
 await page.clock.runFor(45000)
 await expect(page.getByText('Maya Chen added Nora Vance to FIND DANIEL.',{exact:true})).toHaveCount(1)
 await expect(page.getByText('Thanks for joining, Nora.',{exact:true})).toBeVisible();await expect(roster).toContainText('Nora')
 const save=await storedLife(page);expect(save.chapter2Access!.story!.members.nora).toBe(true);expect(save.knowledge.characters.nora).not.toContain('C2-DISCLOSED-PHONE-MIRROR')
 await page.screenshot({path:test.info().outputPath('scene08-nora-invitation.png')})
})
