import React from 'react';

import css from './ProductMenuComponent.module.css';
import {ButtonCreate, CustomSelect, SearchInput} from "../../../ui/index.js";


const sortOptions = [
    { value: 'name_asc', label: 'Назва (А-Я)' },
    { value: 'name_desc', label: 'Назва (Я-А)' },
    { value: 'price_asc', label: 'Ціна ↑' },
    { value: 'price_desc', label: 'Ціна ↓' },
];


const ProductMenuComponent = () => {
    const handleSearch = (query) => {
        console.log(query);
    }

    const handleSortChange = (value) => {
        console.log(value);
    }


    return (
        <div className={css.wrap}>
            <ButtonCreate/>

            <SearchInput
                name={"productSearch"}
                onDebouncedSearch={handleSearch}
                placeholder={'Пошук товарів'}
            />

            <CustomSelect
                name={"sort"}
                options={sortOptions}
                placeholder={"Сортувати за"}
                onChangeCallback={handleSortChange}
            />
        </div>
    );
};

export {ProductMenuComponent};