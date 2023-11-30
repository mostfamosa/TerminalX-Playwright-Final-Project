import { BasePage } from "./base-page";
import { Locator, Page } from '@playwright/test';

export class ItemPage extends BasePage {
    private readonly ADD_TO_CART_LOCATOR = "button[class='tx-link-a btn_nDwA tx-link_29YD btn_1UzJ btn-yellow_2tf3']";
    private readonly ITEM_NAME_LOCATOR = "div[class='name-and-brand_m2Cb rtl_3N3l']";
    private readonly ITEM_COLOR_NAME_LOCATOR="span[class='label-static_3ya-']";
    private readonly COLOR_OPTIONS_LOCATOR = "div[class='color_FYIY']";
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
      async () => { await this.initPage(); }

}
async initPage(): Promise<void> {
  await this.page.waitForLoadState('networkidle');
}

private async ChooseColor(color: string){
  const outOfStouck = this.page.locator("form.black-box_2mpQ")
  const myColor = this.colorOptions.locator(`:has-text("${color}")`);
 await myColor.click();
 
 if(await outOfStouck.isVisible()){
  console.log(`Color ${color} is out of stock.`);
 }
  else{
    console.log(`${color} Selected`);
 return color;
  }
}

private async ChooseSizer(size: number){
  const outOfStouck = this.page.locator("form.black-box_2mpQ")
  const mySize = this.sizeOptions.locator(`:has-text("${size}")`);
    await mySize.click();

    if(await outOfStouck.isVisible()){
      console.log(`Size ${size} is out of stock.`);
    }
    else{
      console.log(`${size} Selected`);
      return size;
    }

    
  }

  private async ClickAddToCart(){
    await this.addToCart.click();
  }

}

