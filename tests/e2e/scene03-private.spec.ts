import { expect, test, type Page } from '@playwright/test'
import { sceneAt, sceneNow, seedScene, settleScene } from './scene01-helper'
import { openScene03, sendScene01Choice } from '../../src/game/scene01'
import { scene01Nodes } from '../../src/content/scene01'
import { scene03Facts } from '../../src/content/scene03'
import { scene03Script } from '../../src/content/scene03Script'
import type { GameSave } from '../../src/game/types'

function handoff() { const save = sceneAt('G13'); return settleScene(sendScene01Choice(save, 'a', '', true, sceneNow(save))) }
function privateAt(number: string) {
  let save = handoff()
  save = settleScene(openScene03(save, sceneNow(save)))
  for (let i = 0; i < 50; i++) {
    const node = scene01Nodes[save.prologue!.scene01!.nodeId]
    if (node.kind === 'choice' && node.number === `P${number}`) return save
    if (node.kind !== 'choice') throw new Error(node.id)
    save = settleScene(sendScene01Choice(save, node.number ? 'a' : 'continue', '', true, sceneNow(save)))
  }
  throw new Error('No target')
}
async function stored(page: Page): Promise<GameSave> {
  return page.evaluate(async () => {
    const pending = sessionStorage.getItem('the-archive-reboot:pending-save:v1')
    if (pending) return JSON.parse(pending).save
    const db = await new Promise<IDBDatabase>(resolve => { const request = indexedDB.open('the-archive-reboot', 1); request.onsuccess = () => resolve(request.result) })
    const save = await new Promise<GameSave>(resolve => { const request = db.transaction('saves').objectStore('saves').get('primary'); request.onsuccess = () => resolve(request.result) })
    db.close(); return save
  })
}
async function open(page: Page) {
  await page.getByRole('button', { name: 'Open Messages', exact: true }).first().click()
  await page.getByRole('button', { name: 'Open Sophie conversation', exact: true }).click()
}
async function reply(page: Page, text: string | RegExp) {
  await page.getByRole('button', { name: text, exact: typeof text === 'string' }).click()
  await page.getByRole('button', { name: 'Send', exact: true }).click()
  await page.clock.runFor(90_000)
}

test('all nineteen private choices preserve canonical disclosures, explicit Send and the authored ending without MIRROR', async ({ page }) => {
  test.setTimeout(150_000)
  const initial = handoff(), groupHistory = initial.prologue!.scene01!.groupMessages
  await seedScene(page, initial)
  expect((await stored(page)).prologue!.scene01!.privateScene03).toBeUndefined()
  await open(page)
  await page.clock.runFor(60_000)
  const chat = page.getByRole('region', { name: 'Sophie private conversation', exact: true })
  for (const beat of scene03Script.choices) {
    await expect(chat).toHaveAttribute('data-scene-node', `OPEN-S03-C${beat.id}`)
    expect(await page.locator('.scene01-options .opening-choice').count()).toBeGreaterThanOrEqual(4)
    expect(await page.locator('.scene01-options [aria-pressed="true"]').count()).toBe(0)
    const option = beat.choices[beat.id === '06' ? 1 : 0]
    const before = await chat.locator('.opening-bubble.player').count()
    await page.getByRole('button', { name: option.text, exact: true }).click()
    await expect(chat.locator('.opening-bubble.player')).toHaveCount(before)
    await page.getByRole('button', { name: 'Send', exact: true }).click()
    await page.clock.runFor(90_000)
    if (beat.id === '01') expect((await stored(page)).knowledge.player).toContain(scene03Facts.siblings)
    if (beat.id === '08') expect((await stored(page)).knowledge.player).toContain(scene03Facts.mayaFiancee)
    if (beat.id === '13') {
      expect((await stored(page)).knowledge.player).toContain(scene03Facts.eliAxiom)
      await page.screenshot({ path: test.info().outputPath('sophie-eli-canon.png'), animations: 'disabled' })
    }
  }
  const save = await stored(page), scene = save.prologue!.scene01!
  expect(scene.privateScene03).toMatchObject({ complete: true, reading: false, nextEventReady: true })
  expect(scene.messages.at(-1)?.text).toBe('Goodnight :)')
  expect(scene.groupMessages).toEqual(groupHistory)
  expect(scene.groupMembers!.lucas).toBe(false)
  expect(save.knowledge.player).toContain(scene03Facts.policeReported)
  expect(save.relationships.maya).toEqual(initial.relationships.maya)
  expect(save.relationships.sophie.romance).toBe(initial.relationships.sophie.romance)
  await expect(page.getByText('Sophie is offline.', { exact: true })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Send', exact: true })).toHaveCount(0)
  await page.getByRole('button', { name: 'Back to inbox', exact: true }).click()
  await page.getByRole('button', { name: 'Back to home', exact: true }).click()
  // Chapter 2 makes the installed shell reachable, while its mirror remains locked until consent.
  await expect(page.getByRole('button', { name: 'Open The Archive', exact: true })).toHaveCount(1)
  await page.getByRole('button', { name: 'Open The Archive', exact: true }).click()
  await expect(page.getByText('Access extension not activated.', { exact: true })).toBeVisible()
  await expect(page.getByRole('button', { name: 'OPEN PHONE MIRROR', exact: true })).toHaveCount(0)
  expect(save.pendingEvents.some(event => /C2_|RELAY|RECOVER/.test(event.id))).toBe(false)
})

test('draft selection, queue pause, premium effect and progress survive leaving the chat and reload', async ({ page }) => {
  const initial = privateAt('13')
  await seedScene(page, initial)
  await open(page)
  const premium = page.getByRole('button', { name: /Quiet people sometimes notice things everyone else misses/ })
  const count = await page.locator('.opening-bubble.player').count()
  await premium.click()
  await expect(premium).toHaveAttribute('aria-pressed', 'true')
  await expect(page.locator('.opening-bubble.player')).toHaveCount(count)
  await page.getByRole('button', { name: 'Back to inbox', exact: true }).click()
  await page.clock.runFor(180_000)
  const closed = await stored(page)
  expect(closed.prologue!.scene01!.privateScene03!.reading).toBe(false)
  expect(closed.prologue!.scene01!.messages).toHaveLength(initial.prologue!.scene01!.messages.length)
  await page.reload()
  await page.getByRole('button', { name: 'Enter the archive', exact: true }).click()
  await open(page)
  await expect(premium).toHaveAttribute('aria-pressed', 'true')
  await page.getByRole('button', { name: 'Send', exact: true }).click()
  await expect(page.getByRole('status', { name: 'Sophie is typing', exact: true })).toBeVisible()
  await page.getByRole('button', { name: 'Back to inbox', exact: true }).click()
  const paused = await stored(page), pausedCount = paused.prologue!.scene01!.messages.length
  expect(paused.prologue!.scene01!.privateScene03!.paused!.id).toMatch(/^OPEN-S03-C13-e-/)
  await page.clock.runFor(180_000)
  expect((await stored(page)).prologue!.scene01!.messages).toHaveLength(pausedCount)
  await page.getByRole('button', { name: 'Open Sophie conversation', exact: true }).click()
  await page.clock.runFor(90_000)
  await expect(page.locator('.scene01-chat')).toHaveAttribute('data-scene-node', 'OPEN-S03-C14')
  const finished = await stored(page)
  expect(finished.relationships.sophie.affinity - initial.relationships.sophie.affinity).toBe(2)
  expect(finished.knowledge.player).not.toContain(scene03Facts.eliAxiom)
  expect(finished.deliveredEvents.filter(id => id === 'OPEN-S03-EFFECT-13-e')).toHaveLength(1)
  await page.reload()
  await page.getByRole('button', { name: 'Enter the archive', exact: true }).click()
  await open(page)
  await expect(page.locator('.scene01-chat')).toHaveAttribute('data-scene-node', 'OPEN-S03-C14')
  expect((await stored(page)).relationships.sophie).toEqual(finished.relationships.sophie)
})

test('reading older private messages preserves scroll position and shows the new-message indicator', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 })
  await seedScene(page, privateAt('06'))
  await open(page)
  await page.getByRole('button', { name: /What was the first thing that made you realize/ }).click()
  await page.getByRole('button', { name: 'Send', exact: true }).click()
  const scroll = page.locator('.scene01-chat .opening-thread')
  await scroll.evaluate(node => { node.scrollTop = 0; node.dispatchEvent(new Event('scroll', { bubbles: true })) })
  await page.clock.runFor(90_000)
  expect(await scroll.evaluate(node => node.scrollTop)).toBe(0)
  await expect(page.getByRole('button', { name: /new · Jump to latest/ })).toBeVisible()
  await page.getByRole('button', { name: /new · Jump to latest/ }).click()
  await expect(page.getByRole('button', { name: 'What did he say?', exact: true })).toBeVisible()
  expect(await scroll.evaluate(node => node.scrollHeight - node.scrollTop - node.clientHeight)).toBeLessThan(4)
  await page.screenshot({ path: test.info().outputPath('private-chat-320.png'), animations: 'disabled' })
})

test('old opened-Hey saves begin the full script once without replaying the notification or activation', async ({ page }) => {
  const legacy = handoff()
  legacy.prologue!.scene01!.privateHandoff!.openedAt = sceneNow(legacy)
  legacy.deliveredEvents.push('OPEN-S03-ACTIVATED')
  await seedScene(page, legacy)
  await open(page)
  await page.clock.runFor(60_000)
  await expect(page.locator('.scene01-chat')).toHaveAttribute('data-scene-node', 'OPEN-S03-C01')
  await expect(page.locator('.opening-bubble').filter({ hasText: /^Hey\.$/ })).toHaveCount(1)
  expect((await stored(page)).deliveredEvents.filter(id => id === 'OPEN-S03-ACTIVATED')).toHaveLength(1)
})

test('final premium branch requires both authored follow-up Sends and ends offline once', async ({ page }) => {
  await seedScene(page, privateAt('19'))
  await open(page)
  await reply(page, /Only if you promise to get some rest too. Deal/)
  await expect(page.getByRole('button', { name: 'Seems fair.', exact: true })).toBeVisible()
  expect((await stored(page)).prologue!.scene01!.privateScene03!.complete).toBe(false)
  await reply(page, 'Seems fair.')
  await expect(page.getByRole('button', { name: "That's your problem.", exact: true })).toBeVisible()
  await reply(page, "That's your problem.")
  await expect(page.getByText('Sophie is offline.', { exact: true })).toBeVisible()
  expect((await stored(page)).deliveredEvents.filter(id => id === 'OPEN-S03-COMPLETE')).toHaveLength(1)
  await page.reload()
  await page.getByRole('button', { name: 'Enter the archive', exact: true }).click()
  await open(page)
  await expect(page.getByRole('button', { name: 'Send', exact: true })).toHaveCount(0)
  expect((await stored(page)).deliveredEvents.filter(id => id === 'OPEN-S03-EFFECT-19-e')).toHaveLength(1)
})
