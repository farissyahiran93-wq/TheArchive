# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: character-followups.spec.ts >> public-fact private contacts and consented group reunion persist without duplicate members
- Location: tests\e2e\character-followups.spec.ts:3:1

# Error details

```
Test timeout of 90000ms exceeded.
```

```
Error: locator.click: Test timeout of 90000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Open Messages' }).first()

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
  24  |   await page.goto('/?legacyopening=1')
  25  |   await page.getByRole('button', { name: 'Enter the archive' }).click()
  26  |   await page.evaluate(() => document.dispatchEvent(new Event('visibilitychange')))
  27  |   await page.clock.runFor(15_000)
> 28  |   await page.getByRole('button', { name: 'Open Messages' }).first().click()
      |                                                                     ^ Error: locator.click: Test timeout of 90000ms exceeded.
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
  94  |   await page.goto('/?legacyopening=1')
  95  |   await page.getByRole('button', { name: 'Enter the archive' }).click()
  96  |   await page.evaluate(() => document.dispatchEvent(new Event('visibilitychange')))
  97  |   await page.clock.runFor(15_000)
  98  |   await page.getByRole('button', { name: 'Open Bulletin' }).last().click()
  99  |   await page.getByText("Maya's case-contact referral · Bulletin return inbox").click()
  100 |   await expect(page.getByText('Their case-contact routes are in Contacts.', { exact: false })).toBeVisible()
  101 |   await page.getByRole('button', { name: 'Back to home' }).click()
  102 |   await page.getByRole('button', { name: 'Open Messages' }).first().click()
  103 |   await expect(page.getByRole('button', { name: 'Open Maya Chen conversation' })).toHaveCount(0)
  104 |   await expect(page.getByRole('button', { name: 'Open Lucas Grey conversation' })).toBeVisible()
  105 | })
  106 | 
```