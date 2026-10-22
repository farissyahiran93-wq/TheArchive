# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: phone-first-v4.spec.ts >> a saved earlier opening continues without fabricating the new unknown-number event
- Location: tests\e2e\phone-first-v4.spec.ts:130:1

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByRole('button', { name: 'Open unknown message' })
Expected: 0
Received: 1
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" getByRole('button', { name: 'Open unknown message' }) with timeout 5000ms
  - waiting for getByRole('button', { name: 'Open unknown message' })
    14 × locator resolved to 1 element
       - unexpected value "1"

```

# Page snapshot

```yaml
- generic [ref=f1e4]:
  - generic "Greyhaven story time 8 October 2026 08:41" [ref=f1e5]: 8:41
  - region "Sophie Mercer first contact" [ref=f1e22]:
    - generic [ref=f1e23]:
      - button "Back" [ref=f1e24] [cursor=pointer]
      - generic [ref=f1e28]:
        - strong [ref=f1e29]: Sophie Mercer
        - generic [ref=f1e30]: Unknown number · identity unverified
    - generic [ref=f1e33]:
      - generic [ref=f1e34]: Thursday 8 October · 08:41
      - generic [ref=f1e35]: Hi. I'm sorry for messaging out of nowhere.
      - generic [ref=f1e36]: Sorry. I know you don't know me. Is this a bad time?
      - generic [ref=f1e37]: My name is Sophie Mercer.
      - generic [ref=f1e38]: My brother Daniel gave me this number before he disappeared.
      - generic [ref=f1e39]: He said if anything happened to him, I should contact you.
      - generic [ref=f1e40]: He hasn't come home in three days.
      - generic [ref=f1e41]: Who is Daniel Mercer?
      - generic [ref=f1e42]: My older brother. He worked with old civic records.
      - generic [ref=f1e43]: There is a small chat with people close to Daniel. I could add you, if you're comfortable. They don't know why he left your number either.
    - generic [ref=f1e44]:
      - generic [ref=f1e45]: Open the photo Sophie sent
      - button "You can add me. I will listen first." [ref=f1e46] [cursor=pointer]
      - button "Give me a moment before you add me." [ref=f1e47] [cursor=pointer]
      - button "Send message" [disabled] [ref=f1e48]
  - navigation "Phone navigation" [ref=f1e52]:
    - button "Go home" [ref=f1e53] [cursor=pointer]
```

# Test source

```ts
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
  131 |   await page.goto('/?legacyopening=1')
  132 |   await page.getByRole('button', { name: "Open Sophie's new message" }).click()
  133 |   await page.getByLabel('Your name').fill('Alex')
  134 |   await page.getByRole('button', { name: 'Set up phone' }).click()
  135 |   await page.getByRole('button', { name: 'Who is Daniel Mercer?' }).click()
  136 |   await page.getByRole('button', { name: 'Send message' }).click()
  137 |   await page.goto('/')
  138 |   await page.getByRole('button', { name: 'Enter the archive' }).click()
  139 |   await expect(page.getByRole('region', { name: 'Sophie Mercer first contact' })).toBeVisible()
  140 |   await expect(page.getByRole('button', { name: 'You can add me. I will listen first.' })).toBeVisible()
> 141 |   await expect(page.getByRole('button', { name: 'Open unknown message' })).toHaveCount(0)
      |                                                                            ^ Error: expect(locator).toHaveCount(expected) failed
  142 |   await page.getByRole('button', { name: 'Go home' }).click()
  143 |   await expect(page.getByRole('main', { name: "Alex's home screen" })).toBeVisible()
  144 | })
  145 | 
```