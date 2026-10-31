import { completeOpening } from './opening-helper'
import { expect, test, type Page } from '@playwright/test'


async function expectContained(page: Page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true)
  const device = page.locator('.device')
  expect(await device.evaluate(element => element.scrollWidth <= element.clientWidth + 1)).toBe(true)
}

async function setUpPhone(page: Page, name = 'Rae') {
  await page.getByRole('button', { name: /Enter the archive/i }).click()
  await page.getByLabel('Your name').fill(name)
  await page.getByRole('button', { name: /Set up phone/i }).click()
  await completeOpening(page)
  await expect(page.getByRole('main', { name: `${name}'s home screen` })).toBeVisible()
}

test('phone lock, two home pages and app navigation at 390x844', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/?legacyopening=1')
  await expect(page.getByRole('button', { name: /Enter the archive/i })).toBeVisible()
  await expectContained(page)
  await page.screenshot({ animations: 'disabled', scale: 'css', path: test.info().outputPath(`lock-390x844.png`) })
  await setUpPhone(page)
  await expectContained(page)
  const calendarFits = await page.locator('.month-widget').evaluate(element => {
    const last = element.querySelector('.widget-month span:last-child')!
    return last.getBoundingClientRect().bottom <= element.getBoundingClientRect().bottom - 8
  })
  expect(calendarFits).toBe(true)
  await page.screenshot({ animations: 'disabled', scale: 'css', path: test.info().outputPath(`home-390x844.png`) })
  await page.getByRole('button', { name: 'Show home page 2' }).click()
  await expect(page.getByRole('button', { name: 'Open Settings' })).toBeVisible()
  await expectContained(page)
  await page.screenshot({ animations: 'disabled', scale: 'css', path: test.info().outputPath(`home-page2-390x844.png`) })

  for (const label of ['Settings', 'Calls', 'Bulletin']) {
    await page.getByRole('button', { name: `Open ${label}`, exact: true }).last().click()
    await expectContained(page)
    await page.getByRole('button', { name: 'Go home', exact: true }).click()
    await expect(page.getByRole('main', { name: "Rae's home screen" })).toBeVisible()
    await page.getByRole('button', { name: 'Show home page 2' }).click()
  }
  await page.getByRole('button', { name: 'Show home page 1' }).click()
  await page.getByRole('button', { name: 'Open Search', exact: true }).click()
  await page.getByLabel('Search Greyhaven').fill('library')
  await expect(page.getByText('Library local history desk')).toBeVisible()
  await expectContained(page)
  await page.getByRole('button', { name: 'Go home', exact: true }).click()

  await page.getByRole('button', { name: 'Open Bulletin', exact: true }).last().click()
  await page.getByRole('button', { name: 'Read public brief' }).click()
  await page.getByRole('button', { name: 'Read full brief' }).click()
  await page.getByRole('button', { name: 'Older preview' }).click()
  await page.getByRole('button', { name: 'Pin June row as an observation' }).click()
  await expect(page.getByRole('button', { name: 'View current copy' })).toBeEnabled()
  await page.getByRole('button', { name: 'Go home', exact: true }).click()
  await page.getByRole('button', { name: 'Lock phone', exact: true }).click()
  await expect(page.getByRole('button', { name: /Enter the archive/i })).toBeVisible()
  await page.getByRole('button', { name: /Enter the archive/i }).click()
  await expect(page.getByRole('main', { name: "Rae's home screen" })).toBeVisible()
  await expect(page.getByLabel('Your name')).toHaveCount(0)
  await page.getByRole('button', { name: 'Open Bulletin', exact: true }).last().click()
  await expect(page.getByRole('button', { name: 'June row pinned as preview observation' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'View current copy' })).toBeEnabled()
  await expectContained(page)
})

for (const [width, height] of [[320, 568], [1280, 900]] as const) {
  test(`phone presentation remains usable at ${width}x${height}`, async ({ page }) => {
    await page.setViewportSize({ width, height })
    await page.goto('/?devtools=1&legacyopening=1')
    await expect(page.getByRole('button', { name: /Enter the archive/i })).toBeVisible()
    await expectContained(page)
    await page.screenshot({ animations: 'disabled', scale: 'css', path: test.info().outputPath(`lock-${width}x${height}.png`) })
    await setUpPhone(page, 'Sam')
    await expect(page.getByRole('button', { name: 'Open Messages', exact: true }).first()).toBeVisible()
    await expect(page.getByRole('button', { name: 'Read Daniel Mercer brief' })).toBeInViewport({ ratio: 1 })
    await expectContained(page)
    await page.screenshot({ animations: 'disabled', scale: 'css', path: test.info().outputPath(`home-${width}x${height}.png`) })
    await page.getByRole('button', { name: 'Open Messages', exact: true }).first().click()
    await page.getByRole('button', { name: 'Open Test channel conversation' }).click()
    await expect(page.getByText('Hello, Sam. This is a development conversation.')).toBeVisible()
    await expectContained(page)
    await page.screenshot({ animations: 'disabled', scale: 'css', path: test.info().outputPath(`messages-${width}x${height}.png`) })
    await page.getByRole('button', { name: 'Go home', exact: true }).click()
    await expect(page.getByRole('main', { name: "Sam's home screen" })).toBeVisible()
  })
}

