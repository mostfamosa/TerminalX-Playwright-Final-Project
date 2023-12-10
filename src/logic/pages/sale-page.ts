import { BasePage } from "./base-page";
import { Locator, Page } from '@playwright/test';
import { urls } from '../../config/pages-urls.json'


export class SalePage extends BasePage {
  private readonly ITEM_IN_LIST = (index: number) => {
    return `//*[@class="product-list_yyTm"]//li[${index}]`;
  };
  private OVER_VIEW = "//div[@class='btn-quick_3Pv7 btn-quick-view_2SXw']";
  private ACTUAL_PRICE = '//*[@class="row_2tcG strikethrough_t2Ab prices-regular_yum0"]';
  private SALE_PRECENTAGE = "//*[@class='tx-link-a stampa-sales_2O4Q link_3vu6 tx-link_29YD']";
  private FINAL_PRICE = "//*[@class='row_2tcG bold_2wBM prices-final_1R9x']";
  private PRODUCT_NAME = "//h1[@class='name_20R6']";


  private itemInList: Locator;
  private ActualPrice: Locator;
  private SalePrecentage: Locator;
  private FinalPrice: Locator;
  private ProductName: Locator;

  constructor(page: Page) {
    super(page);
    this.ActualPrice = this.page.locator(this.ACTUAL_PRICE);
    this.SalePrecentage = this.page.locator(this.SALE_PRECENTAGE);
    this.FinalPrice = this.page.locator(this.FINAL_PRICE);
    this.ProductName = this.page.locator(this.PRODUCT_NAME);
  }

  async hoverOverRandomItem(index: number) {
    this.itemInList = await this.page.locator(this.ITEM_IN_LIST(index));
    await this.itemInList.hover({ timeout: 5000 });

    await this.page.waitForTimeout(3000);
    const overView = await this.page.locator(this.OVER_VIEW).nth(index);
    await overView.click();

    const priceArray: string[] = [];

    const productname = await this.ProductName.textContent() ?? 'N/A'
    priceArray.push(productname);
    console.log(productname);

    const priceText = await this.ActualPrice.textContent() ?? 'N/A';
    priceArray.push(priceText);
    console.log(priceText);

    const saleText = await this.SalePrecentage.textContent() ?? 'N/A';
    priceArray.push(saleText);
    console.log(saleText);

    const finalText = await this.FinalPrice.textContent() ?? 'N/A';
    priceArray.push(finalText);
    console.log(finalText);

    return priceArray;
  }

  async navigateTo() {
    await this.page.goto(urls.on_sale_page);
  }
}