import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import css from './WarehousesMenuComponent.module.css';
import {
    ButtonAll,
    ButtonCreate,
    CustomSelect,
    SearchInput
} from '../../../ui/index.js';
import {warehouseActions, warehousesQueryActions} from "../../../store/index.js";


const sortOptionsWarehouses = [
    { value: 'name_asc', label: 'Назва (А-Я)' },
    { value: 'name_desc', label: 'Назва (Я-А)' },
];

const WarehousesMenuComponent = () => {
    const dispatch = useDispatch();
    const {
        search,
        sortValue,
        sortBy,
        sortOrder,
    } = useSelector(store => store.warehousesQuery);

    useEffect(() => {
        const params = { search, sortBy, sortOrder };
        dispatch(warehouseActions.getAllWarehouses(params));
    }, [search, sortBy, sortOrder, dispatch]);

    const openCreateWarehouseModal = () => {
    };

    const handleSearchWarehousesChange = (e) => {
        dispatch(warehousesQueryActions.setSearch(e.target.value));
    };

    const handleSearchWarehousesDebounced = (value) => {
        dispatch(warehousesQueryActions.setSearch(value));
    };

    const handleSortChange = (value) => {
        dispatch(warehousesQueryActions.setSortBy(value));
    };

    const handleReset = () => {
        dispatch(warehousesQueryActions.resetFilters());
    };


    return (
        <div className={css.wrap}>
            <ButtonCreate onClick={openCreateWarehouseModal} />

            <SearchInput
                name="warehouseSearch"
                value={search}
                onChange={handleSearchWarehousesChange}
                onDebouncedSearch={handleSearchWarehousesDebounced}
                placeholder="Пошук складу"
            />

            <CustomSelect
                value={sortValue}
                options={sortOptionsWarehouses}
                placeholder="Сортувати за"
                onChangeCallback={handleSortChange}
            />

            <ButtonAll
                titleButton="Скинути фільтри"
                onClick={handleReset}
            />
        </div>
    );
};

export { WarehousesMenuComponent };
