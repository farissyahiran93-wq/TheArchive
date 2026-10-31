# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: scene04-final.spec.ts >> Scene 04 index selection survives reload; Archive selections create separately labelled sources without player bubbles
- Location: tests\e2e\scene04-final.spec.ts:93:1

# Error details

```
Test timeout of 90000ms exceeded.
```

```
Error: locator.click: Test timeout of 90000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Enter the archive', exact: true })
    - locator resolved to <button aria-label="Enter the archive">…</button>
  - attempting click action
    - waiting for element to be visible, enabled and stable

```

# Page snapshot

```yaml
- generic [ref=f1e4]:
  - generic "Local time 04:27 PM" [ref=f1e5]: 4:27 PM
  - main "Phone lock screen" [ref=f1e22]:
    - generic [ref=f1e23]:
      - paragraph [ref=f1e28]: Friday, January 15
      - heading "4:27 PM" [level=1] [ref=f1e29]
    - generic [ref=f1e30]:
      - paragraph [ref=f1e31]:
        - text: YOUR PHONE
        - generic [ref=f1e32]: PRIVATE DEVICE
      - button "Enter the archive" [ref=f1e33] [cursor=pointer]:
        - generic [ref=f1e36]: Swipe up to open
  - navigation "Phone navigation" [ref=f1e37]:
    - button "Go home" [ref=f1e38] [cursor=pointer]
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
  23 | export async function seedScene(page: Page, save: GameSave, options?: { pauseClock?: boolean }) {
  24 |   await page.clock.install({ time: new Date(sceneNow(save)) })
  25 |   if(options?.pauseClock)await page.clock.pauseAt(new Date(sceneNow(save)+1000))
  26 |   await page.goto('/')
  27 |   await expect(page.getByRole('button', { name: 'Enter the archive', exact: true })).toBeVisible()
  28 |   await page.evaluate(async value => {
  29 |     const db = await new Promise<IDBDatabase>((resolve,reject) => { const request = indexedDB.open('the-archive-reboot',1); request.onsuccess = () => resolve(request.result); request.onerror = () => reject(request.error) })
  30 |     await new Promise<void>((resolve,reject) => { const tx = db.transaction('saves','readwrite'); tx.objectStore('saves').put(value,'primary'); tx.oncomplete = () => resolve(); tx.onerror = () => reject(tx.error) })
  31 |     db.close()
  32 |   }, save)
  33 |   await page.reload()
> 34 |   await page.getByRole('button', { name: 'Enter the archive', exact: true }).click()
     |                                                                              ^ Error: locator.click: Test timeout of 90000ms exceeded.
  35 | }
  36 | export async function openSophie(page: Page) {
  37 |   await page.getByRole('button', { name: 'Open Messages', exact: true }).first().click()
  38 |   await page.getByRole('button', { name: 'Open Sophie conversation', exact: true }).click()
  39 | }
  40 | export async function sceneReply(page: Page, text: string | RegExp) {
  41 |   await page.getByRole('button', { name: text, exact: typeof text === 'string' }).click()
  42 |   await page.getByRole('button', { name: 'Send', exact: true }).click()
  43 |   await page.clock.runFor(120_000)
  44 | }
  45 | 
```