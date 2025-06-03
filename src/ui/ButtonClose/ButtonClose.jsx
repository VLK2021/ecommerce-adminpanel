import React from 'react';

import css from "./ButtonClose.module.css";

const ButtonClose = (props) => {
    const {onClick} = props;


    return (
        <button className={css.wrap} onClick={onClick}>
            &times;
        </button>
    );
};

export {ButtonClose};