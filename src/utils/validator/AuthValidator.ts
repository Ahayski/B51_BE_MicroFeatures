import * as Joi from "joi"

export const registerSchema = Joi.object({
    fullName: Joi.string().required(),
    address: Joi.string().required(),
    gender: Joi.string().required(),
    userName: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().max(100).allow(null)
})

export const loginSchema = Joi.object({
    userName: Joi.string().required(),
    password: Joi.string().required()
})