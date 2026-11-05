# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: phase04-mirror.spec.ts >> recovered Photos, metadata and image viewer work at 390px
- Location: tests\e2e\phase04-mirror.spec.ts:18:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: 'Phone', exact: true })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByRole('heading', { name: 'Phone', exact: true }) with timeout 5000ms
  - waiting for getByRole('heading', { name: 'Phone', exact: true })

```

```yaml
- text: 9:00 GREYHAVEN
- button "Main Menu"
- main "Phone lock screen":
  - paragraph: Thursday, 8 October
  - heading "9:00" [level=1]
  - paragraph: YOUR PHONE PRIVATE DEVICE
  - button "Unlock phone": Swipe up to open
- navigation "Phone navigation":
  - button "Go home"
```

# Test source

```ts
  1   | import { mkdirSync } from 'node:fs'
  2   | import { expect, test, type Page } from '@playwright/test'
  3   | import { completeOpening } from './opening-helper'
  4   | 
  5   | mkdirSync('qa/iphone-redesign/apps', { recursive: true })
  6   | async function start(page: Page) {
  7   |   await page.goto('/?legacyopening=1')
  8   |   await page.getByRole('button', { name: "Open Sophie's new message" }).click()
  9   |   await page.getByLabel('Your name').fill('Rae')
  10  |   await page.getByRole('button', { name: 'Set up phone' }).click()
  11  |   await completeOpening(page)
  12  |   await page.getByRole('button', { name: 'Open TRACE', exact: true }).click()
  13  | }
  14  | async function openApp(page: Page, name: string) { await page.locator('.mirror-icon').filter({ hasText: name }).click() }
  15  | async function phone(page: Page) { await page.getByRole('button', { name: 'Daniel phone home', exact: true }).click() }
  16  | 
  17  | for (const width of [320, 375, 390, 430]) {
  18  |   test(`recovered Photos, metadata and image viewer work at ${width}px`, async ({ page }) => {
  19  |     await page.setViewportSize({ width, height: 780 })
  20  |     await start(page)
  21  |     await openApp(page, 'Photos')
  22  |     await expect(page.getByLabel('Albums')).toBeVisible()
  23  |     await page.locator('.mirror-file').first().click()
  24  |     await page.getByRole('button', { name: 'View photos' }).click()
  25  |     const viewer = page.getByRole('dialog', { name: 'Photo viewer' })
  26  |     await expect(viewer.getByRole('heading', { name: 'Shelf photo', exact: true })).toBeVisible()
  27  |     await expect(viewer.getByRole('region', { name: 'Photo details' })).toHaveCount(0)
  28  |     await viewer.getByRole('button', { name: 'Photo info', exact: true }).click()
  29  |     await expect(viewer.getByText('Unknown', { exact: true })).toHaveCount(2)
  30  |     await viewer.getByRole('button', { name: 'Photo info', exact: true }).click()
  31  |     await expect(viewer.locator('img')).toBeVisible({ timeout: 15000 })
  32  |     await expect.poll(() => viewer.locator('img').evaluate(image => (image as HTMLImageElement).naturalWidth), { timeout: 15000 }).toBeGreaterThan(0)
  33  |     await viewer.getByRole('button', { name: 'Zoom in', exact: true }).click()
  34  |     await expect(viewer.getByLabel('Zoom level')).toHaveText('150%')
  35  |     await viewer.getByRole('button', { name: 'Fit image', exact: true }).click()
  36  |     await expect(viewer.getByLabel('Zoom level')).toHaveText('100%')
  37  |     await viewer.getByRole('button', { name: 'Save to Case Board' }).click()
  38  |     await expect(viewer.getByRole('button', { name: 'Saved to Case Board' })).toBeDisabled()
  39  |     await page.screenshot({ path: test.info().outputPath(`media-${width}.png`), animations: 'disabled' })
  40  |     expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  41  |     await viewer.getByRole('button', { name: 'Back to album' }).click()
  42  |     await page.getByRole('button', { name: 'Back', exact: true }).click()
  43  |     await page.getByRole('button', { name: 'Hidden Album \u00b7 Index fragments', exact: true }).click()
  44  |     await expect(page.getByText(/Two cropped images:/)).toHaveCount(0)
  45  |     await page.getByLabel('Password', { exact: true }).fill('wrong')
  46  |     await page.getByRole('button', { name: 'Unlock', exact: true }).click()
  47  |     await expect(page.getByRole('alert')).toContainText('No progress lost')
  48  |     await page.getByRole('button', { name: 'Need a hint?' }).click()
  49  |     await page.getByRole('button', { name: 'Another hint' }).click()
  50  |     await page.getByRole('button', { name: 'Another hint' }).click()
  51  |     await expect(page.getByRole('list', { name: 'Password hints' }).locator('li')).toHaveCount(3)
  52  |     await page.getByLabel('Password', { exact: true }).fill('7-14')
  53  |     await page.getByRole('button', { name: 'Unlock', exact: true }).click()
  54  |     await expect(page.getByRole('button', { name: 'View Index crop 01', exact: true })).toBeVisible()
  55  |     await page.getByRole('button', { name: 'View photos' }).click()
  56  |     await viewer.getByRole('button', { name: 'Photo info', exact: true }).click()
  57  |     await expect(viewer.getByText(/Two cropped images:/)).toBeVisible()
  58  |     await page.keyboard.press('Escape')
  59  |     await page.reload()
  60  |     await page.getByRole('button', { name: /Unlock phone/i }).click()
  61  |     await page.getByRole('button', { name: 'Open TRACE', exact: true }).click()
  62  |     await page.getByRole('button', { name: 'Resume Photos' }).click()
  63  |     await expect(page.getByRole('button', { name: 'View Index crop 01', exact: true })).toBeVisible()
  64  |     await phone(page)
  65  |     await expect(page.locator('.mirror-icon')).toHaveCount(11)
  66  |     for (const app of ['Messages', 'Mail', 'Phone', 'Notes', 'Files', 'Browser', 'Contacts', 'Maps', 'Archive Index', 'Protected']) {
  67  |       await openApp(page, app)
> 68  |       await expect(page.getByRole('heading', { name: app, exact: true })).toBeVisible()
      |                                                                           ^ Error: expect(locator).toBeVisible() failed
  69  |       expect(await page.locator('.mirror').evaluate(el => el.scrollWidth <= el.clientWidth + 1)).toBe(true)
  70  |       await page.screenshot({ path: test.info().outputPath(`${app.toLowerCase().replaceAll(' ', '-')}-${width}.png`), animations: 'disabled' })
  71  |       await phone(page)
  72  |     }
  73  | 
  74  |   })
  75  | }
  76  | 
  77  | test('mailboxes, private source links, contact threads and saved observations stay scoped', async ({ page }) => {
  78  |   await start(page)
  79  |   await openApp(page, 'Mail')
  80  |   await page.getByRole('button', { name: 'Sent', exact: true }).click()
  81  |   await expect(page.getByRole('button', { name: 'Sent - Library enquiry', exact: true })).toBeVisible()
  82  |   await page.getByRole('button', { name: 'Drafts', exact: true }).click()
  83  |   await page.getByRole('button', { name: 'Draft \u2014 Revision audit', exact: true }).click()
  84  |   await page.getByRole('button', { name: 'More options' }).click()
  85  |   await page.getByRole('button', { name: 'Save to Case Board' }).click()
  86  |   await page.getByRole('button', { name: 'index / Archive Index \u2014 integrity report', exact: true }).click()
  87  |   await page.getByRole('button', { name: 'More options' }).click()
  88  |   await page.getByRole('button', { name: 'Save to Case Board' }).click()
  89  |   await page.getByRole('button', { name: 'Evidence', exact: true }).click()
  90  |   const workspace = page.getByRole('region', { name: 'Recovered evidence workspace' })
  91  |   await workspace.getByRole('button', { name: /Draft \u2014 Revision audit.*OBSERVATION/ }).click()
  92  |   await workspace.getByRole('button', { name: /Archive Index \u2014 integrity report.*OBSERVATION/ }).click()
  93  |   await workspace.getByRole('button', { name: 'Connect recovered sources' }).click()
  94  |   await expect(workspace.getByText('Hypothesis', { exact: true })).toBeVisible()
  95  |   await expect(workspace.getByText(/Their sources/)).toHaveCount(0)
  96  |   await page.getByRole('button', { name: 'Back to app' }).click()
  97  |   await phone(page)
  98  |   await openApp(page, 'Contacts')
  99  |   await page.getByRole('button', { name: 'Maya Chen', exact: true }).click()
  100 |   await page.getByRole('button', { name: 'More options' }).click()
  101 |   await page.getByRole('button', { name: 'messages / Maya Chen \u00b7 3 Oct', exact: true }).click()
  102 |   await expect(page.getByLabel('iMessage conversation')).toBeVisible()
  103 |   await expect(page.locator('.mirror-message-history')).not.toContainText(/snapshot|recovered|unverified/i)
  104 |   await phone(page)
  105 |   await openApp(page, 'Browser')
  106 |   await page.getByRole('button', { name: 'Bookmarks', exact: true }).click()
  107 |   await page.getByRole('button', { name: 'Revision history help', exact: true }).click()
  108 |   await expect(page.locator('.mirror-address-bar')).toHaveText('Bookmarks')
  109 |   await page.reload()
  110 |   await page.getByRole('button', { name: /Unlock phone/i }).click()
  111 |   await page.getByRole('button', { name: 'Open TRACE', exact: true }).click()
  112 |   await page.getByRole('button', { name: 'Case Board', exact: true }).click()
  113 |   await expect(workspace.getByText('Hypothesis', { exact: true })).toBeVisible()
  114 | })
  115 | 
  116 | test('locked text is excluded from search and password entry fits a reduced visual viewport', async ({ page }) => {
  117 |   await page.setViewportSize({ width: 375, height: 812 })
  118 |   await start(page)
  119 |   await openApp(page, 'Notes')
  120 |   await page.getByLabel('Search Notes').fill('signed index says fourteen')
  121 |   await expect(page.getByText('No results')).toBeVisible()
  122 |   await page.getByLabel('Search Notes').fill('')
  123 |   await page.getByRole('button', { name: 'Locked Note \u2014 revision copy', exact: true }).click()
  124 |   await page.getByLabel('Password', { exact: true }).focus()
  125 |   await page.setViewportSize({ width: 375, height: 480 })
  126 |   await page.getByLabel('Password', { exact: true }).fill('ECHO-7/14')
  127 |   await page.getByRole('button', { name: 'Unlock', exact: true }).click()
  128 |   await expect(page.getByText(/The signed index says fourteen/)).toBeVisible()
  129 |   expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  130 |   await page.screenshot({ path: 'qa/iphone-redesign/apps/password-375x480.png', animations: 'disabled' })
  131 | })
  132 | 
  133 | test('Daniel home, conversation navigation and device exit use the existing phone shell', async ({ page }) => {
  134 |   await page.setViewportSize({ width: 390, height: 844 })
  135 |   await start(page)
  136 |   await expect(page.locator('.mirror-hero')).toHaveCount(0)
  137 |   await expect(page.locator('.status-bar')).toHaveCount(1)
  138 |   await expect(page.locator('.mirror-dock .mirror-icon')).toHaveCount(4)
  139 |   await expect(page.locator('.mirror-icon')).toHaveCount(11)
  140 |   await page.screenshot({ path: 'qa/iphone-redesign/apps/daniel-home-redesign-390.png', animations: 'disabled' })
  141 |   await openApp(page, 'Messages')
  142 |   await expect(page.getByLabel('iMessage conversation')).toHaveCount(0)
  143 |   await page.locator('.mirror-file').first().click()
  144 |   await expect(page.getByLabel('iMessage conversation')).toBeVisible()
  145 |   await expect(page.locator('.mirror input, .mirror textarea')).toHaveCount(0)
  146 |   await page.screenshot({ path: 'qa/iphone-redesign/apps/daniel-messages-redesign-390.png', animations: 'disabled' })
  147 |   await page.getByRole('button', { name: 'Back', exact: true }).click()
  148 |   await expect(page.locator('.mirror-file')).toHaveCount(4)
  149 |   await page.getByRole('button', { name: 'Daniel phone home', exact: true }).click()
  150 |   await expect(page.locator('.mirror-dock')).toBeVisible()
  151 |   await page.getByRole('button', { name: 'My phone', exact: true }).click()
  152 |   await expect(page.getByRole('main', { name: "Rae's home screen" })).toBeVisible()
  153 | })
  154 | 
```