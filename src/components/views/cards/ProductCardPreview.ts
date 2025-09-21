import { ICardBase, ProductCardBaseView } from "./ProductCardBase"
import { IEvents } from "../../base/Events"
import { categoryMap } from "../../../utils/constants"
import { ensureElement } from "../../../utils/utils"


interface ICardPreview extends ICardBase {
    category: string;
    image: string;
    text: string;
    btnText: string;
    isBtnDisabled: boolean;
}


export class ProductCardPreviewView extends ProductCardBaseView<ICardPreview> {

    protected productCategory: HTMLElement;
    protected productImage: HTMLImageElement;
    protected productText: HTMLElement;
    protected productButton: HTMLButtonElement;
    
    constructor(protected events: IEvents, container: HTMLElement) {
        super(container);

        this.productCategory = ensureElement<HTMLElement>(".card__category", this.container);
        this.productCategory.className = "card__category";
        this.productImage = ensureElement<HTMLImageElement>(".card__image", this.container);
        this.productText = ensureElement<HTMLElement>(".card__text", this.container);
        this.productButton = ensureElement<HTMLButtonElement>(".card__button", this.container);

        this.productButton.addEventListener("click", () => {
            if (!this.productButton.disabled) {
                this.events.emit("card:preview-pushed", { id: this.container.dataset.id });
            }
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

    set text(value: string) {
        this.productText.textContent = value;
    }

    set btnText(value: string) {
        this.productButton.textContent = value;
    }

    set isBtnDisabled(value: boolean) {
        if (value) {
            this.productButton.disabled = true;
        } else {
            this.productButton.disabled = false;
        }
    }

}