import { test, expect } from '@playwright/test';
import { addItemToCart, addItemToMyList, currentUserInfo, deleteItemFromCartById, deleteItemFromListById, getUserWishList } from '../logic/api/api-requests';
import { products } from "../logic/api/items-test.json";
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
})

})
