import { expect, type Page } from '@playwright/test'
import { newGame, type GameSave } from '../../src/game/types'
import { scene01Nodes } from '../../src/content/scene01'
import { beginScene01, deliverScene01, scene01Invitation, sendScene01Choice } from '../../src/game/scene01'

export const sceneTime = Date.parse('2026-10-21T12:00:00Z')
export function sceneNow(save: GameSave): number { return Math.max(sceneTime, ...(save.prologue?.scene01?.messages.map(line => line.at) ?? []), ...(save.prologue?.scene01?.groupMessages.map(line => line.at) ?? [])) + 100 }
export function settleScene(save: GameSave): GameSave {
  for (let i = 0; i < 100; i++) { const due = save.prologue?.scene01?.queue[0]?.dueAt; if (due === undefined) return save; save = deliverScene01(save, due) }
  throw new Error('Scene queue did not settle')
}
export function sceneAt(number: string, picks: Record<string,string> = {}): GameSave {
  let save = settleScene(beginScene01(newGame(), sceneTime))
  for (let i = 0; i < 80; i++) {
    const node = scene01Nodes[save.prologue!.scene01!.nodeId]
    if (node.kind === 'choice' && node.number === number) return save
    if (number.startsWith('G') && save.prologue!.scene01!.invitation === 'ready') { save = settleScene(scene01Invitation(save, 'join', sceneNow(save))); continue }
    if (node.kind !== 'choice') throw new Error(`No choice at ${node.id}`)
    save = settleScene(sendScene01Choice(save, node.number ? picks[node.number] ?? 'a' : 'continue', 'Alex', true, sceneNow(save)))
  }
  throw new Error('No requested choice')
}
export async function seedScene(page: Page, save: GameSave) {
  await page.clock.install({ time: new Date(sceneNow(save)) })
  await page.goto('/')
  await expect(page.getByRole('button', { name: 'Enter the archive', exact: true })).toBeVisible()
  await page.evaluate(async value => {
    const db = await new Promise<IDBDatabase>((resolve,reject) => { const request = indexedDB.open('the-archive-reboot',1); request.onsuccess = () => resolve(request.result); request.onerror = () => reject(request.error) })
    await new Promise<void>((resolve,reject) => { const tx = db.transaction('saves','readwrite'); tx.objectStore('saves').put(value,'primary'); tx.oncomplete = () => resolve(); tx.onerror = () => reject(tx.error) })
    db.close()
  }, save)
  await page.reload()
  await page.getByRole('button', { name: 'Enter the archive', exact: true }).click()
}
export async function openSophie(page: Page) {
  await page.getByRole('button', { name: 'Open Messages', exact: true }).first().click()
  await page.getByRole('button', { name: 'Open Sophie conversation', exact: true }).click()
}
export async function sceneReply(page: Page, text: string | RegExp) {
  await page.getByRole('button', { name: text, exact: typeof text === 'string' }).click()
  await page.getByRole('button', { name: 'Send', exact: true }).click()
  await page.clock.runFor(120_000)
}
