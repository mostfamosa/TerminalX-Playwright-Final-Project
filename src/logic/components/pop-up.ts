import { Locator, Page } from "@playwright/test";
import { BaseComponent } from "./base-components";

export class PopUp extends BaseComponent {
  private readonly PAYMENT_PAGE_BUTTON_LOC =
    'a[data-test-id="qa-minicart-checkout-button"]';
  private readonly CART_PAGE_BUTTON_LOC =
    'a[data-test-id="qa-minicart-cart-button"]';
  private readonly CLOSE_POPUP_BUTTON_LOC =
    'button[class="tx-link-a icon_u36n remove_wqPe close_3POI rtl_i_e1 tx-link_29YD"]';

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
