import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import css from './SingleInventoryMenuComponent.module.css';
import {ButtonAll, CustomSelect, SearchInput} from "../../../ui/index.js";
import {productsQueryActions} from "../../../store/index.js";
import {categoryActions} from "../../../store/slices/category.slice.jsx";


const sortOptionsProducts = [
    {value: 'name_asc', label: 'Назва (А-Я)'},
    {value: 'name_desc', label: 'Назва (Я-А)'},
    {value: 'price_asc', label: 'Ціна ↑'},
    {value: 'price_desc', label: 'Ціна ↓'},
];


const SingleInventoryMenuComponent = () => {
    const dispatch = useDispatch();

    const {categories} = useSelector(store => store.category);
//тут потрібен кастомний слайс для сортування продуктів по складу напевно а це просто приклад
    const {
        categoryId,
        search,
        sortValue,
        sortBy,
        sortOrder,
    } = useSelector(store => store.productsQuery);

    useEffect(() => {
        dispatch(categoryActions.getAllCategories());
    }, [dispatch]);

    useEffect(() => {
        const params = {search, sortBy, sortOrder};
        console.log(params);
    }, [search, sortBy, sortValue, dispatch, sortOrder]);

    const handleSearchWarehousesChange = (e) => {
        console.log(e.target.value);
    };

    const handleSearchWarehousesDebounced = (value) => {
        console.log(value);
    };

    const handleReset = () => {

    };


    return (
        <div className={css.wrap}>
            <SearchInput
                name="productsSearch"
                value={search}
                onChange={handleSearchWarehousesChange}
                onDebouncedSearch={handleSearchWarehousesDebounced}
                placeholder="Пошук по складу"
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

export {SingleInventoryMenuComponent};