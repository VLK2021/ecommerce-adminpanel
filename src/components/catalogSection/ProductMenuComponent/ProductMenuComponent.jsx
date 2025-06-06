import React from 'react';

import css from './ProductMenuComponent.module.css';
import {ButtonCreate, CustomSelect, SearchInput} from "../../../ui/index.js";


const sortOptionsProducts = [
    { value: 'name_asc', label: 'Назва (А-Я)' },
    { value: 'name_desc', label: 'Назва (Я-А)' },
    { value: 'price_asc', label: 'Ціна ↑' },
    { value: 'price_desc', label: 'Ціна ↓' },
];


const ProductMenuComponent = () => {
    const handleSearchProducts = (query) => {
        console.log(query);
    }

    const handleSortChangeProducts = (value) => {
        console.log(value);
    }


    return (
        <div className={css.wrap}>
            <ButtonCreate/>

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