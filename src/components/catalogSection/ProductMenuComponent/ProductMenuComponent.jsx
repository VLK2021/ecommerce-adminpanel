import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import css from './ProductMenuComponent.module.css';
import { ButtonCreate, CustomSelect, SearchInput } from "../../../ui/index.js";
import { productActions, productsQueryActions } from "../../../store/index.js";
import { categoryActions } from "../../../store/slices/category.slice.jsx";

const sortOptionsProducts = [
    { value: 'name_asc', label: 'Назва (А-Я)' },
    { value: 'name_desc', label: 'Назва (Я-А)' },
    { value: 'price_asc', label: 'Ціна ↑' },
    { value: 'price_desc', label: 'Ціна ↓' },
];

const ProductMenuComponent = () => {
    const dispatch = useDispatch();
    const { categories } = useSelector(store => store.category);
    const { sortValue, categoryId } = useSelector(store => store.productsQuery);

    useEffect(() => {
        dispatch(categoryActions.getAllCategories());
    }, [dispatch]);

    const handleSearchProducts = (query) => {
        dispatch(productsQueryActions.setSearch(query));
    };

    const openCreateProductModal = () => {
        dispatch(productActions.openCreateProductModal());
    };

    return (
        <div className={css.wrap}>
            <ButtonCreate onClick={openCreateProductModal} />

            <SearchInput
                name={"productSearch"}
                onDebouncedSearch={handleSearchProducts}
                placeholder={'Пошук товарів'}
            />

            <CustomSelect
                name={"sort"}
                value={sortValue}
                options={sortOptionsProducts}
                placeholder={"Сортувати за"}
                onChangeCallback={(value) => dispatch(productsQueryActions.setSortBy(value))}
            />

            <CustomSelect
                name={"category"}
                value={categoryId}
                placeholder={"Вибір категорії"}
                options={categories.map((cat) => ({
                    value: cat.id,
                    label: cat.name,
                }))}
                onChangeCallback={(value) => dispatch(productsQueryActions.setCategoryId(value))}
            />
        </div>
    );
};

export { ProductMenuComponent };
