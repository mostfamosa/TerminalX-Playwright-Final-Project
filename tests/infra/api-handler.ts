import { request } from "playwright"

const apiPostMethod = async(url:string,data?:any) =>{
    const requestApi = await request.newContext()
    return requestApi.post(url,data)
}

export{apiPostMethod}