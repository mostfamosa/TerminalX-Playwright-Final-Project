import { BasePage } from "./base-page";
import { Page, ElementHandle, Locator } from '@playwright/test';
import { urls } from '../../config/pages-urls.json'

export class FavouritePage extends BasePage {
  private readonly ITEMS_LIST_LOCATOR = "div[class='listing_2tNy']";
  private readonly ITEM_NAME_LOC = (itemname) => `//a[text()="${itemname}"]`

  private readonly CART = "//div[@class='listing_2tNy']";
  private readonly ITEMS_CARD = "//li[@class='wishlist-product_2rk-']";
  private readonly ITEMS_NAME_LINK = `(//a[contains(@class,'tx-link-a title_3ZxJ')])`;
  private readonly ITEM_BRAND = (index: number) => `//li[${index}]//div[@class="right_1o65"]//span`;
  private readonly ITEM_COLOR = (index: number) => `(//div[@class='wrap_3QMJ rtl_2lAP'])[${index}]//span[contains(text(),'צבע')]`;
  private readonly ITEM_SIZE = (index: number) => `(//div[@class='wrap_3QMJ rtl_2lAP'])[${index}]//span[contains(text(),'מידה')]`;
  private readonly REGULAR_PRICE_ITEM = (index: number) => `//li[${index}]//div[@class='row_2tcG strikethrough_t2Ab regular-price_35Lt']`;
  private readonly FINAL_PRICE_ITEM = (index: number) => `//li[${index}]//div[@class='row_2tcG bold_2wBM final-price_8CiX']`;
  private readonly DISCOUNT_ITEM = (index: number) => `//li[${index}]//a[@class='tx-link-a stampa-sales_3ITt rtl_1_TU link_3vu6 tx-link_29YD']`;


  private itemBrand: Locator;
  private itemColor: Locator;
  private itemSize: Locator;
  private regularPriceItem: Locator;
  private finalPriceItem: Locator;
  private discountItem: Locator;

  private itemName: Locator

  constructor(page: Page) {
    super(page);
  }


  async itemInTheList(itemname: string): Promise<boolean> {
    // i want to check if the itemname exists in the list ITEMS_LIST_LOCATOR
    this.itemName = this.page.locator(this.ITEM_NAME_LOC(itemname))
    if (this.itemName != null) {
      console.log(await this.itemName.textContent());
      return true;
    }
    else {
      console.log('null')
      return false
    }

  }
  async findItemIndexByNameLink(nameLink: string) {
    await this.page.waitForSelector(this.ITEMS_CARD)
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


  //todo: add if not found//
  async getItemColor(index: number) {
    this.itemColor = this.page.locator(this.ITEM_COLOR(index));
    let color = await this.itemColor.textContent();
    if (color != null)
      return color

  }

  async getItemSize(index: number) {
    this.itemSize = this.page.locator(this.ITEM_SIZE(index));
    let size = await this.itemSize.textContent();
    if (size != null)
      return size
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

  async navigateTo() {
    await this.page.goto(urls.my_list_page);
  }
}
