import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";

import css from './WarehouseUpdateModal.module.css';
import {ButtonCancel, ButtonClose, ButtonOk} from "../../../../ui/index.js";
import {warehouseActions} from "../../../../store/index.js";
import {warehouseService} from "../../../../services/warehouseServices/index.js";


const WarehouseUpdateModal = () => {
    const dispatch = useDispatch();
    const {selectedWarehouseId} = useSelector(store => store.warehouse);

    const {
        handleSubmit,
        register,
        reset,
        formState: {errors},
    } = useForm({
        defaultValues: {
            name: '',
            address: '',
            city: '',
            phone: '',
            description: '',
            isActive: false,
        }
    });

    const closeUpdateWarehouse = () => {
        dispatch(warehouseActions.closeUpdateWarehouseModal());
    }

    useEffect(() => {
        const fetchWarehouseById = async () => {
            try {
                const warehouse = await warehouseService.getWarehouseById(selectedWarehouseId);

                reset({
                    name: warehouse.name,
                    address: warehouse.address,
                    city: warehouse.city,
                    phone: warehouse.phone,
                    description: warehouse.description,
                    isActive: warehouse.isActive,
                });


            } catch (e) {
                console.error(e);
                toast.error("Не вдалося завантажити дані");
            }
        }
        fetchWarehouseById();
    }, [reset, selectedWarehouseId]);

    const onSubmit = async (data) => {
        try {
            const payload = {
                name: data.name,
                address: data.address,
                city: data.city,
                phone: data.phone,
                description: data.description,
                isActive: data.isActive,
            };

            await warehouseService.updateWarehouse(selectedWarehouseId, payload);
            dispatch(warehouseActions.changeTrigger());
            closeUpdateWarehouse();
            toast.success('Склад оновлено');
        } catch (e) {
            console.error(e);
            toast.error("Помилка при оновленні");
        }
    };


    return (
        <div className={css.overlay}>
            <div className={css.modal}>
                <div className={css.header}>
                    <div className={css.title}>Оновлення складу</div>
                    <ButtonClose onClick={closeUpdateWarehouse}/>
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
                            <input type="checkbox" {...register("isActive")} className={css.toggle}/>
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
                        <ButtonCancel onClick={closeUpdateWarehouse}/>
                        <ButtonOk/>
                    </div>
                </form>
            </div>
        </div>
    );
};

export {WarehouseUpdateModal};