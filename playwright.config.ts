import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  retries: process.env.CI ? 2 : 0,
  use: {
    headless: true,
    screenshot: 'only-on-failure', //only-on-failure
    video: 'retain-on-failure',
    trace: 'on-first-retry', //on-first-retry
  },
  reporter: [['line'], ['html', { outputFolder: 'playwright-report', open: 'never' }]],
});