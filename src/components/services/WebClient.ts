import { IProduct, IGetProductResponse, IPostOrderRequest, IPostOrderResponse } from "../../types/index";
import { Api } from "../base/Api"

export class WebClient extends Api {
    
    constructor(baseUrl: string, options: RequestInit = {}) {
        super(baseUrl, options);
    }

    async getCatalog(): Promise<IProduct[]> {
        const data = await this.get<IGetProductResponse>("/product/");
        return data.items;
    }
    
    async postOrder(orderRequest: IPostOrderRequest): Promise<IPostOrderResponse> {
        return this.post<IPostOrderResponse>("/order/", orderRequest, "POST");
    }
}
