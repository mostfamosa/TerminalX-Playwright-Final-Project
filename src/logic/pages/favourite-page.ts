import { BasePage } from "./base-page";
import { Page, ElementHandle, Locator } from '@playwright/test';

export class FavouritePage extends BasePage {
    private readonly ITEMS_LIST_LOCATOR = "div[class='listing_2tNy']";
    private readonly ITEM_NAME_LOC = (itemname)=> `//a[text()="${itemname}"]`

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
  
  
    private itemBrand: Locator;
    private itemBrandLink: Locator;
    private itemColor: Locator;
    private itemSize: Locator;
    private itemTotalPrice: Locator;
    private regularPriceItem: Locator;
    private finalPriceItem: Locator;
    private discountItem: Locator;
    private quantityItem: Locator;
  
    private itemName : Locator

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
}
