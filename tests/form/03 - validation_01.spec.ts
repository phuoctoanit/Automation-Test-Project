import test, { chromium, expect, TestInfo } from "@playwright/test";
import { PageManager } from "../../pages/PageManager";

test.describe('@validation Automation-Test-Project', async () => {

    test('TC 04: Validate warning message if First Name empty or contains specific characters', async ({page, baseURL}, testInfo: TestInfo) => {
        //If submit First Name empty, expected to see warning message

        // const browser = await chromium.launch({ headless: true });
        // const context = await browser.newContext({
        //     // recordVideo: {
        //     // dir: 'videos/',
        //     // size: { width: 1280, height: 720 }
        //     // }
        // });

        // const page = await context.newPage();
        const pageManager = new PageManager(page);
        const homePage = pageManager.getHomePage();
        await test.step('1. Navigate to the automation practice form page', async () => {
            await page.goto(baseURL!), {timeout: 60000};
            
            //await page.waitForTimeout(19000); // just to show some activity
            await page.waitForURL('**/automation-practice-form', { timeout: 10000 });
            await expect(page, { message: 'The page title is not as expected'}).toHaveTitle('DEMOQA');
        });
        await test.step('2. Leave First Name as blank', async () => {
            //const homePage = pageManager.getHomePage();
            await homePage.firstName.fill(''); // Clear First Name
            await homePage.submitButton.click();
            await homePage.expectInputToBeInvalid(homePage.firstName);
            await homePage.firstName.fill('Toan'); // Fill First Name with valid data
            await homePage.expectInputToBeValid(homePage.firstName);
        });
        await test.step('3. Input a space or special characters', async () => {
            await homePage.firstName.fill('!@#$%^&*()'); // Fill First Name with special characters
            await homePage.submitButton.click();
            await homePage.expectInputToBeInvalid(homePage.firstName);
            await homePage.firstName.fill(' '); // Fill First Name with a space
            await homePage.submitButton.click();
            await homePage.expectInputToBeInvalid(homePage.firstName);
        });

        // await context.close(); // flush video
        // await browser.close();

        // const videoPath = await page.video()?.path();
        // testInfo.attachments.push({
        //     name: 'video',
        //     path: videoPath,
        //     contentType: 'video/webm',
        // });
    });

    test.skip('TC 06: Validate warning message if Last Name empty or contains specific characters', async ({ page }) => {
        //If submit Last Name empty, expected to see warning message
    });

    test.skip('TC 07: Validate warning message if Last Name empty or contains specific characters', async ({ page }) => {
        //If submit Last Name empty, expected to see warning message
    });

    test('TC 05: Validate warning message if Last Name empty or contains specific characters', async ({ page, baseURL }) => {
        const pageManager = new PageManager(page);
        const homePage = pageManager.getHomePage();
        await test.step('1. Navigate to the automation practice form page', async () => {
            await page.goto(baseURL!), {timeout: 60000};
            await page.waitForURL('**/automation-practice-form', { timeout: 10000 });
            await expect(page, { message: 'The page title is not as expected'}).toHaveTitle('DEMOQA');
        });
        await test.step('2. Leave Last Name as blank', async () => {
            await homePage.lastName.fill('');
            await homePage.submitButton.click();
            await homePage.expectInputToBeInvalid(homePage.lastName);
            await homePage.lastName.fill('Toan'); // Fill Last Name with valid data
            await homePage.expectInputToBeValid(homePage.lastName);
        });
        await test.step('3. Input a space or special characters', async () => {
            await homePage.lastName.fill('!@#$%^&*()'); // Fill First Name with special characters
            await homePage.submitButton.click();
            await homePage.expectInputToBeInvalid(homePage.lastName);
            await homePage.lastName.fill(' '); // Fill Last Name with a space
            await homePage.submitButton.click();
            await homePage.expectInputToBeInvalid(homePage.lastName);
        }); 
    })
});