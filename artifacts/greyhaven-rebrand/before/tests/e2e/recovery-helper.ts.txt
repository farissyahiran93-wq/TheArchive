import { expect, type Page } from '@playwright/test'

export async function finishPrivateExpansion(page: Page) {
  for (const text of ['You should have asked everyone first.', 'What was the last thing he said to you?', "It doesn't sound weird. You miss your brother.", "Okay. I'll stay and listen."]) {
    const count = await page.locator('.opening-bubble.player').count()
    await page.getByRole('button', { name: text, exact: true }).click()
    await expect(page.locator('.opening-bubble.player')).toHaveCount(count)
    await page.getByRole('button', { name: 'Send', exact: true }).click()
    await page.clock.runFor(75_000)
  }
}

export async function finishRecoveredConversation(page: Page, checkResume = false) {
  await page.clock.runFor(25_000)
  for (const text of ['Who is this?', 'How do I know these messages are real?']) {
    const count = await page.locator('.opening-bubble.player').count()
    await page.getByRole('button', { name: text, exact: true }).click()
    await expect(page.locator('.opening-bubble.player')).toHaveCount(count)
    await page.getByRole('button', { name: 'Send', exact: true }).click()
    await page.clock.runFor(75_000)
  }
  await page.getByRole('button', { name: 'Verify Reconstruction', exact: true }).click()
  await expect(page.getByText('Attempts: 1', { exact: true })).toBeVisible()
  await page.getByRole('button', { name: 'Request Hint', exact: true }).click()
  if (checkResume) {
    await page.getByRole('button', { name: /^Slot 1:/ }).click()
    await page.getByRole('button', { name: /^Slot 2:/ }).click()
    await page.screenshot({ path: 'qa/post-lucas/reconstruction.png', animations: 'disabled' })
    await page.reload()
    await page.getByRole('button', { name: 'Enter the archive' }).click()
    await page.getByRole('button', { name: 'Open The Archive', exact: true }).click()
    await expect(page.getByText('Attempts: 1', { exact: true })).toBeVisible()
    await expect(page.getByLabel('Recovery hints')).toBeVisible()
    await expect(page.getByRole('button', { name: /^Slot 1:/ })).toContainText('Then why does the newest copy')
    await page.getByRole('button', { name: /^Slot 1:/ }).click()
    await page.getByRole('button', { name: /^Slot 2:/ }).click()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
  }
  for (const [a, b] of [[1,4],[2,4],[3,4]]) {
    await page.getByRole('button', { name: new RegExp(`^Slot ${a}:`) }).click()
    await page.getByRole('button', { name: new RegExp(`^Slot ${b}:`) }).click()
  }
  await page.getByRole('button', { name: 'Verify Reconstruction', exact: true }).click()
  await page.getByRole('button', { name: 'Save recovered conversation privately', exact: true }).click()
  await page.clock.runFor(30_000)
  for (const text of ['It says the entry was removed after verification.', "I'm keeping this private until I can check it."]) {
    await page.getByRole('button', { name: text, exact: true }).click()
    await page.getByRole('button', { name: 'Send', exact: true }).click()
    await page.clock.runFor(75_000)
  }
}
