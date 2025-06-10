import { test, expect } from '../shared.fixtures';
import {FormData} from '../../form-data/formData';
import * as fs from 'fs';
import * as path from 'path';
import { ExcelUtils } from '../../utils/ExcelUtils';
import { ExcelData } from '../../constants/ExcelData';

test.describe('@submission Automation-Test-Project', async () => {
    
    test('TC 02: User can submit the form with all valid data', async ({ sharedPage, pageManager }) => {
        const homePage = pageManager.getHomePage();

        const formData = ExcelUtils.parseRowData(
            path.resolve(__dirname, '../../resources/data-forms/Data.xlsx'), ExcelData.SheetName, 1);

        await test.step('1. Navigate to the automation practice form page', async () => {
            await sharedPage.goto('https://demoqa.com/automation-practice-form'), {timeout: 60000};
            await sharedPage.waitForURL('**/automation-practice-form', { timeout: 10000 });
            await expect(sharedPage).toHaveTitle('DEMOQA');
        });
        await test.step('2. Input all valid data into the form', async () => {
            if (formData.picture !== undefined && formData.picture !== '') {
                const filePath = path.resolve(__dirname, formData.picture);
                expect(fs.existsSync(filePath)).toBe(true);
                formData.picture = filePath;
            }
            await homePage.inputForm(formData);
        });
        await test.step('3. Validate success modal', async () => {
            await homePage.validateOnSuccessModal(formData);
        });
    });

    test('TC 03: User can submit the form with if input required filed only', async ({ sharedPage, pageManager }) => {
        const homePage = pageManager.getHomePage();
        //can use a CSV  or JSON file to store the form data
        const formData = ExcelUtils.parseRowData(
            path.resolve(__dirname, '../../resources/data-forms/Data.xlsx'), ExcelData.SheetName, 2);

        await test.step('1. Navigate to the automation practice form page', async () => {
            await sharedPage.goto('https://demoqa.com/automation-practice-form'), {timeout: 60000};
            await sharedPage.waitForURL('**/automation-practice-form', { timeout: 10000 });
            await expect(sharedPage).toHaveTitle('DEMOQA');
        });
        await test.step('2. Input all valid data into the form', async () => {
            if (formData.picture !== undefined && formData.picture !== '') {
                const filePath = path.resolve(__dirname, formData.picture);
                expect(fs.existsSync(filePath)).toBe(true);
                formData.picture = filePath;
            }
            await homePage.inputForm(formData);
        });
        await test.step('3. Validate success modal', async () => {
            await homePage.validateOnSuccessModal(formData);
        });
    });
});

