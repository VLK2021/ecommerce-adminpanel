import React from 'react';

import css from './RegisterPage.module.css';
import {RegisterComponent} from "../../components/index.js";


const RegisterPage = () => {
    return (
        <div className={css.wrap}>
            <RegisterComponent/>
        </div>
    );
};

export {RegisterPage};