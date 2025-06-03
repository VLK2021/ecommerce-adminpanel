import React from 'react';

import css from './ButtonCreate.module.css';


const ButtonCreate = (props) => {
    const {onClick} = props;


    return (
        <button className={css.wrap} onClick={onClick}>
            <span>Створити</span>
            <span className={css.icon}>+</span>
        </button>
    );
};

export {ButtonCreate};