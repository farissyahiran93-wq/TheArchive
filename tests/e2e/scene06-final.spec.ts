import {test,expect,type Page} from '@playwright/test'
import {Scene05Fixture} from '../helpers/scene05Final'
import {correctionsDeskAction} from '../../src/game/scene06'
import {scene06Local} from '../../src/content/scene06Final'
import {seedScene,sceneReply} from './scene01-helper'
test.use({reducedMotion:'reduce'})
const click=async(p:Page,name:string)=>p.getByRole('button',{name,exact:true}).first().click()
const local=async(p:Page,id:keyof typeof scene06Local,n=0)=>click(p,scene06Local[id][n].text)
const flush=async(p:Page)=>p.waitForFunction(()=>!sessionStorage.getItem('the-archive-reboot:pending-save:v1'))
async function reload(p:Page){await flush(p);await p.reload();await click(p,'Unlock phone');await click(p,'Open TRACE')}
function base(prior?:string){const f=new Scene05Fixture().core();if(prior)f.do({type:'panel',panel:'form'}).do({type:'local',id:'S05-C04',choice:prior}).do({type:'review'}).do({type:'send-request'});f.do({type:'back'}).do({type:'local',id:'S05-C11',choice:'a'});return f.save}
export async function deskCore(p:Page){
 await click(p,'OPEN PUBLIC CORRECTIONS REGISTER');await click(p,'READ REGISTER');await click(p,'RETURN TO DESK')
 await click(p,'HOW DOES THE DESK HANDLE UPDATES?');await click(p,'READ AND ACKNOWLEDGE');await click(p,'RETURN TO DESK');await local(p,'S06-C03',1)
 for(const name of ['CARD 1 — THE ARTICLE','CARD 2 — THE INDEX','CARD 3 — THE CORRECTIONS REGISTER'])await click(p,name)
 await local(p,'S06-C04',2);await local(p,'S06-C07');await local(p,'S06-C14')
}
for(const width of [320,375,430])test(`Scene 06 public pages, acknowledgments, retry and private completion with reload at ${width}px`,async({page})=>{
 await page.setViewportSize({width,height:800});await seedScene(page,base());await click(page,'Open TRACE');await expect(page.locator('[data-chapter1-scene="5"]')).toBeVisible();await click(page,'THE CORRECTIONS DESK');await reload(page)
 await click(page,'OPEN PUBLIC CORRECTIONS REGISTER');await expect(page.getByText('Public correction notice currently listed for this article: NONE',{exact:false})).toBeVisible();await expect(page.getByText('The absence of a public correction notice',{exact:false})).toBeVisible();await page.screenshot({path:test.info().outputPath(`register-${width}.png`)});await reload(page);await click(page,'READ REGISTER');await click(page,'RETURN TO DESK')
 await click(page,'HOW DOES THE DESK HANDLE UPDATES?');await expect(page.getByText('No public notice listed does not mean no edit happened.',{exact:false})).toBeVisible();await page.screenshot({path:test.info().outputPath(`scope-${width}.png`)});await click(page,'READ AND ACKNOWLEDGE');await reload(page);await click(page,'RETURN TO DESK')
 await local(page,'S06-C03');await expect(page.getByRole('status')).toContainText('Too broad');await local(page,'S06-C03',1)
 for(const name of ['CARD 1 — THE ARTICLE','CARD 2 — THE INDEX','CARD 3 — THE CORRECTIONS REGISTER'])await click(page,name)
 await local(page,'S06-C04');await expect(page.getByRole('status')).toContainText('different record types');await local(page,'S06-C04',2);await local(page,'S06-C07',1);await expect(page.getByRole('status')).toContainText('not an edit log');await local(page,'S06-C07');await reload(page)
 await local(page,'S06-C14',2);await expect(page.getByRole('heading',{name:'THE CORRECTIONS DESK — REVIEWED',exact:true})).toBeVisible();await click(page,'OPEN NEXT LEAD');await expect(page.locator('[data-chapter1-scene="7"]')).toBeVisible();expect(await page.locator('.version-history').evaluate(el=>el.scrollWidth<=el.clientWidth+1)).toBe(true);await page.screenshot({path:test.info().outputPath(`conclusion-${width}.png`)})
})
for(const prior of ['a','b','c'])test(`Scene 06 receipt ${prior} notification, manual inbox, draft reload and actual Send`,async({page})=>{
 await seedScene(page,base(prior));await click(page,'Open TRACE');await click(page,'THE CORRECTIONS DESK');await page.clock.runFor(2000);await expect(page.getByRole('button',{name:'Open notification from Greyhaven Bulletin — Corrections Desk',exact:true})).toBeVisible();await page.screenshot({path:test.info().outputPath('notification.png')});await click(page,'Dismiss notification');await expect(page.getByText('Hello.',{exact:true})).toHaveCount(0)
 await click(page,'OPEN REQUEST');await page.clock.runFor(120000);await expect(page.getByText(prior==='a'?'You asked whether the article body changed after publication.':prior==='b'?'You asked what the “Updated: Yesterday” label refers to.':'You asked whether readers can inspect a correction note or version history for this article.',{exact:true})).toBeVisible()
 await click(page,"Does Nora Vance's byline mean she made the update?");await reload(page);await expect(page.getByRole('button',{name:"Does Nora Vance's byline mean she made the update?",exact:true})).toHaveClass(/selected/);await click(page,'Send');await page.clock.runFor(120000);await expect(page.getByText("It doesn't identify the person who last touched the web page.",{exact:true})).toBeVisible();await page.screenshot({path:test.info().outputPath('inbox.png')});await click(page,'RETURN TO DESK');await deskCore(page)
})
test('Scene 06 new form saves unsent draft, sends once and creates no prior-request reply',async({page})=>{
 await seedScene(page,correctionsDeskAction(base(),{type:'enter'}));await click(page,'Open TRACE');await click(page,'OPEN FORM');await local(page,'S06-C06',1);await expect(page.getByRole('button',{name:'SEND REQUEST',exact:true})).toHaveCount(0);await click(page,'REVIEW REQUEST');await click(page,'EDIT');await local(page,'S06-C06',2);await click(page,'REVIEW REQUEST');await click(page,'SAVE DRAFT');await reload(page);await click(page,'OPEN FORM');await click(page,'REVIEW REQUEST');await click(page,'SEND REQUEST');await reload(page);await expect(page.getByText('R-GB-CD-002 · Request delivered. Reply not yet received.',{exact:true})).toBeVisible();await expect(page.getByRole('button',{name:'SEND REQUEST',exact:true})).toHaveCount(0);await expect(page.getByRole('button',{name:'OPEN REQUEST',exact:true})).toHaveCount(0)
})
test('Scene 06 Sophie selected draft resumes and each human reply requires Send',async({page})=>{
 await seedScene(page,correctionsDeskAction(base(),{type:'enter'}));await click(page,'Open TRACE');await click(page,'CHECK ON SOPHIE');await page.clock.runFor(120000);await expect(page.locator('[data-scene-node="OPEN-S06-C08"]')).toBeVisible();await click(page,'Pretty ordinary, actually. Coffee sounds nice.');await flush(page);await page.reload();await click(page,'Unlock phone');await click(page,'Open Messages');await click(page,'Open Sophie conversation');await expect(page.getByRole('button',{name:'Pretty ordinary, actually. Coffee sounds nice.',exact:true})).toHaveAttribute('aria-pressed','true');await click(page,'Send');await page.clock.runFor(120000);await sceneReply(page,"You don't have to be positive for anyone.");await sceneReply(page,'I have. Have you?');await expect(page.locator('.opening-bubble').last()).toHaveText('Talk later.');await expect(page.getByRole('button',{name:'Send',exact:true})).toHaveCount(0)
})
