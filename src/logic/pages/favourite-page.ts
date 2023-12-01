import { BasePage } from "./base-page";
import { Locator, Page } from '@playwright/test';

export class FavouritePage extends BasePage {
private readonly ITEMS_LIST_LOCATOR = "";

    constructor(page: Page) {
        super(page)
        async () => { await this.initPage(); }

    }
    async initPage(): Promise<void> {
      await this.page.waitForLoadState('networkidle');
    }
}
