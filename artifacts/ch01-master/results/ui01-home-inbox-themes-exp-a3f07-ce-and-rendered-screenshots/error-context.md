# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui01.spec.ts >> home, inbox, themes, explicit send, persistence and rendered screenshots
- Location: tests\e2e\ui01.spec.ts:16:1

# Error details

```
Error: UNKNOWN: unknown error, open 'D:\Web app\TheArchive\qa\ui-01\light-chat-390x844.png'
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
        - generic [ref=e37]: Fri, Oct 23
        - generic [ref=e38]:
          - generic [aria-hidden] [ref=e39]: T
          - generic [ref=e40]:
            - paragraph [ref=e41]: Hello, Rae. This is a development conversation.
            - time [ref=e43]: 2:41 PM
      - generic [ref=e46]:
        - paragraph [ref=e47]: I am checking that messages arrive in order.
        - time [ref=e49]: 2:41 PM
    - generic [ref=e50]:
      - generic [ref=e51]:
        - generic [ref=e52]: CHOOSE A REPLY
        - generic [ref=e53]: Text is sent only after confirmation
      - textbox "Find an available reply" [ref=e58]:
        - /placeholder: Find a reply…
      - generic [ref=e59]:
        - button "I can read you clearly." [active] [pressed] [ref=e60] [cursor=pointer]
        - button "Who is this test for?" [ref=e61] [cursor=pointer]
      - button "Send" [ref=e62] [cursor=pointer]
  - navigation "Phone navigation" [ref=e66]:
    - button "Go home" [ref=e67] [cursor=pointer]
```

# Test source

```ts
  1  | import { completeOpening } from './opening-helper'
  2  | import { mkdirSync } from 'node:fs'
  3  | import { expect, test, type Page } from '@playwright/test'
  4  | 
  5  | const evidence = 'qa/ui-01'
  6  | mkdirSync(evidence, { recursive: true })
  7  | 
  8  | async function start(page: Page, name = 'Rae') {
  9  |   await page.goto('/?devtools=1&legacyopening=1')
  10 |   await page.getByRole('button', { name: /Enter the archive/i }).click()
  11 |   await page.getByLabel('Your name').fill(name)
  12 |   await page.getByRole('button', { name: /Set up phone/i }).click()
  13 |   await completeOpening(page)
  14 | }
  15 | 
  16 | test('home, inbox, themes, explicit send, persistence and rendered screenshots', async ({ page }) => {
  17 |   test.setTimeout(60_000)
  18 |   await page.setViewportSize({ width: 390, height: 844 })
  19 |   await start(page)
  20 |   await page.evaluate(() => localStorage.setItem('the-archive:game-save:v1', 'legacy-sentinel'))
  21 |   await expect(page.getByRole('main', { name: "Rae's home screen" })).toBeVisible()
  22 |   await expect(page.getByRole('button', { name: 'Open The Archive' })).toHaveCount(1)
  23 |   await expect(page.getByRole('button', { name: 'Open Mail' })).toHaveCount(0)
  24 |   await page.screenshot({ animations: 'disabled', scale: 'css', path: `${evidence}/home-390x844.png` })
  25 |   await page.getByRole('button', { name: 'Open Messages' }).first().click()
  26 |   await expect(page.getByRole('button', { name: 'Open Test channel conversation' })).toBeVisible()
  27 |   await page.screenshot({ animations: 'disabled', scale: 'css', path: `${evidence}/inbox-390x844.png` })
  28 |   await page.getByRole('button', { name: 'Open Test channel conversation' }).click()
  29 |   await expect(page.getByText('I am checking that messages arrive in order.')).toBeVisible()
  30 |   await page.getByRole('button', { name: 'I can read you clearly.' }).click()
  31 |   await expect(page.locator('.bubble.player')).toHaveCount(0)
> 32 |   await page.screenshot({ animations: 'disabled', scale: 'css', path: `${evidence}/light-chat-390x844.png` })
     |   ^ Error: UNKNOWN: unknown error, open 'D:\Web app\TheArchive\qa\ui-01\light-chat-390x844.png'
  33 |   await page.getByLabel('Find an available reply').focus()
  34 |   await page.setViewportSize({ width: 390, height: 560 })
  35 |   await expect(page.getByRole('button', { name: /^Send$/ })).toBeVisible()
  36 |   await page.screenshot({ animations: 'disabled', scale: 'css', path: `${evidence}/focused-composer-resized-390x560.png` })
  37 |   await page.setViewportSize({ width: 390, height: 844 })
  38 |   await page.getByRole('button', { name: /^Send$/ }).click()
  39 |   await expect(page.locator('.bubble.player')).toHaveCount(1)
  40 |   const closingMessage = page.getByText('The test is complete. Your conversation will be here when you return.')
  41 |   await expect(closingMessage).toBeVisible()
  42 |   await expect(closingMessage).toBeInViewport()
  43 |   await expect.poll(() => page.locator('.chat-scroll').evaluate(element => element.scrollHeight - element.scrollTop - element.clientHeight)).toBeLessThan(4)
  44 |   await page.getByRole('button', { name: 'Back to inbox' }).click()
  45 |   await page.getByRole('button', { name: 'Back to home' }).click()
  46 |   await page.getByRole('button', { name: 'Show home page 2' }).click()
  47 |   await page.getByRole('button', { name: 'Open Settings' }).click()
  48 |   await page.getByLabel('Appearance').selectOption('dark')
  49 |   await expect(page.locator('.theme-dark')).toBeVisible()
  50 |   await page.screenshot({ animations: 'disabled', scale: 'css', path: `${evidence}/settings-dark-390x844.png` })
  51 |   await page.getByRole('button', { name: 'Back to home' }).click()
  52 |   await page.getByRole('button', { name: 'Open Messages' }).first().click()
  53 |   await page.getByRole('button', { name: 'Open Test channel conversation' }).click()
  54 |   await page.screenshot({ animations: 'disabled', scale: 'css', path: `${evidence}/dark-chat-390x844.png` })
  55 |   await page.reload()
  56 |   await page.getByRole('button', { name: /Enter the archive/i }).click()
  57 |   expect(await page.evaluate(() => localStorage.getItem('the-archive:game-save:v1'))).toBe('legacy-sentinel')
  58 |   await expect(page.getByRole('main', { name: "Rae's home screen" })).toBeVisible()
  59 |   await expect(page.locator('.theme-dark')).toBeVisible()
  60 |   await page.getByRole('button', { name: 'Open Messages' }).first().click()
  61 |   await expect(page.locator('.thread-meta b')).toHaveCount(0)
  62 |   await page.getByRole('button', { name: 'Open Test channel conversation' }).click()
  63 |   await expect(page.locator('.bubble.player')).toHaveCount(1)
  64 |   await expect(page.locator('.bubble.fixture')).toHaveCount(4)
  65 |   expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true)
  66 | })
  67 | 
  68 | for (const [width, height] of [[320, 720], [375, 812], [430, 932]] as const) {
  69 |   test(`layout at ${width}x${height}`, async ({ page }) => {
  70 |     await page.setViewportSize({ width, height })
  71 |     await start(page, 'Alex')
  72 |     await expect(page.getByRole('button', { name: 'Open Messages' }).first()).toBeVisible()
  73 |     expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true)
  74 |     await page.getByRole('button', { name: 'Open Messages' }).first().click()
  75 |     await page.getByRole('button', { name: 'Open Test channel conversation' }).click()
  76 |     await expect(page.getByText('Hello, Alex. This is a development conversation.')).toBeVisible()
  77 |     expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true)
  78 |     await page.screenshot({ animations: 'disabled', scale: 'css', path: test.info().outputPath(`chat-${width}x${height}.png`) })
  79 |   })
  80 | }
  81 | 
  82 | test('desktop browser navigation remains contained', async ({ page }) => {
  83 |   await page.setViewportSize({ width: 1280, height: 900 })
  84 |   await start(page, 'Sam')
  85 |   await page.getByRole('button', { name: 'Open Search' }).click()
  86 |   await page.getByLabel('Search Greyhaven').fill('library')
  87 |   await expect(page.getByText('Library local history desk')).toBeVisible()
  88 |   await page.getByRole('button', { name: 'Go home' }).click()
  89 |   await expect(page.getByRole('main', { name: "Sam's home screen" })).toBeVisible()
  90 |   await page.screenshot({ animations: 'disabled', scale: 'css', path: `${evidence}/home-desktop-1280x900.png` })
  91 | })
  92 | 
  93 | 
```