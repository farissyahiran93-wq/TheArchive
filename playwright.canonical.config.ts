import { defineConfig, devices } from '@playwright/test'

const port = Number(process.env.PLAYWRIGHT_PORT ?? 4176)
const baseURL = `http://127.0.0.1:${port}`

export default defineConfig({
  testDir: './tests/e2e',
  testMatch: ['**/chapter1-release-continuity.spec.ts', '**/canonical-campaign.spec.ts'],
  use: { baseURL, ...devices['Pixel 7'], channel: 'chrome' },
  webServer: { command: `npm run preview -- --host 127.0.0.1 --port ${port} --strictPort`, url: baseURL, timeout: 60_000 },
})
