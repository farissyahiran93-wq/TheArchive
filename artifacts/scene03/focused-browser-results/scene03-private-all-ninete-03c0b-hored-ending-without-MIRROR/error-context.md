# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: scene03-private.spec.ts >> all nineteen private choices preserve canonical disclosures, explicit Send and the authored ending without MIRROR
- Location: tests\e2e\scene03-private.spec.ts:40:1

# Error details

```
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByRole('region', { name: 'Sophie private conversation', exact: true })
Expected: "OPEN-S03-C05"
Received: "OPEN-S03-AFTER-04-11"
Timeout:  5000ms

Call log:
  - Expect "toHaveAttribute" getByRole('region', { name: 'Sophie private conversation', exact: true }) with timeout 5000ms
  - waiting for getByRole('region', { name: 'Sophie private conversation', exact: true })
    13 × locator resolved to <section data-group-complete="true" data-scene-node="OPEN-S03-AFTER-04-11" aria-label="Sophie private conversation" class="opening-screen opening-v4 scene01-chat">…</section>
       - unexpected value "OPEN-S03-AFTER-04-11"

```

```yaml
- region "Sophie private conversation":
  - button "Back to inbox"
  - strong: Sophie
  - text: Online Wednesday, October 21 · 08:00 PM Hey Sorry, is this a bad time? Actually I'm not even sure I have the right number 😅 Could you just reply when you see this? Who's this? Oh, right. Sorry. I'm Sophie. I probably should've started with that. Can I ask you something? And I promise I'm not selling anything. Sure. Go ahead. Thanks. Okay, this might sound strange. Okay. I found this number in a contact list. There wasn't a name attached to it. Just the number. And a note. What kind of note? That's the frustrating part. Most of it wasn't readable. I could make out the number. That was about it. The contact list belonged to someone named Daniel. Daniel Mercer. Never heard of him. Okay. That's what I was afraid you'd say. Not that it's your fault. Can I ask if you've ever spoken to anyone called Daniel? Even online? Maybe a long time ago? No. Definitely not. Okay. Thanks for being clear. That makes this even stranger, though. Anyway. If you don't know him, then I guess that answers one question. Just not the one I really wanted answered. Sorry. I keep making this awkward. You probably have better things to do than talk to a stranger. It's fine. What were you hoping to find out? Why your number was saved. Whether Daniel knew you. Whether you'd heard from him recently. Daniel hasn't been answering anyone. Calls, messages... Nothing. For days. Maybe he needs some time alone? I thought that too. At first. But it's gone on longer than anyone expected. Sorry. I shouldn't have dropped all that on you. We don't even know each other. You can call me Alex. Alex. Okay. Nice to meet you. Under very strange circumstances. 😅 Can I be honest about something? I almost deleted your number before messaging you. Why didn't you? I kept thinking about the fact that it had been saved. There had to be a reason. Or at least I hoped there was. Anyway. I should probably let you go. You've already been more patient than I expected. Actually, wait. There's something else. I wasn't sure if I should mention it. I'm listening. Okay. Just give me a second. I'm not the only one trying to understand what happened. There are a few other people. People who know Daniel. We've been talking. Although "talking" might be a generous way of putting it lately. What do you mean? Everyone has their own idea of what we should do. And no one seems to agree. There's a group chat. We've been using it to keep track of things. Well... Trying to. I was thinking... Maybe you could join us? Just for a little while. You don't have to do anything. You could just listen. Why would I join a group of strangers? That's a very good question. And I don't have a very convincing answer. I just thought maybe you'd notice something we missed. Look. I'm not asking you to solve anything. And I don't expect you to believe everything I'm saying. I'd be suspicious too. But if there's even a small chance your number means something... I don't want to ignore it. Alright. Add me. Really? Okay. Thank you. I'll send you an invite. Okay, before you join... Just so you know. Not everyone in there is as friendly as me. Wow. That sounded incredibly arrogant. You know what I mean. 😅 I can handle it. Good. Because I can't guarantee a warm welcome. Anyway. Here goes nothing. Hey. It's me. Obviously. Not sure why I felt the need to clarify that 😅 Sorry about what happened back there. That was... Well, you've seen it. Yeah. That was pretty intense. That's one word for it. And you caught us on a relatively good day. Kidding. Mostly. Okay. Let's start over. Properly this time. There's something I should've told you before I added you. Daniel isn't just someone I know. He's my brother. My older brother, actually. Daniel Mercer. I guess I should've mentioned that earlier. Wait. Daniel's your brother? Yeah. Sorry. I keep forgetting you don't know anything about us. I've spent days talking to people who already know him. It's strange. I've spent all day talking about Daniel. Where he might be. Who he last spoke to. Whether anyone remembers something useful. But I haven't really told you what he's like. What's he like? That's harder than I expected. He's a good person. Which is what everybody says about someone they love. Not very helpful, is it? He's patient with things. Not always with people. If something breaks, he'll spend hours trying to fix it. Even if replacing it would take five minutes. And he'll be absolutely convinced he's being clever about it. He sounds stubborn. Oh, incredibly. Don't ever tell him that. He'll spend the next twenty minutes explaining why he's not stubborn. And he has this habit. Whenever something gets complicated, he'll say... "I'll explain later." I hate that sentence. Because he normally does explain later. You just have to wait until he's ready. This time...
  - button "Open FIND DANIEL"
```

# Test source

```ts
  1   | import { expect, test, type Page } from '@playwright/test'
  2   | import { sceneAt, sceneNow, seedScene, settleScene } from './scene01-helper'
  3   | import { openScene03, scene01Choices, sendScene01Choice } from '../../src/game/scene01'
  4   | import { scene01Nodes } from '../../src/content/scene01'
  5   | import { scene03Facts } from '../../src/content/scene03'
  6   | import { scene03Script } from '../../src/content/scene03Script'
  7   | import type { GameSave } from '../../src/game/types'
  8   | 
  9   | function handoff() { const save = sceneAt('G13'); return settleScene(sendScene01Choice(save, 'a', '', true, sceneNow(save))) }
  10  | function privateAt(number: string) {
  11  |   let save = handoff()
  12  |   save = settleScene(openScene03(save, sceneNow(save)))
  13  |   for (let i = 0; i < 50; i++) {
  14  |     const node = scene01Nodes[save.prologue!.scene01!.nodeId]
  15  |     if (node.kind === 'choice' && node.number === `P${number}`) return save
  16  |     if (node.kind !== 'choice') throw new Error(node.id)
  17  |     save = settleScene(sendScene01Choice(save, node.number ? 'a' : 'continue', '', true, sceneNow(save)))
  18  |   }
  19  |   throw new Error('No target')
  20  | }
  21  | async function stored(page: Page): Promise<GameSave> {
  22  |   return page.evaluate(async () => {
  23  |     const pending = sessionStorage.getItem('the-archive-reboot:pending-save:v1')
  24  |     if (pending) return JSON.parse(pending).save
  25  |     const db = await new Promise<IDBDatabase>(resolve => { const request = indexedDB.open('the-archive-reboot', 1); request.onsuccess = () => resolve(request.result) })
  26  |     const save = await new Promise<GameSave>(resolve => { const request = db.transaction('saves').objectStore('saves').get('primary'); request.onsuccess = () => resolve(request.result) })
  27  |     db.close(); return save
  28  |   })
  29  | }
  30  | async function open(page: Page) {
  31  |   await page.getByRole('button', { name: 'Open Messages', exact: true }).first().click()
  32  |   await page.getByRole('button', { name: 'Open Sophie conversation', exact: true }).click()
  33  | }
  34  | async function reply(page: Page, text: string | RegExp) {
  35  |   await page.getByRole('button', { name: text, exact: typeof text === 'string' }).click()
  36  |   await page.getByRole('button', { name: 'Send', exact: true }).click()
  37  |   await page.clock.runFor(90_000)
  38  | }
  39  | 
  40  | test('all nineteen private choices preserve canonical disclosures, explicit Send and the authored ending without MIRROR', async ({ page }) => {
  41  |   test.setTimeout(150_000)
  42  |   const initial = handoff(), groupHistory = initial.prologue!.scene01!.groupMessages
  43  |   await seedScene(page, initial)
  44  |   expect((await stored(page)).prologue!.scene01!.privateScene03).toBeUndefined()
  45  |   await open(page)
  46  |   await page.clock.runFor(60_000)
  47  |   const chat = page.getByRole('region', { name: 'Sophie private conversation', exact: true })
  48  |   for (const beat of scene03Script.choices) {
> 49  |     await expect(chat).toHaveAttribute('data-scene-node', `OPEN-S03-C${beat.id}`)
      |                        ^ Error: expect(locator).toHaveAttribute(expected) failed
  50  |     expect(await page.locator('.scene01-options .opening-choice').count()).toBeGreaterThanOrEqual(4)
  51  |     expect(await page.locator('.scene01-options [aria-pressed="true"]').count()).toBe(0)
  52  |     const option = beat.choices[beat.id === '06' ? 1 : 0]
  53  |     const before = await chat.locator('.opening-bubble.player').count()
  54  |     await page.getByRole('button', { name: option.text, exact: true }).click()
  55  |     await expect(chat.locator('.opening-bubble.player')).toHaveCount(before)
  56  |     await page.getByRole('button', { name: 'Send', exact: true }).click()
  57  |     await page.clock.runFor(90_000)
  58  |     if (beat.id === '01') expect((await stored(page)).knowledge.player).toContain(scene03Facts.siblings)
  59  |     if (beat.id === '08') expect((await stored(page)).knowledge.player).toContain(scene03Facts.mayaFiancee)
  60  |     if (beat.id === '13') {
  61  |       expect((await stored(page)).knowledge.player).toContain(scene03Facts.eliAxiom)
  62  |       await page.screenshot({ path: test.info().outputPath('sophie-eli-canon.png'), animations: 'disabled' })
  63  |     }
  64  |   }
  65  |   const save = await stored(page), scene = save.prologue!.scene01!
  66  |   expect(scene.privateScene03).toMatchObject({ complete: true, reading: false, nextEventReady: true })
  67  |   expect(scene.messages.at(-1)?.text).toBe('Goodnight :)')
  68  |   expect(scene.groupMessages).toEqual(groupHistory)
  69  |   expect(scene.groupMembers!.lucas).toBe(false)
  70  |   expect(save.knowledge.player).toContain(scene03Facts.policeReported)
  71  |   expect(save.relationships.maya).toEqual(initial.relationships.maya)
  72  |   expect(save.relationships.sophie.romance).toBe(initial.relationships.sophie.romance)
  73  |   await expect(page.getByText('Sophie is offline.', { exact: true })).toBeVisible()
  74  |   await expect(page.getByRole('button', { name: 'Send', exact: true })).toHaveCount(0)
  75  |   await page.getByRole('button', { name: 'Back to inbox', exact: true }).click()
  76  |   await page.getByRole('button', { name: 'Back to home', exact: true }).click()
  77  |   await expect(page.getByRole('button', { name: 'Open The Archive', exact: true })).toHaveCount(0)
  78  |   expect(save.pendingEvents.some(event => /C2_|RELAY|RECOVER/.test(event.id))).toBe(false)
  79  | })
  80  | 
  81  | test('draft selection, queue pause, premium effect and progress survive leaving the chat and reload', async ({ page }) => {
  82  |   const initial = privateAt('13')
  83  |   await seedScene(page, initial)
  84  |   await open(page)
  85  |   const premium = page.getByRole('button', { name: /Quiet people sometimes notice things everyone else misses/ })
  86  |   const count = await page.locator('.opening-bubble.player').count()
  87  |   await premium.click()
  88  |   await expect(premium).toHaveAttribute('aria-pressed', 'true')
  89  |   await expect(page.locator('.opening-bubble.player')).toHaveCount(count)
  90  |   await page.getByRole('button', { name: 'Back to inbox', exact: true }).click()
  91  |   await page.clock.runFor(180_000)
  92  |   const closed = await stored(page)
  93  |   expect(closed.prologue!.scene01!.privateScene03!.reading).toBe(false)
  94  |   expect(closed.prologue!.scene01!.messages).toHaveLength(initial.prologue!.scene01!.messages.length)
  95  |   await page.reload()
  96  |   await page.getByRole('button', { name: 'Enter the archive', exact: true }).click()
  97  |   await open(page)
  98  |   await expect(premium).toHaveAttribute('aria-pressed', 'true')
  99  |   await page.getByRole('button', { name: 'Send', exact: true }).click()
  100 |   await expect(page.getByRole('status', { name: 'Sophie is typing', exact: true })).toBeVisible()
  101 |   await page.getByRole('button', { name: 'Back to inbox', exact: true }).click()
  102 |   const paused = await stored(page), pausedCount = paused.prologue!.scene01!.messages.length
  103 |   expect(paused.prologue!.scene01!.privateScene03!.paused!.id).toMatch(/^OPEN-S03-C13-e-/)
  104 |   await page.clock.runFor(180_000)
  105 |   expect((await stored(page)).prologue!.scene01!.messages).toHaveLength(pausedCount)
  106 |   await page.getByRole('button', { name: 'Open Sophie conversation', exact: true }).click()
  107 |   await page.clock.runFor(90_000)
  108 |   await expect(page.locator('.scene01-chat')).toHaveAttribute('data-scene-node', 'OPEN-S03-C14')
  109 |   const finished = await stored(page)
  110 |   expect(finished.relationships.sophie.affinity - initial.relationships.sophie.affinity).toBe(2)
  111 |   expect(finished.knowledge.player).not.toContain(scene03Facts.eliAxiom)
  112 |   expect(finished.deliveredEvents.filter(id => id === 'OPEN-S03-EFFECT-13-e')).toHaveLength(1)
  113 |   await page.reload()
  114 |   await page.getByRole('button', { name: 'Enter the archive', exact: true }).click()
  115 |   await open(page)
  116 |   await expect(page.locator('.scene01-chat')).toHaveAttribute('data-scene-node', 'OPEN-S03-C14')
  117 |   expect((await stored(page)).relationships.sophie).toEqual(finished.relationships.sophie)
  118 | })
  119 | 
  120 | test('reading older private messages preserves scroll position and shows the new-message indicator', async ({ page }) => {
  121 |   await page.setViewportSize({ width: 320, height: 720 })
  122 |   await seedScene(page, privateAt('06'))
  123 |   await open(page)
  124 |   await page.getByRole('button', { name: /What was the first thing that made you realize/ }).click()
  125 |   await page.getByRole('button', { name: 'Send', exact: true }).click()
  126 |   const scroll = page.locator('.scene01-chat .opening-thread')
  127 |   await scroll.evaluate(node => { node.scrollTop = 0; node.dispatchEvent(new Event('scroll', { bubbles: true })) })
  128 |   await page.clock.runFor(90_000)
  129 |   expect(await scroll.evaluate(node => node.scrollTop)).toBe(0)
  130 |   await expect(page.getByRole('button', { name: /new · Jump to latest/ })).toBeVisible()
  131 |   await page.getByRole('button', { name: /new · Jump to latest/ }).click()
  132 |   await expect(page.getByRole('button', { name: 'What did he say?', exact: true })).toBeVisible()
  133 |   expect(await scroll.evaluate(node => node.scrollHeight - node.scrollTop - node.clientHeight)).toBeLessThan(4)
  134 |   await page.screenshot({ path: test.info().outputPath('private-chat-320.png'), animations: 'disabled' })
  135 | })
  136 | 
  137 | test('old opened-Hey saves begin the full script once, and choice 19 premium keeps both extra player lines behind Send', async ({ page }) => {
  138 |   const legacy = handoff()
  139 |   legacy.prologue!.scene01!.privateHandoff!.openedAt = sceneNow(legacy)
  140 |   legacy.deliveredEvents.push('OPEN-S03-ACTIVATED')
  141 |   await seedScene(page, legacy)
  142 |   await open(page)
  143 |   await page.clock.runFor(60_000)
  144 |   await expect(page.locator('.scene01-chat')).toHaveAttribute('data-scene-node', 'OPEN-S03-C01')
  145 |   await expect(page.locator('.opening-bubble').filter({ hasText: /^Hey\.$/ })).toHaveCount(1)
  146 |   expect((await stored(page)).deliveredEvents.filter(id => id === 'OPEN-S03-ACTIVATED')).toHaveLength(1)
  147 | })
  148 | 
  149 | test('final premium branch requires both authored follow-up Sends and ends offline once', async ({ page }) => {
```