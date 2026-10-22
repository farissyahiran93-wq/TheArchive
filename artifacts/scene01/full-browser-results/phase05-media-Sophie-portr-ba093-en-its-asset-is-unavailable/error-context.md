# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: phase05-media.spec.ts >> Sophie portrait loads and uses initial fallback when its asset is unavailable
- Location: tests\e2e\phase05-media.spec.ts:96:1

# Error details

```
Test timeout of 90000ms exceeded.
```

```
Error: locator.click: Test timeout of 90000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: /Enter the archive/i })
    - locator resolved to <button aria-label="Enter the archive">…</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is not stable
    - retrying click action
    - waiting 20ms
    - waiting for element to be visible, enabled and stable
  - element was detached from the DOM, retrying

```

# Page snapshot

```yaml
- generic [ref=f1e4]:
  - heading "Save needs attention" [level=1] [ref=f1e5]
  - paragraph [ref=f1e6]: This save changed in another tab.
  - paragraph [ref=f1e7]: Your stored progress has not been overwritten. Download a copy before choosing to reload; any unsaved changes in this tab may be lost.
  - button "Download local backup" [ref=f1e8] [cursor=pointer]
  - button "Reload stored save" [ref=f1e12] [cursor=pointer]
```

# Test source

```ts
  6   | async function start(page: Page) {
  7   |   await page.goto('/?legacyopening=1')
  8   |   await page.getByRole('button', { name: "Open Sophie's new message" }).click()
  9   |   await page.getByLabel('Your name').fill('Rae')
  10  |   await page.getByRole('button', { name: 'Set up phone' }).click()
  11  |   await completeOpening(page)
  12  |   await page.getByRole('button', { name: 'Open The Archive', exact: true }).click()
  13  |   await page.locator('.mirror-icon').filter({ hasText: 'Photos' }).click()
  14  |   await page.locator('.mirror-file').first().click()
  15  | }
  16  | async function unlock(page: Page, album: string, answer: string) {
  17  |   await page.getByRole('button', { name: 'Back', exact: true }).click()
  18  |   await page.getByRole('button', { name: album, exact: true }).click()
  19  |   await page.getByLabel('Password', { exact: true }).fill(answer)
  20  |   await page.getByRole('button', { name: 'Unlock', exact: true }).click()
  21  | }
  22  | 
  23  | test('all six PNGs render in their own albums without requesting locked pixels or verifying them', async ({ page }) => {
  24  |   const requested: string[] = []
  25  |   page.on('request', request => { if (request.url().includes('/media/gallery/')) requested.push(request.url()) })
  26  |   await start(page)
  27  |   const viewer = page.getByRole('dialog', { name: 'Photo viewer' })
  28  |   expect(requested.some(url => /03-index|04-index|05-notice|06-map/.test(url))).toBe(false)
  29  |   await expect(page.locator('img[src*="03-index"],img[src*="04-index"],img[src*="05-notice"],img[src*="06-map"]')).toHaveCount(0)
  30  |   for (const title of ['Shelf photo', 'Message crop']) {
  31  |     if (title === 'Message crop') { await page.getByRole('button', { name: 'Back', exact: true }).click(); await page.getByRole('button', { name: 'Screenshot \u2014 message fragment', exact: true }).click() }
  32  |     await page.getByRole('button', { name: `View ${title}`, exact: true }).click()
  33  |     await expect.poll(() => viewer.locator('img').evaluate(image => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(1000)
  34  |     await expect(viewer.getByRole('region', { name: 'Photo details' })).toHaveCount(0)
  35  |     await viewer.getByRole('button', { name: 'Photo info', exact: true }).click()
  36  |     await expect(viewer.getByText('Unknown', { exact: true })).toHaveCount(2)
  37  |     await viewer.getByRole('button', { name: 'Photo info', exact: true }).click()
  38  |     expect(await viewer.getByLabel('Image pan area').evaluate(el => el.scrollHeight <= el.clientHeight + 1)).toBe(true)
  39  |     await viewer.getByRole('button', { name: 'Back to album', exact: true }).focus()
  40  |     await page.keyboard.press('Shift+Tab')
  41  |     await expect(viewer.getByRole('button', { name: 'Photo details', exact: true })).toBeFocused()
  42  |     await viewer.getByRole('button', { name: 'Back to album' }).click()
  43  |   }
  44  |   await unlock(page, 'Hidden Album \u00b7 Index fragments', '7-14')
  45  |   expect(requested.some(url => /05-notice|06-map/.test(url))).toBe(false)
  46  |   await page.getByRole('button', { name: 'View Index crop 01', exact: true }).click()
  47  |   await expect(viewer.getByRole('heading', { name: 'Index crop 01', exact: true })).toBeVisible()
  48  |   await viewer.getByRole('button', { name: 'Next image', exact: true }).click()
  49  |   await expect(viewer.getByRole('heading', { name: 'Index crop 02', exact: true })).toBeVisible()
  50  |   await expect.poll(() => viewer.locator('img').evaluate(image => (image as HTMLImageElement).naturalWidth)).toBe(1120)
  51  |   await expect(viewer).not.toContainText('June Ellis')
  52  |   await viewer.getByRole('button', { name: 'Zoom in', exact: true }).click()
  53  |   await expect(viewer.getByLabel('Zoom level')).toHaveText('150%')
  54  |   await viewer.getByRole('button', { name: 'Previous image', exact: true }).click()
  55  |   await expect(viewer.getByLabel('Zoom level')).toHaveText('100%')
  56  |   await viewer.getByRole('button', { name: 'Save to Case Board', exact: true }).click()
  57  |   await viewer.getByRole('button', { name: 'Back to album' }).click()
  58  |   await unlock(page, 'Hidden Album \u00b7 Quay references', 'NORTHQUAY')
  59  |   await page.getByRole('button', { name: 'View Notice-board photo', exact: true }).click()
  60  |   await expect.poll(() => viewer.locator('img').evaluate(image => (image as HTMLImageElement).naturalWidth)).toBe(1425)
  61  |   await viewer.getByRole('button', { name: 'Next image', exact: true }).click()
  62  |   await expect.poll(() => viewer.locator('img').evaluate(image => (image as HTMLImageElement).naturalWidth)).toBe(1080)
  63  |   await viewer.getByRole('button', { name: 'Save to Case Board', exact: true }).click()
  64  |   await page.screenshot({ path: test.info().outputPath('map-viewer.png') })
  65  |   await viewer.getByRole('button', { name: 'Back to album' }).click()
  66  |   await page.getByRole('button', { name: 'Evidence', exact: true }).click()
  67  |   await expect(page.getByText('gallery / OBSERVATION / UNVERIFIED')).toHaveCount(2)
  68  |   await page.getByRole('button', { name: 'View retained Hidden Album \u00b7 Quay references', exact: true }).click()
  69  |   await expect(viewer.getByRole('heading', { name: 'Notice-board photo', exact: true })).toBeVisible()
  70  |   await page.keyboard.press('Escape')
  71  |   await page.reload()
  72  |   await page.getByRole('button', { name: /Enter the archive/i }).click()
  73  |   await page.getByRole('button', { name: 'Open The Archive', exact: true }).click()
  74  |   await page.getByRole('button', { name: 'Resume Photos', exact: true }).click()
  75  |   await page.getByRole('button', { name: 'More options' }).click()
  76  |   await expect(page.getByRole('button', { name: 'Saved to Case Board', exact: true })).toBeDisabled()
  77  |   await page.getByRole('button', { name: 'Close options' }).click()
  78  |   await expect(page.getByRole('button', { name: 'View Map screenshot', exact: true })).toBeVisible()
  79  | })
  80  | 
  81  | test('unavailable full image has retry and caption fallback without losing album navigation', async ({ page }) => {
  82  |   await page.route('**/media/gallery/01-shelf-photo.png', route => route.abort())
  83  |   await start(page)
  84  |   await page.getByRole('button', { name: 'View photos', exact: true }).click()
  85  |   const viewer = page.getByRole('dialog', { name: 'Photo viewer' })
  86  |   await expect(viewer.getByText('Photo unavailable.')).toBeVisible()
  87  |   await expect(viewer.getByText(/Document shelf/)).toBeVisible()
  88  |   await page.unroute('**/media/gallery/01-shelf-photo.png')
  89  |   await viewer.getByRole('button', { name: 'Retry image', exact: true }).click()
  90  |   await expect.poll(() => viewer.locator('img').evaluate(image => (image as HTMLImageElement).naturalWidth)).toBe(1425)
  91  |   await viewer.getByRole('button', { name: 'Back to album' }).click()
  92  |   await page.getByRole('button', { name: 'Back', exact: true }).click()
  93  |   await expect(page.getByLabel('Albums')).toBeVisible()
  94  | })
  95  | 
  96  | test('Sophie portrait loads and uses initial fallback when its asset is unavailable', async ({ page }) => {
  97  |   await page.goto('/?legacyopening=1')
  98  |   await page.getByRole('button', { name: "Open Sophie's new message" }).click()
  99  |   await page.getByLabel('Your name').fill('Rae')
  100 |   await page.getByRole('button', { name: 'Set up phone' }).click()
  101 |   const avatar = page.locator('.opening-chat-header .character-avatar')
  102 |   await expect.poll(() => avatar.locator('img').evaluate(image => (image as HTMLImageElement).naturalWidth)).toBe(160)
  103 |   await page.screenshot({ path: 'qa/phase-05/sophie-portrait.png' })
  104 |   await page.route('**/media/portraits/sophie-avatar.webp', route => route.abort())
  105 |   await page.reload()
> 106 |   await page.getByRole('button', { name: /Enter the archive/i }).click()
      |                                                                  ^ Error: locator.click: Test timeout of 90000ms exceeded.
  107 |   await expect(avatar).toHaveText('S')
  108 |   await expect(avatar.locator('img')).toHaveCount(0)
  109 | })
  110 | 
```