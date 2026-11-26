import { expect,test,type Page } from '@playwright/test'
import { openSophie,sceneReply } from './scene01-helper'
import { readFileSync } from 'node:fs'

const cues: {start:number;end:number;text:string}[][]=JSON.parse(readFileSync('src/content/scene07SubtitleCues.json','utf8'))

import type { GameSave } from '../../src/game/types'

async function persistedScene07(page:Page){
 await page.waitForFunction(()=>!sessionStorage.getItem('the-archive-reboot:pending-save:v1'))
 return page.evaluate(async()=>{
  const db=await new Promise<IDBDatabase>((resolve,reject)=>{const r=indexedDB.open('the-archive-reboot',1);r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)})
  const save=await new Promise<GameSave>((resolve,reject)=>{const r=db.transaction('saves').objectStore('saves').get('primary');r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)})
  db.close();return save.masterScene07
 })
}

async function resumeAfterReload(page:Page) {
 await page.reload({waitUntil:'domcontentloaded',timeout:60000})
 await page.getByRole('button',{name:/CONTINUE GAME/}).click()
 const unlock=page.getByRole('button',{name:'Unlock phone',exact:true})
 if(await unlock.isVisible())await unlock.click()
}

test.use({viewport:{width:390,height:844},reducedMotion:'reduce'})

test('Chapter 1 from a fresh game to the warning in one mobile save',async({page})=>{

 test.setTimeout(600000)
 page.setDefaultTimeout(15000)
 await page.clock.install()
 await page.goto('/',{waitUntil:'domcontentloaded',timeout:60000})
 await page.getByRole('button',{name:'NEW GAME',exact:true}).click()
 await page.getByRole('button',{name:'Unlock phone',exact:true}).click()
 await page.clock.runFor(30000)
 await page.getByRole('button',{name:'Open Messages',exact:true}).first().click()
 await page.getByRole('button',{name:'Open Sophie conversation',exact:true}).click()
 await page.clock.runFor(210000)
 for(let i=0;i<9;i++){await page.locator('.scene01-options .opening-choice').first().click();await page.getByRole('button',{name:'Send',exact:true}).click();await page.clock.runFor(210000)}
 const invitation=page.getByRole('article',{name:'Same Old Chaos invitation'})
 const members=invitation.getByRole('list',{name:'Seven original members'})
 const canonicalInvitation=await members.isVisible()
 if(canonicalInvitation){
  await expect(members.getByRole('listitem')).toHaveCount(7)
  await expect(members.locator('img')).toHaveCount(7)
  await expect(invitation.getByRole('button')).toHaveCount(1)
 }else {
  await invitation.getByRole('button',{name:'VIEW MEMBERS',exact:true}).click()
  await expect(invitation.getByText('Sophie · Daniel · Maya · Lucas · Noah · Ana · Eli',{exact:true})).toBeVisible()
 }
 await invitation.getByRole('button',{name:'JOIN GROUP',exact:true}).click()
 if(!canonicalInvitation){
  await page.getByRole('button',{name:'Back to inbox'}).click()
  await page.getByRole('button',{name:'Open Same Old Chaos group conversation'}).click()
 }
 await page.clock.runFor(210000)
 await expect(page.getByLabel('Group participants')).toContainText('8 members')
 // Pick the middle answer on decision two to exercise a mixed route.
 for(let i=0;i<10;i++){
  await page.locator('.scene01-options .opening-choice').nth(i===1?1:0).click()
  await page.getByRole('button',{name:'Send',exact:true}).click()
  await page.clock.runFor(210000)
 }
 await expect(page.locator('.scene01-chat')).toHaveAttribute('data-group-complete','true')
 await expect(page.getByLabel('Group participants')).toContainText('7 members')
 await expect(page.getByText('Lucas left the group.',{exact:true})).toHaveCount(1)
 await page.getByRole('button',{name:'Back to inbox'}).click()
 await page.getByRole('button',{name:'Open Sophie conversation',exact:true}).click()
 await page.clock.runFor(210000)
 for(let i=0;i<10;i++){await page.locator('.scene01-options .opening-choice').first().click();await page.getByRole('button',{name:'Send',exact:true}).click();await page.clock.runFor(210000)}
 await expect(page.locator('[aria-label="Unknown conversation"]')).toHaveCount(0)
 await page.getByRole('button',{name:'Back to inbox'}).click()
 await page.getByRole('button',{name:'Open Unknown conversation',exact:true}).click()
 await expect(page.getByRole('region',{name:'Unknown conversation'}).getByText("You're looking for Daniel Mercer.",{exact:true})).toHaveCount(1)
 const unknown=page.getByRole('region',{name:'Unknown conversation'})
 await page.clock.runFor(4000)
 await expect(unknown.getByText('I think I found something you should see.',{exact:true})).toHaveCount(1)
 for(let beat=0;beat<10;beat++){
  if(beat===9){await unknown.getByRole('button',{name:'VIEW TRACE'}).click();await page.getByRole('button',{name:'DONE'}).click()}
  await unknown.locator('.scene01-options .opening-choice').nth(beat===9?1:beat%3).click()
  await unknown.getByRole('button',{name:'Send',exact:true}).click()
  await page.clock.runFor(45000)
 }
 await expect(unknown.getByRole('button',{name:'INSTALL TRACE'})).toHaveCount(0)
 await unknown.getByRole('button',{name:/I've thought about it/}).click()
 await page.clock.runFor(45000)
 await unknown.getByRole('button',{name:'INSTALL TRACE'}).click()
 await page.clock.runFor(7000)
 await page.getByRole('button',{name:'CONTINUE',exact:true}).click()
 await unknown.getByRole('button',{name:"It's installed.",exact:true}).click()
 await unknown.getByRole('button',{name:'Send',exact:true}).click()
 await page.clock.runFor(45000)
 await expect(unknown.getByText("I'm going to send you something now.",{exact:true})).toHaveCount(1)
 const sendFirst=async()=>{
   await page.locator('.scene01-options .opening-choice').first().click()
   await page.getByRole('button',{name:'Send',exact:true}).click()
   await page.clock.runFor(50000)
 }
 for(let i=0;i<3;i++)await sendFirst()
 await expect(page.getByText('DNL_PHONE_ARCHIVE.arc',{exact:true})).toBeVisible()
 await page.getByRole('button',{name:'ACCEPT TRANSFER'}).click()
 await page.clock.runFor(30000)
 for(let i=0;i<2;i++)await sendFirst()
 await page.getByRole('button',{name:'OPEN TRACE',exact:true}).click()
 await page.getByRole('button',{name:'START RECOVERY'}).click()
 await page.clock.runFor(12000)
 await expect(page.getByText('20% RECOVERED · 80% UNAVAILABLE')).toBeVisible()
 await page.getByRole('button',{name:'OPEN RECOVERED DATA'}).click()
 await page.getByRole('button',{name:'Go home'}).click()
 await page.getByRole('button',{name:'Open Messages',exact:true}).first().click()
 await page.getByRole('button',{name:'Open Unknown conversation'}).click()
 await page.clock.runFor(40000)
 for(let i=0;i<4;i++)await sendFirst()
 await page.clock.runFor(40000)
 for(const topic of ['june','maya','lucas','sophie']){
  await page.getByLabel('Choose a discussion').selectOption(topic)
  for(let i=0;i<2;i++){await expect(page.locator('.scene01-options .opening-choice')).toHaveCount(3);await page.locator('.scene01-options .opening-choice').first().click({force:true});await page.getByRole('button',{name:'Send',exact:true}).click({force:true});await page.clock.runFor(120000)}
 }
 await expect(page.getByText('Open Activity Logs.',{exact:true})).toHaveCount(0)
 await page.getByRole('button',{name:'Go home'}).click();await page.getByRole('button',{name:'Open TRACE'}).click();await expect(page.getByText('Recovery: 20%')).toBeVisible()
 await page.getByRole('button',{name:'Open Activity Logs module'}).click();await expect(page.getByText('Activity unavailable · 19:00–20:00')).toBeVisible();await page.getByRole('button',{name:'DISCUSS WITH UNKNOWN'}).click()
 await expect(page.getByText('A gap?',{exact:true})).toHaveCount(0);await page.locator('.scene01-options .opening-choice').first().click({force:true});await page.getByRole('button',{name:'Send',exact:true}).click({force:true});await page.clock.runFor(120000);await expect(page.getByText('A gap?',{exact:true})).toBeVisible()
 await page.locator('.scene01-options .opening-choice').first().click({force:true});await page.getByRole('button',{name:'Send',exact:true}).click({force:true});await page.clock.runFor(120000)
 await page.getByRole('button',{name:'Back to inbox'}).click()
 await page.getByRole('button',{name:'Open Sophie conversation'}).click()
 await expect(page.getByRole('button',{name:'Answer'})).toHaveCount(0)
 await page.clock.runFor(25000)
 await expect(page.getByText("There's something I think you should hear from me.",{exact:true})).toBeVisible()
 await expect(page.getByText('Later · Sophie is online')).toHaveCount(0)
 await sceneReply(page,"Of course. What's wrong?")
 await page.getByRole('button',{name:'Answer'}).click()
 for(let i=0;i<10;i++){
  const audio=page.locator('audio');await expect(audio).toHaveAttribute('src',new RegExp(`call-${String(i+1).padStart(2,'0')}.wav`));await expect.poll(()=>audio.evaluate((node:HTMLAudioElement)=>Number.isFinite(node.duration)&&node.duration>0)).toBe(true);await expect(page.getByRole('button',{name:'Send',exact:true})).toHaveCount(0)
  if(i===0){
   await expect.poll(()=>audio.evaluate((node:HTMLAudioElement)=>!node.paused)).toBe(true)
   await expect(audio).not.toHaveAttribute('controls','')
   const cue=cues[0][1]
   await audio.evaluate((node:HTMLAudioElement,t)=>{node.currentTime=t;node.dispatchEvent(new Event('timeupdate'))},(cue.start+cue.end)/2)
   await expect(page.locator('.cinematic-subtitle')).toHaveText(cue.text)
   // A reload during this clip restores its playback position and matching cue.
   const resumeCue=cues[0].find(c=>c.start>5&&c.end-c.start>.5)!
   const resumeTime=(resumeCue.start+resumeCue.end)/2
   await audio.evaluate((node:HTMLAudioElement,t)=>{node.currentTime=t;node.dispatchEvent(new Event('timeupdate'))},resumeTime)
   await page.waitForFunction(()=>!sessionStorage.getItem('the-archive-reboot:pending-save:v1'))
   await resumeAfterReload(page);await page.getByRole('button',{name:'Open Messages',exact:true}).first().click();await page.getByRole('button',{name:'Open Sophie conversation'}).click()
   const resumed=page.locator('audio')
   await expect.poll(()=>resumed.evaluate((node:HTMLAudioElement)=>node.currentTime)).toBeGreaterThan(resumeCue.start-.2)
   const reconnect=page.getByRole('button',{name:'RESUME CALL'})
   if(await reconnect.isVisible())await reconnect.click()
   await expect(page.locator('.cinematic-subtitle')).toHaveText(resumeCue.text)
  }
  await audio.evaluate(e=>e.dispatchEvent(new Event('ended')));await expect(page.locator('.cinematic-subtitle')).toHaveCount(0);await expect(page.locator('.phone-call-controls .opening-choice')).toHaveCount(3)
  await page.locator('.phone-call-controls .opening-choice').nth(i%3).click()
  if(i===2){await page.waitForFunction(()=>!sessionStorage.getItem('the-archive-reboot:pending-save:v1'));await resumeAfterReload(page);await page.getByRole('button',{name:'Open Messages',exact:true}).first().click();await page.getByRole('button',{name:'Open Sophie conversation'}).click();await expect(page.locator('audio')).toHaveCount(1);await expect(page.locator('audio')).not.toHaveAttribute('controls', '');await expect(page.locator('.phone-call-controls .opening-choice').nth(i%3)).toHaveAttribute('aria-pressed','true')}
  await page.getByRole('button',{name:'Send',exact:true}).click()
 }
 await page.locator('audio').evaluate(e=>e.dispatchEvent(new Event('ended')))
 await expect(page.getByText('Voice call with Sophie',{exact:true})).toHaveCount(1)
 await expect(page.getByText('Call ended',{exact:true})).toHaveCount(1)
 await page.clock.runFor(45000)
 await expect(page.getByText("I'm sending you the copy.",{exact:true})).toBeVisible()
 await page.getByRole('button',{name:'OPEN ATTACHMENT'}).click()
 const document=page.getByRole('dialog',{name:'Daniel contacts export document'})
 await expect(document.getByText('No saved name',{exact:true})).toBeVisible()
 await expect(document.getByText('••• ••• ••41',{exact:true})).toBeVisible()
 await document.getByRole('button',{name:'Close document'}).click()
 await page.clock.runFor(10000)
 await sceneReply(page,"Do you know who had access to Daniel's shared folder?")
 await expect(page.getByText("I'm not going to send the whole export there.",{exact:true})).toBeVisible()
 await expect(page.getByText('Optional group sharing')).toHaveCount(0)
 await page.getByRole('button',{name:"It's okay to take your time with this."}).click()
 await page.waitForFunction(()=>!sessionStorage.getItem('the-archive-reboot:pending-save:v1'))
 await resumeAfterReload(page);await openSophie(page)
 await expect(page.getByRole('button',{name:"It's okay to take your time with this."})).toHaveAttribute('aria-pressed','true')
 await page.getByRole('button',{name:'Send',exact:true}).click();await page.clock.runFor(60000)
 await expect(page.getByText('Maybe talk to her when you get a chance?',{exact:true})).toBeVisible()
 await expect(page.getByRole('button',{name:'OPEN ATTACHMENT'})).toHaveCount(1)
 await expect(page.getByText('Voice call with Sophie',{exact:true})).toHaveCount(1)
 await expect(page.getByText('Sophie is offline.',{exact:true})).toHaveCount(0)
 expect(await persistedScene07(page)).toMatchObject({phase:'complete',saved:false,shareSent:false})
 await page.getByRole('button',{name:'Go home'}).click();await page.getByRole('button',{name:'Open TRACE'}).click()
 await expect(page.getByText('Recovery: 20%')).toBeVisible()
 await expect(page.getByText('Daniel_Contacts_Export',{exact:true})).toHaveCount(0)
 for(let i=1;i<=11;i++){const res=await page.request.get(`/media/audio/scene07-ver1/call-${String(i).padStart(2,'0')}.wav`);expect(res.status()).toBe(200)}
 await page.getByRole('button',{name:'Go home'}).click()
 await page.getByRole('button',{name:'Open Messages',exact:true}).first().click()
 await page.getByRole('button',{name:'Open Maya Scene 8 conversation'}).click()
 await page.clock.runFor(20000)
 for(const line of ['Not at all. How are you doing?','Different how?','Would you be comfortable showing me?'])await sceneReply(page,line)
 await page.getByRole('button',{name:'Open Maya’s message screenshot'}).click()
 await expect(page.getByRole('dialog').getByText(/another copy/).first()).toBeVisible()
 await page.getByRole('button',{name:'Close photo'}).click()
 await page.clock.runFor(20000)
 await sceneReply(page,"We don't know what he meant by another copy.")
 await sceneReply(page,'Thank you for showing me.')
 await sceneReply(page,'What is it?')
 await sceneReply(page,'A card?')
 await sceneReply(page,'Can you show me the photograph?')
 await page.getByRole('button',{name:/Open Maya.s photo: Photograph of a Greyhaven/}).click()
 const photo=page.getByRole('dialog',{name:'Photo viewer'})
 await expect.poll(()=>photo.getByRole('img').evaluate((e:HTMLImageElement)=>e.complete&&e.naturalWidth>0)).toBe(true)
 await photo.getByRole('button',{name:'Zoom in'}).click()
 await photo.getByRole('button',{name:'Close photo'}).click()
 await sceneReply(page,'GH-DSC-03-A. That looks like a reference code.')
 await sceneReply(page,'We could try looking up the reference.')
 await page.getByRole('button',{name:'Discuss a clue with Unknown Sender'}).click()
 const disclosureChat=page.getByRole('region',{name:'Unknown conversation'})
 await disclosureChat.getByRole('button',{name:'Unknown Sender',exact:true}).click()
 const clue='Maya found a photograph with this reference: GH-DSC-03-A.'
 await disclosureChat.getByRole('button',{name:clue,exact:true}).click()
 await expect(disclosureChat.locator('.opening-bubble.player').getByText(clue,{exact:true})).toHaveCount(0)
 await disclosureChat.getByRole('button',{name:'Send',exact:true}).click()
 await page.clock.runFor(10000)
 await expect(disclosureChat.getByText('Where did she find it?',{exact:true})).toHaveCount(1)
 await sceneReply(page,'In a shared folder.')
 await sceneReply(page,"We don't know where it is.")
 await expect(disclosureChat.getByText('Then the reference is all we have.',{exact:true})).toHaveCount(1)
 await expect(disclosureChat.getByRole('button',{name:/Open Maya.s photo|Open Maya’s message screenshot/})).toHaveCount(0)
 await page.waitForFunction(()=>!sessionStorage.getItem('the-archive-reboot:pending-save:v1'))
 await resumeAfterReload(page)
 await page.getByRole('button',{name:'Open Messages',exact:true}).first().click()
 await page.getByRole('button',{name:'Open Unknown conversation'}).click()
 await expect(disclosureChat.getByText('Then the reference is all we have.',{exact:true})).toHaveCount(1)
 await page.getByRole('button',{name:'Go home'}).click()
 await page.getByRole('button',{name:/OPEN GREYHAVEN PUBLIC INVENTORY/}).click()
 await page.getByLabel('Inventory reference').fill('GH-DSC-03-A')
 await page.getByRole('button',{name:'SEARCH',exact:true}).click()
 await expect(page.getByRole('heading',{name:'GH-DSC-03-A'})).toBeVisible()
 await page.getByRole('button',{name:'RETURN HOME'}).click()
 await expect(page.getByLabel('Incoming call from Sophie')).toBeVisible();await page.getByRole('button',{name:'Decline'}).click();await page.getByRole('button',{name:'CALL SOPHIE BACK'}).click()
 await page.getByRole('button',{name:'PLAY SOPHIE’S CALL'}).click()
 for(let i=0;i<10;i++){const a=page.locator('audio');await expect(a).toHaveAttribute('src',new RegExp(`SOP10_${i<6?'VC':'VD'}_0${i<6?i+1:i-5}.mp3`));await expect(page.locator('.phone-call-controls .opening-choice')).toHaveCount(0);await a.evaluate(e=>e.dispatchEvent(new Event('ended')));const buttons=page.locator('.phone-call-controls .opening-choice');await expect(buttons).toHaveCount(3);if(i===5){await buttons.nth(2).click();await page.getByRole('button',{name:'Send',exact:true}).click();await expect(page.getByText(/Video remains off/)).toBeVisible()}await buttons.nth(i===5?0:i%3).click();await page.getByRole('button',{name:'Send',exact:true}).click();if(i===5)await page.clock.runFor(1100);if(i===2){await page.waitForFunction(()=>!sessionStorage.getItem('the-archive-reboot:pending-save:v1'));await resumeAfterReload(page);await page.getByRole('button',{name:'RESUME VOICE CLIP'}).click()}}
 await expect(page.getByLabel('Text representation of the separate warning card')).toContainText('DO NOT CONTACT THE STARRED NUMBER.');await expect(page.locator('audio')).toHaveAttribute('src',/SOP10_VD_05.mp3/);await page.locator('audio').evaluate(e=>e.dispatchEvent(new Event('ended')));await expect(page.locator('audio')).toHaveAttribute('src',/SOP10_VD_06.mp3/);await expect(page.getByRole('button',{name:'Send',exact:true})).toHaveCount(0);await page.locator('audio').evaluate(e=>e.dispatchEvent(new Event('ended')));await expect(page.getByText(/But… I already did/).first()).toBeVisible();await page.clock.runFor(3100);await expect(page.locator('.scene10-fade')).toBeVisible();await page.clock.runFor(1500);await expect(page.getByText('Chapter 2 — The Other Copy unlocked')).toBeVisible()
})
