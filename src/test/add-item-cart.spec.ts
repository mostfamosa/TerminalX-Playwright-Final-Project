import { test, expect } from '@playwright/test';
import { CartPage } from "../logic/pages/cart-page";
import { addItemToCart, currentUserInfo, deleteItemFromCartById } from '../logic/api/api-requests';
import { products } from '../config/items-test.json';
import { UserInfo } from '../logic/responseHandler/user-info-handler';
import { BrowserWrapper } from '../infra/browser-wrapper';

test.describe('New Product In Cart Validations Suite', () => {
    let browserWrapper: BrowserWrapper;
    let cart: CartPage;
    let userinfo: UserInfo;
    let itemNameLinkApi: string;
    let itemIndex: number;

    test.beforeAll(async () => {
        browserWrapper = new BrowserWrapper();
        await browserWrapper.launch();
    });
    test.beforeEach(async () => {
        cart = new CartPage(await browserWrapper.getPage());

        await browserWrapper.navigate(cart);
        await browserWrapper.setToFullScreen();

        await addItemToCart(products.baby_overalls_animals_boys.sku, 1);
        await browserWrapper.reloadPage();

        let res = await currentUserInfo();
        userinfo = new UserInfo(res);

        // To Find the index of the item in cart
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
        await browserWrapper.close();
    });

    test('Add item by api -> Go to Cart page -> Validate Item Name Link', async () => {
        expect(await cart.getItemBrandLink(itemIndex)).toBe(itemNameLinkApi);
    });

    test('Add item by api -> Go to Cart page -> Validate Item Color', async () => {
        expect(await cart.getItemColor(itemIndex)).toBe(userinfo.getNewestItemColor());
    });

    test('Add item by api -> Go to Cart page -> Validate Item Size', async () => {
        expect(await cart.getItemSize(itemIndex)).toBe(userinfo.getNewestItemSize());
    });

    test('Add item by api -> Go to Cart page -> Validate Item Brand', async () => {
        expect(await cart.getItemBrandName(itemIndex)).toBe(userinfo.getNewestItemBrand());
    });

    test('Add item by api -> Go to Cart page -> Validate Item Regular Price', async () => {
        expect(await cart.getItemRegularPrice(itemIndex)).toBe(userinfo.getNewestItemPrice().regular_price.value);
    });

    test('Add item by api -> Go to Cart page -> Validate Item Discount Percentage', async () => {
        expect(await cart.getItemDiscountPercentage(itemIndex)).toBe(userinfo.getNewestItemPrice().discount.percent_off);
    });

    test('Add item by api -> Go to Cart page -> Validate Item Final Price (after discount)', async () => {
        expect(await cart.getItemFinalPrice(itemIndex)).toBe(userinfo.getNewestItemPrice().final_price.value);
    });

    test('Add item by api -> Go to Cart page -> Validate Item Total Price (quantity*price)', async () => {
        expect(await cart.getItemTotalPrice(itemIndex)).toBe(userinfo.getNewestItemPrice().final_price.value * userinfo.getLastItemAddedToCart().quantity);
    })
});