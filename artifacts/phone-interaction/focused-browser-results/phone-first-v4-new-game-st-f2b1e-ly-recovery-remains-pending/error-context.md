# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: phone-first-v4.spec.ts >> new game starts on a free phone, unknown contact arrives once, and the early recovery remains pending
- Location: tests\e2e\phone-first-v4.spec.ts:19:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('button', { name: 'Open unknown message' })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByRole('button', { name: 'Open unknown message' }) with timeout 5000ms
  - waiting for getByRole('button', { name: 'Open unknown message' })

```

```yaml
- text: 8:41
- main "Phone home screen":
  - text: Your phone
  - button "Lock phone"
  - region "Home widgets":
    - button "Open photo widget":
      - text: GREYHAVEN
      - strong: Along the water
    - button "Open calendar widget":
      - strong: OCTOBER
  - region "Home page 1 apps":
    - button "Open Photos": Photos
    - button "Open Calendar": Calendar
    - button "Open Files": Files
    - button "Open Notes": Notes
    - button "Open Maps": Maps
    - button "Open Contacts": Contacts
    - button "Open Alerts": Alerts
  - button "Show home page 1"
  - button "Show home page 2"
  - navigation "Quick apps":
    - button "Open Calls"
    - button "Open Messages"
    - button "Open Contacts"
- navigation "Phone navigation":
  - button "Go home" [disabled]
```

# Test source

```ts
  1   | import { expect, test } from '@playwright/test'
  2   | import { finishPrivateExpansion, finishRecoveredConversation } from './recovery-helper'
  3   | 
  4   | test('reduced motion still delivers phone-first replies without answering for the player', async ({ page }) => {
  5   |   await page.emulateMedia({ reducedMotion: 'reduce' })
  6   |   await page.clock.install({ time: new Date('2026-10-08T08:40:00Z') })
  7   |   await page.goto('/')
  8   |   await page.getByRole('button', { name: 'Enter the archive' }).click()
  9   |   await page.clock.runFor(20_000)
  10  |   await page.getByRole('button', { name: 'Open unknown message' }).click()
  11  |   await page.getByRole('button', { name: 'Who is this?', exact: true }).click()
  12  |   await expect(page.locator('.opening-bubble.player')).toHaveCount(0)
  13  |   await page.getByRole('button', { name: 'Send', exact: true }).click()
  14  |   await page.clock.runFor(25_000)
  15  |   await expect(page.getByLabel('Your name')).toBeVisible()
  16  |   await expect(page.locator('.opening-bubble.player')).toHaveCount(1)
  17  | })
  18  | 
  19  | test('new game starts on a free phone, unknown contact arrives once, and the early recovery remains pending', async ({ page }) => {
  20  |   await page.clock.install({ time: new Date('2026-10-08T08:40:00Z') })
  21  |   await page.goto('/')
  22  |   await page.getByRole('button', { name: 'Enter the archive' }).click()
  23  |   await expect(page.getByRole('main', { name: 'Phone home screen' })).toBeVisible()
  24  |   await expect(page.getByLabel('Your name')).toHaveCount(0)
  25  |   await page.getByRole('button', { name: 'Open Contacts' }).first().click()
  26  |   await expect(page.getByText('No contacts yet.')).toBeVisible()
  27  |   await page.clock.runFor(20_000)
  28  |   await expect(page.getByText('No contacts yet.')).toBeVisible()
  29  |   await page.getByRole('button', { name: 'Back to home' }).click()
> 30  |   await expect(page.getByRole('button', { name: 'Open unknown message' })).toBeVisible()
      |                                                                            ^ Error: expect(locator).toBeVisible() failed
  31  |   await page.getByRole('button', { name: 'Open unknown message' }).click()
  32  |   await expect(page.getByRole('region', { name: 'Unknown number conversation' })).toBeVisible()
  33  |   await expect(page.getByRole('button', { name: 'Who is this?' })).toBeVisible()
  34  |   await page.getByRole('button', { name: 'Who is this?' }).click()
  35  |   await expect(page.locator('.opening-bubble.player')).toHaveCount(0)
  36  |   await page.getByRole('button', { name: 'Send', exact: true }).click()
  37  |   await page.clock.runFor(15_000)
  38  |   await expect(page.getByLabel('Your name')).toBeVisible()
  39  |   await page.getByLabel('Your name').fill('慧')
  40  |   await page.getByRole('button', { name: 'Send', exact: true }).click()
  41  |   await page.clock.runFor(15_000)
  42  |   await page.getByRole('button', { name: 'Just use my name' }).click()
  43  |   await page.getByRole('button', { name: 'Send', exact: true }).click()
  44  |   await page.clock.runFor(15_000)
  45  |   await page.getByRole('button', { name: 'Why did he leave you my number?' }).click()
  46  |   await page.getByRole('button', { name: 'Send', exact: true }).click()
  47  |   await page.clock.runFor(60_000)
  48  |   await expect(page.getByRole('button', { name: 'Open first page photo from unknown number' })).toHaveCount(0)
  49  |   await page.getByRole('button', { name: "Okay. You can add me to the group when you're ready.", exact: true }).click()
  50  |   await page.getByRole('button', { name: 'Send', exact: true }).click()
  51  |   await page.clock.runFor(110_000)
  52  |   await page.getByRole('button', { name: 'Back to inbox' }).click()
  53  |   await page.getByRole('button', { name: 'Back to home' }).click()
  54  |   await page.getByRole('button', { name: 'Open Alerts' }).click()
  55  |   await expect(page.getByText('Protected connection request', { exact: true })).toBeVisible()
  56  |   await expect(page.getByRole('button', { name: 'Reject pending request' })).toBeVisible()
  57  |   await page.getByRole('button', { name: 'Reject pending request' }).click()
  58  |   await expect(page.getByText('Request declined.')).toBeVisible()
  59  |   await page.getByRole('button', { name: 'Back to home' }).click()
  60  |   await page.getByRole('button', { name: 'Open Messages' }).first().click()
  61  |   await expect(page.getByRole('button', { name: 'Open FIND DANIEL group conversation' })).toBeVisible()
  62  |   await page.getByRole('button', { name: 'Open FIND DANIEL group conversation' }).click()
  63  |   await expect(page.getByText('Sophie created the group FIND DANIEL.')).toHaveCount(1)
  64  |   await expect(page.getByText('Sophie added Maya Chen, Lucas Grey and Eli Ward.')).toHaveCount(1)
  65  |   await page.reload()
  66  |   await page.getByRole('button', { name: 'Enter the archive' }).click()
  67  |   await page.getByRole('button', { name: 'Open Messages' }).first().click()
  68  |   await page.getByRole('button', { name: 'Open FIND DANIEL group conversation' }).click()
  69  |   await expect(page.getByText('Sophie created the group FIND DANIEL.')).toHaveCount(1)
  70  | })
  71  | 
  72  | test('new opening follows group departures and recovery with a private Sophie message', async ({ page }) => {
  73  |   await page.clock.install({ time: new Date('2026-10-08T08:40:00Z') })
  74  |   await page.goto('/')
  75  |   await page.getByRole('button', { name: 'Enter the archive' }).click()
  76  |   await page.clock.runFor(20_000)
  77  |   await page.getByRole('button', { name: 'Open unknown message' }).click()
  78  |   await page.getByRole('button', { name: 'I can listen for a minute.' }).click()
  79  |   await page.getByRole('button', { name: 'Send', exact: true }).click()
  80  |   await page.clock.runFor(15_000)
  81  |   await page.getByLabel('Your name').fill('Rae')
  82  |   await page.getByRole('button', { name: 'Send', exact: true }).click()
  83  |   await page.clock.runFor(15_000)
  84  |   await page.getByRole('button', { name: 'Just use my name' }).click()
  85  |   await page.getByRole('button', { name: 'Send', exact: true }).click()
  86  |   await page.clock.runFor(15_000)
  87  |   await page.getByRole('button', { name: 'Who is Daniel?' }).click()
  88  |   await page.getByRole('button', { name: 'Send', exact: true }).click()
  89  |   await page.clock.runFor(25_000)
  90  |   await page.getByRole('button', { name: "Okay. You can add me to the group when you're ready.", exact: true }).click()
  91  |   await page.getByRole('button', { name: 'Send', exact: true }).click()
  92  |   await page.clock.runFor(110_000)
  93  |   await page.getByRole('button', { name: 'Back to inbox' }).click()
  94  |   await page.getByRole('button', { name: 'Open FIND DANIEL group conversation' }).click()
  95  |   await page.getByRole('button', { name: "I don't know Daniel. Sophie contacted me, and I'm trying to understand why." }).click()
  96  |   await page.getByRole('button', { name: 'Send', exact: true }).click()
  97  |   await page.clock.runFor(60_000)
  98  |   await page.getByRole('button', { name: "I won't ask anyone to share private information here." }).click()
  99  |   await page.getByRole('button', { name: 'Send', exact: true }).click()
  100 |   await page.clock.runFor(150_000)
  101 |   await expect(page.getByText('Lucas left the group.')).toHaveCount(1)
  102 |   await expect(page.getByText('Maya left the group.')).toHaveCount(1)
  103 |   await page.getByRole('button', { name: 'Back to inbox' }).click()
  104 |   await page.getByRole('button', { name: 'Open Sophie Mercer conversation' }).click()
  105 |   await page.getByRole('button', { name: 'Send it. I will look, but I cannot promise what it means.' }).click()
  106 |   await page.getByRole('button', { name: 'Send', exact: true }).click()
  107 |   await page.clock.runFor(60_000)
  108 |   await finishPrivateExpansion(page)
  109 |   await expect(page.getByRole('button', { name: 'Open later handwritten note' })).toBeVisible()
  110 |   await page.getByRole('button', { name: 'Save the later note to your private evidence' }).click()
  111 |   await page.getByRole('button', { name: "I'll see what I can find." }).click()
  112 |   await page.getByRole('button', { name: 'Send', exact: true }).click()
  113 |   await page.clock.runFor(15_000)
  114 |   await page.getByRole('button', { name: 'When did you last see him?' }).click()
  115 |   await page.getByRole('button', { name: 'Send', exact: true }).click()
  116 |   await page.clock.runFor(60_000)
  117 |   await page.getByRole('button', { name: "I'll inspect the request, but I won't assume it's Daniel's." }).click()
  118 |   await page.getByRole('button', { name: 'Send', exact: true }).click()
  119 |   await page.clock.runFor(25_000)
  120 |   await page.getByRole('button', { name: 'Back to inbox' }).click()
  121 |   await page.getByRole('button', { name: 'Back to home' }).click()
  122 |   await page.getByRole('button', { name: 'Open The Archive' }).click()
  123 |   await expect(page.getByText('Recovery package available')).toBeVisible()
  124 |   await page.getByRole('button', { name: 'Inspect permission & origin' }).click()
  125 |   await page.getByRole('button', { name: 'Restore The Archive' }).click()
  126 |   await finishRecoveredConversation(page, true)
  127 |   await expect(page.getByRole('button', { name: "Open Sophie's message", exact: true })).toBeVisible()
  128 | })
  129 | 
  130 | test('a saved earlier opening continues without fabricating the new unknown-number event', async ({ page }) => {
```