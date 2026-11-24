import { expect, test } from '@playwright/test'
import { masterScene04Action } from '../../src/game/masterScene04'
import { cinematicBeats } from '../../src/content/masterScene04Cinematic'
import { beginScene01, beginScene02, deliverScene01, openScene03, scene01Invitation, sendScene01Choice } from '../../src/game/scene01'
import { newGame, type GameSave } from '../../src/game/types'
import { completeMasterScene06, prepareMasterScene05Recovery, openSophie, seedScene, sophieAttachmentReady } from './scene01-helper'
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


for(const width of [320,375,390,430])test(`Damaged external fragment stays readable at ${width}px`,async({page})=>{
 await page.setViewportSize({width,height:844});await seedScene(page,sophieAttachmentReady(afterSix()))
 await openSophie(page);await page.getByRole('button',{name:'OPEN ATTACHMENT'}).click()
 const doc=page.getByRole('dialog',{name:'Daniel contacts export document'})
 await expect(doc.getByText('••• ••• ••41',{exact:true})).toBeVisible()
 const dimensions=await doc.evaluate(el=>({client:el.clientWidth,scroll:el.scrollWidth}))
 expect(dimensions.scroll).toBeLessThanOrEqual(dimensions.client+1)
 await doc.getByRole('button',{name:'Inspect damaged remarks'}).click()
 const prompt=doc.getByRole('alertdialog')
 await expect(prompt.getByRole('button',{name:'ANALYSE WITH TRACE'})).toBeVisible()
 await prompt.getByRole('button',{name:'CANCEL'}).click()
 await doc.getByRole('button',{name:'Close document'}).click()
 await page.getByRole('button',{name:'Go home'}).click()
 await page.getByRole('button',{name:'Open TRACE'}).click()
 await expect(page.getByText('Verify Sophie’s account')).toHaveCount(0)
 await expect(page.getByText('Daniel_Contacts_Export',{exact:true})).toHaveCount(0)
})
