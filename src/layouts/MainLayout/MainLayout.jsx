import React from 'react';
import {Outlet} from "react-router-dom";

import css from './MainLayout.module.css';


const MainLayout = () => {
    return (
        <div className={css.wrap}>
            <Outlet/>
        </div>
    );
};

export default MainLayout;