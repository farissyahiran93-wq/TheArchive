# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: phone-interaction.spec.ts >> typing uses an avatar and dots and received messages notify above the active chat
- Location: tests\e2e\phone-interaction.spec.ts:53:1

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: getByLabel('Incoming notification', { exact: true })
Expected substring: "Thanks."
Received string:    "MESSAGES nowSophieI found your number in a saved copy of someone's contacts."
Timeout: 5000ms

Call log:
  - Expect "toContainText" getByLabel('Incoming notification', { exact: true }) with timeout 5000ms
  - waiting for getByLabel('Incoming notification', { exact: true })
    10 × locator resolved to <aside aria-live="polite" class="phone-notification-layer" aria-label="Incoming notification">…</aside>
       - unexpected value "MESSAGES nowSophieOkay."
    3 × locator resolved to <aside aria-live="polite" class="phone-notification-layer" aria-label="Incoming notification">…</aside>
      - unexpected value "MESSAGES nowSophieI found your number in a saved copy of someone's contacts."

```

```yaml
- complementary "Incoming notification":
  - button "Open notification from Sophie":
    - text: MESSAGES
    - time: now
    - strong: Sophie
    - text: I found your number in a saved copy of someone's contacts.
  - button "Dismiss notification"
```

# Test source

```ts
  1  | import { expect, test } from '@playwright/test'
  2  | import { sceneAt, sceneNow, seedScene, settleScene, openSophie } from './scene01-helper'
  3  | import { scene01Invitation, sendScene01Choice } from '../../src/game/scene01'
  4  | 
  5  | test('group notifications overlay another app, swipe away and open the joined thread', async ({ page }) => {
  6  |   let save = settleScene(sendScene01Choice(sceneAt('14'), 'a', '', true, sceneNow(sceneAt('14'))))
  7  |   save = scene01Invitation(save, 'join', sceneNow(save))
  8  |   await seedScene(page, save)
  9  |   await expect(page.getByRole('button', { name: 'Open Search', exact: true })).toHaveCount(0)
  10 |   await page.getByRole('button', { name: 'Open Contacts', exact: true }).first().click()
  11 |   await page.clock.runFor(6000)
  12 |   const banner = page.getByLabel('Incoming notification', { exact: true })
  13 |   await expect(banner).toBeVisible()
  14 |   await expect(banner).toContainText('FIND DANIEL')
  15 |   await page.clock.runFor(300)
  16 |   const box = (await banner.boundingBox())!, device = (await page.locator('.device').boundingBox())!
  17 |   expect(box.y - device.y).toBeLessThan(100)
  18 |   await page.screenshot({ path: 'qa/phone-interaction/group-banner.png', animations: 'disabled' })
  19 |   await page.mouse.move(box.x + 100, box.y + 40)
  20 |   await page.mouse.down()
  21 |   await page.mouse.move(box.x + 100, box.y - 30, { steps: 5 })
  22 |   await page.mouse.up()
  23 |   await expect(banner).toHaveCount(0)
  24 |   await expect(page.getByRole('heading', { name: 'Contacts', exact: true })).toBeVisible()
  25 |   await page.clock.runFor(10_000)
  26 |   await page.getByRole('button', { name: 'Open notification from FIND DANIEL', exact: true }).click()
  27 |   await expect(page.getByRole('region', { name: 'FIND DANIEL group conversation' })).toBeVisible()
  28 |   await expect(page.locator('.incoming .message-avatar img').first()).toBeVisible()
  29 | })
  30 | 
  31 | test('old Sophie note stays hidden and ordinary player photos retain the full-size viewer', async ({ page }) => {
  32 |   await page.setViewportSize({ width: 375, height: 812 })
  33 |   const save = sceneAt('02'); save.prologue!.noteSeen = true
  34 |   await seedScene(page, save)
  35 |   await page.getByRole('button', { name: 'Open Photos', exact: true }).click()
  36 |   await expect(page.getByRole('button', { name: 'Open photo from Sophie', exact: true })).toHaveCount(0)
  37 |   await page.getByRole('button', { name: 'Open wallpaper', exact: true }).click()
  38 |   const viewer = page.getByRole('dialog', { name: 'Photo viewer', exact: true })
  39 |   const viewBox = (await viewer.boundingBox())!, phoneBox = (await page.locator('.device').boundingBox())!
  40 |   expect(viewBox.width).toBeGreaterThan(phoneBox.width * .9)
  41 |   await page.getByRole('button', { name: 'Zoom in', exact: true }).click()
  42 |   await expect(viewer.locator('img')).toHaveCSS('transform', /1\.5/)
  43 |   await page.getByRole('button', { name: 'Close photo', exact: true }).click()
  44 |   await expect(viewer).toHaveCount(0)
  45 |   await page.getByRole('button', { name: 'Back to home', exact: true }).click()
  46 |   await openSophie(page)
  47 |   await expect(page.locator('.chat-attachment')).toHaveCount(0)
  48 |   const header = await page.locator('.opening-chat-header').boundingBox(), back = await page.getByRole('button', { name: 'Back to inbox', exact: true }).boundingBox()
  49 |   expect(back!.x - header!.x).toBeLessThan(25)
  50 |   expect(await page.locator('.opening-thread').evaluate(node => getComputedStyle(node).scrollbarWidth)).toBe('none')
  51 | })
  52 | 
  53 | test('typing uses an avatar and dots and received messages notify above the active chat', async ({ page }) => {
  54 |   const base = sceneAt('02')
  55 |   const save = sendScene01Choice(base, 'a', '', true, sceneNow(base))
  56 |   save.prologue!.scene01!.queue[0].dueAt = sceneNow(save) + 6000
  57 |   await seedScene(page, save)
  58 |   await openSophie(page)
  59 |   const typing = page.getByRole('status', { name: 'Sophie is typing', exact: true })
  60 |   await expect(typing.locator('img')).toBeVisible()
  61 |   await expect(typing).toHaveText('')
  62 |   await expect(page.getByLabel('Online', { exact: true })).toBeVisible()
  63 |   await page.clock.runFor(6000)
> 64 |   await expect(page.getByLabel('Incoming notification', { exact: true })).toContainText('Thanks.')
     |                                                                           ^ Error: expect(locator).toContainText(expected) failed
  65 |   await page.getByRole('button', { name: 'Dismiss notification', exact: true }).click()
  66 |   await expect(page.getByText('Waiting for a reply…', { exact: true })).toHaveCount(0)
  67 | })
  68 | 
```