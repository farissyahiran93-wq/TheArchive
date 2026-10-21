# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: phone-polish.spec.ts >> phone lock, two home pages and app navigation at 390x844
- Location: tests\e2e\phone-polish.spec.ts:22:1

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Continue the investigation' })
    - locator resolved to <button class="opening-primary">…</button>
  - attempting click action
    - waiting for element to be visible, enabled and stable
  - element was detached from the DOM, retrying

```

# Page snapshot

```yaml
- generic [ref=e4]:
  - generic "Greyhaven story time 8 October 2026 08:49" [ref=e5]: 8:49
  - navigation "Phone navigation" [ref=e22]:
    - button "Go home" [disabled] [ref=e23]
```

# Test source

```ts
  1  | import type { Page } from '@playwright/test'
  2  | 
  3  | /** Finish the canonical Sophie prologue before testing later Episode 01 scenes. */
  4  | export async function completeOpening(page: Page) {
  5  |   await page.getByRole('button', { name: 'Who is Daniel Mercer?' }).click()
  6  |   await page.getByRole('button', { name: 'Send message' }).click()
  7  |   await page.getByRole('button', { name: /Daniel's handwritten note/ }).click()
  8  |   await page.getByRole('button', { name: 'Save note to evidence' }).click()
  9  |   await page.getByRole('button', { name: "I'll see what I can find." }).click()
  10 |   await page.getByRole('button', { name: 'Send message' }).click()
  11 |   await finishRecoveryConversation(page)
  12 |   await page.getByRole('button', { name: 'Inspect permission & origin' }).click()
  13 |   await page.getByRole('button', { name: 'Restore The Archive' }).click()
  14 |   await page.locator('.mirror-icon').filter({ hasText: 'Notes' }).click()
  15 |   await page.getByRole('button', { name: "Daniel's Phone" }).click()
  16 |   await page.locator('.mirror-icon').filter({ hasText: 'Archive Index' }).click()
  17 |   await page.getByRole('button', { name: 'Record the missing-entry discrepancy' }).click()
  18 |   await finishSophieDisclosure(page)
> 19 |   await page.getByRole('button', { name: 'Continue the investigation' }).click()
     |                                                                          ^ Error: locator.click: Test timeout of 60000ms exceeded.
  20 | }
  21 | 
  22 | export async function finishRecoveryConversation(page: Page) {
  23 |   await page.getByRole('button', { name: 'When did you last see him?' }).click()
  24 |   await page.getByRole('button', { name: 'Send message' }).click()
  25 |   await page.getByRole('button', { name: "No. I haven't requested anything." }).click()
  26 |   await page.getByRole('button', { name: 'Send message' }).click()
  27 | }
  28 | 
  29 | export async function finishSophieDisclosure(page: Page, choice = 'I need some time before I share anything.') {
  30 |   await page.getByRole('button', { name: choice, exact: true }).click()
  31 |   await page.getByRole('button', { name: 'Send message' }).click()
  32 |   await page.getByRole('button', { name: 'Where can I find the public record?' }).click()
  33 |   await page.getByRole('button', { name: 'Send message' }).click()
  34 | }
  35 | 
```