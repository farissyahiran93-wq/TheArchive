# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: scene02-handoff.spec.ts >> whole Scene 01 → all 13 group choices → Lucas leaves → delayed Hey, with no automatic chat opening or forced scroll
- Location: tests\e2e\scene02-handoff.spec.ts:33:1

# Error details

```
Error: expect(locator).toHaveAttribute(expected) failed

Locator: getByRole('region', { name: 'FIND DANIEL group conversation' })
Expected: "OPEN-S02-C01"
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toHaveAttribute" getByRole('region', { name: 'FIND DANIEL group conversation' }) with timeout 5000ms
  - waiting for getByRole('region', { name: 'FIND DANIEL group conversation' })

```

```yaml
- text: 8:19 PM
- region "Sophie first contact conversation":
  - button "Back to inbox"
  - strong: Sophie
  - text: Offline
  - button "View Sophie Mercer profile"
  - text: "Thursday, October 22 · 08:00 PM Hi. Sorry. This is going to sound odd. Is this still your number? Who's asking? Fair question. I'm Sophie. And that probably doesn't help much. I don't expect you to know me. I found this number saved somewhere. Can I explain? Go ahead. Thank you. It's a saved copy of someone's contacts. The file says it belongs to Daniel Mercer. I was looking through it earlier. Your number is in there. No name beside it. Just a star. A star? Yeah. Like a favourite, maybe. But I don't know what that symbol means in this file. Do you know Daniel? Daniel Mercer? No. Never heard the name. Okay. That was the most likely answer, I suppose. Could you think back a little? Even an old online chat. A work message. Anything. I'm not asking you to guess. I'm sure I haven't spoken to him. Then that's useful to know. I thought if I asked, the answer might be simple. “Oh, yeah. Daniel and I used to work together.” Something like that. Sorry. I'm talking as if you already know what's happened. Then tell me. Right. Daniel stopped replying. Messages. Calls. For days now. At first we thought he was busy. Then we thought maybe he wanted space. I don't know what to think anymore. Have you tried checking on him in person? We have tried to check he's safe. I don't want to give you a version of events I'm not sure about. I'm sorry. I should've said that sooner. You don't owe me your time. I haven't even asked what to call you. You can call me Rae. Rae. Got it. Nice to meet you. In a very odd way. You know what's strange? I nearly deleted this number. I had my finger over it and everything. What changed your mind? I kept thinking: what if this is the one person who can tell us something ordinary and useful? I didn't want to start believing the star meant something just because I was scared. But I didn't want to delete the question either. There are other people trying to find him. Some of us are talking in a group. Well, arguing in a group, lately. Who's in it? People close to him. I can introduce you properly if you decide to join. I haven't told them I've been messaging you. They knew about the number. Not that I would actually contact it. I'm going to get an earful. Then maybe talk to them first. That's probably the sensible thing. Sensible hasn't been my strongest quality this week. Could I ask you something slightly unreasonable? Would you consider joining the chat? Only to listen at first. If you want. I don't need you to promise you'll solve anything. Why would I be any use? You can tell us what you do and don't recognise. That alone might stop us making up stories around your number. Look, you can say no. I won't turn it into some kind of test. But if you join, there are people who'll want to ask you questions. One in particular. Alright. Send it. Okay. Thank you. Fair warning. The group isn't exactly having its finest week. If someone comes across as rude, please don't assume everyone feels the same way. I can handle a rude person. I hope so. I know one who could give lessons. I should tell them first. Actually, if I overthink this I'll never do it. Sophie is offline."
  - button "Open FIND DANIEL →"
- navigation "Phone navigation":
  - button "Go home"
```

# Test source

```ts
  1   | import { expect, test, type Page } from '@playwright/test'
  2   | import { scene01Script } from '../../src/content/scene01Script'
  3   | import { sceneAt, seedScene } from './scene01-helper'
  4   | import type { GameSave } from '../../src/game/types'
  5   | 
  6   | async function stored(page: Page): Promise<GameSave> {
  7   |   return page.evaluate(async () => {
  8   |     const journal = sessionStorage.getItem('the-archive-reboot:pending-save:v1')
  9   |     if (journal) return JSON.parse(journal).save
  10  |     const db = await new Promise<IDBDatabase>(resolve => { const request = indexedDB.open('the-archive-reboot', 1); request.onsuccess = () => resolve(request.result) })
  11  |     const value = await new Promise<GameSave>(resolve => { const request = db.transaction('saves').objectStore('saves').get('primary'); request.onsuccess = () => resolve(request.result) })
  12  |     db.close(); return value
  13  |   })
  14  | }
  15  | async function openGroup(page: Page) {
  16  |   await page.getByRole('button', { name: 'Open Messages', exact: true }).first().click()
  17  |   await page.getByRole('button', { name: 'Open FIND DANIEL group conversation', exact: true }).click()
  18  | }
  19  | async function reply(page: Page, text: string | RegExp, advance = true) {
  20  |   await page.getByRole('button', { name: text, exact: typeof text === 'string' }).click()
  21  |   await page.getByRole('button', { name: 'Send', exact: true }).click()
  22  |   if (advance) await page.clock.runFor(180_000)
  23  | }
  24  | async function reachPending(page: Page) {
  25  |   const group = page.getByRole('region', { name: 'FIND DANIEL group conversation' })
  26  |   for (let i = 0; i < 120; i++) {
  27  |     if (await group.getAttribute('data-group-complete') === 'true') return
  28  |     await page.clock.runFor(500)
  29  |   }
  30  |   throw new Error('Final group messages did not complete')
  31  | }
  32  | 
  33  | test('whole Scene 01 → all 13 group choices → Lucas leaves → delayed Hey, with no automatic chat opening or forced scroll', async ({ page }) => {
  34  |   test.setTimeout(180_000)
  35  |   await page.clock.install({ time: new Date('2026-10-22T12:00:00Z') })
  36  |   await page.goto('/')
  37  |   await page.getByRole('button', { name: 'Enter the archive', exact: true }).click()
  38  |   await page.clock.runFor(20_000)
  39  |   await page.getByRole('button', { name: 'Open unknown message', exact: true }).click()
  40  |   await page.clock.runFor(120_000)
  41  |   for (const beat of scene01Script.choices) {
  42  |     await expect(page.locator('.scene01-chat')).toHaveAttribute('data-scene-node', `OPEN-S01-C${beat.id}`)
  43  |     const before = await page.locator('.opening-bubble.player').count()
  44  |     await page.locator('.scene01-options .opening-choice').first().click()
  45  |     if (beat.id === '08') await page.getByLabel('Your codename', { exact: true }).fill('Rae')
  46  |     await expect(page.locator('.opening-bubble.player')).toHaveCount(before)
  47  |     await page.getByRole('button', { name: 'Send', exact: true }).click()
  48  |     await page.clock.runFor(60_000)
  49  |   }
  50  |   await page.getByRole('button', { name: 'JOIN GROUP', exact: true }).click()
  51  |   await page.clock.runFor(180_000)
  52  |   const group = page.getByRole('region', { name: 'FIND DANIEL group conversation' })
  53  |   for (let number = 1; number <= 12; number++) {
> 54  |     await expect(group).toHaveAttribute('data-scene-node', `OPEN-S02-C${String(number).padStart(2,'0')}`)
      |                         ^ Error: expect(locator).toHaveAttribute(expected) failed
  55  |     expect(await page.locator('.scene01-options .opening-choice').count()).toBeGreaterThanOrEqual(4)
  56  |     await page.locator('.scene01-options .opening-choice').first().click()
  57  |     await page.getByRole('button', { name: 'Send', exact: true }).click()
  58  |     await page.clock.runFor(180_000)
  59  |     // Embedded player lines are still individually selected and sent.
  60  |     while (await page.locator('.scene01-options .opening-choice').count() === 1) {
  61  |       const before = await group.locator('.opening-bubble.player').count()
  62  |       await page.clock.runFor(1000)
  63  |       await expect(group.locator('.opening-bubble.player')).toHaveCount(before)
  64  |       await page.locator('.scene01-options .opening-choice').first().click()
  65  |       await page.getByRole('button', { name: 'Send', exact: true }).click()
  66  |       await page.clock.runFor(180_000)
  67  |     }
  68  |   }
  69  |   await expect(group).toHaveAttribute('data-scene-node', 'OPEN-S02-C13')
  70  |   await expect(page.getByLabel('Group participants')).toContainText('3 members')
  71  |   await expect(page.getByLabel('Group participants')).not.toContainText('Lucas')
  72  |   await expect(group.getByText('Lucas left the group.', { exact: true })).toHaveCount(1)
  73  |   await expect(group.getByText('Maya deleted a message.', { exact: true })).toHaveCount(2)
  74  |   await expect(group.getByText('Can we talk privately?', { exact: true })).toBeVisible()
  75  |   await expect(group).not.toHaveAttribute('data-group-complete', 'true')
  76  |   await reply(page, 'Sure.', false)
  77  |   await group.locator('.opening-thread').evaluate(node => { node.scrollTop = 0; node.dispatchEvent(new Event('scroll', { bubbles: true })) })
  78  |   await reachPending(page)
  79  |   expect(await group.locator('.opening-thread').evaluate(node => node.scrollTop)).toBe(0)
  80  |   await page.clock.pauseAt(await page.evaluate(() => Date.now()))
  81  |   const pending = (await stored(page)).prologue!.scene01!.privateHandoff!
  82  |   const remaining = pending.dueAt - await page.evaluate(() => Date.now())
  83  |   expect(remaining).toBeGreaterThan(4500)
  84  |   expect(remaining).toBeLessThanOrEqual(5500)
  85  |   await page.clock.runFor(remaining - 1)
  86  |   expect((await stored(page)).prologue!.scene01!.messages.some(line => line.id === 'OPEN-S03-FIRST-MESSAGE')).toBe(false)
  87  |   await page.clock.runFor(1)
  88  |   const banner = page.getByLabel('Incoming notification', { exact: true })
  89  |   await expect(banner).toContainText('Sophie')
  90  |   await expect(banner).toContainText('Hey.')
  91  |   await expect(banner).toContainText('Tap to open conversation')
  92  |   await expect(group).toBeVisible()
  93  |   expect(await group.locator('.opening-thread').evaluate(node => node.scrollTop)).toBe(0)
  94  |   expect((await stored(page)).deliveredEvents).not.toContain('OPEN-S03-ACTIVATED')
  95  |   await page.screenshot({ path: test.info().outputPath('private-handoff-banner.png'), animations: 'disabled' })
  96  |   await page.getByRole('button', { name: 'Open notification from Sophie', exact: true }).click()
  97  |   await expect(page.getByRole('region', { name: 'Sophie private conversation', exact: true })).toBeVisible()
  98  |   await expect(page.locator('.opening-bubble').filter({ hasText: /^Hey\.$/ })).toHaveCount(1)
  99  |   expect((await stored(page)).deliveredEvents.filter(id => id === 'OPEN-S03-ACTIVATED')).toHaveLength(1)
  100 |   await expect(page.getByRole('button', { name: 'Send', exact: true })).toHaveCount(0)
  101 | })
  102 | 
  103 | test('refresh during the 5.5-second handoff retains the deadline and delivers the private message once, with manual chat opening', async ({ page }) => {
  104 |   await seedScene(page, sceneAt('G13'))
  105 |   // Assertions/reload must not consume the deadline under parallel browser load.
  106 |   await page.clock.pauseAt(await page.evaluate(() => Date.now()))
  107 |   await openGroup(page)
  108 |   await reply(page, 'Sure.', false)
  109 |   await reachPending(page)
  110 |   const pending = (await stored(page)).prologue!.scene01!.privateHandoff!
  111 |   await page.clock.runFor(1000)
  112 |   await page.reload()
  113 |   await page.getByRole('button', { name: 'Enter the archive', exact: true }).click()
  114 |   await openGroup(page)
  115 |   expect((await stored(page)).prologue!.scene01!.privateHandoff!.dueAt).toBe(pending.dueAt)
  116 |   const remaining = pending.dueAt - await page.evaluate(() => Date.now())
  117 |   await page.clock.runFor(remaining - 1)
  118 |   expect((await stored(page)).prologue!.scene01!.privateHandoff!.deliveredAt).toBeUndefined()
  119 |   await page.clock.runFor(1)
  120 |   await expect(page.getByLabel('Incoming notification', { exact: true })).toContainText('Hey.')
  121 |   await expect(page.getByRole('region', { name: 'FIND DANIEL group conversation' })).toBeVisible()
  122 |   await page.reload()
  123 |   await page.getByRole('button', { name: 'Enter the archive', exact: true }).click()
  124 |   await page.clock.runFor(20_000)
  125 |   expect((await stored(page)).prologue!.scene01!.messages.filter(line => line.id === 'OPEN-S03-FIRST-MESSAGE')).toHaveLength(1)
  126 |   expect((await stored(page)).deliveredEvents).not.toContain('OPEN-S03-ACTIVATED')
  127 |   await page.getByRole('button', { name: 'Open Messages', exact: true }).first().click()
  128 |   await page.getByRole('button', { name: 'Open Sophie conversation', exact: true }).click()
  129 |   await expect(page.getByRole('region', { name: 'Sophie private conversation', exact: true })).toBeVisible()
  130 |   expect((await stored(page)).deliveredEvents.filter(id => id === 'OPEN-S03-ACTIVATED')).toHaveLength(1)
  131 | })
  132 | 
  133 | test('an older save stopped after 08D receives only its missing reaction and continues at choice 09', async ({ page }) => {
  134 |   const save = sceneAt('G09', { G08: 'd' }), scene = save.prologue!.scene01!
  135 |   const keep = (id: string) => !id.startsWith('OPEN-S02-AFTER-08-') && !id.startsWith('OPEN-S02-C08-d-')
  136 |   scene.nodeId = 'OPEN-S02-SOURCE-BOUNDARY'; scene.groupSourceBoundary = true; scene.queue = []
  137 |   scene.groupMessages = scene.groupMessages.filter(line => keep(line.id))
  138 |   scene.groupReceipts = scene.groupReceipts?.filter(receipt => keep(receipt.eventId))
  139 |   save.deliveredEvents = save.deliveredEvents.filter(keep)
  140 |   const beforeRelationships = save.relationships
  141 |   await seedScene(page, save)
  142 |   await openGroup(page)
  143 |   await page.clock.runFor(180_000)
  144 |   await expect(page.getByRole('button', { name: 'What happened that night?', exact: true })).toBeVisible()
  145 |   await expect(page.locator('.opening-bubble.player').filter({ hasText: /^Maybe you should discuss this without me\.$/ })).toHaveCount(1)
  146 |   await expect(page.locator('.opening-bubble').filter({ hasText: /^We probably should have done that earlier\.$/ })).toHaveCount(1)
  147 |   expect((await stored(page)).relationships).toEqual(beforeRelationships)
  148 | })
  149 | 
  150 | test('premium last words and support retain each embedded Send and Lucas still leaves', async ({ page }) => {
  151 |   await seedScene(page, sceneAt('G11'))
  152 |   await openGroup(page)
  153 |   await reply(page, /You don't know me. I don't know you. But I don't think Daniel would be helped/)
  154 |   await expect(page.getByRole('button', { name: "You haven't exactly ruled it out.", exact: true })).toBeVisible()
```