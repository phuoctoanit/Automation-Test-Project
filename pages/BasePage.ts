import { expect, Locator, Page } from "@playwright/test";
import { Color } from "../constants/Color";

export class BasePage {

    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    /**
     * 
     * @param groupName name attribute of radio group
     * @returns 
     */
    async getGroupValuesOfRadio(groupName: string): Promise<string[]> {
        const elements = this.page.locator(`input[name="${groupName}"]`);
        const count = await elements.count();
        const values: string[] = [];
        for (let i = 0; i < count; i++) {
            const value = await elements.nth(i).getAttribute('value');
            if (value) {
                values.push(value);
            }
        }
        return values;
    }

    /**
     * 
     * @param groupName name attribute of checkbox group
     * @returns 
     */
    async getGroupValuesOfCheckbox(container: string, groupName: string): Promise<string[]> {
        const containerLocator = this.page.locator(container);
        const labels = containerLocator.locator(`label.${groupName}`);
        const count = await labels.count();
        const values: string[] = [];
        for (let i = 0; i < count; i++) {
            values.push(await labels.nth(i).innerText());
        }
        return values;
    }



    /**
     * 
     * @param locator 
     */
    async expectInputToBeInvalid(locator: Locator) {
        const parentHasValidated = await this.page.locator('form').getAttribute('class');
        expect(parentHasValidated).toContain('was-validated');

        const hasInvalid = await locator.evaluate(el => el.matches(':invalid'));
        expect(hasInvalid).toBe(true);

        await expect.poll(async () => {
            return await locator.evaluate(el => window.getComputedStyle(el).getPropertyValue('border-color'));
        }, {
            timeout: 3000,
            message: 'Border color should be red for required input'
        }).toContain(Color.Red); // Expect the border color to be red (invalid)
    }

    /**
     * 
     * @param locator 
     */
    async expectInputToBeValid(locator: Locator) {
        const hasInvalid = await locator.evaluate(el => el.matches(':invalid'));
        expect(hasInvalid).toBe(false);

        const valid = await locator.evaluate(el => el.matches(':valid'));
        expect(valid).toBe(true);

        await expect.poll(async () => {
            return await locator.evaluate(el => window.getComputedStyle(el).getPropertyValue('border-color'));
        }, {
            timeout: 3000,
            message: 'Border color should be green for no required input'
        }).toContain(Color.Green); // Expect the border color to be green (valid)
    }

    /**
     * 
     * @param groupName name attribute of radio group
     */
    async expectGroupRadioToBeInValid(groupName: string) {
        const elements = this.page.locator(`//input[@name='${groupName}']/following-sibling::label`);
        const count = await elements.count();
        let countChecked = 0;
        for (let i = 0; i < count; i++) {
            await expect.poll(async () => {
                return await elements.nth(i).evaluate(el => window.getComputedStyle(el).getPropertyValue('color'));  
            }, {
                timeout: 3000,
                message: `Radio button ${i + 1} should be invalid`
            }).toContain(Color.Red); // Expect the color to be red (invalid
        }
    }

    /**
     * 
     * @param groupName name attribute of radio group
     */
    async expectGroupRadioToBeValid(groupName: string) {
        const elements = this.page.locator(`//input[@name='${groupName}']/following-sibling::label`);
        const count = await elements.count();
        let countChecked = 0;
        for (let i = 0; i < count; i++) {
            await expect.poll(async () => {
                return await elements.nth(i).evaluate(el => window.getComputedStyle(el).getPropertyValue('color'));  
            }, {
                timeout: 3000,
                message: `Radio button ${i + 1} should be valid`
            }).toContain(Color.Green); // Expect the color to be green (valid)
        }
    }

    /**
     * 
     * @param groupName name attribute of radio group
     * @param value 
     */
    async selectOptionFromGroupRadio(groupName: string, value: string) {
        const radio = this.page.locator(`//input[@name='${groupName}'][@value='${value}']/following-sibling::label`);
        await radio.click();
        await expect(radio).toBeChecked();
    }
}