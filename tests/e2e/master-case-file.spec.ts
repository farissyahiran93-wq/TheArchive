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

test('Investigation Board preserves recovered sources, private connections and positions into Scene 6',async({page})=>{
 await seedScene(page,ready());await page.getByRole('button',{name:'Open TRACE'}).click()
 await expect(page.getByText('Recovery: 20%',{exact:true})).toBeVisible()
 await page.getByRole('button',{name:'Open Messages module'}).click()
 for(const name of ['Maya Chen','Sophie Mercer']){
  await page.getByRole('button',{name:new RegExp(name)}).click();await expect(page.getByRole('heading',{name,exact:true})).toBeVisible();await page.getByRole('button',{name:'BACK TO TRACE'}).click()
 }
 await page.getByRole('button',{name:'BACK TO TRACE'}).click();await page.getByRole('button',{name:'Open Investigation Board module'}).click()
 const maya=page.getByRole('button',{name:"Select evidence: Maya Chen's messages"}),sophie=page.getByRole('button',{name:"Select evidence: Sophie Mercer's messages"})
 await expect(maya).toHaveCount(1);await expect(sophie).toHaveCount(1)
 await page.getByRole('combobox',{name:'Evidence index'}).selectOption({label:"Maya Chen's messages"});const before=await maya.getAttribute('style')
 await page.getByRole('button',{name:'Move evidence right'}).click();const moved=await maya.getAttribute('style');expect(moved).not.toBe(before)
 await page.getByRole('button',{name:'Start a connection'}).click();await page.getByRole('combobox',{name:'Evidence index'}).selectOption({label:"Sophie Mercer's messages"});await page.getByRole('button',{name:"Connect to Sophie Mercer's messages"}).click()
 const connection=page.getByRole('button',{name:/Remove connection between/});await expect(connection).toBeVisible()
 await page.getByText('Edit tentative connection',{exact:true}).click();await page.getByLabel('Relationship label').fill('Two separate recovered conversations');await page.getByLabel('Player assessment').selectOption('tentative');await page.getByRole('button',{name:'Save connection'}).click()
 await expect(page.getByText('Two separate recovered conversations · tentative')).toBeVisible()
 await page.waitForFunction(()=>!sessionStorage.getItem('the-archive-reboot:pending-save:v1'));await page.reload();await page.getByRole('button',{name:'Unlock phone'}).click();await page.getByRole('button',{name:'Open TRACE'}).click()
 await expect(maya).toHaveAttribute('style',moved!);await expect(connection).toBeVisible();await expect(page.getByText('Two separate recovered conversations · tentative')).toBeVisible()
 await page.getByRole('button',{name:'Home',exact:true}).click();await page.getByRole('button',{name:'Open Messages',exact:true}).first().click();await page.getByRole('button',{name:'Open Unknown conversation'}).click();await page.clock.runFor(120000)
 for(const topic of ['maya','sophie','lucas','june']){await page.getByLabel('Choose a discussion').selectOption(topic);for(let i=0;i<2;i++){await page.locator('.scene01-options .opening-choice').first().click({force:true});await page.getByRole('button',{name:'Send',exact:true}).click({force:true});await page.clock.runFor(120000)}}
 await page.getByRole('button',{name:'Go home'}).click();await page.getByRole('button',{name:'Open TRACE'}).click();await page.getByRole('button',{name:'BACK TO TRACE'}).click();await page.getByRole('button',{name:'Open Activity Logs module'}).click();await page.getByRole('button',{name:'DISCUSS WITH UNKNOWN'}).click()
 for(let i=0;i<2;i++){await page.locator('.scene01-options .opening-choice').first().click({force:true});await page.getByRole('button',{name:'Send',exact:true}).click({force:true});await page.clock.runFor(120000)}
 await page.getByRole('button',{name:'Go home'}).click();await page.getByRole('button',{name:'Open TRACE'}).click();await page.getByRole('button',{name:'BACK TO TRACE'}).click();await page.getByRole('button',{name:'Open Investigation Board module'}).click()
 await expect(page.getByRole('button',{name:'Select evidence: The Missing Hour'})).toHaveCount(1);await expect(maya).toHaveAttribute('style',moved!);await expect(connection).toBeVisible();await expect(page.getByText('Two separate recovered conversations · tentative')).toBeVisible()
})
