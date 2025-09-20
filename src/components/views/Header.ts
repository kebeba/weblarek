import { Component } from "../base/Component"
import { IEvents } from "../base/Events"
import { ensureElement } from "../../utils/utils"


interface IHeader {
    counter: number;
}


export class HeaderView extends Component<IHeader> {

    protected cartCounter: HTMLElement;
    protected cartButton: HTMLButtonElement;
    
    constructor(protected events: IEvents, container: HTMLElement) {
        super(container);

        this.cartCounter = ensureElement<HTMLElement>(".header__basket-counter", this.container);
        this.cartButton = ensureElement<HTMLButtonElement>(".header__basket", this.container);

        this.cartButton.addEventListener("click", () => {
            this.events.emit("basket:open")
        })
    }

    set counter(value: number) {
        this.cartCounter.textContent = String(value)
    }

}
