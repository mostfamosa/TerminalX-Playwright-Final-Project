import { BasePage } from "./base-page";
import { Page, ElementHandle, Locator } from '@playwright/test';

export class FavouritePage extends BasePage {
    private readonly ITEMS_LIST_LOCATOR = "div[class='listing_2tNy']";

    constructor(page: Page) {
        super(page);
    }



    async itemInTheList(itemname: string): Promise<boolean> {
        // i want to check if the itemname exists in the list ITEMS_LIST_LOCATOR
        const item = this.page.locator(`//a[text()="${itemname}"]`);
        if (item != null) {
            console.log(await item.textContent());
            return true;
        }
        else {
            console.log('null')
            return false
        }


    }
}
