import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class CartPage extends BasePage {
  private readonly ITEM_IN_LIST = (index: number) => {
    return `//[@class="cart-items-list_wmqo"]//div[@class="container_1XqK"][${index}]`;
  };

  private readonly ITEM_BRAND = (index: number) => {
    return `//div[@class="container_1XqK"][${index}]/div/div[1]/div/strong/div`;
  };
  private readonly ITEM_LINK = (index: number) => {
    return `//[@class="cart-items-list_wmqo"]//div[@class="container_1XqK"][${index}]/div[1]/div/div[1]/strong/a`;
  };

  private readonly ITEM_COLOR = (index: number) => {
    return `//div[@class="container_1XqK"][${index}]/div/div[1]/div/div/div[1]/span[@data-test-id="qa-item-color-value"]`;
  };

  private readonly ITEM_SIZE = (index: number) => {
    return `//div[@class="container_1XqK"][${index}]/div/div[1]/div/div/div[2]/span[@data-test-id="qa-item-size-value"]`;
  };

  private readonly TOTAL_PRICE = (index: number) => {
    return `//div[@class="container_1XqK"][${index}]/div/div[@class="cart-item_3yl1 rtl_3YUG"]/div[@class="column_34Ze total-price_rLA-"]`;
  };

  private itemInList: Locator;
  private itemBrand: Locator;
  private itemBrandLink: Locator;
  private itemColor: Locator;
  private itemSize: Locator;
  private itemTotalPrice: Locator;

  constructor(page: Page) {
    super(page);
  }

  async getItemInList(index: number) {
    this.itemInList = this.page.locator(this.ITEM_IN_LIST(index));
    await this.itemInList.click();
  }

  async getItemBrandName(index: number) {
    this.itemBrand = this.page.locator(this.ITEM_BRAND(index));
    await this.itemBrand.textContent();
  }

  async getItemBrandLink(index: number) {
    this.itemBrandLink = this.page.locator(this.ITEM_LINK(index));
    await this.itemBrandLink.textContent();
  }

  async getItemColor(index: number) {
    this.itemColor = this.page.locator(this.ITEM_COLOR(index));
    await this.itemColor.textContent();
  }

  async getItemSize(index: number) {
    this.itemSize = this.page.locator(this.ITEM_SIZE(index));
    await this.itemSize.textContent();
  }

  async getTotalPrice(index: number) {
    this.itemTotalPrice = this.page.locator(this.TOTAL_PRICE(index));
    await this.itemTotalPrice.textContent();
  }
}
