# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: daniel-life.spec.ts >> Mail enables recovery, test preview opens it immediately and the delayed group remains manual
- Location: tests\e2e\daniel-life.spec.ts:71:1

# Error details

```
Error: locator.click: Error: strict mode violation: getByRole('button', { name: 'NOT NOW', exact: true }) resolved to 2 elements:
    1) <button class="opening-choice">NOT NOW</button> aka getByRole('button', { name: 'NOT NOW' }).first()
    2) <button class="opening-choice">NOT NOW</button> aka getByRole('dialog', { name: 'Recover recently deleted' }).getByRole('button', { name: 'NOT NOW' })

Call log:
  - waiting for getByRole('button', { name: 'NOT NOW', exact: true })

```

# Page snapshot

```yaml
- generic [ref=f1e4]:
  - generic "Local time 08:33 PM" [ref=f1e5]: 8:33 PM
  - region "Daniel Mercer's mirrored phone" [ref=f1e22]:
    - generic [ref=f1e23]:
      - button "Back to The Archive" [ref=f1e24] [cursor=pointer]: The Archive
      - generic [ref=f1e27]: MIRRORED DATA · READ ONLY
    - generic "Static snapshot clock" [ref=f1e28]:
      - text: 9:41
      - generic [ref=f1e29]: Offline snapshot
    - generic [ref=f1e30]:
      - button "Back in mirror" [ref=f1e31] [cursor=pointer]
      - generic [ref=f1e34]:
        - strong [ref=f1e35]: Deleted
        - generic [ref=f1e36]: Historical snapshot · Read only
    - generic [ref=f1e37]:
      - heading "Recently Deleted" [level=2] [ref=f1e38]
      - paragraph [ref=f1e39]: Daniel Mercer · Mirrored device
      - generic [ref=f1e40]:
        - strong [ref=f1e41]: 3 Messages
        - strong [ref=f1e42]: 2 Photos
        - strong [ref=f1e43]: 1 File
      - paragraph [ref=f1e44]: 6 deleted items have recoverable metadata. Their contents are currently unavailable.
      - heading "Content reconstruction" [level=3] [ref=f1e45]
      - paragraph [ref=f1e46]: "Estimated processing time: 25 minutes"
      - paragraph [ref=f1e47]: "Test preview: recovery opens immediately."
      - button "START RECOVERY" [active] [ref=f1e48] [cursor=pointer]
      - button "INSPECT RECOVERY DETAILS" [ref=f1e49] [cursor=pointer]
      - button "NOT NOW" [ref=f1e50] [cursor=pointer]
    - button "Mirror home" [ref=f1e51] [cursor=pointer]
    - dialog "Recover recently deleted confirmation" [ref=f1e56]:
      - generic [ref=f1e57]:
        - heading "RECOVER RECENTLY DELETED?" [level=2] [ref=f1e58]
        - paragraph [ref=f1e59]: 6 items have recoverable metadata. Recovery quality is unknown.
        - paragraph [ref=f1e60]: Test preview opens immediately.
        - button "START — OPEN NOW" [ref=f1e61] [cursor=pointer]
        - button "NOT NOW" [ref=f1e62] [cursor=pointer]
  - navigation "Phone navigation" [ref=f1e63]:
    - button "Go home" [ref=f1e64] [cursor=pointer]
```

# Test source

```ts
  1   | import { expect, test } from '@playwright/test'
  2   | import { mirrorApps } from '../../src/content/danielLife'
  3   | import { expandedMirror, mirrorApp, mirrorHome, seedMirror, storedLife } from './life-helper'
  4   | 
  5   | test('all twelve mirror apps, historical chat alignment and exit work at 320px without live actions',async({page})=>{
  6   |   await page.setViewportSize({width:320,height:720})
  7   |   await seedMirror(page)
  8   |   await expect(page.getByLabel('Static snapshot clock')).toContainText('9:41')
  9   |   const original=(await storedLife(page)).knowledge.characters
  10  |   for(const app of mirrorApps){
  11  |     await mirrorApp(page,app)
  12  |     expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true)
  13  |     expect(await page.locator('.life-phone').evaluate(e=>e.scrollWidth<=e.clientWidth+1)).toBe(true)
  14  |     await mirrorHome(page)
  15  |   }
  16  |   await mirrorApp(page,'Messages')
  17  |   await page.getByRole('button',{name:/Maya ❤️/}).click()
  18  |   await expect(page.getByText('Very aggressive traffic in the hallway.',{exact:true})).toBeVisible()
  19  |   expect(await page.locator('.life-chat-line.daniel').count()).toBe(7)
  20  |   await expect(page.getByRole('button',{name:'Send',exact:true})).toHaveCount(0)
  21  |   await page.screenshot({path:test.info().outputPath('historical-maya-320.png')})
  22  |   await mirrorHome(page)
  23  |   await mirrorApp(page,'Voice')
  24  |   await page.getByRole('button',{name:/Unsent thought/}).click()
  25  |   await expect(page.getByText("People hear a question and think you're accusing someone.",{exact:false})).toHaveCount(0)
  26  |   await page.getByRole('button',{name:'Transcript',exact:true}).click()
  27  |   await expect(page.getByText("People hear a question and think you're accusing someone.",{exact:false})).toBeVisible()
  28  |   await expect(page.getByRole('button',{name:'Audio recording unavailable',exact:true})).toBeDisabled()
  29  |   expect((await storedLife(page)).knowledge.characters).toEqual(original)
  30  |   await page.getByRole('button',{name:'Back to The Archive',exact:true}).click()
  31  |   await expect(page.getByRole('heading',{name:"Daniel Mercer's Phone",exact:true})).toBeVisible()
  32  | })
  33  | 
  34  | test('birthday puzzle has no locked text leak, preserves wrong attempts and reads optional note after reload',async({page})=>{
  35  |   await seedMirror(page)
  36  |   await mirrorApp(page,'Notes')
  37  |   await page.getByRole('textbox',{name:'Search mirrored Notes',exact:true}).fill('If I am wrong')
  38  |   await expect(page.getByRole('button',{name:/For when I can think clearly/})).toHaveCount(0)
  39  |   await page.getByRole('textbox',{name:'Search mirrored Notes',exact:true}).fill('')
  40  |   await page.getByRole('button',{name:/For when I can think clearly/}).click()
  41  |   await expect(page.getByText('If I am wrong, I can live with that.',{exact:false})).toHaveCount(0)
  42  |   for(let i=0;i<3;i++){
  43  |     await page.getByRole('textbox',{name:'Note passcode',exact:true}).fill('0000')
  44  |     await page.getByRole('button',{name:'Enter',exact:true}).click()
  45  |   }
  46  |   await expect(page.getByText('Look at the dates Daniel chose to keep.',{exact:true})).toBeVisible()
  47  |   await mirrorHome(page)
  48  |   await mirrorApp(page,'Calendar')
  49  |   await page.getByRole('button',{name:'Previous month',exact:true}).click()
  50  |   await page.getByRole('button',{name:'18 Sept 2026, has events',exact:true}).click()
  51  |   await page.getByRole('button',{name:/Maya's birthday/}).click()
  52  |   expect((await storedLife(page)).chapter2Access?.details?.observations).toContain('OBS_MAYA_BIRTHDAY_READ')
  53  |   await mirrorHome(page)
  54  |   await mirrorApp(page,'Notes')
  55  |   await page.getByRole('button',{name:/For when I can think clearly/}).click()
  56  |   await page.getByRole('textbox',{name:'Note passcode',exact:true}).fill('1809')
  57  |   await page.getByRole('button',{name:'Enter',exact:true}).click()
  58  |   await expect(page.getByText('If I am wrong, I can live with that.',{exact:false})).toBeVisible()
  59  |   await page.screenshot({path:test.info().outputPath('optional-note-unlocked.png')})
  60  |   const before=await storedLife(page)
  61  |   await page.reload()
  62  |   await page.getByRole('button',{name:'Enter the archive',exact:true}).click()
  63  |   await page.getByRole('button',{name:'Open The Archive',exact:true}).click()
  64  |   await page.getByRole('button',{name:'OPEN PHONE MIRROR',exact:true}).click()
  65  |   await page.getByRole('button',{name:'ENTER MIRROR',exact:true}).click()
  66  |   await expect(page.getByText('If I am wrong, I can live with that.',{exact:false})).toBeVisible()
  67  |   expect((await storedLife(page)).chapter2Access?.details?.unlocked).toEqual(['LIFE-N7'])
  68  |   expect((await storedLife(page)).knowledge.characters).toEqual(before.knowledge.characters)
  69  | })
  70  | 
  71  | test('Mail enables recovery, test preview opens it immediately and the delayed group remains manual',async({page})=>{
  72  |   await seedMirror(page)
  73  |   await mirrorApp(page,'Deleted')
  74  |   await expect(page.getByText('Recovery metadata not loaded. See synchronization notice in Mail.',{exact:true})).toBeVisible()
  75  |   await expect(page.getByRole('button',{name:'START RECOVERY',exact:true})).toHaveCount(0)
  76  |   await mirrorHome(page)
  77  |   await mirrorApp(page,'Mail')
  78  |   await page.getByRole('button',{name:/Storage Notification/}).click()
  79  |   await expect(page.getByText('25 MINUTES',{exact:false})).toBeVisible()
  80  |   await mirrorHome(page)
  81  |   await mirrorApp(page,'Deleted')
  82  |   await page.getByRole('button',{name:'START RECOVERY',exact:true}).click()
> 83  |   await page.getByRole('button',{name:'NOT NOW',exact:true}).click()
      |                                                              ^ Error: locator.click: Error: strict mode violation: getByRole('button', { name: 'NOT NOW', exact: true }) resolved to 2 elements:
  84  |   expect((await storedLife(page)).chapter2Access?.recovery).toBeUndefined()
  85  |   await page.getByRole('button',{name:'START RECOVERY',exact:true}).click()
  86  |   await page.getByRole('button',{name:'START — OPEN NOW',exact:true}).click()
  87  |   await expect(page.getByText('RECOVERY READY',{exact:true})).toBeVisible()
  88  |   const recovery=(await storedLife(page)).chapter2Access!.recovery!
  89  |   expect(recovery.readyAt).toBe(recovery.startedAt)
  90  |   expect(recovery.dueAt-recovery.startedAt).toBe(1500000)
  91  |   expect(await page.locator('.life-recovered').count()).toBe(6)
  92  |   await page.locator('.life-recovered summary').first().click()
  93  |   await expect(page.getByText('Content awaiting canonical recovery dataset.',{exact:true}).first()).toBeVisible()
  94  |   await page.clock.runFor(19000)
  95  |   await expect(page.getByRole('complementary',{name:'Incoming notification'})).toContainText('FIND DANIEL')
  96  |   await expect(page.getByRole('region',{name:"Daniel Mercer's mirrored phone",exact:true})).toBeVisible()
  97  |   await expect(page.getByRole('region',{name:'FIND DANIEL group conversation',exact:true})).toHaveCount(0)
  98  |   await page.screenshot({path:test.info().outputPath('instant-recovery-with-group-notification.png')})
  99  |   expect((await storedLife(page)).chapter2Access?.recovery).toEqual(recovery)
  100 | })
  101 | 
  102 | test('Nora article, appointment and map observation are independent and the browser never requests a real website',async({page})=>{
  103 |   await seedMirror(page)
  104 |   const external:string[]=[]
  105 |   page.on('request',r=>{if(/^https?:/.test(r.url())&&!r.url().includes('127.0.0.1'))external.push(r.url())})
  106 |   await mirrorApp(page,'Browser')
  107 |   await page.getByRole('textbox',{name:'Search mirrored Browser',exact:true}).fill('something outside the snapshot')
  108 |   await expect(page.getByText('No mirrored result.',{exact:true})).toBeVisible()
  109 |   await page.getByRole('textbox',{name:'Search mirrored Browser',exact:true}).fill('')
  110 |   await page.getByRole('button',{name:/When Public Records Get Updated/}).click()
  111 |   await expect(page.getByText('Nora Vance · The City Ledger · Local Affairs',{exact:true})).toBeVisible()
  112 |   let observations=(await storedLife(page)).chapter2Access!.details!.observations
  113 |   expect(observations).toContain('OBS_NORA_ARTICLE_READ')
  114 |   expect(observations).not.toContain('OBS_NORA_APPOINTMENT_READ')
  115 |   await mirrorHome(page)
  116 |   await mirrorApp(page,'Calendar')
  117 |   await page.getByRole('button',{name:/Nora Vance — coffee/}).click()
  118 |   await expect(page.getByText('Tentative. Confirmation and attendance unavailable.',{exact:true})).toBeVisible()
  119 |   await mirrorHome(page)
  120 |   await mirrorApp(page,'Maps')
  121 |   expect((await storedLife(page)).chapter2Access!.details!.observations).not.toContain('OBS_RIDGEWAY_SEARCH_VIEWED')
  122 |   await page.getByRole('button',{name:/Ridgeway Annex/}).click()
  123 |   observations=(await storedLife(page)).chapter2Access!.details!.observations
  124 |   expect(observations).toContain('OBS_RIDGEWAY_SEARCH_VIEWED')
  125 |   expect(observations).toContain('OBS_NORA_APPOINTMENT_READ')
  126 |   expect(external).toEqual([])
  127 | })
  128 | 
  129 | test('old running jobs open immediately for testing without replacing their deadline',async({page})=>{
  130 |   const s=expandedMirror(), startedAt=s.prologue!.scene01!.privateScene03!.completedAt!
  131 |   s.chapter2Access!.recovery={startedAt,dueAt:startedAt+1500000}
  132 |   s.chapter2Access!.details!.location={app:'Deleted'}
  133 |   await seedMirror(page,s)
  134 |   await page.getByRole('button',{name:'Open recovery now · test',exact:true}).click()
  135 |   await expect(page.getByText('RECOVERY READY',{exact:true})).toBeVisible()
  136 |   expect((await storedLife(page)).chapter2Access?.recovery?.dueAt).toBe(startedAt+1500000)
  137 | })
  138 | 
```