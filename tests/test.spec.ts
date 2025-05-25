import { test, expect } from './shared.fixtures';
import {FormData} from '../form-data/formData';
import * as fs from 'fs';
import * as path from 'path';

test.describe('Practice automation on form data', async () => {

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

    
    test('TC 02: User can submit the form with all valid data', async ({ sharedPage, pageManager }) => {
        const homePage = pageManager.getHomePage();
        //can use a CSV  or JSON file to store the form data
        const formData: FormData = {
            firstName: 'Toan',
            lastName: 'Nguyen',
            email: 'toanhcmus@gmail.com',
            gender: 'Male',
            userNumber: '0704490831',
            dateOfBirth: '25 Feb 1990',
            subjects: ['Hindi', 'Maths'],
            hobbies: ['Sports', 'Reading', 'Music'],
            picture: '../resources/cat.jpeg',
            currentAddress: 'Binh Tan',
            state: 'NCR',
            city: 'Delhi'
        }
        await test.step('1. Navigate to the automation practice form page', async () => {
            await sharedPage.goto('https://demoqa.com/automation-practice-form');
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
        const formData: FormData = {
            firstName: 'Toan',
            lastName: 'Nguyen',
            email: '',
            gender: 'Male',
            userNumber: '0704490831',
            dateOfBirth: '',
            subjects: [],
            hobbies: [],
            picture: '',
            currentAddress: '',
            state: '',
            city: ''
        }

        await test.step('1. Navigate to the automation practice form page', async () => {
            await sharedPage.goto('https://demoqa.com/automation-practice-form');
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

    test('TC 04: Validate warning message if First Name empty or contains specific characters', async ({ sharedPage, pageManager }) => {
        //If submit First Name empty, expected to see warning message
        const homePage = pageManager.getHomePage();
        await test.step('1. Navigate to the automation practice form page', async () => {
            await sharedPage.goto('https://demoqa.com/automation-practice-form');
            await sharedPage.waitForURL('**/automation-practice-form', { timeout: 10000 });
            await expect(sharedPage).toHaveTitle('DEMOQA');
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
    });

    test('TC 05: Validate warning message if Last Name empty or contains specific characters', async ({ sharedPage, pageManager }) => {
        const homePage = pageManager.getHomePage();
        await test.step('1. Navigate to the automation practice form page', async () => {
            await sharedPage.goto('https://demoqa.com/automation-practice-form');
            await sharedPage.waitForURL('**/automation-practice-form', { timeout: 10000 });
            await expect(sharedPage).toHaveTitle('DEMOQA');
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

    test('TC 06: Validate warning message if Email is invalid', async ({ sharedPage, pageManager }) => {
        const homePage = pageManager.getHomePage();
        await test.step('1. Navigate to the automation practice form page', async () => {
            await sharedPage.goto('https://demoqa.com/automation-practice-form');
            await sharedPage.waitForURL('**/automation-practice-form', { timeout: 10000 });
            await expect(sharedPage).toHaveTitle('DEMOQA');
        });
        //If submit Email empty, expected to no see warning message,because field Email is not required
        await test.step('2. Leave Email as blank', async () => {
            await homePage.email.fill('');
            await homePage.submitButton.click();
            await homePage.expectInputToBeValid(homePage.email); // Email is not required, so it should be valid
        });
        await test.step('3. Input an invalid email format', async () => {
            await homePage.email.fill('invalid-email'); // Fill Email with invalid format
            await homePage.submitButton.click();
            await homePage.expectInputToBeInvalid(homePage.email);
            await homePage.email.fill('toanhcmus@gmail.com'); // Fill Email with valid data
            await homePage.expectInputToBeValid(homePage.email);
        });
    });

    test('TC 07: Validate warning message if User Number is invalid', async ({ sharedPage, pageManager }) => {
        const homePage = pageManager.getHomePage();
        await test.step('1. Navigate to the automation practice form page', async () => {
            await sharedPage.goto('https://demoqa.com/automation-practice-form');
            await sharedPage.waitForURL('**/automation-practice-form', { timeout: 10000 });
            await expect(sharedPage).toHaveTitle('DEMOQA');
        });
        await test.step('2. Leave User Number as blank', async () => {
            await homePage.userNumber.fill('');
            await homePage.submitButton.click();
            await homePage.expectInputToBeInvalid(homePage.userNumber);
            await homePage.userNumber.fill('0704490831'); // Fill User Number with valid data
            await homePage.expectInputToBeValid(homePage.userNumber);
        });
        await test.step('3. Input characters on User Number', async () => {
            await homePage.userNumber.fill('abc123'); // Fill User Number with characters
            await homePage.submitButton.click();
            await homePage.expectInputToBeInvalid(homePage.userNumber);
            await homePage.userNumber.fill('0704490831'); // Fill User Number with valid data
            await homePage.expectInputToBeValid(homePage.userNumber);   
        });

        await test.step('4. Input less than 10 digits on User Number', async () => {
            await homePage.userNumber.fill('070449083'); // Fill User Number with less than 10 digits
            await homePage.submitButton.click();
            await homePage.expectInputToBeInvalid(homePage.userNumber);
            await homePage.userNumber.fill('0704490831'); // Fill User Number with valid data
            await homePage.expectInputToBeValid(homePage.userNumber);
        });

        await test.step('5. Input more than 10 digits on User Number', async () => {
            await homePage.userNumber.fill('070449083123456'); // Fill User Number with more than 10 digits
            await homePage.submitButton.click();
            await homePage.expectInputToBeValid(homePage.userNumber);
            expect(await homePage.userNumber.inputValue()).toBe('0704490831'); // Number is truncated to 10 digits
        }); 
    });

    test('TC 08: Validate warning message if no Gender is selected', async ({ sharedPage, pageManager }) => {
        const homePage = pageManager.getHomePage();
        await test.step('1. Navigate to the automation practice form page', async () => {
            await sharedPage.goto('https://demoqa.com/automation-practice-form');
            await sharedPage.waitForURL('**/automation-practice-form', { timeout: 10000 });
            await expect(sharedPage).toHaveTitle('DEMOQA');
        });

        await test.step('2. if user submit form without selected gender', async() => {
            await homePage.submitButton.click();
            await homePage.expectGenderToBeInvalid();
            await homePage.selectGender('Male');
            await homePage.expectGenderToBeValid();
        });
    });

    test('TC 09: Validate warning message if no Hobbies is selected', async ({ sharedPage, pageManager }) => {
        //if submit no Hobbies is selected, expected to see warning message
        const homePage = pageManager.getHomePage();
        await test.step('1. Navigate to the automation practice form page', async () => {
            await sharedPage.goto('https://demoqa.com/automation-practice-form');
            await sharedPage.waitForURL('**/automation-practice-form', { timeout: 10000 });
            await expect(sharedPage).toHaveTitle('DEMOQA');
        });

        await test.step('2. if user submit form without selected hobbies', async() => {
            await homePage.submitButton.click();
            await homePage.expectGroupCheckboxToBeValid();
        });
    });

    test('TC 10: Validate warning message if no Subjects is selected', async ({ sharedPage, pageManager }) => {
        //if submit no Subjects is selected, expected to no see warning message, because field Subjects is not required
        const homePage = pageManager.getHomePage();
        await test.step('1. Navigate to the automation practice form page', async () => {
            await sharedPage.goto('https://demoqa.com/automation-practice-form');
            await sharedPage.waitForURL('**/automation-practice-form', { timeout: 10000 });
            await expect(sharedPage).toHaveTitle('DEMOQA');
        });
        await test.step('2. if user submit form without selected Subjects', async() => {
            await homePage.submitButton.click();
            await homePage.expectInputToBeValid(homePage.subjects);
            await homePage.selectOnSuggestionList('Hindi');
            await homePage.expectInputToBeValid(homePage.subjects);
        });

    });
    
    test('TC 11: User can select and deselect a subject', async ({ sharedPage, pageManager }) => {
        const homePage = pageManager.getHomePage();
        await test.step('1. Navigate to the automation practice form page', async () => {
            await sharedPage.goto('https://demoqa.com/automation-practice-form');
            await sharedPage.waitForURL('**/automation-practice-form', { timeout: 10000 });
            await expect(sharedPage).toHaveTitle('DEMOQA');
        });
        await test.step('2. User can deselect all selected subjects', async() => {
            await homePage.selectOnSuggestionList('Hindi');
            await homePage.selectOnSuggestionList('Maths');
            await homePage.deselectAllOnSuggestionList();
        });
        await test.step('3. User can deselect a subject from the suggestion subjects', async() => {
            await homePage.selectOnSuggestionList('Hindi');
            await homePage.selectOnSuggestionList('Maths');
            await homePage.deselectSubjectByName('Hindi');
            await homePage.deselectSubjectByName('Maths');    
            expect(await homePage.subjects.inputValue()).toBe(''); // Expect subjects input to be empty 
        });
    }); 

    test('TC 12: Validate no warning message if Current Address is empty', async ({ sharedPage, pageManager }) => {
        const homePage = pageManager.getHomePage();
        await test.step('1. Navigate to the automation practice form page', async () => {
            await sharedPage.goto('https://demoqa.com/automation-practice-form');
            await sharedPage.waitForURL('**/automation-practice-form', { timeout: 10000 });
            await expect(sharedPage).toHaveTitle('DEMOQA');
        });

        await test.step('2. If user leave blank on address and submit the form', async () => {
            await homePage.submitButton.click();
            await homePage.expectInputToBeValid(homePage.currentAddress);
            await homePage.currentAddress.fill("The Outline view is a separate section in the bottom of the File Explorer. When expanded, it shows the symbol tree of the currently active editor. For Markdown files, the symbol tree is the Markdown file's header hierarchy."); // Fill User Number with valid data
            await homePage.expectInputToBeValid(homePage.currentAddress);
        });
    });

    test('TC 13: Validate warning message if form data is empty', async ({ sharedPage, pageManager }) => {
        const homePage = pageManager.getHomePage();
        await test.step('1. Navigate to the automation practice form page', async () => {
            await sharedPage.goto('https://demoqa.com/automation-practice-form');
            await sharedPage.waitForURL('**/automation-practice-form', { timeout: 10000 });
            await expect(sharedPage).toHaveTitle('DEMOQA');
        });
        await test.step('2. If user leave all fields blank and submit the form', async () => {
            await homePage.submitButton.click();
            await test.step('2.1. Validate on First Name', async () => {
                await homePage.expectInputToBeInvalid(homePage.firstName);
            });
            await test.step('2.2. Validate on Last Name', async () => {
                await homePage.expectInputToBeInvalid(homePage.lastName);
            });
            await test.step('2.3. Validate on Email', async () => {
                await homePage.expectInputToBeValid(homePage.email); // Email is not required, so it should be valid
            });
            await test.step('2.4. Validate on User Phone Number', async () => {
                await homePage.expectInputToBeInvalid(homePage.userNumber);
            });
            await test.step('2.5. Validate on Gender', async () => {
                await homePage.expectGenderToBeInvalid();
            });
            await test.step('2.6. Validate on Hobbies', async () => {
                await homePage.expectGroupCheckboxToBeValid();
            });
            await test.step('2.7. Validate on Current address', async () => {
                await homePage.expectInputToBeValid(homePage.currentAddress);
            });
            await test.step('2.8. Validate on Subjects', async () => {
                await homePage.expectInputToBeValid(homePage.subjects);
            });
        });
    });

});

