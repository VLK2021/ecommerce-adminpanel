import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useFormContext} from 'react-hook-form';

import {warehouseActions} from '../../../../../store';
import {CustomSelect} from '../../../../../ui';
import css from './StepWarehouse.module.css';


const StepWarehouse = () => {
    const dispatch = useDispatch();
    const {warehouses, status} = useSelector(store => store.warehouse);

    const {setValue, watch} = useFormContext();
    const selectedWarehouseId = watch('warehouseId') || '';

    useEffect(() => {
        if (!warehouses.length) {
            dispatch(warehouseActions.getAllWarehouses());
        }
    }, [dispatch, warehouses.length]);

    const options = warehouses.map(w => ({
        value: w.id,
        label: w.name,
    }));

    const handleSelect = (id) => {
        setValue('warehouseId', id, {shouldDirty: true});
    };


    return (
        <div className={css.wrap}>
            <div className={css.title}>Склад відвантаження:</div>

            <CustomSelect
                value={selectedWarehouseId}
                onChangeCallback={handleSelect}
                options={options}
                placeholder={status === 'loading' ? 'Завантаження...' : 'Оберіть склад'}
            />

            {status === 'failed' && <div className={css.error}>Не вдалося завантажити склади</div>}
        </div>
    );
};

export {StepWarehouse};
