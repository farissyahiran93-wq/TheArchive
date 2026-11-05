import {expect,test} from '@playwright/test'
import {beginScene01} from '../../src/game/scene01'
import {newGame} from '../../src/game/types'
import {seedScene} from './scene01-helper'

test('Home keeps Maps and Contacts in place, hides early Archive, and a first reply can be sent',async({page})=>{
  await page.clock.install({time:new Date('2026-10-26T09:00:00+08:00')})
  await page.goto('/?gameplaytest=1')
  await page.getByRole('button',{name:'Unlock phone',exact:true}).click()
  const apps=page.getByRole('region',{name:'Home page 1 apps'})
  await expect(apps.getByRole('button',{name:'Open Maps'})).toBeVisible()
  await expect(apps.getByRole('button',{name:'Open Contacts'})).toBeVisible()
  await expect(page.getByRole('button',{name:'Open TRACE'})).toHaveCount(0)
  const before=await apps.locator('button').allTextContents()
  await page.clock.runFor(20_000)
  await expect(apps.locator('button')).toHaveText(before)
  await page.getByRole('button',{name:'Open notification from Sophie',exact:true}).click()
  await page.clock.runFor(120_000)
  await expect(page.getByRole('button',{name:/BLOCK NUMBER|UNBLOCK/})).toHaveCount(0)
  await page.getByRole('button',{name:"I don't think so. Is everything okay?",exact:true}).click()
  await page.getByRole('button',{name:'Send',exact:true}).click()
  await page.clock.runFor(120_000)
  await page.getByRole('button',{name:'Back to inbox'}).click()
  await page.getByRole('button',{name:'Back to home'}).click()
  await expect(apps.locator('button')).toHaveText(before)
  await page.getByRole('button',{name:'Exit game'}).click()
  await expect(page.getByRole('dialog',{name:'Exit game confirmation'})).toContainText('Are you sure you want to exit the game?')
  await page.getByRole('button',{name:'CANCEL',exact:true}).click()
})

test("Sophie's supplied dinner photo is an incoming image that opens full screen",async({page})=>{
  const at=Date.parse('2026-10-26T10:00:00+08:00')
  const base=beginScene01(newGame(),at)
  const scene=base.prologue!.scene01!
  const save={...base,prologue:{...base.prologue!,scene01:{...scene,nodeId:'OPEN-S02-FINAL-AFTER-07-7',queue:[{id:'OPEN-S02-FINAL-AFTER-07-7',dueAt:at+1000,typing:true}],invitation:'joined' as const,groupScript:'ch01_sc02_uninvited_guest' as const,groupMembers:{sophie:true,maya:true,lucas:true},groupPresence:{sophie:true,maya:true,lucas:true},introduced:true}}}
  await seedScene(page,save)
  await page.getByRole('button',{name:'Open Messages',exact:true}).first().click()
  await page.getByRole('button',{name:'Open FIND DANIEL group conversation'}).click()
  await page.clock.runFor(90_000)
  await expect(page.getByRole('button',{name:"Open Sophie's dinner photo"})).toBeVisible()
  await page.getByRole('button',{name:"Open Sophie's dinner photo"}).click()
  await expect(page.getByRole('dialog',{name:'Photo viewer'})).toBeVisible()
  await expect(page.getByRole('dialog',{name:'Photo viewer'}).locator('img')).toHaveAttribute('src','/sophie-dinner.png')
})
