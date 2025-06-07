import React from 'react';

import css from './AttributesMenuComponent.module.css';
import {ButtonCreate, CustomSelect, SearchInput} from "../../../ui/index.js";


const sortOptionsAttributes = [
    { value: 'name_asc', label: 'Назва (А-Я)' },
    { value: 'name_desc', label: 'Назва (Я-А)' },
];



const AttributesMenuComponent = ({setIsOpenCreateAttribute}) => {
    const handleSearchAttributes = (query) => {
        console.log(query);
    };

    const handleSortChangeAttributes = (value) => {
        console.log(value);
    }


    return (
        <div className={css.wrap}>
            <ButtonCreate onClick={() => setIsOpenCreateAttribute(true)}/>

            <SearchInput
                name={"attributeSearch"}
                onDebouncedSearch={handleSearchAttributes}
                placeholder={'Пошук товарів'}
            />

            <CustomSelect
                name={"sort"}
                options={sortOptionsAttributes}
                placeholder={"Сортувати за"}
                onChangeCallback={handleSortChangeAttributes}
            />
        </div>
    );
};

export {AttributesMenuComponent};