import { test, expect } from '@playwright/test';
import { brands } from '../config/brands.json';
import { itemsDescription } from '../config/descriptions.json';
import { SearchPage } from '../logic/pages/search-page';
import { BrowserWrapper } from '../infra/browser-wrapper';

test.describe('Search For Products Validations Suite', () => {
    let browserWrapper: BrowserWrapper;
    let searchPage: SearchPage;

    test.beforeAll(async () => {
        browserWrapper = new BrowserWrapper();
    });
    test.beforeEach(async () => {
        searchPage = await browserWrapper.createNewPage(SearchPage);
        await browserWrapper.setToFullScreen();
    });
    test.afterEach(async () => {
        await browserWrapper.closePage();
    });
    test.afterAll(async () => {
        await browserWrapper.close();
    });

    const brandsName = [brands.adida, brands.jordan, brands.nike, brands.puma, brands.kendal, brands.mango];
    brandsName.forEach(brand => {
        test(`Search for brand = ${brand} -> Validate random item brand contains the same searched brand`, async () => {
            await searchPage.search(brand);
            expect.soft(await searchPage.getTitleText()).toContain(brand);
            expect.soft(await searchPage.getRandomItemBrand()).toContain(brand);
        });
    });

    const descriptions = [itemsDescription.flip_flops, itemsDescription.jeans, itemsDescription.pants, itemsDescription.perfume];
    descriptions.forEach(des => {
        test(`Search for description = ${des} -> Validate random item description contains the searched key`, async () => {
            await searchPage.search(des);
            expect.soft(await searchPage.getTitleText()).toContain(des);
            expect.soft(await searchPage.getRandomItemDescription()).toContain(des);
        });
    });

});