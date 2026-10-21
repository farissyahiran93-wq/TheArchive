import { chromium } from '@playwright/test'
import { mkdir } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'

const source = 'C:/Users/faris_7v6emz4/Downloads/Telegram Desktop/video_2026-10-16_14-58-35.mp4'
await mkdir('qa/ui-02/reference', { recursive: true })
const browser = await chromium.launch({ channel: 'chrome', args: ['--allow-file-access-from-files'] })
const page = await browser.newPage({ viewport: { width: 1100, height: 900 } })
await page.goto(pathToFileURL(source).href)
const meta = await page.evaluate(async () => {
  const video = document.querySelector('video')
  if (!video) throw new Error('Video not found')
  video.pause()
  if (!video.videoWidth) await new Promise(resolve => video.addEventListener('loadedmetadata', resolve, { once: true }))
  return { duration: video.duration, width: video.videoWidth, height: video.videoHeight }
})
console.log(JSON.stringify(meta))
for (const [index, fraction] of [0.01, 0.15, 0.3, 0.5, 0.7, 0.9].entries()) {
  const at = meta.duration * fraction
  const data = await page.evaluate(async (at) => {
    const video = document.querySelector('video')
    await new Promise(resolve => { video.addEventListener('seeked', resolve, { once: true }); video.currentTime = at })
    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth; canvas.height = video.videoHeight
    canvas.getContext('2d').drawImage(video, 0, 0)
    return canvas.toDataURL('image/png').split(',')[1]
  }, at)
  const { writeFile } = await import('node:fs/promises')
  await writeFile(`qa/ui-02/reference/frame-${index}.png`, Buffer.from(data, 'base64'))
  console.log(`frame-${index}.png @ ${at.toFixed(2)}s`)
}
await browser.close()
