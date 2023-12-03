import { BasePage } from "./base-page";
import { Locator, Page } from '@playwright/test';

export class ItemPage extends BasePage {
  private readonly ADD_TO_CART_LOCATOR = "button[class='tx-link-a btn_nDwA tx-link_29YD btn_1UzJ btn-yellow_2tf3']";
  private readonly ITEM_NAME_LOCATOR = "div[class='name-and-brand_m2Cb rtl_3N3l']";
  private readonly ITEM_COLOR_NAME_LOCATOR = "span[class='label-dynamic_3Y3S']";
  private readonly COLOR_OPTIONS_LOCATOR = ("//div[@class='color_FYIY']");
  private readonly ITEM_SIZE_LOCATOR = "div[class='size_1bXM']";
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
  async RandomColor() {
    try{
    const colorOption = this.colorOptions.locator('div[data-test-id="qa-color-item"]');
    const listSize = await colorOption.count();
    console.log("the list size: ", listSize);

    if (listSize > 0) {
        const randomIndex = Math.floor(Math.random() * listSize);
        const randomElement = await colorOption.nth(randomIndex);
        
        
            // Wait for the element to be visible with a timeout of 5000 milliseconds (5 seconds)
            await randomElement.waitFor({ state: 'visible', timeout: 10000 });

            // Check if the element is still visible
            if (await randomElement.isVisible()) {
                const randomColor = await this.itemColor.textContent();
                console.log('Random Color:', randomColor);

                await randomElement.click();
            }
          }
        } catch (error) {
            console.error('Error:', error);
        }
    }


async CHooseSize(){
  try{
  const sizeOption = await this.sizeOptions.locator("div[class='size-item_1Sai rtl_3a50']");
  const listSize = await sizeOption.count();
  console.log("the list size: ", listSize);

  if (listSize > 0) {
    const randomIndex = Math.floor(Math.random() * listSize);
    await sizeOption.waitFor({ state: 'visible', timeout: 15000 });

    const randomElement = await sizeOption.nth(randomIndex);
      await randomElement.waitFor({ state: 'visible', timeout: 10000 });

      if (await randomElement.isVisible()) {
          const randomSize = await this.itemSize.textContent();
          console.log('Random size:', randomSize);

          await randomElement.click();
      }
    }
  } catch (error) {
      console.error('Error:', error);
  }
    }
    async ClickAddToCart(){
      this.addToCart.click();

    }
    async getItemName(){
      return (this.itemName.textContent);
    }

      }
