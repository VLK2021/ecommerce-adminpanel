import React from 'react';
import {useForm} from 'react-hook-form';
import {joiResolver} from '@hookform/resolvers/joi';
import {Link, useNavigate} from 'react-router-dom';

import css from './RegisterComponent.module.css';
import {authService} from '../../services';
import {registerSchema} from '../../validators/register.validator';


const RegisterComponent = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
    } = useForm({
        resolver: joiResolver(registerSchema),
    });

    const onSubmit = async (data) => {
        try {
            const response = await authService.register(data);
            if (response?.data) {
                navigate('/login');
            }
        } catch (err) {
            const msg = Array.isArray(err?.response?.data?.message)
                ? err.response.data.message.join(', ')
                : err?.response?.data?.message || 'Помилка при реєстрації';
            alert(msg);
        }
    };

    return (
        <div className={css.registerPage}>
            <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
                <h2 className={css.title}>Реєстрація</h2>

                <input
                    type="email"
                    placeholder="Email"
                    {...register('email')}
                />
                {errors.email && <p className={css.error}>{errors.email.message}</p>}

                <input
                    type="password"
                    placeholder="Пароль"
                    {...register('password')}
                />
                {errors.password && <p className={css.error}>{errors.password.message}</p>}

                <button type="submit" className={css.submit} disabled={isSubmitting}>
                    {isSubmitting ? 'Зачекайте...' : 'Зареєструватися'}
                </button>

                <p className={css.redirect}>
                    Вже маєте акаунт? <Link to="/login">Увійти</Link>
                </p>
            </form>
        </div>
    );
};

export {RegisterComponent};
