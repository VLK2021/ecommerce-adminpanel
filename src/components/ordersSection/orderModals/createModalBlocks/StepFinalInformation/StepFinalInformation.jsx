import React, { useState } from "react";
import { useFormContext } from "react-hook-form";

import css from "./StepFinalInformation.module.css";
import {ButtonAll} from "../../../../../ui/index.js";
import {useDispatch} from "react-redux";
import {orderActions} from "../../../../../store/index.js";


const paymentTypeMap = {
    cod: "Готівка при отриманні",
    card_online: "Банківська карта онлайн",
    card_on_delivery: "Карткою при отриманні",
    invoice: "Безготівковий рахунок",
    apple_pay: "Apple Pay / Google Pay",
};
const deliveryMap = {
    nova: "Нова Пошта",
    courier: "Кур'єр",
    ukr: "Укрпошта",
    meest: "Meest",
    pickup: "Самовивіз",
};


export const StepFinalInformation = () => {
    const { watch, setValue } = useFormContext();
    const dispatch = useDispatch();

    const isGuest = watch("isGuest");
    const products = watch("products") || [];
    const paymentType = watch("paymentType");
    const deliveryType = watch("deliveryType");
    const deliveryData = watch("deliveryData") || {};
    const selectedUser = watch("selectedUser") || {};

    // Локальні стани для інпутів
    const [editName, setEditName] = useState(false);
    const [editLastName, setEditLastName] = useState(false);
    const [editPhone, setEditPhone] = useState(false);

    const [nameDraft, setNameDraft] = useState(
        isGuest === "true" ? deliveryData.guestName || "" : selectedUser.name || ""
    );
    const [lastNameDraft, setLastNameDraft] = useState(
        isGuest === "true" ? deliveryData.guestLastName || "" : selectedUser.lastName || ""
    );
    const [phoneDraft, setPhoneDraft] = useState(
        isGuest === "true" ? deliveryData.guestPhone || "" : selectedUser.phone || ""
    );

    const handleConfirm = (field) => {
        if (field === "name") {
            if (isGuest === "true") setValue("deliveryData.guestName", nameDraft, { shouldDirty: true });
            else setValue("selectedUser.name", nameDraft, { shouldDirty: true });
            setEditName(false);
        }
        if (field === "lastName") {
            if (isGuest === "true") setValue("deliveryData.guestLastName", lastNameDraft, { shouldDirty: true });
            else setValue("selectedUser.lastName", lastNameDraft, { shouldDirty: true });
            setEditLastName(false);
        }
        if (field === "phone") {
            if (isGuest === "true") setValue("deliveryData.guestPhone", phoneDraft, { shouldDirty: true });
            else setValue("selectedUser.phone", phoneDraft, { shouldDirty: true });
            setEditPhone(false);
        }
    };

    const nameValue = isGuest === "true" ? deliveryData.guestName : selectedUser.name;
    const lastNameValue = isGuest === "true" ? deliveryData.guestLastName : selectedUser.lastName;
    const phoneValue = isGuest === "true" ? deliveryData.guestPhone : selectedUser.phone;
    const emailValue = isGuest === "true" ? deliveryData.guestEmail : selectedUser.email || "—";
    const { city, warehouse, comment, region, street, house, apartment, entrance, floor } = deliveryData;

    const total = deliveryData.totalPrice || products.reduce((acc, p) => acc + ((+p.price || 0) * (+p.quantity || 1)), 0);

    const goToStep = (current) => {
        dispatch(orderActions.changeActiveStep(current))
    }


    return (
        <div className={css.page}>
            <h2 className={css.title}>Перевірте Ваше замовлення</h2>

            <div className={css.block}>
                <div className={css.blockTop}>
                    <div className={css.blockTitle}>Клієнт</div>
                    <ButtonAll titleButton="Редагувати" onClick={() => goToStep(1)} />
                </div>
                <div className={css.field}>
                    <span className={css.sub}>Ім’я:</span>
                    {editName || !nameValue ? (
                        <input
                            className={css.input}
                            value={nameDraft}
                            autoFocus
                            onChange={e => setNameDraft(e.target.value)}
                            onBlur={() => handleConfirm("name")}
                            onKeyDown={e => { if (e.key === "Enter") handleConfirm("name") }}
                            placeholder="Введіть ім'я"
                        />
                    ) : (
                        <>
                            <b>{nameValue}</b>
                            <button
                                className={css.editBtn}
                                onClick={e => { e.preventDefault(); setEditName(true); setNameDraft(nameValue) }}
                                type="button"
                                title="Редагувати"
                            >✏️</button>
                        </>
                    )}
                </div>
                <div className={css.field}>
                    <span className={css.sub}>Прізвище:</span>
                    {editLastName || !lastNameValue ? (
                        <input
                            className={css.input}
                            value={lastNameDraft}
                            onChange={e => setLastNameDraft(e.target.value)}
                            onBlur={() => handleConfirm("lastName")}
                            onKeyDown={e => { if (e.key === "Enter") handleConfirm("lastName") }}
                            placeholder="Введіть прізвище"
                        />
                    ) : (
                        <>
                            <b>{lastNameValue}</b>
                            <button
                                className={css.editBtn}
                                onClick={e => { e.preventDefault(); setEditLastName(true); setLastNameDraft(lastNameValue) }}
                                type="button"
                                title="Редагувати"
                            >✏️</button>
                        </>
                    )}
                </div>
                <div className={css.field}>
                    <span className={css.sub}>Телефон:</span>
                    {editPhone || !phoneValue ? (
                        <input
                            className={css.input}
                            value={phoneDraft}
                            onChange={e => setPhoneDraft(e.target.value)}
                            onBlur={() => handleConfirm("phone")}
                            onKeyDown={e => { if (e.key === "Enter") handleConfirm("phone") }}
                            placeholder="+380..."
                        />
                    ) : (
                        <>
                            <b>{phoneValue}</b>
                            <button
                                className={css.editBtn}
                                onClick={e => { e.preventDefault(); setEditPhone(true); setPhoneDraft(phoneValue) }}
                                type="button"
                                title="Редагувати"
                            >✏️</button>
                        </>
                    )}
                </div>
                <div className={css.field}>
                    <span className={css.sub}>Email:</span>{" "}
                    <b>{emailValue}</b>
                </div>
            </div>

            <div className={css.block}>
                <div className={css.blockTop}>
                    <div className={css.blockTitle}>Доставка</div>
                    <ButtonAll titleButton="Редагувати" onClick={() => goToStep(3)} />
                </div>
                <div className={css.field}>
                    <span className={css.sub}>Спосіб:</span> <b>{deliveryMap[deliveryType] || "—"}</b>
                </div>
                {deliveryType === "nova" && (
                    <>
                        <div className={css.field}><span className={css.sub}>Місто:</span> {city?.label || city?.Description || "—"}</div>
                        <div className={css.field}><span className={css.sub}>Відділення/Поштомат:</span> {warehouse?.label || warehouse?.Description || "—"}</div>
                        {comment && <div className={css.field}><span className={css.sub}>Коментар:</span> {comment}</div>}
                    </>
                )}
                {deliveryType === "courier" && (
                    <>
                        <div className={css.field}><span className={css.sub}>Область:</span> {region || "—"}</div>
                        <div className={css.field}><span className={css.sub}>Місто/Село:</span> {city?.label || city || "—"}</div>
                        <div className={css.field}><span className={css.sub}>Вулиця:</span> {street || "—"}</div>
                        <div className={css.field}><span className={css.sub}>Будинок:</span> {house || "—"}</div>
                        {apartment && <div className={css.field}><span className={css.sub}>Квартира:</span> {apartment}</div>}
                        {entrance && <div className={css.field}><span className={css.sub}>Підʼїзд:</span> {entrance}</div>}
                        {floor && <div className={css.field}><span className={css.sub}>Поверх:</span> {floor}</div>}
                        {comment && <div className={css.field}><span className={css.sub}>Коментар:</span> {comment}</div>}
                    </>
                )}
            </div>

            <div className={css.block}>
                <div className={css.blockTop}>
                    <div className={css.blockTitle}>Оплата</div>
                    <ButtonAll titleButton="Редагувати" onClick={() => goToStep(4)} />
                </div>
                <div>
                    {paymentTypeMap[paymentType]
                        ? paymentTypeMap[paymentType]
                        : <span className={css.warn}>Не обрано спосіб оплати</span>
                    }
                </div>
            </div>

            <div className={css.block}>
                <div className={css.blockTop}>
                    <div className={css.blockTitle}>Товари</div>
                    <ButtonAll titleButton="Редагувати" onClick={() => goToStep(2)} />
                </div>

                <div className={css.productsList}>
                    {products.length === 0
                        ? <div className={css.warn}>Товари відсутні</div>
                        : products.map((item, idx) => (
                            <div key={item.productId || item.id || idx} className={css.productItem}>
                                <span className={css.productName}><b>{item.productName}</b></span>
                                <span>×{item.quantity}</span>
                                {item.price &&
                                    <span className={css.price}> {item.price} грн</span>
                                }
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className={css.totalBlock}>
                <b>Всього до оплати:</b>
                <span className={css.totalAmount}>{total ? `${total} грн` : "—"}</span>
            </div>
        </div>
    );
};
