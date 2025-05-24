import { Locator, Page } from "playwright-core";
import { expect } from "playwright/test";
import {FormData} from '../form-data/formData';
import * as fs from 'fs';
import * as path from 'path';

export class HomePage {

    private page: Page;

    // Locators
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly email: Locator;
    readonly gender: Locator;
    readonly userNumber: Locator;
    readonly dateOfBirth: Locator;
    readonly subjects: Locator;
    readonly hobbiesSports: Locator;
    readonly hobbiesReading: Locator;
    readonly hobbiesMusic: Locator;
    readonly uploadPicture: Locator;
    readonly currentAddress: Locator;
    readonly state: Locator;
    readonly city: Locator;
    readonly submitButton: Locator;
    readonly successModal: Locator;
    readonly closeModalBtn: Locator;


    constructor(page: Page){
        this.page = page;

        this.firstName = page.locator('#firstName');
        this.lastName = page.locator('#lastName');
        this.email = page.locator('#userEmail');
        this.gender = page.locator('[name="gender"]')
        this.userNumber = page.locator('#userNumber');
        this.dateOfBirth = page.locator('#dateOfBirthInput');
        this.subjects = page.locator("#subjectsInput");
        this.hobbiesSports = page.locator('#hobbies-checkbox-1');
        this.hobbiesReading = page.locator('#hobbies-checkbox-2');
        this.hobbiesMusic = page.locator('#hobbies-checkbox-3');
        this.uploadPicture = page.locator('#uploadPicture');
        this.currentAddress = page.locator('#currentAddress');
        this.state = page.locator('#state');
        this.city = page.locator('#city');
        this.submitButton = page.locator('#submit');
        this.successModal = page.locator('.modal-content table tbody');
        this.closeModalBtn = page.locator('#closeLargeModal');
    }

    /**
     * select value on radio button
     * @param genderValue
     * @returns 
     */
    selectGender(genderValue: string) {
        return this.page.locator(`//input[@name="gender"][@value="${genderValue}"]/parent::div`);
    }

    /**
     * Select value on a dropdown
     * @param value 
     */
    async selectOnSuggestionList(value: string) {
        await this.subjects.fill(value);
        await this.page.waitForSelector('.subjects-auto-complete__menu', { state: 'visible', timeout: 5000});
        
        const option = this.page.locator('.subjects-auto-complete__option', {hasText: value});
        await option.click();
    }

    /**
     * select options of hobbies
     * @param hobby 
     */
    async selectHobby(hobby: string) {
        const checkbox = this.page.locator(`//label[starts-with(@for, 'hobbies-checkbox-')][contains(text(), '${hobby}')]/parent::div`);
        await checkbox.click();
    }

    /**
     * 
     * @param dropdown 
     * @param value 
     */
    async selectOnDropdow(dropdown: Locator, value: string) {
        if(value.trim() === '') {
            return; // If value is empty, do not select anything
        }
        await dropdown.click();
        const option = this.page.locator(`//div[starts-with(@id, "react-select-")][text()="${value}"]`);
        await option.click();
    }

    /**
     * Input data on form
     * @param formData 
     */
    async inputForm(formData: FormData) {
        // fill first name
        await this.firstName.fill(formData.firstName);
        // fill last name
        await this.lastName.fill(formData.lastName);
        // fill email
        await this.email.fill(formData.email);
        //select gender
        await this.selectGender(formData.gender).click();
        // fill user number
        await this.userNumber.fill(formData.userNumber);
        // fill date of birth
        // The date format is 'dd MMM yyyy', e.g. '25 Feb 1990'
        // If the dateOfBirth is empty, it will not fill the input
        if(formData.dateOfBirth !== '') {
            await this.dateOfBirth.fill(formData.dateOfBirth);
        }
        // select subjects value
        const subjects = formData.subjects;
        for(const sub of subjects) {
            await this.selectOnSuggestionList(sub);
        }

        //select the hobbies values
        const hobbies = formData.hobbies;
        for(const hobbi of hobbies) {
            await this.selectHobby(hobbi);
        }

        //Upload pick
        if(formData.picture !== '') {
            await this.uploadPicture.setInputFiles(formData.picture);
        }

        await this.currentAddress.fill(formData.currentAddress);
        await this.selectOnDropdow(this.state, formData.state);
        await this.selectOnDropdow(this.city, formData.city);

        //submit button
        await this.submitButton.click();
    }

    /**
     * 
     * @param formData 
     */
    async validateOnSuccessModal(formData: FormData){
        //Modal success should be displayed
        await this.successModal.waitFor({ state: 'visible'});

        //Validate status name
        const studentName = this.successModal.locator('tr:nth-of-type(1) > td:nth-of-type(2)');
        await expect(studentName).toHaveText(formData.firstName + ' ' + formData.lastName);

        //Validate the student email
        const studentEmail = this.successModal.locator('tr:nth-of-type(2) > td:nth-of-type(2)');
        await expect(studentEmail).toHaveText(formData.email);

        //validate the gender
        const gender = this.successModal.locator('tr:nth-of-type(3) > td:nth-of-type(2)');
        await expect(gender).toHaveText(formData.gender);

        //Validate phone number
        const phoneNumber = this.successModal.locator('tr:nth-of-type(4) > td:nth-of-type(2)');
        await expect(phoneNumber).toHaveText(formData.userNumber);

        //Validate date of birth
        const dateOfBirth = this.successModal.locator('tr:nth-of-type(5) > td:nth-of-type(2)');
        const date = formData.dateOfBirth?.trim() !== '' ? new Date(formData.dateOfBirth) : new Date();
        const day = date.getDate();
        const month = date.toLocaleString('en-US', { month: 'long' });
        const year = date.getFullYear();
        await expect(dateOfBirth).toHaveText(`${day} ${month},${year}`);

        //Validate subjects
        const subjects = this.successModal.locator('tr:nth-of-type(6) > td:nth-of-type(2)');
        await expect(subjects).toHaveText(formData.subjects?.join(', '));

        //Validate the hobbies
        const hobbies = this.successModal.locator('tr:nth-of-type(7) > td:nth-of-type(2)');
        await expect(hobbies).toHaveText(formData.hobbies?.join(', '));

        //Validate the picture
        const image = this.successModal.locator('tr:nth-of-type(8) > td:nth-of-type(2)');
        if(!formData.picture || formData.picture.trim() === '') {
            await expect(image).toHaveText('');
        }else {
            const filePath = path.resolve(__dirname, formData.picture);
            const fileName = path.basename(filePath);
            await expect(image).toHaveText(fileName);
        }

        //Validate the address
        const address = this.successModal.locator('tr:nth-of-type(9) > td:nth-of-type(2)');
        await expect(address).toHaveText(formData.currentAddress);

        //Validate the state and city
        const stateAndCity = this.successModal.locator('tr:nth-of-type(10) > td:nth-of-type(2)');
        const expectedLocation = `${formData.state ?? ''} ${formData.city ?? ''}`.trim();
        await expect(stateAndCity).toHaveText(expectedLocation);

        //close modal and expect modal hidden
        await this.closeModalBtn.scrollIntoViewIfNeeded();

        try{
            await this.closeModalBtn.click({ timeout: 3000 });
        }catch (e) {
            await this.page.evaluate(() => {
                (document.querySelector('#closeLargeModal') as HTMLElement)?.click();
            });
        }
        await this.successModal.waitFor({state: 'hidden', timeout: 5000});
    }
}