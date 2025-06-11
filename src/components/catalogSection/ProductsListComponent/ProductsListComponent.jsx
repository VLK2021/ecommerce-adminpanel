import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import css from './ProductsListComponent.module.css';
import {productActions} from "../../../store/index.js";


const ProductsListComponent = () => {
    const dispatch = useDispatch();
    const {products, trigger} = useSelector(store => store.product);

    console.log(products);

    useEffect(() => {
        dispatch(productActions.getAllProducts());
    }, [dispatch, trigger]);


    return (
        <div className={css.wrap}>
            {products && products.length > 0 && products.map((product) => (
                <div key={product.id}>{product.id}</div>
            ))}
        </div>
    );
};

export {ProductsListComponent};