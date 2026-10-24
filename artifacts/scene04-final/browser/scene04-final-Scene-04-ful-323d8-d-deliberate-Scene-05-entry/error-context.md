# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: scene04-final.spec.ts >> Scene 04 full manual route: article, skipped optional group, index choices, final Sophie and deliberate Scene 05 entry
- Location: tests\e2e\scene04-final.spec.ts:8:1

# Error details

```
Test timeout of 150000ms exceeded.
```

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('button', { name: 'Enter the archive', exact: true })
Expected: visible
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByRole('button', { name: 'Enter the archive', exact: true }) with timeout 5000ms
  - waiting for getByRole('button', { name: 'Enter the archive', exact: true })
  - Test timeout of 150000ms exceeded.

```

# Test source

```ts
  1  | import { expect, type Page } from '@playwright/test'
  2  | import { newGame, type GameSave } from '../../src/game/types'
  3  | import { scene01Nodes } from '../../src/content/scene01'
  4  | import { beginLegacyScene01 as beginScene01, deliverScene01, scene01Invitation, sendScene01Choice } from '../../src/game/scene01'
  5  | 
  6  | export const sceneTime = Date.parse('2026-10-21T12:00:00Z')
  7  | export function sceneNow(save: GameSave): number { return Math.max(sceneTime, ...(save.prologue?.scene01?.messages.map(line => line.at) ?? []), ...(save.prologue?.scene01?.groupMessages.map(line => line.at) ?? [])) + 100 }
  8  | export function settleScene(save: GameSave): GameSave {
  9  |   for (let i = 0; i < 100; i++) { const due = save.prologue?.scene01?.queue[0]?.dueAt; if (due === undefined) return save; save = deliverScene01(save, due) }
  10 |   throw new Error('Scene queue did not settle')
  11 | }
  12 | export function sceneAt(number: string, picks: Record<string,string> = {}): GameSave {
  13 |   let save = settleScene(beginScene01(newGame(), sceneTime))
  14 |   for (let i = 0; i < 80; i++) {
  15 |     const node = scene01Nodes[save.prologue!.scene01!.nodeId]
  16 |     if (node.kind === 'choice' && node.number === number) return save
  17 |     if (number.startsWith('G') && save.prologue!.scene01!.invitation === 'ready') { save = settleScene(scene01Invitation(save, 'join', sceneNow(save))); continue }
  18 |     if (node.kind !== 'choice') throw new Error(`No choice at ${node.id}`)
  19 |     save = settleScene(sendScene01Choice(save, node.number ? picks[node.number] ?? 'a' : 'continue', 'Alex', true, sceneNow(save)))
  20 |   }
  21 |   throw new Error('No requested choice')
  22 | }
  23 | export async function seedScene(page: Page, save: GameSave) {
  24 |   await page.clock.install({ time: new Date(sceneNow(save)) })
  25 |   await page.goto('/')
> 26 |   await expect(page.getByRole('button', { name: 'Enter the archive', exact: true })).toBeVisible()
     |                                                                                      ^ Error: expect(locator).toBeVisible() failed
  27 |   await page.evaluate(async value => {
  28 |     const db = await new Promise<IDBDatabase>((resolve,reject) => { const request = indexedDB.open('the-archive-reboot',1); request.onsuccess = () => resolve(request.result); request.onerror = () => reject(request.error) })
  29 |     await new Promise<void>((resolve,reject) => { const tx = db.transaction('saves','readwrite'); tx.objectStore('saves').put(value,'primary'); tx.oncomplete = () => resolve(); tx.onerror = () => reject(tx.error) })
  30 |     db.close()
  31 |   }, save)
  32 |   await page.reload()
  33 |   await page.getByRole('button', { name: 'Enter the archive', exact: true }).click()
  34 | }
  35 | export async function openSophie(page: Page) {
  36 |   await page.getByRole('button', { name: 'Open Messages', exact: true }).first().click()
  37 |   await page.getByRole('button', { name: 'Open Sophie conversation', exact: true }).click()
  38 | }
  39 | export async function sceneReply(page: Page, text: string | RegExp) {
  40 |   await page.getByRole('button', { name: text, exact: typeof text === 'string' }).click()
  41 |   await page.getByRole('button', { name: 'Send', exact: true }).click()
  42 |   await page.clock.runFor(120_000)
  43 | }
  44 | 
```