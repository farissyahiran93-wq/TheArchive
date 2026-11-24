import { test, expect, type Page } from '@playwright/test'
import { newGame, type GameSave } from '../../src/game/types'
import { beginScene01, beginScene02, deliverScene01, scene01Invitation, sendScene01Choice } from '../../src/game/scene01'
import { captureSceneEntries } from '../../src/game/sceneLibrary'
import { ActIFinalFixture } from '../helpers/actIFinal'

async function seed(page:Page,save:GameSave){
  await page.goto('/')
  await expect(page.getByRole('button',{name:/NEW GAME/,exact:true})).toBeVisible()
  await page.evaluate(async value=>{
    const db=await new Promise<IDBDatabase>((resolve,reject)=>{const r=indexedDB.open('the-archive-reboot',1);r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)})
    await new Promise<void>((resolve,reject)=>{const tx=db.transaction('saves','readwrite');tx.objectStore('saves').put(value,'primary');tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error)})
    db.close()
  },save)
  await page.reload()
}
async function persisted(page:Page){return page.evaluate(async()=>{
  const db=await new Promise<IDBDatabase>((resolve,reject)=>{const r=indexedDB.open('the-archive-reboot',1);r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)})
  const save=await new Promise<unknown>((resolve,reject)=>{const r=db.transaction('saves').objectStore('saves').get('primary');r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)})
  db.close();return JSON.stringify(save)
})}
const click=async(page:Page,name:string)=>page.getByRole('button',{name,exact:true}).click()
const returnToMenu=async(page:Page)=>{if(await page.getByRole('button',{name:'Go home',exact:true}).isVisible())await click(page,'Go home');await click(page,'Show home page 2');await click(page,'Open Settings');await click(page,'Main Menu')}
const entry=()=>captureSceneEntries(newGame(),beginScene01(newGame(),1800000000000),1800000000000)

test('replaying a historical Scene 2 starts V4 with a fresh roster and no old reply',async({page})=>{
  test.setTimeout(240000)
  const settle=(save:GameSave)=>{
    while(save.prologue?.scene01?.queue[0])save=deliverScene01(save,save.prologue.scene01.queue[0].dueAt)
    return save
  }
  const now=1800000000000
  let save=settle(beginScene01({...newGame(),masterOpening:true,chapter1Edition:'ch01-v2-10'},now))
  for(let i=0;i<9;i++)save=settle(sendScene01Choice(save,'a','',true,now+100000*(i+1)))
  save={...save,prologue:{...save.prologue!,scene01:{...save.prologue!.scene01!,masterScene02Revision:3}}}
  save=scene01Invitation(save,'join',now+1000000)
  save=settle(captureSceneEntries(save,beginScene02(save,now+1100000),now+1100000))
  save=settle(sendScene01Choice(save,'a','',true,now+1300000))
  expect(save.prologue!.scene01!.groupMessages.some(line=>line.sender==='player')).toBe(true)
  await page.setViewportSize({width:375,height:812})
  await page.clock.install({time:new Date(now+2000000)})
  await seed(page,save)
  await click(page,'CHAPTERS & SCENES')
  await page.locator('.chapter-card').first().click()
  await page.locator('.library-scene').filter({hasText:'Same Old Chaos'}).getByRole('button',{name:'Play from this scene'}).click()
  await click(page,'Start scene')
  await page.clock.runFor(150000)
  await expect(page.locator('[data-scene-node="TA-S02-ELI-C01"]')).toBeVisible()
  await expect(page.getByLabel('Group participants')).toContainText('8 members')
  await expect(page.locator('.opening-bubble.player')).toHaveCount(0)
  await expect(page.getByText('You joined Same Old Chaos.',{exact:true})).toHaveCount(1)
  await expect(page.getByText("Hi. I'm Eli.",{exact:true})).toHaveCount(1)
  for(let i=0;i<10;i++){
    await page.locator('.scene01-options .opening-choice').nth(i===1?1:0).click()
    await click(page,'Send')
    await page.clock.runFor(170000)
  }
  await expect(page.getByLabel('Group participants')).toContainText('7 members')
  await expect(page.getByText('Lucas left the group.',{exact:true})).toHaveCount(1)
  await expect(page.locator('.scene01-chat')).toHaveAttribute('data-group-complete','true')
})

for(const [width,height] of [[360,780],[390,844],[412,915],[320,568],[844,390],[1440,1000]])test(`cinematic menu and scrollable controls at ${width} x ${height}`,async({page})=>{
  await page.setViewportSize({width,height});await page.goto('/')
  await expect(page).toHaveTitle('GREYHAVEN · Greyhaven Phone')
  await expect(page.getByRole('heading',{name:'GREYHAVEN',exact:true})).toBeVisible()
  await expect(page.getByText('Every secret leaves a trace.',{exact:true})).toBeVisible()
  expect(await page.locator('.menu-brand').evaluate(el=>el.scrollWidth<=el.clientWidth+1)).toBe(true)
  await expect(page.getByRole('button',{name:/CONTINUE GAME/})).toBeDisabled()
  await expect(page.locator('.cinematic-background img')).toBeVisible()
  await expect.poll(()=>page.locator('video').evaluate((v:HTMLVideoElement)=>v.readyState>=2&&!v.paused)).toBe(true)
  await page.screenshot({path:test.info().outputPath(`menu-${width}x${height}.png`)})
  await click(page,'CHAPTERS & SCENES');await expect(page.locator('.chapter-card')).toHaveCount(2)
  await expect(page.locator('.chapter-card').last()).toBeDisabled()
  await expect(page.getByRole('heading',{name:'The Missing Entry'})).toBeVisible()
  await page.screenshot({path:test.info().outputPath(`chapters-${width}.png`)})
  await page.locator('.chapter-card').first().click();await expect(page.locator('.library-scene')).toHaveCount(10)
  await expect(page.getByText('Undiscovered scene',{exact:true})).toHaveCount(10)
  await expect(page.getByText('The Secondary Card')).toHaveCount(0)
  await page.locator('.library-scene').last().scrollIntoViewIfNeeded()
  await expect(page.locator('.library-scene').last()).toBeInViewport()
  await page.screenshot({path:test.info().outputPath(`scenes-${width}.png`)})
  await click(page,'Back to chapters');await click(page,'Back to main menu');await click(page,'SETTINGS')
  await page.getByLabel('Animated background',{exact:true}).uncheck()
  await page.getByLabel('Typing speed',{exact:true}).selectOption('fast')
  await page.getByLabel('Music volume',{exact:true}).fill('0.25')
  await page.getByLabel('Master sound',{exact:true}).uncheck()
  await page.screenshot({path:test.info().outputPath(`settings-${width}.png`)})
  await click(page,'Back to main menu');await expect(page.locator('video')).toHaveCount(0)
  await page.reload();await click(page,'SETTINGS')
  await expect(page.getByLabel('Animated background',{exact:true})).not.toBeChecked()
  await expect(page.getByLabel('Typing speed',{exact:true})).toHaveValue('fast')
  await expect(page.getByLabel('Music volume',{exact:true})).toHaveValue('0.25')
  await expect(page.getByLabel('Master sound',{exact:true})).not.toBeChecked()
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true)
})

test('new game confirmation and Continue preserve actual progress; new game starts at the existing lock screen',async({page})=>{
  const main=new ActIFinalFixture(entry()).until('OPEN-S01-C02').save
  await seed(page,main);const before=await persisted(page)
  await click(page,'NEW GAME');await expect(page.getByRole('dialog')).toBeVisible()
  await page.screenshot({path:test.info().outputPath('new-game-confirmation.png')})
  await click(page,'Cancel');expect(await persisted(page)).toBe(before)
  await page.getByRole('button',{name:/CONTINUE GAME/}).click();await click(page,'Unlock phone')
  await click(page,'Open Messages');await click(page,'Open Sophie conversation')
  await expect(page.locator('[data-scene-node="OPEN-S01-C02"]')).toBeVisible()
  await returnToMenu(page);await click(page,'NEW GAME');await click(page,'Start New Game')
  await expect(page.getByRole('main',{name:'Phone lock screen'})).toBeVisible()
  expect(JSON.parse((await persisted(page))!).prologue).toBeUndefined()
})

test('starting v2 archives a historical save and Settings restores its exact story state',async({page})=>{
  const historical=new ActIFinalFixture(entry()).until('OPEN-S01-C02').save
  await seed(page,historical)
  await click(page,'NEW GAME')
  await click(page,'Start New Game')
  await click(page,'Unlock phone')
  await returnToMenu(page)
  await click(page,'SETTINGS')
  await expect(page.getByRole('button',{name:/Restore historical investigation/})).toBeVisible()
  await page.getByRole('button',{name:/Restore historical investigation/}).click()
  const restored=JSON.parse(await persisted(page)) as GameSave
  expect(restored.player).toEqual(historical.player)
  expect(restored.choices).toEqual(historical.choices)
  expect(restored.evidence).toEqual(historical.evidence)
  expect(restored.relationships).toEqual(historical.relationships)
  expect(restored.chapter1Edition).toBeUndefined()
})

test('starting a scene again replaces the primary save and continues with new choices',async({page})=>{
  await page.clock.install({time:new Date(1800000500000)})
  const main=new ActIFinalFixture(entry()).until('OPEN-S01-C02').save
  await seed(page,main);const before=await persisted(page)
  await click(page,'CHAPTERS & SCENES');await page.locator('.chapter-card').first().click();await click(page,'Play from this scene')
  await expect(page.getByRole('dialog',{name:'Start this scene again?'})).toBeVisible()
  await click(page,'Cancel');expect(await persisted(page)).toBe(before)
  await click(page,'Play from this scene');await click(page,'Start scene');await page.clock.runFor(120000)
  await expect(page.locator('[data-scene-node="OPEN-S01-C01"]')).toBeVisible()
  expect(await persisted(page)).not.toBe(before)
  const count=await page.locator('.opening-bubble.player').count()
  await page.locator('.scene01-options .opening-choice').nth(1).click()
  await expect(page.locator('.opening-bubble.player')).toHaveCount(count)
  await click(page,'Send');await page.clock.runFor(120000)
  await expect(page.locator('.opening-bubble.player')).toHaveCount(count+1)
  await page.waitForFunction(()=>!sessionStorage.getItem('the-archive-reboot:pending-save:v1'))
  const current=await persisted(page);expect(current).toContain('OPEN-S01-C01-PLAYER-b')
  await returnToMenu(page);await page.reload()
  await page.getByRole('button',{name:/CONTINUE GAME/}).click();await click(page,'Unlock phone');await click(page,'Open Messages')
  await page.getByRole('button',{name:/Open (Sophie|Unknown number) conversation/}).click();await page.clock.runFor(120000)
  await expect(page.locator('.opening-bubble.player')).toHaveCount(count+1)
  expect(await persisted(page)).toContain('OPEN-S01-C01-PLAYER-b')
})

test('old saves show unavailable context; reduced motion and missing video keep working buttons and the poster',async({page})=>{
  await page.route('**/videos/*.mp4',route=>route.abort())
  await seed(page,new ActIFinalFixture().until('OPEN-S03-C01').save)
  await expect(page.locator('.cinematic-background img')).toBeVisible();await click(page,'CHAPTERS & SCENES');await page.locator('.chapter-card').first().click()
  await expect(page.getByRole('button',{name:'Play unavailable',exact:true})).toHaveCount(3)
  await expect(page.getByRole('button',{name:'Play unavailable',exact:true}).first()).toBeDisabled()
  await click(page,'Back to chapters');await click(page,'Back to main menu')
  await page.emulateMedia({reducedMotion:'reduce'});await expect(page.locator('video')).toHaveCount(0)
  await click(page,'SETTINGS');await expect(page.getByText('Reduced motion is also enabled',{exact:false})).toBeVisible()
})

