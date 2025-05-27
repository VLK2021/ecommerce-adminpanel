import Joi from 'joi';

export const loginSchema = Joi.object({
    email: Joi.string().email({ tlds: false }).required().messages({
        'string.empty': 'Email обовʼязковий',
        'string.email': 'Некоректний email',
    }),
    password: Joi.string().min(6).required().messages({
        'string.empty': 'Пароль обовʼязковий',
        'string.min': 'Мінімум 6 символів',
    }),
});
