import { expect, test } from '@playwright/test'
import { sceneAt, sceneNow, seedScene, settleScene, openSophie } from './scene01-helper'
import { scene01Invitation, sendScene01Choice } from '../../src/game/scene01'

test('group notifications overlay another app, swipe away and open the joined thread', async ({ page }) => {
  let save = settleScene(sendScene01Choice(sceneAt('14'), 'a', '', true, sceneNow(sceneAt('14'))))
  save = scene01Invitation(save, 'join', sceneNow(save))
  await seedScene(page, save)
  await expect(page.getByRole('button', { name: 'Open Search', exact: true })).toHaveCount(0)
  await page.getByRole('button', { name: 'Open Contacts', exact: true }).first().click()
  await page.clock.runFor(6000)
  const banner = page.getByLabel('Incoming notification', { exact: true })
  await expect(banner).toBeVisible()
  await expect(banner).toContainText('FIND DANIEL')
  await page.clock.runFor(300)
  const box = (await banner.boundingBox())!, device = (await page.locator('.device').boundingBox())!
  expect(box.y - device.y).toBeLessThan(100)
  await page.screenshot({ path: 'qa/phone-interaction/group-banner.png', animations: 'disabled' })
  await page.mouse.move(box.x + 100, box.y + 40)
  await page.mouse.down()
  await page.mouse.move(box.x + 100, box.y - 30, { steps: 5 })
  await page.mouse.up()
  await expect(banner).toHaveCount(0)
  await expect(page.getByRole('heading', { name: 'Contacts', exact: true })).toBeVisible()
  await page.clock.runFor(10_000)
  await page.getByRole('button', { name: 'Open notification from FIND DANIEL', exact: true }).click()
  await expect(page.getByRole('region', { name: 'FIND DANIEL group conversation' })).toBeVisible()
  await expect(page.locator('.incoming .message-avatar img').first()).toBeVisible()
})

test('old Sophie note stays hidden and ordinary player photos retain the full-size viewer', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  const save = sceneAt('02'); save.prologue!.noteSeen = true
  await seedScene(page, save)
  await page.getByRole('button', { name: 'Open Photos', exact: true }).click()
  await expect(page.getByRole('button', { name: 'Open photo from Sophie', exact: true })).toHaveCount(0)
  await page.getByRole('button', { name: 'Open wallpaper', exact: true }).click()
  const viewer = page.getByRole('dialog', { name: 'Photo viewer', exact: true })
  const viewBox = (await viewer.boundingBox())!, phoneBox = (await page.locator('.device').boundingBox())!
  expect(viewBox.width).toBeGreaterThan(phoneBox.width * .9)
  await page.getByRole('button', { name: 'Zoom in', exact: true }).click()
  await expect(viewer.locator('img')).toHaveCSS('transform', /1\.5/)
  await page.getByRole('button', { name: 'Close photo', exact: true }).click()
  await expect(viewer).toHaveCount(0)
  await page.getByRole('button', { name: 'Back to home', exact: true }).click()
  await openSophie(page)
  await expect(page.locator('.chat-attachment')).toHaveCount(0)
  const header = await page.locator('.opening-chat-header').boundingBox(), back = await page.getByRole('button', { name: 'Back to inbox', exact: true }).boundingBox()
  expect(back!.x - header!.x).toBeLessThan(25)
  expect(await page.locator('.opening-thread').evaluate(node => getComputedStyle(node).scrollbarWidth)).toBe('none')
})

test('typing uses an avatar and dots and received messages notify above the active chat', async ({ page }) => {
  const base = sceneAt('02')
  const save = sendScene01Choice(base, 'a', '', true, sceneNow(base))
  save.prologue!.scene01!.queue[0].dueAt = sceneNow(save) + 6000
  await seedScene(page, save)
  await openSophie(page)
  const typing = page.getByRole('status', { name: 'Sophie is typing', exact: true })
  await expect(typing.locator('img')).toBeVisible()
  await expect(typing).toHaveText('')
  await expect(page.getByLabel('Online', { exact: true })).toBeVisible()
  await page.clock.runFor(6000)
  await expect(page.getByLabel('Incoming notification', { exact: true })).toContainText('Thanks.')
  await page.getByRole('button', { name: 'Dismiss notification', exact: true }).click()
  await expect(page.getByText('Waiting for a reply…', { exact: true })).toHaveCount(0)
})
