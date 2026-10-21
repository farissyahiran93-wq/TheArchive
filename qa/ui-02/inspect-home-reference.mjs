import { chromium } from '@playwright/test'
import { mkdir, writeFile } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'

const source = 'C:/Users/faris_7v6emz4/Downloads/Telegram Desktop/video_2026-10-16_14-58-35.mp4'
await mkdir('qa/ui-02/reference', { recursive: true })
const browser = await chromium.launch({ channel: 'chrome', args: ['--allow-file-access-from-files'] })
const page = await browser.newPage({ viewport: { width: 1100, height: 900 } })
await page.goto(pathToFileURL(source).href)
await page.evaluate(async () => {
  const video = document.querySelector('video')
  video.pause()
  if (!video.videoWidth) await new Promise(resolve => video.addEventListener('loadedmetadata', resolve, { once: true }))
})
for (const at of [296, 298, 299, 301, 302, 304, 310]) {
  const data = await page.evaluate(async (at) => {
    const video = document.querySelector('video')
    await new Promise(resolve => { video.addEventListener('seeked', resolve, { once: true }); video.currentTime = at })
    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth; canvas.height = video.videoHeight
    canvas.getContext('2d').drawImage(video, 0, 0)
    return canvas.toDataURL('image/png').split(',')[1]
  }, at)
  const target = `qa/ui-02/reference/home-${at}s.png`
  await writeFile(target, Buffer.from(data, 'base64'))
  console.log(target)
}
await browser.close()
