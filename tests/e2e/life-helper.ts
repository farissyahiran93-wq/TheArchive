import type { Page } from '@playwright/test'
import { sceneAt, sceneNow, seedScene, settleScene } from './scene01-helper'
import { openScene03, scene01Choices, sendScene01Choice } from '../../src/game/scene01'
import { accessChoices, chapter2Access } from '../../src/game/chapter2Access'
import type { GameSave } from '../../src/game/types'

export function expandedMirror() {
  let s=sceneAt('G13')
  s=settleScene(sendScene01Choice(s,'a','',true,sceneNow(s)))
  s=settleScene(openScene03(s,sceneNow(s)))
  for(let i=0;i<60&&!s.prologue!.scene01!.privateScene03?.complete;i++)s=settleScene(sendScene01Choice(s,scene01Choices(s)[0].id,'',true,sceneNow(s)))
  let now=sceneNow(s)+7000
  s=chapter2Access(s,{type:'tick'},now)
  for(let i=0;i<250;i++) {
    if(s.chapter2Access?.installCompleted)return chapter2Access(s,{type:'open-mirror'},now)
    const q=s.chapter2Access?.queue
    if(q){now=q.dueAt;s=chapter2Access(s,{type:'tick'},now);continue}
    now+=100
    if(s.chapter2Access?.node==='PACKAGE'){s=chapter2Access(s,{type:'confirm-install'},now);continue}
    const option=accessChoices(s)[0]
    if(!option)throw new Error('No access choice')
    s=chapter2Access(chapter2Access(s,{type:'draft',id:option.id},now),{type:'send',id:option.id},now)
  }
  throw new Error('No expanded mirror')
}
export async function seedMirror(page:Page,save=expandedMirror()){
  await seedScene(page,save)
  await page.clock.pauseAt(await page.evaluate(()=>Date.now()))
  await page.getByRole('button',{name:'Open The Archive',exact:true}).click()
  await page.getByRole('button',{name:'OPEN PHONE MIRROR',exact:true}).click()
  await page.getByRole('button',{name:'ENTER MIRROR',exact:true}).click()
}
export async function storedLife(page:Page):Promise<GameSave>{
  return page.evaluate(async()=>{
    const pending=sessionStorage.getItem('the-archive-reboot:pending-save:v1')
    if(pending)return JSON.parse(pending).save
    const db=await new Promise<IDBDatabase>(resolve=>{const r=indexedDB.open('the-archive-reboot',1);r.onsuccess=()=>resolve(r.result)})
    const save=await new Promise<GameSave>(resolve=>{const r=db.transaction('saves').objectStore('saves').get('primary');r.onsuccess=()=>resolve(r.result)})
    db.close();return save
  })
}
export async function mirrorHome(page:Page){await page.getByRole('button',{name:'Mirror home',exact:true}).click()}
export async function mirrorApp(page:Page,name:string){await page.getByRole('button',{name:`Open mirrored ${name}`,exact:true}).click()}
