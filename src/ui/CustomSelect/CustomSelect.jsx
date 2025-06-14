import React, { useEffect, useRef, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

import css from './CustomSelect.module.css';


const CustomSelect = ({
                          value,
                          onChangeCallback,
                          options = [],
                          placeholder = 'Оберіть значення',
                          name
                      }) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);

    const toggleOpen = () => setIsOpen(prev => !prev);

    const handleSelect = (val) => {
        if (val !== value) {
            onChangeCallback?.(val);
        }
        setIsOpen(false);
    };

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedLabel = options.find(opt => opt.value === value)?.label;

    return (
        <div className={css.selectContainer} ref={ref}>
            <div className={css.selectBox} onClick={toggleOpen}>
                <span className={value ? css.selectedText : css.placeholder}>
                    {selectedLabel || placeholder}
                </span>
                <FiChevronDown className={`${css.icon} ${isOpen ? css.iconOpen : ''}`} />
            </div>

            {isOpen && (
                <ul className={css.dropdown}>
                    {options.map(option => (
                        <li
                            key={option.value}
                            className={`${css.option} ${option.value === value ? css.activeOption : ''}`}
                            onClick={() => handleSelect(option.value)}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export { CustomSelect };
