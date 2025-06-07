import React, {useEffect, useMemo} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {toast} from "react-toastify";

import css from './AssignAttributesToCategoryModal.module.css';
import {ButtonCancel, ButtonClose, ButtonOk, CustomSelect} from "../../../../ui/index.js";
import {attributeAction} from "../../../../store/slices/attributeSlice.jsx";
import {attributeService} from "../../../../services/catalogServaces/index.js";


const AssignAttributesToCategoryModal = ({setIsOpenAssignAttributes}) => {
    const dispatch = useDispatch();
    const {categories} = useSelector(store => store.category);
    const {attributes} = useSelector(store => store.attribute);

    const {
        handleSubmit,
        control,
        watch,
        setValue,
        register,
        formState: {errors},
    } = useForm({
        defaultValues: {
            categoryId: '',
            search: '',
            attributeIds: [],
        },
    });

    useEffect(() => {
        dispatch(attributeAction.getAllAttributes());
    }, [dispatch])


    const searchValue = watch('search');
    const filteredAttributes = useMemo(() => {
        if (!searchValue) return attributes;
        return attributes.filter((attr) =>
            attr.name.toLowerCase().includes(searchValue.toLowerCase())
        );
    }, [searchValue, attributes]);


    const onSubmit = async (data) => {
        try {
            const formatedData = {
                categoryId: data.categoryId,
                attributeIds: data.attributeIds,
            };
            await attributeService.assignAttributesToCategory(formatedData);

            toast.success('Атрибути успішно додані!');
            setIsOpenAssignAttributes(false);
        }catch (error) {
            console.error(error);
            toast.error('Помилка додавання!');
        }
    };

    const handleCheckbox = (id, current) => {
        const updated = current.includes(id)
            ? current.filter((item) => item !== id)
            : [...current, id];
        setValue('attributeIds', updated);
    };

    const selectedIds = watch('attributeIds');


    return (
        <div className={css.overlay}>
            <div className={css.modal}>
                <div className={css.header}>
                    <div className={css.title}>Привʼязка атрибутів до категорії</div>
                    <ButtonClose onClick={() => setIsOpenAssignAttributes(false)}/>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
                    <div className={css.inputGroup}>
                        <Controller
                            name="categoryId"
                            control={control}
                            rules={{required: 'Оберіть категорію'}}
                            render={({field}) => (
                                <CustomSelect
                                    name="categoryId"
                                    value={field.value}
                                    onChangeCallback={field.onChange}
                                    options={categories.map((cat) => ({
                                        value: cat.id,
                                        label: cat.name,
                                    }))}
                                    placeholder="Оберіть категорію"
                                />
                            )}
                        />
                        {errors.categoryId && (
                            <p className={css.errorText}>{errors.categoryId.message}</p>
                        )}
                    </div>

                    <div className={css.inputGroup}>
                        <input
                            {...register('search')}
                            placeholder="Пошук атрибутів..."
                            className={css.input}
                        />
                    </div>

                    <div className={css.attributesList}>
                        {filteredAttributes.length > 0 ? (
                            filteredAttributes.map((attr) => (
                                <label key={attr.id} className={css.attrItem}>
                                    <input
                                        type="checkbox"
                                        checked={selectedIds.includes(attr.id)}
                                        onChange={() =>
                                            handleCheckbox(attr.id, selectedIds || [])
                                        }
                                    />
                                    <span>{attr.name}</span>
                                </label>
                            ))
                        ) : (
                            <p className={css.empty}>Нічого не знайдено</p>
                        )}
                    </div>

                    <div className={css.buttonsBlock}>
                        <ButtonCancel onClick={() => setIsOpenAssignAttributes(false)}/>
                        <ButtonOk/>
                    </div>
                </form>
            </div>
        </div>
    );
};

export {AssignAttributesToCategoryModal};
