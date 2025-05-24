import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  retries: 0,
  use: {
    headless: true,
    screenshot: 'on', //only-on-failure
    video: 'retain-on-failure',
    trace: 'on', //on-first-retry
  },
  reporter: [['line'], ['html', { outputFolder: 'playwright-report', open: 'never' }]],
});