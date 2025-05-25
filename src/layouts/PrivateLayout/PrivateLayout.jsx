import React from 'react';
import {Outlet} from "react-router-dom";

import css from './PrivateLayout.module.css';


const PrivateLayout = () => {
    return (
        <div className={css.wrap}>
            <div className={css.outlet}>
                <Outlet/>
            </div>
        </div>
    );
};

export default PrivateLayout;