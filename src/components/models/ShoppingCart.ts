import { IProduct } from "../../types/index"
import { IEvents } from "../base/Events"
import { Events } from "../../utils/constants"


export class ShoppingCart {

    private products: IProduct[];

    constructor(protected events: IEvents, products: IProduct[] = []) {
        this.products = products;
    }

    public getStoredProducts(): IProduct[] {
        return this.products.slice();
    }

    public addProduct(product: IProduct): void {
        this.products.push(product);
        this.events.emit("cart:update");
    }

    public removeProduct(product: IProduct): void {
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

        this.events.emit(Events.CART.UPDATE);
    }

    public empty(): void {
        this.products = [];
        this.events.emit(Events.CART.UPDATE);
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
