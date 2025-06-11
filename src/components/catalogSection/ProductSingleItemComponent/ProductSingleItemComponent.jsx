import React from 'react';
import {useDispatch} from "react-redux";

import css from './ProductSingleItemComponent.module.css';
import {productActions} from "../../../store/index.js";


const ProductSingleItemComponent = ({product}) => {
    const dispatch = useDispatch();
    const {id} = product;

    const handleClick = (e) => {
        e.preventDefault();

        dispatch(productActions.openUpdateProductModal());
        dispatch(productActions.selectProduct(id));
    };


    return (
        <div className={css.wrap}  onClick={handleClick}>
            {id}
        </div>
    );
};

export default React.memo(ProductSingleItemComponent);