import Joi from "joi";

export const warehouseCreateSchema = Joi.object({
    name: Joi.string().trim().min(2).max(100).required().messages({
        "string.empty": "Назва складу обовʼязкова",
        "string.min": "Назва повинна містити мінімум 2 символи",
        "string.max": "Назва повинна бути не більше 100 символів",
        "any.required": "Назва складу обовʼязкова"
    }),
    address: Joi.string().trim().allow("").max(200).messages({
        "string.max": "Адреса повинна бути не більше 200 символів"
    }),
    city: Joi.string().trim().allow("").max(100).messages({
        "string.max": "Місто повинно бути не більше 100 символів"
    }),
    phone: Joi.string().trim().allow("").max(20).pattern(/^[\d+\-\s()]+$/).messages({
        "string.max": "Телефон повинен бути не більше 20 символів",
        "string.pattern.base": "Телефон містить некоректні символи"
    }),
    isActive: Joi.boolean(),
    description: Joi.string().trim().allow("").max(300).messages({
        "string.max": "Опис повинен бути не більше 300 символів"
    })
});
