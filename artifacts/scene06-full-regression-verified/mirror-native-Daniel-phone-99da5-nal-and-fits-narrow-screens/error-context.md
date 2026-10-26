# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: mirror-native.spec.ts >> Daniel phone keeps investigation tools optional and fits narrow screens
- Location: tests\e2e\mirror-native.spec.ts:5:1

# Error details

```
Error: expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0

Call Log:
- Timeout 5000ms exceeded while waiting on the predicate
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
        - heading "IMG_0410 — North Quay" [level=3] [ref=e49]
        - generic [ref=e50]:
          - button "View Shelf photo" [ref=e52] [cursor=pointer]:
            - img "Shelf photo" [ref=e53]
          - button "View photos" [ref=e54] [cursor=pointer]
    - button "Daniel phone home" [ref=e55] [cursor=pointer]
  - dialog "Photo viewer" [ref=e57]:
    - banner [ref=e58]:
      - button "Back to album" [active] [ref=e59] [cursor=pointer]
      - strong [ref=e62]: Shelf photo
      - button "Photo info" [ref=e63] [cursor=pointer]
    - generic [ref=e66]:
      - heading "Shelf photo" [level=2] [ref=e67]
      - status [ref=e68]: Loading photo…
      - generic "Image pan area" [ref=e69]:
        - img "Document shelf; framing is incomplete."
      - generic "Image zoom" [ref=e70]:
        - button "Zoom out" [disabled] [ref=e71]
        - status "Zoom level" [ref=e73]: 100%
        - button "Zoom in" [disabled] [ref=e74]
        - button "Fit image" [ref=e76] [cursor=pointer]
    - contentinfo [ref=e77]:
      - button "Save to Case Board" [ref=e78] [cursor=pointer]
      - generic [ref=e81]: 1 of 1
      - button "Photo details" [ref=e82] [cursor=pointer]
```

# Test source

```ts
  1  | import { expect, test } from '@playwright/test'
  2  | import { completeOpening } from './opening-helper'
  3  | 
  4  | 
  5  | test('Daniel phone keeps investigation tools optional and fits narrow screens', async ({ page }) => {
  6  |   await page.setViewportSize({ width: 390, height: 844 })
  7  |   await page.goto('/?legacyopening=1')
  8  |   await page.getByRole('button', { name: "Open Sophie's new message" }).click()
  9  |   await page.getByLabel('Your name').fill('Rae')
  10 |   await page.getByRole('button', { name: 'Set up phone' }).click()
  11 |   await completeOpening(page)
  12 |   await page.getByRole('button', { name: 'Open The Archive', exact: true }).click()
  13 |   for (const width of [390, 320]) {
  14 |     await page.setViewportSize({ width, height: width === 320 ? 568 : 844 })
  15 |     await expect(page.locator('.mirror-on-home')).not.toContainText(/snapshot|recovered/i)
  16 |     await page.screenshot({ animations: 'disabled', path: test.info().outputPath(`home-${width}.png`) })
  17 |     await page.locator('.mirror-icon').filter({ hasText: 'Messages' }).click()
  18 |     await page.locator('.mirror-file').first().click()
  19 |     const conversation = page.getByLabel('iMessage conversation')
  20 |     await expect(conversation).toContainText('Did you eat the last of the biscuits?')
  21 |     await expect(conversation).not.toContainText(/snapshot|recovered|unverified|Source and metadata/i)
  22 |     await expect(page.getByRole('button', { name: 'Daniel phone home', exact: true })).toBeInViewport()
  23 |     await expect(page.getByRole('button', { name: 'Save to Case Board', exact: true })).toHaveCount(0)
  24 |     await page.screenshot({ animations: 'disabled', path: test.info().outputPath(`messages-${width}.png`) })
  25 |     await page.getByRole('button', { name: 'More options' }).click()
  26 |     await expect(page.getByRole('region', { name: 'Record options' })).toBeVisible()
  27 |     if (width === 390) await page.getByRole('button', { name: 'Save to Case Board', exact: true }).click()
  28 |     await expect(page.getByRole('button', { name: 'Saved to Case Board', exact: true })).toBeDisabled()
  29 |     await page.getByRole('button', { name: 'Close options' }).click()
  30 |     await page.getByRole('button', { name: 'Daniel phone home', exact: true }).click()
  31 |     for (const app of ['Notes', 'Photos']) {
  32 |       await page.locator('.mirror-icon').filter({ hasText: app }).click()
  33 |       if (app === 'Photos') await page.screenshot({ animations: 'disabled', path: test.info().outputPath(`albums-${width}.png`) })
  34 |       await page.locator('.mirror-file').first().click()
  35 |       if (app === 'Photos') {
  36 |         await page.getByRole('button', { name: 'View Shelf photo', exact: true }).click()
> 37 |         await expect.poll(() => page.getByRole('dialog').locator('img').evaluate(image => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0)
     |                                                                                                                                      ^ Error: expect(received).toBeGreaterThan(expected)
  38 |       }
  39 |       await page.screenshot({ animations: 'disabled', path: test.info().outputPath(`${app.toLowerCase()}-${width}.png`) })
  40 |       expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  41 |       if (app === 'Photos') await page.getByRole('button', { name: 'Back to album', exact: true }).click()
  42 |       await page.getByRole('button', { name: 'Daniel phone home', exact: true }).click()
  43 |     }
  44 |   }
  45 | })
  46 | 
```