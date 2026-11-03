import { test, expect } from '@playwright/test'
import { ConversationFixture } from '../helpers/versionHistoryConversation'
import { seedScene } from './scene01-helper'

test.use({ reducedMotion:'reduce' })
for (const mode of ['on','minimal','off'] as const) test(`guidance ${mode} follows the saved reference without unlocking new evidence`, async ({page}) => {
  const f = new ConversationFixture().bridge().install()
  await page.setViewportSize({width:320,height:720})
  await seedScene(page,f.save,{pauseClock:true})
  await page.evaluate(guidance=>localStorage.setItem('the-archive-reboot:menu-preferences:v1',JSON.stringify({guidance})),mode)
  await page.reload()
  await page.getByRole('button',{name:'Unlock phone',exact:true}).click()
  const app=page.getByRole('button',{name:'Open TRACE',exact:true})
  if(mode==='off') await expect(app).not.toHaveAttribute('aria-description',/Investigation action/)
  else await expect(app).toHaveAttribute('aria-description',/Inspect the recovered reference/)
  await app.click()
  await expect(page.getByRole('region',{name:'Current lead'})).toHaveCount(0)
  const action=page.getByRole('button',{name:'ARC-IDX-GB-041',exact:true})
  await expect(action.locator('.guidance-dot')).toHaveCount(0)
  await action.click()
  await expect(page.getByText('AUTHENTICITY: UNVERIFIED',{exact:false})).toBeVisible()
  await page.getByRole('button',{name:'Back to TRACE',exact:true}).click()
  await expect(page.getByRole('region',{name:'Current lead'})).toHaveCount(0)
  await expect(page.getByRole('button',{name:'REVIEW VERSION HISTORY',exact:true})).toBeEnabled()
})
