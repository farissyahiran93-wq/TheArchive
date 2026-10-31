# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: phone-continuity.spec.ts >> Home keeps Maps and Contacts in place, hides early Archive, and starred reply can be sent
- Location: tests\e2e\phone-continuity.spec.ts:6:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Chat received from a number not in your contacts.')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByText('Chat received from a number not in your contacts.') with timeout 5000ms
  - waiting for getByText('Chat received from a number not in your contacts.')

```

```yaml
- text: 9:02 AM
- region "Sophie first contact conversation":
  - button "Back to inbox"
  - strong: Unknown number
  - text: Online Monday, October 26 · 09:00 AM NEW MESSAGE · Unknown number Hi. Sorry. This is going to sound odd. Is this still your number? Choose a reply
  - button "Who's asking?"
  - button "You might have the wrong person."
  - button "Depends. Is this about an unpaid parking ticket?"
  - button "What do you need?"
  - button "Send" [disabled]
- navigation "Phone navigation":
  - button "Go home"
```

# Test source

```ts
  1  | import {expect,test} from '@playwright/test'
  2  | import {beginScene01} from '../../src/game/scene01'
  3  | import {newGame} from '../../src/game/types'
  4  | import {seedScene} from './scene01-helper'
  5  | 
  6  | test('Home keeps Maps and Contacts in place, hides early Archive, and starred reply can be sent',async({page})=>{
  7  |   await page.clock.install({time:new Date('2026-10-26T09:00:00+08:00')})
  8  |   await page.goto('/')
  9  |   await page.getByRole('button',{name:'Enter the archive',exact:true}).click()
  10 |   const apps=page.getByRole('region',{name:'Home page 1 apps'})
  11 |   await expect(apps.getByRole('button',{name:'Open Maps'})).toBeVisible()
  12 |   await expect(apps.getByRole('button',{name:'Open Contacts'})).toBeVisible()
  13 |   await expect(page.getByRole('button',{name:'Open The Archive'})).toHaveCount(0)
  14 |   const before=await apps.locator('button').allTextContents()
  15 |   await page.clock.runFor(20_000)
  16 |   await expect(apps.locator('button')).toHaveText(before)
  17 |   await page.getByRole('button',{name:'Open unknown message',exact:true}).click()
  18 |   await page.clock.runFor(120_000)
> 19 |   await expect(page.getByText('Chat received from a number not in your contacts.')).toBeVisible()
     |                                                                                     ^ Error: expect(locator).toBeVisible() failed
  20 |   await page.getByRole('button',{name:'CANCEL',exact:true}).click()
  21 |   await page.getByRole('button',{name:"Who's asking?",exact:true}).click()
  22 |   await page.getByRole('button',{name:'Send',exact:true}).click()
  23 |   await page.clock.runFor(120_000)
  24 |   await page.getByRole('button',{name:'Back to inbox'}).click()
  25 |   await page.getByRole('button',{name:'Back to home'}).click()
  26 |   await expect(apps.locator('button')).toHaveText(before)
  27 |   await page.getByRole('button',{name:'Exit game'}).click()
  28 |   await expect(page.getByRole('dialog',{name:'Exit game confirmation'})).toContainText('Are you sure you want to exit the game?')
  29 |   await page.getByRole('button',{name:'CANCEL',exact:true}).click()
  30 | })
  31 | 
  32 | test("Sophie's supplied dinner photo is an incoming image that opens full screen",async({page})=>{
  33 |   const at=Date.parse('2026-10-26T10:00:00+08:00')
  34 |   const base=beginScene01(newGame(),at)
  35 |   const scene=base.prologue!.scene01!
  36 |   const save={...base,prologue:{...base.prologue!,scene01:{...scene,nodeId:'OPEN-S02-FINAL-AFTER-07-7',queue:[{id:'OPEN-S02-FINAL-AFTER-07-7',dueAt:at+1000,typing:true}],invitation:'joined' as const,groupScript:'ch01_sc02_uninvited_guest' as const,groupMembers:{sophie:true,maya:true,lucas:true},groupPresence:{sophie:true,maya:true,lucas:true},introduced:true}}}
  37 |   await seedScene(page,save)
  38 |   await page.getByRole('button',{name:'Open Messages',exact:true}).first().click()
  39 |   await page.getByRole('button',{name:'Open FIND DANIEL group conversation'}).click()
  40 |   await page.clock.runFor(90_000)
  41 |   await expect(page.getByRole('button',{name:"Open Sophie's dinner photo"})).toBeVisible()
  42 |   await page.getByRole('button',{name:"Open Sophie's dinner photo"}).click()
  43 |   await expect(page.getByRole('dialog',{name:'Photo viewer'})).toBeVisible()
  44 |   await expect(page.getByRole('dialog',{name:'Photo viewer'}).locator('img')).toHaveAttribute('src','/sophie-dinner.png')
  45 | })
  46 | 
```