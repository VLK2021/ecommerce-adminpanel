import React, {useEffect, useState, useCallback} from 'react';
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";

import css from './WarehouseAddProductsModal.module.css';
import {ButtonCancel, ButtonClose, ButtonOk, CustomSelect} from "../../../../ui";
import {warehouseActions} from "../../../../store";
import {productService} from "../../../../services";
import {useDebounce} from "../../../../hooks";
import {inventoryService} from "../../../../services/warehouseServices/index.js";


const WarehouseAddProductsModal = () => {
    const dispatch = useDispatch();
    const {warehouses} = useSelector(store => store.warehouse);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedWarehouse, setSelectedWarehouse] = useState('');
    const [productOptions, setProductOptions] = useState([]);
    const [productDropdownOpen, setProductDropdownOpen] = useState(false);
    const [loadingProducts, setLoadingProducts] = useState(false);

    const debouncedSearch = useDebounce(searchTerm, 400);

    const {
        handleSubmit,
        register,
        setValue,
        formState: {errors}
    } = useForm();

    useEffect(() => {
        dispatch(warehouseActions.getAllWarehouses());
    }, [dispatch]);

    useEffect(() => {
        let ignore = false;
        const fetchProducts = async () => {
            if (debouncedSearch && debouncedSearch.length >= 2) {
                setLoadingProducts(true);
                try {
                    const res = await productService.getAllProducts({search: debouncedSearch, limit: 10});
                    if (!ignore) setProductOptions(res.items.map(prod => ({
                        label: prod.name,
                        value: prod.id
                    })));
                } catch {
                    if (!ignore) setProductOptions([]);
                } finally {
                    setLoadingProducts(false);
                }
            } else {
                setProductOptions([]);
            }
        };
        fetchProducts();
        return () => {
            ignore = true;
        };
    }, [debouncedSearch]);


    const closeAddProductsOnWarehouse = useCallback(() => {
        dispatch(warehouseActions.closeProductsAddOnWarehouseModal());
    }, [dispatch]);

    const handleSelectWarehouse = useCallback((value) => {
        setSelectedWarehouse(value);
        setValue('warehouseId', value, { shouldValidate: true });
    }, [setValue]);

    const handleSearchTermChange = useCallback((e) => {
        setSearchTerm(e.target.value);
        setValue('productId', '', {shouldValidate: true});
        setProductDropdownOpen(true);
    }, [setValue]);

    const handleProductInputFocus = useCallback(() => {
        setProductDropdownOpen(true);
    }, []);

    const handleProductSelect = useCallback((option) => {
        setValue('productId', option.value, {shouldValidate: true});
        setSearchTerm(option.label);
        setProductDropdownOpen(false);
    }, [setValue]);

    const onSubmit = useCallback(async (data) => {
        try {
            const formatedDate = {
                warehouseId: data.warehouseId,
                productId: data.productId,
                quantity: Number(data.quantity),
            }
            await inventoryService.create(formatedDate);
            //потрыбно оновлення в слайсы
            toast.success('товар успішно додано на склад!');
            closeAddProductsOnWarehouse();
        } catch (e) {
            console.error(e);
            toast.error("Помилка при створенні");
        }
    }, [closeAddProductsOnWarehouse]);


    return (
        <div className={css.overlay}>
            <div className={css.modal}>
                <div className={css.header}>
                    <div className={css.title}>Додати товар на складу</div>
                    <ButtonClose onClick={closeAddProductsOnWarehouse}/>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
                    <div className={css.inputGroup}>
                        <label className={css.label}>Вибрати склад</label>
                        <CustomSelect
                            value={selectedWarehouse}
                            options={warehouses.map(item => ({ label: item.name, value: item.id }))}
                            placeholder="склад"
                            onChangeCallback={handleSelectWarehouse}
                        />
                        {errors.warehouseId && <p className={css.errorText}>{errors.warehouseId.message}</p>}
                    </div>

                    <div className={css.inputGroup} style={{position: "relative"}}>
                        <label className={css.label}>Вибрати товар</label>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchTermChange}
                            onFocus={handleProductInputFocus}
                            placeholder="Введіть назву товару"
                            className={css.input}
                            autoComplete="off"
                        />
                        {loadingProducts && <div className={css.productLoading}>Пошук...</div>}
                        {productDropdownOpen && productOptions.length > 0 && (
                            <ul className={css.productDropdown}>
                                {productOptions.map(option => (
                                    <li
                                        key={option.value}
                                        onClick={() => handleProductSelect(option)}
                                        className={css.productDropdownItem}
                                    >
                                        {option.label}
                                    </li>
                                ))}
                            </ul>
                        )}
                        {errors.productId && <p className={css.errorText}>{errors.productId.message}</p>}
                    </div>

                    <div className={css.inputGroup}>
                        <label className={css.label}>Кількість</label>
                        <input
                            type="number"
                            {...register('quantity', {required: 'Кількість обовʼязкова'})}
                            className={`${css.input} ${errors.quantity ? css.errorInput : ''}`}
                            placeholder="Наприклад: 100"
                        />
                        {errors.quantity && <p className={css.errorText}>{errors.quantity.message}</p>}
                    </div>

                    <div className={css.buttonsBlock}>
                        <ButtonCancel onClick={closeAddProductsOnWarehouse}/>
                        <ButtonOk/>
                    </div>
                </form>
            </div>
        </div>
    );
};

export {WarehouseAddProductsModal};
