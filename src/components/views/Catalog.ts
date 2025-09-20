import { Component } from "../base/Component";


interface ICatalog {
    cards: HTMLElement[];
}


export class CatalogView extends Component<ICatalog> {
    
    protected productsCatalog: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);
        this.productsCatalog = container;
    }

    set cards(products: HTMLElement[]) {
        this.productsCatalog.replaceChildren(...products);
    }

}
