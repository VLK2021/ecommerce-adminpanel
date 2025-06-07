import React from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import css from './AttributeCreateModal.module.css';
import {
    ButtonCancel,
    ButtonClose,
    ButtonOk,
    CustomSelect
} from '../../../../ui/index.js';
import { attributeService } from '../../../../services/catalogServaces/index.js';
import { attributeAction } from '../../../../store/slices/attributeSlice.jsx';
import {attributeValidator} from "../../../../validators/index.js";


const typeAttributes = [
    { value: 'STRING', label: 'string' },
    { value: 'NUMBER', label: 'number' },
];

const AttributeCreateModal = ({ setIsOpenCreateAttribute }) => {
    const dispatch = useDispatch();

    const {
        handleSubmit,
        register,
        control,
        formState: { errors }
    } = useForm({
        resolver: joiResolver(attributeValidator),
    });

    const onSubmit = async (data) => {
        try {
            await attributeService.createAttribute(data);
            dispatch(attributeAction.changeTrigger());

            toast.success('Атрибут успішно створений!');
            setIsOpenCreateAttribute(false);
        } catch (error) {
            console.error(error);
            toast.error('Помилка створення');
        }
    };

    return (
        <div className={css.overlay}>
            <div className={css.modal}>
                <div className={css.header}>
                    <div className={css.title}>Створення атрибута</div>
                    <ButtonClose onClick={() => setIsOpenCreateAttribute(false)} />
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
                    <div className={css.inputGroup}>
                        <label htmlFor="name">Назва</label>
                        <input
                            {...register('name')}
                            placeholder="Наприклад: Розмір"
                            id="name"
                            className={`${css.input} ${errors.name ? css.errorInput : ''}`}
                        />
                        {errors.name && (
                            <p className={css.errorText}>{errors.name.message}</p>
                        )}
                    </div>

                    <div className={css.inputGroup}>
                        <label htmlFor="type">Тип</label>
                        <Controller
                            name="type"
                            control={control}
                            render={({ field }) => (
                                <CustomSelect
                                    name="type"
                                    value={field.value}
                                    onChangeCallback={field.onChange}
                                    options={typeAttributes}
                                    placeholder="Вибрати тип"
                                />
                            )}
                        />
                        {errors.type && (
                            <p className={css.errorText}>{errors.type.message}</p>
                        )}
                    </div>

                    <div className={css.buttonsBlock}>
                        <ButtonCancel
                            onClick={() => setIsOpenCreateAttribute(false)}
                        />
                        <ButtonOk />
                    </div>
                </form>
            </div>
        </div>
    );
};

export { AttributeCreateModal };
