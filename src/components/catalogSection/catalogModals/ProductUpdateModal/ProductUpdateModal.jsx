import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import css from './ProductUpdateModal.module.css';
import {
    ButtonCancel,
    ButtonClose,
    ButtonOk,
    CustomSelect
} from "../../../../ui";
import { productActions } from "../../../../store";
import { axiosService, productService } from "../../../../services";
import { categoryService } from "../../../../services/catalogServaces";

const ProductUpdateModal = () => {
    const dispatch = useDispatch();
    const { selectedProductId } = useSelector(state => state.product);
    const { categories } = useSelector(state => state.category);

    const [images, setImages] = useState([]);
    const [initialImages, setInitialImages] = useState([]);
    const [categoryAttributes, setCategoryAttributes] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const {
        handleSubmit,
        register,
        setValue,
        getValues,
        reset,
    } = useForm({
        defaultValues: {
            title: '',
            price: '',
            description: '',
            stok: '',
            isActive: false,
            categoryId: '',
            attributeValues: []
        }
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const product = await productService.getProductById(selectedProductId);

                const imageUrls = product.images.map(img => img.url);
                setImages(imageUrls.map(url => ({ url })));
                setInitialImages(imageUrls);
                setSelectedCategory(product.category.name);

                reset({
                    title: product.name,
                    price: product.price,
                    description: product.description,
                    stok: product.stock,
                    isActive: product.isActive,
                    categoryId: product.category.id,
                });

                const attributes = await categoryService.getAttributesForCategory(product.category.id);
                setCategoryAttributes(attributes);

                const defaultAttributeValues = attributes.map((attr) => {
                    const found = product.attributeValues.find(v => v.attributeId === attr.attribute.id);
                    return {
                        attributeId: attr.attribute.id,
                        value: found?.value || ''
                    }
                });

                reset(prev => ({
                    ...prev,
                    attributeValues: defaultAttributeValues
                }));

            } catch (e) {
                console.error(e);
                toast.error("Не вдалося завантажити дані");
            }
        };

        if (selectedProductId) {
            fetchData();
        }
    }, [selectedProductId, reset]);

    const getPresignedUrl = async (file) => {
        const res = await axiosService.get('/products/presign', {
            params: { filename: file.name, type: file.type }
        });
        return res.data.url;
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
        const allowed = ['image/jpeg', 'image/png', 'image/webp'];
        const valid = files.filter(file => allowed.includes(file.type));

        if (images.length + valid.length > 5) {
            alert('Максимум 5 фото');
            return;
        }

        const uploaded = await Promise.all(valid.map(async (file) => {
            const url = await getPresignedUrl(file);
            const uploadedUrl = await uploadFileToS3(file, url);
            return { url: uploadedUrl, name: file.name, size: file.size };
        }));

        setImages(prev => [...prev, ...uploaded]);
    };

    const handleRemoveImage = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const closeModal = () => {
        dispatch(productActions.closeUpdateProductModal());
    };

    const handleCategoryChange = async (categoryId) => {
        setValue('categoryId', categoryId);
        setSelectedCategory(categoryId);

        try {
            const attributes = await categoryService.getAttributesForCategory(categoryId);
            setCategoryAttributes(attributes);

            const currentValues = getValues();
            const defaultAttributeValues = attributes.map(attr => ({
                attributeId: attr.attribute.id,
                value: ''
            }));

            reset({
                ...currentValues,
                attributeValues: defaultAttributeValues
            });
        } catch (e) {
            console.error(e);
        }
    };

    const onSubmit = async (data) => {
        const currentUrls = images.map(i => i.url);
        const deletedImages = initialImages.filter(url => !currentUrls.includes(url));

        const payload = {
            name: data.title,
            price: data.price,
            description: data.description,
            stock: Number(data.stok),
            isActive: data.isActive,
            categoryId: data.categoryId,
            images: currentUrls,
            deletedImages,
            attributeValues: data.attributeValues || []
        };

        try {
            await productService.updateProduct(selectedProductId, payload);
            dispatch(productActions.changeTrigger());
            closeModal();
            toast.success('Товар оновлено');
        } catch (e) {
            console.error(e);
            toast.error("Помилка при оновленні");
        }
    };

    return (
        <div className={css.overlay}>
            <div className={css.modal}>
                <div className={css.header}>
                    <div className={css.title}>Оновлення товару</div>
                    <ButtonClose onClick={closeModal} />
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
                                        onClick={() => handleRemoveImage(index)}
                                    >✕</button>
                                </div>
                            ))}
                            {images.length < 5 && (
                                <label className={css.uploadBox}>
                                    <span>+ Upload images</span>
                                    <input type="file" multiple onChange={handleImageUpload} hidden />
                                </label>
                            )}
                        </div>
                    </div>

                    <div className={css.blockInfo}>
                        <div className={css.leftBlock}>
                            <div className={css.formGroup}>
                                <label htmlFor="title">Назва товару</label>
                                <input
                                    id="title"
                                    {...register('title', { required: true })}
                                    type="text"
                                    placeholder="Введіть назву"
                                />
                            </div>

                            <div className={css.formGroup}>
                                <label htmlFor="price">Ціна товару</label>
                                <input
                                    id="price"
                                    {...register('price', { required: true })}
                                    type="text"
                                    placeholder="Введіть ціну"
                                />
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
                                    options={categories.map(cat => ({
                                        label: cat.name,
                                        value: cat.id
                                    }))}
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
                                                    value={attr.attribute.id}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={css.buttonsBlock}>
                        <ButtonCancel onClick={closeModal} />
                        <ButtonOk />
                    </div>
                </form>
            </div>
        </div>
    );
};

export { ProductUpdateModal };
