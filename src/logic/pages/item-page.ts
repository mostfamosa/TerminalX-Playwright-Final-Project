import { BasePage } from "./base-page";
import { Locator, Page } from '@playwright/test';
import { urls } from '../../config/pages-urls.json'


export class ItemPage extends BasePage {
    private readonly SIZE_OPTIONS = "(//div[@class='size_1bXM'])//div[@data-test-id = 'qa-size-item']";
    private readonly COLOR_OPTIONS = ".color_FYIY .color-item_1Y2Y";
    private readonly TITLE = 'h1[data-test-id="qa-pdp-name"]';
    private readonly ADD_TO_CART = "button[class='tx-link-a btn_nDwA tx-link_29YD btn_1UzJ btn-yellow_2tf3']";
    private readonly OVER_VIEW = "//div[@class='btn-quick_3Pv7 btn-quick-view_2SXw']";
    private readonly IMAGE_URL = "div.image-container_3NPt img.image_3k9y"
    private readonly COLOR_TITLE = "span[class='label-dynamic_3Y3S']"
    private readonly PRECENTAGE_SALE = "//a[@class='tx-link-a stampa-sales_3ITt rtl_1_TU link_3vu6 tx-link_29YD']";
    private readonly FINAL_PRICE = "div[class='row_2tcG bold_2wBM final-price_8CiX']";
    private readonly ACTUALL_PRICE = "div[class='row_2tcG strikethrough_t2Ab regular-price_35Lt']";
    private readonly ITEM_TAG = "span[class='black-bg_2mJm']";
    private readonly BRAND = "div.right_1o65";
    // private readonly NAME_LOC = "[class='tx-link-a title_3ZxJ tx-link_29YD underline-hover_3GkV']";
    private readonly RANDOM_NAME = "a[class='tx-link-a title_3ZxJ tx-link_29YD underline-hover_3GkV']";

    private nameLocator: Locator
    private randomTitle:Locator;
    private brandlocator: Locator
    private itemtag: Locator;
    private finalprice: Locator;
    private precentagesale: Locator;
    private actuallprice: Locator;
    private colorName: Locator;
    private imgUrl: Locator;
    private addToCart: Locator;
    private sizeList: Locator;
    private colorList: Locator;
    private itemName: Locator;
    private itemDetails: { name?: string, color?: string, size?: string, tag?: string, Itembrand?: string, finalprice?: string, actualprice?: string, sale?: string, colortiltle?: string, itemUrl?: string };

    constructor(page: Page) {
        super(page)
        this.itemtag = this.page.locator(this.ITEM_TAG);
        this.finalprice = this.page.locator(this.FINAL_PRICE);
        this.precentagesale = this.page.locator(this.PRECENTAGE_SALE);
        this.actuallprice = this.page.locator(this.ACTUALL_PRICE);
        this.colorName = this.page.locator(this.COLOR_TITLE);
        this.imgUrl = this.page.locator(this.IMAGE_URL);
        this.brandlocator = this.page.locator(this.BRAND);

        this.randomTitle = this.page.locator(this.RANDOM_NAME);
        this.addToCart = this.page.locator(this.ADD_TO_CART);
        this.sizeList = this.page.locator(this.SIZE_OPTIONS);
        this.colorList = this.page.locator(this.COLOR_OPTIONS);
        this.itemName = this.page.locator(this.TITLE);
        this.itemDetails = {};
    }
    private getRandomIndex = (count: number): number => { return Math.floor(Math.random() * count); }

    async clickrRandomItem(index: number) {
        const overView = this.page.locator(this.OVER_VIEW).nth(index);
        await overView.click();

    }

    async getRandomItemName(index: number) {
        this.nameLocator = this.randomTitle.nth(index);
        if (this.nameLocator) {
            const textContent = await this.nameLocator.textContent();
            return textContent;
        }
    }
    async getItemDetails() {
        await this.getItemName();
        await this.chooseColor();
        await this.chooseSize();
        await this.clickAddToCart();
        await this.colorTitle();
        return this.itemDetails;
    }

    async getItemName() {
        const name = await this.itemName.textContent();
        if (name) {
            this.itemDetails.name = name;
        }
    }

    async chooseColor() {
        const colorTextContent = await this.selectRandomColor();
        if (colorTextContent) {
            this.itemDetails.color = colorTextContent;
        }
    }

    async chooseSize() {
        const sizeTextContent = await this.selectRandomSize();
        if (sizeTextContent) {
            this.itemDetails.size = sizeTextContent;
        }
    }

    async clickAddToCart() {
        const cart = this.addToCart;
        await cart.click();

    }


    private async selectRandomColor() {
        const colors = this.colorList;
        const colorsCount = await colors.count();

        const randomColorIndex = this.getRandomIndex(colorsCount);
        const randomColor = colors.nth(randomColorIndex);

        const selectedColorClass = await randomColor.getAttribute('class');
        if (selectedColorClass && !selectedColorClass.includes('selected')) {
            await randomColor.click();
        }
        const randomColorTitle = await randomColor.getAttribute('title');
        if (randomColorTitle != null)
            return randomColorTitle;
    }

    private async selectRandomSize() {
        const sizeElements = this.sizeList;
        const randomSizeIndex = this.getRandomIndex(await sizeElements.count());
        const randomSize = sizeElements.nth(randomSizeIndex);
        await randomSize.click();

        const randomSizeTextContent = await randomSize.textContent();
        return randomSizeTextContent;
    }

    async nameTag(index: number) {
        const tagg = this.itemtag.nth(index);
        if(await tagg.isVisible()){
        const tagTectContetnt = await tagg.textContent();
        if (tagTectContetnt) {
            this.itemDetails.tag = tagTectContetnt;
            return tagTectContetnt;

        }
    }
    console.error("this is not a speacial item")
}

    async brandName(index: number) {
        const itemInfo = this.brandlocator.nth(index);
        const brand = itemInfo.locator("span");
        const brandName = await brand.textContent();
        if (brandName) {
            this.itemDetails.Itembrand = brandName;
            return brandName;
        }

    }

    async finalPrice(index: number) {
        const finalprice = this.finalprice.nth(index);
        const priceContetnt = await finalprice.textContent();
        if (priceContetnt) {
            this.itemDetails.finalprice = priceContetnt;
            return priceContetnt;
        }
    }

    async actuallPrice(index: number) {
        const actuallprice = this.actuallprice.nth(index);
        if(await actuallprice.isVisible()){
        const priceContetnt = await actuallprice.textContent();
        if (priceContetnt) {
            this.itemDetails.actualprice = priceContetnt;
            return priceContetnt;
        }
    }
    console.error("item is not on sale")
}

    async salePrecent(index: number) {
        const saleprecentage = this.precentagesale.nth(index);
        if(await saleprecentage.isVisible()){

        const saleContetnt = await saleprecentage.textContent();
        if (saleContetnt) {
            this.itemDetails.sale = saleContetnt;
            return saleContetnt;
        }
    }
    else{
        console.error("item is not on sale")
    }
}


    async colorTitle() {
        //if the title match the random choosen color
        const colorName = this.colorName;
        const colorContet = await colorName.textContent();
        if (colorContet) {
            this.itemDetails.colortiltle = colorContet;
            return colorContet;
        }
    }

    async itemImage(index: number) {
        const imageLocator = this.imgUrl.nth(index);
        const imageSrc = await imageLocator.getAttribute('src');
        if (imageSrc) {
            this.itemDetails.itemUrl = imageSrc;
            return imageSrc;
        }
    }
    async navigateTo() {
        await this.page.goto(urls.just_landed_page);
      }
}
