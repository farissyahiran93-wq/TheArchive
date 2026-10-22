# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: character-followups.spec.ts >> declining Maya Messages keeps her referral readable in the Bulletin inbox
- Location: tests\e2e\character-followups.spec.ts:76:1

# Error details

```
Test timeout of 90000ms exceeded.
```

```
Error: locator.click: Test timeout of 90000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Open Bulletin' }).last()

```

# Page snapshot

```yaml
- generic [ref=f1e4]:
  - generic "Greyhaven story time 8 October 2026 09:49" [ref=f1e5]: 9:49
  - main "Alex's home screen" [ref=f1e22]:
    - generic [ref=f1e23]:
      - generic [ref=f1e24]:
        - generic [ref=f1e25]: Alex's phone
        - button "Lock phone" [ref=f1e26] [cursor=pointer]
      - region "Home widgets" [ref=f1e31]:
        - button "Open photo widget" [ref=f1e32] [cursor=pointer]:
          - generic [ref=f1e33]:
            - generic [ref=f1e34]: GREYHAVEN
            - strong [ref=f1e35]: Along the water
        - button "Open calendar widget" [ref=f1e36] [cursor=pointer]:
          - strong [ref=f1e37]: OCTOBER
          - generic [aria-hidden] [ref=f1e38]:
            - generic [ref=f1e39]: S
            - generic [ref=f1e40]: M
            - generic [ref=f1e41]: T
            - generic [ref=f1e42]: W
            - generic [ref=f1e43]: T
            - generic [ref=f1e44]: F
            - generic [ref=f1e45]: S
            - generic [ref=f1e50]: "1"
            - generic [ref=f1e51]: "2"
            - generic [ref=f1e52]: "3"
            - generic [ref=f1e53]: "4"
            - generic [ref=f1e54]: "5"
            - generic [ref=f1e55]: "6"
            - generic [ref=f1e56]: "7"
            - generic [ref=f1e57]: "8"
            - generic [ref=f1e58]: "9"
            - generic [ref=f1e59]: "10"
            - generic [ref=f1e60]: "11"
            - generic [ref=f1e61]: "12"
            - generic [ref=f1e62]: "13"
            - generic [ref=f1e63]: "14"
            - generic [ref=f1e64]: "15"
            - generic [ref=f1e65]: "16"
            - generic [ref=f1e66]: "17"
            - generic [ref=f1e67]: "18"
            - generic [ref=f1e68]: "19"
            - generic [ref=f1e69]: "20"
            - generic [ref=f1e70]: "21"
            - generic [ref=f1e71]: "22"
            - generic [ref=f1e72]: "23"
            - generic [ref=f1e73]: "24"
            - generic [ref=f1e74]: "25"
            - generic [ref=f1e75]: "26"
            - generic [ref=f1e76]: "27"
            - generic [ref=f1e77]: "28"
            - generic [ref=f1e78]: "29"
            - generic [ref=f1e79]: "30"
            - generic [ref=f1e80]: "31"
      - region "Home page 1 apps" [ref=f1e81]:
        - button "Open The Archive" [ref=f1e82] [cursor=pointer]:
          - generic [ref=f1e87]: The Archive
        - button "Open Photos" [ref=f1e88] [cursor=pointer]:
          - generic [ref=f1e100]: Photos
        - button "Open Calendar" [ref=f1e101] [cursor=pointer]:
          - generic [ref=f1e103]:
            - generic [ref=f1e104]: THU
            - strong [ref=f1e105]: "8"
          - generic [ref=f1e106]: Calendar
        - button "Open Files" [ref=f1e107] [cursor=pointer]:
          - generic [ref=f1e112]: Files
        - button "Open Notes" [ref=f1e113] [cursor=pointer]:
          - generic [ref=f1e119]: Notes
        - button "Open Maps" [ref=f1e120] [cursor=pointer]:
          - generic [ref=f1e130]: Maps
        - button "Open Search" [ref=f1e131] [cursor=pointer]:
          - generic [ref=f1e146]: Search
        - button "Open Contacts" [ref=f1e147] [cursor=pointer]:
          - generic [ref=f1e156]: Contacts
      - button "Continue MIRROR conversation" [ref=f1e157] [cursor=pointer]
    - generic [ref=f1e158]:
      - generic "Home pages" [ref=f1e159]:
        - button "Show home page 1" [ref=f1e160] [cursor=pointer]
        - button "Show home page 2" [ref=f1e162] [cursor=pointer]
      - navigation "Quick apps" [ref=f1e164]:
        - button "Open Calls" [ref=f1e165] [cursor=pointer]
        - button "Open Messages" [ref=f1e169] [cursor=pointer]:
          - generic [ref=f1e173]: "1"
        - button "Open Contacts" [ref=f1e174] [cursor=pointer]
  - navigation "Phone navigation" [ref=f1e183]:
    - button "Go home" [disabled] [ref=f1e184]
```

# Test source

```ts
  1   | import { expect, test } from '@playwright/test'
  2   | 
  3   | test('public-fact private contacts and consented group reunion persist without duplicate members', async ({ page }) => {
  4   |   await page.clock.install({ time: new Date('2026-10-08T09:45:00Z') })
  5   |   await page.goto('/?legacyopening=1')
  6   |   await page.getByRole('button', { name: "Open Sophie's new message" }).click()
  7   |   await page.getByLabel('Your name').fill('Alex')
  8   |   await page.getByRole('button', { name: 'Set up phone' }).click()
  9   |   await page.evaluate(async () => {
  10  |     const db = await new Promise<IDBDatabase>((resolve, reject) => { const request = indexedDB.open('the-archive-reboot', 1); request.onsuccess = () => resolve(request.result); request.onerror = () => reject(request.error) })
  11  |     await new Promise<void>((resolve, reject) => {
  12  |       const tx = db.transaction('saves', 'readwrite')
  13  |       const store = tx.objectStore('saves')
  14  |       const request = store.get('primary')
  15  |       request.onsuccess = () => {
  16  |         const save = request.result
  17  |         store.put({ ...save, e01: { ...save.e01, sceneId: 'E01-S17', s16OfferSeen: true }, knowledge: { ...save.knowledge, player: [...save.knowledge.player, 'K01'] }, deliveredEvents: [...save.deliveredEvents, 'EV-E01-S12-EDITOR-CHECK', 'CONN-E01-01'], prologue: { ...save.prologue, dialogueVersion: 4, stage: 'complete', step: 2, noteSeen: true, restored: true, indexCompared: true, social: { creator: 'sophie', createdAt: Date.now() - 120_000, phase: 'done', members: ['maya','player'], messages: [{ id: 'OPEN-GROUP-LUCAS-1', sender: 'lucas', text: 'What is your source?', at: Date.now() - 60_000 }, { id: 'OPEN-GROUP-LUCAS-LEFT', sender: 'system', text: 'Lucas left the group.', at: Date.now() - 30_000 }] } } }, 'primary')
  18  |       }
  19  |       tx.oncomplete = () => resolve()
  20  |       tx.onerror = () => reject(tx.error)
  21  |     })
  22  |     db.close()
  23  |   })
  24  |   await page.goto('/')
  25  |   await page.getByRole('button', { name: 'Enter the archive' }).click()
  26  |   await page.evaluate(() => document.dispatchEvent(new Event('visibilitychange')))
  27  |   await page.clock.runFor(15_000)
  28  |   await page.getByRole('button', { name: 'Open Messages' }).first().click()
  29  |   await expect(page.getByRole('button', { name: 'Open Lucas Grey conversation' })).toBeVisible()
  30  |   await expect(page.getByRole('button', { name: 'Open Eli Ward conversation' })).toHaveCount(0)
  31  |   await page.getByRole('button', { name: 'Open Lucas Grey conversation' }).click()
  32  |   await page.getByRole('button', { name: 'Send introduction' }).click()
  33  |   await page.getByRole('button', { name: 'Back to inbox' }).click()
  34  |   await page.clock.runFor(12_000)
  35  |   await page.getByRole('button', { name: 'Open Lucas Grey conversation' }).click()
  36  |   await expect(page.getByText('I left because a cropped page was starting to sound like a verdict.', { exact: false })).toBeVisible()
  37  |   await page.getByRole('button', { name: 'Can you verify either full version?' }).click()
  38  |   await page.getByRole('button', { name: 'Send', exact: true }).click()
  39  |   await page.clock.runFor(12_000)
  40  |   await page.getByRole('button', { name: 'Back to inbox' }).click()
  41  |   await expect(page.getByRole('button', { name: 'Open Eli Ward conversation' })).toBeVisible()
  42  |   await expect(page.getByRole('button', { name: 'Open Nora Vance conversation' })).toBeVisible()
  43  |   await page.clock.runFor(12_000)
  44  |   await page.getByRole('button', { name: 'Open FIND DANIEL group conversation' }).click()
  45  |   await expect(page.getByText('we can bring him back here to compare only the two public Bus 4 views', { exact: false })).toBeVisible()
  46  |   await page.getByRole('button', { name: 'Keep the conversation private for now.' }).click()
  47  |   await page.getByRole('button', { name: 'Send', exact: true }).click()
  48  |   await page.getByRole('button', { name: 'Yes. Invite Lucas to compare the public fields only.' }).click()
  49  |   await page.getByRole('button', { name: 'Send', exact: true }).click()
  50  |   await page.clock.runFor(12_000)
  51  |   await expect(page.getByText('Lucas rejoined FIND DANIEL.')).toHaveCount(1)
  52  |   await page.reload()
  53  |   await page.getByRole('button', { name: 'Enter the archive' }).click()
  54  |   await page.getByRole('button', { name: 'Open Messages' }).first().click()
  55  |   await page.getByRole('button', { name: 'Open FIND DANIEL group conversation' }).click()
  56  |   await expect(page.getByText('Lucas rejoined FIND DANIEL.')).toHaveCount(1)
  57  |   await page.getByRole('button', { name: 'Back to inbox' }).click()
  58  |   await page.getByRole('button', { name: 'Open Eli Ward conversation' }).click()
  59  |   await page.getByRole('button', { name: 'Send introduction' }).click()
  60  |   await page.clock.runFor(12_000)
  61  |   await expect(page.getByText("It can't recreate the missing bytes.", { exact: false })).toBeVisible()
  62  |   await page.getByRole('button', { name: 'Does a damaged E—I field identify a person?' }).click()
  63  |   await page.getByRole('button', { name: 'Send', exact: true }).click()
  64  |   await page.clock.runFor(12_000)
  65  |   await expect(page.getByText('Check the complete field and its source', { exact: false })).toBeVisible()
  66  |   await page.getByRole('button', { name: 'Back to inbox' }).click()
  67  |   await page.getByRole('button', { name: 'Open Nora Vance conversation' }).click()
  68  |   await page.getByRole('button', { name: 'Send introduction' }).click()
  69  |   await page.clock.runFor(12_000)
  70  |   await page.getByRole('button', { name: 'What can I infer from that difference?' }).click()
  71  |   await page.getByRole('button', { name: 'Send', exact: true }).click()
  72  |   await page.clock.runFor(12_000)
  73  |   await expect(page.getByText('Only that the public views differ.', { exact: false })).toBeVisible()
  74  | })
  75  | 
  76  | test('declining Maya Messages keeps her referral readable in the Bulletin inbox', async ({ page }) => {
  77  |   await page.clock.install({ time: new Date('2026-10-08T09:45:00Z') })
  78  |   await page.goto('/?legacyopening=1')
  79  |   await page.getByRole('button', { name: "Open Sophie's new message" }).click()
  80  |   await page.getByLabel('Your name').fill('Alex')
  81  |   await page.getByRole('button', { name: 'Set up phone' }).click()
  82  |   await page.evaluate(async () => {
  83  |     const db = await new Promise<IDBDatabase>((resolve, reject) => { const request = indexedDB.open('the-archive-reboot', 1); request.onsuccess = () => resolve(request.result); request.onerror = () => reject(request.error) })
  84  |     await new Promise<void>((resolve, reject) => {
  85  |       const tx = db.transaction('saves', 'readwrite')
  86  |       const store = tx.objectStore('saves')
  87  |       const request = store.get('primary')
  88  |       request.onsuccess = () => { const save = request.result; store.put({ ...save, e01: { ...save.e01, sceneId: 'E01-S17', s16OfferSeen: true, messagesConsent: false }, knowledge: { ...save.knowledge, player: [...save.knowledge.player, 'K01'] }, deliveredEvents: [...save.deliveredEvents, 'EV-E01-S12-EDITOR-CHECK'], prologue: { ...save.prologue, dialogueVersion: 4, stage: 'complete', step: 2, noteSeen: true, restored: true, indexCompared: true, social: { creator: 'sophie', createdAt: Date.now() - 120_000, phase: 'done', members: ['maya','player'], messages: [{ id: 'OPEN-GROUP-LUCAS-1', sender: 'lucas', text: 'What is your source?' }] } } }, 'primary') }
  89  |       tx.oncomplete = () => resolve()
  90  |       tx.onerror = () => reject(tx.error)
  91  |     })
  92  |     db.close()
  93  |   })
  94  |   await page.goto('/')
  95  |   await page.getByRole('button', { name: 'Enter the archive' }).click()
  96  |   await page.evaluate(() => document.dispatchEvent(new Event('visibilitychange')))
  97  |   await page.clock.runFor(15_000)
> 98  |   await page.getByRole('button', { name: 'Open Bulletin' }).last().click()
      |                                                                    ^ Error: locator.click: Test timeout of 90000ms exceeded.
  99  |   await page.getByText("Maya's case-contact referral · Bulletin return inbox").click()
  100 |   await expect(page.getByText('Their case-contact routes are in Contacts.', { exact: false })).toBeVisible()
  101 |   await page.getByRole('button', { name: 'Back to home' }).click()
  102 |   await page.getByRole('button', { name: 'Open Messages' }).first().click()
  103 |   await expect(page.getByRole('button', { name: 'Open Maya Chen conversation' })).toHaveCount(0)
  104 |   await expect(page.getByRole('button', { name: 'Open Lucas Grey conversation' })).toBeVisible()
  105 | })
  106 | 
```