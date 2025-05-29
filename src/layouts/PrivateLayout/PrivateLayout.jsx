import React from 'react';
import {Outlet} from "react-router-dom";

import css from './PrivateLayout.module.css';
import {SideBarComponent} from "../../components/index.js";


const PrivateLayout = () => {
    return (
        <div className={css.wrap}>
            <div className={css.menuBlock}>
               <SideBarComponent/>
            </div>

            <div className={css.outlet}>
                <Outlet/>
            </div>
        </div>
    );
};

export default PrivateLayout;