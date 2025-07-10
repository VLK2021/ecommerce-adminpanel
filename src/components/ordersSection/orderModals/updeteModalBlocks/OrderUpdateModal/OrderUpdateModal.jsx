// import React, {useEffect} from 'react';
// import {FormProvider, useForm} from "react-hook-form";
// import {useDispatch, useSelector} from "react-redux";
// import {toast} from "react-toastify";
//
// import css from './OrderUpdateModal.module.css';
// import {ButtonAll, ButtonCancel, ButtonClose, ButtonOk} from "../../../../../ui/index.js";
// import {StepsInModal} from "../../StepsInModal/StepsInModal.jsx";
// import {orderActions} from "../../../../../store/index.js";
// import {STEPS, stepsItemsRender} from "../../../../../helpers/index.js";
// import {orderService} from "../../../../../services/orderServices/index.js";
//
//
// const OrderUpdateModal = () => {
//     const dispatch = useDispatch();
//     const methods = useForm();
//
//     const { activeStep, selectedOrderId } = useSelector(store => store.order);
//
//     const handleCloseCreateOrder = () => {
//         dispatch(orderActions.closeUpdateOrderModal());
//     };
//
//     useEffect(() => {
//         if (!selectedOrderId) return;
//
//         const fetchOrder = async () => {
//             try {
//                 const response = await orderService.getOrderById(selectedOrderId);
//                 console.log(response);
//
//
//             } catch (e) {
//                 toast.error('Не вдалося отримати дані ордера');
//             }
//         }
//         fetchOrder();
//     }, [methods, selectedOrderId])
//
//
//     const onSubmit = async (data) => {
//         console.log(data);
//         try {
//
//
//             dispatch(orderActions.changeTrigger());
//
//             toast.success('Товар успішно оновлений!');
//             dispatch(orderActions.closeUpdateOrderModal());
//         }catch (e) {
//             console.error("🔥 Помилка при оновленні ордера:", e);
//             toast.error('Помилка оновленні замовлення');
//         }
//     }
//
//
//     return (
//         <div className={css.overlay}>
//             <div className={css.modal}>
//                 <div className={css.header}>
//                     <div className={css.title}>Оновлення ордера</div>
//                     <ButtonClose onClick={handleCloseCreateOrder} />
//                 </div>
//
//                 <div className={css.stepsBlock}>
//                     <StepsInModal />
//                 </div>
//
//                 <FormProvider {...methods}>
//                     <form onSubmit={methods.handleSubmit(onSubmit)} className={css.form}>
//                         <div className={css.infoBlock}>
//                             {stepsItemsRender(activeStep)}
//                         </div>
//
//                         <div className={css.buttonsBlock}>
//                             <ButtonCancel onClick={handleCloseCreateOrder} />
//                             {activeStep > 0 && (
//                                 <ButtonAll
//                                     titleButton={'Назад'}
//                                     onClick={() => dispatch(orderActions.changeActiveStep(activeStep - 1))}
//                                 />
//                             )}
//                             {activeStep < STEPS.length - 1 ? (
//                                 <ButtonAll
//                                     titleButton={'Далі'}
//                                     onClick={() => dispatch(orderActions.changeActiveStep(activeStep + 1))}
//                                 />
//                             ) : (
//                                 <ButtonOk />
//                             )}
//                         </div>
//                     </form>
//                 </FormProvider>
//
//             </div>
//         </div>
//     );
// };
//
// export {OrderUpdateModal};
//
//
//
//
//
//
//
//
//
//
//
//
//
//








import React, { useEffect } from 'react';
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import css from './OrderUpdateModal.module.css';
import { ButtonAll, ButtonCancel, ButtonClose, ButtonOk } from "../../../../../ui/index.js";
import { StepsInModal } from "../../StepsInModal/StepsInModal.jsx";
import { orderActions } from "../../../../../store/index.js";
import { STEPS, stepsItemsRender } from "../../../../../helpers/index.js";
import { orderService } from "../../../../../services/orderServices/index.js";

const OrderUpdateModal = () => {
    const dispatch = useDispatch();
    const methods = useForm();
    const { activeStep, selectedOrderId } = useSelector(store => store.order);

    const handleCloseUpdateOrder = () => {
        dispatch(orderActions.closeUpdateOrderModal());
    };

    // 1. Підтягуємо order по selectedOrderId та заповнюємо форму
    useEffect(() => {
        if (!selectedOrderId) return;

        const fetchOrder = async () => {
            try {
                const order = await orderService.getOrderById(selectedOrderId);

                console.log(order);

                // Підтягуємо всі потрібні поля:
                const defaultValues = {
                    userId: order.userId,
                    warehouseId: order.warehouseId,
                    selectedUser: order.user || null,
                    isGuest: order.userId ? "false" : "true",
                    customerName: order.customerName,
                    customerPhone: order.customerPhone,
                    customerEmail: order.customerEmail,
                    deliveryType: order.deliveryType,
                    paymentType: order.paymentType || order.payment?.type || "", // врахуй що може бути і так, і так
                    // Деталізуємо deliveryData під всі типи:
                    deliveryData: (() => {
                        if (!order.deliveryData || typeof order.deliveryData !== "object") return {};
                        const d = order.deliveryData;
                        switch (order.deliveryType) {
                            case "nova":
                            case "nova_poshta":
                                return {
                                    city: d.city || "",
                                    warehouse: d.warehouse || "",
                                    comment: d.comment || ""
                                };
                            case "courier":
                                return {
                                    city: d.city || "",
                                    region: d.region || "",
                                    street: d.street || "",
                                    house: d.house || "",
                                    apartment: d.apartment || "",
                                    entrance: d.entrance || "",
                                    floor: d.floor || "",
                                    comment: d.comment || ""
                                };
                            case "ukr":
                            case "meest":
                                return {
                                    city: d.city || "",
                                    warehouse: d.warehouse || "",
                                    comment: d.comment || ""
                                };
                            case "pickup":
                                return {
                                    comment: d.comment || ""
                                };
                            default:
                                return d;
                        }
                    })(),
                    comment: order.comment,
                    totalPrice: order.totalPrice,
                    products: (order.items || []).map(item => ({
                        productId: item.productId,
                        id: item.productId, // для компоненту
                        quantity: item.quantity,
                        price: Number(item.price),
                        productName: item.productName,
                        productCategoryId: item.productCategoryId,
                        productCategoryName: item.productCategoryName,
                        isActive: typeof item.isActive === "boolean" ? item.isActive : true,
                        warehouseId: item.warehouseId,
                    }))
                };

                // Якщо гість — підтягуємо guest поля в deliveryData
                if (!order.userId) {
                    if (order.deliveryData) {
                        defaultValues.deliveryData.guestName = order.deliveryData.guestName || "";
                        defaultValues.deliveryData.guestLastName = order.deliveryData.guestLastName || "";
                        defaultValues.deliveryData.guestPhone = order.deliveryData.guestPhone || "";
                        defaultValues.deliveryData.guestEmail = order.deliveryData.guestEmail || "";
                    }
                }

                methods.reset(defaultValues);

            } catch (e) {
                console.error("🔥 Помилка:", e);
                toast.error('Не вдалося отримати дані ордера');
            }
        };
        fetchOrder();
        // eslint-disable-next-line
    }, [methods, selectedOrderId]);

    // Сабміт
    const onSubmit = async (data) => {
        try {
            const isGuest = data.isGuest === "true";
            const selectedUser = data.selectedUser || {};
            const deliveryData = data.deliveryData || {};
            const products = data.products || [];
            const deliveryType = data.deliveryType;
            const paymentType = data.paymentType;
            const comment = deliveryData.comment || "";
            const warehouseId = data.warehouseId;

            // Клієнт
            const customerName = isGuest
                ? `${deliveryData.guestName || ""} ${deliveryData.guestLastName || ""}`.trim()
                : `${selectedUser.name || ""} ${selectedUser.lastName || ""}`.trim();
            const customerPhone = isGuest
                ? deliveryData.guestPhone || ""
                : selectedUser.phone || "";
            const customerEmail = isGuest
                ? deliveryData.guestEmail || ""
                : selectedUser.email || "";

            // DeliveryData для різних типів
            let formattedDeliveryData = {};
            if (deliveryType === "nova" || deliveryType === "nova_poshta") {
                formattedDeliveryData = {
                    city: deliveryData.city?.label || deliveryData.city?.Description || deliveryData.city || "",
                    warehouse: deliveryData.warehouse?.label || deliveryData.warehouse?.Description || deliveryData.warehouse || "",
                    comment: deliveryData.comment || ""
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
                    comment: deliveryData.comment || ""
                };
            } else if (deliveryType === "ukr" || deliveryType === "meest") {
                formattedDeliveryData = {
                    city: deliveryData.city?.label || deliveryData.city || "",
                    warehouse: deliveryData.warehouse?.label || deliveryData.warehouse || "",
                    comment: deliveryData.comment || ""
                };
            } else if (deliveryType === "pickup") {
                formattedDeliveryData = {
                    comment: deliveryData.comment || ""
                };
            }
            // Якщо гість — додати guest-поля
            if (isGuest) {
                formattedDeliveryData.guestName = deliveryData.guestName || "";
                formattedDeliveryData.guestLastName = deliveryData.guestLastName || "";
                formattedDeliveryData.guestPhone = deliveryData.guestPhone || "";
                formattedDeliveryData.guestEmail = deliveryData.guestEmail || "";
            }
            // Прибираємо пусті ключі
            Object.keys(formattedDeliveryData).forEach(key => {
                if (
                    formattedDeliveryData[key] === "" ||
                    formattedDeliveryData[key] === undefined ||
                    formattedDeliveryData[key] === null
                ) {
                    delete formattedDeliveryData[key];
                }
            });

            // Товари
            const items = (products || []).map((p) => ({
                productId: p.productId || p.id,
                quantity: Number(p.quantity) || 1,
                price: Number(p.price) || 0,
                productName: p.productName,
                productCategoryId: p.productCategoryId,
                productCategoryName: p.productCategoryName,
                isActive: typeof p.isActive === "boolean" ? p.isActive : true,
                warehouseId, // обовʼязково!
            }));

            const totalPrice = deliveryData.totalPrice
                || products.reduce((acc, p) => acc + ((+p.price || 0) * (+p.quantity || 1)), 0);

            const userId = isGuest ? undefined : (selectedUser.id || undefined);

            // payload
            const payload = {
                ...(userId ? { userId } : {}),
                ...(customerName ? { customerName } : {}),
                ...(customerPhone ? { customerPhone } : {}),
                ...(customerEmail ? { customerEmail } : {}),
                ...(deliveryType ? { deliveryType } : {}),
                ...(Object.keys(formattedDeliveryData).length ? { deliveryData: formattedDeliveryData } : {}),
                ...(warehouseId ? { warehouseId } : {}),
                ...(paymentType ? { paymentType } : {}),
                ...(comment ? { comment } : {}),
                ...(totalPrice ? { totalPrice } : {}),
                items
            };

            function deepClean(obj) {
                if (Array.isArray(obj)) {
                    return obj.map(deepClean);
                } else if (typeof obj === "object" && obj !== null) {
                    const result = {};
                    Object.entries(obj).forEach(([key, value]) => {
                        if (
                            value !== undefined &&
                            value !== null &&
                            !(typeof value === "string" && value.trim() === "")
                        ) {
                            result[key] = deepClean(value);
                        }
                    });
                    return result;
                }
                return obj;
            }
            const cleanPayload = deepClean(payload);

            await orderService.updateOrderById(selectedOrderId, cleanPayload);
            dispatch(orderActions.changeTrigger());
            toast.success('Товар успішно оновлений!');
            dispatch(orderActions.closeUpdateOrderModal());
        } catch (e) {
            console.error("🔥 Помилка при оновленні ордера:", e);
            toast.error('Помилка оновлення замовлення');
        }
    };

    return (
        <div className={css.overlay}>
            <div className={css.modal}>
                <div className={css.header}>
                    <div className={css.title}>Оновлення ордера</div>
                    <ButtonClose onClick={handleCloseUpdateOrder} />
                </div>
                <div className={css.stepsBlock}>
                    <StepsInModal />
                </div>
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} className={css.form}>
                        <div className={css.infoBlock}>
                            {stepsItemsRender(activeStep)}
                        </div>
                        <div className={css.buttonsBlock}>
                            <ButtonCancel onClick={handleCloseUpdateOrder} />
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
                                <ButtonOk />
                            )}
                        </div>
                    </form>
                </FormProvider>
            </div>
        </div>
    );
};

export { OrderUpdateModal };
