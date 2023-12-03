import { test, expect } from '@playwright/test';
import { addItemToCart, addItemToMyList, currentUserInfo, deleteItemFromCartById, deleteItemFromListById, getUserWishList } from '../logic/api/api-requests';
import { products } from "../logic/api/items-test.json";
import { FavouritePage } from '../logic/pages/favourite-page';


test.describe('stam test', () => {

    test('add item to cart', async ({ page }) => {

        // //add item to cart and delete it
        // await addItemToCart(products.baby_overalls_animals_boys.sku, 1);
        // await page.goto("https://www.terminalx.com/checkout/cart");

        // let result2 = await currentUserInfo();
        // console.log(result2.data.currentUserInfo.cart_object.items[0].id);

        // let f = await deleteItemFromCartById(Number.parseInt(result2.data.currentUserInfo.cart_object.items[0].id));
        // console.log(f.data);
        // await page.reload();
        // await page.waitForTimeout(3000);
        // /* *********************************************** */


        await page.goto("https://www.terminalx.com");

        let result1 = await addItemToMyList(products.nike_bag_with_logo_men.id);
        await page.goto("https://www.terminalx.com/wishlist/items");
    
        console.log(result1.data.addProductsToWishlist.anyWishlist.items[0].id);
        await page.waitForTimeout(3000);

        const fav = new FavouritePage(page);
        await fav.itemInTheList(products.nike_bag_with_logo_men.name);
    
      
    
        
       


        // let f = await deleteItemFromCartById(Number.parseInt(result2.data.currentUserInfo.cart_object.items[0].id));
        // console.log(f.data);
        // await page.reload();
        // await page.waitForTimeout(3000);
        /* *********************************************** */


      
        //add item to my list and delete it

        // let result = await addItemToMyList(products.nike_bag_with_logo_men.id);
        // await page.goto("https://www.terminalx.com/wishlist/items");
        // console.log(result.data.addProductsToWishlist.anyWishlist);

        // console.log("*************************");

        // result = await deleteItemFromListById(products.nike_bag_with_logo_men.id);
        // console.log(result.data);

        // get user wish list
        // let res = await getUserWishList();
        // console.log(res.data.anyWishlist.items_count);
        // console.log(res.data.anyWishlist.items[0].product.brand_url.name);
        // console.log(res.data.anyWishlist.items[1].product.brand_url.name);

    })
})


