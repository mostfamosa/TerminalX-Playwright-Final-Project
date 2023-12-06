import { test, expect, Browser, chromium } from '@playwright/test';
import { urls } from '../config/pages-urls.json';
import { brands } from '../config/brands.json';
import { itemsDescription } from '../config/descriptions.json';
import { SearchPage } from '../logic/pages/search-page';

test.describe('Search For Products Validations Suite', () => {
    let browser: Browser;
    let searchPage: SearchPage;

    test.beforeAll(async () => {
        browser = await chromium.launch();
    });
    test.beforeEach(async ({ page }) => {
        await page.goto(urls.base_page);
        await page.setViewportSize({ width: 1920, height: 1080 });
    });
    test.afterEach(async ({ page }) => {
        await page.close();
    });
    test.afterAll(async () => {
        await browser.close();
    });

    const brandsName = [brands.adida, brands.jordan, brands.nike, brands.puma, brands.kendal, brands.mango];
    brandsName.forEach(brand => {
        test(`Search for brand = ${brand} -> Validate random item brand contains the same searched brand`, async ({ page }) => {
            searchPage = new SearchPage(page);
            await searchPage.search(brand);
            expect.soft(await searchPage.getTitleText()).toContain(brand);
            expect.soft(await searchPage.getRandomItemBrand()).toContain(brand);
        });
    });

    const descriptions = [itemsDescription.flip_flops, itemsDescription.jeans, itemsDescription.pants, itemsDescription.perfume];
    descriptions.forEach(des => {
        test(`Search for description = ${des} -> Validate random item description contains the searched key`, async ({ page }) => {
            searchPage = new SearchPage(page);
            await searchPage.search(des);
            expect.soft(await searchPage.getTitleText()).toContain(des);
            expect.soft(await searchPage.getRandomItemDescription()).toContain(des);
        });
    });

});