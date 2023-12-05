import { BasePage } from "./base-page";
import { Locator, Page } from '@playwright/test';

export class ItemPage extends BasePage {
    private readonly ITEM_IN_LIST = (index: number) => {
        return `//*[@class="product-list_yyTm"]//li[${index}]`;
    };
    private readonly SIZE_OPTIONS = "(//div[@class='size_1bXM'])//div[@data-test-id = 'qa-size-item']";
    private readonly COLOR_OPTIONS = ".color_FYIY .color-item_1Y2Y";
    private readonly TITLE = "h1[class='name_20R6']";
    private readonly ADD_TO_CART = "button[class='tx-link-a btn_nDwA tx-link_29YD btn_1UzJ btn-yellow_2tf3']";
    private readonly OVER_VIEW = "//div[@class='btn-quick_3Pv7 btn-quick-view_2SXw']";


    private itemInList: Locator;
    private addToCart: Locator;
    private sizeList: Locator;
    private colorList: Locator;
    private itemName: Locator;
    private itemDetails: { name?: string, color?: string, size?: string } = {};


    constructor(page: Page) {
        super(page)
        this.addToCart = this.page.locator(this.ADD_TO_CART);
        this.sizeList = this.page.locator(this.SIZE_OPTIONS);
        this.colorList = this.page.locator(this.COLOR_OPTIONS);
        this.itemName = this.page.locator(this.TITLE);
        this.itemDetails = {};


    }

    async clickrRandomItem(index: number) {
        const overView = this.page.locator(this.OVER_VIEW).nth(index);
        await overView.click();
    }

    async getItemDetails() {
        await this.getItemName();
        await this.chooseColor();
        await this.chooseSize();
        return this.itemDetails;
    }

    private async getItemName() {
        const name = await this.itemName.textContent();
        if (name) {
            this.itemDetails.name = name;
        }
    }
    private async chooseColor() {
        const colorTextContent = await this.selectRandomColor();
        if (colorTextContent) {
            this.itemDetails.color = colorTextContent;
        }
    }
    private async chooseSize() {
        const sizeTextContent = await this.selectRandomSize();
        if (sizeTextContent) {
            this.itemDetails.size = sizeTextContent;
        }
    }
    async ClickAddToCart() {
        const cart = this.addToCart;
        await cart.click();
        console.log(this.itemDetails);
    }


    private async selectRandomColor() {
        const colors = this.colorList;
        const colorsCount = await colors.count();
        if (colorsCount > 1) {
            const randomColorIndex = Math.floor(Math.random() * colorsCount);
            const randomColor = colors.nth(randomColorIndex);
            await randomColor.click();
            const randomColorTitle = await randomColor.getAttribute('title');
            if (randomColorTitle != null)
                return randomColorTitle;

            // if the item has on color option
        } else if (colorsCount === 1) {
            const onlyColor = colors.nth(0);
            const onlyColorTextContent = await onlyColor.getAttribute('title');
            if (onlyColorTextContent != null)
                return onlyColorTextContent;
        }
        console.log("No Colors Found!"); //i added this for debugging
    }


    private async selectRandomSize(): Promise<string | null> {
        const sizeElements = this.sizeList;
        const randomSizeIndex = Math.floor(Math.random() * await sizeElements.count());
        const randomSize = sizeElements.nth(randomSizeIndex);
        await randomSize.click();

        const randomSizeTextContent = await randomSize.textContent();
        return randomSizeTextContent;
    }

}

