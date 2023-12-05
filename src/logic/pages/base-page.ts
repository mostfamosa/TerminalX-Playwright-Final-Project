import { Page } from '@playwright/test';
import { urls } from '../../config/pages-urls.json'

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateTo(url: string) {
        await this.page.goto(url);
    }

    async getTitle() {
        return await this.page.title();
    }

    async getCurrentUrl() {
        return this.page.url();
    }

    async waitForLoad() {
        await this.page.waitForLoadState('load');
    }

    async switchToNewTab() {
        await this.page.bringToFront();
    }

    async search(searchKey: string) {
        await this.navigateTo(urls.search_page + searchKey);
    }
}