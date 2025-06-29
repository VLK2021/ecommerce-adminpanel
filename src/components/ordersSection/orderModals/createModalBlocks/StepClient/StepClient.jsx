import React, {useState} from 'react';
import { useFormContext } from "react-hook-form";

import css from './StepClient.module.css';


const StepClient = () => {
    const [loadingUsers, setLoadingUsers] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [usersDropdownOpen, setUsersDropdownOpen] = useState(false);

    const {
        register,
        watch,
        formState: { errors },
    } = useFormContext();
    const isGuest = watch('isGuest');

    const handleSearchTermChange = () => {

    };

    const handleUserInputFocus = () => {

    };

    const handleUserSelect = () => {

    };




    return (
        <div className={css.wrap}>
            <div className={css.radioGroup}>
                <label className={css.radioLabel}>
                    <input
                        type="radio"
                        {...register('isGuest')}
                        value={'false'}
                        defaultChecked
                        className={css.radioInput}
                    />
                    <span className={css.customRadio} />
                    Зареєстрований
                </label>

                <label className={css.radioLabel}>
                    <input
                        type="radio"
                        {...register('isGuest')}
                        value={'true'}
                        className={css.radioInput}
                    />
                    <span className={css.customRadio} />
                    Гість
                </label>
            </div>

            <div className={css.userInfo}>
                {isGuest === 'true' ? (
                    'true'
                ) : (
                    <div className={css.inputGroup} style={{position: "relative"}}>
                        <label className={css.label}>Вибрати клієнта</label>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchTermChange}
                            onFocus={handleUserInputFocus}
                            placeholder="Введіть назву клієнта"
                            className={css.input}
                            autoComplete="off"
                        />
                        {loadingUsers && <div className={css.productLoading}>Пошук...</div>}
                        {/*{usersDropdownOpen && productOptions.length > 0 && (*/}
                        {/*    <ul className={css.productDropdown}>*/}
                        {/*        {productOptions.map(option => (*/}
                        {/*            <li*/}
                        {/*                key={option.value}*/}
                        {/*                onClick={() => handleUserSelect(option)}*/}
                        {/*                className={css.productDropdownItem}*/}
                        {/*            >*/}
                        {/*                {option.label}*/}
                        {/*            </li>*/}
                        {/*        ))}*/}
                        {/*    </ul>*/}
                        {/*)}*/}
                        {errors.productId && <p className={css.errorText}>{errors.productId.message}</p>}
                    </div>
                )}
            </div>
        </div>
    );
};

export { StepClient };
