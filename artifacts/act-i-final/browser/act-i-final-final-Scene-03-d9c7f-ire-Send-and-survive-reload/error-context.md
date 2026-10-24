# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: act-i-final.spec.ts >> final Scene 03: disclosure and secondary choices each require Send and survive reload
- Location: tests\e2e\act-i-final.spec.ts:49:1

# Error details

```
Test timeout of 90000ms exceeded.
```

```
Error: locator.click: Test timeout of 90000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Enter the archive', exact: true })
    - locator resolved to <button aria-label="Enter the archive">…</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is not stable
    - retrying click action
    - waiting 20ms
    - waiting for element to be visible, enabled and stable
    - element is not stable
  - retrying click action
    - waiting 100ms
    - waiting for element to be visible, enabled and stable

```

# Page snapshot

```yaml
- generic [ref=f2e4]:
  - generic "Local time 04:33 PM" [ref=f2e5]: 4:33 PM
  - main "Phone lock screen" [ref=f2e22]:
    - generic [ref=f2e23]:
      - paragraph [ref=f2e28]: Thursday, 8 October
      - heading "4:00 PM" [level=1] [ref=f2e29]
    - generic [ref=f2e30]:
      - paragraph [ref=f2e31]:
        - text: YOUR PHONE
        - generic [ref=f2e32]: PRIVATE DEVICE
      - button "Enter the archive" [ref=f2e33] [cursor=pointer]:
        - generic [ref=f2e36]: Swipe up to open
  - navigation "Phone navigation" [ref=f2e37]:
    - button "Go home" [ref=f2e38] [cursor=pointer]
```

# Test source

```ts
  1  | import { test,expect } from '@playwright/test'
  2  | import { ActIFinalFixture } from '../helpers/actIFinal'
  3  | import { seedScene,openSophie,sceneReply } from './scene01-helper'
  4  | 
  5  | test('final Scene 01: defer, resume, explicit Continue, JOIN and manual group opening on a small phone',async({page})=>{
  6  |   await page.setViewportSize({width:320,height:720})
  7  |   await seedScene(page,new ActIFinalFixture().until('OPEN-S01-C13').save)
  8  |   await openSophie(page)
  9  |   await sceneReply(page,'Not right now.')
  10 |   await expect(page.getByRole('button',{name:'Accept invitation',exact:true})).toBeVisible()
  11 |   await page.getByRole('button',{name:'Accept invitation',exact:true}).click()
  12 |   await page.clock.runFor(120000)
  13 |   await page.getByRole('button',{name:'Continue',exact:true}).click()
  14 |   await page.clock.runFor(120000)
  15 |   await sceneReply(page,'I can handle a rude person.')
  16 |   await page.getByRole('button',{name:'JOIN GROUP',exact:true}).click()
  17 |   await expect(page.getByRole('button',{name:'Open FIND DANIEL →',exact:true})).toBeVisible()
  18 |   await page.getByRole('button',{name:'Open FIND DANIEL →',exact:true}).click()
  19 |   await page.clock.runFor(120000)
  20 |   await expect(page.locator('[data-scene-node="OPEN-S02-C01"]')).toBeVisible()
  21 |   await expect(page.getByText('You joined FIND DANIEL.',{exact:true})).toHaveCount(1)
  22 |   expect(await page.locator('.opening-thread').evaluate(el=>el.scrollWidth<=el.clientWidth)).toBe(true)
  23 | })
  24 | 
  25 | test('final Scene 02: private sender request preserves group, block and reload, then manual return',async({page})=>{
  26 |   await seedScene(page,new ActIFinalFixture().until('OPEN-S02-C09').save)
  27 |   await page.getByRole('button',{name:'Open Messages',exact:true}).first().click()
  28 |   await page.getByRole('button',{name:'Open FIND DANIEL group conversation',exact:true}).click()
  29 |   await sceneReply(page,'What happened that night?')
  30 |   await expect(page.getByRole('button',{name:'OPEN MESSAGE',exact:true})).toBeVisible()
  31 |   await page.getByRole('button',{name:'OPEN MESSAGE',exact:true}).click()
  32 |   await expect(page.getByText("You shouldn't be talking to her.",{exact:true})).toHaveCount(1)
  33 |   await page.getByRole('button',{name:'Who is this?',exact:true}).click()
  34 |   await page.getByRole('button',{name:'Send',exact:true}).click()
  35 |   await page.getByRole('button',{name:'BLOCK NUMBER',exact:true}).click()
  36 |   await page.getByRole('button',{name:'BACK TO FIND DANIEL',exact:true}).click()
  37 |   await page.clock.runFor(120000)
  38 |   await expect(page.locator('[data-scene-node="OPEN-S02-C10"]')).toBeVisible()
  39 |   await expect(page.getByText('Maya deleted a message.',{exact:true})).toHaveCount(1)
  40 |   await expect(page.getByText("You shouldn't be talking to her.",{exact:true})).toHaveCount(0)
  41 |   await page.reload()
  42 |   await page.getByRole('button',{name:'Enter the archive',exact:true}).click()
  43 |   await page.getByRole('button',{name:'Open Messages',exact:true}).first().click()
  44 |   await page.getByRole('button',{name:'Open Chapter 1 Unknown Sender conversation',exact:true}).click()
  45 |   await expect(page.getByText('Number blocked.',{exact:true})).toBeVisible()
  46 |   await expect(page.getByText('Who is this?',{exact:true})).toHaveCount(1)
  47 | })
  48 | 
  49 | test('final Scene 03: disclosure and secondary choices each require Send and survive reload',async({page})=>{
  50 |   const f=new ActIFinalFixture().until('OPEN-S02-C09').send('a').sender().act('open-group').until('OPEN-S03-FINAL-DISCLOSURE-OFFER')
  51 |   await seedScene(page,f.save)
  52 |   await openSophie(page)
  53 |   await page.getByRole('button',{name:'TELL SOPHIE ABOUT THE MESSAGE',exact:true}).click()
  54 |   await sceneReply(page,'Something strange happened while we were in the group.')
  55 |   const quote='A number I don’t know sent me: “You shouldn’t be talking to her.”'
  56 |   // Authored apostrophes are literal; selection must not send the continuation automatically.
  57 |   const continuation=page.getByRole('button',{name:/A number I don't know sent me/})
  58 |   await expect(continuation).toBeVisible()
  59 |   await continuation.click()
  60 |   expect(await page.locator('.opening-bubble.player').filter({hasText:/A number I don't know/}).count()).toBe(0)
  61 |   await page.getByRole('button',{name:'Send',exact:true}).click()
  62 |   await page.clock.runFor(120000)
  63 |   await sceneReply(page,'During the group chat.')
  64 |   await expect(page.getByRole('button',{name:"I replied, but they haven't answered.",exact:true})).toHaveCount(0)
  65 |   await page.getByRole('button',{name:"I didn't reply.",exact:true}).click()
  66 |   await page.reload()
> 67 |   await page.getByRole('button',{name:'Enter the archive',exact:true}).click()
     |                                                                        ^ Error: locator.click: Test timeout of 90000ms exceeded.
  68 |   await openSophie(page)
  69 |   await expect(page.getByRole('button',{name:"I didn't reply.",exact:true})).toHaveAttribute('aria-pressed','true')
  70 |   await page.getByRole('button',{name:'Send',exact:true}).click()
  71 |   await page.clock.runFor(120000)
  72 |   await expect(page.locator('[data-scene-node="OPEN-S03-C16"]')).toBeVisible()
  73 |   await expect(page.getByText('Thanks for telling me.',{exact:true})).toHaveCount(1)
  74 |   void quote
  75 | })
  76 | 
```