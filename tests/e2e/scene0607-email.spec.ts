import { test, expect } from '@playwright/test'
import { sourceAction, sourcePut } from '../../src/game/sourceInvestigation'
import { ConversationFixture } from '../helpers/versionHistoryConversation'
import { Scene05Fixture } from '../helpers/scene05Final'
import { chapter1Action } from '../../src/game/chapter1'
import { correctionsDeskAction, deskPut } from '../../src/game/scene06'
import { seedScene } from './scene01-helper'

test.use({reducedMotion:'reduce'})
function emailFixture(delivered:boolean) {
  const f=new Scene05Fixture().core()
  if(delivered) f.do({type:'panel',panel:'form'}).do({type:'local',id:'S05-C04',choice:'a'}).do({type:'review'}).do({type:'send-request'})
  f.do({type:'back'}).do({type:'local',id:'S05-C11',choice:'a'})
  f.save=correctionsDeskAction(f.save,{type:'enter'},f.now+=100)
  f.save=chapter1Action(f.save,{type:'tick'},f.now+=2000)
  return f.save
}
for(const delivered of [false,true]) test(`fictional Email requires a delivered publisher request: ${delivered}`,async({page})=>{
  await seedScene(page,emailFixture(delivered),{pauseClock:true})
  await page.getByRole('button',{name:'Open Email',exact:true}).click()
  const email=page.getByRole('button',{name:/Greyhaven Bulletin — Corrections Desk/})
  if(!delivered){await expect(email).toHaveCount(0);await expect(page.getByText('No email yet')).toBeVisible();return}
  await expect(email).toContainText('Unread')
  await email.click()
  await expect(page.getByRole('article',{name:'Greyhaven Bulletin email'})).toContainText('does not, by itself, confirm')
  await page.getByRole('button',{name:'BACK TO INBOX'}).click()
  await expect(email).toContainText('Read')
  await expect.poll(()=>page.evaluate(()=>sessionStorage.getItem('the-archive-reboot:pending-save:v1'))).toBeNull()
  await page.reload();await page.getByRole('button',{name:'Unlock phone',exact:true}).click()
  await page.getByRole('button',{name:'Open Email',exact:true}).click()
  await expect(email).toContainText('Read')
})


test('email opens the public register in Browser and Desk in Messages without sending',async({page})=>{
  const f=new Scene05Fixture().core().do({type:'panel',panel:'form'}).do({type:'local',id:'S05-C04',choice:'a'}).do({type:'review'}).do({type:'send-request'}).do({type:'back'}).do({type:'local',id:'S05-C11',choice:'a'})
  f.save=correctionsDeskAction(f.save,{type:'activate'},f.now);f.save=chapter1Action(f.save,{type:'tick'},f.now+2000)
  await seedScene(page,f.save,{pauseClock:true})
  await page.getByRole('button',{name:'Open Email',exact:true}).click()
  await page.getByRole('button',{name:/Greyhaven Bulletin — Corrections Desk/}).click()
  await page.getByRole('button',{name:'VIEW PUBLIC CORRECTIONS REGISTER'}).click()
  await expect(page.getByRole('heading',{name:'PUBLIC CORRECTIONS REGISTER'})).toBeVisible()
  await page.getByRole('button',{name:'ASK THE DESK'}).click()
  await expect(page.getByText('Your earlier request was delivered. Choose a follow-up to send.')).toBeVisible()
  await expect(page.getByText("Was a public correction posted for Daniel Mercer's article?")).toBeVisible()
  await expect(page.locator('.opening-bubble.player')).toHaveCount(0)
  await page.getByText("Was a public correction posted for Daniel Mercer's article?").click()
  await expect(page.locator('.opening-bubble.player')).toHaveCount(0)
})

test('the register alone saves a private finding and activates the byline',async({page})=>{
  const f=new Scene05Fixture().core().do({type:'local',id:'S05-C11',choice:'a'})
  f.save=correctionsDeskAction(f.save,{type:'activate'},f.now)
  await seedScene(page,f.save,{pauseClock:true})
  await page.getByRole('button',{name:'Open TRACE',exact:true}).click()
  await page.getByRole('button',{name:'OPEN PUBLIC CORRECTIONS REGISTER'}).click()
  await page.getByRole('button',{name:'SAVE FINDING',exact:true}).click()
  await expect(page.getByRole('button',{name:'FINDING SAVED PRIVATELY'})).toBeVisible()
  await page.getByRole('button',{name:'OPEN THE BYLINE'}).click()
  await expect(page.getByRole('heading',{name:'THE BYLINE',exact:true})).toBeVisible()
})


test('article author profile opens the fictional professional composer in Messages',async({page})=>{
  const f=new ConversationFixture().core().authorizeDesk().finishRegister().send('b')
  f.save=sourceAction(f.save,7,{type:'enter'},f.now)
  f.save=sourcePut(deskPut(f.save,{visible:false}),7,{visible:false})
  await seedScene(page,f.save,{pauseClock:true})
  await page.getByRole('button',{name:'Open TRACE',exact:true}).click()
  await page.getByRole('button',{name:'VIEW ARTICLE',exact:true}).click()
  await page.getByRole('button',{name:'VIEW AUTHOR PROFILE'}).click()
  await expect(page.getByRole('heading',{name:'NORA VANCE',exact:true})).toBeVisible()
  await page.getByRole('button',{name:'CONTACT VIA PROFESSIONAL CHANNEL'}).click()
  await expect(page.getByRole('heading',{name:'PROFESSIONAL QUESTION FORM'})).toBeVisible()
  await expect(page.getByText("Hello, Nora. I'm checking your Greyhaven article about Daniel Mercer. Could I ask about the information behind it?")).toBeVisible()
  await expect(page.getByRole('button',{name:'SEND REQUEST'})).toHaveCount(0)
})
