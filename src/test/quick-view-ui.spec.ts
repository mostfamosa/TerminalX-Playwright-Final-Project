import { test, expect } from '@playwright/test';
import { ItemPage } from "../logic/pages/item-page"

import { BrowserWrapper } from '../infra/browser-wrapper';

test.describe('item details Validations Suite', () => {

    let browserWrapper: BrowserWrapper;
    let item: ItemPage;
    let index: number;

    test.beforeAll(async () => {
        browserWrapper = new BrowserWrapper();
    });

    test.beforeEach(async () => {
        item = await browserWrapper.createNewPage(ItemPage);
        index = 3;
    });

    test.afterEach(async () => {
        await browserWrapper.closePage();
    });

    test.afterAll(async () => {
        await browserWrapper.close();
    });


    test('extract the item name before adding ot ->add random item ->  Validate the item name match', async () => {
        const itemName = await item.getItemNameByIndex(index);
        await item.clickrRandomItem(index);
        const nameQuickView = await item.getItemNameQuickView();
        expect(itemName).toEqual(nameQuickView);

    });

    test('extract the item label from the list of the item ->validate the same tag appears when over veiwing the item ', async () => {
        const label = await item.getItemNameTagByIndex(index);
        await item.clickrRandomItem(index);
        const labelQuickView = await item.nameTagInsideQuickView();
        expect(label).toEqual(labelQuickView);
    });

    test('extract the item final price from the list of the item ->validate the same price appears when over veiwing the item ', async () => {
        const price = await item.finalPriceByIndex(index);
        await item.clickrRandomItem(index);
        const finalPriceQuickView = await item.finalPriceQuickView();
        expect(price).toEqual(finalPriceQuickView);
    });
    test('extract the item actual price from the list of the item ->validate the same price appears when over veiwing the item ', async () => {
        const price = await item.actuallPriceByIndex(index);
        await item.clickrRandomItem(index);
        const actuallPriceQuickView = await item.actuallPriceQuickView();
        expect(price).toEqual(actuallPriceQuickView);
    });
    test('extract the item sale precentage from the list of the item ->validate the same precent appears when over veiwing the item ', async () => {
        const sale = await item.salePrecentByIndex(index);
        await item.clickrRandomItem(index);
        const saleInQuickView = await item.salePrecentQuickView();
        expect(sale).toEqual(saleInQuickView);
    });

    test('choose a random color -> check if the color name matching the choosen one ', async () => {
        await item.clickrRandomItem(index);
        const detailsColor = await item.chooseColor();
        const Colortitle = await item.colorTitleQuickView();
        expect(detailsColor).toContain(Colortitle);
    });

    test('extract the item brand name ->go to over view -> validate the same brand name appears ', async () => {
        const brand = await item.brandNameByIndex(index);
        await item.clickrRandomItem(index);
        const brandQuickView = await item.brandNameFromQuickView();
        expect(brand).toEqual(brandQuickView);
    });

});