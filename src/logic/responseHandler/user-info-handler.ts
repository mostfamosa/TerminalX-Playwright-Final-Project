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
    
    getNewestItemId() {
        return this.data.data.currentUserInfo.cart_object.items[this.getNumberOfItemsInCart() - 1].id;
    }

    getNewestItemLabel() {
        return this.getLastItemAddedToCart().product.thumbnail.label;
    }

    getNewestItemColor() {
        return this.getLastItemAddedToCart().configurable_options[0].value_label;
    }

    getNewestItemSize() {
        return this.getLastItemAddedToCart().configurable_options[1].value_label;
    }

    getNewestItemBrand() {
        return this.getLastItemAddedToCart().product.brand_url.name;
    }

    getNewestItemPrice() {
        return this.getLastItemAddedToCart().product.price_range.maximum_price;
    }

    getNumberOfItemsInCart() {
        return this.data.data.currentUserInfo.cart_object.items.length;
    }

}