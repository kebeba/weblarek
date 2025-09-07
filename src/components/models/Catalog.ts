import { IProduct } from "../../types/index"


export class Catalog {

    private products: IProduct[];
    private selectedProduct: IProduct | null;

    constructor(
        products: IProduct[] = [],
        selectedProduct: IProduct | null = null,
    ) {
        this.products = products;
        this.selectedProduct = selectedProduct;
    }

    public setProducts(products: IProduct[]): void {
        this.products = products.slice();
    }

    public setSelectedProduct(product: IProduct): void {
        this.selectedProduct = product;
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
