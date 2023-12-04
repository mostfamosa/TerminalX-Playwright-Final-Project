export interface ResponseWrapper<T> {
    ok: boolean;
    status: number;
    data: T;
}