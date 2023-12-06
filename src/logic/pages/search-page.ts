import { BasePage } from "./base-page";
import { Locator, Page } from '@playwright/test';

export class SearchPage extends BasePage {

    private readonly ITEM_IN_LIST = `//*[@class="product-list_yyTm"]//li`;
    private readonly ITEM_BRAND_NAME = `//div[@class='right_1o65']//span`;
    private readonly ITEM_DESCRIPTION = `//div[@class='right_1o65']//a`;
    private readonly SEARCH_TITLE = `//div[@data-test-id='qa-search-results-page-title']`;

    private itemCard: Locator;
    private randomItem: Locator;
    private randomItemBrand: Locator;
    private searchTitle: Locator;

    constructor(page: Page) {
        super(page);
        this.itemCard = page.locator(this.ITEM_IN_LIST);
        this.searchTitle = page.locator(this.SEARCH_TITLE);
    }

    private async getRandomItem() {
        let index = Math.floor(Math.random() * await this.itemCard.count());
        if (index == 9)//Ads always in this position
            index++;
        this.randomItem = this.page.locator(`${this.ITEM_IN_LIST}[${index}]`);
        return this.randomItem;
    }

    async getRandomItemBrand() {
        this.randomItemBrand = (await this.getRandomItem()).locator(this.ITEM_BRAND_NAME);
        return await this.randomItemBrand.textContent();
    }

    async getRandomItemDescription() {
        this.randomItemBrand = (await this.getRandomItem()).locator(this.ITEM_DESCRIPTION);
        return await this.randomItemBrand.textContent();
    }

    async getTitleText() {
        return await this.searchTitle.textContent();
    }
}