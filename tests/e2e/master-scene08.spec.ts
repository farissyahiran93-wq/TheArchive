import { expect, test, type Page } from '@playwright/test'
import { afterSeven } from './maya-conversation-helper'
import { seedScene } from './scene01-helper'
import { scene08Beats } from '../../src/content/masterScene08'
import { masterScene08Action as step8 } from '../../src/game/masterScene08'
import type { GameSave } from '../../src/game/types'

async function openMaya(page:Page){
 await page.getByRole('button',{name:'Open Messages',exact:true}).first().click()
 await page.getByRole('button',{name:'Open Maya Scene 8 conversation'}).click()
}
async function reply(page:Page,text:string){
 await page.getByRole('button',{name:text,exact:true}).click()
 await page.getByRole('button',{name:'Send',exact:true}).click()
 await page.clock.runFor(30000)
}

for(const width of [320,390])test('Maya screenshot, mugs photograph and Scene 9 continue in one thread at '+width+'px',async({page},testInfo)=>{
 await page.setViewportSize({width,height:800})
 await seedScene(page,afterSeven())
 await openMaya(page)
 await page.clock.runFor(15000)
 await page.getByRole('button',{name:'Not at all. How are you doing?',exact:true}).click()
 await expect(page.getByText('Not at all. How are you doing?',{exact:true})).toHaveCount(1)
 await page.getByRole('button',{name:'Send',exact:true}).click()
 await expect(page.getByRole('status',{name:'Maya is typing'})).toBeVisible()
 await expect(page.locator('.scene01-options button')).toHaveCount(0)
 await page.waitForFunction(()=>!sessionStorage.getItem('the-archive-reboot:pending-save:v1'))
 await page.reload()
 await page.getByRole('button',{name:'Unlock phone'}).click()
 await openMaya(page)
 await page.clock.runFor(30000)
 await expect(page.getByText("I've been going through some old messages.",{exact:true})).toHaveCount(1)
 await reply(page,'Different how?')
 await reply(page,'Would you be comfortable showing me?')
 await expect(page.locator('.scene01-options button')).toHaveCount(0)
 await page.getByRole('button',{name:'Open Maya’s message screenshot'}).click()
 const viewer=page.getByRole('dialog',{name:'Maya’s saved message screenshot'})
 await expect(viewer).toBeVisible()
 await expect(viewer.getByText('21:14',{exact:true})).toBeVisible()
 await expect(viewer.getByText(/Lucas checked in. He said there was another copy/)).toBeVisible()
 await expect(viewer.getByText(/cropped above|cropped below/)).toHaveCount(0)
 await page.screenshot({path:testInfo.outputPath('maya-screenshot-'+width+'.png')})
 await viewer.getByRole('button',{name:'Zoom in'}).click()
 await expect(viewer.locator('.chat-document-canvas')).toHaveCSS('transform','matrix(1.5, 0, 0, 1.5, 0, 0)')
 const canvas=viewer.locator('.chat-photo-canvas')
 const box=await canvas.boundingBox()
 if(!box)throw new Error('Screenshot canvas is unavailable')
 const x=box.x+box.width/2,y=box.y+box.height/2
 const touch=await page.context().newCDPSession(page)
 const fingers=(distance:number)=>[{id:1,x:x-distance,y},{id:2,x:x+distance,y}]
 await touch.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:fingers(25)})
 await touch.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:fingers(30)})
 await touch.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:fingers(55)})
 await touch.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]})
 await expect.poll(()=>viewer.locator('.chat-document-canvas').evaluate(el=>new DOMMatrixReadOnly(getComputedStyle(el).transform).a)).toBeGreaterThan(1.5)
 await touch.detach()
 await viewer.getByRole('button',{name:'Close photo'}).click()
 await page.clock.runFor(15000)
 await reply(page,"We don't know what he meant by another copy.")
 await page.getByRole('button',{name:/Open Maya.s photo: Two mugs/}).click()
 await expect(page.getByRole('dialog',{name:'Photo viewer'}).getByRole('img')).toBeVisible()
 await page.getByRole('button',{name:'Zoom in'}).click()
 await page.getByRole('button',{name:'Close photo'}).click()
 await reply(page,'Thank you for showing me.')
 const chat=page.getByRole('region',{name:'Maya conversation'})
 await expect(chat.getByText('I just want him back.',{exact:true})).toHaveCount(1)
 await expect(chat.getByText("There's something else.",{exact:true})).toHaveCount(1)
 await expect(chat.getByRole('button',{name:'What is it?'})).toBeVisible()
 await expect(chat.locator('.opening-thread')).toHaveCount(1)
 await expect(chat.getByRole('button',{name:'Open Maya’s message screenshot'})).toHaveCount(1)
 await expect(chat.getByRole('button',{name:/Open Maya.s photo: Two mugs/})).toHaveCount(1)
})

test('historical Maya conversation resumes its original mid-scene dialogue after reload',async({page})=>{
 const base=afterSeven()
 // Recreate a valid pre-cinematic v1 save using the exact historical initial message,
 // then use the original-graph controller for two persisted decisions.
 let save:GameSave={...base,masterScene08:{version:1,photoRevision:1,beat:0,messages:[{id:'TA-S08-FIRST',sender:'maya',text:'Sophie said you might be willing to look at something I found. I hope it is all right that I messaged you.',at:1000}],received:false,opened:false,inspected:[],imported:false,analysis:false,compared:false,reviewed:false,saved:false,complete:false}}
 for(let i=0;i<2;i++){save=step8(save,{type:'draft',index:i});save=step8(save,{type:'send'},2000+i)}
 expect(save.masterScene08?.beat).toBe(2)
 await seedScene(page,save);await page.getByRole('button',{name:'Open Messages',exact:true}).first().click();await page.getByRole('button',{name:'Open Maya Scene 8 conversation'}).click()
 const chat=page.getByRole('region',{name:'Maya conversation'})
 for(let i=0;i<2;i++)await expect(chat.getByText(scene08Beats[i].replies[i],{exact:true})).toHaveCount(1)
 await expect(chat.getByText('Hey.',{exact:true})).toHaveCount(0)
 const choice=scene08Beats[2].choices[1];await chat.getByRole('button',{name:choice,exact:true}).click();await expect(chat.locator('.opening-bubble.player').getByText(choice,{exact:true})).toHaveCount(0)
 await chat.getByRole('button',{name:'Send',exact:true}).click();await expect(chat.getByText(scene08Beats[2].replies[1],{exact:true})).toHaveCount(1)
 await page.waitForFunction(()=>!sessionStorage.getItem('the-archive-reboot:pending-save:v1'));await page.reload();await page.getByRole('button',{name:'Unlock phone'}).click();await page.getByRole('button',{name:'Open Messages',exact:true}).first().click();await page.getByRole('button',{name:'Open Maya Scene 8 conversation'}).click()
 for(let i=0;i<3;i++)await expect(chat.getByText(scene08Beats[i].replies[i===2?1:i],{exact:true})).toHaveCount(1)
 await expect(chat.getByRole('button',{name:scene08Beats[3].choices[0],exact:true})).toBeVisible()
})
