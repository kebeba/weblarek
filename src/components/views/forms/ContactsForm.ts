import { IFormBase, FormBaseView } from "./FormBase"
import { ensureElement } from "../../../utils/utils"
import { IEvents } from "../../base/Events";
import { Events } from "../../../utils/constants"


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
                this.events.emit(Events.EMAIL.CHANGED, {email: this.emailInput.value})
            }
            if (e.target === this.phoneInput) {
                this.events.emit(Events.PHONE.CHANGED, {phone: this.phoneInput.value})
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
