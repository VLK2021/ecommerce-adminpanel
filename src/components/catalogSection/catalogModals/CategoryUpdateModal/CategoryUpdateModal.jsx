import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, useWatch } from 'react-hook-form';

import css from './CategoryUpdateModal.module.css';
import { ButtonCancel, ButtonClose, ButtonOk } from '../../../../ui';
import { categoryService, attributeService } from '../../../../services/catalogServaces';
import { categoryActions } from '../../../../store/slices/category.slice';
import { attributeAction } from '../../../../store/slices/attributeSlice';


const CategoryUpdateModal = ({ setIsOpenUpdateCategory, idCategory }) => {
    const dispatch = useDispatch();
    const { attributes } = useSelector(state => state.attribute);

    const {
        control,
        register,
        reset,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm({
        defaultValues: {
            name: '',
            attributeIds: []
        }
    });

    const selectedAttributes = useWatch({
        control,
        name: 'attributeIds'
    }) || [];

    useEffect(() => {
        dispatch(attributeAction.getAllAttributes());

        const loadData = async () => {
            try {
                const category = await categoryService.getCategoryById(idCategory);
                const linkedAttributes = await categoryService.getAttributesForCategory(idCategory);

                reset({
                    name: category.name,
                    attributeIds: linkedAttributes.map(item => item.attribute.id)
                });
            } catch (e) {
                console.error('Помилка завантаження категорії або атрибутів', e);
            }
        };

        if (idCategory) loadData();
    }, [dispatch, idCategory, reset]);

    const toggleCheckbox = (id) => {
        const current = [...selectedAttributes];
        if (current.includes(id)) {
            setValue('attributeIds', current.filter(item => item !== id));
        } else {
            setValue('attributeIds', [...current, id]);
        }
    };

    const onSubmit = async (data) => {
        try {
            await categoryService.updateCategory(idCategory, { name: data.name });

            await attributeService.assignAttributesToCategory({
                categoryId: idCategory,
                attributeIds: data.attributeIds
            });

            dispatch(categoryActions.changeTrigger());
            setIsOpenUpdateCategory(false);
        } catch (e) {
            console.error('Помилка оновлення категорії або атрибутів', e);
        }
    };

    const sortedAttributes = useMemo(() => {
        return [...attributes].sort((a, b) => a.name.localeCompare(b.name));
    }, [attributes]);


    return (
        <div className={css.overlay}>
            <div className={css.modal}>
                <div className={css.header}>
                    <div className={css.title}>Оновлення категорії</div>
                    <ButtonClose onClick={() => setIsOpenUpdateCategory(false)} />
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
                    <div className={css.inputGroup}>
                        <label className={css.label}>Назва категорії</label>
                        <input
                            {...register('name', { required: 'Назва обовʼязкова' })}
                            className={`${css.input} ${errors.name ? css.errorInput : ''}`}
                            placeholder="Наприклад: Телефони"
                        />
                        {errors.name && <p className={css.errorText}>{errors.name.message}</p>}
                    </div>

                    <div className={css.inputGroup}>
                        <label className={css.label}>Атрибути</label>
                        <div className={css.attributesList}>
                            {sortedAttributes.map(attr => (
                                <label key={attr.id} className={css.attrItem}>
                                    <input
                                        type="checkbox"
                                        checked={selectedAttributes.includes(attr.id)}
                                        onChange={() => toggleCheckbox(attr.id)}
                                    />
                                    <span>{attr.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className={css.buttonsBlock}>
                        <ButtonCancel onClick={() => setIsOpenUpdateCategory(false)} />
                        <ButtonOk />
                    </div>
                </form>
            </div>
        </div>
    );
};

export { CategoryUpdateModal };
