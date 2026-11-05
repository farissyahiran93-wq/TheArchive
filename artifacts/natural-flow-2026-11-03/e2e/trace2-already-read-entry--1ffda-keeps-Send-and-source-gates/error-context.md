# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: trace2.spec.ts >> already-read entry opens Tracker from its attachment, reduced motion keeps Send and source gates
- Location: tests\e2e\trace2.spec.ts:108:1

# Error details

```
TypeError: Cannot read properties of undefined (reading 'versionHistory')
```

# Page snapshot

```yaml
- generic [ref=f1e4]:
  - generic "Local time 04:34 PM" [ref=f1e5]: 4:34 PM
  - generic [ref=f1e21]:
    - generic [ref=f1e22]:
      - generic [ref=f1e23]: GREYHAVEN
      - button "Main Menu" [ref=f1e24] [cursor=pointer]
    - region "Unknown Number conversation" [ref=f1e25]:
      - generic [ref=f1e26]:
        - button "Back to inbox" [ref=f1e27] [cursor=pointer]
        - generic [aria-hidden] [ref=f1e30]: UK
        - generic [ref=f1e31]:
          - strong [ref=f1e32]: Unknown Number
          - generic [ref=f1e33]: Availability unknown · Identity unverified
      - generic [ref=f1e34]:
        - generic [ref=f1e36]:
          - generic [ref=f1e37]: NEW MESSAGE · Unknown
          - generic [ref=f1e38]: You shouldn't be talking to her.
        - generic [ref=f1e40]:
          - generic [ref=f1e41]: NEW MESSAGE · Unknown
          - generic [ref=f1e42]: About the Greyhaven Bulletin article.
        - generic [ref=f1e43]:
          - generic [aria-hidden] [ref=f1e45]: UK
          - generic [ref=f1e46]: There's something connected to it that you haven't seen.
        - generic [ref=f1e48]: Who is this?
        - generic [ref=f1e51]:
          - generic [aria-hidden] [ref=f1e53]: UK
          - generic [ref=f1e54]: Someone who thinks you should see it for yourself.
        - generic [ref=f1e56]: That doesn't answer my question.
        - generic [ref=f1e59]: No.
        - generic [ref=f1e62]: It doesn't.
        - generic [ref=f1e65]:
          - generic [aria-hidden] [ref=f1e67]: UK
          - generic [ref=f1e68]: I can't give you an answer you'd be able to verify.
        - generic [ref=f1e70]: Then why should I trust you?
        - generic [ref=f1e73]: You shouldn't.
        - generic [ref=f1e76]: Not yet.
        - generic [ref=f1e79]: Look at the record.
        - generic [ref=f1e82]:
          - generic [aria-hidden] [ref=f1e84]: UK
          - generic [ref=f1e85]: Decide what it means yourself.
        - generic [ref=f1e87]: What record?
        - generic [ref=f1e90]: A reference to the Bulletin article about Daniel.
        - generic [ref=f1e93]: The title is there, but the original article text isn't.
        - generic [ref=f1e96]:
          - generic [aria-hidden] [ref=f1e98]: UK
          - generic [ref=f1e99]: You can view the entry in an app called TRACE.
        - generic [ref=f1e101]: What exactly is TRACE?
        - generic [ref=f1e104]: It's how you open the collection. You'll still have to check whether the records are reliable.
        - generic [ref=f1e107]: It lets you look through a collection of recovered references.
        - generic [ref=f1e110]: Some entries point to documents.
        - generic [ref=f1e113]: Others only have a title or reference number.
        - generic [ref=f1e116]: An entry can be there even when the document itself is missing.
        - generic [ref=f1e119]: Sometimes a copy of the document is included.
        - generic [ref=f1e122]:
          - generic [aria-hidden] [ref=f1e124]: UK
          - generic [ref=f1e125]: Sometimes only the reference is left.
        - generic [ref=f1e127]: So it's a backup?
        - generic [ref=f1e130]: Not exactly.
        - generic [ref=f1e133]: A backup should contain a copy of the actual document.
        - generic [ref=f1e136]: This collection doesn't always have that copy.
        - generic [ref=f1e139]: An entry might list a title.
        - generic [ref=f1e142]: Or a reference number.
        - generic [ref=f1e145]:
          - generic [aria-hidden] [ref=f1e147]: UK
          - generic [ref=f1e148]: That doesn't mean the document itself is there.
        - generic [ref=f1e150]: Where did it come from?
        - generic [ref=f1e153]: It was already incomplete when I got it.
        - generic [ref=f1e156]: It was described as a collection of recovered indexes.
        - generic [ref=f1e159]: I don't know who first put it together.
        - generic [ref=f1e162]:
          - generic [aria-hidden] [ref=f1e164]: UK
          - generic [ref=f1e165]: Or where each entry came from.
        - generic [ref=f1e167]: And I'm supposed to believe that?
        - generic [ref=f1e170]: You don't have to.
        - generic [ref=f1e173]:
          - generic [aria-hidden] [ref=f1e175]: UK
          - generic [ref=f1e176]: Check what you can see. Don't take my explanation as proof.
        - generic [ref=f1e178]: Why send it to me?
        - generic [ref=f1e181]: It points to the article about Daniel.
        - generic [ref=f1e184]:
          - generic [aria-hidden] [ref=f1e186]: UK
          - generic [ref=f1e187]: You can compare the reference with the public page yourself.
        - generic [ref=f1e189]: What's in the reference?
        - generic [ref=f1e192]: The article title and a reference number.
        - generic [ref=f1e195]: There's no original article text in that entry.
        - generic [ref=f1e199]:
          - generic [ref=f1e200]: TRACE · Restricted access package
          - article [ref=f1e201]:
            - strong [ref=f1e202]: TRACE.pkg
            - generic [ref=f1e203]: Restricted access package · Source unknown · Authenticity unverified
            - button "INSTALLED" [ref=f1e204] [cursor=pointer]
        - generic [ref=f1e205]: Start with the Greyhaven reference.
        - generic [ref=f1e208]: ARC-IDX-GB-041.
        - generic [ref=f1e211]: Don't assume it's an earlier version.
        - generic [ref=f1e214]: I haven't shown you one.
        - generic [ref=f1e218]:
          - generic [ref=f1e219]: NEW MESSAGE · Unknown
          - generic [ref=f1e220]: You've already seen the Bulletin article.
        - generic [ref=f1e221]: Good. You don't need to read it again.
        - generic [ref=f1e224]: I've added a reference to TRACE.
        - generic [ref=f1e227]: ARC-IDX-GB-041.
        - generic [ref=f1e230]: Track the reference. Don't assume it's an older version.
        - generic [ref=f1e233]:
          - generic [aria-hidden] [ref=f1e235]: UK
          - generic [ref=f1e236]:
            - generic [ref=f1e237]: Tell me what the index actually contains.
            - article [ref=f1e238]:
              - strong [ref=f1e239]: ARC-IDX-GB-041
              - generic [ref=f1e240]: INDEX ADDED TO TRACE · Reference only · Authenticity unverified
              - button "OPEN TRACE" [ref=f1e241] [cursor=pointer]
      - button "Jump to latest" [ref=f1e242] [cursor=pointer]
      - generic [ref=f1e243]:
        - generic [ref=f1e244]: Choose a reply
        - generic [ref=f1e245]:
          - button "I'll trace the reference and see what it holds." [ref=f1e246] [cursor=pointer]
          - button "Why should I trust a reference you added?" [ref=f1e247] [cursor=pointer]
          - button "I'll check the fields. A match won't prove an edit." [ref=f1e248] [cursor=pointer]
        - button "Send" [disabled] [ref=f1e249]
  - navigation "Phone navigation" [ref=f1e253]:
    - button "Go home" [ref=f1e254] [cursor=pointer]
```

# Test source

```ts
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
  62  |   expect(paused.chapter1!.trace!.scan.status).toBe('paused')
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
> 123 |   expect(after.chapter1!.versionHistory!.flags).toContain('public')
      |                          ^ TypeError: Cannot read properties of undefined (reading 'versionHistory')
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