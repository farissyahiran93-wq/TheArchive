import { expect, test } from '@playwright/test'
import { beginScene01, deliverScene01, sendScene01Choice } from '../../src/game/scene01'
import { newGame, type GameSave } from '../../src/game/types'
import { openSophie, sceneReply, seedScene } from './scene01-helper'

function drain(save: GameSave): GameSave {
  while (save.prologue?.scene01?.queue.length) save = deliverScene01(save, save.prologue.scene01.queue[0].dueAt)
  return save
}
test('Sophie describes the photo, unnamed starred entry and group without naming its members', async ({ page }) => {
  let save = drain(beginScene01({ ...newGame(), masterOpening: true, chapter1Edition: 'ch01-v2-10' }, 1000))
  save = drain(sendScene01Choice(save, 'name', 'Alex', true, 2000))
  save = drain(sendScene01Choice(save, 'a', '', true, 3000))
  for (let i = 0; i < 5; i++) save = drain(sendScene01Choice(save, 'a', '', true, 4000 + i * 1000))
  await seedScene(page, save)
  await openSophie(page)
  await expect(page.getByText('He almost dropped the cake that night, actually.', { exact: true })).toBeVisible()
  await expect(page.getByText(/my birthday|my birthday cake/i)).toHaveCount(0)
  await sceneReply(page, 'Different? How?')
  await expect(page.getByText('Your number had no name.', { exact: true })).toBeVisible()
  await expect(page.getByText('The entry was marked with a star.', { exact: true })).toBeVisible()
  await sceneReply(page, 'Could someone else have added my number?')
  await sceneReply(page, 'Maybe we can figure this out together.')
  await expect(page.getByText('His fiancée and some close friends.', { exact: true })).toBeVisible()
  await expect(page.locator('.opening-bubble.sophie').filter({ hasText: /\b(Maya|Lucas)\b/ })).toHaveCount(0)
})
