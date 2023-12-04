import { test, expect } from '@playwright/test';
import { addItemToCart, addItemToMyList, currentUserInfo, deleteItemFromCartById, deleteItemFromListById, getUserWishList } from '../logic/api/api-requests';
import { products } from "../config/items-test.json";
import { FavouritePage } from '../logic/pages/favourite-page';
import { ItemPage } from '../logic/pages/item-page';
import { JustLanded } from '../logic/pages/just-landed-page';
import { SalePage } from '../logic/pages/sale-page';
import { ItemPagee } from '../logic/pages/item-page2';


test.describe('stam test', () => {

    test('add item to cart', async ({ page }) => {

 
    //add item using UI
     const gotoitem = new ItemPagee(page);
     await page.goto('https://www.terminalx.com/justlanded');
     
     await gotoitem.hoverOverRandomItem(1);

 

//     await page.waitForTimeout(3000);


//     // page.waitForLoadState();
//     await page.waitForLoadState('load');

//  // add.RandomColor();
//    add.CHooseSize();
    // add.ClickAddToCart();


//     const sale = new SalePage(page);
//     await page.goto('https://www.terminalx.com/on-sale');
//     await page.waitForLoadState('load');
//     await sale.hoverOverRandomItem(5);
// })
        let result1 = await addItemToMyList(products.nike_bag_with_logo_men.id);
        await page.goto("https://www.terminalx.com/wishlist/items");
    
        console.log(result1.data.data.addProductsToWishlist.anyWishlist.items[0].id);
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

})
