import { test, expect } from '@playwright/test';
import { addItemToCart } from '../logic/api/api-requests';

test.describe('stam test', () => {

    test('add item to cart', async ({ page }) => {
        const result = await addItemToCart('Z81240002903', 1);
        await page.goto("https://www.terminalx.com/checkout/cart");
        console.log(result);
    })
})


