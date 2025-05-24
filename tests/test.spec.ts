import { test, expect } from './shared.fixtures';
import {FormData} from '../form-data/formData';
import * as fs from 'fs';
import * as path from 'path';

test.describe('Practice automation on form data', async () => {

    test('TC 01: Validate of value Gender, Hobbies, default date of birthday', async ({ sharedPage, pageManager }) => {
        await sharedPage.goto('https://demoqa.com/automation-practice-form');
        await sharedPage.waitForURL('**/automation-practice-form', { timeout: 10000 });
        await expect(sharedPage).toHaveTitle('DEMOQA');
        const homePage = pageManager.getHomePage();
        // Validate default value of gender
        const genderValues = (await homePage.getListGenderValues()).map(value => value.toLowerCase());
        const expectedGenderValues = ['MaLe', 'female', 'Other'].map(value => value.toLowerCase());
        expect(genderValues).toEqual(expectedGenderValues);

        // Validate default value of hobbies
        const hobbiesValues = (await homePage.getListHobbiesValues()).map(value => value.toLowerCase());
        const expectedHobbiesValues = ['sports', 'reading', 'music'].map(value => value.toLowerCase());
        expect(hobbiesValues).toEqual(expectedHobbiesValues);

        // Validate default date of birth
        const dateOfBirth = await homePage.dateOfBirth.getAttribute('value');
        const currentDate = new Date();
        const expectedDate = `${currentDate.getDate().toString().padStart(2, '0')} ${currentDate.toLocaleString('default', { month: 'short' })} ${currentDate.getFullYear()}`;
        expect(dateOfBirth).toBe(expectedDate); 
    });

    
    test('TC 02: User can submit the form with all valid data', async ({ sharedPage, pageManager }) => {
        await sharedPage.goto('https://demoqa.com/automation-practice-form');
        await expect(sharedPage).toHaveTitle('DEMOQA');
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

        if (formData.picture !== undefined && formData.picture !== '') {
            const filePath = path.resolve(__dirname, formData.picture);
            expect(fs.existsSync(filePath)).toBe(true);
            formData.picture = filePath;
        }
        await homePage.inputForm(formData);
        await homePage.validateOnSuccessModal(formData);
    });

    test('TC 03: User can submit the form with if input required filed only', async ({ sharedPage, pageManager }) => {
        await sharedPage.goto('https://demoqa.com/automation-practice-form');
        await sharedPage.waitForURL('**/automation-practice-form', { timeout: 10000 });
        await expect(sharedPage).toHaveTitle('DEMOQA');
        
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
    
        if(formData.picture !== undefined && formData.picture !== '') {
            const filePath = path.resolve(__dirname, formData.picture);
            expect(fs.existsSync(filePath)).toBe(true);
            formData.picture = filePath;
        }
        await homePage.inputForm(formData);
        await homePage.validateOnSuccessModal(formData);
    });
});

