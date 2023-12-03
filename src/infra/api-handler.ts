import { request } from "playwright";
import { ResponseWrapper } from "../logic/api/response/response-wrapper";

const apiPostMethod = async (url: string, data?: any): Promise<ResponseWrapper<any>> => {
    const requestApi = await (await request.newContext()).post(url, data)
    const responseWrapper: ResponseWrapper<any> = {
        data: await requestApi.json(),
        ok: requestApi.ok(),
        status: requestApi.status()
    };
    return responseWrapper;
}

export { apiPostMethod }