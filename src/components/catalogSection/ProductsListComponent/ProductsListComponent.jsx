import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import css from './ProductsListComponent.module.css';
import { productActions, productsQueryActions } from "../../../store/index.js";
import ProductSingleItemComponent from "../ProductSingleItemComponent/ProductSingleItemComponent.jsx";
import { Pagination } from "../../../ui/Pagination/Pagination.jsx";

const ProductsListComponent = () => {
    const dispatch = useDispatch();
    const { products, trigger } = useSelector(store => store.product);
    const { page, limit, search, categoryId, sortBy, sortOrder } = useSelector(store => store.productsQuery);

    useEffect(() => {
        dispatch(productActions.getAllProducts({
            page,
            limit,
            search,
            categoryId,
            sortBy,
            sortOrder
        }));
    }, [dispatch, trigger, page, limit, search, categoryId, sortBy, sortOrder]);


    return (
        <div className={css.pageContent}>
            <div className={css.header}>
                <div className={css.img}>Фото</div>
                <div className={css.name}>Назва</div>
                <div className={css.price}>Ціна</div>
                <div className={css.category}>Категорія</div>
                <div className={css.current}>Кількість</div>
                <div className={css.status}>Статус</div>
                <div className={css.action}>Дія</div>
            </div>

            <div className={css.productScroll}>
                {products && products.length > 0 ? (
                    products.map((product) => (
                        <ProductSingleItemComponent
                            key={product.id}
                            product={product}
                        />
                    ))
                ) : (
                    <div className={css.noProducts}>Немає товарів</div>
                )}
            </div>

            <div className={css.paginationBlock}>
                <Pagination
                    totalItems={100}
                    totalPages={10}
                    onPageChange={(page) => dispatch(productsQueryActions.setPage(page))}
                />
            </div>
        </div>
    );
};

export { ProductsListComponent };
