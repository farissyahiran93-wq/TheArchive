# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chapter2-reunion.spec.ts >> reunion, privacy, optional humanizing SPY, quiet Mirror interlude and Maya/Lucas reflection
- Location: tests\e2e\chapter2-reunion.spec.ts:10:1

# Error details

```
Test timeout of 240000ms exceeded.
```

```
Error: locator.click: Test timeout of 240000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Open mirrored Notes', exact: true })

```

# Page snapshot

```yaml
- generic [ref=f1e4]:
  - generic "Local time 09:36 PM" [ref=f1e5]: 9:36 PM
  - region "Daniel Mercer's mirrored phone" [ref=f1e22]:
    - generic [ref=f1e23]:
      - button "Back to The Archive" [ref=f1e24] [cursor=pointer]: The Archive
      - generic [ref=f1e27]: MIRRORED DATA · READ ONLY
    - generic "Static snapshot clock" [ref=f1e28]:
      - text: 9:41
      - generic [ref=f1e29]: Offline snapshot
    - generic [ref=f1e30]:
      - button "Back in mirror" [ref=f1e31] [cursor=pointer]
      - generic [ref=f1e34]:
        - strong [ref=f1e35]: Mail
        - generic [ref=f1e36]: Historical snapshot · Read only
    - article [ref=f1e38]:
      - heading "Storage Notification" [level=2] [ref=f1e39]
      - text: 2 Oct 2026
      - paragraph [ref=f1e40]: System
      - heading "Storage synchronization incomplete" [level=3] [ref=f1e41]
      - paragraph [ref=f1e42]: "Some recently removed items could not be included in the latest backup. Items affected: Messages Photos Files Recovery option: AVAILABLE Recovery time: 25 MINUTES"
      - generic [ref=f1e43]:
        - button "Reply" [disabled] [ref=f1e44]
        - button "Forward" [disabled] [ref=f1e45]
    - button "Mirror home" [ref=f1e46] [cursor=pointer]
  - navigation "Phone navigation" [ref=f1e51]:
    - button "Go home" [ref=f1e52] [cursor=pointer]
```

# Test source

```ts
  1  | import { test,expect,type Page } from '@playwright/test'
  2  | import { expandedMirror,storedLife } from './life-helper'
  3  | import { seedScene,sceneNow } from './scene01-helper'
  4  | import { chapter2Access } from '../../src/game/chapter2Access'
  5  | import { startReunion } from '../../src/game/chapter2Reunion'
  6  | function reunionSave(){let s=expandedMirror();const now=sceneNow(s);s=chapter2Access(s,{type:'life-navigate',location:{app:'Mail',item:'LIFE-E4'}},now);s=chapter2Access(s,{type:'start-recovery'},now,true);return startReunion(s,now)}
  7  | async function openInbox(page:Page){await page.getByRole('button',{name:'Open Messages',exact:true}).first().click()}
  8  | async function choose(page:Page,index=0){const buttons=page.locator('.scene01-options .opening-choice');await expect(buttons.first()).toBeVisible();await buttons.nth(index).click();await page.getByRole('button',{name:'Send',exact:true}).click();await page.clock.runFor(180000)}
  9  | 
  10 | test('reunion, privacy, optional humanizing SPY, quiet Mirror interlude and Maya/Lucas reflection',async({page})=>{
  11 |  test.setTimeout(240000)
  12 |  await page.setViewportSize({width:390,height:844})
  13 |  await seedScene(page,reunionSave());await page.clock.pauseAt(await page.evaluate(()=>Date.now()))
  14 |  await openInbox(page);await page.getByRole('button',{name:'Open FIND DANIEL group conversation',exact:true}).click();await page.clock.runFor(180000)
  15 |  const group=page.getByRole('region',{name:'FIND DANIEL conversation',exact:true})
  16 |  await expect(group).toBeVisible()
  17 |  const send=page.getByRole('button',{name:'Send',exact:true})
  18 |  await expect(send).toBeDisabled()
  19 |  let choices=0
  20 |  for(let i=0;i<25;i++){
  21 |   const save=await storedLife(page),r=save.chapter2Access!.story!,node=r.sessions.group!.node
  22 |   if(r.groupComplete)break
  23 |   if(/^G0[1-8]$/.test(node))choices++
  24 |   await choose(page,node==='G04'?1:0) // no unobserved clue option: index 1 withholds
  25 |  }
  26 |  const completed=await storedLife(page)
  27 |  expect(choices).toBe(8);expect(completed.chapter2Access!.story!.disclosure).toBe('none')
  28 |  expect(completed.chapter2Access!.groupMessages.some(m=>m.sender==='nora')).toBe(false)
  29 |  expect(completed.knowledge.characters.maya.some(k=>k.startsWith('C2-DISCLOSED'))).toBe(false)
  30 |  await page.screenshot({path:test.info().outputPath('reunion-390.png')})
  31 |  await page.getByRole('button',{name:'Back to inbox',exact:true}).click()
  32 |  await expect(page.getByRole('button',{name:'Open Sophie conversation',exact:true})).toBeVisible()
  33 |  await page.getByRole('button',{name:'Open UNKNOWN conversation',exact:true}).click();await page.clock.runFor(180000)
  34 |  for(let i=0;i<8;i++){const r=(await storedLife(page)).chapter2Access!.story!;if(r.spy['eli-lucas'])break;await choose(page)}
  35 |  await expect(page.getByRole('button',{name:'Open Eli ↔ Lucas · Read only',exact:true})).toBeVisible()
  36 |  await page.getByRole('button',{name:'Open Eli ↔ Lucas · Read only',exact:true}).click()
  37 |  await expect(page.getByRole('button',{name:'Send',exact:true})).toHaveCount(0)
  38 |  await page.clock.runFor(6000)
  39 |  await page.getByRole('button',{name:'Back to inbox',exact:true}).click()
  40 |  const paused=(await storedLife(page)).chapter2Access!.story!.spy['eli-lucas']!
  41 |  expect(paused.complete).toBe(false)
  42 |  await page.clock.runFor(500000)
  43 |  expect((await storedLife(page)).chapter2Access!.story!.spy['eli-lucas']!.messages).toHaveLength(paused.messages.length)
  44 |  await page.getByRole('button',{name:'Open eli-lucas interception',exact:true}).click();await page.clock.runFor(240000)
  45 |  expect((await storedLife(page)).chapter2Access!.story!.spy['eli-lucas']!.messages).toHaveLength(33)
  46 |  await page.screenshot({path:test.info().outputPath('spy-eli-lucas-390.png')})
  47 |  await page.getByRole('button',{name:'Return to UNKNOWN',exact:true}).click();await page.clock.runFor(180000)
  48 |  for(let i=0;i<8;i++){if((await storedLife(page)).chapter2Access!.story!.firstResolved)break;await choose(page)}
  49 |  await page.getByRole('button',{name:'Explore Phone Mirror',exact:true}).click()
  50 |  await page.getByRole('button',{name:'OPEN PHONE MIRROR',exact:true}).click();await page.getByRole('button',{name:'ENTER MIRROR',exact:true}).click()
> 51 |  await page.getByRole('button',{name:'Open mirrored Notes',exact:true}).click();await page.clock.runFor(15000)
     |                                                                         ^ Error: locator.click: Test timeout of 240000ms exceeded.
  52 |  await expect(page.getByRole('complementary',{name:'Incoming notification'})).toContainText('MAYA ↔ LUCAS')
  53 |  await page.getByRole('button',{name:'Open notification from SPY · READ ONLY',exact:true}).click()
  54 |  await expect(page.getByRole('button',{name:'Send',exact:true})).toHaveCount(0)
  55 |  await page.clock.runFor(180000)
  56 |  await page.screenshot({path:test.info().outputPath('scene09-maya-lucas-390.png')})
  57 |  const before=(await storedLife(page)).knowledge.characters
  58 |  await page.getByRole('button',{name:'Return to UNKNOWN',exact:true}).click();await page.clock.runFor(180000);await choose(page)
  59 |  const end=await storedLife(page);expect(end.chapter2Access!.story!.complete).toBe(true);expect(end.knowledge.characters).toEqual(before)
  60 |  await expect.poll(()=>page.evaluate(()=>sessionStorage.getItem('the-archive-reboot:pending-save:v1'))).toBeNull()
  61 |  await page.reload();await page.getByRole('button',{name:'Enter the archive',exact:true}).click();expect((await storedLife(page)).chapter2Access!.story!.complete).toBe(true)
  62 | })
  63 | 
```