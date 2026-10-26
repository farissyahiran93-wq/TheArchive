# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: phone-polish.spec.ts >> phone presentation remains usable at 320x568
- Location: tests\e2e\phone-polish.spec.ts:71:3

# Error details

```
Error: expect(locator).toBeInViewport() failed

Locator:  getByRole('button', { name: 'Read Daniel Mercer brief' })
Expected: in viewport
Received: viewport ratio 0.0625
Timeout:  5000ms

Call log:
  - Expect "toBeInViewport" getByRole('button', { name: 'Read Daniel Mercer brief' }) with timeout 5000ms
  - waiting for getByRole('button', { name: 'Read Daniel Mercer brief' })
    - locator resolved to <button class="story-home-alert" aria-label="Read Daniel Mercer brief">…</button>
    - unexpected value "viewport ratio 0.06249988079071045"
    - locator resolved to <button class="story-home-alert" aria-label="Read Daniel Mercer brief">…</button>
    - unexpected value "viewport ratio 0.0625002384185791"
    - locator resolved to <button class="story-home-alert" aria-label="Read Daniel Mercer brief">…</button>
    - unexpected value "viewport ratio 0.06249997392296791"
    10 × locator resolved to <button class="story-home-alert" aria-label="Read Daniel Mercer brief">…</button>
       - unexpected value "viewport ratio 0.0625"

```

```yaml
- button "Read Daniel Mercer brief":
  - text: G BULLETIN
  - time: now
  - strong: "New lead: Bus 4 record"
  - text: Compare the older public preview · Daniel last contacted 4 October
```

# Test source

```ts
  1  | import { completeOpening } from './opening-helper'
  2  | import { expect, test, type Page } from '@playwright/test'
  3  | 
  4  | 
  5  | async function expectContained(page: Page) {
  6  |   expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true)
  7  |   const device = page.locator('.device')
  8  |   expect(await device.evaluate(element => element.scrollWidth <= element.clientWidth + 1)).toBe(true)
  9  | }
  10 | 
  11 | async function setUpPhone(page: Page, name = 'Rae') {
  12 |   await page.getByRole('button', { name: /Enter the archive/i }).click()
  13 |   await page.getByLabel('Your name').fill(name)
  14 |   await page.getByRole('button', { name: /Set up phone/i }).click()
  15 |   await completeOpening(page)
  16 |   await expect(page.getByRole('main', { name: `${name}'s home screen` })).toBeVisible()
  17 | }
  18 | 
  19 | test('phone lock, two home pages and app navigation at 390x844', async ({ page }) => {
  20 |   await page.setViewportSize({ width: 390, height: 844 })
  21 |   await page.goto('/?legacyopening=1')
  22 |   await expect(page.getByRole('button', { name: /Enter the archive/i })).toBeVisible()
  23 |   await expectContained(page)
  24 |   await page.screenshot({ animations: 'disabled', scale: 'css', path: test.info().outputPath(`lock-390x844.png`) })
  25 |   await setUpPhone(page)
  26 |   await expectContained(page)
  27 |   const calendarFits = await page.locator('.month-widget').evaluate(element => {
  28 |     const last = element.querySelector('.widget-month span:last-child')!
  29 |     return last.getBoundingClientRect().bottom <= element.getBoundingClientRect().bottom - 8
  30 |   })
  31 |   expect(calendarFits).toBe(true)
  32 |   await page.screenshot({ animations: 'disabled', scale: 'css', path: test.info().outputPath(`home-390x844.png`) })
  33 |   await page.getByRole('button', { name: 'Show home page 2' }).click()
  34 |   await expect(page.getByRole('button', { name: 'Open Settings' })).toBeVisible()
  35 |   await expectContained(page)
  36 |   await page.screenshot({ animations: 'disabled', scale: 'css', path: test.info().outputPath(`home-page2-390x844.png`) })
  37 | 
  38 |   for (const label of ['Settings', 'Calls', 'Bulletin']) {
  39 |     await page.getByRole('button', { name: `Open ${label}`, exact: true }).last().click()
  40 |     await expectContained(page)
  41 |     await page.getByRole('button', { name: 'Go home', exact: true }).click()
  42 |     await expect(page.getByRole('main', { name: "Rae's home screen" })).toBeVisible()
  43 |     await page.getByRole('button', { name: 'Show home page 2' }).click()
  44 |   }
  45 |   await page.getByRole('button', { name: 'Show home page 1' }).click()
  46 |   await page.getByRole('button', { name: 'Open Search', exact: true }).click()
  47 |   await page.getByLabel('Search Greyhaven').fill('library')
  48 |   await expect(page.getByText('Library local history desk')).toBeVisible()
  49 |   await expectContained(page)
  50 |   await page.getByRole('button', { name: 'Go home', exact: true }).click()
  51 | 
  52 |   await page.getByRole('button', { name: 'Open Bulletin', exact: true }).last().click()
  53 |   await page.getByRole('button', { name: 'Read public brief' }).click()
  54 |   await page.getByRole('button', { name: 'Read full brief' }).click()
  55 |   await page.getByRole('button', { name: 'Older preview' }).click()
  56 |   await page.getByRole('button', { name: 'Pin June row as an observation' }).click()
  57 |   await expect(page.getByRole('button', { name: 'View current copy' })).toBeEnabled()
  58 |   await page.getByRole('button', { name: 'Go home', exact: true }).click()
  59 |   await page.getByRole('button', { name: 'Lock phone', exact: true }).click()
  60 |   await expect(page.getByRole('button', { name: /Enter the archive/i })).toBeVisible()
  61 |   await page.getByRole('button', { name: /Enter the archive/i }).click()
  62 |   await expect(page.getByRole('main', { name: "Rae's home screen" })).toBeVisible()
  63 |   await expect(page.getByLabel('Your name')).toHaveCount(0)
  64 |   await page.getByRole('button', { name: 'Open Bulletin', exact: true }).last().click()
  65 |   await expect(page.getByRole('button', { name: 'June row pinned as preview observation' })).toBeVisible()
  66 |   await expect(page.getByRole('button', { name: 'View current copy' })).toBeEnabled()
  67 |   await expectContained(page)
  68 | })
  69 | 
  70 | for (const [width, height] of [[320, 568], [1280, 900]] as const) {
  71 |   test(`phone presentation remains usable at ${width}x${height}`, async ({ page }) => {
  72 |     await page.setViewportSize({ width, height })
  73 |     await page.goto('/?devtools=1&legacyopening=1')
  74 |     await expect(page.getByRole('button', { name: /Enter the archive/i })).toBeVisible()
  75 |     await expectContained(page)
  76 |     await page.screenshot({ animations: 'disabled', scale: 'css', path: test.info().outputPath(`lock-${width}x${height}.png`) })
  77 |     await setUpPhone(page, 'Sam')
  78 |     await expect(page.getByRole('button', { name: 'Open Messages', exact: true }).first()).toBeVisible()
> 79 |     await expect(page.getByRole('button', { name: 'Read Daniel Mercer brief' })).toBeInViewport({ ratio: 1 })
     |                                                                                  ^ Error: expect(locator).toBeInViewport() failed
  80 |     await expectContained(page)
  81 |     await page.screenshot({ animations: 'disabled', scale: 'css', path: test.info().outputPath(`home-${width}x${height}.png`) })
  82 |     await page.getByRole('button', { name: 'Open Messages', exact: true }).first().click()
  83 |     await page.getByRole('button', { name: 'Open Test channel conversation' }).click()
  84 |     await expect(page.getByText('Hello, Sam. This is a development conversation.')).toBeVisible()
  85 |     await expectContained(page)
  86 |     await page.screenshot({ animations: 'disabled', scale: 'css', path: test.info().outputPath(`messages-${width}x${height}.png`) })
  87 |     await page.getByRole('button', { name: 'Go home', exact: true }).click()
  88 |     await expect(page.getByRole('main', { name: "Sam's home screen" })).toBeVisible()
  89 |   })
  90 | }
  91 | 
  92 | 
```