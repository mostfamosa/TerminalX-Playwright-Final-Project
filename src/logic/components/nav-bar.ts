import { Locator, Page } from "@playwright/test";
import { BaseComponent } from "./base-components";

export class NavBar extends BaseComponent {
  private readonly JUST_LANDED_LOC = `//a[text()='JUST LANDED']`;
  private readonly ON_SALE_LOC = `//a[text()='ON SALE']`;
  private readonly SEARCH_LOC = "//button[@data-test-id='qa-header-search-button']";
  private readonly CART_LOC = "//a[@data-test-id='qa-link-minicart']";
  private readonly FAVOURITE_LIST = "//a[@data-test-id='qa-link-wishlist']";
  private readonly PROFILE_BUTTON_LOC = "//button[@data-test-id='qa-header-profile-button']";

  private justLandedBtn: Locator;
  private onSaleBtn: Locator;
  private searchBtn: Locator;
  private cartBtn: Locator;
  private favouriteListBtn: Locator;
  private profilBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.justLandedBtn = page.locator(this.JUST_LANDED_LOC);
    this.onSaleBtn = page.locator(this.ON_SALE_LOC);
    this.searchBtn = page.locator(this.SEARCH_LOC);
    this.cartBtn = page.locator(this.CART_LOC);
    this.favouriteListBtn = page.locator(this.FAVOURITE_LIST);
    this.profilBtn = page.locator(this.PROFILE_BUTTON_LOC);
  }

  async clickJustLanded() {
    await this.justLandedBtn.click();
  }

  async clickOnSale() {
    await this.onSaleBtn.click();
  }

  async clickSearch() {
    await this.searchBtn.click();
  }

  async clickCart() {
    await this.cartBtn.click();
  }

  async clickFavourite() {
    await this.favouriteListBtn.click();
  }

  async getProfileName() {
    return await this.profilBtn.textContent();
  }

  async clickOnProfileName() {
    await this.profilBtn.click();
  }
}
