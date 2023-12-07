import { test, expect } from '@playwright/test';
import { HomePage } from "../logic/pages/home-page";
import { urls } from '../config/pages-urls.json';
import { NavBarOptions } from '../logic/enums/navigation-bar'
import { BrowserWrapper } from '../infra/browser-wrapper';

test.describe('Navigation Bar Validations Suite', () => {
    let browserWrapper: BrowserWrapper;
    let homePage: HomePage;

    test.beforeAll(async () => {
        browserWrapper = new BrowserWrapper();
        await browserWrapper.launch();
    })
    test.beforeEach(async () => {
        homePage = new HomePage(await browserWrapper.getPage());
        await browserWrapper.navigate(homePage);
    });
    test.afterEach(async ({ page }) => {
        await page.close();
    });
    test.afterAll(async () => {
        await browserWrapper.close();
    });

    // Parameterize test validate navigation bar
    const navBar = [
        { name: "ON SALE", url: urls.on_sale_page },
        { name: "JUST LANDED", url: urls.just_landed_page },
        { name: "MY LIST", url: urls.my_list_page }
    ]
    for (const item of navBar) {
        test(`Go to Home Page -> Click on :${item.name} -> Validate url is:${item.url}`, async () => {
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
            await expect(await browserWrapper.getPage()).toHaveURL(item.url);
        });
    }
});