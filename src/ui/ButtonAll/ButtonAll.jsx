import React from 'react';

import css from './ButtonAll.module.css';


const ButtonAll = (props) => {
    const {titleButton, onClick} = props;


    return (
        <button className={css.wrap} onClick={onClick}>
            <span>{titleButton}</span>
            <span className={css.icon}>+</span>
        </button>
    );
};

export {ButtonAll};