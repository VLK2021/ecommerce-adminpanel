import React from 'react';
import {useDispatch} from "react-redux";

import css from './ProductSingleItemComponent.module.css';
import {productActions} from "../../../store/index.js";
import {ButtonAll, ButtonClose} from "../../../ui/index.js";


const ProductSingleItemComponent = ({product}) => {
    const dispatch = useDispatch();
    const {id, name, price, stock, category, isActive, images} = product;

    console.log(product);

    const handleClick = (e) => {
        e.preventDefault();

        dispatch(productActions.openUpdateProductModal());
        dispatch(productActions.selectProduct(id));
    };

    const deleteProduct = (e) => {
        e.stopPropagation();
    }

    const showInformation = (e) => {
        e.stopPropagation();
        dispatch(productActions.openDetailsModal());
        dispatch(productActions.selectProduct(id));
    }


    return (
        <div className={css.wrap}  onClick={handleClick}>
            <div className={css.img}>
                <img src={images[0]?.url} alt={name} />
            </div>
            <div className={css.name}>{name}</div>
            <div className={css.price}>{price}</div>
            <div className={css.category}>{category.name}</div>
            <div className={css.current}>{stock}</div>
            <div className={css.status}>
                {isActive ? 'активний' : 'неактивний'}
            </div>
            <div className={css.action}>
                <ButtonAll
                    titleButton={'інфо'}
                    onClick={showInformation}
                />

                <ButtonClose onClick={deleteProduct}/>
            </div>
        </div>
    );
};

export default React.memo(ProductSingleItemComponent);