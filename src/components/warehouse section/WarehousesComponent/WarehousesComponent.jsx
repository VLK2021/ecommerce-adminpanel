import React from 'react';
import {ToastContainer} from "react-toastify";

import css from './WarehousesComponent.module.css';
import {WarehousesMenuComponent} from "../WarehousesMenuComponent/WarehousesMenuComponent.jsx";
import WarehousesListComponent from "../WarehousesListComponent/WarhousesListComponent.jsx";


const WarehousesComponent = () => {
    return (
        <div className={css.wrap}>
            <ToastContainer/>

            <div className={css.menuBlock}>
                <WarehousesMenuComponent/>
            </div>

            <div className={css.contentBlock}>
                <WarehousesListComponent/>
            </div>
        </div>
    );
};

export {WarehousesComponent};