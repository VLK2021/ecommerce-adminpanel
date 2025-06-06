import React from 'react';
import { useForm } from 'react-hook-form';
import {toast} from "react-toastify";

import css from './CategoryCreateModal.module.css';
import { ButtonCancel, ButtonClose, ButtonOk } from '../../../../ui/index.js';
import {categoryService} from "../../../../services/catalogServaces/index.js";
import {useDispatch} from "react-redux";
import {categoryActions} from "../../../../store/slices/category.slice.jsx";


const CategoryCreateModal = ({ setIsOpenCreateCategory }) => {
    const dispatch = useDispatch();

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            await categoryService.createCategory(data);
            dispatch(categoryActions.changeTrigger());
            toast.success('категорія успішно створена!');
            setIsOpenCreateCategory(false);
        }catch (error) {
            console.error(error);
            toast.error('Помилка створення');
        }
    };


    return (
        <div className={css.overlay}>
            <div className={css.modal}>
                <div className={css.header}>
                    <div className={css.title}>Створення категорії</div>
                    <ButtonClose onClick={() => setIsOpenCreateCategory(false)} />
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
                    <div className={css.inputGroup}>
                        <label htmlFor="name" className={css.label}>Назва категорії</label>
                        <input
                            id="name"
                            {...register('name', { required: 'Назва обовʼязкова' })}
                            placeholder="Наприклад: Електроніка"
                            className={`${css.input} ${errors.name ? css.errorInput : ''}`}
                        />
                        {errors.name && <p className={css.errorText}>{errors.name.message}</p>}
                    </div>

                    <div className={css.buttonsBlock}>
                        <ButtonCancel onClick={() => setIsOpenCreateCategory(false)} />
                        <ButtonOk />
                    </div>
                </form>
            </div>
        </div>
    );
};

export { CategoryCreateModal };
