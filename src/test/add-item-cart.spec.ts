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
    let itemId: number;
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

        console.log(res.data.data.currentUserInfo.cart_object.items[0].product.id);
        console.log(res.data.data.currentUserInfo.cart_object.items[0].product.sku);
        console.log(res.data.data.currentUserInfo.cart_object.items[0].product.thumbnail.label);


        // To Delete The Item Later
        itemId = userinfo.getItemIdBySku(products.baby_overalls_animals_boys.sku); 
        // To Find the index of the item in cart
        itemNameLinkApi = products.baby_overalls_animals_boys.name;
        itemIndex = Number(await cart.findItemIndexByNameLink(itemNameLinkApi));
    });
    test.afterEach(async () => {
        await deleteItemFromCartById(itemId);
        await browserWrapper.closePage();
    });
    test.afterAll(async () => {
        await browserWrapper.close();
    });

    test('Add item by api -> Go to Cart page -> Validate Item Details', async () => {
        expect.soft(res.ok).toBeTruthy();
        expect.soft(res.status).toBe(200);
        expect.soft(await cart.getItemBrandLink(itemIndex)).toBe(itemNameLinkApi);
        expect.soft(await cart.getItemColor(itemIndex)).toBe(userinfo.getItemColorBySku(products.baby_overalls_animals_boys.sku));
        expect.soft(await cart.getItemSize(itemIndex)).toBe(userinfo.getItemSizeBySku(products.baby_overalls_animals_boys.sku));
        expect.soft(await cart.getItemBrandName(itemIndex)).toBe(userinfo.getItemBrandBySku(products.baby_overalls_animals_boys.sku));
        expect.soft(await cart.getItemRegularPrice(itemIndex)).toBe(userinfo.getItemPriceBySku(products.baby_overalls_animals_boys.sku).regular_price.value);
        expect.soft(await cart.getItemDiscountPercentage(itemIndex)).toBe(userinfo.getItemPriceBySku(products.baby_overalls_animals_boys.sku).discount.percent_off);
        expect.soft(await cart.getItemFinalPrice(itemIndex)).toBe(userinfo.getItemPriceBySku(products.baby_overalls_animals_boys.sku).final_price.value);
    });
});