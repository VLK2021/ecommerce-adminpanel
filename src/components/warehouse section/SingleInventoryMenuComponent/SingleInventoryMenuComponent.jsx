import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import css from './SingleInventoryMenuComponent.module.css';
import { ButtonAll, CustomSelect, SearchInput } from "../../../ui";
import { inventoryQueryActions } from "../../../store";
import { categoryActions } from "../../../store/slices/category.slice.jsx";

const sortOptionsProducts = [
    { value: 'name_asc', label: 'Назва (А-Я)' },
    { value: 'name_desc', label: 'Назва (Я-А)' },
    { value: 'price_asc', label: 'Ціна ↑' },
    { value: 'price_desc', label: 'Ціна ↓' },
];

const SingleInventoryMenuComponent = () => {
    const dispatch = useDispatch();

    const { categories } = useSelector(store => store.category);

    const {
        search,
        categoryId,
        sortValue,
    } = useSelector(store => store.inventoryQuery);

    useEffect(() => {
        dispatch(categoryActions.getAllCategories());
    }, [dispatch]);

    const handleSearchWarehousesDebounced = (value) => {
        dispatch(inventoryQueryActions.setSearch(value));
    };

    const handleReset = () => {
        dispatch(inventoryQueryActions.resetFilters());
    };


    return (
        <div className={css.wrap}>
            <SearchInput
                name="productsSearch"
                value={search}
                onDebouncedSearch={handleSearchWarehousesDebounced}
                placeholder="Пошук по складу"
            />

            <CustomSelect
                value={sortValue}
                options={sortOptionsProducts}
                placeholder="Сортувати за"
                onChangeCallback={(value) => dispatch(inventoryQueryActions.setSortBy(value))}
            />

            <CustomSelect
                value={categoryId}
                placeholder="Вибір категорії"
                options={categories.map((cat) => ({
                    value: cat.id,
                    label: cat.name,
                }))}
                onChangeCallback={(value) => dispatch(inventoryQueryActions.setCategoryId(value))}
            />

            <ButtonAll
                titleButton="Скинути фільтри"
                onClick={handleReset}
            />
        </div>
    );
};

export { SingleInventoryMenuComponent };
