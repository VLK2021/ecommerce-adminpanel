import React from 'react';
import {FormProvider, useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import { toast } from "react-toastify";

import css from './OrderCreateModal.module.css';
import { ButtonCancel, ButtonClose, ButtonOk } from "../../../../../ui/index.js";
import { orderActions } from "../../../../../store/index.js";
import {StepsInModal} from "../../StepsInModal/StepsInModal.jsx";


const OrderCreateModal = () => {
    const dispatch = useDispatch();

    const methods = useForm();

    const handleCloseCreateOrder = () => {
        dispatch(orderActions.closeCreateOrderModal());
    }

    const onSubmit = (data) => {
        try {
            console.log(data);

            const formatedData = {
                userId: "",
                customerName: "",
                customerPhone: "",
                customerEmail: "",
                deliveryType: "",
                deliveryData: {
                    city: "",
                    warehouse: ""
                },
                comment: "",
                totalPrice: 640.5,
                items: [],
            };
            console.log(formatedData);

            dispatch(orderActions.changeTrigger());
            toast.success('Товар успішно створений!');
            dispatch(orderActions.closeCreateOrderModal());
        } catch (e) {
            console.error(e);
            toast.error('Помилка створення');
        }
    };


    return (
        <div className={css.overlay}>
            <div className={css.modal}>
                <div className={css.header}>
                    <div className={css.title}>Створення ордера</div>
                    <ButtonClose onClick={handleCloseCreateOrder} />
                </div>

                <StepsInModal/>

                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} className={css.form}>
                        <div></div>

                        <div className={css.buttonsBlock}>
                            <ButtonCancel onClick={handleCloseCreateOrder}/>
                            <ButtonOk/>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </div>
    );
};

export { OrderCreateModal };
