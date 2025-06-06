import React, {useEffect} from 'react';
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";

import css from "../CategoryCreateModal/CategoryCreateModal.module.css";
import {ButtonCancel, ButtonClose, ButtonOk} from "../../../../ui/index.js";
import {categoryService} from "../../../../services/catalogServaces/index.js";
import {categoryActions} from "../../../../store/slices/category.slice.jsx";


const CategoryUpdateModal = ({setIsOpenUpdateCategory, idCategory}) => {
    const dispatch = useDispatch();

    const {
        handleSubmit,
        setValue,
        reset,
        register,
        formState: {errors}
    } = useForm();


    useEffect(() => {
        const fetchCategoryById = async () => {
            try {
                const response = await categoryService.getCategoryById(idCategory);
                setValue('name', response.name);
            } catch (err) {
                console.error('Помилка при завантаженні категорії', err);
            }
        };

        if (idCategory) fetchCategoryById();
    }, [idCategory, setValue]);


    const onSubmit = async (data) => {
        try {
            await categoryService.updateCategory(idCategory, data);
            dispatch(categoryActions.changeTrigger());

            setIsOpenUpdateCategory(false);
            reset();
        } catch (err) {
            console.error('Помилка при оновленні категорії', err);
        }
    };


    return (
        <div className={css.overlay}>
            <div className={css.modal}>
                <div className={css.header}>
                    <div className={css.title}>Оновлення категорії</div>
                    <ButtonClose onClick={() => setIsOpenUpdateCategory(false)}/>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
                    <div className={css.inputGroup}>
                        <label htmlFor="name" className={css.label}>Назва категорії</label>
                        <input
                            id="name"
                            {...register('name', {required: 'Назва обовʼязкова'})}
                            placeholder="Наприклад: Електроніка"
                            className={`${css.input} ${errors.name ? css.errorInput : ''}`}
                        />
                        {errors.name && <p className={css.errorText}>{errors.name.message}</p>}
                    </div>

                    <div className={css.buttonsBlock}>
                        <ButtonCancel onClick={() => setIsOpenUpdateCategory(false)}/>
                        <ButtonOk/>
                    </div>
                </form>
            </div>
        </div>
    );
};

export {CategoryUpdateModal};