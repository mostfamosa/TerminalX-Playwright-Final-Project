import { Locator, Page } from "@playwright/test";
import { BaseComponent } from "./base-components";

export class PopUp extends BaseComponent {
  private readonly PAYMENT_PAGE_BUTTON_LOC =
    '//[@id="top-portal-root"]/div/div/div/div[3]/a[1]';
  private readonly CART_PAGE_BUTTON_LOC =
    '//[@id="top-portal-root"]/div/div/div/div[3]/a[2]';
  private readonly CLOSE_POPUP_BUTTON_LOC =
    '//[@id="top-portal-root"]/div/div/div/div[1]/button';

  private paymentPageBtn: Locator;
  private cartPageBtn: Locator;
  private closePopupBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.closePopupBtn = page.locator(this.CLOSE_POPUP_BUTTON_LOC);
    this.cartPageBtn = page.locator(this.CART_PAGE_BUTTON_LOC);
    this.paymentPageBtn = page.locator(this.PAYMENT_PAGE_BUTTON_LOC);
  }

  async clickCartPageBtn() {
    await this.cartPageBtn.click();
  }

  async clickPaymentPageBtn() {
    await this.paymentPageBtn.click();
  }

  async clickClosePopUpBtn() {
    await this.closePopupBtn.click;
  }
}
