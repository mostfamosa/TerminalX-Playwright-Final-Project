import { test, expect, Browser, chromium } from '@playwright/test';
import { HomePage } from "../logic/pages/home-page";
import { urls } from '../config/pages-urls.json';
import { NavBarOptions } from '../logic/enums/navigation-bar'

test.describe('Navigation Bar Validations Suite', () => {
    let browser: Browser;

    test.beforeAll(async () => {
        browser = await chromium.launch();
    });
    test.beforeEach(async ({ page }) => {
        await page.goto(urls.base_page);
    });
    test.afterEach(async ({ page }) => {
        await page.close();
    });
    test.afterAll(async () => {
        await browser.close();
    });

    // Parameterize test validate navigation bar
    const navBar = [
        { name: "JUST LANDED", url: urls.just_landed_page },
        { name: "ON SALE", url: urls.on_sale_page },
        { name: "MY LIST", url: urls.my_list_page }
    ]
    for (const item of navBar) {
        test(`Go to Home Page -> Click on :${item.name} -> Validate url is:${item.url}`, async ({ page }) => {
            const homePage = new HomePage(page);
            switch (item.name) {
                case NavBarOptions.JUST_LANDED:
                    await homePage.clickJustLandedFromNavBar();
                    break;
                case NavBarOptions.ON_SALE:
                    await homePage.clickOnSaleFromNavBar();
                    break;
                case NavBarOptions.MY_LIST:
                    await homePage.clickFavouriteFromNavbar();
                    break;
                default:
                    console.error("Illegal Input!");
                    break;
            }
            await expect(page).toHaveURL(item.url);
        });
    }
});