import { test, expect } from '@playwright/test'
import { naturalScene04 } from '../helpers/naturalConversation'
import { Scene04Fixture } from '../helpers/scene04Final'
import { chapterLibrary } from '../../src/game/sceneLibrary'
import { seedScene, sceneReply } from './scene01-helper'

test('Play from this scene promotes an old Scene 4 checkpoint before Unknown arrives', async ({ page }) => {
  const f = naturalScene04().at('OPEN-S04-C09')
  delete f.save.prologue!.scene01!.naturalFlowRevision
  delete f.save.prologue!.scene01!.traceBridgeRevision
  const snapshot = structuredClone(f.save)
  const main = new Scene04Fixture(f.save).at('complete04').save
  const key = chapterLibrary[0].scenes.find(s => s.number === 4)!.id
  main.replayEntries = { [key]: { capturedAt: f.now, save: snapshot } }
  await seedScene(page, main)
  const button = (name: string) => page.getByRole('button', { name, exact: true }).first()
  await button('Main Menu').click()
  await button('CHAPTERS & SCENES').click()
  await page.locator('.chapter-card').first().click()
  await page.locator('.library-scene').nth(3).getByRole('button', { name: 'Play from this scene', exact: true }).click()
  await button('Start scene').click()
  await page.clock.runFor(120_000)
  await sceneReply(page, "That's understandable.")
  await button('Go home').click()
  await button('Open Messages').click()
  await page.getByRole('button', { name: /Open Chapter 1 Unknown Sender conversation/ }).click()
  await page.clock.runFor(120_000)
  await expect(button("Who is this? And how do you know what I've read?")).toBeVisible()
  await expect(page.getByText('I added a recovered reference to TRACE.', { exact: true })).toHaveCount(0)
  await expect(button('OPEN TRACE')).toHaveCount(0)
  await sceneReply(page, "Who is this? And how do you know what I've read?")
  await sceneReply(page, 'Why should I trust an anonymous number with a file about Daniel?')
  await expect(page.getByText("You shouldn't trust me just because I contacted you.", { exact: true })).toBeVisible()
})
