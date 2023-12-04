import { test, expect, Browser, chromium } from '@playwright/test';
import { CartPage } from "../logic/pages/cart-page";
import { urls } from '../config/pages-urls.json';
import { addItemToCart, currentUserInfo, deleteItemFromCartById } from '../logic/api/api-requests';
import { products } from '../config/items-test.json';
import { UserInfo } from '../logic/responseHandler/user-info-handler';

test.describe.serial('New Product In Cart Validations Suite', () => {
    let browser: Browser;
    let cart: CartPage;
    let userinfo: UserInfo;
    let itemNameLinkApi: string;
    let itemIndex: number;

    test.beforeAll(async () => {
        browser = await chromium.launch();
    });
    test.beforeEach(async ({ page }) => {
        await page.goto(urls.my_cart_page);
        await page.setViewportSize({ width: 1920, height: 1080 });

        await addItemToCart(products.baby_overalls_animals_boys.sku, 1);
        await page.reload();

        let res = await currentUserInfo();
        userinfo = new UserInfo(res);

        // To Find the index of the item in cart
        cart = new CartPage(page);
        itemNameLinkApi = userinfo.getNewestItemLabel();
        itemIndex = Number(await cart.findItemIndexByNameLink(itemNameLinkApi));
    });
    test.afterEach(async ({ page }) => {
        let res = await currentUserInfo();
        let userinfo = new UserInfo(res);
        await deleteItemFromCartById(Number(userinfo.getNewestItemId()));
        await page.close();
    });
    test.afterAll(async () => {
        await browser.close();
    });

    test('Add item by api -> Go to Cart page -> Validate Item Name Link', async ({ page }) => {
        expect(await cart.getItemBrandLink(itemIndex)).toBe(itemNameLinkApi);
    });

    test('Add item by api -> Go to Cart page -> Validate Item Color', async ({ page }) => {
        expect(await cart.getItemColor(itemIndex)).toBe(userinfo.getNewestItemColor());
    });

    test('Add item by api -> Go to Cart page -> Validate Item Size', async ({ page }) => {
        expect(await cart.getItemSize(itemIndex)).toBe(userinfo.getNewestItemSize());
    });

    test('Add item by api -> Go to Cart page -> Validate Item Brand', async ({ page }) => {
        expect(await cart.getItemBrandName(itemIndex)).toBe(userinfo.getNewestItemBrand());
    });

    test('Add item by api -> Go to Cart page -> Validate Item Regular Price', async ({ page }) => {
        expect(await cart.getItemRegularPrice(itemIndex)).toBe(userinfo.getNewestItemPrice().regular_price.value);
    });

    test('Add item by api -> Go to Cart page -> Validate Item Discount Percentage', async ({ page }) => {
        expect(await cart.getItemDiscountPercentage(itemIndex)).toBe(userinfo.getNewestItemPrice().discount.percent_off);
    });

    test('Add item by api -> Go to Cart page -> Validate Item Final Price (after discount)', async ({ page }) => {
        expect(await cart.getItemFinalPrice(itemIndex)).toBe(userinfo.getNewestItemPrice().final_price.value);
    });

    test('Add item by api -> Go to Cart page -> Validate Item Total Price (quantity*price)', async ({ page }) => {
        expect(await cart.getItemTotalPrice(itemIndex)).toBe(userinfo.getNewestItemPrice().final_price.value * userinfo.getLastItemAddedToCart().quantity);
    })
});