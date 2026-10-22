import { expect, test, type Page } from '@playwright/test'
import { scene01Script } from '../../src/content/scene01Script'
import { sceneAt, seedScene } from './scene01-helper'
import type { GameSave } from '../../src/game/types'

async function stored(page: Page): Promise<GameSave> {
  return page.evaluate(async () => {
    const journal = sessionStorage.getItem('the-archive-reboot:pending-save:v1')
    if (journal) return JSON.parse(journal).save
    const db = await new Promise<IDBDatabase>(resolve => { const request = indexedDB.open('the-archive-reboot', 1); request.onsuccess = () => resolve(request.result) })
    const value = await new Promise<GameSave>(resolve => { const request = db.transaction('saves').objectStore('saves').get('primary'); request.onsuccess = () => resolve(request.result) })
    db.close(); return value
  })
}
async function openGroup(page: Page) {
  await page.getByRole('button', { name: 'Open Messages', exact: true }).first().click()
  await page.getByRole('button', { name: 'Open FIND DANIEL group conversation', exact: true }).click()
}
async function reply(page: Page, text: string | RegExp, advance = true) {
  await page.getByRole('button', { name: text, exact: typeof text === 'string' }).click()
  await page.getByRole('button', { name: 'Send', exact: true }).click()
  if (advance) await page.clock.runFor(180_000)
}
async function reachPending(page: Page) {
  const group = page.getByRole('region', { name: 'FIND DANIEL group conversation' })
  for (let i = 0; i < 120; i++) {
    if (await group.getAttribute('data-group-complete') === 'true') return
    await page.clock.runFor(500)
  }
  throw new Error('Final group messages did not complete')
}

test('whole Scene 01 → all 13 group choices → Lucas leaves → delayed Hey, with no automatic chat opening or forced scroll', async ({ page }) => {
  test.setTimeout(180_000)
  await page.clock.install({ time: new Date('2026-10-22T12:00:00Z') })
  await page.goto('/')
  await page.getByRole('button', { name: 'Enter the archive', exact: true }).click()
  await page.clock.runFor(20_000)
  await page.getByRole('button', { name: 'Open unknown message', exact: true }).click()
  await page.clock.runFor(120_000)
  for (const beat of scene01Script.choices) {
    await expect(page.locator('.scene01-chat')).toHaveAttribute('data-scene-node', `OPEN-S01-C${beat.id}`)
    const before = await page.locator('.opening-bubble.player').count()
    await page.locator('.scene01-options .opening-choice').first().click()
    if (beat.id === '08') await page.getByLabel('Your codename', { exact: true }).fill('Rae')
    await expect(page.locator('.opening-bubble.player')).toHaveCount(before)
    await page.getByRole('button', { name: 'Send', exact: true }).click()
    await page.clock.runFor(60_000)
  }
  await page.getByRole('button', { name: 'JOIN GROUP', exact: true }).click()
  await page.clock.runFor(180_000)
  const group = page.getByRole('region', { name: 'FIND DANIEL group conversation' })
  for (let number = 1; number <= 12; number++) {
    await expect(group).toHaveAttribute('data-scene-node', `OPEN-S02-C${String(number).padStart(2,'0')}`)
    expect(await page.locator('.scene01-options .opening-choice').count()).toBeGreaterThanOrEqual(4)
    await page.locator('.scene01-options .opening-choice').first().click()
    await page.getByRole('button', { name: 'Send', exact: true }).click()
    await page.clock.runFor(180_000)
    // Embedded player lines are still individually selected and sent.
    while (await page.locator('.scene01-options .opening-choice').count() === 1) {
      const before = await group.locator('.opening-bubble.player').count()
      await page.clock.runFor(1000)
      await expect(group.locator('.opening-bubble.player')).toHaveCount(before)
      await page.locator('.scene01-options .opening-choice').first().click()
      await page.getByRole('button', { name: 'Send', exact: true }).click()
      await page.clock.runFor(180_000)
    }
  }
  await expect(group).toHaveAttribute('data-scene-node', 'OPEN-S02-C13')
  await expect(page.getByLabel('Group participants')).toContainText('3 members')
  await expect(page.getByLabel('Group participants')).not.toContainText('Lucas')
  await expect(group.getByText('Lucas left the group.', { exact: true })).toHaveCount(1)
  await expect(group.getByText('Maya deleted a message.', { exact: true })).toHaveCount(2)
  await expect(group.getByText('Can we talk privately?', { exact: true })).toBeVisible()
  await expect(group).not.toHaveAttribute('data-group-complete', 'true')
  await reply(page, 'Sure.', false)
  await group.locator('.opening-thread').evaluate(node => { node.scrollTop = 0; node.dispatchEvent(new Event('scroll', { bubbles: true })) })
  await reachPending(page)
  expect(await group.locator('.opening-thread').evaluate(node => node.scrollTop)).toBe(0)
  const pending = (await stored(page)).prologue!.scene01!.privateHandoff!
  const remaining = pending.dueAt - await page.evaluate(() => Date.now())
  expect(remaining).toBeGreaterThan(4500)
  expect(remaining).toBeLessThanOrEqual(5500)
  await page.clock.runFor(remaining - 1)
  expect((await stored(page)).prologue!.scene01!.messages.some(line => line.id === 'OPEN-S03-FIRST-MESSAGE')).toBe(false)
  await page.clock.runFor(1)
  const banner = page.getByLabel('Incoming notification', { exact: true })
  await expect(banner).toContainText('Sophie')
  await expect(banner).toContainText('Hey.')
  await expect(banner).toContainText('Tap to open conversation')
  await expect(group).toBeVisible()
  expect(await group.locator('.opening-thread').evaluate(node => node.scrollTop)).toBe(0)
  expect((await stored(page)).deliveredEvents).not.toContain('OPEN-S03-ACTIVATED')
  await page.screenshot({ path: test.info().outputPath('private-handoff-banner.png'), animations: 'disabled' })
  await page.getByRole('button', { name: 'Open notification from Sophie', exact: true }).click()
  await expect(page.getByRole('region', { name: 'Sophie private conversation', exact: true })).toBeVisible()
  await expect(page.locator('.opening-bubble').filter({ hasText: /^Hey\.$/ })).toHaveCount(1)
  expect((await stored(page)).deliveredEvents.filter(id => id === 'OPEN-S03-ACTIVATED')).toHaveLength(1)
  await expect(page.getByRole('button', { name: 'Send', exact: true })).toHaveCount(0)
})

test('refresh during the 5.5-second handoff retains the deadline and delivers the private message once, with manual chat opening', async ({ page }) => {
  await seedScene(page, sceneAt('G13'))
  // Assertions/reload must not consume the deadline under parallel browser load.
  await page.clock.pauseAt(await page.evaluate(() => Date.now()))
  await openGroup(page)
  await reply(page, 'Sure.', false)
  await reachPending(page)
  const pending = (await stored(page)).prologue!.scene01!.privateHandoff!
  await page.clock.runFor(1000)
  await page.reload()
  await page.getByRole('button', { name: 'Enter the archive', exact: true }).click()
  await openGroup(page)
  expect((await stored(page)).prologue!.scene01!.privateHandoff!.dueAt).toBe(pending.dueAt)
  const remaining = pending.dueAt - await page.evaluate(() => Date.now())
  await page.clock.runFor(remaining - 1)
  expect((await stored(page)).prologue!.scene01!.privateHandoff!.deliveredAt).toBeUndefined()
  await page.clock.runFor(1)
  await expect(page.getByLabel('Incoming notification', { exact: true })).toContainText('Hey.')
  await expect(page.getByRole('region', { name: 'FIND DANIEL group conversation' })).toBeVisible()
  await page.reload()
  await page.getByRole('button', { name: 'Enter the archive', exact: true }).click()
  await page.clock.runFor(20_000)
  expect((await stored(page)).prologue!.scene01!.messages.filter(line => line.id === 'OPEN-S03-FIRST-MESSAGE')).toHaveLength(1)
  expect((await stored(page)).deliveredEvents).not.toContain('OPEN-S03-ACTIVATED')
  await page.getByRole('button', { name: 'Open Messages', exact: true }).first().click()
  await page.getByRole('button', { name: 'Open Sophie conversation', exact: true }).click()
  await expect(page.getByRole('region', { name: 'Sophie private conversation', exact: true })).toBeVisible()
  expect((await stored(page)).deliveredEvents.filter(id => id === 'OPEN-S03-ACTIVATED')).toHaveLength(1)
})

test('an older save stopped after 08D receives only its missing reaction and continues at choice 09', async ({ page }) => {
  const save = sceneAt('G09', { G08: 'd' }), scene = save.prologue!.scene01!
  const keep = (id: string) => !id.startsWith('OPEN-S02-AFTER-08-') && !id.startsWith('OPEN-S02-C08-d-')
  scene.nodeId = 'OPEN-S02-SOURCE-BOUNDARY'; scene.groupSourceBoundary = true; scene.queue = []
  scene.groupMessages = scene.groupMessages.filter(line => keep(line.id))
  scene.groupReceipts = scene.groupReceipts?.filter(receipt => keep(receipt.eventId))
  save.deliveredEvents = save.deliveredEvents.filter(keep)
  const beforeRelationships = save.relationships
  await seedScene(page, save)
  await openGroup(page)
  await page.clock.runFor(180_000)
  await expect(page.getByRole('button', { name: 'What happened that night?', exact: true })).toBeVisible()
  await expect(page.locator('.opening-bubble.player').filter({ hasText: /^Maybe you should discuss this without me\.$/ })).toHaveCount(1)
  await expect(page.locator('.opening-bubble').filter({ hasText: /^We probably should have done that earlier\.$/ })).toHaveCount(1)
  expect((await stored(page)).relationships).toEqual(beforeRelationships)
})

test('premium last words and support retain each embedded Send and Lucas still leaves', async ({ page }) => {
  await seedScene(page, sceneAt('G11'))
  await openGroup(page)
  await reply(page, /You don't know me. I don't know you. But I don't think Daniel would be helped/)
  await expect(page.getByRole('button', { name: "You haven't exactly ruled it out.", exact: true })).toBeVisible()
  await expect(page.getByText('Lucas left the group.', { exact: true })).toHaveCount(0)
  await reply(page, "You haven't exactly ruled it out.")
  await expect(page.getByText('Lucas left the group.', { exact: true })).toHaveCount(1)
  await expect(page.getByRole('button', { name: "I didn't mean to cause trouble.", exact: true })).toBeVisible()
  await reply(page, /You don't have to fix everything tonight, Sophie/)
  await expect(page.getByRole('button', { name: "You're trying to help someone you care about.", exact: true })).toBeVisible()
  await reply(page, "You're trying to help someone you care about.")
  await expect(page.getByRole('button', { name: 'Sure.', exact: true })).toBeVisible()
  expect((await stored(page)).prologue!.scene01!.groupComplete).not.toBe(true)
})
