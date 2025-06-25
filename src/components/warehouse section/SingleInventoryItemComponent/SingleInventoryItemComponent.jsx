import React from 'react';

import css from './SingleInventoryItemComponent.module.css';
import { ButtonAll, ButtonClose } from "../../../ui";


const SingleInventoryItemComponent = ({ product, onShowDescription }) => {
    const { productName, quantity, description, price, isActive, categoryName } = product;


    console.log(product);

    return (
        <div className={css.wrap}>
            <div className={css.name}>{productName}</div>
            <div className={css.price}>{price}</div>
            <div className={css.category}>{categoryName}</div>
            <div className={css.current}>{quantity}</div>
            <div className={css.status}>
                {isActive ? 'активний' : 'неактивний'}
            </div>
            <div className={css.action}>
                <ButtonAll
                    onClick={() => onShowDescription(description, productName)}
                    titleButton={'Опис'}
                />
                <ButtonClose />
            </div>
        </div>
    );
};

export default React.memo(SingleInventoryItemComponent);
