# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: scene02-handoff.spec.ts >> refresh during the 5.5-second handoff retains the deadline and delivers the private message once, with manual chat opening
- Location: tests\e2e\scene02-handoff.spec.ts:95:1

# Error details

```
Error: No choice at OPEN-S01-INVITATION
```

# Test source

```ts
  1  | import { expect, type Page } from '@playwright/test'
  2  | import { newGame, type GameSave } from '../../src/game/types'
  3  | import { scene01Nodes } from '../../src/content/scene01'
  4  | import { beginScene01, deliverScene01, sendScene01Choice } from '../../src/game/scene01'
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
> 17 |     if (node.kind !== 'choice') throw new Error(`No choice at ${node.id}`)
     |                                       ^ Error: No choice at OPEN-S01-INVITATION
  18 |     save = settleScene(sendScene01Choice(save, node.number ? picks[node.number] ?? 'a' : 'continue', 'Alex', true, sceneNow(save)))
  19 |   }
  20 |   throw new Error('No requested choice')
  21 | }
  22 | export async function seedScene(page: Page, save: GameSave) {
  23 |   await page.clock.install({ time: new Date(sceneNow(save)) })
  24 |   await page.goto('/')
  25 |   await expect(page.getByRole('button', { name: 'Enter the archive', exact: true })).toBeVisible()
  26 |   await page.evaluate(async value => {
  27 |     const db = await new Promise<IDBDatabase>((resolve,reject) => { const request = indexedDB.open('the-archive-reboot',1); request.onsuccess = () => resolve(request.result); request.onerror = () => reject(request.error) })
  28 |     await new Promise<void>((resolve,reject) => { const tx = db.transaction('saves','readwrite'); tx.objectStore('saves').put(value,'primary'); tx.oncomplete = () => resolve(); tx.onerror = () => reject(tx.error) })
  29 |     db.close()
  30 |   }, save)
  31 |   await page.reload()
  32 |   await page.getByRole('button', { name: 'Enter the archive', exact: true }).click()
  33 | }
  34 | export async function openSophie(page: Page) {
  35 |   await page.getByRole('button', { name: 'Open Messages', exact: true }).first().click()
  36 |   await page.getByRole('button', { name: 'Open Sophie conversation', exact: true }).click()
  37 | }
  38 | export async function sceneReply(page: Page, text: string | RegExp) {
  39 |   await page.getByRole('button', { name: text, exact: typeof text === 'string' }).click()
  40 |   await page.getByRole('button', { name: 'Send', exact: true }).click()
  41 |   await page.clock.runFor(120_000)
  42 | }
  43 | 
```