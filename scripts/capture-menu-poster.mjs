import { chromium } from '@playwright/test'
import { writeFileSync } from 'node:fs'
const browser = await chromium.launch({ channel: 'chrome', headless: true })
try {
  const page = await browser.newPage()
  await page.goto('http://127.0.0.1:4174')
  const frame = await page.evaluate(async () => {
    const video = document.createElement('video')
    video.muted = true
    video.src = '/videos/investigation-room.mp4'
    await new Promise((resolve, reject) => { video.onloadeddata = resolve; video.onerror = reject })
    video.currentTime = .2
    await new Promise(resolve => { video.onseeked = resolve })
    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth; canvas.height = video.videoHeight
    canvas.getContext('2d').drawImage(video, 0, 0)
    return { data: canvas.toDataURL('image/jpeg', .9).split(',')[1], width: video.videoWidth, height: video.videoHeight, duration: video.duration }
  })
  writeFileSync('public/images/investigation-room-poster.jpg', Buffer.from(frame.data, 'base64'))
  console.log({ width: frame.width, height: frame.height, duration: frame.duration })
} finally { await browser.close() }
