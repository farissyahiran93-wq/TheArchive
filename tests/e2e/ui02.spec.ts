import { completeOpening } from './opening-helper'
import { expect, test } from '@playwright/test'

test('Messages keeps Bulletin correspondence private and filters its own inbox', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/?devtools=1&legacyopening=1')
  await page.getByRole('button', { name: /Enter the archive/i }).click()
  await page.getByLabel('Your name').fill('Rae')
  await page.getByRole('button', { name: /Set up phone/i }).click()
  await completeOpening(page)
  await page.getByRole('button', { name: 'Open Messages' }).first().click()
  await page.getByRole('button', { name: 'Open Test channel conversation' }).click()
  await expect(page.getByText('I am checking that messages arrive in order.')).toBeVisible()
  await page.getByRole('button', { name: 'I can read you clearly.' }).click()
  await page.getByRole('button', { name: /^Send$/ }).click()
  await expect(page.getByText('The test is complete. Your conversation will be here when you return.')).toBeVisible()

  await page.evaluate(async () => {
    const db = await new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open('the-archive-reboot', 1)
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction('saves', 'readwrite')
      const request = tx.objectStore('saves').get('primary')
      request.onsuccess = () => {
        const save = request.result
        save.messages.push(
          { id: 'ui02.private-maya', sender: 'maya', text: 'Bulletin-only reply marker', at: Date.now(), delivery: 'delivered' },
          { id: 'ui02.private-player', sender: 'player', recipient: 'maya', text: 'Bulletin-only outgoing marker', at: Date.now(), delivery: 'delivered' },
        )
        tx.objectStore('saves').put(save, 'primary')
      }
      tx.oncomplete = () => resolve()
      tx.onerror = () => reject(tx.error)
    })
    db.close()
  })

  await page.reload()
  await page.getByRole('button', { name: /Enter the archive/i }).click()
  await page.getByRole('button', { name: 'Open Messages' }).first().click()
  await expect(page.getByText('Bulletin-only reply marker')).toHaveCount(0)
  await expect(page.getByText('Bulletin-only outgoing marker')).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'Open Test channel conversation' }).locator('.thread-text small')).toContainText('The test is complete.')
  await page.getByLabel('Search conversations').fill('Bulletin-only')
  await expect(page.getByText('No conversations found.')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Open Test channel conversation' })).toHaveCount(0)
  await page.getByLabel('Search conversations').fill('test')
  await page.getByRole('button', { name: 'Open Test channel conversation' }).click()
  await expect(page.locator('.bubble.fixture')).toHaveCount(4)
  await expect(page.locator('.bubble.player')).toHaveCount(1)
  await expect(page.getByText('Bulletin-only reply marker')).toHaveCount(0)
  await expect(page.getByText('Bulletin-only outgoing marker')).toHaveCount(0)
})
