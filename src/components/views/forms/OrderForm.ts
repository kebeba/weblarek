import { IFormBase, FormBaseView } from "./FormBase"
import {TPayment} from "../../../types"
import { ensureElement } from "../../../utils/utils"
import { IEvents } from "../../base/Events";


interface IOrderForm extends IFormBase {
    payment: TPayment | null;    
    address: string | null;
}


export class OrderFormView extends FormBaseView<IOrderForm> {
    
    protected cashPaymentButton: HTMLButtonElement;
    protected cardPaymentButton: HTMLButtonElement;
    protected addressInput: HTMLInputElement;

    constructor(protected events: IEvents, container: HTMLFormElement) {
        super(events, container);

        this.cashPaymentButton = ensureElement<HTMLButtonElement>("button[name='cash']", this.container);
        this.cardPaymentButton = ensureElement<HTMLButtonElement>("button[name='card']", this.container);
        this.addressInput = ensureElement<HTMLInputElement>("input[name='address']", this.container);

        this.cashPaymentButton.addEventListener("click", () => {
            this.events.emit("payment:cash")
        });

        this.cardPaymentButton.addEventListener("click", () => {
            this.events.emit("payment:card")
        });
        
        this.container.addEventListener("change", (e) => {
            if (e.target === this.addressInput) {
                this.events.emit("address:changed", {address: this.addressInput.value})
            }
        });
    }

    set payment(value: TPayment | null) {
        switch (value) {
            case null:
                this.cashPaymentButton.classList.remove("button_alt-active");
                this.cardPaymentButton.classList.remove("button_alt-active");
                return;
            case "cash":
                this.cashPaymentButton.classList.add("button_alt-active");
                this.cardPaymentButton.classList.remove("button_alt-active");
                return;
            case "card":
                this.cardPaymentButton.classList.add("button_alt-active");
                this.cashPaymentButton.classList.remove("button_alt-active");
                return;
        }
    }

    set address(value: string | null) {
        if (value !== null) {
            this.addressInput.value = value;
        }
    }

}
