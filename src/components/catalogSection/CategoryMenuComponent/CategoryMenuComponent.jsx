import React from 'react';

import css from './CategoryMenuComponent.module.css';
import {ButtonAll, ButtonCreate, CustomSelect, SearchInput} from "../../../ui/index.js";


const sortOptionsCategories = [
    { value: 'name_asc', label: 'Назва (А-Я)' },
    { value: 'name_desc', label: 'Назва (Я-А)' },
];


const CategoryMenuComponent = ({setIsOpenCreateCategory, setIsOpenAssignAttributes}) => {
    const handleSearchCategory = (query) => {
        console.log(query);
    };

    const handleSortChangeCategories = (value) => {
        console.log(value);
    }


    return (
        <div className={css.wrap}>
            <ButtonCreate
                onClick={() => setIsOpenCreateCategory(true)}
            />

            <SearchInput
                name={"categorySearch"}
                onDebouncedSearch={handleSearchCategory}
                placeholder={'Пошук категорії'}
            />

            <CustomSelect
                name={"sort"}
                options={sortOptionsCategories}
                placeholder={"Сортувати за"}
                onChangeCallback={handleSortChangeCategories}
            />

            <ButtonAll
                titleButton="Привʼязати атрибути"
                onClick={() => setIsOpenAssignAttributes(true)}
            />
        </div>
    );
};

export {CategoryMenuComponent};