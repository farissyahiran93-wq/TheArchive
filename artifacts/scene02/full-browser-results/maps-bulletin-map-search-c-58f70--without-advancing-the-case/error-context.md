# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: maps-bulletin.spec.ts >> map search, categories, pan, zoom and overview work without advancing the case
- Location: tests\e2e\maps-bulletin.spec.ts:21:1

# Error details

```
Error: UNKNOWN: unknown error, open 'D:\Web app\TheArchive\qa\maps-bulletin\maps-390x844.png'
```

# Page snapshot

```yaml
- generic [ref=e4]:
  - generic "Greyhaven story time 8 October 2026 09:00" [ref=e5]: 9:00
  - region "Maps" [ref=e22]:
    - generic [ref=e23]:
      - region "Illustrated map of Greyhaven. Drag to pan, or use arrow keys." [ref=e24]:
        - img [ref=e25]:
          - generic [aria-hidden] [ref=e26]:
            - generic [ref=e162]:
              - generic [ref=e163]: OLD QUARTER
              - generic [ref=e164]: NORTH BANK
            - generic [ref=e165]: C A N A L
        - button "Show Civic Square" [pressed] [ref=e169] [cursor=pointer]:
          - strong: Civic Square
        - button "Show Greyhaven Library" [ref=e174] [cursor=pointer]:
          - strong: Greyhaven Library
        - button "Show North Station" [ref=e178] [cursor=pointer]:
          - strong: North Station
      - generic [ref=e187]:
        - generic [ref=e188]:
          - button "Back to home" [ref=e189] [cursor=pointer]
          - generic [ref=e192]:
            - heading "Maps" [level=1] [ref=e193]
            - text: Explore Greyhaven
          - generic [ref=e194]: Local map
        - textbox "Search map places" [ref=e200]:
          - /placeholder: Search places
        - generic "Place categories" [ref=e201]:
          - button "All places" [pressed] [ref=e202] [cursor=pointer]
          - button "Library" [ref=e206] [cursor=pointer]
          - button "Transit" [ref=e209] [cursor=pointer]
      - generic [ref=e217]:
        - generic "North is up" [ref=e218]: "N"
        - generic [ref=e221]:
          - button "Zoom in" [ref=e222] [cursor=pointer]
          - button "Zoom out" [ref=e224] [cursor=pointer]
        - button "Show all places" [ref=e226] [cursor=pointer]
      - generic: GREYHAVEN · ILLUSTRATED CITY MAP
    - region "Place details" [ref=e232]:
      - button "Browse public places" [ref=e233] [cursor=pointer]
      - generic [ref=e235]:
        - generic [ref=e240]:
          - text: Public space
          - heading "Civic Square" [level=2] [ref=e241]
          - paragraph [ref=e242]: Public meeting point
        - button "Show public places" [ref=e243] [cursor=pointer]
      - generic [ref=e246]:
        - generic [ref=e247]: Public places
        - generic [ref=e251]: No live location
  - navigation "Phone navigation" [ref=e252]:
    - button "Go home" [ref=e253] [cursor=pointer]
```

# Test source

```ts
  1   | import { completeOpening } from './opening-helper'
  2   | import { mkdirSync } from 'node:fs'
  3   | import { expect, test, type Page } from '@playwright/test'
  4   | import { briefParagraphs, currentText, previewText } from '../../src/content/e01Slice'
  5   | 
  6   | const output = 'qa/maps-bulletin'
  7   | mkdirSync(output, { recursive: true })
  8   | 
  9   | async function start(page: Page) {
  10  |   await page.goto('/?legacyopening=1')
  11  |   await page.getByRole('button', { name: /Enter the archive/i }).click()
  12  |   await page.getByLabel('Your name').fill('Rae')
  13  |   await page.getByRole('button', { name: /Set up phone/i }).click()
  14  |   await completeOpening(page)
  15  | }
  16  | async function screenshot(page: Page, name: string) {
  17  |   expect(await page.locator('.device').evaluate(el => el.scrollWidth <= el.clientWidth + 1)).toBe(true)
> 18  |   await page.screenshot({ path: `${output}/${name}.png`, animations: 'disabled', scale: 'css' })
      |   ^ Error: UNKNOWN: unknown error, open 'D:\Web app\TheArchive\qa\maps-bulletin\maps-390x844.png'
  19  | }
  20  | 
  21  | test('map search, categories, pan, zoom and overview work without advancing the case', async ({ page }) => {
  22  |   await page.setViewportSize({ width: 390, height: 844 })
  23  |   await start(page)
  24  |   await page.getByRole('button', { name: 'Open Maps', exact: true }).click()
  25  |   await expect(page.getByRole('heading', { name: 'Civic Square' })).toBeVisible()
  26  |   await screenshot(page, 'maps-390x844')
  27  |   const art = page.locator('.city-map-art')
  28  |   const initial = await art.getAttribute('viewBox')
  29  |   await page.getByRole('button', { name: 'Zoom in', exact: true }).click()
  30  |   await expect(art).not.toHaveAttribute('viewBox', initial!)
  31  |   const zoomed = await art.getAttribute('viewBox')
  32  |   const region = page.getByRole('region', { name: /Illustrated map of Greyhaven/ })
  33  |   await region.focus()
  34  |   await page.keyboard.press('ArrowRight')
  35  |   await expect(art).not.toHaveAttribute('viewBox', zoomed!)
  36  |   const beforeDrag = await art.getAttribute('viewBox')
  37  |   const bounds = await region.boundingBox()
  38  |   await page.mouse.move(bounds!.x + 50, bounds!.y + bounds!.height - 60)
  39  |   await page.mouse.down()
  40  |   await page.mouse.move(bounds!.x + 110, bounds!.y + bounds!.height - 90, { steps: 5 })
  41  |   await page.mouse.up()
  42  |   await expect(art).not.toHaveAttribute('viewBox', beforeDrag!)
  43  |   await page.getByRole('button', { name: 'Show all places', exact: true }).click()
  44  |   await expect(art).toHaveAttribute('viewBox', initial!)
  45  |   await page.getByRole('button', { name: 'Show Greyhaven Library', exact: true }).click()
  46  |   await expect(page.getByRole('heading', { name: 'Greyhaven Library' })).toBeVisible()
  47  |   await page.getByRole('button', { name: 'Transit', exact: true }).click()
  48  |   await expect(page.getByRole('button', { name: 'Show Greyhaven Library', exact: true })).toHaveCount(0)
  49  |   await expect(page.getByRole('button', { name: 'Show North Station', exact: true })).toHaveCount(1)
  50  |   await page.getByRole('button', { name: 'Show all places', exact: true }).click()
  51  |   await page.getByLabel('Search map places').fill('library')
  52  |   await page.getByRole('button', { name: 'Greyhaven Library Local history collection', exact: true }).first().click()
  53  |   await expect(page.getByRole('heading', { name: 'Greyhaven Library' })).toBeVisible()
  54  |   await page.getByLabel('Search map places').fill('unlisted place')
  55  |   await expect(page.getByText('No places found. Try library, station or square.')).toBeVisible()
  56  |   await page.getByRole('button', { name: 'Clear map search' }).click()
  57  |   await page.getByRole('button', { name: 'Back to home', exact: true }).click()
  58  |   await page.getByRole('button', { name: 'Open Bulletin', exact: true }).last().click()
  59  |   await expect(page.getByRole('button', { name: 'Read public brief' })).toBeVisible()
  60  | })
  61  | 
  62  | for (const mode of ['light', 'dark', 'small'] as const) {
  63  |   test(`Bulletin source fidelity and responsive reading: ${mode}`, async ({ page }) => {
  64  |     const width = mode === 'small' ? 320 : 390, height = mode === 'small' ? 568 : 844
  65  |     await page.setViewportSize({ width, height })
  66  |     await start(page)
  67  |     if (mode === 'dark') {
  68  |       await page.getByRole('button', { name: 'Show home page 2' }).click()
  69  |       await page.getByRole('button', { name: 'Open Settings', exact: true }).click()
  70  |       await page.getByLabel('Appearance').selectOption('dark')
  71  |       await page.getByRole('button', { name: 'Back to home', exact: true }).click()
  72  |     }
  73  |     await page.getByRole('button', { name: 'Open Maps', exact: true }).click()
  74  |     await expect(page.getByRole('button', { name: 'Zoom in', exact: true })).toBeInViewport()
  75  |     await screenshot(page, `maps-${mode}`)
  76  |     await page.getByRole('button', { name: 'Back to home', exact: true }).click()
  77  |     await page.getByRole('button', { name: 'Open Bulletin', exact: true }).last().click()
  78  |     await screenshot(page, `bulletin-cover-${mode}`)
  79  |     await page.getByRole('button', { name: 'Read public brief' }).click()
  80  |     await page.getByRole('button', { name: 'Read full brief' }).click()
  81  |     const article = page.getByRole('article', { name: 'Full Daniel Mercer brief' })
  82  |     for (const paragraph of briefParagraphs) await expect(article.getByText(paragraph, { exact: true })).toHaveCount(1)
  83  |     await expect(page.getByText(briefParagraphs[0], { exact: true })).toHaveCount(1)
  84  |     await screenshot(page, `bulletin-article-${mode}`)
  85  |     await page.getByRole('button', { name: 'Older preview' }).click()
  86  |     await expect(page.getByRole('button', { name: 'View current copy' })).toBeDisabled()
  87  |     await page.getByText('Plain text transcription', { exact: true }).click()
  88  |     await expect(page.locator('.source-text-view pre')).toHaveText(previewText)
  89  |     await page.getByText('Plain text transcription', { exact: true }).click()
  90  |     await page.locator('.slice-content').evaluate(el => { el.scrollTop = 0 })
  91  |     await screenshot(page, `bulletin-preview-${mode}`)
  92  |     await page.getByRole('button', { name: 'Pin June row as an observation' }).click()
  93  |     await page.getByRole('button', { name: 'View current copy' }).click()
  94  |     await page.getByText('Plain text transcription', { exact: true }).click()
  95  |     await expect(page.locator('.source-text-view pre')).toHaveText(currentText)
  96  |     await page.getByText('Plain text transcription', { exact: true }).click()
  97  |     await page.locator('.slice-content').evaluate(el => { el.scrollTop = 0 })
  98  |     await screenshot(page, `bulletin-current-${mode}`)
  99  |     await page.getByRole('button', { name: 'Compare copies' }).click()
  100 |     await screenshot(page, `bulletin-comparison-${mode}`)
  101 |     await page.getByRole('button', { name: 'The bus number', exact: true }).click()
  102 |     await expect(page.getByRole('status')).toContainText('Both headers say Bus 4.')
  103 |     await page.getByRole('button', { name: 'Hint 1', exact: true }).click()
  104 |     await expect(page.getByText('Match the record title and date first.')).toBeVisible()
  105 |     await page.getByRole('button', { name: 'Escort: June Ellis → blank', exact: true }).click()
  106 |     await expect(page.getByText('Not yet established: which complete version was certified', { exact: false })).toBeVisible()
  107 |   })
  108 | }
  109 | 
```