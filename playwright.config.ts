import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

export default defineConfig({
  testDir: './tests',
  retries: 2,
  reportSlowTests: null,
  timeout: 4 * 60 * 1000,
  reporter: [ ['html', { open: 'never' }] ],
  use: {
    baseURL: 'https://nimbleapproach.com',
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], video: "on" },
    },
    {
      name: 'NVDA',
      testMatch: /.*.nvda.spec.ts/,
      retries: 0
    },
    {
      name: 'VoiceOver',
      testMatch: /.*.vo.spec.ts/,
      retries: 0
    }
  ],
})
