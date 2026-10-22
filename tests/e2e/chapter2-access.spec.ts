import { expect, test, type Page } from '@playwright/test'
import { sceneAt, sceneNow, seedScene, settleScene } from './scene01-helper'
import { openScene03, scene01Choices, sendScene01Choice } from '../../src/game/scene01'
import { accessChoices, chapter2Access } from '../../src/game/chapter2Access'
import type { GameSave } from '../../src/game/types'

function completed() {
  let s = settleScene(sendScene01Choice(sceneAt('G13'), 'a', '', true, sceneNow(sceneAt('G13'))))
  s = settleScene(openScene03(s, sceneNow(s)))
  for (let i = 0; i < 60; i++) {
    if (s.prologue!.scene01!.privateScene03?.complete) return s
    const options = scene01Choices(s)
    s = settleScene(sendScene01Choice(s, options[0].id, '', true, sceneNow(s)))
  }
  throw new Error('Private scene did not complete')
}
function packageSave() {
  let s = chapter2Access(completed(), { type: 'tick' }, sceneNow(completed())+7000)
  for (let i = 0; i < 30; i++) {
    if (s.chapter2Access?.node === 'PACKAGE') return s
    const option = accessChoices(s)[0]
    const now = sceneNow(s)+i*100000
    s = chapter2Access(chapter2Access(s, { type: 'draft', id: option.id }, now), { type: 'send', id: option.id }, now)
    for (let j = 0; j < 100 && s.chapter2Access?.queue; j++) s = chapter2Access(s, { type: 'tick' }, s.chapter2Access.queue.dueAt)
  }
  throw new Error('No package')
}
async function stored(page: Page): Promise<GameSave> {
  return page.evaluate(async () => {
    const pending = sessionStorage.getItem('the-archive-reboot:pending-save:v1')
    if (pending) return JSON.parse(pending).save
    const db = await new Promise<IDBDatabase>(resolve => { const r = indexedDB.open('the-archive-reboot',1); r.onsuccess = () => resolve(r.result) })
    const save = await new Promise<GameSave>(resolve => { const r = db.transaction('saves').objectStore('saves').get('primary'); r.onsuccess = () => resolve(r.result) })
    db.close(); return save
  })
}
async function openUnknown(page: Page) {
  await page.getByRole('button', { name: 'Open Messages', exact: true }).first().click()
  await page.getByRole('button', { name: 'Open UNKNOWN conversation', exact: true }).click()
}
async function send(page: Page, text: string) {
  await page.getByRole('button', { name: text, exact: true }).click()
  await page.getByRole('button', { name: 'Send', exact: true }).click()
  await page.clock.runFor(90000)
}

for (const app of ['Home','Contacts','The Archive','Messages']) test(`Unknown arrives above ${app} after Sophie completes, without opening itself`, async ({ page }) => {
  await seedScene(page, completed())
  if (app !== 'Home') await page.getByRole('button', { name: `Open ${app}`, exact: true }).first().click()
  await page.clock.runFor(7100)
  await expect(page.getByRole('complementary', { name: 'Incoming notification' })).toContainText("You're looking in the wrong place.")
  await expect(page.getByRole('region', { name: 'UNKNOWN conversation', exact: true })).toHaveCount(0)
  const s = await stored(page)
  expect(s.chapter2Access?.messages).toHaveLength(1)
  expect(s.prologue!.scene01!.messages.at(-1)?.text).toBe('Goodnight :)')
})

test('Unknown branches, explicit Send, retained decline, consented install, recovery and group readiness', async ({ page }) => {
  test.setTimeout(180000)
  await page.setViewportSize({ width: 320, height: 720 })
  await seedScene(page, completed())
  await page.clock.runFor(7100)
  await openUnknown(page)
  const path = ['Who is this?', "That doesn't answer anything.", 'Then how do you know about him?', 'Have you been reading my messages?', 'Prove it.', 'What do you want in return?', 'That sounds like a serious invasion of privacy.', "How do I know you're not manipulating what I see?"]
  for (const text of path) await send(page, text)
  await expect(page.getByText('INCOMING ACCESS PACKAGE', { exact: true })).toBeVisible()
  await send(page, 'Ask one more question')
  await send(page, 'What exactly will change on my phone?')
  await expect(page.getByText("Messages gets a passive relay component. It won't have anything to display until a relay is available.", { exact: true })).toBeVisible()
  await send(page, 'REJECT — Decline the package')
  expect((await stored(page)).chapter2Access).toMatchObject({ packageStatus: 'declined', installAuthorized: false, mirrorUnlocked: false, spyInstalled: false })
  await expect(page.getByRole('button', { name: 'ACCEPT PACKAGE', exact: true })).toHaveCount(0)
  await expect.poll(() => page.evaluate(() => sessionStorage.getItem('the-archive-reboot:pending-save:v1'))).toBeNull()
  await page.reload()
  await page.getByRole('button', { name: 'Enter the archive', exact: true }).click()
  await openUnknown(page)
  await page.getByRole('button', { name: 'Inspect package again', exact: true }).click()
  await page.getByRole('button', { name: 'ACCEPT PACKAGE', exact: true }).click()
  await page.getByRole('button', { name: 'Send', exact: true }).click()
  await page.getByRole('button', { name: 'CANCEL', exact: true }).click()
  expect((await stored(page)).chapter2Access?.installAuthorized).toBe(false)
  await page.getByRole('button', { name: 'ACCEPT PACKAGE', exact: true }).click()
  await page.getByRole('button', { name: 'Send', exact: true }).click()
  await page.getByRole('button', { name: 'INSTALL EXTENSION', exact: true }).click()
  await page.clock.runFor(90000)
  await send(page, "Don't mistake this for trust.")
  await send(page, 'Why should I trust any of this?')
  expect((await stored(page)).chapter2Access).toMatchObject({ installCompleted: true, unknownOffline: true, spyInstalled: true, relayAvailable: false })
  await page.getByRole('button', { name: 'Open Messages', exact: true }).first().click()
  await page.getByRole('button', { name: 'Relay status: standby', exact: true }).click()
  await expect(page.getByRole('dialog', { name: 'SPY MODE', exact: true })).toContainText('Nothing is currently being intercepted.')
  await page.getByRole('button', { name: 'GOT IT', exact: true }).click()
  await page.getByRole('button', { name: 'Back to home', exact: true }).click()
  await page.getByRole('button', { name: 'Open The Archive', exact: true }).click()
  await page.getByRole('button', { name: 'OPEN PHONE MIRROR', exact: true }).click()
  await expect(page.getByText('Device: NOT CONNECTED', { exact: false })).toBeVisible()
  await page.getByRole('button', { name: 'ENTER MIRROR', exact: true }).click()
  await page.getByRole('button', { name: 'Open mirrored Mail', exact: true }).click()
  await page.getByRole('button', { name: /Storage Notification/ }).click()
  await page.getByRole('button', { name: 'Mirror home', exact: true }).click()
  await page.getByRole('button', { name: 'Open mirrored Deleted', exact: true }).click()
  await page.getByRole('button', { name: 'START RECOVERY', exact: true }).click()
  await page.getByRole('dialog', { name: 'Recover recently deleted confirmation', exact: true }).getByRole('button', { name: 'NOT NOW', exact: true }).click()
  expect((await stored(page)).chapter2Access?.recovery).toBeUndefined()
  await page.getByRole('button', { name: 'START RECOVERY', exact: true }).click()
  await page.getByRole('button', { name: 'START — OPEN NOW', exact: true }).click()
  const recovery = (await stored(page)).chapter2Access!.recovery!
  expect(recovery.dueAt-recovery.startedAt).toBe(1500000)
  await page.clock.runFor(19000)
  await expect(page.getByRole('complementary', { name: 'Incoming notification' })).toContainText('FIND DANIEL')
  await expect(page.getByRole('heading', { name: 'Recently Deleted', exact: true })).toBeVisible()
  await page.clock.runFor(20000)
  await expect.poll(() => page.evaluate(() => sessionStorage.getItem('the-archive-reboot:pending-save:v1'))).toBeNull()
  await page.reload()
  await page.getByRole('button', { name: 'Enter the archive', exact: true }).click()
  await page.getByRole('button', { name: 'Open Messages', exact: true }).first().click()
  await expect(page.getByRole('button', { name: 'Open FIND DANIEL group conversation', exact: true })).toHaveCount(1)
  await page.getByRole('button', { name: 'Open FIND DANIEL group conversation', exact: true }).click()
  await page.clock.runFor(180000)
  await expect(page.getByRole('button',{name:"I'm here. Let's talk.",exact:true})).toBeVisible()
  const final = await stored(page)
  expect(final.chapter2Access?.complete).toBe(false)
  expect(final.chapter2Access?.recovery).toEqual(recovery)
  expect(final.chapter2Access?.groupMessages.filter(m => m.sender === 'player')).toHaveLength(0)
  expect(final.deliveredEvents.filter(id => id === 'C2-INSTALL-BEGIN')).toHaveLength(1)
  await expect(page.getByRole('button', { name: 'Send', exact: true })).toBeDisabled()
  await page.screenshot({ path: test.info().outputPath('chapter2-ready-320.png') })
})

test('package questions are idempotent and an unsent response survives reload without sending', async ({ page }) => {
  const base = packageSave()
  await seedScene(page, base)
  await openUnknown(page)
  await send(page, 'Ask one more question')
  await send(page, 'Who made this package?')
  await send(page, 'Ask one more question')
  await expect(page.getByRole('button', { name: 'Who made this package?', exact: true })).toBeDisabled()
  await page.getByRole('button', { name: 'Back to package', exact: true }).click()
  await page.getByRole('button', { name: 'ACCEPT — Open access package', exact: true }).click()
  expect((await stored(page)).chapter2Access?.installAuthorized).toBe(false)
  await expect.poll(() => page.evaluate(() => sessionStorage.getItem('the-archive-reboot:pending-save:v1'))).toBeNull()
  await page.reload()
  await page.getByRole('button', { name: 'Enter the archive', exact: true }).click()
  expect((await stored(page)).chapter2Access?.installAuthorized).toBe(false)
  await openUnknown(page)
  expect((await stored(page)).chapter2Access?.messages.filter(m => m.text === 'Who made this package?')).toHaveLength(1)
})
