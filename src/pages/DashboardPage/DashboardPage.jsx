import React from 'react';

import css from './DashboardPage.module.css';
import {ButtonCancel, ButtonClose, ButtonCreate, ButtonOk} from "../../ui/index.js";

const DashboardPage = () => {
    return (
        <div className={css.wrap}>
            DashboardPage

            <ButtonCreate/>
            <ButtonCancel/>
            <ButtonOk/>
            <ButtonClose/>

        </div>
    );
};

export {DashboardPage};