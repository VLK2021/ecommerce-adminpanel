import React from 'react';
import {Outlet} from "react-router-dom";

import css from './StocksPage.module.css';
import {WarehousesTitleMenuItems} from "../../components/warehouse section/index.js";


const StocksPage = () => {
    return (
        <div className={css.wrap}>
            <div className={css.menuBlock}>
                <WarehousesTitleMenuItems/>
            </div>

            <div className={css.outletBlock}>
                <Outlet/>
            </div>
        </div>
    );
};

export {StocksPage};