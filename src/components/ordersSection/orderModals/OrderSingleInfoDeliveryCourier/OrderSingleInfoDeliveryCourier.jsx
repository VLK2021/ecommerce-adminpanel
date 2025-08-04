import React from 'react';

import css from './OrderSingleInfoDeliveryCourier.module.css';


const OrderSingleInfoDeliveryCourier = ({order}) => {
    if (!order) return null;


    return (
        <div className={css.wrap}>
            <div className={css.pair}><span>Тип:</span> <b>{order.deliveryType || '—'}</b></div>
            <div className={css.pair}><span>Область::</span> <b>{order.deliveryData?.region || '—'}</b></div>
            <div className={css.pair}><span>Місто:</span> <b>{order.deliveryData?.city || '—'}</b></div>
            <div className={css.pair}><span>Вулиця:</span> <b>{order.deliveryData?.street || '—'}</b></div>
            <div className={css.pair}><span>Будинок:</span> <b>{order.deliveryData?.house || '—'}</b></div>
            <div className={css.pair}><span>Підїзд:</span> <b>{order.deliveryData?.entrance || '—'}</b></div>
            <div className={css.pair}><span>Поверх:</span> <b>{order.deliveryData?.floor || '—'}</b></div>
            <div className={css.pair}><span>Квартира:</span> <b>{order.deliveryData?.apartment || '—'}</b></div>
            {order.deliveryData?.comment &&
                <div className={css.pair}><span>Комент:</span> <b>{order.deliveryData.comment}</b></div>}

        </div>
    );
};

export {OrderSingleInfoDeliveryCourier};