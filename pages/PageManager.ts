import { Page } from "playwright-core";
import { HomePage } from "./HomePage";

export class PageManager {
    private homePage?: HomePage;

    constructor (private page: Page) {};

    /**
     * Initation Home Page
     * @returns 
     */
    getHomePage() {
        if(!this.homePage) {
            this.homePage = new HomePage(this.page);
        }
        return this.homePage;
    }
}