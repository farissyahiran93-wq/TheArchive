import { expect, test } from '@playwright/test'
import { completeOpening } from './opening-helper'


test('Daniel phone keeps investigation tools optional and fits narrow screens', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/?legacyopening=1')
  await page.getByRole('button', { name: "Open Sophie's new message" }).click()
  await page.getByLabel('Your name').fill('Rae')
  await page.getByRole('button', { name: 'Set up phone' }).click()
  await completeOpening(page)
  await page.getByRole('button', { name: 'Open The Archive', exact: true }).click()
  for (const width of [390, 320]) {
    await page.setViewportSize({ width, height: width === 320 ? 568 : 844 })
    await expect(page.locator('.mirror-on-home')).not.toContainText(/snapshot|recovered/i)
    await page.screenshot({ animations: 'disabled', path: test.info().outputPath(`home-${width}.png`) })
    await page.locator('.mirror-icon').filter({ hasText: 'Messages' }).click()
    await page.locator('.mirror-file').first().click()
    const conversation = page.getByLabel('iMessage conversation')
    await expect(conversation).toContainText('Did you eat the last of the biscuits?')
    await expect(conversation).not.toContainText(/snapshot|recovered|unverified|Source and metadata/i)
    await expect(page.getByRole('button', { name: 'Daniel phone home', exact: true })).toBeInViewport()
    await expect(page.getByRole('button', { name: 'Save to Case Board', exact: true })).toHaveCount(0)
    await page.screenshot({ animations: 'disabled', path: test.info().outputPath(`messages-${width}.png`) })
    await page.getByRole('button', { name: 'More options' }).click()
    await expect(page.getByRole('region', { name: 'Record options' })).toBeVisible()
    if (width === 390) await page.getByRole('button', { name: 'Save to Case Board', exact: true }).click()
    await expect(page.getByRole('button', { name: 'Saved to Case Board', exact: true })).toBeDisabled()
    await page.getByRole('button', { name: 'Close options' }).click()
    await page.getByRole('button', { name: 'Daniel phone home', exact: true }).click()
    for (const app of ['Notes', 'Photos']) {
      await page.locator('.mirror-icon').filter({ hasText: app }).click()
      if (app === 'Photos') await page.screenshot({ animations: 'disabled', path: test.info().outputPath(`albums-${width}.png`) })
      await page.locator('.mirror-file').first().click()
      if (app === 'Photos') {
        await page.getByRole('button', { name: 'View Shelf photo', exact: true }).click()
        await expect.poll(() => page.getByRole('dialog').locator('img').evaluate(image => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0)
      }
      await page.screenshot({ animations: 'disabled', path: test.info().outputPath(`${app.toLowerCase()}-${width}.png`) })
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
      if (app === 'Photos') await page.getByRole('button', { name: 'Back to album', exact: true }).click()
      await page.getByRole('button', { name: 'Daniel phone home', exact: true }).click()
    }
  }
})
