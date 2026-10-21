# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: foundation.spec.ts >> narrow phone layout and message history indicator
- Location: tests\e2e\foundation.spec.ts:40:1

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: /Enter the archive/i })

```

# Page snapshot

```yaml
- generic [ref=f1e4]:
  - heading "Save needs attention" [level=1] [ref=f1e5]
  - paragraph [ref=f1e6]: Invalid recovered source receipts
  - paragraph [ref=f1e7]: Your stored progress has not been overwritten. Download a copy before choosing to reload; any unsaved changes in this tab may be lost.
  - button "Download local backup" [ref=f1e8] [cursor=pointer]
  - button "Reload stored save" [ref=f1e12] [cursor=pointer]
```

# Test source

```ts
  1  | import { completeOpening } from './opening-helper'
  2  | import { expect, test } from '@playwright/test'
  3  | 
  4  | test('mobile setup, explicit send, refresh, search and map', async ({ page }) => {
  5  |   await page.goto('/')
  6  |   await page.getByRole('button', { name: /Enter the archive/i }).click()
  7  |   await page.getByLabel('Your name').fill('Rae')
  8  |   await page.getByRole('button', { name: /Set up phone/i }).click()
  9  |   await completeOpening(page)
  10 |   await expect(page.getByRole('main', { name: "Rae's home screen" })).toBeVisible()
  11 |   await page.getByRole('button', { name: 'Open Messages' }).first().click()
  12 |   await page.getByRole('button', { name: 'Open Test channel conversation' }).click()
  13 |   await expect(page.getByText('Hello, Rae. This is a development conversation.')).toBeVisible()
  14 |   await expect(page.getByText('I am checking that messages arrive in order.')).toBeVisible()
  15 |   await expect(page.locator('.bubble.player')).toHaveCount(0)
  16 |   await page.getByRole('button', { name: 'I can read you clearly.' }).click()
  17 |   await expect(page.locator('.bubble.player')).toHaveCount(0)
  18 |   await page.getByRole('button', { name: /^Send$/ }).click()
  19 |   await expect(page.locator('.bubble.player')).toHaveCount(1)
  20 |   await expect(page.getByText('The test is complete. Your conversation will be here when you return.')).toBeVisible()
  21 |   await expect(page.locator('.bubble.player small')).toContainText('read')
  22 |   await page.reload()
  23 |   await page.getByRole('button', { name: /Enter the archive/i }).click()
  24 |   await page.getByRole('button', { name: 'Open Messages' }).first().click()
  25 |   await page.getByRole('button', { name: 'Open Test channel conversation' }).click()
  26 |   await expect(page.locator('.bubble.player')).toHaveCount(1)
  27 |   await expect(page.locator('.bubble.fixture')).toHaveCount(4)
  28 |   await page.getByRole('button', { name: 'Back to inbox' }).click()
  29 |   await page.getByRole('button', { name: 'Back to home' }).click()
  30 |   await page.getByRole('button', { name: 'Open Search' }).click()
  31 |   await page.getByLabel('Search Greyhaven').fill('library')
  32 |   await expect(page.getByText('Library local history desk')).toBeVisible()
  33 |   await page.getByRole('button', { name: 'Back to home' }).click()
  34 |   await page.getByRole('button', { name: 'Open Maps' }).click()
  35 |   await page.getByRole('button', { name: 'Show North Station' }).click()
  36 |   await expect(page.getByRole('heading', { name: 'North Station' })).toBeVisible()
  37 |   expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true)
  38 | })
  39 | 
  40 | test('narrow phone layout and message history indicator', async ({ page }) => {
  41 |   await page.setViewportSize({ width: 320, height: 568 })
  42 |   await page.goto('/')
  43 |   await page.getByRole('button', { name: /Enter the archive/i }).click()
  44 |   await page.getByLabel('Your name').fill('Alex')
  45 |   await page.getByRole('button', { name: /Set up phone/i }).click()
  46 |   await completeOpening(page)
  47 |   await page.screenshot({ path: 'test-results/home-320.png' })
  48 |   expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true)
  49 |   await page.evaluate(async () => {
  50 |     const db = await new Promise<IDBDatabase>((resolve, reject) => {
  51 |       const request = indexedDB.open('the-archive-reboot', 1)
  52 |       request.onsuccess = () => resolve(request.result)
  53 |       request.onerror = () => reject(request.error)
  54 |     })
  55 |     await new Promise<void>((resolve, reject) => {
  56 |       const tx = db.transaction('saves', 'readwrite')
  57 |       const request = tx.objectStore('saves').get('primary')
  58 |       request.onsuccess = () => {
  59 |         const save = request.result
  60 |         save.deliveredEvents = ['fixture.hello', 'fixture.check']
  61 |         save.pendingEvents = [{ id: 'fixture.reply', dueAt: Date.now() + 4000 }]
  62 |         save.messages = Array.from({ length: 24 }, (_, i) => ({ id: `history.${i}`, sender: 'fixture', text: `Earlier test message ${i + 1}`, at: Date.now() - (24 - i) * 1000, delivery: 'read' }))
  63 |         tx.objectStore('saves').put(save, 'primary')
  64 |       }
  65 |       tx.oncomplete = () => resolve()
  66 |       tx.onerror = () => reject(tx.error)
  67 |     })
  68 |     db.close()
  69 |   })
  70 |   await page.reload()
> 71 |   await page.getByRole('button', { name: /Enter the archive/i }).click()
     |                                                                  ^ Error: locator.click: Test timeout of 60000ms exceeded.
  72 |   await page.getByRole('button', { name: 'Open Messages' }).first().click()
  73 |   await page.getByRole('button', { name: 'Open Test channel conversation' }).click()
  74 |   await page.locator('.chat-scroll').evaluate(el => { el.scrollTop = 0; el.dispatchEvent(new Event('scroll', { bubbles: true })) })
  75 |   const oldPosition = await page.locator('.chat-scroll').evaluate(el => el.scrollTop)
  76 |   await expect(page.getByRole('button', { name: /new message/ })).toBeVisible()
  77 |   expect(await page.locator('.chat-scroll').evaluate(el => el.scrollTop)).toBe(oldPosition)
  78 |   await page.getByRole('button', { name: /new message/ }).click()
  79 |   await expect.poll(() => page.locator('.chat-scroll').evaluate(el => el.scrollHeight - el.scrollTop - el.clientHeight)).toBeLessThan(4)
  80 |   await page.screenshot({ path: 'test-results/chat-320.png' })
  81 |   expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true)
  82 | })
  83 | 
```