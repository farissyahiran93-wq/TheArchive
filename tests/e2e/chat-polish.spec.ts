import { expect, test } from '@playwright/test'
import { openSophie, sceneAt, seedScene } from './scene01-helper'

for (const width of [320, 390]) test(`Sophie groups avatars and keeps the compact group action reachable at ${width}px`, async ({ page }) => {
  await page.setViewportSize({ width, height: 720 })
  await seedScene(page, sceneAt('G01'))
  await openSophie(page)
  const chat = page.locator('.scene01-chat')
  await chat.getByRole('button', { name: 'View Sophie Mercer profile' }).click()
  await expect(page.getByRole('dialog', { name: 'Sophie Mercer profile' })).toBeVisible()
  await expect(page.getByText('One day at a time.', { exact: true })).toBeVisible()
  await page.getByRole('button', { name: 'Back from profile' }).click()
  const rows = chat.locator('.conversation-line')
  expect(await rows.count()).toBeGreaterThan(10)
  const layout = await rows.evaluateAll(elements => elements.map(el => ({
    incoming: el.classList.contains('incoming'),
    end: el.classList.contains('chat-group-end'),
    avatars: el.querySelectorAll('.message-avatar').length,
    x: el.querySelector('.conversation-body')!.getBoundingClientRect().left,
    overflow: el.scrollWidth > el.clientWidth,
    top: el.getBoundingClientRect().top,
    bottom: el.getBoundingClientRect().bottom,
  })))
  for (const row of layout) {
    expect(row.avatars).toBe(row.incoming && row.end ? 1 : 0)
    expect(row.overflow).toBe(false)
  }
  for (let i = 1; i < layout.length; i++) expect(layout[i].top - layout[i - 1].bottom).toBeGreaterThanOrEqual(4)
  const incoming = layout.filter(row => row.incoming)
  expect(incoming.some(row => !row.end)).toBe(true)
  expect(Math.max(...incoming.map(row => row.x)) - Math.min(...incoming.map(row => row.x))).toBeLessThan(2)
  const action = chat.getByRole('button', { name: 'Open FIND DANIEL →', exact: true })
  await expect(action).toBeInViewport()
  const bounds = await action.boundingBox()
  expect(bounds!.height).toBeGreaterThanOrEqual(40)
  expect(bounds!.width).toBeLessThan(width - 90)
  await page.screenshot({ path: `artifacts/chat-polish/sophie-${width}.png` })
  await action.click()
  await expect(page.getByRole('region', { name: 'FIND DANIEL group conversation', exact: true })).toBeVisible()
  await page.getByRole('button', { name: 'View FIND DANIEL group info' }).click()
  const group = page.getByRole('dialog', { name: 'FIND DANIEL group info' })
  await expect(group).toBeVisible()
  await expect(group.getByRole('button', { name: /Eli Ward/ })).toHaveCount(0)
  await expect(group.getByRole('button', { name: /Nora/ })).toHaveCount(0)
  await group.getByRole('button', { name: /Maya Chen/ }).click()
  await expect(page.getByRole('dialog', { name: 'Maya Chen profile' })).toBeVisible()
  await page.getByRole('button', { name: 'Back from profile' }).click()
  await expect(group).toBeVisible()
  await page.getByRole('button', { name: 'Back from profile' }).click()
  await expect(group).toHaveCount(0)
})
