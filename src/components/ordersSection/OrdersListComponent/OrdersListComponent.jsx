import React from 'react';

import css from './OrdersListComponent.module.css';
import {Pagination} from "../../../ui/Pagination/Pagination.jsx";


const OrdersListComponent = () => {
    return (
        <div className={css.pageContent}>
            <div className={css.header}>

            </div>

            <div className={css.ordersScroll}>

            </div>

            <div className={css.paginationBlock}>
                <Pagination
                    totalItems={''}
                    limit={''}
                    onPageChange={() => null}
                />
            </div>
        </div>
    );
};

export default React.memo(OrdersListComponent);