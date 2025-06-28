import React from 'react';

import css from './OrdersListComponent.module.css';
import {Pagination} from "../../../ui/Pagination/Pagination.jsx";
import {useSelector} from "react-redux";
import ProductSingleItemComponent from "../../catalogSection/ProductSingleItemComponent/ProductSingleItemComponent.jsx";


const OrdersListComponent = () => {
    const {orders, trigger, total} = useSelector(store => store.order);


    return (
        <div className={css.pageContent}>
            <div className={css.header}>

            </div>

            <div className={css.ordersScroll}>
                {Array.isArray(orders) && orders.length > 0 ? (
                    orders.map((obj) => (
                        <div key={obj.id}>{obj.id}</div>
                    ))
                ) : (
                    <div className={css.noProducts}>Немає товарів</div>
                )}
            </div>

            <div className={css.paginationBlock}>
                <Pagination
                    totalItems={total}
                    limit={''}
                    onPageChange={() => null}
                />
            </div>
        </div>
    );
};

export default React.memo(OrdersListComponent);