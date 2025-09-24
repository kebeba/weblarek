import { IProduct } from "../../types/index"
import { IEvents } from "../base/Events"
import { Events } from "../../utils/constants"


export class Catalog {

    private products: IProduct[];
    private selectedProduct: IProduct | null;

    constructor(
        protected events: IEvents,
        products: IProduct[] = [],
        selectedProduct: IProduct | null = null,
    ) {
        this.products = products;
        this.selectedProduct = selectedProduct;
    }

    public setProducts(products: IProduct[]): void {
        this.products = products.slice();
        this.events.emit(Events.CATALOG.CHANGED);
    }

    public setSelectedProduct(product: IProduct): void {
        this.selectedProduct = product;
        this.events.emit(Events.CATALOG.SELECTED_CHANGED);
    }

    public getProducts(): IProduct[] {
        return this.products.slice();
    }

    public getSelectedProduct(): IProduct | null {
        return this.selectedProduct;
    }

    public findProduct(id: string): IProduct | null {
        let foundProduct = null;
        
        this.products.forEach(product => {
            if (product.id === id) {
                foundProduct = product
            }
        });

        return foundProduct
    }

}
