import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import css from './WarehousesListComponent.module.css';
import {warehouseActions} from "../../../store/index.js";
import WarehouseSingleItemComponent from "../WarehouseSingleItemComponent/WarehouseSingleItemComponent.jsx";


const WarehousesListComponent = () => {
    const dispatch = useDispatch();
    const {warehouses, trigger} = useSelector(store => store.warehouse);
    const {search, sortBy, sortOrder} = useSelector(store => store.warehousesQuery);

    useEffect(() => {
        dispatch(warehouseActions.getAllWarehouses({search, sortBy, sortOrder}));
    }, [dispatch, trigger, search, sortBy, sortOrder]);


    return (
        <div className={css.pageContent}>
            <div className={css.header}>
                <div className={css.name}>Назва</div>
                <div className={css.address}>Адреса</div>
                <div className={css.phone}>Телефон</div>
                <div className={css.city}>Місто</div>
                <div className={css.isActive}>Фктивний</div>
                <div className={css.action}>Дія</div>
            </div>

            <div className={css.warehousesScroll}>
                {Array.isArray(warehouses) && warehouses.length > 0 ? (
                    warehouses.map((product) => (
                        <WarehouseSingleItemComponent
                            key={product.id}
                            product={product}
                        />
                    ))
                ) : (
                    <div className={css.noProducts}>Немає товарів</div>
                )}
            </div>
        </div>
    );
};

export default React.memo(WarehousesListComponent);