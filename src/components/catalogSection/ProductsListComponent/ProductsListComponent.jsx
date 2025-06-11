import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import css from './ProductsListComponent.module.css';
import {productActions} from "../../../store/index.js";
import ProductSingleItemComponent from "../ProductSingleItemComponent/ProductSingleItemComponent.jsx";


const ProductsListComponent = () => {
    const dispatch = useDispatch();
    const {products, trigger} = useSelector(store => store.product);

    useEffect(() => {
        dispatch(productActions.getAllProducts());
    }, [dispatch, trigger]);


    return (
        <div className={css.wrap}>
            {products && products.length > 0 && products.map((product) => <ProductSingleItemComponent
                key={product.id}
                product={product}
            />)}
        </div>
    );
};

export {ProductsListComponent};