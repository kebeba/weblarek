import { Component } from "../base/Component";
import { IEvents } from "../base/Events"
import { ensureElement } from "../../utils/utils"


interface IModal {
    contents: HTMLElement;
    isOpen: boolean;
}


export class ModalWindowView extends Component<IModal> {
    
    protected windowContents: HTMLElement;
    protected closeButton: HTMLButtonElement;

    constructor(protected events: IEvents, container: HTMLElement) {
        super(container);

        this.windowContents = ensureElement<HTMLElement>(".modal__content", this.container);
        this.closeButton = ensureElement<HTMLButtonElement>(".modal__close", this.container);

        this.closeButton.addEventListener("click", () => {
            this.events.emit("modal:close");
        });
        
        this.container.addEventListener("click", (e) => {
            if (e.target === e.currentTarget) {
                this.events.emit("modal:close");
            }
        });
    }

    set contents(element: HTMLElement) {
        this.windowContents.replaceChildren(element);
    }

    set isOpen(value: boolean) {
        if (value) {
            this.container.classList.add("modal_active");
        } else {
            this.container.classList.remove("modal_active");
        }
    }

}
