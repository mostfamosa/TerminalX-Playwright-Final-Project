import { test, expect } from '@playwright/test';
import { addItemToCart, addItemToMyList, currentUserInfo, deleteItemFromListById } from '../logic/api/api-requests';
import { products } from "../logic/api/items-test.json";


test.describe('stam test', () => {

    test('add item to cart', async ({ page }) => {

        //add item to cart
        // await addItemToCart(products.baby_overalls_animals_boys.sku, 1);
        // await page.goto("https://www.terminalx.com/checkout/cart");

        // let result2 = await currentUserInfo();
        // console.log(result2.data.currentUserInfo.cart_object);


        /* *********************************************** */


        //add item to my list and delete it
        // let result = await addItemToMyList(products.nike_bag_with_logo_men.id);
        // await page.goto("https://www.terminalx.com/wishlist/items");
        // console.log(result.data.addProductsToWishlist.anyWishlist);

        // console.log("*************************");

        // result = await deleteItemFromListById(products.nike_bag_with_logo_men.id);
        // console.log(result.data);

        

    })
})


