import './scss/styles.scss';

import { apiProducts } from "./utils/data.ts"

import { Byer } from "./components/models/Byer.ts"
import { Catalog } from "./components/models/Catalog.ts"
import { ShoppingCart } from "./components/models/ShoppingCart.ts"


let catalog = new Catalog();
catalog.setProducts(apiProducts.items);
catalog.setSelectedProduct(apiProducts.items[0]);
console.log("Массив товаров из каталога:", catalog.getProducts());
console.log("Выбранный товар из каталога:", catalog.getSelectedProduct());
console.log(
    "Поиск товара в каталоге по идентификатору c101ab44-ed99-4a54-990d-47aa2bb4e7d9:",
    catalog.findProduct("c101ab44-ed99-4a54-990d-47aa2bb4e7d9")
);

let cart = new ShoppingCart();
apiProducts.items.forEach(item => {
    cart.addProduct(item);
});
console.log("Массив товаров из корзины:", cart.getStoredProducts());
cart.popProduct(apiProducts.items[2]);
console.log("Массив товаров из корзины после удаления товара:", cart.getStoredProducts());
console.log("Число товаров в корзине:", cart.countProducts());
console.log("Суммарная стоимость товаров в корзине:", cart.countPrice());
console.log(
    "Добавлен ли товар с идентификатором c101ab44-ed99-4a54-990d-47aa2bb4e7d9 в корзину:",
    cart.isAdded("c101ab44-ed99-4a54-990d-47aa2bb4e7d9")
);
cart.flush()
console.log("Массив товаров из корзины после очистки:", cart.getStoredProducts());

let byer = new Byer();

byer.setPayment("cash");
byer.setEmail("example@yandex.ru");
console.log("Есть ли ошибка в заполнении способа оплаты:", byer.validatePayment());
console.log("Есть ли ошибка в заполнении адреса электронной почты:", byer.validatePayment());
console.log("Есть ли ошибка в заполнении номера телефона:", byer.validatePhone());
console.log("Есть ли ошибка в заполнении адреса доставки:", byer.validateAddress());
byer.setPhone("8(800)555-35-35");
byer.setAddress("г.Иваново, д. 12, кв. 19");
console.log("Данные покупателя после заполнения:", byer.getData());
byer.flush()
console.log("Данные покупателя после очистки:", byer.getData());
byer.setData(
    {
        payment: null,
        email: "example2@mail.ru",
        phone: "+7(123)456-78-90",
        address: "г. Самара, ул. Фрунзе, д. 29, кв. 154",
    }
);
console.log("Данные покупателя после повторного заполнения:", byer.getData());
console.log("Есть ли ошибка в заполнении данных покупателя:", byer.validateByer());
byer.setPayment("card");
console.log("Есть ли ошибка в заполнении данных покупателя после обновления поля:", byer.validateByer());
