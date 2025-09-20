import { IBuyer, TPayment } from "../../types/index"


export class Buyer {

    private payment: TPayment;
    private email: string;
    private phone: string;
    private address: string;
    
    constructor(
        data: IBuyer = { 
            payment: null,
            email: "",
            phone: "",
            address: "",
        }
    ) {
        this.payment = data.payment;
        this.email = data.email;
        this.phone = data.phone;
        this.address = data.address;
    }

    public setPayment(payment: TPayment): void {
        this.payment = payment;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public setPhone(phone: string): void {
        this.phone = phone;
    }

    public setAddress(address: string): void {
        this.address = address;
    }

    public setData(data: IBuyer): void {
        this.payment = data.payment;
        this.email = data.email;
        this.phone = data.phone;
        this.address = data.address;
    }

    public getData(): IBuyer {
        return {
            payment: this.payment,
            email: this.email,
            phone: this.phone,
            address: this.address,
        }
    }

    public reset(): void {
        this.payment = null;
        this.email = "";
        this.phone = "";
        this.address = "";
    }

    public validatePayment(): null | string {
        if (this.payment === "card" || this.payment === "cash") {
            return null;
        } else {
            return "Не указан способ оплаты!";
        }
    }

    public validateEmail(): null | string {
        if (this.email.length > 0) {
            return null;
        } else {
            return "Не указан адрес электронной почты!";
        }
    }

    public validatePhone(): null | string {
        if (this.phone.length > 0) {
            return null;
        } else {
            return "Не указан номер телефона!";
        }
    }

    public validateAddress(): null | string {
        if (this.address.length > 0) {
            return null;
        } else {
            return "Не указан адрес доставки!";
        }
    }

    public validateBuyer(): null | string {
        const validityChecks = [
            this.validatePayment(),
            this.validateEmail(),
            this.validatePhone(),
            this.validateAddress(),
        ]

        for (let check of validityChecks) {
            if (typeof check === "string")
                return check;
        }

        return null;
    }

}
