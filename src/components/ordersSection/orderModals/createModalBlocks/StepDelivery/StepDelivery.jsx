import React from 'react';
import {useFormContext} from "react-hook-form";

import css from './StepDelivery.module.css';
import {CustomSelect} from "../../../../../ui/index.js";
import {stepsDeliveryItemsRender} from "../../../../../helpers/index.js";


const deliveryOptions = [
    {value: "nova", label: "Нова Пошта"},
    {value: "courier", label: "Кур'єр"},
    {value: "ukr", label: "Укрпошта"},
    {value: "meest", label: "Міст-експрес"},
    {value: "pickup", label: "Самовивіз"},
];


const StepDelivery = () => {
    const {watch, setValue} = useFormContext();
    const deliveryType = watch('deliveryType') || '';


    return (
        <div className={css.wrap}>
            <div className={css.title}>Дані для доставки:</div>

            <div className={css.blockTypeDelivery}>
                <CustomSelect
                    name="deliveryType"
                    options={deliveryOptions}
                    placeholder="Оберіть спосіб доставки"
                    value={deliveryType}
                    onChangeCallback={val => setValue('deliveryType', val, {shouldDirty: true})}
                />
            </div>

            <div className={css.blockInfo}>
                {stepsDeliveryItemsRender(deliveryType)}
            </div>
        </div>
    );
};

export {StepDelivery};