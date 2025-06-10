import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import css from './ProductsListComponent.module.css';
import {productActions} from "../../../store/index.js";


const ProductsListComponent = () => {
    const dispatch = useDispatch();
    const {products} = useSelector(store => store.product);

    console.log(products);

    useEffect(() => {
        dispatch(productActions.getAllProducts());
    }, [dispatch]);


    return (
        <div className={css.wrap}>

        </div>
    );
};

export {ProductsListComponent};