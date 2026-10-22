# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chapter2-access.spec.ts >> Unknown branches, explicit Send, retained decline, consented install, recovery and group readiness
- Location: tests\e2e\chapter2-access.spec.ts:58:1

# Error details

```
Error: locator.click: Error: strict mode violation: getByRole('button', { name: 'NOT NOW', exact: true }) resolved to 2 elements:
    1) <button class="opening-choice">NOT NOW</button> aka getByRole('button', { name: 'NOT NOW' }).first()
    2) <button class="opening-choice">NOT NOW</button> aka getByRole('dialog', { name: 'Recover recently deleted' }).getByRole('button', { name: 'NOT NOW' })

Call log:
  - waiting for getByRole('button', { name: 'NOT NOW', exact: true })

```

# Page snapshot

```yaml
- generic [ref=f2e4]:
  - generic "Local time 08:54 PM" [ref=f2e5]: 8:54 PM
  - region "Daniel Mercer's mirrored phone" [ref=f2e22]:
    - generic [ref=f2e23]:
      - button "Back to The Archive" [ref=f2e24] [cursor=pointer]: The Archive
      - generic [ref=f2e27]: MIRRORED DATA · READ ONLY
    - generic "Static snapshot clock" [ref=f2e28]:
      - text: 9:41
      - generic [ref=f2e29]: Offline snapshot
    - generic [ref=f2e30]:
      - button "Back in mirror" [ref=f2e31] [cursor=pointer]
      - generic [ref=f2e34]:
        - strong [ref=f2e35]: Deleted
        - generic [ref=f2e36]: Historical snapshot · Read only
    - generic [ref=f2e37]:
      - heading "Recently Deleted" [level=2] [ref=f2e38]
      - paragraph [ref=f2e39]: Daniel Mercer · Mirrored device
      - generic [ref=f2e40]:
        - strong [ref=f2e41]: 3 Messages
        - strong [ref=f2e42]: 2 Photos
        - strong [ref=f2e43]: 1 File
      - paragraph [ref=f2e44]: 6 deleted items have recoverable metadata. Their contents are currently unavailable.
      - heading "Content reconstruction" [level=3] [ref=f2e45]
      - paragraph [ref=f2e46]: "Estimated processing time: 25 minutes"
      - paragraph [ref=f2e47]: "Test preview: recovery opens immediately."
      - button "START RECOVERY" [active] [ref=f2e48] [cursor=pointer]
      - button "INSPECT RECOVERY DETAILS" [ref=f2e49] [cursor=pointer]
      - button "NOT NOW" [ref=f2e50] [cursor=pointer]
    - button "Mirror home" [ref=f2e51] [cursor=pointer]
    - dialog "Recover recently deleted confirmation" [ref=f2e56]:
      - generic [ref=f2e57]:
        - heading "RECOVER RECENTLY DELETED?" [level=2] [ref=f2e58]
        - paragraph [ref=f2e59]: 6 items have recoverable metadata. Recovery quality is unknown.
        - paragraph [ref=f2e60]: Test preview opens immediately.
        - button "START — OPEN NOW" [ref=f2e61] [cursor=pointer]
        - button "NOT NOW" [ref=f2e62] [cursor=pointer]
  - navigation "Phone navigation" [ref=f2e63]:
    - button "Go home" [ref=f2e64] [cursor=pointer]
```

# Test source

```ts
  2   | import { sceneAt, sceneNow, seedScene, settleScene } from './scene01-helper'
  3   | import { openScene03, scene01Choices, sendScene01Choice } from '../../src/game/scene01'
  4   | import { accessChoices, chapter2Access } from '../../src/game/chapter2Access'
  5   | import type { GameSave } from '../../src/game/types'
  6   | 
  7   | function completed() {
  8   |   let s = settleScene(sendScene01Choice(sceneAt('G13'), 'a', '', true, sceneNow(sceneAt('G13'))))
  9   |   s = settleScene(openScene03(s, sceneNow(s)))
  10  |   for (let i = 0; i < 60; i++) {
  11  |     if (s.prologue!.scene01!.privateScene03?.complete) return s
  12  |     const options = scene01Choices(s)
  13  |     s = settleScene(sendScene01Choice(s, options[0].id, '', true, sceneNow(s)))
  14  |   }
  15  |   throw new Error('Private scene did not complete')
  16  | }
  17  | function packageSave() {
  18  |   let s = chapter2Access(completed(), { type: 'tick' }, sceneNow(completed())+7000)
  19  |   for (let i = 0; i < 30; i++) {
  20  |     if (s.chapter2Access?.node === 'PACKAGE') return s
  21  |     const option = accessChoices(s)[0]
  22  |     const now = sceneNow(s)+i*100000
  23  |     s = chapter2Access(chapter2Access(s, { type: 'draft', id: option.id }, now), { type: 'send', id: option.id }, now)
  24  |     for (let j = 0; j < 100 && s.chapter2Access?.queue; j++) s = chapter2Access(s, { type: 'tick' }, s.chapter2Access.queue.dueAt)
  25  |   }
  26  |   throw new Error('No package')
  27  | }
  28  | async function stored(page: Page): Promise<GameSave> {
  29  |   return page.evaluate(async () => {
  30  |     const pending = sessionStorage.getItem('the-archive-reboot:pending-save:v1')
  31  |     if (pending) return JSON.parse(pending).save
  32  |     const db = await new Promise<IDBDatabase>(resolve => { const r = indexedDB.open('the-archive-reboot',1); r.onsuccess = () => resolve(r.result) })
  33  |     const save = await new Promise<GameSave>(resolve => { const r = db.transaction('saves').objectStore('saves').get('primary'); r.onsuccess = () => resolve(r.result) })
  34  |     db.close(); return save
  35  |   })
  36  | }
  37  | async function openUnknown(page: Page) {
  38  |   await page.getByRole('button', { name: 'Open Messages', exact: true }).first().click()
  39  |   await page.getByRole('button', { name: 'Open UNKNOWN conversation', exact: true }).click()
  40  | }
  41  | async function send(page: Page, text: string) {
  42  |   await page.getByRole('button', { name: text, exact: true }).click()
  43  |   await page.getByRole('button', { name: 'Send', exact: true }).click()
  44  |   await page.clock.runFor(90000)
  45  | }
  46  | 
  47  | for (const app of ['Home','Contacts','The Archive','Messages']) test(`Unknown arrives above ${app} after Sophie completes, without opening itself`, async ({ page }) => {
  48  |   await seedScene(page, completed())
  49  |   if (app !== 'Home') await page.getByRole('button', { name: `Open ${app}`, exact: true }).first().click()
  50  |   await page.clock.runFor(7100)
  51  |   await expect(page.getByRole('complementary', { name: 'Incoming notification' })).toContainText("You're looking in the wrong place.")
  52  |   await expect(page.getByRole('region', { name: 'UNKNOWN conversation', exact: true })).toHaveCount(0)
  53  |   const s = await stored(page)
  54  |   expect(s.chapter2Access?.messages).toHaveLength(1)
  55  |   expect(s.prologue!.scene01!.messages.at(-1)?.text).toBe('Goodnight :)')
  56  | })
  57  | 
  58  | test('Unknown branches, explicit Send, retained decline, consented install, recovery and group readiness', async ({ page }) => {
  59  |   test.setTimeout(180000)
  60  |   await page.setViewportSize({ width: 320, height: 720 })
  61  |   await seedScene(page, completed())
  62  |   await page.clock.runFor(7100)
  63  |   await openUnknown(page)
  64  |   const path = ['Who is this?', "That doesn't answer anything.", 'Then how do you know about him?', 'Have you been reading my messages?', 'Prove it.', 'What do you want in return?', 'That sounds like a serious invasion of privacy.', "How do I know you're not manipulating what I see?"]
  65  |   for (const text of path) await send(page, text)
  66  |   await expect(page.getByText('INCOMING ACCESS PACKAGE', { exact: true })).toBeVisible()
  67  |   await send(page, 'Ask one more question')
  68  |   await send(page, 'What exactly will change on my phone?')
  69  |   await expect(page.getByText("Messages gets a passive relay component. It won't have anything to display until a relay is available.", { exact: true })).toBeVisible()
  70  |   await send(page, 'REJECT — Decline the package')
  71  |   expect((await stored(page)).chapter2Access).toMatchObject({ packageStatus: 'declined', installAuthorized: false, mirrorUnlocked: false, spyInstalled: false })
  72  |   await expect(page.getByRole('button', { name: 'ACCEPT PACKAGE', exact: true })).toHaveCount(0)
  73  |   await page.reload()
  74  |   await page.getByRole('button', { name: 'Enter the archive', exact: true }).click()
  75  |   await openUnknown(page)
  76  |   await page.getByRole('button', { name: 'Inspect package again', exact: true }).click()
  77  |   await page.getByRole('button', { name: 'ACCEPT PACKAGE', exact: true }).click()
  78  |   await page.getByRole('button', { name: 'Send', exact: true }).click()
  79  |   await page.getByRole('button', { name: 'CANCEL', exact: true }).click()
  80  |   expect((await stored(page)).chapter2Access?.installAuthorized).toBe(false)
  81  |   await page.getByRole('button', { name: 'ACCEPT PACKAGE', exact: true }).click()
  82  |   await page.getByRole('button', { name: 'Send', exact: true }).click()
  83  |   await page.getByRole('button', { name: 'INSTALL EXTENSION', exact: true }).click()
  84  |   await page.clock.runFor(90000)
  85  |   await send(page, "Don't mistake this for trust.")
  86  |   await send(page, 'Why should I trust any of this?')
  87  |   expect((await stored(page)).chapter2Access).toMatchObject({ installCompleted: true, unknownOffline: true, spyInstalled: true, relayAvailable: false })
  88  |   await page.getByRole('button', { name: 'Open Messages', exact: true }).first().click()
  89  |   await page.getByRole('button', { name: 'Relay status: standby', exact: true }).click()
  90  |   await expect(page.getByRole('dialog', { name: 'SPY MODE', exact: true })).toContainText('Nothing is currently being intercepted.')
  91  |   await page.getByRole('button', { name: 'GOT IT', exact: true }).click()
  92  |   await page.getByRole('button', { name: 'Back to home', exact: true }).click()
  93  |   await page.getByRole('button', { name: 'Open The Archive', exact: true }).click()
  94  |   await page.getByRole('button', { name: 'OPEN PHONE MIRROR', exact: true }).click()
  95  |   await expect(page.getByText('Device: NOT CONNECTED', { exact: false })).toBeVisible()
  96  |   await page.getByRole('button', { name: 'ENTER MIRROR', exact: true }).click()
  97  |   await page.getByRole('button', { name: 'Open mirrored Mail', exact: true }).click()
  98  |   await page.getByRole('button', { name: /Storage Notification/ }).click()
  99  |   await page.getByRole('button', { name: 'Mirror home', exact: true }).click()
  100 |   await page.getByRole('button', { name: 'Open mirrored Deleted', exact: true }).click()
  101 |   await page.getByRole('button', { name: 'START RECOVERY', exact: true }).click()
> 102 |   await page.getByRole('button', { name: 'NOT NOW', exact: true }).click()
      |                                                                    ^ Error: locator.click: Error: strict mode violation: getByRole('button', { name: 'NOT NOW', exact: true }) resolved to 2 elements:
  103 |   expect((await stored(page)).chapter2Access?.recovery).toBeUndefined()
  104 |   await page.getByRole('button', { name: 'START RECOVERY', exact: true }).click()
  105 |   await page.getByRole('button', { name: 'START — OPEN NOW', exact: true }).click()
  106 |   const recovery = (await stored(page)).chapter2Access!.recovery!
  107 |   expect(recovery.dueAt-recovery.startedAt).toBe(1500000)
  108 |   await page.clock.runFor(19000)
  109 |   await expect(page.getByRole('complementary', { name: 'Incoming notification' })).toContainText('FIND DANIEL')
  110 |   await expect(page.getByRole('heading', { name: 'Recently Deleted', exact: true })).toBeVisible()
  111 |   await page.clock.runFor(20000)
  112 |   await page.reload()
  113 |   await page.getByRole('button', { name: 'Enter the archive', exact: true }).click()
  114 |   await page.getByRole('button', { name: 'Open Messages', exact: true }).first().click()
  115 |   await expect(page.getByRole('button', { name: 'Open FIND DANIEL group conversation', exact: true })).toHaveCount(1)
  116 |   await page.getByRole('button', { name: 'Open FIND DANIEL group conversation', exact: true }).click()
  117 |   await expect(page.getByText('Can we start?', { exact: true })).toBeVisible()
  118 |   const final = await stored(page)
  119 |   expect(final.chapter2Access?.complete).toBe(true)
  120 |   expect(final.chapter2Access?.recovery).toEqual(recovery)
  121 |   expect(final.chapter2Access?.groupMessages.filter(m => m.sender === 'player')).toHaveLength(0)
  122 |   expect(final.deliveredEvents.filter(id => id === 'C2-INSTALL-BEGIN')).toHaveLength(1)
  123 |   await expect(page.getByRole('button', { name: 'Send', exact: true })).toHaveCount(0)
  124 |   await page.screenshot({ path: test.info().outputPath('chapter2-ready-320.png') })
  125 | })
  126 | 
  127 | test('package questions are idempotent and an unsent response survives reload without sending', async ({ page }) => {
  128 |   const base = packageSave()
  129 |   await seedScene(page, base)
  130 |   await openUnknown(page)
  131 |   await send(page, 'Ask one more question')
  132 |   await send(page, 'Who made this package?')
  133 |   await send(page, 'Ask one more question')
  134 |   await expect(page.getByRole('button', { name: 'Who made this package?', exact: true })).toBeDisabled()
  135 |   await page.getByRole('button', { name: 'Back to package', exact: true }).click()
  136 |   await page.getByRole('button', { name: 'ACCEPT — Open access package', exact: true }).click()
  137 |   expect((await stored(page)).chapter2Access?.installAuthorized).toBe(false)
  138 |   await page.reload()
  139 |   await page.getByRole('button', { name: 'Enter the archive', exact: true }).click()
  140 |   expect((await stored(page)).chapter2Access?.installAuthorized).toBe(false)
  141 |   await openUnknown(page)
  142 |   expect((await stored(page)).chapter2Access?.messages.filter(m => m.text === 'Who made this package?')).toHaveLength(1)
  143 | })
  144 | 
```