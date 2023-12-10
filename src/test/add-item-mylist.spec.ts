import { test, expect, Browser, chromium } from "@playwright/test";
import { urls } from "../config/pages-urls.json";
import { addItemToMyList, deleteItemFromListById } from "../logic/api/api-requests";
import { products } from "../config/items-test.json";
import { FavouritePage } from "../logic/pages/favourite-page";
import { ResponseWrapper } from "../logic/api/response/response-wrapper";
import { AddProductsToWishlistResponse } from "../logic/api/response/add-item-mylist-response";
import { MyListHandler } from "../logic/responseHandler/mylist-add-item-handler";

test.describe.serial("Add product to MyList Validations Suite", () => {
  let browser: Browser;
  let favPage: FavouritePage;
  let apiResult: ResponseWrapper<AddProductsToWishlistResponse>;
  let myListHandler: MyListHandler;
  let name: string;
  let index: number;

  test.beforeAll(async () => {
    browser = await chromium.launch();
  });
  test.beforeEach(async ({ page }) => {
    await page.goto(urls.my_list_page);
    await page.setViewportSize({ width: 1920, height: 1080 });

    apiResult = await addItemToMyList(products.beauty_kit_women.id);
    await page.reload();

    myListHandler = new MyListHandler(apiResult);

    favPage = new FavouritePage(page);

    name = myListHandler.getNewestItemLabel(products.beauty_kit_women.id);
    index = Number(await favPage.findItemIndexByNameLink(name));

  });
  test.afterEach(async ({ page }) => {
    await deleteItemFromListById(products.beauty_kit_women.id)
    await page.close();
  });
  test.afterAll(async () => {
    await browser.close();
  });

  test("Add item by api to MyList -> Validate Response is truthy", async () => {
    expect.soft(apiResult.ok).toBeTruthy();
    expect.soft(apiResult.status).toBe(200);
  });
  test("Add item by api to MyList -> Validate The Brand Name", async () => {
    expect(await favPage.getItemBrandName(index)).toBe(myListHandler.getNewestItemBrand(products.beauty_kit_women.id));
  })

  test("Add item by api to MyList -> Validate The Discount Percentage", async () => {
    expect(await favPage.getItemDiscountPercentage(index)).toBe(myListHandler.getNewestItemDiscount(products.beauty_kit_women.id));
  })

  test("Add item by api to MyList -> Validate The Regular Price", async () => {
    expect(await favPage.getItemRegularPrice(index)).toBe(myListHandler.getNewestItemPrice(products.beauty_kit_women.id).regular_price.value);
  })

  test("Add item by api to MyList -> Validate The Final Price", async () => {
    expect(await favPage.getItemFinalPrice(index)).toBe(myListHandler.getNewestItemPrice(products.beauty_kit_women.id).final_price.value);
  })


});
