import { defineConfig } from '@playwright/test';
import os from 'os';
import path from 'path';
import dotenv from 'dotenv';
import { env } from 'process';

// const ENV = process.env.ENV || 'staging';
// dotenv.config({ path: path.resolve(__dirname, `.env.${ENV}`) });

// const testTypes = [
//   { name: 'api', testMatch: /tests\/api\/.*\.spec\.ts/ },
//   { name: 'form', testMatch: /tests\/form\/.*\.spec\.ts/ },
// ];


// const environments = [
//   { name: 'dev', webURL: process.env.WEB_BASE_URL, apiURL: process.env.API_BASE_URL },
//   { name: 'qa', webURL: process.env.WEB_BASE_URL, apiURL: process.env.API_BASE_URL },
//   { name: 'staging', webURL: process.env.WEB_BASE_URL, apiURL: process.env.API_BASE_URL },
// ];

// const projects= environments.flatMap(env =>
//   testTypes.map(type => ({
//     name: `${type.name}-${env.name}`,
//     testMatch: type.testMatch,
//     use: {
//       baseURL: env.webURL,
//       apiBaseURL: env.apiURL,
//       headless: true,
//     },
//     fullyParallel: true,
//   }))
// );

// console.log(`Running tests in ${os.platform()} on ${os.cpus().length} CPUs`);
// console.log(`Environment: ${ENV}`);
// console.log(`projects: ${JSON.stringify(projects, null, 2)}`);

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  retries: process.env.CI ? 1 : 0,
  use: {
    headless: true,
    screenshot: 'only-on-failure', //only-on-failure
    video: 'retain-on-failure', // 'on' | 'retain-on-failure' | 'off'
    // video: {
    //     mode: 'on', //'retain-on-failure',
    //     size: { width: 1280, height: 720 },
    // },
    trace: process.env.CI ? 'off' : 'on-first-retry',
    baseURL: process.env.WEB_BASE_URL || '',
  },
  reporter: [
    ['line'], 
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['allure-playwright', { outputFolder: 'allure-results', detail: true }],
  ],
  workers: 4,
  //projects: projects,
  projects: [
    // {
    //   name: 'api-tests',
    //   testMatch: /tests\/api\/.*\.spec\.ts/,
    //   fullyParallel: true,
    // },
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
  ],
});