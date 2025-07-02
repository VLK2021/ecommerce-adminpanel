import React, {useEffect, useState} from 'react';
import {useFormContext} from 'react-hook-form';
import {useDispatch} from 'react-redux';

import {productActions} from '../../../../../store';
import css from './StepProducts.module.css';
import {SearchInput} from "../../../../../ui/index.js";
import SingleSearchProduct from "../SingleSearchProduct/SingleSearchProduct.jsx";


const StepProducts = () => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const {setValue, watch} = useFormContext();
    const selected = watch('products') || [];

    useEffect(() => {
        if (search.length >= 2) {
            dispatch(productActions.getAllProducts({search, limit: 50}))
                .then(res => setSearchResults(res.payload?.items || []));
        } else {
            setSearchResults([]);
        }
    }, [search, dispatch]);

    const handleAdd = (product) => {
        if (!selected.some(p => p.id === product.id)) {
            const newSelected = [...selected, {...product, quantity: 1}];
            setValue('products', newSelected, {shouldDirty: true});
        }
    };

    const handleQuantity = (id, value) => {
        const updated = selected.map(p => p.id === id ? {...p, quantity: Math.max(1, Number(value))} : p);
        setValue('products', updated, {shouldDirty: true});
    };

    const handleRemove = (id) => {
        const updated = selected.filter(p => p.id !== id);
        setValue('products', updated, {shouldDirty: true});
    };

    const total = selected.reduce((sum, p) => sum + Number(p.price) * Number(p.quantity), 0);


    return (
        <div className={css.wrap}>
            <div className={css.title}>Вибір товару:</div>
            <div className={css.searchBox}>
                <SearchInput
                    placeholder="Введіть назву або артикул..."
                    value={search}
                    onDebouncedSearch={setSearch}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>

            {searchResults.length > 0 && <SingleSearchProduct selected={selected}
                                                              searchResults={searchResults}
                                                              onAdd={handleAdd}
            />}

            <div className={css.selectedBlock}>
                <div className={css.selectedTitle}>Додані товари:</div>
                {selected.length === 0 && (
                    <div style={{color: '#aaa', padding: 12}}>Ще не додано жодного товару</div>
                )}
                <ul className={css.selectedList}>
                    {selected.map(product => (
                        <li className={css.selectedItem} key={product.id}>
                            <span><b>{product.name}</b></span>
                            <input
                                type="number"
                                min={1}
                                value={product.quantity}
                                onChange={e => handleQuantity(product.id, e.target.value)}
                            />
                            <span className={css.priceTag}>
                                {Number(product.price) * product.quantity}₴
                            </span>
                            <button onClick={() => handleRemove(product.id)}>Видалити</button>
                        </li>
                    ))}
                </ul>

                {selected.length > 0 && (
                    <div className={css.total}>
                        Загальна сума: {total}
                    </div>
                )}
            </div>
        </div>
    );
};

export {StepProducts};

