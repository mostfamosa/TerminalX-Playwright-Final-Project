import { Locator, Page } from "@playwright/test";
import { BaseComponent } from "./base-components";

export class NavBar extends BaseComponent {
  private readonly JUST_LANDED_LOC = `//*[@id="app-root"]/div[2]/header/div/div[4]/nav/ul/li/a[contains(string(),'JUST LANDED')]`;
  private readonly SEARCH_LOC =
    "//button[@data-test-id='qa-header-search-button']";
  private readonly CART_LOC = "//a[@data-test-id='qa-link-minicart']";
  private readonly FAVOURITE_LIST = "//a[@data-test-id='qa-link-wishlist']";
  private readonly PROFILE_BUTTON_LOC =
    "//button[@data-test-id='qa-header-profile-button']";

  private justLandedBtn: Locator;
  private searchBtn: Locator;
  private cartBtn: Locator;
  private favouriteListBtn: Locator;
  private profilBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.justLandedBtn = page.locator(this.JUST_LANDED_LOC);
    this.searchBtn = page.locator(this.SEARCH_LOC);
    this.cartBtn = page.locator(this.CART_LOC);
    this.favouriteListBtn = page.locator(this.FAVOURITE_LIST);
    this.profilBtn = page.locator(this.PROFILE_BUTTON_LOC);
  }

  async clickJustLanded() {
    await this.justLandedBtn.click();
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
    return await this.profilBtn.click();
  }
}
