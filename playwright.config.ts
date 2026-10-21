import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  timeout: 90_000,
  testDir: './tests/e2e',
  use: { baseURL: 'http://127.0.0.1:4174', ...devices['Pixel 7'], channel: 'chrome' },
  webServer: { command: 'npm run dev -- --host 127.0.0.1 --port 4174', url: 'http://127.0.0.1:4174', reuseExistingServer: !process.env.CI, timeout: 30_000 },
})
