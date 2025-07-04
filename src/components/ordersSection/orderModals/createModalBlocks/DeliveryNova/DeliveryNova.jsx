import React, {useEffect, useState} from 'react';
import Select from 'react-select';
import {useFormContext} from 'react-hook-form';
import css from './DeliveryNova.module.css';
import {novaPoshtaService} from "../../../../../services/deliveryServices/index.js";

const DeliveryNova = () => {
    const {setValue, watch} = useFormContext();
    const deliveryData = watch('deliveryData') || {};

    const selectedCity = deliveryData.city || null;
    const selectedCityRef = selectedCity?.value || null;
    const selectedWarehouse = deliveryData.warehouse || null;
    const comment = deliveryData.comment || '';

    const [cityOptions, setCityOptions] = useState([]);
    const [warehouseOptions, setWarehouseOptions] = useState([]);
    const [loadingWarehouses, setLoadingWarehouses] = useState(false);

    // Live пошук міст
    const handleCityInputChange = (inputValue) => {
        if (inputValue.length >= 2) {
            novaPoshtaService.getCities(inputValue).then(data => {
                setCityOptions(data.map(city => ({
                    value: city.Ref,
                    label: `${city.Description} (${city.AreaDescription})`,
                    ...city,
                })));
            });
        } else {
            setCityOptions([]);
        }
    };

    // Вибір міста
    const handleCityChange = (option) => {
        setValue('deliveryData', {
            ...deliveryData,
            city: option,
            warehouse: null,
        }, {shouldDirty: true});
    };

    // Підвантаження відділень/поштоматів
    useEffect(() => {
        if (!selectedCityRef) {
            setWarehouseOptions([]);
            setValue('deliveryData', {...deliveryData, warehouse: null}, {shouldDirty: true});
            return;
        }
        setLoadingWarehouses(true);

        novaPoshtaService.getWarehouses(selectedCityRef).then(data => {
            const branches = data.filter(w =>
                (w.TypeOfWarehouse && w.TypeOfWarehouse.toLowerCase().includes("branch")) ||
                (w.Description && w.Description.toLowerCase().includes("відділення"))
            );
            const postomats = data.filter(w =>
                (w.TypeOfWarehouse && w.TypeOfWarehouse.toLowerCase().includes("postomat")) ||
                (w.CategoryOfWarehouse && w.CategoryOfWarehouse.toLowerCase().includes("postomat")) ||
                (w.Description && w.Description.toLowerCase().includes("поштомат"))
            );
            const options = [];
            if (branches.length) {
                options.push({
                    label: 'Відділення',
                    options: branches.map(w => ({
                        value: w.Ref,
                        label: `${w.Description} (${w.ShortAddress})`,
                        ...w,
                    }))
                });
            }
            if (postomats.length) {
                options.push({
                    label: 'Поштомати',
                    options: postomats.map(w => ({
                        value: w.Ref,
                        label: `${w.Description} (${w.ShortAddress})`,
                        ...w,
                    }))
                });
            }
            setWarehouseOptions(options);
        }).finally(() => setLoadingWarehouses(false));
    }, [selectedCityRef]); // only on city change

    // Для value у select шукай серед груп
    const getSelectedWarehouseOption = () => {
        if (!selectedWarehouse) return null;
        for (const group of warehouseOptions) {
            const found = group.options.find(opt => opt.value === selectedWarehouse.value);
            if (found) return found;
        }
        return null;
    };

    const handleWarehouseChange = (option) => {
        setValue('deliveryData', {
            ...deliveryData,
            warehouse: option,
        }, {shouldDirty: true});
    };

    // Коментар
    const handleCommentChange = (e) => {
        setValue('deliveryData', {
            ...deliveryData,
            comment: e.target.value,
        }, {shouldDirty: true});
    };

    return (
        <div className={css.wrap}>
            <div className={css.block}>
                <label className={css.label}>
                    Місто <span className={css.required}>*</span>
                </label>
                <Select
                    className={css.input}
                    placeholder="Почніть вводити місто..."
                    options={cityOptions}
                    onInputChange={handleCityInputChange}
                    onChange={handleCityChange}
                    value={selectedCity}
                    isClearable
                    isSearchable
                    noOptionsMessage={() => 'Міст не знайдено'}
                />
            </div>

            <div className={css.block}>
                <label className={css.label}>
                    Відділення або поштомат <span className={css.required}>*</span>
                </label>
                <Select
                    className={css.input}
                    placeholder={selectedCityRef ? "Оберіть відділення або поштомат" : "Спочатку оберіть місто"}
                    options={warehouseOptions}
                    onChange={handleWarehouseChange}
                    value={getSelectedWarehouseOption()}
                    isDisabled={!selectedCityRef || loadingWarehouses}
                    isClearable
                    isLoading={loadingWarehouses}
                    noOptionsMessage={() => selectedCityRef ? "Немає варіантів" : "Оберіть місто"}
                />
            </div>

            <div className={css.block}>
                <label className={css.label}>Коментар до замовлення</label>
                <textarea
                    className={css.textarea}
                    placeholder="Додайте коментар до доставки (необов'язково)..."
                    value={comment}
                    onChange={handleCommentChange}
                    rows={3}
                    maxLength={512}
                />
            </div>
        </div>
    );
};

export {DeliveryNova};
