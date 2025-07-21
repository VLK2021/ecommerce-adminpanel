import React, {useEffect} from 'react';
import {FormProvider, useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";

import css from './OrderUpdateModal.module.css';
import {ButtonAll, ButtonCancel, ButtonClose, ButtonOk} from "../../../../../ui/index.js";
import {StepsInModal} from "../../StepsInModal/StepsInModal.jsx";
import {orderActions} from "../../../../../store/index.js";
import {STEPS, stepsItemsRender} from "../../../../../helpers/index.js";
import {orderService} from "../../../../../services/orderServices/index.js";
import {novaPoshtaService} from "../../../../../services/deliveryServices/index.js";


const parseDeliveryFields = (type, data = {}) => {
    switch (type) {
        case "nova":
            return {
                city: data.city || "",
                warehouse: data.warehouse || "",
                comment: data.comment || ""
            };
        case "ukr":
        case "meest":
        case "courier":
            return {
                city: data.city || "",
                region: data.region || "",
                street: data.street || "",
                house: data.house || "",
                apartment: data.apartment || "",
                entrance: data.entrance || "",
                floor: data.floor || "",
                comment: data.comment || ""
            };
        case "pickup":
            return {comment: data.comment || ""};
        default:
            return {};
    }
};

const parseGuestFields = (order) => {
    let guestName = "";
    let guestLastName = "";
    if (order.customerName) {
        const [first, ...rest] = order.customerName.split(" ");
        guestName = first || "";
        guestLastName = rest.join(" ") || "";
    }
    return {
        guestName,
        guestLastName,
        guestPhone: order.customerPhone || "",
        guestEmail: order.customerEmail || ""
    };
};

const getSelectedUser = (order) =>
    order.user
        ? {
            id: order.user.id || "",
            name: order.user.name || "",
            lastName: order.user.lastName || "",
            phone: order.user.phone || "",
            email: order.user.email || ""
        }
        : null;

const isOrderGuest = (order) => !order.userId || !order.user;

// ==================== КОМПОНЕНТ ====================

const OrderUpdateModal = () => {
    const dispatch = useDispatch();
    const methods = useForm();
    const {activeStep, selectedOrderId} = useSelector(store => store.order);

    const handleCloseUpdateOrder = () => {
        dispatch(orderActions.closeUpdateOrderModal());
    };

    useEffect(() => {
        if (!selectedOrderId) return;

        const fetchOrder = async () => {
            try {
                const order = await orderService.getOrderById(selectedOrderId);
                const guest = isOrderGuest(order);

                let deliveryData = parseDeliveryFields(order.deliveryType, order.deliveryData);

                if (order.deliveryType === 'nova') {
                    const citiesResponse = await novaPoshtaService.getCities('');
                    const cityValue = String(order.deliveryData?.city).trim();

                    let matchedCity = citiesResponse.find(city => {
                        // Перевіряємо чи cityValue схожий на Ref (UUID), чи ні:
                        const isRef = cityValue.length > 10 && cityValue.includes('-');
                        if (isRef) {
                            return String(city.Ref).trim() === cityValue;
                        } else {
                            return String(city.Description).trim().toLowerCase() === cityValue.toLowerCase();
                        }
                    });

                    deliveryData.city = matchedCity
                        ? {value: matchedCity.Ref, label: matchedCity.Description}
                        : {value: cityValue, label: cityValue};

                    deliveryData.warehouse = order.deliveryData?.warehouse
                        ? {value: order.deliveryData.warehouse, label: order.deliveryData.warehouse}
                        : null;
                }

                if (guest) {
                    deliveryData = {...deliveryData, ...parseGuestFields(order)};
                }

                const selectedUser = (!guest && order.user) ? getSelectedUser(order) : null;

                const products = (order.items || []).map(item => ({
                    productId: item.productId || item.product?.id,
                    id: item.productId || item.product?.id,
                    quantity: item.quantity,
                    price: Number(item.price),
                    name: item.productName || item.name || (item.product && item.product.name) || "",
                    productName: item.productName || item.name || (item.product && item.product.name) || "",
                    productCategoryId: item.productCategoryId || item.product?.categoryId,
                    productCategoryName: item.productCategoryName || item.product?.categoryName,
                    isActive: typeof item.isActive === "boolean" ? item.isActive : true,
                    warehouseId: item.warehouseId || item.warehouse?.id,
                }));

                methods.reset({
                    isGuest: guest ? "true" : "false",
                    selectedUser,
                    userId: order.userId || "",
                    warehouseId: order.warehouseId || order.warehouse?.id || "",
                    deliveryType: order.deliveryType || "",
                    paymentType: order.paymentType || "",
                    deliveryData,
                    comment: order.comment || "",
                    totalPrice: order.totalPrice || "",
                    products,
                }, {keepDirty: false, keepValues: false});

            } catch (e) {
                console.error("🔥 Помилка при оновленні ордера:", e);
                toast.error('Не вдалося оновленні дані ордера');
            }
        };

        fetchOrder();
    }, [methods, selectedOrderId]);

    const onSubmit = async (data) => {
        try {
            const isGuest = data.isGuest === "true";
            const deliveryType = data.deliveryType;
            let formattedDeliveryData = parseDeliveryFields(deliveryType, data.deliveryData);

            if (deliveryType === 'nova') {
                formattedDeliveryData.city = data.deliveryData.city?.value || "";
                formattedDeliveryData.warehouse = data.deliveryData.warehouse?.value || "";
            }

            if (isGuest) {
                formattedDeliveryData = {
                    ...formattedDeliveryData,
                    guestName: data.deliveryData.guestName || "",
                    guestLastName: data.deliveryData.guestLastName || "",
                    guestPhone: data.deliveryData.guestPhone || "",
                    guestEmail: data.deliveryData.guestEmail || ""
                };
            }

            const selectedUser = data.selectedUser || {};
            const products = data.products || [];
            const comment = data.comment || "";

            const customerName = isGuest
                ? `${data.deliveryData.guestName || ""} ${data.deliveryData.guestLastName || ""}`.trim()
                : `${selectedUser.name || ""} ${selectedUser.lastName || ""}`.trim();
            const customerPhone = isGuest
                ? data.deliveryData.guestPhone || ""
                : selectedUser.phone || "";
            const customerEmail = isGuest
                ? data.deliveryData.guestEmail || ""
                : selectedUser.email || "";

            const items = (products || []).map((p) => ({
                productId: p.productId || p.id,
                quantity: Number(p.quantity) || 1,
                price: Number(p.price) || 0,
                productName: p.productName || p.name || "",
                productCategoryId: p.productCategoryId,
                productCategoryName: p.productCategoryName,
                isActive: typeof p.isActive === "boolean" ? p.isActive : true,
                warehouseId: p.warehouseId,
            }));

            const totalPrice = products.reduce(
                (acc, p) => acc + ((+p.price || 0) * (+p.quantity || 1)),
                0
            );

            const userId = isGuest ? undefined : (selectedUser.id || undefined);

            const payload = {
                ...(userId ? {userId} : {}),
                ...(customerName ? {customerName} : {}),
                ...(customerPhone ? {customerPhone} : {}),
                ...(customerEmail ? {customerEmail} : {}),
                ...(deliveryType ? {deliveryType} : {}),
                ...(Object.keys(formattedDeliveryData).length ? {deliveryData: formattedDeliveryData} : {}),
                ...(data.warehouseId ? {warehouseId: data.warehouseId} : {}),
                ...(data.paymentType ? {paymentType: data.paymentType} : {}),
                ...(comment ? {comment} : {}),
                ...(totalPrice ? {totalPrice} : {}),
                ...(items.length ? {items} : {})
            };

            await orderService.updateOrderById(selectedOrderId, payload);

            dispatch(orderActions.changeTrigger());
            toast.success('Замовлення оновлено!');
            handleCloseUpdateOrder();

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
                    <ButtonClose onClick={handleCloseUpdateOrder}/>
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
                            <ButtonCancel onClick={handleCloseUpdateOrder}/>
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

export {OrderUpdateModal};
