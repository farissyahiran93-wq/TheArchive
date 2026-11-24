import { expect, test, type Page } from '@playwright/test'
import { lucasConversation } from '../../src/content/lucasPhoto'
import { beginScene01, beginScene02, scene01Invitation, sendScene01Choice } from '../../src/game/scene01'
import { newGame } from '../../src/game/types'
import { seedScene, settleScene } from './scene01-helper'

function afterDeparture() {
  let save = settleScene(beginScene01({...newGame(),masterOpening:true,chapter1Edition:'ch01-v2-10'},1000))
  for(let i=0;i<9;i++) save=settleScene(sendScene01Choice(save,'a','',true,100000*(i+1)))
  // This fixture exercises a save from the previous group screenplay.
  save={...save,prologue:{...save.prologue!,scene01:{...save.prologue!.scene01!,masterScene02Revision:3}}}
  save=settleScene(beginScene02(scene01Invitation(save,'join',1000000),1001000))
  for(let i=0;i<8;i++) save=settleScene(sendScene01Choice(save,'a','',true,1100000+100000*i))
  expect(save.prologue?.scene01?.lucasLeftGroup).toBe(true)
  return save
}

async function openLucas(page:Page) {
  await page.getByRole('button',{name:'Open Messages',exact:true}).first().click()
  await page.getByRole('button',{name:'Open Lucas private photo conversation'}).click()
}

test.use({viewport:{width:390,height:844},reducedMotion:'reduce'})
test('Lucas shares the photo after four Sends and remembers it on the private board',async({page})=>{
  await seedScene(page,afterDeparture())
  await openLucas(page)
  await page.getByRole('button',{name:'OPEN LUCAS CONVERSATION'}).click()
  const chat=page.getByLabel('Lucas private conversation')
  await expect(chat.getByRole('status',{name:'Lucas is typing'})).toBeVisible()
  const photo=chat.getByRole('button',{name:/Open Lucas's photo/})
  for(const [beat,turn] of lucasConversation.entries()){
    await page.clock.runFor(40000)
    await expect(photo).toHaveCount(beat<4?0:1)
    const choice=chat.getByRole('button',{name:turn.choices[0],exact:true})
    await choice.click()
    if(beat===3){
      await page.waitForFunction(()=>!sessionStorage.getItem('the-archive-reboot:pending-save:v1'))
      await page.reload()
      await page.getByRole('button',{name:'Unlock phone'}).click()
      await openLucas(page)
      await expect(choice).toHaveAttribute('aria-pressed','true')
    }
    if(beat===4){
      await photo.click()
      const viewer=page.getByRole('dialog',{name:'Photo viewer'})
      await viewer.getByRole('button',{name:'Zoom in'}).click()
      await expect(viewer.locator('img')).toHaveCSS('transform',/matrix\(1.5/)
      await viewer.getByRole('button',{name:'Close photo'}).click()
    }
    await chat.getByRole('button',{name:'Send',exact:true}).click()
  }
  await page.clock.runFor(40000)
  await expect(chat.getByText('I just wanted you to see who my friend was.',{exact:true})).toBeVisible()
  await expect(photo).toHaveCount(1)
  await page.getByRole('button',{name:'Go home'}).click()
  await page.getByRole('button',{name:'Open Investigation Board'}).click()
  const index=page.getByRole('combobox',{name:'Evidence index'})
  await index.selectOption({label:'Lucas and Daniel'})
  await expect(page.getByRole('button',{name:'Enlarge source image'})).toBeVisible()
  await index.selectOption({label:'Lucas’s account'})
  await expect(page.getByText('Since we were kids.',{exact:true})).toBeVisible()
})
