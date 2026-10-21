import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { watch: { ignored: ['**/android/**', '**/.npm-cache/**', '**/.gradle-user-home/**'] } },
  test: { environment: 'jsdom', exclude: ['tests/e2e/**', 'node_modules/**'] },
})
