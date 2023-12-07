import { chromium, Browser, BrowserContext, Page } from 'playwright';
import { BasePage } from '../logic/pages/base-page';

export class BrowserWrapper {
    private browser: Browser | null = null;
    private context: BrowserContext | null = null;
    private page: Page | null = null;

    async launch() {
        this.browser = await chromium.launch();
        this.context = await this.browser.newContext();
        this.page = await this.context.newPage();
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