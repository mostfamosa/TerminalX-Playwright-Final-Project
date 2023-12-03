import { apiPostMethod } from "../../infra/api-handler";
import { requestOptionsAddToCart } from "./request/add-item-cart-request";
import { requestOptionsAddToMyList } from "./request/add-item-mylist-request";
import { requestOptionsUserInfo } from "./request/current-user-info-request";
import { AddItemToCartResponse } from "./response/add-item-cart-response";
import { AddProductsToWishlistResponse } from "./response/add-item-mylist-response";
import { CurrentUserInfoResponse } from "./response/current-user-info-response";
import { urls } from "./api-urls.json";

export const addItemToCart = async (itemId: string, quantity: number): Promise<AddItemToCartResponse> => {
    return (await apiPostMethod(urls.addItemToCart, requestOptionsAddToCart(itemId, quantity))).json();
}

export const addItemToMyList = async (itemId: string): Promise<AddProductsToWishlistResponse> => {
    return (await apiPostMethod(urls.addItemToMyList, requestOptionsAddToMyList(itemId))).json();
}

export const currentUserInfo = async (): Promise<CurrentUserInfoResponse> => {
    return (await apiPostMethod(urls.currentUserInfo, requestOptionsUserInfo())).json();
}

// export const deleteItemFromCartById = async (): Promise<AddItemToCartResponse> => {
//     return (await apiPostMethod(urls.deleteItemFromCartById, requestOptionsDeleteItem())).json();
// }