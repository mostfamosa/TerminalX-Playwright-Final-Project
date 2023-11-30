import { test, expect } from '@playwright/test';
import { addItemToCart , addItemToMyList} from '../logic/api/api-requests';

test.describe('stam test', () => {

    test('add item to cart', async ({ page }) => {
        
        //add item to cart
        // const result = await addItemToCart('Z81240002903', 1);
        // await page.goto("https://www.terminalx.com/checkout/cart");
        // console.log(result);


        /* *********************************************** */
        
        
        //add item to my list
        const result = await addItemToMyList('1527914');
        await page.goto("https://www.terminalx.com/wishlist/items");
        console.log(result.data.addProductsToWishlist.anyWishlist.items[0].product.thumbnail.label);
   
   
   
    })
})


