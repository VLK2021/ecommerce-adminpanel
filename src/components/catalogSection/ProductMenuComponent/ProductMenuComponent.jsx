import React from 'react';

import css from './ProductMenuComponent.module.css';
import {ButtonCreate, CustomSelect, SearchInput} from "../../../ui/index.js";
import {useDispatch} from "react-redux";
import {productActions} from "../../../store/index.js";


const sortOptionsProducts = [
    {value: 'name_asc', label: 'Назва (А-Я)'},
    {value: 'name_desc', label: 'Назва (Я-А)'},
    {value: 'price_asc', label: 'Ціна ↑'},
    {value: 'price_desc', label: 'Ціна ↓'},
];


const ProductMenuComponent = () => {
    const dispatch = useDispatch();
    const handleSearchProducts = (query) => {
        console.log(query);
    };

    const openCreateProductModal = () => {
        dispatch(productActions.openCreateProductModal());
    };

    const handleSortChangeProducts = (value) => {
        console.log(value);
    };


    return (
        <div className={css.wrap}>
            <ButtonCreate onClick={openCreateProductModal}/>

            <SearchInput
                name={"productSearch"}
                onDebouncedSearch={handleSearchProducts}
                placeholder={'Пошук товарів'}
            />

            <CustomSelect
                name={"sort"}
                options={sortOptionsProducts}
                placeholder={"Сортувати за"}
                onChangeCallback={handleSortChangeProducts}
            />
        </div>
    );
};

export {ProductMenuComponent};