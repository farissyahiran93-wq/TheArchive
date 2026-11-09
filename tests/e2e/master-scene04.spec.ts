import { expect, test } from '@playwright/test'
import { unknownSenderRevisedBeats } from '../../src/content/masterTraceFirst'
import { newGame, type GameSave } from '../../src/game/types'
import { beginScene01, beginScene02, deliverScene01, openScene03, scene01Invitation, sendScene01Choice } from '../../src/game/scene01'
import { seedScene } from './scene01-helper'
function settle(s:GameSave):GameSave{for(let i=0;i<100;i++){const q=s.prologue?.scene01?.queue[0];if(!q)return s;s=deliverScene01(s,q.dueAt)}throw Error('Queue did not settle')}
function before():GameSave{
 let s=settle(beginScene01({...newGame(),masterOpening:true,chapter1Edition:'ch01-v2-10'},1800000000000))
 for(let i=0;i<9;i++)s=settle(sendScene01Choice(s,'a','',true,1800000100000+i*1000))
 s=settle(beginScene02(scene01Invitation(s,'join'),1800000200000))
 for(let i=0;i<9;i++)s=settle(sendScene01Choice(s,'a','',true,1800000300000+i*1000))
 s=settle(openScene03(s,1800000400000))
 for(let i=0;i<10;i++)s=settle(sendScene01Choice(s,'a','',true,1800000500000+i*1000))
 return s
}
test.use({reducedMotion:'reduce',viewport:{width:390,height:844}})
test('fresh game reaches Unknown after the actual first three scenes without leaving Messages',async({page})=>{
 test.setTimeout(150000)
 await page.clock.install()
 await page.goto('/')
 await page.getByRole('button',{name:'NEW GAME',exact:true}).click()
 await page.getByRole('button',{name:'Unlock phone',exact:true}).click()
 await page.clock.runFor(30000)
 await page.getByRole('button',{name:'Open Messages',exact:true}).first().click()
 await page.getByRole('button',{name:'Open Sophie conversation',exact:true}).click()
 await page.clock.runFor(120000)
 for(let i=0;i<9;i++){await page.locator('.scene01-options .opening-choice').first().click();await page.getByRole('button',{name:'Send',exact:true}).click();await page.clock.runFor(120000)}
 await page.getByRole('button',{name:'JOIN GROUP',exact:true}).click()
 await page.getByRole('button',{name:'Back to inbox'}).click()
 await page.getByRole('button',{name:'Open FIND DANIEL group conversation'}).click()
 await page.clock.runFor(120000)
 for(let i=0;i<9;i++){await page.locator('.scene01-options .opening-choice').first().click();await page.getByRole('button',{name:'Send',exact:true}).click();await page.clock.runFor(120000)}
 await page.getByRole('button',{name:'Back to inbox'}).click()
 await page.getByRole('button',{name:'Open Sophie conversation',exact:true}).click()
 await page.clock.runFor(120000)
 for(let i=0;i<10;i++){await page.locator('.scene01-options .opening-choice').first().click();await page.getByRole('button',{name:'Send',exact:true}).click();await page.clock.runFor(120000)}
 await expect(page.locator('[aria-label="Unknown conversation"]')).toHaveCount(0)
 await page.getByRole('button',{name:'Back to inbox'}).click()
 await page.getByRole('button',{name:'Open Unknown conversation',exact:true}).click()
 await expect(page.getByRole('region',{name:'Unknown conversation'}).getByText("I know you're looking for Daniel.",{exact:true})).toHaveCount(1)
})
test('Unknown delivers one matching reply per Send, restores pending typing, and leaves Scene 5 manual',async({page})=>{
 await page.setViewportSize({width:320,height:720})
 await seedScene(page,before(),{pauseClock:true})
 const chat=page.getByRole('region',{name:'Unknown conversation'})
 const incoming=chat.locator('.conversation-line.incoming .opening-bubble')
 const outgoing=chat.locator('.conversation-line.outgoing .opening-bubble')
 const options=chat.locator('.scene01-options .opening-choice')
 const send=chat.getByRole('button',{name:'Send',exact:true})
 const typing=chat.getByRole('status',{name:'Unknown is typing',exact:true})
 const reOpen=async()=>{
  await page.getByRole('button',{name:'Open Messages',exact:true}).first().click()
  await page.getByRole('button',{name:'Open Unknown conversation',exact:true}).click()
 }
 const reload=async()=>{
  await expect.poll(()=>page.evaluate(()=>sessionStorage.getItem('the-archive-reboot:pending-save:v1'))).toBeNull()
  await page.reload()
  await page.getByRole('button',{name:'Unlock phone',exact:true}).click()
  await reOpen()
 }
 await expect(chat).toHaveCount(0)
 await reOpen()
 await expect(incoming).toHaveText(["I know you're looking for Daniel."])

 // Spot-check distinct authored responses rather than expecting the same table used by the renderer.
 const branchChecks=new Map([
  [0,{choice:'Who is this?',reply:"Someone who knew Daniel. Sophie asked me about a number she'd found and told me she had contacted you."}],
  [1,{choice:'What number did she show you?',reply:'The number in the contact entry she asked me about. It’s the one I used to reach you.'}],
  [4,{choice:'Why not go straight to the police?',reply:'Because it would expose my involvement. You can still speak to them if you think it would help.'}],
  [9,{choice:'Are you asking for access to my phone?',reply:'No. You choose what the interface opens, and it works on that source.'}],
 ])
 for(let i=0;i<unknownSenderRevisedBeats.length;i++){
  const spot=branchChecks.get(i)
  await expect(options).toHaveCount(3)
  await expect(send).toBeDisabled()
  await (spot?options.filter({hasText:spot.choice}):options.nth(i%3)).click()
  await expect(outgoing).toHaveCount(i)
  await expect(incoming).toHaveCount(i+1)
  await expect(typing).toHaveCount(0)
  await send.click()
  await expect(typing).toBeVisible()
  await expect(typing.locator('.typing-dots i')).toHaveCount(3)
  const avatar=typing.locator('.message-avatar')
  await expect(avatar).toBeVisible()
  expect((await avatar.boundingBox())?.width).toBeLessThan(40)
  await expect(typing.getByText(/unknown.*typing/i)).toHaveCount(0)
  await expect(options).toHaveCount(0)
  await expect(send).toHaveCount(0)
  await expect(outgoing).toHaveCount(i+1)
  await expect(incoming).toHaveCount(i+1)
  if(i===0){
   await page.clock.runFor(350)
   await expect(typing).toBeVisible()
   await expect(incoming).toHaveCount(1)
  }
  if(i===1){
   await reload()
   await expect(typing).toBeVisible()
   await expect(incoming).toHaveCount(i+1)
   await expect(outgoing).toHaveCount(i+1)
  }
  await page.clock.runFor(10_000)
  await expect(typing).toHaveCount(0)
  await expect(incoming).toHaveCount(i+2)
  await expect(outgoing).toHaveCount(i+1)
  if(spot){
   await expect(outgoing.last()).toHaveText(spot.choice)
   await expect(incoming.last()).toHaveText(spot.reply)
   await expect(options.filter({hasText:spot.choice})).toHaveCount(0)
  }
  await expect(chat.getByRole('button',{name:'START SCENE 5'})).toHaveCount(0)
 }
 await expect(page.getByRole('article',{name:'TRACE information'})).toBeVisible()
 await expect(page.getByText('DNL_PHONE_ARCHIVE.arc')).toHaveCount(0)
 await page.getByRole('button',{name:'INSPECT TRACE INFORMATION'}).click()
 await expect(page.getByRole('dialog',{name:'TRACE information'})).toContainText('unverified')
 await page.getByRole('button',{name:'DONE'}).click()
 await page.getByRole('button',{name:'DECLINE FOR NOW'}).click()
 await reload()
 await expect(incoming).toHaveCount(unknownSenderRevisedBeats.length+1)
 await expect(outgoing).toHaveCount(unknownSenderRevisedBeats.length)
 await expect(page.getByText('Declined for now',{exact:true})).toBeVisible()
 await page.getByRole('button',{name:'RECONSIDER OFFER'}).click()
 await page.getByRole('button',{name:'NOT NOW'}).click()
 await page.getByRole('button',{name:'RECONSIDER OFFER'}).click()
 await page.getByRole('button',{name:'PROCEED'}).click()
 await expect(page.getByRole('button',{name:'START SCENE 5'})).toBeVisible()
 await expect(page.getByText('DNL_PHONE_ARCHIVE.arc')).toHaveCount(0)
 await expect(page.getByText('TRACE.pkg',{exact:true})).toHaveCount(0)
 await expect(page.getByText('Eli Ward',{exact:true})).toHaveCount(0)
 await page.getByRole('button',{name:'Go home'}).click()
 await expect(page.getByText('Scene 5 — The Digital Archive unlocked · Recovery 0%')).toBeVisible()
 await expect(page.getByRole('button',{name:'Open TRACE'})).toHaveCount(0)
 await page.getByRole('button',{name:'Open Files',exact:true}).click()
 await expect(page.getByText('Welcome.txt',{exact:true})).toBeVisible()
 await expect(page.getByText('DNL_PHONE_ARCHIVE.arc',{exact:true})).toHaveCount(0)
})
