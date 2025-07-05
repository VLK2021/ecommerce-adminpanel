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
                    {...register("deliveryData.guestName", { required: "Вкажіть ім'я" })}
                    className={css.input}
                    placeholder="Ваше ім'я"
                />
                {errors?.deliveryData?.guestName && <span className={css.error}>{errors.deliveryData.guestName.message}</span>}
            </div>
            <div className={css.inputGroup}>
                <label className={css.label}>Прізвище <span className={css.required}>*</span></label>
                <input
                    {...register("deliveryData.guestLastName", { required: "Вкажіть прізвище" })}
                    className={css.input}
                    placeholder="Ваше прізвище"
                />
                {errors?.deliveryData?.guestLastName && <span className={css.error}>{errors.deliveryData.guestLastName.message}</span>}
            </div>
            <div className={css.inputGroup}>
                <label className={css.label}>Телефон <span className={css.required}>*</span></label>
                <input
                    {...register("deliveryData.guestPhone", {
                        required: "Вкажіть телефон",
                        pattern: { value: /^\+?\d{10,15}$/, message: "Некоректний номер" }
                    })}
                    className={css.input}
                    placeholder="+380..."
                />
                {errors?.deliveryData?.guestPhone && <span className={css.error}>{errors.deliveryData.guestPhone.message}</span>}
            </div>
            <div className={css.inputGroup}>
                <label className={css.label}>E-mail <span className={css.required}>*</span></label>
                <input
                    {...register("deliveryData.guestEmail", {
                        pattern: { value: /^\S+@\S+\.\S+$/, message: "Некоректний email" }
                    })}
                    className={css.input}
                    placeholder="email@gmail.com"
                />
                {errors?.deliveryData?.guestEmail && <span className={css.error}>{errors.deliveryData.guestEmail.message}</span>}
            </div>
        </div>
    );
};

export { GuestUserForm };
