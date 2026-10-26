# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chapter1-official.spec.ts >> official structure: manual sources, diff, contacts, count, claim, board and role end Chapter 1 without launching Chapter 2
- Location: tests\e2e\chapter1-official.spec.ts:11:1

# Error details

```
Test timeout of 180000ms exceeded.
```

```
Error: locator.click: Test timeout of 180000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Open The Archive', exact: true }).first()

```

# Page snapshot

```yaml
- generic [ref=f1e4]:
  - generic "Local time 04:36 PM" [ref=f1e5]: 4:36 PM
  - main "Alex's home screen" [ref=f1e22]:
    - generic [ref=f1e23]:
      - generic [ref=f1e24]:
        - generic [ref=f1e25]: Alex's phone
        - button "Lock phone" [ref=f1e26] [cursor=pointer]
      - region "Home widgets" [ref=f1e31]:
        - button "Open photo widget" [ref=f1e32] [cursor=pointer]:
          - generic [ref=f1e33]:
            - generic [ref=f1e34]: GREYHAVEN
            - strong [ref=f1e35]: Along the water
        - button "Open calendar widget" [ref=f1e36] [cursor=pointer]:
          - strong [ref=f1e37]: JANUARY
          - generic [aria-hidden] [ref=f1e38]:
            - generic [ref=f1e39]: S
            - generic [ref=f1e40]: M
            - generic [ref=f1e41]: T
            - generic [ref=f1e42]: W
            - generic [ref=f1e43]: T
            - generic [ref=f1e44]: F
            - generic [ref=f1e45]: S
            - generic [ref=f1e51]: "1"
            - generic [ref=f1e52]: "2"
            - generic [ref=f1e53]: "3"
            - generic [ref=f1e54]: "4"
            - generic [ref=f1e55]: "5"
            - generic [ref=f1e56]: "6"
            - generic [ref=f1e57]: "7"
            - generic [ref=f1e58]: "8"
            - generic [ref=f1e59]: "9"
            - generic [ref=f1e60]: "10"
            - generic [ref=f1e61]: "11"
            - generic [ref=f1e62]: "12"
            - generic [ref=f1e63]: "13"
            - generic [ref=f1e64]: "14"
            - generic [ref=f1e65]: "15"
            - generic [ref=f1e66]: "16"
            - generic [ref=f1e67]: "17"
            - generic [ref=f1e68]: "18"
            - generic [ref=f1e69]: "19"
            - generic [ref=f1e70]: "20"
            - generic [ref=f1e71]: "21"
            - generic [ref=f1e72]: "22"
            - generic [ref=f1e73]: "23"
            - generic [ref=f1e74]: "24"
            - generic [ref=f1e75]: "25"
            - generic [ref=f1e76]: "26"
            - generic [ref=f1e77]: "27"
            - generic [ref=f1e78]: "28"
            - generic [ref=f1e79]: "29"
            - generic [ref=f1e80]: "30"
            - generic [ref=f1e81]: "31"
      - region "Home page 1 apps" [ref=f1e82]:
        - button "Open Photos" [ref=f1e83] [cursor=pointer]:
          - generic [ref=f1e95]: Photos
        - button "Open Calendar" [ref=f1e96] [cursor=pointer]:
          - generic [ref=f1e98]:
            - generic [ref=f1e99]: FRI
            - strong [ref=f1e100]: "15"
          - generic [ref=f1e101]: Calendar
        - button "Open Files" [ref=f1e102] [cursor=pointer]:
          - generic [ref=f1e107]: Files
        - button "Open Notes" [ref=f1e108] [cursor=pointer]:
          - generic [ref=f1e114]: Notes
        - button "Open Maps" [ref=f1e115] [cursor=pointer]:
          - generic [ref=f1e125]: Maps
        - button "Open Contacts" [ref=f1e126] [cursor=pointer]:
          - generic [ref=f1e135]: Contacts
        - button "Open Alerts" [ref=f1e136] [cursor=pointer]:
          - generic [ref=f1e141]: Alerts
    - generic [ref=f1e142]:
      - generic "Home pages" [ref=f1e143]:
        - button "Show home page 1" [ref=f1e144] [cursor=pointer]
        - button "Show home page 2" [ref=f1e146] [cursor=pointer]
      - navigation "Quick apps" [ref=f1e148]:
        - button "Open Calls" [ref=f1e149] [cursor=pointer]
        - button "Open Messages" [ref=f1e153] [cursor=pointer]:
          - generic [ref=f1e157]: "107"
        - button "Open Contacts" [ref=f1e158] [cursor=pointer]
  - navigation "Phone navigation" [ref=f1e167]:
    - button "Exit game" [ref=f1e168] [cursor=pointer]
```

# Test source

```ts
  1   | import { expect,test,type Page } from '@playwright/test'
  2   | import { Chapter1Fixture } from '../helpers/chapter1'
  3   | import { sceneAt,seedScene } from './scene01-helper'
  4   | 
> 5   | async function click(page:Page,name:string){await page.getByRole('button',{name,exact:true}).first().click()}
      |                                                                                                      ^ Error: locator.click: Test timeout of 180000ms exceeded.
  6   | async function inspect(page:Page,title:string){await page.getByRole('button',{name:new RegExp('^'+title.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'))}).first().click();await expect(page.getByRole('article',{name:'Investigation record'})).toBeVisible();await click(page,'Back to investigation')}
  7   | async function advance(page:Page,n:number){await click(page,'Continue investigation');await expect(page.getByRole('region',{name:'Chapter 1 investigation'})).toHaveAttribute('data-chapter1-scene',String(n))}
  8   | async function send(page:Page,text:string){await click(page,text);await click(page,'Send');await page.clock.runFor(3000)}
  9   | async function choose(page:Page,key:string,id:string){await page.getByRole('combobox',{name:`Interpret ${key}`}).selectOption(id);await click(page,'Record interpretation')}
  10  | 
  11  | test('official structure: manual sources, diff, contacts, count, claim, board and role end Chapter 1 without launching Chapter 2',async({page})=>{
  12  |   test.setTimeout(180000)
  13  |   await page.setViewportSize({width:320,height:720})
  14  |   await seedScene(page,new Chapter1Fixture().opening().save)
  15  |   await click(page,'Open The Archive')
  16  |   await expect(page.getByRole('region',{name:'Chapter 1 investigation'})).toHaveAttribute('data-chapter1-scene','4')
  17  |   await expect(page.getByText('Post-verification statement — partial reconstruction',{exact:true})).toHaveCount(0)
  18  |   await expect(page.getByRole('button',{name:'Activate recovered reference'})).toBeDisabled()
  19  |   await inspect(page,'Daniel Mercer — public report')
  20  |   await click(page,'Activate recovered reference')
  21  |   await inspect(page,'Recovered publication reference')
  22  |   await page.reload();await click(page,'Enter the archive');await click(page,'Open The Archive')
  23  |   await advance(page,5)
  24  |   await inspect(page,'Earlier recovered report layer');await click(page,'Open version comparison')
  25  |   await expect(page.getByLabel('Version comparison')).toContainText('JUNE ELLIS')
  26  |   await click(page,'Inspect and save comparison');await advance(page,6)
  27  |   await click(page,'Examine changed Escort field');await choose(page,'missing','insufficient');await advance(page,7)
  28  |   await click(page,'Open Nora reporting inbox');await send(page,'I only want to discuss the public record for now.');await click(page,'Back from conversation');await advance(page,8)
  29  |   await click(page,'Ask Nora about her retained page');await send(page,'Can I examine the page you kept?');await click(page,'Back from conversation')
  30  |   await inspect(page,'Page retained by Nora');await click(page,'Compare retained page with both source layers');await click(page,'Record retained-page comparison');await advance(page,9)
  31  |   await inspect(page,'Source trace — incomplete');await click(page,'Record source uncertainty; sender identity remains unknown');await advance(page,10)
  32  |   await click(page,'Authorize limited snapshot');await inspect(page,'To myself — recovered fragment');await advance(page,11)
  33  |   await inspect(page,'Archive Index — integrity report');await inspect(page,'Index caution — ordinary recovered record')
  34  |   await choose(page,'index','equal');await expect(page.getByRole('button',{name:'Continue investigation'})).toBeDisabled()
  35  |   await choose(page,'index','14-13')
  36  |   await page.screenshot({path:test.info().outputPath('scene11-count.png')})
  37  |   await page.reload();await click(page,'Enter the archive');await click(page,'Open The Archive');await advance(page,12)
  38  |   await send(page,'Sophie, could you put me in touch with Eli for a general recovery question?')
  39  |   await click(page,'Open Eli conversation');await send(page,'Please pass on a general question about incomplete recovery.');await click(page,'Back from conversation')
  40  |   await click(page,'Acknowledge recovery limitations');await advance(page,13)
  41  |   await click(page,'Open Maya conversation');await send(page,'We can keep personal details private.');await click(page,'Back from conversation');await advance(page,14)
  42  |   await click(page,'Open Lucas conversation');await send(page,'We can leave this here if you do not want to talk.');await click(page,'Back from conversation');await advance(page,15)
  43  |   await inspect(page,'Post-verification statement — partial reconstruction');await click(page,'Examine “after verification” against the index');await choose(page,'claim','unverified');await advance(page,16)
  44  |   await send(page,'Nora, can you provide the earliest copy of the public linked record? I am not attaching private recovered files.');await advance(page,17)
  45  |   for(const [key,id] of [['diff','observed'],['claim','reported'],['source','unknown'],['theory','interpretation']])await page.getByRole('combobox',{name:`Classify ${key}`}).selectOption(id)
  46  |   await click(page,'Check classifications');await click(page,'Save conclusion: versions differ; source and actor remain unproven');await advance(page,18)
  47  |   await inspect(page,'Correction workflow — status trace');await choose(page,'ending','cautious')
  48  |   await page.reload();await click(page,'Enter the archive');await click(page,'Open The Archive')
  49  |   await click(page,'End Chapter')
  50  |   await expect(page.getByRole('heading',{name:'CHAPTER 1 COMPLETE'})).toBeVisible()
  51  |   await expect(page.getByRole('button',{name:'Continue to Chapter 2'})).toBeVisible()
  52  |   await page.screenshot({path:test.info().outputPath('chapter-complete.png')})
  53  |   await page.clock.runFor(20000)
  54  |   const pending=await page.evaluate(()=>sessionStorage.getItem('the-archive-reboot:pending-save:v1'))
  55  |   if(pending)expect(JSON.parse(pending).save.chapter2Access).toBeUndefined()
  56  |   await click(page,'Continue to Chapter 2')
  57  |   await expect(page.getByRole('region',{name:'The Archive access extension'})).toBeVisible()
  58  |   await click(page,'Back to home');await click(page,'Open Messages')
  59  |   await expect(page.getByRole('button',{name:'Open Chapter 1 nora conversation'})).toBeVisible()
  60  |   await click(page,'Open Chapter 1 nora conversation')
  61  |   await expect(page.getByRole('region',{name:'Nora Chapter 1 conversation'})).toContainText("I've recorded your request.")
  62  | })
  63  | 
  64  | test('Unknown warning is once-only and leaves Lucas choice intact',async({page})=>{
  65  |   await seedScene(page,sceneAt('G01'))
  66  |   await click(page,'Open Messages');await click(page,'Open FIND DANIEL group conversation')
  67  |   const group=page.getByRole('region',{name:'FIND DANIEL group conversation'})
  68  |   await expect(group).toHaveAttribute('data-scene-node','OPEN-S02-C01')
  69  |   // Waking the app is a scheduler tick; the persisted group pause remains unchanged.
  70  |   await page.evaluate(()=>document.dispatchEvent(new Event('visibilitychange')))
  71  |   await page.clock.runFor(2000)
  72  |   await expect(page.getByLabel('Incoming notification',{exact:true})).toContainText('Unknown Sender')
  73  |   await expect(group).toHaveAttribute('data-scene-node','OPEN-S02-C01')
  74  |   await click(page,'Open notification from Unknown Sender')
  75  |   await click(page,'Read warning and show responses');await click(page,'Who is this?')
  76  |   await expect(page.locator('.c1-contact .opening-bubble.player')).toHaveCount(0)
  77  |   await click(page,'Send');await expect(page.locator('.c1-contact .opening-bubble.player')).toHaveCount(1)
  78  |   await page.reload();await click(page,'Enter the archive');await click(page,'Open Messages');await click(page,'Open Chapter 1 Unknown Sender conversation')
  79  |   await expect(page.getByText('Be careful who you trust in that group.',{exact:true})).toHaveCount(1)
  80  | })
  81  | 
  82  | test('warning disclosure is optional, selected before Send and acknowledged by Sophie only afterwards',async({page})=>{
  83  |   await seedScene(page,new Chapter1Fixture().opening().act({type:'read-sender'}).save)
  84  |   await click(page,'Open Messages');await click(page,'Open Sophie conversation')
  85  |   await page.getByText('Optional: tell Sophie about the warning',{exact:true}).click()
  86  |   const text='An unknown sender warned me to be careful who I trust in the group.'
  87  |   await click(page,text)
  88  |   await expect(page.locator('.opening-bubble.player').filter({hasText:text})).toHaveCount(0)
  89  |   await click(page,'Send')
  90  |   await expect(page.locator('.opening-bubble.player').filter({hasText:text})).toHaveCount(1)
  91  |   await page.clock.runFor(2000)
  92  |   await expect(page.getByRole('region',{name:'Sophie private conversation'}).getByText("Thank you for telling me. I don't know who sent that.",{exact:true})).toBeVisible()
  93  | })
  94  | 
  95  | test('no-sharing technical guidance is an explicit action and does not send a player message to Eli',async({page})=>{
  96  |   const f=new Chapter1Fixture().opening().run(11).send('eli-intro','introduce')
  97  |   await seedScene(page,f.save)
  98  |   await click(page,'Open The Archive');await click(page,'Open Eli conversation')
  99  |   await click(page,'I would rather read a general technical explanation without sharing my files.')
  100 |   await expect(page.locator('.c1-contact .opening-bubble.player')).toHaveCount(0)
  101 |   await click(page,'Read guidance without sharing')
  102 |   await expect(page.locator('.c1-contact .opening-bubble.player')).toHaveCount(0)
  103 |   await click(page,'Back from conversation')
  104 |   await expect(page.getByText(/General recovery guidance:/)).toBeVisible()
  105 |   await click(page,'Acknowledge recovery limitations');await advance(page,13)
```