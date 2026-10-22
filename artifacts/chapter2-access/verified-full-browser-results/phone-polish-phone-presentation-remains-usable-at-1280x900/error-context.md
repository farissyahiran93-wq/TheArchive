# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: phone-polish.spec.ts >> phone presentation remains usable at 1280x900
- Location: tests\e2e\phone-polish.spec.ts:74:3

# Error details

```
Error: UNKNOWN: unknown error, open 'D:\Web app\TheArchive\qa\ui-02\messages-1280x900.png'
```

# Page snapshot

```yaml
- generic [ref=e4]:
  - generic "Greyhaven story time 8 October 2026 09:00" [ref=e5]: 9:00
  - region "Test channel conversation" [ref=e22]:
    - generic [ref=e23]:
      - button "Back to inbox" [ref=e24] [cursor=pointer]:
        - generic [ref=e27]: Messages
      - generic [ref=e28]:
        - generic [aria-hidden] [ref=e29]: T
        - generic [ref=e30]:
          - strong [ref=e31]: Test channel
          - generic [ref=e32]: Local development fixture
    - generic [ref=e34]:
      - generic [ref=e35]: This is a non-canonical test conversation. It contains no case facts.
      - generic [ref=e36]:
        - generic [ref=e37]: Thu, Oct 22
        - generic [ref=e38]:
          - generic [aria-hidden] [ref=e39]: T
          - generic [ref=e40]:
            - paragraph [ref=e41]: Hello, Sam. This is a development conversation.
            - time [ref=e43]: 12:10 PM
      - status "Test channel is typing" [ref=e44]:
        - generic [ref=e45]: T
    - generic [ref=e51]: Waiting for a reply…
  - navigation "Phone navigation" [ref=e57]:
    - button "Go home" [ref=e58] [cursor=pointer]
```

# Test source

```ts
  1  | import { completeOpening } from './opening-helper'
  2  | import { mkdirSync } from 'node:fs'
  3  | import { expect, test, type Page } from '@playwright/test'
  4  | 
  5  | const evidence = 'qa/ui-02'
  6  | mkdirSync(evidence, { recursive: true })
  7  | 
  8  | async function expectContained(page: Page) {
  9  |   expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true)
  10 |   const device = page.locator('.device')
  11 |   expect(await device.evaluate(element => element.scrollWidth <= element.clientWidth + 1)).toBe(true)
  12 | }
  13 | 
  14 | async function setUpPhone(page: Page, name = 'Rae') {
  15 |   await page.getByRole('button', { name: /Enter the archive/i }).click()
  16 |   await page.getByLabel('Your name').fill(name)
  17 |   await page.getByRole('button', { name: /Set up phone/i }).click()
  18 |   await completeOpening(page)
  19 |   await expect(page.getByRole('main', { name: `${name}'s home screen` })).toBeVisible()
  20 | }
  21 | 
  22 | test('phone lock, two home pages and app navigation at 390x844', async ({ page }) => {
  23 |   await page.setViewportSize({ width: 390, height: 844 })
  24 |   await page.goto('/?legacyopening=1')
  25 |   await expect(page.getByRole('button', { name: /Enter the archive/i })).toBeVisible()
  26 |   await expectContained(page)
  27 |   await page.screenshot({ animations: 'disabled', scale: 'css', path: `${evidence}/lock-390x844.png` })
  28 |   await setUpPhone(page)
  29 |   await expectContained(page)
  30 |   const calendarFits = await page.locator('.month-widget').evaluate(element => {
  31 |     const last = element.querySelector('.widget-month span:last-child')!
  32 |     return last.getBoundingClientRect().bottom <= element.getBoundingClientRect().bottom - 8
  33 |   })
  34 |   expect(calendarFits).toBe(true)
  35 |   await page.screenshot({ animations: 'disabled', scale: 'css', path: `${evidence}/home-390x844.png` })
  36 |   await page.getByRole('button', { name: 'Show home page 2' }).click()
  37 |   await expect(page.getByRole('button', { name: 'Open Settings' })).toBeVisible()
  38 |   await expectContained(page)
  39 |   await page.screenshot({ animations: 'disabled', scale: 'css', path: `${evidence}/home-page2-390x844.png` })
  40 | 
  41 |   for (const label of ['Settings', 'Calls', 'Bulletin']) {
  42 |     await page.getByRole('button', { name: `Open ${label}`, exact: true }).last().click()
  43 |     await expectContained(page)
  44 |     await page.getByRole('button', { name: 'Go home', exact: true }).click()
  45 |     await expect(page.getByRole('main', { name: "Rae's home screen" })).toBeVisible()
  46 |     await page.getByRole('button', { name: 'Show home page 2' }).click()
  47 |   }
  48 |   await page.getByRole('button', { name: 'Show home page 1' }).click()
  49 |   await page.getByRole('button', { name: 'Open Search', exact: true }).click()
  50 |   await page.getByLabel('Search Greyhaven').fill('library')
  51 |   await expect(page.getByText('Library local history desk')).toBeVisible()
  52 |   await expectContained(page)
  53 |   await page.getByRole('button', { name: 'Go home', exact: true }).click()
  54 | 
  55 |   await page.getByRole('button', { name: 'Open Bulletin', exact: true }).last().click()
  56 |   await page.getByRole('button', { name: 'Read public brief' }).click()
  57 |   await page.getByRole('button', { name: 'Read full brief' }).click()
  58 |   await page.getByRole('button', { name: 'Older preview' }).click()
  59 |   await page.getByRole('button', { name: 'Pin June row as an observation' }).click()
  60 |   await expect(page.getByRole('button', { name: 'View current copy' })).toBeEnabled()
  61 |   await page.getByRole('button', { name: 'Go home', exact: true }).click()
  62 |   await page.getByRole('button', { name: 'Lock phone', exact: true }).click()
  63 |   await expect(page.getByRole('button', { name: /Enter the archive/i })).toBeVisible()
  64 |   await page.getByRole('button', { name: /Enter the archive/i }).click()
  65 |   await expect(page.getByRole('main', { name: "Rae's home screen" })).toBeVisible()
  66 |   await expect(page.getByLabel('Your name')).toHaveCount(0)
  67 |   await page.getByRole('button', { name: 'Open Bulletin', exact: true }).last().click()
  68 |   await expect(page.getByRole('button', { name: 'June row pinned as preview observation' })).toBeVisible()
  69 |   await expect(page.getByRole('button', { name: 'View current copy' })).toBeEnabled()
  70 |   await expectContained(page)
  71 | })
  72 | 
  73 | for (const [width, height] of [[320, 568], [1280, 900]] as const) {
  74 |   test(`phone presentation remains usable at ${width}x${height}`, async ({ page }) => {
  75 |     await page.setViewportSize({ width, height })
  76 |     await page.goto('/?devtools=1&legacyopening=1')
  77 |     await expect(page.getByRole('button', { name: /Enter the archive/i })).toBeVisible()
  78 |     await expectContained(page)
  79 |     await page.screenshot({ animations: 'disabled', scale: 'css', path: `${evidence}/lock-${width}x${height}.png` })
  80 |     await setUpPhone(page, 'Sam')
  81 |     await expect(page.getByRole('button', { name: 'Open Messages', exact: true }).first()).toBeVisible()
  82 |     await expect(page.getByRole('button', { name: 'Read Daniel Mercer brief' })).toBeInViewport({ ratio: 1 })
  83 |     await expectContained(page)
  84 |     await page.screenshot({ animations: 'disabled', scale: 'css', path: `${evidence}/home-${width}x${height}.png` })
  85 |     await page.getByRole('button', { name: 'Open Messages', exact: true }).first().click()
  86 |     await page.getByRole('button', { name: 'Open Test channel conversation' }).click()
  87 |     await expect(page.getByText('Hello, Sam. This is a development conversation.')).toBeVisible()
  88 |     await expectContained(page)
> 89 |     await page.screenshot({ animations: 'disabled', scale: 'css', path: `${evidence}/messages-${width}x${height}.png` })
     |     ^ Error: UNKNOWN: unknown error, open 'D:\Web app\TheArchive\qa\ui-02\messages-1280x900.png'
  90 |     await page.getByRole('button', { name: 'Go home', exact: true }).click()
  91 |     await expect(page.getByRole('main', { name: "Sam's home screen" })).toBeVisible()
  92 |   })
  93 | }
  94 | 
  95 | 
```