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
            <div className={css.header}>
                <div className={css.img}>Фото</div>
                <div className={css.name}>Назва</div>
                <div className={css.price}>Ціна</div>
                <div className={css.category}>Категорія</div>
                <div className={css.current}>Кількість</div>
                <div className={css.status}>Статус</div>
                <div className={css.action}>Дія</div>
            </div>

            {products && products.length > 0 && products.map((product) => <ProductSingleItemComponent
                key={product.id}
                product={product}
            />)}
        </div>
    );
};

export {ProductsListComponent};