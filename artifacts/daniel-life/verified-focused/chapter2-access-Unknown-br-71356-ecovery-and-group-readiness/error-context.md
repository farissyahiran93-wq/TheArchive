# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chapter2-access.spec.ts >> Unknown branches, explicit Send, retained decline, consented install, recovery and group readiness
- Location: tests\e2e\chapter2-access.spec.ts:58:1

# Error details

```
Test timeout of 180000ms exceeded.
```

```
Error: locator.click: Test timeout of 180000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Enter the archive', exact: true })

```

# Page snapshot

```yaml
- generic [ref=f3e4]:
  - heading "Save needs attention" [level=1] [ref=f3e5]
  - paragraph [ref=f3e6]: A previous write was interrupted after some progress was stored. Download the pending local backup before choosing which version to keep.
  - paragraph [ref=f3e7]: Your stored progress has not been overwritten. Download a copy before choosing to reload; any unsaved changes in this tab may be lost.
  - button "Download local backup" [ref=f3e8] [cursor=pointer]
  - button "Reload stored save" [ref=f3e12] [cursor=pointer]
```

# Test source

```ts
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
  102 |   await page.getByRole('dialog', { name: 'Recover recently deleted confirmation', exact: true }).getByRole('button', { name: 'NOT NOW', exact: true }).click()
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
> 113 |   await page.getByRole('button', { name: 'Enter the archive', exact: true }).click()
      |                                                                              ^ Error: locator.click: Test timeout of 180000ms exceeded.
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