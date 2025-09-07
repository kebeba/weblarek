export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';
export type TPayment = 'card' | 'cash' | null;

export interface IGetProductResponse {
    total: number;
    items: IProduct[];
}

export interface IPostOrderRequest extends IBuyer {
    items: string[];
    total: number;
}

export interface IPostOrderResponse {
    id: string;
    total: number;
}

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export interface IProduct {
    id: string;
    title: string;
    description: string;
    image: string;
    category: string;
    price: number | null;
}

export interface IBuyer {
    payment: TPayment;
    email: string;
    phone: string;
    address: string;
}
