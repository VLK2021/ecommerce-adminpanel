import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FiChevronDown } from 'react-icons/fi';

import css from './CustomSelect.module.css';


const CustomSelect = ({
                          name = 'customSelect',
                          placeholder = 'Оберіть значення',
                          defaultValue = '',
                          options = [],
                          onChangeCallback,
                      }) => {
    const { control } = useForm({
        defaultValues: { [name]: defaultValue },
    });
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen((prev) => !prev);

    const handleSelect = (value, onChange) => {
        onChange(value);
        onChangeCallback?.(value);
        setIsOpen(false);
    };


    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <div className={css.selectContainer}>
                    <div className={css.selectBox} onClick={toggleOpen}>
                        <span className={field.value ? css.selectedText : css.placeholder}>
                            {
                                field.value
                                    ? options.find(opt => opt.value === field.value)?.label || field.value
                                    : placeholder
                            }
                        </span>
                        <FiChevronDown className={`${css.icon} ${isOpen ? css.iconOpen : ''}`} />
                    </div>

                    {isOpen && (
                        <ul className={css.dropdown}>
                            {options.map((option, i) => (
                                <li
                                    key={i}
                                    className={css.option}
                                    onClick={() => handleSelect(option.value, field.onChange)}
                                >
                                    {option.label}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        />
    );
};

export { CustomSelect };
