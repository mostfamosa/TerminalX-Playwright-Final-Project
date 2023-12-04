import { BasePage } from "./base-page";
import { Locator, Page } from '@playwright/test';

export class ItemPagee extends BasePage {
    private readonly ITEM_IN_LIST = (index: number) => {
        return `//*[@class="product-list_yyTm"]//li[${index}]`;
    };
    private OVER_VIEW = "//div[@class='btn-quick_3Pv7 btn-quick-view_2SXw']";
    private itemInList: Locator;

    constructor(page: Page) {
        super(page)
    }

    async hoverOverRandomItem(index: number) {
        // const itemDetails: string[] = [];
        const itemDetails: { name?: string ,color?: string, size?: string } = {};

        this.itemInList = await this.page.locator(this.ITEM_IN_LIST(index));
        await this.itemInList.hover({ timeout: 5000 });

        await this.page.waitForTimeout(3000);
        const overView = await this.page.locator(this.OVER_VIEW).nth(index);
        await overView.click();

        await this.page.waitForTimeout(3000);

        const name= await this.page.locator("h1[class='name_20R6']").textContent();
        if(name){
            itemDetails.name= name;
        }

        const colorTextContent = await this.selectRandomColor();
        if ( colorTextContent) {
            itemDetails.color=colorTextContent;
           
        }
        await this.page.waitForTimeout(1000);
      
        
        const sizeTextContent = await this.selectRandomSize();
        if (sizeTextContent) {
            itemDetails.size= sizeTextContent;
        }

        const cart = await this.page.locator("button[class='tx-link-a btn_nDwA tx-link_29YD btn_1UzJ btn-yellow_2tf3']");
        await cart.click();

        console.log(itemDetails);
    }

    private async selectRandomColor(): Promise<string | null> {
        const colors = await this.page.locator(".color_FYIY .color-item_1Y2Y");
        const colorsCount = await colors.count();
        if (colorsCount > 1) {
            const randomColorIndex = Math.floor(Math.random() * colorsCount);
            const randomColor = colors.nth(randomColorIndex);
            await randomColor.click();
            await this.page.waitForTimeout(1000);
            
            await randomColor.waitFor({ state: 'visible' });
            const randomColorTitle = await randomColor.getAttribute('title');
            return randomColorTitle || '';

            // if the item has on color option
        } else if (colorsCount === 1) {
            const onlyColor = await colors.nth(0);
            const onlyColorTextContent = await onlyColor.getAttribute('title');
               return onlyColorTextContent || '';
        }
        console.log("No Colors Found!"); //i added this for debugging
        return null;
    }
    
    private async selectRandomSize(): Promise<string | null> {
        const sizeElements = await this.page.locator("div[class='size_1bXM'] .size-item_1Sai");
        const randomSizeIndex = Math.floor(Math.random() * await sizeElements.count());
        const randomSize = sizeElements.nth(randomSizeIndex);
        await randomSize.click();
        await randomSize.waitFor({ state: 'visible' });
        const randomSizeTextContent = await randomSize.textContent();
        return randomSizeTextContent;
    }

 
}