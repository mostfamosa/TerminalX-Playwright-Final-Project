import { AddProductsToWishlistResponse } from "../api/response/add-item-mylist-response";
import { ResponseWrapper } from "../api/response/response-wrapper";

export class MyListHandler {
    private data: AddProductsToWishlistResponse;
    constructor(res: ResponseWrapper<AddProductsToWishlistResponse>) {
        this.data = res.data;
    }

    findProductIndexById(productId: number) {
        for (let index = 0; index < this.getNumberOfItemsInMyList(); index++) {
            if (this.data.data.addProductsToWishlist.anyWishlist.items[index].id == productId)
                return index
        }
        console.log("Cant Find The Product With Id =" + productId);
        return -1;
    }

    getLastItemAddedToMyList(productId: number) {
        if (this.findProductIndexById(productId) != undefined)
            return this.data.data.addProductsToWishlist.anyWishlist.items[this.findProductIndexById(productId)];
        return this.data.data.addProductsToWishlist.anyWishlist.items[0];
    }

    getNewestItemLabel(productId: number) {
        return this.getLastItemAddedToMyList(productId).product.thumbnail.label;
    }

    // getNewestItemColor() {
    //     return this.getLastItemAddedToMyList().configurable_options[0].value_label;
    // }

    // getNewestItemSize() {
    //     return this.getLastItemAddedToMyList().configurable_options[1].value_label;
    // }

    getNewestItemBrand(productId: number) {
        return this.getLastItemAddedToMyList(productId).product.brand_url.name;
    }

    getNewestItemPrice(productId: number) {
        return this.getLastItemAddedToMyList(productId).product.price_range.maximum_price;
    }

    getNewestItemDiscount(productId: number) {
        return this.getLastItemAddedToMyList(productId).product.price_range.maximum_price.discount.percent_off;
    }

    getNumberOfItemsInMyList() {
        return this.data.data.addProductsToWishlist.anyWishlist.items.length;
    }

}