# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: progressive-recovery.spec.ts >> partial snapshot distinguishes readable fragments, passwords and unavailable keys
- Location: tests\e2e\progressive-recovery.spec.ts:4:1

# Error details

```
Error: UNKNOWN: unknown error, open 'D:\Web app\TheArchive\qa\phase-06f-public-comparison.png'
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
        - heading "Locked Note — public comparison" [level=3] [ref=e49]
        - paragraph [ref=e51]: "Bus 4: open the older public preview and the current public record. Compare their visible Escort fields yourself. Do not assume this discrepancy and the recovered 14/13 mismatch have the same cause. Ask Maya for the original chain of custody. — D."
    - button "Daniel phone home" [ref=e52] [cursor=pointer]
```

# Test source

```ts
  1  | import { expect, test } from '@playwright/test'
  2  | import { completeOpening } from './opening-helper'
  3  | 
  4  | test('partial snapshot distinguishes readable fragments, passwords and unavailable keys', async ({ page }) => {
  5  |   await page.goto('/?legacyopening=1')
  6  |   await page.getByRole('button', { name: "Open Sophie's new message" }).click()
  7  |   await page.getByLabel('Your name').fill('Rae')
  8  |   await page.getByRole('button', { name: 'Set up phone' }).click()
  9  |   await completeOpening(page)
  10 |   await page.getByRole('button', { name: 'Open The Archive', exact: true }).click()
  11 |   await page.getByRole('button', { name: 'Settings', exact: true }).click()
  12 |   await expect(page.getByText('Partial', { exact: true })).toBeVisible()
  13 |   await expect(page.getByText('Unverified', { exact: true })).toBeVisible()
  14 |   await page.getByRole('button', { name: "Daniel's Phone", exact: true }).click()
  15 |   await page.locator('.mirror-icon').filter({ hasText: 'Maps' }).click()
  16 |   await page.getByRole('button', { name: 'Route preview · unavailable', exact: true }).click()
  17 |   await expect(page.getByText(/A route cache exists/)).toBeVisible()
  18 |   await expect(page.getByLabel('Password', { exact: true })).toHaveCount(0)
  19 |   await page.getByRole('button', { name: "Daniel's Phone", exact: true }).click()
  20 |   await page.locator('.mirror-icon').filter({ hasText: 'Files' }).click()
  21 |   await page.getByRole('button', { name: 'protected/container.enc', exact: true }).click()
  22 |   await expect(page.getByText(/The key and original contents were not recovered/)).toBeVisible()
  23 |   await expect(page.getByLabel('Password', { exact: true })).toHaveCount(0)
  24 |   await page.getByRole('button', { name: "Daniel's Phone", exact: true }).click()
  25 |   await page.locator('.mirror-icon').filter({ hasText: 'Notes' }).click()
  26 |   await page.getByRole('button', { name: 'Locked Note — public comparison', exact: true }).click()
  27 |   await page.getByLabel('Password', { exact: true }).fill('BUS4')
  28 |   await page.getByRole('button', { name: 'Unlock', exact: true }).click()
  29 |   await expect(page.getByText(/Compare their visible Escort fields yourself/)).toBeVisible()
  30 |   await expect(page.locator('.mirror-document')).not.toContainText('June Ellis')
> 31 |   await page.screenshot({ path: 'qa/phase-06f-public-comparison.png', animations: 'disabled' })
     |   ^ Error: UNKNOWN: unknown error, open 'D:\Web app\TheArchive\qa\phase-06f-public-comparison.png'
  32 | })
  33 | 
```