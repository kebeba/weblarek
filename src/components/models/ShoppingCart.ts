import { IProduct } from "../../types/index"


export class ShoppingCart {

    private products: IProduct[];

    constructor(products: IProduct[] = []) {
        this.products = products;
    }

    public getStoredProducts(): IProduct[] {
        return this.products;
    }

    public addProduct(product: IProduct): void {
        this.products.push(product);
    }

    public popProduct(product: IProduct): void {
        const productID = product.id;
        let removeIdx = null;
        
        this.products.forEach((item, idx) => {
            if (item.id === productID) {
                removeIdx = idx;
            }
        });

        if (removeIdx !== null) {
            this.products.splice(removeIdx, 1);
        }
    }

    public flush(): void {
        this.products = [];
    }

    public countPrice(): number {
        let totalPrice = 0;

        this.products.forEach(product => {
            if (product.price !== null) {
                totalPrice += product.price;
            }
        });

        return totalPrice;
    }

    public countProducts(): number {
        return this.products.length;
    }

    public isAdded(id: string): boolean {
        return this.products.some(product => product.id === id);
    }

}
