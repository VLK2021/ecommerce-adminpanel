import React from 'react';

import css from './ButtonOk.module.css';


const ButtonOk = (props) => {
    const {onClick} = props;


    return (
        <button type="submit" className={css.wrap} onClick={onClick}>
            <span>OK</span>
        </button>
    );
};

export {ButtonOk};