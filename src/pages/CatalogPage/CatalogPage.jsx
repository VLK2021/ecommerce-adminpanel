import React from 'react';
import {Outlet} from "react-router-dom";

import css from './CatalogPage.module.css';
import {CatalogTitleMenuItems} from "../../components/catalogSection/index.js";


const CatalogPage = () => {
    return (
        <div className={css.wrap}>
            <div className={css.menuBlock}>
                <CatalogTitleMenuItems/>
            </div>

            <div className={css.outletBlock}>
                <Outlet/>
            </div>
        </div>
    );
};

export {CatalogPage};