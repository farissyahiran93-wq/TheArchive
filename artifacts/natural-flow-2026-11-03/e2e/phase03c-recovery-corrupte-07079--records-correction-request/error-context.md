# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: phase03c-recovery.spec.ts >> corrupted delivery exposes its actual status, quarantines the file and records correction request
- Location: tests\e2e\phase03c-recovery.spec.ts:87:1

# Error details

```
Test timeout of 90000ms exceeded.
```

```
Error: locator.click: Test timeout of 90000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'I need some time before I share anything.', exact: true })

```

# Page snapshot

```yaml
- generic [ref=e4]:
  - generic "Greyhaven story time 8 October 2026 08:49" [ref=e5]: 8:49
  - generic [ref=e21]:
    - generic [ref=e22]:
      - generic [ref=e23]: GREYHAVEN
      - button "Main Menu" [ref=e24] [cursor=pointer]
    - main "Phone lock screen" [ref=e25]:
      - generic [ref=e26]:
        - paragraph [ref=e31]: Thursday, 8 October
        - heading "8:49" [level=1] [ref=e32]
      - generic [ref=e33]:
        - paragraph [ref=e34]:
          - text: YOUR PHONE
          - generic [ref=e35]: PRIVATE DEVICE
        - button "Unlock phone" [ref=e36] [cursor=pointer]:
          - generic [ref=e39]: Swipe up to open
  - navigation "Phone navigation" [ref=e40]:
    - button "Go home" [ref=e41] [cursor=pointer]
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
  25 |   await page.getByRole('button', { name: 'Restore TRACE' }).click()
  26 |   await page.locator('.mirror-icon').filter({ hasText: 'Notes' }).click()
  27 |   await page.locator('.mirror-file').first().click()
  28 |   await page.getByRole('button', { name: "Daniel's Phone" }).click()
  29 |   await page.locator('.mirror-icon').filter({ hasText: 'Archive Index' }).click()
  30 |   await page.locator('.mirror-file').first().click()
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
> 44 |   await page.getByRole('button', { name: choice, exact: true }).click()
     |                                                                 ^ Error: locator.click: Test timeout of 90000ms exceeded.
  45 |   await page.getByRole('button', { name: 'Send message' }).click()
  46 |   await page.getByRole('button', { name: 'Where can I find the public record?' }).click()
  47 |   await page.getByRole('button', { name: 'Send message' }).click()
  48 | }
  49 | 
```