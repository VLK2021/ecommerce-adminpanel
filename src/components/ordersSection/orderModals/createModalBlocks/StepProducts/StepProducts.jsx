import React, { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import css from './StepProducts.module.css';
import { SearchInput } from "../../../../../ui/index.js";
import SingleSearchProduct from "../SingleSearchProduct/SingleSearchProduct.jsx";
import { inventoryService } from "../../../../../services/warehouseServices/index.js";


const StepProducts = () => {
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const { setValue, watch } = useFormContext();
    const selected = watch('products') || [];
    const warehouseId = watch('warehouseId');

    // Додаємо реф для контролю попереднього складу
    const prevWarehouseId = useRef();

    // Очищаємо продукти тільки якщо склад ЗМІНИВСЯ на новий
    useEffect(() => {
        if (
            warehouseId &&
            prevWarehouseId.current &&
            warehouseId !== prevWarehouseId.current
        ) {
            setValue('products', []);
            setSearch('');
            setSearchResults([]);
        }
        prevWarehouseId.current = warehouseId;
    }, [warehouseId, setValue]);

    // Шукаємо тільки по товарах на складі
    useEffect(() => {
        let ignore = false;
        if (!warehouseId || search.length < 2) {
            setSearchResults([]);
            return;
        }
        setLoading(true);

        inventoryService
            .getAllProductsOnWarehouseById(warehouseId, { search, limit: 50 })
            .then(res => {
                if (!ignore) setSearchResults(res.items || []);
            })
            .catch(() => {
                if (!ignore) setSearchResults([]);
            })
            .finally(() => {
                if (!ignore) setLoading(false);
            });
        return () => { ignore = true; };
    }, [search, warehouseId]);

    // Додати товар
    const handleAdd = (product) => {
        if (!selected.some(p => p.id === product.productId)) {
            const newSelected = [
                ...selected,
                {
                    ...product,
                    id: product.productId,
                    name: product.productName,
                    quantity: 1,
                }
            ];
            setValue('products', newSelected, { shouldDirty: true });
        }
    };

    // Змінити кількість
    const handleQuantity = (id, value) => {
        const updated = selected.map(p =>
            p.id === id
                ? { ...p, quantity: Math.max(1, Number(value)) }
                : p
        );
        setValue('products', updated, { shouldDirty: true });
    };

    // Видалити товар
    const handleRemove = (id) => {
        const updated = selected.filter(p => p.id !== id);
        setValue('products', updated, { shouldDirty: true });
    };

    // Загальна сума
    const total = selected.reduce(
        (sum, p) => sum + Number(p.price) * Number(p.quantity),
        0
    );

    return (
        <div className={css.wrap}>
            <div className={css.title}>Вибір товару:</div>

            {!warehouseId && (
                <div className={css.infoBox}>Спочатку оберіть склад!</div>
            )}

            {warehouseId && (
                <>
                    <div className={css.searchBox}>
                        <SearchInput
                            placeholder="Введіть назву або артикул..."
                            value={search}
                            onDebouncedSearch={setSearch}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>

                    {loading && (
                        <div className={css.loader}>Завантаження...</div>
                    )}

                    {searchResults.length > 0 && (
                        <SingleSearchProduct
                            selected={selected}
                            searchResults={searchResults}
                            onAdd={handleAdd}
                        />
                    )}

                    <div className={css.selectedBlock}>
                        <div className={css.selectedTitle}>Додані товари:</div>
                        {selected.length === 0 && (
                            <div className={css.empty}>
                                Ще не додано жодного товару
                            </div>
                        )}
                        <ul className={css.selectedList}>
                            {selected.map(product => (
                                <li className={css.selectedItem} key={product.id}>
                                    <span>
                                        <b>{product.name}</b>
                                    </span>
                                    <input
                                        type="number"
                                        min={1}
                                        value={product.quantity}
                                        onChange={e => handleQuantity(product.id, e.target.value)}
                                    />
                                    <span className={css.priceTag}>
                                        {Number(product.price) * product.quantity}₴
                                    </span>
                                    <button onClick={() => handleRemove(product.id)}>
                                        Видалити
                                    </button>
                                </li>
                            ))}
                        </ul>
                        {selected.length > 0 && (
                            <div className={css.total}>
                                Загальна сума: {total}
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export { StepProducts };
