import { expect, test } from '@playwright/test'
import { sceneAt, sceneNow, seedScene, settleScene, openSophie } from './scene01-helper'
import { openScene03, scene01Choices, sendScene01Choice } from '../../src/game/scene01'

test('historical master-route save ends on Goodbye and stays outside Unknown/Archive after reload', async ({ page }) => {
  let save = sceneAt('G13')
  save = settleScene(sendScene01Choice(save, 'a', '', true, sceneNow(save)))
  save = settleScene(openScene03(save, sceneNow(save)))
  for (let i = 0; i < 60 && !save.prologue!.scene01!.privateScene03?.complete; i++) {
    save = settleScene(sendScene01Choice(save, scene01Choices(save)[0].id, '', true, sceneNow(save)))
  }
  expect(save.prologue!.scene01!.messages.at(-1)?.text).toBe('Goodbye.')
  await seedScene(page, save)
  await openSophie(page)
  await expect(page.getByText('Goodbye.', { exact: true }).last()).toBeVisible()
  await expect(page.getByText('Sophie is offline.', { exact: true })).toBeVisible()
  await page.clock.runFor(3_600_000)
  await page.reload()
  await page.getByRole('button', { name: 'Enter the archive', exact: true }).click()
  await page.clock.runFor(60_000)
  const pending = await page.evaluate(() => sessionStorage.getItem('the-archive-reboot:pending-save:v1'))
  if (pending) expect(JSON.parse(pending).save.chapter2Access).toBeUndefined()
  const stored = await page.evaluate(async () => {
    const db = await new Promise<IDBDatabase>(resolve => { const r = indexedDB.open('the-archive-reboot', 1); r.onsuccess = () => resolve(r.result) })
    const value = await new Promise<unknown>(resolve => { const r = db.transaction('saves').objectStore('saves').get('primary'); r.onsuccess = () => resolve(r.result) })
    db.close(); return value as { chapter2Access?: unknown; narrativePlan?: string }
  })
  expect(stored.narrativePlan).toBe('ch01-master-18')
  expect(stored.chapter2Access).toBeUndefined()
  await expect(page.getByRole('complementary', { name: 'Incoming notification' })).toHaveCount(0)
})
