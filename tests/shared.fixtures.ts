import { test as base, expect } from '@playwright/test'
import { Browser, chromium, Page, firefox, webkit } from "playwright-core";
import { PageManager } from "../pages/PageManager";

type WorkerFixtures = {
    sharedPage: Page
}

type TestFixtures = {
    pageManager: PageManager
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
              
            const browser: Browser = await browserType.launch( { headless: true });
            const context = await browser.newContext();
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

test.afterEach(async ({ sharedPage }, testInfo) => {
    // Take a screenshot after each test
    const fileName = testInfo.title.replace(/[^a-zA-Z0-9-_]/g, '_') + '.png';
    const screenshotPath = `screenshots/${fileName}`;
    await sharedPage.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`Finished: ${testInfo.title} - Screenshot saved to ${screenshotPath}`);
    console.log(`Test status: ${testInfo.status}`);
    const bodyExists = await sharedPage.isVisible('body');
    expect(bodyExists).toBe(true);
});

export {expect, TestFixtures, WorkerFixtures }