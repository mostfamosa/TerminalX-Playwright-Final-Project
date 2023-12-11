import { CurrentUserInfoResponse } from "../api/response/current-user-info-response";
import { ResponseWrapper } from "../api/response/response-wrapper";

export class UserInfo {
    private data: CurrentUserInfoResponse;
    constructor(res: ResponseWrapper<CurrentUserInfoResponse>) {
        this.data = res.data;
    }

    getLastItemAddedToCart() {
        return this.data.data.currentUserInfo.cart_object.items[this.getNumberOfItemsInCart() - 1];
    }

    getItemsInCart() {
        return this.data.data.currentUserInfo.cart_object.items;
    }

    getNewestItemId() {
        return this.data.data.currentUserInfo.cart_object.items[this.getNumberOfItemsInCart() - 1].id;
    }

    getItemIdBySku(sku: string) {
        return Number(this.getItemBySku(sku)?.id);
    }

    getItemBySku(sku: string) {
        for (let i = 0; i < this.getNumberOfItemsInCart(); i++) {
            if (sku.includes(this.getItemsInCart()[i].product.sku))
                return this.getItemsInCart()[i];
        }
        console.error(`Can't Find Item With sku = ${sku}`);
    }

    getNewestItemLabel() {
        return this.getLastItemAddedToCart().product.thumbnail.label;
    }

    getItemLabelBySku(sku: string) {
        return this.getItemBySku(sku)?.product.thumbnail.label;
    }

    getNewestItemColor() {
        return this.getLastItemAddedToCart().configurable_options[0].value_label;
    }

    getItemColorBySku(sku: string) {
        return this.getItemBySku(sku)?.configurable_options[0].value_label;
    }

    getNewestItemSize() {
        return this.getLastItemAddedToCart().configurable_options[1].value_label;
    }

    getItemSizeBySku(sku: string) {
        return this.getItemBySku(sku)?.configurable_options[1].value_label;
    }

    getNewestItemBrand() {
        return this.getLastItemAddedToCart().product.brand_url.name;
    }

    getItemBrandBySku(sku: string) {
        return this.getItemBySku(sku)?.product.brand_url.name;
    }

    getNewestItemPrice() {
        return this.getLastItemAddedToCart().product.price_range.maximum_price;
    }

    getItemPriceBySku(sku: string) {
        let item = this.getItemBySku(sku);
        if (!item) {
            throw Error("Item Not Found");
        }
        return item.product.price_range.maximum_price;
    }

    getNumberOfItemsInCart() {
        return this.data.data.currentUserInfo.cart_object.items.length;
    }

}