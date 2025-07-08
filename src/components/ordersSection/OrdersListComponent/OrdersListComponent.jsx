import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import css from './OrdersListComponent.module.css';
import {Pagination} from "../../../ui/Pagination/Pagination.jsx";
import {orderActions} from "../../../store/index.js";
import OrderItemListComponent from "../OrderItemListComponent/OrderItemListComponent.jsx";


const OrdersListComponent = () => {
    const dispatch = useDispatch();
    const {orders, trigger, total} = useSelector(store => store.order);
    const {page, limit, userId, status, search, sortBy, sortOrder} = useSelector(store => store.orderQuery);


    useEffect(() => {
        dispatch(orderActions.getAllOrders({page, limit, search, sortBy, sortOrder, userId, status}));
    }, [dispatch, trigger, limit, page, search, sortBy, sortOrder, status, userId]);


    return (
        <div className={css.pageContent}>
            <div className={css.header}>
                <div className={css.orderNumber}>№</div>
                <div className={css.orderName}>Клієнт</div>
                <div className={css.orderPrice}>Сума</div>
                <div className={css.paymentStatus}>Оплата</div>
                <div className={css.orderStatus}>Статус</div>
                <div className={css.date}>Дата</div>
                <div className={css.delivery}>Доставка</div>
                <div className={css.action}>Дія</div>
            </div>

            <div className={css.ordersScroll}>
                {Array.isArray(orders) && orders.length > 0 ? (
                    orders.map((obj) => (
                        <OrderItemListComponent
                            key={obj.id}
                            order={obj}
                        />
                    ))
                ) : (
                    <div className={css.noProducts}>Немає ордерів</div>
                )}
            </div>

            <div className={css.paginationBlock}>
                <Pagination
                    totalItems={total}
                    limit={limit}
                    onPageChange={() => null}
                />
            </div>
        </div>
    );
};

export default React.memo(OrdersListComponent);