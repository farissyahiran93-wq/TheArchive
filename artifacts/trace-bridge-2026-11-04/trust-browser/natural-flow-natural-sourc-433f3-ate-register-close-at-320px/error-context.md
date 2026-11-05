# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: natural-flow.spec.ts >> natural source conversation, Scene 6 lock and private register close at 320px
- Location: tests\e2e\natural-flow.spec.ts:14:30

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Did the reference tell you what happened to the article?', { exact: true })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByText('Did the reference tell you what happened to the article?', { exact: true }) with timeout 5000ms
  - waiting for getByText('Did the reference tell you what happened to the article?', { exact: true })

```

```yaml
- text: 4:34 PM GREYHAVEN
- button "Main Menu"
- region "Unknown Number conversation":
  - button "Back to inbox"
  - strong: Unknown Number
  - text: Availability unknown · Identity unverified NEW MESSAGE · Unknown You shouldn't be talking to her. NEW MESSAGE · Unknown There's something else you can check. I found an anomaly in a reference tied to the Greyhaven Bulletin article. Not in the article itself. In a record pointing to it. Choose a reply
  - button "Who is this? And how do you know what I've read?"
  - button "An anomaly? That sounds conveniently vague."
  - button "I'm listening. But start with what you actually found."
  - button "Send" [disabled]
- navigation "Phone navigation":
  - button "Go home"
```

# Test source

```ts
  1   | import { test,expect,type Page } from '@playwright/test'
  2   | import { NaturalFixture } from '../helpers/naturalConversation'
  3   | import { naturalInquiryQuestions } from '../../src/content/naturalConversation'
  4   | import type { GameSave } from '../../src/game/types'
  5   | import { seedScene,sceneReply } from './scene01-helper'
  6   | 
  7   | const click=(p:Page,name:string)=>p.getByRole('button',{name,exact:true}).first().click()
  8   | const home=(p:Page)=>click(p,'Go home')
  9   | const unknown=async(p:Page)=>{await click(p,'Open Messages');await p.getByRole('button',{name:/Open Chapter 1 Unknown Sender conversation/}).click();await p.clock.runFor(120000)}
  10  | const runtime=(p:Page):Promise<GameSave>=>p.evaluate(async()=>{const path='/src/game/store.ts';const m=await import(path);return m.useGameStore.getState().save})
  11  | const flush=(p:Page)=>p.waitForFunction(()=>!sessionStorage.getItem('the-archive-reboot:pending-save:v1'))
  12  | test.use({reducedMotion:'reduce'})
  13  | 
  14  | for(const width of [320,430])test(`natural source conversation, Scene 6 lock and private register close at ${width}px`,async({page})=>{
  15  |   test.setTimeout(180000)
  16  |   await page.setViewportSize({width,height:850})
  17  |   const f=new NaturalFixture().bridge().install().scan()
  18  |   await seedScene(page,f.save)
  19  |   await click(page,'Open TRACE')
  20  |   await expect(page.getByRole('button',{name:'REVIEW VERSION HISTORY',exact:true})).toHaveCount(0)
  21  |   await home(page);await unknown(page)
> 22  |   await expect(page.getByText('Did the reference tell you what happened to the article?',{exact:true})).toBeVisible()
      |                                                                                                         ^ Error: expect(locator).toBeVisible() failed
  23  |   await expect(page.getByRole('region',{name:'Current lead'})).toHaveCount(0)
  24  |   await expect(page.locator('.opening-action-heading .guidance-dot')).toHaveCount(1)
  25  |   await sceneReply(page,"I found a reference, not an earlier version.")
  26  |   await expect(page.locator('.natural-context button')).toHaveText('OPEN BULLETIN')
  27  |   await expect(page.getByText(/INSPECT FIRST/)).toHaveCount(0)
  28  |   await click(page,'OPEN BULLETIN')
  29  |   await expect(page.getByRole('button',{name:'Mark as read',exact:true})).toHaveCount(0)
  30  |   await expect(page.getByRole('button',{name:'Article read',exact:true})).toBeVisible()
  31  |   await expect(page.getByRole('button',{name:'PUBLIC CORRECTIONS REGISTER',exact:true})).toHaveCount(0)
  32  |   await click(page,'Updated: Yesterday')
  33  |   await expect(page.getByRole('button',{name:'SAVE ANALYSIS TO TRACE'}).locator('.guidance-dot')).toHaveCount(1)
  34  |   await click(page,'SAVE ANALYSIS TO TRACE');await click(page,'Close article information')
  35  |   expect((await runtime(page)).chapter1!.versionHistory!.chatChoices?.s05_c02_update_label).toBeUndefined()
  36  |   await click(page,'RETURN TO CHAT');await page.clock.runFor(120000)
  37  |   await sceneReply(page,"It says the page was updated. It doesn't say what changed.")
  38  |   // The explicit bridge findings already satisfy index inspection; no new scan.
  39  |   await sceneReply(page,"It's a pointer. It doesn't contain the original body.")
  40  |   await expect(page.locator('.natural-context button')).toHaveText('OPEN BULLETIN POLICY')
  41  |   await click(page,'OPEN BULLETIN POLICY');await click(page,'READ POLICY')
  42  |   const before=await runtime(page)
  43  |   expect(before.chapter1!.versionHistory!.chatChoices?.s05_c04_policy_meaning).toBeUndefined()
  44  |   await click(page,'RETURN TO CHAT');await page.clock.runFor(120000)
  45  |   const policy="It doesn't give us a change log for Daniel's article."
  46  |   await click(page,policy)
  47  |   await expect(page.getByRole('button',{name:'Send',exact:true}).locator('.guidance-dot')).toHaveCount(1)
  48  |   await flush(page);await page.reload();await click(page,'Unlock phone');await unknown(page)
  49  |   await expect(page.getByRole('button',{name:policy,exact:true})).toHaveAttribute('aria-pressed','true')
  50  |   await click(page,'Send');await page.clock.runFor(120000)
  51  |   await sceneReply(page,"We have an update label, a reference, and a policy. Not a before-and-after copy.")
  52  |   await sceneReply(page,"I'd look for an independently dated copy before contacting anyone.")
  53  |   await sceneReply(page,'The references match, but a wording change remains unverified.')
  54  |   const locked=await runtime(page)
  55  |   expect(locked.chapter1!.versionHistory!.complete).toBe(true)
  56  |   expect(locked.chapter1!.correctionsDesk).toBeUndefined()
  57  |   await expect(page.getByRole('button',{name:'OPEN PUBLIC REGISTER',exact:true})).toBeDisabled()
  58  |   await page.screenshot({path:test.info().outputPath(`instruction-locked-${width}.png`),animations:'disabled'})
  59  |   await sceneReply(page,"I'll record what it says, without jumping to conclusions.")
  60  |   await click(page,'OPEN PUBLIC CORRECTIONS REGISTER')
  61  |   await expect(page.getByRole('button',{name:'ASK THE DESK',exact:true})).toHaveCount(0)
  62  |   await expect(page.getByRole('button',{name:'SAVE FINDING',exact:true}).locator('.guidance-dot')).toHaveCount(1)
  63  |   await click(page,'SAVE FINDING')
  64  |   const saved=await runtime(page)
  65  |   expect(saved.chapter1!.correctionsDesk!.complete).toBe(false)
  66  |   expect(saved.evidence['NOTE-S06-DESK-LIMITS'].verified).toBe(false)
  67  |   await page.screenshot({path:test.info().outputPath(`register-private-${width}.png`),animations:'disabled'})
  68  |   await click(page,'RETURN TO CHAT');await page.clock.runFor(120000)
  69  |   await sceneReply(page,"Nothing is listed, but that doesn't prove the article stayed the same.")
  70  |   await sceneReply(page,"I'd rather not contact the publisher yet.")
  71  |   const complete=await runtime(page)
  72  |   expect(complete.chapter1!.correctionsDesk!.complete).toBe(true)
  73  |   expect(complete.chapter1!.completed).toContain(6)
  74  |   expect(complete.deliveredEvents).not.toContain('R-GB-CD-002')
  75  |   expect(complete.chapter1!.versionHistory!.checklist).toEqual([])
  76  |   expect(complete.chapter2Access).toBeUndefined()
  77  |   await expect(page.getByRole('button',{name:'OPEN OPTIONAL REQUEST',exact:true})).toBeDisabled()
  78  |   await page.screenshot({path:test.info().outputPath(`conversation-complete-${width}.png`),animations:'disabled'})
  79  |   expect(await page.locator('.device').evaluate(el=>el.scrollWidth<=el.clientWidth+1)).toBe(true)
  80  | })
  81  | 
  82  | test('optional inquiry needs its sent opt-in, selected question, review and final Send Request',async({page})=>{
  83  |   const f=new NaturalFixture().main().authorize().register().send('a')
  84  |   await seedScene(page,f.save);await unknown(page)
  85  |   await click(page,"I'll send a specific question through the public desk.")
  86  |   await expect(page.getByRole('button',{name:'OPEN OPTIONAL REQUEST',exact:true})).toBeDisabled()
  87  |   await click(page,'Send');await page.clock.runFor(120000)
  88  |   await click(page,'OPEN OPTIONAL REQUEST')
  89  |   await click(page,naturalInquiryQuestions[1])
  90  |   expect((await runtime(page)).deliveredEvents).not.toContain('R-GB-CD-002')
  91  |   await click(page,'REVIEW REQUEST')
  92  |   expect((await runtime(page)).deliveredEvents).not.toContain('R-GB-CD-002')
  93  |   await flush(page);await page.reload();await click(page,'Unlock phone')
  94  |   await unknown(page);await click(page,'OPEN OPTIONAL REQUEST')
  95  |   await expect(page.locator('.vh-draft')).toHaveText(naturalInquiryQuestions[1])
  96  |   await click(page,'SEND REQUEST')
  97  |   await expect(page.getByRole('heading',{name:'REQUEST SUBMITTED',exact:true})).toBeVisible()
  98  |   const save=await runtime(page)
  99  |   expect(save.deliveredEvents.filter(id=>id==='R-GB-CD-002')).toHaveLength(1)
  100 |   expect(save.pendingEvents.some(e=>e.id==='CH1-S06-DESK-REPLY')).toBe(false)
  101 |   await page.screenshot({path:test.info().outputPath('optional-request-receipt.png'),animations:'disabled'})
  102 | })
  103 | 
```