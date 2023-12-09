import { test, expect, Browser, chromium } from '@playwright/test';
import { ItemPage } from "../logic/pages/item-page";
import { urls } from '../config/pages-urls.json';

test.describe('item details Validations Suite', () => {
    let browser: Browser;
    let item: ItemPage;
    let index: number
    test.beforeAll(async () => {
        browser = await chromium.launch();
    });

    test.beforeEach(async ({ page }) => {
        await page.goto(urls.just_landed_page);
        item = new ItemPage(page);
        index = 3
        await item.clickrRandomItem(index);
    });

    test.afterEach(async ({ page }) => {
        await page.close();
    });
    test.afterAll(async () => {
        await browser.close();
    });


    test('extract the item name before adding ot ->add random item ->  Validate the item name match', async () => {
        const details = await item.getItemDetails();
        const itemName = await item.getRandomItemName(index);
        expect(itemName).toEqual(details.name);
    });
    test('extract the item label from the list of the item ->validate the same lable appears when over veiwing the item ', async () => {
        const label = await item.nameTag(index);
        const detailsLabel = await item.getItemDetails();
        expect(label).toEqual(detailsLabel.tag);
    });

    test('extract the item final price from the list of the item ->validate the same price appears when over veiwing the item ', async () => {
        const price = await item.finalPrice(index);
        const detailsPrice = await item.getItemDetails();
        expect(price).toEqual(detailsPrice.finalprice);
    });
    test('extract the item actual price from the list of the item ->validate the same price appears when over veiwing the item ', async () => {
        const price = await item.actuallPrice(index);
        const detailsPrice = await item.getItemDetails();
        expect(price).toEqual(detailsPrice.actualprice);
    });
    test('extract the item sale precentage from the list of the item ->validate the same precent appears when over veiwing the item ', async () => {
        const sale = await item.salePrecent(index);
        const detailsSale = await item.getItemDetails();
        expect(sale).toEqual(detailsSale.sale);
    });

    test('choose a random color -> check if the color name matching the choosen one ', async () => {
        const detailsColor = await item.getItemDetails();
        const Colortitle = await item.colorTitle();
        expect(detailsColor.color).toContain(Colortitle);
    });

    test('extract the item img url  ->go to over view -> validate the same url picture appears ', async () => {
        const Url = await item.itemImage(index);
        const detailsUrl = await item.getItemDetails();
        expect(Url).toEqual(detailsUrl.itemUrl);
    });

    test('extract the item brand name ->go to over view -> validate the same brand name appears ', async () => {
        const brand = await item.brandName(index);
        const detailsBrand = await item.getItemDetails();
        expect(brand).toEqual(detailsBrand.Itembrand);
    });

});