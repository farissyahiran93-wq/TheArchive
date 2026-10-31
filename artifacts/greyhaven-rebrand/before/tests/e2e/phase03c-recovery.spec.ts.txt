import { completeOpening } from './opening-helper'
import { mkdirSync } from 'node:fs'
import { expect, test, type Page } from '@playwright/test'

mkdirSync('qa/phase-03c',{ recursive: true })

async function savedField(page: Page, field: string) {
  return page.evaluate(async key => {
    const db = await new Promise<IDBDatabase>((resolve,reject) => { const request=indexedDB.open('the-archive-reboot',1); request.onsuccess=()=>resolve(request.result); request.onerror=()=>reject(request.error) })
    const value = await new Promise<unknown>((resolve,reject) => { const request=db.transaction('saves').objectStore('saves').get('primary'); request.onsuccess=()=>resolve(request.result?.e01?.[key]); request.onerror=()=>reject(request.error) })
    db.close(); return value
  },field)
}

async function changeSavedE01(page: Page, changes: Record<string,unknown>) {
  await page.evaluate(async fields => {
    const db = await new Promise<IDBDatabase>((resolve,reject) => { const request=indexedDB.open('the-archive-reboot',1); request.onsuccess=()=>resolve(request.result); request.onerror=()=>reject(request.error) })
    await new Promise<void>((resolve,reject) => { const tx=db.transaction('saves','readwrite'); const store=tx.objectStore('saves'); const get=store.get('primary'); get.onsuccess=()=>store.put({ ...get.result, e01: { ...get.result.e01, ...fields } },'primary'); tx.oncomplete=()=>resolve(); tx.onerror=()=>reject(tx.error) })
    db.close()
  },changes)
}

async function openCaseAfterReload(page: Page) {
  await page.reload()
  await page.getByRole('button',{ name: /Enter the archive/i }).click()
  await page.getByRole('button',{ name: 'Open Bulletin' }).last().click()
}

async function reachS27(page: Page) {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/?legacyopening=1')
  await page.getByRole('button',{ name: /Enter the archive/i }).click()
  await page.getByLabel('Your name').fill('Rae')
  await page.getByRole('button',{ name: /Set up phone/i }).click()
  await completeOpening(page)
  await page.getByRole('button',{ name: 'Open Bulletin' }).last().click()
  for (const name of ['Read public brief','Read full brief','Older preview','Pin June row as an observation','View current copy','Compare copies','Escort: June Ellis → blank',"I don't know what happened.",'Save lead to private Board','Use an anonymous return token.','Review recipient and privacy','Send tip','Open reply inbox','Check public editor listing','Case code and return route','Continue to the exact row','Continue public source','Continue without sharing','Open editor note','Continue with public sources']) await page.getByRole('button',{ name, exact: true }).click()
  await page.getByRole('button',{ name: /Older Bus 4 preview.*Memory Project/ }).click()
  await page.getByRole('button',{ name: 'Cropped preview; original not held here.', exact: true }).click()
  await page.getByRole('button',{ name: 'The preview displays a 24 Nov verification stamp.' }).click()
  for (const [date,label] of [['23 Nov 2019','event'],['24 Nov 2019 15:20','stamp'],['3 Oct 2026','transfer'],['7 Oct 2026','publication']]) await page.getByLabel(`Label ${date}`).selectOption(label)
  await page.getByRole('button',{ name: 'Save date carriers' }).click()
  await page.getByRole('button',{ name: 'Open civic portal revision history' }).click()
  await page.getByRole('button',{ name: 'Correction approval.' }).click()
  for (const name of ['23 Nov 2019 · Bus 4 record date','24 Nov 2019 15:20 · v1 verification shown on crop and notice','25 Nov 2019 08:40 · v2 correction approval','The archived v1 escort field is intact.','Uncertain','Check the archived field and revision trail.']) await page.getByRole('button',{ name }).click()
  await page.getByLabel('Search public Greyhaven index').fill('Bus 4 2019 version')
  for (const id of ['SR-02','SR-04','SR-01']) {
    await page.locator('article.utility-card').filter({ hasText: id }).getByRole('button',{ name: 'Open result · inspect publisher' }).click()
    await page.getByRole('button',{ name: new RegExp(`^${id} ·`) }).click()
  }
  await page.getByRole('button',{ name: 'Save source map' }).click()
  await page.getByRole('button',{ name: 'Continue to public request' }).click()
  await expect(page.getByRole('heading',{ name: 'Ask the office that holds the past' })).toBeVisible()
  await expect.poll(() => savedField(page,'sceneId')).toBe('E01-S27')
}

async function submitNarrowRequest(page: Page) {
  await page.getByRole('button',{ name: 'Redacted v1/v2 lineage and public escort field.' }).click()
  await page.getByRole('button',{ name: 'Review request' }).click()
  await page.getByRole('button',{ name: 'Submit request' }).click()
}

test('delayed issue stays pending with a recorded review and no R04', async ({ page }) => {
  await reachS27(page)
  await changeSavedE01(page,{ s27OfficeResponse: 'delay' })
  await openCaseAfterReload(page)
  await submitNarrowRequest(page)
  await expect(page.getByRole('status')).toContainText('Still under redaction review')
  await page.getByRole('button',{ name: 'Request recorded review' }).click()
  await expect(page.getByText('Review request recorded. Status remains pending')).toBeVisible()
  expect(await savedField(page,'s28Issue')).toBeUndefined()
  await page.screenshot({ path: 'qa/phase-03c/gcro-delayed-390x844.png', animations: 'disabled', scale: 'css' })
})

test('refused issue offers a narrow review without inventing an export', async ({ page }) => {
  await reachS27(page)
  await changeSavedE01(page,{ s27OfficeResponse: 'refuse' })
  await openCaseAfterReload(page)
  await submitNarrowRequest(page)
  await expect(page.getByRole('status')).toContainText('Release refused')
  await page.getByRole('button',{ name: 'Request recorded review' }).click()
  await expect(page.getByText('Status remains pending')).toBeVisible()
  expect(await savedField(page,'s28Issue')).toBeUndefined()
  await page.screenshot({ path: 'qa/phase-03c/gcro-refused-390x844.png', animations: 'disabled', scale: 'css' })
})

test('corrupted delivery exposes its actual status, quarantines the file and records correction request', async ({ page }) => {
  await reachS27(page)
  await submitNarrowRequest(page)
  await expect(page.getByRole('heading',{ name: 'Four pages, one claim' })).toBeVisible()
  await expect.poll(() => savedField(page,'s27Status')).toBe('issued')
  await changeSavedE01(page,{ s28Payload: 'PAGE 1 OF 4\nINCOMPLETE' })
  await openCaseAfterReload(page)
  await page.getByRole('button',{ name: 'Check delivered-file status' }).click()
  const invalidStatus = page.getByRole('status').filter({ hasText: 'source package is incomplete' })
  await expect(invalidStatus).toBeVisible()
  await invalidStatus.scrollIntoViewIfNeeded()
  await page.screenshot({ path: 'qa/phase-03c/gcro-invalid-390x844.png', animations: 'disabled', scale: 'css' })
  await page.getByRole('button',{ name: 'Request corrected release' }).click()
  const correctionStatus = page.getByRole('status')
  await expect(correctionStatus).toContainText('Correction request recorded')
  await correctionStatus.scrollIntoViewIfNeeded()
  expect(await savedField(page,'s28CorrectionRequested')).toBe(true)
  await page.screenshot({ path: 'qa/phase-03c/gcro-correction-pending-390x844.png', animations: 'disabled', scale: 'css' })
})

test('valid K02 with unavailable role card reaches the narrower unknown-status ending', async ({ page }) => {
  await reachS27(page)
  await submitNarrowRequest(page)
  await expect(page.getByRole('heading',{ name: 'Four pages, one claim' })).toBeVisible()
  await page.getByRole('button',{ name: 'Open GCRO-REG-01 office directory' }).click()
  for (let number=1;number<=4;number++) await page.getByRole('button',{ name: `Open page ${number} of 4` }).click()
  for (const name of ['GCRO duty records officer · GCRO-REG-01','Same root record ID, v1 snapshot, correction reference, v2 public reference','Pages 1–4 and RED-041 suppression list','This one-use request session and its own delivery record']) await page.getByRole('button',{ name }).click()
  await page.getByRole('button',{ name: 'Validate release · R04' }).click()
  for (const source of ['E012','E003','E002']) await page.getByRole('button',{ name: new RegExp(`^${source} ·`) }).click()
  await page.getByRole('button',{ name: 'Save corroborated finding' }).click()
  await expect.poll(() => savedField(page,'sceneId')).toBe('E01-S30')
  await changeSavedE01(page,{ s30PublicStatus: 'unavailable' })
  await openCaseAfterReload(page)
  await page.getByRole('button',{ name: 'Compare public directory and open status card' }).click()
  await expect(page.getByText('Individual role status is unavailable in this view.')).toBeVisible()
  await page.getByRole('button',{ name: 'The public process continues; role status is unknown.' }).click()
  await page.getByRole('button',{ name: 'End episode' }).click()
  await expect(page.getByText('A verified record was changed. The public process still accepts corrections.')).toBeVisible()
  expect(await savedField(page,'s30Hook')).toBe('fallback')
  await page.screenshot({ path: 'qa/phase-03c/s30-role-unknown-390x844.png', animations: 'disabled', scale: 'css' })
})

test('Archive can be accepted while Messages is declined and public research remains reachable', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/?legacyopening=1')
  await page.getByRole('button',{ name: /Enter the archive/i }).click()
  await page.getByLabel('Your name').fill('Rae')
  await page.getByRole('button',{ name: /Set up phone/i }).click()
  await completeOpening(page)
  await page.getByRole('button',{ name: 'Open Bulletin' }).last().click()
  for (const name of ['Read public brief','Read full brief','Older preview','Pin June row as an observation','View current copy','Compare copies','Escort: June Ellis → blank',"I don't know what happened.",'Save lead to private Board','Use an anonymous return token.','Review recipient and privacy','Send tip','Open reply inbox','Check public editor listing','Case code and return route','Continue to the exact row','Ask Maya']) await page.getByRole('button',{ name, exact: true }).click()
  await page.getByRole('button',{ name: 'On the civic portal page. I opened the link from your brief.' }).click()
  await page.getByRole('button',{ name: /^Send$/ }).click()
  await page.getByRole('button',{ name: 'Continue public source' }).click()
  await page.getByRole('button',{ name: /^Text only: the older preview/ }).click()
  await page.getByRole('button',{ name: /^Send$/ }).click()
  await page.getByRole('button',{ name: 'Open editor note' }).click()
  await page.getByRole('button',{ name: 'Review optional connections' }).click()
  await page.getByRole('button',{ name: 'Can I look at the Archive without joining Messages?' }).click()
  await page.getByRole('button',{ name: /^Send$/ }).click()
  await page.getByRole('button',{ name: 'Review both permissions' }).click()
  await page.getByRole('button',{ name: 'Not now · Messages' }).click()
  await page.getByRole('button',{ name: 'Open read-only Archive' }).click()
  await page.getByRole('button',{ name: 'Continue with public records' }).click()
  await expect(page.getByRole('heading',{ name: /THE ARCHIVE · Memory Project/ })).toBeVisible()
  expect(await savedField(page,'messagesConsent')).toBe(false)
  expect(await savedField(page,'archiveConsent')).toBe(true)
  await page.getByRole('button',{ name: /Older Bus 4 preview.*Memory Project/ }).click()
  await page.getByRole('button',{ name: 'Cropped preview; original not held here.', exact: true }).click()
  await expect(page.getByRole('heading',{ name: 'The date printed on an image' })).toBeVisible()
})

test('second tab is stopped on a stale save and can download before an explicit reload', async ({ page, context }) => {
  await page.goto('/?legacyopening=1')
  await page.getByRole('button',{ name: /Enter the archive/i }).click()
  await page.getByLabel('Your name').fill('Rae')
  await page.getByRole('button',{ name: /Set up phone/i }).click()
  await completeOpening(page)
  await expect.poll(async () => page.evaluate(async () => {
    const db = await new Promise<IDBDatabase>((resolve,reject) => { const request=indexedDB.open('the-archive-reboot',1); request.onsuccess=()=>resolve(request.result); request.onerror=()=>reject(request.error) })
    const revision = await new Promise<number>((resolve,reject) => { const request=db.transaction('saves').objectStore('saves').get('primary'); request.onsuccess=()=>resolve(request.result?.saveRevision ?? 0); request.onerror=()=>reject(request.error) })
    db.close(); return revision
  })).toBeGreaterThan(0)
  const other = await context.newPage()
  await other.goto('/?legacyopening=1')
  await other.getByRole('button',{ name: /Enter the archive/i }).click()
  await page.getByRole('button',{ name: 'Open Bulletin' }).last().click()
  await other.getByRole('button',{ name: 'Open Bulletin' }).last().click()
  await page.getByRole('button',{ name: 'Read public brief' }).click()
  await expect.poll(() => savedField(page,'sceneId')).toBe('E01-S03')
  await other.getByRole('button',{ name: 'Read public brief' }).click()
  await expect(other.getByRole('heading',{ name: 'Save needs attention' })).toBeVisible()
  await expect(other.getByText('changed in another tab')).toBeVisible()
  await other.screenshot({ path: 'qa/phase-03c/save-conflict-390x844.png', animations: 'disabled', scale: 'css' })
  await other.setViewportSize({ width: 320, height: 568 })
  await other.evaluate(() => { document.documentElement.style.zoom = '2' })
  const backup = other.getByRole('button',{ name: 'Download local backup' })
  await backup.scrollIntoViewIfNeeded()
  await expect(backup).toBeInViewport()
  await other.evaluate(() => { document.documentElement.style.zoom = '1' })
  await other.getByRole('button',{ name: 'Reload stored save' }).click()
  await expect(other.getByRole('button',{ name: 'Read full brief' })).toBeVisible()
  await other.close()
})

test('same-tab reload replays an interrupted pending save against the exact stored revision', async ({ page }) => {
  await page.goto('/?legacyopening=1')
  await page.getByRole('button',{ name: /Enter the archive/i }).click()
  await page.getByLabel('Your name').fill('Rae')
  await page.getByRole('button',{ name: /Set up phone/i }).click()
  await completeOpening(page)
  await expect.poll(async () => page.evaluate(async () => {
    const db = await new Promise<IDBDatabase>((resolve,reject) => { const request=indexedDB.open('the-archive-reboot',1); request.onsuccess=()=>resolve(request.result); request.onerror=()=>reject(request.error) })
    const request=db.transaction('saves').objectStore('saves').get('primary')
    const value=await new Promise<{ saveRevision?: number } | undefined>((resolve,reject) => { request.onsuccess=()=>resolve(request.result); request.onerror=()=>reject(request.error) })
    db.close(); return value?.saveRevision ?? 0
  })).toBeGreaterThan(0)
  await page.evaluate(async () => {
    const db = await new Promise<IDBDatabase>((resolve,reject) => { const request=indexedDB.open('the-archive-reboot',1); request.onsuccess=()=>resolve(request.result); request.onerror=()=>reject(request.error) })
    const request=db.transaction('saves').objectStore('saves').get('primary')
    const stored=await new Promise<Record<string,unknown> & { saveRevision: number; choices: Record<string,string> }>((resolve,reject) => { request.onsuccess=()=>resolve(request.result); request.onerror=()=>reject(request.error) })
    db.close()
    sessionStorage.setItem('the-archive-reboot:pending-save:v1',JSON.stringify({ baseRevision: stored.saveRevision, save: { ...stored, saveRevision: stored.saveRevision+1, choices: { ...stored.choices, interruptedDraft: 'kept' } } }))
  })
  await page.reload()
  await page.getByRole('button',{ name: /Enter the archive/i }).click()
  await expect(page.getByRole('heading',{ name: 'Save needs attention' })).toHaveCount(0)
  const choice = await page.evaluate(async () => {
    const db = await new Promise<IDBDatabase>((resolve,reject) => { const request=indexedDB.open('the-archive-reboot',1); request.onsuccess=()=>resolve(request.result); request.onerror=()=>reject(request.error) })
    const request=db.transaction('saves').objectStore('saves').get('primary')
    const stored=await new Promise<{ choices: Record<string,string> }>((resolve,reject) => { request.onsuccess=()=>resolve(request.result); request.onerror=()=>reject(request.error) })
    db.close(); return stored.choices.interruptedDraft
  })
  expect(choice).toBe('kept')
})
