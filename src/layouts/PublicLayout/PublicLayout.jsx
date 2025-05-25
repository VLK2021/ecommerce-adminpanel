import React from 'react';
import {Outlet} from "react-router-dom";

import css from './PublicLayout.module.css';


const PublicLayout = () => {
    return (
        <div className={css.wrap}>
            <Outlet/>
        </div>
    );
};

export default PublicLayout;