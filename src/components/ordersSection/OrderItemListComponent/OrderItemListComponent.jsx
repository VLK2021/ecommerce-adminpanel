import React from 'react';
import {useDispatch} from "react-redux";

import css from './OrderItemListComponent.module.css';
import {formatDate} from "../../../helpers/index.js";
import {orderActions} from "../../../store/index.js";
import {ButtonAll, ButtonClose} from "../../../ui/index.js";


const OrderItemListComponent = ({order}) => {
    const dispatch = useDispatch();
    const {
        id,
        orderNumber,
        customerName,
        deliveryType,
        status,
        paymentStatus,
        totalPrice,
        createdAt
    } = order;
    const orderDate = formatDate(createdAt);

    const handleClick = (e) => {
        e.preventDefault();

        dispatch(orderActions.openUpdateOrderModal());
        dispatch(orderActions.selectOrder(id));
    };

    const deleteProduct = (e) => {
        e.stopPropagation();
    }

    const showInformation = (e) => {
        e.stopPropagation();
        dispatch(orderActions.openDetailsOrderModal());
        dispatch(orderActions.selectOrder(id));
    }


    return (
        <div className={css.wrap} onClick={handleClick}>
            <div className={css.orderNumber}>{orderNumber}</div>
            <div className={css.orderName}>{customerName}</div>

            <div className={css.orderPrice}>
                {totalPrice} грн
            </div>

            <div className={css.paymentStatus}>{paymentStatus}</div>
            <div className={css.orderStatus}>{status}</div>
            <div className={css.date}>{orderDate}</div>
            <div className={css.delivery}>{deliveryType}</div>

            <div className={css.action}>
                <ButtonAll
                    titleButton={'інфо'}
                    onClick={showInformation}
                />

                <ButtonClose onClick={deleteProduct}/>
            </div>
        </div>
    );
};

export default React.memo(OrderItemListComponent);


//
// "items": [
//     {
//         "id": "c143571a-7580-4f52-ba19-9de3255420c2",
//         "orderNumber": 1,
//         "userId": null,
//         "customerName": "Петро Порошенко",
//         "customerPhone": "+380958765432",
//         "customerEmail": "qsc@gmail.com",
//         "deliveryType": "nova",
//         "deliveryData": {
//             "city": "Київ (Київська)",
//             "warehouse": "Відділення №5 (до 200 кг): вул. Федорова, 32 (м. Олімпійська) (Київ, Федорова, 32 (м. Олімпійська))"
//         },
//         "status": "NEW",
//         "paymentStatus": "PENDING",
//         "deliveryStatus": "PENDING",
//         "comment": "петро гандон",
//         "totalPrice": "160000",
//         "currency": null,
//         "createdAt": "2025-07-07T11:44:48.347Z",
//         "updatedAt": "2025-07-07T11:44:48.347Z",
//         "items": [
//             {
//                 "id": "5122e4ba-deaf-47c7-9da5-ae462e9afb3c",
//                 "orderId": "c143571a-7580-4f52-ba19-9de3255420c2",
//                 "productId": "b19652e5-6576-4029-8fd6-f13c96191692",
//                 "quantity": 2,
//                 "price": "80000",
//                 "productName": "IPhone 16",
//                 "productCategoryId": null,
//                 "productCategoryName": null,
//                 "isActive": true
//             }
//         ]
//     }
// ],
//     "total": 1,
//     "page": 1,
//     "limit": 20
// }