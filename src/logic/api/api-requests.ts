import { apiPostMethod } from "../../infra/api-handler";
import { requestOptionsAddToCart } from "./request/add-item-cart-request";
import { requestOptionsAddToMyList } from "./request/add-item-mylist-request";
import { requestOptionsUserInfo } from "./request/current-user-info-request";
import { AddItemToCartResponse } from "./response/add-item-cart-response";
import { AddProductsToWishlistResponse } from "./response/add-item-mylist-response";
import { CurrentUserInfoResponse } from "./response/current-user-info-response";
import { requestOptionsDeleteItemList } from "./request/delete-item-mylist-request";
import { requestOptionsDeleteItemCart } from "./request/delete-item-cart-request";

import { urls } from "./api-urls.json";
import { WishlistResponse } from "./response/get-wish-list-response";
import { ResponseWrapper } from "./response/response-wrapper";

export const addItemToCart = async (itemSku: string, quantity: number): Promise<ResponseWrapper<AddItemToCartResponse>> => {
    return await apiPostMethod(urls.addItemToCart, requestOptionsAddToCart(itemSku, quantity));
}

export const addItemToMyList = async (itemId: number): Promise<ResponseWrapper<AddProductsToWishlistResponse>> => {
    return await apiPostMethod(urls.addItemToMyList, requestOptionsAddToMyList(itemId));
}

export const currentUserInfo = async (): Promise<ResponseWrapper<CurrentUserInfoResponse>> => {
    return await apiPostMethod(urls.currentUserInfo, requestOptionsUserInfo());
}

export const deleteItemFromListById = async (itemId: number): Promise<ResponseWrapper<AddProductsToWishlistResponse>> => {
    return await apiPostMethod(urls.deleteItemFromListById, requestOptionsDeleteItemList(itemId));
}

export const deleteItemFromCartById = async (itemId: number): Promise<ResponseWrapper<AddItemToCartResponse>> => {
    return await apiPostMethod(urls.deleteItemFromCartById, requestOptionsDeleteItemCart(itemId));
}

export const getUserWishList = async (): Promise<ResponseWrapper<WishlistResponse>> => {
    return await apiPostMethod(urls.userWishList);
}