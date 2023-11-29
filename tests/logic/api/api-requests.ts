import { apiPostMethod } from "../../infra/api-handler";
import { requestOptions } from "./request/add-item-cart-request";
import { AddItemToCartResponse } from "./response/add-item-cart-response";

export const addItemToCart = async (itemId: string, quantity: number): Promise<AddItemToCartResponse> => {
    const url = "https://www.terminalx.com/pg/MutationAddAnyProductsToAnyCart?v=t4MeNg4Nhm8cTtfc8ZbCpP00Dzo%3D";
    return (await apiPostMethod(url, requestOptions(itemId, quantity))).json();
}