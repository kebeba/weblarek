import { IFormBase, FormBaseView } from "./FormBase"
import { ensureElement } from "../../../utils/utils"
import { IEvents } from "../../base/Events";


interface IContactsForm extends IFormBase {
    email: string | null;    
    phone: string | null;
}


export class ContactsFormView extends FormBaseView<IContactsForm> {
    
    protected emailInput: HTMLInputElement;
    protected phoneInput: HTMLInputElement;

    constructor(protected events: IEvents, container: HTMLFormElement) {
        super(events, container);
        
        this.emailInput = ensureElement<HTMLInputElement>("input[name='email']", this.container);
        this.phoneInput = ensureElement<HTMLInputElement>("input[name='phone']", this.container);

        this.container.addEventListener("input", (e) => {
            if (e.target === this.emailInput) {
                this.events.emit("contacts:changed", {field: "email", value: this.emailInput.value});
            }
            if (e.target === this.phoneInput) {
                this.events.emit("contacts:changed", {field: "phone", value: this.phoneInput.value});
            }
        });
    }

    set email(value: string | null) {
        if (value !== null) {
            this.emailInput.value = value;
        }
    }

    set phone(value: string | null) {
        if (value !== null) {
            this.phoneInput.value = value;
        }
    }

}
