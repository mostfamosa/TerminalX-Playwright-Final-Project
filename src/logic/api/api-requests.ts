import { apiPostMethod } from "../../infra/api-handler";
import { requestOptionsAddToCart } from "./request/add-item-cart-request";
import { requestOptionsAddToMyList } from "./request/add-item-mylist-request";
import { requestOptionsUserInfo } from "./request/current-user-info-request";
import { AddItemToCartResponse } from "./response/add-item-cart-response";
import { AddProductsToWishlistResponse } from "./response/add-item-mylist-response";
import { CurrentUserInfoResponse } from "./response/current-user-info-response";
import { requestOptionsDeleteItem } from "./request/delete-item-mylist-request";
import { urls } from "./api-urls.json";
import { WishlistResponse } from "./response/get-wish-list-response";

export const addItemToCart = async (itemSku: string, quantity: number): Promise<AddItemToCartResponse> => {
    return (await apiPostMethod(urls.addItemToCart, requestOptionsAddToCart(itemSku, quantity))).json();
}

export const addItemToMyList = async (itemId: number): Promise<AddProductsToWishlistResponse> => {
    return (await apiPostMethod(urls.addItemToMyList, requestOptionsAddToMyList(itemId))).json();
}

export const currentUserInfo = async (): Promise<CurrentUserInfoResponse> => {
    return (await apiPostMethod(urls.currentUserInfo, requestOptionsUserInfo())).json();
}

export const deleteItemFromListById = async (itemId: number): Promise<AddProductsToWishlistResponse> => {
    return (await apiPostMethod(urls.deleteItemFromListById, requestOptionsDeleteItem(itemId))).json();
}

export const getUserWishList = async (): Promise<WishlistResponse> => {
    return (await apiPostMethod(urls.userWishList)).json();
}