import { Component } from "../../base/Component"
import { ensureElement } from "../../../utils/utils"
import { IEvents } from "../../base/Events";


export interface IFormBase {
    error: string | null;
}


export class FormBaseView<FormT extends IFormBase = IFormBase> extends Component<FormT> {
    
    protected formError: HTMLElement;
    protected submitButton: HTMLButtonElement;

    constructor(protected events: IEvents, container: HTMLFormElement) {
        super(container);

        this.formError = ensureElement<HTMLElement>(".form__errors", this.container);
        this.submitButton = ensureElement<HTMLButtonElement>("button[type='submit']", this.container);

        this.container.addEventListener("submit", (e) => {
            e.preventDefault();
            this.events.emit("submitButton:submit");
        });
    }

    set error(value: string | null) {
        let errorText: string = "";
        if (value !== null) {
            errorText = value;
        }
        this.formError.textContent = errorText;
    }

}
