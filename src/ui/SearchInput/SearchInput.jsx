import React, { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';

import css from './SearchInput.module.css';
import { useDebounce } from '../../hooks';

const SearchInput = ({
                         value = '',
                         onDebouncedSearch,
                         onChange = () => {},
                         placeholder = '',
                         debounceDelay = 300,
                         name = '',
                     }) => {
    const [internalValue, setInternalValue] = useState(value);
    const debouncedValue = useDebounce(internalValue, debounceDelay);

    useEffect(() => {
        setInternalValue(value);
    }, [value]);

    useEffect(() => {
        onDebouncedSearch?.(debouncedValue);
    }, [debouncedValue]);

    const handleChange = (e) => {
        const val = e.target.value;
        setInternalValue(val);
        onChange(e);
    };

    return (
        <div className={css.wrapper}>
            <FiSearch className={css.icon} />
            <input
                type="text"
                name={name}
                value={internalValue}
                onChange={handleChange}
                autoComplete="off"
                placeholder={placeholder}
                className={css.input}
            />
        </div>
    );
};

export { SearchInput };
