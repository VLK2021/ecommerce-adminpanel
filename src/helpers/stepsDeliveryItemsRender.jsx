import {DeliveryCourier, DeliveryNova} from "../components/ordersSection/orderModals/index.js";

const stepsDeliveryItemsRender = (activeMethod) => {
    switch (activeMethod) {
        case 'nova':
            return <DeliveryNova/>;
        case 'courier':
            return <DeliveryCourier/>;
        case 'ukr':
            return '';
        case 'meest':
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