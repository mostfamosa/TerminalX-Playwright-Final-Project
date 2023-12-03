import { BasePage } from "./base-page";
import { Locator, Page } from '@playwright/test';

export class ItemPage extends BasePage {
  private readonly ADD_TO_CART_LOCATOR = "button[class='tx-link-a btn_nDwA tx-link_29YD btn_1UzJ btn-yellow_2tf3']";
  private readonly ITEM_NAME_LOCATOR = "div[class='name-and-brand_m2Cb rtl_3N3l']";
  // private readonly ITEM_COLOR_NAME_LOCATOR = "span[class='label-static_3ya-']";
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
    // this.itemColor = page.locator(this.ITEM_COLOR_NAME_LOCATOR);
    this.itemSize = page.locator(this.ITEM_SIZE_LOCATOR);
    this.sizeOptions = page.locator(this.ITEAM_SIZE_OPTIONS);
    this.colorOptions = page.locator(this.COLOR_OPTIONS_LOCATOR);
  }
   async randomNumber() {
    const listSize = await this.colorOptions.nth(1).locator('div[data-test-id="qa-color-item"]').count();
    console.log('Number of elements:', listSize);
    const randomElement = await Array[Math.floor(Math.random() * listSize)];
     await randomElement.click();
  }
      



//    }


//   // private async getAvailableItems(): Promise<string[]> {
//   //   const sizeElements = await this.page.locator(this.COLOR_OPTIONS_LOCATOR).all();
//   //   const sizes = await Promise.all(sizeElements.map(async (sizeElement) => {
//   //     const textContent = await sizeElement.textContent();
//   //     const classList = await sizeElement.getAttribute('class');
//   //     const isAvailable = !classList?.includes('not-available_3iVZ');
  
//   //     return isAvailable ? (textContent !== null ? textContent : '') : null;
//   //   }));
  
//   //   return sizes.filter((size) => size !== null) as string[];
//   // }
  

//   // private getRandomNumber(sizes: string[]): string | null {
//   //   if (sizes.length === 0) {
//   //     return null; 
//   //   }
//   //   const randomIndex = Math.floor(Math.random() * sizes.length);
//   //   return sizes[randomIndex];
//   // }
//   // public async chooseRandomColor(): Promise<string | null> {
//   //   const availableColors = await this.getAvailableItems();
//   //   const randomColor = this.getRandomNumber(availableColors);
  
//   //   if (randomColor !== null) {
//   //     const colorElement = await this.colorOptions.locator(`:has-text("${randomColor}")`).first();
//   //     await colorElement.click();
//   //     console.log(`Clicked on color: ${randomColor}`);
//   //   } else {
//   //     console.log('No available colors.');
//   //   }
  
//   //   return randomColor;
//   // }
  



  

//    async ChooseColor() {
//     // const outOfStouck = this.page.locator("form.black-box_2mpQ")
//     const myColor = this.page.locator('//div[@class="color_FYIY"]').nth(1);
//     const theColor= await myColor[0].waitFor({ state: 'visible', timeout: 5000 });
//     await theColor.click();

//   //   if (await outOfStouck.isVisible()) {
//   //     console.log(`Color ${color} is out of stock.`);
//   //   }
//   //   else {
//   //     console.log(`${color} Selected`);
//   //     return color;
    
//   // }
//   }
//   ////////////////////////////////////////////////////////////////////

//   // private async getAvailableSizes(): Promise<string[]> {
//   //   const sizeElements = await this.page.locator(this.ITEAM_SIZE_OPTIONS).all();
//   //   const sizes = await Promise.all(sizeElements.map(async (sizeElement) => {
//   //     const textContent = await sizeElement.textContent();
//   //     const classList = await sizeElement.getAttribute('class');
//   //     const isAvailable = !classList?.includes('not-available_3iVZ');
  
//   //     return isAvailable ? (textContent !== null ? textContent : '') : null;
//   //   }));
  
//   //   return sizes.filter((size) => size !== null) as string[];
//   // }
  

//   // private getRandomSize(sizes: string[]): string | null {
//   //   if (sizes.length === 0) {
//   //     return null; 
//   //   }
//   //   const randomIndex = Math.floor(Math.random() * sizes.length);
//   //   return sizes[randomIndex];
//   // }


//   // public async chooseRandomSize(): Promise<string | null> {
//   //   const availableSizes = await this.getAvailableItems();
//   //   const randomSize = this.getRandomNumber(availableSizes);
//   //   if (randomSize !== null) {
//   //     console.log(`Selected random size: ${randomSize}`);
//   //     const sizeElement = await this.sizeOptions.locator(`div[title="${randomSize}"]`).first();
//   //     await sizeElement.click();
//   //     console.log(`Clicked on size: ${randomSize}`);
//   //   } else {
//   //     console.log('No available sizes.');
//   //   }
//   //   return randomSize;
//   // }

//    async ChooseSizer(size: number) {
//     const outOfStouck = this.page.locator("form.black-box_2mpQ")
//     const mySize = this.sizeOptions.locator(`:has-text("${size}")`);
//     await mySize.click();

//     if (await outOfStouck.isVisible()) {
//       console.log(`Size ${size} is out of stock.`);
//     }
//     else {
//       console.log(`${size} Selected`);
//       return size;
//     }

  
//    async ClickAddToCart() {
//     await this.addToCart.click();
//    }
//   }
