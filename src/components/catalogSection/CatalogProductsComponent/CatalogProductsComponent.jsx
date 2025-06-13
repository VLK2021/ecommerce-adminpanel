import React from 'react';
import {ToastContainer} from "react-toastify";
import {useSelector} from "react-redux";

import css from './CatalogProductsComponent.module.css';
import {ProductMenuComponent} from "../ProductMenuComponent/ProductMenuComponent.jsx";
import {ProductsListComponent} from "../ProductsListComponent/ProductsListComponent.jsx";
import {ProductCreateModal, ProductUpdateModal, SingleProductDetails} from "../catalogModals/index.js";


const CatalogProductsComponent = () => {
    const {isOpenCreateModal, isOpenUpdateModal, isOpenDetailsModal} = useSelector(state => state.product);


    return (
        <div className={css.wrap}>
            <ToastContainer/>

            <div className={css.menuBlock}>
                <ProductMenuComponent/>
            </div>

            <div className={css.contentBlock}>
                <ProductsListComponent/>
            </div>

            <div className={css.paginationBlock}>

            </div>

            {isOpenCreateModal && <ProductCreateModal/>}
            {isOpenUpdateModal && <ProductUpdateModal/>}
            {isOpenDetailsModal && <SingleProductDetails/>}
        </div>
    );
};

export {CatalogProductsComponent};
