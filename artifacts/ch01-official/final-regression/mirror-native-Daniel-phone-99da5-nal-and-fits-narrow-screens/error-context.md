# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: mirror-native.spec.ts >> Daniel phone keeps investigation tools optional and fits narrow screens
- Location: tests\e2e\mirror-native.spec.ts:7:1

# Error details

```
Error: UNKNOWN: unknown error, open 'D:\Web app\TheArchive\qa\iphone-redesign\messages-320.png'
```

# Page snapshot

```yaml
- generic [ref=e4]:
  - generic "Greyhaven story time 8 October 2026 09:00" [ref=e5]: 9:00
  - generic "Daniel Mercer's phone" [ref=e23]:
    - generic [ref=e24]:
      - button "My phone" [ref=e25] [cursor=pointer]
      - generic [ref=e28]: Daniel’s iPhone
    - generic [ref=e29]:
      - generic [ref=e30]:
        - button "Back" [ref=e31] [cursor=pointer]
        - button "Daniel's Phone" [ref=e34] [cursor=pointer]
        - generic [ref=e38]:
          - button "Evidence" [ref=e39] [cursor=pointer]
          - button "More options" [ref=e43] [cursor=pointer]
      - article [ref=e48]:
        - generic "iMessage conversation" [ref=e49]:
          - strong [ref=e52]: Sophie Mercer
          - paragraph [ref=e55]: 2 Oct
          - generic [ref=e56]:
            - generic [ref=e57]: "Sophie:"
            - generic [ref=e58]: Did you eat the last of the biscuits?
          - generic [ref=e59]:
            - generic [ref=e60]: "Daniel:"
            - generic [ref=e61]: I plead the fifth.
          - generic [ref=e62]:
            - generic [ref=e63]: "Sophie:"
            - generic [ref=e64]: Buy more on your way back.
    - button "Daniel phone home" [ref=e65] [cursor=pointer]
```

# Test source

```ts
  1  | import { mkdirSync } from 'node:fs'
  2  | import { expect, test } from '@playwright/test'
  3  | import { completeOpening } from './opening-helper'
  4  | 
  5  | mkdirSync('qa/iphone-redesign', { recursive: true })
  6  | 
  7  | test('Daniel phone keeps investigation tools optional and fits narrow screens', async ({ page }) => {
  8  |   await page.setViewportSize({ width: 390, height: 844 })
  9  |   await page.goto('/?legacyopening=1')
  10 |   await page.getByRole('button', { name: "Open Sophie's new message" }).click()
  11 |   await page.getByLabel('Your name').fill('Rae')
  12 |   await page.getByRole('button', { name: 'Set up phone' }).click()
  13 |   await completeOpening(page)
  14 |   await page.getByRole('button', { name: 'Open The Archive', exact: true }).click()
  15 |   for (const width of [390, 320]) {
  16 |     await page.setViewportSize({ width, height: width === 320 ? 568 : 844 })
  17 |     await expect(page.locator('.mirror-on-home')).not.toContainText(/snapshot|recovered/i)
  18 |     await page.screenshot({ animations: 'disabled', path: `qa/iphone-redesign/home-${width}.png` })
  19 |     await page.locator('.mirror-icon').filter({ hasText: 'Messages' }).click()
  20 |     await page.locator('.mirror-file').first().click()
  21 |     const conversation = page.getByLabel('iMessage conversation')
  22 |     await expect(conversation).toContainText('Did you eat the last of the biscuits?')
  23 |     await expect(conversation).not.toContainText(/snapshot|recovered|unverified|Source and metadata/i)
  24 |     await expect(page.getByRole('button', { name: 'Daniel phone home', exact: true })).toBeInViewport()
  25 |     await expect(page.getByRole('button', { name: 'Save to Case Board', exact: true })).toHaveCount(0)
> 26 |     await page.screenshot({ animations: 'disabled', path: `qa/iphone-redesign/messages-${width}.png` })
     |     ^ Error: UNKNOWN: unknown error, open 'D:\Web app\TheArchive\qa\iphone-redesign\messages-320.png'
  27 |     await page.getByRole('button', { name: 'More options' }).click()
  28 |     await expect(page.getByRole('region', { name: 'Record options' })).toBeVisible()
  29 |     if (width === 390) await page.getByRole('button', { name: 'Save to Case Board', exact: true }).click()
  30 |     await expect(page.getByRole('button', { name: 'Saved to Case Board', exact: true })).toBeDisabled()
  31 |     await page.getByRole('button', { name: 'Close options' }).click()
  32 |     await page.getByRole('button', { name: 'Daniel phone home', exact: true }).click()
  33 |     for (const app of ['Notes', 'Photos']) {
  34 |       await page.locator('.mirror-icon').filter({ hasText: app }).click()
  35 |       if (app === 'Photos') await page.screenshot({ animations: 'disabled', path: `qa/iphone-redesign/albums-${width}.png` })
  36 |       await page.locator('.mirror-file').first().click()
  37 |       if (app === 'Photos') {
  38 |         await page.getByRole('button', { name: 'View Shelf photo', exact: true }).click()
  39 |         await expect.poll(() => page.getByRole('dialog').locator('img').evaluate(image => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0)
  40 |       }
  41 |       await page.screenshot({ animations: 'disabled', path: `qa/iphone-redesign/${app.toLowerCase()}-${width}.png` })
  42 |       expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  43 |       if (app === 'Photos') await page.getByRole('button', { name: 'Back to album', exact: true }).click()
  44 |       await page.getByRole('button', { name: 'Daniel phone home', exact: true }).click()
  45 |     }
  46 |   }
  47 | })
  48 | 
```