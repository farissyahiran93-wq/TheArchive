# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: phase03c-recovery.spec.ts >> second tab is stopped on a stale save and can download before an explicit reload
- Location: tests\e2e\phase03c-recovery.spec.ts:159:1

# Error details

```
Test timeout of 90000ms exceeded.
```

```
Error: locator.click: Test timeout of 90000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Open Bulletin' }).last()

```

# Page snapshot

```yaml
- generic [ref=e4]:
  - generic "Greyhaven story time 8 October 2026 09:00" [ref=e5]: 9:00
  - generic [ref=e22]:
    - generic [ref=e23]:
      - generic [ref=e24]:
        - button "Back to home" [ref=e25] [cursor=pointer]
        - generic [ref=e28]:
          - generic [ref=e29]: GREYHAVEN MEMORY PROJECT
          - heading "Bulletin." [level=1] [ref=e30]
        - generic [ref=e31]: LOCALRECORDS
      - list "Case reading progress" [ref=e32]:
        - listitem [ref=e33]: 01The brief
        - listitem [ref=e34]: 02Records
        - listitem [ref=e35]: 03Your tip
        - listitem [ref=e36]: 04Research
    - generic [ref=e37]:
      - paragraph [ref=e38]:
        - generic [ref=e39]: THE MISSING ENTRY
        - generic [ref=e40]: CASE MP-DM-07
      - article [ref=e41]:
        - img "Greyhaven canal, an editorial city image" [ref=e42]:
          - generic [ref=e43]: GREYHAVENMemory Project
          - generic [ref=e44]: CITY & COMMUNITY
        - generic [ref=e45]:
          - generic [ref=e46]: MISSING PERSON · PUBLIC BRIEF
          - heading "Daniel Mercer is missing" [level=2] [ref=e48]: Daniel Merceris missing
          - paragraph [ref=e49]: Daniel Mercer was last confirmed in contact on 4 October. His sister reported him missing on 5 October.
          - generic [ref=e50]:
            - generic [ref=e51]: M
            - generic [ref=e52]:
              - strong [ref=e53]: Maya Chen
              - generic [ref=e54]: Case brief editor · 7 October
        - generic "Known dates" [ref=e58]:
          - generic [ref=e59]:
            - generic [ref=e60]: "04"
            - generic [ref=e61]: OCTOBER
            - generic [ref=e62]: Last contact
          - generic [ref=e63]:
            - generic [ref=e64]: "05"
            - generic [ref=e65]: OCTOBER
            - generic [ref=e66]: Reported missing
          - generic [ref=e67]:
            - generic [ref=e68]: "07"
            - generic [ref=e69]: OCTOBER
            - generic [ref=e70]: Brief published
      - button "Read public brief" [ref=e71] [cursor=pointer]
  - navigation "Phone navigation" [ref=e72]:
    - button "Go home" [ref=e73] [cursor=pointer]
```

# Test source

```ts
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
  131 |   await page.goto('/?legacyopening=1')
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
  159 | test('second tab is stopped on a stale save and can download before an explicit reload', async ({ page, context }) => {
  160 |   await page.goto('/?legacyopening=1')
  161 |   await page.getByRole('button',{ name: /Enter the archive/i }).click()
  162 |   await page.getByLabel('Your name').fill('Rae')
  163 |   await page.getByRole('button',{ name: /Set up phone/i }).click()
  164 |   await completeOpening(page)
  165 |   await expect.poll(async () => page.evaluate(async () => {
  166 |     const db = await new Promise<IDBDatabase>((resolve,reject) => { const request=indexedDB.open('the-archive-reboot',1); request.onsuccess=()=>resolve(request.result); request.onerror=()=>reject(request.error) })
  167 |     const revision = await new Promise<number>((resolve,reject) => { const request=db.transaction('saves').objectStore('saves').get('primary'); request.onsuccess=()=>resolve(request.result?.saveRevision ?? 0); request.onerror=()=>reject(request.error) })
  168 |     db.close(); return revision
  169 |   })).toBeGreaterThan(0)
  170 |   const other = await context.newPage()
  171 |   await other.goto('/')
  172 |   await other.getByRole('button',{ name: /Enter the archive/i }).click()
  173 |   await page.getByRole('button',{ name: 'Open Bulletin' }).last().click()
> 174 |   await other.getByRole('button',{ name: 'Open Bulletin' }).last().click()
      |                                                                    ^ Error: locator.click: Test timeout of 90000ms exceeded.
  175 |   await page.getByRole('button',{ name: 'Read public brief' }).click()
  176 |   await expect.poll(() => savedField(page,'sceneId')).toBe('E01-S03')
  177 |   await other.getByRole('button',{ name: 'Read public brief' }).click()
  178 |   await expect(other.getByRole('heading',{ name: 'Save needs attention' })).toBeVisible()
  179 |   await expect(other.getByText('changed in another tab')).toBeVisible()
  180 |   await other.screenshot({ path: 'qa/phase-03c/save-conflict-390x844.png', animations: 'disabled', scale: 'css' })
  181 |   await other.setViewportSize({ width: 320, height: 568 })
  182 |   await other.evaluate(() => { document.documentElement.style.zoom = '2' })
  183 |   const backup = other.getByRole('button',{ name: 'Download local backup' })
  184 |   await backup.scrollIntoViewIfNeeded()
  185 |   await expect(backup).toBeInViewport()
  186 |   await other.evaluate(() => { document.documentElement.style.zoom = '1' })
  187 |   await other.getByRole('button',{ name: 'Reload stored save' }).click()
  188 |   await expect(other.getByRole('button',{ name: 'Read full brief' })).toBeVisible()
  189 |   await other.close()
  190 | })
  191 | 
  192 | test('same-tab reload replays an interrupted pending save against the exact stored revision', async ({ page }) => {
  193 |   await page.goto('/?legacyopening=1')
  194 |   await page.getByRole('button',{ name: /Enter the archive/i }).click()
  195 |   await page.getByLabel('Your name').fill('Rae')
  196 |   await page.getByRole('button',{ name: /Set up phone/i }).click()
  197 |   await completeOpening(page)
  198 |   await expect.poll(async () => page.evaluate(async () => {
  199 |     const db = await new Promise<IDBDatabase>((resolve,reject) => { const request=indexedDB.open('the-archive-reboot',1); request.onsuccess=()=>resolve(request.result); request.onerror=()=>reject(request.error) })
  200 |     const request=db.transaction('saves').objectStore('saves').get('primary')
  201 |     const value=await new Promise<{ saveRevision?: number } | undefined>((resolve,reject) => { request.onsuccess=()=>resolve(request.result); request.onerror=()=>reject(request.error) })
  202 |     db.close(); return value?.saveRevision ?? 0
  203 |   })).toBeGreaterThan(0)
  204 |   await page.evaluate(async () => {
  205 |     const db = await new Promise<IDBDatabase>((resolve,reject) => { const request=indexedDB.open('the-archive-reboot',1); request.onsuccess=()=>resolve(request.result); request.onerror=()=>reject(request.error) })
  206 |     const request=db.transaction('saves').objectStore('saves').get('primary')
  207 |     const stored=await new Promise<Record<string,unknown> & { saveRevision: number; choices: Record<string,string> }>((resolve,reject) => { request.onsuccess=()=>resolve(request.result); request.onerror=()=>reject(request.error) })
  208 |     db.close()
  209 |     sessionStorage.setItem('the-archive-reboot:pending-save:v1',JSON.stringify({ baseRevision: stored.saveRevision, save: { ...stored, saveRevision: stored.saveRevision+1, choices: { ...stored.choices, interruptedDraft: 'kept' } } }))
  210 |   })
  211 |   await page.reload()
  212 |   await page.getByRole('button',{ name: /Enter the archive/i }).click()
  213 |   await expect(page.getByRole('heading',{ name: 'Save needs attention' })).toHaveCount(0)
  214 |   const choice = await page.evaluate(async () => {
  215 |     const db = await new Promise<IDBDatabase>((resolve,reject) => { const request=indexedDB.open('the-archive-reboot',1); request.onsuccess=()=>resolve(request.result); request.onerror=()=>reject(request.error) })
  216 |     const request=db.transaction('saves').objectStore('saves').get('primary')
  217 |     const stored=await new Promise<{ choices: Record<string,string> }>((resolve,reject) => { request.onsuccess=()=>resolve(request.result); request.onerror=()=>reject(request.error) })
  218 |     db.close(); return stored.choices.interruptedDraft
  219 |   })
  220 |   expect(choice).toBe('kept')
  221 | })
  222 | 
```