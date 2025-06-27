import React from 'react';
import {Outlet} from "react-router-dom";

import css from './OrdersPage.module.css';
import {OrdersTitleMenuItems} from "../../components/ordersSection/index.js";


const OrdersPage = () => {
    return (
        <div className={css.wrap}>
            <div className={css.menuBlock}>
                <OrdersTitleMenuItems/>
            </div>

            <div className={css.outletBlock}>
                <Outlet/>
            </div>
        </div>
    );
};

export {OrdersPage};