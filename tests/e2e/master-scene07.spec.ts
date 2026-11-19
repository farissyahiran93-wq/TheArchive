import { expect, test, type Page } from '@playwright/test'
import { masterScene04Action } from '../../src/game/masterScene04'
import { readFileSync } from 'node:fs'
const cues: {start:number;end:number;text:string}[][]=JSON.parse(readFileSync('src/content/scene07SubtitleCues.json','utf8'))
import { cinematicBeats } from '../../src/content/masterScene04Cinematic'
import { beginScene01, beginScene02, deliverScene01, openScene03, scene01Invitation, sendScene01Choice } from '../../src/game/scene01'
import { newGame, type GameSave } from '../../src/game/types'
import { completeMasterScene06, prepareMasterScene05Recovery, seedScene } from './scene01-helper'
function settle(s:GameSave):GameSave{for(let i=0;i<100;i++){const q=s.prologue?.scene01?.queue[0];if(!q)return s;s=deliverScene01(s,q.dueAt)}throw Error('Queue did not settle')}
function ready():GameSave{
 let s=settle(beginScene01({...newGame(),masterOpening:true,chapter1Edition:'ch01-v2-10'},1000))
 for(let i=0;i<9;i++)s=settle(sendScene01Choice(s,'a','',true,20000+i*1000))
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
import { masterScene07Action as step7 } from '../../src/game/masterScene07'
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
 // Simulate TRACE last left on its board; the optional document action must open its home.
 await seedScene(page,step5(afterSix(),{type:'view',id:'board'}));await page.getByRole('button',{name:'Open Messages',exact:true}).first().click();await page.getByRole('button',{name:'Open Sophie conversation'}).click()
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
 await expect(page.getByText('In TRACE, compare a point from the call with the copy Sophie sent.')).toHaveCount(0)
 await page.getByRole('button',{name:'OPEN ATTACHMENT'}).click()
 const document=page.getByRole('dialog',{name:'Daniel contacts export document'})
 await expect(document).toBeVisible();await expect(page.getByLabel('TRACE Digital Evidence Analyzer')).toHaveCount(0)
 await page.screenshot({path:test.info().outputPath('contact-export-mobile.png')})
 await expect(document.getByText('No saved name',{exact:true})).toBeVisible()
 await expect(document.getByText('••• ••• ••41',{exact:true})).toBeVisible()
 await expect(document.getByText('The Remarks field is damaged and unreadable.',{exact:true})).toBeVisible()
 await expect(document.getByText('Copy shared by Sophie from the family folder',{exact:true})).toBeAttached()
 const sheet=document.locator('.contact-document-sheet'),size=await sheet.evaluate(e=>parseFloat(getComputedStyle(e).fontSize))
 await document.getByRole('button',{name:'Zoom in'}).click();await expect.poll(()=>sheet.evaluate(e=>parseFloat(getComputedStyle(e).fontSize))).toBeGreaterThan(size)
 const readable=await document.getByText('No saved name',{exact:true}).evaluate(e=>{const style=getComputedStyle(e);return {filter:style.filter,opacity:style.opacity,color:style.color}})
 expect(readable.filter).toBe('none');expect(readable.opacity).toBe('1');expect(readable.color).not.toBe('rgba(0, 0, 0, 0)')
 await document.getByRole('button',{name:'Daniel_Contacts_Export'}).click()
 const prompt=page.getByRole('alertdialog',{name:'Transfer to TRACE?'})
 await expect(prompt).toContainText("This file was shared by Sophie and hasn't been verified.")
 await prompt.getByRole('button',{name:'CANCEL'}).click();await expect(prompt).toHaveCount(0);await expect(document).toBeVisible();expect((await persistedScene07(page))?.transferred).not.toBe(true)
 await document.getByRole('button',{name:'Daniel_Contacts_Export'}).click();await prompt.getByRole('button',{name:'TRANSFER',exact:true}).click()
 await expect(document.getByRole('status')).toHaveText('Transferred to TRACE.');expect((await persistedScene07(page))?.transferred).toBe(true);await expect(document).toBeVisible();await expect(page.getByLabel('TRACE Digital Evidence Analyzer')).toHaveCount(0)
 await document.getByRole('button',{name:'Daniel_Contacts_Export'}).click();await expect(prompt.getByText('Already transferred.')).toBeVisible();await expect(prompt.getByRole('button',{name:'TRANSFER',exact:true})).toBeDisabled();await prompt.getByRole('button',{name:'CANCEL'}).click()
 await document.getByRole('button',{name:'Close document'}).click()
 await page.waitForFunction(()=>!sessionStorage.getItem('the-archive-reboot:pending-save:v1'));await page.reload();await page.getByRole('button',{name:'Unlock phone'}).click();await page.getByRole('button',{name:'Open Messages',exact:true}).first().click();await page.getByRole('button',{name:'Open Sophie conversation'}).click()
 await expect(page.getByText('Voice call with Sophie',{exact:true})).toHaveCount(1)
 await page.getByRole('button',{name:'OPEN ATTACHMENT'}).click();await expect(document.getByRole('status')).toHaveText('Already transferred to TRACE.')
 await expect(page.getByLabel('TRACE Digital Evidence Analyzer')).toHaveCount(0)
 await document.getByRole('button',{name:'OPEN IN TRACE'}).click()
 await expect(page.getByLabel('TRACE Digital Evidence Analyzer')).toBeVisible();await expect(page.getByText('Recovery: 20%')).toBeVisible()
 const external=page.getByRole('region',{name:'External Sophie document'})
 await expect(external).toHaveCount(1);await expect(external).toContainText('external copy');await expect(external).toContainText('unverified')
 await external.getByRole('button',{name:'OPEN DOCUMENT'}).click();await expect(document).toBeVisible();await expect(document.getByText('The Remarks field is damaged and unreadable.')).toBeVisible();await document.getByRole('button',{name:'Close document'}).click()
 const verification=page.getByRole('article',{name:'Sophie statement verification'})
 await expect(verification.getByRole('button',{name:'Save contact finding'})).toHaveCount(0)
 await verification.getByRole('button',{name:'What the remark means'}).click()
 await expect(verification.getByText(/Neither the copy nor Sophie.s account can establish/)).toBeVisible()
 await expect(verification.getByText('DO NOT CONTACT THE STARRED NUMBER.')).toHaveCount(0)
 await verification.getByRole('button',{name:'Save contact finding'}).click()
 await page.waitForFunction(()=>!sessionStorage.getItem('the-archive-reboot:pending-save:v1'));await page.reload();await page.getByRole('button',{name:'Unlock phone'}).click();await page.getByRole('button',{name:'Open Messages',exact:true}).first().click();await page.getByRole('button',{name:'Open Sophie conversation'}).click()
 await page.clock.runFor(120000)
 await expect(page.getByText("I don't think sending everyone that file is a good idea.",{exact:true})).toBeVisible()
 await expect(page.getByText('Optional group sharing')).toHaveCount(0)
 await expect(page.getByRole('button',{name:/REVIEW GROUP MESSAGE|CONFIRM SEND TO GROUP|KEEP PRIVATE/})).toHaveCount(0)
 const reply=page.getByLabel('Reply to Sophie')
 await expect(reply.locator('.opening-choice')).toHaveCount(3)
 await reply.locator('.opening-choice').first().click();await reply.getByRole('button',{name:'Send',exact:true}).click();await page.clock.runFor(120000)
 await expect(page.getByText("If I decide Maya needs to know something, I'll tell her myself.",{exact:true})).toBeVisible()
 await expect(page.getByText('Voice call with Sophie',{exact:true})).toHaveCount(1)
 await page.screenshot({path:'artifacts/rework-2026-11-19/sophie-private-decision.png'})
 await page.getByRole('button',{name:'Back to inbox'}).click();await page.getByRole('button',{name:'Open Same Old Chaos group conversation'}).click()
 await expect(page.getByText("The copy has a starred entry; we don't know who marked it or why.")).toHaveCount(0)
 for(let i=1;i<=11;i++){const res=await page.request.get(`/media/audio/scene07-ver1/call-${String(i).padStart(2,'0')}.wav`);expect(res.status()).toBe(200)}
})


test('attachment can be examined and assessed without importing the external copy',async({page})=>{
 await page.setViewportSize({width:320,height:568})
 let save=step7(step7(afterSix(),{type:'start'}),{type:'answer'})
 for(let i=0;i<10;i++){save=step7(save,{type:'clip-ended'});save=step7(save,{type:'draft',index:0});save=step7(save,{type:'send'})}
 save=step7(save,{type:'clip-ended'})
 await seedScene(page,save);await page.getByRole('button',{name:'Open Messages',exact:true}).first().click();await page.getByRole('button',{name:'Open Sophie conversation'}).click()
 await page.getByRole('button',{name:'OPEN ATTACHMENT'}).click()
 const document=page.getByRole('dialog',{name:'Daniel contacts export document'})
 await expect(document).toBeVisible();await page.screenshot({path:test.info().outputPath('contact-export-320.png')})
 await document.getByRole('button',{name:'Zoom in'}).click()
 const bottom=document.getByText('Authenticity',{exact:true});await bottom.scrollIntoViewIfNeeded();await expect(bottom).toBeVisible()
 await document.getByRole('button',{name:'Daniel_Contacts_Export'}).click();await page.getByRole('alertdialog',{name:'Transfer to TRACE?'}).getByRole('button',{name:'CANCEL'}).click()
 expect((await persistedScene07(page))?.transferred).not.toBe(true)
 await document.getByRole('button',{name:'Close document'}).click()
 await page.getByRole('button',{name:'COMPARE SOURCES'}).click()
 const assessment=page.getByRole('article',{name:'Sophie statement verification'})
 await assessment.getByRole('button',{name:'What the remark means'}).click();await assessment.getByRole('button',{name:'Save contact finding'}).click()
 expect((await persistedScene07(page))?.transferred).not.toBe(true)
 await expect(page.getByRole('button',{name:'OPEN ATTACHMENT'})).toBeVisible()
 await page.getByRole('button',{name:'Go home'}).click();await page.getByRole('button',{name:'Open TRACE'}).click()
 await expect(page.getByText('Recovery: 20%')).toBeVisible();await expect(page.getByRole('region',{name:'External Sophie document'})).toHaveCount(0)
})
