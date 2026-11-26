import { expect, test } from '@playwright/test'
import { beginScene01 } from '../../src/game/scene01'
import { masterScene05Action } from '../../src/game/masterScene05'
import { newGame } from '../../src/game/types'
import { seedScene } from './scene01-helper'

test('the board appears inside installed TRACE rather than on the phone home', async ({ page }) => {
  const base = beginScene01({ ...newGame(), masterOpening: true, chapter1Edition: 'ch01-v2-10', player: { name: 'Alex', pronouns: 'he/him' } }, 1000)
  const scene = base.prologue!.scene01!
  const early = { ...base, prologue: { ...base.prologue!, scene01: { ...scene, messages: [...scene.messages, { id: 'TA-S01-V7-AFTER-06-2', sender: 'sophie' as const, text: 'And a little star beside it.', at: 1001 }] } } }
  await seedScene(page, early)
  await expect(page.getByRole('button', { name: /Open (Investigation|Case) Board/ })).toHaveCount(0)

  const installed = { ...early, masterScene04: { version: 1 as const, revision: 'v5' as const, opened: true, beat: 10, messages: [], status: 'accepted' as const, inspected: true, complete: true, preview: false, traceInstalled: true } }
  await seedScene(page, masterScene05Action(installed, { type: 'start' }, 2000))
  await expect(page.getByRole('button', { name: /Open (Investigation|Case) Board/ })).toHaveCount(0)
  await page.getByRole('button', { name: 'Open TRACE' }).click()
  await page.getByRole('button', { name: 'Open Investigation Board' }).click()
  await expect(page.getByRole('heading', { name: 'Investigation Board' })).toBeVisible()
  await page.getByRole('button', { name: 'Back to TRACE' }).click()
  await expect(page.getByRole('heading', { name: 'Daniel’s phone archive' })).toBeVisible()
})
