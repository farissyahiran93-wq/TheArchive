# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: phase03b-social-route.spec.ts >> social route accepts separate permissions, opens optional Maya scenes and sends only scoped final facts
- Location: tests\e2e\phase03b-social-route.spec.ts:4:1

# Error details

```
Error: expect(locator).toBeEnabled() failed

Locator:  getByRole('button', { name: 'End episode' })
Expected: enabled
Received: disabled
Timeout:  15000ms

Call log:
  - Expect "toBeEnabled" getByRole('button', { name: 'End episode' }) with timeout 15000ms
  - waiting for getByRole('button', { name: 'End episode' })
    33 × locator resolved to <button disabled class="action-button slice-action">End episode</button>
       - unexpected value "disabled"

```

```yaml
- button "End episode" [disabled]
```

# Test source

```ts
  7   |   await page.goto('/?legacyopening=1')
  8   |   await page.getByRole('button', { name: /Enter the archive/i }).click()
  9   |   await page.getByLabel('Your name').fill('Rae')
  10  |   await page.getByRole('button', { name: /Set up phone/i }).click()
  11  |   await completeOpening(page)
  12  |   await page.getByRole('button', { name: 'Open Bulletin' }).last().click()
  13  |   for (const name of ['Read public brief','Read full brief','Older preview','Pin June row as an observation','View current copy','Compare copies','Escort: June Ellis → blank',"I don't know what happened.",'Save lead to private Board','Use a handle.']) {
  14  |     if (name === 'Use a handle.') continue
  15  |     await page.getByRole('button',{ name, exact: true }).click()
  16  |   }
  17  |   await page.getByRole('button',{ name: 'Use a handle.' }).click()
  18  |   await page.getByLabel('Case handle').fill('RaeReader')
  19  |   for (const name of ['Review recipient and privacy','Send tip','Open reply inbox','Check public editor listing','Case code and return route','Continue to the exact row','Ask Maya']) await page.getByRole('button',{ name, exact: true }).click()
  20  |   await page.getByRole('button',{ name: 'On the civic portal page. I opened the link from your brief.' }).click()
  21  |   await page.getByRole('button',{ name: /^Send$/ }).click()
  22  |   await page.getByRole('button',{ name: 'Continue public source' }).click()
  23  |   await page.getByRole('button',{ name: /^Text only: the older preview/ }).click()
  24  |   await page.getByRole('button',{ name: /^Send$/ }).click()
  25  |   await page.getByRole('button',{ name: 'Open editor note' }).click()
  26  |   await page.getByRole('button',{ name: 'Why did he trust you with it?' }).click()
  27  |   await page.getByRole('button',{ name: /^Send$/ }).click()
  28  |   await page.getByRole('button',{ name: 'Review optional connections' }).click()
  29  |   await page.getByRole('button',{ name: 'Can I look at the Archive without joining Messages?' }).click()
  30  |   await page.getByRole('button',{ name: /^Send$/ }).click()
  31  |   await page.getByRole('button',{ name: 'Review both permissions' }).click()
  32  |   await page.getByRole('button',{ name: 'Connect in Messages' }).click()
  33  |   await page.getByRole('button',{ name: 'Open read-only Archive' }).click()
  34  |   await page.getByRole('button',{ name: 'Continue with public records' }).click()
  35  |   await expect(page.getByRole('heading',{ name: /THE ARCHIVE · Memory Project/ })).toBeVisible()
  36  |   await page.getByRole('button',{ name: 'Back to home' }).click()
  37  |   await page.getByRole('button',{ name: 'Open Messages' }).first().click()
  38  |   await page.getByRole('button',{ name: 'Open Maya Chen conversation' }).click()
  39  |   await expect(page.getByText('Connected. No new messages yet.')).toBeVisible()
  40  |   await expect(page.getByText('Why did he trust you with it?')).toHaveCount(0)
  41  |   await page.getByRole('button',{ name: 'Back to inbox' }).click()
  42  |   await page.getByRole('button',{ name: 'Back to home' }).click()
  43  |   await page.getByRole('button',{ name: 'Open Bulletin' }).last().click()
  44  |   await page.getByRole('button',{ name: /Older Bus 4 preview.*Memory Project/ }).click()
  45  |   await page.getByRole('button',{ name: 'Cropped preview; original not held here.', exact: true }).click()
  46  |   await page.getByRole('button',{ name: 'The preview displays a 24 Nov verification stamp.' }).click()
  47  |   for (const [date,label] of [['23 Nov 2019','event'],['24 Nov 2019 15:20','stamp'],['3 Oct 2026','transfer'],['7 Oct 2026','publication']]) await page.getByLabel(`Label ${date}`).selectOption(label)
  48  |   await page.getByRole('button',{ name: 'Save date carriers' }).click()
  49  |   await page.getByRole('button',{ name: 'Open civic portal revision history' }).click()
  50  |   await page.getByRole('button',{ name: 'Correction approval.' }).click()
  51  |   for (const text of ['23 Nov 2019 · Bus 4 record date','24 Nov 2019 15:20 · v1 verification shown on crop and notice','25 Nov 2019 08:40 · v2 correction approval']) await page.getByRole('button',{ name: text }).click()
  52  |   await page.getByRole('button',{ name: 'The archived v1 escort field is intact.' }).click()
  53  |   await page.getByRole('button',{ name: 'Yes', exact: true }).click()
  54  |   await page.getByRole('button',{ name: 'Check the archived field and revision trail.' }).click()
  55  |   await page.getByLabel('Search public Greyhaven index').fill('North Quay escort')
  56  |   for (const id of ['SR-02','SR-04','SR-01']) {
  57  |     await page.locator('article.utility-card').filter({ hasText: id }).getByRole('button',{ name: 'Open result · inspect publisher' }).click()
  58  |     await page.getByRole('button',{ name: new RegExp(`^${id} ·`) }).click()
  59  |   }
  60  |   await page.getByRole('button',{ name: 'Save source map' }).click()
  61  |   await page.getByRole('button',{ name: 'Open permitted note fragment' }).click()
  62  |   await expect(page.getByRole('button',{ name: 'What does 7-14 mean?' })).toHaveCount(0)
  63  |   await page.getByRole('button',{ name: 'Open Maya in Messages' }).click()
  64  |   await expect(page.getByRole('region',{ name: 'Maya Chen conversation' })).toBeVisible()
  65  |   await page.getByRole('button',{ name: 'What does 7-14 mean?' }).click()
  66  |   await page.getByRole('button',{ name: /^Send$/ }).click()
  67  |   await page.getByRole('button',{ name: 'Return to case in Bulletin' }).click()
  68  |   await page.getByRole('button',{ name: 'Save literal note as undecoded' }).click()
  69  |   await page.getByRole('button',{ name: 'Back to home' }).click()
  70  |   await page.getByRole('button',{ name: 'Open Messages' }).first().click()
  71  |   await page.getByRole('button',{ name: 'Open Maya Chen conversation' }).click()
  72  |   await expect(page.getByText('What does 7-14 mean?')).toBeVisible()
  73  |   await expect(page.getByText('Why did he trust you with it?')).toHaveCount(0)
  74  |   await page.getByRole('button',{ name: 'Back to inbox' }).click()
  75  |   await page.getByRole('button',{ name: 'Back to home' }).click()
  76  |   await page.getByRole('button',{ name: 'Open Bulletin' }).last().click()
  77  |   await page.getByRole('button',{ name: "Open Maya's optional check-in" }).click()
  78  |   await page.getByRole('button',{ name: 'Open Maya in Messages' }).click()
  79  |   await page.getByRole('button',{ name: 'You can miss him and still check the source.' }).click()
  80  |   await page.getByRole('button',{ name: /^Send$/ }).click()
  81  |   await expect(page.getByText('I know. Hearing them together helps.', { exact: true })).toBeVisible()
  82  |   await page.getByRole('button',{ name: 'Discuss the revision notice' }).click()
  83  |   await page.getByRole('button',{ name: "The order of versions is odd. Let's ask the audit office before we say why." }).click()
  84  |   await page.getByRole('button',{ name: /^Send$/ }).click()
  85  |   await expect(page.getByText("Yes. That's a sentence I could stand behind.", { exact: true })).toBeVisible()
  86  |   await page.getByRole('button',{ name: 'Continue public request' }).click()
  87  |   await page.getByRole('button',{ name: 'Redacted v1/v2 lineage and public escort field.' }).click()
  88  |   await page.getByRole('button',{ name: 'Review request' }).click()
  89  |   await page.getByRole('button',{ name: 'Submit request' }).click()
  90  |   await expect(page.getByRole('heading',{ name: 'Four pages, one claim' })).toBeVisible()
  91  |   await page.getByRole('button',{ name: 'Open GCRO-REG-01 office directory' }).click()
  92  |   for (let pageNumber=1;pageNumber<=4;pageNumber++) await page.getByRole('button',{ name: `Open page ${pageNumber} of 4` }).click()
  93  |   for (const name of ['GCRO duty records officer · GCRO-REG-01','Same root record ID, v1 snapshot, correction reference, v2 public reference','Pages 1–4 and RED-041 suppression list','This one-use request session and its own delivery record']) await page.getByRole('button',{ name }).click()
  94  |   await page.getByRole('button',{ name: 'Validate release · R04' }).click()
  95  |   for (const source of ['E012','E003','E002']) await page.getByRole('button',{ name: new RegExp(`^${source} ·`) }).click()
  96  |   await page.getByRole('button',{ name: 'Save corroborated finding' }).click()
  97  |   await page.getByRole('button',{ name: 'Open Maya in Messages' }).first().click()
  98  |   await page.getByRole('button',{ name: "I checked the lineage. The version changed after verification, but I don't know why." }).click()
  99  |   await page.getByRole('button',{ name: /^Send$/ }).click()
  100 |   await page.getByRole('button',{ name: 'Return to case in Bulletin' }).click()
  101 |   await page.getByRole('button',{ name: 'Compare public directory and open status card' }).click()
  102 |   await page.getByRole('button',{ name: 'The role can still submit correction work.' }).click()
  103 |   await page.getByRole('button',{ name: 'Open Maya in Messages' }).first().click()
  104 |   await page.getByRole('button',{ name: "I found a public status card. It says the correction queue submitter role class is still enabled. It doesn't say who uses it." }).click()
  105 |   await page.getByRole('button',{ name: /^Send$/ }).click()
  106 |   await page.getByRole('button',{ name: 'Return to case in Bulletin' }).click()
> 107 |   await expect(page.getByRole('button',{ name: 'End episode' })).toBeEnabled({timeout:15000})
      |                                                                  ^ Error: expect(locator).toBeEnabled() failed
  108 |   await page.getByRole('button',{ name: 'End episode' }).click()
  109 |   await expect(page.getByText('THE ARCHIVE · EPISODE 01 COMPLETE')).toBeVisible()
  110 |   const status = await page.evaluate(async () => {
  111 |     const db = await new Promise<IDBDatabase>((resolve,reject) => { const req = indexedDB.open('the-archive-reboot',1); req.onsuccess = () => resolve(req.result); req.onerror = () => reject(req.error) })
  112 |     const result = await new Promise<{r03:number;messages:number;r04:number;mayaFacts:string[];note:boolean;privateFileShared:boolean}>((resolve,reject) => { const req=db.transaction('saves').objectStore('saves').get('primary'); req.onsuccess=() => { const save=req.result; resolve({r03:save.deliveredEvents.filter((id:string)=>id==='R03').length,messages:save.deliveredEvents.filter((id:string)=>id==='CONN-E01-01').length,r04:save.deliveredEvents.filter((id:string)=>id==='R04').length,mayaFacts:save.knowledge.characters.maya,note:save.e01.s24NoteViewed,privateFileShared:save.messages.some((m:{attachmentIds?:string[]})=>m.attachmentIds?.includes('E012'))}) }; req.onerror=()=>reject(req.error) })
  113 |     db.close(); return result
  114 |   })
  115 |   expect(status.r03).toBe(1)
  116 |   expect(status.messages).toBe(1)
  117 |   expect(status.r04).toBe(1)
  118 |   expect(status.note).toBe(true)
  119 |   expect(status.mayaFacts).toContain('K02.public-finding')
  120 |   expect(status.mayaFacts).toContain('S30.role-class-capability')
  121 |   expect(status.privateFileShared).toBe(false)
  122 | })
  123 | 
```