import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import css from './OrderInfoSingleModal.module.css';
import {ButtonClose} from '../../../../ui/index.js';
import {orderActions} from '../../../../store/index.js';
import {orderService} from '../../../../services/orderServices/index.js';
import OrderStatuses from "../../../../helpers/OrderStatus.jsx";
import PaymentOptions from "../../../../helpers/PaymentOptions.jsx";



const OrderInfoSingleModal = () => {
    const dispatch = useDispatch();
    const [orderData, setOrderData] = useState(null);
    const {selectedOrderId} = useSelector(store => store.order);

    console.log(orderData);

    useEffect(() => {
        if (!selectedOrderId) return;
        const fetchOrder = async () => {
            try {
                const response = await orderService.getOrderById(selectedOrderId);
                setOrderData(response);
            } catch (e) {
                console.error('🔥 Помилка отримання ордера:', e);
            }
        };
        fetchOrder();
    }, [selectedOrderId]);

    const closeOrderInfoModal = () => {
        dispatch(orderActions.closeDetailsOrderModal());
        dispatch(orderActions.resetSelectedOrder());
    };

    if (!orderData) return null;

    const {
        orderNumber,
        createdAt,
        updatedAt,
        customerName,
        customerPhone,
        customerEmail,
        deliveryType,
        deliveryData,
        paymentType,
        paymentStatus,
        status,
        totalPrice,
        comment,
        items,
        warehouse,
    } = orderData;

    const statusOrder =
        OrderStatuses.find((s) => s.value === status)?.label || status;

    const paymentOptions =
        PaymentOptions.find((s) => s.value === paymentType)?.label || paymentType;


    return (
        <div className={css.overlay}>
            <div className={css.modal}>
                <div className={css.header}>
                    <div className={css.titleSection}>
                        <span className={css.orderIcon}>🧾</span>
                        <span>Замовлення №{orderNumber}</span>
                        <span className={css.statusBadge}>{statusOrder}</span>
                    </div>
                    <ButtonClose onClick={closeOrderInfoModal}/>
                </div>

                <div className={css.flexContainer}>
                    {/* LEFT COLUMN */}
                    <div className={css.left}>
                        <div className={css.section}>
                            <div className={css.sectionHeader}>Загальна</div>
                            <div className={css.pair}><span>Дата створення:</span> <b>{new Date(createdAt).toLocaleString()}</b></div>
                            <div className={css.pair}><span>Дата оновлення:</span> <b>{new Date(updatedAt).toLocaleString()}</b></div>
                            <div className={css.pair}><span>Сума:</span> <b>{Number(totalPrice).toLocaleString()} грн</b></div>
                            <div className={css.pair}><span>Оплата:</span> <b>{paymentOptions || '—'}</b></div>
                            <div className={css.pair}><span>Статус оплати:</span> <b>{paymentStatus}</b></div>
                            {comment && <div className={css.pair}><span>Коментар:</span> <b>{comment}</b></div>}
                        </div>

                        <div className={css.section}>
                            <div className={css.sectionHeader}>Клієнт</div>
                            <div className={css.pair}><span>Ім’я:</span> <b>{customerName}</b></div>
                            <div className={css.pair}><span>Телефон:</span> <b>{customerPhone}</b></div>
                            <div className={css.pair}><span>Email:</span> <b>{customerEmail}</b></div>
                        </div>

                        <div className={css.section}>
                            <div className={css.sectionHeader}>Доставка</div>
                            <div className={css.pair}><span>Тип:</span> <b>{deliveryType || '—'}</b></div>
                            <div className={css.pair}><span>Місто:</span> <b>{deliveryData?.city || '—'}</b></div>
                            <div className={css.pair}><span>Склад:</span> <b>{deliveryData?.warehouse || '—'}</b></div>
                            {deliveryData?.comment &&
                                <div className={css.pair}><span>Комент:</span> <b>{deliveryData.comment}</b></div>}
                        </div>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className={css.right}>
                        <div className={css.section}>
                            <div className={css.sectionHeader + ' ' + css.sectionProductsHeader}>
                                Товари
                            </div>
                            <div className={css.productsList}>
                                {items?.length ? items.map((item, idx) => (
                                    <div className={css.productRow} key={item.id || idx}>
                                        <div className={css.productMain}>
                                            <div className={css.productName}>{item.product?.name}</div>
                                            <div className={css.productQtyPrice}>
                                                <span className={css.productCount}>×{item.quantity}</span>
                                                <span className={css.productPrice}>
                                                    {Number(item.price).toLocaleString()} грн
                                                </span>
                                            </div>
                                        </div>
                                        <div className={css.productMeta}>
                                            <span>{item.warehouse?.name}</span>
                                        </div>
                                    </div>
                                )) : <div className={css.noProducts}>Немає товарів</div>}
                            </div>
                        </div>

                        <div className={css.section + ' ' + css.sectionWarehouse}>
                            <div className={css.sectionHeader}>Відвантаження</div>
                            <div className={css.pair}><span>Склад:</span> <b>{warehouse?.name}</b></div>
                            <div className={css.pair}><span>Адреса:</span> <b>{warehouse?.address}</b></div>
                            <div className={css.pair}><span>Місто:</span> <b>{warehouse?.city}</b></div>
                            <div className={css.pair}><span>Телефон:</span> <b>{warehouse?.phone}</b></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export {OrderInfoSingleModal};
