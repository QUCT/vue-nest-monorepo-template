export interface CommonInterface {
    id: number;
    name: string;
    time: string;
}
export declare function commonFunction(): string;
export interface ResponseData<T> {
    data: T;
    code: number;
    success: boolean;
    timestamp: string;
    method: string;
    path: string;
}
