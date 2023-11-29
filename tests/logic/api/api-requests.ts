import { apiPostMethod } from "../../infra/api-handler";
import { requestOptionsAddToCart } from "./request/add-item-cart-request";
import { requestOptionsAddToMyList } from "./request/add-item-mylist-request";
import { AddItemToCartResponse } from "./response/add-item-cart-response";
import { AddProductsToWishlistResponse } from "./response/add-item-mylist-response";

export const addItemToCart = async (itemId: string, quantity: number): Promise<AddItemToCartResponse> => {
    const url = "https://www.terminalx.com/pg/MutationAddAnyProductsToAnyCart?v=t4MeNg4Nhm8cTtfc8ZbCpP00Dzo%3D";
    return (await apiPostMethod(url, requestOptionsAddToCart(itemId, quantity))).json();
}

export const addItemToMyList = async (itemId: string): Promise<AddProductsToWishlistResponse> => {
    const url = "https://www.terminalx.com/pg/MutationAddProductsToWishlist?v=o%2Fi6SZVDy2k6kuJd8zRFtjUC6Hs%3D";
    return (await apiPostMethod(url, requestOptionsAddToMyList(itemId))).json();
}