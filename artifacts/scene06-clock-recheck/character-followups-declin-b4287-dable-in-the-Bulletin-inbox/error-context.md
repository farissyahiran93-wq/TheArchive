# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: character-followups.spec.ts >> declining Maya Messages keeps her referral readable in the Bulletin inbox
- Location: tests\e2e\character-followups.spec.ts:79:1

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
    - generic [ref=f1e41]:
      - generic [ref=f1e42]: Choose your iMessage reply
      - button "Can you tell me a little about yourself?" [ref=f1e43] [cursor=pointer]
      - button "What do you need from me?" [ref=f1e44] [cursor=pointer]
      - button "I can talk for a minute." [ref=f1e45] [cursor=pointer]
      - button "Who is Daniel Mercer?" [ref=f1e46] [cursor=pointer]
      - button "What do you mean, disappeared?" [ref=f1e47] [cursor=pointer]
      - button "Why would he give you my number?" [ref=f1e48] [cursor=pointer]
      - button "Send message" [disabled] [ref=f1e49]
  - navigation "Phone navigation" [ref=f1e53]:
    - button "Go home" [ref=f1e54] [cursor=pointer]
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
  9   |   // Stop authored timers and finish the registration write before replacing the fixture.
  10  |   await page.clock.pauseAt(await page.evaluate(() => Date.now()+250))
  11  |   await expect.poll(() => page.evaluate(() => sessionStorage.getItem('the-archive-reboot:pending-save:v1'))).toBeNull()
  12  |   await page.evaluate(async () => {
  13  |     const db = await new Promise<IDBDatabase>((resolve, reject) => { const request = indexedDB.open('the-archive-reboot', 1); request.onsuccess = () => resolve(request.result); request.onerror = () => reject(request.error) })
  14  |     await new Promise<void>((resolve, reject) => {
  15  |       const tx = db.transaction('saves', 'readwrite')
  16  |       const store = tx.objectStore('saves')
  17  |       const request = store.get('primary')
  18  |       request.onsuccess = () => {
  19  |         const save = request.result
  20  |         store.put({ ...save, e01: { ...save.e01, sceneId: 'E01-S17', s16OfferSeen: true }, knowledge: { ...save.knowledge, player: [...save.knowledge.player, 'K01'] }, deliveredEvents: [...save.deliveredEvents, 'EV-E01-S12-EDITOR-CHECK', 'CONN-E01-01'], prologue: { ...save.prologue, dialogueVersion: 4, stage: 'complete', step: 2, noteSeen: true, restored: true, indexCompared: true, social: { creator: 'sophie', createdAt: Date.now() - 120_000, phase: 'done', members: ['maya','player'], messages: [{ id: 'OPEN-GROUP-LUCAS-1', sender: 'lucas', text: 'What is your source?', at: Date.now() - 60_000 }, { id: 'OPEN-GROUP-LUCAS-LEFT', sender: 'system', text: 'Lucas left the group.', at: Date.now() - 30_000 }] } } }, 'primary')
  21  |       }
  22  |       tx.oncomplete = () => resolve()
  23  |       tx.onerror = () => reject(tx.error)
  24  |     })
  25  |     db.close()
  26  |   })
  27  |   await page.goto('/?legacyopening=1')
  28  |   await page.getByRole('button', { name: 'Enter the archive' }).click()
  29  |   await page.evaluate(() => document.dispatchEvent(new Event('visibilitychange')))
  30  |   await page.clock.runFor(15_000)
  31  |   await page.getByRole('button', { name: 'Open Messages' }).first().click()
  32  |   await expect(page.getByRole('button', { name: 'Open Lucas Grey conversation' })).toBeVisible()
  33  |   await expect(page.getByRole('button', { name: 'Open Eli Ward conversation' })).toHaveCount(0)
  34  |   await page.getByRole('button', { name: 'Open Lucas Grey conversation' }).click()
  35  |   await page.getByRole('button', { name: 'Send introduction' }).click()
  36  |   await page.getByRole('button', { name: 'Back to inbox' }).click()
  37  |   await page.clock.runFor(12_000)
  38  |   await page.getByRole('button', { name: 'Open Lucas Grey conversation' }).click()
  39  |   await expect(page.getByText('I left because a cropped page was starting to sound like a verdict.', { exact: false })).toBeVisible()
  40  |   await page.getByRole('button', { name: 'Can you verify either full version?' }).click()
  41  |   await page.getByRole('button', { name: 'Send', exact: true }).click()
  42  |   await page.clock.runFor(12_000)
  43  |   await page.getByRole('button', { name: 'Back to inbox' }).click()
  44  |   await expect(page.getByRole('button', { name: 'Open Eli Ward conversation' })).toBeVisible()
  45  |   await expect(page.getByRole('button', { name: 'Open Nora Vance conversation' })).toBeVisible()
  46  |   await page.clock.runFor(12_000)
  47  |   await page.getByRole('button', { name: 'Open FIND DANIEL group conversation' }).click()
  48  |   await expect(page.getByText('we can bring him back here to compare only the two public Bus 4 views', { exact: false })).toBeVisible()
  49  |   await page.getByRole('button', { name: 'Keep the conversation private for now.' }).click()
  50  |   await page.getByRole('button', { name: 'Send', exact: true }).click()
  51  |   await page.getByRole('button', { name: 'Yes. Invite Lucas to compare the public fields only.' }).click()
  52  |   await page.getByRole('button', { name: 'Send', exact: true }).click()
  53  |   await page.clock.runFor(12_000)
  54  |   await expect(page.getByText('Lucas rejoined FIND DANIEL.')).toHaveCount(1)
  55  |   await page.reload()
  56  |   await page.getByRole('button', { name: 'Enter the archive' }).click()
  57  |   await page.getByRole('button', { name: 'Open Messages' }).first().click()
  58  |   await page.getByRole('button', { name: 'Open FIND DANIEL group conversation' }).click()
  59  |   await expect(page.getByText('Lucas rejoined FIND DANIEL.')).toHaveCount(1)
  60  |   await page.getByRole('button', { name: 'Back to inbox' }).click()
  61  |   await page.getByRole('button', { name: 'Open Eli Ward conversation' }).click()
  62  |   await page.getByRole('button', { name: 'Send introduction' }).click()
  63  |   await page.clock.runFor(12_000)
  64  |   await expect(page.getByText("It can't recreate the missing bytes.", { exact: false })).toBeVisible()
  65  |   await page.getByRole('button', { name: 'Does a damaged E—I field identify a person?' }).click()
  66  |   await page.getByRole('button', { name: 'Send', exact: true }).click()
  67  |   await page.clock.runFor(12_000)
  68  |   await expect(page.getByText('Check the complete field and its source', { exact: false })).toBeVisible()
  69  |   await page.getByRole('button', { name: 'Back to inbox' }).click()
  70  |   await page.getByRole('button', { name: 'Open Nora Vance conversation' }).click()
  71  |   await page.getByRole('button', { name: 'Send introduction' }).click()
  72  |   await page.clock.runFor(12_000)
  73  |   await page.getByRole('button', { name: 'What can I infer from that difference?' }).click()
  74  |   await page.getByRole('button', { name: 'Send', exact: true }).click()
  75  |   await page.clock.runFor(12_000)
  76  |   await expect(page.getByText('Only that the public views differ.', { exact: false })).toBeVisible()
  77  | })
  78  | 
  79  | test('declining Maya Messages keeps her referral readable in the Bulletin inbox', async ({ page }) => {
  80  |   await page.clock.install({ time: new Date('2026-10-08T09:45:00Z') })
  81  |   await page.goto('/?legacyopening=1')
  82  |   await page.getByRole('button', { name: "Open Sophie's new message" }).click()
  83  |   await page.getByLabel('Your name').fill('Alex')
  84  |   await page.getByRole('button', { name: 'Set up phone' }).click()
  85  |   await page.evaluate(async () => {
  86  |     const db = await new Promise<IDBDatabase>((resolve, reject) => { const request = indexedDB.open('the-archive-reboot', 1); request.onsuccess = () => resolve(request.result); request.onerror = () => reject(request.error) })
  87  |     await new Promise<void>((resolve, reject) => {
  88  |       const tx = db.transaction('saves', 'readwrite')
  89  |       const store = tx.objectStore('saves')
  90  |       const request = store.get('primary')
  91  |       request.onsuccess = () => { const save = request.result; store.put({ ...save, e01: { ...save.e01, sceneId: 'E01-S17', s16OfferSeen: true, messagesConsent: false }, knowledge: { ...save.knowledge, player: [...save.knowledge.player, 'K01'] }, deliveredEvents: [...save.deliveredEvents, 'EV-E01-S12-EDITOR-CHECK'], prologue: { ...save.prologue, dialogueVersion: 4, stage: 'complete', step: 2, noteSeen: true, restored: true, indexCompared: true, social: { creator: 'sophie', createdAt: Date.now() - 120_000, phase: 'done', members: ['maya','player'], messages: [{ id: 'OPEN-GROUP-LUCAS-1', sender: 'lucas', text: 'What is your source?' }] } } }, 'primary') }
  92  |       tx.oncomplete = () => resolve()
  93  |       tx.onerror = () => reject(tx.error)
  94  |     })
  95  |     db.close()
  96  |   })
  97  |   await page.goto('/?legacyopening=1')
  98  |   await page.getByRole('button', { name: 'Enter the archive' }).click()
  99  |   await page.evaluate(() => document.dispatchEvent(new Event('visibilitychange')))
  100 |   await page.clock.runFor(15_000)
> 101 |   await page.getByRole('button', { name: 'Open Bulletin' }).last().click()
      |                                                                    ^ Error: locator.click: Test timeout of 90000ms exceeded.
  102 |   await page.getByText("Maya's case-contact referral · Bulletin return inbox").click()
  103 |   await expect(page.getByText('Their case-contact routes are in Contacts.', { exact: false })).toBeVisible()
  104 |   await page.getByRole('button', { name: 'Back to home' }).click()
  105 |   await page.getByRole('button', { name: 'Open Messages' }).first().click()
  106 |   await expect(page.getByRole('button', { name: 'Open Maya Chen conversation' })).toHaveCount(0)
  107 |   await expect(page.getByRole('button', { name: 'Open Lucas Grey conversation' })).toBeVisible()
  108 | })
  109 | 
```