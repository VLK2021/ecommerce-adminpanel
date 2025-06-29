import React from 'react';

import css from './ButtonAll.module.css';


const ButtonAll = (props) => {
    const {titleButton, onClick} = props;


    return (
        <button type="button" className={css.wrap} onClick={onClick}>
            <span>{titleButton}</span>
        </button>
    );
};

export {ButtonAll};