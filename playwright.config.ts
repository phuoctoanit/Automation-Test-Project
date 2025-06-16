import { defineConfig } from '@playwright/test';
import os from 'os';

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
  workers: 4,
  projects: [
    {
      name: 'api-tests',
      testMatch: /tests\/api\/.*\.spec\.ts/,
      fullyParallel: true,
    },
    {
      name: 'form-tests',
      testMatch: /tests\/form\/.*\.spec\.ts/,
      fullyParallel: true,
    },
  ],
});