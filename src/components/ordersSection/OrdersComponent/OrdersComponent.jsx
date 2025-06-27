import React from 'react';
import {ToastContainer} from "react-toastify";
import {useSelector} from "react-redux";

import css from './OrdersComponent.module.css';
import OrdersMenuComponent from "../OrdersMenuComponent/OrdersMenuComponent.jsx";
import OrdersListComponent from "../OrdersListComponent/OrdersListComponent.jsx";


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

            {isOpenCreateOrderModal && ''}
            {isOpenUpdateOrderModal && ''}
            {isOpenDetailsOrderModal && ''}
        </div>
    );
};

export {OrdersComponent};