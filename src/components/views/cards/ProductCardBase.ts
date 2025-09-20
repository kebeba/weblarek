import { Component } from "../../base/Component"
import { ensureElement } from "../../../utils/utils"


export interface ICardBase {
    title: string;
    price: number | null;
}


export class ProductCardBaseView<CardT extends ICardBase = ICardBase> extends Component<CardT> {

    protected productTitle: HTMLElement;
    protected productPrice: HTMLElement;
    
    constructor(container: HTMLElement) {
        super(container);

        this.productTitle = ensureElement<HTMLElement>(".card__title", this.container);
        this.productPrice = ensureElement<HTMLElement>(".card__price", this.container);
    }

    set title(value: string) {
        this.productTitle.textContent = value;
    }

    set price(value: number | null) {
        let priceText: string = "";
    
        if (value === null) {
            priceText = "Бесценно";
        } else {
            priceText = `${value} синапсов`;
        }
        
        this.productPrice.textContent = priceText;
    }

}
