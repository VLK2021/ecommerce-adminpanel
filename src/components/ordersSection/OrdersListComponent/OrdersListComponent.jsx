import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import css from './OrdersListComponent.module.css';
import {Pagination} from "../../../ui/Pagination/Pagination.jsx";
import {orderActions} from "../../../store/index.js";


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

            </div>

            <div className={css.ordersScroll}>
                {Array.isArray(orders) && orders.length > 0 ? (
                    orders.map((obj) => (
                        <div key={obj.id}>{obj.orderNumber}</div>
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