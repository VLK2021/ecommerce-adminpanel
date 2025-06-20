import React from 'react';
import {ToastContainer} from "react-toastify";
import {useSelector} from "react-redux";

import css from './WarehousesComponent.module.css';
import {WarehousesMenuComponent} from "../WarehousesMenuComponent/WarehousesMenuComponent.jsx";
import WarehousesListComponent from "../WarehousesListComponent/WarhousesListComponent.jsx";
import {WarehouseCreateModal, WarehouseUpdateModal} from "../warehouseModals/index.js";


const WarehousesComponent = () => {
    const {isOpenCreateModal, isOpenUpdateModal, isOpenDetailsModal} = useSelector(store => store.warehouse);


    return (
        <div className={css.wrap}>
            <ToastContainer/>

            <div className={css.menuBlock}>
                <WarehousesMenuComponent/>
            </div>

            <div className={css.contentBlock}>
                <WarehousesListComponent/>
            </div>

            {isOpenCreateModal && <WarehouseCreateModal/>}
            {isOpenUpdateModal && <WarehouseUpdateModal/>}
            {isOpenDetailsModal && ''}
        </div>
    );
};

export {WarehousesComponent};