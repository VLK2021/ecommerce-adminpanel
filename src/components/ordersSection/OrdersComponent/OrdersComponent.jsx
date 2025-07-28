import React from 'react';
import {ToastContainer} from "react-toastify";
import {useSelector} from "react-redux";

import css from './OrdersComponent.module.css';
import OrdersMenuComponent from "../OrdersMenuComponent/OrdersMenuComponent.jsx";
import OrdersListComponent from "../OrdersListComponent/OrdersListComponent.jsx";
import {OrderCreateModal, OrderInfoSingleModal, OrderUpdateModal} from "../orderModals/index.js";


const OrdersComponent = () => {
    const {isOpenCreateOrderModal, isOpenUpdateOrderModal, isOpenDetailsOrderModal} = useSelector(store => store.order);

    return (
        <div className={css.wrap}>
            <ToastContainer/>

            <div className={css.menuBlock}>
                <OrdersMenuComponent/>
            </div>

            <div className={css.contentBlock}>
                <OrdersListComponent/>
            </div>

            {isOpenCreateOrderModal && <OrderCreateModal/>}
            {isOpenUpdateOrderModal && <OrderUpdateModal/>}
            {isOpenDetailsOrderModal && <OrderInfoSingleModal/>}
        </div>
    );
};

export {OrdersComponent};