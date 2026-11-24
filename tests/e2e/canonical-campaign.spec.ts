import { expect, test } from '@playwright/test'
import { newGame } from '../../src/game/types'
import { beginLegacyScene01 } from '../../src/game/scene01'

test('normal entry ignores old route switches and keeps an obsolete save available for export', async ({ page }) => {
  await page.goto('/?legacyopening=1&gameplaytest=1&devtools=1')
  await expect(page.getByRole('main', { name: 'GREYHAVEN main menu' })).toBeVisible()
  await page.getByRole('button', { name: 'CHAPTERS & SCENES' }).click()
  await expect(page.locator('.chapter-card')).toHaveCount(5)
  await expect(page.locator('.chapter-card:disabled')).toHaveCount(4)
  await page.locator('.chapter-card').first().click()
  await expect(page.locator('.library-scene')).toHaveCount(10)
  await expect(page.getByText(/The Missing Entry|The Byline|The Transfer Register/)).toHaveCount(0)
  const old = beginLegacyScene01(newGame(), 1000)
  const saved = await page.evaluate(async save => {
    const db = await new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open('the-archive-reboot', 1)
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
    const transaction = db.transaction('saves', 'readwrite')
    transaction.objectStore('saves').put(save, 'primary')
    await new Promise<void>((resolve, reject) => {
      transaction.oncomplete = () => resolve()
      transaction.onerror = () => reject(transaction.error)
    })
    db.close()
    return save
  }, old)
  await page.reload()
  await expect(page.getByRole('button', { name: /CONTINUE GAME/ })).toBeDisabled()
  const download = page.waitForEvent('download')
  await page.getByRole('button', { name: 'DOWNLOAD SAVE BACKUP' }).click()
  expect((await download).suggestedFilename()).toBe('the-archive-save-backup.json')
  expect(saved.prologue?.scene01?.masterScene01).toBeUndefined()
})
