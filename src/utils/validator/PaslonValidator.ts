import * as Joi from "joi"

export const createPaslonSchema = Joi.object({
    nama: Joi.string().max(255).required(),
    paslonImg: Joi.string().max(255).required(),
    noUrut: Joi.number().max(255).required(),
    visiMisi: Joi.string().max(255).required(),
    // koalisi: Joi.string().max(255).required()
})