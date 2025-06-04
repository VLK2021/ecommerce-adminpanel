import React from 'react';

import css from './ProductMenuComponent.module.css';
import {ButtonCreate, SearchInput} from "../../../ui/index.js";


const ProductMenuComponent = () => {
    const handleSearch = (query) => {
        console.log(query);
    }


    return (
        <div className={css.wrap}>
            <ButtonCreate/>

            <SearchInput
                name={"productSearch"}
                onDebouncedSearch={handleSearch}
                placeholder={'Пошук товарів'}
            />
        </div>
    );
};

export {ProductMenuComponent};