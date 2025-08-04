import {OrderSingleInfoDeliveryCourier} from "../components/ordersSection/orderModals/index.js";


const orderInfoDelivery = (method, order) => {
    switch (method) {
        case 'nova':
            return '';
        case 'courier':
            return <OrderSingleInfoDeliveryCourier order={order}/>;
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
    orderInfoDelivery
}