import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import css from './ProductCreateModal.module.css';
import { ButtonCancel, ButtonClose, ButtonOk, CustomSelect } from "../../../../ui";
import { productActions } from "../../../../store";
import { categoryActions } from "../../../../store/slices/category.slice.jsx";
import { categoryService } from "../../../../services/catalogServaces";
import { axiosService, productService } from "../../../../services";

const ProductCreateModal = () => {
    const dispatch = useDispatch();
    const { categories } = useSelector(store => store.category);

    const [images, setImages] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categoryAttributes, setCategoryAttributes] = useState([]);

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        dispatch(categoryActions.getAllCategories());
    }, [dispatch]);

    const getPresignedUrl = async (file) => {
        const response = await axiosService.get('/products/presign', {
            params: {
                filename: file.name,
                type: file.type
            }
        });
        return response.data.url;
    };

    const uploadFileToS3 = async (file, url) => {
        await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': file.type },
            body: file,
        });
        return url.split('?')[0];
    };

    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files);
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

        const validFiles = files.filter(file =>
            file.type.startsWith('image/') && allowedTypes.includes(file.type)
        );

        const existingKeys = new Set(images.map(img => img.name + img.size));
        const uniqueFiles = [];
        const duplicateFiles = [];

        validFiles.forEach(file => {
            const key = file.name + file.size;
            if (!existingKeys.has(key)) {
                uniqueFiles.push(file);
            } else {
                duplicateFiles.push(file.name);
            }
        });

        if (duplicateFiles.length > 0) {
            alert(`Фото вже додано: ${duplicateFiles.join(', ')}`);
        }

        if (images.length + uniqueFiles.length > 5) {
            alert('Максимум 5 фото можна завантажити.');
            return;
        }

        try {
            const uploaded = await Promise.all(
                uniqueFiles.map(async (file) => {
                    const url = await getPresignedUrl(file);
                    const s3Url = await uploadFileToS3(file, url);
                    return { name: file.name, size: file.size, url: s3Url };
                })
            );

            setImages(prev => [...prev, ...uploaded]);
        } catch (err) {
            console.error('Upload error:', err);
        }
    };

    const handleCategoryChange = async (categoryId) => {
        setSelectedCategory(categoryId);
        try {
            const response = await categoryService.getAttributesForCategory(categoryId);
            setCategoryAttributes(response);
        } catch (e) {
            console.error('Помилка при завантаженні атрибутів', e);
        }
    };

    const closeCreateProduct = () => {
        dispatch(productActions.closeCreateProductModal());
    };

    const onSubmit = async (data) => {
        const payload = {
            name: data.title, // 🔥 тут змінюємо title → name
            price: data.price?.toString(),
            description: data.description,
            stock: data.stok ? parseInt(data.stok, 10) : undefined,
            isActive: data.isActive,
            categoryId: selectedCategory,
            images: images.map(img => img.url),
            attributeValues: categoryAttributes.map((attr, index) => ({
                attributeId: attr.attribute.id,
                value: data.attributeValues?.[index]?.value || '',
            })),
        };

        try {
            await productService.createProduct(payload);
            dispatch(productActions.changeTrigger());
        } catch (err) {
            console.error('❌ Помилка при створенні продукту:', err);
        }
    };


    return (
        <div className={css.overlay}>
            <div className={css.modal}>
                <div className={css.header}>
                    <div className={css.title}>Створення товару</div>
                    <ButtonClose onClick={closeCreateProduct} />
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
                    <div className={css.blockPictures}>
                        <div className={css.imagesContainer}>
                            {images.map((img, index) => (
                                <div key={index} className={css.imageBox}>
                                    <img src={img.url} alt="preview" />
                                    <button
                                        type="button"
                                        className={css.removeButton}
                                        onClick={() =>
                                            setImages(prev => prev.filter((_, i) => i !== index))
                                        }
                                    >✕</button>
                                </div>
                            ))}

                            <label className={css.uploadBox}>
                                <span>+ Upload images</span>
                                <input type="file" multiple onChange={handleImageUpload} hidden />
                            </label>
                        </div>
                    </div>

                    <div className={css.blockInfo}>
                        <div className={css.leftBlock}>
                            <div className={css.formGroup}>
                                <label htmlFor="title">Назва товару</label>
                                <input
                                    id="title"
                                    {...register('title', { required: 'Це поле обовʼязкове' })}
                                    type="text"
                                    placeholder="Введіть назву"
                                />
                                {errors.title && <span className={css.errorText}>{errors.title.message}</span>}
                            </div>

                            <div className={css.formGroup}>
                                <label htmlFor="price">Ціна товару</label>
                                <input
                                    id="price"
                                    {...register('price', { required: 'Це поле обовʼязкове' })}
                                    type="text"
                                    placeholder="Введіть ціну"
                                />
                                {errors.price && <span className={css.errorText}>{errors.price.message}</span>}
                            </div>

                            <div className={css.formGroup}>
                                <label htmlFor="description">Опис товару</label>
                                <textarea
                                    id="description"
                                    {...register('description')}
                                    placeholder="Короткий опис товару"
                                    rows={3}
                                />
                            </div>

                            <div className={css.formGroup}>
                                <label htmlFor="stok">Кількість товару на складі</label>
                                <input
                                    id="stok"
                                    {...register('stok')}
                                    type="number"
                                    placeholder="Введіть кількість"
                                />
                                {errors.stok && <span className={css.errorText}>{errors.stok.message}</span>}
                            </div>
                        </div>

                        <div className={css.rightBlock}>
                            <div className={css.formGroup}>
                                <label htmlFor="isActive" className={css.label}>Статус товару</label>
                                <label className={css.toggleWrapper}>
                                    <input
                                        type="checkbox"
                                        id="isActive"
                                        {...register('isActive')}
                                        className={css.toggleInput}
                                    />
                                    <span className={css.toggleSlider}></span>
                                </label>
                            </div>

                            <div className={css.formGroup}>
                                <label htmlFor="category">Категорія товару</label>
                                <CustomSelect
                                    value={selectedCategory}
                                    onChangeCallback={handleCategoryChange}
                                    options={categories.map(cat => ({ label: cat.name, value: cat.id }))}
                                    placeholder="Оберіть категорію"
                                />
                            </div>

                            {categoryAttributes.length > 0 && (
                                <div className={css.formGroup}>
                                    <label className={css.label}>Атрибути категорії</label>
                                    <div className={css.attributesScroll}>
                                        {categoryAttributes.map((attr, index) => (
                                            <div key={attr.id} className={css.attributeItem}>
                                                <label className={css.attributeName}>{attr.attribute.name}</label>
                                                <input
                                                    type="text"
                                                    {...register(`attributeValues.${index}.value`)}
                                                    placeholder="Введіть значення"
                                                    className={css.attributeInput}
                                                />
                                                <input
                                                    type="hidden"
                                                    {...register(`attributeValues.${index}.attributeId`)}
                                                    value={attr.id}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={css.buttonsBlock}>
                        <ButtonCancel onClick={closeCreateProduct} />
                        <ButtonOk />
                    </div>
                </form>
            </div>
        </div>
    );
};

export { ProductCreateModal };
