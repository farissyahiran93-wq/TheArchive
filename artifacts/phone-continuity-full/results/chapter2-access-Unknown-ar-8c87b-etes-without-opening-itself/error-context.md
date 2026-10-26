# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chapter2-access.spec.ts >> Unknown arrives above The Archive after Sophie completes, without opening itself
- Location: tests\e2e\chapter2-access.spec.ts:47:65

# Error details

```
Test timeout of 180000ms exceeded.
```

```
Error: locator.click: Test timeout of 180000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Open The Archive', exact: true }).first()

```

# Page snapshot

```yaml
- generic [ref=f1e4]:
  - generic "Local time 08:35 PM" [ref=f1e5]: 8:35 PM
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
        - button "Open Photos" [ref=f1e82] [cursor=pointer]:
          - generic [ref=f1e94]: Photos
        - button "Open Calendar" [ref=f1e95] [cursor=pointer]:
          - generic [ref=f1e97]:
            - generic [ref=f1e98]: WED
            - strong [ref=f1e99]: "21"
          - generic [ref=f1e100]: Calendar
        - button "Open Files" [ref=f1e101] [cursor=pointer]:
          - generic [ref=f1e106]: Files
        - button "Open Notes" [ref=f1e107] [cursor=pointer]:
          - generic [ref=f1e113]: Notes
        - button "Open Maps" [ref=f1e114] [cursor=pointer]:
          - generic [ref=f1e124]: Maps
        - button "Open Contacts" [ref=f1e125] [cursor=pointer]:
          - generic [ref=f1e134]: Contacts
        - button "Open Alerts" [ref=f1e135] [cursor=pointer]:
          - generic [ref=f1e140]: Alerts
    - generic [ref=f1e141]:
      - generic "Home pages" [ref=f1e142]:
        - button "Show home page 1" [ref=f1e143] [cursor=pointer]
        - button "Show home page 2" [ref=f1e145] [cursor=pointer]
      - navigation "Quick apps" [ref=f1e147]:
        - button "Open Calls" [ref=f1e148] [cursor=pointer]
        - button "Open Messages" [ref=f1e152] [cursor=pointer]:
          - generic [ref=f1e156]: "107"
        - button "Open Contacts" [ref=f1e157] [cursor=pointer]
  - navigation "Phone navigation" [ref=f1e166]:
    - button "Exit game" [ref=f1e167] [cursor=pointer]
```

# Test source

```ts
  1   | import { expect, test, type Page } from '@playwright/test'
  2   | import { sceneAt, sceneNow, seedScene, settleScene } from './scene01-helper'
  3   | import { openScene03, scene01Choices, sendScene01Choice } from '../../src/game/scene01'
  4   | import { accessChoices, chapter2Access } from '../../src/game/chapter2Access'
  5   | import type { GameSave } from '../../src/game/types'
  6   | 
  7   | function completed() {
  8   |   let s = settleScene(sendScene01Choice(sceneAt('G13'), 'a', '', true, sceneNow(sceneAt('G13'))))
  9   |   s = settleScene(openScene03(s, sceneNow(s)))
  10  |   for (let i = 0; i < 60; i++) {
  11  |     if (s.prologue!.scene01!.privateScene03?.complete) return { ...s, narrativePlan: 'legacy-access' }
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
> 49  |   if (app !== 'Home') await page.getByRole('button', { name: `Open ${app}`, exact: true }).first().click()
      |                                                                                                    ^ Error: locator.click: Test timeout of 180000ms exceeded.
  50  |   await page.clock.runFor(7100)
  51  |   await expect(page.getByRole('complementary', { name: 'Incoming notification' })).toContainText("You're looking in the wrong place.")
  52  |   await expect(page.getByRole('region', { name: 'UNKNOWN conversation', exact: true })).toHaveCount(0)
  53  |   const s = await stored(page)
  54  |   expect(s.chapter2Access?.messages).toHaveLength(1)
  55  |   expect(s.prologue!.scene01!.messages.at(-1)?.text).toBe('Goodbye.')
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
  73  |   await expect.poll(() => page.evaluate(() => sessionStorage.getItem('the-archive-reboot:pending-save:v1'))).toBeNull()
  74  |   await page.reload()
  75  |   await page.getByRole('button', { name: 'Enter the archive', exact: true }).click()
  76  |   await openUnknown(page)
  77  |   await page.getByRole('button', { name: 'Inspect package again', exact: true }).click()
  78  |   await page.getByRole('button', { name: 'ACCEPT PACKAGE', exact: true }).click()
  79  |   await page.getByRole('button', { name: 'Send', exact: true }).click()
  80  |   await page.getByRole('button', { name: 'CANCEL', exact: true }).click()
  81  |   expect((await stored(page)).chapter2Access?.installAuthorized).toBe(false)
  82  |   await page.getByRole('button', { name: 'ACCEPT PACKAGE', exact: true }).click()
  83  |   await page.getByRole('button', { name: 'Send', exact: true }).click()
  84  |   await page.getByRole('button', { name: 'INSTALL EXTENSION', exact: true }).click()
  85  |   await page.clock.runFor(90000)
  86  |   await send(page, "Don't mistake this for trust.")
  87  |   await send(page, 'Why should I trust any of this?')
  88  |   expect((await stored(page)).chapter2Access).toMatchObject({ installCompleted: true, unknownOffline: true, spyInstalled: true, relayAvailable: false })
  89  |   await page.getByRole('button', { name: 'Open Messages', exact: true }).first().click()
  90  |   await page.getByRole('button', { name: 'Relay status: standby', exact: true }).click()
  91  |   await expect(page.getByRole('dialog', { name: 'SPY MODE', exact: true })).toContainText('Nothing is currently being intercepted.')
  92  |   await page.getByRole('button', { name: 'GOT IT', exact: true }).click()
  93  |   await page.getByRole('button', { name: 'Back to home', exact: true }).click()
  94  |   await page.getByRole('button', { name: 'Open The Archive', exact: true }).click()
  95  |   await page.getByRole('button', { name: 'OPEN PHONE MIRROR', exact: true }).click()
  96  |   await expect(page.getByText('Device: NOT CONNECTED', { exact: false })).toBeVisible()
  97  |   await page.getByRole('button', { name: 'ENTER MIRROR', exact: true }).click()
  98  |   await page.getByRole('button', { name: 'Open mirrored Mail', exact: true }).click()
  99  |   await page.getByRole('button', { name: /Storage Notification/ }).click()
  100 |   await page.getByRole('button', { name: 'Mirror home', exact: true }).click()
  101 |   await page.getByRole('button', { name: 'Open mirrored Deleted', exact: true }).click()
  102 |   await page.getByRole('button', { name: 'START RECOVERY', exact: true }).click()
  103 |   await page.getByRole('dialog', { name: 'Recover recently deleted confirmation', exact: true }).getByRole('button', { name: 'NOT NOW', exact: true }).click()
  104 |   expect((await stored(page)).chapter2Access?.recovery).toBeUndefined()
  105 |   await page.getByRole('button', { name: 'START RECOVERY', exact: true }).click()
  106 |   await page.getByRole('button', { name: 'START — OPEN NOW', exact: true }).click()
  107 |   const recovery = (await stored(page)).chapter2Access!.recovery!
  108 |   expect(recovery.dueAt-recovery.startedAt).toBe(1500000)
  109 |   await page.clock.runFor(19000)
  110 |   await expect(page.getByRole('complementary', { name: 'Incoming notification' })).toContainText('FIND DANIEL')
  111 |   await expect(page.getByRole('heading', { name: 'Recently Deleted', exact: true })).toBeVisible()
  112 |   await page.clock.runFor(20000)
  113 |   await expect.poll(() => page.evaluate(() => sessionStorage.getItem('the-archive-reboot:pending-save:v1'))).toBeNull()
  114 |   await page.reload()
  115 |   await page.getByRole('button', { name: 'Enter the archive', exact: true }).click()
  116 |   await page.getByRole('button', { name: 'Open Messages', exact: true }).first().click()
  117 |   await expect(page.getByRole('button', { name: 'Open FIND DANIEL group conversation', exact: true })).toHaveCount(1)
  118 |   await page.getByRole('button', { name: 'Open FIND DANIEL group conversation', exact: true }).click()
  119 |   await page.clock.runFor(180000)
  120 |   await expect(page.getByRole('button',{name:"I'm here. Let's talk.",exact:true})).toBeVisible()
  121 |   const final = await stored(page)
  122 |   expect(final.chapter2Access?.complete).toBe(false)
  123 |   expect(final.chapter2Access?.recovery).toEqual(recovery)
  124 |   expect(final.chapter2Access?.groupMessages.filter(m => m.sender === 'player')).toHaveLength(0)
  125 |   expect(final.deliveredEvents.filter(id => id === 'C2-INSTALL-BEGIN')).toHaveLength(1)
  126 |   await expect(page.getByRole('button', { name: 'Send', exact: true })).toBeDisabled()
  127 |   await page.screenshot({ path: test.info().outputPath('chapter2-ready-320.png') })
  128 | })
  129 | 
  130 | test('package questions are idempotent and an unsent response survives reload without sending', async ({ page }) => {
  131 |   const base = packageSave()
  132 |   await seedScene(page, base)
  133 |   await openUnknown(page)
  134 |   await send(page, 'Ask one more question')
  135 |   await send(page, 'Who made this package?')
  136 |   await send(page, 'Ask one more question')
  137 |   await expect(page.getByRole('button', { name: 'Who made this package?', exact: true })).toBeDisabled()
  138 |   await page.getByRole('button', { name: 'Back to package', exact: true }).click()
  139 |   await page.getByRole('button', { name: 'ACCEPT — Open access package', exact: true }).click()
  140 |   expect((await stored(page)).chapter2Access?.installAuthorized).toBe(false)
  141 |   await expect.poll(() => page.evaluate(() => sessionStorage.getItem('the-archive-reboot:pending-save:v1'))).toBeNull()
  142 |   await page.reload()
  143 |   await page.getByRole('button', { name: 'Enter the archive', exact: true }).click()
  144 |   expect((await stored(page)).chapter2Access?.installAuthorized).toBe(false)
  145 |   await openUnknown(page)
  146 |   expect((await stored(page)).chapter2Access?.messages.filter(m => m.text === 'Who made this package?')).toHaveLength(1)
  147 | })
  148 | 
```