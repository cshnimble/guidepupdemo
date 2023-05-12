import { PlaywrightTestConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

const config: PlaywrightTestConfig = {
  testDir: './tests',
  retries: 2,
  reportSlowTests: null,
  timeout: 4 * 60 * 1000,
  reporter: 'html',
  use: {
    // baseURL: 'http://127.0.0.1:3000',

    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], video: "on" },
    },
  ],
}
