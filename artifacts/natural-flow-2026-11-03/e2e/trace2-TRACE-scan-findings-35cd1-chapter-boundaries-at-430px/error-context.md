# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: trace2.spec.ts >> TRACE scan, findings, vault, replay and chapter boundaries at 430px
- Location: tests\e2e\trace2.spec.ts:43:30

# Error details

```
TypeError: Cannot read properties of undefined (reading 'trace')
```

# Page snapshot

```yaml
- generic [ref=f1e4]:
  - generic "Local time 04:32 PM" [ref=f1e5]: 4:32 PM
  - generic [ref=f1e21]:
    - generic [ref=f1e22]:
      - generic [ref=f1e23]: GREYHAVEN
      - button "Main Menu" [ref=f1e24] [cursor=pointer]
    - region "TRACE recovered references" [ref=f1e25]:
      - generic [ref=f1e26]:
        - button "Back to TRACE" [ref=f1e27] [cursor=pointer]
        - generic [ref=f1e30]:
          - strong [ref=f1e31]: TRACE.
          - generic [ref=f1e32]: DIGITAL FORENSICS · LOCAL WORKSPACE
        - generic [ref=f1e33]: "ACCESS: PARTIAL"
      - generic [ref=f1e34]:
        - generic [ref=f1e35]: REFERENCE TRACKER / LOCAL
        - heading "Trace the connection." [level=1] [ref=f1e36]
        - paragraph [ref=f1e37]: ARC-IDX-GB-041 · Reference only
        - generic [ref=f1e38]:
          - generic [ref=f1e47]:
            - text: ENGINE STATUS
            - status [ref=f1e48]: PAUSED
          - strong [ref=f1e49]: 37%
        - progressbar "Reference trace progress" [ref=f1e50]
        - generic [ref=f1e51]:
          - generic [ref=f1e52]: TRACE ENGINE // LOCAL INDEX
          - generic [ref=f1e54]: "[INIT] Opening recovered reference store… [FOUND] ARC-IDX-GB-041"
          - generic [ref=f1e55]: trace@local:~ ▌
        - generic [ref=f1e56]:
          - generic [ref=f1e57]: Index
          - generic [ref=f1e66]: Public ID
          - generic [ref=f1e76]: Original body unavailable · Revision unverified
        - button "RESUME REFERENCE TRACE" [ref=f1e77] [cursor=pointer]
      - navigation "TRACE navigation" [ref=f1e80]:
        - button "Workspace" [ref=f1e81] [cursor=pointer]
        - button "Tracker" [ref=f1e86] [cursor=pointer]
        - button "Decryptor" [ref=f1e95] [cursor=pointer]
        - button "Vault" [ref=f1e101] [cursor=pointer]
        - button "Activity" [ref=f1e107] [cursor=pointer]
  - navigation "Phone navigation" [ref=f1e111]:
    - button "Go home" [ref=f1e112] [cursor=pointer]
```

# Test source

```ts
  1   | import { expect, test, type Page } from '@playwright/test'
  2   | import { ConversationFixture } from '../helpers/versionHistoryConversation'
  3   | import { Scene04Fixture } from '../helpers/scene04Final'
  4   | import { ActIFinalFixture } from '../helpers/actIFinal'
  5   | import { beginScene01 } from '../../src/game/scene01'
  6   | import { newGame, type GameSave } from '../../src/game/types'
  7   | import { seedScene, openSophie } from './scene01-helper'
  8   | const click=(p:Page,name:string)=>p.getByRole('button',{name,exact:true}).first().click()
  9   | const flush=(p:Page)=>p.waitForFunction(()=>!sessionStorage.getItem('the-archive-reboot:pending-save:v1'))
  10  | const runtime=(p:Page):Promise<GameSave>=>p.evaluate(async()=>{const path='/src/game/store.ts';const m=await import(path);return m.useGameStore.getState().save})
  11  | 
  12  | test('Bulletin Home widget stays empty until Sophie delivers the authored link, then survives restart',async({page})=>{
  13  |   await page.setViewportSize({width:375,height:812})
  14  |   await seedScene(page,beginScene01(newGame(),1800000000000))
  15  |   const widget=page.getByRole('region',{name:'Greyhaven Bulletin widget'})
  16  |   await expect(widget).toHaveText('GREYHAVEN BULLETIN')
  17  |   expect((await widget.boundingBox())!.height).toBeLessThan(100)
  18  |   await expect(widget.getByRole('button')).toHaveCount(0)
  19  |   await expect(page.getByRole('button',{name:'Open Bulletin',exact:true})).toHaveCount(0)
  20  |   await expect(page.getByRole('button',{name:'Open Greyhaven Bulletin article',exact:true})).toHaveCount(0)
  21  |   await page.screenshot({animations:'disabled',scale:'css',path:test.info().outputPath('home-empty-375.png')})
  22  |   const f=new Scene04Fixture(new ActIFinalFixture(beginScene01(newGame(),1800000000000)).until('complete').save)
  23  |   await seedScene(page,f.save)
  24  |   await expect(page.getByRole('region',{name:'Greyhaven Bulletin widget'})).toHaveText('GREYHAVEN BULLETIN')
  25  |   await openSophie(page);await page.clock.runFor(120000)
  26  |   for(let i=0;i<10;i++){
  27  |     if((await runtime(page)).deliveredEvents.includes('OPEN-S04-ARTICLE-ATTACHMENT'))break
  28  |     await page.locator('.scene01-options button').first().click();await click(page,'Send');await page.clock.runFor(120000)
  29  |   }
  30  |   const linked=await runtime(page)
  31  |   expect(linked.deliveredEvents.filter(id=>id==='OPEN-S04-ARTICLE-ATTACHMENT')).toHaveLength(1)
  32  |   await click(page,'Go home');await expect(page.getByRole('button',{name:'Open Greyhaven Bulletin article'})).toBeVisible()
  33  |   await page.screenshot({animations:'disabled',scale:'css',path:test.info().outputPath('home-link-375.png')})
  34  |   await flush(page);await page.reload();await click(page,'Unlock phone')
  35  |   await click(page,'Open Greyhaven Bulletin article')
  36  |   await expect(page.locator('[data-paragraph]')).toHaveCount(6)
  37  |   expect((await runtime(page)).chapter1!.publicStory!.flags).not.toContain('article-inspected')
  38  |   await expect(page.locator('.device')).toHaveClass(/surface-app/)
  39  |   await click(page,'Go home')
  40  |   await expect(page.getByRole('button',{name:'Open Greyhaven Bulletin article'})).toBeVisible()
  41  | })
  42  | 
  43  | for(const width of [320,430])test(`TRACE scan, findings, vault, replay and chapter boundaries at ${width}px`,async({page})=>{
  44  |   test.setTimeout(120000)
  45  |   await page.setViewportSize({width,height:850})
  46  |   await page.emulateMedia({reducedMotion:'no-preference',colorScheme:width===320?'light':'dark'})
  47  |   const f=new ConversationFixture().bridge().install()
  48  |   f.save.settings.reduceMotion=false
  49  |   await seedScene(page,f.save,{pauseClock:true})
  50  |   await page.evaluate(()=>{localStorage.setItem('the-archive:game-save:v1','trace2-legacy-sentinel');localStorage.removeItem('the-archive-reboot:menu-preferences:v1')})
  51  |   const before=await runtime(page)
  52  |   await click(page,'Open TRACE')
  53  |   await expect(page.locator('.trace-app')).toBeVisible()
  54  |   await page.screenshot({animations:'disabled',scale:'css',path:test.info().outputPath(`workspace-${width}.png`)})
  55  |   await click(page,'START REFERENCE TRACE')
  56  |   await page.clock.runFor(2100)
  57  |   const progress=Number(await page.getByRole('progressbar',{name:'Reference trace progress'}).getAttribute('value'))
  58  |   expect(progress).toBeGreaterThan(15);expect(progress).toBeLessThan(65)
  59  |   await page.screenshot({animations:'disabled',scale:'css',path:test.info().outputPath(`tracker-running-${width}.png`)})
  60  |   await page.evaluate(()=>{Object.defineProperty(document,'visibilityState',{configurable:true,value:'hidden'});document.dispatchEvent(new Event('visibilitychange'))})
  61  |   const paused=await runtime(page)
> 62  |   expect(paused.chapter1!.trace!.scan.status).toBe('paused')
      |                           ^ TypeError: Cannot read properties of undefined (reading 'trace')
  63  |   await page.clock.runFor(20000)
  64  |   expect((await runtime(page)).chapter1!.trace!.scan.elapsedMs).toBe(paused.chapter1!.trace!.scan.elapsedMs)
  65  |   await page.evaluate(()=>{Object.defineProperty(document,'visibilityState',{configurable:true,value:'visible'});document.dispatchEvent(new Event('visibilitychange'))})
  66  |   await page.clock.runFor(1000)
  67  |   await page.keyboard.press('Escape')
  68  |   expect((await runtime(page)).chapter1!.trace!.tab).toBe('workspace')
  69  |   await click(page,'Go home');await flush(page);await page.reload();await click(page,'Unlock phone');await click(page,'Open TRACE')
  70  |   await click(page,'RESUME REFERENCE TRACE');await page.clock.runFor(6000)
  71  |   await expect(page.getByRole('button',{name:'VIEW FINDINGS',exact:true})).toBeVisible()
  72  |   const completed=await runtime(page)
  73  |   expect(completed.evidence).toEqual(before.evidence)
  74  |   expect(completed.chapter1!.archiveOrigin!.initialInspected).toBe(false)
  75  |   expect(completed.chapter1!.completed).toEqual(before.chapter1!.completed)
  76  |   await click(page,'VIEW FINDINGS')
  77  |   const inspected=await runtime(page)
  78  |   expect(inspected.evidence['EV-TRACE-REF-001'].verified).toBe(false)
  79  |   for(const [label,text] of [['Origin / capture time','Who assembled the index'],['Original body','No earlier readable article text'],['Revision comparison','a wording change cannot be established']] as const){
  80  |     await page.getByRole('button',{name:new RegExp(label)}).click()
  81  |     await expect(page.locator('.finding-detail')).toContainText(text)
  82  |   }
  83  |   await page.getByText('Inspect recovered index fields',{exact:true}).click()
  84  |   await expect(page.locator('.trace-fields')).toContainText('AUTHENTICITY: UNVERIFIED')
  85  |   await page.screenshot({animations:'disabled',scale:'css',path:test.info().outputPath(`findings-${width}.png`)})
  86  |   await click(page,'OPEN EVIDENCE VAULT')
  87  |   await expect(page.locator('.vault-record')).toHaveCount(2)
  88  |   await expect(page.locator('.trace-app [data-paragraph]')).toHaveCount(0)
  89  |   await click(page,'Decryptor')
  90  |   await expect(page.getByText('NO ENCRYPTED PAYLOAD',{exact:true})).toBeVisible()
  91  |   await expect(page.getByRole('button',{name:'DECRYPT UNAVAILABLE'})).toBeDisabled()
  92  |   await page.screenshot({animations:'disabled',scale:'css',path:test.info().outputPath(`decryptor-${width}.png`)})
  93  |   await click(page,'Activity');await expect(page.locator('.trace-activity')).toContainText('Local analysis saved')
  94  |   await click(page,'Tracker');await click(page,'Replay animation');await page.clock.runFor(1000);await click(page,'SKIP ANIMATION');await click(page,'VIEW FINDINGS')
  95  |   const replay=await runtime(page)
  96  |   expect(replay.evidence).toEqual(inspected.evidence)
  97  |   expect(replay.knowledge).toEqual(before.knowledge)
  98  |   expect(replay.relationships).toEqual(before.relationships)
  99  |   expect(replay.chapter2Access).toBeUndefined()
  100 |   expect(await page.locator('.trace-app').evaluate(el=>el.scrollWidth<=el.clientWidth)).toBe(true)
  101 |   expect(await page.evaluate(()=>localStorage.getItem('the-archive:game-save:v1'))).toBe('trace2-legacy-sentinel')
  102 |   await page.clock.runFor(2500)
  103 |   await click(page,'RETURN TO UNKNOWN NUMBER')
  104 |   await expect(page.getByRole('region',{name:'Unknown Number conversation'})).toBeVisible()
  105 |   expect((await runtime(page)).chapter1!.sender.messages.filter(m=>m.sender==='player')).toHaveLength(before.chapter1!.sender.messages.filter(m=>m.sender==='player').length)
  106 | })
  107 | 
  108 | test('already-read entry opens Tracker from its attachment, reduced motion keeps Send and source gates',async({page})=>{
  109 |   await page.emulateMedia({reducedMotion:'reduce'})
  110 |   const f=new ConversationFixture().bridge().install().origin('inspect').do({type:'enter'}).unknown()
  111 |   await seedScene(page,f.save)
  112 |   await click(page,'Open Messages');await page.getByRole('button',{name:/Open Chapter 1 Unknown Sender conversation/}).click();await page.clock.runFor(120000)
  113 |   await expect(page.getByText("Good. You don't need to read it again.",{exact:true})).toBeVisible()
  114 |   const choices=page.locator('.scene01-options button')
  115 |   await expect(choices).toHaveCount(3)
  116 |   await expect(choices.nth(1)).toHaveText('Why should I trust a reference you added?')
  117 |   await expect(page.getByRole('button',{name:'Send',exact:true})).toBeDisabled()
  118 |   const before=await runtime(page)
  119 |   await click(page,'OPEN TRACE');await expect(page.getByRole('button',{name:'RUN LOCAL TRACE'})).toBeVisible()
  120 |   await click(page,'RUN LOCAL TRACE');await expect(page.getByRole('button',{name:'VIEW FINDINGS',exact:true})).toBeVisible()
  121 |   await click(page,'VIEW FINDINGS');await click(page,'RETURN TO UNKNOWN NUMBER')
  122 |   const after=await runtime(page)
  123 |   expect(after.chapter1!.versionHistory!.flags).toContain('public')
  124 |   expect(after.chapter1!.versionHistory!.flags).not.toContain('policy')
  125 |   expect(after.chapter1!.versionHistory!.complete).toBe(false)
  126 |   expect(after.chapter1!.sender.messages.filter(m=>m.sender==='player')).toEqual(before.chapter1!.sender.messages.filter(m=>m.sender==='player'))
  127 |   await choices.nth(1).click();await flush(page);await page.reload();await click(page,'Unlock phone');await click(page,'Open Messages');await page.getByRole('button',{name:/Open Chapter 1 Unknown Sender conversation/}).click()
  128 |   await expect(choices.nth(1)).toHaveAttribute('aria-pressed','true')
  129 |   await click(page,'Send');await page.clock.runFor(120000)
  130 |   await expect(page.locator('.natural-context button')).toHaveText('OPEN BULLETIN')
  131 |   await expect(page.getByRole('button',{name:/INSPECT FIRST/})).toHaveCount(0)
  132 | })
  133 | 
```