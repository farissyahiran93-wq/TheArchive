# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: phone-first-v4.spec.ts >> new game starts on a free phone, unknown contact arrives once, and the early recovery remains pending
- Location: tests\e2e\phone-first-v4.spec.ts:19:1

# Error details

```
Error: locator.click: Error: strict mode violation: getByRole('button', { name: 'Open Contacts' }) resolved to 2 elements:
    1) <button class="app-tile" aria-label="Open Contacts">…</button> aka getByRole('region', { name: 'Home page 1 apps' }).getByRole('button', { name: 'Open Contacts' })
    2) <button aria-label="Open Contacts">…</button> aka getByRole('navigation', { name: 'Quick apps' }).getByRole('button', { name: 'Open Contacts' })

Call log:
  - waiting for getByRole('button', { name: 'Open Contacts' })

```

# Page snapshot

```yaml
- generic [ref=e4]:
  - generic "Greyhaven story time 8 October 2026 08:41" [ref=e5]: 8:41
  - main "Phone home screen" [ref=e22]:
    - generic [ref=e23]:
      - generic [ref=e24]:
        - generic [ref=e25]: Your phone
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
        - button "Open Photos" [ref=e82] [cursor=pointer]:
          - generic [ref=e94]: Photos
        - button "Open Calendar" [ref=e95] [cursor=pointer]:
          - generic [ref=e97]:
            - generic [ref=e98]: THU
            - strong [ref=e99]: "8"
          - generic [ref=e100]: Calendar
        - button "Open Files" [ref=e101] [cursor=pointer]:
          - generic [ref=e106]: Files
        - button "Open Notes" [ref=e107] [cursor=pointer]:
          - generic [ref=e113]: Notes
        - button "Open Maps" [ref=e114] [cursor=pointer]:
          - generic [ref=e124]: Maps
        - button "Open Search" [ref=e125] [cursor=pointer]:
          - generic [ref=e140]: Search
        - button "Open Contacts" [ref=e141] [cursor=pointer]:
          - generic [ref=e150]: Contacts
        - button "Open Alerts" [ref=e151] [cursor=pointer]:
          - generic [ref=e156]: Alerts
    - generic [ref=e157]:
      - generic "Home pages" [ref=e158]:
        - button "Show home page 1" [ref=e159] [cursor=pointer]
        - button "Show home page 2" [ref=e161] [cursor=pointer]
      - navigation "Quick apps" [ref=e163]:
        - button "Open Calls" [ref=e164] [cursor=pointer]
        - button "Open Messages" [ref=e168] [cursor=pointer]
        - button "Open Contacts" [ref=e172] [cursor=pointer]
  - navigation "Phone navigation" [ref=e181]:
    - button "Go home" [disabled] [ref=e182]
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
> 25  |   await page.getByRole('button', { name: 'Open Contacts' }).click()
      |                                                             ^ Error: locator.click: Error: strict mode violation: getByRole('button', { name: 'Open Contacts' }) resolved to 2 elements:
  26  |   await expect(page.getByText('No contacts yet.')).toBeVisible()
  27  |   await page.clock.runFor(20_000)
  28  |   await expect(page.getByText('No contacts yet.')).toBeVisible()
  29  |   await page.getByRole('button', { name: 'Back to home' }).click()
  30  |   await expect(page.getByRole('button', { name: 'Open unknown message' })).toBeVisible()
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
  47  |   await page.clock.runFor(30_000)
  48  |   await expect(page.getByRole('button', { name: 'Open first page photo from unknown number' })).toBeVisible()
  49  |   await expect(page.getByText('RECOVERY: ECHO-7/14')).toHaveCount(0)
  50  |   await page.getByRole('button', { name: 'Open first page photo from unknown number' }).click()
  51  |   await expect(page.getByRole('dialog', { name: 'First page photo' })).toBeVisible()
  52  |   await page.getByRole('button', { name: 'Close photo' }).click()
  53  |   await page.getByRole('button', { name: 'Back to inbox' }).click()
  54  |   await page.getByRole('button', { name: 'Back to home' }).click()
  55  |   await page.getByRole('button', { name: 'Open Alerts' }).click()
  56  |   await expect(page.getByText('Protected connection request', { exact: true })).toBeVisible()
  57  |   await expect(page.getByRole('button', { name: 'Reject pending request' })).toBeVisible()
  58  |   await page.getByRole('button', { name: 'Reject pending request' }).click()
  59  |   await expect(page.getByText('Request declined.')).toBeVisible()
  60  |   await page.getByRole('button', { name: 'Back to home' }).click()
  61  |   await page.getByRole('button', { name: 'Open Messages' }).first().click()
  62  |   await expect(page.getByRole('button', { name: 'Open FIND DANIEL group conversation' })).toBeVisible()
  63  |   await page.getByRole('button', { name: 'Open FIND DANIEL group conversation' }).click()
  64  |   await expect(page.getByText('Sophie created the group FIND DANIEL.')).toHaveCount(1)
  65  |   await expect(page.getByText('Sophie added Maya Chen, Lucas Grey and Eli Ward.')).toHaveCount(1)
  66  |   await page.reload()
  67  |   await page.getByRole('button', { name: 'Enter the archive' }).click()
  68  |   await page.getByRole('button', { name: 'Open Messages' }).first().click()
  69  |   await page.getByRole('button', { name: 'Open FIND DANIEL group conversation' }).click()
  70  |   await expect(page.getByText('Sophie created the group FIND DANIEL.')).toHaveCount(1)
  71  | })
  72  | 
  73  | test('new opening follows group departures and recovery with a private Sophie message', async ({ page }) => {
  74  |   await page.clock.install({ time: new Date('2026-10-08T08:40:00Z') })
  75  |   await page.goto('/')
  76  |   await page.getByRole('button', { name: 'Enter the archive' }).click()
  77  |   await page.clock.runFor(20_000)
  78  |   await page.getByRole('button', { name: 'Open unknown message' }).click()
  79  |   await page.getByRole('button', { name: 'I can listen for a minute.' }).click()
  80  |   await page.getByRole('button', { name: 'Send', exact: true }).click()
  81  |   await page.clock.runFor(15_000)
  82  |   await page.getByLabel('Your name').fill('Rae')
  83  |   await page.getByRole('button', { name: 'Send', exact: true }).click()
  84  |   await page.clock.runFor(15_000)
  85  |   await page.getByRole('button', { name: 'Just use my name' }).click()
  86  |   await page.getByRole('button', { name: 'Send', exact: true }).click()
  87  |   await page.clock.runFor(15_000)
  88  |   await page.getByRole('button', { name: 'Who is Daniel?' }).click()
  89  |   await page.getByRole('button', { name: 'Send', exact: true }).click()
  90  |   await page.clock.runFor(50_000)
  91  |   await page.getByRole('button', { name: 'Back to inbox' }).click()
  92  |   await page.getByRole('button', { name: 'Open FIND DANIEL group conversation' }).click()
  93  |   await page.getByRole('button', { name: "I don't know Daniel. Sophie contacted me, and I'm trying to understand why." }).click()
  94  |   await page.getByRole('button', { name: 'Send', exact: true }).click()
  95  |   await page.clock.runFor(30_000)
  96  |   await page.getByRole('button', { name: "I won't ask anyone to share private information here." }).click()
  97  |   await page.getByRole('button', { name: 'Send', exact: true }).click()
  98  |   await page.clock.runFor(75_000)
  99  |   await expect(page.getByText('Lucas left the group.')).toHaveCount(1)
  100 |   await expect(page.getByText('Maya left the group.')).toHaveCount(1)
  101 |   await page.getByRole('button', { name: 'Back to inbox' }).click()
  102 |   await page.getByRole('button', { name: 'Open Sophie Mercer conversation' }).click()
  103 |   await page.getByRole('button', { name: 'Send it. I will look, but I cannot promise what it means.' }).click()
  104 |   await page.getByRole('button', { name: 'Send', exact: true }).click()
  105 |   await page.clock.runFor(18_000)
  106 |   await finishPrivateExpansion(page)
  107 |   await expect(page.getByRole('button', { name: 'Open later handwritten note' })).toBeVisible()
  108 |   await page.getByRole('button', { name: 'Save the later note to your private evidence' }).click()
  109 |   await page.getByRole('button', { name: "I'll see what I can find." }).click()
  110 |   await page.getByRole('button', { name: 'Send', exact: true }).click()
  111 |   await page.clock.runFor(15_000)
  112 |   await page.getByRole('button', { name: 'When did you last see him?' }).click()
  113 |   await page.getByRole('button', { name: 'Send', exact: true }).click()
  114 |   await page.clock.runFor(30_000)
  115 |   await page.getByRole('button', { name: "I'll inspect the request, but I won't assume it's Daniel's." }).click()
  116 |   await page.getByRole('button', { name: 'Send', exact: true }).click()
  117 |   await page.clock.runFor(25_000)
  118 |   await page.getByRole('button', { name: 'Back to inbox' }).click()
  119 |   await page.getByRole('button', { name: 'Back to home' }).click()
  120 |   await page.getByRole('button', { name: 'Open The Archive' }).click()
  121 |   await expect(page.getByText('Recovery package available')).toBeVisible()
  122 |   await page.getByRole('button', { name: 'Inspect permission & origin' }).click()
  123 |   await page.getByRole('button', { name: 'Restore The Archive' }).click()
  124 |   await finishRecoveredConversation(page, true)
  125 |   await expect(page.getByRole('button', { name: "Open Sophie's message", exact: true })).toBeVisible()
```