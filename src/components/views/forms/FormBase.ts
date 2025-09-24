import { Component } from "../../base/Component"
import { ensureElement } from "../../../utils/utils"
import { IEvents } from "../../base/Events";
import { Events } from "../../../utils/constants"


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
            this.events.emit(Events.FORM.SUBMIT, {formType: this.container.getAttribute("name")});
        });
    }

    set error(value: string | null) {
        if (value !== null) {
            this.formError.textContent = value;
            this.submitButton.disabled = true;
        } else {
            this.formError.textContent = "";
            this.submitButton.disabled = false;
        }
    }

}
