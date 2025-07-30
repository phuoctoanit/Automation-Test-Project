import { test as base, expect } from '@playwright/test'
import { Browser, chromium, Page, firefox, webkit } from "playwright-core";
import { PageManager } from "../../../pages/PageManager";
import { Logger } from '../../../utils/Logger';
import fs from 'fs';
import path from 'path';

type WorkerFixtures = {
    sharedPage: Page
}

type TestFixtures = {
    pageManager: PageManager,
}

type BrowserName = 'chromium' | 'firefox' | 'webkit';

export const test = base.extend<TestFixtures, WorkerFixtures> ({
    sharedPage: [
        async({}, use) => {
            const browserName: BrowserName = (process.env.BROWSER || 'chromium') as BrowserName;
            
            const isValidBrowser = ['chromium', 'firefox', 'webkit'].includes(browserName);
            if (!isValidBrowser) {
                throw new Error(`Unsupported browser: ${browserName}`);
            }

            const browserType = {
                chromium,
                firefox,
                webkit
            }[browserName];
              
            const browser: Browser = await browserType.launch( { headless: true  });
            const context = await browser.newContext({
                recordVideo: {
                    dir: 'videos/',
                    size: { width: 1280, height: 720 }
                }
            });
            const page = await context.newPage();
            try{
                await use(page);
            }finally{
                // Teardown after all tests in the worker are done
                await context.close();
                await browser.close();
            }
        },
        { scope: 'worker'} // Shared across all tests in the same worker (can span files)
    ],

    pageManager: async ({sharedPage}, use) => {
        const pom = new PageManager(sharedPage);
        await use(pom);
    },
});

test.beforeEach(async ({}, testInfo) => {
    Logger.log(testInfo, `Starting a new test case ${testInfo.title}`);
});

test.afterEach(async ({ page }, testInfo) => {
    Logger.log(testInfo, `Completed: ${testInfo.title} with status: ${testInfo.status?.toUpperCase()}`);
    if(testInfo.status === 'failed') {
          await page.waitForTimeout(3000); // give video something to record
    }
    const video = await page.video();
    if (video) {
        const videoPath = await video.path();
        testInfo.attachments.push({
        name: 'video',
        path: videoPath,
        contentType: 'video/webm',
        });
    }
});


// test.afterEach(async ({ sharedPage }, testInfo) => {
//     // Take a screenshot after each test
//     const fileName = testInfo.title.replace(/[^a-zA-Z0-9-_]/g, '_') + '.png';
//     const screenshotPath = `screenshots/${fileName}`;
//     await sharedPage.screenshot({ path: screenshotPath, fullPage: true });
//     console.log(`Finished: ${testInfo.title} - Screenshot saved to ${screenshotPath}`);
//     console.log(`Test status: ${testInfo.status}`);
//     const bodyExists = await sharedPage.isVisible('body');
//     expect(bodyExists).toBe(true);
// given().contentType().body().when().get('https://example.com').then().statusCode(200).body();
// });
export {expect, TestFixtures, WorkerFixtures }