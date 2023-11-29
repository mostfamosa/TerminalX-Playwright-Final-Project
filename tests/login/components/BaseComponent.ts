import { Page } from "@playwright/test";
import { BasePage } from "../pages/BasePage";


export class BaseComponent extends BasePage {
    constructor(page: Page) {
        super(page);
    }
}