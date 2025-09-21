import { Component } from "../base/Component";
import { IEvents } from "../base/Events"
import { ensureElement } from "../../utils/utils"


interface IOrderMade {
    price: number;
}


export class OrderMadeView extends Component<IOrderMade> {
    
    protected totalPrice: HTMLElement;
    protected backToCatalogButton: HTMLButtonElement;

    constructor(protected events: IEvents, container: HTMLElement) {
        super(container);

        this.totalPrice = ensureElement<HTMLElement>(".order-success__description", this.container);
        this.backToCatalogButton = ensureElement<HTMLButtonElement>(".order-success__close", this.container);

        this.backToCatalogButton.addEventListener("click", () => {
            this.events.emit("catalog:return");
        });
    }

    set price(value: number) {
        this.totalPrice.textContent = `Списано ${value} синапсов`;
    }

}
