import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";
import { urls } from '../../config/pages-urls.json'


export class CartPage extends BasePage {

  private readonly CART = "//div[@class='cart-items-list_wmqo']";
  private readonly ITEMS_CARD = "//div[@class='container_1XqK']";
  private readonly ITEMS_NAME_LINK = "(//a[@class='tx-link-a name_1GBQ tx-link_29YD'])";
  private readonly ITEM_BRAND = (index: number) => `//div[@class="container_1XqK"][${index}]/div/div[1]/div/strong/div`;
  private readonly ITEM_LINK = (index: number) => `(//a[@class='tx-link-a name_1GBQ tx-link_29YD'])[${index}]`;
  private readonly ITEM_COLOR = (index: number) => `//div[@class="container_1XqK"][${index}]/div/div[1]/div/div/div[1]/span[@data-test-id="qa-item-color-value"]`;
  private readonly ITEM_SIZE = (index: number) => `//div[@class="container_1XqK"][${index}]/div/div[1]/div/div/div[2]/span[@data-test-id="qa-item-size-value"]`;
  private readonly TOTAL_PRICE_ITEM = (index: number) => `//div[@class="container_1XqK"][${index}]/div/div[@class="cart-item_3yl1 rtl_3YUG"]/div[@class="column_34Ze total-price_rLA-"]`;
  private readonly REGULAR_PRICE_ITEM = (index: number) => `(//div[@class='row_2tcG strikethrough_t2Ab price_kIgR'])[${index}]`;
  private readonly FINAL_PRICE_ITEM = (index: number) => `(//div[@class='row_2tcG bold_2wBM price-final_13zw'])[${index}]`;
  private readonly DISCOUNT_ITEM = (index: number) => `(//a[@class='tx-link-a stampa-sales_3gHT link_3vu6 tx-link_29YD'])[${index}]`;
  private readonly QUANTITY_ITEM = (index: number) => `(//div[@class='select-container_tSy-'])[${index}]`;
  private readonly DELETE_ITEM_BY_INDEX = (index: number) => `(//button[@class='tx-link-a icon_u36n remove_wqPe tx-link_29YD'])[${index}]`;


  private itemBrand: Locator;
  private itemBrandLink: Locator;
  private itemColor: Locator;
  private itemSize: Locator;
  private itemTotalPrice: Locator;
  private regularPriceItem: Locator;
  private finalPriceItem: Locator;
  private discountItem: Locator;
  private quantityItem: Locator;

  constructor(page: Page) {
    super(page);
    page.locator(this.CART);
  }

  async findItemIndexByNameLink(nameLink: string) {
    await this.page.waitForSelector(this.ITEMS_CARD);
    for (let i = 1; i <= await this.page.locator(this.ITEMS_CARD).count(); i++) {
      let currentName = await this.page.locator(`${this.ITEMS_NAME_LINK}[${i}]`).textContent();
      if (currentName === nameLink)
        return i;
    }
    console.log(`The Name: ${nameLink} is not found!`);
  }

  async getItemBrandName(index: number) {
    this.itemBrand = this.page.locator(this.ITEM_BRAND(index));
    return await this.itemBrand.textContent();
  }

  async getItemBrandLink(index: number) {
    this.itemBrandLink = this.page.locator(this.ITEM_LINK(index));
    return await this.itemBrandLink.textContent();
  }

  async getItemColor(index: number) {
    this.itemColor = this.page.locator(this.ITEM_COLOR(index));
    return await this.itemColor.textContent();
  }

  async getItemSize(index: number) {
    this.itemSize = this.page.locator(this.ITEM_SIZE(index));
    return await this.itemSize.textContent();
  }

  async getItemTotalPrice(index: number) {
    this.itemTotalPrice = this.page.locator(this.TOTAL_PRICE_ITEM(index));
    let price = await this.itemTotalPrice.textContent();
    if (price != null)
      return parseFloat(price);
  }

  async getItemRegularPrice(index: number) {
    this.regularPriceItem = this.page.locator(this.REGULAR_PRICE_ITEM(index));
    let price = await this.regularPriceItem.textContent();
    if (price != null)
      return parseFloat(price);
  }

  async getItemFinalPrice(index: number) {
    this.finalPriceItem = this.page.locator(this.FINAL_PRICE_ITEM(index));
    let price = await this.finalPriceItem.textContent();
    if (price != null)
      return parseFloat(price);
  }

  async getItemDiscountPercentage(index: number) {
    this.discountItem = this.page.locator(this.DISCOUNT_ITEM(index));
    let price = await this.discountItem.textContent();
    if (price != null)
      return parseFloat(price);
  }

  async getItemQuantity(index: number) {
    await this.page.locator(this.QUANTITY_ITEM(index)).waitFor();
    this.quantityItem = this.page.locator(this.QUANTITY_ITEM(index));
    const selectedValue = await this.quantityItem.evaluate((selectElement) => {
      if (selectElement instanceof HTMLSelectElement) {
        return selectElement.value;
      }
    });
    return selectedValue;
  }
  async deleteItem(index: number) {
    const deletLocat = this.page.locator(this.DELETE_ITEM_BY_INDEX(index));
    await deletLocat.click();
    
  }
  async navigateTo() {
    await this.page.goto(urls.my_cart_page);
  }
}
