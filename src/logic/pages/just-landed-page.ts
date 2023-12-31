import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";
import { urls } from '../../config/pages-urls.json'

export class JustLanded extends BasePage {
  private readonly ITEM_IN_LIST = (index: number) => {
    return `//*[@class="product-list_yyTm"]//li[${index}]`;
  };

  private readonly ADD_TO_FAVOURITE = (index: number) => {
    return `(//div[@class='btn-quick_3Pv7 btn-my_list_2EOz'])[${index}]`;
  };


  private itemInList: Locator;
  private addToFavourite: Locator;

  constructor(page: Page) {
    super(page);
  }

  async clickOnRandomItem(index: number) {
    this.itemInList = await this.page.locator(this.ITEM_IN_LIST(index));
    await this.itemInList.click();
    await this.page.waitForTimeout(3000);
  }


  async clickOnAddToFavourite(index: number) {
    this.addToFavourite = this.page.locator(this.ADD_TO_FAVOURITE(index));
    await this.addToFavourite.click();
  }

  async navigateTo() {
    await this.page.goto(urls.just_landed_page);
  }
}
