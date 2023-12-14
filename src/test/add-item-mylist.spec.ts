import { test, expect } from "@playwright/test";
import { addItemToMyList, deleteItemFromListById } from "../logic/api/api-requests";
import { products } from "../config/items-test.json";
import { FavouritePage } from "../logic/pages/favourite-page";
import { ResponseWrapper } from "../logic/api/response/response-wrapper";
import { AddProductsToWishlistResponse } from "../logic/api/response/add-item-mylist-response";
import { MyListHandler } from "../logic/responseHandler/mylist-add-item-handler";
import { BrowserWrapper } from "../infra/browser-wrapper";

test.describe.serial("Add product to MyList Validations Suite", () => {
  let browserWrapper: BrowserWrapper;
  let favPage: FavouritePage;
  let apiResult: ResponseWrapper<AddProductsToWishlistResponse>;
  let myListHandler: MyListHandler;
  let name: string;
  let index: number;

  test.beforeAll(async () => {
    browserWrapper = new BrowserWrapper();
  });
  test.beforeEach(async () => {
    favPage = await browserWrapper.createNewPage(FavouritePage);
    await browserWrapper.setToFullScreen();

    apiResult = await addItemToMyList(products.beauty_kit_women.id);
    await favPage.reload();

    myListHandler = new MyListHandler(apiResult);
    name = myListHandler.getNewestItemLabel(products.beauty_kit_women.id);
    index = Number(await favPage.findItemIndexByNameLink(name));
  });

  test.afterEach(async () => {
    await deleteItemFromListById(products.beauty_kit_women.id)
    await browserWrapper.closePage();
  });
  
  test.afterAll(async () => {
    await browserWrapper.close();
  });

  test("Add item by api to MyList -> Validate Response is truthy and Item Details", async () => {
    expect.soft(apiResult.ok).toBeTruthy();
    expect.soft(apiResult.status).toBe(200);
    expect.soft(await favPage.getItemBrandName(index)).toBe(myListHandler.getNewestItemBrand(products.beauty_kit_women.id));
    expect.soft(await favPage.getItemDiscountPercentage(index)).toBe(myListHandler.getNewestItemDiscount(products.beauty_kit_women.id));
    expect.soft(await favPage.getItemRegularPrice(index)).toBe(myListHandler.getNewestItemPrice(products.beauty_kit_women.id).regular_price.value);
    expect.soft(await favPage.getItemFinalPrice(index)).toBe(myListHandler.getNewestItemPrice(products.beauty_kit_women.id).final_price.value);
  });

});
