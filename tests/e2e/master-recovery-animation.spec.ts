import { expect, test } from '@playwright/test'
import { cinematicBeats } from '../../src/content/masterScene04Cinematic'
import { masterScene04Action as scene4 } from '../../src/game/masterScene04'
import { beginScene01, beginScene02, deliverScene01, openScene03, scene01Invitation, sendScene01Choice } from '../../src/game/scene01'
import { newGame, type GameSave } from '../../src/game/types'
import { prepareMasterScene05Recovery, seedScene } from './scene01-helper'

function settle(save: GameSave): GameSave {
  for (let i = 0; i < 100; i++) {
    const next = save.prologue?.scene01?.queue[0]
    if (!next) return save
    save = deliverScene01(save, next.dueAt)
  }
  throw new Error('Opening queue did not settle')
}

function readyForRecovery(): GameSave {
  let save = settle(beginScene01({ ...newGame(), masterOpening: true, chapter1Edition: 'ch01-v2-10' }, 1000))
  for (let i = 0; i < 9; i++) save = settle(sendScene01Choice(save, 'a', '', true, 20000 + i * 1000))
  save = settle(beginScene02(scene01Invitation(save, 'join'), 40000))
  save = settle(sendScene01Choice(save, 'c', 'Alex', true, 41000))
  for (let i = 0; i < 9; i++) save = settle(sendScene01Choice(save, 'a', '', true, 50000 + i * 1000))
  save = settle(openScene03(save, 100000))
  for (let i = 0; i < 10; i++) save = settle(sendScene01Choice(save, 'a', '', true, 140000 + i * 1000))
  save = scene4(scene4(save, { type: 'start' }, 200000), { type: 'open' })
  while (save.masterScene04?.pending) save = scene4(save, { type: 'tick' }, save.masterScene04.pending.dueAt)
  for (let i = 0; i < cinematicBeats.length; i++) {
    save = scene4(scene4(save, { type: 'draft', index: 0 }), { type: 'send' }, 210000 + i * 50000)
    while (save.masterScene04?.pending) save = scene4(save, { type: 'tick' }, save.masterScene04.pending.dueAt)
  }
  save = scene4(save, { type: 'setup-trace' })
  save = prepareMasterScene05Recovery(save)
  return save
}

test('recovery preserves progress on reload and stops at the 20% interruption', async ({ page }) => {
  await seedScene(page, readyForRecovery())
  await page.clock.pauseAt(await page.evaluate(() => Date.now()))
  await page.getByRole('button', { name: 'Open TRACE', exact: true }).click()
  await expect(page.getByText('Recovery: 0%', { exact: true })).toBeVisible()
  await page.getByRole('button', { name: 'START RECOVERY' }).click()
  const progress = page.getByRole('progressbar', { name: 'Archive recovery' })
  await expect(progress).toHaveAttribute('aria-valuenow', '0')
  await page.clock.runFor(2000)
  await expect(progress).toHaveAttribute('aria-valuenow', '5')
  await page.waitForFunction(() => !sessionStorage.getItem('the-archive-reboot:pending-save:v1'))
  await page.reload()
  await page.getByRole('button', { name: 'Unlock phone' }).click()
  await page.getByRole('button', { name: 'Open TRACE', exact: true }).click()
  await expect(progress).toHaveAttribute('aria-valuenow', '5')
  await page.clock.runFor(6000)
  await expect(page.getByRole('dialog', { name: 'Recovery interrupted' })).toBeVisible()
  await expect(progress).toHaveAttribute('aria-valuenow', '20')
  await expect(page.getByText('20% RECOVERED · 80% UNAVAILABLE')).toBeVisible()
  await page.getByRole('button', { name: 'OPEN RECOVERED DATA' }).click()
  await expect(page.getByText('Recovery: 20%', { exact: true })).toBeVisible()
  await page.waitForFunction(() => !sessionStorage.getItem('the-archive-reboot:pending-save:v1'))
  await page.reload()
  await page.getByRole('button', { name: 'Unlock phone' }).click()
  await page.getByRole('button', { name: 'Open TRACE', exact: true }).click()
  await expect(page.getByText('Recovery: 20%', { exact: true })).toBeVisible()
  await expect(page.getByRole('dialog', { name: 'Recovery interrupted' })).toHaveCount(0)

  // A completed discussion proceeds to the next conversation without a scene button.
  await page.getByRole('button', { name: 'Open Notes module' }).click()
  await page.getByRole('button', { name: /Dinner Reminder/ }).click()
  await page.getByRole('button', { name: 'Go home' }).click()
  await page.getByRole('button', { name: 'Open Messages', exact: true }).first().click()
  await page.getByRole('button', { name: 'Open Unknown conversation', exact: true }).click()
  const topic=page.getByLabel('Discuss with Unknown')
  await topic.selectOption('dinner')
  await page.getByRole('button', { name: "There's a reminder about dinner with Maya." }).click()
  await page.getByRole('button', { name: 'Send', exact: true }).click()
  await page.clock.runFor(30000)
  await page.getByRole('button', { name: "The date isn't available." }).click()
  await page.getByRole('button', { name: 'Send', exact: true }).click()
  await page.clock.runFor(30000)
  await topic.selectOption('finish')
  await page.getByRole('button', { name: 'Send', exact: true }).click()
  await expect(page.getByRole('button', { name: /^(START|CONTINUE TO) SCENE 6$/i })).toHaveCount(0)
  await page.clock.runFor(30000)
  await expect(page.getByText('The activity records are already in the part you recovered.', { exact: false })).toBeVisible()
})
