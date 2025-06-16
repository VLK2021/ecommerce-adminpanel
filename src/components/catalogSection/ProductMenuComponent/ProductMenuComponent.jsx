import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import css from './ProductMenuComponent.module.css';
import { ButtonAll, ButtonCreate, CustomSelect, SearchInput } from "../../../ui";
import { productActions, productsQueryActions } from "../../../store";
import { categoryActions } from "../../../store/slices/category.slice";

const sortOptionsProducts = [
    { value: 'name_asc', label: 'Назва (А-Я)' },
    { value: 'name_desc', label: 'Назва (Я-А)' },
    { value: 'price_asc', label: 'Ціна ↑' },
    { value: 'price_desc', label: 'Ціна ↓' },
];

const ProductMenuComponent = () => {
    const dispatch = useDispatch();
    const { categories } = useSelector(store => store.category);
    const { sortValue, categoryId, search } = useSelector(store => store.productsQuery);

    useEffect(() => {
        dispatch(categoryActions.getAllCategories());
    }, [dispatch]);

    const handleSearchChange = (e) => {
        dispatch(productsQueryActions.setSearch(e.target.value));
    };

    const handleSearchDebounced = (value) => {
        dispatch(productsQueryActions.setSearch(value));
    };

    const handleReset = () => {
        dispatch(productsQueryActions.resetFilters());
    };

    const openCreateProductModal = () => {
        dispatch(productActions.openCreateProductModal());
    };

    return (
        <div className={css.wrap}>
            <ButtonCreate onClick={openCreateProductModal} />

            <SearchInput
                name="productSearch"
                value={search}
                onChange={handleSearchChange}
                onDebouncedSearch={handleSearchDebounced}
                placeholder="Пошук товарів"
            />

            <CustomSelect
                value={sortValue}
                options={sortOptionsProducts}
                placeholder="Сортувати за"
                onChangeCallback={(value) => dispatch(productsQueryActions.setSortBy(value))}
            />

            <CustomSelect
                value={categoryId}
                placeholder="Вибір категорії"
                options={categories.map((cat) => ({
                    value: cat.id,
                    label: cat.name,
                }))}
                onChangeCallback={(value) => dispatch(productsQueryActions.setCategoryId(value))}
            />

            <ButtonAll
                titleButton="Скинути фільтри"
                onClick={handleReset}
            />
        </div>
    );
};

export { ProductMenuComponent };
