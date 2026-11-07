import { test, expect } from '@playwright/test'
import { beginScene01 } from '../../src/game/scene01'
import { newGame } from '../../src/game/types'
import { seedScene, openSophie } from './scene01-helper'

test.use({ reducedMotion: 'reduce' })

test('new game delivers the first message on Home without opening the chat', async ({ page }) => {
  await page.clock.install()
  await page.goto('/')
  await page.getByRole('button', { name: 'NEW GAME', exact: true }).click()
  await page.getByRole('button', { name: 'Unlock phone', exact: true }).click()
  await page.clock.runFor(30000)
  await expect(page.locator('.scene01-chat')).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'Open Messages', exact: true }).first()).toBeVisible()
  await openSophie(page)
  await page.clock.runFor(120000)
  await expect(page.locator('.scene01-chat')).toHaveAttribute('data-scene-node', 'TA-S01-C01')
})

test('master opening persists choices and invitation without starting scene two', async ({ page }) => {
  await seedScene(page, beginScene01({ ...newGame(), masterOpening: true, chapter1Edition: 'ch01-v2-10' }, Date.now()))
  await expect(page.locator('.scene01-chat')).toHaveCount(0)
  await openSophie(page)
  await page.clock.runFor(120000)
  for (let i = 1; i <= 9; i++) {
    await expect(page.locator('.scene01-chat')).toHaveAttribute('data-scene-node', `TA-S01-C${String(i).padStart(2, '0')}`)
    await expect(page.locator('.scene01-options .opening-choice')).toHaveCount(3)
    await page.locator('.scene01-options .opening-choice').nth(i === 9 ? 2 : 0).click()
    await page.getByRole('button', { name: 'Send', exact: true }).click()
    await page.clock.runFor(120000)
    if (i === 1) {
      await page.getByRole('button', { name: /Open Sophie.s photo: Birthday photograph/ }).click()
      await expect(page.getByRole('dialog', { name: 'Photo viewer' })).toBeVisible()
      await page.getByRole('button', { name: 'Close photo' }).click()
      await page.getByRole('button', { name: 'REPLY ABOUT PHOTO' }).click()
      const replies = page.getByLabel('Reply about family photo')
      await expect(replies.locator('.opening-choice')).toHaveCount(3)
      await replies.locator('.opening-choice').first().click()
      await page.getByRole('button', { name: 'Send photo reply' }).click()
      await expect(page.locator('.opening-bubble.sophie').getByText("Thank you for checking. I didn't want you to feel pressured to remember.")).toBeVisible()
    }
  }
  await expect(page.getByRole('button', { name: 'Reconsider invitation' })).toBeVisible()
  await page.getByRole('button', { name: 'Reconsider invitation' }).click()
  await page.getByRole('button', { name: 'NOT NOW', exact: true }).click()
  await page.waitForFunction(() => !sessionStorage.getItem('the-archive-reboot:pending-save:v1'))
  await page.reload()
  await page.getByRole('button', { name: 'Unlock phone', exact: true }).click()
  await openSophie(page)
  await page.getByRole('button', { name: 'View invitation', exact: true }).click()
  await page.getByRole('button', { name: 'JOIN GROUP', exact: true }).click()
  await expect(page.locator('[data-scene-node^="OPEN-S02-"]')).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'JOIN GROUP', exact: true })).toHaveCount(0)
})
