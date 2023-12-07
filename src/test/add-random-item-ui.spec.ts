import { test, expect, Browser, chromium } from '@playwright/test';
import { ItemPage } from "../logic/pages/item-page";
import { urls } from '../config/pages-urls.json';

test.describe('item details Validations Suite', () => {
    let browser: Browser;
    let item: ItemPage;



    test.beforeAll(async () => {
        browser = await chromium.launch();
    });

    test.beforeEach(async ({ page }) => {
        await page.goto(urls.just_landed_page);
        item = new ItemPage(page);
        await item.clickrRandomItem(3);
    });

    test.afterEach(async ({ page }) => {
        await page.close();
    });
    test.afterAll(async () => {
        await browser.close();
    });


    test('extract the item name before adding ot ->add random item ->  Validate the item name match', async ({ page }) => {
        const details = await item.getItemDetails();
        const itemName = await item.getRandomItemName(3);
        expect(itemName).toEqual(details.name);
    });
    test('extract the item label from the list of the item ->validate the same lable appears when over veiwing the item ', async ({ page }) => {
        const label = await item.nameTag(3);
        const detailsLabel = await item.getItemDetails();
        expect(label).toEqual(detailsLabel.tag);
    });

    test('extract the item final price from the list of the item ->validate the same price appears when over veiwing the item ', async ({ page }) => {
        const price = await item.finalPrice(3);
        const detailsPrice = await item.getItemDetails();
        console.log(price);
        console.log(detailsPrice.finalprice);
        expect(price).toEqual(detailsPrice.finalprice);
    });
    test('extract the item actual price from the list of the item ->validate the same price appears when over veiwing the item ', async ({ page }) => {
        const price = await item.actuallPrice(3);
        const detailsPrice = await item.getItemDetails();
        console.log(price);
        console.log(detailsPrice.actualprice);
        expect(price).toEqual(detailsPrice.actualprice);
    });
    test('extract the item sale precentage from the list of the item ->validate the same precent appears when over veiwing the item ', async ({ page }) => {
        const sale = await item.salePrecent(3);
        const detailsSale = await item.getItemDetails();
        console.log(sale);
        console.log(detailsSale.sale);
        expect(sale).toEqual(detailsSale.sale);
    });

    test('choose a random color -> check if the color name matching the choosen one ', async ({ page }) => {
        const detailsColor = await item.getItemDetails();
        const Colortitle = await item.colorTitle();
        console.log(Colortitle);
        console.log(detailsColor.color);
        expect(detailsColor.color).toContain(Colortitle);
    });

    test('extract the item img url  ->go to over view -> validate the same url picture appears ', async ({ page }) => {
        const Url = await item.itemImage(3);
        const detailsUrl = await item.getItemDetails();
        console.log(Url);
        console.log(detailsUrl.itemUrl);
        expect(Url).toEqual(detailsUrl.itemUrl);
    });
    
    // test('extract the item brand name ->go to over view -> validate the same brand name appears ', async ({ page }) => {
    //     const brand = await item.brandName(3);
    //     const detailsBrand = await item.getItemDetails();
    //     console.log(brand);
    //     console.log(detailsBrand.Itembrand);
    //     expect(brand).toEqual(detailsBrand.Itembrand);
    // });

});