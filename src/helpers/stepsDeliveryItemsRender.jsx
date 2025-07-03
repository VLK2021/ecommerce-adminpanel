import {DeliveryNova} from "../components/ordersSection/orderModals/index.js";

const stepsDeliveryItemsRender = (activeMethod) => {
    switch (activeMethod) {
        case 'nova':
            return <DeliveryNova/>;
        case 'ukr':
            return '';
        case 'meest':
            return '';
        case 'courier':
            return '';
        case 'pickup':
            return '';
        default:
            return null;
    }
}

export {
    stepsDeliveryItemsRender
}