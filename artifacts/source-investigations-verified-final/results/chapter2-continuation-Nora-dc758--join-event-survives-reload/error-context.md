# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chapter2-continuation.spec.ts >> Nora appears in the roster only after Maya invites her and the visible join event survives reload
- Location: tests\e2e\chapter2-continuation.spec.ts:87:1

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByText('Maya Chen added Nora Vance to FIND DANIEL.', { exact: true })
Expected: 1
Received: 0
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" getByText('Maya Chen added Nora Vance to FIND DANIEL.', { exact: true }) with timeout 5000ms
  - waiting for getByText('Maya Chen added Nora Vance to FIND DANIEL.', { exact: true })
    14 × locator resolved to 0 elements
       - unexpected value "0"

```

# Page snapshot

```yaml
- generic [ref=f2e4]:
  - heading "Save needs attention" [level=1] [ref=f2e5]
  - paragraph [ref=f2e6]: A previous write was interrupted after some progress was stored. Download the pending local backup before choosing which version to keep.
  - paragraph [ref=f2e7]: Your stored progress has not been overwritten. Download a copy before choosing to reload; any unsaved changes in this tab may be lost.
  - button "Download local backup" [ref=f2e8] [cursor=pointer]
  - button "Reload stored save" [ref=f2e12] [cursor=pointer]
```

# Test source

```ts
  1   | import {startReunion} from '../../src/game/chapter2Reunion'
  2   | import {noraInviteReceiptId} from '../../src/content/noraReunion'
  3   | import { test,expect,type Page } from '@playwright/test'
  4   | import {ContinuationFixture} from '../helpers/continuation'
  5   | import {seedScene} from './scene01-helper'
  6   | import {storedLife} from './life-helper'
  7   | async function fixture(page:Page,f:ContinuationFixture){await seedScene(page,f.save);await page.clock.pauseAt(new Date(f.now))}
  8   | async function inbox(page:Page){await page.getByRole('button',{name:'Open Messages',exact:true}).first().click()}
  9   | async function send(page:Page,text:string,silent=false,delay=45000){await page.getByRole('button',{name:text,exact:true}).click();await page.getByRole('button',{name:silent?'Keep reading':'Send',exact:true}).click();await page.clock.runFor(delay)}
  10  | async function reflect(page:Page,key:string,text:string){const area=page.locator(`[aria-label="${key} private reflection"]`);await area.getByRole('button',{name:text,exact:true}).click();await area.getByRole('button',{name:'Save reflection',exact:true}).click()}
  11  | async function homeFromChat(page:Page){await page.getByRole('button',{name:'Back to inbox',exact:true}).click();await page.getByRole('button',{name:'Back to home',exact:true}).click()}
  12  | 
  13  | test('Scenes 10–15: silent group, optional Lucas, comparison, Sophie, recovery, private help and Nora-only disclosure end at Maya',async({page})=>{
  14  |  test.setTimeout(240000)
  15  |  await page.setViewportSize({width:390,height:844})
  16  |  const f=new ContinuationFixture().scene10('a')
  17  |  await fixture(page,f);await inbox(page);await page.getByRole('button',{name:'Open FIND DANIEL group conversation',exact:true}).click()
  18  |  await send(page,'Lucas, do you still have the message?')
  19  |  const before=(await storedLife(page)).chapter2Access!.groupMessages.filter(m=>m.sender==='player').length
  20  |  await send(page,'[Read without replying]',true)
  21  |  expect((await storedLife(page)).chapter2Access!.groupMessages.filter(m=>m.sender==='player')).toHaveLength(before)
  22  |  await page.screenshot({path:test.info().outputPath('scene10-group.png')})
  23  |  await homeFromChat(page)
  24  |  await page.getByRole('button',{name:'Open The Archive',exact:true}).click();await page.getByRole('button',{name:'Compare observations',exact:true}).click()
  25  |  for(const name of ['Lucas','Maya','Unsent draft'])await page.getByRole('button',{name:`Open source · ${name}`,exact:true}).click()
  26  |  await reflect(page,'C11_01',"There isn't enough context yet.")
  27  |  await page.getByRole('button',{name:'Save all source references for later',exact:true}).click()
  28  |  await expect(page.getByRole('status')).toContainText('Comparison retained privately')
  29  |  await page.screenshot({path:test.info().outputPath('scene11-comparison.png')})
  30  |  await page.getByRole('button',{name:'Close investigation',exact:true}).click();await page.getByRole('button',{name:'Back to home',exact:true}).click();await inbox(page)
  31  |  await expect(page.getByRole('button',{name:'Open Lucas Grey conversation',exact:true})).toBeVisible()
  32  |  expect((await storedLife(page)).chapter2Access!.story!.continuation!.lucasCompleted).toBe(false)
  33  |  await page.getByRole('button',{name:'Open Sophie conversation',exact:true}).click();await page.clock.runFor(15000)
  34  |  await send(page,"I'm here. What's going on?")
  35  |  await send(page,'A sunflower clock? He had interesting taste.')
  36  |  await expect(page.getByRole('button',{name:'I found an old message about a picture in a recovered copy.',exact:true})).toHaveCount(0)
  37  |  await send(page,'It sounds like he kept promises, even small ones.')
  38  |  await send(page,"You don't need to justify missing him.")
  39  |  expect((await storedLife(page)).chapter2Access!.story!.continuation!.completed).toContain(12)
  40  |  await homeFromChat(page);await page.getByRole('button',{name:'Open The Archive',exact:true}).click();await page.getByRole('button',{name:'Review Recently Deleted results',exact:true}).click()
  41  |  await page.getByRole('button',{name:'RD-02 · unsent_note.txt',exact:true}).click();await expect(page.getByText('PARTIAL · Author attribution from mirror index only, not verified.',{exact:false})).toBeVisible()
  42  |  await reflect(page,'R13_NOTE',"I shouldn't infer a recipient.")
  43  |  await page.getByRole('button',{name:'RD-03 · IMG_0419.thumb',exact:true}).click();await expect(page.getByRole('img',{name:/A kitchen wall/})).toBeVisible();await reflect(page,'R13_PHOTO','Leave unlinked pending a source check.')
  44  |  await page.getByRole('button',{name:'RD-01 · index_history.part',exact:true}).click();await expect(page.getByText('PARTIAL · Order may be reconstructed incorrectly.',{exact:false})).toBeVisible()
  45  |  await reflect(page,'R13_01','The history is too damaged to settle what happened.')
  46  |  await page.screenshot({path:test.info().outputPath('scene13-recovery.png')})
  47  |  await page.getByRole('button',{name:'View cross-reference',exact:true}).click();await page.getByRole('button',{name:'Inspect E—I',exact:true}).click();await page.getByRole('button',{name:'Search existing index',exact:true}).click()
  48  |  await expect(page.getByRole('status')).toContainText('no exact verified match')
  49  |  await reflect(page,'E14_01','It could be a file or system reference.')
  50  |  await page.getByRole('button',{name:'Ask Eli a general technical question',exact:true}).click()
  51  |  const beforeHelp=(await storedLife(page)).knowledge.characters.eli
  52  |  expect(beforeHelp).not.toContain('C2-GENERAL-CORRUPT-ID-QUESTION')
  53  |  await send(page,"Can a damaged export turn an ID into something that looks like a person's name?")
  54  |  await send(page,'What would you check first?')
  55  |  const helped=await storedLife(page);expect(helped.knowledge.characters.eli).toContain('C2-GENERAL-CORRUPT-ID-QUESTION');expect(helped.knowledge.characters.eli).not.toContain('C2-714-DISCREPANCY')
  56  |  await page.getByRole('button',{name:'Explore Phone Mirror',exact:true}).click();await page.getByRole('button',{name:'Evidence journal · Disclosure decision',exact:true}).click()
  57  |  const beforeDisclosure=(await storedLife(page)).knowledge.characters
  58  |  await page.getByRole('button',{name:'Share only the 7-14 discrepancy with FIND DANIEL',exact:true}).click();await expect(page.getByRole('dialog',{name:'Disclosure preview',exact:true})).toContainText('No private texts or E—I token sent.')
  59  |  await page.getByRole('button',{name:'CANCEL',exact:true}).click();expect((await storedLife(page)).knowledge.characters).toEqual(beforeDisclosure)
  60  |  await page.getByRole('button',{name:'Ask Nora privately to review the source limitations',exact:true}).click();await page.getByRole('button',{name:'SEND TO NORA',exact:true}).click();await page.clock.runFor(15000)
  61  |  await send(page,'I want to verify it before I name anyone.',false,15000)
  62  |  const sent=await storedLife(page)
  63  |  expect(sent.knowledge.characters.nora).toContain('C2-714-DISCREPANCY')
  64  |  for(const who of ['maya','lucas','sophie','eli'] as const)expect(sent.knowledge.characters[who]).toEqual(beforeDisclosure[who])
  65  |  await homeFromChat(page);await page.getByRole('button',{name:'Show home page 2',exact:true}).click();await page.getByRole('button',{name:'Open Settings',exact:true}).click()
  66  |  const now=await page.evaluate(()=>Date.now());await page.clock.runFor(Math.max(0,sent.chapter2Access!.story!.continuation!.finalDueAt!-now)+100)
  67  |  await expect(page.getByRole('complementary',{name:'Incoming notification'})).toContainText("There's something I need to tell you.")
  68  |  expect((await storedLife(page)).chapter2Access!.story!.continuation!.completed).not.toContain(15)
  69  |  await page.getByRole('button',{name:'Dismiss notification',exact:true}).click();await page.getByRole('button',{name:'Back to home',exact:true}).click();await inbox(page);await page.getByRole('button',{name:'Open FIND DANIEL group conversation',exact:true}).click();await page.clock.runFor(45000)
  70  |  await expect(page.getByText("I just don't know if I'm ready to read it in front of everyone.",{exact:true})).toBeVisible()
  71  |  await expect(page.getByRole('button',{name:'Send',exact:true})).toHaveCount(0)
  72  |  const final=await storedLife(page);expect(final.chapter2Access!.story!.continuation!.completed).toContain(15);expect(final.chapter2Access!.story!.continuation!.finalRead).toBe(true)
  73  |  await page.screenshot({path:test.info().outputPath('scene15-maya-hard-stop.png')})
  74  |  await expect.poll(()=>page.evaluate(()=>sessionStorage.getItem('the-archive-reboot:pending-save:v1'))).toBeNull();await page.reload();await page.getByRole('button',{name:'Enter the archive',exact:true}).click();expect((await storedLife(page)).chapter2Access!.story!.continuation!.completed).toContain(15)
  75  | })
  76  | 
  77  | test('disclosure preview is retained at 320px and cancel cannot send to anyone',async({page})=>{
  78  |  await page.setViewportSize({width:320,height:720});const f=new ContinuationFixture().scene15();await fixture(page,f);await page.getByRole('button',{name:'Open The Archive',exact:true}).click()
  79  |  await page.getByRole('button',{name:'Tell FIND DANIEL that a Phone Mirror exists',exact:true}).click();await expect(page.getByRole('dialog',{name:'Disclosure preview',exact:true})).toBeVisible()
  80  |  const k=(await storedLife(page)).knowledge.characters
  81  |  await expect.poll(()=>page.evaluate(()=>sessionStorage.getItem('the-archive-reboot:pending-save:v1'))).toBeNull();await page.reload();await page.getByRole('button',{name:'Enter the archive',exact:true}).click();await page.getByRole('button',{name:'Open The Archive',exact:true}).click();await expect(page.getByRole('dialog',{name:'Disclosure preview',exact:true})).toBeVisible()
  82  |  await page.getByRole('button',{name:'CANCEL',exact:true}).click();expect((await storedLife(page)).knowledge.characters).toEqual(k)
  83  |  await page.screenshot({path:test.info().outputPath('scene15-disclosure-320.png')})
  84  | })
  85  | 
  86  | 
  87  | test('Nora appears in the roster only after Maya invites her and the visible join event survives reload',async({page})=>{
  88  |  const f=new ContinuationFixture();f.act({type:'life-navigate',location:{app:'Mail',item:'LIFE-E4'}}).act({type:'start-recovery'});f.now+=18000;f.save=startReunion(f.save,f.now)
  89  |  await fixture(page,f);await inbox(page);await page.getByRole('button',{name:'Open FIND DANIEL group conversation',exact:true}).click()
  90  |  const roster=page.locator('.opening-chat-header small')
  91  |  await expect(roster).not.toContainText('Nora')
  92  |  for(let i=0;i<30;i++){const save=await storedLife(page);if(save.deliveredEvents.includes(noraInviteReceiptId))break;const due=save.chapter2Access!.story!.sessions.group!.queue!.dueAt!,now=await page.evaluate(()=>Date.now());await page.clock.runFor(Math.max(0,due-now)+1)}
  93  |  await expect(page.getByText("I asked if she'd be willing to join us.",{exact:true})).toBeVisible();await expect(roster).not.toContainText('Nora')
  94  |  await expect.poll(()=>page.evaluate(()=>sessionStorage.getItem('the-archive-reboot:pending-save:v1'))).toBeNull();await page.reload();await page.getByRole('button',{name:'Enter the archive',exact:true}).click();await inbox(page);await page.getByRole('button',{name:'Open FIND DANIEL group conversation',exact:true}).click()
  95  |  await page.clock.runFor(45000)
> 96  |  await expect(page.getByText('Maya Chen added Nora Vance to FIND DANIEL.',{exact:true})).toHaveCount(1)
      |                                                                                          ^ Error: expect(locator).toHaveCount(expected) failed
  97  |  await expect(page.getByText('Thanks for joining, Nora.',{exact:true})).toBeVisible();await expect(roster).toContainText('Nora')
  98  |  const save=await storedLife(page);expect(save.chapter2Access!.story!.members.nora).toBe(true);expect(save.knowledge.characters.nora).not.toContain('C2-DISCLOSED-PHONE-MIRROR')
  99  |  await page.screenshot({path:test.info().outputPath('scene08-nora-invitation.png')})
  100 | })
  101 | 
```