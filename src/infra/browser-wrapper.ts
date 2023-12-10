import { chromium, Browser, BrowserContext, Page } from 'playwright';
import { BasePage } from '../logic/pages/base-page';

export class BrowserWrapper {
    private browser: Browser | null = null;
    private context: BrowserContext | null = null;
    private page: Page | null = null;

    async createNewPage<T extends BasePage>(pageClass: new (page: Page) => T) {
        if (!this.browser) {
            this.browser = await chromium.launch();
        }
        if (!this.context) {
            this.context = await this.browser.newContext();
        }
        if (!this.page) {
            this.page = await this.context.newPage();
        }

        const pageInstance = new pageClass(this.page);
        await pageInstance.navigateTo();

        return pageInstance;
    }

    async navigate(pageInstance: BasePage) {
        if (!this.page) {
            throw new Error('Browser is not launched. Call launch() first.');
        }

        if (!(pageInstance instanceof BasePage)) {
            throw new Error('The provided page instance must be an instance of BasePage.');
        }

        await pageInstance.navigateTo();
    }

    async close() {
        if (this.browser) {
            await this.browser.close();
        }
    }

    async closePage() {
        if (this.page) {
            await this.page.close();
            this.page = null;
        }
    }

    async closeContext() {
        if (this.context) {
            await this.context.close();
            this.context = null;
        }
    }

    async reloadPage() {
        if (!this.page) {
            throw new Error('Browser is not launched. Call launch() first.');
        }
        await this.page.reload();
    }

    async getPage() {
        if (!this.page) {
            throw new Error('Browser is not launched. Call launch() first.');
        }
        return this.page;
    }

    async setPage(page: Page) {
        this.page = page;
    }


    async getContext() {
        if (!this.context) {
            throw new Error('Browser is not launched. Call launch() first.');
        }
        return this.context;
    }

    async setToFullScreen() {
        if (!this.page) {
            throw new Error('Browser is not launched. Call launch() first.');
        }
        await this.page.setViewportSize({ width: 1920, height: 1080 });
    }
}