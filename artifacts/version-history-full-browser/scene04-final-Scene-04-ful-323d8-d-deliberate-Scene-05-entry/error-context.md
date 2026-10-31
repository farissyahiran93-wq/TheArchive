# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: scene04-final.spec.ts >> Scene 04 full manual route: article, skipped optional group, index choices, final Sophie and deliberate Scene 05 entry
- Location: tests\e2e\scene04-final.spec.ts:11:1

# Error details

```
Test timeout of 150000ms exceeded.
```

```
Error: locator.click: Test timeout of 150000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'It says less than the headline makes you expect.', exact: true })

```

# Page snapshot

```yaml
- generic [ref=f2e4]:
  - generic "Local time 04:34 PM" [ref=f2e5]: 4:34 PM
  - region "Messages inbox" [ref=f2e22]:
    - generic [ref=f2e23]:
      - button "Back to home" [ref=f2e25] [cursor=pointer]:
        - generic [ref=f2e28]: Home
      - heading "Messages" [level=1] [ref=f2e29]
      - textbox "Search conversations" [ref=f2e34]:
        - /placeholder: Search
    - generic [ref=f2e35]:
      - button "Open Chapter 1 Unknown Sender conversation" [ref=f2e36] [cursor=pointer]:
        - generic [aria-hidden] [ref=f2e37]: "?"
        - generic [ref=f2e38]:
          - strong [ref=f2e39]: Unknown Number
          - generic [ref=f2e40]: You shouldn't be talking to her.
        - generic [ref=f2e41]: "1"
      - button "Open Sophie conversation" [ref=f2e45] [cursor=pointer]:
        - generic [ref=f2e47]:
          - strong [ref=f2e48]: Sophie
          - generic [ref=f2e49]: Greyhaven Bulletin · Daniel Mercer
      - button "Open FIND DANIEL group conversation" [ref=f2e53] [cursor=pointer]:
        - generic [ref=f2e54]: FD
        - generic [ref=f2e55]:
          - strong [ref=f2e56]: FIND DANIEL
          - generic [ref=f2e57]: Sophie is offline.
        - generic [ref=f2e58]: "1"
  - navigation "Phone navigation" [ref=f2e62]:
    - button "Go home" [ref=f2e63] [cursor=pointer]
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
  34 |   await page.getByRole('button', { name: 'Enter the archive', exact: true }).click()
  35 | }
  36 | export async function openSophie(page: Page) {
  37 |   await page.getByRole('button', { name: 'Open Messages', exact: true }).first().click()
  38 |   await page.getByRole('button', { name: 'Open Sophie conversation', exact: true }).click()
  39 | }
  40 | export async function sceneReply(page: Page, text: string | RegExp) {
> 41 |   await page.getByRole('button', { name: text, exact: typeof text === 'string' }).click()
     |                                                                                   ^ Error: locator.click: Test timeout of 150000ms exceeded.
  42 |   await page.getByRole('button', { name: 'Send', exact: true }).click()
  43 |   await page.clock.runFor(120_000)
  44 | }
  45 | 
```