import React from 'react';

import css from './LoginPage.module.css';
import {LoginComponent} from "../../components/index.js";


const LoginPage = () => {
    return (
        <div className={css.wrap}>
           <LoginComponent/>
        </div>
    );
};

export {LoginPage};