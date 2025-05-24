import { test, expect } from './shared.fixtures';
import {FormData} from '../form-data/formData';
import * as fs from 'fs';
import * as path from 'path';

test.describe('Practice automation on form data', async () => {

    test('TC 01: Validate of value Gender, Hobbies', async ({ sharedPage, pageManager }) => {
        await sharedPage.goto('https://demoqa.com/automation-practice-form');
        await expect(sharedPage).toHaveTitle('DEMOQA');
    });

    test('TC 02: User can submit the form with all valid data', async ({ sharedPage, pageManager }) => {

        const homePage = pageManager.getHomePage();
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
    
        if(formData.picture !== '') {
            const filePath = path.resolve(__dirname, formData.picture);
            expect(fs.existsSync(filePath)).toBe(true);
            formData.picture = filePath;
        }
        await homePage.inputForm(formData);
        await homePage.validateOnSuccessModal(formData);
    });

});

