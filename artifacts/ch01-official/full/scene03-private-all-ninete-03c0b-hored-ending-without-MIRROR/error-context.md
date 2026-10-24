# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: scene03-private.spec.ts >> all nineteen private choices preserve canonical disclosures, explicit Send and the authored ending without MIRROR
- Location: tests\e2e\scene03-private.spec.ts:40:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Access extension not activated.', { exact: true })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByText('Access extension not activated.', { exact: true }) with timeout 5000ms
  - waiting for getByText('Access extension not activated.', { exact: true })

```

```yaml
- text: 8:56 PM
- region "Chapter 1 investigation":
  - button "Back to home"
  - strong: THE ARCHIVE
  - text: INSTALLED DORMANT
  - paragraph: Chapter 1 · structural preview · dialogue awaiting full authoring
  - text: ACT 2 · SCENE 04
  - heading "The Public Story" [level=2]
  - paragraph: Follow the public report before examining any recovered layer.
  - button "Daniel Mercer — public report public · Not inspected":
    - strong: Daniel Mercer — public report
    - text: public · Not inspected
  - button "Activate recovered reference" [disabled]
  - list:
    - listitem: ○ Read the public report
    - listitem: ○ Activate and inspect the limited recovered reference
  - button "Continue investigation" [disabled]
  - group: Previously available sources
  - group: Chapter progress
- navigation "Phone navigation":
  - button "Go home"
```

# Test source

```ts
  1   | import { expect, test, type Page } from '@playwright/test'
  2   | import { sceneAt, sceneNow, seedScene, settleScene } from './scene01-helper'
  3   | import { openScene03, sendScene01Choice } from '../../src/game/scene01'
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
  49  |     await expect(chat).toHaveAttribute('data-scene-node', `OPEN-S03-C${beat.id}`)
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
  67  |   expect(scene.messages.at(-1)?.text).toBe('Goodbye.')
  68  |   expect(scene.groupMessages).toEqual(groupHistory)
  69  |   expect(scene.groupMembers!.lucas).toBe(false)
  70  |   expect(save.knowledge.player).toContain(scene03Facts.policeReported)
  71  |   expect(save.relationships.maya).toEqual(initial.relationships.maya)
  72  |   expect(save.relationships.sophie.romance).toBe(initial.relationships.sophie.romance)
  73  |   await expect(page.getByText('Sophie is offline.', { exact: true })).toBeVisible()
  74  |   await expect(page.getByRole('button', { name: 'Send', exact: true })).toHaveCount(0)
  75  |   await page.getByRole('button', { name: 'Back to inbox', exact: true }).click()
  76  |   await page.getByRole('button', { name: 'Back to home', exact: true }).click()
  77  |   // Chapter 2 makes the installed shell reachable, while its mirror remains locked until consent.
  78  |   await expect(page.getByRole('button', { name: 'Open The Archive', exact: true })).toHaveCount(1)
  79  |   await page.getByRole('button', { name: 'Open The Archive', exact: true }).click()
> 80  |   await expect(page.getByText('Access extension not activated.', { exact: true })).toBeVisible()
      |                                                                                    ^ Error: expect(locator).toBeVisible() failed
  81  |   await expect(page.getByRole('button', { name: 'OPEN PHONE MIRROR', exact: true })).toHaveCount(0)
  82  |   expect(save.pendingEvents.some(event => /C2_|RELAY|RECOVER/.test(event.id))).toBe(false)
  83  | })
  84  | 
  85  | test('draft selection, queue pause, premium effect and progress survive leaving the chat and reload', async ({ page }) => {
  86  |   const initial = privateAt('13')
  87  |   await seedScene(page, initial)
  88  |   await open(page)
  89  |   const premium = page.getByRole('button', { name: /Quiet people sometimes notice things everyone else misses/ })
  90  |   const count = await page.locator('.opening-bubble.player').count()
  91  |   await premium.click()
  92  |   await expect(premium).toHaveAttribute('aria-pressed', 'true')
  93  |   await expect(page.locator('.opening-bubble.player')).toHaveCount(count)
  94  |   await page.getByRole('button', { name: 'Back to inbox', exact: true }).click()
  95  |   await page.clock.runFor(180_000)
  96  |   const closed = await stored(page)
  97  |   expect(closed.prologue!.scene01!.privateScene03!.reading).toBe(false)
  98  |   expect(closed.prologue!.scene01!.messages).toHaveLength(initial.prologue!.scene01!.messages.length)
  99  |   await page.reload()
  100 |   await page.getByRole('button', { name: 'Enter the archive', exact: true }).click()
  101 |   await open(page)
  102 |   await expect(premium).toHaveAttribute('aria-pressed', 'true')
  103 |   await page.getByRole('button', { name: 'Send', exact: true }).click()
  104 |   await expect(page.getByRole('status', { name: 'Sophie is typing', exact: true })).toBeVisible()
  105 |   await page.getByRole('button', { name: 'Back to inbox', exact: true }).click()
  106 |   const paused = await stored(page), pausedCount = paused.prologue!.scene01!.messages.length
  107 |   expect(paused.prologue!.scene01!.privateScene03!.paused!.id).toMatch(/^OPEN-S03-C13-e-/)
  108 |   await page.clock.runFor(180_000)
  109 |   expect((await stored(page)).prologue!.scene01!.messages).toHaveLength(pausedCount)
  110 |   await page.getByRole('button', { name: 'Open Sophie conversation', exact: true }).click()
  111 |   await page.clock.runFor(90_000)
  112 |   await expect(page.locator('.scene01-chat')).toHaveAttribute('data-scene-node', 'OPEN-S03-C14')
  113 |   const finished = await stored(page)
  114 |   expect(finished.relationships.sophie.affinity - initial.relationships.sophie.affinity).toBe(2)
  115 |   expect(finished.knowledge.player).not.toContain(scene03Facts.eliAxiom)
  116 |   expect(finished.deliveredEvents.filter(id => id === 'OPEN-S03-EFFECT-13-e')).toHaveLength(1)
  117 |   await page.reload()
  118 |   await page.getByRole('button', { name: 'Enter the archive', exact: true }).click()
  119 |   await open(page)
  120 |   await expect(page.locator('.scene01-chat')).toHaveAttribute('data-scene-node', 'OPEN-S03-C14')
  121 |   expect((await stored(page)).relationships.sophie).toEqual(finished.relationships.sophie)
  122 | })
  123 | 
  124 | test('reading older private messages preserves scroll position and shows the new-message indicator', async ({ page }) => {
  125 |   await page.setViewportSize({ width: 320, height: 720 })
  126 |   await seedScene(page, privateAt('06'))
  127 |   await open(page)
  128 |   await page.getByRole('button', { name: /What was the first thing that made you realize/ }).click()
  129 |   await page.getByRole('button', { name: 'Send', exact: true }).click()
  130 |   const scroll = page.locator('.scene01-chat .opening-thread')
  131 |   await scroll.evaluate(node => { node.scrollTop = 0; node.dispatchEvent(new Event('scroll', { bubbles: true })) })
  132 |   await page.clock.runFor(90_000)
  133 |   expect(await scroll.evaluate(node => node.scrollTop)).toBe(0)
  134 |   await expect(page.getByRole('button', { name: /new · Jump to latest/ })).toBeVisible()
  135 |   await page.getByRole('button', { name: /new · Jump to latest/ }).click()
  136 |   await expect(page.getByRole('button', { name: 'What did he say?', exact: true })).toBeVisible()
  137 |   expect(await scroll.evaluate(node => node.scrollHeight - node.scrollTop - node.clientHeight)).toBeLessThan(4)
  138 |   await page.screenshot({ path: test.info().outputPath('private-chat-320.png'), animations: 'disabled' })
  139 | })
  140 | 
  141 | test('old opened-Hey saves begin the full script once without replaying the notification or activation', async ({ page }) => {
  142 |   const legacy = handoff()
  143 |   legacy.prologue!.scene01!.privateHandoff!.openedAt = sceneNow(legacy)
  144 |   legacy.deliveredEvents.push('OPEN-S03-ACTIVATED')
  145 |   await seedScene(page, legacy)
  146 |   await open(page)
  147 |   await page.clock.runFor(60_000)
  148 |   await expect(page.locator('.scene01-chat')).toHaveAttribute('data-scene-node', 'OPEN-S03-C01')
  149 |   await expect(page.locator('.opening-bubble').filter({ hasText: /^Hey\.$/ })).toHaveCount(1)
  150 |   expect((await stored(page)).deliveredEvents.filter(id => id === 'OPEN-S03-ACTIVATED')).toHaveLength(1)
  151 | })
  152 | 
  153 | test('final premium branch requires both authored follow-up Sends and ends offline once', async ({ page }) => {
  154 |   await seedScene(page, privateAt('19'))
  155 |   await open(page)
  156 |   await reply(page, /Only if you promise to get some rest too. Deal/)
  157 |   await expect(page.getByRole('button', { name: 'Seems fair.', exact: true })).toBeVisible()
  158 |   expect((await stored(page)).prologue!.scene01!.privateScene03!.complete).toBe(false)
  159 |   await reply(page, 'Seems fair.')
  160 |   await expect(page.getByRole('button', { name: "That's your problem.", exact: true })).toBeVisible()
  161 |   await reply(page, "That's your problem.")
  162 |   await expect(page.getByText('Sophie is offline.', { exact: true })).toBeVisible()
  163 |   expect((await stored(page)).deliveredEvents.filter(id => id === 'OPEN-S03-COMPLETE')).toHaveLength(1)
  164 |   await page.reload()
  165 |   await page.getByRole('button', { name: 'Enter the archive', exact: true }).click()
  166 |   await open(page)
  167 |   await expect(page.getByRole('button', { name: 'Send', exact: true })).toHaveCount(0)
  168 |   expect((await stored(page)).deliveredEvents.filter(id => id === 'OPEN-S03-EFFECT-19-e')).toHaveLength(1)
  169 | })
  170 | 
```