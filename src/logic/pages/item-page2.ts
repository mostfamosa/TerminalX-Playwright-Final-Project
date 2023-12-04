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
        const itemDetails: string[] = [];

        this.itemInList = await this.page.locator(this.ITEM_IN_LIST(index));
        await this.itemInList.hover({ timeout: 5000 });

        await this.page.waitForTimeout(3000);
        const overView = await this.page.locator(this.OVER_VIEW).nth(index);
        await overView.click();

        await this.page.waitForTimeout(3000);

        // const colorTextContent = await this.selectAndClickColor();
        // if (colorTextContent) {
        //     itemDetails.push(colorTextContent);
        // }
        await this.page.waitForTimeout(3000);
        const colors = await this.page.locator("//div[@class='color_FYIY']").nth(0);
        await colors.click();
        console.log(colors);

        
        // const sizeTextContent = await this.selectAndClickSize();
        // if (sizeTextContent) {
        //     itemDetails.push(sizeTextContent);
        // }

        const cart = await this.page.locator("button[class='tx-link-a btn_nDwA tx-link_29YD btn_1UzJ btn-yellow_2tf3']");
        await cart.click();

        console.log(itemDetails);
    }

    // private async selectAndClickColor(): Promise<string | null> {
        
    //     const colors = await this.page.locator("//div[@class='color_FYIY']");
        
    //     const randomColorIndex = Math.floor(Math.random() * await colors.count());
    //     const randomColor = colors.nth(2);
    //     await randomColor.click();
    //     await randomColor.waitFor({ state: 'visible' });
    //     const randomColorTextContent = await randomColor.textContent();
    //     return randomColorTextContent;
    // }

//     // private async selectAndClickSize(): Promise<string | null> {
//     //     const sizeElements = await this.page.locator("div[class='size_1bXM'] .size-item_1Sai");
//     //     const randomSizeIndex = Math.floor(Math.random() * await sizeElements.count());
//     //     const randomSize = sizeElements.nth(randomSizeIndex);
//     //     await randomSize.click();
//     //     await randomSize.waitFor({ state: 'visible' });
//     //     const randomSizeTextContent = await randomSize.textContent();
//     //     return randomSizeTextContent;
//     // }
// }
