# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: phase03c-recovery.spec.ts >> second tab is stopped on a stale save and can download before an explicit reload
- Location: tests\e2e\phase03c-recovery.spec.ts:159:1

# Error details

```
Test timeout of 90000ms exceeded.
```

```
Error: locator.click: Test timeout of 90000ms exceeded.
Call log:
  - waiting for locator('.mirror-file').first()
    - locator resolved to <button class="mirror-file" aria-label="Archive Index — integrity report">…</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is not stable
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is not stable
    - retrying click action
      - waiting 100ms
    - waiting for element to be visible, enabled and stable
  - element was detached from the DOM, retrying

```

# Page snapshot

```yaml
- generic [ref=e4]:
  - generic "Greyhaven story time 8 October 2026 08:49" [ref=e5]: 8:49
  - generic "Daniel Mercer's phone" [ref=e23]:
    - generic [ref=e24]:
      - button "My phone" [ref=e25] [cursor=pointer]
      - generic [ref=e28]: Daniel’s iPhone
    - generic [ref=e29]:
      - generic [ref=e30]:
        - generic [ref=e31]:
          - generic [ref=e32]: THURSDAY
          - strong [ref=e33]: "8"
          - generic [ref=e34]: October
        - generic "Decorative Greyhaven wallpaper" [ref=e35]: Greyhaven
      - generic [ref=e37]:
        - button [ref=e38] [cursor=pointer]:
          - strong [ref=e49]: Photos
        - button [ref=e50] [cursor=pointer]:
          - strong [ref=e55]: Notes
        - button [ref=e56] [cursor=pointer]:
          - strong [ref=e60]: Files
        - button [ref=e61] [cursor=pointer]:
          - strong [ref=e67]: Contacts
        - button [ref=e68] [cursor=pointer]:
          - strong [ref=e74]: Protected
        - button [ref=e75] [cursor=pointer]:
          - strong [ref=e81]: Maps
        - button [ref=e82] [cursor=pointer]:
          - strong [ref=e88]: Archive Index
      - generic [ref=e89]:
        - button "Settings" [ref=e90] [cursor=pointer]
        - button "Case Board" [ref=e94] [cursor=pointer]
      - generic "Daniel's app dock" [ref=e100]:
        - button [ref=e101] [cursor=pointer]
        - button [ref=e107] [cursor=pointer]
        - button [ref=e111] [cursor=pointer]
        - button [ref=e116] [cursor=pointer]
    - button "Daniel phone home" [ref=e121] [cursor=pointer]
```

# Test source

```ts
  1  | import type { Page } from '@playwright/test'
  2  | 
  3  | export async function finishGroupOpening(page: Page) {
  4  |   await page.getByRole('button', { name: 'You can add me. I will listen first.' }).click()
  5  |   await page.getByRole('button', { name: 'Send message' }).click()
  6  |   await page.getByRole('button', { name: "I don't know Daniel. Sophie contacted me, and I'm trying to understand why." }).click()
  7  |   await page.getByRole('button', { name: 'Send message' }).click()
  8  |   await page.getByRole('button', { name: "I won't ask anyone to share private information here." }).click()
  9  |   await page.getByRole('button', { name: 'Send message' }).click()
  10 |   await page.getByRole('button', { name: 'Send it. I will look, but I cannot promise what it means.' }).click()
  11 |   await page.getByRole('button', { name: 'Send message' }).click()
  12 | }
  13 | 
  14 | /** Finish the canonical Sophie prologue before testing later Episode 01 scenes. */
  15 | export async function completeOpening(page: Page) {
  16 |   await page.getByRole('button', { name: 'Who is Daniel Mercer?' }).click()
  17 |   await page.getByRole('button', { name: 'Send message' }).click()
  18 |   await finishGroupOpening(page)
  19 |   await page.getByRole('button', { name: /Daniel's handwritten note/ }).click()
  20 |   await page.getByRole('button', { name: 'Save note to evidence' }).click()
  21 |   await page.getByRole('button', { name: "I'll see what I can find." }).click()
  22 |   await page.getByRole('button', { name: 'Send message' }).click()
  23 |   await finishRecoveryConversation(page)
  24 |   await page.getByRole('button', { name: 'Inspect permission & origin' }).click()
  25 |   await page.getByRole('button', { name: 'Restore The Archive' }).click()
  26 |   await page.locator('.mirror-icon').filter({ hasText: 'Notes' }).click()
  27 |   await page.locator('.mirror-file').first().click()
  28 |   await page.getByRole('button', { name: "Daniel's Phone" }).click()
  29 |   await page.locator('.mirror-icon').filter({ hasText: 'Archive Index' }).click()
> 30 |   await page.locator('.mirror-file').first().click()
     |                                              ^ Error: locator.click: Test timeout of 90000ms exceeded.
  31 |   await page.getByRole('button', { name: 'Record the missing-entry discrepancy' }).click()
  32 |   await finishSophieDisclosure(page)
  33 |   await page.getByRole('button', { name: 'Continue the investigation' }).click()
  34 | }
  35 | 
  36 | export async function finishRecoveryConversation(page: Page) {
  37 |   await page.getByRole('button', { name: 'When did you last see him?' }).click()
  38 |   await page.getByRole('button', { name: 'Send message' }).click()
  39 |   await page.getByRole('button', { name: "No. I haven't requested anything." }).click()
  40 |   await page.getByRole('button', { name: 'Send message' }).click()
  41 | }
  42 | 
  43 | export async function finishSophieDisclosure(page: Page, choice = 'I need some time before I share anything.') {
  44 |   await page.getByRole('button', { name: choice, exact: true }).click()
  45 |   await page.getByRole('button', { name: 'Send message' }).click()
  46 |   await page.getByRole('button', { name: 'Where can I find the public record?' }).click()
  47 |   await page.getByRole('button', { name: 'Send message' }).click()
  48 | }
  49 | 
```