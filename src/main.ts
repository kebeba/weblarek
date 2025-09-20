import './scss/styles.scss';

import { apiProducts } from "./utils/data.ts"
import {Api} from "./components/base/Api.ts"
import { API_URL } from "./utils/constants.ts"

import { Buyer } from "./components/models/Buyer.ts"
import { Catalog } from "./components/models/Catalog.ts"
import { ShoppingCart } from "./components/models/ShoppingCart.ts"
import { WebClient } from "./components/models/WebClient.ts"

// ================================================================================================
// тестирование моделей
// ================================================================================================
// создание пробного каталога товаров
const catalog = new Catalog();
catalog.setProducts(apiProducts.items);
catalog.setSelectedProduct(apiProducts.items[0]);
console.log("Массив товаров из каталога:", catalog.getProducts());
console.log("Выбранный товар из каталога:", catalog.getSelectedProduct());
console.log(
    "Поиск товара в каталоге по идентификатору c101ab44-ed99-4a54-990d-47aa2bb4e7d9:",
    catalog.findProduct("c101ab44-ed99-4a54-990d-47aa2bb4e7d9")
);

// создание пробной корзины товаров
const cart = new ShoppingCart();
apiProducts.items.forEach(item => {
    cart.addProduct(item);
});
console.log("Массив товаров из корзины:", cart.getStoredProducts());
cart.removeProduct(apiProducts.items[2]);
console.log("Массив товаров из корзины после удаления товара:", cart.getStoredProducts());
console.log("Число товаров в корзине:", cart.countProducts());
console.log("Суммарная стоимость товаров в корзине:", cart.countPrice());
console.log(
    "Добавлен ли товар с идентификатором c101ab44-ed99-4a54-990d-47aa2bb4e7d9 в корзину:",
    cart.isAdded("c101ab44-ed99-4a54-990d-47aa2bb4e7d9")
);
cart.empty()
console.log("Массив товаров из корзины после очистки:", cart.getStoredProducts());

// создание пробной модели покупателя
const buyer = new Buyer();
buyer.setPayment("cash");
buyer.setEmail("example@yandex.ru");
console.log("Есть ли ошибка в заполнении способа оплаты:", buyer.validatePayment());
console.log("Есть ли ошибка в заполнении адреса электронной почты:", buyer.validatePayment());
console.log("Есть ли ошибка в заполнении номера телефона:", buyer.validatePhone());
console.log("Есть ли ошибка в заполнении адреса доставки:", buyer.validateAddress());
buyer.setPhone("8(800)555-35-35");
buyer.setAddress("г.Иваново, д. 12, кв. 19");
console.log("Данные покупателя после заполнения:", buyer.getData());
buyer.reset()
console.log("Данные покупателя после очистки:", buyer.getData());
buyer.setData(
    {
        payment: null,
        email: "example2@mail.ru",
        phone: "+7(123)456-78-90",
        address: "г. Самара, ул. Фрунзе, д. 29, кв. 154",
    }
);
console.log("Данные покупателя после повторного заполнения:", buyer.getData());
console.log("Есть ли ошибка в заполнении данных покупателя:", buyer.validateBuyer());
buyer.setPayment("card");
console.log("Есть ли ошибка в заполнении данных покупателя после обновления поля:", buyer.validateBuyer());

// ================================================================================================
// тестирование веб-клиента
// ================================================================================================
// создание пробного запроса к эндпоинту получения каталога
const api = new Api(API_URL);
const client = new WebClient(api);
const apiCatalog = await client.getCatalog();
catalog.setProducts(apiCatalog)
console.log("Массив товаров веб-сервера из каталога:", catalog.getProducts());

// создание пробного запроса к эндпоинту оформления заказа
apiCatalog.forEach(product => {
    if (product.price !== null) {
        cart.addProduct(product);
    }
})
const orderItems = cart.getStoredProducts().map(item => item.id);
const userData = buyer.getData();
const orderRsp = await client.postOrder(
    {
        payment: userData.payment,
        email: userData.email,
        phone: userData.phone,
        address: userData.address,
        items: orderItems,
        total: cart.countPrice(),
    }
);
console.log("Результат формирования пробного заказа:", orderRsp);
