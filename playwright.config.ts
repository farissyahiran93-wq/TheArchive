import { defineConfig, devices } from '@playwright/test'

process.env.ARCHIVE_COMPATIBILITY_FIXTURES = '1'
const port = Number(process.env.PLAYWRIGHT_PORT ?? 4174)
const baseURL = `http://127.0.0.1:${port}`

export default defineConfig({
  timeout: 90_000,
  testDir: './tests/e2e',
  testIgnore: '**/canonical-campaign.spec.ts',
  use: { baseURL, ...devices['Pixel 7'], channel: 'chrome' },
  webServer: { command: `npm run dev -- --mode compatibility-qa --host 127.0.0.1 --port ${port} --strictPort`, url: baseURL, reuseExistingServer: !process.env.CI && !process.env.PLAYWRIGHT_PORT, timeout: 30_000 },
})
