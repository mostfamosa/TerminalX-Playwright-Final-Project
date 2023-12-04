import { BasePage } from "./base-page";
import { Page } from '@playwright/test';
import { NavBar } from "../components/nav-bar";

export class HomePage extends BasePage {

  private navBar: NavBar;

  constructor(page: Page) {
    super(page);
    this.navBar = new NavBar(page);
  }

  async clickJustLandedFromNavBar() {
    await this.navBar.clickJustLanded();
  }

  async clickOnSaleFromNavBar() {
    await this.navBar.clickOnSale();
  }

  async clickSearchFromNavBar() {
    await this.navBar.clickSearch();
  }

  async clickCartFromNavBar() {
    await this.navBar.clickCart();
  }
  async clickFavouriteFromNavbar() {
    await this.navBar.clickFavourite()

  }
  async clickProfileFromNavbar() {
    await this.navBar.clickOnProfileName()
  }
}