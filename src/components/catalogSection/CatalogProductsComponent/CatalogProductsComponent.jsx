import React from 'react';
import {ToastContainer} from "react-toastify";

import css from './CatalogProductsComponent.module.css';
import {ProductMenuComponent} from "../ProductMenuComponent/ProductMenuComponent.jsx";


const CatalogProductsComponent = () => {
    return (
        <div className={css.wrap}>
            <ToastContainer/>

            <div className={css.menuBlock}>
                <ProductMenuComponent/>
            </div>

            <div className={css.contentBlock}>

            </div>

            <div className={css.paginationBlock}>

            </div>
        </div>
    );
};

export {CatalogProductsComponent};
