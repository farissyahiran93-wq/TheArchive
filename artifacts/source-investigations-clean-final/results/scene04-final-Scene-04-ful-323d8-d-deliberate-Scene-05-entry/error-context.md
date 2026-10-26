# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: scene04-final.spec.ts >> Scene 04 full manual route: article, skipped optional group, index choices, final Sophie and deliberate Scene 05 entry
- Location: tests\e2e\scene04-final.spec.ts:10:1

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: getByRole('status')
Expected substring: "Scene 07 has not been authored"
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toContainText" getByRole('status') with timeout 5000ms
  - waiting for getByRole('status')

```

```yaml
- text: 5:00 PM
- region "Chapter 1 investigation":
  - button "Back to preceding investigation"
  - strong: THE ARCHIVE
  - text: PRIVATE WORKSPACE
  - heading "THE BYLINE" [level=1]
  - paragraph: An author's name is not the name of every source.
  - paragraph: "GB-ARTICLE-001 · Nora Vance · 7 October 2026 GB-REF-017: Publisher reference only Original notice: NOT HELD Issuer: UNKNOWN Revision author: NOT ESTABLISHED"
  - heading "INFO/NAVIGATION" [level=3]
  - group "S07-C01":
    - button "Show the name printed on the article."
    - button "Does the Corrections Desk speak for Nora?"
    - button "Can I revisit the older index first?"
  - button "OPEN ARTICLE BYLINE"
  - button "PUBLIC REPORTER LISTING"
  - button "PUBLIC REPORTING NOTE" [disabled]
  - button "OPEN GB-REF-017"
  - button "LOOK FOR THE ISSUER"
  - group: Earlier request statuses
  - heading "Optional conversations" [level=2]
  - paragraph: "R-GB-NV-001: Not sent"
  - button "OPEN FIND DANIEL"
  - button "BACK TO PRECEDING INVESTIGATION"
- navigation "Phone navigation":
  - button "Go home"
```

# Test source

```ts
  1   | import {scene06Local} from '../../src/content/scene06Final'
  2   | import {scene05Local,scene05Checklist} from '../../src/content/scene05Final'
  3   | import {test,expect,type Page} from '@playwright/test'
  4   | import {Scene04Fixture} from '../helpers/scene04Final'
  5   | import {seedScene,openSophie,sceneReply} from './scene01-helper'
  6   | test.use({reducedMotion:'reduce'})
  7   | const click=async(page:Page,name:string)=>page.getByRole('button',{name,exact:true}).first().click()
  8   | const flush=async(page:Page)=>page.waitForFunction(()=>!sessionStorage.getItem('the-archive-reboot:pending-save:v1'))
  9   | 
  10  | test('Scene 04 full manual route: article, skipped optional group, index choices, final Sophie and deliberate Scene 05 entry',async({page})=>{
  11  |   test.setTimeout(150000)
  12  |   await page.setViewportSize({width:320,height:720})
  13  |   await seedScene(page,new Scene04Fixture().at('OPEN-S04-C02').save)
  14  |   await openSophie(page)
  15  |   await sceneReply(page,'What thing?')
  16  |   await expect(page.getByRole('article',{name:'Public article link'})).toBeVisible()
  17  |   await click(page,'NOT NOW')
  18  |   await flush(page);await page.reload();await click(page,'Enter the archive');await openSophie(page)
  19  |   await click(page,'READ ARTICLE')
  20  |   await expect(page.getByRole('region',{name:'Greyhaven Bulletin public article'})).toBeVisible()
  21  |   await expect(page.locator('[data-paragraph]')).toHaveCount(6)
  22  |   await page.screenshot({path:test.info().outputPath('public-article-320.png')})
  23  |   await click(page,'By Nora Vance')
  24  |   await expect(page.getByRole('dialog',{name:'Nora Vance public byline'})).toBeVisible()
  25  |   await expect(page.getByText('No private contact information is provided.',{exact:false})).toBeVisible()
  26  |   await click(page,'Close article information')
  27  |   await click(page,'Updated: Yesterday')
  28  |   await expect(page.getByText('This page displays a later update time. A change log is not shown on this page.')).toBeVisible()
  29  |   await click(page,'Close article information')
  30  |   await click(page,'MARK AS READ');await click(page,'SAVE PUBLIC ARTICLE');await click(page,'RETURN TO SOPHIE')
  31  |   await page.clock.runFor(120000)
  32  |   await sceneReply(page,'It says less than the headline makes you expect.')
  33  |   await sceneReply(page,'That must be exhausting.')
  34  |   await sceneReply(page,'The article confirms people are worried. Not what happened.')
  35  |   await sceneReply(page,'That could be a normal correction.')
  36  |   await click(page,'READ GROUP LATER');await page.clock.runFor(120000)
  37  |   await sceneReply(page,'Do you have a screenshot from when it was published?')
  38  |   await sceneReply(page,"That's understandable.")
  39  |   await click(page,'Open The Archive')
  40  |   await expect(page.getByRole('region',{name:'Scene 04 Archive index'})).toBeVisible()
  41  |   await click(page,'OPEN INDEX')
  42  |   await expect(page.getByText('CONTENT PREVIEW: UNAVAILABLE IN THIS INDEX VIEW',{exact:false})).toBeVisible()
  43  |   await expect(page.getByText('JUNE ELLIS',{exact:false})).toHaveCount(0)
  44  |   await page.screenshot({path:test.info().outputPath('archive-index-320.png')})
  45  |   await click(page,"It's a reference that might be connected.");await click(page,'Record selection')
  46  |   await expect(page.getByRole('status')).toContainText('unverified')
  47  |   await click(page,'ACKNOWLEDGE LIMITATIONS')
  48  |   await click(page,"Don't save either item yet.");await click(page,'Record selection')
  49  |   await expect(page.getByRole('button',{name:'REVIEW VERSION HISTORY',exact:true})).toBeDisabled()
  50  |   await click(page,'RETURN TO DEVICE');await page.clock.runFor(10000)
  51  |   await openSophie(page);await page.clock.runFor(120000)
  52  |   await expect(page.locator('[data-scene-node="OPEN-S04-C12"]')).toBeVisible()
  53  |   await sceneReply(page,'Has it helped to talk about the article?')
  54  |   await sceneReply(page,'I found a saved reference that may relate to the article.')
  55  |   await sceneReply(page,"In a recovered index on this device. I haven't verified its source.")
  56  |   await sceneReply(page,'You miss him.')
  57  |   await sceneReply(page,"I'm sure you still are.")
  58  |   await sceneReply(page,"I won't. Talk later.")
  59  |   await expect(page.locator('.opening-bubble').last()).toHaveText('Goodnight.')
  60  |   await click(page,'Go home');await click(page,'Open The Archive')
  61  |   await expect(page.getByRole('button',{name:'REVIEW VERSION HISTORY',exact:true})).toBeEnabled()
  62  |   await click(page,'REVIEW VERSION HISTORY')
  63  |   await expect(page.getByRole('region',{name:'Chapter 1 investigation'})).toHaveAttribute('data-chapter1-scene','5')
  64  |   await click(page,'OPEN PUBLIC COPY');await click(page,'RETURN TO VERSION HISTORY')
  65  |   await click(page,'INSPECT INDEX');await click(page,'RETURN TO VERSION HISTORY')
  66  |   await click(page,scene05Local['S05-C01'][0].text)
  67  |   await click(page,'HOW THE BULLETIN LABELS UPDATES');await click(page,'READ POLICY');await click(page,'RETURN TO VERSION HISTORY')
  68  |   await click(page,scene05Local['S05-C02'][1].text)
  69  |   for(const [label] of scene05Checklist)await click(page,label)
  70  |   await click(page,scene05Local['S05-C03'][1].text);await click(page,scene05Local['S05-C11'][0].text)
  71  |   await expect(page.getByRole('heading',{name:'VERSION HISTORY — REVIEWED',exact:true})).toBeVisible()
  72  |   await click(page,'OPEN NEXT LEAD');await expect(page.getByRole('heading',{name:'THE CORRECTIONS DESK',exact:true})).toBeVisible()
  73  |   await click(page,'OPEN PUBLIC CORRECTIONS REGISTER');await click(page,'READ REGISTER');await click(page,'RETURN TO DESK')
  74  |   await click(page,'HOW DOES THE DESK HANDLE UPDATES?');await click(page,'READ AND ACKNOWLEDGE');await click(page,'RETURN TO DESK');await click(page,scene06Local['S06-C03'][1].text)
  75  |   for(const name of ['CARD 1 — THE ARTICLE','CARD 2 — THE INDEX','CARD 3 — THE CORRECTIONS REGISTER'])await click(page,name)
  76  |   await click(page,scene06Local['S06-C04'][2].text);await click(page,scene06Local['S06-C07'][0].text);await click(page,scene06Local['S06-C14'][0].text)
> 77  |   await click(page,'OPEN NEXT LEAD');await expect(page.getByRole('status')).toContainText('Scene 07 has not been authored')
      |                                                                             ^ Error: expect(locator).toContainText(expected) failed
  78  | })
  79  | 
  80  | test('Scene 04 optional group plays once and returns to the correct Sophie decision',async({page})=>{
  81  |   await seedScene(page,new Scene04Fixture().at('OPEN-S04-GROUP-OFFER').save)
  82  |   await openSophie(page)
  83  |   await click(page,'Open FIND DANIEL →');await page.clock.runFor(120000)
  84  |   await expect(page.locator('[data-scene-node="OPEN-S04-C07"]')).toBeVisible()
  85  |   await expect(page.getByLabel('Maya online',{exact:true}).first()).toBeVisible()
  86  |   await expect(page.getByLabel('Sophie online',{exact:true}).first()).toBeVisible()
  87  |   await sceneReply(page,"I haven't shared it publicly.")
  88  |   await click(page,'RETURN TO SOPHIE');await page.clock.runFor(120000)
  89  |   await expect(page.locator('[data-scene-node="OPEN-S04-C08"]')).toBeVisible()
  90  |   await expect(page.getByText('Sorry about the group.',{exact:true})).toHaveCount(1)
  91  | })
  92  | 
  93  | test('Scene 04 index selection survives reload; Archive selections create separately labelled sources without player bubbles',async({page})=>{
  94  |   await seedScene(page,new Scene04Fixture().at('OPEN-S04-ARCHIVE-GATE').save)
  95  |   await click(page,'Open The Archive');await click(page,'OPEN INDEX')
  96  |   await click(page,"It's a reference that might be connected.")
  97  |   await flush(page);await page.reload();await click(page,'Enter the archive');await click(page,'Open The Archive')
  98  |   await expect(page.getByRole('button',{name:"It's a reference that might be connected.",exact:true})).toHaveAttribute('aria-pressed','true')
  99  |   await click(page,'Record selection');await click(page,'ACKNOWLEDGE LIMITATIONS')
  100 |   await click(page,'Save the public article and this index entry separately.');await click(page,'Record selection')
  101 |   await flush(page)
  102 |   const recorded=await page.evaluate(async()=>{
  103 |     const db=await new Promise<IDBDatabase>((resolve,reject)=>{const r=indexedDB.open('the-archive-reboot',1);r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)})
  104 |     const s=await new Promise<any>((resolve,reject)=>{const r=db.transaction('saves').objectStore('saves').get('primary');r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)})
  105 |     db.close();return {sources:s.evidence,uiBubbles:s.prologue.scene01.messages.filter((m:{id:string})=>/^OPEN-S04-C1[01]-PLAYER/.test(m.id))}
  106 |   })
  107 |   expect(recorded.sources['EV-PUBLIC-GB-001'].verified).toBe(false)
  108 |   expect(recorded.sources['EV-INDEX-GB-041'].verified).toBe(false)
  109 |   expect(recorded.sources['EV-PUBLIC-GB-001'].source).toContain('public published copy')
  110 |   expect(recorded.sources['EV-INDEX-GB-041'].source).toContain('source UNKNOWN')
  111 |   expect(recorded.uiBubbles).toEqual([])
  112 | })
  113 | 
```