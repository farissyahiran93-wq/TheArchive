import { test, expect } from '@playwright/test'
import { NaturalFixture } from '../helpers/naturalConversation'
import { seedScene, sceneReply } from './scene01-helper'

test.use({ reducedMotion: 'reduce' })
for (const installed of [false, true]) {
  test(`old Scene 4 package save gets the complete trust conversation (installed: ${installed})`, async ({ page }) => {
    const f = new NaturalFixture().bridge()
    if (installed) f.install()
    await page.setViewportSize({ width: 375, height: 812 })
    await seedScene(page, f.save)
    await page.getByRole('button', { name: 'Open Messages', exact: true }).click()
    await page.getByRole('button', { name: /Open Chapter 1 Unknown Sender conversation/ }).click()
    await page.clock.runFor(120_000)
    await expect(page.getByText("You've seen the Greyhaven Bulletin article.", { exact: true })).toHaveCount(0)
    const replies = [
      "Who is this? And how do you know what I've read?",
      'Why should I trust an anonymous number with a file about Daniel?',
      'Does this mean someone changed the article?',
      'TRACE? What is that supposed to be?',
      "And I'm supposed to install software from someone who won't even give me a name?",
      "All right. Send the package. I'll decide after I see the warning.",
    ]
    for (const reply of replies) {
      await expect(page.getByRole('button', { name: 'INSPECT PACKAGE', exact: true })).toHaveCount(0)
      await expect(page.getByRole('button', { name: 'VIEW ACCESS PACKAGE', exact: true })).toHaveCount(0)
      await sceneReply(page, reply)
    }
    await expect(page.getByText("You shouldn't trust me just because I contacted you.", { exact: true })).toHaveCount(1)
    if (!installed) await expect(page.getByRole('button', { name: 'INSPECT PACKAGE', exact: true })).toBeVisible()
    else await expect(page.getByText("Open TRACE when you're ready.", { exact: true })).toHaveCount(1)
    await page.screenshot({ path: test.info().outputPath(`trust-flow-${installed}.png`), animations: 'disabled' })
  })
}
