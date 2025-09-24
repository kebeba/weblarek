import { Component } from "../base/Component";
import { IEvents } from "../base/Events"
import { ensureElement } from "../../utils/utils"
import { Events } from "../../utils/constants"


interface ICart {
    contents: HTMLElement[] | string;
    price: number;
    isBtnDisabled: boolean;
}


export class CartView extends Component<ICart> {
    
    protected productsList: HTMLElement;
    protected totalPrice: HTMLElement;
    protected makeOrderButton: HTMLButtonElement;

    constructor(protected events: IEvents, container: HTMLElement) {
        super(container);

        this.productsList = ensureElement<HTMLElement>(".basket__list", this.container);
        this.totalPrice = ensureElement<HTMLElement>(".basket__price", this.container);
        this.makeOrderButton = ensureElement<HTMLButtonElement>(".basket__button", this.container);

        this.makeOrderButton.addEventListener("click", () => {
            this.events.emit(Events.ORDER.MAKE);
        });
    }

    set contents(products: HTMLElement[]) {
        this.productsList.replaceChildren(...products);
    }

    set price(value: number) {
        this.totalPrice.textContent = `${String(value)} синапсов`;
    }

    set isBtnDisabled(value: boolean) {
        this.makeOrderButton.disabled = value;
    }

}
