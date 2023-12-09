import { Page } from '@playwright/test';
import { urls } from '../../config/pages-urls.json'

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateTo() {
        await this.page.goto(urls.base_page);
    }

    async getTitle() {
        return await this.page.title();
    }

    async getCurrentUrl() {
        return this.page.url();
    }

    async reload() {
        await this.page.reload();
    }

    async waitForLoad() {
        await this.page.waitForLoadState('load');
    }

    async switchToNewTab() {
        await this.page.bringToFront();
    }

    async goTo(url: string) {
        await this.page.goto(url);
    }

    async search(searchKey: string) {
        await this.goTo(urls.search_page + searchKey);
    }
}