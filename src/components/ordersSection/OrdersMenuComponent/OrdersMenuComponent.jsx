import React from 'react';
import {useDispatch} from "react-redux";

import css from './OrdersMenuComponent.module.css';
import {ButtonCreate} from "../../../ui/index.js";
import {orderActions} from "../../../store/index.js";


const sortOptionsOrders = [
    {value: 'name_asc', label: 'Назва (А-Я)'},
    {value: 'name_desc', label: 'Назва (Я-А)'},
];


const OrdersMenuComponent = () => {
    const dispatch = useDispatch();


    const openCreateOrdersModal = () => {
        dispatch(orderActions.openCreateOrderModal());
    };


    return (
        <div className={css.wrap}>
            <ButtonCreate onClick={openCreateOrdersModal}/>
        </div>
    );
};

export default OrdersMenuComponent;