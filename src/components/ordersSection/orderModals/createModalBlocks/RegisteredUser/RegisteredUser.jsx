import React, { useCallback, useEffect, useState } from 'react';
import { useFormContext } from "react-hook-form";

import css from './RegisteredUser.module.css';
import { useDebounce } from "../../../../../hooks/index.js";
import { userService } from "../../../../../services/userServices/index.js";

const RegisteredUser = () => {
    const [loadingUsers, setLoadingUsers] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [usersDropdownOpen, setUsersDropdownOpen] = useState(false);
    const [usersOptions, setUsersOptions] = useState([]);
    const debouncedSearch = useDebounce(searchTerm, 400);

    const { watch, setValue, getValues, formState: { errors } } = useFormContext();

    // Відновлюємо searchTerm з форми при монтуванні (поверненні на крок)
    useEffect(() => {
        const selectedUser = getValues('selectedUser');
        if (selectedUser?.email) setSearchTerm(selectedUser.name || selectedUser.email);
    }, [getValues]);

    useEffect(() => {
        let ignore = false;
        const fetchUser = async () => {
            if (debouncedSearch && debouncedSearch.length >= 2) {
                setLoadingUsers(true);
                try {
                    const res = await userService.getAllUsers({ search: debouncedSearch, limit: 10 });
                    if (!ignore) setUsersOptions(res.users);
                } catch {
                    if (!ignore) setUsersOptions([]);
                } finally {
                    setLoadingUsers(false);
                }
            } else {
                setUsersOptions([]);
            }
        };
        fetchUser();
        return () => { ignore = true };
    }, [debouncedSearch]);

    // Скидуємо selectedUser якщо ручний ввод (можеш ще додати debounce тут)
    const handleSearchTermChange = useCallback((e) => {
        setSearchTerm(e.target.value);
        setValue('selectedUser', null, { shouldValidate: true });
        setUsersDropdownOpen(true);
    }, [setValue]);

    const handleUserInputFocus = useCallback(() => {
        setUsersDropdownOpen(true);
    }, []);

    const handleUserSelect = useCallback((option) => {
        setValue('selectedUser', option, { shouldValidate: true });
        setSearchTerm(option.name || option.email);
        setUsersDropdownOpen(false);
    }, [setValue]);

    // Показываем из формы если выбран, иначе local state
    const selectedUser = watch('selectedUser');

    return (
        <div className={css.wrap}>
            <div className={css.inputGroup} style={{ position: "relative" }}>
                <label className={css.label}>Вибрати клієнта</label>
                <input
                    type="text"
                    value={selectedUser?.name || selectedUser?.email || searchTerm}
                    onChange={handleSearchTermChange}
                    onFocus={handleUserInputFocus}
                    placeholder="Введіть назву клієнта"
                    className={css.input}
                    autoComplete="off"
                />
                {loadingUsers && <div className={css.productLoading}>Пошук...</div>}
                {usersDropdownOpen && usersOptions.length > 0 && (
                    <ul className={css.productDropdown}>
                        {usersOptions.map(option => (
                            <li
                                key={option.id}
                                onClick={() => handleUserSelect(option)}
                                className={css.productDropdownItem}
                            >
                                {option.name ? option.name : option.email}
                            </li>
                        ))}
                    </ul>
                )}
                {errors.selectedUser && <p className={css.errorText}>{errors.selectedUser.message}</p>}
            </div>
        </div>
    );
};

export { RegisteredUser };
