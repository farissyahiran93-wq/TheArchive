import { expect, test } from '@playwright/test'
import { sceneTime } from './scene01-helper'

for (const title of ['Mr.', 'Ms.']) test(`V7 identity onboarding: ${title}`, async ({ page }) => {
  test.setTimeout(180_000)
  await page.clock.install({ time: new Date(sceneTime) })
  await page.goto('/?gameplaytest=1')
  await page.getByRole('button', { name: 'Unlock phone', exact: true }).click()
  await page.clock.runFor(20_000)
  await page.getByRole('button', { name: 'Open notification from Sophie', exact: true }).click()
  await page.clock.runFor(120_000)
  await expect(page.getByText('Can I ask your name?', { exact: true })).toBeVisible()
  await page.getByLabel('Your name', { exact: true }).fill('Alex')
  await page.getByRole('button', { name: 'Send', exact: true }).click()
  await page.clock.runFor(120_000)
  await expect(page.getByText('Hi, Alex.', { exact: true })).toBeVisible()
  await page.getByRole('button', { name: title, exact: true }).click()
  await page.getByRole('button', { name: 'Send', exact: true }).click()
  await page.clock.runFor(120_000)
  await expect(page.getByRole('button', { name: "Sure. What's going on?", exact: true })).toBeVisible()
  for (const choice of ["Sure. What's going on?", "No, I don't think I know anyone by that name.", "I'm sorry, Sophie. I don't recognise him.", 'Missing? What happened?', "It's okay. But why did you contact me?", 'Different? How?', 'Could someone else have added my number?', 'Maybe we can figure this out together.', "It's okay. Add me. I'd like to help."]) {
    await page.getByRole('button', { name: choice, exact: true }).click()
    await page.getByRole('button', { name: 'Send', exact: true }).click()
    await page.clock.runFor(120_000)
  }
  await expect(page.getByText(`This is Alex.`, { exact: true })).toBeVisible()
  await expect(page.getByText(`${title === 'Mr.' ? "He's" : "She's"} the person I told you about earlier.`, { exact: true })).toBeVisible()
  await page.getByRole('button', { name: "Hi, everyone. Sophie told me what's happening. I'm sorry about Daniel.", exact: true }).click()
  await page.getByRole('button', { name: 'Send', exact: true }).click()
  await page.clock.runFor(120_000)
  await expect(page.getByRole('button', { name: "I've never met Daniel Mercer.", exact: true })).toBeVisible()
})
