import { expect, test } from '@playwright/test'
import { newGame, type GameSave } from '../../src/game/types'
import { beginScene01 } from '../../src/game/scene01'
import { masterScene05Action as five } from '../../src/game/masterScene05'
import { masterScene06Action as six } from '../../src/game/masterScene06'
import { seedScene } from './scene01-helper'

function ready():GameSave {
 let s:GameSave={...beginScene01({...newGame(),masterOpening:true,chapter1Edition:'ch01-v2-10'},0),masterScene04:{version:1,revision:'cinematic',opened:true,beat:10,messages:[],status:'accepted',inspected:false,complete:true,preview:false,traceInstalled:true}}
 const drain=()=>{while(s.masterScene05?.pending)s=five(s,{type:'tick'},s.masterScene05.pending.dueAt)}
 s=five(s,{type:'start'},1000);drain()
 for(let i=0;i<10;i++){
  if(i===4){s=five(s,{type:'archive-accept'},100000);s=five(s,{type:'import-tick'},104000);drain()}
  if(i===6){s=five(s,{type:'open-trace'});s=five(s,{type:'recover'},200000);s=five(s,{type:'recovery-tick'},208000);s=five(s,{type:'recovery-acknowledge'},208001);drain()}
  s=five(five(s,{type:'draft',index:0}),{type:'send'},300000+i*10000);drain()
 }
 return six(s,{type:'start'},500000)
}
test('player discovers and discusses the activity gap, then retains its board card',async({page})=>{
 await seedScene(page,ready());await page.getByRole('button',{name:'Open Messages',exact:true}).first().click();await page.getByRole('button',{name:'Open Unknown conversation'}).click();await page.clock.runFor(120000)
 for(const topic of ['june','maya','lucas','sophie']){
  await page.getByLabel('Choose a discussion').selectOption(topic)
  for(let i=0;i<2;i++){await expect(page.locator('.scene01-options .opening-choice')).toHaveCount(3);await page.locator('.scene01-options .opening-choice').first().click({force:true});await page.getByRole('button',{name:'Send',exact:true}).click({force:true});await page.clock.runFor(120000)}
 }
 await expect(page.getByText('Open Activity Logs.',{exact:true})).toHaveCount(0)
 await page.getByRole('button',{name:'Go home'}).click();await page.getByRole('button',{name:'Open TRACE'}).click();await expect(page.getByText('Recovery: 20%')).toBeVisible()
 await page.getByRole('button',{name:'Open Activity Logs module'}).click();await expect(page.getByText('Activity unavailable · 19:00–20:00')).toBeVisible();await page.getByRole('button',{name:'DISCUSS WITH UNKNOWN'}).click()
 await expect(page.getByText('A gap?',{exact:true})).toHaveCount(0);await page.locator('.scene01-options .opening-choice').first().click({force:true});await page.getByRole('button',{name:'Send',exact:true}).click({force:true});await page.clock.runFor(120000);await expect(page.getByText('A gap?',{exact:true})).toBeVisible()
 await page.locator('.scene01-options .opening-choice').first().click({force:true});await page.getByRole('button',{name:'Send',exact:true}).click({force:true});await page.clock.runFor(120000)
 await page.getByRole('button',{name:'Go home'}).click();await page.getByRole('button',{name:'Open TRACE'}).click();await page.getByRole('button',{name:'BACK TO TRACE'}).click();await page.getByRole('button',{name:'Open Investigation Board module'}).click();const card=page.locator('.trace-board-node').filter({hasText:'The Missing Hour'});await expect(card).toHaveCount(1);await card.click({force:true});await page.getByRole('button',{name:'Move evidence right'}).click({force:true});const position=await card.getAttribute('style')
 await page.waitForFunction(()=>!sessionStorage.getItem('the-archive-reboot:pending-save:v1'));await page.reload();await page.getByRole('button',{name:'Unlock phone'}).click();await page.getByRole('button',{name:'Open TRACE'}).click();await expect(page.locator('.trace-board-node').filter({hasText:'The Missing Hour'})).toHaveCount(1);await expect(page.locator('.trace-board-node').filter({hasText:'The Missing Hour'})).toHaveAttribute('style',position!)
})
