import React from 'react';
import { useFormContext } from "react-hook-form";

import css from './GuestUserForm.module.css';


const GuestUserForm = () => {
    const { register, formState: { errors } } = useFormContext();


    return (
        <div className={css.wrap}>
            <div className={css.inputGroup}>
                <label className={css.label}>Ім'я <span className={css.required}>*</span></label>
                <input
                    {...register("guestName", { required: "Вкажіть ім'я" })}
                    className={css.input}
                    placeholder="Ваше ім'я"
                />
                {errors.guestName && <span className={css.error}>{errors.guestName.message}</span>}
            </div>

            <div className={css.inputGroup}>
                <label className={css.label}>Телефон <span className={css.required}>*</span></label>
                <input
                    {...register("guestPhone", {
                        required: "Вкажіть телефон",
                        pattern: { value: /^\+?\d{10,15}$/, message: "Некоректний номер" }
                    })}
                    className={css.input}
                    placeholder="+380..."
                />
                {errors.guestPhone && <span className={css.error}>{errors.guestPhone.message}</span>}
            </div>

            <div className={css.inputGroup}>
                <label className={css.label}>E-mail <span className={css.required}>*</span></label>
                <input
                    {...register("guestEmail", {
                        pattern: { value: /^\S+@\S+\.\S+$/, message: "Некоректний email" }
                    })}
                    className={css.input}
                    placeholder="email@gmail.com"
                />
                {errors.guestEmail && <span className={css.error}>{errors.guestEmail.message}</span>}
            </div>
        </div>
    );
};

export { GuestUserForm };
