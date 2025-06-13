import React from 'react';

import css from './ButtonCancel.module.css';


const ButtonCancel = (props) => {
    const {onClick} = props;


    return (
        <button type="button" className={css.wrap} onClick={onClick}>
            <span>Закінчити</span>
        </button>
    );
};

export {ButtonCancel};