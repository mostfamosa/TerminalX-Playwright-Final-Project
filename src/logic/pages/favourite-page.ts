import { BasePage } from "./base-page";
import { Page, ElementHandle, Locator } from '@playwright/test';

export class FavouritePage extends BasePage {
    private readonly ITEMS_LIST_LOCATOR = "div[class='listing_2tNy']";

    constructor(page: Page) {
        super(page);
        (async () => {
            await this.initPage();
        })();
    }

    async initPage(): Promise<void> {
        await this.page.waitForSelector("div[class='title-wrap_2RT2']");
        const innerText = await this.page.innerText("div[class='title-wrap_2RT2']");
    }

    async itemInTheList(itemname: string): Promise<boolean> {
        // i want to check if the itemname exists in the list ITEMS_LIST_LOCATOR

        const listItems = await this.page.locator(this.ITEMS_LIST_LOCATOR).all();
        const itemNames: string[] = [];

        for (const listItem of listItems) {
            const nameElement = await listItem.locator("a[class='tx-link-a title_3ZxJ tx-link_29YD underline-hover_3GkV']");
            if (nameElement) {
                const itemName = await nameElement.innerText();
                itemNames.push(itemName);
            }
        }
        if (itemNames.includes(itemname)) {
            return true;
        }

        return false;
    }
}
