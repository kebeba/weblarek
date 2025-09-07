import type { IProduct, IApi, IGetProductResponse, IPostOrderRequest, IPostOrderResponse } from "../../types/index";

export class WebClient {
    
    constructor(private readonly api: IApi) {}

    async getCatalog(): Promise<IProduct[]> {
        const data = await this.api.get<IGetProductResponse>("/product/");
        return data.items;
    }
    
    async postOrder(orderRequest: IPostOrderRequest): Promise<IPostOrderResponse> {
        return this.api.post<IPostOrderResponse>("/order/", orderRequest, "POST");
    }
}
