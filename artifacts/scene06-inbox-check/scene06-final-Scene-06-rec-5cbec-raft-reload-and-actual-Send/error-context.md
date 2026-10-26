# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: scene06-final.spec.ts >> Scene 06 receipt a notification, manual inbox, draft reload and actual Send
- Location: tests\e2e\scene06-final.spec.ts:27:34

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'THE CORRECTIONS DESK', exact: true }).first()

```

# Page snapshot

```yaml
- generic [ref=f1e4]:
  - generic "Local time 04:28 PM" [ref=f1e5]: 4:28 PM
  - region "Chapter 1 investigation" [ref=f1e22]:
    - generic [ref=f1e23]:
      - button "Back to version history" [ref=f1e24] [cursor=pointer]
      - generic [ref=f1e27]:
        - strong [ref=f1e28]: Browser
        - generic [ref=f1e29]: greyhaven-bulletin
    - generic [ref=f1e30]:
      - article [ref=f1e31]:
        - heading "Request delivered to corrections desk." [level=1] [ref=f1e32]
        - paragraph [ref=f1e33]: "Receipt: R-GB-VH-001"
        - paragraph [ref=f1e34]: "Status: Delivered / Not yet answered"
        - paragraph [ref=f1e35]: Could you confirm whether the body of this article changed after it was published on 7 October? If so, which passage and on what date?
        - paragraph [ref=f1e36]: "Article reference: GB-ARTICLE-001"
        - paragraph [ref=f1e37]: browser://greyhaven-bulletin/article/gb-daniel-mercer-001
        - paragraph [ref=f1e38]: A receipt proves delivery to this fictional desk, not that the article changed or that anyone has read the question.
        - button "RETURN TO VERSION HISTORY" [ref=f1e39] [cursor=pointer]
      - status [ref=f1e40]: Saved as an observed limitation.
  - navigation "Phone navigation" [ref=f1e41]:
    - button "Go home" [ref=f1e42] [cursor=pointer]
```

# Test source

```ts
  1  | import {test,expect,type Page} from '@playwright/test'
  2  | import {Scene05Fixture} from '../helpers/scene05Final'
  3  | import {correctionsDeskAction} from '../../src/game/scene06'
  4  | import {scene06Local} from '../../src/content/scene06Final'
  5  | import {seedScene,sceneReply} from './scene01-helper'
  6  | test.use({reducedMotion:'reduce'})
> 7  | const click=async(p:Page,name:string)=>p.getByRole('button',{name,exact:true}).first().click()
     |                                                                                        ^ Error: locator.click: Test timeout of 30000ms exceeded.
  8  | const local=async(p:Page,id:keyof typeof scene06Local,n=0)=>click(p,scene06Local[id][n].text)
  9  | const flush=async(p:Page)=>p.waitForFunction(()=>!sessionStorage.getItem('the-archive-reboot:pending-save:v1'))
  10 | async function reload(p:Page){await flush(p);await p.reload();await click(p,'Enter the archive');await click(p,'Open The Archive')}
  11 | function base(prior?:string){const f=new Scene05Fixture().core();if(prior)f.do({type:'panel',panel:'form'}).do({type:'local',id:'S05-C04',choice:prior}).do({type:'review'}).do({type:'send-request'});f.do({type:'local',id:'S05-C11',choice:'a'});return f.save}
  12 | export async function deskCore(p:Page){
  13 |  await click(p,'OPEN PUBLIC CORRECTIONS REGISTER');await click(p,'READ REGISTER');await click(p,'RETURN TO DESK')
  14 |  await click(p,'HOW DOES THE DESK HANDLE UPDATES?');await click(p,'READ AND ACKNOWLEDGE');await click(p,'RETURN TO DESK');await local(p,'S06-C03',1)
  15 |  for(const name of ['CARD 1 — THE ARTICLE','CARD 2 — THE INDEX','CARD 3 — THE CORRECTIONS REGISTER'])await click(p,name)
  16 |  await local(p,'S06-C04',2);await local(p,'S06-C07');await local(p,'S06-C14')
  17 | }
  18 | for(const width of [320,375,430])test(`Scene 06 public pages, acknowledgments, retry and private completion with reload at ${width}px`,async({page})=>{
  19 |  await page.setViewportSize({width,height:800});await seedScene(page,base());await click(page,'Open The Archive');await expect(page.locator('[data-chapter1-scene="5"]')).toBeVisible();await click(page,'THE CORRECTIONS DESK');await reload(page)
  20 |  await click(page,'OPEN PUBLIC CORRECTIONS REGISTER');await expect(page.getByText('Public correction notice currently listed for this article: NONE',{exact:false})).toBeVisible();await expect(page.getByText('The absence of a public correction notice',{exact:false})).toBeVisible();await page.screenshot({path:test.info().outputPath(`register-${width}.png`)});await reload(page);await click(page,'READ REGISTER');await click(page,'RETURN TO DESK')
  21 |  await click(page,'HOW DOES THE DESK HANDLE UPDATES?');await expect(page.getByText('No public notice listed does not mean no edit happened.',{exact:false})).toBeVisible();await page.screenshot({path:test.info().outputPath(`scope-${width}.png`)});await click(page,'READ AND ACKNOWLEDGE');await reload(page);await click(page,'RETURN TO DESK')
  22 |  await local(page,'S06-C03');await expect(page.getByRole('status')).toContainText('Too broad');await local(page,'S06-C03',1)
  23 |  for(const name of ['CARD 1 — THE ARTICLE','CARD 2 — THE INDEX','CARD 3 — THE CORRECTIONS REGISTER'])await click(page,name)
  24 |  await local(page,'S06-C04');await expect(page.getByRole('status')).toContainText('different record types');await local(page,'S06-C04',2);await local(page,'S06-C07',1);await expect(page.getByRole('status')).toContainText('not an edit log');await local(page,'S06-C07');await reload(page)
  25 |  await local(page,'S06-C14',2);await expect(page.getByRole('heading',{name:'THE CORRECTIONS DESK — REVIEWED',exact:true})).toBeVisible();await click(page,'OPEN NEXT LEAD');await expect(page.getByRole('status')).toContainText('Scene 07 has not been authored');expect(await page.locator('.version-history').evaluate(el=>el.scrollWidth<=el.clientWidth+1)).toBe(true);await page.screenshot({path:test.info().outputPath(`conclusion-${width}.png`)})
  26 | })
  27 | for(const prior of ['a','b','c'])test(`Scene 06 receipt ${prior} notification, manual inbox, draft reload and actual Send`,async({page})=>{
  28 |  await seedScene(page,base(prior));await click(page,'Open The Archive');await click(page,'THE CORRECTIONS DESK');await page.clock.runFor(2000);await expect(page.getByRole('button',{name:'Open notification from Greyhaven Bulletin — Corrections Desk',exact:true})).toBeVisible();await page.screenshot({path:test.info().outputPath('notification.png')});await click(page,'Dismiss notification');await expect(page.getByText('Hello.',{exact:true})).toHaveCount(0)
  29 |  await click(page,'OPEN REQUEST');await page.clock.runFor(120000);await expect(page.getByText(prior==='a'?'You asked whether the article body changed after publication.':prior==='b'?'You asked what the “Updated: Yesterday” label refers to.':'You asked whether readers can inspect a correction note or version history for this article.',{exact:true})).toBeVisible()
  30 |  await click(page,"Does Nora Vance's byline mean she made the update?");await reload(page);await expect(page.getByRole('button',{name:"Does Nora Vance's byline mean she made the update?",exact:true})).toHaveClass(/selected/);await click(page,'Send');await page.clock.runFor(120000);await expect(page.getByText("It doesn't identify the person who last touched the web page.",{exact:true})).toBeVisible();await page.screenshot({path:test.info().outputPath('inbox.png')});await click(page,'RETURN TO DESK');await deskCore(page)
  31 | })
  32 | test('Scene 06 new form saves unsent draft, sends once and creates no prior-request reply',async({page})=>{
  33 |  await seedScene(page,correctionsDeskAction(base(),{type:'enter'}));await click(page,'Open The Archive');await click(page,'OPEN FORM');await local(page,'S06-C06',1);await expect(page.getByRole('button',{name:'SEND REQUEST',exact:true})).toBeDisabled();await click(page,'REVIEW');await local(page,'S06-C06',2);await expect(page.getByRole('button',{name:'SEND REQUEST',exact:true})).toBeDisabled();await click(page,'SAVE DRAFT');await reload(page);await click(page,'OPEN FORM');await click(page,'REVIEW');await click(page,'SEND REQUEST');await reload(page);await expect(page.getByText('R-GB-CD-002 · Request delivered. Reply not yet received.',{exact:true})).toBeVisible();await expect(page.getByRole('button',{name:'SEND REQUEST',exact:true})).toHaveCount(0);await expect(page.getByRole('button',{name:'OPEN REQUEST',exact:true})).toHaveCount(0)
  34 | })
  35 | test('Scene 06 Sophie selected draft resumes and each human reply requires Send',async({page})=>{
  36 |  await seedScene(page,correctionsDeskAction(base(),{type:'enter'}));await click(page,'Open The Archive');await click(page,'CHECK ON SOPHIE');await page.clock.runFor(120000);await expect(page.locator('[data-scene-node="OPEN-S06-C08"]')).toBeVisible();await click(page,'Pretty ordinary, actually. Coffee sounds nice.');await flush(page);await page.reload();await click(page,'Enter the archive');await click(page,'Open Messages');await click(page,'Open Sophie conversation');await expect(page.getByRole('button',{name:'Pretty ordinary, actually. Coffee sounds nice.',exact:true})).toHaveAttribute('aria-pressed','true');await click(page,'Send');await page.clock.runFor(120000);await sceneReply(page,"You don't have to be positive for anyone.");await sceneReply(page,'I have. Have you?');await expect(page.locator('.opening-bubble').last()).toHaveText('Talk later.');await expect(page.getByRole('button',{name:'Send',exact:true})).toHaveCount(0)
  37 | })
  38 | 
```