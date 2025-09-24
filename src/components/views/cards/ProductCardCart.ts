import { ICardBase, ProductCardBaseView } from "./ProductCardBase"
import { IEvents } from "../../base/Events"
import { ensureElement } from "../../../utils/utils"
import { Events } from "../../../utils/constants"


interface ICardCart extends ICardBase {
    index: number;
}


export class ProductCardCartView extends ProductCardBaseView<ICardCart> {

    protected productIndex: HTMLElement;
    protected productDeleteButton: HTMLButtonElement;

    constructor(protected events: IEvents, container: HTMLElement) {
        super(container);

        this.productIndex = ensureElement<HTMLElement>(".basket__item-index", this.container);
        this.productDeleteButton = ensureElement<HTMLButtonElement>(".basket__item-delete", this.container);

        this.productDeleteButton.addEventListener("click", () => {
            this.events.emit(Events.CARD.REMOVE, {id: this.container.dataset.id})

        });
    }

    set index(value: number) {
        this.productIndex.textContent = String(value);
    }

}