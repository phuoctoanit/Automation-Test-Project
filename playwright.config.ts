import { defineConfig } from '@playwright/test';
import os from 'os';
import path from 'path';
import dotenv from 'dotenv';
import * as fs from 'fs';
import { Logger } from './utils/Logger';

const envFile = `.env.${process.env.ENV || 'dev'}`;
if (fs.existsSync(envFile)) {
  dotenv.config({ path: envFile });
}

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  retries: process.env.CI ? 1 : 0,
  use: {
    headless: true,
    screenshot: 'only-on-failure', //only-on-failure
    video: 'retain-on-failure', // 'on' | 'retain-on-failure' | 'off'
    trace: process.env.CI ? 'off' : 'on-first-retry',
    baseURL: process.env.BASE_URL,
  },
  reporter: [
    ['list'],
    ['json', { outputFile: 'playwright-report/results.json' }],
    ['line'], 
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['allure-playwright', { outputFolder: 'allure-results', detail: true }],
  ],
  workers: 4,
  projects: [
    {
      name: 'api',
      testMatch: /tests\/api\/.*\.spec\.ts/,
      fullyParallel: true,
      use: {
        baseURL: process.env.API_URL || 'http://localhost:3001',
        extraHTTPHeaders: {
          'Content-Type': 'application/json',
        },
      },
    },
    // {
    //   name: 'form-tests',
    //   testMatch: /tests\/form\/.*\.spec\.ts/,
    //   fullyParallel: true,
    // },
    {
      name: 'chromium',
      use: {
        viewport: { width: 1280, height: 720 }
      },
      fullyParallel: true,
    },
    {
      name: 'firefox',
      use: {
        viewport: { width: 1280, height: 720 }
      },
      fullyParallel: true,
    },
    {
      name: 'webkit',
      use: {
        viewport: { width: 1280, height: 720 }
      },
      fullyParallel: true,
    }
  ],
});