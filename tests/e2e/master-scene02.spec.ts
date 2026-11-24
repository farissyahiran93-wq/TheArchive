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

test.use({ reducedMotion: 'reduce', viewport: { width: 375, height: 812 } })
test('seven friends and their guest, ten decisions, Lucas departure and private handoff survive reload', async ({ page }) => {
  test.setTimeout(240000)
  await seedScene(page, ready())
  await expect(page.locator('.scene01-chat')).toHaveCount(0)
  await page.getByRole('button', { name: 'Open Messages', exact: true }).first().click()
  await page.getByRole('button', { name: 'Open Same Old Chaos group conversation', exact: true }).click()
  await page.clock.runFor(210000)
  await expect(page.locator('.scene01-chat')).toHaveAttribute('data-scene-node', 'TA-S02-ELI-C01')
  await page.getByRole('button', { name: 'View Same Old Chaos group info' }).click()
  await expect(page.getByRole('dialog', { name: 'Same Old Chaos group info' }).getByText('8 members', { exact: false })).toBeVisible()
  await expect(page.getByText('Original member · Offline', { exact: true })).toBeVisible()
  for (const [name, portrait] of [['Noah Reed','noah'],['Ana Pierce','ana'],['Eli Ward','eli']]) {
    await page.getByRole('button', { name: new RegExp(name) }).click()
    const profile = page.getByRole('dialog', { name: name + ' profile' })
    await expect(profile.getByText('Online', {exact:true})).toBeVisible()
    const image = profile.locator('.chat-profile-portrait img')
    await expect(image).toHaveAttribute('src', '/media/portraits/' + portrait + '-avatar.webp')
    await expect.poll(() => image.evaluate(el => (el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0)
    await page.getByRole('button', { name: 'Back from profile' }).click()
  }
  await page.getByRole('button', { name: 'Back from profile' }).click()
  await expect(page.getByText('Hi. I\'m Eli.', { exact: true })).toHaveCount(1)
  await expect(page.getByText("He's not wrong.", { exact: true })).toHaveCount(1)
  for (let i = 1; i <= 10; i++) {
    await expect(page.locator('.scene01-chat')).toHaveAttribute('data-scene-node', `TA-S02-ELI-C${String(i).padStart(2, '0')}`)
    await expect(page.locator('.scene01-options .opening-choice')).toHaveCount(3)
    await page.locator('.scene01-options .opening-choice').nth((i - 1) % 3).click()
    if (i === 1) {
      await expect(page.locator('.opening-bubble.player')).toHaveCount(0)
      await page.getByRole('button', { name: 'Back to inbox' }).click()
      await page.getByRole('button', { name: 'Open Same Old Chaos group conversation', exact: true }).click()
      await expect(page.locator('.scene01-options .opening-choice').first()).toHaveAttribute('aria-pressed','true')
    }
    await page.getByRole('button', { name: 'Send', exact: true }).click()
    await page.clock.runFor(210000)
  }
  await expect(page.getByText('Lucas left the group.', { exact: true })).toHaveCount(1)
  await expect(page.getByText('Hey. Can we talk privately for a minute?', { exact: true })).toHaveCount(0)
  await page.getByRole('button', { name: 'Go home' }).click()
  await page.getByRole('button', { name: 'Open Contacts', exact: true }).first().click()
  await page.getByRole('button', { name: 'View Ana Pierce profile' }).click()
  await expect(page.getByRole('dialog', { name: 'Ana Pierce profile' }).getByText('Ask one more question.')).toBeVisible()
  await page.getByRole('button', { name: 'Back from profile' }).click()
  await expect(page.getByRole('button', { name: 'View Noah Reed profile' })).toBeVisible()
  await expect(page.getByRole('button', { name: /Lucas Grey From Same Old Chaos/ })).toBeVisible()
  await page.getByRole('button', { name: 'Go home' }).click()
  await page.waitForFunction(() => !sessionStorage.getItem('the-archive-reboot:pending-save:v1'))
  await page.reload()
  await page.getByRole('button', { name: 'Unlock phone', exact: true }).click()
  await page.getByRole('button', { name: 'Open Messages', exact: true }).first().click()
  await page.getByRole('button', { name: 'Open Sophie conversation', exact: true }).click()
  await expect(page.getByText('Hey. Can we talk privately for a minute?', { exact: true })).toHaveCount(1)
  await page.clock.runFor(210000)
  await expect(page.locator('.scene01-chat')).toHaveAttribute('data-scene-node', 'TA-S03-C01')
})
