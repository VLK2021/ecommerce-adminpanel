import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import css from './OrderInfoSingleModal.module.css';
import {ButtonClose} from "../../../../ui/index.js";
import {orderActions} from "../../../../store/index.js";
import {orderService} from "../../../../services/orderServices/index.js";


const OrderInfoSingleModal = () => {
    const dispatch = useDispatch();
    const [orderData, setOrderData] = useState(null);
    const {selectedOrderId} = useSelector(store => store.order);

    console.log('orderData', orderData);


    const closeOrderInfoModal = () => {
        dispatch(orderActions.closeDetailsOrderModal());
        dispatch(orderActions.resetSelectedOrder());
    };

    useEffect(() => {
        if (!selectedOrderId) return;

        const fetchOrderInfo = async () => {
            try {
                const response = await orderService.getOrderById(selectedOrderId);
                setOrderData(response);
            } catch (e) {
                console.error("🔥 Помилка отримання ордера:", e);
            }
        };

        fetchOrderInfo();
    }, [selectedOrderId]);


    return (
        <div className={css.overlay}>
            <div className={css.modal}>
                <div className={css.header}>
                    <div className={css.title}>Деталі ордера</div>
                    <ButtonClose onClick={closeOrderInfoModal}/>
                </div>
            </div>

        </div>
    );
};

export {OrderInfoSingleModal};