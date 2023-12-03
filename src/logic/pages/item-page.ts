import { BasePage } from "./base-page";
import { Locator, Page } from '@playwright/test';

export class ItemPage extends BasePage {
  private readonly ADD_TO_CART_LOCATOR = "button[class='tx-link-a btn_nDwA tx-link_29YD btn_1UzJ btn-yellow_2tf3']";
  private readonly ITEM_NAME_LOCATOR = "div[class='name-and-brand_m2Cb rtl_3N3l']";
  private readonly ITEM_COLOR_NAME_LOCATOR = "span[class='label-dynamic_3Y3S']";
  private readonly COLOR_OPTIONS_LOCATOR = ("//div[@class='color_FYIY']");
  private readonly ITEM_SIZE_LOCATOR = "div[class='label-static_3ya- label-sizes_1dUf']";
  private readonly ITEAM_SIZE_OPTIONS = "div[class='size_1bXM']";


  private itemName: Locator;
  private itemSize: Locator;
  private itemColor: Locator;
  private addToCart: Locator;
  private sizeOptions: Locator;
  private colorOptions: Locator;

  constructor(page: Page) {
    super(page);
    this.addToCart = page.locator(this.ADD_TO_CART_LOCATOR);
    this.itemName = page.locator(this.ITEM_NAME_LOCATOR);
    this.itemColor = page.locator(this.ITEM_COLOR_NAME_LOCATOR);
    this.itemSize = page.locator(this.ITEM_SIZE_LOCATOR);
    this.sizeOptions = page.locator(this.ITEAM_SIZE_OPTIONS);
    this.colorOptions = page.locator(this.COLOR_OPTIONS_LOCATOR);
  }
  async randomNumber() {
   
        const colorOptions = this.colorOptions.locator('div[data-test-id="qa-color-item"]');
        const listSize = await colorOptions.count();
        
        console.log('Number of elements:', listSize);

        if (listSize > 0) {
            const randomIndex = Math.floor(Math.random() * listSize);
            const randomElement = await colorOptions.nth(randomIndex);
           
    try {
      // Wait for the element to be visible with a timeout of 5000 milliseconds (5 seconds)
      await randomElement.waitFor({ state: 'visible', timeout: 5000 });

      // Check if the element is still visible
      if (await randomElement.isVisible()) {
          await randomElement.click();
      }
  } catch (error) {
      console.error('Error:', error);
}
        }
      }
    }