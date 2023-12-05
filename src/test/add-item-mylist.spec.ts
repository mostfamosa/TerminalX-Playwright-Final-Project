import { test, expect, Browser, chromium } from "@playwright/test";
import { urls } from "../config/pages-urls.json";
import { addItemToMyList } from "../logic/api/api-requests";
import { products } from "../config/items-test.json";
import { FavouritePage } from "../logic/pages/favourite-page";
import { ResponseWrapper } from "../logic/api/response/response-wrapper";
import { AddProductsToWishlistResponse } from "../logic/api/response/add-item-mylist-response";

test.describe.serial("Add product to MyList Validations Suite", () => {
  let browser: Browser;
  let favPage: FavouritePage;
  let apiResult: ResponseWrapper<AddProductsToWishlistResponse>;

  test.beforeAll(async () => {
    browser = await chromium.launch();
  });
  test.beforeEach(async ({ page }) => {
    await page.goto(urls.my_list_page);
    await page.setViewportSize({ width: 1920, height: 1080 });

    //apiResult = await addItemToMyList(products.baby_overalls_animals_boys.id);
    //await page.reload();
    favPage = new FavouritePage(page);
  });
  test.afterEach(async ({ page }) => {
    await page.close();
  });
  test.afterAll(async () => {
    await browser.close();
  });

  test("Add item by api to MyList -> Validate Response is truthy", async () => {
    // console.log(apiResult.data.data.addProductsToWishlist.anyWishlist.items[0].product.price_range.maximum_price);
    // console.log(apiResult.data.data.addProductsToWishlist.anyWishlist.items[0].product.thumbnail.label);
    // expect.soft(apiResult.ok).toBeTruthy();
    // expect.soft(apiResult.status).toBe(200);
    let index = Number(await favPage.findItemIndexByNameLink("טי שירט עם הדפס / 6M-3Y"));
    console.log(index);
    console.log(await favPage.getItemBrandName(index));
    console.log(await favPage.getItemColor(index));
    console.log(await favPage.getItemDiscountPercentage(index));
    console.log(await favPage.getItemRegularPrice(index));
    console.log(await favPage.getItemFinalPrice(index));
    console.log(await favPage.getItemSize(index));

  });
});
