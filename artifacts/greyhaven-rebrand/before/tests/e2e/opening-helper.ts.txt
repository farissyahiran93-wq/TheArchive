import type { Page } from '@playwright/test'

export async function finishGroupOpening(page: Page) {
  await page.getByRole('button', { name: 'You can add me. I will listen first.' }).click()
  await page.getByRole('button', { name: 'Send message' }).click()
  await page.getByRole('button', { name: "I don't know Daniel. Sophie contacted me, and I'm trying to understand why." }).click()
  await page.getByRole('button', { name: 'Send message' }).click()
  await page.getByRole('button', { name: "I won't ask anyone to share private information here." }).click()
  await page.getByRole('button', { name: 'Send message' }).click()
  await page.getByRole('button', { name: 'Send it. I will look, but I cannot promise what it means.' }).click()
  await page.getByRole('button', { name: 'Send message' }).click()
}

/** Finish the canonical Sophie prologue before testing later Episode 01 scenes. */
export async function completeOpening(page: Page) {
  await page.getByRole('button', { name: 'Who is Daniel Mercer?' }).click()
  await page.getByRole('button', { name: 'Send message' }).click()
  await finishGroupOpening(page)
  await page.getByRole('button', { name: /Daniel's handwritten note/ }).click()
  await page.getByRole('button', { name: 'Save note to evidence' }).click()
  await page.getByRole('button', { name: "I'll see what I can find." }).click()
  await page.getByRole('button', { name: 'Send message' }).click()
  await finishRecoveryConversation(page)
  await page.getByRole('button', { name: 'Inspect permission & origin' }).click()
  await page.getByRole('button', { name: 'Restore The Archive' }).click()
  await page.locator('.mirror-icon').filter({ hasText: 'Notes' }).click()
  await page.locator('.mirror-file').first().click()
  await page.getByRole('button', { name: "Daniel's Phone" }).click()
  await page.locator('.mirror-icon').filter({ hasText: 'Archive Index' }).click()
  await page.locator('.mirror-file').first().click()
  await page.getByRole('button', { name: 'Record the missing-entry discrepancy' }).click()
  await finishSophieDisclosure(page)
  await page.getByRole('button', { name: 'Continue the investigation' }).click()
}

export async function finishRecoveryConversation(page: Page) {
  await page.getByRole('button', { name: 'When did you last see him?' }).click()
  await page.getByRole('button', { name: 'Send message' }).click()
  await page.getByRole('button', { name: "No. I haven't requested anything." }).click()
  await page.getByRole('button', { name: 'Send message' }).click()
}

export async function finishSophieDisclosure(page: Page, choice = 'I need some time before I share anything.') {
  await page.getByRole('button', { name: choice, exact: true }).click()
  await page.getByRole('button', { name: 'Send message' }).click()
  await page.getByRole('button', { name: 'Where can I find the public record?' }).click()
  await page.getByRole('button', { name: 'Send message' }).click()
}
