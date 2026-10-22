import { chromium } from '@playwright/test'
import { mkdir } from 'node:fs/promises'
const output = 'artifacts/post-lucas/video-reference'
await mkdir(output, { recursive: true })
const browser = await chromium.launch({ channel: 'chrome', headless: true })
try {
  const page = await browser.newPage({ viewport: { width: 540, height: 960 } })
  for (const number of [1, 2, 3, 4]) {
    await page.goto(`file:///C:/Users/faris_7v6emz4/Downloads/Telegram%20Desktop/duskwood/${number}.mp4`)
    await page.locator('video').waitFor()
    await page.waitForFunction(() => document.querySelector('video')?.readyState >= 1)
    const duration = await page.locator('video').evaluate(video => { video.pause(); return video.duration })
    for (const fraction of [.2, .5, .8]) {
      await page.locator('video').evaluate(async (video, time) => {
        await new Promise(resolve => { video.addEventListener('seeked', resolve, { once: true }); video.currentTime = time })
      }, duration * fraction)
      await page.screenshot({ path: `${output}/${number}-${Math.round(fraction * 100)}.png` })
    }
    console.log(JSON.stringify({ video: number, duration, sampledFrames: 3 }))
  }
} finally { await browser.close() }
