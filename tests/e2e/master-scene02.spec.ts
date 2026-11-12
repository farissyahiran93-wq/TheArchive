import { expect, test } from '@playwright/test'
import { newGame, type GameSave } from '../../src/game/types'
import { beginScene01, deliverScene01, scene01Invitation, sendScene01Choice } from '../../src/game/scene01'
import { seedScene } from './scene01-helper'

function settle(s: GameSave): GameSave {
  for (let i = 0; i < 100; i++) { const q = s.prologue?.scene01?.queue[0]; if (!q) return s; s = deliverScene01(s, q.dueAt) }
  throw Error('Queue did not settle')
}
function ready(): GameSave {
  let s = settle(beginScene01({ ...newGame(), masterOpening: true, chapter1Edition: 'ch01-v2-10' }, 1800000000000))
  for (let i = 0; i < 9; i++) s = settle(sendScene01Choice(s, 'a', '', true, 1800000100000 + i * 1000))
  return scene01Invitation(s, 'join', 1800000200000)
}

test.use({ reducedMotion: 'reduce' })
test('manual group entry, nine choices, Lucas departure and private handoff survive reload', async ({ page }) => {
  await seedScene(page, ready())
  await expect(page.locator('.scene01-chat')).toHaveCount(0)
  await page.getByRole('button', { name: 'Open Messages', exact: true }).first().click()
  await page.getByRole('button', { name: 'Open Same Old Chaos group conversation', exact: true }).click()
  await page.clock.runFor(120000)
  await expect(page.locator('.scene01-chat')).toHaveAttribute('data-scene-node', 'TA-S02-V3-NAME-CHOICE')
  await page.getByRole('button', { name: 'View Same Old Chaos group info' }).click()
  await expect(page.getByRole('dialog', { name: 'Same Old Chaos group info' }).getByText('5 members', { exact: false })).toBeVisible()
  await expect(page.getByText('Original member · Offline', { exact: true })).toBeVisible()
  await page.getByRole('button', { name: 'Back from profile' }).click()
  await expect(page.getByText('This was our private group. Who are you?', { exact: true })).toBeVisible()
  await page.locator('.scene01-options .opening-choice').nth(1).click()
  await page.getByLabel('Your name', { exact: true }).fill('Alex')
  await expect(page.locator('.opening-bubble.player').getByText("I'm Ms. Alex.", { exact: true })).toHaveCount(0)
  await page.getByRole('button', { name: 'Send', exact: true }).click()
  await page.clock.runFor(120000)
  await expect(page.locator('.opening-bubble.player').getByText("I'm Ms. Alex.", { exact: true })).toBeVisible()
  for (let i = 1; i <= 9; i++) {
    await expect(page.locator('.scene01-chat')).toHaveAttribute('data-scene-node', `TA-S02-C${String(i).padStart(2, '0')}`)
    await expect(page.locator('.scene01-options .opening-choice')).toHaveCount(3)
    await page.locator('.scene01-options .opening-choice').nth((i - 1) % 3).click()
    await page.getByRole('button', { name: 'Send', exact: true }).click()
    await page.clock.runFor(120000)
  }
  await expect(page.getByText('Lucas Grey left the group.', { exact: true })).toHaveCount(1)
  await expect(page.getByText('Hey. Are you okay after all of that?', { exact: true })).toHaveCount(0)
  await page.waitForFunction(() => !sessionStorage.getItem('the-archive-reboot:pending-save:v1'))
  await page.reload()
  await page.getByRole('button', { name: 'Unlock phone', exact: true }).click()
  await page.getByRole('button', { name: 'Open Messages', exact: true }).first().click()
  await page.getByRole('button', { name: 'Open Sophie conversation', exact: true }).click()
  await expect(page.getByText('Hey. Are you okay after all of that?', { exact: true })).toHaveCount(1)
  await page.clock.runFor(120000)
  await expect(page.locator('.scene01-chat')).toHaveAttribute('data-scene-node', 'TA-S03-C01')
})
