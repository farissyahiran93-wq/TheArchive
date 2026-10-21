# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: phase03c-recovery.spec.ts >> refused issue offers a narrow review without inventing an export
- Location: tests\e2e\phase03c-recovery.spec.ts:75:1

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Redacted v1/v2 lineage and public escort field.' })

```

# Test source

```ts
  1   | import { completeOpening } from './opening-helper'
  2   | import { mkdirSync } from 'node:fs'
  3   | import { expect, test, type Page } from '@playwright/test'
  4   | 
  5   | mkdirSync('qa/phase-03c',{ recursive: true })
  6   | 
  7   | async function savedField(page: Page, field: string) {
  8   |   return page.evaluate(async key => {
  9   |     const db = await new Promise<IDBDatabase>((resolve,reject) => { const request=indexedDB.open('the-archive-reboot',1); request.onsuccess=()=>resolve(request.result); request.onerror=()=>reject(request.error) })
  10  |     const value = await new Promise<unknown>((resolve,reject) => { const request=db.transaction('saves').objectStore('saves').get('primary'); request.onsuccess=()=>resolve(request.result?.e01?.[key]); request.onerror=()=>reject(request.error) })
  11  |     db.close(); return value
  12  |   },field)
  13  | }
  14  | 
  15  | async function changeSavedE01(page: Page, changes: Record<string,unknown>) {
  16  |   await page.evaluate(async fields => {
  17  |     const db = await new Promise<IDBDatabase>((resolve,reject) => { const request=indexedDB.open('the-archive-reboot',1); request.onsuccess=()=>resolve(request.result); request.onerror=()=>reject(request.error) })
  18  |     await new Promise<void>((resolve,reject) => { const tx=db.transaction('saves','readwrite'); const store=tx.objectStore('saves'); const get=store.get('primary'); get.onsuccess=()=>store.put({ ...get.result, e01: { ...get.result.e01, ...fields } },'primary'); tx.oncomplete=()=>resolve(); tx.onerror=()=>reject(tx.error) })
  19  |     db.close()
  20  |   },changes)
  21  | }
  22  | 
  23  | async function openCaseAfterReload(page: Page) {
  24  |   await page.reload()
  25  |   await page.getByRole('button',{ name: /Enter the archive/i }).click()
  26  |   await page.getByRole('button',{ name: 'Open Bulletin' }).last().click()
  27  | }
  28  | 
  29  | async function reachS27(page: Page) {
  30  |   await page.setViewportSize({ width: 390, height: 844 })
  31  |   await page.goto('/')
  32  |   await page.getByRole('button',{ name: /Enter the archive/i }).click()
  33  |   await page.getByLabel('Your name').fill('Rae')
  34  |   await page.getByRole('button',{ name: /Set up phone/i }).click()
  35  |   await completeOpening(page)
  36  |   await page.getByRole('button',{ name: 'Open Bulletin' }).last().click()
  37  |   for (const name of ['Read public brief','Read full brief','Older preview','Pin June row as an observation','View current copy','Compare copies','Escort: June Ellis → blank',"I don't know what happened.",'Save lead to private Board','Use an anonymous return token.','Review recipient and privacy','Send tip','Open reply inbox','Check public editor listing','Case code and return route','Continue to the exact row','Continue public source','Continue without sharing','Open editor note','Continue with public sources']) await page.getByRole('button',{ name, exact: true }).click()
  38  |   await page.getByRole('button',{ name: /Older Bus 4 preview.*Memory Project/ }).click()
  39  |   await page.getByRole('button',{ name: 'Cropped preview; original not held here.', exact: true }).click()
  40  |   await page.getByRole('button',{ name: 'The preview displays a 24 Nov verification stamp.' }).click()
  41  |   for (const [date,label] of [['23 Nov 2019','event'],['24 Nov 2019 15:20','stamp'],['3 Oct 2026','transfer'],['7 Oct 2026','publication']]) await page.getByLabel(`Label ${date}`).selectOption(label)
  42  |   await page.getByRole('button',{ name: 'Save date carriers' }).click()
  43  |   await page.getByRole('button',{ name: 'Open civic portal revision history' }).click()
  44  |   await page.getByRole('button',{ name: 'Correction approval.' }).click()
  45  |   for (const name of ['23 Nov 2019 · Bus 4 record date','24 Nov 2019 15:20 · v1 verification shown on crop and notice','25 Nov 2019 08:40 · v2 correction approval','The archived v1 escort field is intact.','Uncertain','Check the archived field and revision trail.']) await page.getByRole('button',{ name }).click()
  46  |   await page.getByLabel('Search public Greyhaven index').fill('Bus 4 2019 version')
  47  |   for (const id of ['SR-02','SR-04','SR-01']) {
  48  |     await page.locator('article.utility-card').filter({ hasText: id }).getByRole('button',{ name: 'Open result · inspect publisher' }).click()
  49  |     await page.getByRole('button',{ name: new RegExp(`^${id} ·`) }).click()
  50  |   }
  51  |   await page.getByRole('button',{ name: 'Save source map' }).click()
  52  |   await page.getByRole('button',{ name: 'Continue to public request' }).click()
  53  |   await expect(page.getByRole('heading',{ name: 'Ask the office that holds the past' })).toBeVisible()
  54  |   await expect.poll(() => savedField(page,'sceneId')).toBe('E01-S27')
  55  | }
  56  | 
  57  | async function submitNarrowRequest(page: Page) {
> 58  |   await page.getByRole('button',{ name: 'Redacted v1/v2 lineage and public escort field.' }).click()
      |                                                                                              ^ Error: locator.click: Test timeout of 60000ms exceeded.
  59  |   await page.getByRole('button',{ name: 'Review request' }).click()
  60  |   await page.getByRole('button',{ name: 'Submit request' }).click()
  61  | }
  62  | 
  63  | test('delayed issue stays pending with a recorded review and no R04', async ({ page }) => {
  64  |   await reachS27(page)
  65  |   await changeSavedE01(page,{ s27OfficeResponse: 'delay' })
  66  |   await openCaseAfterReload(page)
  67  |   await submitNarrowRequest(page)
  68  |   await expect(page.getByRole('status')).toContainText('Still under redaction review')
  69  |   await page.getByRole('button',{ name: 'Request recorded review' }).click()
  70  |   await expect(page.getByText('Review request recorded. Status remains pending')).toBeVisible()
  71  |   expect(await savedField(page,'s28Issue')).toBeUndefined()
  72  |   await page.screenshot({ path: 'qa/phase-03c/gcro-delayed-390x844.png', animations: 'disabled', scale: 'css' })
  73  | })
  74  | 
  75  | test('refused issue offers a narrow review without inventing an export', async ({ page }) => {
  76  |   await reachS27(page)
  77  |   await changeSavedE01(page,{ s27OfficeResponse: 'refuse' })
  78  |   await openCaseAfterReload(page)
  79  |   await submitNarrowRequest(page)
  80  |   await expect(page.getByRole('status')).toContainText('Release refused')
  81  |   await page.getByRole('button',{ name: 'Request recorded review' }).click()
  82  |   await expect(page.getByText('Status remains pending')).toBeVisible()
  83  |   expect(await savedField(page,'s28Issue')).toBeUndefined()
  84  |   await page.screenshot({ path: 'qa/phase-03c/gcro-refused-390x844.png', animations: 'disabled', scale: 'css' })
  85  | })
  86  | 
  87  | test('corrupted delivery exposes its actual status, quarantines the file and records correction request', async ({ page }) => {
  88  |   await reachS27(page)
  89  |   await submitNarrowRequest(page)
  90  |   await expect(page.getByRole('heading',{ name: 'Four pages, one claim' })).toBeVisible()
  91  |   await expect.poll(() => savedField(page,'s27Status')).toBe('issued')
  92  |   await changeSavedE01(page,{ s28Payload: 'PAGE 1 OF 4\nINCOMPLETE' })
  93  |   await openCaseAfterReload(page)
  94  |   await page.getByRole('button',{ name: 'Check delivered-file status' }).click()
  95  |   const invalidStatus = page.getByRole('status').filter({ hasText: 'source package is incomplete' })
  96  |   await expect(invalidStatus).toBeVisible()
  97  |   await invalidStatus.scrollIntoViewIfNeeded()
  98  |   await page.screenshot({ path: 'qa/phase-03c/gcro-invalid-390x844.png', animations: 'disabled', scale: 'css' })
  99  |   await page.getByRole('button',{ name: 'Request corrected release' }).click()
  100 |   const correctionStatus = page.getByRole('status')
  101 |   await expect(correctionStatus).toContainText('Correction request recorded')
  102 |   await correctionStatus.scrollIntoViewIfNeeded()
  103 |   expect(await savedField(page,'s28CorrectionRequested')).toBe(true)
  104 |   await page.screenshot({ path: 'qa/phase-03c/gcro-correction-pending-390x844.png', animations: 'disabled', scale: 'css' })
  105 | })
  106 | 
  107 | test('valid K02 with unavailable role card reaches the narrower unknown-status ending', async ({ page }) => {
  108 |   await reachS27(page)
  109 |   await submitNarrowRequest(page)
  110 |   await expect(page.getByRole('heading',{ name: 'Four pages, one claim' })).toBeVisible()
  111 |   await page.getByRole('button',{ name: 'Open GCRO-REG-01 office directory' }).click()
  112 |   for (let number=1;number<=4;number++) await page.getByRole('button',{ name: `Open page ${number} of 4` }).click()
  113 |   for (const name of ['GCRO duty records officer · GCRO-REG-01','Same root record ID, v1 snapshot, correction reference, v2 public reference','Pages 1–4 and RED-041 suppression list','This one-use request session and its own delivery record']) await page.getByRole('button',{ name }).click()
  114 |   await page.getByRole('button',{ name: 'Validate release · R04' }).click()
  115 |   for (const source of ['E012','E003','E002']) await page.getByRole('button',{ name: new RegExp(`^${source} ·`) }).click()
  116 |   await page.getByRole('button',{ name: 'Save corroborated finding' }).click()
  117 |   await expect.poll(() => savedField(page,'sceneId')).toBe('E01-S30')
  118 |   await changeSavedE01(page,{ s30PublicStatus: 'unavailable' })
  119 |   await openCaseAfterReload(page)
  120 |   await page.getByRole('button',{ name: 'Compare public directory and open status card' }).click()
  121 |   await expect(page.getByText('Individual role status is unavailable in this view.')).toBeVisible()
  122 |   await page.getByRole('button',{ name: 'The public process continues; role status is unknown.' }).click()
  123 |   await page.getByRole('button',{ name: 'End episode' }).click()
  124 |   await expect(page.getByText('A verified record was changed. The public process still accepts corrections.')).toBeVisible()
  125 |   expect(await savedField(page,'s30Hook')).toBe('fallback')
  126 |   await page.screenshot({ path: 'qa/phase-03c/s30-role-unknown-390x844.png', animations: 'disabled', scale: 'css' })
  127 | })
  128 | 
  129 | test('Archive can be accepted while Messages is declined and public research remains reachable', async ({ page }) => {
  130 |   await page.setViewportSize({ width: 390, height: 844 })
  131 |   await page.goto('/')
  132 |   await page.getByRole('button',{ name: /Enter the archive/i }).click()
  133 |   await page.getByLabel('Your name').fill('Rae')
  134 |   await page.getByRole('button',{ name: /Set up phone/i }).click()
  135 |   await completeOpening(page)
  136 |   await page.getByRole('button',{ name: 'Open Bulletin' }).last().click()
  137 |   for (const name of ['Read public brief','Read full brief','Older preview','Pin June row as an observation','View current copy','Compare copies','Escort: June Ellis → blank',"I don't know what happened.",'Save lead to private Board','Use an anonymous return token.','Review recipient and privacy','Send tip','Open reply inbox','Check public editor listing','Case code and return route','Continue to the exact row','Ask Maya']) await page.getByRole('button',{ name, exact: true }).click()
  138 |   await page.getByRole('button',{ name: 'On the civic portal page. I opened the link from your brief.' }).click()
  139 |   await page.getByRole('button',{ name: /^Send$/ }).click()
  140 |   await page.getByRole('button',{ name: 'Continue public source' }).click()
  141 |   await page.getByRole('button',{ name: /^Text only: the older preview/ }).click()
  142 |   await page.getByRole('button',{ name: /^Send$/ }).click()
  143 |   await page.getByRole('button',{ name: 'Open editor note' }).click()
  144 |   await page.getByRole('button',{ name: 'Review optional connections' }).click()
  145 |   await page.getByRole('button',{ name: 'Can I look at the Archive without joining Messages?' }).click()
  146 |   await page.getByRole('button',{ name: /^Send$/ }).click()
  147 |   await page.getByRole('button',{ name: 'Review both permissions' }).click()
  148 |   await page.getByRole('button',{ name: 'Not now · Messages' }).click()
  149 |   await page.getByRole('button',{ name: 'Open read-only Archive' }).click()
  150 |   await page.getByRole('button',{ name: 'Continue with public records' }).click()
  151 |   await expect(page.getByRole('heading',{ name: /THE ARCHIVE · Memory Project/ })).toBeVisible()
  152 |   expect(await savedField(page,'messagesConsent')).toBe(false)
  153 |   expect(await savedField(page,'archiveConsent')).toBe(true)
  154 |   await page.getByRole('button',{ name: /Older Bus 4 preview.*Memory Project/ }).click()
  155 |   await page.getByRole('button',{ name: 'Cropped preview; original not held here.', exact: true }).click()
  156 |   await expect(page.getByRole('heading',{ name: 'The date printed on an image' })).toBeVisible()
  157 | })
  158 | 
```