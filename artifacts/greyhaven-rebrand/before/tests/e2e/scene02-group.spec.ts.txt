import { expect, test, type Page } from '@playwright/test'
import { sceneAt, sceneNow, seedScene, settleScene } from './scene01-helper'
import { beginScene02, scene01Invitation, sendScene01Choice } from '../../src/game/scene01'
import { scene01Nodes } from '../../src/content/scene01'
import type { GameSave } from '../../src/game/types'

function groupAt(number = '01', picks: Record<string, string> = {}) {
  let save = sceneAt('14')
  save = settleScene(sendScene01Choice(save, 'a', '', true, sceneNow(save)))
  save = settleScene(scene01Invitation(save, 'join', sceneNow(save)))
  for (let i = 0; i < 80; i++) {
    const node = scene01Nodes[save.prologue!.scene01!.nodeId]
    if (node.kind === 'choice' && node.number === `G${number}`) return save
    if (node.kind !== 'choice') throw new Error('No group choice')
    save = settleScene(sendScene01Choice(save, node.number ? picks[node.number] ?? 'a' : 'continue', '', true, sceneNow(save)))
  }
  throw new Error('No target')
}
async function open(page: Page, save: GameSave) {
  await seedScene(page, save)
  await page.getByRole('button', { name: 'Open Messages', exact: true }).first().click()
  await page.getByRole('button', { name: 'Open FIND DANIEL group conversation', exact: true }).click()
}
async function send(page: Page, text: string) {
  await page.getByRole('button', { name: text, exact: true }).click()
  await page.getByRole('button', { name: 'Send', exact: true }).click()
  await page.clock.runFor(240_000)
}

test('replacement group begins at the new script and keeps premium sub-replies behind Send across reload', async ({ page }) => {
  await open(page, groupAt())
  const group = page.getByRole('region', { name: 'FIND DANIEL group conversation', exact: true })
  await expect(group.getByRole('button', { name: "Hi. I'm just as confused as you are.", exact: true })).toBeVisible()
  await expect(group.locator('.opening-bubble').filter({ hasText: 'Hey, everyone.' })).toHaveCount(1)
  await expect(group.locator('.group-sender').filter({ hasText: /^Maya$/ }).first()).toBeVisible()
  await expect(group.locator('.group-sender').filter({ hasText: /^Lucas$/ }).first()).toBeVisible()
  await expect(group.locator('.incoming .character-avatar img[src*="maya"]').first()).toBeVisible()
  const premium = "I know this looks strange. But if you're worried about Daniel, maybe we can start by not arguing."
  await page.getByRole('button', { name: premium, exact: false }).click()
  await expect(group.locator('.opening-bubble.player')).toHaveCount(0)
  await page.getByRole('button', { name: 'Send', exact: true }).click()
  await page.clock.runFor(60_000)
  await expect(page.getByRole('button', { name: "I'm not telling you how to handle anything.", exact: true })).toBeVisible()
  await expect(group.locator('.opening-bubble.player')).toHaveCount(1)
  await page.reload()
  await page.getByRole('button', { name: 'Enter the archive', exact: true }).click()
  await page.getByRole('button', { name: 'Open Messages', exact: true }).first().click()
  await page.getByRole('button', { name: 'Open FIND DANIEL group conversation', exact: true }).click()
  await send(page, "I'm not telling you how to handle anything.")
  await expect(page.getByRole('button', { name: "I'm saying we won't get very far if everyone's too busy fighting.", exact: true })).toBeVisible()
  await send(page, "I'm saying we won't get very far if everyone's too busy fighting.")
  await expect(page.getByRole('button', { name: "No. I've never met him.", exact: true })).toBeVisible()
  await page.screenshot({ path: test.info().outputPath('group-replacement.png'), animations: 'disabled' })
})

test('Sophie stays offline during the private-to-group conflict and returns only at the authored beat', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 })
  await open(page, groupAt('06'))
  await expect(page.getByText('Sophie is offline.', { exact: true })).toBeVisible()
  await expect(page.getByLabel('Sophie online', { exact: true })).toHaveCount(0)
  await expect(page.getByRole('button', { name: "I can read everything you're saying, you know.", exact: true })).toBeVisible()
  await send(page, "I don't blame you for being suspicious.")
  await expect(page.getByRole('button', { name: 'Because Sophie asked me to stay.', exact: true })).toBeVisible()
  await send(page, 'Because Sophie asked me to stay.')
  await expect(page.getByRole('button', { name: "I can leave if that's what everyone wants.", exact: true })).toBeVisible()
  await expect(page.getByText('Sophie is online.', { exact: true })).toBeVisible()
  await page.screenshot({ path: test.info().outputPath('group-320.png'), animations: 'disabled' })
  await send(page, "Lucas isn't completely wrong.")
  await expect(page.getByRole('button', { name: "But that doesn't mean Sophie was trying to hurt anyone.", exact: true })).toBeVisible()
  await send(page, "But that doesn't mean Sophie was trying to hurt anyone.")
  await expect(page.getByRole('button', { name: 'What happened that night?', exact: true })).toBeVisible()
  await expect(page.getByText('Lucas left the group.', { exact: true })).toHaveCount(0)
})

test('previous three-line group save is replaced from the beginning once without losing Sophie private history', async ({ page }) => {
  const save = groupAt()
  const scene = save.prologue!.scene01!
  const originalPrivateCount = scene.messages.length
  delete scene.groupScript
  scene.nodeId = 'OPEN-S01-COMPLETE'; scene.queue = []
  scene.groupMessages = scene.groupMessages.slice(0, 4)
  save.deliveredEvents = save.deliveredEvents.filter(id => !id.startsWith('OPEN-S02-'))
  await open(page, save)
  await page.clock.runFor(180_000)
  await expect(page.getByRole('button', { name: "Hi. I'm just as confused as you are.", exact: true })).toBeVisible()
  await expect(page.locator('.opening-bubble').filter({ hasText: 'Hey, everyone.' })).toHaveCount(1)
  const activated = beginScene02(save, 1000)
  expect(beginScene02(activated, 2000)).toBe(activated)
  const storedCount = await page.evaluate(async () => {
    const db = await new Promise<IDBDatabase>(resolve => { const request = indexedDB.open('the-archive-reboot', 1); request.onsuccess = () => resolve(request.result) })
    const data = await new Promise<GameSave>(resolve => { const request = db.transaction('saves').objectStore('saves').get('primary'); request.onsuccess = () => resolve(request.result) })
    db.close(); return data.prologue!.scene01!.messages.length
  })
  expect(storedCount).toBe(originalPrivateCount)
})
