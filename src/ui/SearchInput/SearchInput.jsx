import React, { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { FiSearch } from 'react-icons/fi'

import css from './SearchInput.module.css'
import { useDebounce } from '../../hooks'


const SearchInput = ({
                         name = '',
                         placeholder = '',
                         defaultValue = '',
                         onDebouncedSearch,
                         debounceDelay = 200,
                     }) => {
    const { control, watch } = useForm({
        defaultValues: { [name]: defaultValue },
    })

    const value = watch(name)
    const debouncedValue = useDebounce(value, debounceDelay)

    useEffect(() => {
        if (debouncedValue !== undefined) {
            onDebouncedSearch?.(debouncedValue)
        }
    }, [debouncedValue, onDebouncedSearch])


    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <div className={css.wrapper}>
                    <FiSearch className={css.icon} />
                    <input
                        type="text"
                        autoComplete="off"
                        placeholder={placeholder}
                        className={css.input}
                        {...field}
                    />
                </div>
            )}
        />
    )
}

export { SearchInput }


//приклад як реалізувати з тим сраним квері
// export const fetchProductsBySearch = createAsyncThunk(
//     'products/fetchBySearch',
//     async (query) => {
//         const response = await axios.get('/api/products/search', {
//             params: { q: query },
//         })
//         return response.data
//     }
// )
