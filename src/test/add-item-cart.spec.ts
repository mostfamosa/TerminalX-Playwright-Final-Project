import { test, expect } from '@playwright/test';
import { CartPage } from "../logic/pages/cart-page";
import { addItemToCart, currentUserInfo, deleteItemFromCartById } from '../logic/api/api-requests';
import { products } from '../config/items-test.json';
import { UserInfo } from '../logic/responseHandler/user-info-handler';
import { BrowserWrapper } from '../infra/browser-wrapper';
import { ResponseWrapper } from '../logic/api/response/response-wrapper';
import { CurrentUserInfoResponse } from '../logic/api/response/current-user-info-response';

test.describe('New Product In Cart Validations Suite', () => {
    let browserWrapper: BrowserWrapper;
    let cart: CartPage;
    let userinfo: UserInfo;
    let itemNameLinkApi: string;
    let itemIndex: number;
    let res: ResponseWrapper<CurrentUserInfoResponse>;

    test.beforeAll(async () => {
        browserWrapper = new BrowserWrapper();
    });
    test.beforeEach(async () => {
        cart = await browserWrapper.createNewPage(CartPage);

        await browserWrapper.setToFullScreen();

        await addItemToCart(products.baby_overalls_animals_boys.sku, 1);
        await browserWrapper.reloadPage();

        res = await currentUserInfo();
        userinfo = new UserInfo(res);

        // To Find the index of the item in cart
        itemNameLinkApi = userinfo.getNewestItemLabel();
        itemIndex = Number(await cart.findItemIndexByNameLink(itemNameLinkApi));
    });
    test.afterEach(async () => {
        res = await currentUserInfo();
        let userinfo = new UserInfo(res);
        await deleteItemFromCartById(Number(userinfo.getNewestItemId()));
        await browserWrapper.closePage();
    });
    test.afterAll(async () => {
        await browserWrapper.close();
    });

    test('Add item by api -> Go to Cart page -> Validate Item Details', async () => {
        expect.soft(res.ok).toBeTruthy();
        expect.soft(res.status).toBe(200);
        expect.soft(await cart.getItemBrandLink(itemIndex)).toBe(itemNameLinkApi);
        expect.soft(await cart.getItemBrandLink(itemIndex)).toBe(itemNameLinkApi);
        expect.soft(await cart.getItemColor(itemIndex)).toBe(userinfo.getNewestItemColor());
        expect.soft(await cart.getItemSize(itemIndex)).toBe(userinfo.getNewestItemSize());
        expect.soft(await cart.getItemBrandName(itemIndex)).toBe(userinfo.getNewestItemBrand());
        expect.soft(await cart.getItemRegularPrice(itemIndex)).toBe(userinfo.getNewestItemPrice().regular_price.value);
        expect.soft(await cart.getItemDiscountPercentage(itemIndex)).toBe(userinfo.getNewestItemPrice().discount.percent_off);
        expect.soft(await cart.getItemFinalPrice(itemIndex)).toBe(userinfo.getNewestItemPrice().final_price.value);
        expect.soft(await cart.getItemTotalPrice(itemIndex)).toBe(userinfo.getNewestItemPrice().final_price.value * userinfo.getLastItemAddedToCart().quantity);
    });
});