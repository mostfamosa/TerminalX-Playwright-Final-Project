import { BasePage } from "./base-page";
import { Locator, Page } from '@playwright/test';
import { urls } from '../../config/pages-urls.json'


export class ItemPage extends BasePage {
    private readonly SIZE_OPTIONS = "(//div[@class='size_1bXM'])//div[@data-test-id = 'qa-size-item']";
    private readonly COLOR_OPTIONS = ".color_FYIY .color-item_1Y2Y";
    private readonly TITLE_QUICK_VIEW = '//h1[@class="name_20R6"]';
    private readonly OVER_VIEW = "//div[@class='btn-quick_3Pv7 btn-quick-view_2SXw']";
    private readonly COLOR_TITLE = "span[class='label-dynamic_3Y3S']"
    private readonly PRECENTAGE_SALE = "//a[@class='tx-link-a stampa-sales_3ITt rtl_1_TU link_3vu6 tx-link_29YD']";
    private readonly FINAL_PRICE = "div[class='row_2tcG bold_2wBM final-price_8CiX']";
    private readonly ACTUALL_PRICE = "div[class='row_2tcG strikethrough_t2Ab regular-price_35Lt']";
    private readonly ACTUALL_PRICE_QUICK_VIEW = '//div[@class="row_2tcG strikethrough_t2Ab prices-regular_yum0"]';
    private readonly ITEM_TAG = "span[class='black-bg_2mJm']";
    private readonly BRAND = "div.right_1o65";
    private readonly RANDOM_NAME = "//div[@class='right_1o65']//a";
    private readonly TAG_NAME_QUICK_VIEW = '//*[@id="panel-root"]/div/div[2]/div/div[2]/div/div[2]/div/div[1]/div[2]/div/span';
    private readonly BRAND_NAME_QUICK_VIEW = "a[class='tx-link-a brand_2ltz tx-link_29YD underline-hover_3GkV']";
    private readonly FINAL_PRICE_QUICK_VIEW = 'div[data-test-id="qa-pdp-price-final"]';
    private readonly SALE_PERCENT_QUICK_VIEW = 'a[class="tx-link-a stampa-sales_2O4Q link_3vu6 tx-link_29YD"]';

    private nameLocator: Locator
    private randomTitle: Locator;
    private brandlocator: Locator
    private itemtag: Locator;
    private finalprice: Locator;
    private precentagesale: Locator;
    private actuallprice: Locator;
    private colorName: Locator;
    private sizeList: Locator;
    private colorList: Locator;
    private itemNameQuickView: Locator;

    constructor(page: Page) {
        super(page)
        this.itemtag = this.page.locator(this.ITEM_TAG);
        this.finalprice = this.page.locator(this.FINAL_PRICE);
        this.precentagesale = this.page.locator(this.PRECENTAGE_SALE);
        this.actuallprice = this.page.locator(this.ACTUALL_PRICE);
        this.colorName = this.page.locator(this.COLOR_TITLE);
        this.brandlocator = this.page.locator(this.BRAND);

        this.randomTitle = this.page.locator(this.RANDOM_NAME);
        this.sizeList = this.page.locator(this.SIZE_OPTIONS);
        this.colorList = this.page.locator(this.COLOR_OPTIONS);
        this.itemNameQuickView = this.page.locator(this.TITLE_QUICK_VIEW);
    }
    private getRandomIndex = (count: number): number => { return Math.floor(Math.random() * count); }

    async clickrRandomItem(index: number) {
        const overView = this.page.locator(this.OVER_VIEW).nth(index);
        await overView.click();

    }

    async getItemNameByIndex(index: number) {
        this.nameLocator = this.randomTitle.nth(index);
        if (this.nameLocator) {
            const textContent = await this.nameLocator.textContent();
            return textContent;
        }
    }

    async getItemNameQuickView() {
        const name = await this.itemNameQuickView.textContent();
        if (name) {
            return name;
        }
    }

    async chooseColor() {
        const colorTextContent = await this.selectRandomColor();
        if (colorTextContent) {
            return colorTextContent;
        }
    }

    async chooseSize() {
        const sizeTextContent = await this.selectRandomSize();
        if (sizeTextContent) {
            return sizeTextContent;
        }
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

    async nameTagInsideQuickView() {
        const tagQuickView = await this.page.locator(this.TAG_NAME_QUICK_VIEW).textContent();
        if (tagQuickView) {
            return tagQuickView;
        }
    }


    async getItemNameTagByIndex(index: number) {
        const nameTage = await this.itemtag.nth(index).textContent();
        if (nameTage) {
            return nameTage;
        }
    }

    async brandNameByIndex(index: number) {
        const itemInfo = this.brandlocator.nth(index);
        const brand = itemInfo.locator("span");
        const brandName = await brand.textContent();
        if (brandName) {
            return brandName;
        }

    }
    async brandNameFromQuickView() {
        const brandLocate = this.page.locator(this.BRAND_NAME_QUICK_VIEW);
        const brandname = await brandLocate.textContent();
        if (brandname) {
            return brandname;
        }

    }

    async finalPriceByIndex(index: number) {
        const finalprice = this.finalprice.nth(index);
        const priceContetnt = await finalprice.textContent();
        if (priceContetnt) {
            return priceContetnt;
        }
    }
    async finalPriceQuickView() {
        const final = this.page.locator(this.FINAL_PRICE_QUICK_VIEW);
        const priceValue = await final.textContent();
        if (priceValue) {
            return priceValue;
        }


    }

    async actuallPriceByIndex(index: number) {
        const actuallprice = this.actuallprice.nth(index);
        if (await actuallprice.isVisible()) {
            const priceContetnt = await actuallprice.textContent();
            if (priceContetnt) {
                return priceContetnt;
            }
        }
        console.error("item is not on sale")
    }

    async actuallPriceQuickView() {
        const actuallprice = this.page.locator(this.ACTUALL_PRICE_QUICK_VIEW);
        const priceContetnt = await actuallprice.textContent();
        if (priceContetnt) {
            return priceContetnt;
        }
    }

    async salePrecentQuickView() {
        const saleprecentage = this.page.locator(this.SALE_PERCENT_QUICK_VIEW)
        const saleContetnt = await saleprecentage.textContent();
        if (saleContetnt) {
            return saleContetnt;
        }
    }
    async salePrecentByIndex(index: number) {
        const saleprecentage = this.precentagesale.nth(index);
        if (await saleprecentage.isVisible()) {

            const saleContetnt = await saleprecentage.textContent();
            if (saleContetnt) {
                return saleContetnt;
            }
        }
        else {
            console.error("item is not on sale")
        }
    }


    async colorTitleQuickView() {
        //if the title match the random choosen color
        const colorName = this.colorName;
        const colorContet = await colorName.textContent();
        if (colorContet) {
            return colorContet;
        }
    }

    async navigateTo() {
        await this.page.goto(urls.just_landed_page);
    }
}
