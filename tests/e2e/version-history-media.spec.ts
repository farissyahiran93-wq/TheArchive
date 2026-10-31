import { test,expect } from '@playwright/test'
import { ActIFinalFixture } from '../helpers/actIFinal'
import { Scene04Fixture } from '../helpers/scene04Final'
import { beginScene01 } from '../../src/game/scene01'
import { newGame } from '../../src/game/types'
import { seedScene,openSophie,sceneReply } from './scene01-helper'
test.use({reducedMotion:'reduce'})

test('Sophie supplied photograph, legacy photo path and Back restore the actual chat',async({page})=>{
  await page.setViewportSize({width:375,height:812})
  const opening=new ActIFinalFixture(beginScene01(newGame(),1800000000000)).until('complete')
  const f=new Scene04Fixture(opening.save).at('OPEN-S04-C03').send('e')
  await seedScene(page,f.save);await openSophie(page)
  await expect(page.getByRole('button',{name:"Open Sophie's handwritten reminder",exact:true})).toHaveCount(0)
  await sceneReply(page,"Wanting it to be clearer doesn't make it clearer.")
  await expect(page.getByRole('button',{name:"Open Sophie's handwritten reminder",exact:true})).toBeVisible()
  await page.getByRole('button',{name:'View Sophie Mercer profile',exact:true}).click()
  await expect(page.getByRole('heading',{name:'Links',exact:true})).toBeVisible()
  await expect(page.getByRole('heading',{name:'Photos',exact:true})).toBeVisible()
  await page.getByRole('button',{name:'Handwritten reminder · Personal photo',exact:true}).click()
  await expect(page.getByRole('dialog',{name:'Photo viewer',exact:true})).toBeVisible()
  await expect(page.locator('.photo-unavailable')).toHaveCount(0)
  await expect(page.locator('.chat-photo-canvas img')).toHaveAttribute('src','/sophie-sticky-note.png')
  expect(await page.locator('.chat-photo-canvas img').evaluate(img=>(img as HTMLImageElement).naturalWidth)).toBeGreaterThan(1000)
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog',{name:'Photo viewer',exact:true})).toHaveCount(0)
  await expect(page.getByRole('dialog',{name:'Sophie Mercer profile',exact:true})).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog',{name:'Sophie Mercer profile',exact:true})).toHaveCount(0)
  await expect(page.locator('.scene01-chat')).toBeVisible()
  const thread=page.locator('.opening-thread')
  await thread.evaluate(el=>{el.scrollTop=35;el.dispatchEvent(new Event('scroll',{bubbles:true}))})
  await page.getByRole('button',{name:'READ ARTICLE',exact:true}).click()
  await expect(page.getByRole('region',{name:'Greyhaven Bulletin public article'})).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.locator('.scene01-chat')).toBeVisible()
  await expect(page.getByRole('region',{name:'Messages inbox'})).toHaveCount(0)
  await page.screenshot({path:test.info().outputPath('sophie-attachments-375.png')})
})
