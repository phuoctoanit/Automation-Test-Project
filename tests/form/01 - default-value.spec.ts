import { test, expect } from '../shared.fixtures';

test.describe('Automation-Test-Project', async () => {

    test('TC 01: Validate of value Gender, Hobbies, default date of birthday', async ({ sharedPage, pageManager }) => {
        const homePage = pageManager.getHomePage();
        await test.step('1. Navigate to the automation practice form page', async () => {
            await sharedPage.goto('https://demoqa.com/automation-practice-form');
            await sharedPage.waitForURL('**/automation-practice-form', { timeout: 10000 });
            await expect(sharedPage).toHaveTitle('DEMOQA');
        });
        await test.step('2. Validate default of gender', async () => {
            const genderValues = (await homePage.getListGenderValues()).map(value => value.toLowerCase());
            const expectedGenderValues = ['MaLe', 'female', 'Other'].map(value => value.toLowerCase());
            expect(genderValues).toEqual(expectedGenderValues);
        });
        await test.step('3. Validate default of hobbies', async () => {
            const hobbiesValues = (await homePage.getListHobbiesValues()).map(value => value.toLowerCase());
            const expectedHobbiesValues = ['sports', 'reading', 'music'].map(value => value.toLowerCase());
            expect(hobbiesValues).toEqual(expectedHobbiesValues);
        });
        await test.step('4. Validate default date of birth', async () => {
            const dateOfBirth = await homePage.dateOfBirth.getAttribute('value');
            const currentDate = new Date();
            const expectedDate = `${currentDate.getDate().toString().padStart(2, '0')} ${currentDate.toLocaleString('default', { month: 'short' })} ${currentDate.getFullYear()}`;
            expect(dateOfBirth).toBe(expectedDate); 
        });
    });
});