# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: phone-polish.spec.ts >> phone lock, two home pages and app navigation at 390x844
- Location: tests\e2e\phone-polish.spec.ts:19:1

# Error details

```
Test timeout of 90000ms exceeded.
```

```
Error: locator.click: Test timeout of 90000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Open Bulletin', exact: true }).last()
    - locator resolved to <button aria-label="Open Bulletin">…</button>
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
- generic [ref=e4]:
  - generic "Greyhaven story time 8 October 2026 09:08" [ref=e5]: 9:08
  - main "Rae's home screen" [ref=e22]:
    - generic [ref=e23]:
      - generic [ref=e24]:
        - generic [ref=e25]: Rae's phone
        - button "Lock phone" [ref=e26] [cursor=pointer]
      - region "Home widgets" [ref=e31]:
        - button "Open photo widget" [ref=e32] [cursor=pointer]:
          - generic [ref=e33]:
            - generic [ref=e34]: GREYHAVEN
            - strong [ref=e35]: Along the water
        - button "Open calendar widget" [ref=e36] [cursor=pointer]:
          - strong [ref=e37]: OCTOBER
          - generic [aria-hidden] [ref=e38]:
            - generic [ref=e39]: S
            - generic [ref=e40]: M
            - generic [ref=e41]: T
            - generic [ref=e42]: W
            - generic [ref=e43]: T
            - generic [ref=e44]: F
            - generic [ref=e45]: S
            - generic [ref=e50]: "1"
            - generic [ref=e51]: "2"
            - generic [ref=e52]: "3"
            - generic [ref=e53]: "4"
            - generic [ref=e54]: "5"
            - generic [ref=e55]: "6"
            - generic [ref=e56]: "7"
            - generic [ref=e57]: "8"
            - generic [ref=e58]: "9"
            - generic [ref=e59]: "10"
            - generic [ref=e60]: "11"
            - generic [ref=e61]: "12"
            - generic [ref=e62]: "13"
            - generic [ref=e63]: "14"
            - generic [ref=e64]: "15"
            - generic [ref=e65]: "16"
            - generic [ref=e66]: "17"
            - generic [ref=e67]: "18"
            - generic [ref=e68]: "19"
            - generic [ref=e69]: "20"
            - generic [ref=e70]: "21"
            - generic [ref=e71]: "22"
            - generic [ref=e72]: "23"
            - generic [ref=e73]: "24"
            - generic [ref=e74]: "25"
            - generic [ref=e75]: "26"
            - generic [ref=e76]: "27"
            - generic [ref=e77]: "28"
            - generic [ref=e78]: "29"
            - generic [ref=e79]: "30"
            - generic [ref=e80]: "31"
      - region "Home page 1 apps" [ref=e81]:
        - button "Open The Archive" [ref=e82] [cursor=pointer]:
          - generic [ref=e87]: The Archive
        - button "Open Photos" [ref=e88] [cursor=pointer]:
          - generic [ref=e100]: Photos
        - button "Open Calendar" [ref=e101] [cursor=pointer]:
          - generic [ref=e103]:
            - generic [ref=e104]: THU
            - strong [ref=e105]: "8"
          - generic [ref=e106]: Calendar
        - button "Open Files" [ref=e107] [cursor=pointer]:
          - generic [ref=e112]: Files
        - button "Open Notes" [ref=e113] [cursor=pointer]:
          - generic [ref=e119]: Notes
        - button "Open Maps" [ref=e120] [cursor=pointer]:
          - generic [ref=e130]: Maps
        - button "Open Search" [ref=e131] [cursor=pointer]:
          - generic [ref=e146]: Search
        - button "Open Contacts" [ref=e147] [cursor=pointer]:
          - generic [ref=e156]: Contacts
      - button "Read Daniel Mercer brief" [ref=e157] [cursor=pointer]:
        - generic [ref=e158]: G
        - generic [ref=e159]:
          - generic [ref=e160]:
            - text: BULLETIN
            - time [ref=e161]: now
          - strong [ref=e162]: "New lead: Bus 4 record"
          - generic [ref=e163]: Compare the older public preview · Daniel last contacted 4 October
    - generic [ref=e166]:
      - generic "Home pages" [ref=e167]:
        - button "Show home page 1" [ref=e168] [cursor=pointer]
        - button "Show home page 2" [ref=e170] [cursor=pointer]
      - navigation "Quick apps" [ref=e172]:
        - button "Open Calls" [ref=e173] [cursor=pointer]
        - button "Open Messages" [ref=e177] [cursor=pointer]
        - button "Open Bulletin" [ref=e181] [cursor=pointer]:
          - generic [ref=e183]: G
  - navigation "Phone navigation" [ref=e187]:
    - button "Go home" [disabled] [ref=e188]
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
> 64 |   await page.getByRole('button', { name: 'Open Bulletin', exact: true }).last().click()
     |                                                                                 ^ Error: locator.click: Test timeout of 90000ms exceeded.
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
  79 |     await expect(page.getByRole('button', { name: 'Read Daniel Mercer brief' })).toBeInViewport({ ratio: 1 })
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