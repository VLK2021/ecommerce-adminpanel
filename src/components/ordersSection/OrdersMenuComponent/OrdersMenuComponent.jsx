import React from 'react';
import {useDispatch, useSelector} from "react-redux";

import css from './OrdersMenuComponent.module.css';
import {ButtonCreate, CustomSelect, SearchInput} from "../../../ui/index.js";
import {orderActions} from "../../../store/index.js";
import {orderQueryActions} from "../../../store/slices/orderQuerySlice.jsx";


const sortOptionsOrders = [
    {value: 'createdAt_desc', label: 'Новіші'},
    {value: 'createdAt_asc', label: 'Старіші'},
    {value: 'totalPrice_asc', label: 'Сума ↑'},
    {value: 'totalPrice_desc', label: 'Сума ↓'},
    {value: 'customerName_asc', label: 'Імʼя (А-Я)'},
    {value: 'customerName_desc', label: 'Імʼя (Я-А)'},
    {value: 'orderNumber_desc', label: '№ Ордеру ↓'},
    {value: 'orderNumber_asc', label: '№ Ордеру ↑'},
];

const statusOptions = [
    { value: '', label: 'Усі' },
    { value: 'NEW', label: 'Новий' },
    { value: 'PROCESSING', label: 'В обробці' },
    { value: 'PAID', label: 'Оплачено' },
    { value: 'SHIPPED', label: 'Відправлено' },
    { value: 'DELIVERED', label: 'Доставлено' },
    { value: 'CANCELLED', label: 'Скасовано' },
    { value: 'RETURNED', label: 'Повернено' },
];


const OrdersMenuComponent = () => {
    const dispatch = useDispatch();
    const {status, search, sortBy, sortOrder} = useSelector(store => store.orderQuery);


    const openCreateOrdersModal = () => {
        dispatch(orderActions.openCreateOrderModal());
    };

    const handleSearchChange = (e) => {
        dispatch(orderQueryActions.setSearch(e.target.value));
    };

    const handleSearchDebounced = (value) => {
        dispatch(orderQueryActions.setSearch(value));
    };


    return (
        <div className={css.wrap}>
            <ButtonCreate onClick={openCreateOrdersModal}/>

            <SearchInput
                name="productSearch"
                value={search}
                onChange={handleSearchChange}
                onDebouncedSearch={handleSearchDebounced}
                placeholder="Пошук товарів"
            />

            <CustomSelect
                value={`${sortBy}_${sortOrder}`}
                options={sortOptionsOrders}
                placeholder="Сортувати за"
                onChangeCallback={(value) => {
                    const [field, order] = value.split('_');
                    dispatch(orderQueryActions.setSortBy(field));
                    dispatch(orderQueryActions.setSortOrder(order));
                }}
            />

            <CustomSelect
                value={status}
                options={statusOptions}
                placeholder="Статус"
                onChangeCallback={(value) => dispatch(orderQueryActions.setStatus(value))}
            />
        </div>
    );
};

export default OrdersMenuComponent;