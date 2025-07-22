import React, {useState} from 'react';
import {useDispatch} from "react-redux";

import css from './OrderItemListComponent.module.css';
import {formatDate} from "../../../helpers/index.js";
import {orderActions} from "../../../store/index.js";
import {ButtonAll, ButtonClose} from "../../../ui/index.js";
import {toast} from "react-toastify";
import {orderService} from "../../../services/orderServices/index.js";


const OrderStatuses = [
    {value: 'NEW', label: 'Новий'},
    {value: 'PROCESSING', label: 'Обробляється'},
    {value: 'SHIPPED', label: 'Відправлено'},
    {value: 'RETURNED', label: 'Повернуто'},
    {value: 'PAID', label: 'Завершено'},
    {value: 'CANCELLED', label: 'Скасовано'},
    {value: 'DELIVERED', label: 'Доставлено'}
];


const OrderItemListComponent = ({order}) => {
    const dispatch = useDispatch();
    const {
        id,
        orderNumber,
        customerName,
        deliveryType,
        status,
        paymentStatus,
        totalPrice,
        createdAt
    } = order;
    const orderDate = formatDate(createdAt);

    const [statusOpen, setStatusOpen] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(orderActions.openUpdateOrderModal());
        dispatch(orderActions.selectOrder(id));
    };

    const deleteProduct = (e) => {
        e.stopPropagation();
    };

    const showInformation = (e) => {
        e.stopPropagation();
        dispatch(orderActions.openDetailsOrderModal());
        dispatch(orderActions.selectOrder(id));
    };

    const toggleStatusSelect = (e) => {
        e.stopPropagation();

        setStatusOpen(!statusOpen);
    };

    const changeStatus = async (newStatus) => {
        setStatusOpen(false);
        try {
            await orderService.updateStatusOrder(id, newStatus);

            dispatch(orderActions.changeTrigger());
            toast.success('Статус оновлено');
        } catch (e) {
            console.error("🔥 Помилка при оновленні статусу:", e);
            toast.error('Помилка оновлення статусу');
        }
    };


    const currentStatus = OrderStatuses.find(s => s.value === status);

    return (
        <div className={css.wrap} onClick={handleClick}>
            <div className={css.orderNumber}>{orderNumber}</div>
            <div className={css.orderName}>{customerName}</div>
            <div className={css.orderPrice}>{totalPrice} грн</div>
            <div className={css.paymentStatus}>{paymentStatus}</div>

            <div className={css.orderStatus} onClick={toggleStatusSelect}>
                <span className={css.statusText}>
                    {currentStatus ? currentStatus.label : status}
                </span>
                {statusOpen && (
                    <div className={css.statusDropdown}>
                        {OrderStatuses.map(s => (
                            <div
                                key={s.value}
                                className={css.statusOption}
                                onClick={() => changeStatus(s.value)}
                            >
                                {s.label}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className={css.date}>{orderDate}</div>
            <div className={css.delivery}>{deliveryType}</div>

            <div className={css.action}>
                <ButtonAll titleButton={'інфо'} onClick={showInformation}/>
                <ButtonClose onClick={deleteProduct}/>
            </div>
        </div>
    );
};

export default React.memo(OrderItemListComponent);
