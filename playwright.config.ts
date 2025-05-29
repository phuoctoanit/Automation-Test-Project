import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  retries: process.env.CI ? 1 : 0,
  use: {
    headless: true,
    screenshot: 'only-on-failure', //only-on-failure
    video: 'retain-on-failure',
    trace: process.env.CI ? 'off' : 'on-first-retry'
  },
  reporter: [
    ['line'], 
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['allure-playwright']
  ],
});