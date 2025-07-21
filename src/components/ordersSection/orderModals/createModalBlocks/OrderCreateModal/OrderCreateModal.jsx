import React from 'react';
import {FormProvider, useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";

import css from './OrderCreateModal.module.css';
import {ButtonAll, ButtonCancel, ButtonClose, ButtonOk} from "../../../../../ui/index.js";
import {orderActions} from "../../../../../store/index.js";
import {StepsInModal} from "../../StepsInModal/StepsInModal.jsx";
import {STEPS, stepsItemsRender} from "../../../../../helpers/index.js";
import {orderService} from "../../../../../services/orderServices/index.js";


const OrderCreateModal = () => {
    const dispatch = useDispatch();
    const {activeStep} = useSelector(store => store.order);
    const methods = useForm();

    const handleCloseCreateOrder = () => {
        dispatch(orderActions.closeCreateOrderModal());
    };

    const onSubmit = async (data) => {
        try {
            const isGuest = data.isGuest === "true";
            const selectedUser = data.selectedUser || {};
            const deliveryData = data.deliveryData || {};
            const products = data.products || [];
            const deliveryType = data.deliveryType;
            const comment = deliveryData.comment || "";
            const warehouseId = data.warehouseId;

            const customerName = isGuest
                ? `${deliveryData.guestName || ""} ${deliveryData.guestLastName || ""}`.trim()
                : `${selectedUser.name || ""} ${selectedUser.lastName || ""}`.trim();

            const customerPhone = isGuest
                ? deliveryData.guestPhone || ""
                : selectedUser.phone || "";

            const customerEmail = isGuest
                ? deliveryData.guestEmail || ""
                : selectedUser.email || "";

            let formattedDeliveryData = {};

            if (deliveryType === "nova" || deliveryType === "nova_poshta") {
                // Гарантовано беремо тільки Ref
                formattedDeliveryData = {
                    city: (typeof deliveryData.city === 'object')
                        ? (deliveryData.city.value || deliveryData.city.Ref || "")
                        : deliveryData.city || "",

                    warehouse: (typeof deliveryData.warehouse === 'object')
                        ? (deliveryData.warehouse.value || deliveryData.warehouse.Ref || "")
                        : deliveryData.warehouse || ""
                };
            } else if (deliveryType === "courier") {
                formattedDeliveryData = {
                    city: deliveryData.city?.label || deliveryData.city || "",
                    region: deliveryData.region || "",
                    street: deliveryData.street || "",
                    house: deliveryData.house || "",
                    apartment: deliveryData.apartment || "",
                    entrance: deliveryData.entrance || "",
                    floor: deliveryData.floor || "",
                };
            }

            Object.keys(formattedDeliveryData).forEach(key => {
                if (!formattedDeliveryData[key]) delete formattedDeliveryData[key];
            });

            const items = products.map(p => ({
                productId: p.productId || p.id,
                quantity: Number(p.quantity) || 1,
                price: Number(p.price) || 0,
                productName: p.productName,
                productCategoryId: p.productCategoryId,
                productCategoryName: p.productCategoryName,
                isActive: typeof p.isActive === "boolean" ? p.isActive : true,
                warehouseId,
            }));

            const totalPrice = deliveryData.totalPrice
                || products.reduce((acc, p) => acc + ((+p.price || 0) * (+p.quantity || 1)), 0);

            const userId = isGuest ? undefined : (selectedUser.id || undefined);

            const payload = {
                ...(userId ? {userId} : {}),
                ...(customerName ? {customerName} : {}),
                ...(customerPhone ? {customerPhone} : {}),
                ...(customerEmail ? {customerEmail} : {}),
                ...(deliveryType ? {deliveryType} : {}),
                ...(Object.keys(formattedDeliveryData).length ? {deliveryData: formattedDeliveryData} : {}),
                ...(warehouseId ? {warehouseId} : {}),
                ...(data.paymentType ? {paymentType: data.paymentType} : {}),
                ...(comment ? {comment} : {}),
                ...(totalPrice ? {totalPrice} : {}),
                items
            };

            await orderService.createOrder(payload);
            dispatch(orderActions.changeTrigger());
            toast.success('Товар успішно створений!');
            dispatch(orderActions.closeCreateOrderModal());

        } catch (e) {
            console.error("🔥 Помилка при створенні ордера:", e);
            toast.error('Помилка створення замовлення');
        }
    };

    return (
        <div className={css.overlay}>
            <div className={css.modal}>
                <div className={css.header}>
                    <div className={css.title}>Створення ордера</div>
                    <ButtonClose onClick={handleCloseCreateOrder}/>
                </div>
                <div className={css.stepsBlock}>
                    <StepsInModal/>
                </div>
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} className={css.form}>
                        <div className={css.infoBlock}>
                            {stepsItemsRender(activeStep)}
                        </div>
                        <div className={css.buttonsBlock}>
                            <ButtonCancel onClick={handleCloseCreateOrder}/>
                            {activeStep > 0 && (
                                <ButtonAll
                                    titleButton={'Назад'}
                                    onClick={() => dispatch(orderActions.changeActiveStep(activeStep - 1))}
                                />
                            )}
                            {activeStep < STEPS.length - 1 ? (
                                <ButtonAll
                                    titleButton={'Далі'}
                                    onClick={() => dispatch(orderActions.changeActiveStep(activeStep + 1))}
                                />
                            ) : (
                                <ButtonOk/>
                            )}
                        </div>
                    </form>
                </FormProvider>
            </div>
        </div>
    );
};

export {OrderCreateModal};
