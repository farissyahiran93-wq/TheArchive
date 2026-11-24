import { expect, test, type Page } from '@playwright/test'
import { afterSeven } from './maya-conversation-helper'
import { seedScene } from './scene01-helper'
import { masterScene08Action as step8 } from '../../src/game/masterScene08'

function afterEight(){
 let s=step8(afterSeven(),{type:'start'})
 const drain=()=>{while(s.masterScene08?.pending?.length)s=step8(s,{type:'tick'},s.masterScene08.pending[0].dueAt)}
 drain()
 for(let i=0;i<5;i++){
  if(i===3){s=step8(s,{type:'open'});drain()}
  s=step8(s,{type:'draft',index:0});s=step8(s,{type:'send'});drain()
 }
 return s
}
async function reply(page:Page,text:string){
 await page.getByRole('button',{name:text,exact:true}).click()
 await page.getByRole('button',{name:'Send',exact:true}).click()
 await page.clock.runFor(20000)
}

test('Maya’s card, deliberate Unknown disclosure and public search preserve the warning cliffhanger',async({page})=>{
 await page.setViewportSize({width:390,height:844})
 await seedScene(page,afterEight())
 await page.getByRole('button',{name:'Open Messages',exact:true}).first().click()
 await page.getByRole('button',{name:'Open Maya Scene 8 conversation'}).click()
 await page.clock.runFor(10000)
 await reply(page,'What is it?')
 await reply(page,'A card?')
 await reply(page,'Can you show me the photograph?')
 await page.getByRole('button',{name:/Open Maya.s photo: Photograph of a Greyhaven/}).click()
 const photo=page.getByRole('dialog',{name:'Photo viewer'})
 await expect.poll(()=>photo.getByRole('img').evaluate((e:HTMLImageElement)=>e.complete&&e.naturalWidth>0)).toBe(true)
 await photo.getByRole('button',{name:'Zoom in'}).click()
 await photo.getByRole('button',{name:'Close photo'}).click()
 await reply(page,'GH-DSC-03-A. That looks like a reference code.')
 await reply(page,'We could try looking up the reference.')
 await page.getByRole('button',{name:'Discuss a clue with Unknown Sender'}).click()
 const unknown=page.getByRole('region',{name:'Unknown conversation'})
 await unknown.getByRole('button',{name:'Unknown Sender',exact:true}).click()
 const clue='Maya found a photograph with this reference: GH-DSC-03-A.'
 await unknown.getByRole('button',{name:clue,exact:true}).click()
 await expect(unknown.locator('.opening-bubble.player').getByText(clue,{exact:true})).toHaveCount(0)
 await unknown.getByRole('button',{name:'Send',exact:true}).click()
 await page.clock.runFor(10000)
 await expect(unknown.getByText('Where did she find it?',{exact:true})).toHaveCount(1)
 await reply(page,'In a shared folder.')
 await reply(page,"We don't know where it is.")
 await expect(unknown.getByText('Then the reference is all we have.',{exact:true})).toHaveCount(1)
 await expect(unknown.getByRole('button',{name:/Open Maya.s photo|Open Maya’s message screenshot/})).toHaveCount(0)
 await page.waitForFunction(()=>!sessionStorage.getItem('the-archive-reboot:pending-save:v1'))
 await page.reload()
 await page.getByRole('button',{name:'Unlock phone'}).click()
 await page.getByRole('button',{name:'Open Messages',exact:true}).first().click()
 await page.getByRole('button',{name:'Open Unknown conversation'}).click()
 await expect(unknown.getByText('Then the reference is all we have.',{exact:true})).toHaveCount(1)
 await page.getByRole('button',{name:'Go home'}).click()
 await page.getByRole('button',{name:/OPEN GREYHAVEN PUBLIC INVENTORY/}).click()
 await page.getByLabel('Inventory reference').fill('GH-DSC-03-A')
 await page.getByRole('button',{name:'SEARCH',exact:true}).click()
 await expect(page.getByRole('heading',{name:'GH-DSC-03-A'})).toBeVisible()
 await page.getByRole('button',{name:'RETURN HOME'}).click()
 await expect(page.getByLabel('Incoming call from Sophie')).toBeVisible();await page.getByRole('button',{name:'Decline'}).click();await page.getByRole('button',{name:'CALL SOPHIE BACK'}).click()
 await page.getByRole('button',{name:'PLAY SOPHIE’S CALL'}).click()
 for(let i=0;i<10;i++){const a=page.locator('audio');await expect(a).toHaveAttribute('src',new RegExp(`SOP10_${i<6?'VC':'VD'}_0${i<6?i+1:i-5}.mp3`));await expect(page.locator('.phone-call-controls .opening-choice')).toHaveCount(0);await a.evaluate(e=>e.dispatchEvent(new Event('ended')));const buttons=page.locator('.phone-call-controls .opening-choice');await expect(buttons).toHaveCount(3);if(i===5){await buttons.nth(2).click();await page.getByRole('button',{name:'Send',exact:true}).click();await expect(page.getByText(/Video remains off/)).toBeVisible()}await buttons.nth(i===5?0:i%3).click();await page.getByRole('button',{name:'Send',exact:true}).click();if(i===5)await page.clock.runFor(1100);if(i===2){await page.waitForFunction(()=>!sessionStorage.getItem('the-archive-reboot:pending-save:v1'));await page.reload();await page.getByRole('button',{name:'Unlock phone'}).click();await page.getByRole('button',{name:'RESUME VOICE CLIP'}).click()}}
 await expect(page.getByLabel('Text representation of the separate warning card')).toContainText('DO NOT CONTACT THE STARRED NUMBER.');await expect(page.locator('audio')).toHaveAttribute('src',/SOP10_VD_05.mp3/);await page.locator('audio').evaluate(e=>e.dispatchEvent(new Event('ended')));await expect(page.locator('audio')).toHaveAttribute('src',/SOP10_VD_06.mp3/);await expect(page.getByRole('button',{name:'Send',exact:true})).toHaveCount(0);await page.locator('audio').evaluate(e=>e.dispatchEvent(new Event('ended')));await expect(page.getByText(/But… I already did/).first()).toBeVisible();await page.clock.runFor(3100);await expect(page.locator('.scene10-fade')).toBeVisible();await page.clock.runFor(1500);await expect(page.getByText('Chapter 2 — The Other Copy unlocked')).toBeVisible()
})
