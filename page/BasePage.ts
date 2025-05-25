import { Page } from "@playwright/test";

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
}