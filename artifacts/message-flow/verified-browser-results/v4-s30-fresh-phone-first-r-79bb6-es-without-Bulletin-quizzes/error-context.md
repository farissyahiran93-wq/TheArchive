# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: v4-s30.spec.ts >> fresh phone-first route continues through NPC messages without Bulletin quizzes
- Location: tests\e2e\v4-s30.spec.ts:19:1

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://127.0.0.1:4174/
Call log:
  - navigating to "http://127.0.0.1:4174/", waiting until "load"

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e6]:
    - heading "This site can’t be reached" [level=1] [ref=e7]
    - paragraph [ref=e8]:
      - strong [ref=e9]: 127.0.0.1
      - text: refused to connect.
    - generic [ref=e10]:
      - paragraph [ref=e11]: "Try:"
      - list [ref=e12]:
        - listitem [ref=e13]: Checking the connection
        - listitem [ref=e14]:
          - link "Checking the proxy and the firewall" [ref=e15] [cursor=pointer]:
            - /url: "#buttons"
    - generic [ref=e16]: ERR_CONNECTION_REFUSED
  - generic [ref=e17]:
    - button "Reload" [ref=e19] [cursor=pointer]
    - button "Details" [ref=e20] [cursor=pointer]
```

# Test source

```ts
  1  | import { expect, test } from '@playwright/test'
  2  | import { finishPrivateExpansion, finishRecoveredConversation } from './recovery-helper'
  3  | import { completeOpening } from './opening-helper'
  4  | 
  5  | test('an earlier Bulletin save can explicitly continue in MIRROR without a story reset', async ({ page }) => {
  6  |   await page.goto('/?legacyopening=1')
  7  |   await page.getByRole('button', { name: "Open Sophie's new message" }).click()
  8  |   await page.getByLabel('Your name').fill('Rae')
  9  |   await page.getByRole('button', { name: 'Set up phone' }).click()
  10 |   await completeOpening(page)
  11 |   await page.goto('/')
  12 |   await page.getByRole('button', { name: 'Enter the archive', exact: true }).click()
  13 |   await expect(page.getByRole('button', { name: 'Open Bulletin', exact: true })).toHaveCount(0)
  14 |   await page.getByRole('button', { name: 'Continue MIRROR conversation', exact: true }).click()
  15 |   await expect(page.getByRole('region', { name: 'MIRROR recovery session', exact: true })).toBeVisible()
  16 |   await expect(page.getByText('A sentence you can defend', { exact: true })).toHaveCount(0)
  17 | })
  18 | 
  19 | test('fresh phone-first route continues through NPC messages without Bulletin quizzes', async ({ page }) => {
  20 |   test.setTimeout(120_000)
  21 |   page.setDefaultTimeout(7_000)
  22 |   await page.clock.install({ time: new Date('2026-10-08T08:40:00Z') })
> 23 |   await page.goto('/')
     |              ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://127.0.0.1:4174/
  24 |   await page.getByRole('button', { name: 'Enter the archive' }).click()
  25 |   await page.clock.runFor(20_000)
  26 |   await page.getByRole('button', { name: 'Open unknown message' }).click()
  27 |   await page.getByRole('button', { name: 'I can listen for a minute.' }).click()
  28 |   await page.getByRole('button', { name: 'Send', exact: true }).click()
  29 |   await page.clock.runFor(15_000)
  30 |   await page.getByLabel('Your name').fill('Rae')
  31 |   await page.getByRole('button', { name: 'Send', exact: true }).click()
  32 |   await page.clock.runFor(15_000)
  33 |   await page.getByRole('button', { name: 'Just use my name' }).click()
  34 |   await page.getByRole('button', { name: 'Send', exact: true }).click()
  35 |   await page.clock.runFor(15_000)
  36 |   await page.getByRole('button', { name: 'Who is Daniel?' }).click()
  37 |   await page.getByRole('button', { name: 'Send', exact: true }).click()
  38 |   await page.clock.runFor(50_000)
  39 |   await page.getByRole('button', { name: 'Back to inbox' }).click()
  40 |   await page.getByRole('button', { name: 'Open FIND DANIEL group conversation' }).click()
  41 |   await page.getByRole('button', { name: "I don't know Daniel. Sophie contacted me, and I'm trying to understand why." }).click()
  42 |   await page.getByRole('button', { name: 'Send', exact: true }).click()
  43 |   await page.clock.runFor(30_000)
  44 |   await page.getByRole('button', { name: "I won't ask anyone to share private information here." }).click()
  45 |   await page.getByRole('button', { name: 'Send', exact: true }).click()
  46 |   await page.clock.runFor(75_000)
  47 |   await page.getByRole('button', { name: 'Back to inbox' }).click()
  48 |   await page.getByRole('button', { name: 'Open Sophie Mercer conversation' }).click()
  49 |   await page.getByRole('button', { name: 'Send it. I will look, but I cannot promise what it means.' }).click()
  50 |   await page.getByRole('button', { name: 'Send', exact: true }).click()
  51 |   await page.clock.runFor(18_000)
  52 |   await finishPrivateExpansion(page)
  53 |   await page.getByRole('button', { name: 'Save the later note to your private evidence' }).click()
  54 |   for (const choice of ["I'll see what I can find.", 'When did you last see him?', "I'll inspect the request, but I won't assume it's Daniel's."]) {
  55 |     await page.getByRole('button', { name: choice, exact: true }).click()
  56 |     await page.getByRole('button', { name: 'Send', exact: true }).click()
  57 |     await page.clock.runFor(30_000)
  58 |   }
  59 |   await page.getByRole('button', { name: 'Back to inbox' }).click()
  60 |   await page.getByRole('button', { name: 'Back to home' }).click()
  61 |   await page.getByRole('button', { name: 'Open The Archive' }).click()
  62 |   await page.getByRole('button', { name: 'Inspect permission & origin' }).click()
  63 |   await page.getByRole('button', { name: 'Restore The Archive' }).click()
  64 |   await finishRecoveredConversation(page)
  65 |   await page.getByRole('button', { name: "Open Sophie's message", exact: true }).click()
  66 |   for (const text of ['I need some time before I share anything.', 'I need a break. Can we talk about this later?', 'I want to check the recovered records before I ask anyone else.']) {
  67 |     await page.getByRole('button', { name: text, exact: true }).click()
  68 |     await page.getByRole('button', { name: 'Send', exact: true }).click()
  69 |     await page.clock.runFor(40_000)
  70 |   }
  71 |   await page.getByRole('button', { name: 'Close chat and keep investigating', exact: true }).click()
  72 |   await page.clock.runFor(35_000)
  73 |   await page.getByRole('button', { name: 'I want to check the index myself.', exact: true }).click()
  74 |   await page.getByRole('button', { name: 'Send', exact: true }).click()
  75 |   await page.clock.runFor(35_000)
  76 |   await expect(page.getByLabel("Daniel Mercer's phone")).toBeVisible()
  77 |   await page.locator('.mirror-icon').filter({ hasText: 'Notes' }).click()
  78 |   await page.locator('.mirror-file').first().click()
  79 |   await page.getByRole('button', { name: "Daniel's Phone" }).click()
  80 |   await page.locator('.mirror-icon').filter({ hasText: 'Archive Index' }).click()
  81 |   await page.locator('.mirror-file').first().click()
  82 |   await page.getByRole('button', { name: 'Record the missing-entry discrepancy' }).click()
  83 |   await page.clock.runFor(30_000)
  84 |   await expect(page.locator('.opening-bubble.sophie').filter({ hasText: 'What can we actually connect?' })).toBeVisible()
  85 |   await page.screenshot({ path: 'qa/message-flow/relay-conversation.png', animations: 'disabled' })
  86 |   const choice = page.getByRole('button', { name: 'They suggest a question, but we cannot prove they describe the same entry.', exact: true })
  87 |   const before = await page.locator('.opening-bubble.player').count()
  88 |   await choice.click()
  89 |   await expect(page.locator('.opening-bubble.player')).toHaveCount(before)
  90 |   await page.getByRole('button', { name: 'Send', exact: true }).click()
  91 |   await page.clock.runFor(30_000)
  92 |   await page.getByRole('button', { name: 'My phone', exact: true }).click()
  93 |   await expect(page.getByRole('button', { name: 'Open Bulletin', exact: true })).toHaveCount(0)
  94 |   await expect(page.getByText('How would you describe this to another person?', { exact: true })).toHaveCount(0)
  95 |   await expect(page.getByText('A sentence you can defend', { exact: true })).toHaveCount(0)
  96 |   await page.screenshot({ path: 'qa/message-flow/home-no-bulletin.png', animations: 'disabled' })
  97 | })
  98 | 
```