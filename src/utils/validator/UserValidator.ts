import * as Joi from "joi"

export const createUserSchema = Joi.object({
    fullName: Joi.string().max(255).required(),
    address: Joi.string().max(255).required(),
    gender: Joi.string().max(255).required()
})