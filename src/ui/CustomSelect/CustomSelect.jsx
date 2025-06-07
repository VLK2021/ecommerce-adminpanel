import React, {useState, useEffect} from 'react';
import {FiChevronDown} from 'react-icons/fi';

import css from './CustomSelect.module.css';

const CustomSelect = ({
                          value,
                          onChangeCallback,
                          options = [],
                          placeholder = 'Оберіть значення',
                          name,
                      }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen(prev => !prev);

    const handleSelect = (val) => {
        onChangeCallback?.(val);
        setIsOpen(false);
    };

    const selectedLabel = options.find(opt => opt.value === value)?.label || value;

    return (
        <div className={css.selectContainer}>
            <div className={css.selectBox} onClick={toggleOpen}>
        <span className={value ? css.selectedText : css.placeholder}>
          {value ? selectedLabel : placeholder}
        </span>
                <FiChevronDown className={`${css.icon} ${isOpen ? css.iconOpen : ''}`}/>
            </div>

            {isOpen && (
                <ul className={css.dropdown}>
                    {options.map(option => (
                        <li
                            key={option.value}
                            className={css.option}
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

export {CustomSelect};

