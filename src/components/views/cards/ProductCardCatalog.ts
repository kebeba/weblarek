import { ICardBase, ProductCardBaseView } from "./ProductCardBase"
import { IEvents } from "../../base/Events"
import { categoryMap } from "../../../utils/constants"
import { ensureElement } from "../../../utils/utils"
import { Events } from "../../../utils/constants"


interface ICardCatalog extends ICardBase {
    category: string;
    image: string;
}


export class ProductCardCatalogView extends ProductCardBaseView<ICardCatalog> {

    protected productCategory: HTMLElement;
    protected productImage: HTMLImageElement;
    
    constructor(protected events: IEvents, container: HTMLElement) {
        super(container);

        this.productCategory = ensureElement<HTMLElement>(".card__category", this.container);
        this.productCategory.className = "card__category";
        this.productImage = ensureElement<HTMLImageElement>(".card__image", this.container);

        this.container.addEventListener("click", () => {
            this.events.emit(Events.CARD.OPEN, {id: this.container.dataset.id});
        });
    }

    set category(value: string) {
        this.productCategory.textContent = value;
        const categoryKey = value as keyof typeof categoryMap;
        this.productCategory.classList.add(categoryMap[categoryKey]);
    }
    
    set image(value: string) {
        this.setImage(this.productImage, value, this.productTitle.textContent.trim());
    }

}
