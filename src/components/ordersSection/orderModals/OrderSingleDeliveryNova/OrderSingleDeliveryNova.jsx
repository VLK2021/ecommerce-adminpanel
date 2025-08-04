import React, {useEffect, useState} from 'react';

import css from './OrderSingleDeliveryNova.module.css';
import {novaPoshtaService} from "../../../../services/deliveryServices/index.js";


const OrderSingleDeliveryNova = ({order}) => {
    const [cityNova, setCityNova] = useState(null);
    const [warehouseNova, setWarehouseNova] = useState(null);

    useEffect(() => {
        const fetchCityName = async () => {
            if (order?.deliveryData?.city) {
                const city = await novaPoshtaService.getCityByRef(order.deliveryData.city);
                setCityNova(city ? city.Description : order.deliveryData.city);
            }

            if (order?.deliveryData?.warehouse && order?.deliveryData?.city) {
                const warehouse = await novaPoshtaService.getWarehouseByRef(order.deliveryData.warehouse);
                setWarehouseNova(warehouse ? warehouse.Description : order.deliveryData.warehouse);
            }
        };

        fetchCityName();
    }, [order]);

    if (!order) return null;


    return (
        <div className={css.wrap}>
            <div className={css.headerRow}>
                <span className={css.label}>Тип:</span>
                <b className={css.type}>Нова Пошта</b>
            </div>
            <div className={css.dataRow}>
                <span className={css.label}>Місто:</span>
                <b className={css.value}>{cityNova || '—'}</b>
            </div>
            <div className={css.dataRow}>
                <span className={css.label}>Відділення:</span>
                <b className={`${css.value} ${css.mar}`}>{warehouseNova || '—'}</b>
            </div>
        </div>

    );
};

export {OrderSingleDeliveryNova};
