import { test, expect } from '@playwright/test';
import { addItemToCart, addItemToMyList, currentUserInfo, deleteItemFromCartById, deleteItemFromListById, getUserWishList } from '../logic/api/api-requests';
import { products } from "../logic/api/items-test.json";
import { FavouritePage } from '../logic/pages/favourite-page';
import { ItemPage } from '../logic/pages/item-page';
import { JustLanded } from '../logic/pages/just-landed-page';
import { SalePage } from '../logic/pages/sale-page';


test.describe('stam test', () => {

    test('add item to cart', async ({ page }) => {

 
    //add item using UI
     const gotoitem = new JustLanded(page);
     await page.goto('https://www.terminalx.com/justlanded')
     await gotoitem.clickOnRandomItem(11);
     const add = new ItemPage(page);
     add.ClickAddToCart();

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
