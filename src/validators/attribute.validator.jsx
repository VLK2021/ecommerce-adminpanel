import Joi from 'joi';

export const attributeValidator = Joi.object({
    name: Joi.string()
        .min(2)
        .max(50)
        .required()
        .messages({
            'string.empty': 'Назва обовʼязкова',
            'string.min': 'Назва має містити мінімум 2 символи',
            'string.max': 'Назва має містити максимум 50 символів',
        }),

    type: Joi.string()
        .valid('STRING', 'NUMBER')
        .required()
        .messages({
            'any.only': 'Тип повинен бути або STRING, або NUMBER',
            'string.empty': 'Тип обовʼязковий',
        }),
});
