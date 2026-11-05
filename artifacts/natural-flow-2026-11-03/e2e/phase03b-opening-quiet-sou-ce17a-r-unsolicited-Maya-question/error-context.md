# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: phase03b-opening.spec.ts >> quiet source route reaches the public editor note without R02 or unsolicited Maya question
- Location: tests\e2e\phase03b-opening.spec.ts:33:1

# Error details

```
Error: expect(locator).toBeEnabled() failed

Locator: getByRole('button', { name: 'Continue to the exact row' })
Expected: enabled
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeEnabled" getByRole('button', { name: 'Continue to the exact row' }) with timeout 5000ms
  - waiting for getByRole('button', { name: 'Continue to the exact row' })
    5 × locator resolved to <button disabled class="choice">Continue to the exact row</button>
      - unexpected value "disabled"

```

```yaml
- text: 9:28 GREYHAVEN
- button "Main Menu"
- main "Phone lock screen":
  - paragraph: Thursday, 8 October
  - heading "9:28" [level=1]
  - paragraph: YOUR PHONE PRIVATE DEVICE
  - button "Unlock phone": Swipe up to open
- navigation "Phone navigation":
  - button "Go home"
```

# Test source

```ts
  1  | import { completeOpening } from './opening-helper'
  2  | import { mkdirSync } from 'node:fs'
  3  | import { expect, test, type Page } from '@playwright/test'
  4  | 
  5  | mkdirSync('qa/phase-03b',{ recursive: true })
  6  | 
  7  | async function reachEditor(page: Page) {
  8  |   await page.goto('/?legacyopening=1')
  9  |   await page.getByRole('button', { name: /Unlock phone/i }).click()
  10 |   await page.getByLabel('Your name').fill('Rae')
  11 |   await page.getByRole('button', { name: /Set up phone/i }).click()
  12 |   await completeOpening(page)
  13 |   await page.getByRole('button', { name: 'Open Bulletin' }).last().click()
  14 |   await page.getByRole('button', { name: 'Read public brief' }).click()
  15 |   await page.getByRole('button', { name: 'Read full brief' }).click()
  16 |   await page.getByRole('button', { name: 'Older preview' }).click()
  17 |   await page.getByRole('button', { name: 'Pin June row as an observation' }).click()
  18 |   await page.getByRole('button', { name: 'View current copy' }).click()
  19 |   await page.getByRole('button', { name: 'Compare copies' }).click()
  20 |   await page.getByRole('button', { name: 'Escort: June Ellis → blank' }).click()
  21 |   await page.getByRole('button', { name: "I don't know what happened." }).click()
  22 |   await page.getByRole('button', { name: 'Save lead to private Board' }).click()
  23 |   await page.getByRole('button', { name: 'Use an anonymous return token.' }).click()
  24 |   await page.getByRole('button', { name: 'Review recipient and privacy' }).click()
  25 |   await page.getByRole('button', { name: 'Send tip' }).click()
  26 |   await page.getByRole('button', { name: 'Open reply inbox' }).click()
  27 |   await page.getByRole('button', { name: 'Check public editor listing' }).click()
  28 |   await page.getByRole('button', { name: 'Case code and return route' }).click()
  29 |   await expect(page.getByRole('heading', { name: 'Channel checked' })).toBeVisible()
> 30 |   await expect(page.getByRole('button', { name: 'Continue to the exact row' })).toBeEnabled()
     |                                                                                 ^ Error: expect(locator).toBeEnabled() failed
  31 | }
  32 | 
  33 | test('quiet source route reaches the public editor note without R02 or unsolicited Maya question', async ({ page }) => {
  34 |   await page.setViewportSize({ width: 390, height: 844 })
  35 |   await reachEditor(page)
  36 |   await page.getByRole('button', { name: 'Continue to the exact row' }).click()
  37 |   await expect(page.getByRole('button', { name: 'Ask Maya' })).toBeVisible()
  38 |   await expect(page.getByText("Was the blank field on the portal page itself, or in another screenshot?")).toHaveCount(0)
  39 |   await page.getByRole('button', { name: 'Continue public source' }).click()
  40 |   await expect(page.getByText("Could you send me what you're reading?", { exact: false })).toHaveCount(0)
  41 |   await page.getByRole('button', { name: 'Not now. No image or text sent.' }).click()
  42 |   await page.getByRole('button', { name: 'Continue without sharing' }).click()
  43 |   await expect(page.getByText('Maya received no new message or attachment.')).toBeVisible()
  44 |   await page.getByRole('button', { name: 'Open editor note' }).click()
  45 |   await expect(page.getByText('Editor note, 7 Oct:', { exact: false })).toBeVisible()
  46 |   await expect(page.getByText('A transfer record can support that Maya received this crop.', { exact: false })).toBeVisible()
  47 |   await expect(page.getByText("He sent it on the third with a short note:", { exact: false })).toHaveCount(0)
  48 |   const state = await page.evaluate(async () => {
  49 |     const db = await new Promise<IDBDatabase>((resolve,reject) => { const req = indexedDB.open('the-archive-reboot',1); req.onsuccess = () => resolve(req.result); req.onerror = () => reject(req.error) })
  50 |     const result = await new Promise<{ scene: string; r02: number; mayaKnows: boolean }>((resolve,reject) => { const req = db.transaction('saves').objectStore('saves').get('primary'); req.onsuccess = () => resolve({ scene: req.result.e01.sceneId, r02: req.result.deliveredEvents.filter((id: string) => id === 'R02').length, mayaKnows: req.result.knowledge.characters.maya.includes('R02.public-escort-row') }); req.onerror = () => reject(req.error) })
  51 |     db.close(); return result
  52 |   })
  53 |   expect(state).toEqual({ scene: 'E01-S15', r02: 0, mayaKnows: false })
  54 |   await page.screenshot({ path: 'qa/phase-03b/editor-note-quiet-390x844.png', animations: 'disabled', scale: 'css' })
  55 | })
  56 | 
  57 | test('explicit text-only R02 and sender scope survive reload', async ({ page }) => {
  58 |   await page.setViewportSize({ width: 390, height: 844 })
  59 |   await reachEditor(page)
  60 |   await page.getByRole('button', { name: 'Continue to the exact row' }).click()
  61 |   await page.getByRole('button', { name: 'Ask Maya' }).click()
  62 |   await expect(page.getByText('Was the blank field on the portal page itself, or in another screenshot?')).toBeVisible()
  63 |   await page.getByRole('button', { name: 'On the civic portal page. I opened the link from your brief.' }).click()
  64 |   await expect(page.getByText('You · sent')).toHaveCount(0)
  65 |   await page.getByRole('button', { name: /^Send$/ }).click()
  66 |   await expect(page.getByText('You · sent')).toHaveCount(1)
  67 |   await page.getByRole('button', { name: 'Continue public source' }).click()
  68 |   await expect(page.getByText("Could you send me what you're reading?", { exact: false })).toBeVisible()
  69 |   await page.getByRole('button', { name: /^Text only: the older preview/ }).click()
  70 |   await expect(page.getByText('R02 · text only')).toHaveCount(0)
  71 |   await page.getByRole('button', { name: /^Send$/ }).click()
  72 |   await expect(page.getByText('R02 · text only')).toBeVisible()
  73 |   await page.reload()
  74 |   await page.getByRole('button', { name: /Unlock phone/i }).click()
  75 |   await page.getByRole('button', { name: 'Open Bulletin' }).last().click()
  76 |   await expect(page.getByText('R02 · text only')).toBeVisible()
  77 |   const scope = await page.evaluate(async () => {
  78 |     const db = await new Promise<IDBDatabase>((resolve,reject) => { const req = indexedDB.open('the-archive-reboot',1); req.onsuccess = () => resolve(req.result); req.onerror = () => reject(req.error) })
  79 |     const result = await new Promise<{ receipts: number; attachment: unknown; mayaKnows: string[] }>((resolve,reject) => { const req = db.transaction('saves').objectStore('saves').get('primary'); req.onsuccess = () => resolve({ receipts: req.result.deliveredEvents.filter((id: string) => id === 'R02').length, attachment: req.result.messages.find((m: {id:string}) => m.id === 'player.C02-SHARE.B').attachmentIds, mayaKnows: req.result.knowledge.characters.maya }); req.onerror = () => reject(req.error) })
  80 |     db.close(); return result
  81 |   })
  82 |   expect(scope.receipts).toBe(1)
  83 |   expect(scope.attachment).toBeUndefined()
  84 |   expect(scope.mayaKnows).toContain('R02.public-escort-row')
  85 |   expect(scope.mayaKnows).not.toContain('K02')
  86 | })
  87 | 
```