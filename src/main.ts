import './scss/styles.scss';

import { apiProducts } from "./utils/data.ts"
import { cloneTemplate } from "./utils/utils.ts"

import {Api} from "./components/base/Api.ts"
import { API_URL } from "./utils/constants.ts"

import { EventEmitter } from "./components/base/Events.ts"

import { Buyer } from "./components/models/Buyer.ts"
import { Catalog } from "./components/models/Catalog.ts"
import { ShoppingCart } from "./components/models/ShoppingCart.ts"

import { CartView } from "./components/views/Cart.ts"
import { CatalogView } from "./components/views/Catalog.ts"
import { HeaderView } from "./components/views/Header.ts"
import { ModalWindowView } from "./components/views/Modal.ts"
import { OrderFormView } from "./components/views/forms/OrderForm.ts"
import { ProductCardCartView } from './components/views/cards/ProductCardCart.ts'
import { ProductCardCatalogView } from "./components/views/cards/ProductCardCatalog.ts"
import { ProductCardPreviewView } from "./components/views/cards/ProductCardPreview.ts"

import { WebClient } from "./components/models/WebClient.ts"
import { IProduct } from './types/index.ts';


function renderShoppingCartContents():HTMLElement {
    let cartContents: string | HTMLElement[] = "Корзина пуста";
    let isDisabled = true;
    if (cartModel.countProducts() !== 0) {
        isDisabled = false;
        cartContents = cartModel.getStoredProducts().map((product, idx) => {
            const cardTemplate = cloneTemplate("#card-basket");
            cardTemplate.dataset.id = product.id;
            const cardView = new ProductCardCartView(events, cardTemplate);
            
            return cardView.render({
                title: product.title,
                price: product.price,
                index: idx + 1,
            });
        });
    }
    
    return cartView.render({
        contents: cartContents,
        price: cartModel.countPrice(),
        isBtnDisabled: isDisabled,
    });
}

const api = new Api(API_URL);
const client = new WebClient(api);

const events = new EventEmitter();

const catalogModel = new Catalog(events);
const cartModel = new ShoppingCart(events);
const userModel = new Buyer();

catalogModel.setProducts(await client.getCatalog());

const cartView = new CartView(events, cloneTemplate("#basket"));
const headerView = new HeaderView(events, document.querySelector(".header") as HTMLElement);
const modalWindowView = new ModalWindowView(events, document.querySelector(".modal") as HTMLElement);

const catalogView = new CatalogView(document.querySelector(".gallery") as HTMLElement);
const productCards: HTMLElement[] = catalogModel.getProducts().map(product => {
    const productCardTemplate = cloneTemplate("#card-catalog");
    productCardTemplate.dataset.id = product.id;
    const cardView = new ProductCardCatalogView(events, productCardTemplate);
    return cardView.render({
        title: product.title,
        price: product.price,
        image: product.image,
        category: product.category,
    });
});
catalogView.cards = productCards;


// apiCatalog.forEach(product => {
//     if (product.price !== null) {
//         cart.addProduct(product);
//     }
// })
// const orderItems = cart.getStoredProducts().map(item => item.id);
// const userData = buyer.getData();
// const orderRsp = await client.postOrder(
//     {
//         payment: userData.payment,
//         email: userData.email,
//         phone: userData.phone,
//         address: userData.address,
//         items: orderItems,
//         total: cart.countPrice(),
//     }
// );
// console.log("Результат формирования пробного заказа:", orderRsp);


events.on("cart:open", () => {
    modalWindowView.render({
        contents: renderShoppingCartContents(),
        isOpen: true,
    });
});

events.on("cart:update", () => {
    headerView.counter = cartModel.countProducts();
});

events.on<{id: string}>("card:remove-from-cart", ({id}) => {
    const product = catalogModel.findProduct(id) as IProduct;
    cartModel.removeProduct(product);
    modalWindowView.render({
        contents: renderShoppingCartContents(),
        isOpen: true,
    });
});

events.on<{id: string}>("card:open-preview", ({id}) => {
    const product = catalogModel.findProduct(id);
    catalogModel.setSelectedProduct(product as IProduct);
});

events.on<{id: string}>("card:preview-pushed", ({id}) => {
    const product = catalogModel.findProduct(id) as IProduct;
    
    if (cartModel.isAdded(id)) {
        cartModel.removeProduct(product);
    } else {
        cartModel.addProduct(product);
    }

    catalogModel.setSelectedProduct(product);
});

events.on("selectedProduct:changed", () => {
    const selectedProduct = catalogModel.getSelectedProduct() as IProduct;
    const previewCardTemplate = cloneTemplate("#card-preview");
    previewCardTemplate.dataset.id = selectedProduct.id;
    const previewCardView = new ProductCardPreviewView(events, previewCardTemplate);

    let btnText = "Купить";
    let isDisabled = false;
    if (selectedProduct.price == null) {
        btnText = "Недоступно";
        isDisabled = true;
    }
    if (cartModel.isAdded(selectedProduct.id)) {
        btnText = "Удалить из корзины";
    }
    
    const previewCard = previewCardView.render({
        title: selectedProduct.title,
        price: selectedProduct.price,
        image: selectedProduct.image,
        category: selectedProduct.category,
        text: selectedProduct.description,
        btnText: btnText,
        isBtnDisabled: isDisabled,
    })

    modalWindowView.render({
        contents: previewCard,
        isOpen: true,
    });
});

events.on("modal:close", () => {
    modalWindowView.render({
        isOpen: false
    });
});











