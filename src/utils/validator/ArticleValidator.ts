import * as Joi from "joi"

export const createArticleSchema = Joi.object({
    gambar: Joi.string().max(255).required(),
    articleDate: Joi.string().max(255).required(),
    title: Joi.string().max(255).required(),
    description: Joi.string().max(255).required()
})
export const updateArticleSchema = Joi.object({
    gambar: Joi.string().max(255).required(),
    title: Joi.string().max(255).required(),
    description: Joi.string().max(255).required()
})