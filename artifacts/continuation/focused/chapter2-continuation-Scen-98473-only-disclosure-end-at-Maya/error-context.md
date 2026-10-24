# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chapter2-continuation.spec.ts >> Scenes 10–15: silent group, optional Lucas, comparison, Sophie, recovery, private help and Nora-only disclosure end at Maya
- Location: tests\e2e\chapter2-continuation.spec.ts:11:1

# Error details

```
Test timeout of 240000ms exceeded.
```

```
Error: locator.click: Test timeout of 240000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'What would you check first?', exact: true })

```

# Page snapshot

```yaml
- generic [ref=f1e4]:
  - generic "Local time 08:53 PM" [ref=f1e5]: 8:53 PM
  - region "Eli conversation" [ref=f1e22]:
    - generic [ref=f1e23]:
      - button "Back to inbox" [ref=f1e24] [cursor=pointer]
      - generic [ref=f1e28]:
        - strong [ref=f1e29]: Eli
        - generic [ref=f1e30]: Offline
    - generic [ref=f1e31]:
      - generic [ref=f1e32]: Can a damaged export turn an ID into something that looks like a person's name?
      - status "Eli is typing" [ref=f1e35]
    - button "Explore Phone Mirror" [ref=f1e42] [cursor=pointer]
  - navigation "Phone navigation" [ref=f1e43]:
    - button "Go home" [ref=f1e44] [cursor=pointer]
```

# Test source

```ts
  1  | import { test,expect,type Page } from '@playwright/test'
  2  | import {ContinuationFixture} from '../helpers/continuation'
  3  | import {seedScene} from './scene01-helper'
  4  | import {storedLife} from './life-helper'
  5  | async function fixture(page:Page,f:ContinuationFixture){await seedScene(page,f.save);await page.clock.pauseAt(new Date(f.now))}
  6  | async function inbox(page:Page){await page.getByRole('button',{name:'Open Messages',exact:true}).first().click()}
> 7  | async function send(page:Page,text:string,silent=false,delay=45000){await page.getByRole('button',{name:text,exact:true}).click();await page.getByRole('button',{name:silent?'Keep reading':'Send',exact:true}).click();await page.clock.runFor(delay)}
     |                                                                                                                           ^ Error: locator.click: Test timeout of 240000ms exceeded.
  8  | async function reflect(page:Page,key:string,text:string){const area=page.locator(`[aria-label="${key} private reflection"]`);await area.getByRole('button',{name:text,exact:true}).click();await area.getByRole('button',{name:'Save reflection',exact:true}).click()}
  9  | async function homeFromChat(page:Page){await page.getByRole('button',{name:'Back to inbox',exact:true}).click();await page.getByRole('button',{name:'Back to home',exact:true}).click()}
  10 | 
  11 | test('Scenes 10–15: silent group, optional Lucas, comparison, Sophie, recovery, private help and Nora-only disclosure end at Maya',async({page})=>{
  12 |  test.setTimeout(240000)
  13 |  await page.setViewportSize({width:390,height:844})
  14 |  const f=new ContinuationFixture().scene10('a')
  15 |  await fixture(page,f);await inbox(page);await page.getByRole('button',{name:'Open FIND DANIEL group conversation',exact:true}).click()
  16 |  await send(page,'Lucas, do you still have the message?')
  17 |  const before=(await storedLife(page)).chapter2Access!.groupMessages.filter(m=>m.sender==='player').length
  18 |  await send(page,'[Read without replying]',true)
  19 |  expect((await storedLife(page)).chapter2Access!.groupMessages.filter(m=>m.sender==='player')).toHaveLength(before)
  20 |  await page.screenshot({path:test.info().outputPath('scene10-group.png')})
  21 |  await homeFromChat(page)
  22 |  await page.getByRole('button',{name:'Open The Archive',exact:true}).click();await page.getByRole('button',{name:'Compare observations',exact:true}).click()
  23 |  for(const name of ['Lucas','Maya','Unsent draft'])await page.getByRole('button',{name:`Open source · ${name}`,exact:true}).click()
  24 |  await reflect(page,'C11_01',"There isn't enough context yet.")
  25 |  await page.getByRole('button',{name:'Save all source references for later',exact:true}).click()
  26 |  await expect(page.getByRole('status')).toContainText('Comparison retained privately')
  27 |  await page.screenshot({path:test.info().outputPath('scene11-comparison.png')})
  28 |  await page.getByRole('button',{name:'Close investigation',exact:true}).click();await page.getByRole('button',{name:'Back to home',exact:true}).click();await inbox(page)
  29 |  await expect(page.getByRole('button',{name:'Open Lucas Grey conversation',exact:true})).toBeVisible()
  30 |  expect((await storedLife(page)).chapter2Access!.story!.continuation!.lucasCompleted).toBe(false)
  31 |  await page.getByRole('button',{name:'Open Sophie conversation',exact:true}).click();await page.clock.runFor(15000)
  32 |  await send(page,"I'm here. What's going on?")
  33 |  await send(page,'A sunflower clock? He had interesting taste.')
  34 |  await expect(page.getByRole('button',{name:'I found an old message about a picture in a recovered copy.',exact:true})).toHaveCount(0)
  35 |  await send(page,'It sounds like he kept promises, even small ones.')
  36 |  await send(page,"You don't need to justify missing him.")
  37 |  expect((await storedLife(page)).chapter2Access!.story!.continuation!.completed).toContain(12)
  38 |  await homeFromChat(page);await page.getByRole('button',{name:'Open The Archive',exact:true}).click();await page.getByRole('button',{name:'Review Recently Deleted results',exact:true}).click()
  39 |  await page.getByRole('button',{name:'RD-02 · unsent_note.txt',exact:true}).click();await expect(page.getByText('PARTIAL · Author attribution from mirror index only, not verified.',{exact:false})).toBeVisible()
  40 |  await reflect(page,'R13_NOTE',"I shouldn't infer a recipient.")
  41 |  await page.getByRole('button',{name:'RD-03 · IMG_0419.thumb',exact:true}).click();await expect(page.getByRole('img',{name:/A kitchen wall/})).toBeVisible();await reflect(page,'R13_PHOTO','Leave unlinked pending a source check.')
  42 |  await page.getByRole('button',{name:'RD-01 · index_history.part',exact:true}).click();await expect(page.getByText('PARTIAL · Order may be reconstructed incorrectly.',{exact:false})).toBeVisible()
  43 |  await reflect(page,'R13_01','The history is too damaged to settle what happened.')
  44 |  await page.screenshot({path:test.info().outputPath('scene13-recovery.png')})
  45 |  await page.getByRole('button',{name:'View cross-reference',exact:true}).click();await page.getByRole('button',{name:'Inspect E—I',exact:true}).click();await page.getByRole('button',{name:'Search existing index',exact:true}).click()
  46 |  await expect(page.getByRole('status')).toContainText('no exact verified match')
  47 |  await reflect(page,'E14_01','It could be a file or system reference.')
  48 |  await page.getByRole('button',{name:'Ask Eli a general technical question',exact:true}).click()
  49 |  const beforeHelp=(await storedLife(page)).knowledge.characters.eli
  50 |  expect(beforeHelp).not.toContain('C2-GENERAL-CORRUPT-ID-QUESTION')
  51 |  await send(page,"Can a damaged export turn an ID into something that looks like a person's name?")
  52 |  await send(page,'What would you check first?')
  53 |  const helped=await storedLife(page);expect(helped.knowledge.characters.eli).toContain('C2-GENERAL-CORRUPT-ID-QUESTION');expect(helped.knowledge.characters.eli).not.toContain('C2-714-DISCREPANCY')
  54 |  await page.getByRole('button',{name:'Explore Phone Mirror',exact:true}).click();await page.getByRole('button',{name:'Evidence journal · Disclosure decision',exact:true}).click()
  55 |  const beforeDisclosure=(await storedLife(page)).knowledge.characters
  56 |  await page.getByRole('button',{name:'Share only the 7-14 discrepancy with FIND DANIEL',exact:true}).click();await expect(page.getByRole('dialog',{name:'Disclosure preview',exact:true})).toContainText('No private texts or E—I token sent.')
  57 |  await page.getByRole('button',{name:'CANCEL',exact:true}).click();expect((await storedLife(page)).knowledge.characters).toEqual(beforeDisclosure)
  58 |  await page.getByRole('button',{name:'Ask Nora privately to review the source limitations',exact:true}).click();await page.getByRole('button',{name:'SEND TO NORA',exact:true}).click();await page.clock.runFor(15000)
  59 |  await send(page,'I want to verify it before I name anyone.',false,15000)
  60 |  const sent=await storedLife(page)
  61 |  expect(sent.knowledge.characters.nora).toContain('C2-714-DISCREPANCY')
  62 |  for(const who of ['maya','lucas','sophie','eli'] as const)expect(sent.knowledge.characters[who]).toEqual(beforeDisclosure[who])
  63 |  await homeFromChat(page);await page.getByRole('button',{name:'Open Settings',exact:true}).click()
  64 |  const now=await page.evaluate(()=>Date.now());await page.clock.runFor(Math.max(0,sent.chapter2Access!.story!.continuation!.finalDueAt!-now)+100)
  65 |  await expect(page.getByRole('complementary',{name:'Incoming notification'})).toContainText("There's something I need to tell you.")
  66 |  expect((await storedLife(page)).chapter2Access!.story!.continuation!.completed).not.toContain(15)
  67 |  await page.getByRole('button',{name:'Dismiss notification',exact:true}).click();await page.getByRole('button',{name:'Back to home',exact:true}).click();await inbox(page);await page.getByRole('button',{name:'Open FIND DANIEL group conversation',exact:true}).click();await page.clock.runFor(45000)
  68 |  await expect(page.getByText("I just don't know if I'm ready to read it in front of everyone.",{exact:true})).toBeVisible()
  69 |  await expect(page.getByRole('button',{name:'Send',exact:true})).toHaveCount(0)
  70 |  const final=await storedLife(page);expect(final.chapter2Access!.story!.continuation!.completed).toContain(15);expect(final.chapter2Access!.story!.continuation!.finalRead).toBe(true)
  71 |  await page.screenshot({path:test.info().outputPath('scene15-maya-hard-stop.png')})
  72 |  await expect.poll(()=>page.evaluate(()=>sessionStorage.getItem('the-archive-reboot:pending-save:v1'))).toBeNull();await page.reload();await page.getByRole('button',{name:'Enter the archive',exact:true}).click();expect((await storedLife(page)).chapter2Access!.story!.continuation!.completed).toContain(15)
  73 | })
  74 | 
  75 | test('disclosure preview is retained at 320px and cancel cannot send to anyone',async({page})=>{
  76 |  await page.setViewportSize({width:320,height:720});const f=new ContinuationFixture().scene15();await fixture(page,f);await page.getByRole('button',{name:'Open The Archive',exact:true}).click()
  77 |  await page.getByRole('button',{name:'Tell FIND DANIEL that a Phone Mirror exists',exact:true}).click();await expect(page.getByRole('dialog',{name:'Disclosure preview',exact:true})).toBeVisible()
  78 |  const k=(await storedLife(page)).knowledge.characters
  79 |  await expect.poll(()=>page.evaluate(()=>sessionStorage.getItem('the-archive-reboot:pending-save:v1'))).toBeNull();await page.reload();await page.getByRole('button',{name:'Enter the archive',exact:true}).click();await page.getByRole('button',{name:'Open The Archive',exact:true}).click();await expect(page.getByRole('dialog',{name:'Disclosure preview',exact:true})).toBeVisible()
  80 |  await page.getByRole('button',{name:'CANCEL',exact:true}).click();expect((await storedLife(page)).knowledge.characters).toEqual(k)
  81 |  await page.screenshot({path:test.info().outputPath('scene15-disclosure-320.png')})
  82 | })
  83 | 
```