import React from 'react';
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useDispatch } from "react-redux";
import {toast} from "react-toastify";

import css from './WarehouseCreateModal.module.css';
import { ButtonCancel, ButtonClose, ButtonOk } from "../../../../ui";
import { warehouseActions } from "../../../../store";
import {warehouseService} from "../../../../services/warehouseServices/index.js";
import {warehouseCreateSchema} from "../../../../validators/index.js";


const WarehouseCreateModal = () => {
    const dispatch = useDispatch();
    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm({
        resolver: joiResolver(warehouseCreateSchema),
        mode: "onTouched"
    });

    const closeCreateWarehouse = () => {
        dispatch(warehouseActions.closeCreateWarehouseModal());
    };

    const onSubmit = async (data) => {
        try {
            await warehouseService.createWarehouse(data);
            dispatch(warehouseActions.changeTrigger());

            toast.success('Склад успішно створений!');
            dispatch(warehouseActions.closeCreateWarehouseModal());
        }catch (err) {
            console.error(err);
            toast.error('Помилка створення');
        }
    };

    return (
        <div className={css.overlay}>
            <div className={css.modal}>
                <div className={css.header}>
                    <div className={css.title}>Створення складу</div>
                    <ButtonClose onClick={closeCreateWarehouse} />
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
                    <div className={css.row}>
                        <input
                            type="text"
                            placeholder="Назва складу"
                            className={css.input}
                            {...register("name")}
                        />
                        {errors.name && <span className={css.error}>{errors.name.message}</span>}
                    </div>

                    <div className={css.row}>
                        <input
                            type="text"
                            placeholder="Адреса"
                            className={css.input}
                            {...register("address")}
                        />
                        {errors.address && <span className={css.error}>{errors.address.message}</span>}
                    </div>

                    <div className={css.row}>
                        <input
                            type="text"
                            placeholder="Місто"
                            className={css.input}
                            {...register("city")}
                        />
                        {errors.city && <span className={css.error}>{errors.city.message}</span>}
                    </div>

                    <div className={css.row}>
                        <input
                            type="text"
                            placeholder="Телефон"
                            className={css.input}
                            {...register("phone")}
                        />
                        {errors.phone && <span className={css.error}>{errors.phone.message}</span>}
                    </div>

                    <div className={css.row}>
                        <label className={css.switchLabel}>
                            <span>Активний</span>
                            <input type="checkbox" {...register("isActive")} className={css.toggle} />
                            <span className={css.slider}></span>
                        </label>
                    </div>

                    <div className={css.row}>
                        <textarea
                            placeholder="Опис"
                            className={css.textarea}
                            {...register("description")}
                        />
                        {errors.description && <span className={css.error}>{errors.description.message}</span>}
                    </div>

                    <div className={css.buttonsBlock}>
                        <ButtonCancel onClick={closeCreateWarehouse} />
                        <ButtonOk />
                    </div>
                </form>
            </div>
        </div>
    );
};

export { WarehouseCreateModal };
