/* Константа для получения полного пути для сервера. Для выполнения запроса 
необходимо к API_URL добавить только ендпоинт. */
export const API_URL = `${import.meta.env.VITE_API_ORIGIN}/api/weblarek`;
/* Константа для формирования полного пути к изображениям карточек. 
Для получения полной ссылки на картинку необходимо к CDN_URL добавить только название файла изображения,
которое хранится в объекте товара. */
export const CDN_URL = `${import.meta.env.VITE_API_ORIGIN}/content/weblarek`;

/* Константа соответствий категорий товара модификаторам, используемым для отображения фона категории. */
export const categoryMap = {
    "софт-скил": "card__category_soft",
    "хард-скил": "card__category_hard",
    "кнопка": "card__category_button",
    "дополнительное": "card__category_additional",
    "другое": "card__category_other",
}

export const settings = {};

export const Events = {
    CATALOG: {
        CHANGED: "products:changed",
        SELECTED_CHANGED: "selected:changed",
        RETURN: "catalog:return",
    },
    CART: {
        OPEN: "cart:open",
        UPDATE: "cart:update",
    },
    CARD: {
        OPEN: "card:open-preview",
        PUSHED: "card:preview-pushed",
        REMOVE: "card:remove-from-cart",

    },
    FORM: {
        SUBMIT: "form:submit",
    },
    PAYMENT: {
        CARD: "payment:card",
        CASH: "payment:cash",
        SETTED: "payment:setted",
    },
    ADDRESS: {
        CHANGED: "address:changed",
        SETTED: "address:setted",
    },
    EMAIL: {
        CHANGED: "email:changed",
        SETTED: "email:setted"
    },
    PHONE: {
        CHANGED: "phone:changed",
        SETTED: "phone:setted"
    },
    ORDER: {
        MAKE: "order:make"
    },
    MODAL: {
        CLOSE: "modal:close"
    }
}
