import { test,expect } from '@playwright/test'
import { NaturalFixture } from '../helpers/naturalConversation'
import { versionHistoryDialogue } from '../../src/content/versionHistoryConversationData'
import { seedScene,sceneReply } from './scene01-helper'

test.use({reducedMotion:'reduce'})
test('saved earlier question resumes after a real opt-in without replacing its text or sending a duplicate',async({page})=>{
  const f=new NaturalFixture().main(),question=versionHistoryDialogue[7].branches[1].text
  f.save.chapter1!.versionHistory!.inquiry={status:'draft',choice:'b',text:question}
  f.authorize().register().send('a').send('c')
  await seedScene(page,f.save)
  const unknown=async()=>{await page.getByRole('button',{name:'Open Messages',exact:true}).click();await page.getByRole('button',{name:/Open Chapter 1 Unknown Sender conversation/}).click();await page.clock.runFor(120000)}
  await unknown()
  await expect(page.getByRole('button',{name:'OPEN OPTIONAL REQUEST',exact:true})).toBeDisabled()
  await page.getByRole('button',{name:'REVIEW PUBLISHER CONTACT OPTION',exact:true}).click()
  await sceneReply(page,"I'll send a specific question through the public desk.")
  await page.getByRole('button',{name:'OPEN OPTIONAL REQUEST',exact:true}).first().click()
  await expect(page.getByRole('heading',{name:'Saved corrections inquiry',exact:true})).toBeVisible()
  await expect(page.getByRole('button',{name:question,exact:true})).toHaveAttribute('aria-pressed','true')
  await page.getByRole('button',{name:'REVIEW REQUEST',exact:true}).click()
  await expect(page.locator('.vh-draft')).toHaveText(question)
  await page.waitForFunction(()=>!sessionStorage.getItem('the-archive-reboot:pending-save:v1'))
  await page.reload();await page.getByRole('button',{name:'Unlock phone',exact:true}).click()
  await unknown();await page.getByRole('button',{name:'OPEN OPTIONAL REQUEST',exact:true}).first().click()
  await expect(page.locator('.vh-draft')).toHaveText(question)
  await page.getByRole('button',{name:'SEND REQUEST',exact:true}).click()
  await expect(page.getByRole('heading',{name:'REQUEST SUBMITTED',exact:true})).toBeVisible()
  await page.clock.runFor(120000)
  const result=await page.evaluate(async()=>{const path='/src/game/store.ts';const m=await import(path);const s=m.useGameStore.getState().save;return {receipts:s.deliveredEvents.filter((id:string)=>id==='R-GB-VH-001'),reply:s.chapter1?.correctionsDesk?.reply}})
  expect(result.receipts).toHaveLength(1)
  expect(result.reply).toBeUndefined()
})
