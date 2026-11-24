import { expect, test, type Page } from '@playwright/test'
import { masterScene04Action } from '../../src/game/masterScene04'
import { readFileSync } from 'node:fs'
const cues: {start:number;end:number;text:string}[][]=JSON.parse(readFileSync('src/content/scene07SubtitleCues.json','utf8'))
import { cinematicBeats } from '../../src/content/masterScene04Cinematic'
import { beginScene01, beginScene02, deliverScene01, openScene03, scene01Invitation, sendScene01Choice } from '../../src/game/scene01'
import { newGame, type GameSave } from '../../src/game/types'
import { completeMasterScene06, openSophie, prepareMasterScene05Recovery, sceneReply, seedScene, sophieAttachmentReady } from './scene01-helper'
function settle(s:GameSave):GameSave{for(let i=0;i<100;i++){const q=s.prologue?.scene01?.queue[0];if(!q)return s;s=deliverScene01(s,q.dueAt)}throw Error('Queue did not settle')}
function ready():GameSave{
 let s=settle(beginScene01({...newGame(),masterOpening:true,chapter1Edition:'ch01-v2-10'},1000))
 for(let i=0;i<9;i++)s=settle(sendScene01Choice(s,'a','',true,20000+i*1000))
 // This fixture exercises a save from the previous group screenplay.
 s={...s,prologue:{...s.prologue!,scene01:{...s.prologue!.scene01!,masterScene02Revision:3}}}
 s=settle(beginScene02(scene01Invitation(s,'join'),40000))
 s = settle(sendScene01Choice(s, 'c', 'Alex', true, 41000))
 for(let i=0;i<9;i++)s=settle(sendScene01Choice(s,'a','',true,50000+i*1000))
 s=settle(openScene03(s,100000))
 for(let i=0;i<10;i++)s=settle(sendScene01Choice(s,'a','',true,140000+i*1000))
 s=masterScene04Action(masterScene04Action(s,{type:'start'},200000),{type:'open'})
 while(s.masterScene04?.pending)s=masterScene04Action(s,{type:'tick'},s.masterScene04.pending.dueAt)
 for(let i=0;i<cinematicBeats.length;i++){s=masterScene04Action(s,{type:'draft',index:0});s=masterScene04Action(s,{type:'send'},210000+i*50000);while(s.masterScene04?.pending)s=masterScene04Action(s,{type:'tick'},s.masterScene04.pending.dueAt)}
 return masterScene04Action(s,{type:'setup-trace'})
}
import { masterScene05Action as step5 } from '../../src/game/masterScene05'
import { masterFragments } from '../../src/content/masterScene05'
function afterFive():GameSave {
 let s=prepareMasterScene05Recovery(ready())
 s=step5(s,{type:'install'});s=step5(s,{type:'open-trace'});s=step5(s,{type:'recover'});s=step5(s,{type:'recovery-tick'},s.masterScene05!.recoveryAnimation!.startedAt+8000);s=step5(s,{type:'recovery-acknowledge'})
 for(const f of masterFragments)s=step5(s,{type:'read',id:f.id})
 s=step5(s,{type:'observe',id:masterFragments[0].id})
 s=step5(s,{type:'save',id:masterFragments[0].id})
 s=step5(s,{type:'discussion',action:{type:'select',topic:'dinner'}})
 for(let i=0;i<2;i++){s=step5(s,{type:'discussion',action:{type:'draft',index:0}});s=step5(s,{type:'discussion',action:{type:'send'}});while(s.masterScene05?.discussion?.pending.length)s=step5(s,{type:'discussion',action:{type:'deliver'}})}
 s=step5(s,{type:'discussion',action:{type:'select',topic:'finish'}});s=step5(s,{type:'discussion',action:{type:'send'}})
 return s
}
function afterSix():GameSave {
 return completeMasterScene06(afterFive())
}
async function persistedScene07(page:Page){
 await page.waitForFunction(()=>!sessionStorage.getItem('the-archive-reboot:pending-save:v1'))
 return page.evaluate(async()=>{
  const db=await new Promise<IDBDatabase>((resolve,reject)=>{const r=indexedDB.open('the-archive-reboot',1);r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)})
  const save=await new Promise<GameSave>((resolve,reject)=>{const r=db.transaction('saves').objectStore('saves').get('primary');r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)})
  db.close();return save.masterScene07
 })
}

test('Sophie call pauses for a three-tone answer and the external export keeps recovery at 20%',async({page})=>{
 await page.setViewportSize({width:390,height:844})
 await seedScene(page,step5(afterSix(),{type:'view',id:'board'}));await page.getByRole('button',{name:'Open Messages',exact:true}).first().click();await page.getByRole('button',{name:'Open Sophie conversation'}).click()
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
   await page.reload();await page.getByRole('button',{name:'Unlock phone'}).click();await page.getByRole('button',{name:'Open Messages',exact:true}).first().click();await page.getByRole('button',{name:'Open Sophie conversation'}).click()
   const resumed=page.locator('audio')
   await expect.poll(()=>resumed.evaluate((node:HTMLAudioElement)=>node.currentTime)).toBeGreaterThan(resumeCue.start-.2)
   const reconnect=page.getByRole('button',{name:'RESUME CALL'})
   if(await reconnect.isVisible())await reconnect.click()
   await expect(page.locator('.cinematic-subtitle')).toHaveText(resumeCue.text)
  }
  await audio.evaluate(e=>e.dispatchEvent(new Event('ended')));await expect(page.locator('.cinematic-subtitle')).toHaveCount(0);await expect(page.locator('.phone-call-controls .opening-choice')).toHaveCount(3)
  await page.locator('.phone-call-controls .opening-choice').nth(i%3).click()
  if(i===2){await page.waitForFunction(()=>!sessionStorage.getItem('the-archive-reboot:pending-save:v1'));await page.reload();await page.getByRole('button',{name:'Unlock phone'}).click();await page.getByRole('button',{name:'Open Messages',exact:true}).first().click();await page.getByRole('button',{name:'Open Sophie conversation'}).click();await expect(page.locator('audio')).toHaveCount(1);await expect(page.locator('audio')).not.toHaveAttribute('controls', '');await expect(page.locator('.phone-call-controls .opening-choice').nth(i%3)).toHaveAttribute('aria-pressed','true')}
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
 const sheet=document.locator('.contact-document-sheet'),size=await sheet.evaluate(e=>parseFloat(getComputedStyle(e).fontSize))
 await document.getByRole('button',{name:'Zoom in'}).click()
 await expect.poll(()=>sheet.evaluate(e=>parseFloat(getComputedStyle(e).fontSize))).toBeGreaterThan(size)
 const damaged=document.getByRole('button',{name:'Inspect damaged remarks'})
 await damaged.click()
 const prompt=page.getByRole('alertdialog',{name:'This section is damaged. Transfer the corrupted fragment to TRACE for analysis?'})
 await prompt.getByRole('button',{name:'CANCEL'}).click()
 expect((await persistedScene07(page))?.fragmentAnalysedAt).toBeUndefined()
 await damaged.click();await prompt.getByRole('button',{name:'ANALYSE WITH TRACE'}).click()
 const analysis=page.getByRole('dialog',{name:'TRACE fragment analysis'})
 await expect(analysis.getByText('Unreadable',{exact:true})).toBeVisible()
 expect((await persistedScene07(page))?.fragmentAnalysedAt).toBeDefined()
 await analysis.getByRole('button',{name:'RETURN TO SOPHIE'}).click()
 await expect(page.getByRole('button',{name:'COMPARE SOURCES'})).toHaveCount(0)
 await page.clock.runFor(10000)
 await sceneReply(page,"Do you know who had access to Daniel's shared folder?")
 await expect(page.getByText("I'm not going to send the whole export there.",{exact:true})).toBeVisible()
 await expect(page.getByText('Optional group sharing')).toHaveCount(0)
 await page.getByRole('button',{name:"It's okay to take your time with this."}).click()
 await page.waitForFunction(()=>!sessionStorage.getItem('the-archive-reboot:pending-save:v1'))
 await page.reload();await page.getByRole('button',{name:'Unlock phone'}).click();await openSophie(page)
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
})

test('opening the external copy alone supports the whole conversation',async({page})=>{
 await page.setViewportSize({width:320,height:568})
 await seedScene(page,sophieAttachmentReady(afterSix()));await openSophie(page)
 await page.getByRole('button',{name:'OPEN ATTACHMENT'}).click()
 const document=page.getByRole('dialog',{name:'Daniel contacts export document'})
 await document.getByRole('button',{name:'Close document'}).click()
 await page.clock.runFor(15000)
 await sceneReply(page,'I can see the starred number, but some of the text is damaged.')
 await sceneReply(page,"We still don't know who marked the number.")
 expect(await persistedScene07(page)).toMatchObject({phase:'complete',saved:false})
 expect((await persistedScene07(page))?.fragmentAnalysedAt).toBeUndefined()
})
